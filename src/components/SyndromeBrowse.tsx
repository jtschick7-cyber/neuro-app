import { useMemo, useState, type ReactNode } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { SYNDROME_FILTER } from '../content/copy';
import { SYNDROMES, groupBySyndrome, sortedTerms } from '../lib/syndromes';
import { toHash } from '../lib/route';

const TERMS = sortedTerms(SYNDROMES);

function Group({ title, items }: { title: string; items: { id: string; title: string }[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-sky-400">
        {title} · {items.length}
      </h2>
      <ul className="space-y-1.5">
        {items.map((e) => (
          <li key={e.id}>
            <a
              href={toHash({ kind: 'registry', registry: 'neural-antibodies', entryId: e.id })}
              className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-base text-slate-100 hover:border-sky-500"
            >
              {e.title}
              <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-slate-400" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Syndrome selector for the Antibodies tab. With no term selected it renders `children` (the normal list);
 * with one selected it replaces the list with Typical / Reported-less-common groups. Selection is in memory only.
 */
export default function SyndromeBrowse({ entries, children }: { entries: { id: string; title: string }[]; children: ReactNode }) {
  const [termId, setTermId] = useState('');
  const groups = useMemo(() => (termId ? groupBySyndrome(SYNDROMES, termId, entries) : null), [termId, entries]);

  return (
    <>
      <div className="flex items-center gap-2">
        <select
          value={termId}
          onChange={(e) => setTermId(e.target.value)}
          aria-label={SYNDROME_FILTER.label}
          className="h-10 min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900/90 px-3 text-base text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
        >
          <option value="">{SYNDROME_FILTER.label}…</option>
          {TERMS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        {termId && (
          <button
            type="button"
            onClick={() => setTermId('')}
            className="inline-flex h-10 shrink-0 items-center gap-1 rounded-lg border border-slate-700 px-3 text-sm text-slate-200 hover:border-sky-500"
          >
            <X size={16} aria-hidden="true" /> {SYNDROME_FILTER.clear}
          </button>
        )}
      </div>
      {groups ? (
        <>
          <p className="text-sm text-slate-300">{groups.term.definition}</p>
          <Group title={SYNDROME_FILTER.typical} items={groups.typical} />
          <Group title={SYNDROME_FILTER.lessCommon} items={groups.lessCommon} />
          {groups.typical.length + groups.lessCommon.length === 0 && <p className="text-sm text-slate-400">{SYNDROME_FILTER.empty}</p>}
        </>
      ) : (
        children
      )}
    </>
  );
}
