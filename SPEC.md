# NeuroHospitalist PWA - Technical Specification & Architecture

## 1. Project Overview & Operational Goals
- **App Name:** NeuroHospitalist Pocket Companion
- **Target Platform:** Progressive Web App (PWA) optimized for mobile Safari / iOS Home Screen usage in hospital dead zones. 100% offline-first capability via service worker caching.
- **Primary User:** Vascular Neurology Fellow transitioning to NeuroHospitalist practice, needing sub-second access to high-yield non-vascular inpatient emergencies, dosing calculators, consult workup checklists, and medication contraindication alerts.
- **Tech Stack:** Vite, React 18, TypeScript, Tailwind CSS, Lucide React, Vitest.

## 2. Core Architectural Principles
1. **Zero-Backend / 100% Client-Side:** All reference registries are stored as typed JSON files bundled at build time. No external database or network dependency required during shifts.
2. **Sticky Patient Context Bar:** A persistent top-bar component capturing basic patient parameters (Weight in kg, Age, Sex, Serum Creatinine) with `localStorage` persistence. Entering weight once automatically recalculates all weight-based dosing cards globally without saving PHI.
3. **Local Bedside Notes:** Every reference card includes an expandable local note textarea persisting institution-specific pearls (e.g., local PLEX contact numbers, formulary restrictions) via browser `localStorage`.
4. **Compile-Time Safety:** All static JSON registries must conform to strict TypeScript interfaces.

## 3. Directory Structure
```text
src/
├── App.tsx
├── main.tsx
├── index.css
├── data/
│   ├── mg-contraindications.json
│   ├── acute-neuro.json
│   ├── vascular-antithrombotics.json
│   └── consult-workups.json
├── lib/
│   ├── calculators.ts
│   └── storage.ts
└── components/
    ├── ContextBar.tsx
    ├── SearchPalette.tsx
    ├── CalculatorCard.tsx
    ├── ReferenceCard.tsx
    └── BedsideNotes.tsx
```
