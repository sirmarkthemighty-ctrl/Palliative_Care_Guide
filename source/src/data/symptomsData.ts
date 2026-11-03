export interface SymptomDetail {
  id: string;
  nameEn: string;
  nameTh: string;
  category: 'pain' | 'dyspnea' | 'nausea' | 'constipation' | 'delirium' | 'secretions' | 'emergency';
  summaryEn: string;
  summaryTh: string;
  assessmentEn: string[];
  assessmentTh: string[];
  nonPharmEn: string[];
  nonPharmTh: string[];
  pharmTableEn: {
    drug: string;
    route: string;
    dose: string;
    frequency: string;
    indicationOrNote: string;
  }[];
  pharmTableTh: {
    drug: string;
    route: string;
    dose: string;
    frequency: string;
    indicationOrNote: string;
  }[];
  clinicalPearlsEn: string[];
  clinicalPearlsTh: string[];
  contraindicationsEn: string[];
  contraindicationsTh: string[];
}

export const SYMPTOMS_DATA: SymptomDetail[] = [
  {
    id: 'pain',
    nameEn: 'Cancer & Palliative Pain Management',
    nameTh: 'การจัดการความปวดในผู้ป่วยประคับประคองและมะเร็ง',
    category: 'pain',
    summaryEn:
      'Palliative pain management follows the WHO 3-Step Analgesic Ladder, tailored to individual pain mechanisms (somatic, visceral, neuropathic) and renal/hepatic function. Around-the-clock dosing with fast-acting rescue doses is mandatory for continuous pain.',
    summaryTh:
      'การจัดการความปวดตามหลักการขององค์การอนามัยโลก (WHO Analgesic Ladder) โดยให้ยาตามความรุนแรงของอาการปวด ให้ยาตามตารางเวลาสม่ำเสมอ (By the clock) ควบคู่กับยาแก้ปวดกำเริบฉับพลัน (PRN for breakthrough pain) และเลือกยาเสริม (Adjuvants) ตามกลไกของความปวด',
    assessmentEn: [
      'PQRST assessment: P (position, provoking/palliating factors), Q (quality: aching, burning, shooting, cramping), R (radiation), S (severity: NRS 0-10 or Faces Pain Scale), T (temporal pattern: continuous vs breakthrough).',
      'Distinguish nociceptive pain (somatic: sharp/aching, visceral: poorly localized/cramping) from neuropathic pain (burning, electric shocks, numbness, allodynia).',
      'Assess impact on sleep, mobility, and mood. Screen for total pain (psychological, social, spiritual components).'
    ],
    assessmentTh: [
      'ประเมินตามหลัก PQRST: P (ตำแหน่ง ปัจจัยกระตุ้น/บรรเทา), Q (ลักษณะปวด: ตื้อๆ แหลมๆ แสบร้อน บีบรัด แปลบๆ), R (อาการปวดร้าว), S (ระดับความรุนแรง 0-10 หรือ Faces scale), T (ระยะเวลาและรูปแบบ: ปวดตลอดเวลา หรือปวดเป็นพักๆ)',
      'แยกกลไกความปวด: ความปวดจากเนื้อเยื่อบาดเจ็บ (Nociceptive: Somatic ปวดผิวหนัง/กระดูก/กล้ามเนื้อ, Visceral ปวดอวัยวะภายใน) หรือความปวดจากเส้นประสาท (Neuropathic: แสบร้อน เหมือนไฟฟ้าช็อต ชา ไวต่อสัมผัส)',
      'ประเมินผลกระทบต่อการนอนหลับ กิจวัตรประจำวัน และภาวะอารมณ์ รวมทั้งความปวดทุกมิติ (Total Pain: กาย ใจ สังคม จิตวิญญาณ)'
    ],
    nonPharmEn: [
      'Positioning with soft pillows, pressure-relieving air mattress.',
      'Gentle massage (effleurage/stroking), warmth (for chronic muscle spasms) or cold packs (for acute inflammation/swelling).',
      'Relaxation techniques, mindful breathing, guided imagery, distraction with soft music or Buddhist chanting / religious audio.',
      'Palliative radiotherapy for localized metastatic bone pain or tumor mass compression.'
    ],
    nonPharmTh: [
      'การจัดท่านอนที่สุขสบาย ใช้หมอนหนุน ที่นอนลมลดแรงกดทับ',
      'การนวดผ่อนคลายแบบลูบเบาๆ (Effleurage), การประคบร้อน (สำหรับกล้ามเนื้อเกร็งตัวเรื้อรัง) หรือประคบเย็น (สำหรับการอักเสบบวมเฉียบพลัน)',
      'การฝึกผ่อนคลาย กำหนดลมหายใจ ดนตรีบำบัด การฟังธรรมะหรือสวดมนต์ตามความเชื่อ',
      'การฉายรังสีรักษาแบบประคับประคอง (Palliative Radiotherapy) เพื่อลดปวดกระดูกจากการแพร่กระจายหรือก้อนมะเร็งกดทับ'
    ],
    pharmTableEn: [
      {
        drug: 'Paracetamol (Acetaminophen)',
        route: 'Oral / IV',
        dose: '500 mg (10-15 mg/kg)',
        frequency: 'Every 4-6 hours (Max 2,000-3,000 mg/day)',
        indicationOrNote: 'WHO Step 1: Mild pain. Caution in cirrhosis (max 2 g/day).'
      },
      {
        drug: 'Morphine IR (Oral)',
        route: 'Oral (tablet / syrup)',
        dose: '5 - 10 mg (elderly/frail: 2.5 - 5 mg)',
        frequency: 'Every 4 hours regular + q1-2h PRN for breakthrough',
        indicationOrNote: 'WHO Step 3: Strong opioid gold standard. Breakthrough dose = 10-15% of total 24h oral morphine.'
      },
      {
        drug: 'Morphine Injection (IV / SC)',
        route: 'IV / SC',
        dose: '2 - 5 mg (or 1/3 of oral dose)',
        frequency: 'Every 3-4 hours regular OR continuous infusion + q1h PRN',
        indicationOrNote: 'For severe acute pain or inability to swallow. Oral to IV/SC ratio is 3:1.'
      },
      {
        drug: 'Kapanol® (Morphine SR)',
        route: 'Oral capsule',
        dose: '20, 50, or 100 mg (once daily)',
        frequency: 'Every 24 hours (same time daily)',
        indicationOrNote: '24-hour pellets. Capsule CAN be opened and sprinkled on soft food or given via PEG tube 16 Fr or larger (not NG). DO NOT CHEW OR CRUSH.'
      },
      {
        drug: 'MST Continus® (Morphine CR)',
        route: 'Oral tablet',
        dose: '10, 30, or 60 mg',
        frequency: 'Every 12 hours (e.g. 08:00 and 20:00)',
        indicationOrNote: '12-hour controlled release. Swallow whole. DO NOT break, crush, or chew.'
      },
      {
        drug: 'Fentanyl Transdermal Patch',
        route: 'Transdermal patch',
        dose: '12.5, 25, 50, 75, 100 mcg/hr',
        frequency: 'Change every 72 hours (3 days)',
        indicationOrNote: 'Preferred in renal failure. Slow onset (12-24h); overlap previous opioid for 12-24h after first patch. Do not apply external heat.'
      },
      {
        drug: 'Tramadol (Weak Opioid)',
        route: 'Oral / IV',
        dose: '50 - 100 mg',
        frequency: 'Every 6-8 hours (Max 400 mg/day; elderly: 300 mg/day)',
        indicationOrNote: 'WHO Step 2: Moderate pain. Avoid in severe renal failure. Risk of seizures & serotonin syndrome.'
      },
      {
        drug: 'Gabapentin (Adjuvant)',
        route: 'Oral',
        dose: '100 - 300 mg starting at bedtime, titrate up to 900-1800 mg/day',
        frequency: 'TID (adjust for eGFR)',
        indicationOrNote: 'First-line for neuropathic pain. Renally excreted; reduce dose in renal impairment.'
      },
      {
        drug: 'Pregabalin (Adjuvant)',
        route: 'Oral',
        dose: '25 - 75 mg starting at bedtime, titrate to 150-300 mg/day',
        frequency: 'BID (adjust for eGFR)',
        indicationOrNote: 'Neuropathic pain. Faster titration than gabapentin; reduce in renal failure.'
      },
      {
        drug: 'Dexamethasone (Adjuvant)',
        route: 'Oral / IV / SC',
        dose: '4 - 16 mg once daily (morning)',
        frequency: 'Once daily in morning (with PPI)',
        indicationOrNote: 'Nerve compression, brain metastasis, spinal cord compression, capsule distension, bone metastases.'
      }
    ],
    pharmTableTh: [
      {
        drug: 'พาราเซตามอล (Paracetamol)',
        route: 'รับประทาน / ฉีด',
        dose: '500 มก. (10-15 มก./กก.)',
        frequency: 'ทุก 4-6 ชม. (สูงสุดไม่เกิน 2,000-3,000 มก./วัน)',
        indicationOrNote: 'WHO ขั้นที่ 1: ปวดน้อยถึงปานกลาง โรคตับไม่ควรเกิน 2,000 มก./วัน'
      },
      {
        drug: 'มอร์ฟีนออกฤทธิ์สั้น (MO IR เม็ด/ยาน้ำ)',
        route: 'รับประทาน',
        dose: '5 - 10 มก. (ผู้สูงอายุ/ไตเสื่อม: 2.5 - 5 มก.)',
        frequency: 'ทุก 4 ชม. สม่ำเสมอ + ทุก 1-2 ชม. เมื่อมีอาการปวดกำเริบ (PRN)',
        indicationOrNote: 'WHO ขั้นที่ 3: ยามาตรฐาน ขนาดยาปวดกำเริบ (Breakthrough) คิดเป็น 10-15% ของขนาดรวมทั้งวัน'
      },
      {
        drug: 'มอร์ฟีนฉีด (Morphine Injection)',
        route: 'IV หรือ SC',
        dose: '2 - 5 มก. (หรือ 1/3 ของขนาดยากิน)',
        frequency: 'ทุก 3-4 ชม. หรือดริปต่อเนื่อง + PRN ทุก 1 ชม.',
        indicationOrNote: 'สำหรับปวดรุนแรงเฉียบพลันหรือกลืนไม่ได้ อัตราส่วนยากินต่อยาฉีด = 3:1 (ห้ามฉีดเข้ากล้ามเนื้อ IM)'
      },
      {
        drug: 'คาพานอล Kapanol® (แคปซูล 24 ชม.)',
        route: 'รับประทาน',
        dose: '20, 50, 100 มก. วันละครั้ง',
        frequency: 'ทุก 24 ชม. (เวลาเดิมทุกวัน)',
        indicationOrNote: 'เม็ดเล็กเคลือบโพลิเมอร์ แกะแคปซูลโรยบนอาหารหรือให้ทางสายยางได้ แต่ห้ามบด ห้ามเคี้ยวเด็ดขาด'
      },
      {
        drug: 'เอ็มเอสที MST Continus® (เม็ด 12 ชม.)',
        route: 'รับประทาน',
        dose: '10, 30, 60 มก.',
        frequency: 'ทุก 12 ชม. (เช่น 08.00 น. และ 20.00 น.)',
        indicationOrNote: 'เม็ดควบคุมการปลดปล่อย ต้องกลืนทั้งเม็ด ห้ามหัก ห้ามแบ่ง ห้ามบดเคี้ยว'
      },
      {
        drug: 'เฟนตานิลแผ่นแปะ (Fentanyl Patch)',
        route: 'แผ่นแปะผิวหนัง',
        dose: '12.5, 25, 50, 75, 100 มคก./ชม.',
        frequency: 'เปลี่ยนแผ่นยาทุก 72 ชม. (3 วัน)',
        indicationOrNote: 'ยาทางเลือกอันดับแรกในผู้ป่วยไตวาย เริ่มออกฤทธิ์ช้า 12-24 ชม. ห้ามประคบร้อนบนแผ่นยา'
      },
      {
        drug: 'ทรามาดอล (Tramadol)',
        route: 'รับประทาน / ฉีด',
        dose: '50 - 100 มก.',
        frequency: 'ทุก 6-8 ชม. (สูงสุด 400 มก./วัน, ผู้สูงอายุ 300 มก./วัน)',
        indicationOrNote: 'WHO ขั้นที่ 2: ปวดปานกลาง ระวังชักและ Serotonin syndrome ห้ามใช้ในไตวายรุนแรง'
      },
      {
        drug: 'กาบาเพนติน (Gabapentin)',
        route: 'รับประทาน',
        dose: 'เริ่ม 100-300 มก. ก่อนนอน ปรับเพิ่มได้ถึง 900-1800 มก./วัน',
        frequency: 'วันละ 3 ครั้ง (ปรับลดตาม eGFR)',
        indicationOrNote: 'ยาเสริมอันดับแรกสำหรับปวดเส้นประสาท (Neuropathic pain) ต้องปรับขนาดยาตามค่าไต'
      },
      {
        drug: 'พรีกาบาลิน (Pregabalin)',
        route: 'รับประทาน',
        dose: 'เริ่ม 25-75 มก. ก่อนนอน ปรับเป็น 75-150 มก. วันละ 2 ครั้ง',
        frequency: 'วันละ 2 ครั้ง (ปรับลดตาม eGFR)',
        indicationOrNote: 'ปวดเส้นประสาท ออกฤทธิ์เร็ว ปรับขนาดยาง่ายกว่า ต้องลดขนาดยาในผู้ป่วยไตเสื่อม'
      },
      {
        drug: 'เดกซาเมทาโซน (Dexamethasone)',
        route: 'รับประทาน / IV / SC',
        dose: '4 - 16 มก. วันละ 1 ครั้งตอนเช้า',
        frequency: 'วันละ 1 ครั้งตอนเช้า (ให้ยาลดกรด PPI ร่วมด้วย)',
        indicationOrNote: 'ลดบวมก้อนมะเร็งกดเส้นประสาท, มะเร็งแพร่กระจายไปสมอง/ไขสันหลัง, แคปซูลตับยืดตึง, ลำไส้อุดกั้น'
      }
    ],
    clinicalPearlsEn: [
      'Always co-prescribe a stimulant laxative (Senna / Bisacodyl) from Day 1 of starting strong opioids. Tolerance develops to sedation and nausea, but NEVER to constipation.',
      'Titration rule: sum total oral morphine consumed in 24 hours (regular + breakthrough doses) to calculate the new daily maintenance dose.',
      'Breakthrough pain dose: typically 10% to 15% (or 1/6th) of the total 24-hour oral morphine dose, given PO q2-4h PRN or SC/IV q1-2h PRN.',
      'Never combine weak opioids (Tramadol/Codeine) with strong opioids (Morphine/Fentanyl); switch directly to Step 3 with proper dose conversion.'
    ],
    clinicalPearlsTh: [
      'ต้องสั่งจ่ายยาระบายกลุ่มกระตุ้นลำไส้ (เช่น มะขามแขก Senna หรือ Bisacodyl) ควบคู่กับยากลุ่มโอปิออยด์ตั้งแต่วันแรกเสมอ ผู้ป่วยจะชินต่ออาการง่วงและคลื่นไส้ได้ แต่ไม่มีวันชินต่ออาการท้องผูก',
      'หลักการปรับเพิ่มยามอร์ฟีน: นำขนาดยาทั้งหมดที่ผู้ป่วยได้รับใน 24 ชั่วโมง (ทั้งมื้อประจำ + มื้อเสริมแก้ปวดฉับพลัน) มารวมกันเพื่อตั้งเป็นขนาดยาควบคุมประจำวันมื้อใหม่',
      'ขนาดยาปวดกำเริบฉับพลัน (Breakthrough dose): คิดเป็น 10-15% (หรือ 1 ใน 6) ของขนาดยามอร์ฟีนรับประทานรวมทั้งวัน รับประทานซ้ำได้ทุก 2-4 ชม. (หรือฉีด SC/IV ซ้ำได้ทุก 1-2 ชม.)',
      'ห้ามใช้ Weak opioid (Tramadol/Codeine) ซ้ำซ้อนกับ Strong opioid (Morphine/Fentanyl) หากคุมปวดไม่ได้ให้ปรับข้ามบันไดขึ้นเป็นยาขั้นที่ 3 ทันที'
    ],
    contraindicationsEn: [
      'Pethidine (Meperidine): Strictly contraindicated for chronic palliative/cancer pain due to accumulation of neurotoxic metabolite normeperidine (causes tremors, myoclonus, seizures).',
      'Morphine in severe renal impairment (eGFR < 30 mL/min): active neurotoxic metabolites M3G & M6G accumulate; switch to Fentanyl.',
      'Codeine in children and ultra-rapid/slow CYP2D6 metabolizers.'
    ],
    contraindicationsTh: [
      'เพทิดีน (Pethidine): ห้ามใช้ติดต่อกันระยะยาวในการระงับปวดมะเร็งและประคับประคองเด็ดขาด เพราะสารเมแทบอไลต์ Normeperidine มีพิษต่อระบบประสาท ทำให้กล้ามเนื้อกระตุก เพ้อ และชัก',
      'มอร์ฟีนในผู้ป่วยไตวายรุนแรง (eGFR < 30 มล./นาที): สารเมแทบอไลต์ M3G และ M6G สะสม เสี่ยงกดการหายใจและโคม่า ให้เปลี่ยนเป็น Fentanyl',
      'โคเดอีน (Codeine): ห้ามใช้ในเด็ก และมีประสิทธิภาพไม่แน่นอนในกลุ่มพันธุกรรม CYP2D6'
    ]
  },
  {
    id: 'dyspnea',
    nameEn: 'Dyspnea & Terminal Secretions (Death Rattle)',
    nameTh: 'อาการหายใจลำบาก / เหนื่อยหอบ และเสมหะคั่งในระยะท้าย (Death Rattle)',
    category: 'dyspnea',
    summaryEn:
      'Dyspnea is a subjective sensation of breathlessness. Opioids are the gold standard for refractory dyspnea, reducing respiratory drive perception without causing hypercapnia when dosed appropriately. Terminal secretions ("Death Rattle") occur in the final hours/days due to lost swallowing reflexes; treat with positioning and anticholinergics, avoiding painful deep suctioning.',
    summaryTh:
      'อาการหายใจลำบาก (Dyspnea) เป็นความรู้สึกส่วนบุคคล ยามอร์ฟีนขนาดต่ำเป็นยามาตรฐานในการลดความรู้สึกเหนื่อยหอบ สำหรับเสมหะคั่งในคอหอยช่วงใกล้เสียชีวิต (Death Rattle) เกิดจากการกลืนน้ำลายไม่ได้ ให้จัดท่านอนตะแคงและใช้ยาแอนติโคลิเนอร์จิก ไม่แนะนำให้ดูดเสมหะลึกเพราะสร้างความทรมาน',
    assessmentEn: [
      'Evaluate severity using Numeric Rating Scale (0-10) or Modified Borg Scale (MBS) / mMRC.',
      'Check for reversible causes: bronchospasm, pleural effusion, pneumonia, pulmonary edema, severe anemia, pneumothorax, pericardial effusion, SVC obstruction.',
      'In active dying, distinguish distress from natural terminal respiratory patterns (Cheyne-Stokes, mandibular breathing).'
    ],
    assessmentTh: [
      'ประเมินระดับความเหนื่อยโดยใช้คะแนน 0-10 หรือ Modified Borg Scale (MBS) / mMRC',
      'ตรวจหาสาเหตุที่รักษาได้: หลอดลมหดเกร็ง, น้ำในช่องเยื่อหุ้มปอด, ปอดอักเสบติดเชื้อ, หัวใจวายน้ำท่วมปอด, ซีดรุนแรง, ลิ่มเลือดอุดกั้นปอด, หลอดเลือดดำใหญ่ถูกกดทับ (SVCS)',
      'ในระยะใกล้เสียชีวิต แยกแยะระหว่างความทุกข์ทรมานกับรูปแบบการหายใจตามธรรมชาติ (Cheyne-Stokes breathing, หายใจพะงาบ/Mandibular breathing)'
    ],
    nonPharmEn: [
      'Upright Fowler or semi-sitting position to maximize lung expansion.',
      'Cool handheld fan aimed directly at the face/cheeks (activates trigeminal V2 sensory receptors to reduce sensation of breathlessness).',
      'Calm environment, open windows, reduce room crowding, compassionate presence.',
      'Pursed-lip breathing and diaphragmatic breathing exercises.',
      'Positioning for terminal secretions: Lateral recovery position with head slightly elevated to promote gravity drainage of secretions.'
    ],
    nonPharmTh: [
      'จัดท่านอนศีรษะสูง (Fowler’s position) หรือนั่งโน้มตัวไปข้างหน้า เพื่อให้ปอดขยายตัวได้ดีที่สุด',
      'ใช้พัดลมมือถือเปิดเป่าบริเวณใบหน้าและแก้มเบาๆ (กระตุ้นเส้นประสาทสมองคู่ที่ 5 กิ่ง V2 ส่งสัญญาณลดความรู้สึกเหนื่อยไปที่สมอง)',
      'จัดสิ่งแวดล้อมให้อากาศถ่ายเทสะดวก เงียบสงบ ลดจำนวนคนรอบเตียง ไม่ส่งเสียงดัง',
      'ฝึกหายใจแบบห่อปาก (Pursed-lip breathing) และหายใจด้วยกะบังลม',
      'สำหรับเสียงเสมหะคั่ง (Death Rattle): จับผู้ป่วยนอนตะแคง ศีรษะสูงเล็กน้อย เพื่อให้น้ำลายไหลระบายออกตามแรงโน้มถ่วง'
    ],
    pharmTableEn: [
      {
        drug: 'Morphine Oral (Opioid-naive)',
        route: 'Oral (syrup / tablet)',
        dose: '2.5 - 5 mg (or 0.05-0.1 mg/kg)',
        frequency: 'Every 4 hours regular + q1-2h PRN',
        indicationOrNote: 'First-line pharmacotherapy for chronic refractory dyspnea.'
      },
      {
        drug: 'Morphine IV / SC (Opioid-naive)',
        route: 'IV / SC',
        dose: '1 - 2.5 mg',
        frequency: 'Every 3-4 hours + q1h PRN',
        indicationOrNote: 'For acute breathlessness or dying patient unable to swallow.'
      },
      {
        drug: 'Morphine (Patient already on opioids)',
        route: 'Oral / IV / SC',
        dose: 'Add 25-50% to existing daily dose, or give breakthrough dose (10-15% of 24h dose)',
        frequency: 'PRN every 1-2 hours',
        indicationOrNote: 'Increase current opioid dose to cover dyspnea.'
      },
      {
        drug: 'Midazolam (Anxiolysis)',
        route: 'SC / IV',
        dose: '2.5 - 5 mg SC (or 0.5 - 1 mg/hr continuous infusion)',
        frequency: 'PRN q1-2h for severe dyspnea crisis with panic',
        indicationOrNote: 'Relieves anxiety and panic associated with air hunger.'
      },
      {
        drug: 'Hyoscine butylbromide (Buscopan®)',
        route: 'SC / IV',
        dose: '20 mg',
        frequency: 'Every 4-6 hours PRN or regular (Max 100 mg/day)',
        indicationOrNote: 'For terminal airway secretions ("Death Rattle"). Does NOT cross blood-brain barrier (less central delirium).'
      },
      {
        drug: 'Atropine 1% Eye Drop (Sublingual)',
        route: 'Sublingual (oral drops)',
        dose: '1 - 2 drops under tongue',
        frequency: 'Every 4 hours PRN',
        indicationOrNote: 'Alternative anticholinergic for secretions at home where injectable is unavailable.'
      },
      {
        drug: 'Oxygen Therapy',
        route: 'Nasal cannula',
        dose: '1 - 3 L/min',
        frequency: 'Continuous / PRN',
        indicationOrNote: 'ONLY indicated if patient is HYPOXEMIC (SpO2 < 90-92%). In non-hypoxemic dyspnea, medical air/fan is as effective as O2.'
      }
    ],
    pharmTableTh: [
      {
        drug: 'มอร์ฟีนรับประทาน (ในผู้ที่ไม่เคยได้มาก่อน)',
        route: 'รับประทาน (ยาน้ำ/ยาเม็ด)',
        dose: '2.5 - 5 มก.',
        frequency: 'ทุก 4 ชม. สม่ำเสมอ + ทุก 1-2 ชม. เมื่อเหนื่อยกำเริบ',
        indicationOrNote: 'ยามาตรฐานอันดับแรกสำหรับลดอาการหายใจลำบากที่รักษาโรคเดิมเต็มที่แล้ว'
      },
      {
        drug: 'มอร์ฟีนฉีด (ในผู้ที่ไม่เคยได้มาก่อน)',
        route: 'IV หรือ SC',
        dose: '1 - 2.5 มก.',
        frequency: 'ทุก 3-4 ชม. หรือ PRN ทุก 1 ชม.',
        indicationOrNote: 'สำหรับอาการเหนื่อยเฉียบพลัน หรือผู้ป่วยใกล้เสียชีวิตที่กลืนไม่ได้'
      },
      {
        drug: 'มอร์ฟีน (ในผู้ที่ได้รับมอร์ฟีนอยู่เดิม)',
        route: 'รับประทาน / ฉีด',
        dose: 'เพิ่มขนาดยา 25-50% จากเดิม หรือให้มื้อเสริม 10-15% ของขนาด 24 ชม.',
        frequency: 'PRN ทุก 1-2 ชม.',
        indicationOrNote: 'ปรับเพิ่มยาเดิมเพื่อคุมอาการเหนื่อยหอบ'
      },
      {
        drug: 'มิดาโซแลม (Midazolam)',
        route: 'SC หรือ IV',
        dose: '2.5 - 5 มก. SC (หรือดริป 0.5 - 1 มก./ชม.)',
        frequency: 'PRN ทุก 1-2 ชม. สำหรับภาวะเหนื่อยวิกฤติร่วมกับตื่นตระหนก',
        indicationOrNote: 'ลดความวิตกกังวล ตื่นตระหนก และความกลัวจากการขาดอากาศหายใจ'
      },
      {
        drug: 'ไฮออสซีน บิวทิลโบรไมด์ (Hyoscine butylbromide / Buscopan®)',
        route: 'SC หรือ IV',
        dose: '20 มก.',
        frequency: 'ทุก 4-6 ชม. PRN หรือฉีดประจำ (สูงสุด 100 มก./วัน)',
        indicationOrNote: 'ยาลดเสมหะคั่งในคอหอย (Death Rattle) ไม่ผ่านเข้าสมอง จึงไม่ทำให้สับสนเพ้อ'
      },
      {
        drug: 'ยาหยอดตา Atropine 1% (หยดใต้ลิ้น)',
        route: 'หยดใต้ลิ้น (Sublingual)',
        dose: '1 - 2 หยด ใต้ลิ้น',
        frequency: 'ทุก 4 ชม. PRN',
        indicationOrNote: 'ยาทางเลือกสำหรับลดเสมหะคั่งกรณีดูแลที่บ้านและไม่มียาฉีด'
      },
      {
        drug: 'การให้ออกซิเจน',
        route: 'Nasal cannula',
        dose: '1 - 3 ลิตร/นาที',
        frequency: 'ต่อเนื่อง / เมื่อมีอาการ',
        indicationOrNote: 'มีประโยชน์เฉพาะเมื่อมีภาวะออกซิเจนในเลือดต่ำ (SpO2 < 90-92%) หากออกซิเจนปกติ พัดลมเป่าหน้ามีประสิทธิภาพเท่ากับออกซิเจน'
      }
    ],
    clinicalPearlsEn: [
      'DO NOT PERFORM DEEP SUCTIONING for death rattle in the dying phase: it causes gagging, mucosal bleeding, laryngospasm, severe distress, and stimulates rebound secretions.',
      'Anticholinergic drugs reduce NEW secretion formation; they do not dry up existing pooled secretions. Start early when secretions are first heard.',
      'Reassure family that "Death Rattle" is audible to listeners because of relaxed pharyngeal muscles, but is NOT choking or painful for the semi-conscious patient.',
      'Over-hydration with IV saline worsens pulmonary edema, ascites, and airway secretions. Restrict or stop IV fluids in the final 48 hours.'
    ],
    clinicalPearlsTh: [
      'ห้ามดูดเสมหะลึก (Deep suctioning) ในผู้ป่วยระยะใกล้เสียชีวิตเด็ดขาด: เพราะทำให้สำลัก เจ็บปวด เลือดออกในเยื่อบุ หลอดลมหดเกร็ง และกระตุ้นให้ร่างกายหลั่งเสมหะเพิ่มขึ้น',
      'ยาแอนติโคลิเนอร์จิก (Buscopan) ออกฤทธิ์ยับยั้งการสร้างเสมหะใหม่ แต่ไม่สามารถดูดซึมเสมหะเดิมที่คั่งอยู่แล้วได้ จึงควรให้ยาตั้งแต่เริ่มได้ยินเสียงเสมหะแรกๆ',
      'อธิบายให้ครอบครัวเข้าใจว่า เสียงเสมหะครืดคราดเกิดขึ้นจากกล้ามเนื้อคอหอยที่คลายตัวตามธรรมชาติ ผู้ป่วยที่กึ่งรู้สติไม่ได้รู้สึกเจ็บปวดหรือสำลักทรมาน',
      'การให้น้ำเกลือ IV เกินความจำเป็นจะทำให้น้ำท่วมปอด ท้องมาน และเสมหะคั่งรุนแรงขึ้น ควรงดหรือลดการให้น้ำเกลือในระยะ 48 ชั่วโมงสุดท้าย'
    ],
    contraindicationsEn: [
      'High-flow oxygen in non-hypoxemic patients (dries mucosa and offers no benefit over gentle fan).',
      'Deep suctioning through vocal cords.'
    ],
    contraindicationsTh: [
      'การเปิดออกซิเจนอัตราไหลสูงในผู้ป่วยที่ออกซิเจนไม่ต่ำ (ทำให้เยื่อบุแห้งแตก และไม่ได้ผลดีกว่าการใช้พัดลม)',
      'การดูดเสมหะลึกผ่านสายเข้าหลอดลม'
    ]
  },
  {
    id: 'delirium',
    nameEn: 'Delirium & Terminal Agitation / Restlessness',
    nameTh: 'ภาวะสับสนเพ้อ (Delirium) และกระสับกระส่ายในวาระสุดท้าย (Terminal Restlessness)',
    category: 'delirium',
    summaryEn:
      'Delirium is an acute fluctuating disorder of attention and cognition. In palliative care, 52% are mixed, 19% hypoactive (often missed or misdiagnosed as depression), and 15% hyperactive. In reversible stages, identify triggers (PINCHES). In irreversible terminal delirium (last days/hours), prioritize comfort and gentle sedation with Haloperidol and Midazolam.',
    summaryTh:
      'ภาวะสับสนเพ้อเฉียบพลัน อาการขึ้นๆ ลงๆ ในหนึ่งวัน พบบ่อยมากถึง 80% ก่อนเสียชีวิต แบ่งเป็นแบบซึม (Hypoactive 19% มักวินิจฉัยผิดว่าเป็นซึมเศร้า), แบบวุ่นวาย (Hyperactive 15%) และแบบผสม (Mixed 52%) หากอยู่ในระยะที่แก้ไขได้ให้หาสาเหตุ แต่หากเป็นระยะใกล้เสียชีวิต (Terminal Restlessness) ให้เน้นความสงบด้วย Haloperidol และ Midazolam',
    assessmentEn: [
      'Check for reversible causes using mnemonic PINCHES: Pain, Infection (UTI, chest), Nutrition/hydration deficit, Constipation/fecal impaction, Hypoxia/Hypercalcemia, Electrolytes/organ failure (renal/hepatic), Sensory deficits or urinary retention.',
      'Check medication toxicity (opioids, anticholinergics, benzodiazepines, steroids).',
      'Distinguish terminal restlessness from physical discomfort (palpate bladder for urinary retention, check rectum for fecal impaction).'
    ],
    assessmentTh: [
      'ตรวจหาสาเหตุที่อาจแก้ไขได้ตามหลัก PINCHES: P (Pain ความปวด), I (Infection การติดเชื้อ), N (Nutrition/hydration ขาดน้ำ/อาหาร), C (Constipation ท้องผูกรุนแรง), H (Hypoxia ออกซิเจนต่ำ / Hypercalcemia), E (Electrolytes เกลือแร่ผิดปกติ / ไตวาย ตับวาย), S (Sensory หูตาฝ้าฟาง / ปัสสาวะคั่งกระเพาะปัสสาวะตึง)',
      'ตรวจสอบพิษจากยา (Opioid toxicity, ยากลุ่ม Anticholinergic, ยานอนหลับ, สเตียรอยด์)',
      'แยกความกระสับกระส่ายจากอาการทางกาย: คลำกระเพาะปัสสาวะว่ามีปัสสาวะคั่งหรือไม่ และตรวจทวารหนักว่ามีอุจจาระอัดแน่นหรือไม่'
    ],
    nonPharmEn: [
      'Calm, quiet, well-lit room; familiar objects, clock, and presence of trusted family members.',
      'Gentle reorientation without arguing or confronting hallucinations.',
      'Ensure eyeglasses and hearing aids are in place.',
      'PHYSICAL RESTRAINTS MUST BE THE ABSOLUTE LAST RESORT: they cause terror, worsen agitation, and violate human dignity.'
    ],
    nonPharmTh: [
      'จัดสิ่งแวดล้อมให้สงบ สว่างพอเหมาะ มีคนคุ้นเคยอยู่ใกล้ๆ มีนาฬิกาหรือปฏิทินที่มองเห็นได้',
      'บอกวัน เวลา สถานที่เบาๆ เพื่อฟื้นความจำ ไม่โต้เถียงหรือขัดแย้งกับภาพหลอนของผู้ป่วย',
      'ใส่แว่นตาและเครื่องช่วยฟังที่ผู้ป่วยเคยใช้ประจำ',
      'การผูกมัดผู้ป่วยต้องเป็นทางเลือกสุดท้ายจริงๆ เพราะการผูกมัดทำให้ผู้ป่วยหวาดกลัว ยิ่งกระสับกระส่าย และสูญเสียศักดิ์ศรีความเป็นมนุษย์'
    ],
    pharmTableEn: [
      {
        drug: 'Haloperidol (First-line Antipsychotic)',
        route: 'Oral / SC / IV',
        dose: '0.5 - 2 mg (elderly: 0.5 - 1 mg)',
        frequency: 'Every 30-60 min PRN until calm; then divide into maintenance daily dose (0.5-3 mg/day)',
        indicationOrNote: 'First-line for psychotic symptoms, hallucinations, and agitation.'
      },
      {
        drug: 'Midazolam (Terminal Agitation Crisis)',
        route: 'SC / IV',
        dose: '2.5 - 5 mg bolus (elderly/frail: 1 - 2.5 mg)',
        frequency: 'Every 20-30 min PRN; or continuous infusion 0.5-2 mg/hr',
        indicationOrNote: 'For severe uncontrollable terminal restlessness or agitation crisis in final hours/days.'
      },
      {
        drug: 'Diphenhydramine',
        route: 'Oral / IV',
        dose: '25 - 50 mg',
        frequency: 'Every 6-8 hours PRN',
        indicationOrNote: 'Treats extrapyramidal side effects / dystonia from haloperidol.'
      }
    ],
    pharmTableTh: [
      {
        drug: 'ฮาโลเพอริดอล (Haloperidol)',
        route: 'รับประทาน / SC / IV',
        dose: '0.5 - 2 มก. (ผู้สูงอายุ: 0.5 - 1 มก.)',
        frequency: 'ทุก 30-60 นาที PRN จนสงบ จากนั้นรวมขนาดยาปรับให้วันละ 1-2 ครั้ง (0.5-3 มก./วัน)',
        indicationOrNote: 'ยามาตรฐานอันดับแรกสำหรับระงับอาการหูแว่ว ประสาทหลอน หวาดระแวง และสับสนวุ่นวาย'
      },
      {
        drug: 'มิดาโซแลม (Midazolam)',
        route: 'SC หรือ IV',
        dose: '2.5 - 5 มก. ฉีด (หรือดริป 0.5 - 2 มก./ชม.)',
        frequency: 'ทุก 20-30 นาที PRN หรือหยดต่อเนื่อง',
        indicationOrNote: 'สำหรับภาวะกระสับกระส่ายรุนแรงในวาระสุดท้าย (Terminal Agitation Crisis) ที่ไม่ตอบสนองต่อ Haloperidol'
      },
      {
        drug: 'ไดเฟนไฮดรามีน (Diphenhydramine)',
        route: 'รับประทาน / IV',
        dose: '25 - 50 มก.',
        frequency: 'ทุก 6-8 ชม. PRN',
        indicationOrNote: 'รักษาอาการข้างเคียงกล้ามเนื้อเกร็งกระตุก (Extrapyramidal symptoms) จาก Haloperidol'
      }
    ],
    clinicalPearlsEn: [
      'Always rule out full bladder: urinary retention is one of the most common causes of terminal delirium. Placing a Foley catheter may resolve agitation immediately.',
      'Benzodiazepines alone can cause paradoxical excitation in the elderly; combine with or use haloperidol first unless in active terminal distress.'
    ],
    clinicalPearlsTh: [
      'ต้องตรวจกระเพาะปัสสาวะเสมอ: ภาวะปัสสาวะคั่งเป็นสาเหตุที่พบบ่อยมากของความกระสับกระส่าย การสวนระบายปัสสาวะมักทำให้อาการสงบทันที',
      'การใช้ยากลุ่ม Benzodiazepine เดี่ยวๆ ในผู้สูงอายุอาจกระตุ้นให้ยิ่งสับสนวุ่นวายมากขึ้น (Paradoxical excitement) จึงควรใช้ Haloperidol เป็นอันดับแรก'
    ],
    contraindicationsEn: [
      'Avoid high-dose benzodiazepines without antipsychotic in non-terminal elderly delirium.',
      'Avoid physical restraints.'
    ],
    contraindicationsTh: [
      'หลีกเลี่ยงการให้ยานอนหลับขนาดสูงเดี่ยวๆ ในผู้สูงอายุที่ยังไม่เข้าสู่ระยะสุดท้าย',
      'หลีกเลี่ยงการผูกมัดร่างกาย'
    ]
  },
  {
    id: 'nausea',
    nameEn: 'Nausea and Vomiting',
    nameTh: 'อาการคลื่นไส้และอาเจียน',
    category: 'nausea',
    summaryEn:
      'Palliative antiemetic therapy must be etiology-directed: gastric stasis (Metoclopramide), chemical/chemoreceptor trigger zone (Haloperidol), vestibular (Dimenhydrinate), raised intracranial pressure / bowel obstruction (Dexamethasone), or visceral serotonin release (Ondansetron).',
    summaryTh:
      'การรักษาอาการคลื่นไส้อาเจียนต้องเลือกยาตามสาเหตุและกลไก: กระเพาะอาหารบีบตัวช้า (Metoclopramide), สารเคมี/ยา/ของเสียในเลือดกระตุ้น CTZ (Haloperidol), ระบบการทรงตัว/เวียนศีรษะ (Dimenhydrinate), ความดันในสมองสูง/ลำไส้อุดกั้น (Dexamethasone), หรือสารเซโรโทนินจากเคมีบำบัด (Ondansetron)',
    assessmentEn: [
      'Assess onset, frequency, volume, vomitus appearance (feculent = bowel obstruction; coffee-ground = GI bleeding; bilious).',
      'Identify etiology: Opioids, chemotherapy, hypercalcemia, uremia, constipation, gastric stasis, raised ICP, inner ear/motion, or malignant bowel obstruction.'
    ],
    assessmentTh: [
      'ประเมินลักษณะการอาเจียน ปริมาณ สี (สีกากอุจจาระ = ลำไส้อุดกั้น, สีกาแฟดำ = เลือดออกในกระเพาะ, มีน้ำดีปน)',
      'หาสาเหตุ: ยาโอปิออยด์, เคมีบำบัด, แคลเซียมสูง, ไตวายยูรีเมียสูง, ท้องผูก, กระเพาะบีบตัวช้า, ความดันในสมองสูง, หรือลำไส้อุดกั้น'
    ],
    nonPharmEn: [
      'Small, frequent, bland meals at room temperature (avoid strong food aromas cooking near patient).',
      'Sip ginger tea, fresh lime water, or suck on ice chips.',
      'Good oral hygiene / mouth swabs after vomiting to eliminate foul taste.'
    ],
    nonPharmTh: [
      'จัดอาหารมื้อเล็กๆ ย่อยง่าย รับประทานทีละน้อย ไม่ปรุงอาหารที่มีกลิ่นฉุนใกล้ตัวผู้ป่วย',
      'จิบน้้ำขิง น้ำมะนาว หรืออมก้อนน้ำแข็งก้อนเล็กๆ',
      'ทำความสะอาดช่องปาก บ้วนปากด้วยน้ำสะอาดทุกครั้งหลังอาเจียน'
    ],
    pharmTableEn: [
      {
        drug: 'Metoclopramide (Prokinetic)',
        route: 'Oral / IV / SC',
        dose: '10 mg',
        frequency: 'TID before meals (or continuous SC infusion 30-60 mg/24h)',
        indicationOrNote: 'Gastric stasis, opioid-induced gastroparesis. CONTRAINDICATED in complete mechanical bowel obstruction.'
      },
      {
        drug: 'Haloperidol (CTZ Antagonist)',
        route: 'Oral / SC',
        dose: '0.5 - 1.5 mg',
        frequency: 'Once or twice daily (or bedtime)',
        indicationOrNote: 'First-line for opioid-induced, metabolic (uremia, hypercalcemia), or drug-induced nausea.'
      },
      {
        drug: 'Ondansetron (5HT3 Antagonist)',
        route: 'Oral / IV',
        dose: '4 - 8 mg',
        frequency: 'BID or TID',
        indicationOrNote: 'Post-chemotherapy, post-radiation, or visceral peritoneal irritation. Causes constipation.'
      },
      {
        drug: 'Dimenhydrinate (Antihistamine)',
        route: 'Oral / IV',
        dose: '50 mg',
        frequency: 'Every 6-8 hours PRN',
        indicationOrNote: 'Vestibular nausea, motion sickness, base-of-skull tumor metastases.'
      },
      {
        drug: 'Dexamethasone (Corticosteroid)',
        route: 'Oral / IV / SC',
        dose: '4 - 8 mg',
        frequency: 'Once daily in morning',
        indicationOrNote: 'Raised intracranial pressure (brain metastases), malignant bowel obstruction.'
      }
    ],
    pharmTableTh: [
      {
        drug: 'เมโทโคลพราไมด์ (Metoclopramide)',
        route: 'รับประทาน / IV / SC',
        dose: '10 มก.',
        frequency: 'วันละ 3 ครั้ง ก่อนอาหาร (หรือดริป SC 30-60 มก./วัน)',
        indicationOrNote: 'กระเพาะอาหารบีบตัวช้า อาหารไม่ย่อย คลื่นไส้จากมอร์ฟีน ห้ามใช้เด็ดขาดถ้าลำไส้อุดกั้นสมบูรณ์'
      },
      {
        drug: 'ฮาโลเพอริดอล (Haloperidol)',
        route: 'รับประทาน / SC',
        dose: '0.5 - 1.5 มก.',
        frequency: 'วันละ 1-2 ครั้ง หรือก่อนนอน',
        indicationOrNote: 'ยาอันดับแรกสำหรับคลื่นไส้จากมอร์ฟีน, ยูรีเมียจากไตวาย, หรือแคลเซียมในเลือดสูง'
      },
      {
        drug: 'ออนดันเซตรอน (Ondansetron)',
        route: 'รับประทาน / IV',
        dose: '4 - 8 มก.',
        frequency: 'วันละ 2-3 ครั้ง',
        indicationOrNote: 'คลื่นไส้จากยาเคมีบำบัด การฉายรังสี หรือเยื่อบุช่องท้องระคายเคือง (ระวังผลข้างเคียงท้องผูก)'
      },
      {
        drug: 'ไดเมนไฮดริเนต (Dimenhydrinate)',
        route: 'รับประทาน / IV',
        dose: '50 มก.',
        frequency: 'ทุก 6-8 ชม. PRN',
        indicationOrNote: 'คลื่นไส้จากระบบการทรงตัว เวียนศีรษะ มะเร็งลุกลามฐานกะโหลกศีรษะ'
      },
      {
        drug: 'เดกซาเมทาโซน (Dexamethasone)',
        route: 'รับประทาน / IV / SC',
        dose: '4 - 8 มก.',
        frequency: 'วันละ 1 ครั้งตอนเช้า',
        indicationOrNote: 'คลื่นไส้จากมะเร็งแพร่กระจายไปสมอง (ความดันในสมองสูง) หรือมะเร็งอุดกั้นทางเดินอาหาร'
      }
    ],
    clinicalPearlsEn: [
      'Metoclopramide is strictly CONTRAINDICATED in mechanical bowel obstruction (colicky abdominal pain with no flatus/bowel movement): prokinetics can cause bowel rupture.',
      'Tolerance to opioid-induced nausea develops within 5 to 7 days; prophylactic antiemetics can often be tapered off after 1-2 weeks.'
    ],
    clinicalPearlsTh: [
      'ห้ามใช้ Metoclopramide ในผู้ป่วยที่มีภาวะลำไส้อุดกั้นเชิงกลเด็ดขาด เพราะการกระตุ้นให้ลำไส้บีบตัวสู้กับส่วนที่ตีบตันอาจทำให้ลำไส้แตกทะลุได้',
      'อาการคลื่นไส้จากมอร์ฟีนส่วนใหญ่จะปรับตัวได้ภายใน 5-7 วันหลังจากเริ่มยา สามารถพิจารณาลดหรือหยุดยาแก้อาเจียนได้หลังผ่านไป 1-2 สัปดาห์'
    ],
    contraindicationsEn: ['Metoclopramide in complete mechanical bowel obstruction.'],
    contraindicationsTh: ['ห้ามใช้ Metoclopramide เมื่อลำไส้อุดกั้นสมบูรณ์']
  },
  {
    id: 'constipation',
    nameEn: 'Constipation & Bowel Management',
    nameTh: 'อาการท้องผูกและการจัดการระบบขับถ่าย',
    category: 'constipation',
    summaryEn:
      'Opioid-induced constipation (OIC) affects over 80% of palliative patients. Opioids reduce gut peristalsis, decrease mucosal secretions, and increase anal sphincter tone. Prophylactic stimulant laxatives (Senna or Bisacodyl) are mandatory alongside strong opioids. Bulk-forming fibers (Psyllium) are contraindicated in debilitated/bedbound patients.',
    summaryTh:
      'อาการท้องผูกจากยาโอปิออยด์พบได้มากกว่า 80% เนื่องจากมอร์ฟีนทำให้ลำไส้บีบตัวช้าลงและลดสารคัดหลั่ง ต้องสั่งจ่ายยาระบายกลุ่มกระตุ้นลำไส้ (Stimulant laxatives เช่น มะขามแขก หรือ Bisacodyl) ควบคู่กับโอปิออยด์ตั้งแต่วันแรกเสมอ ห้ามใช้ยาระบายเพิ่มกากใย (Bulk-forming) ในผู้ป่วยติดเตียงเพราะจะทำให้อุจจาระอุดตันลำไส้',
    assessmentEn: [
      'Check date of last bowel movement, stool consistency (Bristol Stool Scale), abdominal distension, bowel sounds.',
      'Perform digital rectal examination (DRE) if severe constipation or impaction suspected, unless neutropenic or thrombocytopenic.',
      'Rule out bowel obstruction (colicky pain, vomiting, no flatus).'
    ],
    assessmentTh: [
      'สอบถามวันที่ถ่ายอุจจาระครั้งล่าสุด ลักษณะอุจจาระ (Bristol Stool Scale) ตรวจท้องว่าบวมตึงหรือมีเสียงลำไส้หรือไม่',
      'ตรวจทวารหนัก (Digital Rectal Exam) เมื่อสงสัยอุจจาระอัดแน่น (Fecal impaction) ยกเว้นในผู้ที่มีเกล็ดเลือดต่ำหรือเม็ดเลือดขาวต่ำ',
      'แยกภาวะลำไส้อุดกั้น (Malignant Bowel Obstruction: ปวดบิดเกร็ง อาเจียน ไม่ผายลม)'
    ],
    nonPharmEn: [
      'Adequate fluid intake (warm prune juice, kiwi, water) if not in the active dying phase.',
      'Optimal toilet positioning: elevate knees higher than hips with a footstool, lean forward.',
      'Gentle abdominal massage following the colon pathway clockwise.',
      'Avoid withholding the urge to defecate; privacy and unhurried access to commode.'
    ],
    nonPharmTh: [
      'ดื่มน้ำอุ่น น้ำลูกพรุน หรือผลไม้ระบาย หากยังไม่ได้เข้าสู่ระยะใกล้เสียชีวิต',
      'จัดท่านั่งถ่ายให้เข่าอยู่สูงกว่าสะโพก โดยใช้เก้าอี้เตี้ยรองเท้าและโน้มตัวมาข้างหน้า',
      'นวดหน้าท้องเบาๆ ตามแนวการเคลื่อนตัวของลำไส้ใหญ่ตามเข็มนาฬิกา',
      'ไม่กลั้นอุจจาระ จัดสิ่งแวดล้อมให้เป็นส่วนตัว ไม่เร่งรัด'
    ],
    pharmTableEn: [
      {
        drug: 'Senna (Senokot® - Stimulant)',
        route: 'Oral tablet',
        dose: '2 - 4 tablets (15 - 30 mg sennosides)',
        frequency: 'At bedtime (up to BID)',
        indicationOrNote: 'First-line for opioid-induced constipation. Directly stimulates myenteric plexus.'
      },
      {
        drug: 'Bisacodyl (Dulcolax®)',
        route: 'Oral / Suppository',
        dose: '5 - 15 mg PO / 10 mg PR',
        frequency: 'PO at bedtime; PR in morning for rectal evacuation',
        indicationOrNote: 'Stimulant laxative. Suppository acts within 15-60 min.'
      },
      {
        drug: 'Polyethylene Glycol (PEG 4000)',
        route: 'Oral powder',
        dose: '1 sachet (10-17 g in water)',
        frequency: 'Once or twice daily',
        indicationOrNote: 'Osmotic laxative. Preferred over lactulose: less bloating, gas, and cramps.'
      },
      {
        drug: 'Lactulose',
        route: 'Oral syrup',
        dose: '15 - 30 mL',
        frequency: 'Daily or BID',
        indicationOrNote: 'Osmotic laxative. Useful in hepatic encephalopathy; can cause gas and sweet taste aversion.'
      },
      {
        drug: 'Sodium Phosphate Enema (Fleet®)',
        route: 'Rectal enema',
        dose: '1 bottle (133 mL)',
        frequency: 'PRN for lower rectal impaction',
        indicationOrNote: 'Use with caution in renal or cardiac failure due to electrolyte shifts.'
      }
    ],
    pharmTableTh: [
      {
        drug: 'มะขามแขก (Senna / Senokot®)',
        route: 'รับประทาน',
        dose: '2 - 4 เม็ด',
        frequency: 'ก่อนนอน (ปรับเพิ่มเป็น เช้า-ก่อนนอน ได้)',
        indicationOrNote: 'ยาอันดับแรกสำหรับท้องผูกจากมอร์ฟีน กระตุ้นประสาทลำไส้ให้บีบตัว'
      },
      {
        drug: 'บิซาโคดิล (Bisacodyl / Dulcolax®)',
        route: 'รับประทาน / เหน็บทวาร',
        dose: 'กิน 5-15 มก. ก่อนนอน / เหน็บ 10 มก.',
        frequency: 'กินก่อนนอน หรือเหน็บทวารตอนเช้า',
        indicationOrNote: 'กระตุ้นลำไส้ ยาเหน็บออกฤทธิ์เร็วใน 15-60 นาที เหมาะเมื่ออุจจาระค้างที่ไส้ตรง'
      },
      {
        drug: 'โพลีเอทิลีนไกลคอล (PEG 4000 / Forlax®)',
        route: 'รับประทาน (ชงน้ำ)',
        dose: '1 ซอง ละลายน้ำ',
        frequency: 'วันละ 1-2 ครั้ง',
        indicationOrNote: 'ยาระบายออสโมซิส ดูดน้ำเข้าลำไส้ ดีกว่า Lactulose เพราะไม่ทำให้ท้องอืด แน่นท้อง'
      },
      {
        drug: 'แลคตูโลส (Lactulose)',
        route: 'รับประทาน (ยาน้ำเชื่อม)',
        dose: '15 - 30 มล.',
        frequency: 'วันละ 1-2 ครั้ง',
        indicationOrNote: 'ยาระบายออสโมซิส มีประโยชน์ในผู้ป่วยตับแข็ง (ลดแอมโมเนีย) แต่อาจทำให้มีแก๊สในท้อง'
      },
      {
        drug: 'ยาสวนทวารสำเร็จรูป (Fleet Enema®)',
        route: 'สวนทวารหนัก',
        dose: '1 ขวด (133 มล.)',
        frequency: 'เมื่อมีอุจจาระอัดแน่นบริเวณทวารหนัก',
        indicationOrNote: 'ใช้เฉพาะคราว ระมัดระวังในผู้ป่วยโรคไตหรือโรคหัวใจ'
      }
    ],
    clinicalPearlsEn: [
      'Bulk-forming laxatives (Metamucil, Psyllium) are CONTRAINDICATED in palliative care patients with poor mobility or limited fluid intake: they absorb water, solidify, and cause mechanical fecal impaction and bowel obstruction.',
      'Aim for a soft bowel motion every 2 to 3 days.'
    ],
    clinicalPearlsTh: [
      'ข้อห้ามเด็ดขาด: ห้ามใช้ยาระบายกลุ่มเพิ่มกากใย (Bulk-forming เช่น Psyllium, Metamucil) ในผู้ป่วยระยะท้ายที่นอนติดเตียงหรือดื่มน้ำได้น้อย เพราะไฟเบอร์จะดูดน้ำจนแข็ง กลายเป็นก้อนอุดตันลำไส้',
      'เป้าหมายการขับถ่าย: ถ่ายอุจจาระนุ่มสบาย อย่างน้อยทุก 2-3 วัน'
    ],
    contraindicationsEn: ['Bulk-forming laxatives (Psyllium, Ispaghula) in bedbound patients.'],
    contraindicationsTh: ['ห้ามใช้ยาระบายเพิ่มกากใย (Psyllium) ในผู้ป่วยติดเตียง']
  }
];
