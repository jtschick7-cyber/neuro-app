import { z } from "zod";
import { KebabId, RelatedId, ReviewDate, Source, Text, registryEnvelope } from "./common";

export const NEURAL_ANTIBODIES_SCHEMA_VERSION = "1.0.0";

export const AntigenClass = z.enum(["NEURONAL_SURFACE", "INTRACELLULAR", "INTRACELLULAR_SYNAPTIC", "GLIAL"]);

/** PNS-Care 2021 cancer-association risk: HIGH >70%, INTERMEDIATE 30–70%, LOW <30%. */
export const PnsRisk = z.enum(["HIGH", "INTERMEDIATE", "LOW", "NOT_CLASSIFIED"]);

/** App convention (not from a guideline): OFTEN >50% normal, SOMETIMES 20–50%, RARELY <20%. */
export const NormalLikelihood = z.enum(["OFTEN_NORMAL", "SOMETIMES_NORMAL", "RARELY_NORMAL", "UNKNOWN"]);

export const Specimen = z.enum(["CSF", "SERUM", "BOTH"]);
export const ImmunotherapyResponse = z.enum(["USUALLY_GOOD", "VARIABLE", "USUALLY_POOR"]);

export const Syndrome = z.object({ syndrome: Text, typical: z.boolean() }).strict();
export const TumorAssociation = z.object({ tumor: Text, frequencyText: Text }).strict();

export const FindingProfile = z
  .object({
    normalLikelihood: NormalLikelihood,
    normalPercentText: z.array(Text), // cited figure(s); empty when not reported
    typicalFindings: z.array(Text),
  })
  .strict();

export const Testing = z
  .object({
    preferredSpecimen: Specimen,
    rationale: z.array(Text).min(1),
    methodNotes: z.array(Text),
  })
  .strict();

export const NeuralAntibodyEntry = z
  .object({
    id: KebabId,
    antigen: Text,
    searchTerms: z.array(Text),
    antigenClass: AntigenClass,
    pnsRisk: PnsRisk,
    syndromes: z.array(Syndrome).min(1),
    demographics: z.array(Text),
    tumors: z.array(TumorAssociation),
    cancerScreening: z.array(Text),
    testing: Testing,
    csf: FindingProfile,
    mri: FindingProfile,
    otherTests: z.array(Text),
    immunotherapyResponse: ImmunotherapyResponse,
    pearls: z.array(Text),
    verify: z.array(Text),
    relatedIds: z.array(RelatedId),
    sources: z.array(Source).min(1),
    lastReviewed: ReviewDate,
  })
  .strict()
  .refine((e) => !(["HIGH", "INTERMEDIATE"].includes(e.pnsRisk) && e.tumors.length === 0), {
    message: "HIGH/INTERMEDIATE pnsRisk requires at least one tumor association",
    path: ["tumors"],
  })
  .refine((e) => e.csf.normalLikelihood !== "UNKNOWN" || e.csf.normalPercentText.length === 0, {
    message: "csf: UNKNOWN likelihood must not carry a percentage",
    path: ["csf", "normalPercentText"],
  })
  .refine((e) => e.mri.normalLikelihood !== "UNKNOWN" || e.mri.normalPercentText.length === 0, {
    message: "mri: UNKNOWN likelihood must not carry a percentage",
    path: ["mri", "normalPercentText"],
  });

export const NeuralAntibodiesRegistry = registryEnvelope(NeuralAntibodyEntry);
export type NeuralAntibodyEntry = z.infer<typeof NeuralAntibodyEntry>;
