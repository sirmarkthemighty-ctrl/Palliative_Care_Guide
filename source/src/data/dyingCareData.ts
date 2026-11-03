export interface DyingSign {
  id: string;
  titleEn: string;
  titleTh: string;
  physioEn: string;
  physioTh: string;
  careActionEn: string[];
  careActionTh: string[];
  familyGuidanceEn: string;
  familyGuidanceTh: string;
}

export const NINE_PHYSICAL_SIGNS: DyingSign[] = [
  {
    id: 'asthenia',
    titleEn: '1. Profound Asthenia & Exhaustion (ความอ่อนเพลีย อ่อนล้า)',
    titleTh: '1. ความอ่อนเพลีย อ่อนล้า หมดเรี่ยวแรง',
    physioEn:
      'Natural energy shutdown and progressive multi-organ functional decline. Patients spend almost all time resting in bed.',
    physioTh:
      'ร่างกายลดการใช้พลังงานลงตามธรรมชาติ การทำงานของอวัยวะต่างๆ ค่อยๆ ชะลอตัว ผู้ป่วยจะนอนพักบนเตียงเกือบตลอดเวลา',
    careActionEn: [
      'Accept as a natural physiological process; do not attempt active invigorating treatments or forced exercise.',
      'Provide soft pillows, gentle repositioning every 2-3 hours to prevent pressure sores, and soft bedding.'
    ],
    careActionTh: [
      'ยอมรับว่าเป็นกระบวนการธรรมชาติ ไม่จำเป็นต้องให้การรักษาเพื่อกระตุ้นเรี่ยวแรง เพราะจะเกิดผลเสียมากกว่าผลดี',
      'จัดสิ่งแวดล้อมให้ผู้ป่วยได้พักผ่อนเต็มที่ ดูแลความสะอาดร่างกายและเปลี่ยนท่านอนอย่างนุ่มนวล'
    ],
    familyGuidanceEn:
      'Reassure family: The patient is resting, not suffering. Conserving energy is the body’s protective mechanism.',
    familyGuidanceTh:
      'อธิบายให้ครอบครัวเข้าใจว่า ผู้ป่วยกำลังพักผ่อน ร่างกายกำลังปรับตัวตามธรรมชาติ ไม่ได้เกิดจากความขี้เกียจหรือหมดกำลังใจ'
  },
  {
    id: 'anorexia',
    titleEn: '2. Anorexia & Decreased Oral Intake (เบื่ออาหาร รับประทานลดลง)',
    titleTh: '2. เบื่ออาหาร รับประทานอาหารได้ลดลงมาก',
    physioEn:
      'The digestive tract slows down; gastric emptying and enzyme secretion diminish. Ketone bodies accumulate, which act as a natural central analgesic and produce a sensation of mild euphoria and comfort.',
    physioTh:
      'กระเพาะและลำไส้หยุดการเคลื่อนไหว การกินอาหารน้อยลงส่งผลดีมากกว่าผลเสีย เพราะทำให้เกิดสารคีโตน (Ketones) ในร่างกาย ซึ่งมีฤทธิ์ระงับปวดตามธรรมชาติและทำให้ผู้ป่วยรู้สึกสุขสบาย เคลิ้มสงบ',
    careActionEn: [
      'Offer comfort foods only if the patient desires, in tiny bites. Never force food.',
      'Stop caloric supplements and transition route away from oral pills to subcutaneous.'
    ],
    careActionTh: [
      'ให้รับประทานอาหารเฉพาะที่ผู้ป่วยต้องการและเท่าที่อยากรับประทาน ไม่บังคับหรือคะยั้นคะยอ',
      'หากเริ่มกลืนลำบาก ให้เปลี่ยนรูปแบบยาเป็นทางใต้ผิวหนัง (SC) แทนยากิน'
    ],
    familyGuidanceEn:
      'Explain that forced feeding can lead to severe choking, aspiration pneumonia, nausea, and abdominal distension. The dying body does not hunger.',
    familyGuidanceTh:
      'อธิบายให้ญาติคลายกังวลว่า ผู้ป่วยไม่ได้ทรมานจากความหิว การฝืนป้อนอาหารจะทำให้สำลัก แน่นท้อง ปอดอักเสบ และอาเจียนทรมาน'
  },
  {
    id: 'fluid_intake',
    titleEn: '3. Decreased Fluid Intake & Natural Dehydration (ดื่มน้ำน้อยลง)',
    titleTh: '3. ดื่มน้ำน้อยลง จิบได้เฉพาะน้ำหรือกลืนไม่ได้',
    physioEn:
      'Fluid requirements drop drastically. Natural terminal dehydration stimulates endorphin release and decreases respiratory secretions, vomiting, diarrhea, and ascites/edema.',
    physioTh:
      'ภาวะขาดน้ำในระยะใกล้เสียชีวิตไม่ทำให้ผู้ป่วยทรมาน แต่กลับกระตุ้นการหลั่งสารเอ็นดอร์ฟิน (Endorphins) ช่วยลดอาการปวด และลดการสร้างเสมหะ อาการบวม และน้ำท่วมปอด',
    careActionEn: [
      'Diligent oral care: moisten lips and tongue with wet swabs, ice chips, or soft cotton gauze dipped in water every 1-2 hours.',
      'Apply lip balm or petroleum jelly to prevent cracked lips. Use artificial tears for dry eyes.'
    ],
    careActionTh: [
      'ทำความสะอาดช่องปากและให้ความชุ่มชื้น: ใช้สำลีชุบน้ำแตะริมฝีปากและกระพุ้งแก้มทุก 1-2 ชม. อมเกล็ดน้ำแข็งก้อนเล็กๆ',
      'ทาสีผึ้งหรือวาสลีนที่ริมฝีปากเพื่อป้องกันปากแห้งแตก หยอดน้ำตาเทียมหากตาแห้ง'
    ],
    familyGuidanceEn:
      'Counsel family that IV fluid infusions at this stage cause fluid overload, pleural effusion, worsening death rattle, and painful peripheral edema.',
    familyGuidanceTh:
      'อธิบายเหตุผลว่าทำไมไม่ควรให้น้ำเกลือทางหลอดเลือดดำ เพราะจะทำให้เกิดน้ำท่วมปอด ท้องมาน บวมทั้งตัว และทำให้เสมหะคั่งครืดคราดยิ่งขึ้น'
  },
  {
    id: 'drowsiness',
    titleEn: '4. Progressive Drowsiness & Somnolence (รู้สึกง่วง ซึมมากขึน)',
    titleTh: '4. รู้สึกง่วง ซึมลง หรือกึ่งรู้สติ นอนหลับตลอดเวลา',
    physioEn:
      'Decreased cerebral perfusion and natural metabolic shifts cause gradual drifting from sleepiness to unresponsiveness.',
    physioTh:
      'การไหลเวียนเลือดไปเลี้ยงสมองลดลงและการเปลี่ยนแปลงของสารเคมีในร่างกาย ทำให้ผู้ป่วยง่วงซึมและหลับเป็นส่วนใหญ่',
    careActionEn: [
      'Allow the patient to rest peacefully. Do not forcefully wake, shake, or stimulate the patient.',
      'Maintain a soothing, unhurried bedside presence with soft lighting.'
    ],
    careActionTh: [
      'ปล่อยให้ผู้ป่วยหลับพักผ่อนตามธรรมชาติ ไม่ควรพยายามปลุก เขย่า หรือเรียกเสียงดังให้ตื่น',
      'จัดบรรยากาศรอบเตียงให้สงบ อบอุ่น แสงสว่างนุ่มนวล'
    ],
    familyGuidanceEn:
      'Tell the family this sleep is peaceful and painless; encourage them to sit beside the bed, hold hands, and speak loving words.',
    familyGuidanceTh:
      'ให้ข้อมูลครอบครัวว่า การหลับนี้เป็นความสงบ ปราศจากความเจ็บปวด ให้ลูกหลานนั่งข้างเตียง จับมือเบาๆ และพูดคุยสิ่งที่ดีงาม'
  },
  {
    id: 'eye_closure',
    titleEn: '5. Incomplete Eye Closure (ตาค้าง หลับตาไม่สนิท)',
    titleTh: '5. ตาค้าง หรือหลับตาไม่สนิท',
    physioEn:
      'Loss of facial muscle tone and atrophy of the retro-orbital fat pad make complete eyelid closure difficult.',
    physioTh:
      'กล้ามเนื้อเปลือกตาและใบหน้าคลายตัว ประกอบกับไขมันรอบเบ้าตาลดลง ทำให้ผู้ป่วยหลับตาได้ไม่สนิท',
    careActionEn: [
      'Instill artificial tear drops or lubricating eye ointment every 2-4 hours to prevent corneal drying and irritation.',
      'Gently lower the eyelids when the patient is asleep.'
    ],
    careActionTh: [
      'หยอดน้ำตาเทียมหรือขี้ผึ้งป้ายตาทุก 2-4 ชั่วโมง เพื่อป้องกันกระจกตาแห้งและระคายเคือง',
      'ใช้นิ้วลูบปิดเปลือกตาลงเบาๆ เมื่อผู้ป่วยนอนหลับ'
    ],
    familyGuidanceEn:
      'Reassure loved ones that this is a common physical relaxation sign, not fear, distress, or lingering anxiety.',
    familyGuidanceTh:
      'แนะนำครอบครัวว่า เกิดจากความอ่อนล้าและกล้ามเนื้อคลายตัว ไม่ได้เกิดจากความหวาดกลัวหรือความทุกข์ใจ'
  },
  {
    id: 'breathing_pattern',
    titleEn: '6. Altered Respiratory Patterns (การเปลี่ยนแปลงการหายใจ)',
    titleTh: '6. การหายใจเปลี่ยนแปลง (Cheyne-Stokes / หายใจพะงาบ)',
    physioEn:
      'Brainstem hypoperfusion leads to irregular breathing: Cheyne-Stokes breathing (cycles of deep breathing followed by apnea) and mandibular breathing (jaw dropping with inspiration).',
    physioTh:
      'ศูนย์ควบคุมการหายใจที่ก้านสมองทำงานช้าลง ทำให้เกิดการหายใจแบบ Cheyne-Stokes (หายใจเร็วลึกสลับกับหยุดหายใจเป็นช่วงๆ นาน 10-30 วินาที) และการหายใจแบบอ้าปาก/ขยับขากรรไกร (Mandibular breathing)',
    careActionEn: [
      'Administer low-dose subcutaneous morphine (e.g. 2.5 - 5 mg SC q4h or PRN) to relieve any sensation of air hunger.',
      'Elevate the head of bed; maintain a gentle breeze with a handheld fan directed towards the face.'
    ],
    careActionTh: [
      'ให้ยามอร์ฟีนฉีดใต้ผิวหนังขนาดต่ำ (เช่น 2.5 - 5 มก. SC) เพื่อระงับความรู้สึกหายใจไม่อิ่ม',
      'ยกหัวเตียงสูงเล็กน้อย ใช้พัดลมมือถือเปิดเป่าลมเย็นอ่อนๆ บริเวณใบหน้า'
    ],
    familyGuidanceEn:
      'Apneic pauses of 15-30 seconds can frighten families. Explain that pauses are typical in dying and the semi-conscious patient is not suffocating.',
    familyGuidanceTh:
      'ช่วงที่หยุดหายใจไป 15-30 วินาทีมักทำให้ญาติตกใจ ต้องอธิบายล่วงหน้าว่าเป็นจังหวะธรรมชาติของระยะใกล้สิ้นลม ผู้ป่วยไม่ได้กำลังขาดอากาศหายใจทรมาน'
  },
  {
    id: 'vocalizations',
    titleEn: '7. Involuntary Vocalizations & Grimacing (ร้องคราง สีหน้าบิดเบี้ยว)',
    titleTh: '7. การส่งเสียงคราง หรือมีสีหน้าบิดเบี้ยว',
    physioEn:
      'Subcortical release, subcortical reflexes, or air passing across relaxing vocal cords on expiration may cause moaning without conscious pain.',
    physioTh:
      'เสียงครางในลำคอเกิดจากลมหายใจออกที่ผ่านเส้นเสียงที่กำลังคลายตัว หรือปฏิกิริยาสะท้อนกลับของระบบประสาทส่วนล่าง ซึ่งอาจไม่ได้เกิดจากความเจ็บปวดเสมอไป',
    careActionEn: [
      'Assess for physical discomfort first (bladder distension, constipation, bed sores, awkward limb position).',
      'Administer subcutaneous morphine and/or low-dose midazolam if distress or restlessness is suspected.'
    ],
    careActionTh: [
      'ตรวจหาสาเหตุทางกายก่อน (เช่น ปัสสาวะคั่ง, ท้องผูก, ท่านอนกดทับ, แผลกดทับ)',
      'หากประเมินแล้วน่าจะมีความไม่สุขสบาย ให้ยามอร์ฟีน หรือมิดาโซแลมขนาดต่ำเพื่อช่วยให้ผ่อนคลาย'
    ],
    familyGuidanceEn:
      'Differentiate involuntary vocalization from pain. Reassure the family while verifying that pain medications are optimized.',
    familyGuidanceTh:
      'อธิบายให้ครอบครัวเข้าใจความแตกต่างระหว่างเสียงสะท้อนของลมหายใจกับความเจ็บปวด พร้อมทั้งปรับยาบรรเทาอาการให้เหมาะสม'
  },
  {
    id: 'death_rattle',
    titleEn: '8. Terminal Airway Secretions / Death Rattle (เสมหะคั่งในคอหอย)',
    titleTh: '8. มีเสมหะคั่ง หรือหายใจมีเสียงเสมหะครืดคราด (Death Rattle)',
    physioEn:
      'Inability to swallow or cough up saliva results in pooling of normal hypopharyngeal secretions. Oscillating air during breathing produces the rattling sound.',
    physioTh:
      'ผู้ป่วยไม่สามารถกลืนน้ำลายหรือไอขับเสมหะได้ น้ำลายจึงคั่งอยู่บริเวณคอหอย เมื่อหายใจเข้าออกลมจะกระทบกับน้ำลายเกิดเสียงครืดคราด',
    careActionEn: [
      'Turn the patient into a comfortable lateral recovery position to allow saliva to drain forward.',
      'Administer Hyoscine butylbromide (Buscopan) 20 mg SC q4-6h (or Atropine 1% eye drops 1-2 drops sublingual).',
      'DO NOT PERFORM DEEP SUCTIONING: suction catheters cause gagging, bleeding, laryngospasm, and immense distress.'
    ],
    careActionTh: [
      'จับผู้ป่วยนอนตะแคง แล้วใช้ผ้าสะอาดเช็ดน้ำลายที่มุมปาก',
      'ให้ยาฉีดลดการหลั่งเสมหะ: Hyoscine butylbromide (Buscopan) 20 มก. ฉีดใต้ผิวหนัง (SC) ทุก 4-6 ชม.',
      'ห้ามดูดเสมหะลึกเด็ดขาด: เพราะสร้างความทรมาน สำลัก และกระตุ้นให้ร่างกายสร้างเสมหะมากขึ้น'
    ],
    familyGuidanceEn:
      'The sound is often distressing to families who fear the patient is "drowning". Assure them the patient is unaware and not choking.',
    familyGuidanceTh:
      'เสียงนี้มักทำให้ญาติกังวลว่าคนไข้กำลังสำลักน้ำลาย ต้องอธิบายอย่างนุ่มนวลว่าผู้ป่วยไม่รู้สึกตัวและไม่ได้ทรมานจากการสำลัก'
  },
  {
    id: 'hearing_preservation',
    titleEn: '9. Preserved Auditory Perception (การได้ยินยังคงอยู่เป็นสิ่งสุดท้าย)',
    titleTh: '9. หมดสติหรือไม่รู้สึกตัว แต่การได้ยินยังคงทำงาน',
    physioEn:
      'Auditory pathways in the brain remain active even when cortical responsiveness, speech, and motor responses have ceased.',
    physioTh:
      'ระบบการได้ยินเป็นประสาทสัมผัสสุดท้ายที่ยังคงทำงาน แม้ผู้ป่วยจะไม่รู้สึกตัวหรือตอบสนองทางวาจาไม่ได้แล้วก็ตาม',
    careActionEn: [
      'Encourage family members to speak directly to the patient in comforting, gentle tones.',
      'Allow private moments for forgiveness, gratitude, saying goodbye, and reciting prayers.',
      'Do not speak about distressing topics, disputes, or medical logistics in the patient’s presence.'
    ],
    careActionTh: [
      'ส่งเสริมให้คนในครอบครัวพูดคุยกับผู้ป่วยด้วยน้ำเสียงอ่อนโยน กระซิบข้างหูบอกความรู้สึกที่ดี',
      'เปิดโอกาสให้ขอขมา ขออโหสิกรรม ขอบคุณ บอกรัก และสวดมนต์ตามความเชื่อทางศาสนา',
      'ห้ามพูดคุยเรื่องความขัดแย้ง เรื่องมรดก หรือสิ่งที่จะทำให้ผู้ป่วยกังวลต่อหน้าผู้ป่วยเด็ดขาด'
    ],
    familyGuidanceEn:
      '"Assume your loved one can hear every word. Speak to them from your heart, tell them it is okay to let go, and remind them how deeply they are loved."',
    familyGuidanceTh:
      '"เชื่อมั่นเสมอว่าคุณพ่อ/คุณแม่ยังได้ยินเราอยู่ กระซิบข้างหูบอกให้ท่านวางใจ ไม่ต้องเป็นห่วงคนข้างหลัง และบอกลาอย่างสงบได้เลยครับ"'
  }
];

