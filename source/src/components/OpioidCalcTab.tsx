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

// IV/SC fentanyl for patients already on opioids: the Thai CPG Table 9.1.3 patch band for the oral morphine
// equivalent, given as the same mcg/h by infusion (x24 = mcg/day). Below the table (< 20 mg OME/day) it falls back
// to 100 : 1 (100 mcg IV fentanyl = 10 mg IV morphine = 30 mg oral morphine).
const fentIvPerDayFromOme = (ome: number) => {
  if (ome < THAI_CPG_FENTANYL_TABLE[0].minOralMorphine) return Math.round((ome / 0.3) * 10) / 10;
  const row = THAI_CPG_FENTANYL_TABLE.find((r) => ome <= r.maxOralMorphine);
  const perHour = row ? row.patchDoseMcgHr : Math.round(ome / 2.4 / 25) * 25;
  return perHour * 24;
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
  fentanyl_parenteral: { en: 'Table 9.1.3, p. 94: the patch band for the oral morphine equivalent, given as the same mcg/h by IV/SC infusion (x24 = mcg/day). This 1 : 1 patch-to-infusion step is not stated in the CPG. Below the table (< 20 mg oral morphine/day) the app uses 100 : 1 (100 mcg IV fentanyl = 10 mg IV morphine; University of Toronto equianalgesic table 2014; ClinCalc), the usual ratio for opioid-naive or single doses.', th: 'ตาราง 9.1.3 หน้า 94: ใช้ช่วงแผ่นแปะตาม morphine กินเทียบเคียง แล้วให้เป็นอัตราหยด IV/SC mcg/ชม. เท่ากัน (x24 = mcg/วัน) ขั้นตอนแผ่นแปะเท่ากับอัตราหยด 1 : 1 ไม่ได้ระบุใน CPG ต่ำกว่าตาราง (< 20 มก. morphine กิน/วัน) แอปใช้ 100 : 1 (fentanyl IV 100 มคก. = morphine IV 10 มก.; ตาราง equianalgesic ม.โตรอนโต 2014; ClinCalc) ซึ่งเป็นอัตราส่วนที่ใช้กับผู้ไม่เคยได้ยาหรือการให้ครั้งเดียว' },
  tramadol_oral: { en: 'p. 91: 10 times weaker than morphine, max 400 mg/day (300 in the elderly). Ratio 10 : 1 (used for the main result): this CPG p. 91; Lancashire & South Cumbria Palliative Care Prescribing Guidelines 2014. Ratio 5 : 1 (some trials 4 : 1): randomised trials cited in the Palliative Care Formulary, summarised by Our Lady\'s Hospice, Dublin, 2017; the same summary gives 6-10 : 1 from the product information.', th: 'หน้า 91: ฤทธิ์น้อยกว่า morphine ประมาณ 10 เท่า สูงสุด 400 มก./วัน (ผู้สูงอายุ 300) อัตราส่วน 10 : 1 (ใช้เป็นผลหลัก): CPG นี้หน้า 91; Lancashire & South Cumbria Palliative Care Prescribing Guidelines 2014 อัตราส่วน 5 : 1 (บางการศึกษา 4 : 1): การศึกษาแบบสุ่มที่อ้างใน Palliative Care Formulary สรุปโดย Our Lady\'s Hospice ดับลิน 2017 ซึ่งระบุ 6-10 : 1 จากเอกสารกำกับยาด้วย' },
  tramadol_parenteral: { en: 'not from the Thai CPG. The IV factor is set equal to oral, so the same 5-10 : 1 range applies (10 : 1: Thai CPG p. 91 and Lancashire & South Cumbria 2014; 5 : 1: trials cited in the Palliative Care Formulary, via Our Lady\'s Hospice, 2017). The Palliative Care Formulary gives parenteral 1 : 10. Low-quality evidence.', th: 'ไม่ได้มาจาก CPG ไทย: ตั้งค่ายาฉีดเท่ากับยากิน จึงใช้ช่วง 5-10 : 1 เดียวกัน (10 : 1: CPG ไทยหน้า 91 และ Lancashire & South Cumbria 2014; 5 : 1: การศึกษาที่อ้างใน Palliative Care Formulary ผ่าน Our Lady\'s Hospice 2017) Palliative Care Formulary ระบุยาฉีด 1 : 10 หลักฐานคุณภาพต่ำ', none: true },
  oxycodone_oral: { en: 'p. 94: CR 10 and 40 mg only, 1.5-2 times morphine', th: 'หน้า 94: ชนิด CR 10 และ 40 มก. เท่านั้น แรงกว่า morphine 1.5-2 เท่า' },
  codeine_oral: { en: 'p. 91: 10 times weaker than morphine, max 240 mg/day (Table 6.1.3, p. 52, lists 240-360)', th: 'หน้า 91: ฤทธิ์น้อยกว่า morphine ประมาณ 10 เท่า สูงสุด 240 มก./วัน (ตาราง 6.1.3 หน้า 52 ระบุ 240-360)' }
};

