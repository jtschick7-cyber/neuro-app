# PWA build brief (for Claude Code)

**What it is.** Offline, mobile-first reference app for one neurologist's inpatient consults and emergencies. US practice, adults, decision support only. No accounts, no sync, no analytics, no network calls at runtime, no patient data stored.

**Stack (fixed):** React 18 + Vite + TypeScript + Tailwind 4 + Lucide + vite-plugin-pwa + Vitest; GitHub Pages at `/neuro-app/` via `.github/workflows/deploy.yml`.

## Inputs the app consumes
| Path | What | Use |
|---|---|---|
| `data/*.json` | Registries (below) | Import directly; bundled at build |
| `schema/*.ts` | zod schemas = source of truth | `import type` + `z.infer<>` for types (zod stays out of the bundle) |
| `src/lib/calculators.ts` | Pure calculator functions + `CALCULATOR_META` | Import; never re-implement math in UI |
| `src/content/copy.ts` | Disclaimer, footer, banners, legends, About text | All user-facing boilerplate |
| `generated/about.json` | `contentVersion`, review status, deduped sources | About/Sources page; footer; cache key |

## Registries → screen types
- `acute-neuro` — emergency protocol (immediate actions, workup, treatment, pitfalls) — **built**
- `consult-workups` — consult workup (differential, workup priorities, decision rules, recs template) — **built**
- `vascular-antithrombotics` — union on `kind`: `AGENT` (drug card) | `DECISION` (ordered rules) — **built**
- `neural-antibodies` — antibody card — **built**
- Caution lists (`schema/caution-list.ts`): `mg-contraindications`, `seizure-threshold`, `rcvs-triggers` — **built** (`MgRegistryView`, `ReferenceCard`)
- Interaction list (`schema/drug-interactions.ts`): `asm-interactions` — **built**
- Cross-links: `relatedIds` are `"registry:id"`; `"calc:<id>"` and `calculatorIds` open calculators — **built** (`RelatedLinks`, `src/lib/links.ts`)

## Calculators
All 9 ids in `data/calculators.manifest.json` are built: `levetiracetam-load`, `valproate-load`, `fosphenytoin-load`, `phenytoin-correction`, `hypertonic-saline-bolus`, `mannitol-dose`, `ledd`, `cockcroft-gault`, `sodium-correction`. Every manifest id needs a UI.

`CALCULATOR_META` holds only these 9. The eight unshipped calculators (lacosamide, ICH score, ABCD2, CHA₂DS₂-VASc, HAS-BLED, TNK, alteplase, IVIG) were deleted on 2026-11-12 (audit P2-8); a new calculator needs a spec, metadata, tests and a card before it joins the manifest.

## Hard requirements
1. Disclaimer gate (`DisclaimerGate`, built) on first launch and whenever `DISCLAIMER_REVISION` changes.
2. Footer on every entry/calculator: `FOOTER` with the entry's `lastReviewed` and `contentVersion`; entry id visible at the bottom (caution cards done).
3. Banners from `BANNERS`: UNREVIEWED, VERIFY, NOT_US_MARKETED (sort last, grey, never hide), STALE (> `STALE_AFTER_MONTHS`), CALC_INSTITUTIONAL, CALC_LABEL_DIFFERS.
4. **No patient data persisted.** The context bar and calculator inputs are memory-only. Allowed localStorage keys: bedside notes, pinned favorites (`neurohosp.pins.v1`, entry ids only) and the disclaimer acknowledgment.
5. Offline: everything precached; cache tied to `contentVersion`; full function in airplane mode.
6. Badges from enums only, with legends from `copy.ts`.
7. Global search across all registries (titles, `searchTerms`, generics, brands, antigen names). Must find: "mag", "TNK", "ICH", "Botox", "Keppra", "status".
8. Every entry shows sources and evidence notes; calculators show formula, caps, rounding, warnings and sources from `CALCULATOR_META` (done for built cards).
9. About page from `ABOUT` + `generated/about.json` (versions, review status, sources, legends).

## Build and release
- `npm run build` runs `validate:release` → `tsc` → `vite build`; `npm test` must pass. CI runs both on every PR (`ci.yml`) and before every deploy.
- Mobile first: one-handed use, large tap targets, dark theme, fast cold start.
- Acceptance = `docs/RELEASE_CHECKLIST.md` section B "App".
