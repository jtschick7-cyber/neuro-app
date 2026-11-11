# neuro-app — Review Task List for Claude Code (2026-11-08 review)

Repo: `jtschick7-cyber/neuro-app` · Base: `main` at 50c7277 · Prepared 2026-11-08 · Owner/clinician: Jason

This list comes from a full content review of all registries and calculators (accuracy, currency,
superfluity, completeness). Claude prepared it in chat; Jason approves each item before it is encoded.
Work top to bottom. Tasks are tagged:

- **READY** — exact text is given here. Encode it once Jason has approved it (he ticks the box).
- **DECISION [JASON]** — Jason picks; then the Claude Code steps are mechanical.
- **BLOCKED (Rn)** — don't start. It needs the research package `Rn` from `RESEARCH_BRIEF_2026-11-08.md`
  (prepared in Claude chat, saved under `planning/drafts/review-2026-11-08/`). When the package
  arrives, encode it word for word, the same way as `planning/drafts/followups-3/`.

### Status as of 2026-11-08 (Jason's decisions)
| Task | Status |
|---|---|
| 1.1 Andexanet | **Approved** — do it (propose the schema change first) |
| 1.2 CHANCE-2 wording | **Approved** — do it |
| 1.3 MDHHS after-hours number | **Approved** — do it |
| 1.4 ICH score caveat | Approved, but **superseded by 2.1**: the ICH score calculator is being removed. Skip it |
| 2.1 Cuts | **All cut** — do §2.1a–d. The §2.1b wording is new: encode it only after Jason ticks its box |
| 2.2 Planned items | **Drop** 7.4, 7.6, 7.10 · **Keep** 7.8 (= task 3.7, BLOCKED on R7) |
| 3.1 TNK 1-kg option | **Moot**: the TNK card and calculator UI are removed. Don't do it; R1 isn't needed |
| 3.11 Old 7.4 items | **Dropped** (2.2). R11 isn't needed |
| Other 3.x and 4.x | Unchanged |

---

## 0. Ground rules (same as NEURO_APP_TASKS.md §0)

1. Read `CLAUDE.md` and `docs/PWA_BUILD_BRIEF.md` first. They win over this file if they conflict.
2. `data/*.json` is clinician-signed. Content edits follow `docs/VERSIONING.md`:
   edit → `npm run validate` → `npm run review-sheets` → **[JASON] signoff** → `npm run release`.
   Claude Code never runs `signoff`, never sets `lastReviewed`, and never removes `verify[]` items.
   Every edited entry goes to `lastReviewed: "UNREVIEWED"`.
3. One feature branch per numbered task group; keep `main` deployable.
4. Before editing, confirm that each target field still matches the **Current** text quoted below. If
   anything has drifted, stop and tell Jason.
5. Schema changes: propose the zod change and version bump first, then wait for Jason's approval.
6. No invented numbers or citations. Anything not confirmed against a primary source goes in `verify[]`.
7. `src/lib/calculators.ts` and its tests are clinical code. Changes need Jason's sign-off; add tests.
8. `keyNumbers` lines must stay exact copies of their source field (`condition + ": " + recommendation`
   for decision rules). When you change a field, update its keyNumber copy.
9. Don't change the context bar's `calc(1.75rem + env(safe-area-inset-top))` top padding.

---

## 1. READY tasks

### 1.1 Andexanet → not US-marketed (supersedes NEURO_APP_TASKS.md task 1.1, which was never encoded) — READY
- [x] Jason approved 2026-11-08

Why: AstraZeneca withdrew Andexxa from the US market effective December 22, 2025, after an FDA
safety communication dated December 18, 2025.

**Schema (propose first):** add `"NOT_US_MARKETED"` to `FormularyStatus` in `schema/acute-neuro.ts`
(imported by `schema/vascular-antithrombotics.ts`). This is an additive enum value, so MINOR schema
bumps for both schemas that use it; propose the exact numbers per `docs/VERSIONING.md`.
UI: `FORMULARY_LABEL.NOT_US_MARKETED = 'Not US-marketed'`. Render the item grey (same style as the
caution-list NOT_US_MARKETED banner) and sort it last within its `reversal`/`uses`/`options` list.
App version MINOR.

