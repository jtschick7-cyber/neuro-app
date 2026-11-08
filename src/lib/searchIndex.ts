// Builds the global search index over every registry and calculator. Imports all registry JSON, so the UI loads this
// module lazily (dynamic import) the first time the user searches.

import acuteRaw from '../../data/acute-neuro.json';
import consultRaw from '../../data/consult-workups.json';
import vascularRaw from '../../data/vascular-antithrombotics.json';
import antibodyRaw from '../../data/neural-antibodies.json';
import asmRaw from '../../data/asm-interactions.json';
import asmDosingRaw from '../../data/antiseizure-medications.json';
import referenceRaw from '../../data/reference-cards.json';
import { CALCULATOR_META } from './calculators';
import { CAUTION_LISTS } from './registry';
import { CALC_CARD, getRegistry, type RegistryId } from './nav';
import { toHash } from './route';
import { prepare, type BodyText, type SearchDoc } from './search';

interface Row {
  id: string;
  title?: string;
  antigen?: string;
  searchTerms: string[];
  [k: string]: unknown;
}
const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);

/**
 * Entry fields indexed as body text (task 3.1), with the section label shown when a query matches only there.
 * Every other field is listed in `NOT_BODY`; a test fails if a registry gains a field that is in neither.
 */
export const BODY_SECTIONS: Record<string, string> = {
  // acute-neuro
  presentation: 'Presentation', definitions: 'Definitions', immediateActions: 'Immediate actions', workup: 'Workup',
  treatment: 'Treatment', pitfalls: 'Pitfalls', escalateWhen: 'Escalate when', institutionVaries: 'Varies by institution',
  // consult-workups
  consultQuestion: 'Consult question', keyHistory: 'Key history', keyExam: 'Key exam', redFlags: 'Red flags',
  differential: 'Differential', decisionRules: 'Decision rules', initialSteps: 'Initial steps', disposition: 'Disposition',
  pearls: 'Pearls',
  // vascular-antithrombotics
  mechanism: 'Mechanism', uses: 'Uses and doses', renalHepatic: 'Renal / hepatic', timing: 'Timing', reversal: 'Reversal',
  monitoring: 'Monitoring', interactions: 'Interactions', pregnancy: 'Pregnancy', question: 'Question',
  population: 'Population', rules: 'Rules', options: 'Options', contraindications: 'Contraindications',
  esoDiffers: 'ESO guideline differs',
  // neural-antibodies
  syndromes: 'Syndromes', demographics: 'Demographics', tumors: 'Tumor associations', cancerScreening: 'Cancer screening',
  testing: 'Testing', csf: 'CSF', mri: 'MRI', otherTests: 'Other tests',
  // asm-interactions, antiseizure-medications
  effect: 'Effect', management: 'Management', maintenance: 'Maintenance', renal: 'Renal', renalNotes: 'Renal',
  hepatic: 'Hepatic', ivPo: 'IV ↔ PO', enteral: 'Enteral', levels: 'Levels',
  // reference-cards (each `sections[]` item uses its own heading), caution lists
  scopeNote: 'Scope', sections: 'Sections', keyNumbers: 'Key numbers', saferAlternatives: 'Safer alternatives',
  fdaBoxedWarning: 'Boxed warning',
};

/** Fields that are not body text: identity, titles/terms (indexed separately), enums, links, review metadata. */
export const NOT_BODY = new Set([
  'id', 'kind', 'title', 'antigen', 'searchTerms', 'category', 'drugClass', 'subclass', 'antigenClass', 'pnsRisk',
  'immunotherapyResponse', 'tier', 'formularyStatus', 'usMarketed', 'generics', 'brands', 'objectDrugs',
  'precipitantDrugs', 'calculatorIds', 'relatedIds', 'sources', 'verify', 'lastReviewed',
]);

/** Item fields that name a row, appended to the section label ("Reversal · Andexanet alfa"). */
const ITEM_LABEL_KEYS = ['agent', 'test', 'name', 'drug', 'parameter', 'label'] as const;
/** Enum values (UPPER_SNAKE) are badges, not text worth matching. */
const isEnum = (s: string) => /^[A-Z][A-Z0-9_]*$/.test(s);

function collect(value: unknown, out: string[]): void {
  if (typeof value === 'string') {
    if (!isEnum(value)) out.push(value);
  } else if (Array.isArray(value)) {
    for (const v of value) collect(v, out);
  } else if (value !== null && typeof value === 'object') {
    for (const v of Object.values(value)) collect(v, out);
  }
}

function itemLabel(item: unknown): string | undefined {
  if (item === null || typeof item !== 'object') return undefined;
  const rec = item as Record<string, unknown>;
  for (const k of ITEM_LABEL_KEYS) if (typeof rec[k] === 'string' && rec[k] !== '') return rec[k] as string;
  return undefined;
}

