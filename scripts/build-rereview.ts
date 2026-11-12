/**
 * Writes docs/REREVIEW.md: one checkbox per calculator and entry, ordered by risk (task 2.1).
 *   npm run rereview
 * Re-running keeps boxes already ticked (matched by `registry:id`). Ticking a box records review only —
 * it doesn't change lastReviewed; use `npm run signoff` if an entry is edited and needs re-signing.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { buildQueue, itemKey, TIERS } from "./rereview-queue";
import { calculatorList, loadRegistries } from "./load-registries";

const OUT = "docs/REREVIEW.md";
const ticked = new Set<string>();
if (existsSync(OUT)) for (const m of readFileSync(OUT, "utf8").matchAll(/^- \[[xX]\] `([^`]+)`/gm)) ticked.add(m[1]);

const regs = loadRegistries();
const queue = buildQueue(Object.fromEntries(Object.entries(regs).map(([k, r]) => [k, r.entries])), calculatorList());

const lines = [
  "# Re-review checklist",
  "",
  "All entries were batch-signed on 2026-11-05. This queue lets Jason re-review them by risk without resetting `lastReviewed`.",
  "",
  "- A tick means the item was checked against its source document, not skimmed (Jason, 2026-11-12).",
  "- Tick a box when the item is reviewed. `npm run rereview` regenerates this file from the data and keeps ticked boxes.",
  "- Printable sheets in the same order: `npm run review-sheets -- --order risk` → `generated/review/risk-*.html`.",
  "- Anything that needs a content change goes through `docs/VERSIONING.md` (edit → validate → review-sheets → signoff → release).",
  "",
];
for (const t of TIERS) {
  const items = queue.filter((q) => q.tier === t.tier);
  if (!items.length) continue;
  const done = items.filter((q) => ticked.has(itemKey(q))).length;
  lines.push(`## ${t.tier}. ${t.heading} (${done}/${items.length})`, "");
  for (const q of items) lines.push(`- [${ticked.has(itemKey(q)) ? "x" : " "}] \`${itemKey(q)}\` — ${q.title}`);
  lines.push("");
}
writeFileSync(OUT, lines.join("\n"));
console.log(`${OUT}: ${queue.length} items, ${ticked.size} ticked`);
