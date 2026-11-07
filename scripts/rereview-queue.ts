/**
 * Risk-ordered re-review queue (task 2.1). Pure: takes loaded registries + calculator ids, returns items in review order.
 * Shared by `npm run rereview` (docs/REREVIEW.md) and `npm run review-sheets -- --order risk`.
 */
export type QueueEntry = { id: string; title?: string; antigen?: string; kind?: string; reversal?: unknown[]; timing?: { thrombolysisRule?: unknown[] }; treatment?: { doseText?: string; dose?: unknown[] }[] };
export type QueueItem = { tier: number; registry: string; id: string; title: string };
export type Tier = { tier: number; slug: string; heading: string };

export const TIERS: Tier[] = [
  { tier: 1, slug: "calculators", heading: "Calculators" },
  { tier: 2, slug: "acute-doses", heading: "Acute protocols with doses, then ASM dosing cards" },
  { tier: 3, slug: "reversal-thrombolysis", heading: "Antithrombotic reversal and thrombolysis rules" },
  { tier: 4, slug: "decision-rules", heading: "Other decision rules and reference cards" },
  { tier: 5, slug: "caution-lists", heading: "Caution and interaction lists" },
  { tier: 6, slug: "neural-antibodies", heading: "Neural antibodies" },
  { tier: 7, slug: "unplaced", heading: "Unplaced registries (add a rule in scripts/rereview-queue.ts)" },
];

const REVERSAL_DECISIONS = new Set(["thrombolysis-with-prior-antithrombotics", "sich-after-thrombolysis", "anticoag-reversal-ich", "antiplatelet-ich"]);
const CAUTION = ["mg-contraindications", "seizure-threshold", "rcvs-triggers", "asm-interactions"];

function tierOf(registry: string, e: QueueEntry): number {
  if (registry === "acute-neuro") return (e.treatment ?? []).some((t) => t.doseText || t.dose?.length) ? 2 : 4;
  if (registry === "vascular-antithrombotics") {
    if (e.kind === "AGENT") return e.reversal?.length || e.timing?.thrombolysisRule?.length ? 3 : 4;
    return REVERSAL_DECISIONS.has(e.id) ? 3 : 4;
  }
  if (registry === "antiseizure-medications") return 2; // Jason, 2026-11-07
  if (registry === "consult-workups" || registry === "reference-cards") return 4; // reference-cards: Jason, 2026-11-07
  if (CAUTION.includes(registry)) return 5;
  if (registry === "neural-antibodies") return 6;
  return 7;
}

/** registries: name → entries, in file order. calculators: [id, title] in CALCULATOR_META order. */
export function buildQueue(registries: Record<string, QueueEntry[]>, calculators: [string, string][]): QueueItem[] {
  const items: QueueItem[] = calculators.map(([id, title]) => ({ tier: 1, registry: "calc", id, title }));
  for (const name of Object.keys(registries).sort()) {
    for (const e of registries[name]) items.push({ tier: tierOf(name, e), registry: name, id: e.id, title: e.title ?? e.antigen ?? e.id });
  }
  // Stable sort keeps registry/file order within a tier; caution lists follow the CAUTION order.
  const regRank = (r: string) => (CAUTION.includes(r) ? CAUTION.indexOf(r) : 0);
  return items.map((it, i) => ({ it, i })).sort((a, b) => a.it.tier - b.it.tier || regRank(a.it.registry) - regRank(b.it.registry) || a.i - b.i).map((x) => x.it);
}

export const itemKey = (it: Pick<QueueItem, "registry" | "id">) => `${it.registry}:${it.id}`;
