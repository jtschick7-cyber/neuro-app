# NeuroHospitalist PWA — content pipeline

- `schema/*.ts` — zod schemas (source of truth; TS types via `z.infer`)
- `schema/*.schema.json` — generated JSON Schema (`npm run build:schema`); cross-field rules live only in zod
- `data/*.json` — registries (acute-neuro, consult-workups, vascular-antithrombotics, neural-antibodies, antiseizure-medications, reference-cards; caution lists mg-contraindications, seizure-threshold, rcvs-triggers; asm-interactions; syndrome-vocabulary); `data/calculators.manifest.json` — calculator ids that `calculatorIds`/`calc:` refs must match
- `src/lib/calculators.ts` — pure calculator functions + `CALCULATOR_META` (formula, caps, rounding, sources, verify)
- `src/content/copy.ts` — disclaimer, banners, legends, About text
- `generated/about.json` — content version, review status, deduplicated sources (`npm run build:about`)
- `docs/CALCULATORS.md` — generated from `CALCULATOR_META` (`npm run build:calc-doc`)
- `docs/VERSIONING.md` — version rules; `docs/RELEASE_CHECKLIST.md` — pre-release review; `docs/PWA_BUILD_BRIEF.md` — app spec
- `CLAUDE.md` — standing instructions for Claude Code

Commands
- `npm run validate` — schema + integrity; open `verify[]` and `UNREVIEWED` are warnings
- `npm run validate:release` — same, but open `verify[]`, `UNREVIEWED` or a signed entry changed since sign-off fail the build
- `npm test` — all Vitest suites in `__tests__/` (calculators, integrity gates, routing, search, offline and storage guards, UI contracts)
- `npm run check:generated` — fail if generated files are stale (CI and deploy run it)
- `npm run release` — release validation, tests, then all generated files
- `npm run review-sheets` / `npm run signoff -- <registry> <id…>` — clinician review and sign-off

Sign-off: resolve an entry's `verify[]`, then `npm run signoff -- <registry> <id…>` sets `lastReviewed`, bumps the registry PATCH version and records the content hash in `generated/signoff.json` (`docs/VERSIONING.md`). Scope rule: `SPEC.md` decision 7.
