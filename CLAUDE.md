# CLAUDE.md — NeuroHospitalist PWA

Offline mobile PWA for one neurologist's inpatient consults (React 18 + Vite + TypeScript + Tailwind + vite-plugin-pwa, deployed to GitHub Pages at `/neuro-app/`). **Read `docs/PWA_BUILD_BRIEF.md` first — it is the spec and lists what is built vs still to build.**

## Commands
- `npm run dev` · `npm test` (Vitest, `__tests__/`) · `npx tsc --noEmit`
- `npm run build` — runs `validate:release` first; fails if any content is unsigned or has open VERIFY items
- `npm run validate` — schema + integrity checks for `data/*.json`
- `npm run release` — release checks, then regenerate `schema/*.schema.json`, `docs/CALCULATORS.md`, `generated/about.json`

## Clinical content rules (non-negotiable)
- `data/*.json` is clinical content signed off by the clinician. **Never edit it during app work.** If content looks wrong, stop and say so. Content changes follow `docs/VERSIONING.md` (edit → validate → review-sheets → signoff → release).
- `src/lib/calculators.ts` and `__tests__/calculators.test.ts` are clinical code. Don't change formulas, caps, rounding or `CALCULATOR_META`; import the functions. Never re-implement dose math in components.
- Types come from the zod schemas in `schema/*.ts` via `z.infer` with `import type` (keeps zod out of the bundle). Don't hand-write duplicate types.
- All user-facing boilerplate (disclaimer, banners, legends, About text) lives in `src/content/copy.ts`.

## App guardrails
- **TypeScript first:** never use `any`.
- **No persistence of patient data:** the patient context bar and calculator inputs live in memory only. The only localStorage keys allowed are bedside notes (`neurohosp.note.v1.*`), pinned favorites (`neurohosp.pins.v1`, a list of `"registry:id"` entry ids only — never patient data or free text), and the disclaimer acknowledgment.
- **No runtime network calls,** analytics or accounts. Everything is bundled and precached for offline use.
- **Zero UI bloat:** Tailwind utilities and Lucide icons only; keep the bundle small.
- Badges come from enums (tier, evidence level, formulary) — never free text.

## Layout
`data/` registries · `schema/` zod schemas · `src/lib/` calculators, registry loaders, storage · `src/components/` UI · `src/content/copy.ts` · `generated/about.json` · `docs/` brief, checklist, versioning, calculator spec · `scripts/` validation, sign-off and generators (`*batch*.mjs`, `mg-build.mjs` are historical — never rerun)
