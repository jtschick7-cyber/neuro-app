import { z } from "zod";
import { KebabId, RelatedId, ReviewDate, Source, Text, registryEnvelope } from "./common";
import { WorkupItem } from "./acute-neuro";
import { DecisionRule } from "./vascular-antithrombotics";

export const CONSULT_WORKUPS_SCHEMA_VERSION = "2.1.0";

export const ConsultCategory = z.enum([
  "VASCULAR",
  "SEIZURE",
  "COGNITION_ENCEPHALOPATHY",
  "NEUROMUSCULAR",
  "SPINAL",
  "NEURO_OPHTH_VESTIBULAR",
  "HEADACHE",
  "INFLAMMATORY_DEMYELINATING",
  "PROGNOSIS_DEATH",
  "FUNCTIONAL",
]);

export const DifferentialItem = z
  .object({
    dx: Text,
    clues: z.array(Text),
    mustNotMiss: z.boolean(),
  })
  .strict();

// Diagnosis and disposition only — treatment lives in acute-neuro / vascular-antithrombotics (link via relatedIds).
export const ConsultWorkupEntry = z
  .object({
    id: KebabId,
    title: Text,
    searchTerms: z.array(Text),
    category: ConsultCategory,
    consultQuestion: Text,
    keyNumbers: z.array(Text).max(5).optional(), // 4.2: same element shape as reference-cards; copied signed-off numbers only
    keyHistory: z.array(Text).min(1),
    keyExam: z.array(Text).min(1),
    redFlags: z.array(Text).min(1),
    differential: z.array(DifferentialItem).min(1),
    workup: z.array(WorkupItem).min(1),
    decisionRules: z.array(DecisionRule),
    initialSteps: z.array(Text),
    disposition: z.array(Text),
    calculatorIds: z.array(KebabId),
    institutionVaries: z.array(Text),
    pearls: z.array(Text),
    verify: z.array(Text),
    relatedIds: z.array(RelatedId),
    sources: z.array(Source).min(1),
    lastReviewed: ReviewDate,
  })
  .strict()
  .superRefine((e, ctx) => {
    if (!e.differential.some((x) => x.mustNotMiss))
      ctx.addIssue({ code: "custom", path: ["differential"], message: "at least one differential item must be mustNotMiss" });
    e.decisionRules.forEach((r, i) => {
      if (i > 0 && r.order <= e.decisionRules[i - 1].order)
        ctx.addIssue({ code: "custom", path: ["decisionRules", i, "order"], message: "rule order must strictly increase" });
    });
  });

export const ConsultWorkupsRegistry = registryEnvelope(ConsultWorkupEntry);
export type ConsultWorkupEntry = z.infer<typeof ConsultWorkupEntry>;
