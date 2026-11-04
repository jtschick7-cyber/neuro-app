import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import ReferenceCard from './ReferenceCard';
import { mgRegistry, searchMgEntries } from '../lib/registry';

export default function MgRegistryView() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => searchMgEntries(mgRegistry.entries, query), [query]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search drug, brand, or class (e.g. cipro, Botox)"
          aria-label="Search MG contraindications"
          className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2 pl-10 pr-3 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
        />
      </div>
      <p className="text-xs text-slate-500">
        {results.length} of {mgRegistry.entries.length} entries · v{mgRegistry.version}
      </p>
      {results.map((e) => (
        <ReferenceCard key={e.id} entry={e} />
      ))}
      {results.length === 0 && <p className="text-sm text-slate-400">No matches.</p>}
    </div>
  );
}
