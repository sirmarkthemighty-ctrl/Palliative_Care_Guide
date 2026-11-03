export interface AcpScriptItem {
  stage: string;
  stageTh: string;
  goalEn: string;
  goalTh: string;
  physicianScriptEn: string;
  physicianScriptTh: string;
  pitfallsEn: string;
  pitfallsTh: string;
}

export const ACP_LEGAL_SECTION_12 = {
  lawTitleEn: 'National Health Act B.E. 2550, Section 12 (มาตรา 12 พ.ร.บ. สุขภาพแห่งชาติ พ.ศ. 2550)',
  lawTitleTh: 'พระราชบัญญัติสุขภาพแห่งชาติ พ.ศ. 2550 มาตรา 12 (สิทธิการทำหนังสือแสดงเจตนา)',
  lawTextEn:
    '"A person has the right to make an advance directive expressing intent to decline health services that merely prolong the dying process in the final stage of one’s life, or to end suffering from illness. Once healthcare professionals act in accordance with the person’s intent, they shall not be deemed to have committed an offense and shall be released from all liabilities."',
  lawTextTh:
    '"บุคคลมีสิทธิทำหนังสือแสดงเจตนาไม่ประสงค์จะรับบริการสาธารณสุขที่เป็นไปเพียงเพื่อยืดการตายในวาระสุดท้ายของชีวิตตน หรือเพื่อยุติการทรมานจากการเจ็บป่วยได้... เมื่อผู้ประกอบวิชาชีพด้านสาธารณสุขได้ปฏิบัติตามเจตนาของบุคคลตามวรรคหนึ่งแล้ว มิให้ถือว่าการกระทำนั้นเป็นความผิดและให้พ้นจากความรับผิดทั้งปวง"',
  acpVsLivingWillEn: [
    {
      aspect: 'Definition',
      acp: 'Advance Care Planning (ACP) is an ongoing, dynamic communication process between patient, family, and healthcare team to explore values, fears, and care preferences.',
      livingWill: 'A formal legal written document (Section 12) specifically refusing life-sustaining treatments that merely prolong the dying stage.'
    },
    {
      aspect: 'Legal Status',
      acp: 'Clinical communication record and goals-of-care care plan (recorded in EMR).',
      livingWill: 'Legally binding directive recognized by the National Health Act B.E. 2550 Section 12 and Ministerial Regulation B.E. 2553.'
    },
    {
      aspect: 'Revocation',
      acp: 'Adjustable at any time as patient condition or goals evolve.',
      livingWill: 'Can be amended or revoked by the patient at any time while competent. The latest dated version takes legal effect.'
    },
    {
      aspect: 'Scope of Decisions',
      acp: 'Surrogate selection, CPR status, intubation, dialysis, nutrition/hydration, preferred place of dying (home vs hospital).',
      livingWill: 'Refusal of invasive life-prolonging treatments in the terminal phase (withholding/withdrawing CPR, ventilator, vasopressors).'
    }
  ],
  acpVsLivingWillTh: [
    {
      aspect: 'คำนิยาม',
      acp: 'การวางแผนการดูแลล่วงหน้า (Advance Care Planning: ACP) เป็นกระบวนการสนทนาอย่างต่อเนื่องระหว่างผู้ป่วย ครอบครัว และทีมสุขภาพ เพื่อค้นหาค่านิยม ความปรารถนา และเป้าหมายการรักษา',
      livingWill: 'พินัยกรรมชีวิต / หนังสือแสดงเจตนาตามมาตรา 12 (Living Will) เป็นเอกสารลายลักษณ์อักษรตามกฎหมายเพื่อปฏิเสธการรักษาที่ยื้อการตายในวาระสุดท้าย'
    },
    {
      aspect: 'สถานะทางกฎหมาย',
      acp: 'เป็นบันทึกแผนการดูแลรักษาและข้อตกลงทางคลินิกในเวชระเบียนของผู้ป่วย',
      livingWill: 'เป็นเอกสารสิทธิตามกฎหมาย มีผลผูกพันตาม พ.ร.บ. สุขภาพแห่งชาติ พ.ศ. 2550 มาตรา 12 และกฎกระทรวง พ.ศ. 2553'
    },
    {
      aspect: 'การปรับเปลี่ยน',
      acp: 'ทบทวนและปรับเปลี่ยนได้ตลอดเวลาเมื่อสภาวะโรคหรือเป้าหมายชีวิตเปลี่ยนไป',
      livingWill: 'ผู้ป่วยสามารถแก้ไข ยกเลิก หรือทำฉบับใหม่ได้ตลอดเวลาขณะที่มีสติสัมปชัญญะ โดยยึดถือฉบับลงวันที่หลังสุดเป็นสำคัญ'
    },
    {
      aspect: 'ขอบเขตเนื้อหา',
      acp: 'แต่งตั้งผู้ตัดสินใจแทน, สถานะ CPR/AND, การใส่ท่อช่วยหายใจ, การฟอกไต, สารน้ำ/อาหาร, สถานที่ต้องการเสียชีวิต (บ้าน vs รพ.)',
      livingWill: 'การปฏิเสธการรักษาพยุงชีพเพื่อยื้อการตายในวาระสุดท้าย (งดปั๊มหัวใจ, งดใส่ท่อเครื่องช่วยหายใจ, งดยากระตุ้นหัวใจ)'
    }
  ]
};