// Palliative Prognostic Index (PPI) Calculation
export interface PpiCalculation {
  ppsScore: number; // 0, 2.5, 4
  oralIntake: number; // 0, 1, 2.5
  edema: number; // 0, 1
  dyspneaAtRest: number; // 0, 3.5
  delirium: number; // 0, 4
}

export const calculatePpi = (calc: PpiCalculation) => {
  const total = calc.ppsScore + calc.oralIntake + calc.edema + calc.dyspneaAtRest + calc.delirium;
  let prognosisEn = '';
  let prognosisTh = '';
  let color = '';

  if (total > 6) {
    prognosisEn = 'High Risk: Predicted survival < 3 weeks (median ~7-10 days)';
    prognosisTh = 'กลุ่มเสี่ยงสูง: พยากรณ์ชีวิตสั้นกว่า 3 สัปดาห์ (ค่ามัธยฐาน ~7-10 วัน)';
    color = 'rose';
  } else if (total > 4) {
    prognosisEn = 'Intermediate Risk: Predicted survival < 6 weeks';
    prognosisTh = 'กลุ่มเสี่ยงปานกลาง: พยากรณ์ชีวิตสั้นกว่า 6 สัปดาห์';
    color = 'amber';
  } else {
    prognosisEn = 'Lower Risk: Predicted survival > 6 weeks';
    prognosisTh = 'กลุ่มเสี่ยงต่ำ: พยากรณ์ชีวิตมากกว่า 6 สัปดาห์';
    color = 'emerald';
  }

  return { total, prognosisEn, prognosisTh, color };
};

