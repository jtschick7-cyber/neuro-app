/**
 * Printable review sheets, one self-contained HTML file per registry.
 *   npm run review-sheets            UNREVIEWED entries only
 *   npm run review-sheets -- --all   every entry
 *   npm run review-sheets -- --order risk   every calculator and entry, one sheet per risk tier (docs/REREVIEW.md order)
 * Output: generated/review/<registry>.html (or generated/review/risk-<n>-<tier>.html). Checkboxes are for paper/tablet use; sign off with `npm run signoff`.
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { buildQueue, TIERS } from "./rereview-queue";
import { calculatorList, loadRegistries, CALCULATOR_META } from "./load-registries";

const all = process.argv.includes("--all");
const orderIdx = process.argv.indexOf("--order");
const order = orderIdx >= 0 ? process.argv[orderIdx + 1] : undefined;
if (order !== undefined && order !== "risk") throw new Error(`unknown --order ${order} (only "risk")`);

const COMMON = [
  "Doses, thresholds, caps, units match source/label",
  "Every claim traces to a listed source",
  "Newest guideline versions; years present",
  "Evidence levels follow the mapping",
  "ESO differences shown where relevant",
  "Local variation in institutionVaries",
  "Formulary tags correct",
  "Calculators and related links correct",
  "Adult US practice; terse; not patient advice",
];
const SPECIFIC: Record<string, string[]> = {
  "acute-neuro": ["Immediate actions: order and time windows", "Escalation triggers", "Treatment roles (first-line vs adjunct)"],
  "consult-workups": ["Must-not-miss diagnoses flagged", "Test priorities sensible", "Recs template usable in a note"],
  "vascular-antithrombotics": ["Renal/hepatic adjustments and hold times", "Reversal matches formulary", "Decision rules in the right order"],
  "neural-antibodies": ["Antigen class (surface vs intracellular)", "PNS risk and tumor associations", "Specimen and method"],
  "mg-contraindications": ["Tier matches source wording", "Alternatives name no listed drug"],
  "seizure-threshold": ["Tier matches source wording", "Alternatives name no listed drug", "Renal/dose conditions stated"],
  "rcvs-triggers": ["Tier matches source wording", "Alternatives name no listed drug"],
  "asm-interactions": ["Direction right (object vs precipitant)", "Management matches label wording", "Population limits (e.g., Beers ≥65) stated"],
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const label = (k: string) => k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
const SKIP = new Set(["id", "title", "antigen", "lastReviewed", "searchTerms"]);

function render(v: unknown): string {
  if (v === null || v === undefined || v === "") return "<span class=muted>—</span>";
  if (typeof v !== "object") return esc(String(v));
  if (Array.isArray(v)) {
    if (!v.length) return "<span class=muted>none</span>";
    if (v.every((x) => typeof x !== "object")) return `<ul>${v.map((x) => `<li>${esc(String(x))}</li>`).join("")}</ul>`;
    return `<ol>${v.map((x) => `<li>${render(x)}</li>`).join("")}</ol>`;
  }
  // Compact: primitive fields on one line ("order" dropped — list numbering covers it), lists/objects beneath.
  const entries = Object.entries(v as Record<string, unknown>).filter(([k, x]) => k !== "order" && !(Array.isArray(x) && !x.length));
  const inline = entries.filter(([, x]) => typeof x !== "object" || x === null);
  const nested = entries.filter(([, x]) => typeof x === "object" && x !== null);
  const line = inline.map(([k, x]) => `<b>${esc(label(k))}:</b> ${esc(String(x))}`).join(" · ");
  return (line ? `<div class=kv>${line}</div>` : "") + nested.map(([k, x]) => `<div class=kv><i>${esc(label(k))}:</i> ${render(x)}</div>`).join("");
}

const css = `body{font:13px/1.4 system-ui,sans-serif;max-width:900px;margin:24px auto;padding:0 16px;color:#111}
h1{font-size:20px}h2{font-size:16px;margin:0 0 4px}.entry{border:1px solid #ccc;border-radius:6px;padding:12px 14px;margin:16px 0;page-break-inside:avoid}
.meta{color:#555;font-size:12px;margin-bottom:8px}.field{margin:6px 0}.field>b{display:block;font-size:12px;color:#333;text-transform:uppercase;letter-spacing:.03em}
ul,ol{margin:2px 0 2px 18px;padding:0}.kv{margin:1px 0}.muted{color:#888}.verify{background:#fff3cd;padding:4px 8px;border-radius:4px}
.check{border-top:1px dashed #bbb;margin-top:10px;padding-top:8px;columns:2;font-size:12px}.check label{display:block;break-inside:avoid}
.sign{margin-top:6px;font-size:12px}code{background:#f3f3f3;padding:1px 4px;border-radius:3px}
@media print{body{margin:0}.entry{border-color:#999}}`;

const CALC_CHECKS = ["Formula matches source", "Caps and units correct", "Rounding stated and applied", "Weight basis correct", "Sources current", "Tests cover every branch"];

function entrySection(i: number, registry: string, e: Record<string, unknown>): string {
  const isCalc = registry === "calc";
  const checks = isCalc ? CALC_CHECKS : [...COMMON, ...(SPECIFIC[registry] ?? [])];
  const fields = Object.entries(e)
    .filter(([k]) => !SKIP.has(k))
    .map(([k, v]) => `<div class="field${k === "verify" && Array.isArray(v) && v.length ? " verify" : ""}"><b>${esc(label(k))}</b>${render(v)}</div>`)
    .join("");
  const meta = isCalc ? `<code>calc:${esc(String(e.id))}</code> · src/lib/calculators.ts` : `<code>${esc(registry)}:${esc(String(e.id))}</code> · last reviewed: ${esc(String(e.lastReviewed))}`;
  const sign = isCalc ? "Calculator changes need Jason's sign-off on formula, caps, rounding and sources" : `Sign off: <code>npm run signoff -- ${registry} ${esc(String(e.id))}</code>`;
  return `<section class=entry><h2>${i + 1}. ${esc(String(e.title ?? e.antigen ?? e.id))}</h2>
<div class=meta>${meta}</div>${fields}
<div class=check>${checks.map((c) => `<label><input type=checkbox> ${esc(c)}</label>`).join("")}</div>
<div class=sign>${sign}</div></section>`;
}

const page = (title: string, meta: string, body: string) => `<!DOCTYPE html><html lang=en><head><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1">
<title>${esc(title)}</title><style>${css}</style></head><body>
<h1>${esc(title)}</h1>
${meta}
${body || "<p>Nothing to review.</p>"}</body></html>`;

mkdirSync("generated/review", { recursive: true });
const today = new Date().toISOString().slice(0, 10);

if (order === "risk") {
  const regs = loadRegistries();
  const queue = buildQueue(Object.fromEntries(Object.entries(regs).map(([k, r]) => [k, r.entries])), calculatorList());
  for (const t of TIERS) {
    const items = queue.filter((q) => q.tier === t.tier);
    if (!items.length) continue;
    const body = items
      .map((q, i) => entrySection(i, q.registry, q.registry === "calc" ? (CALCULATOR_META[q.id] as unknown as Record<string, unknown>) : regs[q.registry].entries.find((e) => e.id === q.id)!))
      .join("\n");
    const file = `generated/review/risk-${t.tier}-${t.slug}.html`;
    writeFileSync(file, page(`Re-review ${t.tier} — ${t.heading}`, `<p class=meta>${items.length} items · risk order (docs/REREVIEW.md) · generated ${today}</p>`, body));
    console.log(`${file} — ${items.length} items`);
  }
} else {
  const files = readdirSync("data").filter((f) => f.endsWith(".json") && !f.endsWith(".manifest.json")).sort();
  for (const f of files) {
    const name = f.replace(/\.json$/, "");
    const reg = JSON.parse(readFileSync(`data/${f}`, "utf8"));
    if (!Array.isArray(reg.entries)) continue; // non-registry data file (syndrome-vocabulary)
    const entries = (reg.entries as Record<string, unknown>[]).filter((e) => all || e.lastReviewed === "UNREVIEWED");
    const meta = `<p class=meta>Registry v${esc(reg.version)} · ${entries.length} of ${reg.entries.length} entries (${all ? "all" : "unreviewed only"}) · generated ${today}</p>
<p class=meta>Batch sign-off: <code>npm run signoff -- ${name} ${entries.map((e) => esc(String(e.id))).join(" ")}</code></p>`;
    writeFileSync(`generated/review/${name}.html`, page(`Review — ${reg.title}`, meta, entries.map((e, i) => entrySection(i, name, e)).join("\n")));
    console.log(`generated/review/${name}.html — ${entries.length} entries`);
  }
}
