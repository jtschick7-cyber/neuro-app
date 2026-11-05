import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { APP_NAME } from '../content/copy';
import { SECTIONS } from '../lib/nav';
import { search } from '../lib/search';

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
          placeholder="Search everything (e.g. TNK, Keppra, status, mag)"
          aria-label="Search all references and calculators"
          className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2.5 pl-10 pr-3 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
        />
      </div>
      {searching ? (
        <div>
          {failed && <p className="text-sm text-red-300">Couldn’t load search. Reload the app.</p>}
          {!failed && !index && <p className="text-sm text-slate-400">Loading…</p>}
          {index && hits.length === 0 && <p className="text-sm text-slate-400">No matches.</p>}
          <ul className="space-y-1.5">
            {hits.map((h) => (
              <li key={h.doc.href}>
                <a href={h.doc.href} className="block min-h-12 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 hover:border-sky-500">
                  <div className="text-base text-slate-100">{h.doc.title}</div>
                  <div className="text-xs text-slate-500">{h.doc.context}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="grid gap-2">
          {tiles.map((s) => (
            <li key={s.id}>
              <a href={s.hash} className="block rounded-xl border border-slate-700 bg-slate-900 p-4 hover:border-sky-500">
                <div className="text-base font-semibold text-slate-100">{s.label}</div>
                <div className="text-sm text-slate-400">{s.blurb}</div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
