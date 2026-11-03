import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Scale,
  Award,
  Globe,
  CheckCircle,
  FileText
} from 'lucide-react';
import { Language, PalliativeReference } from '../types';
import { CLINICAL_REFERENCES } from '../data/referencesData';

interface ReferencesTabProps {
  language: Language;
}

export const ReferencesTab: React.FC<ReferencesTabProps> = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelEn: 'All References', labelTh: 'แหล่งอ้างอิงทั้งหมด', icon: '📚' },
    { id: 'cpg_thai', labelEn: 'Thai National CPG', labelTh: 'คู่มือ CPG กรมการแพทย์', icon: '🇹🇭' },
    { id: 'law', labelEn: 'Thai Legislation & Rulings', labelTh: 'กฎหมาย & คำพิพากษาศาล', icon: '⚖️' },
    { id: 'international', labelEn: 'International (WHO/EAPC/NCCN)', labelTh: 'แนวทางสากล (WHO/EAPC)', icon: '🌐' }
  ];

  const filteredReferences = CLINICAL_REFERENCES.filter((ref) => {
    if (selectedCategory === 'all') return true;
    return ref.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-2xl bg-linear-to-r from-slate-800 via-slate-900 to-teal-950 text-white p-6 sm:p-8 shadow-lg border border-slate-700/50">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-500/20 border border-slate-400/40 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Evidence-Based Medicine' : 'หลักฐานเชิงประจักษ์และแนวทางมาตรฐาน'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en'
              ? 'Clinical Guidelines, Law & Scientific References'
              : 'แนวทางเวชปฏิบัติ กฎหมาย และเอกสารอ้างอิงทางวิชาการ'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Every calculation, protocol, and script in Palliative Care Guide is grounded in the Thai Ministry of Public Health CPG 2563, National Health Act Section 12, WHO, EAPC, and NCCN standards.'
              : 'เนื้อหา การคำนวณ และแนวทางปฏิบัติทั้งหมดในคู่มือนี้อ้างอิงตามคู่มือการดูแลผู้ป่วยแบบประคับประคองและระยะท้าย กรมการแพทย์ พ.ศ. 2563, พ.ร.บ. สุขภาพแห่งชาติ มาตรา 12 และมาตรฐานสากล'}
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{language === 'en' ? cat.labelEn : cat.labelTh}</span>
            </button>
          );
        })}
      </div>

      {/* Reference Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReferences.map((ref) => (
          <div
            key={ref.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition-colors"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  {ref.sourceType}
                </span>

                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'en' ? 'Official Link' : 'ลิงก์ทางการ'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                {language === 'en' ? ref.citationEn : ref.citationTh}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                {language === 'en' ? ref.descriptionEn : ref.descriptionTh}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-teal-500" />
              <span>{language === 'en' ? 'Verified Clinical Source' : 'แหล่งข้อมูลเวชปฏิบัติที่ผ่านการรับรอง'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
