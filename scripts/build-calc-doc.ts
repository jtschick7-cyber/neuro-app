// Regenerates docs/CALCULATORS.md from CALCULATOR_META so the spec can't drift from the code.
import { writeFileSync } from "node:fs";
import { CALCULATOR_META } from "../src/lib/calculators";
const rows = Object.values(CALCULATOR_META).map((m) =>
  `## ${m.title} (\`${m.id}\`)\n- Formula: ${m.formula}\n- Caps: ${m.caps.join("; ") || "none"}\n- Rounding: ${m.rounding}\n- Weight: ${m.weightBasis}\n- Sources: ${m.sources.join(" | ")}\n- VERIFY: ${m.verify.join(" | ") || "none"}\n`);
writeFileSync("docs/CALCULATORS.md", `# Calculators\n\nGenerated from src/lib/calculators.ts — do not edit by hand. Rounding marked "app convention" needs pharmacy review.\n\n${rows.join("\n")}`);
