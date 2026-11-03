import { PPSLevel, DiseaseTrigger } from '../types';

export const SURPRISE_QUESTION = {
  questionEn: 'Would you be surprised if this patient were to die in the next 6-12 months?',
  questionTh: 'ท่านจะประหลาดใจหรือไม่ ถ้าผู้ป่วยรายนี้จะเสียชีวิตในอีก 6-12 เดือนข้างหน้า?',
  explanationEn:
    'The "Surprise Question" is the first step in the Thai CPG and Gold Standards Framework (GSF). If the intuitive answer is "No" (you would not be surprised), this is a positive screen: initiate palliative care assessment, advance care planning (ACP), and holistic symptom management immediately rather than waiting for the terminal days.',
  explanationTh:
    'คำถาม Surprise Question เป็นขั้นตอนแรกตามแนวทางเวชปฏิบัติของกรมการแพทย์ กระทรวงสาธารณสุข และ Gold Standards Framework (GSF) หากแพทย์หรือทีมสุขภาพตอบในใจว่า "ไม่ประหลาดใจ" ถือเป็นสัญญาณบวก (Positive screen) ที่ควรเริ่มกระบวนการดูแลแบบประคับประคอง ร่วมกับการวางแผนการดูแลล่วงหน้า (ACP) และจัดการอาการรบกวนตั้งแต่เนิ่นๆ โดยไม่ต้องรอให้ถึงวาระสุดท้าย',
  threeStepsEn: [
    {
      step: 'Step 1: The Surprise Question',
      detail: 'Ask yourself: "Would I be surprised if this patient died within the next 6-12 months?" If NO -> initiate palliative care registration & ACP.'
    },
    {
      step: 'Step 2: General Indicators of Decline',
      detail: 'If unsure, look for general decline: spending > 50% of the day in bed/chair (PPS ≤ 50%, ECOG ≥ 3), multiple unplanned hospital admissions, weight loss > 10% in 6 months, serum albumin < 2.5 g/dL, or caregiver burnout.'
    },
    {
      step: 'Step 3: Disease-Specific Clinical Criteria',
      detail: 'Assess specific organ-failure and disease milestones: advanced cancer with metastasis, NYHA class IV heart failure, GOLD stage IV COPD with LTOT, end-stage renal disease (CCM), Child-Pugh C cirrhosis, or advanced dementia/stroke.'
    }
  ],
  threeStepsTh: [
    {
      step: 'ขั้นตอนที่ 1: การตั้งคำถาม Surprise Question',
      detail: 'ถามตัวเองว่า "ท่านจะประหลาดใจหรือไม่ ถ้าผู้ป่วยจะเสียชีวิตใน 6-12 เดือนข้างหน้า?" หากตอบว่า "ไม่ประหลาดใจ" ให้เริ่มต้นลงทะเบียนและวางแผนการดูแลแบบประคับประคองทันที'
    },
    {
      step: 'ขั้นตอนที่ 2: การประเมินข้อบ่งชี้ทั่วไปของการถดถอย (General Indicators)',
      detail: 'หากไม่แน่ใจ ให้มองหาข้อบ่งชี้ทั่วไป: สมรรถนะร่างกายถดถอย นั่งหรือนอนมากกว่าร้อยละ 50 ของวัน (PPS ≤ 50% หรือ ECOG ≥ 3), นอนโรงพยาบาลโดยไม่คาดหมายบ่อยครั้ง, น้ำหนักลด > 10% ใน 6 เดือน, Serum Albumin < 2.5 g/dL หรือมีภาวะพึ่งพิงสูง'
    },
    {
      step: 'ขั้นตอนที่ 3: การประเมินข้อบ่งชี้เฉพาะกลุ่มโรค (Specific Criteria)',
      detail: 'ประเมินเกณฑ์เฉพาะของโรคนั้นๆ เช่น มะเร็งระยะลุกลามแพร่กระจาย, หัวใจล้มเหลวขั้นรุนแรง (NYHA IV / Stage D), โรคปอดอุดกั้นเรื้อรังรุนแรงมาก (FEV1 < 30% / mMRC 3-4), ไตวายเรื้อรังระยะสุดท้ายที่รักษาแบบ CCM, ตับแข็ง Child-Pugh C / MELD ≥ 20 หรือสมองเสื่อม/หลอดเลือดสมองระยะติดเตียง'
    }
  ]
};

