// Pure global-search logic (no data imports, so it is cheap to load and easy to test).

export interface SearchDoc {
  /** Link target (a `#/…` hash). */
  href: string;
  title: string;
  /** Short kind label shown beside the result ("MG cautions", "Calculator"). */
  context: string;
  /** Extra match text: search terms, generics, brands, antigen names, aliases. */
  terms: string[];
}

export interface SearchHit {
  doc: SearchDoc;
  score: number;
}

const words = (s: string): string[] => s.toLowerCase().split(/[^a-z0-9α-ωβ]+/).filter((w) => w !== '');

interface Prepared {
  doc: SearchDoc;
  titleWords: string[];
  termWords: string[];
  haystack: string;
}

export function prepare(docs: SearchDoc[]): Prepared[] {
  return docs.map((doc) => ({
    doc,
    titleWords: words(doc.title),
    termWords: doc.terms.flatMap(words),
    haystack: [doc.title, ...doc.terms].join(' ').toLowerCase(),
  }));
}

/** Score for one query token: word-prefix in the title 3, in other terms 2, plain substring (4+ chars) 1; 0 = no match. */
function tokenScore(token: string, p: Prepared): number {
  if (p.titleWords.some((w) => w.startsWith(token))) return 3;
  if (p.termWords.some((w) => w.startsWith(token))) return 2;
  if (token.length >= 4 && p.haystack.includes(token)) return 1;
  return 0;
}

/** Every query token must match; results sorted by total score, then original order. Empty query → no results. */
export function search(index: Prepared[], query: string, limit = 40): SearchHit[] {
  const tokens = words(query);
  if (tokens.length === 0) return [];
  const hits: (SearchHit & { order: number })[] = [];
  index.forEach((p, order) => {
    let score = 0;
    for (const t of tokens) {
      const s = tokenScore(t, p);
      if (s === 0) return;
      score += s;
    }
    hits.push({ doc: p.doc, score, order });
  });
  hits.sort((a, b) => b.score - a.score || a.order - b.order);
  return hits.slice(0, limit).map(({ doc, score }) => ({ doc, score }));
}
