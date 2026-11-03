/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, NavTabId } from './types';
import { Header } from './components/Header';
import { EmergencyModal } from './components/EmergencyModal';
import { OrderSetModal } from './components/OrderSetModal';
import { WhenToStartTab } from './components/WhenToStartTab';
import { AcpTab } from './components/AcpTab';
import { OpioidCalcTab } from './components/OpioidCalcTab';
import { SymptomsTab } from './components/SymptomsTab';
import { DyingStageTab } from './components/DyingStageTab';
import { DyingCareTab } from './components/DyingCareTab';
import { ChangelogModal } from './components/ChangelogModal';
import { ReferencesTab } from './components/ReferencesTab';
import { CLINICAL_REFERENCES } from './data/referencesData';
import {
  AlertTriangle,
  BookOpen,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

// Storage can throw (private window, blocked site data); the app must work without it.
const safeStore = (key: string, value?: string): string | null => {
  try {
    if (value === undefined) return localStorage.getItem(key);
    localStorage.setItem(key, value);
  } catch {}
  return null;
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTabId>('when-to-start');
  const [language, setLanguage] = useState<Language>(() => {
    const saved = safeStore('palcare_lang');
    return (saved === 'en' || saved === 'th' ? saved : 'th') as Language;
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = safeStore('palcare_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isOrderSetOpen, setIsOrderSetOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isChangelogOpen, setIsChangelogOpen] = useState<boolean>(false);
  const [isRefsOpen, setIsRefsOpen] = useState<boolean>(false);

  useEffect(() => {
    safeStore('palcare_lang', language);
  }, [language]);

  useEffect(() => {
    safeStore('palcare_theme', isDarkMode ? 'dark' : 'light');
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // When search query is entered and user isn't on symptoms, switch smoothly
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 2 && currentTab !== 'symptoms') {
      setCurrentTab('symptoms');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0b1220] text-slate-900 dark:text-slate-100 p-3 sm:p-4 md:p-6 transition-colors">
      <div className="max-w-6xl mx-auto relative pt-10 md:pt-0">
        {/* Top Header & Sticky Navigation matching Bronchodilator Guide */}
        <Header
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          language={language}
          onLanguageChange={setLanguage}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onOpenOrderSetModal={() => setIsOrderSetOpen(true)}
          onOpenChangelog={() => setIsChangelogOpen(true)}
        />

        {/* Main Tab Content */}
        <main className="mt-4 md:mt-6">
          {currentTab === 'when-to-start' && <WhenToStartTab language={language} />}
          {currentTab === 'acp-guide' && <AcpTab language={language} />}
          {currentTab === 'opioid-calc' && <OpioidCalcTab language={language} />}
          {currentTab === 'symptoms' && (
            <SymptomsTab language={language} searchQuery={searchQuery} />
          )}
          {currentTab === 'dying-stage' && <DyingStageTab language={language} />}
          {currentTab === 'dying-care' && <DyingCareTab language={language} />}
          {currentTab === 'references' && <ReferencesTab language={language} />}
        </main>

        {/* Bedside Emergency Modal */}
        <EmergencyModal
          isOpen={isEmergencyOpen}
          onClose={() => setIsEmergencyOpen(false)}
          language={language}
        />

        <ChangelogModal isOpen={isChangelogOpen} onClose={() => setIsChangelogOpen(false)} language={language} />

        {/* Physician Terminal Comfort Order Set Modal */}
        <OrderSetModal
          isOpen={isOrderSetOpen}
          onClose={() => setIsOrderSetOpen(false)}
          language={language}
        />

        {/* Disclaimer Section matching Bronchodilator Guide style */}
        <section
          id="disclaimer-heading"
          className="mt-10 md:mt-14 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-4 md:p-5 print:hidden"
          aria-labelledby="disclaimer-heading"
        >
          <h2 className="text-sm font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>
              {language === 'en'
                ? 'Clinical Disclaimer & Scope of Use'
                : 'ข้อจำกัดความรับผิดชอบทางการแพทย์และขอบเขตการใช้งาน'}
            </span>
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs md:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed">
            {language === 'en' ? (
              <>
                <li>This guide is intended exclusively for licensed medical practitioners and clinical healthcare teams.</li>
                <li>All opioid and sedative doses require independent clinical verification and personalization based on patient organ function (eGFR, liver status), frailty, prior drug exposure, and cross-tolerance.</li>
                <li>In critical emergencies (acute dyspnea crisis, catastrophic hemorrhage, spinal cord compression), prioritize immediate bedside resuscitation and specialist consultation.</li>
                <li>Advance Care Planning protocols align with the Thai National Health Act B.E. 2550 Section 12.</li>
              </>
            ) : (
              <>
                <li>คู่มือนี้จัดทำขึ้นสำหรับแพทย์และบุคลากรทางการแพทย์เพื่อใช้เป็นเครื่องมือประกอบการตัดสินใจทางคลินิก</li>
                <li>การปรับขนาดยา (โดยเฉพาะยากลุ่มโอปิออยด์และยาระงับประสาท) ต้องได้รับการตรวจสอบซ้ำและปรับขนาดยาตามการทำงานของไต ตับ ประวัติการใช้ยาเดิม และสภาวะของผู้ป่วยแต่ละราย</li>
                <li>ในภาวะวิกฤตฉุกเฉิน (เหนื่อยหอบรุนแรง, เลือดออกปริมาณมาก, ไขสันหลังถูกกดทับ) ให้ปฏิบัติตามแนวทางฉุกเฉินข้างเตียงและปรึกษาแพทย์เฉพาะทางทันที</li>
                <li>การวางแผนการดูแลล่วงหน้า (ACP) และหนังสือแสดงเจตนา (Living Will) ปฏิบัติตาม พ.ร.บ. สุขภาพแห่งชาติ พ.ศ. 2550 มาตรา 12</li>
              </>
            )}
          </ul>
          <p className="mt-2.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
            {language === 'en'
              ? 'Evidence Base: Ministry of Public Health Thailand CPG 2563, Thai Palliative Care Society & International Standards'
              : 'เกณฑ์มาตรฐาน: อ้างอิงคู่มือเวชปฏิบัติ กรมการแพทย์ กระทรวงสาธารณสุข พ.ศ. 2563 และ สมาคมบริบาลผู้ป่วยระยะท้าย'}
          </p>
        </section>

        {/* Collapsible References Section matching Bronchodilator Guide style */}
        <section className="mt-4 pt-4 border-t border-slate-200 dark:border-[#263449] print:hidden">
          <button
            type="button"
            onClick={() => setIsRefsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-[#263449] bg-white dark:bg-[#151f32] px-4 py-3 hover:bg-slate-50 dark:hover:bg-[#1b2740] transition-colors cursor-pointer"
          >
            <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span>
                {language === 'en'
                  ? 'Clinical References & CPG Guidelines'
                  : 'เอกสารอ้างอิงและแนวทางเวชปฏิบัติ'}
              </span>
              <span className="text-slate-400 font-bold normal-case">({CLINICAL_REFERENCES.length})</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${isRefsOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isRefsOpen && (
            <div className="mt-3 p-4 rounded-xl border border-slate-200 dark:border-[#263449] bg-white dark:bg-[#151f32] space-y-3.5 animate-fadeIn">
              {CLINICAL_REFERENCES.map((ref, idx) => (
                <div
                  key={ref.id}
                  className="text-xs pb-3 border-b border-slate-100 dark:border-[#263449]/70 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">[{idx + 1}]</span>
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {ref.sourceType}
                    </span>
                    {ref.url && (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 ml-auto font-medium"
                      >
                        <span>Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    {language === 'en' ? ref.citationEn : ref.citationTh}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Footer matching Bronchodilator Guide */}
        <footer className="mt-8 pb-12 pt-4 border-t border-slate-200 dark:border-[#263449] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-semibold text-slate-600 dark:text-slate-400">
            Palliative Care Guide — Clinical Decision Support
          </p>
          <p className="text-[11px] font-semibold text-indigo-500 dark:text-indigo-400">
            Made by Warodom Phaenthong, M.D.
          </p>
        </footer>
      </div>
    </div>
  );
}