export const ANTICIPATORY_PRESCRIBING = [
  {
    symptomEn: 'Pain & Breathlessness',
    symptomTh: 'ความปวด และ อาการเหนื่อยหอบ',
    drugEn: 'Morphine Injection',
    drugTh: 'มอร์ฟีนชนิดฉีด (Morphine Injection 10 mg/mL)',
    doseEn: '2.5 - 5 mg SC every 1-2 hours PRN (opioid-naive) or 10-15% of 24h dose',
    doseTh: '2.5 - 5 มก. ฉีดใต้ผิวหนัง (SC) ทุก 1-2 ชม. เมื่อมีอาการ หรือ 10-15% ของขนาด 24 ชม.',
    route: 'SC (via butterfly needle)',
    rationaleEn: 'Relieves nociceptive pain and decreases dyspneic sensation / air hunger perception.'
  },
  {
    symptomEn: 'Restlessness, Agitation & Panic',
    symptomTh: 'กระสับกระส่าย วิตกกังวล และตื่นตระหนก',
    drugEn: 'Midazolam Injection',
    drugTh: 'มิดาโซแลมชนิดฉีด (Midazolam 5 mg/mL)',
    doseEn: '2.5 - 5 mg SC every 1-2 hours PRN (or continuous SC infusion 0.5-1 mg/hr)',
    doseTh: '2.5 - 5 มก. ฉีดใต้ผิวหนัง (SC) ทุก 1-2 ชม. เมื่อมีอาการ (หรือดริป 0.5-1 มก./ชม.)',
    route: 'SC',
    rationaleEn: 'Fast-acting sedative and anxiolytic for terminal restlessness and acute dyspnea crisis.'
  },
  {
    symptomEn: 'Terminal Airway Secretions',
    symptomTh: 'เสมหะคั่งในคอหอย (Death Rattle)',
    drugEn: 'Hyoscine butylbromide (Buscopan®)',
    drugTh: 'ไฮออสซีน บิวทิลโบรไมด์ (Buscopan® 20 mg/mL)',
    doseEn: '20 mg SC every 4-6 hours PRN or regular (Max 100 mg/day)',
    doseTh: '20 มก. ฉีดใต้ผิวหนัง (SC) ทุก 4-6 ชม. เมื่อมีอาการหรือฉีดประจำ (สูงสุด 100 มก./วัน)',
    route: 'SC',
    rationaleEn: 'Anticholinergic that inhibits new salivary and respiratory secretions without crossing blood-brain barrier.'
  },
  {
    symptomEn: 'Nausea, Vomiting & Hallucinations',
    symptomTh: 'คลื่นไส้ อาเจียน และเห็นภาพหลอน',
    drugEn: 'Haloperidol Injection',
    drugTh: 'ฮาโลเพอริดอลชนิดฉีด (Haloperidol 5 mg/mL)',
    doseEn: '0.5 - 1.5 mg SC every 8-12 hours PRN or regular',
    doseTh: '0.5 - 1.5 มก. ฉีดใต้ผิวหนัง (SC) ทุก 8-12 ชม. เมื่อมีอาการหรือฉีดประจำ',
    route: 'SC',
    rationaleEn: 'Blocks dopamine D2 receptors in CTZ for nausea and reduces hallucinations/confusion.'
  }
];

