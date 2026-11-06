/**
 * Generates generated/about.json for the About / Sources / Review page.
 *   npx tsx scripts/build-about.ts
 * Content version = app version + a short hash of all registry and calculator content,
 * so any data change produces a new version string (also used as the service-worker cache key).
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { CALCULATOR_META } from "../src/lib/calculators";

type Entry = { id: string; title: string; sources: string[]; lastReviewed: string; verify?: string[] };
type Registry = { title: string; version: string; schemaVersion: string; lastUpdated: string; entries: Entry[] };

const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const files = readdirSync("data").filter((f) => f.endsWith(".json") && !f.endsWith(".manifest.json")).sort();

const hash = createHash("sha256");
const registries: unknown[] = [];
const sourceMap = new Map<string, Set<string>>();
const addSource = (s: string, ref: string) => (sourceMap.get(s) ?? sourceMap.set(s, new Set()).get(s)!).add(ref);

for (const f of files) {
  const raw = readFileSync(`data/${f}`, "utf8");
  hash.update(raw);
  const reg = JSON.parse(raw) as Registry;
  if (!Array.isArray(reg.entries)) continue; // non-registry data file (syndrome-vocabulary): hashed above, no review status
  const name = f.replace(/\.json$/, "");
  const dates = reg.entries.map((e) => e.lastReviewed).filter((d) => d !== "UNREVIEWED").sort();
  registries.push({
    id: name, title: reg.title, version: reg.version, schemaVersion: reg.schemaVersion, lastUpdated: reg.lastUpdated,
    entries: reg.entries.length,
    reviewed: dates.length,
    unreviewedIds: reg.entries.filter((e) => e.lastReviewed === "UNREVIEWED").map((e) => e.id),
    openVerify: reg.entries.reduce((n, e) => n + (e.verify?.length ?? 0), 0),
    oldestReview: dates[0] ?? null,
    newestReview: dates.at(-1) ?? null,
  });
  for (const e of reg.entries) for (const s of e.sources) addSource(s, `${name}:${e.id}`);
}

const calculators = Object.values(CALCULATOR_META).map((m) => {
  for (const s of m.sources) addSource(s, `calc:${m.id}`);
  return { id: m.id, title: m.title, openVerify: m.verify.length };
});
hash.update(JSON.stringify(CALCULATOR_META));

// Publication year: "Journal YYYY;vol" pattern first, else the first 4-digit year (avoids page numbers like 1925-1938).
const year = (s: string) => Number(s.match(/\b((?:19|20)\d{2})(?=;)/)?.[1] ?? s.match(/\b(?:19|20)\d{2}\b/)?.[0] ?? 0);
const sources = [...sourceMap]
  .map(([citation, refs]) => ({ citation, year: year(citation), citedBy: [...refs].sort() }))
  .sort((a, b) => a.citation.localeCompare(b.citation));

const contentHash = hash.digest("hex").slice(0, 8);
const about = {
  appVersion: pkg.version,
  contentVersion: `${pkg.version}+${contentHash}`,
  builtAt: new Date().toISOString().slice(0, 10),
  registries,
  calculators,
  sources,
  oldestSourceYear: Math.min(...sources.map((s) => s.year).filter(Boolean)),
};

mkdirSync("generated", { recursive: true });
writeFileSync("generated/about.json", JSON.stringify(about, null, 2) + "\n");
console.log(`about.json: ${about.contentVersion}, ${registries.length} registries, ${calculators.length} calculators, ${sources.length} unique sources`);
