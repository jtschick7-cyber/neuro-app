import { entryBanners, type BannerInput, type EntryBannerKey } from '../lib/banners';

const TONE: Record<EntryBannerKey, string> = {
  UNREVIEWED: 'border-red-500/60 bg-red-950/40 text-red-200',
  VERIFY: 'border-amber-500/60 bg-amber-950/30 text-amber-200',
  STALE: 'border-amber-500/60 bg-amber-950/30 text-amber-200',
  // Grey on purpose: informational, never hides the entry.
  NOT_US_MARKETED: 'border-slate-600 bg-slate-800/60 text-slate-400',
};

/** Banners for one entry (UNREVIEWED, VERIFY, STALE, NOT_US_MARKETED), in that order. */
export default function BannerList({ entry }: { entry: BannerInput }) {
  const banners = entryBanners(entry);
  if (banners.length === 0) return null;
  return (
    <div className="my-2 space-y-1">
      {banners.map((b) => (
        <p key={b.key} role="note" className={`rounded-md border px-2 py-1 text-xs ${TONE[b.key]}`}>
          {b.text}
        </p>
      ))}
    </div>
  );
}
