/** Emit JSON Schema (draft 2020-12) from the zod schemas: npx tsx scripts/build-json-schema.ts */
import { writeFileSync } from "node:fs";
import { z } from "zod";
import { AcuteNeuroRegistry } from "../schema/acute-neuro";
import { NeuralAntibodiesRegistry } from "../schema/neural-antibodies";
import { VascularAntithromboticsRegistry } from "../schema/vascular-antithrombotics";
import { ConsultWorkupsRegistry } from "../schema/consult-workups";
import { CautionListRegistry } from "../schema/caution-list";
import { DrugInteractionsRegistry } from "../schema/drug-interactions";

const targets: Record<string, z.ZodTypeAny> = {
  "acute-neuro": AcuteNeuroRegistry,
  "neural-antibodies": NeuralAntibodiesRegistry,
  "vascular-antithrombotics": VascularAntithromboticsRegistry,
  "consult-workups": ConsultWorkupsRegistry,
  "caution-list": CautionListRegistry,
  "drug-interactions": DrugInteractionsRegistry,
};

for (const [name, schema] of Object.entries(targets)) {
  // Refinements (cross-field rules) are not expressible in JSON Schema; validate.ts enforces them.
  const json = z.toJSONSchema(schema, { unrepresentable: "any" });
  writeFileSync(`schema/${name}.schema.json`, JSON.stringify(json, null, 2) + "\n");
  console.log(`wrote schema/${name}.schema.json`);
}
