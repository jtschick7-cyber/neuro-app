import { Link2 } from 'lucide-react';
import { resolveRef } from '../lib/links';

/** Cross-links from an entry: `relatedIds` ("registry:id", "calc:id") plus `calculatorIds` (bare calculator ids). Targets without a screen show as plain grey text. */
export default function RelatedLinks({ relatedIds, calculatorIds = [] }: { relatedIds: string[]; calculatorIds?: string[] }) {
  const refs = [...new Set([...relatedIds, ...calculatorIds.map((c) => `calc:${c}`)])].map(resolveRef);
  if (refs.length === 0) return null;
  return (
    <div className="mt-2">
      <div className="text-xs font-semibold text-slate-400">Related</div>
      <ul className="mt-1 flex flex-wrap gap-1.5">
        {refs.map((r) => (
          <li key={r.ref}>
            {r.href ? (
              <a
                href={r.href}
                className="inline-flex min-h-8 items-center gap-1 rounded-full border border-sky-700 bg-sky-950/40 px-2.5 py-1 text-xs text-sky-200 hover:bg-sky-900/50"
              >
                <Link2 size={12} aria-hidden="true" />
                <span>{r.label}</span>
                <span className="text-sky-400/70">· {r.context}</span>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-400">
                {r.label} <span className="text-slate-400">· {r.context}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
