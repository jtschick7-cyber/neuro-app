import { footerText } from '../lib/banners';
import about from '../../generated/about.json';

/** Footer for every registry entry: decision-support line with review date and content version, then the entry id. */
export default function EntryFooter({ registryId, entryId, lastReviewed }: { registryId: string; entryId: string; lastReviewed: string }) {
  return (
    <div className="mt-2 text-[11px] text-slate-400">
      <p>{footerText(lastReviewed, about.contentVersion)}</p>
      <p className="text-slate-400">
        {registryId}:{entryId}
      </p>
    </div>
  );
}
