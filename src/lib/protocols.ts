import type { z } from 'zod';
import type { AcuteNeuroEntry as AcuteSchema, AcuteNeuroRegistry } from '../../schema/acute-neuro';
import type { InteractionEntry as InteractionSchema } from '../../schema/drug-interactions';
import asmRaw from '../../data/asm-interactions.json';
import type { NeuralAntibodyEntry as AntibodySchema } from '../../schema/neural-antibodies';
import type { VascularAntithromboticEntry as VascularSchema } from '../../schema/vascular-antithrombotics';
import type { ConsultWorkupEntry as ConsultSchema } from '../../schema/consult-workups';

export type AcuteEntry = z.infer<typeof AcuteSchema>;
export type ConsultEntry = z.infer<typeof ConsultSchema>;
export type VascularEntry = z.infer<typeof VascularSchema> & { category: string };
/** Antibody entries gain `title` (the antigen) and `category` (antigen class) so they fit the shared list screen. */
export type AntibodyEntry = z.infer<typeof AntibodySchema> & { title: string; category: string };
/** Interaction entries gain `category` (their tier) so they fit the shared list screen. */
export type InteractionEntry = z.infer<typeof InteractionSchema> & { category: string };
export interface ProtocolRegistry<E> {
  title: string;
  scopeNotes?: string[];
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

export const loadVascular = (): Promise<ProtocolRegistry<VascularEntry>> =>
  import('../../data/vascular-antithrombotics.json').then((m) => {
    const d = m.default as unknown as ProtocolRegistry<z.infer<typeof VascularSchema>>;
    return { ...d, entries: d.entries.map((e) => ({ ...e, category: e.kind === 'AGENT' ? e.drugClass : 'DECISION' })) };
  });
export const loadAntibodies = (): Promise<ProtocolRegistry<AntibodyEntry>> =>
  import('../../data/neural-antibodies.json').then((m) => {
    const d = m.default as unknown as ProtocolRegistry<z.infer<typeof AntibodySchema>>;
    return { ...d, entries: d.entries.map((e) => ({ ...e, title: e.antigen, category: e.antigenClass })) };
  });

// Small (7 KB), so bundled directly rather than lazy-loaded.
const TIER_ORDER: Record<string, number> = { AVOID: 0, HIGH_RISK: 1, CAUTION: 2 };
export const loadInteractions = (): Promise<ProtocolRegistry<InteractionEntry>> => {
  const d = asmRaw as unknown as ProtocolRegistry<z.infer<typeof InteractionSchema>>;
  const entries = d.entries.map((e) => ({ ...e, category: e.tier })).sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier]);
  return Promise.resolve({ ...d, entries });
};

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
  AVOID: 'Avoid',
  HIGH_RISK: 'High risk',
  CAUTION: 'Caution',
  ANTIPLATELET: 'Antiplatelets',
  ANTICOAGULANT: 'Anticoagulants',
  THROMBOLYTIC: 'Thrombolytics',
  REVERSAL: 'Reversal agents',
  DECISION: 'Decision guides',
  NEURONAL_SURFACE: 'Neuronal surface antigens',
  INTRACELLULAR: 'Intracellular antigens',
  INTRACELLULAR_SYNAPTIC: 'Intracellular synaptic antigens',
  GLIAL: 'Glial antigens',
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
