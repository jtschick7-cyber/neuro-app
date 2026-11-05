import { z } from "zod";
import { IsoDate, KebabId, RelatedId, ReviewDate, SemVer, Source, Text } from "./common";

/**
 * Condition-specific drug caution lists ("drug X in condition Y"): MG, seizure threshold, RCVS triggers.
 * One file per condition; the registry names the condition. Replaces the MG-only schema (v2) — the MG data
 * migrated unchanged except fdaBoxedWarningMg → fdaBoxedWarning.
 *
 * Tier wording (map from each source's own language; record the wording in pearls):
 *   AVOID     — "avoid" / "should not be used" / "contraindicated"
 *   HIGH_RISK — "use only if no alternative" / "only if absolutely necessary" / "extreme caution"
 *   CAUTION   — "use with caution" / "monitor"
 * The UI derives the badge from tier + fdaBoxedWarning; there is no free-text badge.
 */
export const CAUTION_LIST_SCHEMA_VERSION = "3.0.0";
export const CautionTier = z.enum(["AVOID", "HIGH_RISK", "CAUTION"]);

export const CautionEntry = z
  .object({
    id: KebabId,
    title: Text,
    searchTerms: z.array(Text),
    drugClass: Text,
    generics: z.array(Text).min(1),
    brands: z.array(Text),
    tier: CautionTier,
    /** True only when the FDA label carries a boxed warning about THIS list's condition. */
    fdaBoxedWarning: z.boolean(),
    /** False → shown last and greyed (visible, not hidden). */
    usMarketed: z.boolean(),
    effect: z.array(Text).min(1),
    mechanism: z.array(Text),
    pearls: z.array(Text),
    /** Must not name a drug or class listed in another entry of the same list — enforced by validate.ts. */
    saferAlternatives: z.array(Text),
    verify: z.array(Text),
    relatedIds: z.array(RelatedId),
    sources: z.array(Source).min(1),
    lastReviewed: ReviewDate,
  })
  .strict();

export const CautionListRegistry = z
  .object({
    title: Text,
    /** The condition the cautions apply to, e.g. "Myasthenia gravis". */
    condition: Text,
    /** Population limits that apply to every entry, e.g. "Beers criteria apply to adults ≥65". */
    scopeNotes: z.array(Text),
    version: SemVer,
    schemaVersion: SemVer,
    lastUpdated: IsoDate,
    entries: z.array(CautionEntry).min(1),
  })
  .strict();
