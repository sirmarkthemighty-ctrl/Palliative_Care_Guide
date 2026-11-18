import React, { useState, useEffect, useRef } from 'react';
import {
  Pill,
  ShieldAlert,
  CheckCircle,
  Copy,
  Check,
  AlertTriangle,
  Info,
  ArrowUpDown,
  ChevronDown,
  FileText,
  Table,
  Plus,
  X,
  Printer,
  RotateCcw
} from 'lucide-react';
import { Language, OpioidDrug } from '../types';
import { OPIOID_DRUGS, THAI_CPG_FENTANYL_TABLE } from '../data/opioidData';
import { safeStore } from '../store';

// Tablets/capsules that come in fixed strengths: the dose is rounded DOWN to what can be made up
const PRODUCTS: Record<string, { strengths: number[]; perDay: number }> = {
  kapanol: { strengths: [20, 50, 100], perDay: 1 },
  mst_continus: { strengths: [10, 30, 60], perDay: 2 },
  oxycodone_oral: { strengths: [10, 40], perDay: 2 },
  tramadol_oral: { strengths: [50], perDay: 4 },
  codeine_oral: { strengths: [15, 30], perDay: 4 }
};

// Largest amount <= perDose that is an exact sum of the strengths, with the fewest units
const makeUp = (perDose: number, strengths: number[]): { amount: number; parts: string } => {
  const cap = Math.min(5000, Math.floor(perDose + 1e-9));
  const units: number[] = new Array(cap + 1).fill(Infinity);
  const last: number[] = new Array(cap + 1).fill(0);
  units[0] = 0;
  for (let a = 1; a <= cap; a++) {
    for (const s of strengths) {
      if (a >= s && units[a - s] + 1 < units[a]) { units[a] = units[a - s] + 1; last[a] = s; }
    }
  }
  let best = cap;
  while (best > 0 && units[best] === Infinity) best--;
  const count: Record<number, number> = {};
  for (let a = best; a > 0; a -= last[a]) count[last[a]] = (count[last[a]] || 0) + 1;
  const parts = Object.keys(count).map(Number).sort((x, y) => y - x).map((s) => `${count[s]} × ${s} mg`).join(' + ');
  return { amount: best, parts };
};

type SourceRow = { id: string; dose: number };
const STORE_KEY = 'opioid_calc_v1';
const RENAL_IDS = ['normal', 'moderate', 'severe'] as const;
// Only drug choices, reduction and kidney level are remembered; doses are never carried to the next patient
const loadSaved = () => {
  try {
    const s = JSON.parse(safeStore(STORE_KEY) || '{}');
    const ok = (id: unknown) => OPIOID_DRUGS.some((d) => d.id === id);
    return {
      from: ok(s.from) ? (s.from as string) : 'morphine_oral',
      to: ok(s.to) ? (s.to as string) : 'fentanyl_patch',
      pct: [0, 25, 33, 50].includes(s.pct) ? (s.pct as number) : 25,
      renal: (RENAL_IDS as readonly string[]).includes(s.renal) ? (s.renal as 'normal' | 'moderate' | 'severe') : 'normal'
    };
  } catch {
    return { from: 'morphine_oral', to: 'fentanyl_patch', pct: 25, renal: 'normal' as const };
  }
};

interface OpioidCalcTabProps {
  language: Language;
  standalone?: boolean; // standalone page has its own header, so the intro banner is hidden
}

// Where each drug's numbers come from: Thai DMS CPG "Palliative and End-of-Life Care" (1st print Sept 2563/2020), printed pages
const CPG_SOURCES: Record<string, { en: string; th: string; none?: boolean }> = {
  morphine_oral: { en: 'p. 91, Table 9.1.2: tablet 10 mg, syrup 10 mg/5 mL', th: 'หน้า 91 ตาราง 9.1.2: เม็ด 10 มก. น้ำเชื่อม 10 มก./5 มล.' },
  kapanol: { en: 'p. 91, Table 9.1.2: capsule 20, 50, 100 mg', th: 'หน้า 91 ตาราง 9.1.2: แคปซูล 20, 50, 100 มก.' },
  mst_continus: { en: 'p. 91, Table 9.1.2: tablet 10, 30, 60 mg', th: 'หน้า 91 ตาราง 9.1.2: เม็ด 10, 30, 60 มก.' },
  morphine_parenteral: { en: 'p. 91: ampoule 10 mg/mL; p. 93: injected : oral = 1 : 3', th: 'หน้า 91: แอมพูล 10 มก./มล.; หน้า 93: ฉีด : กิน = 1 : 3' },
  fentanyl_patch: { en: 'p. 94, Table 9.1.3; reduce the dose 25-50% when switching', th: 'หน้า 94 ตาราง 9.1.3; ลดขนาดยา 25-50% เมื่อเปลี่ยนยา' },
  fentanyl_parenteral: { en: 'not from the Thai CPG. 100 mcg IV fentanyl = 10 mg IV morphine (University of Toronto equianalgesic table, 2014; ClinCalc), then x3 to oral per CPG p. 93. Published tables differ, so treat it as approximate.', th: 'ไม่ได้มาจาก CPG ไทย: fentanyl 100 มคก. IV = มอร์ฟีน IV 10 มก. (ตาราง equianalgesic ม.โตรอนโต 2014; ClinCalc) แล้วคูณ 3 เป็นมอร์ฟีนกินตาม CPG หน้า 93 ตารางแต่ละแหล่งไม่ตรงกัน ใช้เป็นค่าประมาณ', none: true },
  tramadol_oral: { en: 'p. 91: 10 times weaker than morphine, max 400 mg/day (300 in the elderly)', th: 'หน้า 91: ฤทธิ์น้อยกว่ามอร์ฟีนประมาณ 10 เท่า สูงสุด 400 มก./วัน (ผู้สูงอายุ 300)' },
  tramadol_parenteral: { en: 'not from the Thai CPG. The IV factor is set equal to oral (CPG p. 91: 10 times weaker than morphine). The Palliative Care Formulary gives parenteral 1:10 (via Our Lady\'s Hospice, 2017). Low-quality evidence.', th: 'ไม่ได้มาจาก CPG ไทย: ตั้งค่ายาฉีดเท่ากับยากิน (CPG หน้า 91: ฤทธิ์น้อยกว่ามอร์ฟีน 10 เท่า) Palliative Care Formulary ระบุยาฉีด 1:10 (อ้างโดย Our Lady\'s Hospice 2017) หลักฐานคุณภาพต่ำ', none: true },
  oxycodone_oral: { en: 'p. 94: CR 10 and 40 mg only, 1.5-2 times morphine', th: 'หน้า 94: ชนิด CR 10 และ 40 มก. เท่านั้น แรงกว่ามอร์ฟีน 1.5-2 เท่า' },
  codeine_oral: { en: 'p. 91: 10 times weaker than morphine, max 240 mg/day', th: 'หน้า 91: ฤทธิ์น้อยกว่ามอร์ฟีนประมาณ 10 เท่า สูงสุด 240 มก./วัน' }
};

