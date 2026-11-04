import BedsideNotes from './BedsideNotes';
import type { MgEntry, MgTier } from '../lib/registry';

const TIER_STYLES: Record<MgTier, string> = {
  ABSOLUTE_AVOID_BLACK_BOX: 'bg-red-600 text-white',
  HIGH_RISK_RELATIVE: 'bg-orange-500 text-black',
  CAUTIONARY_TRAP: 'bg-yellow-400 text-black',
};

export default function ReferenceCard({ entry }: { entry: MgEntry }) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-slate-100">{entry.class}</h3>
        <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TIER_STYLES[entry.tier]}`}>{entry.badgeLabel}</span>
      </div>
      <p className="text-sm text-slate-300">
        {entry.generics.join(', ')}
        {entry.brands.length > 0 && <span className="text-slate-500"> ({entry.brands.join(', ')})</span>}
      </p>
      <p className="mt-2 text-xs text-slate-400">
        <span className="font-semibold text-slate-300">Mechanism: </span>
        {entry.mechanism}
      </p>
      <p className="mt-2 text-sm text-slate-200">
        <span className="font-semibold">Pearl: </span>
        {entry.clinicalPearl}
      </p>
      {entry.safeInpatientAlternatives.length > 0 && (
        <div className="mt-2">
          <div className="text-xs font-semibold text-emerald-400">Safer alternatives</div>
          <ul className="list-inside list-disc text-sm text-slate-300">
            {entry.safeInpatientAlternatives.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      )}
      <BedsideNotes noteId={`mg-${entry.id}`} />
    </article>
  );
}
