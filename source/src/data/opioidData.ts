import { OpioidDrug } from '../types';

export const OPIOID_DRUGS: OpioidDrug[] = [
  {
    id: 'morphine_oral',
    nameEn: 'Morphine Oral (IR / Syrup)',
    nameTh: 'มอร์ฟีนรับประทาน (เม็ดปลดปล่อยทันที / ยาน้ำเชื่อม)',
    route: 'oral',
    unit: 'mg/day',
    factorToOralMorphine: 1.0,
    factorFromOralMorphine: 1.0,
    formulationsEn: ['Tablet IR 10 mg', 'Syrup 2 mg/mL (10 mg/5 mL)'],
    formulationsTh: ['ยาเม็ด MO IR 10 มก.', 'ยาน้ำเชื่อม 2 มก./มล. (10 มก./5 มล.)'],
    frequencyEn: 'Every 4 hours (around the clock) + PRN for breakthrough',
    frequencyTh: 'รับประทานทุก 4 ชม. สม่ำเสมอ + ให้เสริมเมื่อมีอาการปวดกำเริบ (PRN)',
    notesEn: 'First-line standard strong opioid. Onset ~30 min, duration 2-4 hours.',
    notesTh: 'ยามาตรฐานอันดับแรกในผู้ป่วยมะเร็ง เริ่มออกฤทธิ์ ~30 นาที ออกฤทธิ์นาน 2-4 ชม.',
    renalSafety: 'caution',
    renalNoteEn: 'Active metabolites (M6G, M3G) accumulate in renal impairment (eGFR < 30). Reduce dose and/or extend interval; consider fentanyl.',
    renalNoteTh: 'สารเมแทบอไลต์ M6G และ M3G สะสมในภาวะไตเสื่อม (eGFR < 30) เสี่ยงซึมและกดการหายใจ ควรลดขนาด ขยายช่วงเวลา หรือเปลี่ยนเป็น Fentanyl'
  },
  {
    id: 'kapanol',
    nameEn: 'Kapanol® (Morphine SR 24-hr Capsule)',
    nameTh: 'คาพานอล Kapanol® (มอร์ฟีนแคปซูลควบคุมการปลดปล่อย 24 ชม.)',
    route: 'oral',
    unit: 'mg/day',
    factorToOralMorphine: 1.0,
    factorFromOralMorphine: 1.0,
    formulationsEn: ['Capsule 20 mg', 'Capsule 50 mg', 'Capsule 100 mg'],
    formulationsTh: ['แคปซูล 20 มก.', 'แคปซูล 50 มก.', 'แคปซูล 100 มก.'],
    frequencyEn: 'Every 24 hours (once daily, same time)',
    frequencyTh: 'รับประทานทุก 24 ชม. (วันละ 1 ครั้ง เวลาเดิม)',
    notesEn: 'Polymer-coated pellets. Capsule can be opened and pellets sprinkled on soft food or given via a gastrostomy (PEG) tube of 16 Fr or larger; not suitable for NG tubes. DO NOT CHEW OR CRUSH PELLETS.',
    notesTh: 'เม็ดยาขนาดเล็กเคลือบโพลิเมอร์ สามารถแกะแคปซูลโรยบนอาหารอ่อน หรือให้ทางสาย gastrostomy (PEG) ขนาด 16 Fr ขึ้นไปได้ (ไม่เหมาะกับสาย NG) แต่ห้ามบด ห้ามเคี้ยวเม็ด pellets เด็ดขาด',
    renalSafety: 'caution',
    renalNoteEn: 'Caution in renal failure; avoid if eGFR < 30 ml/min due to long duration of active metabolites.',
    renalNoteTh: 'ระวังในผู้ป่วยไตบกพร่อง ไม่แนะนำหาก eGFR < 30 มล./นาที เนื่องจากยายาว 24 ชม. หากสะสมจะขับออกยาก'
  },
  {
    id: 'mst_continus',
    nameEn: 'MST Continus® (Morphine CR 12-hr Tablet)',
    nameTh: 'เอ็มเอสที คอนตินัส MST Continus® (มอร์ฟีนเม็ดออกฤทธิ์นาน 12 ชม.)',
    route: 'oral',
    unit: 'mg/day',
    factorToOralMorphine: 1.0,
    factorFromOralMorphine: 1.0,
    formulationsEn: ['Tablet CR 10 mg', 'Tablet CR 30 mg', 'Tablet CR 60 mg'],
    formulationsTh: ['ยาเม็ด 10 มก.', 'ยาเม็ด 30 มก.', 'ยาเม็ด 60 มก.'],
    frequencyEn: 'Every 12 hours (twice daily, e.g. 08:00 & 20:00)',
    frequencyTh: 'รับประทานทุก 12 ชม. (วันละ 2 ครั้ง เช่น 08.00 น. และ 20.00 น.)',
    notesEn: 'Controlled release matrix tablet. MUST swallow whole. DO NOT break, crush, or chew tablet.',
    notesTh: 'ห้ามหัก ห้ามแบ่ง ห้ามบด หรือเคี้ยวเม็ดยาเด็ดขาด เพราะจะทำให้ยาปล่อยออกมาหมดทันที (dose dumping)',
    renalSafety: 'caution',
    renalNoteEn: 'Caution in renal impairment; metabolites accumulate.',
    renalNoteTh: 'ระมัดระวังในผู้ป่วยไตเสื่อม เฝ้าระวังอาการง่วงซึม'
  },
  {
    id: 'morphine_parenteral',
    nameEn: 'Morphine IV / SC Injection',
    nameTh: 'มอร์ฟีนฉีด เข้าหลอดเลือดดำ (IV) / ใต้ผิวหนัง (SC)',
    route: 'iv_sc',
    unit: 'mg/day',
    factorToOralMorphine: 3.0, // 1 mg IV/SC = 3 mg Oral
    factorFromOralMorphine: 1 / 3.0,
    formulationsEn: ['Ampoule 10 mg / 1 mL'],
    formulationsTh: ['แอมพูล 10 มก. / 1 มล.'],
    frequencyEn: 'Continuous IV/SC infusion OR bolus every 3-4 hours; PRN breakthrough every 1-2 hours',
    frequencyTh: 'หยดต่อเนื่อง IV/SC หรือฉีดเป็นช่วงทุก 3-4 ชม. PRN แก้ปวดกำเริบฉีดซ้ำได้ทุก 1-2 ชม.',
    notesEn: 'Equianalgesic ratio: 1 mg IV/SC Morphine = 3 mg Oral Morphine (1:3 ratio). Onset IV: 5-10 min; SC: 20-30 min. IM injection is NOT recommended.',
    notesTh: 'อัตราส่วนยาฉีดต่อรับประทาน 1:3 (ยาฉีด 1 มก. = ยากิน 3 มก.) ออกฤทธิ์ IV: 5-10 นาที, SC: 20-30 นาที ไม่แนะนำให้ฉีดเข้ากล้ามเนื้อ (IM)',
    renalSafety: 'caution',
    renalNoteEn: 'Active metabolites accumulate. Titrate carefully with sedation score monitoring.',
    renalNoteTh: 'สารเมแทบอไลต์สะสมในไตวาย เฝ้าระวัง sedative score และอัตราการหายใจ'
  },
  {
    id: 'fentanyl_patch',
    nameEn: 'Fentanyl Transdermal Patch (Durogesic®)',
    nameTh: 'เฟนตานิล แผ่นแปะผิวหนัง (Fentanyl Patch)',
    route: 'transdermal',
    unit: 'mcg/hr',
    // Per Thai CPG Table 9.1.3:
    // 12 mcg/hr ≈ 20-44 mg/d oral morphine (mid ~30) -> factor ~2.5
    // 25 mcg/hr ≈ 45-134 mg/d oral morphine (mid ~60) -> factor 2.4
    // 50 mcg/hr ≈ 135-224 mg/d oral morphine (mid ~180)
    factorToOralMorphine: 2.4, // 25 mcg/hr ≈ 60 mg oral morphine
    factorFromOralMorphine: 1 / 2.4,
    formulationsEn: ['Patch 12.5 mcg/hr', 'Patch 25 mcg/hr', 'Patch 50 mcg/hr', 'Patch 75 mcg/hr', 'Patch 100 mcg/hr'],
    formulationsTh: ['แผ่นแปะ 12.5 มคก./ชม.', 'แผ่นแปะ 25 มคก./ชม.', 'แผ่นแปะ 50 มคก./ชม.', 'แผ่นแปะ 75 มคก./ชม.', 'แผ่นแปะ 100 มคก./ชม.'],
    frequencyEn: 'Apply to dry hairless skin; replace every 72 hours (3 days)',
    frequencyTh: 'ปิดบริเวณผิวหนังที่แห้ง เรียบ ไม่มีขน เปลี่ยนแผ่นยาทุก 72 ชม. (3 วัน)',
    notesEn: 'Lipophilic opioid. Onset is delayed (12-24 hours). Keep previous opioid running for first 12-24 hrs. Avoid external heat (electric blanket, hot water bag, fever increases absorption). Less constipation.',
    notesTh: 'ละลายในไขมันดี เริ่มออกฤทธิ์ช้า 12-24 ชม. ต้องให้ยาเดิมต่ออีก 12-24 ชม. แรกหลังแปะแผ่นใหม่ ห้ามประคบร้อนหรือผ้าห่มไฟฟ้าสัมผัสแผ่นยา ท้องผูกน้อยกว่ามอร์ฟีน',
    renalSafety: 'safe',
    renalNoteEn: 'Preferred opioid in renal impairment (no active nephrotoxic metabolites). Hepatically cleared.',
    renalNoteTh: 'ปลอดภัยในผู้ป่วยโรคไตวายเรื้อรัง (ยาขับทางตับ ไม่มีเมแทบอไลต์กดประสาทสะสมในไต)'
  },
  {
    id: 'fentanyl_parenteral',
    nameEn: 'Fentanyl IV / SC Injection',
    nameTh: 'เฟนตานิลฉีด เข้าหลอดเลือดดำ (IV) / ใต้ผิวหนัง (SC)',
    route: 'iv_sc',
    unit: 'mcg/day',
    // 100 mcg IV fentanyl ≈ 10 mg IV morphine ≈ 30 mg oral morphine (1 mcg IV fentanyl = 0.3 mg oral morphine)
    factorToOralMorphine: 0.3,
    factorFromOralMorphine: 1 / 0.3,
    formulationsEn: ['Ampoule 100 mcg / 2 mL (50 mcg/mL)'],
    formulationsTh: ['แอมพูล 100 มคก. / 2 มล. (50 มคก./มล.)'],
    frequencyEn: 'Continuous IV/SC infusion OR bolus every 30-60 min',
    frequencyTh: 'หยดต่อเนื่องทางหลอดเลือดดำ/ใต้ผิวหนัง หรือฉีดซ้ำทุก 30-60 นาที',
    notesEn: 'Rapid onset (1-2 min IV), short duration (30-60 min). Excellent for acute procedures or severe renal failure.',
    notesTh: 'ออกฤทธิ์เร็วมาก 1-2 นาที ระยะเวลาสั้น 30-60 นาที เหมาะสำหรับระงับปวดเร่งด่วน หัตถการ หรือผู้ป่วยไตวาย',
    renalSafety: 'safe',
    renalNoteEn: 'Safe in renal failure. Monitor for chest wall rigidity if given too rapidly in high dose.',
    renalNoteTh: 'ปลอดภัยในภาวะไตเสื่อม ระวัง chest wall rigidity หากฉีดเร็วในขนาดสูง'
  },
  {
    id: 'tramadol_oral',
    nameEn: 'Tramadol Oral (Capsule / Drops / SR)',
    nameTh: 'ทรามาดอลรับประทาน (แคปซูล / ยาหยด / เม็ดออกฤทธิ์ยาว)',
    route: 'oral',
    unit: 'mg/day',
    factorToOralMorphine: 0.1, // 100 mg Tramadol ≈ 10 mg Oral Morphine (10:1 ratio)
    factorFromOralMorphine: 10.0,
    formulationsEn: ['Capsule 50 mg', 'SR Tablet 100 mg', 'Drops 100 mg/mL'],
    formulationsTh: ['แคปซูล 50 มก.', 'ยาเม็ด SR 100 มก.', 'ยาหยด 100 มก./มล.'],
    frequencyEn: 'Every 6-8 hours (regular: 50-100 mg); Max 400 mg/day (300 mg/day in elderly)',
    frequencyTh: 'รับประทานทุก 6-8 ชม. (ครั้งละ 50-100 มก.) สูงสุดไม่เกิน 400 มก./วัน (ผู้สูงอายุไม่เกิน 300 มก./วัน)',
    notesEn: 'Weak opioid (WHO Step 2). Mu agonist + SNRI mechanism. Risk of seizures in epilepsy. Serotonin syndrome risk with SSRIs/SNRIs. CYP2D6 dependent.',
    notesTh: 'โอปิออยด์ฤทธิ์อ่อน (WHO ขั้น 2) ห้ามใช้เกิน 400 มก./วัน ระวังชักในผู้มีประวัติลมชัก ระวัง Serotonin syndrome เมื่อใช้ร่วมกับ SSRI/SNRI',
    renalSafety: 'contraindicated_severe',
    renalNoteEn: 'Reduce dose in renal/hepatic failure. Not recommended in severe renal failure (eGFR < 30).',
    renalNoteTh: 'ต้องลดขนาดยาในผู้ป่วยโรคไต/โรคตับ ไม่ควรใช้ในไตวายรุนแรง (eGFR < 30)'
  },
  {
    id: 'tramadol_parenteral',
    nameEn: 'Tramadol IV / SC Injection',
    nameTh: 'ทรามาดอลฉีด เข้าหลอดเลือดดำ (IV) / ใต้ผิวหนัง (SC)',
    route: 'iv_sc',
    unit: 'mg/day',
    factorToOralMorphine: 0.15, // 100 mg IV Tramadol ≈ 15 mg Oral Morphine
    factorFromOralMorphine: 1 / 0.15,
    formulationsEn: ['Ampoule 50 mg / 1 mL', 'Ampoule 100 mg / 2 mL'],
    formulationsTh: ['แอมพูล 50 มก. / 1 มล.', 'แอมพูล 100 มก. / 2 มล.'],
    frequencyEn: 'Every 6-8 hours IV slowly over 2-3 minutes; Max 400 mg/day',
    frequencyTh: 'ฉีดเข้าหลอดเลือดดำช้าๆ 2-3 นาที ทุก 6-8 ชม. สูงสุดไม่เกิน 400 มก./วัน',
    notesEn: 'Inject slowly to prevent severe nausea/vomiting and hypotension.',
    notesTh: 'ต้องฉีดช้าๆ เพื่อป้องกันคลื่นไส้อาเจียนรุนแรงและความดันโลหิตตก',
    renalSafety: 'contraindicated_severe',
    renalNoteEn: 'Prolong interval to q12h if CrCl < 30 mL/min.',
    renalNoteTh: 'ขยายช่วงเวลาให้เป็นทุก 12 ชม. หาก CrCl < 30 มล./นาที'
  },
  {
    id: 'oxycodone_oral',
    nameEn: 'Oxycodone Oral (CR 12-hr)',
    nameTh: 'ออกซีโคโดนรับประทาน (Oxycodone CR ออกฤทธิ์ยาว 12 ชม.)',
    route: 'oral',
    unit: 'mg/day',
    factorToOralMorphine: 1.5, // 10 mg Oxycodone ≈ 15 mg Oral Morphine
    factorFromOralMorphine: 1 / 1.5,
    formulationsEn: ['Controlled-Release Tablet 10 mg', 'Controlled-Release Tablet 40 mg'],
    formulationsTh: ['ยาเม็ดออกฤทธิ์ยาว 10 มก.', 'ยาเม็ดออกฤทธิ์ยาว 40 มก.'],
    frequencyEn: 'Every 12 hours (swallow whole)',
    frequencyTh: 'รับประทานทุก 12 ชม. กลืนทั้งเม็ด ห้ามบดเคี้ยว',
    notesEn: 'Potency 1.5 - 2x oral morphine. Bioavailability 60-87%. Similar efficacy and side effect profile to morphine. Non-essential list in Thailand (ยานอกบัญชียาหลักแห่งชาติ).',
    notesTh: 'แรงกว่ามอร์ฟีน 1.5 - 2 เท่า ดูดซึมดี 60-87% ในไทยจัดเป็นยานอกบัญชียาหลักแห่งชาติ',
    renalSafety: 'caution',
    renalNoteEn: 'Metabolites cleared by kidneys. Reduce dose in renal impairment.',
    renalNoteTh: 'ขับออกทางไต ต้องปรับลดขนาดยาในผู้ป่วยไตบกพร่อง'
  },
  {
    id: 'codeine_oral',
    nameEn: 'Codeine Oral',
    nameTh: 'โคเดอีนรับประทาน (Codeine)',
    route: 'oral',
    unit: 'mg/day',
    factorToOralMorphine: 0.1, // 100 mg Codeine ≈ 10 mg Oral Morphine
    factorFromOralMorphine: 10.0,
    formulationsEn: ['Tablet 15 mg', 'Tablet 30 mg'],
    formulationsTh: ['ยาเม็ด 15 มก.', 'ยาเม็ด 30 มก.'],
    frequencyEn: 'Every 4-6 hours; Max 240-360 mg/day',
    frequencyTh: 'รับประทานทุก 4-6 ชม. สูงสุด 240-360 มก./วัน',
    notesEn: 'Prodrug converted to morphine by CYP2D6. Ineffective in poor metabolizers; toxic in ultra-rapid metabolizers. Removed from WHO pediatric guideline.',
    notesTh: 'เป็น Prodrug ต้องเปลี่ยนเป็นมอร์ฟีนผ่าน CYP2D6 ใน slow metabolizer จะไม่หายปวด ส่วน ultra-rapid จะเกิดพิษ WHO ถอดออกจากแนวทางในเด็กแล้ว',
    renalSafety: 'caution',
    renalNoteEn: 'Reduce dose in renal impairment. Avoid in end-stage renal disease.',
    renalNoteTh: 'ต้องลดขนาดยาในผู้ป่วยไตวาย ไม่ควรใช้ในระยะสุดท้ายของไต'
  }
];

