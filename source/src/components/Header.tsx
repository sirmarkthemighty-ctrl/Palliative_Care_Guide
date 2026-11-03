import React from 'react';
import {
  Activity,
  FileCheck2,
  Pill,
  Stethoscope,
  Clock,
  Heart,
  BookOpen,
  Search,
  X,
  AlertTriangle,
  Sun,
  Moon
} from 'lucide-react';
import { Language, NavTabId } from '../types';
import { APP_VERSION } from './ChangelogModal';

interface HeaderProps {
  currentTab: NavTabId;
  onTabChange: (tab: NavTabId) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenEmergency: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenOrderSetModal: () => void;
  onOpenChangelog: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  language,
  onLanguageChange,
  isDarkMode,
  onToggleDarkMode,
  onOpenEmergency,
  searchQuery,
  onSearchChange,
  onOpenOrderSetModal,
  onOpenChangelog
}) => {
  const guideTabs: {
    id: NavTabId;
    labelEn: string;
    labelTh: string;
    shortEn: string;
    shortTh: string;
    tone: string;
    Icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'when-to-start',
      labelEn: 'When to Start',
      labelTh: 'เริ่มเมื่อใด (SPICT)',
      shortEn: 'Start',
      shortTh: 'คัดกรอง',
      tone: 'bg-teal-600 hover:bg-teal-700 border-teal-700',
      Icon: Activity
    },
    {
      id: 'acp-guide',
      labelEn: 'ACP & Law',
      labelTh: 'วางแผนล่วงหน้า (ม.12)',
      shortEn: 'ACP/Law',
      shortTh: 'ACP/ม.12',
      tone: 'bg-indigo-600 hover:bg-indigo-700 border-indigo-700',
      Icon: FileCheck2
    },
    {
      id: 'opioid-calc',
      labelEn: 'Opioid Calc',
      labelTh: 'คำนวณโอปิออยด์',
      shortEn: 'Opioids',
      shortTh: 'โอปิออยด์',
      tone: 'bg-blue-600 hover:bg-blue-700 border-blue-700',
      Icon: Pill
    },
    {
      id: 'symptoms',
      labelEn: 'Symptoms',
      labelTh: 'จัดการอาการรบกวน',
      shortEn: 'Symptoms',
      shortTh: 'อาการ',
      tone: 'bg-emerald-600 hover:bg-emerald-700 border-emerald-700',
      Icon: Stethoscope
    },
    {
      id: 'dying-stage',
      labelEn: 'Recognizing Dying',
      labelTh: 'ประเมินวาระท้าย',
      shortEn: 'Dying',
      shortTh: 'วาระท้าย',
      tone: 'bg-amber-600 hover:bg-amber-700 border-amber-700',
      Icon: Clock
    },
    {
      id: 'dying-care',
      labelEn: 'End-of-Life Care',
      labelTh: 'การดูแลระยะสุดท้าย',
      shortEn: 'Care',
      shortTh: 'ดูแลระยะท้าย',
      tone: 'bg-violet-600 hover:bg-violet-700 border-violet-700',
      Icon: Heart
    },
    {
      id: 'references',
      labelEn: 'CPG & Evidence',
      labelTh: 'แนวทาง CPG & อ้างอิง',
      shortEn: 'CPG',
      shortTh: 'CPG/อ้างอิง',
      tone: 'bg-slate-600 hover:bg-slate-700 border-slate-700',
      Icon: BookOpen
    }
  ];

  return (
    <>
      {/* Top Right Controls: positioned in the top right corner matching Bronchodilator Guide */}
      <div className="absolute top-0 right-0 flex items-center gap-1.5 md:gap-2 z-20 print:hidden">
        {/* Version / Guideline Edition Pill */}
        <button onClick={onOpenChangelog} title={language === 'en' ? "What's new" : 'มีอะไรใหม่'} className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-white dark:bg-[#151f32] shadow-xs px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-[#263449] flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1b2740]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>v{APP_VERSION} · CPG 2563</span>
        </button>

        {/* Language Toggle */}
        <button
          onClick={() => onLanguageChange(language === 'en' ? 'th' : 'en')}
          className="text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#151f32] shadow-xs px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-[#263449] flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-[#1b2740] transition-all cursor-pointer"
          title={language === 'en' ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English'}
        >
          {language === 'en' ? 'ไทย' : 'EN'}
        </button>

        {/* Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          className="w-7 h-7 text-slate-600 dark:text-slate-300 bg-white dark:bg-[#151f32] shadow-xs rounded-full border border-slate-200 dark:border-[#263449] flex items-center justify-center hover:bg-slate-50 dark:hover:bg-[#1b2740] hover:text-slate-700 transition-all cursor-pointer"
        >
          {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Header */}
      <header className="mb-3 md:mb-4">
        <div>
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 md:mb-2 leading-tight sm:pr-32 md:pr-48">
            Palliative Care Guide
          </h1>
          <p className="hidden sm:block text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-normal">
            {language === 'en'
              ? 'Clinical Decision Support for Palliative Care, Opioid Conversion, and End-of-Life Management'
              : 'คู่มือการดูแลผู้ป่วยประคับประคองและระงับปวดสำหรับแพทย์ (อ้างอิง CPG กรมการแพทย์ พ.ศ. 2563 & พ.ร.บ. สุขภาพแห่งชาติ ม.12)'}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:block">
            <p className="text-[10px] md:text-xs font-semibold text-indigo-500 dark:text-indigo-400 sm:mt-1">
              Made by Warodom Phaenthong, M.D.
            </p>
            <a
              href="#disclaimer-heading"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('disclaimer-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="block sm:mt-1 text-[11px] md:text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline print:hidden cursor-pointer"
            >
              {language === 'en' ? 'Disclaimer & Scope of Use' : 'ข้อจำกัดความรับผิดชอบและขอบเขตการใช้งาน'}
            </a>
          </div>
        </div>
      </header>

      {/* Guides and search row: always pinned (Sticky Bar) */}
      <div className="sticky top-0 z-30 pt-2 pb-2 md:pt-3 md:pb-2.5 -mt-2 md:-mt-3 bg-slate-100/95 dark:bg-[#0b1220]/95 backdrop-blur-md print:hidden">
        {/* Guides Row: colorful icon tiles matching Bronchodilator Guide */}
        <div className="grid grid-cols-4 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 print:hidden w-full mb-2">
          {guideTabs.map((guide) => {
            const isActive = currentTab === guide.id;
            const Icon = guide.Icon;
            return (
              <button
                key={guide.id}
                onClick={() => {
                  onTabChange(guide.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                aria-label={language === 'en' ? guide.labelEn : guide.labelTh}
                title={language === 'en' ? guide.labelEn : guide.labelTh}
                className={`flex flex-col sm:flex-row min-w-0 sm:flex-grow-0 items-center justify-center gap-0.5 sm:gap-1.5 md:gap-2 ${guide.tone} border text-white px-0.5 py-1.5 sm:px-3 sm:py-2 md:px-3.5 md:py-2 rounded-lg font-bold shadow-xs transition-all active:scale-95 text-xs md:text-sm cursor-pointer ${
                  isActive
                    ? 'ring-2 ring-offset-2 ring-slate-800 dark:ring-white ring-offset-slate-100 dark:ring-offset-[#0b1220] scale-[1.02] z-10 opacity-100'
                    : 'opacity-85 hover:opacity-100'
                }`}
              >
                <Icon className="w-4 h-4 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shrink-0" />
                <span className="text-[10px] max-[359px]:text-[9px] leading-[1.15] text-center sm:text-[length:inherit] sm:leading-normal sm:whitespace-nowrap min-w-0 max-w-full break-words">
                  <span className="inline sm:hidden">{language === 'en' ? guide.shortEn : guide.shortTh}</span>
                  <span className="hidden sm:inline">{language === 'en' ? guide.labelEn : guide.labelTh}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 2: Search + Bedside Emergency + Terminal Order Set */}
        <div className="flex gap-2 md:gap-3 w-full h-9 md:h-10">
          <div className="relative flex-1 min-w-0 h-full">
            <input
              type="text"
              placeholder={
                language === 'en'
                  ? 'Search symptoms, opioids, doses, protocols...'
                  : 'ค้นหายา, อาการรบกวน, ขนาดยา, แนวทาง...'
              }
              className="w-full h-full pl-3 pr-9 md:pl-4 md:pr-10 rounded-lg border border-slate-200 dark:border-[#263449] shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-[#151f32] text-slate-800 dark:text-slate-100 placeholder-slate-400 text-xs md:text-sm transition-shadow"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search className="absolute right-2.5 md:right-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 md:w-4 md:h-4 pointer-events-none" />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Bedside Emergency Button */}
          <button
            onClick={onOpenEmergency}
            className="h-full px-2.5 sm:px-3.5 rounded-lg border border-rose-700 bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xs flex items-center gap-1.5 text-xs md:text-sm shrink-0 active:scale-95 transition-all cursor-pointer"
            title={language === 'en' ? 'Palliative Emergencies' : 'ภาวะฉุกเฉินระยะท้าย'}
          >
            <AlertTriangle className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
            <span className="hidden sm:inline">{language === 'en' ? 'Bedside Emergencies' : 'ภาวะฉุกเฉินระยะท้าย'}</span>
            <span className="sm:hidden">{language === 'en' ? 'Emergencies' : 'ฉุกเฉิน'}</span>
          </button>

          {/* Terminal Order Set Button */}
          <button
            onClick={onOpenOrderSetModal}
            className="h-full px-2.5 sm:px-3.5 rounded-lg border border-teal-700 bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-xs flex items-center gap-1.5 text-xs md:text-sm shrink-0 active:scale-95 transition-all cursor-pointer"
            title={language === 'en' ? 'Terminal Comfort Order Set' : 'ชุดคำสั่งแพทย์วาระสุดท้าย'}
          >
            <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">{language === 'en' ? 'Terminal Order Set' : 'ชุดคำสั่งแพทย์'}</span>
            <span className="sm:hidden">{language === 'en' ? 'Order Set' : 'คำสั่ง'}</span>
          </button>
        </div>
      </div>
    </>
  );
};
