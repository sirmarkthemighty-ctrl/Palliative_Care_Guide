import React, { useState } from 'react';
import { X, FileCheck2, Copy, Check, Printer, CheckSquare, Square } from 'lucide-react';
import { Language } from '../types';
import { TERMINAL_ORDER_SET_TEMPLATE } from '../data/dyingCareData';

interface OrderSetModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const OrderSetModal: React.FC<OrderSetModalProps> = ({ isOpen, onClose, language }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedOrders, setSelectedOrders] = useState<Record<number, boolean>>(() => {
    const init: Record<number, boolean> = {};
    TERMINAL_ORDER_SET_TEMPLATE.ordersEn.forEach((_, idx) => {
      init[idx] = true;
    });
    return init;
  });

  if (!isOpen) return null;

  const toggleOrder = (idx: number) => {
    setSelectedOrders((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getFormattedOrderSet = () => {
    const list =
      language === 'en' ? TERMINAL_ORDER_SET_TEMPLATE.ordersEn : TERMINAL_ORDER_SET_TEMPLATE.ordersTh;
    const activeOrders = list.filter((_, idx) => selectedOrders[idx]);
    const header =
      language === 'en'
        ? 'PHYSICIAN TERMINAL COMFORT CARE ORDER SET'
        : 'ชุดคำสั่งแพทย์สำหรับการดูแลเพื่อความสุขสบายในวาระสุดท้าย';
    const dateStr = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    return `========================================\n${header}\nDate: ${dateStr}\nStatus: Allow Natural Death (AND)\n========================================\n\n${activeOrders.join(
      '\n\n'
    )}\n\nPhysician Signature: _______________________ M.D.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedOrderSet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-teal-200 dark:border-teal-900/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-linear-to-r from-teal-700 to-slate-900 text-white flex items-center justify-between border-b border-teal-600">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-600/50 border border-teal-400">
              <FileCheck2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold">
                {language === 'en'
                  ? 'Physician Terminal Comfort Order Set'
                  : 'ชุดคำสั่งแพทย์สำหรับการดูแลเพื่อความสุขสบายในวาระสุดท้าย'}
              </h2>
              <p className="text-xs text-teal-200">
                {language === 'en'
                  ? 'Hospital Information System (HIS / EMR) Ready Format'
                  : 'รูปแบบพร้อมคัดลอกลงในเวชระเบียนและระบบสารสนเทศโรงพยาบาล'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-teal-200 hover:text-white hover:bg-teal-700/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Actions */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">
            {language === 'en'
              ? 'Select orders to include/exclude before copying:'
              : 'เลือกรายการคำสั่งที่ต้องการก่อนกดคัดลอก:'}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold transition-colors shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>{language === 'en' ? 'Copied!' : 'คัดลอกแล้ว!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{language === 'en' ? 'Copy Order Set' : 'คัดลอกคำสั่ง'}</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>{language === 'en' ? 'Print' : 'พิมพ์'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-2.5 flex-1 bg-white dark:bg-slate-900">
          {(language === 'en'
            ? TERMINAL_ORDER_SET_TEMPLATE.ordersEn
            : TERMINAL_ORDER_SET_TEMPLATE.ordersTh
          ).map((order, idx) => {
            const isChecked = !!selectedOrders[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleOrder(idx)}
                className={`flex items-start gap-3 p-3 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-teal-50/60 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800/60 text-slate-900 dark:text-slate-100'
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

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors"
          >
            {language === 'en' ? 'Close' : 'ปิด'}
          </button>
        </div>
      </div>
    </div>
  );
};