// Short names for dropdowns, result and the sticky bar (long names stay in the details fold)
const SHORT_NAMES: Record<string, { en: string; th: string }> = {
  morphine_oral: { en: 'Morphine oral (IR)', th: 'มอร์ฟีนกิน (IR)' },
  kapanol: { en: 'Kapanol (SR 24 h)', th: 'Kapanol (24 ชม.)' },
  mst_continus: { en: 'MST Continus (CR 12 h)', th: 'MST Continus (12 ชม.)' },
  morphine_parenteral: { en: 'Morphine IV/SC', th: 'มอร์ฟีนฉีด IV/SC' },
  fentanyl_patch: { en: 'Fentanyl patch', th: 'แผ่นแปะเฟนตานิล' },
  fentanyl_parenteral: { en: 'Fentanyl IV/SC', th: 'เฟนตานิลฉีด IV/SC' },
  tramadol_oral: { en: 'Tramadol oral', th: 'ทรามาดอลกิน' },
  tramadol_parenteral: { en: 'Tramadol IV/SC', th: 'ทรามาดอลฉีด IV/SC' },
  oxycodone_oral: { en: 'Oxycodone CR (12 h)', th: 'ออกซีโคโดน CR (12 ชม.)' },
  codeine_oral: { en: 'Codeine oral', th: 'โคเดอีนกิน' }
};

const cardCls = 'bg-white dark:bg-[#151f32] rounded-xl md:rounded-2xl shadow-sm border border-slate-200 dark:border-[#263449]';
const fieldCls = 'w-full min-h-[44px] px-3 text-base sm:text-sm bg-slate-50 dark:bg-[#101a2b] border border-slate-300 dark:border-[#263449] rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500';
const labelCls = 'block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1';

// Closed-by-default block: the header button opens it; `right` stays clickable when closed
const Fold: React.FC<{ title: string; icon: React.ReactNode; right?: React.ReactNode; children: React.ReactNode }> = ({ title, icon, right, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <section className={cardCls}>
      <div className="flex items-center gap-2 pr-3 md:pr-5">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex-1 min-w-0 min-h-[44px] flex items-center gap-2 px-3.5 md:px-5 py-2 text-left cursor-pointer"
        >
          <span className="text-indigo-600 dark:text-indigo-400 shrink-0">{icon}</span>
          <span className="flex-1 min-w-0 text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">{title}</span>
          <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {right}
      </div>
      {open && <div className="px-3.5 md:px-5 pb-3.5 md:pb-5">{children}</div>}
    </section>
  );
};

