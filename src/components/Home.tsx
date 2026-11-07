import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Search } from 'lucide-react';
import { APP_NAME, SEARCH_COPY } from '../content/copy';
import { SECTIONS, type SectionId } from '../lib/nav';
import { search } from '../lib/search';

/** Semantic accent per section: left border and blurb tint (static strings so Tailwind keeps them). */
const ACCENT: Partial<Record<SectionId, { border: string; text: string }>> = {
  acute: { border: 'border-l-rose-500', text: 'text-rose-400' },
  consults: { border: 'border-l-sky-400', text: 'text-sky-400' },
  drugs: { border: 'border-l-amber-500', text: 'text-amber-400' },
  antibodies: { border: 'border-l-purple-500', text: 'text-purple-400' },
  calc: { border: 'border-l-emerald-500', text: 'text-emerald-400' },
};

type Index = typeof import('../lib/searchIndex').searchIndex;

/** Landing screen: global search over every registry and calculator, then one tile per section. */
export default function Home() {
  const tiles = SECTIONS.filter((s) => s.built && s.id !== 'home');
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<Index | null>(null);
  const [failed, setFailed] = useState(false);
  const [wanted, setWanted] = useState(false);

  // The index pulls in every registry (~770 KB), so load it on first use, not at cold start.
  useEffect(() => {
    if (!wanted || index) return;
    import('../lib/searchIndex').then((m) => setIndex(m.searchIndex), () => setFailed(true));
  }, [wanted, index]);

  const hits = useMemo(() => (index ? search(index, query) : []), [index, query]);
  const searching = query.trim() !== '';

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold text-slate-100">{APP_NAME}</h1>
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onFocus={() => setWanted(true)}
          onChange={(e) => {
            setWanted(true);
            setQuery(e.target.value);
          }}
          placeholder="Search TNK, Keppra, status..."
          aria-label="Search all references and calculators"
          className="w-full rounded-lg border border-slate-700 bg-slate-900/90 py-2.5 pl-10 pr-3 text-base text-slate-100 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
        />
      </div>
      {searching ? (
        <div>
          {failed && <p className="text-sm text-red-300">Couldn’t load search. Reload the app.</p>}
          {!failed && !index && <p className="text-sm text-slate-400">Loading…</p>}
          {index && hits.length === 0 && <p className="text-sm text-slate-400">No matches.</p>}
          {hits.length > 0 && !hits[0].complete && <p className="mb-1.5 text-sm text-slate-400">{SEARCH_COPY.partial}</p>}
          <ul className="space-y-1.5">
            {hits.map((h) => (
              <li key={h.doc.href}>
                <a href={h.doc.href} className="block min-h-12 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:border-sky-500">
                  <div className="text-base text-slate-100">{h.doc.title}</div>
                  <div className="truncate text-xs text-slate-400">
                    {h.doc.context}
                    {h.section && <span className="text-slate-300"> · {h.section}</span>}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="grid gap-2">
          {tiles.map((s) => (
            <li key={s.id}>
              <a
                href={s.hash}
                className={`flex items-center justify-between gap-2 rounded-xl border border-l-4 border-slate-800 bg-slate-900/90 p-4 hover:border-sky-500 ${ACCENT[s.id]?.border ?? ''}`}
              >
                <div>
                  <div className="text-base font-semibold text-slate-100">{s.label}</div>
                  <div className={`text-sm ${ACCENT[s.id]?.text ?? 'text-slate-400'}`}>{s.blurb}</div>
                </div>
                <ChevronRight size={20} aria-hidden="true" className="shrink-0 text-slate-500" />
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
