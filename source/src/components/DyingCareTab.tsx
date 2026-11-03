import React, { useState } from 'react';
import {
  FileCheck2,
  Syringe,
  Compass,
  Copy,
  Check,
  Printer,
  Sparkles,
  Heart,
  Droplet,
  AlertCircle,
  HelpCircle,
  CheckSquare,
  Square
} from 'lucide-react';
import { Language } from '../types';
import {
  ANTICIPATORY_PRESCRIBING,
  SPIRITUAL_CARE_PROTOCOLS,
  TERMINAL_ORDER_SET_TEMPLATE
} from '../data/dyingCareData';

interface DyingCareTabProps {
  language: Language;
}

export const DyingCareTab: React.FC<DyingCareTabProps> = ({ language }) => {
  const [selectedReligion, setSelectedReligion] = useState<'buddhism' | 'islam' | 'christianity'>('buddhism');
  const [copiedOrders, setCopiedOrders] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<Record<number, boolean>>(() => {
    const initial: Record<number, boolean> = {};
    TERMINAL_ORDER_SET_TEMPLATE.ordersEn.forEach((_, idx) => {
      initial[idx] = true;
    });
    return initial;
  });

  const toggleOrder = (idx: number) => {
    setSelectedOrders((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getFormattedOrderSet = () => {
    const list = language === 'en' ? TERMINAL_ORDER_SET_TEMPLATE.ordersEn : TERMINAL_ORDER_SET_TEMPLATE.ordersTh;
    const activeOrders = list.filter((_, idx) => selectedOrders[idx]);
    const header = language === 'en' ? 'PHYSICIAN TERMINAL COMFORT CARE ORDER SET' : 'ชุดคำสั่งแพทย์สำหรับการดูแลเพื่อความสุขสบายในวาระสุดท้าย';
    const dateStr = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return `========================================\n${header}\nDate: ${dateStr}\nStatus: Allow Natural Death (AND)\n========================================\n\n${activeOrders.join(
      '\n\n'
    )}\n\nPhysician Signature: _______________________ M.D.`;
  };

  const handleCopyOrders = () => {
    navigator.clipboard.writeText(getFormattedOrderSet());
    setCopiedOrders(true);
    setTimeout(() => setCopiedOrders(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-2xl bg-linear-to-r from-teal-900 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 shadow-lg border border-teal-800/50">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/40 text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5" />
            <span>{language === 'en' ? 'Comfort & Dignified Closure' : 'การบริบาลเพื่อความสุขสบายและสง่างาม'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            {language === 'en'
              ? 'End-of-Life Comfort Care Protocols & Order Set'
              : 'แนวทางการบริบาลวาระสุดท้ายและชุดคำสั่งแพทย์เพื่อความสุขสบาย'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {language === 'en'
              ? 'Anticipatory subcutaneous prescribing, practical butterfly cannula techniques, multi-faith spiritual rites (including Buddhist monastic care), and physician comfort order sets.'
              : 'การสั่งยาฉีดใต้ผิวหนังล่วงหน้า เทคนิคการคาสายผีเสื้อใต้ผิวหนัง การบริบาลทางจิตวิญญาณหลากหลายศาสนา (และการดูแลภิกษุอาพาธ) พร้อมชุดคำสั่งแพทย์วาระสุดท้ายที่คัดลอกได้ทันที'}
          </p>
        </div>
      </div>

      {/* Anticipatory Prescribing (4 Core SC Medications) */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-black">
            <Syringe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {language === 'en'
                ? 'Anticipatory Prescribing: 4 Essential Subcutaneous Drugs'
                : 'การสั่งยาฉีดใต้ผิวหนังล่วงหน้า: 4 ยาหลักในระยะสุดท้าย (Anticipatory Prescribing)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'en'
                ? 'Have these 4 medications prescribed PRN via subcutaneous route before distress occurs'
                : 'ควรสั่งเตรียมพร้อมไว้ล่วงหน้าทางสายฉีดใต้ผิวหนัง (SC) เพื่อให้พยาบาลให้ยาได้ทันทีเมื่อมีอาการ'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ANTICIPATORY_PRESCRIBING.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-2"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                  {language === 'en' ? item.symptomEn : item.symptomTh}
                </span>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-200">
                  {item.route}
                </span>
              </div>

              <div className="text-sm font-bold text-slate-900 dark:text-white">
                {language === 'en' ? item.drugEn : item.drugTh}
              </div>

              <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {language === 'en' ? item.doseEn : item.doseTh}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                {language === 'en' ? item.rationaleEn : item.rationaleEn}
              </p>
            </div>
          ))}
        </div>

        {/* Subcutaneous Butterfly Needle Technique */}
        <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-900/40 space-y-3">
          <h4 className="text-xs sm:text-sm font-bold text-teal-950 dark:text-teal-200 uppercase tracking-wider flex items-center gap-2">
            <Droplet className="w-4 h-4 text-teal-600" />
            <span>
              {language === 'en'
                ? 'Subcutaneous Butterfly Needle (SC Cannula) Clinical Technique'
                : 'เทคนิคการคาสายผีเสื้อฉีดยาใต้ผิวหนัง (Subcutaneous Butterfly Needle)'}
            </span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-teal-900 dark:text-teal-200">
            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900/30">
              <span className="font-bold block mb-1">
                {language === 'en' ? '1. Recommended Sites' : '1. ตำแหน่งที่แนะนำ'}
              </span>
              <p className="leading-relaxed">
                {language === 'en'
                  ? 'Subclavicular chest wall (anterior upper chest), outer aspect of upper arm, or abdomen. AVOID areas of edema, ascites, infection, or bony prominence.'
                  : 'ใต้กระดูกไหปลาร้า (หน้าอกส่วนบน), ต้นแขนด้านนอก หรือหน้าท้อง หลีกเลี่ยงบริเวณที่บวมน้ำ มีท้องมาน หรือติดเชื้อ'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900/30">
              <span className="font-bold block mb-1">
                {language === 'en' ? '2. Insertion & Priming' : '2. การแทงและไล่สาย'}
              </span>
              <p className="leading-relaxed">
                {language === 'en'
                  ? 'Pinch skinfold, insert 23-25G butterfly needle at 30-45° angle. Prime tubing with 0.1 - 0.2 mL of sterile water or the medication to eliminate dead space.'
                  : 'ดึงรอยพับผิวหนัง แทงเข็มเบอร์ 23-25G ทำมุม 30-45 องศา ไล่สายด้วยยาหรือ NSS 0.1-0.2 มล. เพื่อลดช่องว่างในสาย'}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-900/30">
              <span className="font-bold block mb-1">
                {language === 'en' ? '3. Site Maintenance' : '3. การดูแลเปลี่ยนสาย'}
              </span>
              <p className="leading-relaxed">
                {language === 'en'
                  ? 'Cover with transparent dressing. Change site every 5 to 7 days, or immediately if redness, leakage, induration, or pain develops. STRICTLY NO IM INJECTIONS.'
                  : 'ปิดด้วยฟิล์มใส เปลี่ยนตำแหน่งทุก 5-7 วัน หรือเปลี่ยนทันทีหากมีรอยแดง รั่วซึม หรือเจ็บ ห้ามฉีดยาเข้ากล้ามเนื้อ (IM) เด็ดขาด'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-Faith Spiritual Care Protocols */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'en'
                  ? 'Multi-Faith Spiritual Care Protocols'
                  : 'แนวทางการบริบาลทางจิตวิญญาณหลากหลายศาสนาและวัฒนธรรม'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Specific bedside spiritual rituals for Buddhism, Monks (ภิกษุอาพาธ), Islam, and Christianity'
                  : 'พิธีกรรมข้างเตียงสำหรับพุทธศาสนา, การดูแลภิกษุอาพาธ, อิสลาม, และคริสต์'}
              </p>
            </div>
          </div>

          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 gap-1">
            <button
              onClick={() => setSelectedReligion('buddhism')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedReligion === 'buddhism'
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              ☸️ {language === 'en' ? 'Buddhism & Monks' : 'พุทธ & ภิกษุอาพาธ'}
            </button>
            <button
              onClick={() => setSelectedReligion('islam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedReligion === 'islam'
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              ☪️ {language === 'en' ? 'Islam' : 'อิสลาม'}
            </button>
            <button
              onClick={() => setSelectedReligion('christianity')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedReligion === 'christianity'
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              ✝️ {language === 'en' ? 'Christianity' : 'คริสต์'}
            </button>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {(selectedReligion === 'buddhism'
              ? language === 'en'
                ? SPIRITUAL_CARE_PROTOCOLS.buddhismEn
                : SPIRITUAL_CARE_PROTOCOLS.buddhismTh
              : selectedReligion === 'islam'
              ? language === 'en'
                ? SPIRITUAL_CARE_PROTOCOLS.islamEn
                : SPIRITUAL_CARE_PROTOCOLS.islamTh
              : language === 'en'
              ? SPIRITUAL_CARE_PROTOCOLS.christianityEn
              : SPIRITUAL_CARE_PROTOCOLS.christianTh
            ).map((point, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/60 leading-relaxed font-medium"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Customizable Physician Terminal Comfort Care Order Set */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-black">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'en'
                  ? TERMINAL_ORDER_SET_TEMPLATE.titleEn
                  : TERMINAL_ORDER_SET_TEMPLATE.titleTh}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'en'
                  ? 'Select orders to include, then copy formatted text for hospital charts or print'
                  : 'เลือกคำสั่งที่ต้องการ แล้วกดคัดลอกเพื่อวางในเวชระเบียนโรงพยาบาล หรือสั่งพิมพ์'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={handleCopyOrders}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-xs transition-colors"
            >
              {copiedOrders ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{language === 'en' ? 'Copied to Clipboard' : 'คัดลอกลงคลิปบอร์ดแล้ว'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{language === 'en' ? 'Copy Order Set' : 'คัดลอกคำสั่งแพทย์'}</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors"
              title="Print Order Set"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'en' ? 'Print' : 'พิมพ์'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Order Checkboxes */}
        <div className="space-y-2.5">
          {(language === 'en'
            ? TERMINAL_ORDER_SET_TEMPLATE.ordersEn
            : TERMINAL_ORDER_SET_TEMPLATE.ordersTh
          ).map((order, idx) => {
            const isChecked = !!selectedOrders[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleOrder(idx)}
                className={`flex items-start gap-3 p-3.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800/60 text-slate-900 dark:text-slate-100'
                    : 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 line-through'
                }`}
              >
                <span className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </span>
                <p className="leading-relaxed font-medium">{order}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
