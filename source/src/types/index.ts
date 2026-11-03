export type Language = 'en' | 'th';
export type Theme = 'light' | 'dark';

export type NavTabId =
  | 'when-to-start'
  | 'acp-guide'
  | 'symptoms'
  | 'opioid-calc'
  | 'dying-stage'
  | 'dying-care'
  | 'references';

export interface PPSLevel {
  percent: number;
  ambulationEn: string;
  ambulationTh: string;
  activityEn: string;
  activityTh: string;
  selfCareEn: string;
  selfCareTh: string;
  intakeEn: string;
  intakeTh: string;
  consciousEn: string;
  consciousTh: string;
  stageEn: string;
  stageTh: string;
  medianSurvivalDays?: number | string;
}

export interface DiseaseTrigger {
  id: string;
  categoryEn: string;
  categoryTh: string;
  criteriaEn: string[];
  criteriaTh: string[];
  clinicalNotesEn: string;
  clinicalNotesTh: string;
}

export interface PalliativeEmergency {
  id: string;
  nameEn: string;
  nameTh: string;
  urgencyEn: string;
  urgencyTh: string;
  clinicalPresentationEn: string[];
  clinicalPresentationTh: string[];
  immediateManagementEn: string[];
  immediateManagementTh: string[];
  medicationsEn: string[];
  medicationsTh: string[];
  cautionsEn: string[];
  cautionsTh: string[];
}

export interface OpioidDrug {
  id: string;
  nameEn: string;
  nameTh: string;
  route: 'oral' | 'iv_sc' | 'transdermal';
  unit: 'mg/day' | 'mcg/hr' | 'mcg/day';
  factorToOralMorphine: number;
  factorFromOralMorphine: number;
  formulationsEn: string[];
  formulationsTh: string[];
  frequencyEn: string;
  frequencyTh: string;
  notesEn: string;
  notesTh: string;
  renalSafety: 'safe' | 'caution' | 'contraindicated_severe';
  renalNoteEn: string;
  renalNoteTh: string;
}

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
