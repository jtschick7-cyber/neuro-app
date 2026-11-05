import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import ReferenceCard from './ReferenceCard';
import { CAUTION_LISTS, searchCautionEntries } from '../lib/registry';

/** Drug caution lists (MG, seizure threshold, RCVS triggers) — one screen, list chosen by the selector. */
export default function MgRegistryView() {
  const [listId, setListId] = useState(CAUTION_LISTS[0].id);
  const [query, setQuery] = useState('');
  const info = CAUTION_LISTS.find((l) => l.id === listId) ?? CAUTION_LISTS[0];
  const results = useMemo(() => searchCautionEntries(info.list.entries, query), [info, query]);

  return (
    <div className="space-y-3">
      <div className="flex gap-1 rounded-lg bg-slate-900 p-1" role="tablist" aria-label="Caution list">
        {CAUTION_LISTS.map((l) => (
          <button
            key={l.id}
            role="tab"
            aria-selected={l.id === listId}
            onClick={() => setListId(l.id)}
            className={`flex-1 rounded-md px-2 py-1.5 text-xs font-medium ${l.id === listId ? 'bg-slate-700 text-slate-100' : 'text-slate-400'}`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search drug, brand, or class (e.g. cipro, Botox)"
          aria-label={`Search ${info.label} list`}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2 pl-10 pr-3 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
        />
      </div>
      <p className="text-xs text-slate-500">
        {info.list.condition} · {results.length} of {info.list.entries.length} · v{info.list.version}
      </p>
      {info.list.scopeNotes.map((n) => (
        <p key={n} className="text-xs text-slate-500">
          {n}
        </p>
      ))}
      {results.map((e) => (
        <ReferenceCard key={e.id} entry={e} listId={info.id} />
      ))}
      {results.length === 0 && <p className="text-sm text-slate-400">No matches.</p>}
    </div>
  );
}
