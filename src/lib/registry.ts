import type { z } from 'zod';
import type { CautionEntry as CautionEntrySchema, CautionListRegistry, CautionTier as CautionTierSchema } from '../../schema/caution-list';
import mgRaw from '../../data/mg-contraindications.json';
import seizureRaw from '../../data/seizure-threshold.json';
import rcvsRaw from '../../data/rcvs-triggers.json';

// Types come from the zod schemas. The JSON is validated by `npm run validate:release` in CI,
// so a type assertion here avoids shipping zod in the app bundle.
export type CautionList = z.infer<typeof CautionListRegistry>;
export type CautionEntry = z.infer<typeof CautionEntrySchema>;
export type CautionTier = z.infer<typeof CautionTierSchema>;

export interface CautionListInfo {
  id: string;
  label: string;
  list: CautionList;
}

export const CAUTION_LISTS: CautionListInfo[] = [
  { id: 'mg-contraindications', label: 'Myasthenia gravis', list: mgRaw as unknown as CautionList },
  { id: 'seizure-threshold', label: 'Seizure threshold', list: seizureRaw as unknown as CautionList },
  { id: 'rcvs-triggers', label: 'RCVS triggers', list: rcvsRaw as unknown as CautionList },
];

const TIER_ORDER: Record<CautionTier, number> = { AVOID: 0, HIGH_RISK: 1, CAUTION: 2 };

/** Filter by free text, then sort: US-marketed first (non-US shown last, never hidden), then tier severity. */
export function searchCautionEntries(entries: CautionEntry[], query: string): CautionEntry[] {
  const q = query.trim().toLowerCase();
  const hits =
    q === ''
      ? entries
      : entries.filter((e) =>
          [e.title, e.drugClass, ...e.searchTerms, ...e.generics, ...e.brands, ...e.effect, ...e.pearls]
            .join(' ')
            .toLowerCase()
            .includes(q),
        );
  return [...hits].sort(
    (a, b) => Number(!a.usMarketed) - Number(!b.usMarketed) || TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
  );
}
