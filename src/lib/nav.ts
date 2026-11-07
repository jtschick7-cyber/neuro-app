// Navigation metadata: top-level sections, registries, and which of them have a screen yet.
// Flip `built` as each screen ships; unbuilt sections are hidden from the nav and their links render as plain text.

export type SectionId = 'home' | 'acute' | 'consults' | 'drugs' | 'antibodies' | 'calc';

export type RegistryId =
  | 'acute-neuro'
  | 'consult-workups'
  | 'vascular-antithrombotics'
  | 'neural-antibodies'
  | 'mg-contraindications'
  | 'seizure-threshold'
  | 'rcvs-triggers'
  | 'asm-interactions'
  | 'antiseizure-medications'
  | 'reference-cards';

export type CautionListId = 'mg-contraindications' | 'seizure-threshold' | 'rcvs-triggers';

export interface RegistryInfo {
  id: RegistryId;
  /** Short label used in link chips and headings. */
  label: string;
  section: Exclude<SectionId, 'home' | 'calc'>;
  built: boolean;
  /** Tab-strip label when it differs from `label` (sections with more than one registry). */
  tabLabel?: string;
}

export const REGISTRIES: RegistryInfo[] = [
  { id: 'acute-neuro', label: 'Acute protocol', section: 'acute', built: true },
  { id: 'consult-workups', label: 'Consult workup', section: 'consults', built: true, tabLabel: 'Consult workups' },
  { id: 'reference-cards', label: 'Reference card', section: 'consults', built: true, tabLabel: 'Reference cards' },
  { id: 'vascular-antithrombotics', label: 'Antithrombotics', section: 'drugs', built: true },
  { id: 'neural-antibodies', label: 'Neural antibody', section: 'antibodies', built: true },
  { id: 'mg-contraindications', label: 'MG cautions', section: 'drugs', built: true },
  { id: 'seizure-threshold', label: 'Seizure threshold', section: 'drugs', built: true },
  { id: 'rcvs-triggers', label: 'RCVS triggers', section: 'drugs', built: true },
  { id: 'asm-interactions', label: 'ASM interactions', section: 'drugs', built: true },
  { id: 'antiseizure-medications', label: 'ASM dosing', section: 'drugs', built: true },
];

export function getRegistry(id: string): RegistryInfo | undefined {
  return REGISTRIES.find((r) => r.id === id);
}

export function isCautionListId(id: string): id is CautionListId {
  return id === 'mg-contraindications' || id === 'seizure-threshold' || id === 'rcvs-triggers';
}

export interface SectionInfo {
  id: SectionId;
  label: string;
  /** Shorter label for the bottom bar, where six items share a phone's width. */
  navLabel?: string;
  blurb: string;
  built: boolean;
  /** Where the nav item points. */
  hash: string;
}

export const SECTIONS: SectionInfo[] = [
  { id: 'home', label: 'Home', blurb: '', built: true, hash: '#/' },
  { id: 'acute', label: 'Acute', blurb: 'Emergency protocols', built: true, hash: '#/acute-neuro' },
  { id: 'consults', label: 'Consults', blurb: 'Consult workups and reference cards', built: true, hash: '#/consult-workups' },
  { id: 'drugs', label: 'Drugs', blurb: 'Drug cautions, antithrombotics, ASM dosing and interactions', built: true, hash: '#/mg-contraindications' },
  { id: 'antibodies', label: 'Antibodies', blurb: 'Neural antibody cards', built: true, hash: '#/neural-antibodies' },
  { id: 'calc', label: 'Calculators', navLabel: 'Calcs', blurb: 'Dosing and risk scores', built: true, hash: '#/calc' },
];

/**
 * Calculator id (manifest id) → the `noteId` of the card that hosts it.
 * Only calculators that have a UI appear here; links to the rest render as plain text.
 */
export const CALC_CARD: Record<string, string> = {
  'levetiracetam-load': 'calc-anticonvulsants',
  'valproate-load': 'calc-anticonvulsants',
  'fosphenytoin-load': 'calc-anticonvulsants',
  'phenytoin-correction': 'calc-phenytoin',
  'hypertonic-saline-bolus': 'calc-icp',
  'mannitol-dose': 'calc-icp',
  'tnk-dose': 'calc-thrombolytics',
  'alteplase-dose': 'calc-thrombolytics',
  'ich-score': 'calc-ich-score',
  abcd2: 'calc-abcd2',
  'cockcroft-gault': 'calc-crcl',
  ledd: 'calc-ledd',
  'ivig-dose': 'calc-ivig',
  'sodium-correction': 'calc-sodium',
};
