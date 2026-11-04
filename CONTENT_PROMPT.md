# Prompt for a regular chat: NeuroHospitalist content generation

Copy everything below the line into a new chat. Attach `src/data/mg-contraindications.json` and `CALCULATORS.md` if the chat allows attachments.

---

## Your role

You are helping a vascular neurology fellow, who is moving into neurohospitalist practice, write the clinical content for an offline mobile reference app (PWA). The app is a bedside companion for inpatient neurology consults and emergencies. I will review everything before it ships, but the output must be as accurate and source-aware as you can make it.

## How we will work

1. Before writing anything, ask me up to 8 clarifying questions (institution/country, formulary constraints, which guidelines I trust, level of detail wanted, etc.). Then wait.
2. Work on ONE registry at a time. For each, first propose the entry list (ids and one-line scope) and wait for my edits. Only then write the entries, in batches of 5–8, as valid JSON.
3. After each batch, list the claims you are least sure of and which source would settle them.

## Accuracy and safety rules

- Base content on named, current guidelines or consensus (AHA/ASA, AAN, NCS, ESO, ILAE, IDSA, International Consensus Guidance for MG, etc.). Put the source and year in a `sources` field on every entry.
- Never invent doses, thresholds or citations. If unsure, write `"VERIFY"` in that field and say why in your batch notes.
- Prefer ranges and decision rules over single numbers where evidence is soft. Flag anything where practice varies by institution.
- Keep text terse and scannable: this is read at the bedside on a phone. Pearls in 1–2 sentences, bullets over paragraphs.
- This is decision support for a clinician, not patient advice.

## Registries to produce (JSON, bundled at build time)

Follow the style of the attached `mg-contraindications.json`: a top-level object with `title`, `version`, `lastUpdated`, and `entries[]`. Every entry has a stable kebab-case `id`, plus `sources: string[]`. Propose a TypeScript-friendly schema for each (enums as UPPER_SNAKE strings, no nulls, arrays instead of optional strings), show me the schema first, and wait for approval.

1. **`acute-neuro.json`**: high-yield non-vascular inpatient neurologic emergencies. Candidate topics: convulsive and non-convulsive status epilepticus, myasthenic crisis, Guillain-Barre, autoimmune encephalitis, bacterial/viral meningitis and encephalitis, NMOSD/MOGAD/MS relapse, cord compression, elevated ICP/herniation, PRES, serotonin syndrome, NMS, wernicke, hyponatremia/osmotic demyelination, delirium vs encephalopathy, acute neuromuscular weakness, CNS infections in the immunocompromised. Suggested fields: `presentation`, `immediateActions[]` (time-ordered), `workup[]`, `treatment[]` (agent, dose, route, notes), `pitfalls[]`, `escalateWhen[]`, `sources[]`.
2. **`vascular-antithrombotics.json`**: anticoagulant/antiplatelet decision support. Candidate topics: thrombolysis/thrombectomy exclusions on DOACs, DOAC and warfarin reversal (agent, dose), restart timing after ischemic stroke and ICH, bridging, antiplatelet choice and duration after minor stroke/TIA, periprocedural holds (LP, EVD, surgery), HIT, anticoagulation in cerebral venous thrombosis. Suggested fields: `scenario`, `recommendation`, `timing`, `doses[]`, `caveats[]`, `evidenceLevel`, `sources[]`.
3. **`consult-workups.json`**: checklists by consult reason. Candidate topics: altered mental status, new seizure, acute weakness, headache (incl. thunderclap), dizziness, neuropathy, abnormal movements, coma/prognostication, brain death determination, new cognitive decline. Suggested fields: `reason`, `historyChecklist[]`, `examChecklist[]`, `labsAndImaging[]`, `redFlags[]`, `commonDiagnoses[]`, `sources[]`.

## Other content I also need (do after the registries)

- **Calculator review.** Critique the rules in `CALCULATORS.md` against current practice: the lacosamide "extremes of weight" threshold (I used 50 kg), whether 3% saline needs a volume cap, mannitol contraindications (osmolality > 320, severe AKI), and the LEDD conversion factors. Cite sources.
- **Additional calculators worth adding**, with exact formulas and caps: Cockcroft-Gault CrCl (the app already captures age, sex, weight and creatinine), ICH score, ABCD2, CHA2DS2-VASc, HAS-BLED, NIHSS reference text, tPA/TNK weight-based dosing, IVIG and PLEX dosing for MG crisis/GBS, and corrected sodium or free water deficit if you judge them useful. For each: inputs, formula, limits, rounding, and 5 test cases with expected outputs I can put in unit tests.
- **Additional MG-style safety lists**: drugs to avoid or use cautiously in other conditions (e.g. seizure-threshold-lowering drugs, QT-prolonging agents with common neurologic drugs, serotonin-syndrome-risk drugs, AED interactions) in the same JSON style.
- **App copy**: a short disclaimer, an "about / sources / last reviewed" page, and a versioning and review-cadence plan for the data files.
- **Review checklist**: a one-page checklist I can use to verify each JSON file before release (dose cross-checks, source dates, unit consistency).

## Output format

- JSON only inside fenced `json` blocks, one file's worth per batch, valid and parseable.
- Then a short "Needs verification" list for that batch.
- Do not restate content I already approved.

Start by asking your clarifying questions.
