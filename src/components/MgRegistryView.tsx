import { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import DrugTabs from './DrugTabs';
import ReferenceCard from './ReferenceCard';
import { CAUTION_LISTS, searchCautionEntries } from '../lib/registry';
import type { CautionListId } from '../lib/nav';
import { toHash } from '../lib/route';

/** Drug caution lists (MG, seizure threshold, RCVS triggers). The list and optional entry come from the route. */
export default function MgRegistryView({ listId, entryId }: { listId: CautionListId; entryId?: string }) {
  const [query, setQuery] = useState('');
  const info = CAUTION_LISTS.find((l) => l.id === listId) ?? CAUTION_LISTS[0];
  const results = useMemo(() => searchCautionEntries(info.list.entries, query), [info, query]);

  if (entryId !== undefined) {
    const entry = info.list.entries.find((e) => e.id === entryId);
    return (
      <div className="space-y-3">
        <a href={toHash({ kind: 'registry', registry: info.id })} className="inline-flex min-h-10 items-center gap-1 text-sm text-sky-300">
          <ArrowLeft size={16} aria-hidden="true" /> {info.label}
        </a>
        {entry ? (
          <ReferenceCard entry={entry} listId={info.id} detail />
        ) : (
          <p className="text-sm text-slate-400">
            No entry “{entryId}” in {info.label}.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <DrugTabs active={info.id} />
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search drug, brand, or class (e.g. cipro, Botox)"
          aria-label={`Search ${info.label} list`}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2 pl-10 pr-3 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
        />
      </div>
      <p className="text-xs text-slate-400">
        {info.list.condition} · {results.length} of {info.list.entries.length} · v{info.list.version}
      </p>
      {info.list.scopeNotes.map((n) => (
        <p key={n} className="text-xs text-slate-400">
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
