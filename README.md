# NeuroHospitalist PWA — content pipeline

- `schema/*.ts` — zod schemas (source of truth; TS types via `z.infer`)
- `schema/*.schema.json` — generated JSON Schema (`npm run build:schema`); cross-field rules live only in zod
- `data/*.json` — registries (acute-neuro, consult-workups, vascular-antithrombotics, neural-antibodies; caution lists mg-contraindications, seizure-threshold, rcvs-triggers; asm-interactions); `data/calculators.manifest.json` — calculator ids that `calculatorIds`/`calc:` refs must match
- `src/lib/calculators.ts` — pure calculator functions + `CALCULATOR_META` (formula, caps, rounding, sources, verify)
- `src/content/copy.ts` — disclaimer, banners, legends, About text
- `generated/about.json` — content version, review status, deduplicated sources (`npm run build:about`)
- `docs/CALCULATORS.md` — generated from `CALCULATOR_META` (`npm run build:calc-doc`)
- `docs/VERSIONING.md` — version rules; `docs/RELEASE_CHECKLIST.md` — pre-release review; `docs/PWA_BUILD_BRIEF.md` — app spec
- `CLAUDE.md` — standing instructions for Claude Code

Commands
- `npm run validate` — schema + integrity; open `verify[]` and `UNREVIEWED` are warnings
- `npm run validate:release` — same, but open `verify[]` or `UNREVIEWED` fail the build
- `npm test` — calculator tests (Vitest)
- `npm run release` — release validation, tests, then all generated files
- `npm run review-sheets` / `npm run signoff -- <registry> <id…>` — clinician review and sign-off

Sign-off: clear an entry's `verify[]`, set `lastReviewed` to the ISO date, bump the registry `version` per `docs/VERSIONING.md`.
