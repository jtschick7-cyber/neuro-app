/**
 * Fail if committed generated files are stale: regenerate them, then require no git changes.
 *   npm run check:generated     (runs in CI and before deploy)
 * Covers schema/*.schema.json, docs/CALCULATORS.md and generated/about.json, whose contentVersion is the footer
 * version and the service-worker cache name. If this fails, run `npm run release` and commit the result.
 */
import { execSync } from "node:child_process";

const PATHS = ["schema", "docs/CALCULATORS.md", "generated/about.json"];
for (const s of ["build:schema", "build:calc-doc", "build:about"]) execSync(`npm run -s ${s}`, { stdio: "inherit" });

const dirty = execSync(`git status --porcelain -- ${PATHS.join(" ")}`).toString().trim();
if (dirty) {
  console.error(`\ncheck:generated: generated files are out of date:\n${dirty}\n`);
  console.error(execSync(`git --no-pager diff --stat -- ${PATHS.join(" ")}`).toString());
  console.error("Run `npm run release` and commit the regenerated files.");
  process.exit(1);
}
console.log("check:generated: generated files are up to date");
