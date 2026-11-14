/** Shared helpers for P2-2 source types: collect an entry's citations and read a citation's year. */

/** Every citation string under any `sources` array in a value (entries nest sources in cells, notes and rows). */
export function collectSources(value: unknown, out: Set<string> = new Set()): Set<string> {
  if (Array.isArray(value)) for (const v of value) collectSources(v, out);
  else if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) {
      if (k === "sources" && Array.isArray(v)) for (const s of v) if (typeof s === "string") out.add(s);
      collectSources(v, out);
    }
  return out;
}

/** Largest 19xx/20xx year in the citation text before any doi or URL (so DOI digits are never read as years). */
export function citationYear(citation: string): number | null {
  const text = citation.split(/\bdoi:|https?:\/\//i)[0];
  const years = (text.match(/\b(19|20)\d{2}\b/g) ?? []).map(Number);
  return years.length ? Math.max(...years) : null;
}

/** Newest year among an entry's GUIDELINE/LABEL citations, or null when it cites none. */
export function newestGuidelineYear(entry: unknown, types: Record<string, string>): number | null {
  const years = [...collectSources(entry)]
    .filter((s) => types[s] === "GUIDELINE" || types[s] === "LABEL")
    .map(citationYear)
    .filter((y): y is number => y !== null);
  return years.length ? Math.max(...years) : null;
}
