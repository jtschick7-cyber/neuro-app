// Item 7.1 — new registry schema: schema/antiseizure-medications.ts
// Approved by Jason 2026-11-06 (DECISION_LOG 7.1 #1), including the crclBasis amendment (7.1 A).
import { z } from "zod";
import { IsoDate, KebabId, RelatedId, ReviewDate, SemVer, Source, Text } from "./common";
import { StructuredDose, TreatmentItem } from "./acute-neuro";

export const ANTISEIZURE_MEDICATIONS_SCHEMA_VERSION = "1.0.0";

/** AMENDMENT: which creatinine clearance the label's bands use. Keppra uses BSA-normalized CrCl; Vimpat uses Cockcroft-Gault. */
export const CrclBasis = z.enum(["CG_ML_MIN", "BSA_NORMALIZED_ML_MIN_1_73M2"]);

/**
 * One renal row. CRCL_BAND rows carry the band as printed in the label (label) plus numeric bounds for UI highlighting.
 * Bounds are inclusive in the data; where a label's bands share an endpoint (e.g. Keppra 50–80 and 30–50),
 * the UI highlights both rows at that value rather than choosing one.
 */
export const RenalRow = z
  .object({
    kind: z.enum(["CRCL_BAND", "INTERMITTENT_HD"]),
    crclMin: z.number().nonnegative().nullable(),
    crclMax: z.number().positive().nullable(),
    crclBasis: CrclBasis.nullable(), // AMENDMENT
    label: Text,
    doseText: Text,
    dose: z.array(StructuredDose),
    notes: z.array(Text),
  })
  .strict()
  .superRefine((r, ctx) => {
    if (r.kind === "CRCL_BAND") {
      if (r.crclMin === null && r.crclMax === null)
        ctx.addIssue({ code: "custom", path: ["crclMin"], message: "CRCL_BAND needs at least one bound" });
      if (r.crclBasis === null)
        ctx.addIssue({ code: "custom", path: ["crclBasis"], message: "CRCL_BAND needs crclBasis" });
      if (r.crclMin !== null && r.crclMax !== null && r.crclMax < r.crclMin)
        ctx.addIssue({ code: "custom", path: ["crclMax"], message: "crclMax must be >= crclMin" });
    } else if (r.crclMin !== null || r.crclMax !== null || r.crclBasis !== null) {
      ctx.addIssue({ code: "custom", path: ["kind"], message: "INTERMITTENT_HD rows have null crclMin/crclMax/crclBasis" });
    }
  });

export const AsmEntry = z
  .object({
    id: KebabId,
    title: Text,
    searchTerms: z.array(Text),
    /** Adult maintenance/titration regimens. role = regimen within this drug's card, not ASM choice. */
    maintenance: z.array(TreatmentItem).min(1),
    renal: z.array(RenalRow),
    renalNotes: z.array(Text),
    hepatic: z.array(Text),
    ivPo: z.array(Text),
    enteral: z.array(Text),
    levels: z.array(Text),
    interactions: z.array(Text),
    pearls: z.array(Text),
    calculatorIds: z.array(KebabId),
    verify: z.array(Text),
    relatedIds: z.array(RelatedId),
    sources: z.array(Source).min(1),
    lastReviewed: ReviewDate,
  })
  .strict();

export const AntiseizureMedicationsRegistry = z
  .object({
    title: Text,
    scopeNotes: z.array(Text),
    version: SemVer,
    schemaVersion: SemVer,
    lastUpdated: IsoDate,
    entries: z.array(AsmEntry).min(1),
  })
  .strict();

export type AsmEntry = z.infer<typeof AsmEntry>;
export type AntiseizureMedicationsRegistry = z.infer<typeof AntiseizureMedicationsRegistry>;
