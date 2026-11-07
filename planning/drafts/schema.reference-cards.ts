// schema/reference-cards.ts — 1.1.0
// 1.0.0: item 7.2 (approved by Jason 2026-11-06; DECISION_LOG 7.2 #1, TargetRow.role amendment 7.2 #2).
// 1.1.0: item 7.5 matrix sections (approved by Jason 2026-11-06; DECISION_LOG 7.5 #1–#2). Additive — 1.0.0 cards
//        still validate (row-list sections carry no `kind`; matrix sections must carry kind "MATRIX").
import { z } from "zod";
import { KebabId, RelatedId, ReviewDate, Source, Text, registryEnvelope } from "./common";
import { EvidenceLevel } from "./acute-neuro";

export const REFERENCE_CARDS_SCHEMA_VERSION = "1.1.0";

/** What a row is. EVIDENCE_SUMMARY = trial result or "no recommendation made" — never rendered as a target. */
export const TargetRole = z.enum(["TARGET", "RECOMMENDED", "NOT_RECOMMENDED", "EVIDENCE_SUMMARY"]);

export const TargetRow = z
  .object({
    parameter: Text, // "Sodium", "CPP", "Hemoglobin"
    condition: Text, // "HTS for ICP/edema — SAH"
    role: TargetRole,
    target: Text, // glanceable value or stance
    notes: z.array(Text),
    evidenceLevel: EvidenceLevel,
    evidenceNote: z.array(Text), // source's own grade, verbatim class/level
    sources: z.array(Source).min(1), // every row cited
  })
  .strict()
  .refine((r) => r.role !== "EVIDENCE_SUMMARY" || r.evidenceLevel === "NOT_GRADED", {
    message: "EVIDENCE_SUMMARY rows must be NOT_GRADED",
    path: ["evidenceLevel"],
  });

export const CardSection = z
  .object({
    heading: Text,
    rows: z.array(TargetRow).min(1),
  })
  .strict();

// --- 1.1.0 (item 7.5): matrix sections ---

/** VALID = source says the result is reliable in this setting. CAUTION = possible bias or thin evidence; interpret with care.
 *  UNRELIABLE = source says false results are expected / don't test. ASSAY_DEPENDENT = depends on method or reagent.
 *  NOT_ADDRESSED = no source in project knowledge addresses this cell (a finding, not a VERIFY item). */
export const CellStatus = z.enum(["VALID", "CAUTION", "UNRELIABLE", "ASSAY_DEPENDENT", "NOT_ADDRESSED"]);
export const CellDirection = z.enum(["FALSE_LOW", "FALSE_HIGH", "EITHER"]);

export const MatrixColumn = z.object({ key: KebabId, label: Text }).strict();

export const MatrixCell = z
  .object({
    column: KebabId,
    status: CellStatus,
    direction: CellDirection.nullable(),
    text: Text,
    evidenceLevel: EvidenceLevel,
    evidenceNote: z.array(Text), // each source's own grade, verbatim
    sources: z.array(Source),
  })
  .strict()
  .superRefine((c, ctx) => {
    if (c.status === "NOT_ADDRESSED") {
      if (c.sources.length) ctx.addIssue({ code: "custom", path: ["sources"], message: "NOT_ADDRESSED cells carry no sources" });
      if (c.direction !== null) ctx.addIssue({ code: "custom", path: ["direction"], message: "NOT_ADDRESSED cells have no direction" });
      if (c.evidenceLevel !== "NOT_GRADED")
        ctx.addIssue({ code: "custom", path: ["evidenceLevel"], message: "NOT_ADDRESSED cells must be NOT_GRADED" });
    } else if (c.sources.length === 0) {
      ctx.addIssue({ code: "custom", path: ["sources"], message: "every addressed cell needs ≥1 source" });
    }
    if (c.status === "VALID" && c.direction !== null)
      ctx.addIssue({ code: "custom", path: ["direction"], message: "VALID cells have no direction" });
  });

export const MatrixNote = z
  .object({ text: Text, evidenceLevel: EvidenceLevel, evidenceNote: z.array(Text), sources: z.array(Source).min(1) })
  .strict();

export const MatrixRow = z
  .object({ test: Text, cells: z.array(MatrixCell).min(1), notes: z.array(MatrixNote) })
  .strict();

export const MatrixSection = z
  .object({
    kind: z.literal("MATRIX"),
    heading: Text,
    columns: z.array(MatrixColumn).min(2),
    rows: z.array(MatrixRow).min(1),
  })
  .strict()
  .superRefine((s, ctx) => {
    const keys = s.columns.map((c) => c.key);
    if (new Set(keys).size !== keys.length)
      ctx.addIssue({ code: "custom", path: ["columns"], message: "duplicate column key" });
    s.rows.forEach((r, i) => {
      const ck = r.cells.map((c) => c.column);
      if (ck.length !== keys.length || ck.some((k, j) => k !== keys[j]))
        ctx.addIssue({ code: "custom", path: ["rows", i, "cells"], message: "exactly one cell per column, in column order" });
    });
  });

export const AnySection = z.union([CardSection, MatrixSection]);

export const ReferenceCard = z
  .object({
    id: KebabId,
    title: Text,
    searchTerms: z.array(Text),
    scopeNote: Text,
    sections: z.array(AnySection).min(1), // 1.1.0: was z.array(CardSection)
    pitfalls: z.array(Text),
    keyNumbers: z.array(Text).max(5), // same shape as task 4.2
    verify: z.array(Text),
    relatedIds: z.array(RelatedId),
    sources: z.array(Source).min(1),
    lastReviewed: ReviewDate,
  })
  .strict()
  .refine(
    (c) =>
      c.sections
        .flatMap((s) =>
          "kind" in s
            ? s.rows.flatMap((r) => [...r.cells.flatMap((x) => x.sources), ...r.notes.flatMap((n) => n.sources)])
            : s.rows.flatMap((r) => r.sources),
        )
        .every((src) => c.sources.includes(src)),
    { message: "every row/cell/note source must also appear in the card's sources[]", path: ["sources"] },
  );

export const ReferenceCardsRegistry = registryEnvelope(ReferenceCard);

export type ReferenceCardsRegistry = z.infer<typeof ReferenceCardsRegistry>;
export type ReferenceCard = z.infer<typeof ReferenceCard>;
export type TargetRow = z.infer<typeof TargetRow>;
export type MatrixSection = z.infer<typeof MatrixSection>;
export type MatrixCell = z.infer<typeof MatrixCell>;
