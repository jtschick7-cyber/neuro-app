import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { SEARCH_COPY } from '../content/copy';
import LoadError from './LoadError';
import { search } from '../lib/search';

type Index = typeof import('../lib/searchIndex').searchIndex;

// One shared promise: the index pulls in every registry (~770 KB), so it loads once, on first use.
let indexPromise: Promise<Index> | null = null;
function loadIndex(): Promise<Index> {
  indexPromise ??= import('../lib/searchIndex').then((m) => m.searchIndex);
  indexPromise.catch(() => {
    indexPromise = null;
  });
  return indexPromise;
}

/** Search input + results over every registry and calculator. `children` shows while the query is empty. */
export function GlobalSearch({ autoFocus = false, children }: { autoFocus?: boolean; children?: React.ReactNode }) {
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState<Index | null>(null);
  const [failed, setFailed] = useState(false);
  const [wanted, setWanted] = useState(autoFocus);

  useEffect(() => {
    if (!wanted || index) return;
    let live = true;
    loadIndex().then(
      (i) => live && setIndex(i),
      () => live && setFailed(true),
    );
    return () => {
      live = false;
    };
  }, [wanted, index]);

  const hits = useMemo(() => (index ? search(index, query) : []), [index, query]);
  const searching = query.trim() !== '';

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          autoFocus={autoFocus}
          onFocus={() => setWanted(true)}
          onChange={(e) => {
            setWanted(true);
            setQuery(e.target.value);
          }}
          placeholder={SEARCH_COPY.placeholder}
          aria-label={SEARCH_COPY.label}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/90 py-2.5 pl-10 pr-3 text-base text-slate-100 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
        />
      </div>
      {searching ? (
        <div>
          {failed && <LoadError message={SEARCH_COPY.failed} />}
          {!failed && !index && <p className="text-sm text-slate-400">{SEARCH_COPY.loading}</p>}
          {index && hits.length === 0 && <p className="text-sm text-slate-400">{SEARCH_COPY.none}</p>}
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
        children
      )}
    </div>
  );
}

/**
 * Floating search button (thumb reach, above the bottom nav) shown on every screen but Home.
 * Opens the same global search full-screen; one tap to open, one tap on a result.
 */
export function SearchLauncher() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);

  // Following a result (or any link / back) changes the hash: close the sheet.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('hashchange', close);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hashchange', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!open)
    return (
      <button
        ref={button}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={SEARCH_COPY.open}
        className="fixed right-3 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-sky-500/60 bg-slate-900/95 text-sky-300 shadow-lg shadow-black/40 backdrop-blur active:bg-slate-800"
        style={{ bottom: 'calc(4.25rem + env(safe-area-inset-bottom))', marginRight: 'env(safe-area-inset-right)' }}
      >
        <Search size={22} aria-hidden="true" />
      </button>
    );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={SEARCH_COPY.label}
      className="fixed inset-0 z-40 overflow-y-auto bg-slate-950"
      style={{
        paddingTop: 'calc(1rem + env(safe-area-inset-top))',
        paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
      }}
    >
      <div className="mx-auto max-w-3xl px-3">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-100">{SEARCH_COPY.title}</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={SEARCH_COPY.close}
            className="flex h-11 w-11 items-center justify-center rounded-md text-slate-300 active:bg-slate-800"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </div>
        <GlobalSearch autoFocus />
      </div>
    </div>
  );
}