// Palliative Performance Scale (PPS v2)
export const PPS_LEVELS: PPSLevel[] = [
  {
    percent: 100,
    ambulationEn: 'Full',
    ambulationTh: 'เคลื่อนไหวปกติ เดินได้คล่อง',
    activityEn: 'Normal activity & work, no evidence of disease',
    activityTh: 'ทำงานและทำกิจกรรมได้ตามปกติ ไม่มีอาการของโรค',
    selfCareEn: 'Full',
    selfCareTh: 'ดูแลตัวเองได้เต็มที่',
    intakeEn: 'Normal',
    intakeTh: 'รับประทานอาหารได้ปกติ',
    consciousEn: 'Full',
    consciousTh: 'รู้สึกตัวดี แจ่มใส',
    stageEn: 'Stable (สมบูรณ์ดี)',
    stageTh: 'ระยะคงที่ (สมบูรณ์ดี)',
    medianSurvivalDays: '> 180'
  },
  {
    percent: 90,
    ambulationEn: 'Full',
    ambulationTh: 'เคลื่อนไหวปกติ',
    activityEn: 'Normal activity & work, some evidence of disease',
    activityTh: 'ทำกิจกรรมและทำงานได้ตามปกติ มีอาการของโรคบางอาการ',
    selfCareEn: 'Full',
    selfCareTh: 'ดูแลตัวเองได้เต็มที่',
    intakeEn: 'Normal',
    intakeTh: 'รับประทานอาหารได้ปกติ',
    consciousEn: 'Full',
    consciousTh: 'รู้สึกตัวดี',
    stageEn: 'Stable',
    stageTh: 'ระยะคงที่',
    medianSurvivalDays: '> 180'
  },
  {
    percent: 80,
    ambulationEn: 'Full',
    ambulationTh: 'เคลื่อนไหวปกติ',
    activityEn: 'Normal activity with effort, some evidence of disease',
    activityTh: 'ต้องออกแรงอย่างมากในการทำกิจกรรมตามปกติ',
    selfCareEn: 'Full',
    selfCareTh: 'ดูแลตัวเองได้เต็มที่',
    intakeEn: 'Normal or reduced',
    intakeTh: 'ปกติหรือลดลงเล็กน้อย',
    consciousEn: 'Full',
    consciousTh: 'รู้สึกตัวดี',
    stageEn: 'Stable',
    stageTh: 'ระยะคงที่',
    medianSurvivalDays: '> 150'
  },
  {
    percent: 70,
    ambulationEn: 'Reduced',
    ambulationTh: 'เคลื่อนไหวลดลง',
    activityEn: 'Unable to do normal work/chores, significant disease',
    activityTh: 'ไม่สามารถทำงานได้ตามปกติ มีอาการของโรคมาก',
    selfCareEn: 'Full',
    selfCareTh: 'ดูแลตัวเองได้ส่วนใหญ่',
    intakeEn: 'Normal or reduced',
    intakeTh: 'ปกติหรือลดลง',
    consciousEn: 'Full',
    consciousTh: 'รู้สึกตัวดี',
    stageEn: 'Stable / Transitional',
    stageTh: 'ระยะคงที่ / เริ่มเปลี่ยนผ่าน',
    medianSurvivalDays: 120
  },
  {
    percent: 60,
    ambulationEn: 'Reduced',
    ambulationTh: 'เคลื่อนไหวลดลงมาก',
    activityEn: 'Unable to do hobby/house work, extensive disease',
    activityTh: 'ไม่สามารถทำงานอดิเรกหรืองานบ้านได้ โรคลุกลาม',
    selfCareEn: 'Occasional assistance needed',
    selfCareTh: 'ต้องการความช่วยเหลือเป็นบางครั้ง/บางเรื่อง',
    intakeEn: 'Normal or reduced',
    intakeTh: 'ปกติหรือลดลง',
    consciousEn: 'Full or confusion',
    consciousTh: 'รู้สึกตัวดี หรือสับสนเป็นครั้งคราว',
    stageEn: 'Transitional (เริ่มเปลี่ยนผ่าน)',
    stageTh: 'ระยะเปลี่ยนผ่าน (Transitional)',
    medianSurvivalDays: 80
  },
  {
    percent: 50,
    ambulationEn: 'Mainly sit/lie',
    ambulationTh: 'นั่งหรือนอนเป็นส่วนใหญ่ (> 50% ของวัน)',
    activityEn: 'Unable to do any work, extensive disease',
    activityTh: 'ไม่สามารถทำงานได้เลย มีการลุกลามของโรค',
    selfCareEn: 'Considerable assistance needed',
    selfCareTh: 'ต้องการความช่วยเหลือมากขึ้น',
    intakeEn: 'Normal or reduced',
    intakeTh: 'ปกติหรือลดลง',
    consciousEn: 'Full or confusion',
    consciousTh: 'รู้สึกตัวดี หรือสับสน',
    stageEn: 'Transitional (Triggers Palliative Care Integration)',
    stageTh: 'ระยะเปลี่ยนผ่าน (ข้อบ่งชี้สำคัญในการเริ่มดูแลประคับประคอง)',
    medianSurvivalDays: 45
  },
  {
    percent: 40,
    ambulationEn: 'Mainly in bed',
    ambulationTh: 'นอนอยู่บนเตียงเป็นส่วนใหญ่',
    activityEn: 'Unable to do most activities, extensive disease',
    activityTh: 'ทำกิจกรรมได้น้อยมาก โรคลุกลาม',
    selfCareEn: 'Mainly assistance',
    selfCareTh: 'ต้องการความช่วยเหลือเป็นส่วนใหญ่',
    intakeEn: 'Normal or reduced',
    intakeTh: 'ปกติหรือลดลง',
    consciousEn: 'Full or drowsy +/- confusion',
    consciousTh: 'รู้สึกตัวดี หรือง่วงซึม +/- สับสน',
    stageEn: 'Transitional to End of Life',
    stageTh: 'ระยะกึ่งสุดท้าย (Transitional to End of Life)',
    medianSurvivalDays: 25
  },
  {
    percent: 30,
    ambulationEn: 'Totally bedbound',
    ambulationTh: 'นอนอยู่บนเตียงตลอดเวลา',
    activityEn: 'Unable to do any activity, extensive disease',
    activityTh: 'ไม่สามารถทำกิจกรรมใดๆ ได้ โรคลุกลามรุนแรง',
    selfCareEn: 'Total care',
    selfCareTh: 'ต้องการการดูแลช่วยเหลือทั้งหมด',
    intakeEn: 'Reduced',
    intakeTh: 'รับประทานอาหารลดลงชัดเจน',
    consciousEn: 'Full or drowsy +/- confusion',
    consciousTh: 'รู้สึกตัวดี หรือง่วงซึม +/- สับสน',
    stageEn: 'End of Life (วาระสุดท้าย)',
    stageTh: 'ระยะท้ายของชีวิต (End of Life)',
    medianSurvivalDays: 14
  },
  {
    percent: 20,
    ambulationEn: 'Totally bedbound',
    ambulationTh: 'นอนอยู่บนเตียงตลอดเวลา',
    activityEn: 'Unable to do any activity, extensive disease',
    activityTh: 'ไม่สามารถทำกิจกรรมใดๆ ได้ โรคลุกลามรุนแรง',
    selfCareEn: 'Total care',
    selfCareTh: 'ต้องการการดูแลช่วยเหลือทั้งหมด',
    intakeEn: 'Minimal sips of water only',
    intakeTh: 'จิบลดลง จิบน้ำได้เพียงเล็กน้อย',
    consciousEn: 'Full or drowsy +/- confusion',
    consciousTh: 'รู้สึกตัวดี หรือง่วงซึม +/- สับสน',
    stageEn: 'End of Life (วันถึงสัปดาห์)',
    stageTh: 'ระยะท้ายของชีวิต (วันถึงสัปดาห์)',
    medianSurvivalDays: 5
  },
  {
    percent: 10,
    ambulationEn: 'Totally bedbound',
    ambulationTh: 'นอนอยู่บนเตียงตลอดเวลา',
    activityEn: 'Unable to do any activity, extensive disease',
    activityTh: 'ไม่สามารถทำกิจกรรมใดๆ ได้',
    selfCareEn: 'Total care',
    selfCareTh: 'ต้องการการดูแลช่วยเหลือทั้งหมด',
    intakeEn: 'Mouth care only (unable to swallow)',
    intakeTh: 'รับประทานอาหาร/น้ำทางปากไม่ได้เลย ทำความสะอาดช่องปาก',
    consciousEn: 'Drowsy or coma +/- confusion',
    consciousTh: 'ง่วงซึมมาก หรือหมดสติ (โคม่า) +/- สับสน',
    stageEn: 'Active Dying (ชั่วโมงถึงวัน)',
    stageTh: 'ระยะใกล้เสียชีวิต (Active Dying: ชั่วโมงถึงวัน)',
    medianSurvivalDays: '1 - 2'
  },
  {
    percent: 0,
    ambulationEn: 'Dead',
    ambulationTh: 'เสียชีวิต',
    activityEn: 'Death',
    activityTh: 'ถึงแก่กรรม',
    selfCareEn: 'Death',
    selfCareTh: 'ถึงแก่กรรม',
    intakeEn: 'None',
    intakeTh: 'ไม่มี',
    consciousEn: 'None',
    consciousTh: 'ไม่มี',
    stageEn: 'Deceased',
    stageTh: 'ถึงแก่กรรม',
    medianSurvivalDays: 0
  }
];

