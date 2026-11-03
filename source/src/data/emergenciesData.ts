import { PalliativeEmergency } from '../types';

export const PALLIATIVE_EMERGENCIES: PalliativeEmergency[] = [
  {
    id: 'mscc',
    nameEn: 'Malignant Spinal Cord Compression (MSCC)',
    nameTh: 'มะเร็งกดทับไขสันหลังเฉียบพลัน (MSCC)',
    urgencyEn: 'Surgical & Radiotherapy Emergency (< 24 hours to prevent permanent paralysis)',
    urgencyTh: 'ภาวะฉุกเฉินทางศัลยกรรมและรังสีรักษา (ต้องเริ่มรักษาภายใน 24 ชม. ก่อนอัมพาตถาวร)',
    clinicalPresentationEn: [
      'Back or neck pain: worsening, progressive, localized, aggravated by straining/coughing/lying down (often precedes neuro deficits by weeks).',
      'Motor weakness: bilateral lower extremity heaviness, difficulty climbing stairs or gait ataxia.',
      'Sensory deficits: numbness or paresthesia with a distinct sensory level (e.g., T4 nipple, T10 umbilicus).',
      'Autonomic dysfunction (LATE SIGN): urinary retention, overflow incontinence, loss of anal sphincter tone (saddle anesthesia).'
    ],
    clinicalPresentationTh: [
      'ปวดหลังหรือปวดต้นคอรุนแรงขึ้นเรื่อยๆ ปวดมากขึ้นเมื่อไอ จาม เบ่ง หรือเวลานอนราบ (มักเกิดขึ้นหลายสัปดาห์ก่อนมีอาการทางประสาท)',
      'กล้ามเนื้อขาอ่อนแรงทั้งสองข้าง เดินเซ ขึ้นบันไดลำบาก หรือทรงตัวไม่อยู่',
      'ชาหรือสูญเสียความรู้สึกแบบมีระดับชัดเจน (Sensory level เช่น ระดับราวนม T4 หรือสะดือ T10)',
      'ความผิดปกติของระบบประสาทอัตโนมัติ (อาการระยะท้าย): ปัสสาวะไม่ออก กระเพาะปัสสาวะคั่ง ปัสสาวะราด อุจจาระเล็ด ชาบริเวณอานม้า (Saddle anesthesia)'
    ],
    immediateManagementEn: [
      'Immobilize spine immediately if cervical/thoracic instability suspected.',
      'Urgent whole-spine MRI (not just localized level, as up to 30% have multiple non-contiguous sites).',
      'Immediately start high-dose Dexamethasone with gastric protection (PPI).',
      'Urgent consult to Spine Orthopedic Surgeon / Neurosurgeon and Radiation Oncologist within hours.',
      'Place Foley catheter if urinary retention present.'
    ],
    immediateManagementTh: [
      'จำกัดการเคลื่อนไหวของกระดูกสันหลัง หากสงสัยกระดูกสันหลังไม่มั่นคง',
      'ส่งตรวจ MRI กระดูกสันหลังทั้งระบบ (Whole Spine MRI) อย่างเร่งด่วน (เนื่องจาก 30% มีรอยโรคหลายตำแหน่งพร้อมกัน)',
      'เริ่มให้ยา Dexamethasone ขนาดสูงทางหลอดเลือดดำทันที ร่วมกับยาลดกรดกระเพาะอาหาร (PPI)',
      'ปรึกษาศัลยแพทย์กระดูกและข้อ/ศัลยแพทย์ระบบประสาท และแพทย์รังสีรักษาอย่างเร่งด่วน',
      'ใส่สายสวนปัสสาวะ (Foley catheter) หากมีปัสสาวะคั่ง'
    ],
    medicationsEn: [
      'Dexamethasone 16 mg IV stat, followed by 8 mg IV BID (or 16 mg PO daily in morning).',
      'Omeprazole 20-40 mg IV/PO daily for mucosal cytoprotection.',
      'Adequate opioid analgesia for severe vertebral bone pain.'
    ],
    medicationsTh: [
      'Dexamethasone 16 มก. ฉีดเข้าหลอดเลือดดำทันที (Stat) ตามด้วย 8 มก. ฉีดวันละ 2 ครั้ง (หรือกิน 16 มก. เช้า)',
      'Omeprazole 20-40 มก. IV/PO วันละครั้ง เพื่อป้องกันแผลในกระเพาะอาหาร',
      'ให้ยาแก้ปวดกลุ่มโอปิออยด์อย่างเพียงพอเพื่อควบคุมอาการปวดกระดูกรุนแรง'
    ],
    cautionsEn: [
      'Do not delay dexamethasone while waiting for imaging or specialist consultation.',
      'Neurological outcome directly correlates with functional status at the time of treatment: patients walking before treatment usually retain walking; paralyzed patients rarely recover if treatment is delayed > 24-48 hours.'
    ],
    cautionsTh: [
      'ห้ามชะลอการให้ Dexamethasone เพื่อรอผลตรวจทางรังสีหรือรอแพทย์เฉพาะทาง',
      'โอกาสฟื้นตัวของระบบประสาทขึ้นกับความเร็วในการรักษา: ผู้ป่วยที่ยังเดินได้เมื่อเริ่มรักษามักจะกลับมาเดินได้ ส่วนผู้ป่วยที่เป็นอัมพาตเกิน 24-48 ชม. โอกาสฟื้นตัวน้อยมาก'
    ]
  },
  {
    id: 'opioid_toxicity',
    nameEn: 'Opioid Toxicity & Overdose Protocol',
    nameTh: 'ภาวะพิษจากโอปิออยด์และการใช้ยาแก้พิษ Naloxone',
    urgencyEn: 'Immediate Bedside Emergency (Risk of fatal respiratory arrest or severe withdrawal crisis)',
    urgencyTh: 'ภาวะฉุกเฉินข้างเตียงทันที (ระวังภาวะหยุดหายใจ หรือการถอนยาจนปวดทรมานรุนแรง)',
    clinicalPresentationEn: [
      'Respiratory depression: Respiratory rate < 8-10 breaths/min, shallow breathing, cyanosis.',
      'Pinpoint constricted pupils (miosis).',
      'Profound unresponsiveness / coma (Sedation Score 3: difficult or unable to wake).',
      'Opioid-induced neurotoxicity (OIN): multifocal myoclonus (twitching), cognitive failure, visual hallucinations, allodynia / hyperalgesia (paradoxical worsening of pain with increasing opioid dose).'
    ],
    clinicalPresentationTh: [
      'กดการหายใจ: อัตราการหายใจช้ากว่า 8-10 ครั้ง/นาที หายใจตื้น เขียวคล้ำ',
      'รูม่านตาหดเล็กเป็นจุด (Pinpoint pupils)',
      'หมดสติ ง่วงซึมลึกมาก ปลุกไม่ตื่น (Sedation score 3)',
      'พิษต่อระบบประสาท (Opioid-Induced Neurotoxicity: OIN): กล้ามเนื้อกระตุก (Myoclonus), ประสาทหลอน, สับสนเพ้อ, หรือปวดไวต่อสัมผัสผิดปกติ (Allodynia ปวดมากขึ้นเมื่อเพิ่มขนาดมอร์ฟีน)'
    ],
    immediateManagementEn: [
      'Stimulate patient and apply oxygen via bag-valve-mask or nasal cannula.',
      'DO NOT GIVE FULL BOLUS OF UNDILUTED NALOXONE (0.4 mg IV ampoule) in palliative patients! This precipitates acute severe opioid withdrawal, catastrophic severe pain crisis, and massive sympathetic discharge causing pulmonary edema/cardiac arrest.',
      'TITRATED NALOXONE PROTOCOL: Dilute 1 ampoule (0.4 mg / 1 mL) with 9 mL sterile normal saline to make 10 mL solution (concentration = 0.04 mg/mL or 40 mcg/mL).',
      'Administer 1 to 2 mL (0.04 - 0.08 mg) IV every 2 to 3 minutes until respiratory rate > 10-12/min and airway is protected.',
      'TARGET ENDPOINT: Adequate spontaneous respiration and airway protection, NOT FULL CONSCIOUS ALERTNESS.',
      'Naloxone duration is short (30-60 min); monitor patient closely as opioid action outlasts naloxone and resedation may occur.'
    ],
    immediateManagementTh: [
      'กระตุ้นผู้ป่วยและช่วยการหายใจด้วยออกซิเจน',
      'คำเตือนสำคัญ: ห้ามฉีด Naloxone 1 แอมพูล (0.4 มก.) เข้าเส้นเลือดแบบรวดเดียวในผู้ป่วยมะเร็ง/ประคับประคอง! เพราะจะลบล้างฤทธิ์แก้ปวดทันที ทำให้เกิดวิกฤตความปวดทรมานขั้นรุนแรง ความดันพุ่งสูง น้ำท่วมปอดเฉียบพลัน และหัวใจหยุดเต้น',
      'สูตรผสมเจือจาง (Titrated Naloxone): ดูด Naloxone 1 แอมพูล (0.4 มก./1 มล.) ผสมกับ NSS 9 มล. รวมเป็น 10 มล. (ความเข้มข้น 0.04 มก./มล. หรือ 40 มคก./มล.)',
      'ฉีดเข้าหลอดเลือดดำช้าๆ ครั้งละ 1 - 2 มล. (0.04 - 0.08 มก.) ทุกๆ 2 - 3 นาที จนกระทั่งอัตราการหายใจกลับมามากกว่า 10-12 ครั้ง/นาที',
      'เป้าหมายการรักษา: ให้ผู้ป่วยหายใจได้เองอย่างปลอดภัย ไม่ใช่ปลุกให้ตื่นแจ่มใส',
      'ฤทธิ์ของ Naloxone สั้นมาก (30-60 นาที) ต้องเฝ้าระวังซ้ำ เพราะโอปิออยด์ออกฤทธิ์นานกว่า อาจกลับมาง่วงซึมหยุดหายใจซ้ำได้'
    ],
    medicationsEn: [
      'Naloxone 0.4 mg / 1 mL ampoule diluted to 10 mL with NSS (0.04 mg/mL). Give 1-2 mL q2-3min IV.',
      'Oxygen via face mask / nasal cannula.',
      'If continuous infusion needed: start at 2/3 of the initial reversal dose per hour.'
    ],
    medicationsTh: [
      'Naloxone 0.4 มก./1 มล. เจือจางด้วย NSS ให้ได้ 10 มล. ฉีด 1-2 มล. ทุก 2-3 นาที ทางหลอดเลือดดำ',
      'ให้ออกซิเจนช่วยการหายใจ',
      'หากต้องดริปต่อเนื่อง: ให้ในอัตรา 2 ใน 3 ของขนาดยาที่ทำให้ผู้ป่วยเริ่มหายใจได้ ต่อชั่วโมง'
    ],
    cautionsEn: [
      'If patient is in end-stage dying with Cheyne-Stokes breathing and no acute opioid escalation, do not reflexively give naloxone: Cheyne-Stokes is natural dying physiology, not overdose.',
      'Rotate opioid to Fentanyl or Methadone if patient had severe neurotoxicity (myoclonus) from accumulated metabolites.'
    ],
    cautionsTh: [
      'หากผู้ป่วยอยู่ในระยะใกล้เสียชีวิตตามธรรมชาติ และมีการหายใจแบบ Cheyne-Stokes โดยไม่ได้เพิ่งปรับเพิ่มมอร์ฟีน ห้ามฉีด Naloxone เพราะเป็นการเปลี่ยนแปลงตามธรรมชาติ ไม่ใช่พิษจากยา',
      'หากเกิดภาวะพิษต่อระบบประสาท (Myoclonus) จากสารเมแทบอไลต์สะสมในไต ให้หมุนเวียนเปลี่ยนยา (Opioid rotation) เป็น Fentanyl'
    ]
  },
  {
    id: 'massive_hemoptysis',
    nameEn: 'Massive Hemoptysis & Catastrophic Bleeding',
    nameTh: 'เลือดออกปริมาณมาก / ไอเป็นเลือดรุนแรง (Massive Hemoptysis)',
    urgencyEn: 'Acute Terminal Emergency (Requires calm, rapid palliative crisis management)',
    urgencyTh: 'ภาวะวิกฤตระยะสุดท้ายเฉียบพลัน (เน้นความสงบ ระงับความตื่นตระหนก และดูแลจิตใจ)',
    clinicalPresentationEn: [
      'Coughing up fresh red blood > 100-200 mL acutely (threatens asphyxiation).',
      'Erosion of neck/lung tumor into major arteries (carotid blowout syndrome, pulmonary artery erosion).',
      'Massive gastrointestinal bleeding (hematemesis/melena in esophageal varices or gastric ulcer).',
      'Acute panic, terror, choking sensation in patient and profound distress in family.'
    ],
    clinicalPresentationTh: [
      'ไอเป็นเลือดสดปริมาณมาก (> 100-200 มล.) เสี่ยงต่อการสำลักอุดกั้นทางเดินหายใจ',
      'ก้อนมะเร็งลุกลามกัดเซาะเข้าหลอดเลือดแดงใหญ่ (Carotid blowout หรือ Pulmonary artery erosion)',
      'เลือดออกรุนแรงในทางเดินอาหาร (อาเจียนเป็นเลือดสด ปริมาณมากจากหลอดเลือดขอดในหลอดอาหาร)',
      'ผู้ป่วยเกิดความกลัว ตื่นตระหนก สำลัก และครอบครัวตกใจอย่างรุนแรง'
    ],
    immediateManagementEn: [
      'DO NOT LEAVE THE PATIENT ALONE: Assign a nurse or physician to stay at bedside, hold hands, and maintain calm presence.',
      'USE DARK GREEN OR NAVY TOWELS / BLANKETS: Immediately cover blood and replace white linen with dark-colored towels to dramatically reduce psychological horror and visual shock for both patient and family.',
      'Position patient: Lateral decubitus with bleeding lung side DOWN (dependent) to protect the healthy lung from blood aspiration, or semi-upright if bleeding from neck/carotid.',
      'Administer rapid subcutaneous or IV sedation immediately to eradicate terror and air hunger.',
      'Tranexamic acid for subacute or ongoing oozing; however, in catastrophic arterial blowout, prioritize rapid deep sedation and comfort.',
      'Gently shield and support the family; reassure them you are managing comfort and staying with them.'
    ],
    immediateManagementTh: [
      'ห้ามทิ้งให้ผู้ป่วยอยู่ตามลำพังเด็ดขาด: ต้องมีแพทย์หรือพยาบาลอยู่ข้างเตียง จับมือ และพูดคุยด้วยน้ำเสียงที่สงบ',
      'ใช้ผ้าขนหนูหรือผ้าปูสีเข้ม (สีเขียวเข้ม น้ำเงินเข้ม หรือดำ): นำมารองซับเลือดแทนผ้าสีขาวทันที เพื่อลดภาพความน่าสะพรึงกลัวและความตระหนกตกใจของทั้งผู้ป่วยและครอบครัว',
      'จัดท่านอน: นอนตะแคงเอาปอดข้างที่มีเลือดออกลงด้านล่าง เพื่อป้องกันไม่ให้เลือดไหลสำลักไปอุดตันปอดข้างที่ดี',
      'ให้ยานอนหลับและยาระงับปวดทางหลอดเลือดดำหรือใต้ผิวหนังทันที เพื่อระงับความตื่นตระหนกและความทรมาน',
      'Tranexamic acid ช่วยในรายที่เลือดค่อยๆ ไหลซึม แต่หากเป็นเส้นเลือดใหญ่แตก ให้เน้นการระงับความทุกข์ทรมานอย่างรวดเร็วที่สุด',
      'ประคองจิตใจครอบครัว อธิบายอย่างนุ่มนวลว่าทีมแพทย์กำลังดูแลให้ผู้ป่วยหลับสบาย ไม่เจ็บปวด'
    ],
    medicationsEn: [
      'Midazolam 5 - 10 mg IV or SC stat (relieves severe terror and causes retrograde amnesia).',
      'Morphine 5 - 10 mg IV or SC stat (relieves pain, breathlessness, and coughing reflex).',
      'Tranexamic acid (TXA) 1 g IV slowly over 10 minutes, then 500 mg - 1 g TID (for subacute oozing).'
    ],
    medicationsTh: [
      'Midazolam 5 - 10 มก. ฉีด IV หรือ SC ทันที (ช่วยให้หลับอย่างรวดเร็ว คลายความหวาดกลัว และลืมเหตุการณ์ทรมาน)',
      'Morphine 5 - 10 มก. ฉีด IV หรือ SC ทันที (ระงับปวด ลดความเหนื่อยหอบ และกดรีเฟล็กซ์การไอ)',
      'Tranexamic acid (TXA) 1 กรัม ฉีดเข้าหลอดเลือดดำช้าๆ ใน 10 นาที ตามด้วย 500-1000 มก. ทุก 8 ชม. (สำหรับเลือดออกซึม)'
    ],
    cautionsEn: [
      'Avoid invasive endotracheal intubation or chest tube insertion in terminal malignant carotid blowout or terminal massive hemoptysis where code status is AND/DNR.',
      'Keep a "Dark Towel Emergency Kit" and pre-filled emergency sedatives readily available in high-risk cancer wards.'
    ],
    cautionsTh: [
      'หลีกเลี่ยงการใส่ท่อช่วยหายใจที่รุกรานในผู้ป่วยระยะท้ายที่มีข้อตกลง AND (Allow Natural Death) ไว้แล้ว',
      'ควรจัดเตรียม "ชุดผ้าสีเข้มและยาฉีดระงับความตระหนกฉุกเฉิน" ไว้ประจำหอผู้ป่วยที่มีผู้ป่วยมะเร็งความเสี่ยงสูง'
    ]
  },
  {
    id: 'svcs',
    nameEn: 'Superior Vena Cava Syndrome (SVCS)',
    nameTh: 'กลุ่มอาการหลอดเลือดดำใหญ่ถูกอุดกั้น (SVC Syndrome)',
    urgencyEn: 'Urgent Oncologic / Palliative Evaluation',
    urgencyTh: 'ภาวะเร่งด่วนทางมะเร็งและประคับประคอง',
    clinicalPresentationEn: [
      'Facial, neck, bilateral upper extremity, and conjunctival edema ("plethoric face").',
      'Distended, engorged collateral veins across the anterior chest wall and neck.',
      'Dyspnea, orthopnea, persistent cough, hoarseness, stridor (laryngeal edema).',
      'Cerebral edema signs: headache, dizziness, visual disturbance, altered mental status.'
    ],
    clinicalPresentationTh: [
      'หน้าบวม คอบวม แขนบวมทั้งสองข้าง เยื่อบุตาบวมแดง คั่งเลือด (Plethora)',
      'หลอดเลือดดำบริเวณหน้าอกส่วนบนและลำคอโป่งพองขยายตัวชัดเจน (Collateral veins)',
      'หายใจลำบาก นอนราบไม่ได้ ไอเรื้อรัง เสียงแหบ หรือมีเสียงหายใจหวีด (Stridor จากกล่องเสียงบวม)',
      'อาการสมองบวม: ปวดศีรษะ เวียนศีรษะ ตามัว สับสน หรือซึมลง'
    ],
    immediateManagementEn: [
      'Elevate head of bed to 45-90 degrees to promote gravity venous drainage.',
      'Provide supplemental oxygen via nasal cannula if hypoxemic; handheld fan for air hunger.',
      'Initiate high-dose Dexamethasone promptly to reduce peritumoral edema and laryngeal swelling.',
      'Emergency contrast CT chest to assess thrombus vs tumor compression.',
      'Consult Interventional Radiology for SVC stent placement (immediate relief in 90-95% within 24-48h) or Radiation Oncology.'
    ],
    immediateManagementTh: [
      'จัดท่านอนศีรษะสูง 45-90 องศา เพื่อช่วยระบายเลือดดำกลับหัวใจตามแรงโน้มถ่วง',
      'ให้ออกซิเจนหากมีภาวะออกซิเจนต่ำ ใช้พัดลมมือถือเป่าหน้าเพื่อลดความรู้สึกเหนื่อย',
      'ให้ Dexamethasone ขนาดสูงทันทีเพื่อลดอาการบวมรอบก้อนมะเร็งและลดบวมกล่องเสียง',
      'ส่งตรวจเอกซเรย์คอมพิวเตอร์ทรวงอก (CT Chest with contrast) เพื่อประเมินลิ่มเลือดหรือก้อนกดทับ',
      'ปรึกษารังสีร่วมรักษาเพื่อใส่ขดลวดขยายหลอดเลือด (SVC Stenting ให้ผลบรรเทาอาการเร็วภายใน 24-48 ชม.) หรือส่งฉายรังสี'
    ],
    medicationsEn: [
      'Dexamethasone 16 mg IV or PO once daily in morning (with PPI coverage).',
      'Morphine 2.5 - 5 mg PO/SC q4h PRN for refractory dyspnea.',
      'Anticoagulation (LMWH) if thrombus is identified and bleeding risk is acceptable.'
    ],
    medicationsTh: [
      'Dexamethasone 16 มก. IV หรือ PO วันละ 1 ครั้งตอนเช้า (ร่วมกับยาลดกรด PPI)',
      'Morphine 2.5 - 5 มก. PO หรือ SC ทุก 4 ชม. PRN เมื่อมีอาการเหนื่อยหอบ',
      'ยาต้านการแข็งตัวของเลือด (LMWH) หากตรวจพบลิ่มเลือดอุดตันและไม่มีข้อห้ามเลือดออก'
    ],
    cautionsEn: [
      'Avoid placing IV lines, drawing blood, or taking blood pressure in upper extremities if bilateral SVCS is severe (use lower extremity veins if possible).',
      'Laryngeal edema with stridor requires immediate airway evaluation.'
    ],
    cautionsTh: [
      'หลีกเลี่ยงการเปิดเส้นให้น้ำเกลือ เจาะเลือด หรือวัดความดันที่แขนทั้งสองข้างหากบวมมาก (ควรใช้เส้นเลือดที่ขาแทน)',
      'หากมีเสียงหายใจหวีด (Stridor) แสดงว่ากล่องเสียงบวม เสี่ยงทางเดินหายใจอุดกั้นเฉียบพลัน'
    ]
  },
  {
    id: 'hypercalcemia',
    nameEn: 'Hypercalcemia of Malignancy (HCM)',
    nameTh: 'ภาวะแคลเซียมในเลือดสูงจากโรคมะเร็ง (HCM)',
    urgencyEn: 'Metabolic Emergency (Corrected Ca > 12-14 mg/dL requires prompt therapy)',
    urgencyTh: 'ภาวะฉุกเฉินทางเมแทบอลิซึม (Corrected Ca > 12-14 mg/dL เสี่ยงต่อภาวะหัวใจเต้นผิดจังหวะและโคม่า)',
    clinicalPresentationEn: [
      'Classic mnemonic: "Bones, Stones, Groans, and Psychiatric Overtones".',
      'Neurological: severe lethargy, confusion, hallucinations, hypotonia, progressive coma.',
      'Gastrointestinal: anorexia, intractable nausea, vomiting, severe constipation, obstipation.',
      'Renal & Cardiac: polyuria, polydipsia, severe dehydration, shortened QT interval, cardiac arrhythmias.'
    ],
    clinicalPresentationTh: [
      'อาการทางระบบประสาท: ซึมมาก สับสน เพ้อ เห็นภาพหลอน กล้ามเนื้ออ่อนแรง โคม่า',
      'อาการทางเดินอาหาร: เบื่ออาหาร คลื่นไส้อาเจียนรุนแรง ท้องผูกอย่างหนัก แน่นท้อง',
      'อาการทางไตและหัวใจ: ปัสสาวะบ่อย กระหายน้ำ ขาดน้ำรุนแรง คลื่นไฟฟ้าหัวใจ QT interval สั้นลง หัวใจเต้นผิดจังหวะ'
    ],
    immediateManagementEn: [
      'Calculate Corrected Calcium = Measured Serum Ca + 0.8 * (4.0 - Serum Albumin in g/dL).',
      'AGGRESSIVE FLUID RESUSCITATION: 0.9% Normal Saline 200 - 300 mL/hr IV (titrated to volume status and cardiac function) to restore extracellular volume and promote calciuresis.',
      'Intravenous Bisphosphonates: Zoledronic Acid (preferred) or Pamidronate.',
      'Subcutaneous Calcitonin: for rapid onset reduction while bisphosphonate takes 48-72h to peak.',
      'Discontinue offending medications: thiazide diuretics, calcium supplements, vitamin D, lithium.'
    ],
    immediateManagementTh: [
      'คำนวณ Corrected Calcium = ค่าแคลเซียมที่วัดได้ + 0.8 * (4.0 - ค่า Albumin ในเลือด)',
      'การให้สารน้ำทดแทนอย่างเพียงพอ: ให้ 0.9% Normal Saline 200 - 300 มล./ชม. (ปรับตามการทำงานของหัวใจและไต) เพื่อขับแคลเซียมออกทางปัสสาวะ',
      'ยาบิสฟอสโฟเนตทางหลอดเลือดดำ: Zoledronic Acid หรือ Pamidronate',
      'Calcitonin ฉีดใต้ผิวหนัง: เพื่อลดแคลเซียมอย่างรวดเร็วใน 12-24 ชม. แรก ระหว่างรอยาบิสฟอสโฟเนตออกฤทธิ์เต็มที่ใน 48-72 ชม.',
      'หยุดยาที่เพิ่มแคลเซียม: ยาขับปัสสาวะกลุ่มไธอะไซด์, วิตามินดี, แคลเซียมเม็ด'
    ],
    medicationsEn: [
      'Zoledronic Acid 4 mg IV infusion over 15 minutes (reduce dose if CrCl 30-60 mL/min; use caution if CrCl < 30).',
      'Pamidronate 60 - 90 mg IV infusion over 2-4 hours.',
      'Salmon Calcitonin 4 - 8 IU/kg SC or IM every 12 hours for 24-48 hours (tachyphylaxis occurs thereafter).',
      'Dexamethasone 4 - 8 mg IV/PO daily (effective for steroid-responsive hematologic tumors: myeloma, lymphoma).'
    ],
    medicationsTh: [
      'Zoledronic Acid 4 มก. ผสมสารน้ำหยดเข้าหลอดเลือดดำใน 15 นาที (ปรับลดขนาดหากค่าการทำงานไตบกพร่อง)',
      'Pamidronate 60 - 90 มก. หยดเข้าหลอดเลือดดำใน 2-4 ชั่วโมง',
      'Salmon Calcitonin 4 - 8 ยูนิต/กก. ฉีด SC หรือ IM ทุก 12 ชม. ในช่วง 24-48 ชม. แรก (จะเกิดภาวะดื้อยาหลังจากนั้น)',
      'Dexamethasone 4 - 8 มก. IV/PO วันละครั้ง (ได้ผลดีในมะเร็งต่อมน้ำเหลืองและมัยอิโลมา)'
    ],
    cautionsEn: [
      'Do not use loop diuretics (Furosemide) unless volume overload is clinically evident after saline rehydration: furosemide worsens dehydration and prerenal azotemia if given prematurely.',
      'In a patient in the irreversible final days of dying (PPS ≤ 20%), treating hypercalcemia may prolong suffering by reversing protective somnolence: discuss goals of care with family.'
    ],
    cautionsTh: [
      'ห้ามฉีดยาขับปัสสาวะ Furosemide จนกว่าจะให้สารน้ำ Normal Saline จนผู้ป่วยหายจากภาวะขาดน้ำแล้วเท่านั้น เพราะการให้ยาขับปัสสาวะเร็วเกินไปจะทำให้ไตวายเฉียบพลันจากขาดน้ำรุนแรง',
      'หากผู้ป่วยอยู่ในวาระสุดท้ายของชีวิตอย่างชัดเจน (PPS ≤ 20%) ภาวะแคลเซียมสูงทำให้ผู้ป่วยซึมหลับอย่างสงบ การฝืนรักษาลดแคลเซียมอาจทำให้ผู้ป่วยตื่นมารับรู้ความเจ็บปวดทรมาน ควรปรึกษาครอบครัวเรื่องเป้าหมายการดูแล'
    ]
  },
  {
    id: 'mbo',
    nameEn: 'Malignant Bowel Obstruction (MBO)',
    nameTh: 'ภาวะลำไส้อุดกั้นจากโรคมะเร็ง (MBO)',
    urgencyEn: 'Acute Distress Emergency (Intractable vomiting, severe colic, dehydration)',
    urgencyTh: 'ภาวะทุกข์ทรมานเฉียบพลัน (อาเจียนไม่หยุด ปวดบิดเกร็ง ท้องอืดตึง ขาดน้ำ)',
    clinicalPresentationEn: [
      'Intractable nausea and vomiting (large volume, may become feculent in low obstruction).',
      'Colicky intermittent abdominal cramping pain superimposed on continuous dull aching.',
      'Abdominal distension, visible peristalsis, high-pitched metallic tinkling sounds early, progressing to absent bowel sounds.',
      'Absence of flatus or bowel movements (obstipation).'
    ],
    clinicalPresentationTh: [
      'คลื่นไส้อาเจียนปริมาณมากตลอดเวลา (อาจมีกลิ่นหรือสีกากอุจจาระ หากอุดกั้นลำไส้ส่วนล่าง)',
      'ปวดท้องบิดเกร็งเป็นพักๆ (Colicky pain) ร่วมกับปวดตื้อแน่นตลอดเวลา',
      'ท้องอืดตึง เคาะโปร่ง มีเสียงลำไส้บีบตัวเสียงแหลม (Tinkling sound) ในระยะแรก และเงียบสนิทในระยะต่อมา',
      'ไม่ผายลมและไม่ถ่ายอุจจาระ'
    ],
    immediateManagementEn: [
      'Stop oral solid food; allow small sips of water or ice chips for mouth comfort.',
      'Nasogastric (NG) tube decompression: temporary placement for acute decompression and severe vomiting crisis; can often be removed once pharmacological antisecretory therapy controls vomiting.',
      'STRICT CONTRAINDICATION: STOP PROKINETICS (Metoclopramide) - stimulates peristalsis against a mechanical obstruction risking bowel perforation!',
      'Initiate pharmacological trio: Antisecretory (Octreotide or Buscopan), Corticosteroid (Dexamethasone to reduce tumor edema), and Antiemetic (Haloperidol).',
      'Opioids for continuous pain; Buscopan for spasmodic colicky cramps.',
      'Evaluate for surgical bypass or endoscopic stent if single-site obstruction and good performance status (PPS > 50%).'
    ],
    immediateManagementTh: [
      'งดอาหารแข็ง อนุญาตให้จิบน้ำหรืออมเกล็ดน้ำแข็งเพื่อความชุ่มชื้นในช่องปาก',
      'การใส่สายระบายกระเพาะอาหาร (NG Tube): ใส่เพื่อระบายน้ำย่อยลดความดันในกระเพาะชั่วคราวขณะอาเจียนรุนแรง สามารถพิจารณาถอดออกได้เมื่อยาควบคุมอาการได้ดี',
      'ข้อห้ามเด็ดขาด: หยุดยาเร่งการบีบตัวของทางเดินอาหาร (Metoclopramide) ทันที เพราะจะทำให้ลำไส้บีบตัวสู้กับส่วนที่ตีบจนเสี่ยงต่อลำไส้แตกทะลุ',
      'ให้ยาสามประสาน: ยาลดการหลั่งน้ำย่อย (Octreotide หรือ Buscopan) + ยาลดบวมก้อนมะเร็ง (Dexamethasone) + ยาระงับอาเจียนส่วนกลาง (Haloperidol)',
      'ให้มอร์ฟีนระงับปวดตื้อ และให้ Buscopan ระงับอาการปวดบิดเกร็ง',
      'ประเมินผ่าตัดบายพาสหรือใส่ขดลวดขยายลำไส้ หากอุดตันเพียงจุดเดียวและสภาพร่างกายยังแข็งแรง (PPS > 50%)'
    ],
    medicationsEn: [
      'Octreotide 200 - 600 mcg/day continuous SC infusion or 100 mcg SC TID (potently suppresses gastrointestinal secretions).',
      'Hyoscine butylbromide (Buscopan) 60 - 120 mg/day continuous SC infusion or 20 mg SC q4-6h (antispasmodic and antisecretory).',
      'Dexamethasone 8 - 16 mg IV or SC daily in morning (reduces peritumoral edema at obstruction site).',
      'Haloperidol 1.5 - 3 mg/day SC for central nausea / CTZ suppression.',
      'Morphine continuous SC infusion for pain relief.'
    ],
    medicationsTh: [
      'Octreotide 200 - 600 มคก./วัน ดริปใต้ผิวหนังต่อเนื่อง (SC) หรือฉีด 100 มคก. SC วันละ 3 ครั้ง (ยับยั้งการหลั่งน้ำย่อยทางเดินอาหารอย่างมีประสิทธิภาพสูง)',
      'Hyoscine butylbromide (Buscopan) 60 - 120 มก./วัน ดริป SC หรือฉีด 20 มก. SC ทุก 4-6 ชม. (ลดการบีบเกร็งและลดสารคัดหลั่ง)',
      'Dexamethasone 8 - 16 มก. IV หรือ SC วันละครั้งตอนเช้า (ลดการบวมน้ำรอบก้อนมะเร็งที่อุดกั้น)',
      'Haloperidol 1.5 - 3 มก./วัน SC เพื่อระงับอาการคลื่นไส้',
      'มอร์ฟีนฉีดใต้ผิวหนังเพื่อระงับความเจ็บปวด'
    ],
    cautionsEn: [
      'Never use stimulant laxatives (Senna, Bisacodyl) or bulk-forming fibers in complete bowel obstruction.',
      'Subcutaneous butterfly infusion pump is the preferred route as oral absorption is zero.'
    ],
    cautionsTh: [
      'ห้ามใช้ยาระบายกระตุ้นลำไส้ (มะขามแขก, Bisacodyl) หรือยาระบายเพิ่มกากใยเด็ดขาดในภาวะลำไส้อุดกั้นสมบูรณ์',
      'การให้ยาทางสายฉีดใต้ผิวหนัง (Subcutaneous Butterfly) เป็นทางเลือกที่ดีที่สุดเนื่องจากยาไม่สามารถดูดซึมผ่านทางเดินอาหารได้'
    ]
  }
];