export interface ThaiCpgFentanylTableEntry {
  oralMorphineRange: string;
  minOralMorphine: number;
  maxOralMorphine: number;
  patchDoseMcgHr: number;
}

// Exactly from Thai CPG Table 9.1.3 (Page 94 / OCR Page 105)
export const THAI_CPG_FENTANYL_TABLE: ThaiCpgFentanylTableEntry[] = [
  { oralMorphineRange: '20 - 44 mg/day', minOralMorphine: 20, maxOralMorphine: 44, patchDoseMcgHr: 12.5 },
  { oralMorphineRange: '45 - 134 mg/day', minOralMorphine: 45, maxOralMorphine: 134, patchDoseMcgHr: 25 },
  { oralMorphineRange: '135 - 224 mg/day', minOralMorphine: 135, maxOralMorphine: 224, patchDoseMcgHr: 50 },
  { oralMorphineRange: '225 - 314 mg/day', minOralMorphine: 225, maxOralMorphine: 314, patchDoseMcgHr: 75 },
  { oralMorphineRange: '315 - 404 mg/day', minOralMorphine: 315, maxOralMorphine: 404, patchDoseMcgHr: 100 },
  { oralMorphineRange: '405 - 494 mg/day', minOralMorphine: 405, maxOralMorphine: 494, patchDoseMcgHr: 125 },
  { oralMorphineRange: '495 - 584 mg/day', minOralMorphine: 495, maxOralMorphine: 584, patchDoseMcgHr: 150 }
];