export const SPIRITUAL_CARE_PROTOCOLS = {
  buddhismEn: [
    'Create a serene, respectful atmosphere. Avoid loud emotional outbursts or noisy arguments in the room.',
    'Place a Buddha image, picture of respected monks, or sacred objects within the patient’s line of sight.',
    'Place a floral incense cone (กรวยดอกไม้ธูปเทียน) gently in the patient’s clasped hands to prepare their mind for offering.',
    'Whisper gentle recollection into the ear: remind the patient of their lifelong good deeds, charities, merits, and virtues.',
    'Chanting: Invite monks for Bojjhanga Paritta chanting, or play soft Buddhist chanting audio (e.g. "Araham Samma", Namo Tassa).',
    'Care for Monks (ภิกษุอาพาธ): Follow 7 Sappaya (wholesome environment), keep the monastic robes (Trai Jivara) near the bed within arm’s reach to prevent Vinaya offense, respect midday fasting (no food after noon, offer permissible Panaha drinks), and support monastic will according to Civil and Commercial Code Sections 1623 and 1624.'
  ],
  buddhismTh: [
    'จัดบรรยากาศรอบเตียงให้สงบ สัปปายะ หลีกเลี่ยงการส่งเสียงดังหรือการโต้เถียงขัดแย้งในห้องผู้ป่วย',
    'จัดตั้งโต๊ะหมู่บูชา พระพุทธรูป หรือรูปครูบาอาจารย์ที่เคารพไว้ในระดับสายตาที่ผู้ป่วยมองเห็นได้',
    'จัดเตรียมกรวยดอกไม้ธูปเทียน นำมาใส่มือให้ผู้ป่วยพนมไว้ เพื่อให้น้อมจิตเป็นกุศลในการบูชาพระรัตนตรัย',
    'การบอกทาง (กระซิบข้างหู): พูดเตือนสติเบาๆ ชวนให้ระลึกถึงคุณพระรัตนตรัย คุณงามความดี บุญกุศลที่เคยสร้างมา และภาวนา "พุทโธ" หรือ "อรหัง สัมมา"',
    'การสวดมนต์: นิมนต์พระสงฆ์มาสวดเจริญพระพุทธมนต์บทโพชฌงคปริตร หรือเปิดเทปบทสวดมนต์ที่ผู้ป่วยคุ้นเคย',
    'การดูแลภิกษุอาพาธระยะท้าย: ยึดหลักสัปปายะ 7 ประการ จัดผ้าไตรจีวรไว้ใกล้ตัวท่านในระยะเอื้อมถึง (เพื่อไม่ให้เป็นอาบัติตามพระวินัย), เอื้อเฟื้อต่อเวลาฉันภัตตาหารก่อนเที่ยงและถวายน้ำปานะที่ถูกต้องตามพระวินัยหลังเที่ยง, และให้ความรู้เรื่องการทำพินัยกรรมมอบทรัพย์สินของพระสงฆ์ตามประมวลกฎหมายแพ่งและพาณิชย์ มาตรา 1623 และ 1624'
  ],
  islamEn: [
    'Ibadah-Friendly environment: Support patient and family in spiritual duties.',
    'Facilitate Qibla orientation: If feasible, position the bed so the patient faces Mecca (Qibla).',
    'Talqin: Gently encourage loved ones to whisper the Shahada ("La ilaha illallah" - There is no god but Allah) into the patient’s ear as death approaches.',
    'Keep mouth clean and moist with wet swabs; recite Quran verses (e.g. Surah Ya-Sin) softly by the bedside.',
    'After death: Close eyes, align limbs gently, cover body with clean sheet, and facilitate prompt burial according to Islamic rites.'
  ],
  islamTh: [
    'จัดสิ่งแวดล้อมให้เอื้อต่อการปฏิบัติศาสนกิจ (Ibadah Friendly Hospital)',
    'จัดเตียงนอนให้หันไปทางทิศกิบลัต (Qibla) มุ่งสู่เมืองมักกะฮ์ หากสภาพห้องอำนวย',
    'การตัลกีน (Talqin): แนะนำให้ญาติกระซิบเตือนสติข้างหูผู้ป่วยอย่างนุ่มนวลให้กล่าวคำปฏิญาณ "ลาอิลาฮะอิลลัลลอฮ์" (ไม่มีพระเจ้าอื่นใดนอกจากอัลลอฮ์)',
    'ดูแลความสะอาดช่องปากและรักษาความชุ่มชื้น อ่านคัมภีร์อัลกุรอาน (เช่น ซูเราะฮ์ยาซีน) ข้างเตียง',
    'หลังเสียชีวิต: ปิดเปลือกตา จัดร่างกายให้อยู่ในท่านอนที่เรียบร้อย ห่มผ้าสะอาดคลุมถึงอก และประสานงานเพื่อประกอบพิธีฝังตามหลักศาสนาอิสลามอย่างรวดเร็ว'
  ],
  christianityEn: [
    'Sacrament of the Anointing of the Sick (ศีลเจิมผู้ป่วย) / Last Rites: Contact priest or chaplain promptly for Catholic patients.',
    'Prayer and Scripture reading: Read comforting Psalms (e.g. Psalm 23) and passages of God’s eternal love and forgiveness.',
    'Family presence: Encourage loving touch, holding hands, and reassuring the patient of eternal life with Christ.',
    'Post-mortem: Wash and dress body respectfully; facilitate viewing for family before funeral services.'
  ],
  christianTh: [
    'ศีลเจิมผู้ป่วย (Sacrament of the Sick) และศีลทาสุดท้าย: ติดต่อบาทหลวงเพื่อประกอบพิธีเจิมน้ำมันศักดิ์สิทธิ์และอภัยบาปสำหรับผู้ป่วยคาทอลิก',
    'การอธิษฐานและอ่านพระคัมภีร์: อ่านบทเพลงสดุดี (เช่น สดุดี 23 "พระยาห์เวห์ทรงเลี้ยงดูข้าพเจ้า") เพื่อเสริมพลังใจและย้ำเตือนถึงความรักและการให้อภัยของพระเจ้า',
    'ให้คนในครอบครัวอยู่เคียงข้าง จับมือ สัมผัสอย่างอ่อนโยน และให้ความมั่นใจเรื่องชีวิตนิรันดร์',
    'หลังเสียชีวิต: ทำความสะอาดสรีระอย่างสมเกียรติ จัดท่าทางให้เรียบร้อย และประสานงานพิธีศพตามธรรมเนียมคริสต์'
  ]
};

