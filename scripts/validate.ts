/**
 * Validate registry JSON files.
 *
 *   npx tsx scripts/validate.ts data/*.json            # dev: schema + integrity errors, verify[] reported as warnings
 *   npx tsx scripts/validate.ts --release data/*.json  # release: also fails on open verify[] or UNREVIEWED entries
 *
 * Registry name = file basename without .json (e.g. data/acute-neuro.json -> "acute-neuro").
 * relatedIds "registry:id" must resolve to a loaded file; "calc:*" ids are checked against
 * data/calculators.manifest.json if present (a JSON array of calculator ids), else warned.
 */
import { readFileSync, existsSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import type { ZodTypeAny } from "zod";
import { AcuteNeuroRegistry } from "../schema/acute-neuro";
import { NeuralAntibodiesRegistry } from "../schema/neural-antibodies";
import { SyndromeVocabulary, checkSyndromeIntegrity, type SyndromeVocabularyData } from "../schema/syndrome-vocabulary";
import { VascularAntithromboticsRegistry } from "../schema/vascular-antithrombotics";
import { ConsultWorkupsRegistry } from "../schema/consult-workups";
import { CautionListRegistry } from "../schema/caution-list";
import { DrugInteractionsRegistry } from "../schema/drug-interactions";
import { CALCULATOR_META } from "../src/lib/calculators";
import { findPlaceholderText } from "./placeholder-text";

const SCHEMAS: Record<string, ZodTypeAny> = {
  "acute-neuro": AcuteNeuroRegistry,
  "neural-antibodies": NeuralAntibodiesRegistry,
  "vascular-antithrombotics": VascularAntithromboticsRegistry,
  "syndrome-vocabulary": SyndromeVocabulary, // not an entries registry; see the syndrome integrity block below
  "consult-workups": ConsultWorkupsRegistry,
  // Caution lists (schema/caution-list.ts) — one file per condition
  "mg-contraindications": CautionListRegistry,
  "seizure-threshold": CautionListRegistry,
  "rcvs-triggers": CautionListRegistry,
  // Interaction lists (schema/drug-interactions.ts)
  "asm-interactions": DrugInteractionsRegistry,
};

const args = process.argv.slice(2);
const release = args.includes("--release");
const files = args.filter((a) => !a.startsWith("--") && !a.endsWith(".manifest.json"));
if (files.length === 0) {
  console.error("usage: validate.ts [--release] <file.json>...");
  process.exit(2);
}

let errors = 0;
let warnings = 0;
const err = (m: string) => (errors++, console.error(`ERROR  ${m}`));
const warn = (m: string) => (warnings++, console.warn(`WARN   ${m}`));

type Entry = { id: string; relatedIds?: string[]; verify?: string[]; lastReviewed?: string; treatment?: { calculatorIds: string[] }[] };
const loaded = new Map<string, Entry[]>();
let syndromes: SyndromeVocabularyData | null = null;

for (const file of files) {
  const reg = basename(file, ".json");
  const schema = SCHEMAS[reg];
  if (!schema) {
    err(`${file}: no schema registered for "${reg}"`);
    continue;
  }
  let raw: unknown;
  try {
    raw = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    err(`${file}: invalid JSON (${(e as Error).message})`);
    continue;
  }
  const res = schema.safeParse(raw);
  if (!res.success) {
    for (const i of res.error.issues) err(`${file}: ${i.path.join(".") || "(root)"}: ${i.message}`);
    continue;
  }
  if (reg === "syndrome-vocabulary") {
    syndromes = res.data as SyndromeVocabularyData;
    continue;
  }
  const entries = (res.data as { entries: Entry[] }).entries;
  const seen = new Set<string>();
  for (const e of entries) {
    if (seen.has(e.id)) err(`${file}: duplicate id "${e.id}"`);
    seen.add(e.id);
    for (const p of findPlaceholderText(e)) err(`${reg}:${e.id}: ${p.path}: placeholder text "${p.text}" — link via relatedIds instead`);
    const open = e.verify ?? [];
    if (open.length) (release ? err : warn)(`${reg}:${e.id}: ${open.length} open VERIFY item(s)`);
    if (e.lastReviewed === "UNREVIEWED") (release ? err : warn)(`${reg}:${e.id}: not yet signed off (UNREVIEWED)`);
  }
  loaded.set(reg, entries);
}

// Cross-reference integrity
const manifestPath = files.length ? join(dirname(files[0]), "calculators.manifest.json") : "";
const calcIds: Set<string> | null =
  manifestPath && existsSync(manifestPath) ? new Set(JSON.parse(readFileSync(manifestPath, "utf8")) as string[]) : null;

const checkCalc = (where: string, id: string) => {
  if (!calcIds) return warn(`${where}: calculator "${id}" not checked (no calculators.manifest.json)`);
  if (!calcIds.has(id)) err(`${where}: unknown calculator "${id}"`);
};

for (const [reg, entries] of loaded) {
  for (const e of entries) {
    for (const ref of e.relatedIds ?? []) {
      const [target, id] = ref.split(":");
      if (target === "calc") checkCalc(`${reg}:${e.id}`, id);
      else if (!loaded.has(target)) warn(`${reg}:${e.id}: relatedId "${ref}" points to a registry not loaded in this run`);
      else if (!loaded.get(target)!.some((x) => x.id === id)) err(`${reg}:${e.id}: relatedId "${ref}" does not resolve`);
    }
    for (const t of e.treatment ?? []) for (const c of t.calculatorIds) checkCalc(`${reg}:${e.id}`, c);
    for (const c of e.calculatorIds ?? []) checkCalc(`${reg}:${e.id}`, c);
  }
}

// Syndrome vocabulary: mapping must be consistent with the neural-antibodies registry.
if (syndromes) {
  const antibodies = loaded.get("neural-antibodies");
  if (!antibodies) warn("syndrome-vocabulary: neural-antibodies not loaded in this run; cross-file checks skipped");
  else for (const p of checkSyndromeIntegrity(syndromes, new Set(antibodies.map((e) => e.id)))) err(`syndrome-vocabulary: ${p}`);
}

// Caution lists: a safer alternative must not name a drug or class listed in another entry of the same list.
for (const listName of ["mg-contraindications", "seizure-threshold", "rcvs-triggers"]) {
  const list = loaded.get(listName);
  if (!list) continue;
  for (const e of list) {
    for (const alt of e.saferAlternatives ?? []) {
      for (const other of list) {
        if (other.id === e.id) continue;
        const classStem = other.title.split(" (")[0].replace(/s$/i, "");
        for (const g of [...other.generics, `${classStem}s?`]) {
          const pat = g.endsWith("s?") ? g.slice(0, -2).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?" : g.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          if (new RegExp(`\\b${pat}\\b`, "i").test(alt))
            err(`${listName}:${e.id}: saferAlternatives "${alt}" names ${g.replace(/s\?$/, "")} (listed under ${other.id})`);
        }
      }
    }
  }
}

// Calculators: every manifest id needs metadata; open verify[] blocks a release.
for (const id of calcIds ?? []) {
  const m = CALCULATOR_META[id];
  if (!m) err(`calc:${id}: in manifest but has no CALCULATOR_META entry`);
  else if (m.verify.length) (release ? err : warn)(`calc:${id}: ${m.verify.length} open VERIFY item(s)`);
}

console.log(`\n${files.length} file(s): ${errors} error(s), ${warnings} warning(s)${release ? " [release mode]" : ""}`);
process.exit(errors ? 1 : 0);
