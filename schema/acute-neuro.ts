import { z } from "zod";
import { KebabId, RelatedId, ReviewDate, Source, Text, registryEnvelope } from "./common";

export const ACUTE_NEURO_SCHEMA_VERSION = "1.1.0";

export const AcuteNeuroCategory = z.enum([
  "SEIZURE",
  "NEUROMUSCULAR",
  "NEUROIMMUNOLOGY",
  "CNS_INFECTION",
  "SPINAL",
  "ICP_HERNIATION",
  "TOXIC_METABOLIC",
  "ENCEPHALOPATHY",
  "HEADACHE", // 1.1.0 (item 7.9)
]);

export const TimedAction = z
  .object({
    order: z.number().int().positive(),
    window: Text, // "0–5 min", "On arrival"
    action: Text,
  })
  .strict();

export const WorkupPriority = z.enum(["STAT", "URGENT", "ROUTINE", "IF_INDICATED"]);

export const WorkupItem = z
  .object({
    test: Text,
    priority: WorkupPriority,
    indication: z.array(Text), // [] if always indicated
    notes: z.array(Text),
  })
  .strict()
  .refine((w) => w.priority !== "IF_INDICATED" || w.indication.length > 0, {
    message: "IF_INDICATED workup items must list at least one indication",
    path: ["indication"],
  });

export const TreatmentRole = z.enum([
  "FIRST_LINE",
  "SECOND_LINE",
  "THIRD_LINE",
  "ALTERNATIVE",
  "ADJUNCT",
  "SUPPORTIVE",
  "NOT_RECOMMENDED", // shown, visibly deprioritized: guideline recommends against
]);

export const Route = z.enum([
  "IV",
  "IM",
  "IO",
  "PO",
  "NG",
  "SC",
  "IN",
  "BUCCAL",
  "PR",
  "INTRATHECAL",
  "NON_PHARM",
  "EPIDURAL", // 1.1.0 (item 7.9): epidural blood patch
  "PERINEURAL", // 1.1.0 (item 7.9): greater occipital / supraorbital nerve blocks
]);

export const EvidenceLevel = z.enum([
  "STRONG", // AHA COR 1 / GRADE strong / AAN-AES Level A
  "MODERATE", // COR 2a / Level B
  "WEAK", // COR 2b / GRADE weak / Level C-U
  "CONSENSUS", // formal consensus (RAND/UCLA, Delphi)
  "EXPERT_OPINION",
  "NOT_GRADED",
]);

export const FormularyStatus = z.enum([
  "LOCAL_PREFERRED",
  "AVAILABLE",
  "NOT_STOCKED_LOCAL",
  "INSTITUTION_VARIES",
]);

export const DoseUnit = z.enum(["MG", "G", "MCG", "MG_PE", "UNITS", "ML", "MEQ", "MMOL"]);
export const DoseBasis = z.enum(["FIXED", "PER_KG"]);
export const DoseTiming = z.enum(["SINGLE", "PER_DOSE", "PER_HOUR", "PER_MIN", "PER_DAY"]);
export const WeightBasis = z.enum(["ACTUAL", "IDEAL", "ADJUSTED", "NOT_APPLICABLE"]);
export const CapScope = z.enum(["PER_DOSE", "PER_DAY", "PER_COURSE", "MAX_RATE_PER_MIN"]);

export const DoseCap = z
  .object({
    amount: z.number().positive(),
    unit: DoseUnit,
    scope: CapScope,
  })
  .strict();

export const StructuredDose = z
  .object({
    label: Text,
    amountMin: z.number().positive(),
    amountMax: z.number().positive(),
    unit: DoseUnit,
    basis: DoseBasis,
    timing: DoseTiming,
    weightBasis: WeightBasis,
    caps: z.array(DoseCap), // [] = source states no cap
    frequency: z.array(Text),
    duration: z.array(Text),
  })
  .strict()
  .refine((d) => d.amountMax >= d.amountMin, {
    message: "amountMax must be >= amountMin",
    path: ["amountMax"],
  })
  .refine((d) => (d.basis === "FIXED") === (d.weightBasis === "NOT_APPLICABLE"), {
    message: "FIXED doses need weightBasis NOT_APPLICABLE; PER_KG doses need ACTUAL/IDEAL/ADJUSTED",
    path: ["weightBasis"],
  });

export const TreatmentItem = z
  .object({
    role: TreatmentRole,
    agent: Text,
    routes: z.array(Route).min(1),
    doseText: Text, // always present
    dose: z.array(StructuredDose), // [] when dose does not fit structure
    notes: z.array(Text),
    evidenceLevel: EvidenceLevel,
    evidenceNote: z.array(Text),
    formularyStatus: FormularyStatus,
    calculatorIds: z.array(KebabId),
  })
  .strict();

export const AcuteNeuroEntry = z
  .object({
    id: KebabId,
    title: Text,
    category: AcuteNeuroCategory,
    searchTerms: z.array(Text),
    presentation: z.array(Text).min(1),
    definitions: z.array(Text),
    immediateActions: z.array(TimedAction).min(1),
    workup: z.array(WorkupItem).min(1),
    treatment: z.array(TreatmentItem).min(1),
    pitfalls: z.array(Text),
    escalateWhen: z.array(Text).min(1),
    institutionVaries: z.array(Text),
    verify: z.array(Text),
    relatedIds: z.array(RelatedId),
    sources: z.array(Source).min(1),
    lastReviewed: ReviewDate,
  })
  .strict()
  .refine(
    (e) => {
      const orders = e.immediateActions.map((a) => a.order);
      return orders.every((o, i) => i === 0 || o > orders[i - 1]);
    },
    { message: "immediateActions.order must be strictly increasing", path: ["immediateActions"] },
  );

export const AcuteNeuroRegistry = registryEnvelope(AcuteNeuroEntry);

export type AcuteNeuroRegistry = z.infer<typeof AcuteNeuroRegistry>;
export type AcuteNeuroEntry = z.infer<typeof AcuteNeuroEntry>;
export type TreatmentItem = z.infer<typeof TreatmentItem>;
export type StructuredDose = z.infer<typeof StructuredDose>;
