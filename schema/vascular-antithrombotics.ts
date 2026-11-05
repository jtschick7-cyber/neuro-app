import { z } from "zod";
import { KebabId, RelatedId, ReviewDate, Source, Text, registryEnvelope } from "./common";
import { EvidenceLevel, FormularyStatus, TreatmentItem } from "./acute-neuro";

export const VASCULAR_ANTITHROMBOTICS_SCHEMA_VERSION = "1.0.0";

export const DrugClass = z.enum(["ANTIPLATELET", "ANTICOAGULANT", "THROMBOLYTIC", "REVERSAL"]);

const shared = {
  id: KebabId,
  title: Text,
  searchTerms: z.array(Text),
  institutionVaries: z.array(Text),
  pearls: z.array(Text),
  verify: z.array(Text),
  relatedIds: z.array(RelatedId),
  sources: z.array(Source).min(1),
  lastReviewed: ReviewDate,
};

export const AgentTiming = z
  .object({
    halfLifeText: Text,
    holdBeforeProcedure: z.array(Text),
    thrombolysisRule: z.array(Text),
  })
  .strict();

export const AgentEntry = z
  .object({
    ...shared,
    kind: z.literal("AGENT"),
    drugClass: DrugClass,
    subclass: Text,
    mechanism: Text,
    uses: z.array(TreatmentItem).min(1),
    renalHepatic: z.array(Text),
    timing: AgentTiming,
    reversal: z.array(TreatmentItem),
    monitoring: z.array(Text),
    interactions: z.array(Text),
    pregnancy: z.array(Text),
    formularyStatus: FormularyStatus,
    calculatorIds: z.array(KebabId),
  })
  .strict();

export const DecisionRule = z
  .object({
    order: z.number().int().positive(),
    condition: Text,
    recommendation: Text,
    evidenceLevel: EvidenceLevel,
    evidenceNote: z.array(Text),
  })
  .strict();

export const DecisionEntry = z
  .object({
    ...shared,
    kind: z.literal("DECISION"),
    question: Text,
    population: z.array(Text),
    rules: z.array(DecisionRule).min(1),
    options: z.array(TreatmentItem),
    contraindications: z.array(Text),
    esoDiffers: z.array(Text),
  })
  .strict();

/** A use with no structured dose must say why in doseText, e.g. "(unstructured: weight-band table)". */
const UNSTRUCTURED = /\(unstructured:[^)]+\)/i;

export const VascularAntithromboticEntry = z
  .discriminatedUnion("kind", [AgentEntry, DecisionEntry])
  .superRefine((e, ctx) => {
    if (e.kind === "AGENT") {
      if (e.drugClass === "REVERSAL" && e.reversal.length > 0)
        ctx.addIssue({ code: "custom", path: ["reversal"], message: "REVERSAL agents must have an empty reversal[]" });
      e.uses.forEach((u, i) => {
        if (u.dose.length === 0 && !UNSTRUCTURED.test(u.doseText))
          ctx.addIssue({ code: "custom", path: ["uses", i, "doseText"], message: 'use without structured dose must state "(unstructured: <reason>)" in doseText' });
      });
    } else {
      e.rules.forEach((r, i) => {
        if (i > 0 && r.order <= e.rules[i - 1].order)
          ctx.addIssue({ code: "custom", path: ["rules", i, "order"], message: "rule order must strictly increase" });
      });
    }
  });

export const VascularAntithromboticsRegistry = registryEnvelope(VascularAntithromboticEntry);
export type VascularAntithromboticEntry = z.infer<typeof VascularAntithromboticEntry>;
