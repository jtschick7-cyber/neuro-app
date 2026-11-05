import { z } from "zod";
import { IsoDate, KebabId, RelatedId, ReviewDate, SemVer, Source, Text } from "./common";
import { CautionTier } from "./caution-list";

/**
 * Drug–drug interaction lists. Each entry is one interaction: the drug whose effect changes (object)
 * and the drug causing it (precipitant). Tier uses the same AVOID / HIGH_RISK / CAUTION scale as caution lists.
 */
export const DRUG_INTERACTIONS_SCHEMA_VERSION = "1.0.0";

export const InteractionEntry = z
  .object({
    id: KebabId,
    title: Text,
    searchTerms: z.array(Text),
    objectDrugs: z.array(Text).min(1),
    precipitantDrugs: z.array(Text).min(1),
    tier: CautionTier,
    /** What happens, e.g. "↓ apixaban exposure → loss of stroke protection". */
    effect: z.array(Text).min(1),
    mechanism: z.array(Text),
    management: z.array(Text).min(1),
    /** Entry-specific population limits, e.g. "Beers 2023: adults ≥65". */
    population: z.array(Text),
    pearls: z.array(Text),
    verify: z.array(Text),
    relatedIds: z.array(RelatedId),
    sources: z.array(Source).min(1),
    lastReviewed: ReviewDate,
  })
  .strict()
  .superRefine((e, ctx) => {
    const overlap = e.objectDrugs.filter((d) => e.precipitantDrugs.includes(d));
    if (overlap.length) ctx.addIssue({ code: "custom", path: ["precipitantDrugs"], message: `drug on both sides: ${overlap.join(", ")}` });
  });

export const DrugInteractionsRegistry = z
  .object({
    title: Text,
    scopeNotes: z.array(Text),
    version: SemVer,
    schemaVersion: SemVer,
    lastUpdated: IsoDate,
    entries: z.array(InteractionEntry).min(1),
  })
  .strict();
