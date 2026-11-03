import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';

export const APP_VERSION = '1.0.4';

const CHANGELOG = [
  {
    version: '1.0.4',
    date: '2026-11-03',
    en: [
      'ACP tab: removed the "Supreme Administrative Court F. 11/2558" ruling (could not be verified)',
      'Symptoms tab: removed midazolam 0.2 mg/kg loading dose (about 14 mg, far above usual 2.5-5 mg)',
      'Opioid calculator: prescription now matches the target drug (was always printing morphine mg for oxycodone, tramadol, codeine, fentanyl IV)',
      'Fentanyl patch: no gaps between CPG table rows; PRN dose now 10-15% of the new daily dose',
      'Kapanol: PEG tube 16 Fr or larger only, not NG',
      'Single offline HTML file (no web fonts or CDN); version pill and this changelog added'
    ],
    th: [
      'แท็บ ACP: ลบคำพิพากษาศาลปกครองสูงสุด ที่ ฟ. 11/2558 (ตรวจสอบที่มาไม่ได้)',
      'แท็บอาการ: ลบขนาด midazolam 0.2 มก./กก. (ราว 14 มก. สูงเกินปกติมาก)',
      'เครื่องคำนวณ opioid: ใบสั่งยาตรงกับยาปลายทาง (เดิมพิมพ์เป็นมอร์ฟีน มก. เสมอ แม้เลือก oxycodone, tramadol, codeine, fentanyl ฉีด)',
      'แผ่นแปะ fentanyl: ไม่มีช่องว่างระหว่างแถวตาราง CPG; ยา PRN เท่ากับ 10-15% ของขนาดยาต่อวันใหม่',
      'Kapanol: ให้ทางสาย PEG ขนาด 16 Fr ขึ้นไปเท่านั้น ไม่ใช้กับสาย NG',
      'ไฟล์ HTML เดียวใช้ออฟไลน์ได้ (ไม่ใช้ฟอนต์เว็บหรือ CDN); เพิ่มป้ายเวอร์ชันและบันทึกการเปลี่ยนแปลง'
    ]
  },
  {
    version: '1.0.0',
    date: '2025-10-15',
    en: ['First release: 7 tabs, opioid calculator, bedside emergencies, terminal order set'],
    th: ['เปิดตัวครั้งแรก: 7 แท็บ เครื่องคำนวณ opioid ภาวะฉุกเฉินข้างเตียง ชุดคำสั่งวาระสุดท้าย']
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ChangelogModal: React.FC<Props> = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;
  const en = language === 'en';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 print:hidden" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[80vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#151f32] border border-slate-200 dark:border-[#263449] p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-extrabold text-slate-800 dark:text-slate-100">{en ? 'Changelog' : 'บันทึกการเปลี่ยนแปลง'}</h2>
          <button onClick={onClose} aria-label="Close" className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-[#1b2740] cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>
        {CHANGELOG.map((c) => (
          <div key={c.version} className="mb-3">
            <div className="text-xs font-bold text-teal-700 dark:text-teal-400">v{c.version} · {c.date}</div>
            <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300">
              {(en ? c.en : c.th).map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
