import React, { useState, useEffect } from 'react';
import { Sun, Moon, AlertTriangle } from 'lucide-react';
import { Language } from './types';
import { OpioidCalcTab } from './components/OpioidCalcTab';
import { ChangelogModal, APP_VERSION } from './components/ChangelogModal';
import { safeStore } from './store';

// Standalone opioid calculator: same component as the Palliative Care Guide tab.
// Header, pills and disclaimer follow the Bedside UI of the Adult Bronchodilator Device Guide.
export default function OpioidApp() {
  const [language, setLanguage] = useState<Language>(() => (safeStore('palcare_lang') === 'th' ? 'th' : 'en'));
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = safeStore('palcare_theme');
    if (saved) return saved === 'dark';
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const en = language === 'en';

  useEffect(() => { safeStore('palcare_lang', language); }, [language]);
  useEffect(() => {
    safeStore('palcare_theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const pill = 'text-[10px] md:text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#151f32] shadow-sm px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-[#263449] cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1b2740] transition-all';

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-[#0b1220] text-slate-900 dark:text-slate-100 p-3 sm:p-4 md:p-6 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-3 mb-3 md:mb-4">
          <header className="min-w-0">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-1 md:mb-2 leading-tight">
              {en ? 'Palliative Opioid Calculator' : 'เครื่องคำนวณโอปิออยด์ประคับประคอง'}
            </h1>
            <p className="hidden sm:block text-xs md:text-sm text-slate-600 dark:text-slate-300">
              {en
                ? 'Oral, IV/SC, fentanyl patch, tramadol, codeine and oxycodone conversion with cross-tolerance reduction and renal checks'
                : 'แปลงยามอร์ฟีนกิน ยาฉีด IV/SC แผ่นแปะเฟนตานิล ทรามาดอล โคเดอีน และออกซีโคโดน พร้อมปรับลดขนาดยาและตรวจไต'}
            </p>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 sm:block">
              <p className="text-[10px] md:text-xs font-semibold text-indigo-500 dark:text-indigo-300 sm:mt-1">Made by Warodom Phaenthong, M.D.</p>
              <a
                href="#disclaimer-heading"
                onClick={(e) => { e.preventDefault(); document.getElementById('disclaimer-heading')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
                className="block sm:mt-1 text-[11px] md:text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
              >
                {en ? 'Decision support only: read the disclaimer' : 'เป็นเครื่องมือช่วยตัดสินใจเท่านั้น: อ่านข้อจำกัด'}
              </a>
            </div>
          </header>

          <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
            <button onClick={() => setIsChangelogOpen(true)} className={pill + ' flex items-center gap-1.5'} title={en ? "What's new" : 'มีอะไรใหม่'}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>v{APP_VERSION}</span>
            </button>
            <button onClick={() => setLanguage(en ? 'th' : 'en')} className={pill} title={en ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English'}>
              {en ? 'ไทย' : 'EN'}
            </button>
            <button
              onClick={() => setIsDarkMode((p) => !p)}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="w-7 h-7 text-slate-600 dark:text-slate-300 bg-white dark:bg-[#151f32] shadow-sm rounded-full border border-slate-200 dark:border-[#263449] flex items-center justify-center hover:bg-slate-50 dark:hover:bg-[#1b2740] transition-all cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <OpioidCalcTab language={language} standalone />

        <section id="disclaimer-heading" className="mt-10 md:mt-14 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-950/20 p-4 md:p-5 text-xs md:text-sm text-amber-900 dark:text-amber-200/90 leading-relaxed" aria-labelledby="disclaimer-title">
          <h2 id="disclaimer-title" className="text-sm font-extrabold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{en ? 'Clinical Disclaimer' : 'ข้อจำกัดความรับผิดชอบทางการแพทย์'}</span>
          </h2>
          <p>
            {en
              ? 'For licensed clinicians only. Equianalgesic ratios are approximate: verify every dose against your hospital protocol and the patient\'s renal and hepatic function, and monitor closely after any switch.'
              : 'สำหรับบุคลากรทางการแพทย์เท่านั้น อัตราส่วนยาเทียบเคียงเป็นค่าประมาณ ต้องตรวจสอบขนาดยาทุกครั้งกับแนวทางของโรงพยาบาลและการทำงานของไตและตับของผู้ป่วย และเฝ้าติดตามใกล้ชิดหลังเปลี่ยนยา'}
          </p>
        </section>

        <ChangelogModal isOpen={isChangelogOpen} onClose={() => setIsChangelogOpen(false)} language={language} />
      </div>
    </div>
  );
}