export const SURROGATE_RULES = {
  titleEn: 'Surrogate Decision Maker (ผู้ตัดสินใจแทน)',
  titleTh: 'หลักการแต่งตั้งและปฏิบัติของผู้ตัดสินใจแทน (Surrogate Decision Maker)',
  pointsEn: [
    'Patient with decision-making capacity always makes their own choices. Surrogate decisions take effect only when the patient loses capacity.',
    'A patient may designate a specific surrogate in writing (Durable Power of Attorney for Healthcare) in their ACP or Section 12 Living Will.',
    'If no surrogate was designated, close relatives (spouse, adult children, parents, siblings) act by substituted judgment, asking: "What would the patient have chosen if they were able to tell us today?"',
    'Surrogates must NOT decide based on their own feelings or fear of social criticism ("กลัวคนอื่นว่าไม่กตัญญู"), but must advocate faithfully for the patient’s known values and best interests.',
    'In case of family conflict, call an interdisciplinary Family Meeting. Do NOT present forms abruptly; guide the family toward consensus around the patient’s natural comfort.'
  ],
  pointsTh: [
    'ผู้ป่วยที่มีสติสัมปชัญญะสมบูรณ์มีสิทธิ์ตัดสินใจด้วยตนเองเสมอ ผู้ตัดสินใจแทนจะมีบทบาทเฉพาะเมื่อผู้ป่วยหมดความสามารถในการตัดสินใจแล้วเท่านั้น',
    'ผู้ป่วยสามารถระบุชื่อผู้มีสิทธิ์ตัดสินใจแทนไว้เป็นลายลักษณ์อักษรในเอกสาร ACP หรือหนังสือแสดงเจตนาตามมาตรา 12',
    'หากไม่ได้ระบุไว้ ญาติใกล้ชิด (คู่สมรส, บุตรที่บรรลุนิติภาวะ, บิดามารดา, พี่น้อง) จะทำหน้าที่ร่วมกัน โดยใช้หลัก "Substituted Judgment": ตัดสินใจบนพื้นฐานว่าถ้าผู้ป่วยตื่นมารับรู้ได้ ผู้ป่วยจะเลือกแนวทางใด',
    'ผู้ตัดสินใจแทนต้องไม่ตัดสินใจบนพื้นฐานผลประโยชน์ตนเอง หรือความกลัวคำนินทาของสังคม (เช่น "กลัวญาติคนอื่นว่าไม่กตัญญู ไม่ยื้อให้ถึงที่สุด") แต่ต้องยึดเจตจำนงและความสุขสบายของผู้ป่วยเป็นหลัก',
    'หากครอบครัวมีความเห็นขัดแย้งกัน ควรจัด Family Meeting ร่วมกับทีมสหสาขาวิชาชีพ เพื่อหาข้อสรุปร่วมกันโดยยึดผลประโยชน์สูงสุดของผู้ป่วย (Best Interests)'
  ]
};

