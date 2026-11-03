import React, { useState } from 'react';
import {
  HelpCircle,
  CheckSquare,
  Square,
  Activity,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Heart,
  Wind,
  Droplets,
  Brain,
  Sparkles,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Language, DiseaseTrigger, PPSLevel } from '../types';
import {
  SURPRISE_QUESTION,
  PPS_LEVELS,
  DISEASE_SPECIFIC_TRIGGERS,
  SPICT_CHECKLIST
} from '../data/whenToStartData';

interface WhenToStartTabProps {
  language: Language;
}

export const WhenToStartTab: React.FC<WhenToStartTabProps> = ({ language }) => {
  const [selectedPps, setSelectedPps] = useState<number>(50);
  const [checkedSpict, setCheckedSpict] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedDiseaseId, setExpandedDiseaseId] = useState<string | null>('cancer');

  const toggleSpict = (id: string) => {
    setCheckedSpict((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const selectedPpsData: PPSLevel =
    PPS_LEVELS.find((p) => p.percent === selectedPps) || PPS_LEVELS[5]; // Default 50%

  const positiveSpictCount = Object.values(checkedSpict).filter(Boolean).length;

  const filteredDiseases = DISEASE_SPECIFIC_TRIGGERS.filter((d) => {
    if (activeCategory === 'all') return true;
    return d.id === activeCategory;
  });

  const getDiseaseIcon = (id: string) => {
    switch (id) {
      case 'cancer':
        return <Activity className="w-5 h-5 text-rose-500" />;
      case 'heart_failure':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'copd_pulmonary':
        return <Wind className="w-5 h-5 text-sky-500" />;
      case 'renal_failure':
        return <Droplets className="w-5 h-5 text-amber-500" />;
      case 'liver_failure':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'neurology_stroke':
        return <Brain className="w-5 h-5 text-indigo-500" />;
      default:
        return <Stethoscope className="w-5 h-5 text-teal-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner: Gold Standards Framework / Thai CPG */}
      <div className="rounded-2xl bg-linear-to-r from-teal-800 via-teal-900 to-slate-900 text-white p-6 sm:p-8 shadow-lg border border-teal-700/50 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Screening & Identification' : 'การคัดกรองเพื่อเริ่มต้นการดูแล'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en'
              ? 'When to Initiate Palliative Care?'
              : 'เมื่อใดที่ควรเริ่มต้นการดูแลแบบประคับประคอง?'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'According to the Thai CPG 2563 and Gold Standards Framework (GSF), palliative care must be introduced proactively alongside disease-modifying therapies, rather than deferred to the terminal days.'
              : 'ตามแนวทางเวชปฏิบัติ กรมการแพทย์ พ.ศ. 2563 การดูแลแบบประคับประคองควรเริ่มต้นคู่ขนานกับการรักษาโรคเดิมตั้งแต่เนิ่นๆ ทันทีที่ผู้ป่วยเริ่มมีแนวโน้มสุขภาพถดถอย โดยไม่ต้องรอให้ถึงระยะวาระสุดท้าย'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
            {(language === 'en' ? SURPRISE_QUESTION.threeStepsEn : SURPRISE_QUESTION.threeStepsTh).map(
              (step, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10"
                >
                  <span className="text-teal-300 text-xs font-bold block mb-1">
                    {step.step.split(':')[0]}
                  </span>
                  <p className="text-xs text-slate-200 leading-normal line-clamp-3">
                    {step.detail}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* Step 1: The Surprise Question */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-black text-sm">
            1
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {language === 'en' ? 'Step 1: The Surprise Question' : 'ขั้นตอนที่ 1: การตั้งคำถาม Surprise Question'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Clinical intuitive screening for 6-12 month mortality risk'
                : 'คำถามคัดกรองทางคลินิกเพื่อประเมินความเสี่ยงต่อการเสียชีวิตใน 6-12 เดือน'}
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 mb-4">
          <div className="flex items-start gap-3">
            <HelpCircle className="w-6 h-6 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-base sm:text-lg font-bold text-teal-950 dark:text-teal-200 italic">
                "{language === 'en' ? SURPRISE_QUESTION.questionEn : SURPRISE_QUESTION.questionTh}"
              </p>
              <p className="text-xs sm:text-sm text-teal-800 dark:text-teal-300 mt-2 leading-relaxed">
                {language === 'en' ? SURPRISE_QUESTION.explanationEn : SURPRISE_QUESTION.explanationTh}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
            <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">
              {language === 'en' ? 'Intuitive Answer: "NO"' : 'หากคำตอบในใจคือ "ไม่ประหลาดใจ"'}
            </span>
            <p className="text-rose-700 dark:text-rose-400 text-xs leading-relaxed">
              {language === 'en'
                ? 'Positive screen! Trigger proactive palliative care registration, holistic symptom assessment, advance care planning (ACP), and family goals-of-care discussion.'
                : 'ถือเป็นผลบวก (Positive screen) ควรเริ่มต้นลงทะเบียนดูแลแบบประคับประคอง ตรวจคัดกรองอาการรบกวน พูดคุยเรื่อง ACP และทบทวนเป้าหมายการรักษาทันที'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-slate-800 dark:text-slate-300 block mb-1">
              {language === 'en' ? 'Intuitive Answer: "YES / UNSURE"' : 'หากตอบว่า "ประหลาดใจ" หรือ "ไม่แน่ใจ"'}
            </span>
            <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
              {language === 'en'
                ? 'Proceed to Step 2 (General Indicators of Decline / SPICT) and Step 3 (Disease-Specific Criteria) to re-evaluate functional trajectory.'
                : 'ให้ประเมินต่อในขั้นตอนที่ 2 (ข้อบ่งชี้ทั่วไปของการถดถอย / SPICT) และขั้นตอนที่ 3 (เกณฑ์เฉพาะกลุ่มโรค) เพื่อดูแนวโน้มสมรรถนะร่างกาย'}
            </p>
          </div>
        </div>
      </section>

      {/* Step 2: SPICT Checklist (General Indicators) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black text-sm">
              2
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'en'
                  ? 'Step 2: SPICT™ General Indicators of Decline'
                  : 'ขั้นตอนที่ 2: ข้อบ่งชี้ทั่วไปของการถดถอย (SPICT-TH)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Interactive checklist adapted from Supportive and Palliative Care Indicators Tool'
                  : 'แบบประเมินข้อบ่งชี้ทางคลินิกทั่วไปของการถดถอย'}
              </p>
            </div>
          </div>

          {/* Real-time score indicator */}
          <div
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-2 self-start sm:self-center ${
              positiveSpictCount >= 2
                ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800'
                : positiveSpictCount === 1
                ? 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {positiveSpictCount}{' '}
              {language === 'en' ? 'indicators present' : 'ข้อที่พบ'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {SPICT_CHECKLIST.map((item) => {
            const isChecked = !!checkedSpict[item.id];
            return (
              <button
                key={item.id}
                onClick={() => toggleSpict(item.id)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                  isChecked
                    ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200'
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </span>
                <span className="text-xs sm:text-sm font-medium leading-relaxed">
                  {language === 'en' ? item.textEn : item.textTh}
                </span>
              </button>
            );
          })}
        </div>

        {positiveSpictCount >= 2 && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">
                {language === 'en'
                  ? 'Positive Screening Result (≥ 2 General Indicators)'
                  : 'ผลการประเมินบวก (พบข้อบ่งชี้ทั่วไปตั้งแต่ 2 ข้อขึ้นไป)'}
              </p>
              <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                {language === 'en'
                  ? 'Recommend formal palliative care consultation, symptom burden review (ESAS), advance care planning (ACP), and medication rationalization (deprescribing futile drugs).'
                  : 'แนะนำให้เริ่มกระบวนการดูแลแบบประคับประคอง ประเมินอาการรบกวน (ESAS) พูดคุยเรื่องแผนการดูแลล่วงหน้า (ACP) และทบทวนตัดยาที่ไม่จำเป็นออก (Deprescribing)'}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Interactive PPS v2 Calculator */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-black text-sm">
              PPS
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'en'
                  ? 'Palliative Performance Scale (PPS v2) Calculator'
                  : 'แบบประเมินสมรรถนะร่างกาย Palliative Performance Scale (PPS v2)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Select percentage to view functional criteria, stage, and median survival days'
                  : 'เลือกเปอร์เซ็นต์สมรรถนะเพื่อดูเกณฑ์การทำงาน ระยะของโรค และมัธยฐานการรอดชีวิต'}
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-300 dark:border-teal-800 text-xs font-bold text-teal-800 dark:text-teal-200 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>
              {language === 'en' ? 'Median Survival:' : 'มัธยฐานการรอดชีวิต:'}{' '}
              <strong className="text-sm text-teal-700 dark:text-teal-300">
                {selectedPpsData.medianSurvivalDays}{' '}
                {language === 'en' ? 'days' : 'วัน'}
              </strong>
            </span>
          </div>
        </div>

        {/* PPS Percentage selector pills */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-11 gap-1.5 mb-6">
          {PPS_LEVELS.map((level) => {
            const isSelected = level.percent === selectedPps;
            const isTrigger = level.percent === 50;
            return (
              <button
                key={level.percent}
                onClick={() => setSelectedPps(level.percent)}
                className={`py-2 px-1 rounded-xl text-center font-bold text-xs sm:text-sm transition-all relative ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-md ring-2 ring-teal-500 ring-offset-2 dark:ring-offset-slate-900'
                    : isTrigger
                    ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border border-amber-300 dark:border-amber-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{level.percent}%</span>
                {level.percent === 50 && (
                  <span className="block text-[9px] font-semibold text-amber-800 dark:text-amber-300">
                    {language === 'en' ? 'Trigger' : 'จุดเริ่ม'}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected PPS Detail Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-2xl font-black text-teal-600 dark:text-teal-400 mr-2">
                PPS {selectedPps}%
              </span>
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {language === 'en' ? selectedPpsData.stageEn : selectedPpsData.stageTh}
              </span>
            </div>

            {selectedPps <= 50 && selectedPps > 0 && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                {language === 'en'
                  ? '⚡ Critical Threshold: PPS ≤ 50%'
                  : '⚡ จุดเปลี่ยนสำคัญ: PPS ≤ 50%'}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 font-medium block text-[11px] uppercase tracking-wider mb-1">
                {language === 'en' ? '1. Ambulation' : '1. การเคลื่อนไหว'}
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'en' ? selectedPpsData.ambulationEn : selectedPpsData.ambulationTh}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 font-medium block text-[11px] uppercase tracking-wider mb-1">
                {language === 'en' ? '2. Activity & Disease' : '2. การทำกิจกรรมและหลักฐานของโรค'}
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'en' ? selectedPpsData.activityEn : selectedPpsData.activityTh}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 font-medium block text-[11px] uppercase tracking-wider mb-1">
                {language === 'en' ? '3. Self-Care' : '3. การดูแลตนเอง'}
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'en' ? selectedPpsData.selfCareEn : selectedPpsData.selfCareTh}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 font-medium block text-[11px] uppercase tracking-wider mb-1">
                {language === 'en' ? '4. Oral Intake' : '4. การรับประทานอาหาร'}
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'en' ? selectedPpsData.intakeEn : selectedPpsData.intakeTh}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 font-medium block text-[11px] uppercase tracking-wider mb-1">
                {language === 'en' ? '5. Conscious Level' : '5. ระดับความรู้สึกตัว'}
              </span>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                {language === 'en' ? selectedPpsData.consciousEn : selectedPpsData.consciousTh}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
              <span className="text-teal-700 dark:text-teal-400 font-medium block text-[11px] uppercase tracking-wider mb-1">
                {language === 'en' ? '6. Clinical Stage' : '6. ระยะทางคลินิก'}
              </span>
              <p className="font-semibold text-teal-950 dark:text-teal-200">
                {language === 'en' ? selectedPpsData.stageEn : selectedPpsData.stageTh}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Disease-Specific Clinical Criteria */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-black text-sm">
              3
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'en'
                  ? 'Step 3: Disease-Specific Palliative Criteria'
                  : 'ขั้นตอนที่ 3: เกณฑ์ข้อบ่งชี้เฉพาะกลุ่มโรค (Organ-Failure & Cancer)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Clinical triggers for advanced cancer, heart failure, COPD, renal failure, cirrhosis, and neurology'
                  : 'เกณฑ์บ่งชี้สำหรับโรคมะเร็ง, หัวใจล้มเหลว, ปอดอุดกั้นเรื้อรัง, ไตวาย, ตับแข็ง, และระบบประสาท'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-6 pb-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {language === 'en' ? 'All Diseases' : 'ทุกกลุ่มโรค'}
          </button>
          {DISEASE_SPECIFIC_TRIGGERS.map((dis) => (
            <button
              key={dis.id}
              onClick={() => setActiveCategory(dis.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                activeCategory === dis.id
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{getDiseaseIcon(dis.id)}</span>
              <span>{language === 'en' ? dis.categoryEn.split('(')[0] : dis.categoryTh.split('(')[0]}</span>
            </button>
          ))}
        </div>

        {/* Disease Accordion List */}
        <div className="space-y-4">
          {filteredDiseases.map((disease) => {
            const isExpanded = expandedDiseaseId === disease.id;
            return (
              <div
                key={disease.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedDiseaseId(isExpanded ? null : disease.id)}
                  className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between text-left transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white dark:bg-slate-700 shadow-xs">
                      {getDiseaseIcon(disease.id)}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {language === 'en' ? disease.categoryEn : disease.categoryTh}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {disease.criteriaEn.length}{' '}
                        {language === 'en' ? 'Clinical Criteria' : 'เกณฑ์ทางคลินิก'}
                      </p>
                    </div>
                  </div>

                  <span className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-4">
                    <div>
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        {language === 'en' ? 'Trigger Criteria' : 'เกณฑ์การพิจารณา'}
                      </h5>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        {(language === 'en' ? disease.criteriaEn : disease.criteriaTh).map(
                          (crit, idx) => (
                            <li key={idx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                              <span className="leading-relaxed">{crit}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40">
                      <span className="text-xs font-bold text-teal-800 dark:text-teal-300 block mb-1">
                        💡 {language === 'en' ? 'Clinical Pearl & Guidance' : 'ข้อสังเกตและคำแนะนำทางคลินิก'}
                      </span>
                      <p className="text-xs text-teal-900 dark:text-teal-200 leading-relaxed font-medium">
                        {language === 'en' ? disease.clinicalNotesEn : disease.clinicalNotesTh}
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
