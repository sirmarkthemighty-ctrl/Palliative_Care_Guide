import React, { useState } from 'react';
import {
  Scale,
  MessageSquare,
  Users,
  Copy,
  Check,
  ShieldCheck,
  FileText,
  AlertCircle,
  HeartHandshake,
  Volume2
} from 'lucide-react';
import { Language, AcpScriptItem } from '../types';
import {
  ACP_LEGAL_SECTION_12,
  SURROGATE_RULES,
  SPIKES_PROTOCOL,
  AND_VS_DNR
} from '../data/acpData';

interface AcpTabProps {
  language: Language;
}

export const AcpTab: React.FC<AcpTabProps> = ({ language }) => {
  const [activeSpikesStage, setActiveSpikesStage] = useState<number>(0);
  const [copiedScriptIdx, setCopiedScriptIdx] = useState<number | null>(null);

  const handleCopyScript = (script: string, idx: number) => {
    navigator.clipboard.writeText(script);
    setCopiedScriptIdx(idx);
    setTimeout(() => setCopiedScriptIdx(null), 2000);
  };

  const currentSpikesItem: AcpScriptItem = SPIKES_PROTOCOL[activeSpikesStage];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl bg-linear-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg border border-blue-800/50">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Scale className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Law & Clinical Ethics' : 'กฎหมายและจริยธรรมทางการแพทย์'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en'
              ? 'Advance Care Planning (ACP) & Thai Living Will'
              : 'การวางแผนการดูแลล่วงหน้า (ACP) และพินัยกรรมชีวิต มาตรา 12'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Empower patients with self-determination while protecting physicians legally under Section 12 of the National Health Act B.E. 2550.'
              : 'ส่งเสริมสิทธิในการตัดสินใจของผู้ป่วย ควบคู่กับการคุ้มครองความรับผิดชอบของแพทย์และบุคลากรทางการแพทย์ตามมาตรา 12 พ.ร.บ. สุขภาพแห่งชาติ พ.ศ. 2550'}
          </p>
        </div>
      </div>

      {/* Section 12 & Legal Immunity */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-black">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {language === 'en' ? ACP_LEGAL_SECTION_12.lawTitleEn : ACP_LEGAL_SECTION_12.lawTitleTh}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Statutory physician liability immunity and right to natural death'
                : 'การคุ้มครองตามกฎหมายให้แพทย์พ้นจากความรับผิดทั้งปวง'}
            </p>
          </div>
        </div>

        {/* Legal Text Quote */}
        <div className="p-5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border-l-4 border-blue-600 text-xs sm:text-sm text-blue-950 dark:text-blue-200 font-medium leading-relaxed italic">
          {language === 'en' ? ACP_LEGAL_SECTION_12.lawTextEn : ACP_LEGAL_SECTION_12.lawTextTh}
        </div>

        {/* Comparison: Living Will vs ACP */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>
              {language === 'en'
                ? 'Clinical Comparison: Advance Care Planning (ACP) vs Living Will (Section 12)'
                : 'ตารางเปรียบเทียบ: การวางแผนการดูแลล่วงหน้า (ACP) กับ พินัยกรรมชีวิต (Living Will มาตรา 12)'}
            </span>
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-3 w-1/4">{language === 'en' ? 'Aspect' : 'ประเด็น'}</th>
                  <th className="p-3 w-3/8 text-blue-800 dark:text-blue-300">
                    {language === 'en' ? 'Advance Care Planning (ACP)' : 'การวางแผนการดูแลล่วงหน้า (ACP)'}
                  </th>
                  <th className="p-3 w-3/8 text-emerald-800 dark:text-emerald-300">
                    {language === 'en' ? 'Living Will (Section 12)' : 'พินัยกรรมชีวิต (มาตรา 12)'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {(language === 'en'
                  ? ACP_LEGAL_SECTION_12.acpVsLivingWillEn
                  : ACP_LEGAL_SECTION_12.acpVsLivingWillTh
                ).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-semibold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/30">
                      {row.aspect}
                    </td>
                    <td className="p-3 leading-relaxed">{row.acp}</td>
                    <td className="p-3 leading-relaxed">{row.livingWill}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Surrogate Decision Maker Rules */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 flex items-center justify-center font-black">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {language === 'en' ? SURROGATE_RULES.titleEn : SURROGATE_RULES.titleTh}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Substituted Judgment principle & navigating Thai family dynamics'
                : 'หลักการตัดสินใจแทน (Substituted Judgment) และการแก้ปัญหาความขัดแย้งในครอบครัว'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {(language === 'en' ? SURROGATE_RULES.pointsEn : SURROGATE_RULES.pointsTh).map(
            (point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/70 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="leading-relaxed font-medium">{point}</p>
              </div>
            )
          )}
        </div>

        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
          <span className="font-bold flex items-center gap-1.5 mb-1">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            {language === 'en' ? 'Thai Cultural Insight: Filial Piety vs Ingratitude' : 'ข้อคิดทางวัฒนธรรมไทย: ความกตัญญูกับการยื้อความทุกข์ทรมาน'}
          </span>
          <p className="leading-relaxed">
            {language === 'en'
              ? 'Thai adult children often fear social judgment of "not being filial" (กลัวคนอื่นว่าไม่กตัญญู) if they agree to withhold invasive CPR. Reframe filial piety for them: "True gratitude and Buddhist filial love is ensuring our parent’s final journey is tranquil, free from physical trauma, and surrounded by peaceful love."'
              : 'ลูกหลานไทยมักมีความกังวลใจเรื่อง "ความกตัญญู" กลัวญาติคนอื่นตำหนิว่าไม่ทำถึงที่สุด แพทย์ควรช่วยเปลี่ยนกรอบความคิด (Reframing): "ความกตัญญูที่แท้จริงคือการดูแลให้ท่านไม่เจ็บปวดทรมาน ให้ท่านได้จากไปอย่างสงบตามธรรมชาติท่ามกลางความรักของลูกหลาน ไม่ใช่การกดหน้าอกหรือใส่ท่อยื้อสังขารที่สร้างความทุกข์"'}
          </p>
        </div>
      </section>

      {/* SPIKES Protocol with Word-for-Word Physician Scripts */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-black">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'en'
                  ? 'SPIKES Protocol: Breaking Bad News Dialogue'
                  : 'กระบวนการสื่อสารข่าวร้าย SPIKES Protocol (พร้อมบทสนทนาตัวอย่าง)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Word-for-word physician scripts, empathy statements, and common pitfalls'
                  : 'บทพูดของแพทย์คำต่อคำ การแสดงความเห็นอกเห็นใจ และข้อควรระวัง'}
              </p>
            </div>
          </div>
        </div>

        {/* SPIKES Step Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SPIKES_PROTOCOL.map((item, idx) => {
            const isSelected = activeSpikesStage === idx;
            const letter = item.stage.split(' - ')[0];
            return (
              <button
                key={idx}
                onClick={() => setActiveSpikesStage(idx)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="block text-xl font-black">{letter}</span>
                <span className="text-[11px] font-semibold block truncate">
                  {language === 'en' ? item.stage.split(' - ')[1] : item.stageTh.split(' - ')[1]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected SPIKES Stage Detail */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block mb-0.5">
                {language === 'en' ? `SPIKES Step ${activeSpikesStage + 1} of 6` : `ขั้นตอนที่ ${activeSpikesStage + 1} จาก 6`}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {language === 'en' ? currentSpikesItem.stage : currentSpikesItem.stageTh}
              </h4>
            </div>

            <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 self-start sm:self-center">
              🎯 {language === 'en' ? currentSpikesItem.goalEn : currentSpikesItem.goalTh}
            </span>
          </div>

          {/* Word-for-Word Script */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-teal-200 dark:border-teal-900 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                {language === 'en' ? 'Doctor Dialogue Script (Exact Phrasing):' : 'บทสนทนาตัวอย่างสำหรับแพทย์ (คำพูดแนะนำ):'}
              </span>

              <button
                onClick={() =>
                  handleCopyScript(
                    language === 'en'
                      ? currentSpikesItem.physicianScriptEn
                      : currentSpikesItem.physicianScriptTh,
                    activeSpikesStage
                  )
                }
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors"
              >
                {copiedScriptIdx === activeSpikesStage ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{language === 'en' ? 'Copied' : 'คัดลอกแล้ว'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Copy Script' : 'คัดลอกบทพูด'}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed bg-teal-50/50 dark:bg-teal-950/20 p-3.5 rounded-lg border border-teal-100 dark:border-teal-900/30">
              {language === 'en'
                ? currentSpikesItem.physicianScriptEn
                : currentSpikesItem.physicianScriptTh}
            </p>
          </div>

          {/* Common Pitfall */}
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs sm:text-sm text-rose-900 dark:text-rose-300 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-0.5">
                {language === 'en' ? 'Common Pitfall to Avoid:' : 'ข้อผิดพลาดที่ต้องระวัง:'}
              </span>
              <p className="leading-relaxed">
                {language === 'en' ? currentSpikesItem.pitfallsEn : currentSpikesItem.pitfallsTh}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AND vs DNR Section */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {language === 'en' ? AND_VS_DNR.titleEn : AND_VS_DNR.titleTh}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Replacing negative "DNR" with positive "Allow Natural Death" (AND)'
                : 'การเปลี่ยนมุมมองจากการปฏิเสธการกู้ชีพ (DNR) สู่การอนุญาตให้จากไปตามธรรมชาติ (AND)'}
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {language === 'en' ? AND_VS_DNR.descriptionEn : AND_VS_DNR.descriptionTh}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          {AND_VS_DNR.comparison.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block pb-1 border-b border-slate-200 dark:border-slate-700">
                {item.action}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'en' ? item.andConceptEn : item.andConceptTh}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
