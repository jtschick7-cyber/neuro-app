import BedsideNotes from './BedsideNotes';
import BannerList from './BannerList';
import EntryFooter from './EntryFooter';
import RelatedLinks from './RelatedLinks';
import { MG_TIER_LEGEND } from '../content/copy';
import { toHash } from '../lib/route';
import { isCautionListId } from '../lib/nav';
import type { CautionEntry, CautionTier } from '../lib/registry';

const TIER_STYLES: Record<CautionTier, string> = {
  AVOID: 'bg-red-600 text-white',
  HIGH_RISK: 'bg-orange-500 text-black',
  CAUTION: 'bg-yellow-400 text-black',
};
const TIER_LABEL: Record<CautionTier, string> = { AVOID: 'Avoid', HIGH_RISK: 'High risk', CAUTION: 'Caution' };
const TIER_HELP = Object.fromEntries(MG_TIER_LEGEND) as Record<CautionTier, string>;

function Bullets({ label, items, tone = 'text-slate-300' }: { label: string; items: string[]; tone?: string }) {
  if (items.length === 0) return null;
  return (
    <div className="mt-2">
      <div className="text-xs font-semibold text-slate-400">{label}</div>
      <ul className={`list-inside list-disc text-sm ${tone}`}>
        {items.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

/** One entry of a condition-specific caution list (MG, seizure threshold, RCVS). Badge is derived, never free text. */
export default function ReferenceCard({ entry, listId, detail = false }: { entry: CautionEntry; listId: string; detail?: boolean }) {
  return (
    <article className={`rounded-xl border border-slate-700 bg-slate-900 p-4 ${entry.usMarketed ? '' : 'opacity-60'}`}>
      <div className="mb-1 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-slate-100">
          {detail || !isCautionListId(listId) ? (
            entry.title
          ) : (
            <a href={toHash({ kind: 'registry', registry: listId, entryId: entry.id })} className="hover:text-sky-300">
              {entry.title}
            </a>
          )}
        </h3>
        <span title={TIER_HELP[entry.tier]} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TIER_STYLES[entry.tier]}`}>
          {TIER_LABEL[entry.tier]}
        </span>
        {entry.fdaBoxedWarning && (
          <span className="rounded-full border border-red-400 px-2 py-0.5 text-xs font-semibold text-red-300">FDA boxed warning</span>
        )}
      </div>
      <BannerList entry={entry} />
      <p className="text-sm text-slate-300">
        {entry.generics.join(', ')}
        {entry.brands.length > 0 && <span className="text-slate-500"> ({entry.brands.join(', ')})</span>}
      </p>
      <Bullets label="Effect" items={entry.effect} tone="text-slate-200" />
      <Bullets label="Mechanism" items={entry.mechanism} tone="text-slate-400" />
      <Bullets label="Pearls" items={entry.pearls} tone="text-slate-200" />
      <Bullets label="Safer alternatives" items={entry.saferAlternatives} tone="text-emerald-300" />
      <Bullets label="VERIFY" items={entry.verify} tone="text-amber-300" />
      <RelatedLinks relatedIds={entry.relatedIds} />
      <details className="mt-2 text-xs text-slate-500">
        <summary className="cursor-pointer">Sources</summary>
        <ul className="mt-1 list-inside list-disc">
          {entry.sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </details>
      <EntryFooter registryId={listId} entryId={entry.id} lastReviewed={entry.lastReviewed} />
      {/* MG notes keep their original key (`mg-<id>`) so notes saved by earlier builds still appear. */}
      <BedsideNotes noteId={listId === 'mg-contraindications' ? `mg-${entry.id}` : `${listId}-${entry.id}`} />
    </article>
  );
}
