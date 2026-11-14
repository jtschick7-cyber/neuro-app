/**
 * Generates generated/source-years.json: { "registry:id": newest GUIDELINE/LABEL citation year } for every entry
 * that cites one (P2-2). The app compares it with the current year for the OLD_SOURCES banner, so the 60 KB tag
 * file never ships. Run by `npm run release`; checked by `npm run check:generated`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { loadRegistries } from "./load-registries";
import { newestGuidelineYear } from "./source-years";

const { types } = JSON.parse(readFileSync("data/source-types.json", "utf8")) as { types: Record<string, string> };
const out: Record<string, number> = {};
for (const [reg, data] of Object.entries(loadRegistries()))
  for (const e of data.entries) {
    const y = newestGuidelineYear(e, types);
    if (y !== null) out[`${reg}:${e.id}`] = y;
  }
writeFileSync("generated/source-years.json", JSON.stringify(out, null, 1) + "\n");
console.log(`source-years.json: ${Object.keys(out).length} entries with a GUIDELINE/LABEL source`);
