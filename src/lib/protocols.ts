import type { z } from 'zod';
import type { AcuteNeuroEntry as AcuteSchema, AcuteNeuroRegistry } from '../../schema/acute-neuro';
import type { ConsultWorkupEntry as ConsultSchema } from '../../schema/consult-workups';

export type AcuteEntry = z.infer<typeof AcuteSchema>;
export type ConsultEntry = z.infer<typeof ConsultSchema>;
export interface ProtocolRegistry<E> {
  title: string;
  version: string;
  entries: E[];
}
export type AcuteRegistry = z.infer<typeof AcuteNeuroRegistry>;

// The ~200 KB registries are separate chunks, fetched (from the precache) only when their screen opens.
// JSON is validated by `npm run validate:release`, so a type assertion avoids shipping zod.
export const loadAcute = (): Promise<ProtocolRegistry<AcuteEntry>> =>
  import('../../data/acute-neuro.json').then((m) => m.default as unknown as ProtocolRegistry<AcuteEntry>);
export const loadConsults = (): Promise<ProtocolRegistry<ConsultEntry>> =>
  import('../../data/consult-workups.json').then((m) => m.default as unknown as ProtocolRegistry<ConsultEntry>);

/** Enum → display label. Badges are always derived from these enums, never free text. */
export const CATEGORY_LABEL: Record<string, string> = {
  SEIZURE: 'Seizure',
  NEUROMUSCULAR: 'Neuromuscular',
  NEUROIMMUNOLOGY: 'Neuroimmunology',
  CNS_INFECTION: 'CNS infection',
  SPINAL: 'Spinal',
  ICP_HERNIATION: 'ICP / herniation',
  TOXIC_METABOLIC: 'Toxic / metabolic',
  ENCEPHALOPATHY: 'Encephalopathy',
  VASCULAR: 'Vascular',
  COGNITION_ENCEPHALOPATHY: 'Cognition / encephalopathy',
  NEURO_OPHTH_VESTIBULAR: 'Neuro-ophth / vestibular',
  HEADACHE: 'Headache',
  INFLAMMATORY_DEMYELINATING: 'Inflammatory / demyelinating',
  PROGNOSIS_DEATH: 'Prognosis / death',
  FUNCTIONAL: 'Functional',
};

export const ROLE_LABEL: Record<string, string> = {
  FIRST_LINE: 'First line',
  SECOND_LINE: 'Second line',
  THIRD_LINE: 'Third line',
  ALTERNATIVE: 'Alternative',
  ADJUNCT: 'Adjunct',
  SUPPORTIVE: 'Supportive',
  NOT_RECOMMENDED: 'Not recommended',
};

export const PRIORITY_LABEL: Record<string, string> = { STAT: 'STAT', URGENT: 'Urgent', ROUTINE: 'Routine', IF_INDICATED: 'If indicated' };

export const FORMULARY_LABEL: Record<string, string> = {
  LOCAL_PREFERRED: 'Local preferred',
  AVAILABLE: 'Stocked',
  NOT_STOCKED_LOCAL: 'Not stocked locally',
  INSTITUTION_VARIES: 'Institution varies',
};

export const EVIDENCE_LABEL: Record<string, string> = {
  STRONG: 'Strong',
  MODERATE: 'Moderate',
  WEAK: 'Weak',
  NOT_RECOMMENDED: 'Not recommended',
  CONSENSUS: 'Consensus',
  EXPERT_OPINION: 'Expert opinion',
  NOT_GRADED: 'Not graded',
};

export interface Searchable {
  title: string;
  category: string;
  searchTerms: string[];
}

/** Case-insensitive match on title, search terms and category label; registry order is kept. */
export function searchEntries<E extends Searchable>(entries: E[], query: string): E[] {
  const q = query.trim().toLowerCase();
  if (q === '') return entries;
  return entries.filter((e) => [e.title, CATEGORY_LABEL[e.category] ?? '', ...e.searchTerms].join(' ').toLowerCase().includes(q));
}

/** Groups entries by category, in order of first appearance. */
export function groupByCategory<E extends { category: string }>(entries: E[]): [string, E[]][] {
  const map = new Map<string, E[]>();
  for (const e of entries) map.set(e.category, [...(map.get(e.category) ?? []), e]);
  return [...map.entries()];
}
