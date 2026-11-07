// Pure global-search logic (no data imports, so it is cheap to load and easy to test).

import { SYNONYM_GROUPS } from './searchSynonyms';

/** Body text from one section of an entry ("Reversal · Andexanet alfa"), searched at the lowest weight. */
export interface BodyText {
  section: string;
  text: string;
}

export interface SearchDoc {
  /** Link target (a `#/…` hash). */
  href: string;
  title: string;
  /** Short kind label shown beside the result ("MG cautions", "Calculator"). */
  context: string;
  /** Extra match text: search terms, generics, brands, antigen names, aliases. */
  terms: string[];
  /** Entry body text by section (doses, notes, rules, pearls, workup tests, syndromes). */
  body?: BodyText[];
}

export interface SearchHit {
  doc: SearchDoc;
  score: number;
  /** Section a query word matched in, when it matched only the body (shown under the result). */
  section?: string;
  /** False when no entry matched every word and this is a best partial match. */
  complete: boolean;
}

const words = (s: string): string[] => s.toLowerCase().split(/[^a-z0-9α-ωβ]+/).filter((w) => w !== '');

interface PreparedBody {
  section: string;
  /** Words of the row name in the label ("Andexanet alfa" in "Reversal · Andexanet alfa"). */
  labelWords: string[];
  words: string[];
  text: string;
}

interface Prepared {
  doc: SearchDoc;
  titleWords: string[];
  termWords: string[];
  haystack: string;
  body: PreparedBody[];
}

export function prepare(docs: SearchDoc[]): Prepared[] {
  return docs.map((doc) => ({
    doc,
    titleWords: words(doc.title),
    termWords: doc.terms.flatMap(words),
    haystack: [doc.title, ...doc.terms].join(' ').toLowerCase(),
    body: (doc.body ?? []).map((b) => ({
      section: b.section,
      labelWords: b.section.includes(' · ') ? words(b.section.slice(b.section.indexOf(' · '))) : [],
      words: [...new Set(words(b.text))],
      text: b.text.toLowerCase(),
    })),
  }));
}

/**
 * Weights (task 3.1): title 3, terms 2, body 1 (1.5 when the word names the body row). Plain substrings count only for
 * words of 5+ letters (task 3.4).
 */
const W = { title: 3, terms: 2, substring: 1, bodyLabel: 1.5, body: 1, bodySubstring: 0.5 };
const MIN_SUBSTRING = 5;

interface WordMatch {
  score: number;
  section?: string;
}
const NO_MATCH: WordMatch = { score: 0 };

/** `exact`: whole-word matches only (synonym expansions, so "MT" doesn't reach "MTB" or "mtDNA"). */
function wordScore(word: string, p: Prepared, exact: boolean): WordMatch {
  const hit = (w: string) => (exact ? w === word : w.startsWith(word));
  if (p.titleWords.some(hit)) return { score: W.title };
  if (p.termWords.some(hit)) return { score: W.terms };
  const long = !exact && word.length >= MIN_SUBSTRING;
  if (long && p.haystack.includes(word)) return { score: W.substring };
  const named = p.body.find((s) => s.labelWords.some(hit));
  if (named) return { score: W.bodyLabel, section: named.section };
  const b = p.body.find((s) => s.words.some(hit));
  if (b) return { score: W.body, section: b.section };
  const bs = long ? p.body.find((s) => s.text.includes(word)) : undefined;
  return bs ? { score: W.bodySubstring, section: bs.section } : NO_MATCH;
}

/** Query word → alternatives (each a list of words that must all match): the word itself, then its synonyms. */
const SYNONYMS = new Map<string, string[][]>();
for (const group of SYNONYM_GROUPS) {
  const members = group.map(words);
  for (const m of members) {
    if (m.length !== 1) continue;
    const alts = SYNONYMS.get(m[0]) ?? [];
    for (const other of members) if (other.join(' ') !== m[0]) alts.push(other);
    SYNONYMS.set(m[0], alts);
  }
}

export function alternatives(token: string): string[][] {
  return [[token], ...(SYNONYMS.get(token) ?? [])];
}

/** Best match for one query token across its alternatives; a phrase alternative scores as its weakest word. */
function tokenScore(token: string, p: Prepared): WordMatch {
  let best = NO_MATCH;
  alternatives(token).forEach((alt, i) => {
    let worst: WordMatch | undefined;
    for (const w of alt) {
      const m = wordScore(w, p, i > 0);
      if (worst === undefined || m.score < worst.score) worst = m;
      if (m.score === 0) break;
    }
    if (worst && worst.score > best.score) best = worst;
  });
  return best;
}

/**
 * Entries matching every token, sorted by total score then original order. If none match every token, falls back to
 * the best partial matches (most tokens matched, then score; task 3.2). Empty query → no results.
 */
export function search(index: Prepared[], query: string, limit = 40): SearchHit[] {
  const tokens = [...new Set(words(query))];
  if (tokens.length === 0) return [];
  const hits: (SearchHit & { order: number; matched: number })[] = [];
  index.forEach((p, order) => {
    let score = 0;
    let matched = 0;
    let section: string | undefined;
    for (const t of tokens) {
      const m = tokenScore(t, p);
      if (m.score === 0) continue;
      matched += 1;
      score += m.score;
      section ??= m.section;
    }
    if (matched > 0) hits.push({ doc: p.doc, score, section, complete: matched === tokens.length, order, matched });
  });
  const complete = hits.filter((h) => h.complete);
  const pool = complete.length > 0 ? complete : hits;
  pool.sort((a, b) => b.matched - a.matched || b.score - a.score || a.order - b.order);
  return pool.slice(0, limit).map(({ doc, score, section, complete: c }) => ({ doc, score, section, complete: c }));
}
