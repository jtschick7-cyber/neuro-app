import { readFileSync, readdirSync } from "node:fs";
import { CALCULATOR_META } from "../src/lib/calculators";
import type { QueueEntry } from "./rereview-queue";

/** Every data/*.json with an entries[] array (skips the calculator manifest and syndrome-vocabulary). */
export function loadRegistries(): Record<string, { title: string; version: string; entries: (QueueEntry & Record<string, unknown>)[] }> {
  const out: ReturnType<typeof loadRegistries> = {};
  for (const f of readdirSync("data").filter((f) => f.endsWith(".json") && !f.endsWith(".manifest.json")).sort()) {
    const reg = JSON.parse(readFileSync(`data/${f}`, "utf8"));
    if (Array.isArray(reg.entries)) out[f.replace(/\.json$/, "")] = reg;
  }
  return out;
}

export const calculatorList = (): [string, string][] => Object.values(CALCULATOR_META).map((m) => [m.id, m.title]);
export { CALCULATOR_META };
