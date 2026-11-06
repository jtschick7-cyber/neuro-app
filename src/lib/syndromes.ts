import type { SyndromeVocabularyData } from '../../schema/syndrome-vocabulary';
import syndromeRaw from '../../data/syndrome-vocabulary.json';

// Types come from the zod schema; `npm run validate:release` checks the JSON, so a cast avoids shipping zod.
export type SyndromeData = SyndromeVocabularyData;
export type SyndromeTermInfo = SyndromeData['vocabulary'][number];

export const SYNDROMES = syndromeRaw as unknown as SyndromeData;

export interface SyndromeGroups<E> {
  term: SyndromeTermInfo;
  /** typical=true mappings */
  typical: E[];
  /** typical=false mappings ("Reported, less common") */
  lessCommon: E[];
}

/** Vocabulary terms sorted by label, for the selector. */
export const sortedTerms = (data: SyndromeData): SyndromeTermInfo[] =>
  [...data.vocabulary].sort((a, b) => a.label.localeCompare(b.label));

/**
 * Antibodies mapped to a syndrome term, split Typical / less common, each sorted by title.
 * Only entries in `entries` are returned (so a text search can narrow the result). Null for an unknown term.
 */
export function groupBySyndrome<E extends { id: string; title: string }>(
  data: SyndromeData,
  termId: string,
  entries: readonly E[],
): SyndromeGroups<E> | null {
  const term = data.vocabulary.find((t) => t.id === termId);
  if (!term) return null;
  const byId = new Map(entries.map((e) => [e.id, e]));
  const pick = (typical: boolean): E[] =>
    data.mapping
      .filter((m) => m.syndromeTerm === termId && m.typical === typical)
      .flatMap((m) => byId.get(m.antibodyId) ?? [])
      .sort((a, b) => a.title.localeCompare(b.title));
  return { term, typical: pick(true), lessCommon: pick(false) };
}
