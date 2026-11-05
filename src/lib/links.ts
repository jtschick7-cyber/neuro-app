// Resolves cross-links ("registry:id", "calc:<id>", or a bare calculator id) to a label and a hash href.
// href is null when the target has no screen yet (or the id doesn't exist): the UI shows it as plain text, never a dead link.

import { CALCULATOR_META, type CalcMeta } from './calculators';
import { CAUTION_LISTS } from './registry';
import { CALC_CARD, getRegistry } from './nav';
import { toHash } from './route';

export interface ResolvedRef {
  ref: string;
  label: string;
  /** Kind of target, shown beside the label ("MG cautions", "Calculator"). */
  context: string;
  href: string | null;
}

function humanize(id: string): string {
  const s = id.replace(/-/g, ' ');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function calcTitle(id: string): string {
  const meta = (CALCULATOR_META as Record<string, CalcMeta | undefined>)[id];
  return meta?.title ?? humanize(id);
}

/** `ref` may be "calc:<id>", "<registry>:<id>", or (for `calculatorIds`) a bare calculator id. */
export function resolveRef(ref: string): ResolvedRef {
  const colon = ref.indexOf(':');
  const prefix = colon === -1 ? 'calc' : ref.slice(0, colon);
  const id = colon === -1 ? ref : ref.slice(colon + 1);

  if (prefix === 'calc') {
    return {
      ref,
      label: calcTitle(id),
      context: 'Calculator',
      href: id in CALC_CARD ? toHash({ kind: 'calc', calcId: id }) : null,
    };
  }

  const info = getRegistry(prefix);
  const context = info?.label ?? humanize(prefix);
  const list = CAUTION_LISTS.find((l) => l.id === prefix);
  if (list) {
    const entry = list.list.entries.find((e) => e.id === id);
    return {
      ref,
      label: entry?.title ?? humanize(id),
      context,
      href: entry && info ? toHash({ kind: 'registry', registry: info.id, entryId: id }) : null,
    };
  }
  // Other registries are lazy-loaded, so titles aren't available here: label from the id. Link when the registry
  // has a screen (a test checks every shipped cross-reference points at a real entry).
  return { ref, label: humanize(id), context, href: info?.built ? toHash({ kind: 'registry', registry: info.id, entryId: id }) : null };
}

export function resolveRefs(refs: string[]): ResolvedRef[] {
  return refs.map(resolveRef);
}
