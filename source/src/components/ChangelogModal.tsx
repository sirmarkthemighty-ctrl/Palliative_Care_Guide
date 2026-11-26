import React from 'react';
import { X } from 'lucide-react';
import { Language } from '../types';

export const APP_VERSION = '1.0.25';

const CHANGELOG = [
  {
    version: '1.0.25',
    date: '2026-11-26',
    en: ['Opioid calculator, morphine-naive: optional body weight box gives the SC/IV start dose (under 50 kg 0.05-0.2 mg/kg, max 15 mg; 50 kg or more 4-10 mg; Davis), and the prescription draft now includes the SC/IV line (NCCN 2-5 mg IV, no IM); weight is never remembered', 'Opioid calculator: shorter title, "Palliative Opioid Calculator"', "Opioid calculator, morphine-naive: severe pain needing SC/IV now shows NCCN (2-5 mg IV) and Davis's Drug Guide doses (50 kg or more 4-10 mg every 3-4 h; under 50 kg 0.05-0.2 mg/kg, max 15 mg a dose) and no IM; the CPG figure of 0.5-1 mg/kg (p. 91) is not used because it is about 10 times these", 'Opioid calculator: with moderate or severe kidney disease, the breakthrough dose is fentanyl SC instead of morphine (CPG p. 91 advises against morphine), converted at 100 : 1 (100 mcg = 10 mg IV morphine); how often is left to local protocol because the CPG does not give it', 'Opioid calculator: converting to the fentanyl patch now warns that it is not for first-line titration and only for pain already stable on another opioid; keep the previous opioid for 24 h after the first patch (was 12-24 h in the prescription draft and tips; CPG p. 93)', 'Opioid calculator: when the new drug is an injection (morphine, fentanyl or tramadol IV/SC), the breakthrough dose is SC morphine, the oral dose ÷ 3, every 2-4 h (CPG p. 93), on the result, the phone bar and the prescription draft', 'Thai mode, all tabs (When to start, ACP, Symptoms, Dying care, Emergencies, References): drug names now stay in English too, for example Morphine ฉีด, Haloperidol ชนิดฉีด, Hyoscine butylbromide (Buscopan®); names written twice (Thai and English) now appear once', 'Opioid calculator, Thai mode: drug names stay in English (for example Morphine กิน, แผ่นแปะ fentanyl), as in the other guides; the guide and the calculator open in English the first time (a saved Thai choice is kept)', 'Opioid calculator, IV/SC fentanyl for patients already on opioids: now uses the Thai CPG Table 9.1.3 patch band given as the same mcg/h by infusion (for example 60 mg oral morphine a day with no reduction = 25 mcg/h = 600 mcg/day; was 100 : 1, 200 mcg/day). Below the table (< 20 mg/day) it keeps 100 : 1. IV fentanyl as the current drug converts back the same way', 'Opioid calculator, tramadol: the main result stays at 10 : 1 (Thai CPG), and the result, ratio pill and prescription draft now also show the 5-10 : 1 range; the About panel cites both ends (10 : 1: Thai CPG and Lancashire 2014; 5 : 1: trials in the Palliative Care Formulary via Our Lady\'s Hospice 2017)'],
    th: ['เครื่องคำนวณ opioid โหมดไม่เคยได้ morphine: เพิ่มช่องน้ำหนักตัว (ถ้ามี) เพื่อคำนวณขนาดยา SC/IV (น้อยกว่า 50 กก. 0.05-0.2 มก./กก. สูงสุด 15 มก.; 50 กก. ขึ้นไป 4-10 มก.; Davis) และร่างใบสั่งยามีบรรทัด SC/IV ด้วย (NCCN 2-5 มก. IV ห้าม IM) ไม่จำน้ำหนักไว้', 'เครื่องคำนวณ opioid: ชื่อสั้นลงเป็น "เครื่องคำนวณโอปิออยด์ประคับประคอง"', "เครื่องคำนวณ opioid โหมดไม่เคยได้ morphine: ปวดรุนแรงที่ต้องใช้ SC/IV แสดงขนาดตาม NCCN (2-5 มก. IV) และ Davis's Drug Guide (50 กก. ขึ้นไป 4-10 มก. ทุก 3-4 ชม.; น้อยกว่า 50 กก. 0.05-0.2 มก./กก. สูงสุด 15 มก. ต่อครั้ง) และไม่ให้ IM ไม่ใช้ 0.5-1 มก./กก. ใน CPG (หน้า 91) เพราะสูงกว่าประมาณ 10 เท่า", 'เครื่องคำนวณ opioid: เมื่อไตเสื่อมปานกลางหรือรุนแรง ยาแก้ปวดฉับพลันเป็น fentanyl SC แทน morphine (CPG หน้า 91 ไม่แนะนำ morphine) คิดที่ 100 : 1 (100 มคก. = morphine IV 10 มก.) ส่วนความถี่ให้ตามแนวทางของโรงพยาบาลเพราะ CPG ไม่ได้ระบุ', 'เครื่องคำนวณ opioid: เมื่อเปลี่ยนเป็นแผ่นแปะ fentanyl มีคำเตือนว่าไม่ใช้เป็นอันดับแรกในการปรับยา ใช้เมื่อปวดคงที่ด้วยโอปิออยด์ตัวอื่นแล้วเท่านั้น และให้ยาเดิมต่ออีก 24 ชม. หลังแปะแผ่นแรก (เดิมร่างใบสั่งยาและข้อควรปฏิบัติเขียน 12-24 ชม.; CPG หน้า 93)', 'เครื่องคำนวณ opioid: เมื่อยาใหม่เป็นยาฉีด (morphine, fentanyl หรือ tramadol IV/SC) ยาแก้ปวดฉับพลันเป็น morphine SC ขนาดยากิน ÷ 3 ทุก 2-4 ชม. (CPG หน้า 93) ทั้งที่ผลลัพธ์ แถบด้านล่างบนมือถือ และร่างใบสั่งยา', 'โหมดภาษาไทยทุกแท็บ (เริ่มเมื่อใด, ACP, อาการ, ดูแลวาระสุดท้าย, ภาวะฉุกเฉิน, เอกสารอ้างอิง): ชื่อยาใช้ภาษาอังกฤษด้วย เช่น Morphine ฉีด, Haloperidol ชนิดฉีด, Hyoscine butylbromide (Buscopan®) และชื่อยาที่เคยเขียนซ้ำทั้งไทยและอังกฤษเหลือครั้งเดียว', 'เครื่องคำนวณ opioid โหมดภาษาไทย: ชื่อยาใช้ภาษาอังกฤษ (เช่น Morphine กิน, แผ่นแปะ fentanyl) เหมือนคู่มืออื่น และเปิดครั้งแรกเป็นภาษาอังกฤษ (ถ้าเคยเลือกภาษาไทยไว้ จะยังเป็นภาษาไทย)', 'เครื่องคำนวณ opioid, fentanyl ฉีด IV/SC สำหรับผู้ที่ได้ opioid อยู่แล้ว: ใช้ช่วงในตาราง 9.1.3 ของ CPG แล้วให้เป็นอัตราหยด mcg/ชม. เท่ากับแผ่นแปะ (เช่น มอร์ฟีนกิน 60 มก./วัน ไม่ลดขนาด = 25 mcg/ชม. = 600 mcg/วัน เดิม 100 : 1 ได้ 200 mcg/วัน) ต่ำกว่าตาราง (< 20 มก./วัน) ยังใช้ 100 : 1 และเมื่อ fentanyl ฉีดเป็นยาเดิมจะแปลงกลับแบบเดียวกัน', 'เครื่องคำนวณ opioid, tramadol: ผลหลักยังใช้ 10 : 1 (CPG ไทย) และแสดงช่วง 5-10 : 1 ที่ผลลัพธ์ ป้ายอัตราส่วน และร่างใบสั่งยา ส่วนรายละเอียดอ้างอิงทั้งสองค่า (10 : 1: CPG ไทยและ Lancashire 2014; 5 : 1: การศึกษาใน Palliative Care Formulary ผ่าน Our Lady\'s Hospice 2017)']
  },
  {
    version: '1.0.14',
    date: '2026-11-19',
    en: ['Opioid calculator: new "Not naive / Morphine-naive" switch. Morphine-naive shows the Thai CPG starting plan (morphine IR 5-10 mg, repeat every 2-4 h); enter the first 24 h total to get MST Continus or Kapanol plus rescue doses; the conversion inputs and fentanyl table are hidden', 'Opioid calculator: the codeine source line notes that the CPG text gives 240 mg/day but its Table 6.1.3 lists 240-360'],
    th: ['เครื่องคำนวณ opioid: เพิ่มสวิตช์ "เคยได้ยาแล้ว / ไม่เคยได้มอร์ฟีน" โหมดไม่เคยได้มอร์ฟีนแสดงแผนเริ่มยาตาม CPG ไทย (มอร์ฟีน IR 5-10 มก. ให้ซ้ำทุก 2-4 ชม.) ใส่ยอดรวม 24 ชม. แรกเพื่อดู MST Continus หรือ Kapanol พร้อมขนาดยาฉุกเฉิน ซ่อนช่องแปลงยาและตารางเฟนตานิล', 'เครื่องคำนวณ opioid: แหล่งที่มาของ codeine ระบุว่าเนื้อหา CPG ให้ 240 มก./วัน แต่ตาราง 6.1.3 ระบุ 240-360']
  },
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