// Short names for dropdowns, result and the sticky bar (long names stay in the details fold)
const SHORT_NAMES: Record<string, { en: string; th: string }> = {
  morphine_oral: { en: 'Morphine oral (IR)', th: 'Morphine กิน (IR)' },
  kapanol: { en: 'Kapanol (SR 24 h)', th: 'Kapanol (24 ชม.)' },
  mst_continus: { en: 'MST Continus (CR 12 h)', th: 'MST Continus (12 ชม.)' },
  morphine_parenteral: { en: 'Morphine IV/SC', th: 'Morphine ฉีด IV/SC' },
  fentanyl_patch: { en: 'Fentanyl patch', th: 'แผ่นแปะ fentanyl' },
  fentanyl_parenteral: { en: 'Fentanyl IV/SC', th: 'Fentanyl ฉีด IV/SC' },
  tramadol_oral: { en: 'Tramadol oral', th: 'Tramadol กิน' },
  tramadol_parenteral: { en: 'Tramadol IV/SC', th: 'Tramadol ฉีด IV/SC' },
  oxycodone_oral: { en: 'Oxycodone CR (12 h)', th: 'Oxycodone CR (12 ชม.)' },
  codeine_oral: { en: 'Codeine oral', th: 'Codeine กิน' }
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
  const [naive, setNaive] = useState<boolean>(false); // morphine-naive: show a starting plan instead of a conversion
  const [naiveIr, setNaiveIr] = useState<number>(0); // morphine IR taken in the first 24 h
  const [weightKg, setWeightKg] = useState<number>(0); // optional, for the SC/IV start dose; never remembered
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
    setNaive(false);
    setNaiveIr(0);
    setWeightKg(0);
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
  const fentIvBelow = targetDrug.id === 'fentanyl_parenteral' && targetOme < THAI_CPG_FENTANYL_TABLE[0].minOralMorphine;
  if (targetDrug.id === 'fentanyl_patch') {
    if (belowPatchRange) {
      calculatedTargetDose = 0;
    } else if (matchedRow) {
      calculatedTargetDose = matchedRow.patchDoseMcgHr;
    } else {
      // Linear approximation for very high doses
      calculatedTargetDose = Math.round(targetOme / 2.4 / 25) * 25;
    }
  } else if (targetDrug.id === 'fentanyl_parenteral') {
    calculatedTargetDose = fentIvPerDayFromOme(targetOme);
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
  // IV/SC targets: rescue is SC morphine, oral dose ÷ 3 (CPG p. 93)
  const prnSc = targetDrug.route === 'iv_sc';
  const prnMin = prnSc ? Math.round(((targetOme * 0.1) / 3) * 10) / 10 : breakthroughOmeMin;
  const prnMax = prnSc ? Math.round(((targetOme * 0.15) / 3) * 10) / 10 : breakthroughOmeMax;
  // Kidney disease: CPG p. 91 advises against morphine, so the rescue is fentanyl SC at the single-dose ratio 100 : 1
  // (100 mcg = 10 mg IV morphine = 30 mg oral, i.e. mcg = oral mg / 0.3)
  const prnFent = renalStatus !== 'normal';
  const prnFentMin = Math.round(((targetOme * 0.1) / 0.3) * 10) / 10;
  const prnFentMax = Math.round(((targetOme * 0.15) / 0.3) * 10) / 10;

  // One-line "why this dose": OME -> reduction -> (CPG band) -> result
  const r1 = (n: number) => Math.round(n * 10) / 10;
  const whyLine =
    (omeParts.length > 1 ? `${omeParts.map(r1).join(' + ')} = ` : '') +
    `${r1(ome24h)} OME` +
    (crossTolerancePercent ? ` −${crossTolerancePercent}% = ${r1(targetOme)} OME` : '') +
    (((targetDrug.id === 'fentanyl_patch' && !belowPatchRange) || (targetDrug.id === 'fentanyl_parenteral' && !fentIvBelow)) && matchedRow ? ` → CPG ${matchedRow.oralMorphineRange.replace(' mg/day', '')}` : '');

  // Tramadol: published ratios vary (about 5-10 : 1). The main result stays at 10 : 1 (Thai CPG p. 91); this is the other end.
  const isTram = (id: string) => id.startsWith('tramadol');
  const doseForOme = (ome: number) => {
    if (targetDrug.id === 'fentanyl_parenteral') return fentIvPerDayFromOme(ome);
    if (targetDrug.id === 'fentanyl_patch') {
      if (ome < THAI_CPG_FENTANYL_TABLE[0].minOralMorphine) return 0;
      const row = THAI_CPG_FENTANYL_TABLE.find((r) => ome <= r.maxOralMorphine);
      return row ? row.patchDoseMcgHr : Math.round(ome / 2.4 / 25) * 25;
    }
    return r1(ome * targetDrug.factorFromOralMorphine);
  };
  const tramRange: { lo: number; hi: number } | null = (() => {
    if (sources.length !== 1 || isTram(sources[0].id) === isTram(targetDrug.id)) return null;
    if (isTram(targetDrug.id)) return { lo: r1(targetOme * 5), hi: r1(targetOme * 10) };
    const dose = sources[0].dose || 0;
    const a = doseForOme(dose * 0.1 * reductionFactor);
    const b = doseForOme(dose * 0.2 * reductionFactor);
    return { lo: Math.min(a, b), hi: Math.max(a, b) };
  })();
  const tramRangeText = tramRange
    ? `${tramRange.lo === 0 ? 'N/A' : tramRange.lo}-${tramRange.hi === 0 ? 'N/A' : tramRange.hi} ${targetDrug.unit}`
    : '';

  // IV/SC fentanyl result explained as an infusion rate
  const fentIvLine = targetDrug.id !== 'fentanyl_parenteral'
    ? ''
    : fentIvBelow
      ? (en ? `Below Table 9.1.3 (< 20 mg OME/day): 100 : 1 ratio used, about ${r1(roundedTargetDose / 24)} mcg/h` : `ต่ำกว่าตาราง 9.1.3 (< 20 มก. OME/วัน): ใช้อัตราส่วน 100 : 1 ประมาณ ${r1(roundedTargetDose / 24)} mcg/ชม.`)
      : (en ? `= ${r1(roundedTargetDose / 24)} mcg/h by IV/SC infusion (patch band, same mcg/h)` : `= ${r1(roundedTargetDose / 24)} mcg/ชม. หยด IV/SC (ช่วงแผ่นแปะ ใช้ mcg/ชม. เท่ากัน)`);

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
      ? (en ? `Below the smallest strength (${practical.min} mg per dose): use immediate-release morphine` : `ต่ำกว่าขนาดเม็ดเล็กสุด (${practical.min} มก. ต่อครั้ง): ใช้ morphine ชนิด IR แทน`)
      : (en
          ? `Give ${practical.amount} mg ${practical.perDay === 1 ? 'once daily' : `every ${everyH} h`} (${practical.parts}) = ${practicalDaily} mg/day`
          : `ให้ ${practical.amount} มก. ${practical.perDay === 1 ? 'วันละครั้ง' : `ทุก ${everyH} ชม.`} (${practical.parts}) = ${practicalDaily} มก./วัน`);

  // Morphine-naive start (Thai CPG p. 91-93): IR morphine 5-10 mg, then after 24 h convert the total to a long-acting form
  const naiveTotal = Math.max(0, naiveIr || 0);
  const mstPlan = naiveTotal > 0 ? makeUp(naiveTotal / 2, PRODUCTS.mst_continus.strengths) : null;
  const kapPlan = naiveTotal > 0 ? makeUp(naiveTotal, PRODUCTS.kapanol.strengths) : null;
  const naiveRescueMin = r1(naiveTotal * 0.05);
  const naiveRescueMax = r1(naiveTotal * 0.2);
  // Naive SC/IV start (Davis's Drug Guide): under 50 kg 0.05-0.2 mg/kg (max 15 mg a dose), 50 kg or more 4-10 mg; NCCN 2-5 mg IV
  const ivLow = weightKg > 0 && weightKg < 50;
  const ivDavis = weightKg > 0 ? (ivLow ? { lo: r1(weightKg * 0.05), hi: Math.min(15, r1(weightKg * 0.2)) } : { lo: 4, hi: 10 }) : null;
  const ivRxLine = `\n2. If severe pain needs SC/IV: Morphine Injection (10 mg/mL) ${ivDavis ? `${ivDavis.lo}-${ivDavis.hi} mg` : '4-10 mg (50 kg or more) or 0.05-0.2 mg/kg (under 50 kg, max 15 mg)'} SC/IV every 3-4 hours\n   (Davis's Drug Guide${weightKg > 0 ? `, ${weightKg} kg` : ''}; NCCN: 2-5 mg IV). Do not give IM.`;
  const aboutDrug = naive ? drugOf('morphine_oral') : targetDrug;
  const mstLine = mstPlan ? (mstPlan.amount > 0 ? `${mstPlan.amount} mg every 12 h (${mstPlan.parts})` : null) : null;
  const kapLine = kapPlan ? (kapPlan.amount > 0 ? `${kapPlan.amount} mg once daily (${kapPlan.parts})` : null) : null;

  const generateNaiveRx = () => {
    let t = '1. Morphine IR (tablet 10 mg or syrup 2 mg/mL) 5-10 mg PO\n   May repeat every 2-4 hours while pain is moderate or worse. Record every dose.\n   Review after 24 hours, then convert the total to a long-acting form.' + ivRxLine + '\n3. Senna (7.5 mg) 2-4 tablets PO at bedtime daily (Laxative co-prescription).';
    if (renalStatus !== 'normal') t += '\n   NOTE: Thai CPG advises against morphine in kidney disease; if used, monitor closely for overdose.';
    if (naiveTotal > 0) {
      t += `\n\nAfter 24 hours: morphine IR taken = ${naiveTotal} mg`;
      t += `\n- MST Continus: ${mstLine ?? 'below the smallest strength (10 mg per dose), continue immediate-release morphine'}`;
      t += `\n- or Kapanol: ${kapLine ?? 'below the smallest strength (20 mg), continue immediate-release morphine'}`;
      t += `\n- with morphine IR ${naiveRescueMin}-${naiveRescueMax} mg (5-20% of the daily dose) PO every 2-4 hours PRN for moderate or worse pain.`;
    }
    return t;
  };

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
    if (naive) return generateNaiveRx();
    let regularRx = '';
    let breakthroughRx = '';
    const roundNote = practical && practical.amount > 0 && practicalDaily < r1(roundedTargetDose)
      ? `\n   (Calculated ${r1(roundedTargetDose)} mg/day, rounded down to available strengths).`
      : '';

    if (belowPatchRange) {
      regularRx = `1. Fentanyl patch not indicated: ${Math.round(targetOme * 10) / 10} mg OME/day is below the CPG minimum (20 mg/day).\n   Use a low-dose oral/SC opioid instead.`;
    } else if (targetDrug.id === 'fentanyl_patch') {
      regularRx = `1. Fentanyl Transdermal Patch ${roundedTargetDose} mcg/hr\n   Apply 1 patch transdermally every 72 hours (3 days).\n   (Keep the previous opioid for 24 hours after the first patch, CPG p. 93).`;
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
   ${r1(roundedTargetDose / 24)} mcg/hr continuous SC/IV infusion (${roundedTargetDose} mcg/day).
   (${fentIvBelow ? 'Below CPG Table 9.1.3: 100 : 1 ratio used.' : 'Patch-table method: CPG Table 9.1.3 band given as the same mcg/hr infusion.'})`;
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

    if (tramRange) regularRx += `\n   Published tramadol ratios range 5-10 : 1, giving ${tramRangeText}.`;
    breakthroughRx = `${prnFent ? `2. Fentanyl Injection (50 mcg/mL) ${prnFentMin} - ${prnFentMax} mcg SC PRN for breakthrough pain.\n   Kidney disease: morphine avoided (CPG p. 91); 100 : 1 ratio. How often: per local protocol.` : prnSc ? `2. Morphine Injection (10 mg/mL) ${prnMin} - ${prnMax} mg\n   Give SC every 2-4 hours PRN for breakthrough pain (oral dose ÷ 3, CPG p. 93).` : `2. Morphine IR Oral (Syrup or Tablet) ${breakthroughOmeMin} - ${breakthroughOmeMax} mg\n   Take PO every 2-4 hours PRN for breakthrough pain. (Max 4-6 doses/day).`}\n3. Senna (7.5 mg) 2-4 tablets PO at bedtime daily (Laxative co-prescription).${renalStatus !== 'normal' ? '\n   NOTE: Thai CPG advises against morphine in kidney disease; if used, monitor closely for overdose.' : ''}`;

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
      const head = naive ? `Opioid start draft (morphine-naive) - ${new Date().toLocaleDateString()}\nKidney (eGFR): ${renalStatus}\n` : `Opioid conversion draft - ${new Date().toLocaleDateString()}\nFrom: ${sources.map((s) => `${drugOf(s.id).nameEn} ${s.dose} ${drugOf(s.id).unit}`).join(' + ')}\nCalculation: ${whyLine}\nKidney (eGFR): ${renalStatus}\n`;
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
  const rawRatio = (fentIvBelow ? 0.3 : targetDrug.factorToOralMorphine) / fromFirst.factorToOralMorphine; // below the table IV fentanyl uses 100 : 1
  const fmtN = (n: number) => String(Math.round(n * 100) / 100);
  const ratioApprox = ['fentanyl_patch', 'fentanyl_parenteral'].includes(fromFirst.id) || ['fentanyl_patch', 'fentanyl_parenteral'].includes(targetDrug.id) ? '≈ ' : '';
  // Tramadol's side of the pill shows its 5-10 : 1 range (other end computed with 0.2 instead of 0.1)
  const tramInPill = isTram(fromFirst.id) !== isTram(targetDrug.id);
  const altRatio = tramInPill
    ? (isTram(targetDrug.id) ? 0.2 : targetDrug.factorToOralMorphine) / (isTram(fromFirst.id) ? 0.2 : fromFirst.factorToOralMorphine)
    : rawRatio;
  const side = (x: number, y: number) => (Math.abs(x - y) < 1e-9 ? fmtN(x) : `${fmtN(Math.min(x, y))}-${fmtN(Math.max(x, y))}`);
  const ratioText = sources.length > 1
    ? ''
    : ratioApprox + (rawRatio >= 1 && altRatio >= 1
      ? `${side(rawRatio, altRatio)} ${fromFirst.unit} : 1 ${targetDrug.unit}`
      : rawRatio < 1 && altRatio < 1
        ? `1 ${fromFirst.unit} : ${side(1 / rawRatio, 1 / altRatio)} ${targetDrug.unit}`
        : rawRatio >= 1
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
              {en ? 'Palliative Opioid Calculator' : 'เครื่องคำนวณโอปิออยด์ประคับประคอง'}
            </h2>
            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {en
                ? 'Convert between opioids with cross-tolerance reduction and renal checks (fentanyl patch per Thai CPG Table 9.1.3).'
                : 'แปลงขนาดยาโอปิออยด์ พร้อมลดขนาดตามการดื้อยาข้ามตัวและเตือนเมื่อไตเสื่อม (แผ่นแปะ fentanyl ตามตาราง 9.1.3 CPG)'}
            </p>
          </div>
        </div>
      )}

      {/* Inputs + result: side by side on desktop, result right under the inputs on phones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start">
        {/* Inputs */}
        <div className={`lg:col-span-7 ${cardCls} p-3.5 md:p-5 space-y-3`}>
          {/* Naive or not: naive patients get a starting plan instead of a conversion */}
          <div className="flex items-center gap-2">
            <div role="group" aria-label={en ? 'Opioid history' : 'ประวัติการได้รับโอปิออยด์'} className="flex-1 min-w-0 grid grid-cols-2 gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#101a2b] border border-slate-200 dark:border-[#263449]">
              {([[false, en ? 'Not naive' : 'เคยได้ยาแล้ว', en ? 'convert' : 'แปลงยา'], [true, en ? 'Morphine-naive' : 'ไม่เคยได้ morphine', en ? 'start' : 'เริ่มยา']] as [boolean, string, string][]).map(([val, label, sub]) => (
                <button
                  key={String(val)}
                  type="button"
                  onClick={() => setNaive(val)}
                  aria-pressed={naive === val}
                  className={`min-h-[44px] px-1 rounded-lg text-xs font-bold text-center leading-tight transition-all cursor-pointer ${naive === val ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-[#1b2740]'}`}
                >
                  <span className="block">{label}</span>
                  <span className={`block text-[10px] font-normal ${naive === val ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>{sub}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-[44px] px-2 flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{en ? 'Reset' : 'ล้างค่า'}</span>
            </button>
          </div>

          {naive && (
            <div className="space-y-1.5">
              <label htmlFor="op-naive-ir" className={labelCls}>{en ? 'Morphine IR taken in the last 24 h (optional)' : 'Morphine IR ที่ใช้ใน 24 ชม. ที่ผ่านมา (ถ้ามี)'}</label>
              <div className="relative w-full min-[420px]:w-44">
                <input
                  id="op-naive-ir"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  value={naiveIr}
                  onChange={(e) => setNaiveIr(Math.max(0, parseFloat(e.target.value) || 0))}
                  className={`${fieldCls} font-bold pr-14`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 dark:text-slate-400 font-semibold pointer-events-none">mg/day</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {en ? 'Start with 5-10 mg. After the first 24 h, enter the total to get the long-acting dose (CPG p. 91-93).' : 'เริ่ม 5-10 มก. หลังผ่านไป 24 ชม. ใส่ยอดรวมเพื่อดูขนาดยาออกฤทธิ์ยาว (CPG หน้า 91-93)'}
              </p>
              <label htmlFor="op-weight" className={`${labelCls} pt-1`}>{en ? 'Body weight (optional, for the SC/IV dose)' : 'น้ำหนักตัว (ถ้ามี สำหรับขนาดยา SC/IV)'}</label>
              <div className="relative w-full min-[420px]:w-44">
                <input
                  id="op-weight"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="1"
                  value={weightKg || ''}
                  onChange={(e) => setWeightKg(Math.max(0, parseFloat(e.target.value) || 0))}
                  className={`${fieldCls} font-bold pr-10`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-500 dark:text-slate-400 font-semibold pointer-events-none">kg</span>
              </div>
            </div>
          )}

          {!naive && (<>
          <div className="space-y-2">
            <span className={labelCls}>{en ? 'From (current opioid)' : 'จาก (ยาที่ใช้อยู่)'}</span>
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

          </>)}

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
          {naive ? (<>
            <div>
              <span className={labelCls}>{en ? 'Starting dose (morphine-naive)' : 'ขนาดเริ่มต้น (ไม่เคยได้ morphine)'}</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold text-indigo-600 dark:text-indigo-300">5-10</span>
                <span className="text-lg font-bold text-slate-500 dark:text-slate-400">mg PO</span>
              </div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-0.5">{en ? 'Morphine IR (tablet 10 mg, syrup 2 mg/mL)' : 'Morphine IR (เม็ด 10 มก. น้ำเชื่อม 2 มก./มล.)'}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{en ? 'Repeat every 2-4 h while pain is moderate or worse' : 'ให้ซ้ำได้ทุก 2-4 ชม. ถ้ายังปวดปานกลางขึ้นไป'}</p>
            </div>

            {naiveTotal > 0 && (
              <div className="pt-2 border-t border-slate-200 dark:border-[#263449] space-y-1.5 text-xs text-slate-800 dark:text-slate-100">
                <span className={labelCls}>{en ? `After 24 h: ${naiveTotal} mg morphine IR` : `หลัง 24 ชม.: Morphine IR ${naiveTotal} มก.`}</span>
                <p><span className="font-bold">MST Continus:</span> {mstLine ? (en ? mstLine : `${mstPlan!.amount} มก. ทุก 12 ชม. (${mstPlan!.parts})`) : (en ? 'below the smallest strength (10 mg per dose), continue IR' : 'ต่ำกว่าขนาดเม็ดเล็กสุด (10 มก. ต่อครั้ง) ให้ IR ต่อ')}</p>
                <p><span className="font-bold">Kapanol:</span> {kapLine ? (en ? kapLine : `${kapPlan!.amount} มก. วันละครั้ง (${kapPlan!.parts})`) : (en ? 'below the smallest strength (20 mg), continue IR' : 'ต่ำกว่าขนาดเม็ดเล็กสุด (20 มก.) ให้ IR ต่อ')}</p>
                <p className="text-amber-700 dark:text-amber-400 font-semibold">{en ? `Rescue morphine IR: ${naiveRescueMin}-${naiveRescueMax} mg (5-20%) every 2-4 h` : `ยา IR ฉุกเฉิน: ${naiveRescueMin}-${naiveRescueMax} มก. (5-20%) ทุก 2-4 ชม.`}</p>
              </div>
            )}

            {renalStatus !== 'normal' && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>{en ? 'Thai CPG advises against morphine in kidney disease; if it is used, monitor closely for overdose.' : 'CPG ไม่แนะนำให้ใช้ morphine ในผู้ป่วยโรคไต หากจำเป็นต้องใช้ ให้เฝ้าระวังอาการจากยาเกินขนาดอย่างเคร่งครัด'}</span>
              </div>
            )}

            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>{en ? 'Not for first-line titration: the fentanyl patch takes 12-24 h to act and is for patients already stable on another opioid (CPG p. 93).' : 'ไม่ใช้เป็นอันดับแรกในการปรับยา: แผ่นแปะ fentanyl ออกฤทธิ์ช้า 12-24 ชม. ใช้เมื่อปวดคงที่ด้วยโอปิออยด์ตัวอื่นแล้ว (CPG หน้า 93)'}</span>
            </div>

            {/* Severe pain needing SC/IV: Davis and NCCN doses (the CPG's 0.5-1 mg/kg on p. 91 is about 10 times these, so it is not used) */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#101a2b] border border-slate-200 dark:border-[#263449] text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-slate-800 dark:text-slate-100">{en ? 'Severe pain needing SC/IV morphine' : 'ปวดรุนแรงต้องใช้ morphine SC/IV'}</p>
              <ul className="list-disc pl-4 space-y-0.5">
                <li>{en ? 'NCCN: 2-5 mg IV' : 'NCCN: 2-5 มก. IV'}</li>
                <li>{ivDavis
                  ? (en
                      ? `Davis's Drug Guide for ${weightKg} kg: ${ivDavis.lo}-${ivDavis.hi} mg IV/SC every 3-4 h${ivLow ? ' (0.05-0.2 mg/kg, max 15 mg a dose)' : ''}`
                      : `Davis's Drug Guide สำหรับ ${weightKg} กก.: ${ivDavis.lo}-${ivDavis.hi} มก. IV/SC ทุก 3-4 ชม.${ivLow ? ' (0.05-0.2 มก./กก. สูงสุด 15 มก. ต่อครั้ง)' : ''}`)
                  : en ? "Davis's Drug Guide: 50 kg or more, 4-10 mg IV/SC every 3-4 h; under 50 kg, 0.05-0.2 mg/kg every 3-4 h (max 15 mg a dose)" : "Davis's Drug Guide: น้ำหนัก 50 กก. ขึ้นไป 4-10 มก. IV/SC ทุก 3-4 ชม.; น้อยกว่า 50 กก. 0.05-0.2 มก./กก. ทุก 3-4 ชม. (สูงสุด 15 มก. ต่อครั้ง)"}</li>
                <li>{en ? 'No IM: the effect is unpredictable (CPG p. 91)' : 'ไม่ให้ IM: ผลไม่แน่นอน (CPG หน้า 91)'}</li>
                <li>{en ? 'Not used: the CPG figure of 0.5-1 mg/kg (p. 91), about 10 times the doses above' : 'ไม่ใช้ 0.5-1 มก./กก. ใน CPG (หน้า 91) เพราะสูงกว่าขนาดข้างต้นประมาณ 10 เท่า'}</li>
              </ul>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-bold">{en ? 'Source:' : 'แหล่งที่มา:'}</span> {en ? "Thai DMS palliative care CPG 2020, p. 91-93; SC/IV doses: NCCN Adult Cancer Pain (via CancerNetwork summary) and Davis's Drug Guide (morphine)" : "CPG การดูแลผู้ป่วยแบบประคับประคองและระยะท้าย กรมการแพทย์ 2563 หน้า 91-93; ขนาดยา SC/IV: NCCN Adult Cancer Pain (สรุปโดย CancerNetwork) และ Davis's Drug Guide (morphine)"}
            </p>
          </>) : (<>
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
            {fentIvLine && (
              <p className="text-xs font-bold mt-1.5 text-slate-800 dark:text-slate-100">{fentIvLine}</p>
            )}
            {tramRange && (
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">{en ? `Tramadol ratio range 5-10 : 1 gives ${tramRangeText}` : `ช่วงอัตราส่วน tramadol 5-10 : 1 ได้ ${tramRangeText}`}</p>
            )}
          </div>

          <div className="flex justify-between gap-3 text-xs pt-2 border-t border-slate-200 dark:border-[#263449]">
            <span className="text-amber-700 dark:text-amber-400 font-semibold">
              {prnFent
                ? (en ? 'Breakthrough (PRN), fentanyl SC (kidney)' : 'ยาแก้ปวดฉับพลัน (PRN) fentanyl SC (โรคไต)')
                : prnSc
                ? (en ? 'Breakthrough (PRN), morphine SC (oral ÷ 3)' : 'ยาแก้ปวดฉับพลัน (PRN) morphine SC (กิน ÷ 3)')
                : (en ? 'Breakthrough (PRN), morphine IR PO' : 'ยาแก้ปวดฉับพลัน (PRN) morphine IR กิน')}
            </span>
            <span className="font-bold text-amber-700 dark:text-amber-400 shrink-0">
              {prnFent ? `${prnFentMin} - ${prnFentMax} mcg` : `${prnMin} - ${prnMax} mg`}
            </span>
          </div>
          {renalStatus !== 'normal' && (
            <p className="text-[11px] leading-snug text-amber-800 dark:text-amber-300 -mt-1.5">
              {en
                ? 'Kidney disease: the CPG advises against morphine (p. 91), so the rescue is fentanyl SC at 100 : 1 (100 mcg = 10 mg IV morphine). How often: per local protocol (not in the CPG).'
                : 'โรคไต: CPG ไม่แนะนำ morphine (หน้า 91) ยาแก้ปวดฉับพลันจึงเป็น fentanyl SC คิดที่ 100 : 1 (100 มคก. = morphine IV 10 มก.) ความถี่: ตามแนวทางของโรงพยาบาล (ไม่มีใน CPG)'}
            </p>
          )}

          {targetDrug.id === 'fentanyl_patch' && !belowPatchRange && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>{en ? 'Not for first-line titration: switch to the patch only once pain is stable on another opioid. It takes 12-24 h to act, so keep the previous opioid for 24 h after the first patch (CPG p. 93).' : 'ไม่ใช้เป็นอันดับแรกในการปรับยา: เปลี่ยนเป็นแผ่นแปะเมื่อปวดคงที่ด้วยโอปิออยด์ตัวอื่นแล้วเท่านั้น แผ่นแปะออกฤทธิ์ช้า 12-24 ชม. ให้ยาเดิมต่ออีก 24 ชม. หลังแปะแผ่นแรก (CPG หน้า 93)'}</span>
            </div>
          )}

          {belowPatchRange && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <span>
                {en
                  ? 'Below Thai CPG Table 9.1.3 range (< 20 mg oral morphine/day): fentanyl patch is not indicated at this dose.'
                  : 'ต่ำกว่าช่วงตาราง 9.1.3 ของ CPG (< 20 มก. morphine กิน/วัน): ไม่ควรใช้แผ่นแปะ fentanyl ที่ขนาดนี้'}
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
          </>)}
        </div>
      </div>

      {/* Details, only when opened */}
      <Fold title={`${en ? 'About' : 'รายละเอียด'}: ${shortName(aboutDrug)}`} icon={<Pill className="w-4 h-4" />}>
        <div className="space-y-2.5 text-xs md:text-sm text-slate-700 dark:text-slate-300">
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">{en ? aboutDrug.nameEn : aboutDrug.nameTh}</p>
          <div>
            <span className={labelCls}>{en ? 'Available as' : 'รูปแบบยา'}</span>
            <div className="flex flex-wrap gap-1">
              {(en ? aboutDrug.formulationsEn : aboutDrug.formulationsTh).map((f) => (
                <span key={f} className="text-[11px] font-semibold px-1.5 py-0.5 rounded border border-slate-200 dark:border-[#263449] bg-slate-50 dark:bg-[#101a2b]">{f}</span>
              ))}
            </div>
          </div>
          <div>
            <span className={labelCls}>{en ? 'How to give' : 'วิธีให้ยา'}</span>
            <p>{en ? aboutDrug.frequencyEn : aboutDrug.frequencyTh}</p>
          </div>
          <div>
            <span className={labelCls}>{en ? 'Notes' : 'ข้อควรทราบ'}</span>
            <p className="leading-relaxed">{en ? aboutDrug.notesEn : aboutDrug.notesTh}</p>
          </div>
          <div>
            <span className={labelCls}>{en ? 'Kidney' : 'ไต'}</span>
            <p className="leading-relaxed">{en ? aboutDrug.renalNoteEn : aboutDrug.renalNoteTh}</p>
          </div>
          {CPG_SOURCES[aboutDrug.id] && (
            <p className="pt-2 border-t border-slate-200 dark:border-[#263449] text-[11px] text-slate-500 dark:text-slate-400">
              <span className="font-bold">{en ? 'Source:' : 'แหล่งที่มา:'}</span>{' '}
              {CPG_SOURCES[aboutDrug.id].none ? '' : en ? 'Thai DMS palliative care CPG 2020, ' : 'CPG การดูแลผู้ป่วยแบบประคับประคองและระยะท้าย กรมการแพทย์ 2563 '}
              {en ? CPG_SOURCES[aboutDrug.id].en : CPG_SOURCES[aboutDrug.id].th}
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

      {!naive && (
      <Fold title={en ? 'Thai CPG Table 9.1.3: fentanyl patch' : 'ตาราง 9.1.3 CPG: แผ่นแปะ fentanyl'} icon={<Table className="w-4 h-4" />}>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
          {en ? 'Oral morphine per day to patch strength. Source: Thai DMS palliative care CPG 2020, Table 9.1.3, p. 94.' : 'ขนาด morphine กินต่อวันเทียบเป็นแผ่นแปะ แหล่งที่มา: CPG การดูแลผู้ป่วยแบบประคับประคองและระยะท้าย กรมการแพทย์ 2563 ตาราง 9.1.3 หน้า 93-94'}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-[#263449] rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-[#101a2b] text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-[#263449]">
              <tr>
                <th className="p-3 w-1/2">{en ? 'Oral morphine / day' : 'Morphine กิน / วัน'}</th>
                <th className="p-3 w-1/2 text-indigo-700 dark:text-indigo-300">{en ? 'Fentanyl patch' : 'แผ่นแปะ fentanyl'}</th>
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
      )}

      <Fold title={en ? 'Conversion tips' : 'ข้อควรปฏิบัติในการเปลี่ยนยา'} icon={<Info className="w-4 h-4" />}>
        <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              {en
                ? <><strong>Oral to parenteral:</strong> 3 mg oral morphine = 1 mg IV/SC morphine (3:1). SC is preferred over IV for comfort and to avoid phlebitis. (CPG p. 93)</>
                : <><strong>กินเทียบฉีด:</strong> morphine กิน 3 มก. = morphine IV/SC 1 มก. (3:1) แนะนำฉีดใต้ผิวหนังมากกว่า IV เพื่อความสบายและลดหลอดเลือดดำอักเสบ (CPG หน้า 93)</>}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              {en
                ? <><strong>Fentanyl patch timing:</strong> takes 12-24 hours to reach effective levels. Continue the previous opioid for 24 hours after the first patch (CPG p. 93).</>
                : <><strong>แผ่นแปะ fentanyl:</strong> ใช้เวลา 12-24 ชม. จึงออกฤทธิ์เต็มที่ ให้ยาเดิมต่ออีก 24 ชม. หลังแปะแผ่นแรก (CPG หน้า 93)</>}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-bold">•</span>
            <span>
              {en
                ? <><strong>Breakthrough dose:</strong> always prescribe fast-acting immediate-release morphine, 10-15% of the new daily dose (oral morphine equivalent, after reduction). The CPG gives 5-20% as usual (p. 93).</>
                : <><strong>ยาแก้ปวดฉับพลัน:</strong> สั่ง morphine ชนิดออกฤทธิ์เร็วเสมอ ขนาด 10-15% ของขนาดยาต่อวันใหม่ (OME หลังลดขนาด) CPG ระบุว่าโดยทั่วไป 5-20% (หน้า 93)</>}
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
          <span className="min-w-0 truncate text-xs font-semibold text-slate-600 dark:text-slate-300">&rarr; {naive ? (en ? 'Morphine IR' : 'Morphine IR') : shortName(targetDrug)}</span>
          <span className="shrink-0 text-base font-extrabold text-indigo-600 dark:text-indigo-300">{naive ? '5-10 mg' : resultText}</span>
          <span className="shrink-0 text-[11px] font-bold text-amber-700 dark:text-amber-400">{naive ? 'q2-4 h' : (prnFent ? `PRN fent ${prnFentMin}-${prnFentMax} mcg` : `PRN ${prnMin}-${prnMax}${prnSc ? ' SC' : ''}`)}</span>
        </button>
      )}
    </div>
  );
};
