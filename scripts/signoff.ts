/**
 * Stamp entries as reviewed.
 *   npm run signoff -- <registry> <id> [<id>…]        sign listed entries (today's date)
 *   npm run signoff -- <registry> --list               list UNREVIEWED ids
 *   npm run signoff -- <registry> --all                sign every UNREVIEWED entry (asks no questions — use deliberately)
 *   npm run signoff -- <registry> --unsign <id>…       reset to UNREVIEWED
 *   --date YYYY-MM-DD                                  override the date
 * Refuses entries with open verify[] items and unknown ids. Bumps the registry PATCH version and lastUpdated.
 * Sign-off records review only — it never changes content, so PATCH is the right bump (docs/VERSIONING.md).
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const dateIdx = args.indexOf("--date");
const today = new Date().toLocaleDateString("en-CA"); // local YYYY-MM-DD
const date = dateIdx >= 0 ? args.splice(dateIdx, 2)[1] : today;
if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(`bad --date ${date}`);
if (date > today) fail("sign-off date cannot be in the future");

const [registry, ...rest] = args;
if (!registry) fail("usage: signoff <registry> <id…> | --list | --all | --unsign <id…> [--date YYYY-MM-DD]");
const file = `data/${registry}.json`;
if (!existsSync(file)) fail(`no such registry: ${file}`);

type Entry = { id: string; lastReviewed: string; verify?: string[] };
const reg = JSON.parse(readFileSync(file, "utf8")) as { version: string; lastUpdated: string; entries: Entry[] };
const byId = new Map(reg.entries.map((e) => [e.id, e]));
const unreviewed = reg.entries.filter((e) => e.lastReviewed === "UNREVIEWED");

if (rest[0] === "--list") {
  console.log(`${registry}: ${unreviewed.length}/${reg.entries.length} unreviewed`);
  for (const e of unreviewed) console.log(`  ${e.id}${e.verify?.length ? `  (${e.verify.length} open VERIFY)` : ""}`);
  process.exit(0);
}

const unsign = rest[0] === "--unsign";
const ids = rest[0] === "--all" ? unreviewed.map((e) => e.id) : unsign ? rest.slice(1) : rest;
if (!ids.length) fail("no ids given");

const unknown = ids.filter((id) => !byId.has(id));
if (unknown.length) fail(`unknown id(s) in ${registry}: ${unknown.join(", ")}`);
if (!unsign) {
  const blocked = ids.filter((id) => byId.get(id)!.verify?.length);
  if (blocked.length) fail(`open VERIFY items — resolve first: ${blocked.join(", ")}`);
}

let changed = 0;
for (const id of ids) {
  const e = byId.get(id)!;
  const next = unsign ? "UNREVIEWED" : date;
  if (e.lastReviewed !== next) { e.lastReviewed = next; changed++; }
}
if (!changed) { console.log("nothing to change"); process.exit(0); }

const [maj, min, pat] = reg.version.split(".").map(Number);
reg.version = `${maj}.${min}.${pat + 1}`;
reg.lastUpdated = today;
writeFileSync(file, JSON.stringify(reg, null, 2) + "\n");
const left = reg.entries.filter((e) => e.lastReviewed === "UNREVIEWED").length;
console.log(`${registry} v${reg.version}: ${unsign ? "unsigned" : `signed ${date}`} ${changed} entr${changed === 1 ? "y" : "ies"}; ${left} unreviewed left`);

function fail(msg: string): never {
  console.error(`signoff: ${msg}`);
  process.exit(1);
}