export const DISEASE_SPECIFIC_TRIGGERS: DiseaseTrigger[] = [
  {
    id: 'cancer',
    categoryEn: 'Advanced Cancer (มะเร็งระยะลุกลาม)',
    categoryTh: 'โรคมะเร็งระยะลุกลาม (Advanced Cancer)',
    criteriaEn: [
      'Uncontrolled metastatic or locally advanced disease not amenable to curative treatment.',
      'Deteriorating functional status: ECOG ≥ 3, KPS ≤ 50%, or PPS ≤ 50% (spending > 50% of the day resting).',
      'Persistent severe symptoms (pain, dyspnea, nausea, fatigue, bowel obstruction).',
      'Progressive cachexia (weight loss > 10% in 6 months) and serum albumin < 2.5 g/dL.',
      'Hypercalcemia of malignancy, malignant spinal cord compression, brain metastasis, or superior vena cava obstruction.',
      'Patient or family expresses desire to prioritize comfort and quality of life over aggressive antineoplastic therapy.'
    ],
    criteriaTh: [
      'โรคมะเร็งระยะลุกลามหรือแพร่กระจายที่ไม่ตอบสนองต่อการรักษาให้หายขาดแล้ว',
      'สมรรถนะร่างกายถดถอย: ECOG ≥ 3, KPS ≤ 50% หรือ PPS ≤ 50% (นั่งหรือนอนพักมากกว่า 50% ของวัน)',
      'มีอาการรบกวนที่ควบคุมได้ยาก (ปวดรุนแรง, เหนื่อยหอบ, คลื่นไส้อาเจียน, ลำไส้อุดกั้น, อ่อนเพลียมาก)',
      'ภาวะผอมแห้งจากมะเร็ง (Cachexia): น้ำหนักลดต่อเนื่อง > 10% ใน 6 เดือน และ Serum Albumin < 2.5 g/dL',
      'เกิดภาวะแทรกซ้อนฉุกเฉินทางมะเร็ง: แคลเซียมในเลือดสูง, มะเร็งกดไขสันหลัง, มะเร็งแพร่กระจายไปสมอง หรือหลอดเลือดดำใหญ่ถูกอุดกั้น (SVCS)',
      'ผู้ป่วยหรือครอบครัวแสดงเจตจำนงเลือกการดูแลเพื่อสุขสบายและคุณภาพชีวิต มากกว่าการรักษาที่รุกราน'
    ],
    clinicalNotesEn:
      'Early integration of palliative care alongside oncology improves both survival duration and quality of life (Temel et al., NEJM). Do not withhold opioids out of fear of addiction.',
    clinicalNotesTh:
      'การเริ่มดูแลแบบประคับประคองร่วมกับการรักษามะเร็งตั้งแต่เนิ่นๆ ช่วยเพิ่มทั้งคุณภาพชีวิตและระยะเวลารอดชีวิต (การศึกษาของ Temel et al.) ไม่ควรชะลอการใช้มอร์ฟีนเพราะกลัวการติดยา'
  },
  {
    id: 'heart_failure',
    categoryEn: 'End-Stage Heart Failure (ภาวะหัวใจล้มเหลวระยะท้าย)',
    categoryTh: 'ภาวะหัวใจล้มเหลวระยะท้าย (Advanced Heart Failure / Stage D)',
    criteriaEn: [
      'NYHA Class IV heart failure: breathlessness or severe fatigue at rest or on minimal exertion despite optimal medical therapy (OMT).',
      'Severe systolic dysfunction (LVEF < 25-30%) or severe restrictive/diastolic filling impairment.',
      '≥ 2 hospital admissions in past 12 months for decompensated heart failure.',
      'Refractory congestion, diuretic resistance, or renal failure aggravated by ACEI/ARNI/diuretics.',
      'Cardiac cachexia with progressive unintentional weight loss > 10% over 6 months.',
      'Ineligible for heart transplantation or mechanical circulatory support (VAD).'
    ],
    criteriaTh: [
      'หัวใจล้มเหลวระดับ NYHA Class IV: หอบเหนื่อยหรืออ่อนเพลียมากแม้ขณะพักหรือขยับตัวเพียงเล็กน้อย แม้ได้รับยามาตรฐานเต็มที่แล้ว (OMT)',
      'หัวใจห้องล่างซ้ายบีบตัวลดลงรุนแรง (LVEF < 25-30%)',
      'นอนโรงพยาบาลด้วยภาวะหัวใจวายกำเริบเฉียบพลัน ≥ 2 ครั้ง ในรอบ 12 เดือนที่ผ่านมา',
      'ภาวะบวมน้ำหรือคั่งน้ำที่ไม่ตอบสนองต่อยาขับปัสสาวะ (Diuretic resistance) หรือเกิดไตวายเมื่อเพิ่มยา',
      'เกิดภาวะผอมแห้งจากโรคหัวใจ (Cardiac cachexia): น้ำหนักลดลง > 10% ใน 6 เดือน',
      'มีข้อห้ามหรือไม่เข้าเกณฑ์การผ่าตัดเปลี่ยนหัวใจหรือใส่เครื่องพยุงหัวใจเทียม (VAD)'
    ],
    clinicalNotesEn:
      'Trajectories in heart failure have sudden dips with partial recoveries. Discuss ICD deactivation in advance to prevent distressing recurrent shocks during active dying.',
    clinicalNotesTh:
      'วิถีของโรคหัวใจล้มเหลวจะมีช่วงทรุดและฟื้นตัวสลับกัน ควรพูดคุยเรื่องการปิดการทำงานของเครื่องกระตุกหัวใจอัตโนมัติ (AICD shock deactivation) ไว้ล่วงหน้า เพื่อป้องกันการช็อกกระตุกซ้ำๆ ในช่วงใกล้เสียชีวิต'
  },
  {
    id: 'copd_pulmonary',
    categoryEn: 'Severe Chronic Lung Disease (โรคปอดระยะท้าย / COPD)',
    categoryTh: 'โรคปอดเรื้อรังระยะท้าย (End-Stage COPD / Pulmonary Fibrosis)',
    criteriaEn: [
      'Very severe airflow limitation: FEV1 < 30% predicted (GOLD Stage IV).',
      'Severe disabling dyspnea: mMRC Grade 4 (too breathless to leave home or breathless dressing).',
      'Recurrent hospitalizations: ≥ 3 admissions in 12 months for acute exacerbations.',
      'Fulfills criteria for long-term oxygen therapy (LTOT) or chronic hypercapnic respiratory failure (PaCO2 ≥ 50 mmHg).',
      'Signs of cor pulmonale / secondary pulmonary hypertension and right heart failure.',
      'Idiopathic pulmonary fibrosis (IPF) with rapid physiological decline and resting hypoxemia.'
    ],
    criteriaTh: [
      'การอุดกั้นของทางเดินหายใจรุนแรงมาก: FEV1 < 30% ของค่าคาดการณ์ (GOLD Stage IV)',
      'หายใจลำบากรบกวนชีวิตประจำวันอย่างยิ่ง: mMRC ระดับ 4 (เหนื่อยจนออกจากบ้านไม่ได้ หรือเหนื่อยแม้ขณะแต่งตัว)',
      'เข้ารับการรักษาในโรงพยาบาลด้วยอาการกำเริบบ่อยครั้ง: ≥ 3 ครั้ง ในรอบ 12 เดือนที่ผ่านมา',
      'เข้าเกณฑ์การใช้ออกซิเจนระยะยาวที่บ้าน (LTOT) หรือมีภาวะคาร์บอนไดออกไซด์คั่งเรื้อรัง (PaCO2 ≥ 50 mmHg)',
      'มีภาวะหัวใจซีกขวาล้มเหลวจากโรคปอด (Cor pulmonale / Right heart failure)',
      'โรคพังผืดในปอด (IPF) ที่มีอาการทรุดลงอย่างรวดเร็วและออกซิเจนต่ำขณะพัก'
    ],
    clinicalNotesEn:
      'Low-dose oral/parenteral morphine (2.5-5 mg PO q4-6h) is safe, effective, and evidence-based for refractory dyspnea; it does NOT cause clinically significant respiratory depression when titrated properly. Handheld fan to the face stimulates the trigeminal V2 nerve branch to relieve breathlessness sensation.',
    clinicalNotesTh:
      'การใช้ยามอร์ฟีนขนาดต่ำ (เช่น 2.5-5 มก. กินทุก 4-6 ชม.) มีหลักฐานยืนยันชัดเจนว่าช่วยบรรเทาอาการเหนื่อยหอบได้อย่างปลอดภัย ไม่กดการหายใจหากปรับยาอย่างถูกต้อง การใช้พัดลมมือถือเป่าบริเวณใบหน้าช่วยกระตุ้นเส้นประสาทสมองคู่ที่ 5 ลดความรู้สึกหายใจไม่อิ่มได้ดี'
  },
  {
    id: 'renal_failure',
    categoryEn: 'End-Stage Renal Disease (โรคไตวายเรื้อรังระยะ 5 / CCM)',
    categoryTh: 'โรคไตเรื้อรังระยะที่ 5 / ไตวายระยะสุดท้าย (ESRD / CCM)',
    criteriaEn: [
      'eGFR < 15 mL/min/1.73m² (CKD stage 5) choosing Comprehensive Conservative Management (CCM) without dialysis.',
      'Decision to withdraw or withhold maintenance hemodialysis or peritoneal dialysis.',
      'Severe comorbidity: Charlson Comorbidity Index (CCI) > 8 or KPS < 40% in elderly patients (age > 75-80).',
      'Refractory uremic symptoms: severe pruritus, intractable nausea/vomiting, anorexia, fluid overload, uremic encephalopathy.'
    ],
    criteriaTh: [
      'อัตราการกรองของไต eGFR < 15 มล./นาที/1.73 ตร.ม. (CKD ระยะ 5) และเลือกการรักษาแบบองค์รวมชนิดประคับประคอง (CCM) โดยไม่บำบัดทดแทนไต',
      'ผู้ป่วยหรือผู้ตัดสินใจแทนแสดงเจตจำนงขอยุติหรือปฏิเสธการฟอกเลือดด้วยเครื่องไตเทียมหรือการล้างไตทางช่องท้อง',
      'มีโรคร่วมรุนแรงหลายโรค: Charlson Comorbidity Index (CCI) > 8 หรือ KPS < 40% ในผู้สูงอายุ (> 75-80 ปี)',
      'มีอาการจากภาวะยูรีเมียที่ไม่ตอบสนอง: คันตามตัวรุนแรง คลื่นไส้อาเจียน เบื่ออาหาร ภาวะสารน้ำเกิน หรือสมองเสื่อมถอยจากยูรีเมีย'
    ],
    clinicalNotesEn:
      'AVOID regular morphine, codeine, or pethidine in severe renal failure because active neurotoxic metabolites (M6G, M3G, normeperidine) accumulate rapidly and cause severe sedation, myoclonus, and respiratory depression. FENTANYL and METHADONE are the opioids of choice in severe renal impairment.',
    clinicalNotesTh:
      'ข้อควรระวังสำคัญ: หลีกเลี่ยงการใช้มอร์ฟีน โคเดอีน และเพทิดีนเป็นประจำในผู้ป่วยไตวายรุนแรง เพราะสารเมแทบอไลต์ (M6G, M3G, normeperidine) จะสะสมในเลือด ทำให้เกิดพิษ ง่วงซึม โคม่า กล้ามเนื้อกระตุก (Myoclonus) และกดการหายใจ ควรเลือกใช้ FENTANYL เป็นยาหลัก'
  },
  {
    id: 'liver_failure',
    categoryEn: 'End-Stage Liver Disease (ตับแข็งระยะท้าย / ตับวาย)',
    categoryTh: 'โรคตับแข็งระยะท้าย / ภาวะตับวายเรื้อรัง (End-Stage Liver Disease)',
    criteriaEn: [
      'Child-Pugh Class C (score 10-15) or MELD score ≥ 20 (predicted 3-month mortality > 50-70%).',
      'Diuretic-resistant / refractory ascites.',
      'Recurrent or persistent hepatic encephalopathy (Stage 3-4).',
      'Hepatorenal syndrome (HRS) type 1 or 2.',
      'Recurrent esophageal variceal bleeding despite endoscopic intervention.',
      'Contraindications to liver transplantation (active substance abuse, severe extrahepatic disease, advanced age, no social support).'
    ],
    criteriaTh: [
      'ตับแข็งระดับ Child-Pugh Class C (คะแนน 10-15) หรือ MELD score ≥ 20 (อัตราเสียชีวิตใน 3 เดือนสูงถึง 50-70%)',
      'ภาวะท้องมานที่ดื้อต่อยาขับปัสสาวะ (Diuretic-resistant / refractory ascites)',
      'อาการทางสมองจากโรคตับเป็นซ้ำหรือรุนแรง (Hepatic encephalopathy stage 3-4)',
      'กลุ่มอาการโรคไตจากโรคตับ (Hepatorenal syndrome: HRS)',
      'เลือดออกในทางเดินอาหารซ้ำจากหลอดเลือดขอดในหลอดอาหาร แม้ผ่านการรัด/ฉีดยาแล้ว',
      'มีข้อห้ามในการผ่าตัดปลูกถ่ายตับ (เช่น ดื่มสุราต่อเนื่อง, ติดเชื้อรุนแรง, โรคหัวใจ/ปอดรุนแรง, ไม่มีผู้ดูแล)'
    ],
    clinicalNotesEn:
      'Hypoalbuminemia increases free fraction of highly protein-bound medications. Reduced hepatic clearance prolongs half-lives of sedatives and opioids; reduce doses and extend dosing intervals.',
    clinicalNotesTh:
      'ภาวะอัลบูมินต่ำทำให้ระดับยาอิสระในเลือดสูงขึ้น การกำจัดยาที่ตับลดลงทำให้ยานอนหลับและโอปิออยด์ออกฤทธิ์ยาวนานขึ้น ต้องปรับลดขนาดยาและขยายช่วงเวลาให้ยา'
  },
  {
    id: 'neurology_stroke',
    categoryEn: 'Neurological Diseases & Dementia (โรคระบบประสาทและสมองเสื่อม)',
    categoryTh: 'โรคระบบประสาทระยะท้ายและสมองเสื่อม (Severe Stroke / MND / Dementia)',
    criteriaEn: [
      'Acute Stroke: Persistent coma or vegetative state > 3 days with brainstem deficit, absent withdrawal, and multiorgan failure.',
      'Chronic Stroke: Bedridden > 6 months, unable to take oral nutrition, recurrent aspiration pneumonias, weight loss > 10% in 6 months.',
      'Motor Neuron Disease (ALS/MND): Severe dysphagia, dependent in basic ADL, FVC < 70% with orthopnea/hypoventilation, recurrent aspiration.',
      'Advanced Parkinson Disease: Severe motor disability (Hoehn & Yahr Stage 5), refractory to dopaminergic drugs, hallucinations/dementia.',
      'Severe Dementia (FAST Stage 7): Unable to walk or speak beyond few words, total dependence in all ADL, recurrent pneumonia/febrile episodes, urinary/fecal incontinence.'
    ],
    criteriaTh: [
      'โรคหลอดเลือดสมองระยะเฉียบพลัน: โคม่าหรือภาวะผักนานกว่า 3 วัน ร่วมกับก้านสมองสูญเสียหน้าที่ ขาดการตอบสนองต่อความเจ็บปวด',
      'โรคหลอดเลือดสมองระยะเรื้อรัง: ติดเตียงนานเกิน 6 เดือนขึ้นไป รับอาหาร/น้ำไม่ได้ สำลักปอดอักเสบซ้ำ น้ำหนักลด > 10% ใน 6 เดือน',
      'โรคเซลล์ประสาทสั่งการเสื่อม (ALS/MND): กลืนลำบากมาก หายใจเหนื่อยเวลานอนราบ (Orthopnea) หรือ FVC < 70% สำลักซ้ำ',
      'โรคพาร์กินสันระยะท้าย: อาการรุนแรงติดเตียง (Hoehn & Yahr ระยะ 5) ดื้อต่อยารับประทาน มีอาการทางจิตประสาท/ประสาทหลอน',
      'สมองเสื่อมระยะรุนแรง (FAST Stage 7): เดินไม่ได้ พูดได้ไม่เกินสองสามคำ พึ่งพิงผู้อื่นทั้งหมด มีปอดอักเสบจากการสำลักซ้ำๆ กลั้นขับถ่ายไม่ได้'
    ],
    clinicalNotesEn:
      'Pain in advanced dementia often manifests as agitation, moaning, restlessness, or refusal of care. Use observational behavioral tools like PAINAD or Abbey Pain Scale.',
    clinicalNotesTh:
      'ความเจ็บปวดในผู้ป่วยสมองเสื่อมระยะท้ายมักแสดงออกทางพฤติกรรม เช่น กระสับกระส่าย ร้องคราง ต่อต้านการดูแล หรือไม่ยอมนอน ควรใช้แบบประเมินพฤติกรรมความปวด เช่น PAINAD หรือ Abbey Pain Scale'
  }
];