export const SPIKES_PROTOCOL: AcpScriptItem[] = [
  {
    stage: 'S - Setting up the interview',
    stageTh: 'S - การเตรียมความพร้อมและสถานที่',
    goalEn: 'Ensure privacy, adequate time, invite key family members, turn off phone, arrange seating at eye level.',
    goalTh: 'จัดเตรียมสถานที่สงบ เป็นส่วนตัว ปิดเสียงโทรศัพท์ นั่งคุยระดับสายตา และเชิญคนสำคัญในครอบครัวร่วมรับฟัง',
    physicianScriptEn:
      '"Thank you for coming today. I would like us to sit down together in this quiet room so we can discuss how you are doing, review your test results, and plan our care together."',
    physicianScriptTh:
      '"สวัสดีครับ/ค่ะ ขอบคุณที่คุณสมชายและครอบครัวมาร่วมคุยกันในวันนี้นะครับ หมออยากให้เรานั่งคุยกันสบายๆ ในห้องที่สงบนี้ เพื่อทบทวนอาการ ผลการตรวจ และร่วมกันวางแผนการดูแลต่อไปครับ"',
    pitfallsEn: 'Never stand by the bed or talk in a busy hallway. Have tissues available.',
    pitfallsTh: 'ไม่ควรยืนคุยข้างเตียงหรือคุยบริเวณทางเดินที่มีคนพลุกพล่าน ควรมีกระดาษทิชชูพร้อม'
  },
  {
    stage: 'P - Assessing patient Perception',
    stageTh: 'P - ประเมินการรับรู้ของผู้ป่วย (รู้เขา)',
    goalEn: 'Find out what the patient and family already understand about the illness.',
    goalTh: 'ประเมินว่าผู้ป่วยและครอบครัวเข้าใจเกี่ยวกับโรคและสถานการณ์ในปัจจุบันมากน้อยเพียงใด',
    physicianScriptEn:
      '"Before we talk about the latest scans, could you share with me what your understanding is about your illness up to this point?"',
    physicianScriptTh:
      '"ก่อนที่เราจะคุยเรื่องผลเอกซเรย์ล่าสุด หมออยากถามคุณสมชายสักนิดครับว่า ตั้งแต่เริ่มรักษามาจนถึงตอนนี้ คุณสมชายเข้าใจเกี่ยวกับอาการและโรคที่เป็นอยู่อย่างไรบ้างครับ?"',
    pitfallsEn: 'Do not jump straight into clinical data without knowing their starting baseline.',
    pitfallsTh: 'ไม่ควรพูดรายละเอียดผลการตรวจทันทีโดยยังไม่รู้ว่าผู้ป่วยรับรู้และเข้าใจอยู่ระดับไหน'
  },
  {
    stage: 'I - Obtaining the Invitation',
    stageTh: 'I - การขออนุญาตและเชื้อเชิญ',
    goalEn: 'Ask how much information the patient wants to know and if they want loved ones present.',
    goalTh: 'สอบถามความต้องการว่าต้องการรับฟังข้อมูลละเอียดเพียงใด และต้องการให้ใครร่วมรับฟังด้วย',
    physicianScriptEn:
      '"Some patients want to know all details about prognosis and test results, while others prefer the big picture and having their family handle the details. What would be most helpful for you?"',
    physicianScriptTh:
      '"ผู้ป่วยบางท่านต้องการทราบรายละเอียดทั้งหมดของโรคและการพยากรณ์โรค ในขณะที่บางท่านอยากทราบภาพรวมกว้างๆ และให้ครอบครัวช่วยรับฟัง คุณสมชายอยากให้หมออธิบายในระดับไหนดีครับ?"',
    pitfallsEn: 'Forcing detailed bad news on someone who is not ready can trigger acute despair.',
    pitfallsTh: 'การยัดเยียดข้อมูลที่ร้ายแรงในทันทีแก่ผู้ป่วยที่ยังไม่พร้อมอาจทำให้เกิดความตระหนกและหมดหวัง'
  },
  {
    stage: 'K - Giving Knowledge & Information',
    stageTh: 'K - การให้ข้อมูลข่าวสารอย่างชัดเจน',
    goalEn: 'Deliver a warning shot, speak in plain everyday language, chunk information, check understanding (ask-tell-ask).',
    goalTh: 'ใช้คำเตือนล่วงหน้า (Warning shot) ใช้ภาษาพูดที่เข้าใจง่าย หลีกเลี่ยงศัพท์แพทย์ และหยุดเป็นระยะเพื่อประเมินความเข้าใจ',
    physicianScriptEn:
      '"Unfortunately, the results from the CT scan are not as good as we had hoped... The cancer has spread further despite the chemotherapy, and the treatments to shrink the disease are no longer working."',
    physicianScriptTh:
      '"หมอมีข่าวที่อาจจะไม่ค่อยดีนักมาแจ้งครับ... จากผลสแกนล่าสุด พบว่าตัวก้อนมะเร็งมีการลุกลามและกระจายตัวมากขึ้น แม้เราจะให้ยาเคมีบำบัดอย่างเต็มที่แล้ว ซึ่งหมายความว่าโรคไม่ตอบสนองต่อการรักษาเพื่อกำจัดเซลล์มะเร็งแล้วครับ..."',
    pitfallsEn: 'Avoid jargon like "refractory progression". Do not give false hope; speak slowly.',
    pitfallsTh: 'หลีกเลี่ยงศัพท์แพทย์ เช่น "Progression", "Refractory" และอย่าให้ความหวังที่ไม่ตรงกับความจริง'
  },
  {
    stage: 'E - Addressing Emotions with Empathy',
    stageTh: 'E - การตอบสนองต่ออารมณ์ด้วยความเห็นอกเห็นใจ',
    goalEn: 'Acknowledge crying, anger, shock, or silence. Use silence, tissue, or gentle hand touch.',
    goalTh: 'สังเกตและยอมรับปฏิกิริยาอารมณ์ (ร้องไห้, โกรธ, ช็อก, เงียบ) ใช้ความเงียบอย่างมีความหมาย และแสดงความเข้าใจ',
    physicianScriptEn:
      '"I can see how overwhelming and painful this news is for you and your family. It is completely understandable to feel this way. We are here with you, and we will not abandon you."',
    physicianScriptTh:
      '"หมอเข้าใจเลยครับว่าข่าวนี้ทำให้คุณสมชายและครอบครัวรู้สึกตกใจและเสียใจมาก เป็นเรื่องธรรมดามากๆ ครับที่รู้สึกเช่นนี้ หมอและทีมงานทุกคนจะอยู่เคียงข้าง และจะช่วยดูแลเต็มที่ไม่ทอดทิ้งแน่นอนครับ"',
    pitfallsEn: 'Never say "Don\'t cry, stay strong". Crying releases emotional trauma; stay silent and offer a tissue.',
    pitfallsTh: 'ห้ามพูดว่า "อย่าร้องไห้เลย ทำใจดีๆ ไว้" เพราะการร้องไห้ช่วยระบายความทุกข์ ควรเงียบ ยื่นทิชชู และแตะมือเบาๆ'
  },
  {
    stage: 'S - Strategy and Summary',
    stageTh: 'S - การสรุปและวางแผนการดูแลต่อไป',
    goalEn: 'Establish next steps focusing on comfort, symptom control, and what matters most to the patient.',
    goalTh: 'สรุปประเด็นหลัก กำหนดเป้าหมายการรักษาที่เน้นความสุขสบาย และนัดหมายการพูดคุยขั้นต่อไป',
    physicianScriptEn:
      '"Although we cannot cure the underlying disease, there is a great deal we CAN do to keep you comfortable, free from pain or breathlessness, and supported at home with your family. Let us outline our symptom care plan together."',
    physicianScriptTh:
      '"แม้เราจะไม่สามารถรักษาตัวโรคให้หายขาดได้ แต่มีสิ่งสำคัญอีกมากมายที่เราสามารถทำให้คุณสมชายสบายตัว ไม่ทรมานจากความปวดหรือเหนื่อยหอบ และได้ใช้เวลาอันมีค่ากับครอบครัว เรามาวางแผนดูแลร่วมกันนะครับ"',
    pitfallsEn: 'Never say "There is nothing more we can do". There is always palliative care, symptom relief, and comfort.',
    pitfallsTh: 'ห้ามพูดว่า "หมอทำอะไรไม่ได้แล้ว" เพราะการดูแลแบบประคับประคอง การระงับปวด และการดูแลจิตใจ ยังมีบทบาทสำคัญเสมอ'
  }
];

