# schema/acute-neuro.ts — 1.0.0 → 1.1.0 (item 7.9, approved by Jason 2026-11-07)

Additive enum values only; every 1.0.0 entry still validates (checked with zod against the 7.7 `nms-parkinsonism-hyperpyrexia` draft). Schema MINOR per VERSIONING.md. `data/acute-neuro.json` `schemaVersion` → "1.1.0" at final assembly. App MINOR only if the UI maps category/route enums to labels (add labels for the three new values).

```ts
export const ACUTE_NEURO_SCHEMA_VERSION = "1.1.0"; // was "1.0.0"

export const AcuteNeuroCategory = z.enum([
  // ...existing 8 values unchanged...
  "HEADACHE", // 1.1.0 (item 7.9)
]);

export const Route = z.enum([
  // ...existing 11 values unchanged...
  "EPIDURAL",   // 1.1.0 (item 7.9): epidural blood patch
  "PERINEURAL", // 1.1.0 (item 7.9): greater occipital / supraorbital nerve blocks
]);
```

`schema/reference-cards.ts` imports `EvidenceLevel` from acute-neuro — unaffected.

Entries using the new values: `acute-neuro:status-migrainosus` (HEADACHE, PERINEURAL), `acute-neuro:post-dural-puncture-headache` (HEADACHE, PERINEURAL, EPIDURAL).