**New source string** (add to `sources[]` of `apixaban`, `rivaroxaban`, `edoxaban`, `anticoag-reversal-ich`):
`US Food and Drug Administration. Update on the safety of Andexxa (coagulation factor Xa [recombinant], inactivated-zhzo). FDA safety communication, December 18, 2025. https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/update-safety-andexxa`

**Content — `apixaban`, `rivaroxaban`, `edoxaban` `reversal[1]`** (the item with `agent: "Andexanet alfa"`):

| Field | Current | New |
|---|---|---|
| `doseText` | `Dose depends on agent, dose and time since last dose (unstructured: not stocked locally)` | `Not available in the US (unstructured: withdrawn from the US market Dec 2025)` |
| `notes` | `["Not stocked — not part of local pathway", "Not mentioned in the current <agent> label"]` | `["Withdrawn from the US market effective Dec 22, 2025, after an FDA safety communication (Dec 18, 2025)", "Not mentioned in the current <agent> label"]` (keep each card's own agent name) |
| `evidenceNote` | `["AHA ICH 2022: COR 2a, LOE B-NR"]` | `["AHA ICH 2022: COR 2a, LOE B-NR — predates the 2025 US withdrawal"]` |
| `formularyStatus` | `NOT_STOCKED_LOCAL` | `NOT_US_MARKETED` |
| `role`, `evidenceLevel`, `agent`, `routes` | — | unchanged |

**Content — `four-factor-pcc` `uses[2].notes[0]`**
- Current: `Your formulary's factor Xa reversal agent (andexanet not stocked)`
- New: `Your formulary's factor Xa reversal agent (andexanet was withdrawn from the US market in Dec 2025)`
- `four-factor-pcc` gets the FDA source too.

**Content — `anticoag-reversal-ich`**

| Field | Current | New |
|---|---|---|
| `rules[3].recommendation` | `4F-PCC 50 U/kg (local pathway); andexanet is not stocked` | `4F-PCC 50 U/kg (local pathway); andexanet was withdrawn from the US market (Dec 2025)` |
| `rules[3].evidenceNote[0]` | `AHA ICH 2022: 4F-PCC/aPCC COR 2b, LOE B-NR; andexanet COR 2a, LOE B-NR` | `AHA ICH 2022: 4F-PCC/aPCC COR 2b, LOE B-NR; andexanet COR 2a, LOE B-NR (predates the US withdrawal)` |
| `keyNumbers[2]` | `Apixaban, rivaroxaban or edoxaban: 4F-PCC 50 U/kg (local pathway); andexanet is not stocked` | exact copy of the new rule: `Apixaban, rivaroxaban or edoxaban: 4F-PCC 50 U/kg (local pathway); andexanet was withdrawn from the US market (Dec 2025)` |
| `pearls[2]` | `PCC and andexanet preparation takes 20–45 min depending on site logistics; idarucizumab needs no reconstitution (Li 2025)` | `PCC preparation takes 20–45 min depending on site logistics; idarucizumab needs no reconstitution (Li 2025)` |
| `pearls[4]` | `ANNEXA-I (2024): … no difference in 30-day death or mRS (Li 2025)` | same text + `; andexanet was withdrawn from the US market in Dec 2025 (FDA)` |

- Version: `vascular-antithrombotics` registry MINOR (formulary status, source and recommendation text change).
- Keep the `andexanet` search term so searching "andexanet" still finds these entries.
- In `planning/NEURO_APP_TASKS.md`, mark task 1.1 settled in the existing style, pointing here.
- Accept: andexanet is visible, grey and last on the 3 DOAC cards. `grep -rn "andexanet is not stocked\|andexanet not stocked" data/`
  returns nothing. validate and tests pass.
- Jason, before sign-off: open the FDA page and save it to project knowledge (see the brief's resource list).

### 1.2 CHANCE-2 wording in `dapt-minor-stroke-tia` — READY
- [x] Jason approved 2026-11-08

The ticagrelor card already says "May be reasonable instead of clopidogrel + aspirin in carriers"
(task 1.4). The DAPT entry still uses the stronger wording next to COR 2b.

| Field | Current | New |
|---|---|---|
| `rules[2].recommendation` | `Ticagrelor + aspirin × 21 days, then ticagrelor alone, in preference to clopidogrel-based DAPT (CHANCE-2)` | `Ticagrelor + aspirin × 21 days, then ticagrelor alone, may be reasonable instead of clopidogrel-based DAPT (CHANCE-2)` |
| `keyNumbers[2]` | `…: Ticagrelor + aspirin × 21 days, then ticagrelor alone, in preference to clopidogrel-based DAPT (CHANCE-2)` | exact copy: `NIHSS ≤3 or ABCD2 ≥4, within 24 h, known CYP2C19 loss-of-function carrier: Ticagrelor + aspirin × 21 days, then ticagrelor alone, may be reasonable instead of clopidogrel-based DAPT (CHANCE-2)` |

- Version: `vascular-antithrombotics` PATCH, or absorbed into 1.1's MINOR if both go out together.

### 1.3 Botulism: add the MDHHS after-hours number (`acute-neuro:neuromuscular-respiratory-failure`) — READY
- [x] Jason approved 2026-11-08

Source: MDHHS phone numbers: office hours 517-335-8165; after hours 517-335-9030.

| Field | Current | New |
|---|---|---|
| `keyNumbers[2]` | `Michigan: MDHHS 517-335-8165` | `Michigan: MDHHS 517-335-8165 (office hours); 517-335-9030 (after hours)` |
| `immediateActions[4].action` | `Call the state health department now for consultation and antitoxin (BAT) — Michigan: MDHHS 517-335-8165. Don't wait for lab confirmation (CDC 2021)` | `Call the state health department now for consultation and antitoxin (BAT) — Michigan: MDHHS 517-335-8165 (office hours) or 517-335-9030 (after hours). Don't wait for lab confirmation (CDC 2021)` |
| `institutionVaries[0]` | `MDHHS botulism consult line 517-335-8165 (supplied by local reviewer) — confirm after-hours routing` | `MDHHS Communicable Disease Division 517-335-8165 (office hours); after-hours emergency line 517-335-9030 (MDHHS reporting guide) — confirm local health department routing` |
| `sources[]` | — | add: `Michigan Department of Health and Human Services. Notification requirements for communicable disease reporting (reportable conditions pyramid), rev. 2024-03. https://www.michigan.gov/documents/mdch/ReportableCDPyramid_317048_7.pdf` |

- Version: `acute-neuro` registry MINOR (source added).

### 1.4 ICH score calculator: add the NCS prognosis caveat — SUPERSEDED, skip
- [x] Jason approved 2026-11-08 — then superseded the same day by 2.1, which removes the `ich-score`
  calculator UI. Don't do this task. It's kept here in case the calculator is ever restored. The NCS ICH
  guidance can go on the neuroprognostication card instead (task 4.2 / R12).

Why: NCS 2024: no single clinical variable or grading scale is reliable by itself for counseling
ICH patients; defer prognostication for at least the first 48–72 h except in the most devastated patients.

- `src/lib/calculators.ts`: `ichScore()` returns `warnings: [ICH_SCORE_WARNINGS.prognosis]`, always on,
  where:
  `prognosis: "Not a prognosis on its own: NCS 2024 found no single variable or grading scale, including the ICH score, reliable alone for counseling; defer prognostication ≥48–72 h except in the most devastated patients (Hwang 2024)"`
- `CALCULATOR_META["ich-score"].sources`: add `S.hwang2024 = "Hwang DY, et al. Guidelines for Neuroprognostication in Critically Ill Adults with Intracerebral Hemorrhage (NCS/DGNI). Neurocrit Care 2024;40:395-414. doi:10.1007/s12028-023-01854-7"`.
  Formula, caps, rounding and the mortality table stay unchanged.
- Test: the warning is present for every input (including score 0).
- Regenerate `docs/CALCULATORS.md`; app PATCH.

---

## 2. DECISIONS [JASON] — decided 2026-11-08

### 2.1 Cuts — Jason: cut all (2026-11-08)
Same test as the 2026-11-07 cuts (commit e019db3, which is the model for this batch).

| ☑ | Remove | Notes | Content that goes away (kept visible on purpose) |
|---|---|---|---|
| ☑ | `consult-workups:acute-generalized-weakness` | Delete | Localization checklist (duplicated by GBS, MG crisis, neuromuscular respiratory failure) |
| ☑ | `acute-neuro:ms-relapse` | Delete. **No lines moved** (the optional COPOUSEP carry-over isn't done) | IVMP 500–1000 mg × 3–5 d; oral 1000 mg noninferior (COPOUSEP); PLEX for steroid-refractory |
| ☑ | `consult-workups:diplopia-ptosis` | Delete (not shrunk to pearls) | Mackay 2025 points (61% of nonmicrovascular palsies had vascular risk factors; imaging rules) |
| ☑ | `consult-workups:icu-acquired-weakness` | Delete (not shrunk to pearls) | ATS 2014 MRC <4 definition; EMG PPV/NPV |
| ☑ | `consult-workups:sah-workup` | **Delete outright** (Jason said cut; not merged) | Ottawa SAH Rule; CT <6 h sensitivity ~98.7%; xanthochromia figures; DSA indications; Hunt-Hess/WFNS and high-volume-transfer recs. `thunderclap-headache` keeps its CT, LP, CTA and venography rows; `asah-numbers` keeps the management numbers |
| ☑ | `vascular-antithrombotics:tenecteplase`, `alteplase`, `sich-after-thrombolysis` | Delete | IVT dosing, monitoring table, orolingual angioedema regimen, alteplase label contraindications, post-IVT sICH cryo/TXA/EACA dosing. `thrombolysis-with-prior-antithrombotics` **stays** |
| ☑ | Calculators `tnk-dose`, `alteplase-dose`, `abcd2`, `ich-score` | Remove the UI, manifest ids and nav/search hooks. **Keep the functions, tests and `CALCULATOR_META` in `calculators.ts` untouched** (same as task 6.3 / commit e019db3) | Bedside TNK/alteplase dose math; the ABCD2 posterior-circulation warning; ICH score derivation mortality |
| ☑ | `acute-neuro:post-dural-puncture-headache` | Delete | Uppal 2023 PDPH consensus (caffeine, EBP details) |

#### 2.1a Link-only fixes (remove the dead id; no other change)
Following the e019db3 precedent, an entry whose links change goes to `lastReviewed: "UNREVIEWED"`.

| Entry | Field → remove |
|---|---|
| `acute-neuro:nmosd-mogad-attack` | `relatedIds` → `acute-neuro:ms-relapse` |
| `acute-neuro:status-migrainosus` | `relatedIds` → `acute-neuro:post-dural-puncture-headache` |
| `consult-workups:inpatient-neuropathy` | `relatedIds` → `consult-workups:acute-generalized-weakness` |
| `consult-workups:elevated-ck-myopathy` | `relatedIds` → `consult-workups:acute-generalized-weakness` (leaves `[]`) |
| `consult-workups:myelopathy-workup` | `relatedIds` → `acute-neuro:ms-relapse` |
| `consult-workups:acute-vision-loss` | `relatedIds` → `acute-neuro:ms-relapse` (text edit in 2.1b too) |
| `consult-workups:thunderclap-headache` | `relatedIds` → `consult-workups:sah-workup` (text edit in 2.1b too) |
| `consult-workups:new-demyelinating-lesion` | `relatedIds` → `acute-neuro:ms-relapse` (text edit in 2.1b too) |
| `consult-workups:susac-syndrome` | `relatedIds` → `acute-neuro:ms-relapse` |
| `consult-workups:ich-etiology-workup` | `calculatorIds` → `ich-score` |
| `reference-cards:asah-numbers` | `relatedIds` → `consult-workups:sah-workup` |
| `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics` | `relatedIds` → `tenecteplase`, `alteplase` (leaves `[]`) |
| `vascular-antithrombotics:anticoag-reversal-ich` | `relatedIds` → `vascular-antithrombotics:sich-after-thrombolysis` (rule edit in 2.1b too) |

Text that names alteplase or TNK only as a drug (`cervical-artery-dissection` rules[6]/keyNumbers[1],
`pregnancy-antithrombotics` rules[0]) is not a link. Leave it unchanged.

#### 2.1b Cross-reference text edits — READY
- [X] Jason approved (new wording drafted by the review; approve or edit before encoding)

| Entry · field | Current | New |
|---|---|---|
| `thunderclap-headache` `decisionRules[0].recommendation` | `Exclude SAH first — see sah-workup` | `Exclude SAH first: noncontrast CT; LP if CT is negative and >6 h from onset or new deficit` (`evidenceLevel` STRONG and `evidenceNote` "AHA 2023 aSAH: COR 1, LOE B-NR" unchanged; the LP condition copies this entry's own `workup[1].indication`) |
| `acute-vision-loss` `initialSteps[1]` | `Optic neuritis treatment: see acute-neuro:ms-relapse or acute-neuro:nmosd-mogad-attack` | `Optic neuritis treatment if NMOSD/MOGAD is suspected: see acute-neuro:nmosd-mogad-attack` |
| `new-demyelinating-lesion` `initialSteps[0]` | `Relapse treatment: see acute-neuro:ms-relapse` | **Delete the line** (`NMOSD/MOGAD suspected: see acute-neuro:nmosd-mogad-attack` becomes `initialSteps[0]`) |
| `anticoag-reversal-ich` `rules[8]` (order 9: "After IVT" → "See sich-after-thrombolysis", NOT_GRADED) | — | **Delete the rule.** It's the last rule, so no renumbering. No keyNumber copies it |

#### 2.1c Code, tests and docs
- Calculator UIs: all four cards live in `src/components/StrokeCalculators.tsx` (`ThrombolyticsCard`,
  `IchScoreCard`, `Abcd2Card`; nothing else is in the file), so delete the file and its import and usage in
  `Calculators.tsx`. Remove the 4 ids from `data/calculators.manifest.json` (13 → 9), `src/lib/nav.ts`
  (lines ~82–85) and `src/lib/searchIndex.ts` (lines ~130–133). Check `CalculatorCard.tsx` the way
  e019db3 did.
- `src/lib/searchSynonyms.ts`: the `tPA`/`TNK` rows point at removed entries. Keep them only if they
  still land somewhere useful (e.g., `thrombolysis-with-prior-antithrombotics`); otherwise remove them.
- Tests: `links.test.ts` (calc id list, line ~71), `search.test.ts` ("ICH" → `#/calc/ich-score`, and
  any TNK/tPA cases), `route.test.ts` (`abcd2`), `rereview.test.ts` (`sah-workup` tier, line ~31).
  Leave the function tests in `calculators.test.ts` as they are.
- Docs: `docs/PWA_BUILD_BRIEF.md` — the calculator list (13 → 9) and the must-find search list ("TNK",
  "ICH"). Change a must-find term only if it no longer has a sensible target, and tell Jason which ones.
  `docs/CALCULATORS.md` is generated and lists only manifest ids, so run `npm run build:calc-doc` after
  the manifest edit (don't hand-edit it). Regenerate `docs/REREVIEW.md` (`npm run rereview`).
- Stale pins to removed entries are handled by the existing "No entry" page (as in e019db3).

#### 2.1d Versions (one bump per registry per PR)
| Registry | Level | Why |
|---|---|---|
| `acute-neuro` | MAJOR | 2 entries removed |
| `consult-workups` | MAJOR | 4 entries removed (2.1b text edits absorbed) |
| `vascular-antithrombotics` | MAJOR | 3 entries removed; a rule removed |
| `reference-cards` | PATCH | Link removed only |
| App (`package.json`) | MINOR | Calculator UIs removed; no data-contract change. VERSIONING.md says code/UI changes bump the app. e019db3 didn't bump it; follow VERSIONING.md. If 1.1's schema change is in the same PR, one MINOR covers both |

If tasks 1.1/1.2 (also `vascular-antithrombotics`) are on a separate PR, bump from whatever version is
on `main` when each PR is opened, and tell Jason the resulting numbers.

- Accept: `grep -rn` for each removed id across `data/`, `src/`, `__tests__/`, `docs/` (excluding
  `planning/` and generated history) finds nothing, except the retained calculator functions,
  tests and META. validate, test and `npx tsc --noEmit` pass.

### 2.2 Planned items that were never encoded — decided 2026-11-08
| Decision | Item (NEURO_APP_TASKS.md) | Effect |
|---|---|---|
| **Drop** | 7.4 RPD RT-QuIC specimen handling; Wernicke whole-blood thiamine handling + 500 mg TID as a sourced ALTERNATIVE; AE/Ma2 "order Ma1/Ma2 separately" | Task 3.11 dropped; R11 not needed. Already encoded parts of 7.4 (serotonin-syndrome triggers) stay |
| **Drop** | 7.6 Serotonin syndrome vs NMS side-by-side view | Not built |
| **Keep** | 7.8 Expand `seizure-threshold` and `asm-interactions` | = task 3.7, BLOCKED on R7 |
| **Drop** | 7.10 Lab order codes | Not built. The confirmed codes stay recorded in NEURO_APP_TASKS.md §7.10 for reference |

Claude Code: in `planning/NEURO_APP_TASKS.md`, mark 1.1, 7.4, 7.6, 7.8 and 7.10 in the existing style:
`(settled 2026-11-08: …; see REVIEW_TASKS_2026-11-08)`. 1.1 → done here as task 1.1; 7.4/7.6/7.10 →
dropped; 7.8 → moved to task 3.7.

### 2.3 Decision log entry (add to `planning/DECISION_LOG.md` with the 2.1 PR, word for word)

```markdown
## 2026-11-08 — Review cuts and planned-item decisions

Decided by Jason in chat 2026-11-08 (review: planning/REVIEW_TASKS_2026-11-08.md).

- Cut (entries): consult-workups `acute-generalized-weakness`, `diplopia-ptosis`, `icu-acquired-weakness`, `sah-workup`; acute-neuro `ms-relapse`, `post-dural-puncture-headache`; vascular-antithrombotics `tenecteplase`, `alteplase`, `sich-after-thrombolysis`. Same test as the 2026-11-07 cuts: content Jason knows cold or doesn't look up on rounds. `sah-workup` deleted outright (not merged); no `ms-relapse` lines carried over.
- Cut (calculator UIs): `tnk-dose`, `alteplase-dose`, `abcd2`, `ich-score`. Functions, tests and CALCULATOR_META kept in calculators.ts (task 6.3 precedent).
- Superseded: review task 1.4 (ICH score NCS caveat; approved, then superseded by the ich-score cut) and task 3.1 (TNK 1-kg option; moot without the card or calculator UI). NCS ICH prognosis guidance can go on the planned neuroprognostication card (review task 4.2).
- Planned items: dropped NEURO_APP_TASKS 7.4 (specimen handling, high-dose thiamine, Ma1/Ma2 ordering), 7.6 (SS vs NMS view), 7.10 (lab order codes); kept 7.8 as review task 3.7.
- Cross-reference wording: see REVIEW_TASKS_2026-11-08 §2.1b.
```

---

## 3. BLOCKED tasks (wait for the research package)

Each package arrives as full replacement entries + `CHANGES.md` + decision-log text, in the format of
`planning/drafts/followups-3/`. Encode word for word, keep everything UNREVIEWED, run validate,
tests and review-sheets, show diffs against the CHANGES tables, and open a PR. Don't merge.

**Version numbers in a package (rule from 2026-11-11):** treat the README's bump as a level (MAJOR, MINOR or PATCH)
applied to the registry's current version, not as fixed numbers. A different registry version is not a reason to stop;
a changed entry is. See `docs/VERSIONING.md`, "Encoding approved drafts".

| # | Task | Target | Package |
|---|---|---|---|
| 3.1 | ~~TNK "1-kg dosing <50 kg": confirm the source or remove the option~~ | **MOOT (2026-11-08)**: 2.1 removes the `tenecteplase` entry and the TNK calculator UI. Don't do it. The retained `tnkDose` function keeps the unverified option; resolve it only if the UI is ever restored | ~~R1~~ not needed |
| 3.2 | Restarting OAC after ICH: PRESTIGE-AF, ENRICH-AF, ESO-EANS 2025 | `vascular-antithrombotics:restart-antithrombotic-after-ich` | R2. **DRAFTED (2026-11-11)**: [PR #40](https://github.com/jtschick7-cyber/neuro-app/pull/40); signed and released 2026-11-11 (1.1.1) |
| 3.3 | Hyponatremia "≤8 mmol/L if ODS risk" attribution | `acute-neuro:hyponatremia-ods` `definitions[1]`, `keyNumbers[2]`; `sodiumCorrectionCheck` docstring and META sources | R3. **DRAFTED (2026-11-11)**: [PR #42](https://github.com/jtschick7-cyber/neuro-app/pull/42); signed and released 2026-11-11 (2.1.1) |
| 3.4 | Post-neurosurgical meningitis: IDSA 2017 source + EVD-relevant recs | `acute-neuro:bacterial-meningitis` (post-neurosurgery item and related rows) | R4. **DRAFTED (2026-11-11)**: [PR #43](https://github.com/jtschick7-cyber/neuro-app/pull/43); signed and released 2026-11-11 (2.2.1) |
| 3.5 | PD: continuous infusion therapies now US-marketed; "admitted on a pump" row | `reference-cards:inpatient-parkinson-disease` `pitfalls[1]` (+ optional row) | R5. **DRAFTED (2026-11-11)**: [PR #44](https://github.com/jtschick7-cyber/neuro-app/pull/44); signed and released 2026-11-11 (1.3.1) |
| 3.6 | MG/NMOSD patients on FcRn or complement inhibitors | `acute-neuro:myasthenic-crisis`, `nmosd-mogad-attack` | R6. **DRAFTED (2026-11-11)**: [PR #45](https://github.com/jtschick7-cyber/neuro-app/pull/45); signed and released 2026-11-11 (2.3.1) |
| 3.7 | Seizure-threshold and ASM-interaction expansion (old 7.8) | `seizure-threshold`, `asm-interactions` | R7. **DRAFTED (2026-11-11)**: [PR #46](https://github.com/jtschick7-cyber/neuro-app/pull/46); signed and released 2026-11-11 (seizure-threshold 0.3.1, asm-interactions 0.2.1) |
| 3.8 | ASM NPO/tube coverage for home ASMs not in the registry; phenobarbital | `antiseizure-medications` (new entries or an NPO table) | R8. **DRAFTED (2026-11-11)**: [PR #47](https://github.com/jtschick7-cyber/neuro-app/pull/47); signed and released 2026-11-11 (1.1.1) |
| 3.9 | ESUS: ARCADIA line | `vascular-antithrombotics:esus-antithrombotic` | R9. **DRAFTED (2026-11-11)**: [PR #48](https://github.com/jtschick7-cyber/neuro-app/pull/48) |
| 3.10 | Serotonin syndrome: "triptans + SSRI/SNRI" example wording | `acute-neuro:serotonin-syndrome` `presentation[0]` | R10 |
| 3.11 | ~~Old 7.4 specimen-handling items~~ | **DROPPED (2026-11-08, decision 2.2)**. Don't do it | ~~R11~~ not needed |

Open under 3.2:
- [ ] Recheck restart-antithrombotic-after-ich pearls[3]–[4] against the ENRICH-AF peer-reviewed publication; revisit the dose-eligibility subgroup (R2 B1) then.

Open under 3.9:
- [ ] Check the source of the "ARCADIA cancer subgroup" line in cancer-associated-stroke (R9 P2); consider ARCADIA secondary analyses as a new item (R9 P1).

---

## 4. New entries / functionality

| # | Item | Status |
|---|---|---|
| 4.1 | **"Can it go down the tube?" view** — one screen listing route/tube lines already in signed content. Phase 1 (UI only): aggregate `antiseizure-medications.*.enteral[]` + `ivPo[]`, and deep-link to the PD card's "Enteral route first" section and the aSAH card's nimodipine row. Phase 2 (schema + content): an optional `enteral: Text[]` on vascular AGENT entries, filled by **moving** existing signed pearls word for word (ticagrelor "can be crushed…", dabigatran "swallow capsules whole…"), plus label-sourced lines from R8. | Phase 1: Claude Code proposes the design → Jason approves. Phase 2: propose the schema first |
| 4.2 | Neuroprognostication card (NCS series: GBS, ICH, SE, ± AIS/aSAH/TBI). Include the NCS ICH guidance from superseded task 1.4 (don't use the ICH score alone for prognosis or limiting care) | BLOCKED (R12) |
| 4.3 | Neurosyphilis / ocular and otic syphilis entry | BLOCKED (R13) |
| 4.4 | ARIA on anti-amyloid therapy entry | BLOCKED (R14) |
| 4.5 | Optional: Lyme neuroborreliosis | BLOCKED (R15) |
| 4.6 | Optional: Boston criteria 2.0 rows in `ich-etiology-workup` | BLOCKED (R16) |

For new registries or fields: propose the schema change and entry list first, one registry at a time.

---

## 5. Final verification
- `npm run validate`, `npm test`, `npx tsc --noEmit` pass on each branch; `npm run build` passes on
  `main` after Jason's sign-off.
- `npm run review-sheets` for every content PR; `npm run release` after sign-off (regenerates
  `generated/about.json`, `docs/CALCULATORS.md`, schemas).
- Search still finds: "andexanet", "botulism", "CHANCE-2".
- Search for "ICH", "TNK" and "tPA" lands on a remaining entry (e.g., `ich-etiology-workup`, `anticoag-reversal-ich`, `thrombolysis-with-prior-antithrombotics`) and not on a removed route. Tell Jason where each now lands.
- No route, pin target or search hit points at a removed id (the "No entry" page handles old pins).

---

## 6. Considered and not changed (kept visible on purpose)

| Item | Decision | Why |
|---|---|---|
| Bentracimab pearl ("check current availability") | No change | No FDA approval found as of 2026-11-08; the hedge is still correct. Re-check before each release |
| Mannitol label warning (0.25 g/kg q6–8h) | No change | Matches the Osmitrol label |
| SALSA 2 / 4 mL/kg | No change | Matches the trial protocol |
| CRAO thrombolysis trials (REVISION etc.) | Not added | Only protocols found; no results to encode |
| HIT management, LV thrombus anticoagulation | Not proposed | Avoids bloat; not raised as gaps |
| Neural-antibody percentages, Jost 2023 LEDD factors, ASRA 2025 intervals, ENLS v6 osmolar-gap wording | Not re-verified | Taken as cited; spot-checks only. Re-verify if any is questioned |
