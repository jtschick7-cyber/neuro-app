# NeuroHospitalist PWA — Specification

The full spec is `docs/PWA_BUILD_BRIEF.md`. This file records the product decisions.

## Product
- **Name:** NeuroHospitalist Pocket Companion
- **Platform:** PWA for mobile Safari / iOS Home Screen; 100% offline after first load.
- **User:** vascular neurology fellow moving to neurohospitalist practice (Trinity Health Michigan, Epic). Adults, US practice, decision support only.
- **Stack:** Vite, React 18, TypeScript, Tailwind CSS, Lucide React, Vitest, vite-plugin-pwa; GitHub Pages.

## Decisions
1. **Zero backend.** Registries are JSON in `data/`, bundled at build time; no network calls at runtime.
2. **Patient context bar is memory-only.** Weight, age, sex and creatinine feed the calculators but are never stored; they clear when the app closes, so one patient's values can't pre-fill the next. Builds before content 1.1.0 persisted them; the old key is purged on load.
3. **Bedside notes persist on the device** (localStorage) for local pearls only — never patient information.
4. **Disclaimer gate** on first launch and whenever `DISCLAIMER_REVISION` in `src/content/copy.ts` changes.
5. **Content is clinician-signed.** The build fails on unsigned entries or open VERIFY items (`npm run validate:release`).
6. **Public repo and site** for now; the disclaimer states it is a personal reference not endorsed by any institution.
7. **Scope: what a neurohospitalist looks up, not what they know cold.** An entry earns its place when it holds numbers, criteria, panels, interactions or steps that are checked at the bedside and easy to misremember. Material a neurologist knows cold is cut or trimmed to the part that is looked up. Agreed 2026-11-12 (`planning/AUDIT_2026-11-12.md`, scope report).
   - *In:* intrathecal baclofen withdrawal (rare, time-critical, easy to miss); gabapentin and pregabalin renal dosing bands; CSF traumatic-tap correction.
   - *Out or trimmed:* the HSV acyclovir dose alone (10 mg/kg q8h); an aspirin agent card beyond reversal, holds and renal thresholds; core vascular workups beyond their extended panels.
   - Test before adding an entry or a section: would I open the app for this on a consult? If not, leave it out.