export const SPICT_CHECKLIST = [
  {
    id: 'spict_gen_1',
    category: 'general',
    textEn: 'Unplanned hospital admission(s) (≥ 2 admissions in the past 6-12 months)',
    textTh: 'เข้ารับการรักษาในโรงพยาบาลโดยไม่ได้วางแผนบ่อยครั้ง (≥ 2 ครั้งในรอบ 6-12 เดือน)'
  },
  {
    id: 'spict_gen_2',
    category: 'general',
    textEn: 'Performance status is poor or deteriorating (in bed or chair > 50% of the day / PPS ≤ 50%)',
    textTh: 'สมรรถนะร่างกายถดถอยอย่างชัดเจน (นั่งหรือนอนมากกว่าร้อยละ 50 ของวัน / PPS ≤ 50%)'
  },
  {
    id: 'spict_gen_3',
    category: 'general',
    textEn: 'Progressive weight loss (> 10% in 6 months) or persistent serum albumin < 2.5 g/dL',
    textTh: 'น้ำหนักตัวลดลงต่อเนื่องมากกว่าร้อยละ 10 ใน 6 เดือน หรือ Serum Albumin < 2.5 g/dL'
  },
  {
    id: 'spict_gen_4',
    category: 'general',
    textEn: 'Persistent troublesome symptoms despite optimal management of underlying conditions',
    textTh: 'มีอาการรบกวนไม่สุขสบายต่อเนื่อง แม้ได้รับการรักษาโรคประจำตัวอย่างเต็มที่แล้ว'
  },
  {
    id: 'spict_gen_5',
    category: 'general',
    textEn: 'Family caregiver expresses burnout, distress, or requests palliative/comfort care support',
    textTh: 'ผู้ดูแลหรือครอบครัวเกิดภาวะเหนื่อยล้า วิตกกังวล หรือร้องขอความช่วยเหลือด้านการดูแลประคับประคอง'
  },
  {
    id: 'spict_gen_6',
    category: 'general',
    textEn: 'Patient or family chooses comfort care or decides against further invasive/escalating treatments',
    textTh: 'ผู้ป่วยหรือครอบครัวตัดสินใจเลือกการดูแลแบบประคับประคอง ไม่ประสงค์รับการรักษาชนิดรุกราน'
  }
];
