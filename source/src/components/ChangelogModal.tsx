import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';

export const APP_VERSION = '1.0.13';

const CHANGELOG = [
  {
    version: '1.0.13',
    date: '2026-11-17',
    en: ['Opioid calculator: Source lines with Thai CPG page numbers (91, 93, 94) for the dose reduction, the About panel of each drug, the fentanyl table and the tips; IV fentanyl and IV tramadol, which the CPG does not cover, cite published tables and say the evidence is approximate; IV tramadol now uses the same factor as oral tramadol (0.1, was 0.15)', 'Opioid calculator, checked against the Thai CPG (DMS 2020): fentanyl patch lowest size is 12 mcg/hr (was 12.5), also in the Symptoms tab; advised dose reduction is 25-50% (was 25-33%); codeine maximum is 240 mg/day (was 360); with kidney disease selected, a note says the CPG advises against morphine, also in the prescription draft', 'Opioid calculator: the equianalgesic ratio (current : new, for example 3 mg/day : 1 mg/day) now shows beside the swap button', 'Opioid calculator: Kapanol, MST Continus, oxycodone CR, oral tramadol and codeine are now rounded DOWN to real tablet/capsule strengths and show how to make the dose up (for example 2 x 20 mg); the prescription draft uses the same doses', 'Opioid calculator: add more than one current opioid (long-acting plus PRN doses used in 24 h); the doses are summed into one oral morphine equivalent', 'Opioid calculator: tramadol or codeine above the daily maximum now warns on the result as well as in the prescription draft', 'Opioid calculator: remembers the last drugs, dose reduction and kidney setting (never the dose); Reset button; Print button for the prescription draft', 'Opioid calculator, simpler layout: one compact input block (from drug + dose, swap button, to drug, dose reduction, kidney), the result right under it, and short drug names in the lists. On phones a bar at the bottom keeps the result in view while you scroll', 'Opioid calculator: prescription draft, Thai CPG table and tips are folded until opened; new "About" fold shows the new drug\'s forms, how to give, notes and kidney advice; tips now also in Thai', 'Opioid calculator intro text shortened','Opioid calculator look matches the Bronchodilator guide: plain light cards (no dark teal banner or result card), one indigo accent for selected options, soft-tint kidney buttons, same dark-mode colours; the standalone page has the same header with title, credit and disclaimer link', 'Opioid calculator: fentanyl patch below 20 mg oral morphine/day shows N/A (was a 12.5 mcg/hr patch); CPG table highlight always matches the dose given; "Moderate" kidney setting shows a caution; codeine over 360 mg/day warned; negative doses blocked', 'Opioid calculator is also a standalone app (opioid-calculator.html), still inside this guide', 'Look: Bedside UI touches from the Bronchodilator guide (IBM Plex font when online, soft pastel tab and tool buttons (solid colour only for the open tab), soft two-layer card shadow, indigo keyboard focus ring, press feedback)', 'When to start: ALS end-stage trigger changed from FVC < 70% (an early ventilation-support threshold) to FVC < 40-50%'],
    th: ['เครื่องคำนวณ opioid: เพิ่มแหล่งที่มาพร้อมเลขหน้า CPG ไทย (91, 93, 94) ที่คำแนะนำลดขนาดยา ส่วนรายละเอียดของยาแต่ละตัว ตารางเฟนตานิล และข้อควรปฏิบัติ; fentanyl ฉีดและ tramadol ฉีดที่ CPG ไม่ครอบคลุม อ้างอิงตารางที่ตีพิมพ์และระบุว่าเป็นค่าประมาณ; tramadol ฉีดใช้ค่าเท่า tramadol กินแล้ว (0.1 เดิม 0.15)', 'เครื่องคำนวณ opioid ตรวจเทียบกับ CPG กรมการแพทย์ 2563: แผ่นแปะ fentanyl ขนาดต่ำสุดคือ 12 มคก./ชม. (เดิม 12.5) รวมถึงแท็บอาการ; ลดขนาดยาที่แนะนำ 25-50% (เดิม 25-33%); codeine สูงสุด 240 มก./วัน (เดิม 360); เมื่อเลือกโรคไต จะมีข้อความว่า CPG ไม่แนะนำมอร์ฟีน และพิมพ์ในร่างใบสั่งยาด้วย', 'เครื่องคำนวณ opioid: แสดงอัตราส่วนเทียบเคียง (ยาเดิม : ยาใหม่ เช่น 3 มก./วัน : 1 มก./วัน) ข้างปุ่มสลับ', 'เครื่องคำนวณ opioid: Kapanol, MST Continus, oxycodone CR, tramadol กิน และ codeine ปัดขนาดยา "ลง" ให้ตรงกับขนาดเม็ด/แคปซูลที่มีจริง และบอกวิธีจัดยา (เช่น 2 x 20 มก.) ร่างใบสั่งยาใช้ขนาดเดียวกัน', 'เครื่องคำนวณ opioid: เพิ่มยาปัจจุบันได้มากกว่าหนึ่งตัว (ยาออกฤทธิ์ยาวร่วมกับ PRN ที่ใช้ใน 24 ชม.) รวมเป็นมอร์ฟีนกินเทียบเคียงค่าเดียว', 'เครื่องคำนวณ opioid: tramadol หรือ codeine เกินขนาดสูงสุดต่อวันจะเตือนที่ผลลัพธ์ด้วย ไม่ใช่เฉพาะในร่างใบสั่งยา', 'เครื่องคำนวณ opioid: จำชนิดยา เปอร์เซ็นต์ที่ลด และระดับไตครั้งล่าสุด (ไม่จำขนาดยา) มีปุ่มล้างค่า และปุ่มพิมพ์ร่างใบสั่งยา', 'เครื่องคำนวณ opioid จัดหน้าใหม่ให้เรียบง่าย: ช่องกรอกรวมเป็นชุดเดียว (ยาเดิม+ขนาด ปุ่มสลับ ยาใหม่ ลดขนาด ระดับไต) ผลลัพธ์อยู่ใต้ช่องกรอกทันที ชื่อยาในรายการสั้นลง บนมือถือมีแถบด้านล่างแสดงผลลัพธ์ขณะเลื่อนหน้า', 'เครื่องคำนวณ opioid: ร่างใบสั่งยา ตาราง CPG และข้อควรปฏิบัติพับเก็บไว้จนกว่าจะกดเปิด เพิ่มส่วน "รายละเอียด" แสดงรูปแบบยา วิธีให้ยา ข้อควรทราบ และคำแนะนำเรื่องไตของยาใหม่ และข้อควรปฏิบัติมีภาษาไทยแล้ว', 'เครื่องคำนวณ opioid: ย่อข้อความแนะนำให้สั้นลง','เครื่องคำนวณ opioid: หน้าตาตรงกับคู่มือยาพ่น การ์ดสีอ่อนเรียบ (ไม่มีแบนเนอร์และการ์ดผลลัพธ์สีเขียวเข้ม) ใช้สีอินดิโกเป็นสีเดียวสำหรับตัวเลือกที่เลือก ปุ่มระดับไตสีพาสเทล สีโหมดมืดเหมือนกัน และหน้าแยกมีหัวเรื่อง เครดิต และลิงก์ข้อจำกัดเหมือนกัน', 'เครื่องคำนวณ opioid: แผ่นแปะ fentanyl เมื่อมอร์ฟีนกินเทียบเคียง < 20 มก./วัน แสดง N/A (เดิมขึ้น 12.5 มคก./ชม.); แถวที่ไฮไลต์ในตาราง CPG ตรงกับขนาดยาที่คำนวณเสมอ; เลือกไตเสื่อมปานกลางจะมีคำเตือน; เตือน codeine เกิน 360 มก./วัน; ป้องกันการกรอกค่าติดลบ', 'เครื่องคำนวณ opioid แยกเป็นแอปอิสระได้ (opioid-calculator.html) และยังอยู่ในคู่มือนี้ด้วย', 'หน้าตา: นำสไตล์ Bedside UI ของคู่มือยาพ่นมาใช้ (ปุ่มแท็บและเครื่องมือสีพาสเทลนุ่ม สีเข้มเฉพาะแท็บที่เปิดอยู่ ฟอนต์ IBM Plex เมื่อออนไลน์ เงาการ์ดสองชั้นแบบนุ่ม กรอบโฟกัสคีย์บอร์ดสีอินดิโก ปุ่มตอบสนองเมื่อกด)', 'แท็บเริ่มประคับประคอง: เกณฑ์ ALS ระยะท้ายเปลี่ยนจาก FVC < 70% (เกณฑ์เริ่มช่วยหายใจระยะแรก) เป็น FVC < 40-50%']
  },
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
