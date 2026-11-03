import React, { useState } from 'react';
import {
  X,
  AlertOctagon,
  ShieldAlert,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  Pill,
  Copy,
  Check
} from 'lucide-react';
import { Language, PalliativeEmergency } from '../types';
import { PALLIATIVE_EMERGENCIES } from '../data/emergenciesData';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [selectedEmergencyId, setSelectedEmergencyId] = useState<string>('opioid_toxicity');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentEmergency: PalliativeEmergency =
    PALLIATIVE_EMERGENCIES.find((e) => e.id === selectedEmergencyId) || PALLIATIVE_EMERGENCIES[0];

  const handleCopyProtocol = (emergency: PalliativeEmergency) => {
    const text =
      language === 'en'
        ? `EMERGENCY PROTOCOL: ${emergency.nameEn}\nUrgency: ${emergency.urgencyEn}\n\nImmediate Management:\n${emergency.immediateManagementEn
            .map((m) => `• ${m}`)
            .join('\n')}\n\nMedications:\n${emergency.medicationsEn
            .map((med) => `• ${med}`)
            .join('\n')}\n\nCritical Cautions:\n${emergency.cautionsEn
            .map((c) => `⚠️ ${c}`)
            .join('\n')}`
        : `แนวทางปฏิบัติภาวะฉุกเฉิน: ${emergency.nameTh}\nความเร่งด่วน: ${emergency.urgencyTh}\n\nการจัดการเบื้องต้นทันที:\n${emergency.immediateManagementTh
            .map((m) => `• ${m}`)
            .join('\n')}\n\nยาที่ต้องใช้:\n${emergency.medicationsTh
            .map((med) => `• ${med}`)
            .join('\n')}\n\nข้อควรระวังสำคัญ:\n${emergency.cautionsTh
            .map((c) => `⚠️ ${c}`)
            .join('\n')}`;

    navigator.clipboard.writeText(text);
    setCopiedId(emergency.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-rose-200 dark:border-rose-900/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-linear-to-r from-rose-700 via-rose-800 to-slate-900 text-white flex items-center justify-between border-b border-rose-600">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-600/50 border border-rose-400">
              <AlertOctagon className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                <span>{language === 'en' ? 'Palliative Care Emergencies' : 'ภาวะฉุกเฉินในเวชศาสตร์ประคับประคอง'}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-rose-500 text-white">
                  URGENT / STAT
                </span>
              </h2>
              <p className="text-xs text-rose-200">
                {language === 'en'
                  ? 'Immediate bedside management protocols for acute life-threatening or high-distress scenarios'
                  : 'แนวทางปฏิบัติข้างเตียงอย่างเร่งด่วนสำหรับภาวะวิกฤตและความทุกข์ทรมานเฉียบพลัน'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-rose-200 hover:text-white hover:bg-rose-700/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Emergency Tabs */}
        <div className="flex overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-4 py-2 gap-2">
          {PALLIATIVE_EMERGENCIES.map((em) => {
            const isSelected = em.id === selectedEmergencyId;
            return (
              <button
                key={em.id}
                onClick={() => setSelectedEmergencyId(em.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <span>{em.id === 'opioid_toxicity' ? '💊' : em.id === 'mscc' ? '🦴' : em.id === 'massive_hemoptysis' ? '🩸' : em.id === 'svcs' ? '🫁' : em.id === 'hypercalcemia' ? '🧪' : '⚠️'}</span>
                <span>{language === 'en' ? em.nameEn.split('(')[0] : em.nameTh.split('(')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Emergency Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-white dark:bg-slate-900">
          {/* Title and urgency badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {language === 'en' ? currentEmergency.nameEn : currentEmergency.nameTh}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 mt-0.5 flex items-center gap-1.5">
                <Flame className="w-4 h-4 shrink-0" />
                {language === 'en' ? currentEmergency.urgencyEn : currentEmergency.urgencyTh}
              </p>
            </div>

            <button
              onClick={() => handleCopyProtocol(currentEmergency)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold self-start sm:self-center shadow-xs transition-colors"
            >
              {copiedId === currentEmergency.id ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{language === 'en' ? 'Copied' : 'คัดลอกแล้ว'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{language === 'en' ? 'Copy Protocol' : 'คัดลอกแนวทาง'}</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clinical Presentation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Stethoscope className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{language === 'en' ? 'Clinical Presentation & Red Flags' : 'อาการแสดงและสัญญาณอันตราย'}</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                {(language === 'en'
                  ? currentEmergency.clinicalPresentationEn
                  : currentEmergency.clinicalPresentationTh
                ).map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medications & Doses */}
            <div className="p-4 rounded-xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                <span>{language === 'en' ? 'Emergency Medications & Doses' : 'ยาฉุกเฉินและขนาดยา'}</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                {(language === 'en'
                  ? currentEmergency.medicationsEn
                  : currentEmergency.medicationsTh
                ).map((med, idx) => (
                  <li
                    key={idx}
                    className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900/30 font-medium"
                  >
                    {med}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Immediate Step-by-Step Management */}
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{language === 'en' ? 'Immediate Action Protocol (Step-by-Step)' : 'ขั้นตอนการปฏิบัติข้างเตียงทันที'}</span>
            </h4>
            <div className="space-y-2.5">
              {(language === 'en'
                ? currentEmergency.immediateManagementEn
                : currentEmergency.immediateManagementTh
              ).map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Cautions & Clinical Pearls */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800/50">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>{language === 'en' ? 'Critical Pitfalls & Clinical Warnings' : 'ข้อควรระวังสำคัญและข้อผิดพลาดที่พบบ่อย'}</span>
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-800 dark:text-amber-300">
              {(language === 'en'
                ? currentEmergency.cautionsEn
                : currentEmergency.cautionsTh
              ).map((caution, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{caution}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
          <span>{language === 'en' ? 'Source: Thai CPG 2563 & Oxford Textbook of Palliative Medicine' : 'อ้างอิง: แนวทาง CPG กรมการแพทย์ 2563 และ Oxford Palliative Medicine'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-colors"
          >
            {language === 'en' ? 'Close' : 'ปิด'}
          </button>
        </div>
      </div>
    </div>
  );
};
