export interface PalliativeReference {
  id: string;
  category: 'cpg_thai' | 'law' | 'international' | 'symptoms';
  citationEn: string;
  citationTh: string;
  sourceType: string;
  url?: string;
  descriptionEn: string;
  descriptionTh: string;
}

export const CLINICAL_REFERENCES: PalliativeReference[] = [
  {
    id: 'thai_cpg_2563',
    category: 'cpg_thai',
    citationEn:
      'Department of Medical Services, Ministry of Public Health Thailand. Clinical Practice Guideline on Palliative and End-of-Life Care (for Healthcare Professionals). Nonthaburi: Department of Medical Services; September 2020 (B.E. 2563). ISBN 978-974-422-924-3.',
    citationTh:
      'กรมการแพทย์ กระทรวงสาธารณสุข. คู่มือการดูแลผู้ป่วยแบบประคับประคองและระยะท้าย (สำหรับบุคลากรทางการแพทย์). นนทบุรี: กรมการแพทย์ กระทรวงสาธารณสุข; กันยายน 2563. ISBN 978-974-422-924-3.',
    sourceType: 'National Guideline (CPG)',
    url: 'https://qrgo.page.link/5fsEi',
    descriptionEn:
      'The comprehensive national Thai palliative care clinical practice guideline edited by Dr. Pathomporn Sirprapasiri, Dr. Duenpen Hortanarueng, Prof. Dr. Sriwieng Pairojkul, and multidisciplinary specialists across oncology, neurology, nephrology, cardiology, pediatrics, and pharmacy.',
    descriptionTh:
      'คู่มือหลักของประเทศไทย จัดทำโดยกรมการแพทย์ กระทรวงสาธารณสุข ร่วมกับสมาคมบริบาลผู้ป่วยระยะท้าย และศูนย์การุณรักษ์ ครอบคลุมการประเมิน การวางแผนล่วงหน้า การจัดการอาการ และการดูแลระยะใกล้เสียชีวิต'
  },
  {
    id: 'health_act_sec12',
    category: 'law',
    citationEn:
      'National Health Act B.E. 2550 (2007), Section 12, Royal Thai Government Gazette. Followed by Ministerial Regulations on Living Will Criteria and Procedures B.E. 2553 (2010).',
    citationTh:
      'พระราชบัญญัติสุขภาพแห่งชาติ พ.ศ. 2550 มาตรา 12, กฎกระทรวงกำหนดหลักเกณฑ์และวิธีการดำเนินการตามหนังสือแสดงเจตนาไม่ประสงค์จะรับบริการสาธารณสุขฯ พ.ศ. 2553.',
    sourceType: 'Legislation',
    url: 'https://www.thailivingwill.in.th/',
    descriptionEn:
      'Affirms the legal right of any person to execute an advance directive (Living Will) declining futile life-sustaining treatments in the terminal stage of life, and grants full civil and criminal legal immunity to healthcare professionals complying with the directive.',
    descriptionTh:
      'รับรองสิทธิของบุคคลในการทำหนังสือแสดงเจตนาปฏิเสธการรักษาที่เพียงเพื่อยืดการตายในวาระสุดท้าย และคุ้มครองบุคลากรทางการแพทย์ที่ปฏิบัติตามให้พ้นจากความรับผิดทั้งปวง'
  },
  {
    id: 'thai_palliative_society',
    category: 'cpg_thai',
    citationEn:
      'Thai Palliative Care Society (สมาคมบริบาลผู้ป่วยระยะท้าย) & Karunruk Palliative Care Center, Faculty of Medicine, Khon Kaen University. Quality Standards for Palliative Care and Practice Guidelines. Khon Kaen: Klung Nanathum Publishing; 2561 (2018).',
    citationTh:
      'สมาคมบริบาลผู้ป่วยระยะท้าย และ ศูนย์การุณรักษ์ คณะแพทยศาสตร์ มหาวิทยาลัยขอนแก่น. มาตรฐานคุณภาพการดูแลผู้ป่วยระยะท้ายแบบประคับประคอง. ขอนแก่น: คลังนานาวิทยา; 2561.',
    sourceType: 'Clinical Standards',
    url: 'http://karunruk.org/',
    descriptionEn:
      'Core clinical quality benchmarks for hospital and home palliative care units across Thailand, adapted from Australian and Singaporean national standards.',
    descriptionTh:
      'เกณฑ์มาตรฐานคุณภาพการจัดบริการศูนย์ดูแลประคับประคองระดับโรงพยาบาลและเครือข่ายชุมชนในประเทศไทย'
  },
  {
    id: 'who_cancer_pain',
    category: 'international',
    citationEn:
      'World Health Organization. WHO Guidelines for the Pharmacological and Radiotherapeutic Management of Cancer Pain in Adults and Adolescents. Geneva: World Health Organization; 2018.',
    citationTh:
      'องค์การอนามัยโลก (WHO). แนวทางขององค์การอนามัยโลกสำหรับการจัดการความปวดจากมะเร็งด้วยยาและการฉายรังสี. เจนีวา: องค์การอนามัยโลก; 2018.',
    sourceType: 'International Guideline',
    url: 'https://www.who.int/publications/i/item/9789241550390',
    descriptionEn:
      'Global standards for the 3-step analgesic ladder, around-the-clock opioid dosing, management of breakthrough pain, and essential adjuvants.',
    descriptionTh:
      'มาตรฐานสากลเรื่องบันได 3 ขั้นของการระงับปวด การใช้ยามอร์ฟีนอย่างสมเหตุผล และการจัดการอาการปวดกำเริบฉับพลัน'
  },
  {
    id: 'eapc_opioid_guidelines',
    category: 'international',
    citationEn:
      'Caraceni A, Hanks G, Kaasa S, et al. Use of opioid analgesics in the treatment of cancer pain: evidence-based recommendations from the EAPC. Lancet Oncol. 2012;13(2):e58-e68.',
    citationTh:
      'Caraceni A, Hanks G, Kaasa S, et al. การใช้ยาแก้ปวดกลุ่มโอปิออยด์ในการรักษาความปวดจากมะเร็ง: คำแนะนำอิงหลักฐานเชิงประจักษ์จากสมาคมบริบาลประคับประคองแห่งยุโรป (EAPC). Lancet Oncol. 2012;13(2):e58-e68.',
    sourceType: 'Consensus Guideline',
    descriptionEn:
      'Evidence-based guidelines on opioid titration, equianalgesic conversion factors, managing opioid side effects, and opioid switching / rotation.',
    descriptionTh:
      'หลักฐานเชิงประจักษ์เรื่องการปรับขนาดยาโอปิออยด์ อัตราส่วนการแปลงขนาดเทียบเคียง (Equianalgesic ratio) และการหมุนเวียนเปลี่ยนชนิดยา (Opioid rotation)'
  },
  {
    id: 'nccn_palliative_care',
    category: 'international',
    citationEn:
      'National Comprehensive Cancer Network (NCCN). NCCN Clinical Practice Guidelines in Oncology: Palliative Care. Version 1.2024. Fort Washington: NCCN; 2024.',
    citationTh:
      'National Comprehensive Cancer Network (NCCN). แนวทางเวชปฏิบัติทางคลินิกโรคมะเร็ง: การดูแลแบบประคับประคอง. เวอร์ชัน 1.2024. ฟอร์ตวอชิงตัน: NCCN; 2024.',
    sourceType: 'Oncology Guideline',
    url: 'https://www.nccn.org/guidelines/guidelines-detail?category=3&id=1455',
    descriptionEn:
      'Comprehensive screening algorithms, symptom protocols, anticipatory end-of-life care orders, and family bereavement pathways.',
    descriptionTh:
      'แนวทางการตรวจคัดกรองผู้ป่วยเข้าสู่ระบบประคับประคอง การจัดการอาการทางกายและจิตใจ และชุดคำสั่งการดูแลในวาระสุดท้ายของชีวิต'
  },
  {
    id: 'spict_tool',
    category: 'symptoms',
    citationEn:
      'NHS Lothian & The University of Edinburgh Primary Palliative Care Research Group. Supportive and Palliative Care Indicators Tool (SPICT™). Edinburgh: The University of Edinburgh; 2022.',
    citationTh:
      'มหาวิทยาลัยเอดินเบอระ และ NHS Lothian. เครื่องมือประเมินข้อบ่งชี้การดูแลแบบประคับประคองและการสนับสนุน (SPICT™). เอดินเบอระ; 2022.',
    sourceType: 'Clinical Assessment Tool',
    url: 'https://www.spict.org.uk/',
    descriptionEn:
      'Validated clinical checklist identifying patients with deteriorating health due to one or multiple advanced conditions who would benefit from palliative care.',
    descriptionTh:
      'แบบประเมินข้อบ่งชี้ทางคลินิกทั้งทั่วไปและเฉพาะโรค เพื่อช่วยแพทย์ระบุผู้ป่วยที่ควรได้รับการดูแลแบบประคับประคองตั้งแต่ระยะแรก'
  },
  {
    id: 'oxford_textbook',
    category: 'international',
    citationEn:
      'Cherny N, Fallon M, Kaasa S, Portenoy RK, Currow DC, editors. Oxford Textbook of Palliative Medicine. 6th ed. Oxford: Oxford University Press; 2021.',
    citationTh:
      'Cherny N, Fallon M, Kaasa S, Portenoy RK, Currow DC, บรรณาธิการ. ตำราเวชศาสตร์ประคับประคองออกซ์ฟอร์ด (Oxford Textbook of Palliative Medicine). พิมพ์ครั้งที่ 6. ออกซ์ฟอร์ด: สำนักพิมพ์มหาวิทยาลัยออกซ์ฟอร์ด; 2021.',
    sourceType: 'Textbook & Reference',
    descriptionEn:
      'The definitive international reference textbook for palliative medicine, ethics, symptom pharmacology, and terminal physiology.',
    descriptionTh:
      'ตำราอ้างอิงมาตรฐานระดับโลกด้านเวชศาสตร์ประคับประคอง สรีรวิทยาของภาวะใกล้ตาย และเภสัชวิทยาคลินิก'
  }
];
