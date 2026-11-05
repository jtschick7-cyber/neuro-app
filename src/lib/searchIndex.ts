// Builds the global search index over every registry and calculator. Imports all registry JSON, so the UI loads this
// module lazily (dynamic import) the first time the user searches.

import acuteRaw from '../../data/acute-neuro.json';
import consultRaw from '../../data/consult-workups.json';
import vascularRaw from '../../data/vascular-antithrombotics.json';
import antibodyRaw from '../../data/neural-antibodies.json';
import asmRaw from '../../data/asm-interactions.json';
import { CALCULATOR_META } from './calculators';
import { CAUTION_LISTS } from './registry';
import { CALC_CARD, getRegistry, type RegistryId } from './nav';
import { toHash } from './route';
import { prepare, type SearchDoc } from './search';

interface Row {
  id: string;
  title?: string;
  antigen?: string;
  searchTerms: string[];
  [k: string]: unknown;
}
const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);

function registryDocs(registry: RegistryId, entries: Row[], extra: (e: Row) => string[] = () => []): SearchDoc[] {
  const context = getRegistry(registry)?.label ?? registry;
  return entries.map((e) => ({
    href: toHash({ kind: 'registry', registry, entryId: e.id }),
    title: e.title ?? e.antigen ?? e.id,
    context,
    terms: [...e.searchTerms, ...extra(e)],
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
  'lacosamide-load': ['Vimpat', 'status epilepticus', 'seizure'],
  'hypertonic-saline-bolus': ['3% saline', '23.4%', 'ICP', 'herniation', 'cerebral edema'],
  'mannitol-dose': ['ICP', 'herniation', 'osmolar gap', 'cerebral edema'],
  'tnk-dose': ['TNK', 'TNKase', 'thrombolysis', 'lytic', 'stroke'],
  'alteplase-dose': ['tPA', 'Activase', 'thrombolysis', 'lytic', 'stroke'],
  'ich-score': ['ICH', 'intracerebral hemorrhage', 'hemorrhage'],
  abcd2: ['TIA', 'transient ischemic attack'],
  'cha2ds2-vasc': ['atrial fibrillation', 'AF', 'anticoagulation'],
  'has-bled': ['atrial fibrillation', 'AF', 'bleeding', 'anticoagulation'],
  'cockcroft-gault': ['CrCl', 'creatinine clearance', 'renal dosing'],
  ledd: ['levodopa', 'Parkinson', 'levodopa equivalent'],
  'ivig-dose': ['immune globulin', 'intravenous immunoglobulin', 'GBS', 'CIDP', 'myasthenia'],
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
  for (const l of CAUTION_LISTS) {
    docs.push(...registryDocs(l.id, l.list.entries as unknown as Row[], (e) => [String(e.drugClass ?? ''), ...strings(e.generics), ...strings(e.brands)]));
  }
  return docs.filter((d) => d.title !== '');
}

export const searchIndex = prepare(buildDocs());