export const OpioidCalcTab: React.FC<OpioidCalcTabProps> = ({ language, standalone = false }) => {
  const saved = useRef(loadSaved()).current;
  // Current regimen: one or more opioids (e.g. long-acting + PRN doses used in 24 h), summed to one OME
  const [sources, setSources] = useState<SourceRow[]>([{ id: saved.from, dose: 60 }]);
  const [targetDrugId, setTargetDrugId] = useState<string>(saved.to);
  const [crossTolerancePercent, setCrossTolerancePercent] = useState<number>(saved.pct); // 0%, 25%, 33%, 50%
  const [renalStatus, setRenalStatus] = useState<'normal' | 'moderate' | 'severe'>(saved.renal); // eGFR
  const [copiedRx, setCopiedRx] = useState<boolean>(false);
  const [resultVisible, setResultVisible] = useState<boolean>(true);
  const resultRef = useRef<HTMLDivElement>(null);

  const en = language === 'en';
  const drugOf = (id: string) => OPIOID_DRUGS.find((d) => d.id === id) || OPIOID_DRUGS[0];
  const targetDrug = OPIOID_DRUGS.find((d) => d.id === targetDrugId) || OPIOID_DRUGS[4];
  const shortName = (d: OpioidDrug) => (SHORT_NAMES[d.id] ? (en ? SHORT_NAMES[d.id].en : SHORT_NAMES[d.id].th) : en ? d.nameEn : d.nameTh);

  const updateSource = (i: number, patch: Partial<SourceRow>) => setSources((rows) => rows.map((r, k) => (k === i ? { ...r, ...patch } : r)));
  const addSource = () => setSources((rows) => [...rows, { id: 'morphine_oral', dose: 0 }]);
  const removeSource = (i: number) => setSources((rows) => rows.filter((_, k) => k !== i));
  const handleReset = () => {
    setSources([{ id: 'morphine_oral', dose: 60 }]);
    setTargetDrugId('fentanyl_patch');
    setCrossTolerancePercent(25);
    setRenalStatus('normal');
  };

  useEffect(() => {
    safeStore(STORE_KEY, JSON.stringify({ from: sources[0].id, to: targetDrugId, pct: crossTolerancePercent, renal: renalStatus }));
  }, [sources[0].id, targetDrugId, crossTolerancePercent, renalStatus]);

  // 1. Calculate Oral Morphine Milligram Equivalent (OME), summed over every current opioid
  const omeParts = sources.map((s) => (s.dose || 0) * drugOf(s.id).factorToOralMorphine);
  const ome24h = omeParts.reduce((a, b) => a + b, 0);

  // 2. Apply cross-tolerance reduction
  const reductionFactor = 1 - crossTolerancePercent / 100;
  const targetOme = ome24h * reductionFactor;

  // 3. Convert target OME to target drug dose
  let calculatedTargetDose = 0;
  // Below the first CPG row (< 20 mg OME/day) a patch is not indicated
  const belowPatchRange = targetDrug.id === 'fentanyl_patch' && targetOme < THAI_CPG_FENTANYL_TABLE[0].minOralMorphine;
  const matchedRow = THAI_CPG_FENTANYL_TABLE.find((r) => targetOme <= r.maxOralMorphine);
  if (targetDrug.id === 'fentanyl_patch') {
    if (belowPatchRange) {
      calculatedTargetDose = 0;
    } else if (matchedRow) {
      calculatedTargetDose = matchedRow.patchDoseMcgHr;
    } else {
      // Linear approximation for very high doses
      calculatedTargetDose = Math.round(targetOme / 2.4 / 25) * 25;
    }
  } else {
    calculatedTargetDose = targetOme * targetDrug.factorFromOralMorphine;
  }

  // Round target dose cleanly
  const roundedTargetDose =
    targetDrug.unit === 'mcg/hr'
      ? calculatedTargetDose
      : Math.round(calculatedTargetDose * 10) / 10;

  // Breakthrough Pain Dose: 10% to 15% of the new 24h dose (after reduction)
  const breakthroughOmeMin = Math.round((targetOme * 0.1) * 10) / 10;
  const breakthroughOmeMax = Math.round((targetOme * 0.15) * 10) / 10;

  // One-line "why this dose": OME -> reduction -> (CPG band) -> result
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const whyLine =
    (omeParts.length > 1 ? `${omeParts.map(r1).join(' + ')} = ` : '') +
    `${r1(ome24h)} OME` +
    (crossTolerancePercent ? ` −${crossTolerancePercent}% = ${r1(targetOme)} OME` : '') +
    (targetDrug.id === 'fentanyl_patch' && matchedRow && !belowPatchRange ? ` → CPG ${matchedRow.oralMorphineRange.replace(' mg/day', '')}` : '');

  // Swap: the result becomes the current regimen (units differ, so the dose is carried over too)
  const handleSwap = () => {
    if (sources.length > 1) return;
    setTargetDrugId(sources[0].id);
    setSources([{ id: targetDrugId, dose: belowPatchRange ? 0 : roundedTargetDose }]);
  };

  // Fixed-strength products: round the per-dose amount down to what can be made up from real tablets/capsules
  const product = PRODUCTS[targetDrug.id];
  const productPerDoseCalc = product ? roundedTargetDose / product.perDay : 0;
  const practical = product ? { ...makeUp(productPerDoseCalc, product.strengths), min: Math.min(...product.strengths), perDay: product.perDay } : null;
  const practicalDaily = practical ? practical.amount * practical.perDay : 0;
  const everyH = practical ? 24 / practical.perDay : 0;
  const practicalLine = !practical
    ? ''
    : practical.amount === 0
      ? (en ? `Below the smallest strength (${practical.min} mg per dose): use immediate-release morphine` : `ต่ำกว่าขนาดเม็ดเล็กสุด (${practical.min} มก. ต่อครั้ง): ใช้มอร์ฟีนชนิด IR แทน`)
      : (en
          ? `Give ${practical.amount} mg ${practical.perDay === 1 ? 'once daily' : `every ${everyH} h`} (${practical.parts}) = ${practicalDaily} mg/day`
          : `ให้ ${practical.amount} มก. ${practical.perDay === 1 ? 'วันละครั้ง' : `ทุก ${everyH} ชม.`} (${practical.parts}) = ${practicalDaily} มก./วัน`);

  // Show the sticky result bar on phones while the result card is out of view
  useEffect(() => {
    const el = resultRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([e]) => setResultVisible(e.intersectionRatio >= 0.5), { threshold: [0, 0.5, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Generate Sample Clinical Prescription
  const generatePrescriptionText = () => {
    let regularRx = '';
    let breakthroughRx = '';
    const roundNote = practical && practical.amount > 0 && practicalDaily < r1(roundedTargetDose)
      ? `\n   (Calculated ${r1(roundedTargetDose)} mg/day, rounded down to available strengths).`
      : '';

    if (belowPatchRange) {
      regularRx = `1. Fentanyl patch not indicated: ${Math.round(targetOme * 10) / 10} mg OME/day is below the CPG minimum (20 mg/day).\n   Use a low-dose oral/SC opioid instead.`;
    } else if (targetDrug.id === 'fentanyl_patch') {
      regularRx = `1. Fentanyl Transdermal Patch ${roundedTargetDose} mcg/hr\n   Apply 1 patch transdermally every 72 hours (3 days).\n   (Keep previous opioid for first 12-24 hours).`;
    } else if (practical && practical.amount === 0) {
      regularRx = `1. ${targetDrug.nameEn}: ${r1(productPerDoseCalc)} mg per dose is below the smallest strength (${practical.min} mg).\n   Use immediate-release morphine instead.`;
    } else if (targetDrug.id === 'kapanol' && practical) {
      regularRx = `1. Kapanol® (Morphine SR 24h) ${practical.amount} mg (${practical.parts})\n   Take ${practical.amount} mg PO once daily at the same time. (DO NOT crush pellets).${roundNote}`;
    } else if (targetDrug.id === 'mst_continus' && practical) {
      regularRx = `1. MST Continus® (Morphine CR 12h) ${practical.amount} mg (${practical.parts})\n   Take ${practical.amount} mg PO every 12 hours (08:00, 20:00). Swallow whole.${roundNote}`;
    } else if (targetDrug.id === 'morphine_parenteral') {
      const q4h = Math.round((roundedTargetDose / 6) * 10) / 10;
      regularRx = `1. Morphine Injection (10 mg/mL)\n   Give ${q4h} mg SC/IV every 4 hours regular (or ${Math.round((roundedTargetDose / 24) * 10) / 10} mg/hr continuous SC infusion).`;
    } else if (targetDrug.id === 'fentanyl_parenteral') {
      regularRx = `1. Fentanyl Injection (50 mcg/mL)
   ${Math.round((roundedTargetDose / 24) * 10) / 10} mcg/hr continuous SC/IV infusion (${roundedTargetDose} mcg/day).`;
    } else if (practical && product) {
      // oxycodone, tramadol oral, codeine: whole tablets/capsules only
      const over = targetDrug.id.startsWith('tramadol') && roundedTargetDose > 400 ? `
   WARNING: exceeds tramadol max 400 mg/day - use a strong opioid instead.` : targetDrug.id === 'codeine_oral' && roundedTargetDose > 240 ? `
   WARNING: exceeds codeine max 240 mg/day - use a strong opioid instead.` : '';
      regularRx = `1. ${targetDrug.nameEn}
   ${practical.amount} mg (${practical.parts}) every ${everyH} hours (${practicalDaily} mg/day).${roundNote}${over}`;
    } else if (targetDrug.id !== 'morphine_oral') {
      const perDay = ({ tramadol_parenteral: 3 } as Record<string, number>)[targetDrug.id] || 1;
      const every = 24 / perDay;
      const over = targetDrug.id.startsWith('tramadol') && roundedTargetDose > 400 ? `
   WARNING: exceeds tramadol max 400 mg/day - use a strong opioid instead.` : targetDrug.id === 'codeine_oral' && roundedTargetDose > 240 ? `
   WARNING: exceeds codeine max 240 mg/day - use a strong opioid instead.` : '';
      regularRx = `1. ${targetDrug.nameEn}
   ${Math.round((roundedTargetDose / perDay) * 10) / 10} mg every ${every} hours (${roundedTargetDose} mg/day).${over}`;
    } else {
      const q4h = Math.round((roundedTargetDose / 6) * 10) / 10;
      regularRx = `1. Morphine Oral (IR/Syrup 2mg/mL)\n   Take ${q4h} mg (${Math.round((q4h / 2) * 10) / 10} mL syrup) PO every 4 hours around the clock.`;
    }

    breakthroughRx = `2. Morphine IR Oral (Syrup or Tablet) ${breakthroughOmeMin} - ${breakthroughOmeMax} mg\n   Take PO every 2-4 hours PRN for breakthrough pain. (Max 4-6 doses/day).\n3. Senna (7.5 mg) 2-4 tablets PO at bedtime daily (Laxative co-prescription).${renalStatus !== 'normal' ? '\n   NOTE: Thai CPG advises against morphine in kidney disease; if used, monitor closely for overdose.' : ''}`;

    return `${regularRx}\n\n${breakthroughRx}`;
  };

  const handleCopyRx = () => {
    try { navigator.clipboard?.writeText(generatePrescriptionText())?.catch(() => {}); } catch { /* clipboard blocked */ }
    setCopiedRx(true);
    setTimeout(() => setCopiedRx(false), 2000);
  };

  // Print the draft alone: a hidden iframe holds the text so the rest of the page is not printed
  const handlePrintRx = () => {
    try {
      const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const head = `Opioid conversion draft - ${new Date().toLocaleDateString()}\nFrom: ${sources.map((s) => `${drugOf(s.id).nameEn} ${s.dose} ${drugOf(s.id).unit}`).join(' + ')}\nCalculation: ${whyLine}\nKidney (eGFR): ${renalStatus}\n`;
      const foot = '\nDraft for a licensed clinician: verify every dose before prescribing.';
      const f = document.createElement('iframe');
      f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0';
      document.body.appendChild(f);
      const d = f.contentWindow!.document;
      d.open();
      d.write(`<pre style="font:14px/1.5 monospace;white-space:pre-wrap">${esc(head + '\n' + generatePrescriptionText() + '\n' + foot)}</pre>`);
      d.close();
      f.contentWindow!.focus();
      f.contentWindow!.print();
      setTimeout(() => f.remove(), 1500);
    } catch { /* printing blocked */ }
  };

  const renalOptions: { id: 'normal' | 'moderate' | 'severe'; en: string; th: string; range: string; on: string; off: string }[] = [
    { id: 'normal', en: 'Normal', th: 'ปกติ', range: '> 60', on: 'bg-emerald-600 text-white border-emerald-600', off: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/50 dark:border-emerald-800 dark:text-emerald-300' },
    { id: 'moderate', en: 'Moderate', th: 'ปานกลาง', range: '30 - 59', on: 'bg-amber-600 text-white border-amber-600', off: 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 dark:border-amber-800 dark:text-amber-300' },
    { id: 'severe', en: 'Severe / HD', th: 'รุนแรง / ล้างไต', range: '< 30', on: 'bg-rose-600 text-white border-rose-600', off: 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 dark:border-rose-800 dark:text-rose-300' }
  ];

  // Equianalgesic ratio From : To (before the cross-tolerance reduction); only for a single current opioid
  const fromFirst = drugOf(sources[0].id);
  const rawRatio = targetDrug.factorToOralMorphine / fromFirst.factorToOralMorphine;
  const fmtN = (n: number) => String(Math.round(n * 100) / 100);
  const ratioApprox = fromFirst.id === 'fentanyl_patch' || targetDrug.id === 'fentanyl_patch' ? '≈ ' : '';
  const ratioText = sources.length > 1
    ? ''
    : ratioApprox + (rawRatio >= 1
      ? `${fmtN(rawRatio)} ${fromFirst.unit} : 1 ${targetDrug.unit}`
      : `1 ${fromFirst.unit} : ${fmtN(1 / rawRatio)} ${targetDrug.unit}`);

  const resultText = belowPatchRange ? 'N/A' : `${roundedTargetDose} ${targetDrug.unit}`;

  return (
    <div className="space-y-4 md:space-y-6 animate-fadeIn pb-16 lg:pb-0">
      {/* Banner (hidden on the standalone page, which has its own header) */}
      {!standalone && (
        <div className={`${cardCls} p-3.5 md:p-5`}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-indigo-200 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300 text-[10px] font-bold uppercase tracking-wider mb-2">
              <Pill className="w-3 h-3" />
              <span>{en ? 'Clinical Equianalgesic Converter' : 'เครื่องคำนวณและแปลงขนาดยาแก้ปวดโอปิออยด์'}</span>
            </div>

            <h2 className="text-lg md:text-2xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 leading-tight">
              {en ? 'Palliative Opioid Equianalgesic Calculator' : 'เครื่องคำนวณเทียบเคียงและหมุนเวียนยาโอปิออยด์'}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {en
                ? 'Convert between opioids with cross-tolerance reduction and renal checks (fentanyl patch per Thai CPG Table 9.1.3).'
                : 'แปลงขนาดยาโอปิออยด์ พร้อมลดขนาดตามการดื้อยาข้ามตัวและเตือนเมื่อไตเสื่อม (แผ่นแปะเฟนตานิลตามตาราง 9.1.3 CPG)'}
            </p>
          </div>
        </div>
      )}

      {/* Inputs + result: side by side on desktop, result right under the inputs on phones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start">
        {/* Inputs */}
        <div className={`lg:col-span-7 ${cardCls} p-3.5 md:p-5 space-y-3`}>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className={`${labelCls} mb-0`}>{en ? 'From (current opioid)' : 'จาก (ยาที่ใช้อยู่)'}</span>
              <button
                type="button"
                onClick={handleReset}
                className="min-h-[32px] px-2 flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{en ? 'Reset' : 'ล้างค่า'}</span>
              </button>
            </div>
            {sources.map((row, i) => {
              const rowDrug = drugOf(row.id);
              return (
                <div key={i} className="flex flex-wrap gap-2 items-center">
                  <select
                    aria-label={en ? `Current opioid ${i + 1}` : `ยาที่ใช้อยู่ ${i + 1}`}
                    value={row.id}
                    onChange={(e) => updateSource(i, { id: e.target.value })}
                    className={`${fieldCls} basis-full min-[420px]:basis-0 min-[420px]:flex-1 min-w-0`}
                  >
                    {OPIOID_DRUGS.map((d) => (
                      <option key={d.id} value={d.id}>{shortName(d)}</option>
                    ))}
                  </select>
                  <div className="relative flex-1 min-w-[7rem] min-[420px]:flex-none min-[420px]:w-32">
                    <input
                      type="number"
                      inputMode="decimal"
                      aria-label={en ? `Dose ${i + 1}` : `ขนาดยา ${i + 1}`}
                      min="0"
                      step="0.5"
                      value={row.dose}
                      onChange={(e) => updateSource(i, { dose: Math.max(0, parseFloat(e.target.value) || 0) })}
                      className={`${fieldCls} font-bold pr-16`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 dark:text-slate-400 font-semibold pointer-events-none">
                      {rowDrug.unit}
                    </span>
                  </div>
                  {sources.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSource(i)}
                      aria-label={en ? `Remove opioid ${i + 1}` : `เอายาตัวที่ ${i + 1} ออก`}
                      className="w-9 min-h-[44px] shrink-0 flex items-center justify-center rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={addSource}
              className="min-h-[36px] px-2.5 flex items-center gap-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300 rounded-lg border border-dashed border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{en ? 'Add another opioid (e.g. PRN doses used in 24 h)' : 'เพิ่มยาอีกตัว (เช่น PRN ที่ใช้ใน 24 ชม.)'}</span>
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 -my-1">
            <button
              type="button"
              onClick={handleSwap}
              disabled={sources.length > 1}
              aria-label={en ? 'Swap drugs: the result becomes the current regimen' : 'สลับยา: ใช้ผลลัพธ์เป็นยาที่ใช้อยู่'}
              title={sources.length > 1 ? (en ? 'Swap works with one current opioid' : 'สลับได้เมื่อมียาปัจจุบันตัวเดียว') : (en ? 'Swap drugs: the result becomes the current regimen' : 'สลับยา: ใช้ผลลัพธ์เป็นยาที่ใช้อยู่')}
              className="w-11 h-9 flex items-center justify-center rounded-full bg-white dark:bg-[#101a2b] border border-slate-200 dark:border-[#263449] text-slate-600 dark:text-slate-300 shadow-sm hover:bg-slate-50 dark:hover:bg-[#1b2740] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>
            {ratioText && (
              <span
                className="text-[11px] font-bold text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-[#101a2b] border border-slate-200 dark:border-[#263449] rounded-full px-2.5 py-1"
                title={en ? 'Equianalgesic ratio (current : new), before the dose reduction' : 'อัตราส่วนเทียบเคียง (ยาเดิม : ยาใหม่) ก่อนลดขนาดยา'}
              >
                {ratioText}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="op-to" className={labelCls}>{en ? 'To (new opioid)' : 'เปลี่ยนเป็น (ยาใหม่)'}</label>
            <select id="op-to" value={targetDrugId} onChange={(e) => setTargetDrugId(e.target.value)} className={fieldCls}>
              {OPIOID_DRUGS.map((d) => (
                <option key={d.id} value={d.id}>{shortName(d)}</option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1">
              <span className={`${labelCls} mb-0`}>{en ? 'Reduce dose by (cross-tolerance)' : 'ลดขนาดยา (ดื้อยาข้ามตัว)'}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">{en ? '25-50% advised (CPG p. 94)' : 'แนะนำ 25-50% (CPG หน้า 94)'}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 25, 33, 50].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setCrossTolerancePercent(pct)}
                  aria-pressed={crossTolerancePercent === pct}
                  className={`min-h-[44px] text-sm font-bold rounded-lg border transition-all cursor-pointer ${
                    crossTolerancePercent === pct
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-white hover:bg-slate-50 dark:bg-[#101a2b] dark:hover:bg-[#1b2740] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#263449]'
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className={labelCls}>{en ? 'Kidney function (eGFR, mL/min)' : 'การทำงานของไต (eGFR, มล./นาที)'}</span>
            <div className="grid grid-cols-3 gap-1.5">
              {renalOptions.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setRenalStatus(o.id)}
                  aria-pressed={renalStatus === o.id}
                  className={`min-h-[44px] px-1 py-1.5 rounded-lg text-xs font-bold border text-center transition-all cursor-pointer ${renalStatus === o.id ? o.on : o.off}`}
                >
                  <span className="block leading-tight">{en ? o.en : o.th}</span>
                  <span className="block text-[10px] font-normal">{o.range}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Result */}
        <div ref={resultRef} className={`lg:col-span-5 ${cardCls} p-3.5 md:p-5 space-y-3`} data-result>
          <div>
            <span className={labelCls}>{en ? 'Equianalgesic dose' : 'ขนาดยาเทียบเคียง'}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-300">
                {belowPatchRange ? 'N/A' : roundedTargetDose}
              </span>
              <span className="text-lg font-bold text-slate-500 dark:text-slate-400">
                {belowPatchRange ? '' : targetDrug.unit}
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5">{shortName(targetDrug)}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{whyLine}</p>
            {practicalLine && (
              <p className={`text-xs font-bold mt-1.5 ${practical && practical.amount === 0 ? 'text-amber-700 dark:text-amber-400' : 'text-slate-800 dark:text-slate-100'}`}>{practicalLine}</p>
            )}
          </div>

          <div className="flex justify-between gap-3 text-xs pt-2 border-t border-slate-200 dark:border-[#263449]">
            <span className="text-amber-700 dark:text-amber-400 font-semibold">
              {en ? 'Breakthrough (PRN), morphine IR PO' : 'ยาแก้ปวดฉับพลัน (PRN) มอร์ฟีน IR กิน'}
            </span>
            <span className="font-bold text-amber-700 dark:text-amber-400 shrink-0">
              {breakthroughOmeMin} - {breakthroughOmeMax} mg
            </span>
          </div>
          {renalStatus !== 'normal' && (
            <p className="text-[11px] leading-snug text-amber-800 dark:text-amber-300 -mt-1.5">
              {en
                ? 'Thai CPG advises against morphine in kidney disease; if it is used, monitor closely for overdose.'
                : 'CPG ไม่แนะนำให้ใช้มอร์ฟีนในผู้ป่วยโรคไต หากจำเป็นต้องใช้ ให้เฝ้าระวังอาการจากยาเกินขนาดอย่างเคร่งครัด'}
            </p>
          )}

          {belowPatchRange && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>
                {en
                  ? 'Below Thai CPG Table 9.1.3 range (< 20 mg oral morphine/day): fentanyl patch is not indicated at this dose.'
                  : 'ต่ำกว่าช่วงตาราง 9.1.3 ของ CPG (< 20 มก. มอร์ฟีนกิน/วัน): ไม่ควรใช้แผ่นแปะเฟนตานิลที่ขนาดนี้'}
              </span>
            </div>
          )}

          {((targetDrug.id.startsWith('tramadol') && roundedTargetDose > 400) || (targetDrug.id === 'codeine_oral' && roundedTargetDose > 240)) && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>
                {targetDrug.id === 'codeine_oral'
                  ? (en ? 'Above the codeine maximum (240 mg/day): use a strong opioid instead.' : 'เกินขนาดสูงสุดของ codeine (240 มก./วัน): ใช้โอปิออยด์ชนิดแรงแทน')
                  : (en ? 'Above the tramadol maximum (400 mg/day): use a strong opioid instead.' : 'เกินขนาดสูงสุดของ tramadol (400 มก./วัน): ใช้โอปิออยด์ชนิดแรงแทน')}
              </span>
            </div>
          )}

          {renalStatus === 'moderate' && targetDrug.renalSafety !== 'safe' && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>
                {en
                  ? 'eGFR 30-59: metabolites may accumulate. Start at the lower end, monitor sedation and respiratory rate, extend the interval if drowsy.'
                  : 'eGFR 30-59: เมแทบอไลต์อาจสะสม เริ่มขนาดต่ำ เฝ้าระวังอาการง่วงซึมและอัตราการหายใจ ขยายช่วงเวลาให้ยาหากซึม'}
              </span>
            </div>
          )}

          {renalStatus === 'severe' && targetDrug.renalSafety !== 'safe' && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-rose-800 dark:text-rose-300">
                  {en ? 'Renal Warning (eGFR < 30):' : 'คำเตือนความปลอดภัยในผู้ป่วยไตวาย:'}
                </span>
                <p className="mt-0.5 leading-relaxed">{en ? targetDrug.renalNoteEn : targetDrug.renalNoteTh}</p>
              </div>
            </div>
          )}

          {renalStatus === 'severe' && targetDrug.renalSafety === 'safe' && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>
                {en ? 'Fentanyl is the drug of choice in severe renal impairment.' : 'Fentanyl เป็นยาโอปิออยด์ที่ปลอดภัยที่สุดในภาวะไตวายรุนแรง'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Details, only when opened */}
      <Fold title={`${en ? 'About' : 'รายละเอียด'}: ${shortName(targetDrug)}`} icon={<Pill className="w-4 h-4" />}>
        <div className="space-y-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">{en ? targetDrug.nameEn : targetDrug.nameTh}</p>
          <div>
            <span className={labelCls}>{en ? 'Available as' : 'รูปแบบยา'}</span>
            <div className="flex flex-wrap gap-1">
              {(en ? targetDrug.formulationsEn : targetDrug.formulationsTh).map((f) => (
                <span key={f} className="text-[11px] font-semibold px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#263449] bg-slate-50 dark:bg-[#101a2b]">{f}</span>
              ))}
            </div>
          </div>
          <div>
            <span className={labelCls}>{en ? 'How to give' : 'วิธีให้ยา'}</span>
            <p>{en ? targetDrug.frequencyEn : targetDrug.frequencyTh}</p>
          </div>
          <div>
            <span className={labelCls}>{en ? 'Notes' : 'ข้อควรทราบ'}</span>
            <p className="leading-relaxed">{en ? targetDrug.notesEn : targetDrug.notesTh}</p>
          </div>
          <div>
            <span className={labelCls}>{en ? 'Kidney' : 'ไต'}</span>
            <p className="leading-relaxed">{en ? targetDrug.renalNoteEn : targetDrug.renalNoteTh}</p>
          </div>
          {CPG_SOURCES[targetDrug.id] && (
            <p className="pt-2 border-t border-slate-200 dark:border-[#263449] text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-bold">{en ? 'Source:' : 'แหล่งที่มา:'}</span>{' '}
              {CPG_SOURCES[targetDrug.id].none ? '' : en ? 'Thai DMS palliative care CPG 2020, ' : 'CPG การดูแลผู้ป่วยแบบประคับประคองและระยะท้าย กรมการแพทย์ 2563 '}
              {en ? CPG_SOURCES[targetDrug.id].en : CPG_SOURCES[targetDrug.id].th}
            </p>
          )}
        </div>
      </Fold>

      <Fold
        title={en ? 'Prescription draft' : 'ร่างคำสั่งแพทย์ (Rx)'}
        icon={<FileText className="w-4 h-4" />}
        right={
          <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={handlePrintRx}
            aria-label={en ? 'Print prescription draft' : 'พิมพ์ร่างคำสั่งแพทย์'}
            title={en ? 'Print' : 'พิมพ์'}
            className="w-9 min-h-[36px] flex items-center justify-center rounded-md bg-white dark:bg-[#101a2b] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1b2740] border border-slate-200 dark:border-[#263449] cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopyRx}
            className="min-h-[36px] flex items-center gap-1 text-xs font-semibold px-2.5 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 transition-colors cursor-pointer"
          >
            {copiedRx ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>{en ? 'Copied' : 'คัดลอกแล้ว'}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{en ? 'Copy' : 'คัดลอก'}</span>
              </>
            )}
          </button>
          </div>
        }
      >
        <pre className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#101a2b] text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-[#263449] font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
          {generatePrescriptionText()}
        </pre>
      </Fold>

      <Fold title={en ? 'Thai CPG Table 9.1.3: fentanyl patch' : 'ตาราง 9.1.3 CPG: แผ่นแปะเฟนตานิล'} icon={<Table className="w-4 h-4" />}>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          {en ? 'Oral morphine per day to patch strength. Source: Thai DMS palliative care CPG 2020, Table 9.1.3, p. 94.' : 'ขนาดมอร์ฟีนกินต่อวันเทียบเป็นแผ่นแปะ แหล่งที่มา: CPG การดูแลผู้ป่วยแบบประคับประคองและระยะท้าย กรมการแพทย์ 2563 ตาราง 9.1.3 หน้า 93-94'}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-[#263449] rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-[#101a2b] text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-[#263449]">
              <tr>
                <th className="p-3 w-1/2">{en ? 'Oral morphine / day' : 'มอร์ฟีนกิน / วัน'}</th>
                <th className="p-3 w-1/2 text-indigo-700 dark:text-indigo-300">{en ? 'Fentanyl patch' : 'แผ่นแปะเฟนตานิล'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-[#263449] text-slate-700 dark:text-slate-300">
              {THAI_CPG_FENTANYL_TABLE.map((row, idx) => {
                const isMatched = !belowPatchRange && row === matchedRow;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isMatched
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 font-bold text-indigo-950 dark:text-indigo-200'
                        : 'hover:bg-slate-50 dark:hover:bg-[#1b2740]'
                    }`}
                  >
                    <td className="p-3">
                      <span className="inline-flex items-center gap-2">
                        {isMatched && <span className="w-2 h-2 rounded-full bg-indigo-500" />}
                        {row.oralMorphineRange}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 font-bold">
                        {row.patchDoseMcgHr} mcg/hr
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Fold>

      <Fold title={en ? 'Conversion tips' : 'ข้อควรปฏิบัติในการเปลี่ยนยา'} icon={<Info className="w-4 h-4" />}>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              {en
                ? <><strong>Oral to parenteral:</strong> 3 mg oral morphine = 1 mg IV/SC morphine (3:1). SC is preferred over IV for comfort and to avoid phlebitis. (CPG p. 93)</>
                : <><strong>กินเทียบฉีด:</strong> มอร์ฟีนกิน 3 มก. = มอร์ฟีน IV/SC 1 มก. (3:1) แนะนำฉีดใต้ผิวหนังมากกว่า IV เพื่อความสบายและลดหลอดเลือดดำอักเสบ (CPG หน้า 93)</>}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              {en
                ? <><strong>Fentanyl patch timing:</strong> takes 12-24 hours to reach effective levels. Continue the previous opioid for the first 12-24 hours after the first patch.</>
                : <><strong>แผ่นแปะเฟนตานิล:</strong> ใช้เวลา 12-24 ชม. จึงออกฤทธิ์เต็มที่ ให้ยาเดิมต่ออีก 12-24 ชม. หลังแปะแผ่นแรก</>}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              {en
                ? <><strong>Breakthrough dose:</strong> always prescribe fast-acting immediate-release morphine, 10-15% of the new daily dose (oral morphine equivalent, after reduction). The CPG gives 5-20% as usual (p. 93).</>
                : <><strong>ยาแก้ปวดฉับพลัน:</strong> สั่งมอร์ฟีนชนิดออกฤทธิ์เร็วเสมอ ขนาด 10-15% ของขนาดยาต่อวันใหม่ (OME หลังลดขนาด) CPG ระบุว่าโดยทั่วไป 5-20% (หน้า 93)</>}
            </span>
          </li>
        </ul>
      </Fold>

      {/* Phone: sticky result bar while the result card is scrolled out of view */}
      {!resultVisible && (
        <button
          type="button"
          onClick={() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
          className="lg:hidden fixed bottom-0 inset-x-0 z-30 min-h-[48px] px-4 pb-[env(safe-area-inset-bottom)] flex items-center justify-between gap-3 bg-white/95 dark:bg-[#151f32]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#263449] shadow-sm cursor-pointer text-left print:hidden"
          aria-label={en ? 'Show result' : 'ดูผลลัพธ์'}
        >
          <span className="min-w-0 truncate text-xs font-semibold text-slate-600 dark:text-slate-300">&rarr; {shortName(targetDrug)}</span>
          <span className="shrink-0 text-base font-extrabold text-indigo-600 dark:text-indigo-300">{resultText}</span>
          <span className="shrink-0 text-[11px] font-bold text-amber-700 dark:text-amber-400">PRN {breakthroughOmeMin}-{breakthroughOmeMax}</span>
        </button>
      )}
    </div>
  );
};
