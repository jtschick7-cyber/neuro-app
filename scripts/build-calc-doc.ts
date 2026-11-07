// Regenerates docs/CALCULATORS.md from CALCULATOR_META so the spec can't drift from the code.
// Only calculators in data/calculators.manifest.json (the ones the app ships) are listed.
import { readFileSync, writeFileSync } from "node:fs";
import { CALCULATOR_META } from "../src/lib/calculators";
const shipped = new Set(JSON.parse(readFileSync("data/calculators.manifest.json", "utf8")) as string[]);
const rows = Object.values(CALCULATOR_META).filter((m) => shipped.has(m.id)).map((m) =>
  `## ${m.title} (\`${m.id}\`)\n- Formula: ${m.formula}\n- Caps: ${m.caps.join("; ") || "none"}\n- Rounding: ${m.rounding}\n- Weight: ${m.weightBasis}\n- Sources: ${m.sources.join(" | ")}\n- VERIFY: ${m.verify.join(" | ") || "none"}\n`);
writeFileSync("docs/CALCULATORS.md", `# Calculators\n\nGenerated from src/lib/calculators.ts — do not edit by hand. Rounding marked "app convention" needs pharmacy review.\n\n${rows.join("\n")}`);