/** Body text of one entry, one block per section (or per labelled row within a section). */
export function bodyOf(e: Row): BodyText[] {
  const body: BodyText[] = [];
  const push = (section: string, value: unknown) => {
    const out: string[] = [];
    collect(value, out);
    if (out.length > 0) body.push({ section, text: out.join(' · ') });
  };
  for (const [key, value] of Object.entries(e)) {
    const label = BODY_SECTIONS[key];
    if (label === undefined) continue;
    if (key === 'sections' && Array.isArray(value)) {
      for (const s of value as { heading?: unknown }[]) push(typeof s.heading === 'string' ? s.heading : label, s);
    } else if (Array.isArray(value) && value.some((v) => itemLabel(v) !== undefined)) {
      for (const v of value) {
        const item = itemLabel(v);
        push(item === undefined ? label : `${label} · ${item}`, v);
      }
    } else {
      push(label, value);
    }
  }
  return body;
}

function registryDocs(registry: RegistryId, entries: Row[], extra: (e: Row) => string[] = () => []): SearchDoc[] {
  const context = getRegistry(registry)?.label ?? registry;
  return entries.map((e) => ({
    href: toHash({ kind: 'registry', registry, entryId: e.id }),
    title: e.title ?? e.antigen ?? e.id,
    context,
    terms: [...e.searchTerms, ...extra(e)],
    body: bodyOf(e),
  }));
}

/**
 * Search-only aliases for calculators (brand and shorthand names). These are not clinical content and do not
 * appear anywhere in the UI; they just let "Keppra" or "TNKase" find the right calculator.
 */
export const CALC_ALIASES: Record<string, string[]> = {
  'levetiracetam-load': ['Keppra', 'status epilepticus', 'seizure'],
  'valproate-load': ['Depacon', 'Depakote', 'valproic acid', 'status epilepticus', 'seizure'],
  'fosphenytoin-load': ['Cerebyx', 'Sesquient', 'phenytoin', 'Dilantin', 'status epilepticus', 'seizure'],
  'phenytoin-correction': ['phenytoin level', 'free phenytoin', 'albumin', 'Sheiner-Tozer', 'Winter-Tozer', 'Dilantin', 'Cerebyx', 'reload'],
  'hypertonic-saline-bolus': ['3% saline', '23.4%', 'ICP', 'herniation', 'cerebral edema'],
  'mannitol-dose': ['ICP', 'herniation', 'osmolar gap', 'cerebral edema'],
  'cockcroft-gault': ['CrCl', 'creatinine clearance', 'renal dosing'],
  ledd: ['levodopa', 'Parkinson', 'levodopa equivalent'],
  'sodium-correction': ['hyponatremia', '3% saline', 'ODS', 'osmotic demyelination', 'SALSA', 'ESE'],
};

export function buildDocs(): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const id of Object.keys(CALC_CARD)) {
    const meta = (CALCULATOR_META as Record<string, { title: string } | undefined>)[id];
    docs.push({
      href: toHash({ kind: 'calc', calcId: id }),
      title: meta?.title ?? id,
      context: 'Calculator',
      terms: [id.replace(/-/g, ' '), ...(CALC_ALIASES[id] ?? [])],
    });
  }
  docs.push(...registryDocs('acute-neuro', acuteRaw.entries as unknown as Row[], (e) => [String(e.category).replace(/_/g, ' ')]));
  docs.push(...registryDocs('consult-workups', consultRaw.entries as unknown as Row[], (e) => [String(e.category).replace(/_/g, ' ')]));
  docs.push(...registryDocs('vascular-antithrombotics', vascularRaw.entries as unknown as Row[], (e) => [String(e.subclass ?? ''), String(e.drugClass ?? '')]));
  docs.push(...registryDocs('neural-antibodies', antibodyRaw.entries as unknown as Row[]));
  docs.push(...registryDocs('asm-interactions', asmRaw.entries as unknown as Row[], (e) => [...strings(e.objectDrugs), ...strings(e.precipitantDrugs)]));
  docs.push(...registryDocs('antiseizure-medications', asmDosingRaw.entries as unknown as Row[], (e) =>
    (Array.isArray(e.maintenance) ? (e.maintenance as { agent: string }[]).map((m) => m.agent) : [])));
  docs.push(...registryDocs('reference-cards', referenceRaw.entries as unknown as Row[], (e) => {
    const sections = (Array.isArray(e.sections) ? e.sections : []) as { heading: string; rows: { parameter?: string; test?: string }[] }[];
    return sections.flatMap((s) => [s.heading, ...s.rows.map((r) => r.parameter ?? r.test ?? '')]).filter((t) => t !== '');
  }));
  for (const l of CAUTION_LISTS) {
    docs.push(...registryDocs(l.id, l.list.entries as unknown as Row[], (e) => [String(e.drugClass ?? ''), ...strings(e.generics), ...strings(e.brands)]));
  }
  return docs.filter((d) => d.title !== '');
}

export const searchIndex = prepare(buildDocs());
