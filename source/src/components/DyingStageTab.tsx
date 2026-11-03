import React, { useState } from 'react';
import {
  Clock,
  HeartPulse,
  AlertCircle,
  Eye,
  Wind,
  Ear,
  MessageCircle,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language, DyingSign } from '../types';
import {
  NINE_PHYSICAL_SIGNS,
  PpiCalculation,
  calculatePpi
} from '../data/dyingCareData';

interface DyingStageTabProps {
  language: Language;
}

export const DyingStageTab: React.FC<DyingStageTabProps> = ({ language }) => {
  const [ppiValues, setPpiValues] = useState<PpiCalculation>({
    ppsScore: 2.5, // 0, 2.5, 4
    oralIntake: 1, // 0, 1, 2.5
    edema: 0, // 0, 1
    dyspneaAtRest: 0, // 0, 3.5
    delirium: 0 // 0, 4
  });

  const [expandedSignId, setExpandedSignId] = useState<string | null>('death_rattle');

  const ppiResult = calculatePpi(ppiValues);

  const getSignIcon = (id: string) => {
    switch (id) {
      case 'fluid_intake':
      case 'anorexia':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'eye_closure':
        return <Eye className="w-5 h-5 text-indigo-500" />;
      case 'breathing_pattern':
      case 'death_rattle':
        return <Wind className="w-5 h-5 text-sky-500" />;
      case 'hearing_preservation':
        return <Ear className="w-5 h-5 text-emerald-500" />;
      default:
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-2xl bg-linear-to-r from-purple-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-lg border border-purple-800/50">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Terminal Phase Recognition' : 'การวินิจฉัยและรับรู้วาระสุดท้ายของชีวิต'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en'
              ? 'Recognizing the Dying Process & Survival Prediction'
              : 'การประเมินระยะใกล้เสียชีวิตและการพยากรณ์ชีวิต (PPI)'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Dying is a natural physiological process. Accurate clinical recognition avoids futile traumatic interventions and empowers families to prepare meaningful closures.'
              : 'การเสียชีวิตเป็นกระบวนการสรีรวิทยาตามธรรมชาติ การวินิจฉัยระยะใกล้สิ้นลมได้อย่างแม่นยำช่วยป้องกันหัตถการยื้อชีวิตที่ไร้ประโยชน์ และช่วยให้ครอบครัวได้กล่าวคำอำลาอย่างสงบ'}
          </p>
        </div>
      </div>

      {/* Palliative Prognostic Index (PPI) Interactive Calculator */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-black">
              PPI
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'en'
                  ? 'Palliative Prognostic Index (PPI) Calculator'
                  : 'แบบประเมินพยากรณ์ชีวิต Palliative Prognostic Index (PPI)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Validated score estimating survival probability (< 3 weeks, < 6 weeks, or > 6 weeks)'
                  : 'คะแนนประเมินมัธยฐานการรอดชีวิตในผู้ป่วยระยะประคับประคอง'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 5 Parameters */}
          <div className="lg:col-span-8 space-y-4">
            {/* 1. PPS Score */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                1. {language === 'en' ? 'Palliative Performance Scale (PPS)' : 'สมรรถนะร่างกาย (PPS)'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 0, labelEn: 'PPS ≥ 60%', labelTh: 'PPS ≥ 60%', pts: '0 pt' },
                  { val: 2.5, labelEn: 'PPS 30 - 50%', labelTh: 'PPS 30 - 50%', pts: '2.5 pts' },
                  { val: 4, labelEn: 'PPS 10 - 20%', labelTh: 'PPS 10 - 20%', pts: '4.0 pts' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setPpiValues((prev) => ({ ...prev, ppsScore: item.val }))}
                    className={`p-2 rounded-lg text-xs font-bold border transition-all text-center ${
                      ppiValues.ppsScore === item.val
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <span>{language === 'en' ? item.labelEn : item.labelTh}</span>
                    <span className="block text-[10px] font-normal text-slate-400 dark:text-slate-300">
                      ({item.pts})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Oral Intake */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                2. {language === 'en' ? 'Oral Intake Status' : 'การรับประทานอาหารทางปาก'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { val: 0, labelEn: 'Normal / Mild reduction', labelTh: 'ปกติ / ลดลงเล็กน้อย', pts: '0 pt' },
                  { val: 1, labelEn: 'Moderate reduction', labelTh: 'ลดลงปานกลาง', pts: '1.0 pt' },
                  { val: 2.5, labelEn: 'Severe (sips/mouth care only)', labelTh: 'ลดลงมาก (จิบน้ำเท่านั้น)', pts: '2.5 pts' }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setPpiValues((prev) => ({ ...prev, oralIntake: item.val }))}
                    className={`p-2 rounded-lg text-xs font-bold border transition-all text-center ${
                      ppiValues.oralIntake === item.val
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    <span>{language === 'en' ? item.labelEn : item.labelTh}</span>
                    <span className="block text-[10px] font-normal text-slate-400 dark:text-slate-300">
                      ({item.pts})
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3, 4, 5. Edema, Dyspnea at Rest, Delirium */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Edema */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  3. {language === 'en' ? 'Edema (บวม)' : 'อาการบวมน้ำ'}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPpiValues((prev) => ({ ...prev, edema: 0 }))}
                    className={`py-1.5 rounded-lg text-xs font-bold border ${
                      ppiValues.edema === 0
                        ? 'bg-purple-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {language === 'en' ? 'Absent (0)' : 'ไม่มี (0)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpiValues((prev) => ({ ...prev, edema: 1 }))}
                    className={`py-1.5 rounded-lg text-xs font-bold border ${
                      ppiValues.edema === 1
                        ? 'bg-purple-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {language === 'en' ? 'Present (1)' : 'มีบวม (+1)'}
                  </button>
                </div>
              </div>

              {/* Dyspnea at rest */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  4. {language === 'en' ? 'Dyspnea at Rest' : 'เหนื่อยหอบขณะพัก'}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPpiValues((prev) => ({ ...prev, dyspneaAtRest: 0 }))}
                    className={`py-1.5 rounded-lg text-xs font-bold border ${
                      ppiValues.dyspneaAtRest === 0
                        ? 'bg-purple-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {language === 'en' ? 'No (0)' : 'ไม่มี (0)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpiValues((prev) => ({ ...prev, dyspneaAtRest: 3.5 }))}
                    className={`py-1.5 rounded-lg text-xs font-bold border ${
                      ppiValues.dyspneaAtRest === 3.5
                        ? 'bg-purple-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {language === 'en' ? 'Yes (+3.5)' : 'มีเหนื่อย (+3.5)'}
                  </button>
                </div>
              </div>

              {/* Delirium */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  5. {language === 'en' ? 'Delirium' : 'ภาวะสับสนเพ้อ'}
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPpiValues((prev) => ({ ...prev, delirium: 0 }))}
                    className={`py-1.5 rounded-lg text-xs font-bold border ${
                      ppiValues.delirium === 0
                        ? 'bg-purple-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {language === 'en' ? 'No (0)' : 'ไม่มี (0)'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPpiValues((prev) => ({ ...prev, delirium: 4 }))}
                    className={`py-1.5 rounded-lg text-xs font-bold border ${
                      ppiValues.delirium === 4
                        ? 'bg-purple-600 text-white'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {language === 'en' ? 'Yes (+4)' : 'มีเพ้อ (+4)'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Score & Prognosis */}
          <div className="lg:col-span-4 flex flex-col justify-between p-6 rounded-2xl bg-linear-to-br from-purple-900 via-indigo-950 to-slate-900 text-white shadow-md border border-purple-700/50">
            <div>
              <span className="text-xs font-bold text-purple-300 uppercase tracking-wider block mb-1">
                {language === 'en' ? 'Total PPI Score' : 'คะแนนรวม PPI'}
              </span>
              <div className="text-5xl font-black text-white">{ppiResult.total}</div>
              <span className="text-xs text-purple-200 block mt-1">
                (Cut-offs: &gt;6 = &lt;3 weeks; &gt;4 = &lt;6 weeks; ≤4 = &gt;6 weeks)
              </span>

              <div
                className={`mt-4 p-3.5 rounded-xl border text-xs sm:text-sm font-bold leading-relaxed ${
                  ppiResult.total > 6
                    ? 'bg-rose-500/20 border-rose-400 text-rose-200'
                    : ppiResult.total > 4
                    ? 'bg-amber-500/20 border-amber-400 text-amber-200'
                    : 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                }`}
              >
                {language === 'en' ? ppiResult.prognosisEn : ppiResult.prognosisTh}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-xs text-slate-300 leading-relaxed">
              💡 {language === 'en'
                ? 'Clinical action: If PPI > 6, prepare the family for the dying phase, verify code status (AND), stop blood draws, and arrange anticipatory subcutaneous comfort medications.'
                : 'คำแนะนำทางคลินิก: หากคะแนน PPI > 6 ให้เตรียมครอบครัวสำหรับวาระสุดท้าย ยืนยันสถานะ AND งดการเจาะเลือด และสั่งยาฉีดใต้ผิวหนังเตรียมพร้อม'}
            </div>
          </div>
        </div>
      </section>

      {/* The 9 Physical Signs of Dying */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {language === 'en'
              ? 'The 9 Physical Signs of Active Dying'
              : '9 สัญญาณทางกายของระยะใกล้เสียชีวิต (Active Dying: ชั่วโมงถึงวัน)'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {language === 'en'
              ? 'Understand the underlying physiology, necessary care actions, and exact words to reassure the family'
              : 'ทำความเข้าใจสรีรวิทยา สิ่งที่ทีมสุขภาพควรปฏิบัติ และบทสนทนาปลอบประโลมใจครอบครัว'}
          </p>
        </div>

        <div className="space-y-4">
          {NINE_PHYSICAL_SIGNS.map((sign) => {
            const isExpanded = expandedSignId === sign.id;
            return (
              <div
                key={sign.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setExpandedSignId(isExpanded ? null : sign.id)}
                  className="w-full p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-xs">
                      {getSignIcon(sign.id)}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {language === 'en' ? sign.titleEn : sign.titleTh}
                      </h4>
                    </div>
                  </div>

                  <span className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    {/* Physiology */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-xs sm:text-sm">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">
                        🔬 {language === 'en' ? 'Biological Mechanism & Physiology:' : 'กลไกและสรีรวิทยาตามธรรมชาติ:'}
                      </span>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        {language === 'en' ? sign.physioEn : sign.physioTh}
                      </p>
                    </div>

                    {/* Care Actions */}
                    <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 text-xs sm:text-sm">
                      <span className="text-xs font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        {language === 'en' ? 'Clinical & Nursing Actions:' : 'สิ่งที่แพทย์และพยาบาลควรปฏิบัติ:'}
                      </span>
                      <ul className="space-y-1.5 text-teal-950 dark:text-teal-200">
                        {(language === 'en' ? sign.careActionEn : sign.careActionTh).map(
                          (act, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-teal-600 font-bold">•</span>
                              <span className="leading-relaxed">{act}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    {/* Family Guidance (Exact Words) */}
                    <div className="p-4 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 text-xs sm:text-sm">
                      <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider block mb-1 flex items-center gap-1.5">
                        <MessageCircle className="w-4 h-4 text-purple-600" />
                        {language === 'en' ? 'Reassurance & Guidance to Family (What to Say):' : 'คำพูดอธิบายและปลอบโยนครอบครัว (บทพูดแนะนำ):'}
                      </span>
                      <p className="text-purple-950 dark:text-purple-200 italic leading-relaxed font-medium">
                        "{language === 'en' ? sign.familyGuidanceEn : sign.familyGuidanceTh}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
