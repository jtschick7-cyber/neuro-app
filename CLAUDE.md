# CLAUDE.md - Developer Guidelines for NeuroHospitalist PWA

## Commands
- **Dev Server:** `npm run dev`
- **Build:** `npm run build`
- **Test:** `npm run test`
- **Lint / Typecheck:** `npx tsc --noEmit`

## Code Style & Guardrails
- **TypeScript First:** Never use `any`. All clinical calculator inputs, outputs, and JSON registries must have explicit TypeScript interfaces.
- **Deterministic Math:** Weight-based dosing calculations must enforce explicit caps (e.g., Fosphenytoin PE caps, Valproate caps) and round to clinically actionable decimal places.
- **Zero External UI Bloat:** Use Tailwind CSS utility classes and Lucide icons. Keep bundle size minimal for instant mobile load times.
- **Offline Integrity:** Ensure service worker caching (`vite-plugin-pwa`) is active so all JSON registries and calculator logic remain functional without network connectivity.