export const TERMINAL_ORDER_SET_TEMPLATE = {
  titleEn: 'Physician Terminal Comfort Care Order Set (ชุดคำสั่งการดูแลเพื่อความสุขสบายในวาระสุดท้าย)',
  titleTh: 'ชุดคำสั่งแพทย์สำหรับการดูแลเพื่อความสุขสบายในวาระสุดท้าย (Terminal Comfort Order Set)',
  ordersEn: [
    '1. GOAL OF CARE: Maximize comfort, relief of suffering, and dignified natural dying. Avoid futile interventions.',
    '2. MONITORING: STOP routine vital signs, fingerstick blood glucose, ECG monitoring, and routine blood draws.',
    '3. MEDICATIONS: DISCONTINUE all non-essential medications (statins, antihypertensives, vitamins, oral hypoglycemics, antiplatelets, DVT prophylaxis).',
    '4. ROUTE: Discontinue all oral pills when swallowing becomes difficult. Place subcutaneous (SC) butterfly cannula (change q3-7d or PRN). NO INTRAMUSCULAR (IM) INJECTIONS.',
    '5. PAIN / DYSPNEA: Morphine injection 2.5 - 5 mg SC every 1-2 hours PRN for pain, breathlessness, or distress (or 10-15% of 24h dose if on chronic opioids).',
    '6. TERMINAL RESTLESSNESS: Midazolam 2.5 - 5 mg SC every 1-2 hours PRN for severe agitation or anxiety.',
    '7. DELIRIUM / HALLUCINATIONS: Haloperidol 0.5 - 1.5 mg SC every 8-12 hours regular / PRN for confusion or hallucinations.',
    '8. TERMINAL SECRETIONS ("Death Rattle"): Hyoscine butylbromide (Buscopan) 20 mg SC every 4-6 hours PRN or regular. Position patient in lateral recovery position. DO NOT PERFORM DEEP SUCTIONING.',
    '9. NURSING & COMFORT CARE: Oral mouth care with moist swabs every 1-2 hours. Artificial tears eye drops every 4 hours. Petroleum jelly to lips. Gentle repositioning. Handheld fan to face PRN.',
    '10. HYDRATION / NUTRITION: Stop IV fluid infusion (or limit to < 500 mL/day D5W/NSS if psychologically required by family). Sips of fluid and comfort food only as requested by patient.',
    '11. CODE STATUS: Allow Natural Death (AND). Do not initiate CPR, do not intubate, do not transfer to ICU.',
    '12. FAMILY & SPIRITUAL: Unrestricted family visitation 24/7. Support religious rites (Buddhism chanting, Muslim Shahada, Christian Anointing).'
  ],
  ordersTh: [
    '1. เป้าหมายการรักษา: มุ่งเน้นความสุขสบายสูงสุด บรรเทาความทุกข์ทรมาน และการจากไปอย่างสงบตามธรรมชาติ หลีกเลี่ยงหัตถการที่ยื้อชีวิตโดยไร้ประโยชน์',
    '2. การตรวจวัด: หยุดวัดสัญญาณชีพเป็นกิจวัตร (V/S routine), หยุดเจาะน้ำตาลปลายนิ้ว (DTX), ปลดสายมอนิเตอร์คลื่นไฟฟ้าหัวใจ และหยุดการเจาะเลือดตรวจทางห้องปฏิบัติการ',
    '3. การใช้ยา: หยุดยาทั้งหมดที่ไม่จำเป็นต่อความสุขสบาย (ยาลดไขมัน, ยาลดความดัน, ยาบำรุง, ยาเบาหวาน, ยาต้านการแข็งตัวของเลือด, ยาป้องกันลิ่มเลือดอุดกั้น)',
    '4. ทางการให้ยา: หยุดยาชนิดรับประทานเมื่อเริ่มกลืนลำบาก คาสายให้น้ำเกลือใต้ผิวหนัง (Subcutaneous Butterfly Needle) ห้ามฉีดยาเข้ากล้ามเนื้อ (IM) เพราะเจ็บปวด',
    '5. ปวด / เหนื่อยหอบ: Morphine injection 2.5 - 5 มก. ฉีดใต้ผิวหนัง (SC) ทุก 1-2 ชม. PRN เมื่อมีอาการปวด เหนื่อย หรือกระวนกระวาย (หรือให้ 10-15% ของขนาดยา 24 ชม.)',
    '6. กระสับกระส่ายวาระสุดท้าย: Midazolam injection 2.5 - 5 มก. ฉีดใต้ผิวหนัง (SC) ทุก 1-2 ชม. PRN เมื่อมีอาการกระสับกระส่ายรุนแรง ตื่นตระหนก',
    '7. สับสนเพ้อ / ภาพหลอน: Haloperidol injection 0.5 - 1.5 มก. ฉีดใต้ผิวหนัง (SC) ทุก 8-12 ชม. เมื่อมีอาการ หรือฉีดประจำ',
    '8. เสมหะคั่งในคอหอย (Death Rattle): Hyoscine butylbromide (Buscopan) 20 มก. ฉีดใต้ผิวหนัง (SC) ทุก 4-6 ชม. จัดท่านอนตะแคง ห้ามดูดเสมหะลึกเด็ดขาด',
    '9. การพยาบาลดูแลสุขสบาย: ทำความสะอาดช่องปากและเช็ดกระพุ้งแก้มด้วยผ้าชุบน้ำทุก 1-2 ชม. หยอดน้ำตาเทียมทุก 4 ชม. ทาวาสลีนที่ริมฝีปาก จัดท่านอนที่สบาย ใช้พัดลมเป่าหน้า',
    '10. สารน้ำและอาหาร: งดการให้น้ำเกลือทางหลอดเลือดดำ (เพื่อป้องกันน้ำท่วมปอดและเสมหะคั่ง) จิบน้ำหรืออาหารตามความต้องการของผู้ป่วยเท่านั้น ห้ามบังคับกลืน',
    '11. สถานะการกู้ชีพ: อนุญาตให้เสียชีวิตตามธรรมชาติ (Allow Natural Death: AND) ไม่ปั๊มหัวใจ (No CPR) ไม่ใส่ท่อช่วยหายใจ ไม่ส่งต่อหอผู้ป่วยวิกฤต (ICU)',
    '12. ครอบครัวและจิตวิญญาณ: อนุญาตให้ครอบครัวเฝ้าไข้ได้ตลอด 24 ชั่วโมง สนับสนุนพิธีกรรมทางศาสนา (สวดมนต์พุทธ, ตัลกีนอิสลาม, ศีลเจิมคริสต์)'
  ]
};
