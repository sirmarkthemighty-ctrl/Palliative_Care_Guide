import React, { useState } from 'react';
import {
  Pill,
  ArrowRight,
  ShieldAlert,
  CheckCircle,
  Copy,
  Check,
  AlertTriangle,
  Info,
  RefreshCw,
  Sparkles,
  Sliders,
  FileSpreadsheet
} from 'lucide-react';
import { Language, OpioidDrug } from '../types';
import { OPIOID_DRUGS, THAI_CPG_FENTANYL_TABLE } from '../data/opioidData';

interface OpioidCalcTabProps {
  language: Language;
}

export const OpioidCalcTab: React.FC<OpioidCalcTabProps> = ({ language }) => {
  const [sourceDrugId, setSourceDrugId] = useState<string>('morphine_oral');
  const [sourceDose, setSourceDose] = useState<number>(60);
  const [targetDrugId, setTargetDrugId] = useState<string>('fentanyl_patch');
  const [crossTolerancePercent, setCrossTolerancePercent] = useState<number>(25); // 0%, 25%, 33%, 50%
  const [renalStatus, setRenalStatus] = useState<'normal' | 'moderate' | 'severe'>('normal'); // eGFR
  const [copiedRx, setCopiedRx] = useState<boolean>(false);

  const sourceDrug = OPIOID_DRUGS.find((d) => d.id === sourceDrugId) || OPIOID_DRUGS[0];
  const targetDrug = OPIOID_DRUGS.find((d) => d.id === targetDrugId) || OPIOID_DRUGS[4];

  // 1. Calculate Oral Morphine Milligram Equivalent (OME)
  const ome24h = (sourceDose || 0) * sourceDrug.factorToOralMorphine;

  // 2. Apply cross-tolerance reduction
  const reductionFactor = 1 - crossTolerancePercent / 100;
  const targetOme = ome24h * reductionFactor;

  // 3. Convert target OME to target drug dose
  let calculatedTargetDose = 0;
  if (targetDrug.id === 'fentanyl_patch') {
    // Check Thai CPG Table 9.1.3
    const matchedRow = THAI_CPG_FENTANYL_TABLE.find(
      (r) => targetOme <= r.maxOralMorphine
    );
    if (matchedRow) {
      calculatedTargetDose = matchedRow.patchDoseMcgHr;
    } else {
      // Linear approximation for very high doses
      calculatedTargetDose = Math.round(targetOme / 2.4 / 12.5) * 12.5;
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

  // Generate Sample Clinical Prescription
  const generatePrescriptionText = () => {
    let regularRx = '';
    let breakthroughRx = '';

    if (targetDrug.id === 'fentanyl_patch') {
      regularRx = `1. Fentanyl Transdermal Patch ${roundedTargetDose} mcg/hr\n   Apply 1 patch transdermally every 72 hours (3 days).\n   (Keep previous opioid for first 12-24 hours).`;
    } else if (targetDrug.id === 'kapanol') {
      regularRx = `1. Kapanol® (Morphine SR 24h) ${roundedTargetDose} mg\n   Take ${roundedTargetDose} mg PO once daily at the same time. (DO NOT crush pellets).`;
    } else if (targetDrug.id === 'mst_continus') {
      const perDose = Math.round(roundedTargetDose / 2);
      regularRx = `1. MST Continus® (Morphine CR 12h) ${perDose} mg\n   Take ${perDose} mg PO every 12 hours (08:00, 20:00). Swallow whole.`;
    } else if (targetDrug.id === 'morphine_parenteral') {
      const q4h = Math.round((roundedTargetDose / 6) * 10) / 10;
      regularRx = `1. Morphine Injection (10 mg/mL)\n   Give ${q4h} mg SC/IV every 4 hours regular (or ${Math.round((roundedTargetDose / 24) * 10) / 10} mg/hr continuous SC infusion).`;
    } else if (targetDrug.id === 'fentanyl_parenteral') {
      regularRx = `1. Fentanyl Injection (50 mcg/mL)
   ${Math.round((roundedTargetDose / 24) * 10) / 10} mcg/hr continuous SC/IV infusion (${roundedTargetDose} mcg/day).`;
    } else if (targetDrug.id !== 'morphine_oral') {
      const perDay = ({ oxycodone_oral: 2, tramadol_oral: 4, tramadol_parenteral: 3, codeine_oral: 4 } as Record<string, number>)[targetDrug.id] || 1;
      const every = 24 / perDay;
      const over = targetDrug.id.startsWith('tramadol') && roundedTargetDose > 400 ? `
   WARNING: exceeds tramadol max 400 mg/day - use a strong opioid instead.` : '';
      regularRx = `1. ${targetDrug.nameEn}
   ${Math.round((roundedTargetDose / perDay) * 10) / 10} mg every ${every} hours (${roundedTargetDose} mg/day).${over}`;
    } else {
      const q4h = Math.round((roundedTargetDose / 6) * 10) / 10;
      regularRx = `1. Morphine Oral (IR/Syrup 2mg/mL)\n   Take ${q4h} mg (${Math.round((q4h / 2) * 10) / 10} mL syrup) PO every 4 hours around the clock.`;
    }

    breakthroughRx = `2. Morphine IR Oral (Syrup or Tablet) ${breakthroughOmeMin} - ${breakthroughOmeMax} mg\n   Take PO every 2-4 hours PRN for breakthrough pain. (Max 4-6 doses/day).\n3. Senna (7.5 mg) 2-4 tablets PO at bedtime daily (Laxative co-prescription).`;

    return `${regularRx}\n\n${breakthroughRx}`;
  };

  const handleCopyRx = () => {
    navigator.clipboard.writeText(generatePrescriptionText());
    setCopiedRx(true);
    setTimeout(() => setCopiedRx(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-2xl bg-linear-to-r from-teal-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-lg border border-teal-800/50">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Pill className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Clinical Equianalgesic Converter' : 'เครื่องคำนวณและแปลงขนาดยาแก้ปวดโอปิออยด์'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en'
              ? 'Palliative Opioid Equianalgesic Calculator'
              : 'เครื่องคำนวณเทียบเคียงและหมุนเวียนยาโอปิออยด์'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Accurately convert between oral morphine, parenteral IV/SC, fentanyl patches (Thai CPG Table 9.1.3), tramadol, and codeine with incomplete cross-tolerance reduction and renal safety checks.'
              : 'คำนวณปรับเปลี่ยนยาโอปิออยด์อย่างแม่นยำ เทียบมอร์ฟีนกิน ยาฉีด IV/SC แผ่นแปะเฟนตานิล (ตามตาราง 9.1.3 CPG กรมการแพทย์) พร้อมปรับลดขนาดยาป้องกันการดื้อยาข้ามตัว (Cross-Tolerance) และคำเตือนภาวะไตเสื่อม'}
          </p>
        </div>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{language === 'en' ? '1. Current Opioid Regimen' : '1. ขนาดยาโอปิออยด์ที่ผู้ป่วยได้รับในปัจจุบัน'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                  {language === 'en' ? 'Current Drug' : 'ชนิดยาเดิม'}
                </label>
                <select
                  value={sourceDrugId}
                  onChange={(e) => setSourceDrugId(e.target.value)}
                  className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500"
                >
                  {OPIOID_DRUGS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {language === 'en' ? d.nameEn : d.nameTh} ({d.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                  {language === 'en'
                    ? `Total 24h Dose (${sourceDrug.unit})`
                    : `ขนาดยารวมต่อวัน (${sourceDrug.unit})`}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="0.5"
                    value={sourceDose}
                    onChange={(e) => setSourceDose(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                    {sourceDrug.unit}
                  </span>
                </div>
              </div>
            </div>

            {/* Target Drug & Cross-Tolerance */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{language === 'en' ? '2. Target Opioid & Rotation Safety' : '2. ชนิดยาใหม่ที่ต้องการเปลี่ยน และความปลอดภัย'}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                    {language === 'en' ? 'Switch To (Target Drug)' : 'เปลี่ยนเป็นยาตัวใหม่'}
                  </label>
                  <select
                    value={targetDrugId}
                    onChange={(e) => setTargetDrugId(e.target.value)}
                    className="w-full p-2.5 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500"
                  >
                    {OPIOID_DRUGS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {language === 'en' ? d.nameEn : d.nameTh} ({d.unit})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>{language === 'en' ? 'Cross-Tolerance Reduction' : 'ปรับลดขนาดยา (Cross-Tolerance)'}</span>
                    <span className="text-teal-600 dark:text-teal-400 font-bold">{crossTolerancePercent}%</span>
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 25, 33, 50].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setCrossTolerancePercent(pct)}
                        className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                          crossTolerancePercent === pct
                            ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-1">
                    {language === 'en'
                      ? 'Recommended: 25-33% dose reduction when switching to a different opioid.'
                      : 'คำแนะนำ: ควรลดขนาดยาลง 25-33% เพื่อป้องกันการได้รับยาเกินขนาดจากการดื้อยาข้ามตัว'}
                  </span>
                </div>
              </div>

              {/* Patient Renal Function Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
                  {language === 'en' ? 'Patient Renal Function (eGFR / CrCl)' : 'การทำงานของไตผู้ป่วย (eGFR)'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRenalStatus('normal')}
                    className={`p-2 rounded-xl text-xs font-bold border text-center transition-all ${
                      renalStatus === 'normal'
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <span>{language === 'en' ? 'Normal / Mild' : 'ไตปกติ / เสื่อมเล็กน้อย'}</span>
                    <span className="block text-[10px] font-normal">&gt; 60 mL/min</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRenalStatus('moderate')}
                    className={`p-2 rounded-xl text-xs font-bold border text-center transition-all ${
                      renalStatus === 'moderate'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <span>{language === 'en' ? 'Moderate' : 'ไตเสื่อมปานกลาง'}</span>
                    <span className="block text-[10px] font-normal">30 - 59 mL/min</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRenalStatus('severe')}
                    className={`p-2 rounded-xl text-xs font-bold border text-center transition-all ${
                      renalStatus === 'severe'
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <span>{language === 'en' ? 'Severe / Dialysis' : 'ไตวายรุนแรง / ล้างไต'}</span>
                    <span className="block text-[10px] font-normal">&lt; 30 mL/min</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Instructions / Conversion Pearls */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-4 h-4 text-teal-600" />
              <span>{language === 'en' ? 'Clinical Conversion Rules & Practice Tips' : 'หลักการและข้อควรปฏิบัติในการเปลี่ยนยา'}</span>
            </h4>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>
                  <strong>Oral to Parenteral Ratio:</strong> 3 mg Oral Morphine = 1 mg IV/SC Morphine (3:1 ratio). Subcutaneous route is preferred over IV for comfort and avoiding phlebitis.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>
                  <strong>Fentanyl Patch Timing:</strong> Transdermal patch takes 12 to 24 hours to reach effective serum levels. Continue the previous oral or subcutaneous opioid for the first 12-24 hours after applying the initial patch!
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span>
                  <strong>Breakthrough Rescue Dosing:</strong> Always prescribe fast-acting immediate-release morphine for sudden breakthrough pain, equal to 10% to 15% of the new total 24h dose (oral morphine equivalent, after reduction).
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Calculation Results & Prescription Box */}
        <div className="lg:col-span-5 space-y-6">
          {/* Result Card */}
          <div className="bg-linear-to-br from-teal-800 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-xl border border-teal-700 space-y-5">
            <div>
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider block mb-1">
                {language === 'en' ? 'Calculated Equianalgesic Result' : 'ผลการคำนวณขนาดยาเทียบเคียง'}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">
                  {roundedTargetDose}
                </span>
                <span className="text-lg font-bold text-teal-300">
                  {targetDrug.unit}
                </span>
              </div>
              <p className="text-xs text-teal-200 mt-1">
                {language === 'en' ? targetDrug.nameEn : targetDrug.nameTh} (after {crossTolerancePercent}% cross-tolerance reduction)
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">
                  {language === 'en' ? 'Baseline Oral Morphine Equiv:' : 'มอร์ฟีนกินเทียบเคียง (OME):'}
                </span>
                <span className="font-bold text-white">{Math.round(ome24h * 10) / 10} mg/day</span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-slate-300">
                  {language === 'en' ? 'After Safety Reduction:' : 'หลังปรับลดขนาดยา:'}
                </span>
                <span className="font-bold text-teal-300">{Math.round(targetOme * 10) / 10} mg OME</span>
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between text-xs">
                <span className="text-amber-300 font-semibold">
                  {language === 'en' ? 'Breakthrough Pain Dose (PRN):' : 'ขนาดยาแก้ปวดฉับพลัน (PRN):'}
                </span>
                <span className="font-bold text-amber-300">
                  {breakthroughOmeMin} - {breakthroughOmeMax} mg PO
                </span>
              </div>
            </div>

            {/* Renal Safety Warning Badge */}
            {renalStatus === 'severe' && targetDrug.renalSafety !== 'safe' && (
              <div className="p-3.5 rounded-xl bg-rose-500/30 border border-rose-400 text-xs text-rose-100 flex items-start gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-rose-200">
                    ⚠️ {language === 'en' ? 'Renal Warning (eGFR < 30):' : 'คำเตือนความปลอดภัยในผู้ป่วยไตวาย:'}
                  </span>
                  <p className="mt-0.5 leading-relaxed">
                    {language === 'en' ? targetDrug.renalNoteEn : targetDrug.renalNoteTh}
                  </p>
                </div>
              </div>
            )}

            {renalStatus === 'severe' && targetDrug.renalSafety === 'safe' && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-xs text-emerald-100 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>
                  {language === 'en'
                    ? 'Fentanyl is the drug of choice in severe renal impairment.'
                    : 'Fentanyl เป็นยาโอปิออยด์ที่ปลอดภัยที่สุดในภาวะไตวายรุนแรง'}
                </span>
              </div>
            )}
          </div>

          {/* Formatted Physician Order Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-teal-600" />
                <span>{language === 'en' ? 'Physician Prescription Draft' : 'ร่างคำสั่งแพทย์สั่งจ่ายยา (Rx Template)'}</span>
              </h4>

              <button
                onClick={handleCopyRx}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900 border border-teal-200 dark:border-teal-800 transition-colors"
              >
                {copiedRx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{language === 'en' ? 'Copied' : 'คัดลอกแล้ว'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Copy Rx' : 'คัดลอก Rx'}</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {generatePrescriptionText()}
            </pre>
          </div>
        </div>
      </div>

      {/* Thai CPG Table 9.1.3 Fentanyl Conversion Reference */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
              CPG
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {language === 'en'
                  ? 'Thai CPG Table 9.1.3: Fentanyl Patch vs Oral Morphine Dose Mapping'
                  : 'ตาราง 9.1.3 คู่มือแนวทางเวชปฏิบัติ กรมการแพทย์: การแปลงขนาดยามอร์ฟีนกินเป็นแผ่นแปะเฟนตานิล'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Official national conversion ranges from Ministry of Public Health Thailand (Page 94)'
                  : 'เกณฑ์มาตรฐานของกรมการแพทย์ กระทรวงสาธารณสุข (หน้า 94)'}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3 w-1/2">{language === 'en' ? 'Oral Morphine Daily Dose' : 'ขนาดยามอร์ฟีนรับประทานต่อวัน'}</th>
                <th className="p-3 w-1/2 text-teal-700 dark:text-teal-300">
                  {language === 'en' ? 'Fentanyl Transdermal Patch' : 'ขนาดแผ่นแปะเฟนตานิล (Durogesic)'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {THAI_CPG_FENTANYL_TABLE.map((row, idx) => {
                const isMatched =
                  targetOme >= row.minOralMorphine && targetOme <= row.maxOralMorphine;
                return (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      isMatched
                        ? 'bg-teal-50 dark:bg-teal-950/40 font-bold text-teal-950 dark:text-teal-200'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="p-3 flex items-center gap-2">
                      {isMatched && <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />}
                      <span>{row.oralMorphineRange}</span>
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200 font-bold">
                        {row.patchDoseMcgHr} mcg/hr
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