export const AND_VS_DNR = {
  titleEn: 'Allow Natural Death (AND) vs DNR',
  titleTh: 'ทำความเข้าใจ: การอนุญาตให้เสียชีวิตตามธรรมชาติ (AND) แทนคำว่า DNR',
  descriptionEn:
    'The term "Do Not Resuscitate" (DNR) carries negative connotations of giving up, withholding care, or abandonment. Modern palliative medicine recommends the terminology "Allow Natural Death" (AND), emphasizing proactive, compassionate comfort care rather than withholding.',
  descriptionTh:
    'คำว่า "Do Not Resuscitate" (DNR หรือปฏิเสธการกู้ชีพ) มักสร้างความรู้สึกในแง่ลบแก่ครอบครัวว่าเป็นการ "ทอดทิ้ง" หรือ "ยอมแพ้" แนวทางเวชปฏิบัติแนะนำให้ใช้คำว่า "การอนุญาตให้เสียชีวิตตามธรรมชาติ" (Allow Natural Death: AND) เพื่อสื่อสารว่าเราไม่ได้หยุดดูแล แต่เป็นการเปลี่ยนเป้าหมายมามุ่งเน้นการดูแลให้สุขสบาย ไม่ทรมานจากการยื้อความตายที่ไร้ประโยชน์',
  comparison: [
    {
      action: 'Cardiopulmonary Resuscitation (CPR)',
      andConceptEn: 'Allow heart and breathing to stop peacefully when the body is naturally closing down; avoid rib fractures, pain, and traumatic chest compressions in terminal stages.',
      andConceptTh: 'ปล่อยให้หัวใจและปอดหยุดทำงานตามธรรมชาติอย่างสงบ หลีกเลี่ยงการกดหน้าอกที่ทำให้กระดูกซี่โครงหัก เจ็บปวด และทรมานในวาระสุดท้าย'
    },
    {
      action: 'Endotracheal Intubation & Mechanical Ventilation',
      andConceptEn: 'Avoid invasive breathing tube that prevents speech, swallowing, and bedside communication with loved ones. Relieve breathlessness with opioids and positioning instead.',
      andConceptTh: 'หลีกเลี่ยงการใส่ท่อช่วยหายใจที่ทำให้ผู้ป่วยพูดไม่ได้ กลืนไม่ได้ และต้องถูกแยกไปอยู่หอวิกฤต โดยใช้ยามอร์ฟีน จัดท่านอน และพัดลมระบายอากาศเพื่อบรรเทาอาการเหนื่อยหอบแทน'
    },
    {
      action: 'Vasopressors & Invasive Monitoring',
      andConceptEn: 'Discontinue arterial lines, central lines, and blood pressure escalating medications that prolong dying without improving conscious survival.',
      andConceptTh: 'หยุดการเจาะเลือดบ่อยครั้ง การแทงสายสวนหลอดเลือด และการใช้ยากระตุ้นความดันที่ยื้อเวลาการเสียชีวิตโดยไม่ได้ช่วยให้ผู้ป่วยฟื้นคืนสติ'
    }
  ]
};
