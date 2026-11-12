/**
 * Content-integrity helpers shared by validate.ts and signoff.ts.
 *
 * Sign-off hashes (generated/signoff.json): signing an entry records the date and a sha256 of the entry's
 * content (every field except lastReviewed). The validator recomputes the hash, so an edit to a signed entry
 * that was not reset to UNREVIEWED and re-signed is caught, as is a lastReviewed date set by hand.
 */
import { createHash } from "node:crypto";
import { readFileSync, existsSync } from "node:fs";

export const SIGNOFF_FILE = "generated/signoff.json";

export type SignoffRecord = { date: string; sha256: string };
export type SignoffRecords = Record<string, SignoffRecord>; // key "registry:id"
export type RawEntry = { id: string; lastReviewed?: string } & Record<string, unknown>;
export type Problem = { level: "error" | "warn"; message: string };

/** sha256 of the entry as written in the data file, minus lastReviewed. Key order counts, which errs on the side of re-review. */
export function entryHash(entry: RawEntry): string {
  const { lastReviewed: _ignored, ...content } = entry;
  return createHash("sha256").update(JSON.stringify(content)).digest("hex");
}

export function readSignoffs(path = SIGNOFF_FILE): SignoffRecords {
  return existsSync(path) ? (JSON.parse(readFileSync(path, "utf8")) as SignoffRecords) : {};
}

/** Stable output: keys sorted, one record per line block. */
export function serializeSignoffs(records: SignoffRecords): string {
  const sorted = Object.fromEntries(Object.keys(records).sort().map((k) => [k, records[k]]));
  return JSON.stringify(sorted, null, 2) + "\n";
}

/**
 * Compare one registry's entries with the sign-off records.
 * - signed entry whose content or date differs from its record: always an error
 * - signed entry with no record: error in release mode, warning otherwise
 * - record for an id the registry no longer has: warning
 */
export function checkSignoffs(registry: string, entries: RawEntry[], records: SignoffRecords, release: boolean): Problem[] {
  const out: Problem[] = [];
  for (const e of entries) {
    if (!e.lastReviewed || e.lastReviewed === "UNREVIEWED") continue;
    const key = `${registry}:${e.id}`;
    const rec = records[key];
    if (!rec) {
      out.push({ level: release ? "error" : "warn", message: `${key}: signed ${e.lastReviewed} but has no sign-off hash in ${SIGNOFF_FILE} — re-sign with npm run signoff` });
    } else if (rec.date !== e.lastReviewed) {
      out.push({ level: "error", message: `${key}: lastReviewed ${e.lastReviewed} does not match its sign-off record (${rec.date}) — dates are set only by npm run signoff` });
    } else if (rec.sha256 !== entryHash(e)) {
      out.push({ level: "error", message: `${key}: content changed since sign-off on ${rec.date} — reset to UNREVIEWED and re-sign (docs/VERSIONING.md)` });
    }
  }
  const ids = new Set(entries.map((e) => e.id));
  for (const key of Object.keys(records)) {
    const [reg, id] = key.split(":");
    if (reg === registry && !ids.has(id)) out.push({ level: "warn", message: `${key}: sign-off record for an entry that no longer exists` });
  }
  return out;
}

/** Every calculatorIds array anywhere inside a value, with its JSON path. */
export function collectCalculatorIds(value: unknown, path = ""): { path: string; id: string }[] {
  if (Array.isArray(value)) return value.flatMap((v, i) => collectCalculatorIds(v, `${path}[${i}]`));
  if (!value || typeof value !== "object") return [];
  return Object.entries(value).flatMap(([k, v]) => {
    const p = path ? `${path}.${k}` : k;
    if (k === "calculatorIds" && Array.isArray(v)) return v.filter((id): id is string => typeof id === "string").map((id, i) => ({ path: `${p}[${i}]`, id }));
    return collectCalculatorIds(v, p);
  });
}
