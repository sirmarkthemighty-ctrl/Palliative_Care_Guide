import React, { useState } from 'react';
import {
  Stethoscope,
  Pill,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language, SymptomDetail } from '../types';
import { SYMPTOMS_DATA } from '../data/symptomsData';

interface SymptomsTabProps {
  language: Language;
  searchQuery?: string;
}

export const SymptomsTab: React.FC<SymptomsTabProps> = ({ language, searchQuery = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSymptomId, setExpandedSymptomId] = useState<string | null>('pain');

  const categories = [
    { id: 'all', labelEn: 'All Symptoms', labelTh: 'ทุกอาการ', icon: '🩺' },
    { id: 'pain', labelEn: 'Pain Control', labelTh: 'ความปวด & มะเร็ง', icon: '⚡' },
    { id: 'dyspnea', labelEn: 'Dyspnea & Secretions', labelTh: 'เหนื่อยหอบ & เสมหะคั่ง', icon: '🫁' },
    { id: 'delirium', labelEn: 'Delirium & Agitation', labelTh: 'สับสนเพ้อ & กระสับกระส่าย', icon: '🧠' },
    { id: 'nausea', labelEn: 'Nausea & Vomiting', labelTh: 'คลื่นไส้ & อาเจียน', icon: '🤢' },
    { id: 'constipation', labelEn: 'Constipation & Bowel', labelTh: 'ท้องผูก & ลำไส้', icon: '🚽' }
  ];

  const filteredSymptoms = SYMPTOMS_DATA.filter((symptom) => {
    const matchesCategory =
      selectedCategory === 'all' || symptom.category === selectedCategory;

    if (!searchQuery.trim()) return matchesCategory;

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      symptom.nameEn.toLowerCase().includes(q) ||
      symptom.nameTh.toLowerCase().includes(q) ||
      symptom.summaryEn.toLowerCase().includes(q) ||
      symptom.summaryTh.toLowerCase().includes(q) ||
      symptom.pharmTableEn.some(
        (p) =>
          p.drug.toLowerCase().includes(q) ||
          p.indicationOrNote.toLowerCase().includes(q)
      ) ||
      symptom.pharmTableTh.some(
        (p) =>
          p.drug.toLowerCase().includes(q) ||
          p.indicationOrNote.toLowerCase().includes(q)
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-2xl bg-linear-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 shadow-lg border border-emerald-800/50">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Holistic Symptom Management' : 'การจัดการอาการรบกวนแบบองค์รวม'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en'
              ? 'Clinical Symptom Management Protocols'
              : 'แนวทางเวชปฏิบัติการจัดการอาการรบกวนในผู้ป่วยประคับประคอง'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Evidence-based pharmacotherapy and nursing comfort measures tailored to symptom mechanisms, avoiding common contraindications and drug toxicity.'
              : 'การรักษาด้วยยาและการพยาบาลบรรเทาอาการตามกลไกพยาธิสรีรวิทยา พร้อมตารางขนาดยา ข้อห้ามใช้ และข้อผิดพลาดที่ต้องระวัง'}
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{language === 'en' ? cat.labelEn : cat.labelTh}</span>
            </button>
          );
        })}
      </div>

      {/* Symptom Cards List */}
      <div className="space-y-6">
        {filteredSymptoms.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500">
            <p className="text-base font-semibold">
              {language === 'en' ? 'No matching symptoms found.' : 'ไม่พบอาการที่ค้นหา'}
            </p>
            <p className="text-xs mt-1">
              {language === 'en'
                ? 'Try clearing the search query or switching categories.'
                : 'ลองล้างคำค้นหาหรือเลือกหมวดหมู่อื่น'}
            </p>
          </div>
        ) : (
          filteredSymptoms.map((symptom) => {
            const isExpanded = expandedSymptomId === symptom.id;
            return (
              <div
                key={symptom.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-all"
              >
                {/* Accordion Header */}
                <button
                  onClick={() =>
                    setExpandedSymptomId(isExpanded ? null : symptom.id)
                  }
                  className="w-full p-5 sm:p-6 bg-slate-50/70 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/80 flex items-center justify-between text-left transition-colors border-b border-slate-200 dark:border-slate-800"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {language === 'en' ? symptom.nameEn : symptom.nameTh}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        {language === 'en' ? symptom.summaryEn : symptom.summaryTh}
                      </p>
                    </div>
                  </div>

                  <span className="text-slate-400">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>

                {/* Expanded Symptom Body */}
                {isExpanded && (
                  <div className="p-6 space-y-6">
                    {/* Summary Card */}
                    <div className="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 text-xs sm:text-sm text-teal-950 dark:text-teal-200 leading-relaxed font-medium">
                      {language === 'en' ? symptom.summaryEn : symptom.summaryTh}
                    </div>

                    {/* Assessment & Non-Pharmacologic in 2 Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Clinical Assessment */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                          <span>{language === 'en' ? 'Clinical Assessment & Workup' : 'การประเมินและการซักประวัติ'}</span>
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          {(language === 'en'
                            ? symptom.assessmentEn
                            : symptom.assessmentTh
                          ).map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Non-Pharmacologic Measures */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-amber-500" />
                          <span>{language === 'en' ? 'Non-Pharmacologic & Nursing Comfort' : 'การพยาบาลและการดูแลโดยไม่ใช้ยา'}</span>
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          {(language === 'en'
                            ? symptom.nonPharmEn
                            : symptom.nonPharmTh
                          ).map((pt, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                              <span className="leading-relaxed">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Pharmacotherapy Table */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Pill className="w-4 h-4 text-teal-600" />
                        <span>{language === 'en' ? 'Pharmacotherapy Regimens & Doses' : 'ตารางยา ขนาดยา และวิธีบริหาร'}</span>
                      </h4>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-700">
                            <tr>
                              <th className="p-3 w-1/4">{language === 'en' ? 'Drug Name' : 'ชื่อยา'}</th>
                              <th className="p-3 w-1/6">{language === 'en' ? 'Route' : 'ทางให้'}</th>
                              <th className="p-3 w-1/5">{language === 'en' ? 'Dose' : 'ขนาดยา'}</th>
                              <th className="p-3 w-1/6">{language === 'en' ? 'Frequency' : 'ความถี่'}</th>
                              <th className="p-3 w-1/4">{language === 'en' ? 'Indication / Notes' : 'ข้อบ่งใช้ / ข้อควรระวัง'}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                            {(language === 'en'
                              ? symptom.pharmTableEn
                              : symptom.pharmTableTh
                            ).map((row, idx) => (
                              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <td className="p-3 font-bold text-slate-900 dark:text-white">
                                  {row.drug}
                                </td>
                                <td className="p-3">
                                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
                                    {row.route}
                                  </span>
                                </td>
                                <td className="p-3 font-semibold text-teal-700 dark:text-teal-300">
                                  {row.dose}
                                </td>
                                <td className="p-3">{row.frequency}</td>
                                <td className="p-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                                  {row.indicationOrNote}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Clinical Pearls & Contraindications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Clinical Pearls */}
                      <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block mb-2 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-emerald-600" />
                          {language === 'en' ? 'Clinical Pearls & Rules of Thumb' : 'ข้อสังเกตและแนวทางปฏิบัติสำคัญ'}
                        </span>
                        <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-300">
                          {(language === 'en'
                            ? symptom.clinicalPearlsEn
                            : symptom.clinicalPearlsTh
                          ).map((pearl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span className="leading-relaxed">{pearl}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Strict Contraindications */}
                      <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
                        <span className="text-xs font-bold text-rose-900 dark:text-rose-200 block mb-2 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          {language === 'en' ? 'Critical Contraindications & Traps' : 'ข้อห้ามใช้เด็ดขาดและข้อผิดพลาดร้ายแรง'}
                        </span>
                        <ul className="space-y-1.5 text-xs text-rose-950 dark:text-rose-300">
                          {(language === 'en'
                            ? symptom.contraindicationsEn
                            : symptom.contraindicationsTh
                          ).map((ci, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-rose-600 font-bold">✕</span>
                              <span className="leading-relaxed">{ci}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
