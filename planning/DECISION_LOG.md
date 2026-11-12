# DECISION_LOG

## 2026-11-06 — Item 1.3: THALES stenosis threshold

**Status:** final (approved by Jason 2026-11-06). Drafts: `drafts/vascular-antithrombotics.{ticagrelor,dapt-minor-stroke-tia,icad-symptomatic}.json` + `.CHANGES.md`.

### Finding
The ≥50% / >30% / ≥30% figures are not one inconsistency to collapse into one number; they come from three recommendations:
- THALES Methods and AHA 2026 §4.8 Rec 13 (COR 2b, B-R): **≥50%** symptomatic intracranial/extracranial stenosis is a **high-risk-TIA qualifier** (alternative to ABCD2 ≥6), not a standalone route and not applied to stroke.
- Kleindorfer 2021 §5.19 Rec 4 (COR 2b, B-R SR): **≥30%** stenosis that could account for "the event", framed as a standalone criterion. Supportive text doesn't explain the 30%; differs from the trial's enrollment criterion.
- Kleindorfer 2021 §5.1.1 Rec 3 (COR 2b, B-NR): ipsilateral **>30%** intracranial stenosis — separate ICAD recommendation. §5.19 says the more specific recommendation takes priority.

### Decisions (confirmed by Jason)
1. Keep the thresholds separate, each labeled by source; don't force one number across all three entries.
2. THALES condition text, used verbatim in `ticagrelor` uses[0] and `dapt-minor-stroke-tia` rule 4: "Noncardioembolic minor stroke (NIHSS ≤5) or high-risk TIA (ABCD2 ≥6, or symptomatic ≥50% intracranial/extracranial stenosis that could account for the TIA), <24 h, no IVT (THALES)". Lead evidence note: AHA 2026 COR 2b, LOE B-R.
3. Option A: keep the Kleindorfer §5.19 line, labeled "Kleindorfer 2021 §5.19: COR 2b, LOE B-R (SR) — used ≥30% stenosis for any event", plus one `dapt-minor-stroke-tia` pearl naming all three thresholds and pointing to `icad-symptomatic` rule 3. (Options B — drop the line — and C — leave as is — rejected.)
4. `icad-symptomatic`: rule 3 condition clarified (applies below the entry's 50–99% range; not the THALES ≥50% criterion); population line added; pearl from §5.1.1 supportive text 3. Recommendation, COR and LOE unchanged.
5. `ticagrelor` uses[3] unchanged (matches §5.1.1 Rec 3). Optional "§5.1.1 takes priority over §5.19" note skipped to keep the card short.
6. THALES paper added to `sources[]` of `ticagrelor` and `dapt-minor-stroke-tia`; `relatedIds` link `dapt-minor-stroke-tia` → `icad-symptomatic` added.
7. No schema change. Registry `vascular-antithrombotics`: MINOR bump (threshold/evidence/source change), applied once at final assembly. All three entries → `lastReviewed: "UNREVIEWED"`.

### Deprioritized / noted, not changed (out of scope for 1.3)
- `ticagrelor` uses[3] doseText "(unstructured: see ICAD entry, pending)" → task 1.2.
- `ticagrelor` uses[1] "Preferred over clopidogrel + aspirin in carriers" → task 1.4.
- `thrombolysisRule` lines → task 1.5.
- `ticagrelor` uses[3] role SECOND_LINE on a COR 2b recommendation — noticed only; not in any task.

### Open verify[] items
None.

## 2026-11-06 — Item 1.5: IVT with prior antiplatelets / LMWH

**Status:** final (approved by Jason 2026-11-06). Drafts: `drafts/vascular-antithrombotics.{thrombolysis-with-prior-antithrombotics,aspirin,clopidogrel,ticagrelor,cilostazol,aspirin-dipyridamole,enoxaparin}.json` + `.CHANGES.md`. Built from the full `data/vascular-antithrombotics.json` (v0.7.1) Jason supplied.

### Findings
- Antiplatelets: AHA 2026 §4.6.1 Rec 9 (COR 1, B-NR) — IVT recommended in otherwise-eligible patients on SAPT or DAPT despite higher sICH. One recommendation covers both; supportive text gives sICH +0.9% (SAPT) / +1.2% (DAPT) absolute vs ~8% absolute benefit. The old "not addressed in AHA 2026" text was wrong.
- The guideline does not name individual antiplatelet agents → class-level statement applied to ticagrelor, cilostazol, aspirin-dipyridamole and labeled as such.
- LMWH: absent from AHA 2026 §4.6 (all recommendation tables, Table 7, every Table 8 row, §4.6.5). Secondary summaries' "therapeutic LMWH within 24 h" contraindication traced to Powers 2019 §3.5.5 Rec 7 (COR III: Harm, B-NR), full treatment doses only.

### Decisions (confirmed by Jason)
1. Rule 4 split: rule 4 = SAPT/DAPT (STRONG, AHA 2026 Rec 9); rule 5 = full treatment-dose LMWH within 24 h → no IVT, not prophylactic doses; old rule 5 "After IVT" → order 6 (text unchanged). SAPT and DAPT kept as one rule (one 2026 recommendation).
2. LMWH rule evidenceLevel STRONG (option a, repo convention for COR 3), with "Not restated in AHA 2026 §4.6 or Table 8" in evidenceNote. Option b (downgrade) rejected.
3. Antiplatelet `thrombolysisRule` wording as drafted; "(class-level statement; agent not named)" on ticagrelor, cilostazol, aspirin-dipyridamole; see-also lines kept.
4. Aspirin `thrombolysisRule` also gets AHA 2026 §4.8 Recs 16 and 17 (both COR 3: Harm, B-R). Powers 2019 Rec 6 (IV aspirin within 90 min) not cited — superseded by 2026 Rec 17.
5. Enoxaparin `thrombolysisRule`: Powers 2019 full-dose LMWH line + see-also.
6. `institutionVaries`: "Local policy on LMWH exposure (AHA 2026 silent; Powers 2019 rule applies to full doses only)".
7. Powers 2019 added to `sources[]` of `thrombolysis-with-prior-antithrombotics` and `enoxaparin`; AHA 2026 added to `cilostazol` `sources[]` (newly cited).
8. Ticagrelor 1.5 edit applied on top of the final 1.3 draft (one combined replacement entry).
9. No schema change. Registry MINOR bump (shared with 1.3; applied once at final assembly). All edited entries → `"UNREVIEWED"`.

### Deprioritized / noted, not changed
- `heparin-ufh` `thrombolysisRule` ("Received heparin with aPTT >40 s: do not give IVT") — not in 1.5's list; possible follow-up.
- `relatedIds` link from `thrombolysis-with-prior-antithrombotics` to `enoxaparin` — not added (not approved).
- Powers 2019 Recs 1 and 6 — restated in AHA 2026 (§4.6.1 Rec 10; §4.8 Rec 17); 2026 versions cited instead.

### Open items
- No `verify[]` items.
- Add the Powers 2019 §3.5.5 screenshots (p. e365) to project knowledge so later chats can verify rule 5.

## 2026-11-06 — Item 7.1: ASM dosing cards + phenytoin calculator

**Status:** final (approved by Jason 2026-11-06), including proposed A–E. Drafts: `drafts/schema.antiseizure-medications.ts`, `drafts/antiseizure-medications.{levetiracetam,lacosamide,brivaracetam,valproate,phenytoin-fosphenytoin,lamotrigine}.json`, `drafts/antiseizure-medications.registry-envelope.json`, `drafts/calc-phenytoin-correction.md`. All six entries and the registry envelope validated against the draft schema with zod.

### Decisions (confirmed by Jason)
1. New registry `antiseizure-medications`, one card per drug (6). Schema 1.0.0; registry version 1.0.0 (VERSIONING.md defines no starting version); app MINOR bump (new registry + calculator UI). Structured CrCl rows for context-bar highlighting; at shared band endpoints, highlight both rows.
2. Phenobarbital out — no source. CRRT out — no Trinity pharmacy or published source. Both listed in registry `scopeNotes`.
3. Levels only where a label states them (phenytoin, valproate; lamotrigine "no established range"). NG/crush notes only where sourced; where a label is silent on tube administration, the card says so and defers to pharmacy (see closed verify items).
4. Evidence `NOT_GRADED` for all label content. `formularyStatus` AVAILABLE except brivaracetam INSTITUTION_VARIES.
5. Calculator: coefficient 0.2 (Sheiner-Tozer); 0.1 only via an "On dialysis" toggle (Mauro 1989) — no CrCl cutoff. 0.25 and 0.29 not offered.
6. Standard equation with albumin ≥4.4 g/dL → report the measured level uncorrected.
7. Measured free level, if entered, is the primary result; discordance warning versus estimated free (corrected × 0.1). (Reload gating amended — see Proposed #B.)
8. Reload = (target − corrected) × 0.7 L/kg × actual weight; **default target 15**, user-adjustable 10–20.
9. No salt factor; output in fosphenytoin mg PE (1 mg PE = 1 mg phenytoin sodium, Cerebyx §2.1).
10. Caps: 10 mg PE/kg **and** the existing 1500 mg PE absolute cap; ≤150 mg PE/min. Rounding to the nearest 50 mg PE, cap after rounding. No IV phenytoin rate (no injection label).
11. Warnings: always-on "estimate only"; on input: dialysis, valproate, <2 h IV / <4 h IM after fosphenytoin, no albumin, free discordance, corrected >20, capped.
12. Carbapenem link = `asm-interactions:carbapenems-valproate` (from the supplied asm-interactions.json v0.1.1). Other links used: `tmp-smx-phenytoin`, `inducing-asm-apixaban-rivaroxaban`, `inducing-asm-warfarin`.

### Additional decisions (proposed in draft, accepted by Jason 2026-11-06)
- **A. Schema amendment `RenalRow.crclBasis`** (`CG_ML_MIN` | `BSA_NORMALIZED_ML_MIN_1_73M2`). The current Keppra label (6/2025) bands CrCl normalized to 1.73 m²; Vimpat uses Cockcroft-Gault mL/min. `calc:cockcroft-gault` returns un-normalized mL/min, so the UI must not highlight Keppra rows straight from it (normalize by BSA, or don't highlight).
- **B. Reload gate:** if a measured free level is entered and is within or above 1–2 mcg/mL → no reload. Under #7 as approved, test case 9 (free 2.4) would have produced a 200 mg PE reload.
- **C. Cap rounding:** the 10 mg/kg cap is rounded **down** to a 50 mg PE multiple (63 kg → 600, not 630).
- **D. weightBasis ACTUAL** for valproate mg/kg/day and fosphenytoin mg PE/kg/day — the labels don't specify a weight basis; ACTUAL matches the repo's load calculators.
- **E. Lacosamide severe renal/hepatic:** label says "reduce the maximum dosage by 25%"; the card adds "(300 mg/day if the maximum is 400 mg/day)" — arithmetic, consistent with the 2012 label's explicit 300 mg/day.

### Deprioritized / noted, not changed
- Phenobarbital and CRRT (above).
- Kane 0.29 / Anderson 0.25 coefficients; multivariate valproate equations.
- Phenytoin HD dosing: no label dosing — card says dose by free levels.
- Valproate per-kg maximum (60 mg/kg/day) can't be expressed as a `DoseCap` (no per-kg cap unit) — kept in notes. Possible future schema tweak; not proposed now.
- Superseded labels (Keppra 2009, Vimpat 2012) dropped from sources.
- Lamotrigine bipolar dosing (Tables 5–6): out of scope (epilepsy titration only).
- `lacosamide-load` calculator not linked (being removed by task 6.3).

### verify[] items — closed 2026-11-06
- Tube administration (levetiracetam, valproate, phenytoin suspension/feed-hold, lamotrigine): Jason chose to replace each with the `enteral[]` line "Tube administration not addressed in label — confirm with pharmacy". No enteral-administration reference was added.
- Dilantin PI revision date: current Viatris label from DailyMed (setid 86dd27d1-9cee-48ae-b55d-e2d2f7dbc593), revised 8/2023; sections §2.3, 2.4, 2.5, 7.4, 12.3 checked against the card. Citation updated in the card, the calculator spec and SOURCES. Add the DailyMed PDF to project knowledge.
- Open verify[] items: none.

## 2026-11-06 — Item 7.2: Neuro-ICU targets card + aSAH numbers

**Status:** final (approved by Jason 2026-11-06). Drafts: `drafts/schema.reference-cards.ts`, `drafts/reference-cards.{neuro-icu-targets,asah-numbers}.json`, `drafts/reference-cards.registry-envelope.json`, `drafts/acute-neuro.elevated-icp-herniation.json` + `.CHANGES.md`. Both cards (as a registry) and the replacement acute-neuro entry validated with zod; a negative test confirmed EVIDENCE_SUMMARY rows can't carry a grade.

### Decisions (confirmed by Jason)
1. New registry `reference-cards` (schema/reference-cards.ts), two entries: `neuro-icu-targets` and `asah-numbers` (answers the checklist's "one entry or split" — split). Row-level `sources[]` so every cell is cited; card-level refine requires each row source to appear in the card's `sources[]`. Schema 1.0.0, registry 1.0.0; app MINOR bump (new registry + card view). `keyNumbers` (≤5) drafted on both cards in the task 4.2 shape; usable once the cards are signed off.
2. **Amendment accepted:** `TargetRow.role` enum (TARGET / RECOMMENDED / NOT_RECOMMENDED / EVIDENCE_SUMMARY), with EVIDENCE_SUMMARY forced to NOT_GRADED. COR 3 rows render as NOT_RECOMMENDED (ground rule 7); trial findings can't read as targets.
3. Sodium content follows Cook 2020, not the existing "145–155 (max ~160)". Correction written for `acute-neuro:elevated-icp-herniation`: CHANGES part A (requested) and part B (same-source corrections: HTS/mannitol STRONG → WEAK, osmolar-gap cutoffs removed, 320 threshold removed, Cook title/DOI) — all kept. acute-neuro registry MINOR bump, applied at final assembly.
4. BTF Level II B and Level III → WEAK; source grade kept in evidenceNote.
5. BTF citation: "Brain Trauma Foundation. Guidelines for the Management of Severe Traumatic Brain Injury, 4th Edition. 2016; ch. 17" (confirmed). Neurosurgery summary article not cited.
6. Cook citation vol/pages (Neurocrit Care 2020;32:647-666) reused from the existing entry; DOI from the PDF.
7. Hb rows stated as trial findings (TRAIN; SAHARA), NOT_GRADED — not targets.
8. Elevating SBP in symptomatic vasospasm: Hoh Figure 3 shows the DCI-response box as Class 2a; the §8.3 table says COR 2b, LOE B-NR. **Table used** (agreed); discrepancy noted on the row.
9. COR 3 rows → NOT_RECOMMENDED, evidenceLevel STRONG (repo convention, e.g. icad-symptomatic).
10. The Hoh §8 and §8.3 recommendation tables were missing from the "2023 aSAH sections 8-8.3" upload (ePub print dropped them); Jason supplied screenshots 2026-11-06.

### Deprioritized (visible)
| Item | Decision | Why |
|---|---|---|
| Glucose targets (incl. Hoh §8 Rec 7, COR 2a B-NR; AIS 2026 supportive text) | Left out | Jason's decision 2026-11-06 |
| Temperature (incl. Hoh §8 Rec 8, TTM COR 2b C-LD) | Left out | Jason's decision 2026-11-06 |
| Nimodipine split dose for hypotension | Dropped | Not in label or Hoh; Hoh line on continuing through manageable hypotension kept |
| Fludrocortisone dose | Dropped | No dosing source; card says use pharmacy dosing |
| Salt wasting vs SIADH criteria | Dropped | No source distinguishing them |
| HEMOTION | Dropped | Mentioned only in TRAIN's discussion |
| Hydrocortisone | Note only | Similar sodium effect, more complications (Hoh text) |
| CPP for aSAH / ICH / AIS | Not shown | No provided source; scope note on the TBI row |
| Hoh §8 pulmonary recs (vent bundle, ARDS rescue), §8.1 nursing recs other than neuro exam | Left off card | MICU manages medical issues; not neuro rounds numbers |
| ICP threshold (BTF ch. 16) | Not added | Chapter not provided; existing entry keeps its ≥20–22. **Superseded 2026-11-07:** ch. 16 supplied; `escalateWhen[1]` → >22 (see GBS/ICP rebuild entry) |

### Noticed, not changed
- `acute-neuro:hyponatremia-ods` uses cap scope `CUMULATIVE_PER_EPISODE`, not in `CapScope` — fails validation as extracted.
- `consult-workups:sah-workup` could add `reference-cards:asah-numbers` to relatedIds (back-link); not edited.
- `elevated-icp-herniation`: mannitol stays FIRST_LINE; Cook's strong rec against steroids in ICH not added to the dexamethasone evidenceNote.
- Proposed keyNumbers for `elevated-icp-herniation` are in its CHANGES file only (task 4.2 field doesn't exist on acute-neuro yet).

### Open items
- No `verify[]` items.
- Add Cook 2020 and the BTF 4th ed. ch. 17 PDF to project knowledge, plus the Hoh §8 and §8.3 table screenshots.

## 2026-11-06 — Item 7.3: Inpatient mimics & send-out traps

**Status:** final (approved by Jason 2026-11-06). All 10 drafts validated with zod against `schema/consult-workups.ts` and `schema/acute-neuro.ts` (a negative test confirmed an IF_INDICATED item with no indication is rejected).

Drafts:
- New `consult-workups` entries: `acute-hepatic-porphyria` (NEUROMUSCULAR), `valproate-hyperammonemic-encephalopathy` (COGNITION_ENCEPHALOPATHY), `caa-related-inflammation` (VASCULAR), `susac-syndrome` (INFLAMMATORY_DEMYELINATING), `intravascular-lymphoma` (INFLAMMATORY_DEMYELINATING).
- Edited (full replacement + `.CHANGES.md`): `consult-workups:{myelopathy-workup, inpatient-neuropathy, elevated-ck-myopathy, cns-vasculitis-workup}`, `acute-neuro:guillain-barre-syndrome`.

### Decisions (confirmed by Jason)
1. Autoimmune nodopathy merged into `inpatient-neuropathy` (differential, workup, rule 5, pearls) — no standalone entry.
2. AGA 2023 best-practice advice (explicitly ungraded expert review) → EXPERT_OPINION.
3. L-carnitine: only Perrott's acute-overdose regimen (100 mg/kg IV, then 50 mg/kg max 3 g/dose q8h; overdose >100 mg/kg with decreased LOC), EXPERT_OPINION, labeled as not applicable to VHE on therapeutic dosing (the review excluded chronic-therapy toxicity).
4. Categories for the five new entries as listed above.
5. Ganglioside phenotype map as text lines (inpatient-neuropathy pearls + GBS definitions), sourced to Willison & Yuki 2002 Table 1 — no table component, no schema change.
6. IMNM transaminase pearl uses Nathwani 2005 (AST/ALT >3 acute → ~1 in days; ~1.2 in polymyositis) and ACG 2017 (GGT confirms hepatic ALP, doesn't localize AST/ALT; raised by phenytoin/barbiturates). The 7.7 sentence "normal GGT supports a muscle source" is NOT used — ACG doesn't support it for aminotransferases.
7. Nodopathy: "IgG4" omitted (EAN/PNS 2021 text never states it; only reference titles); "pan-neurofascin, especially IgG3" kept. "Early" rituximab dropped — guideline says rituximab "may be effective" (anecdotal evidence).
8. GBS correction: anti-GQ1b in MFS ">90%" → "up to 90%" (Leonhard 2019).
9. sIL-2R for IVLBCL kept with Shimada's scope: Japanese cohort, higher in Asian variant, Western yield not reported. Skin-before-brain biopsy → EXPERT_OPINION (order not tested in Rozenbaum).
10. Neurosarcoid: sIL-2R and ACE folded into `myelopathy-workup` as "no proven diagnostic value / insufficiently sensitive and specific" (Stern 2018) — not "far superior".
11. `recsTemplate: []` on new entries (schema still requires it until task 6.2); existing entries' `recsTemplate` unchanged.
12. No schema change. Registry bumps at final assembly: `consult-workups` MINOR (new entries + clinical edits), `acute-neuro` MINOR (GBS edit). All drafts `lastReviewed: "UNREVIEWED"`.

### Deprioritized / dropped (visible)
| Item (from task 7.3 / external spec) | Decision | Why |
|---|---|---|
| AIP urine light protection / refrigerate / freeze specifics | Generic `institutionVaries` line only | Not in AGA 2023; no lab handling sheet supplied |
| VHE "at therapeutic levels" | Dropped | Not stated in the valproate label |
| VHE "ammonia on ice" | Generic `institutionVaries` line | No source |
| CAA-ri "protein >100 mg/dL in >70%" | Dropped; replaced by Regenhardt CSF protein >45 in 92% | Unsourced |
| CAA-ri "blue-top" / "polypropylene tube" | Dropped entirely | No CAA-ri source mentions a tube; CSF anti-Aβ is research-only (Auriel) |
| "Schistosoma/Brucella/B12/E" garbled line | No action | Not present in the repo's `myelopathy-workup` (v0.7.1); came from the external spec |
| Hemin "via hematology" | `institutionVaries` (ordering pathway) | Local process, not a source statement |
| IBM / cN-1A | Existing IBM pearl kept; no cN-1A line | Outpatient diagnosis (task 7.3) |

### Noticed, not changed (out of scope)
- `cns-vasculitis-workup`: Salvarani NEJM 2024 citation carries a Stroke DOI (10.1161/STR.0000000000000422).
- `guillain-barre-syndrome`: CSF protein "~50% normal early" vs Leonhard "30–50% in week 1". **Closed 2026-11-07 (Jason), no change** — see GBS/ICP rebuild entry.

### Open items
- No `verify[]` items.
- Add to project knowledge: Kinnecom 2007, Willison & Yuki 2002, Shimada 2009, ACG 2017 (Kwo) PDFs (supplied in chat 2026-11-06).

## 2026-11-06 — Item 7.5: Thrombophilia test-validity matrix

**Status:** final (approved by Jason 2026-11-06). Drafts: `drafts/schema.reference-cards.ts` (1.1.0), `drafts/reference-cards.thrombophilia-test-validity.json`, `drafts/reference-cards.registry-envelope.json` (updated), `drafts/consult-workups.young-stroke-workup.json` + `.CHANGES.md`. The card (alone and in a registry envelope) and the replacement consult entry validated with zod. A synthetic 1.0.0-shaped card still validates under 1.1.0 (the 7.2 cards use only that shape; not re-run on the actual 7.2 files). Negative tests rejected: NOT_ADDRESSED with a source; addressed cell without a source; VALID with a direction; cells out of column order; cell source missing from the card's `sources[]`. `young-stroke-workup` was validated against a local stub of `DecisionRule` (`schema/vascular-antithrombotics.ts` is not in project knowledge) — Claude Code validates against the real schema.

### Decisions (confirmed by Jason)
1. **Home:** new card `reference-cards:thrombophilia-test-validity` (not a `young-stroke-workup` section, not a new registry). `young-stroke-workup` gets a `relatedIds` link only.
2. **Schema 1.1.0 (MINOR, additive):** `MatrixSection` (`kind: "MATRIX"`, columns, rows of cells + cited notes) added to `reference-cards` via `AnySection = z.union([CardSection, MatrixSection])`; card-level source refine extended to cells and notes. `CellStatus` = VALID / CAUTION / UNRELIABLE / ASSAY_DEPENDENT / NOT_ADDRESSED; `CellDirection` = FALSE_LOW / FALSE_HIGH / EITHER (null for VALID and NOT_ADDRESSED).
3. **NOT_ADDRESSED is a finding, not a VERIFY item** — shown as "Not addressed by sources", no sources, NOT_GRADED, and not in `verify[]` (an open VERIFY would block release per VERSIONING.md).
4. **Columns:** `acute-thrombosis`, `ufh-lmwh`, `vka`, `doac`. **Rows:** the 9 from task 7.5; protein C/S as one row; APCR as a note on the FVL/PT20210A row.
5. **Evidence mapping:** Gosselin 2018 (ICSH), Devreese 2020 and 2014 (ISTH-SSC), Stevens 2016 (Anticoagulation Forum) → CONSENSUS; ASCP Choosing Wisely → EXPERT_OPINION; Cross 2021 GRADE 1B → STRONG, 2C → WEAK; all other sources → NOT_GRADED. A cell takes the highest level among its sources; each source's own grade is in `evidenceNote`.
6. **Conflict — AT on warfarin:** Favaloro 2019 (ex vivo audit: no effect) used alone; cell VALID. ASCP item 18's "ATIII elevated on warfarin" not used.
7. **Conflict — homocysteine in the acute phase:** wording (a), citing both sides — "Acute value may underestimate … recheck at ≥3 months if it changes management" (Nygård 1999, Meiklejohn 2001, Haapaniemi 2007 vs Shi 2018).
8. **Lp(a) in the acute phase:** "Possible acute-phase rise (uncertain)", citing Tsimikas 2018 and Koutsogianni 2023.
9. **Citations:** Nygård cited as *J Intern Med* 1999;246:425-454 (year printed on the PDF; file name said 2001). Preis cited as *Am J Hematol* 2014;89:339-341 (print year; online 2013).
10. `scopeNote` keeps the Kleindorfer caveat (inherited thrombophilia testing rarely changes antiplatelet therapy after arterial stroke) and Middeldorp's acquired-deficiency point. `keyNumbers`: 4 sourced timing lines.
11. **Version bumps (final assembly):** `reference-cards` schema 1.0.0 → 1.1.0; `reference-cards` registry MINOR (new entry; envelope draft updated to 1.1.0/1.1.0); `consult-workups` relatedIds edit = PATCH, absorbed into the 7.3 MINOR; app MINOR for the matrix component (combined with 7.2's MINOR). All drafts `lastReviewed: "UNREVIEWED"`.

### Judgment calls in the final draft (flagged to Jason, accepted as drafted)
- AT/VKA = VALID on a single-lab chromogenic audit (could be CAUTION).
- AT/UFH-LMWH = UNRELIABLE ↓ (Favaloro audit + Stevens), although Favaloro also quotes the kit maker that therapeutic heparin doesn't affect that assay.
- ASCP cited as one list (items 18 and 28; released 2014-2020).
- Kleindorfer "defer or repeat ≥4–6 weeks" reused from the existing `young-stroke-workup` workup note (source already cited in an attached entry).

### NOT_ADDRESSED cells (12) — no source in project knowledge
| Row | Cells | What would close it |
|---|---|---|
| JAK2 V617F / CALR / MPL | acute thrombosis, UFH/LMWH, VKA, DOAC | A source stating DNA testing is unaffected by acute thrombosis/anticoagulants (Cross 2021 and Xia 2016 don't address it; Stevens/ASCP "genetic testing unaffected" refers to FVL/PGM only — not extrapolated) |
| PNH flow | acute thrombosis, UFH/LMWH, VKA, DOAC | A source on anticoagulant or acute-thrombosis effects on flow cytometry (Preis 2014 and Devalet 2015 don't address it) |
| Lipoprotein(a) | UFH/LMWH, VKA, DOAC | A source on anticoagulant effects on the Lp(a) assay |
| Homocysteine | DOAC | A source on DOAC effects on total homocysteine |

### Deprioritized / dropped (visible)
| Item | Decision | Why |
|---|---|---|
| ASCP item 18 "ATIII is elevated on warfarin" | Not used | Conflicts with Favaloro's direct data; Jason chose Favaloro |
| Feliu C, et al. Biochem Pharmacol 2026;245:117663 | Not used | Proteomic association between Lp(a) and high rivaroxaban exposure; authors attribute it to inflammation raising drug levels; Lp(a) never measured with a standard clinical assay — doesn't answer assay validity on a DOAC |
| Gosselin Table 3 "UFH, LMWH or heparinoids/pentasaccharide" entry | Not used | It is the DOAC effect on heparin anti-Xa assays, not a thrombophilia test |
| JAK2 from "genetic testing is unaffected" statements | Not extrapolated | Stevens and ASCP make that statement about FVL/PGM only |
| APCR as a separate 10th row | Note on FVL row instead | Task 7.5 lists 9 rows |

### Noticed, not changed
- `young-stroke-workup` cites "Devreese KMJ, et al. … J Thromb Haemost 2024. doi:10.1016/j.jtha.2024.10.022" (aPL guidance) — not in project knowledge; no volume/pages. The card uses Devreese 2014 and 2020 only.
- `vascular-antithrombotics:cvt-anticoagulation` and `:pregnancy-antithrombotics` could add a back-link to the card; not edited (out of scope).

### Open items
- No `verify[]` items.
- Add to project knowledge: the 18 PDFs supplied in chat 2026-11-06 (Devreese 2014, Stevens 2016, Favaloro 2019, ASCP Choosing Wisely list, Cross 2021, Xia 2016, Preis 2014, Devalet 2015, Tsimikas 2017, Tsimikas 2018, Koutsogianni 2023, Nygård 1999, Meiklejohn 2001, Haapaniemi 2007, Shi 2018, Haviv 2002, Muruá 2001, Feliu 2026).

## 2026-11-07 — Item 7.7: Inpatient Parkinson disease card

**Status:** final (approved by Jason 2026-11-07). Drafts: `drafts/reference-cards.inpatient-parkinson-disease.json`, `drafts/acute-neuro.nms-parkinsonism-hyperpyrexia.json` + `.CHANGES.md`. Both validated with zod (reference-cards schema 1.1.0; acute-neuro 1.0.0), the card also inside a registry envelope; negative tests confirmed a row source missing from card `sources[]` and a 6th keyNumber are rejected.

### Findings
- The only provided rotigotine conversion is the BMJ 2010 flowchart (p. 3 figure; not in extracted text): levodopa (×0.7 CR; ×1.3 COMT) + agonist × LEF = LEDD; × 0.55; ≤350 mg → rotigotine = adjusted LEDD ÷ 20, nearest 2 mg up to 16 mg, once daily; >350 mg → continuous SC apomorphine LEDD ÷ 240 mg/h with domperidone pre-load. Evidence base: case reports (authors' methods).
- BMJ LEFs differ from `calc:ledd` (Jost 2023): CR 0.7 vs 0.75; COMT ×1.3 vs +0.33/+0.5 of covered levodopa; pramipexole base 100 vs 142.86; rotigotine 20 vs 30.3.
- BMJ's 16 mg ceiling exceeds the US Neupro maximum (6 mg/24 h early, 8 mg/24 h advanced PD).
- The Sinemet IR label is silent on crushing/tube; Sinemet CR forbids chewing/crushing.

### Decisions (confirmed by Jason)
1. Home: new card `reference-cards:inpatient-parkinson-disease` on the existing schema (1.1.0 row-list sections). No schema change. Registry `reference-cards` MINOR bump (new entry), applied at final assembly. (Answers checklist C: "consult entry or new card type" → reference card.)
2. Conversion: option A — card gives the BMJ steps with BMJ's own factors; links `calc:ledd` with an explicit "don't feed its result into these steps" note. Options B (new `rotigotine-npo` calculator) and C (Jost LEDD into BMJ formula, unsourced) rejected.
3. 16 mg vs label: show BMJ's result and flag doses >8 mg/24 h as above the US label maximum (two worked examples on the row). No clamping.
4. Missing sources: Jason supplied Sinemet (Organon, rev 7/2026), Sinemet CR (Merck, rev 4/2018), Seppi 2019 MDS EBM review, Hwang & Norris 2021.
5. `acute-neuro:nms-parkinsonism-hyperpyrexia` edited: "convert via LEDD" note now points to the card; BMJ 2010 added to sources; relatedId to the card. acute-neuro MINOR (shared with 7.2/7.3).
6. MDS 2019 EBM → evidenceLevel (rule 7 doesn't cover MDS): "efficacious / clinically useful" (clozapine, pimavanserin) → STRONG; "possibly useful" (quetiapine) → WEAK; olanzapine "not efficacious / unacceptable risk / not useful" → role NOT_RECOMMENDED, evidenceLevel WEAK (single low-quality negative study — deliberate exception to the COR 3 → STRONG convention). MDS wording verbatim in evidenceNote. Accepted with "final".
7. Crushed IR via NG: drafted from two Hwang statements (NG for patients who can't continue home dosing; crushed IR dose as OFF rescue), with "IR label silent — confirm with pharmacy". EXPERT_OPINION.
8. Droperidol: included under Hwang's class statement, labeled "class-level statement; agent not named" (1.5 convention).
9. Additions beyond the 7.7 list, kept: trigger search + Hwang Table 3 withdrawal order; "other deliriogenic drugs" row (anticholinergics, opioids, amantadine); benzodiazepine exception for NMS; DBS electrocautery pitfall (BMJ).
10. Binding 7.7 corrections applied: ondansetron OK except apomorphine (contraindicated — all 5-HT3 antagonists per Apokyn §4); rotigotine conversion sourced (BMJ), not the unsourced "LEDD/50–60, cap 8–16"; patch strengths, don't cut, remove before MRI/cardioversion; quetiapine low dose; pimavanserin not acute; clozapine ANC monitoring; benzodiazepines sparingly; avoid haloperidol/olanzapine and dopamine-blocking antiemetics.
11. Evidence: labels NOT_GRADED; BMJ / Hwang EXPERT_OPINION; mixed rows take the level of the leading source, with every source's grade in evidenceNote. All drafts `lastReviewed: "UNREVIEWED"`.

### Deprioritized / dropped (visible)
| Item | Decision | Why |
|---|---|---|
| Risperidone "avoid" | Dropped | No provided source names it; Hwang's class statement covers typical antipsychotics only |
| BMJ adjusted LEDD >350 mg branch (continuous SC apomorphine + domperidone) | Pitfall line only | Apokyn label covers intermittent pen dosing only (≤6 mg/dose); no US continuous-infusion source; domperidone US availability not addressed |
| Cyclizine, domperidone, dispersible co-beneldopa | Dropped | UK products in BMJ; US availability not addressed in provided sources |
| Pergolide, lisuride (BMJ LEF table) | Dropped from the factor list | Not in calc:ledd's US-agent list |
| Trimethobenzamide premedication (Apokyn §2.2) | Dropped | Outpatient apomorphine initiation |
| Other ER carbidopa-levodopa (e.g., IPX066) | Not covered (row note) | No label provided |
| Feed-hold interval | Not given | No source; row says follow local practice |
| Quetiapine dose | Not given | Seppi/Hwang give no dose |
| Anesthesia choices (propofol, regional vs GA, intubation) | Dropped | Not neuro-rounds decisions |
| PD caution-list registry | Not now | One registry at a time; possible later |

### Noticed, not changed
- `nms-parkinsonism-hyperpyrexia` relatedIds still include `acute-neuro:delirium-vs-encephalopathy` (removed by task 6.1).
- The cut `delirium-vs-encephalopathy` entry's "PD/DLB: avoid haloperidol" line now lives on the card (Hwang; Apokyn §5.2).

### Open items
- No `verify[]` items.
- Add to project knowledge: the four PDFs supplied 2026-11-07 (Sinemet, Sinemet CR, Seppi 2019, Hwang & Norris 2021).

## 2026-11-07 — Item 7.9: Inpatient headache

**Status:** final (approved by Jason 2026-11-07). Drafts: `drafts/schema.acute-neuro.CHANGES.md`, `drafts/acute-neuro.status-migrainosus.json`, `drafts/acute-neuro.post-dural-puncture-headache.json`. Both validated with zod against acute-neuro 1.1.0 (singly and in a registry envelope); the 1.0.0 `nms-parkinsonism-hyperpyrexia` draft still validates under 1.1.0; negative tests: new entries fail under 1.0.0, an invalid category is rejected. Plan doc: `claude/7.9-plan.md`.

### Decisions (confirmed by Jason)
1. **Home + schema change:** two acute-neuro entries. Schema 1.0.0 → 1.1.0 (MINOR, additive): `AcuteNeuroCategory` + "HEADACHE"; `Route` + "EPIDURAL", + "PERINEURAL". acute-neuro registry MINOR (new entries; shared with 7.2/7.3/7.7) at final assembly. App MINOR only if the UI labels enum values.
2. **Evidence mapping:** AAN levels (AHS 2025/2016): A → STRONG, B → MODERATE, C and U → WEAK; "must/may NOT offer" → NOT_RECOMMENDED. USPSTF (Uppal): A → STRONG, B → MODERATE, C and I → WEAK; D → NOT_RECOMMENDED with level by certainty; ungraded statements → CONSENSUS (shown as "statement" in notes). Nagy → EXPERT_OPINION; labels → NOT_GRADED. Source grade and certainty kept in evidenceNote.
   - Applied: Uppal grade I "evidence doesn't support routine use" items → role NOT_RECOMMENDED, WEAK. Bed rest (grade C, temporizing) → SUPPORTIVE row; prophylactic bed rest (D) → pitfall.
3. **Akathisia prophylaxis:** both shown (AHS 2025 "may reduce", no trial cited; AHS 2016 class 1 trial: no EPS difference).
4. **Non-US/uncertain agents:** dipyrone dropped (withdrawn from US, AHS 2016); dexketoprofen, IV acetylsalicylic acid, IM diclofenac, lysine clonixinate dropped and listed in pitfalls.
5. **DHE label** supplied (Provepharm, rev 2/2025) → contraindication row from the label; Nagy's stricter items in notes.
6. **ICHD-3 1.4.1** supplied → definition included.
7. **Level U agents:** magnesium as ADJUNCT (aura); the rest listed in pitfalls.
8. **DHE dosing conflict:** Nagy protocol (to 1 mg q8h; ~11.25 mg over 5 days) exceeds the label (IV ≤2 mg/24 h, ≤6 mg/week, not chronic daily). Kept both regimens on the DHE row, labeled "CONFLICT" in doseText; label regimen carries a 2 mg PER_DAY cap; weekly limit in duration/notes (no weekly CapScope). Approved with "final".
9. **Source discrepancies shown, not resolved:** SONB Level B wording (may vs should); GONB volume 0.5–3 vs 0.75–3 mL; hydromorphone "should" vs "Must" NOT (box/table used); metoclopramide 10–20 mg (2016 trials) vs 10 mg (2025).
10. **Other choices accepted:** dexamethasone row MODERATE (recurrence Level B leads; pain Level C as second dose); caffeine route PO (Uppal names none; cited trial was oral); LP-technique prevention and handoff pitfalls kept; relatedIds include `consult-workups:thunderclap-headache` (existence to be confirmed by `npm run validate`), `antiseizure-medications:valproate`, `vascular-antithrombotics:periprocedural-holds-lp-evd`, and the two entries cross-linked.
11. All drafts `lastReviewed: "UNREVIEWED"`.

### Deprioritized (visible)
| Item | Decision | Why |
|---|---|---|
| Eptinezumab, ketamine, IV lidocaine, propofol, IV caffeine, granisetron, IV ibuprofen, SPG block, promethazine, trimethobenzamide | Pitfall line | AHS 2025 Level U; prolonged inpatient infusions not assessed |
| Dexketoprofen, IV acetylsalicylic acid, IM diclofenac, lysine clonixinate | Pitfall line | US availability not addressed in sources |
| Dipyrone | Dropped (pitfall) | Withdrawn from US (AHS 2016) |
| Raskin 2-day DHE protocol | Not drafted | Not in provided sources beyond mention |
| Domperidone | Note only | Limited US availability (Nagy) |
| PDPH prevention detail (needle designs, epidural-space techniques, intrathecal catheter after accidental dural puncture) | Not drafted beyond one pitfall | Procedural/obstetric anesthesia scope |

### Open items
- No `verify[]` items.
- Add to project knowledge: DHE label (Provepharm, rev 2/2025) and ICHD-3 1.4.1 page.
- Claude Code: confirm `consult-workups:thunderclap-headache` and `vascular-antithrombotics:periprocedural-holds-lp-evd` resolve after task 6.1 cuts.

## 2026-11-07 — Final assembly

**Package:** `claude/NEURO_APP_TASKS.md` (updated task list), the 57 files under `drafts/`, `claude/SOURCES.md` and `claude/DECISION_LOG.md` (both now complete; the `*.7.5/7.7/7.9-additions.md` files are folded in and superseded). All eight in-scope items are final; no `verify[]` items are open in any draft.

### Version bumps to apply (one bump per registry, not one per item)
| Target | From → to | Items | Kind |
|---|---|---|---|
| `vascular-antithrombotics` registry | 0.7.1 → 0.8.0 | 1.3, 1.5 | MINOR (threshold, evidence, sources) |
| `consult-workups` registry | 0.7.1 → 0.8.0 (confirm current version in `data/`) | 7.3; 7.5 PATCH absorbed | MINOR (new entries + clinical edits) |
| `acute-neuro` registry | 0.7.1 → 0.8.0 (confirm current version in `data/`) | 7.2, 7.3, 7.7, 7.9 | MINOR (new entries + clinical edits) |
| `acute-neuro` schema | 1.0.0 → 1.1.0 | 7.9 | MINOR (additive enum values) |
| `antiseizure-medications` | new: registry 1.0.0, schema 1.0.0 (incl. `crclBasis`) | 7.1 | new registry |
| `reference-cards` | new: schema 1.1.0; registry 1.2.0 | 7.2 (1.0.0), 7.5 (→ 1.1.0, matrix), 7.7 (→ 1.2.0) | new registry; bumps as logged per item |
| App (`package.json`) | one MINOR | 7.1 (registry + calculator UI), 7.2 (card view), 7.5 (matrix component); 7.9 only if enum labels are UI-mapped | MINOR |

Update `lastUpdated` on every bump. 0.7.1 is the version on the extracted copies supplied to planning chats; take the next MINOR from whatever `data/` actually holds.

### Assembly fix
- `drafts/reference-cards.registry-envelope.json`: added `<inpatient-parkinson-disease>` (7.7 validated the card inside an envelope but the draft file wasn't updated); version 1.1.0 → 1.2.0 per the 7.7 MINOR; `lastUpdated` 2026-11-07. Schema stays 1.1.0.

### Notes for Claude Code (collected from all items)
1. Drafts are full replacement entries built from v0.7.1 data. Apply the other tasks that touch the same entries (1.2 stale "pending" text, 1.4 CHANCE-2 wording, 4.2 keyNumbers, 6.x cuts) **on top of the drafts**, not on the old data.
2. Task 6.1 cuts leave dangling references in drafts: `acute-neuro:nms-parkinsonism-hyperpyrexia` relatedIds → `acute-neuro:delirium-vs-encephalopathy`; `consult-workups:young-stroke-workup` relatedIds and workup line → `inpatient-stroke-etiology-workup`. Fix during 6.1 so `npm run validate` passes.
3. Task 6.2 (`recsTemplate` removal) also applies to the five new 7.3 entries (drafted with `recsTemplate: []`).
4. Re-validate against the real schemas: `young-stroke-workup` was checked against a stub `DecisionRule`; the 7.2 cards weren't re-run under reference-cards 1.1.0 (synthetic check only); 7.3's GBS edit was checked under acute-neuro 1.0.0 (additive 1.1.0 should still pass).
5. Confirm these relatedIds resolve: `consult-workups:thunderclap-headache`, `vascular-antithrombotics:periprocedural-holds-lp-evd`, `asm-interactions:carbapenems-valproate` (and the other asm-interactions ids in 7.1).
6. Pre-existing validation failure, not caused by planning drafts: `acute-neuro:hyponatremia-ods` cap scope `CUMULATIVE_PER_EPISODE` isn't in `CapScope`.
7. `calc:phenytoin-correction` is clinical code: ground rule 0.6 applies — tests for every branch, using the worked cases in `drafts/calc-phenytoin-correction.md`, and Jason's sign-off on the encoded calculator before merge.

### Noticed across items, not changed (possible follow-ups)
- `heparin-ufh` `thrombolysisRule` (aPTT >40 s line) — not reviewed against AHA 2026.
- `ticagrelor` uses[3] SECOND_LINE on a COR 2b recommendation.
- Back-links not added: `sah-workup` → `reference-cards:asah-numbers`; `cvt-anticoagulation` / `pregnancy-antithrombotics` → `reference-cards:thrombophilia-test-validity`.
- `cns-vasculitis-workup`: Salvarani NEJM 2024 carries a Stroke DOI. `young-stroke-workup`: Devreese 2024 citation lacks volume/pages. `guillain-barre-syndrome`: CSF protein "~50% normal early" vs Leonhard "30–50% in week 1" (closed 2026-11-07, no change).
- `NEURO_APP_TASKS.md` §9 row "CRRT dosing is folded into 7.1" is now inaccurate (CRRT was dropped in 7.1 for lack of a source). §9 is outside the planning scope and was left unchanged — Jason to edit.

### Source files still to add to project knowledge (from each item's open items)
- 1.5: Powers 2019 §3.5.5 screenshots (p. e365).
- 7.1: Dilantin DailyMed PDF (Viatris 8/2023).
- 7.2: Cook 2020; BTF 4th ed. ch. 17; Hoh §8 and §8.3 table screenshots.
- 7.3: Kinnecom 2007, Willison & Yuki 2002, Shimada 2009, Kwo 2017 (ACG).
- 7.5: the 18 PDFs listed in the 7.5 entry.
- 7.7: Sinemet, Sinemet CR, Seppi 2019, Hwang & Norris 2021.
- 7.9: DHE label (Provepharm 2/2025), ICHD-3 1.4.1 page.

### Reminder
Approval in the planning project isn't clinical sign-off. Claude Code encodes and validates the drafts; Jason signs off in the repo with `npm run review-sheets` and `npm run signoff`.

## 2026-11-07 — GBS and elevated ICP rebuild (items 7.3 and 7.2)

**Status:** final (approved by Jason 2026-11-07). Hold lifted by Jason in chat 2026-11-07. Drafts: `drafts/acute-neuro.{guillain-barre-syndrome,elevated-icp-herniation}.json` + `.CHANGES.md`, rebuilt on the signed 2026-11-05 entries (acute-neuro 1.1.1). They replace the 2026-11-06 drafts built on v0.7.1. Encoded word for word as full replacements on branch `gbs-icp-rebuild`; `npm run validate` 0 errors.

### Decisions — `guillain-barre-syndrome` (confirmed by Jason)
1. 7.3 AMAN, MFS ">90%" and PCB edits (7.3 decisions 5 and 8 as they applied to GBS) dropped: the signed entry has no such lines, so nothing to correct.
2. Bickerstaff line kept, now `definitions[6]` (Leonhard 2019 Table 1; Willison & Yuki 2002 Table 1).
3. Leonhard note merged into the Anti-GQ1b `workup` note ("assay-dependent; a negative result doesn't exclude GBS").
4. `relatedIds` + `consult-workups:acute-hepatic-porphyria`; `sources` + Leonhard 2019, Willison & Yuki 2002.
5. `calc:egris` not carried (not a valid id; no calculator built). mEGRIS stays in text only.
6. keyNumbers: 5 lines copied from the entry's own fields, accepted as proposed.
7. **CSF protein item closed 2026-11-07 (Jason), no change.** The "~50% normal early" text isn't in the signed entry; `definitions[4]` matches EAN/PNS 2023 (raised in 50% at <3 days, 84% at >7 days) and `workup[0].notes[0]` / `pitfalls[0]` match the EAN/PNS GPP. Leonhard 2019 agrees.

### Decisions — `elevated-icp-herniation` (confirmed by Jason)
1. **`escalateWhen[1]` ICP >20 → >22 mmHg — Jason's decision 2026-11-07**, beyond the 7.2 approvals. Now "ICP >22 mmHg sustained despite tier-one measures (ENLS v6.0; BTF 4th ed. ch. 16)", matching `definitions[0]`. BTF ch. 16 is TBI-specific (Level II B); ENLS v6.0 gives the general adult definition.
2. BTF 4th ed. ch. 16 added to `sources` (citation format follows ch. 17, 7.2 decision 5).
3. HTS and mannitol `evidenceNote`s state Cook 2020 grades per population (7.2 part B); AIS outcome clause adapted to "insufficient evidence for either to improve neurological outcome" (Cook AIS rec 1), accepted as adapted.
4. ENLS v5.0 kept as a source; it is the only source for the ≥7.5% central-line threshold (checked against the v5.0 PDF 2026-11-07).
5. 7.2 part A sodium edits and several part B edits dropped or already present in the signed entry (CHANGES §2). Mannitol stays FIRST_LINE; both osmotic agents stay WEAK.
6. `relatedIds` + `reference-cards:neuro-icu-targets`. keyNumbers: 5 lines copied from the entry's own fields, accepted as proposed.

### Version
`acute-neuro` registry 1.1.1 → 1.2.0 (one MINOR for both entries: threshold, evidence notes, sources). `lastUpdated` 2026-11-07. Schema unchanged (1.2.0). Both entries `lastReviewed: "UNREVIEWED"`.

### Noticed, not changed
- GBS `searchTerms` has no "Bickerstaff"/"BBE".
- GBS: old-draft links to `consult-workups:acute-generalized-weakness` and `inpatient-neuropathy` not added (not approved).
- ICP `treatment[0].notes[0]` "either acceptable in AIS and SAH": no matching Cook recommendation for SAH.
- ENLS v5.0 peripheral-HTS conditions (large vessel, site checks, IO ≤7.5%) not in the entry.
- Old-draft ICP links to `consult-workups:ich-etiology-workup` and `sah-workup` not added (not approved).

### Open items
- No `verify[]` items.
- Jason: `npm run review-sheets` and `npm run signoff` for both entries before release (`npm run build` fails until then).

## 2026-11-07 — Follow-up batch (six decisions)

Approved by Jason in chat 2026-11-07. Drafts: `planning/drafts/followups-2026-11-07/` (base `main` 6ff3179). All 7 entries `lastReviewed: "UNREVIEWED"`.

| Draft | Item | Change |
|---|---|---|
| `acute-neuro.guillain-barre-syndrome.json` | A1 | `searchTerms` += "Bickerstaff", "BBE" |
| `consult-workups.sah-workup.json` | A2 | `relatedIds` += `reference-cards:asah-numbers` |
| `vascular-antithrombotics.cvt-anticoagulation.json` | A2 | `relatedIds` += `reference-cards:thrombophilia-test-validity` |
| `consult-workups.cns-vasculitis-workup.json` | B3 | Salvarani DOI → 10.1056/NEJMra2314942; author order → Salvarani, Hunder, Brown; `verify[]` +1 |
| `consult-workups.young-stroke-workup.json` | B4 | Devreese → J Thromb Haemost 2025;23:731-744 (year 2024 → 2025) |
| `vascular-antithrombotics.heparin-ufh.json` | C5 | IVT line sourced to AHA 2026 §4.6.5 Table 8 (ungraded); new aPTT-wait line; `keyNumbers[1]` kept identical to `thrombolysisRule[0]` |
| `vascular-antithrombotics.ticagrelor.json` | C6 | `uses[3].role` SECOND_LINE → ALTERNATIVE; `verify[]` +1 |

Not edited: `vascular-antithrombotics:pregnancy-antithrombotics` (proposed back-link dropped at review).

### Version
| registry | from | to | level |
|---|---|---|---|
| acute-neuro | 1.2.1 | 1.2.2 | PATCH |
| consult-workups | 1.1.1 | 1.1.2 | PATCH (citation corrections to the same papers) |
| vascular-antithrombotics | 0.10.1 | 0.11.0 | MINOR (re-sourced/graded IVT line, new IVT instruction, role change) |

### Open items
- `verify[]`: `cns-vasculitis-workup` (owner of `doi:10.1161/STR.0000000000000422`); `ticagrelor` (other AHA 2026 sections vs Kleindorfer 2021 §5.1.1 Rec 3).
- Jason: close both, then `npm run signoff` and `npm run release`.
- Noticed, not changed: tracked in `NEURO_APP_TASKS.md` §10.

### Verify items closed (Jason, 2026-11-07), no content change
- `cns-vasculitis-workup`: `doi:10.1161/STR.0000000000000422` is the Stroke 2022 editors/editorial board listing; nothing in the entry came from it.
- `ticagrelor`: nothing in AHA 2026 restates or supersedes Kleindorfer 2021 §5.1.1 Rec 3. AHA 2026 covers acute stroke; Kleindorfer 2021 covers secondary prevention, so the two are complementary.

## 2026-11-07 — Cuts and ICH alignment (Jason, in chat)

- **Removed:** IVIG calculator card; `consult-workups:first-unprovoked-seizure`; `consult-workups:acute-vertigo-hints`. Jason won't use them or doesn't need to look them up.
- IVIG: `ivig-dose` dropped from the manifest and from `calculatorIds` of 5 acute-neuro entries (refractory-super-refractory-se, myasthenic-crisis, guillain-barre-syndrome, autoimmune-encephalitis, nmosd-mogad-attack). The IVIG dose text in those entries is unchanged. `ivigDose` and its `CALCULATOR_META` row stay in `calculators.ts` (clinical code not touched), now unused by the UI.
- Links to the removed entries dropped from `consult-workups:diplopia-ptosis` and `seizure-threshold:bupropion`.
- All 7 edited entries reset to UNREVIEWED. Versions: acute-neuro 1.2.3 → 1.2.4 (PATCH, navigation only); consult-workups 1.1.3 → 2.0.0 (MAJOR, entries removed); seizure-threshold 0.2.3 → 0.2.4 (PATCH).
- A pin to a removed entry now shows its star on the "No entry" page so it can be unpinned.
- ICH score (and all two-column calculator rows): inputs bottom-aligned so a wrapped label doesn't push its input down.

## 2026-11-08 — Follow-up batch 2

Approved by Jason in chat 2026-11-08. Drafts: `planning/drafts/followups-2/` (base `main` 2be7f92). All 8 entries `lastReviewed: "UNREVIEWED"`.

| Draft | Item | Change |
|---|---|---|
| `acute-neuro.guillain-barre-syndrome.json` | 1, 1b | `searchTerms` += "GQ1b"; `keyNumbers[1]` restored as an exact copy of PLEX agent + doseText |
| `consult-workups.sah-workup.json` | 3 | `relatedIds` += `vascular-antithrombotics:cervical-artery-dissection`, `vascular-antithrombotics:cvt-anticoagulation` |
| `consult-workups.young-stroke-workup.json` | 6 | "ISTH 2024" → "ISTH 2025" in `workup[5].notes[1]`; `keyNumbers[0]` checked, unchanged |
| `consult-workups.cns-vasculitis-workup.json` | 5a, 5b | ESO 2023 (Pascarella) added to `sources`; `decisionRules[1]` EXPERT_OPINION → WEAK (PICO 5), `decisionRules[2]` EXPERT_OPINION → CONSENSUS (PICO 8), both cited directly; "Sousa 2026" → "de Sousa 2026" |
| `vascular-antithrombotics.cvt-anticoagulation.json` | 2a, 2b, 2c | `relatedIds` += `pregnancy-antithrombotics`; `rules[0]` note → "Saposnik 2024"; structured enoxaparin CrCl <30 dose (1 mg/kg daily) from Lovenox label §2.2/§2.3 Table 1; Lovenox PI added to `sources` |
| `vascular-antithrombotics.pregnancy-antithrombotics.json` | 4a, 4b | `pearls[0]` reworded to Miller 2026's endorsement wording; Kopp placeholder kept (still online-first) |
| `vascular-antithrombotics.enoxaparin.json` | 7 | LMWH-before-IVT line keeps Powers 2019, now with "§3.5.5 Rec 7" |
| `vascular-antithrombotics.ticagrelor.json` | 8 | `uses[0]` → "Kleindorfer 2021 §5.19 Rec 4"; `uses[3]` → "Kleindorfer 2021 §5.1.1 Rec 3" |

### Version
| registry | from | to | level |
|---|---|---|---|
| acute-neuro | 1.2.5 | 1.2.6 | PATCH (search term; keyNumbers copy restored, no dose changed) |
| consult-workups | 2.0.1 | 2.1.0 | MINOR (ESO 2023 source added; two evidence levels changed) |
| vascular-antithrombotics | 0.11.1 | 0.12.0 | MINOR (new structured dose and new source) |

### Open items
- `verify[]`: none.
- Sign-off and release: done. Jason signed all 8 entries 2026-11-08 (acute-neuro 1.2.7, consult-workups 2.1.1, vascular-antithrombotics 0.12.1, the PATCH bumps from sign-off); content 2.0.0+4b315abc; merged as PR #34.
- Noticed, not changed: see `planning/drafts/followups-2/README.md`; tracked in `NEURO_APP_TASKS.md` §10.

## 2026-11-08 — Follow-up batch 3

Approved by Jason in chat 2026-11-08. Drafts: `planning/drafts/followups-3/` (base `main` 814629f). All 8 entries `lastReviewed: "UNREVIEWED"`.

| Draft | Item | Change |
|---|---|---|
| `consult-workups.sah-workup.json` | 1, L1, L2 | New `workup[3]` pointer row (dissection, RCVS, CVT, pituitary apoplexy → thunderclap-headache); `workup[2].indication` += "CT negative, xanthochromia on LP" (Hoh 2023 Fig 2) |
| `consult-workups.cns-vasculitis-workup.json` | 6 | `decisionRules[3]` → ESO 2023 PICO 8 wording, CONSENSUS, cited directly |
| `consult-workups.young-stroke-workup.json` | 7 | "over >3" → "rather than >3" in `decisionRules[2]` and `keyNumbers[0]` |
| `vascular-antithrombotics.thrombolysis-with-prior-antithrombotics.json` | 2, L5, L6 | `rules[0]`/`[1]` → EXPERT_OPINION; `rules[4]`, `rules[5]` → NOT_GRADED; notes added; `keyNumbers[2]` exact copy |
| `vascular-antithrombotics.ticagrelor.json` | 4 | `uses[0].evidenceNote[1]` describes Kleindorfer Rec 4 correctly |
| `vascular-antithrombotics.cvt-anticoagulation.json` | 5 | `dose[0].label` → "q12h"; extrapolation note added |
| `vascular-antithrombotics.enoxaparin.json` | 8 | `keyNumbers[1]` exact copy of `timing.thrombolysisRule[0]` |
| `vascular-antithrombotics.pregnancy-antithrombotics.json` | 9 | Kopp source title corrected |

Grading rule adopted (thrombolysis-with-prior-antithrombotics): `evidenceLevel` reflects the current guideline; if it is ungraded, use what the source says the statement rests on; if the source states no basis, NOT_GRADED, with any older grade kept in `evidenceNote`.

### Version
| registry | from | to | level |
|---|---|---|---|
| consult-workups | 2.1.1 | 2.2.0 | MINOR (new workup row/indication; recommendation and evidence level changed) |
| vascular-antithrombotics | 0.12.1 | 0.13.0 | MINOR (four evidence levels changed) |

### ACCEPT (not raised again)
- Item 3 (AHA 2026 Table 8 vs enoxaparin, heparin-ufh, thrombolysis-with-prior-antithrombotics): the complete Table 8 has no LMWH row and matches all three entries; no change needed.
- Item 7b (young-stroke-workup "Kleindorfer" vs "Kleindorfer 2021" labels): the entry has one Kleindorfer source, so the short label is unambiguous.
- L4 (thunderclap-headache "Sousa 2026" labels): its source string correctly reads "de Sousa IA…", so the paper is findable; label only.

### PARK
- None.

### Open items
- `verify[]`: none.
- Sign-off and release: done. Jason signed all 8 entries 2026-11-08 (consult-workups 2.2.1, vascular-antithrombotics 0.13.1, the PATCH bumps from sign-off); content 2.0.0+36470240; merged as PR #35.
- Disposition Ledger: see `planning/drafts/followups-3/README.md`; every row closed.

## 2026-11-08 — Kopp citation cleanup

Requested by Jason in chat 2026-11-08. `vascular-antithrombotics:periprocedural-holds-lp-evd`: Kopp source title corrected to the published title, the same string batch 3 item 9 set in `pregnancy-antithrombotics`, so the paper is one citation. DOI unchanged. Entry reset to `UNREVIEWED` for re-signing. vascular-antithrombotics 0.13.1 → 0.13.2 (PATCH: citation wording, no clinical meaning changed).

## 2026-11-08 — Review cuts and planned-item decisions

Decided by Jason in chat 2026-11-08 (review: planning/REVIEW_TASKS_2026-11-08.md).

- Cut (entries): consult-workups `acute-generalized-weakness`, `diplopia-ptosis`, `icu-acquired-weakness`, `sah-workup`; acute-neuro `ms-relapse`, `post-dural-puncture-headache`; vascular-antithrombotics `tenecteplase`, `alteplase`, `sich-after-thrombolysis`. Same test as the 2026-11-07 cuts: content Jason knows cold or doesn't look up on rounds. `sah-workup` deleted outright (not merged); no `ms-relapse` lines carried over.
- Cut (calculator UIs): `tnk-dose`, `alteplase-dose`, `abcd2`, `ich-score`. Functions, tests and CALCULATOR_META kept in calculators.ts (task 6.3 precedent).
- Superseded: review task 1.4 (ICH score NCS caveat; approved, then superseded by the ich-score cut) and task 3.1 (TNK 1-kg option; moot without the card or calculator UI). NCS ICH prognosis guidance can go on the planned neuroprognostication card (review task 4.2).
- Planned items: dropped NEURO_APP_TASKS 7.4 (specimen handling, high-dose thiamine, Ma1/Ma2 ordering), 7.6 (SS vs NMS view), 7.10 (lab order codes); kept 7.8 as review task 3.7.
- Cross-reference wording: see REVIEW_TASKS_2026-11-08 §2.1b.

## 2026-11-09 — Review item R2 (restart anticoagulation after ICH)

Approved by Jason in chat 2026-11-09. Draft: `planning/drafts/review-2026-11-08/R2/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

| Draft | Findings | Change |
|---|---|---|
| `vascular-antithrombotics.restart-antithrombotic-after-ich.json` | F1–F9, F12, F13 | `rules[2].evidenceNote` += ESO-EANS 2025 PICO 6.2 (no evidence-based recommendation; expert consensus 14/15: DOAC may be considered); `rules[4].evidenceNote` += ESO PICO 6.3 expert consensus (CAA example); `pearls[0]` → AHA ICH 2022 §9.1.1 recurrence HRs; pearls added: ESO "may not benefit" criteria (ungraded), PRESTIGE-AF, ENRICH-AF (unpublished), lobar ICH/cSAH; searchTerms += PRESTIGE-AF, ENRICH-AF, microbleeds; relatedIds += consult-workups:ich-etiology-workup; sources += ESO-EANS 2025, PRESTIGE-AF, ENRICH-AF slides, ESC press release |

Rules adopted:
- Trial results go in `pearls`, never `rules`. A guideline that agrees in direction but grades differently goes in the rule's `evidenceNote`, not `esoDiffers`. `evidenceLevel` stays on the current graded statement (AHA ICH 2022).
- Unpublished trial data may be encoded as a labelled pearl when every figure is confirmed against primary presentation material read in full. The publication recheck is tracked here and in REVIEW_TASKS, not in `verify[]`.

### Version
| registry | from | to | level |
|---|---|---|---|
| vascular-antithrombotics | 1.0.1 | 1.1.0 | MINOR (new sources and evidence statements; no rule, tier or evidence level changed) |

### ACCEPT (not raised again)
- F10: ESO-EANS 2025 PICO 6.4 (antiplatelet) agrees with AHA Rec 2; not added (outside R2).
- F11: 7–8-week timing kept; still the only graded timing statement (ESO-EANS 2025 has none).
- B2: DOAC over VKA left out as common knowledge.
- B3: A3ICH has no results (recruiting, 2026-11-09).
- B4: AHA ICH 2022 is still the current AHA/ASA ICH guideline.

### PARK
- F5b: recheck `pearls[3]`–`[4]` (ENRICH-AF) against the peer-reviewed publication.
- B1: ENRICH-AF major bleeding by label-based dose eligibility (60 mg HR 3.95 vs 30 mg HR 0.97, interaction p=0.002; slide 17). Not encoded; revisit at publication.

### Open items
- `verify[]`: none.
- PARK F5b and B1 (above).
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R2/README.md`.

Update 2026-11-11: signed by Jason (`restart-antithrombotic-after-ich`, `lastReviewed` 2026-11-11) and released: vascular-antithrombotics 1.1.1, content 2.2.0+4e5af9ee. The sign-off/release open item above is closed; PARK F5b and B1 stay open.

## 2026-11-09 — Review item R3 (hyponatremia ODS-risk correction limit)

Approved by Jason in chat 2026-11-09. Draft: `planning/drafts/review-2026-11-08/R3/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

Finding: ESE 2014 has no 8 mmol/L first-24-h limit for high-risk patients (recommendations 7.1.2.4, 7.2.1.6, 7.4.1.4, 7.5.1.1 and rationale checked). The stricter limit is Verbalis 2013 (US expert panel, ungraded, S21): 8 mmol/L in any 24-hour period for high ODS risk (Table 3, S20), goal 4–6 mmol/L/day. Calculator logic already matches (ODS risk: 8 every period; otherwise ESE 10 then 8) and is unchanged.

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.hyponatremia-ods.json` | F1–F3, F6–F8 | `definitions[1]` → Verbalis 2013 (any 24 h; goal 4–6 mmol/L/day; high risk: Na ≤105, hypokalemia, alcohol use disorder, malnutrition, advanced liver disease), `keyNumbers[2]` exact copy; `immediateActions[2].action` → "Na at 6 h, 12 h, then daily (ESE 2D); if Na ≤120: q4–6h until ≥125 (Verbalis); …", `keyNumbers[3]` exact copy; `treatment[1].evidenceNote` += Verbalis re-lowering (>8 in any 24 h, high risk); `pitfalls[2]` deleted (unsourced duplicate, Na ≤120 conflicted with Table 3); sources += Verbalis 2013 |
| `src/lib/calculators.ts` (`sodium-correction`) | F4, F5 | Docstring, META `formula` and `sources` (+ `S.verbalis2013`) attribute the ODS-risk limit to Verbalis 2013; warning text "(ESE 2014; ODS risk: Verbalis 2013)". No formula, cap or rounding change |

Rules adopted:
- A limit from an ungraded source is labelled with the source and "ungraded" in the line itself; ESE 2014 stays the graded primary limit, and `evidenceLevel` follows ESE.
- Truncated keyNumbers copies are fixed to exact copies whenever an item touches the entry.

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | 2.0.1 | 2.1.0 | MINOR (threshold re-attributed and reworded; new source; monitoring interval) |
| app (package.json) | 2.2.0 | 2.2.1 | PATCH (calculator docstring, warning text, META; no formula change) |

### ACCEPT (not raised again)
- A1: ESE's ODS risk-factor list (alcohol abuse, liver disease, thiazides/antidepressants, degree and duration) not encoded; ESE sets no separate limit for it.
- A2: `definitions[0]` "(1D) … until Na 130" matches ESE 7.1.2.4.
- A3: "chronic" qualifier left out as common knowledge.
- A4: Verbalis normal-risk limits (10–12/24 h, 18/48 h), acute-hyponatremia exemption and a 48-h calculator check are outside R3.
- A5: no newer ESE or US hyponatremia guideline (web check 2026-11-09).
- A6: observational data questioning strict limits (MacMillan 2023, Seethapathy 2023, Chauhan 2025) not encoded.
- A7: Verbalis 2013 was funded by an unrestricted Otsuka grant; context only.

### Open items
- `verify[]`: none.
- C1 result (calculator `odsRisk` label): see PR.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R3/README.md`.

Encoded 2026-11-11 on `content-r3-2026-11-09` (base `a2c145e`). C1 result: the `odsRisk` checkbox label in `src/components/ImmunoSodiumCalculators.tsx` read "High ODS risk (Na ≤105, alcoholism, malnutrition, liver disease, hypokalemia)", which differed from Verbalis Table 3 ("liver disease" for "advanced liver disease"; "alcoholism" for the entry's "alcohol use disorder"). Jason in chat 2026-11-11: fix it in this PR; the list now reads "Na ≤105, hypokalemia, alcohol use disorder, malnutrition, advanced liver disease", matching `definitions[1]`. No test asserted the old warning string or META text, so `__tests__/calculators.test.ts` is unchanged.

Update 2026-11-11: signed by Jason (`hyponatremia-ods`, `lastReviewed` 2026-11-11) and released: acute-neuro 2.1.1, app 2.2.1, content 2.2.1+76906193. The sign-off/release open item above is closed.

## 2026-11-09 — Review item R4 (healthcare-associated ventriculitis and meningitis)

Approved by Jason in chat 2026-11-09. Draft: `planning/drafts/review-2026-11-08/R4/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the post-neurosurgical/shunt row in `bacterial-meningitis` cited IDSA 2004. The specific guideline is IDSA 2017 (Tunkel, Clin Infect Dis 2017;64(6):e34–e65). Same empiric regimen (Rec 37, strong, low) and the same adult beta-lactam doses (Table 2), but vancomycin 30–60 mg/kg/day q8–12h with trough 15–20 μg/mL (Table 2, Rec 38), so the row no longer points to the 2004 community dose. No newer version found (web check 2026-11-09).

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.bacterial-meningitis.json` | F1–F7, K1–K2, N1–N4, N6, N7, N9–N13 | `treatment[4]` → IDSA 2017: vancomycin 30–60 mg/kg/day (+ structured dose), beta-lactam by local susceptibility, device removal (Recs 62–63), duration (Recs 58–61); new `treatment[5]` intraventricular antibiotics (Recs 55–57, Table 3; route INTRATHECAL); definitions += EVD culture classification (Rec 22), CoNS contaminant (Rec 26), post-neurosurgery infection vs chemical meningitis (ungraded); blood cultures += VA/VP shunt (Recs 20–21); workup += shunt/EVD culture hold ≥10 days (Rec 17), CSF lactate ± PCT (Rec 30), CSF β-D-glucan/galactomannan (Rec 33); rifampin += hardware note (Rec 44); pitfalls += EVD CSF sampling (Recs 67, 69); presentation += C. acnes; searchTerms += EVD, ventriculitis, shunt infection; keyNumbers[1], [4] exact copies; sources += IDSA 2017 |

Rules adopted:
- Community-acquired rows stay on IDSA 2004; IDSA 2017 applies only to the healthcare-associated rows.
- GRADE strong → STRONG and weak → WEAK regardless of evidence quality; the guideline's "strong, low"-style wording is kept in `evidenceNote` or the line.
- Data from an evidence summary only (study cutoffs, single cohorts) is encoded as "study data (ungraded)", never as a graded recommendation.
- Intraventricular dosing uses route `INTRATHECAL` with "intraventricular" in the text (no schema change).

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | 2.1.1 | 2.2.0 | MINOR (dose and evidence source changed; new source; new workup and treatment rows) |

### PARK (offered, not picked; can be revived)
- N5: serum procalcitonin (Rec 31, weak, low).
- N8: MRI with gadolinium + DWI (Rec 35, strong, moderate).
- N14: no prolonged EVD prophylaxis, no fixed-interval exchange (Recs 76, 78).
- N15: basilar skull fracture CSF leak (Recs 81–83); guideline vaccine schedule outdated.

### ACCEPT (not raised again)
- A1: community vancomycin stays 30–45 mg/kg/day (IDSA 2004).
- A2: healthcare-associated beta-lactam doses match IDSA 2017 Table 2.
- A3: Rec 39 allergy alternatives not added; the allergy row already names aztreonam and ciprofloxacin.
- A4: organism-directed therapy (Recs 41–54, Table 1) not encoded, except Rec 44.
- A5: shunt reimplantation timing (Recs 70–73) not encoded.
- A6: other IDSA 2017 recommendations not encoded (common knowledge, device-specific, or not picked).
- A7: no newer guideline found.
- A8: vancomycin structured dose uses actual body weight, matching the community row; the guideline is silent.

### Open items
- `verify[]`: V1 vancomycin trough target vs AUC dosing; V2 intraventricular gentamicin 4–8 mg (Table 3 footnote d) vs 2 / 3 / 4–5 mg by ventricle size (footnote e).
- Jason: resolve V1–V2, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R4/README.md`.

Encoded 2026-11-11 on `content-r4-2026-11-09` (base `0fa999d`). Render check: `treatment[5]` shows route `INTRATHECAL` and its dose text with no errors; the entry page shows `doseText` only, so the structured doses on `treatment[4]` are not displayed anywhere.

### Verify item closed (Jason, 2026-11-11), no content change
- `bacterial-meningitis` V2 (intraventricular gentamicin): Jason in chat: the entry should show 2 / 3 / 4–5 mg (IDSA 2017 Table 3 footnote e, by ventricle size), which is what `treatment[5].doseText` already says. The 4–8 mg figure (footnote d) is not shown.
- `bacterial-meningitis` V1 (vancomycin trough target): Jason in chat 2026-11-11: the local vancomycin protocol uses AUC 400–600 and takes precedence. `treatment[4].doseText` keeps the IDSA 2017 trough target (15–20 μg/mL if intermittent bolus, Rec 38) as written; no content change.

Update 2026-11-11: V1 and V2 closed by Jason (above); signed by Jason (`bacterial-meningitis`, `lastReviewed` 2026-11-11) and released: acute-neuro 2.2.1, content 2.2.1+8661e2e8. The verify and sign-off/release open items above are closed; PARK N5, N8, N14 and N15 stay available to revive.

## 2026-11-09 — Review item R5 (Parkinson infusion therapies)

Approved by Jason in chat 2026-11-09 ("approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R5/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

Finding: `inpatient-parkinson-disease` `pitfalls[1]` implied there is no US label for continuous SC apomorphine. Onapgo (continuous SC apomorphine; approved Feb 4, 2025) is labeled for motor fluctuations in advanced PD; Apokyn still covers pen doses only. The card had no guidance for patients admitted on Vyalev, Onapgo or Duopa. Sources: Vyalev PI 3/2026, Onapgo PI 5/2026 + Patient IFU 6/2026, Duopa PI and Medication Guide 3/2026 + CADD-Legacy 1400 Operator's Manual. No label addresses NPO status directly.

| Draft | Findings | Change |
|---|---|---|
| `reference-cards.inpatient-parkinson-disease.json` | F1–F5, E1–E4, K1–K5, D8 | New `sections[1]` "Admitted on an infusion pump": Vyalev (keep running; off >1 h new set/site, >3 h loading dose; backup oral carbidopa-levodopa; site infection; ×1.3 oral → pump; B6 seizures; pump MRI guidance not in label), Onapgo (keep running over waking day; ≥1 h break → extra dose as loading dose, max 2 mg, ≥3 h apart, ≤3/day; oral PD meds for prolonged stop; daily site/cartridge; no MRI; never IV; QTc; hemolytic anemia), Duopa (16-h infusion + night oral IR; off >2 h → oral IR; GI/tube complications; 20 mg/mL, 97% bioavailability; pump off for MRI; B6 seizures; polyneuropathy 5%); new Antiemetics row trimethobenzamide (only antiemetic studied with apomorphine; 300 mg PO TID); 5-HT3 row += Onapgo; `pitfalls[1]` reworded; Rotigotine dose `notes[0]` split (wording); keyNumbers[0]–[4] exact copies; title += pumps; 7 search terms; sources += 3 labels |

Rules adopted:
- Label-only rows are NOT_GRADED, with "<Drug> PI §…" in `evidenceNote`; a pump IFU or operator's manual is cited inside that product's label source string.
- Labels give oral → pump conversions only; the card states that and points to the patient's prescribed backup regimen rather than deriving a pump → oral conversion.
- keyNumbers are exact copies of one field, optionally prefixed by the row's `parameter` or `condition` + ": " (applies to reference cards as R3/R4 applied it to acute-neuro).

LEDD check (C1): Jost 2023 Table 1 gives subcutaneous foslevodopa/foscarbidopa "DD × 0.75", DD = foslevodopa mg (Table 3 example). Calculator: `foslevodopa-foscarbidopa-sc` factor 0.75 in `LEVODOPA_FACTORS`, applied to the mg/day entered for "Foslevodopa SC (Vyalev)" (card subtitle "Total daily doses (mg/day) — Jost 2023"), so foslevodopa mg/day × 0.75: matches Jost 2023 Table 1. C2: the calculator also has LCIG (Duopa) × 1.11 and a single "Apomorphine SC" item × 10 (mg/day, no separate infusion item); both match Jost. No calculator change.

### Version
| what | from | to | level |
|---|---|---|---|
| reference-cards | 1.2.3 | 1.3.0 | MINOR (new rows and sources; pitfall meaning changed) |

### PARK (offered or noticed, not encoded; can be revived)
- D8b: sourced Vyalev MRI line (needs the VYAFUSER pump IFU).
- C2: calc:ledd coverage of LCIG (Jost × 1.11) and apomorphine infusion (× 10).
- A4: papaverine reduces levodopa effect (Vyalev/Duopa §7.3).
- A7: Duopa BUN/CPK elevations and false-positive pheochromocytoma screens (§5.12).
- A10: "trimethobenzamide" search term.

### ACCEPT (not raised again)
- C1 (pending Claude Code's read-only check): 0.75 matches Jost when applied to foslevodopa mg.
- A1: nonselective MAOI contraindication not encoded (common knowledge).
- A2: pump-label D2-antagonist, isoniazid, iron and protein interactions already covered by existing rows.
- A3: maximum doses, titration, Duopa starting-dose formula, storage not encoded.
- A5: Onapgo nitroglycerin, alcohol, renal first-extra-dose and sulfite items not encoded.
- A6: no label addresses NPO status; rows state only what labels say.
- A8: labels as uploaded (newer than the brief's dates); no further DailyMed check.
- A9: Jost 2023 read via web-fetch extraction; no Jost number encoded.

### Open items
- `verify[]`: none.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R5/README.md`.

Encoded 2026-11-11 on `content-r5-2026-11-09` (base `8d903bc`). Render check: the pump section shows second with three Recommended / Not graded rows; key numbers wrap cleanly at phone width; search finds the card for "Vyalev", "Onapgo" and "Duopa".

Update 2026-11-11: signed by Jason (`inpatient-parkinson-disease`, `lastReviewed` 2026-11-11) and released: reference-cards 1.3.1, content 2.2.1+29d8aa57. The sign-off/release open item above is closed; PARK D8b, C2, A4, A7 and A10 stay available to revive.

## 2026-11-09 — Review item R6 (MG/NMOSD on FcRn or complement inhibitors)

Approved by Jason in chat 2026-11-09 ("approve"; recommendations as offered). Draft: `planning/drafts/review-2026-11-08/R6/` (base: review-2026-11-08 export packet). Both entries `lastReviewed: "UNREVIEWED"`.

Finding: `myasthenic-crisis` and `nmosd-mogad-attack` had no guidance for patients already on a complement C5 inhibitor or an FcRn blocker who need PLEX or IVIG, and no meningococcal warning. Sources: Soliris PI 6/2026, Ultomiris PI 10/2026, Zilbrysq PI 1/2026, Vyvgart PI 5/2026, Vyvgart Hytrulo PI 5/2026, Rystiggo PI 12/2025, Imaavy (nipocalimab) PI 8/2026, Uplizna PI 9/2026, Enspryng PI 10/2026. Soliris and Ultomiris give supplemental doses after PLEX (and Ultomiris after any IVIG cycle; Soliris none for acute-rescue IVIG). Zilbrysq, the four FcRn-blocker labels, Uplizna and Enspryng give no PLEX/IVIG dosing guidance.

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.myasthenic-crisis.json` | F1–F7, K1–K2, D2, D4 (i–iii) | New ADJUNCT `treatment[2]` "Already on a C5 inhibitor": eculizumab 300/600 mg within 60 min after each PLEX (by most recent dose), no supplement for acute-rescue IVIG; ravulizumab 1,200–1,800 mg within 4 h after each PLEX (by weight and most recent dose), 600 mg within 4 h after an IVIG cycle; zilucoplan label silent. New ADJUNCT `treatment[3]` "Already on an FcRn blocker": no label interval; may reduce effect of IVIG and IgG mAbs incl. eculizumab/ravulizumab; labels silent on PLEX; delay dose with active infection. Pitfalls += meningococcal (boxed warning), Safety Card 3/8/2 months, rozanolixizumab aseptic meningitis, inebilizumab no PLEX/IVIG guidance. institutionVaries += REMS dispensing. relatedIds += bacterial-meningitis. 16 search terms; 8 label sources; keyNumbers[2], [3] made exact copies |
| `acute-neuro.nmosd-mogad-attack.json` | N1–N4, K3, D2, D4 (ii) | New ADJUNCT `treatment[3]` C5 supplemental dosing (eculizumab PLEX only — IVIG table is gMG-only; ravulizumab PLEX and IVIG). Pitfalls += meningococcal, Safety Card 3/8 months, inebilizumab/satralizumab no PLEX/IVIG guidance. institutionVaries += REMS. relatedIds += bacterial-meningitis. 9 search terms; 4 label sources; keyNumbers[2] made an exact copy |

Rules adopted:
- Patients already on a biologic get an ADJUNCT treatment row ("Already on …") when the label gives doses or a concrete action; otherwise a pitfall line.
- When a label is silent on an interaction we'd look up (PLEX/IVIG), the entry says so explicitly rather than staying silent or inferring.
- Label rows are NOT_GRADED with "<Drug> PI §…" in `evidenceNote` (as R5).

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | 2.2.1 | 2.3.0 | MINOR (new dosed treatment rows, sources and safety lines; 2 entries) |

### PARK (offered or noticed, not encoded; can be revived)
- D5: starting a C5 or FcRn inhibitor during crisis (Gilhus 2024 p6 rec iv; ICG 2020 p6 antibiotic cover; label urgent-start prophylaxis) — candidate new item.
- D6: gefurulimab (EMA CHMP positive opinion 17 Sep 2026, Klygefa); no US approval found 2026-11-09 — recheck.
- A5: Imaavy latent viral reactivation / serious EBV events (§5.1).
- A6: Vyvgart Hytrulo CIDP worsening when switching from IVIG (§6.2).

### ACCEPT (not raised again)
- D3: FcRn half-lives not encoded (labels don't link them to IVIG/PLEX timing).
- A1: Ultomiris §7.1 cross-reference typo (§2.5 → table is §2.4).
- A2: Soliris FFP supplemental row not encoded.
- A3: eculizumab PLEX clearance data not encoded (dosing table covers it).
- A4: PLEX removal of FcRn blockers or zilucoplan not inferred.
- A7: Vyvgart indication broadened (5/2026) not encoded.
- A8: NMOSD-label screening and premedication items not encoded.
- A9: `IV` route on the advisory FcRn row.
- A10: labels as uploaded; no further DailyMed check.

### Open items
- `verify[]`: none.
- K1–K3 (keyNumbers made exact copies) were not offered in chat; revert to PARK if Jason prefers.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R6/README.md`.

Encoded 2026-11-11 on `content-r6-2026-11-09` (base `6fc359b`). Render check: the new ADJUNCT rows show Not graded and Institution varies badges in both entries; the long C5 dose text and the new key numbers wrap cleanly at phone width; the bacterial-meningitis link is present in both; search finds each entry for its listed brand names. The entry page shows `doseText` only, so the four structured doses are not displayed anywhere.

Update 2026-11-11: Jason in chat: keep K1–K3 (keyNumbers exact copies). Signed by Jason (`myasthenic-crisis`, `nmosd-mogad-attack`, `lastReviewed` 2026-11-11) and released: acute-neuro 2.3.1, content 2.2.1+e949db2a. The K1–K3 and sign-off/release open items above are closed; PARK D5, D6 (gefurulimab recheck), A5 and A6 stay open.

## 2026-11-09 — Review item R7 (seizure-threshold and ASM-interaction lists)

Approved by Jason in chat 2026-11-09 ("Approve"; all recommendations as offered). Draft: `planning/drafts/review-2026-11-08/R7/` (base: review-2026-11-08 export packet). All 13 entries `lastReviewed: "UNREVIEWED"`.

Finding: the seizure-threshold list lacked isoniazid, imipenem, calcineurin inhibitors, ifosfamide, intrathecal baclofen and busulfan; the ASM-interaction list lacked inducer–calcineurin-inhibitor, CYP3A4-inhibitor–carbamazepine, azole–phenytoin, inducer–dabigatran/edoxaban, lacosamide–conduction-drug and inducer–voriconazole entries. Sources: isoniazid PI (Marlex) 9/2025, Primaxin PI 7/2024, Prograf PI 8/2023, Neoral PI 8/2026, Ifex PI 10/2026, Gablofen PI 5/2026, Lioresal Intrathecal PI 12/2022, Busulfex PI 10/2026, Tegretol PI 8/2026, Dilantin PI 8/2023, fluconazole PI (ANI) 8/2025, voriconazole PI (Aurobindo) 4/2026, Pradaxa PI 6/2025, Savaysa PI 7/2025, Vimpat PI 5/2026. The Primaxin label makes no comparison with other carbapenems, so "strongest carbapenem signal" was not encoded.

| Registry | New / edited | Change |
|---|---|---|
| seizure-threshold | isoniazid, imipenem-cilastatin, calcineurin-inhibitors, ifosfamide, intrathecal-baclofen, busulfan (new) | Isoniazid: overdose seizures; pyridoxine gram for gram, 5 g if unknown; diazepam. Imipenem: 0.4% seizures; CrCl ≤30 higher risk; <15 only with HD within 48 h; ganciclovir. Tacrolimus/cyclosporine: PRES, seizures; cyclosporine PRES risk factors. Ifosfamide: encephalopathy incl. seizures; methylene blue (no label dose); CYP3A4 inducers. IT baclofen (AVOID abrupt interruption): withdrawal and overdose seizures; restore IT dose; physostigmine 2 mg ≤1 mg/min; CSF 30–40 mL. Busulfan: label ASM prophylaxis 12 h before to 24 h after |
| asm-interactions | inducing-asm-calcineurin-inhibitors, cyp3a4-inhibitors-carbamazepine, azoles-phenytoin, inducing-asm-dabigatran-edoxaban, lacosamide-conduction-drugs, inducing-asm-voriconazole (new); carbapenems-valproate (edited) | Inducers ↓ tacrolimus/cyclosporine (CAUTION). Macrolides, fluconazole (+30%), voriconazole, isoniazid ↑ carbamazepine (CAUTION). Fluconazole (AUC +88%) / voriconazole ↑ phenytoin; voriconazole dose ↑ with phenytoin (CAUTION). Carbamazepine/phenytoin with dabigatran/edoxaban (AVOID; Tegretol names both; Pradaxa/Savaysa name only rifampin). Lacosamide + conduction-affecting drugs: ECG before and at steady state (CAUTION). Voriconazole contraindicated with carbamazepine and long-acting barbiturates (AVOID). carbapenems-valproate: + Primaxin "generally not recommended" line and source; tier unchanged |

Rules adopted:
- `fdaBoxedWarning` is true only when the boxed warning itself names seizures; a boxed warning on a related hazard (encephalopathy, withdrawal) is named in a pearl instead.
- When a tier word could be misread (IT baclofen AVOID), the title and `pearls[0]` say what is to be avoided.
- When labels disagree in strength for drugs sharing an entry, the entry takes the strongest label wording as its tier and states each label's own wording in `management`.
- New entries link only to ids already in `valid-ids.txt`; links between entries added in the same item are text until a later PATCH.

### Version
| what | from | to | level |
|---|---|---|---|
| seizure-threshold | 0.2.5 | 0.3.0 | MINOR (6 new entries) |
| asm-interactions | 0.1.1 | 0.2.0 | MINOR (6 new entries; 1 edited) |

### PARK (offered or noticed, not encoded; can be revived)
- D8: general ASM + oral chemotherapy / antiretroviral entry (Tegretol and Dilantin label-named pairs) — candidate item.
- D9e: Beers 2023 baclofen eGFR <60 encephalopathy (oral baclofen).

### ACCEPT (not raised again)
- A1: "imipenem = strongest carbapenem signal" not encoded (no label comparison).
- A2: methylene blue dose for ifosfamide encephalopathy not encoded (label gives none).
- A3: Primaxin VPA-glucuronide mechanism hypothesis not added.
- A4: Sandimmune label not read; search term only.
- A5: macrolide labels not uploaded; Tegretol is the source.
- A6: fosphenytoin covered by the prodrug pearl (Cerebyx not re-uploaded).
- A7: common-knowledge items left out.
- A8: no Beers 2023 seizure row applies.
- A9: existing apixaban/rivaroxaban entry unchanged.
- A10: labels as uploaded; no further DailyMed check.
- A11: cross-links between new R7 entries left for a later PATCH.

### Open items
- `verify[]`: none.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R7/README.md`.

Encoded 2026-11-11 on `content-r7-2026-11-09` (base `d79f02f`). Render check: tier badges as specified; no boxed-warning badge on any new threshold entry; all 13 pages wrap at phone width; all 12 related links open; every listed search finds its entry. Searching "INH" matches as a substring ("inhibitors"), so isoniazid is result 15 of 39.

Update 2026-11-11: signed by Jason (all 13 R7 entries by name, `lastReviewed` 2026-11-11) and released: seizure-threshold 0.3.1, asm-interactions 0.2.1, content 2.2.1+e683ebcc. The sign-off/release open item above is closed; PARK D8 and D9e stay available to revive.

## 2026-11-09 — Review item R8 (home ASMs when NPO; phenobarbital)

Approved by Jason in chat 2026-11-09 ("Approve"; all recommendations as offered). Draft: `planning/drafts/review-2026-11-08/R8/` (base: review-2026-11-08 export packet). All 8 entries `lastReviewed: "UNREVIEWED"`.

Finding: the antiseizure-medications registry covered 6 ASMs; patients on oxcarbazepine, carbamazepine, topiramate, clobazam, zonisamide, cenobamate or perampanel who go NPO or get a tube had no card, and phenobarbital had no source. Sources: Trileptal PI 10/2026, Oxtellar XR PI 10/2026, Tegretol/Tegretol-XR PI 8/2026, Topamax PI 3/2026, Onfi PI 10/2026, Sympazan PI 12/2025, Zonegran PI 9/2026, Zonisade PI 9/2025, Xcopri PI 8/2025, Fycompa PI 1/2024; phenobarbital from the AES Treatments Committee ASM summary, 4th ed., rev. 4/1/2024 (Table 1), accepted by Jason because there is no current FDA adult phenobarbital label (Sezaby is neonatal only). Carnexiv (IV carbamazepine) is listed as discontinued by secondary sources; not encoded.

| Registry | New / edited | Change |
|---|---|---|
| antiseizure-medications | oxcarbazepine, carbamazepine, topiramate, clobazam, zonisamide, cenobamate, perampanel, phenobarbital (new); `scopeNotes[2]` (edited) | Oxcarbazepine: suspension 60 mg/mL equal-dose swap; Oxtellar XR not crushable, AUC ~19% lower than IR BID; CrCl <30 start 300 mg/day; Na <125 in 2.5%. Carbamazepine: suspension same mg/day more often, no co-administered liquids; XR never crushed; 4–12 mcg/mL; avoid DOACs; NMB resistance; SIADH. Topiramate: CrCl <70/1.73 m² half dose; HD supplement (no amount); sprinkle on soft food; valproate hyperammonemia. Clobazam: crush in applesauce, suspension, film; CYP2C19 inhibitors up to 5× metabolite. Zonisamide: avoid eGFR <50; Zonisade suspension; inducers shorten t½ to 27–38 h. Cenobamate: crush, 25 mL water, NG tube; phenytoin ↓ up to 50%; DRESS with fast titration. Perampanel: start 4 mg with inducers; suspension interchangeable; t½ ~105 h. Phenobarbital: 60 mg/day or 1–4 mg/kg/day, max 240; 15–45 mcg/mL; slow taper. scopeNotes: phenobarbital now covered from AES |

Rules adopted:
- One card per drug; XR, suspension and film products sit inside the generic card.
- New ASM items get `formularyStatus: INSTITUTION_VARIES` until a local status is supplied.
- AES serum ranges may be added to `levels[]` only with the attribution "range from AES Treatments Committee clinical experience, not the label"; a label range, where one exists, is used instead.
- Per-kg doses whose source doesn't name the weight stay in `doseText` and aren't structured.
- Where no label addresses tube administration, the card says "Tube administration not addressed in label — confirm with pharmacy".

### Version
| what | from | to | level |
|---|---|---|---|
| antiseizure-medications | 1.0.1 | 1.1.0 | MINOR (8 new entries; scopeNotes[2] edited) |

### PARK (offered or noticed, not encoded; can be revived)
- D7: matching lines in existing cards (phenytoin-fosphenytoin: oxcarbazepine >1200 mg/day and cenobamate ↑ phenytoin, topiramate; lamotrigine: cenobamate ↓ lamotrigine) — candidate follow-up item.
- P2: `relatedIds` between the 8 new cards and to R7 entries — later PATCH once the ids are valid.

### ACCEPT (not raised again)
- D3: Carnexiv market status not encoded (secondary sources only).
- A1: Sezaby neonatal label not encoded.
- A2: no label re-titration rule for cenobamate after interruption.
- A3: no label Oxtellar XR → IR conversion (card states the exposure data).
- A4: no label topiramate HD supplement amount (card says so).
- A5: phenobarbital gaps in the AES source stated on the card (weight basis, route, IV↔PO, renal, enteral).
- A6: clobazam structured doses for the >30 kg band only.
- A7: carbamazepine interaction list abridged.
- A8: common-knowledge and out-of-scope items left out.
- A9: no topiramate IV or other non-US forms.
- A10: labels as uploaded; only Carnexiv and Sezaby status checked on the web.

### Open items
- `verify[]`: none.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R8/README.md`.

Encoded 2026-11-11 on `content-r8-2026-11-09` (base `72766b5`). Render check: Institution varies and Not graded badges on every maintenance item; renal rows as specified (oxcarbazepine CrCl <30 Cockcroft-Gault; topiramate CrCl <70 BSA-normalized plus HD; HD rows on cenobamate and perampanel; notes only on the other four); all 8 cards wrap at phone width; all 9 distinct links open; every listed search returns its card first.

Update 2026-11-11: signed by Jason (all 8 R8 cards by name, `lastReviewed` 2026-11-11) and released: antiseizure-medications 1.1.1, content 2.2.1+2b86eaac. The sign-off/release open item above is closed; PARK D7 and P2 stay available to revive.

## 2026-11-10 — Review item R9 (ESUS: ARCADIA)

Approved by Jason in chat 2026-11-10. Draft: `planning/drafts/review-2026-11-08/R9/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

| Draft | Findings | Change |
|---|---|---|
| `vascular-antithrombotics.esus-antithrombotic.json` | F1, F2, D4 | `pearls[2]` ARCADIA (cryptogenic stroke + atrial cardiopathy, no AF; apixaban vs aspirin 81 mg, n=1015; recurrent stroke 4.4%/yr both, HR 1.00; stopped for futility; no greater benefit at higher biomarker levels), ungraded; searchTerms += ARCADIA, atrial cardiopathy; relatedIds += vascular-antithrombotics:cancer-associated-stroke; sources += Kamel 2024 (JAMA) |

Rules applied:
- Trial results go in `pearls`, never `rules` (R2 rule). A pearl carries a grade only if a guideline grades the trial; AHA 2026 (full text) does not cite ARCADIA and Kleindorfer 2021 predates it, so the pearl is ungraded.

### Version
| registry | from | to | level |
|---|---|---|---|
| vascular-antithrombotics | 1.1.1 | 1.2.0 | MINOR (new source and evidence statement; no rule, tier or evidence level changed) |

### ACCEPT (not raised again)
- D1b: ARCADIA not added to the `rules[0]` parenthetical.
- D2: no guideline grade for ARCADIA (AHA 2026 silent; Kleindorfer 2021 predates it).
- A1: `rules[0]` AHA 2026 statement confirmed as §4.8 Rec 5 (COR 1, LOE A, p e378).
- A2–A4: ARCADIA safety outcomes, post-randomization AF analysis and trial exclusions left out of the pearl.

### PARK
- P1: ARCADIA secondary analyses (ARCADIA-MRI covert infarcts, JAMA Neurol 2025; LV systolic dysfunction post hoc, 2025): not read; candidate new item.
- P2: `cancer-associated-stroke` "ARCADIA cancer subgroup" line: not in the primary paper; check its source.

### Open items
- `verify[]`: none.
- PARK P1 and P2 (above).
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R9/README.md`.

Encoded 2026-11-11 on `content-r9-2026-11-10` (base `413176d`). The draft expected 0.14.0 → 0.15.0; the registry was at 1.1.1 after R2, so the approved MINOR level was applied to that (docs/VERSIONING.md, "Encoding approved drafts").

Update 2026-11-11: signed by Jason (`esus-antithrombotic`, `lastReviewed` 2026-11-11) and released: vascular-antithrombotics 1.2.1, content 2.2.1+a21ac651. The sign-off/release open item above is closed; PARK P1 and P2 stay open.

## 2026-11-10 — Review item R10 (serotonin syndrome: triptan example)

Approved by Jason in chat 2026-11-10. Draft: `planning/drafts/review-2026-11-08/R10/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.serotonin-syndrome.json` | F1, D3 | `presentation[0]`: "triptans + SSRI/SNRI" removed from example triggers; `pitfalls[3]` Orlova 2018 (30,928 person-years of co-prescription; 0.6 definite cases/10,000 person-years, 95% CI 0–1.5; 2.3 incl. possible; none life-threatening); searchTerms += triptan; sources += Orlova 2018 (JAMA Neurol) |

Rules applied:
- Trial and cohort results go in their own line with their numbers, not in descriptive lists (R2/R9 rule). Pitfalls carry no grade.

### Version
| registry | from | to | level |
|---|---|---|---|
| acute-neuro | 2.3.1 | 2.4.0 | MINOR (new source and evidence statement; example removed; no dose, threshold or evidence level changed) |

### ACCEPT (not raised again)
- D1a/b: delete-only and inline "rarely" qualifier not chosen.
- D2iii: authors' "daily SSRI/SNRI is the likelier cause" left out (opinion).
- A1: `definitions[0]` Hunter criteria follow Dunkley 2003; Orlova's adapted Box layout not adopted.
- A2–A3: mechanism and study limitations not encoded.

### PARK
- P1: `pitfalls[2]` "ondansetron/metoclopramide add-ons": evidence not examined.
- P2: current triptan label wording on serotonin syndrome: no label read.

### Open items
- `verify[]`: none.
- PARK P1 and P2 (above).
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R10/README.md`.

Encoded 2026-11-11 on `content-r10-2026-11-10` (base `caf1ffc`). The draft gave no numbers ("as found → next MINOR"); the registry was at 2.3.1 after R3, R4 and R6, so the approved MINOR level was applied to that (docs/VERSIONING.md, "Encoding approved drafts").

Update 2026-11-11: signed by Jason (`serotonin-syndrome`, `lastReviewed` 2026-11-11) and released: acute-neuro 2.4.1, content 2.2.1+8087811d. The sign-off/release open item above is closed; PARK P1 and P2 stay open.

## 2026-11-10 — Review item R12 (neuroprognostication card)

Approved by Jason in chat 2026-11-10 ("approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R12/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had neuroprognostication only for cardiac arrest. The NCS GRADE series also covers ICH (Hwang 2024), AIS (Mainali 2026), SE (Madzar 2026), GBS (Busl 2023) and moderate–severe TBI (Muehlschlegel 2024). No NCS aSAH neuroprognostication guideline was found (web search 2026-11-10). No guideline rates any predictor or model "reliable"; moderately reliable: ENI (AIS, good outcome); bulbar/limb weakness, EGRIS, EGOS, mEGOS (GBS); bilateral nonreactive pupils on admission, CRASH, IMPACT (TBI).

| Draft | Findings | Change |
|---|---|---|
| `reference-cards.neuroprognostication.json` | N1–N7, K1–K5, V1–V2 | New card `neuroprognostication`, 5 row-list sections: ICH (defer ≥48–72 h except clinically devastated; recovery days to years; not reliable alone for function ≥3 mo or 30-day mortality, incl. original and max-ICH scores), AIS (ENI NIHSS 0–1 at 24 h moderately reliable for good outcome; no fixed timing window; LHI goals before decline; recovery horizon; feeding tube/trach; not-reliable variables and models), SE (defer until etiology workup; disease-specific predictors; confounders incl. prolonged postictal 4–10 days; RSE/SRSE counseling; nothing reliable for in-hospital mortality), GBS (bulbar/limb weakness and EGRIS for ventilation ≤14 d; EGOS, mEGOS for walking ≥3 mo, with point tables; counsel on ventilation and enteral nutrition; not-reliable list), TBI (≥3 days, ideally 1–2 weeks; bilateral nonreactive pupils; CRASH/IMPACT; not-reliable list); 4 pitfalls; 5 keyNumbers; 2 verify items; 4 relatedIds; 5 sources |

Rules adopted:
- NCS neuroprognostication grades: weak recommendation → WEAK; good-practice "strong recommendation, evidence cannot be graded" → STRONG; "conditional recommendation, evidence not graded" → WEAK. Verbatim wording in `evidenceNote`.
- Moderately reliable predictor/model → RECOMMENDED; not reliable → NOT_RECOMMENDED, collapsed to one row per outcome per disease with per-item grades in `evidenceNote`.
- Generic good-practice statements (complete clinical condition, baseline function, acceptable outcomes, no nihilism) are not encoded.

Mapping check (C1): mismatch on good-practice statements. `consult-workups:post-cardiac-arrest-prognostication` encodes NCS 2023 good practice statements ("strong, evidence cannot be graded") as `evidenceLevel: "CONSENSUS"` (decisionRules 1–4 and 10), where R12 uses STRONG; weak recommendations are WEAK in both. Reliability there is free text in `decisionRules[].recommendation` ("Reliable predictor of poor outcome", "Moderately reliable predictors (use in combination)", "Not reliable predictors on their own"); consult-workup decision rules have no role field, so RECOMMENDED/NOT_RECOMMENDED has no counterpart. Neither entry was changed. GBS entry overlap (C2): no duplicate. `acute-neuro:guillain-barre-syndrome` has "EGRIS" as a search term and uses the modified score (mEGRIS, EAN/PNS 2023 Fig. 2: "mEGRIS ≥23" for ward → ICU; "mEGRIS 25–32 (>70% ventilation risk)" for high risk); it has no EGRIS 0–7 point table and no EGOS or mEGOS content. The card's EGRIS (0–7) and the entry's mEGRIS (0–32) are different scores. Entry not changed.

### Version
| what | from | to | level |
|---|---|---|---|
| reference-cards | 1.3.1 | 1.4.0 | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- C2: possible EGRIS/EGOS overlap with acute-neuro:guillain-barre-syndrome.
- D8: back-links to the card from the GBS, RSE/SRSE and cardiac-arrest entries.
- A4: "not-reliable variables may sit inside reliable models" pitfall (Madzar p.367).
- A5: GBS disability scale as an EGOS note.
- A7: calculators for EGRIS/EGOS/mEGOS/CRASH/IMPACT.

### ACCEPT (not raised again)
- C1 (pending Claude Code's read-only check): grade and role mapping as approved.
- S1: no NCS aSAH neuroprognostication guideline.
- A1: generic good-practice statements not encoded.
- A2: AIS Table 6 recovery by deficit not encoded.
- A3: reliability definitions not encoded beyond `pitfalls[1]`.
- A6: supplementary appendices not reviewed; main-text statements only.
- A8: guideline versions as uploaded.

### Open items
- `verify[]`: V1 ASTRAL grade (Mainali Table 3 vs p.758); V2 Helsinki CT "strong recommendation" (Muehlschlegel p.473).
- Jason: resolve verify[], then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R12/README.md`.

Encoded 2026-11-11 on `content-r12-2026-11-10` (base `221d346`). The draft gave no numbers ("as found → next MINOR"); the registry was at 1.3.1 after R5, so the approved MINOR level was applied to that (docs/VERSIONING.md, "Encoding approved drafts"). Render check in the dev app (375 px): 5 sections in order, 19 Recommended and 7 Not recommended rows (the latter dimmed), long lines wrap with no horizontal scroll, point-table notes render as bullet lists, all five searches find the card, all four related links resolve. One oddity, content not changed: the SE "Known etiology" note shows the raw id "See consult-workups:post-cardiac-arrest-prognostication" as plain text.

Update 2026-11-11 (Jason, in chat; entry still `lastReviewed: "UNREVIEWED"`, reference-cards stays 1.4.0):
- V1 closed (ASTRAL grade, Mainali 2026). Reason: internal inconsistency in the guideline (Table 3 moderate vs p.758 low quality); both grades are shown in the evidence note; the not-reliable rating and weak recommendation strength are unaffected.
- V2 closed (Helsinki CT "strong recommendation", Muehlschlegel 2024 p.473). Reason: probable misprint; the printed grade is quoted in the evidence note; the not-reliable rating is unaffected. A web search on 2026-11-11 (PubMed, PMC) found no erratum or correction; the journal's own article page was not checked.
- With `verify[]` empty, the two pointers "(see verify)" (AIS models row) and "— see verify" (TBI not-reliable row) were dropped from the evidence notes; no other wording changed.
- C1 decided: good-practice statements ("strong recommendation, evidence cannot be graded / not graded") are `CONSENSUS` on this card, matching `consult-workups:post-cardiac-arrest-prognostication`. 11 rows changed from STRONG to CONSENSUS (ICH 1, AIS 4, SE 4, GBS 1, TBI 1). This replaces the "→ STRONG" mapping in "Rules adopted" above and in the draft README (D6). Hwang good practice statement #1 ("conditional recommendation, evidence not graded") stays WEAK as drafted. The data entry therefore differs from the draft JSON in `verify`, those 11 `evidenceLevel` values and the two evidence-note pointers.
- Open: sign-off and release, when Jason asks.

Update 2026-11-11 (2): signed by Jason (`neuroprognostication`, `lastReviewed` 2026-11-11) and released: reference-cards 1.4.1, content 2.2.1+e56cc26d. The sign-off/release open item above is closed; PARK items C2, D8, A4, A5 and A7 stay open.

## 2026-11-10 — Review item R13 (neurosyphilis entry)

Approved by Jason in chat 2026-11-10 ("approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R13/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had no neurosyphilis, ocular or otic syphilis content. Sources: CDC STI Treatment Guidelines 2021 (MMWR Recomm Rep 2021;70[RR-4]) and CDC Laboratory Recommendations for Syphilis Testing 2024 (MMWR Recomm Rep 2024;73[RR-1]). CDC 2021 is still current (web check 2026-11-10); its 2023 erratum does not touch the neurosyphilis pages.

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.neurosyphilis.json` | N1–N12, K1–K5 | New entry `neurosyphilis` (CNS_INFECTION): LP indications (neuro signs; ocular with CN dysfunction; ocular symptoms with normal exam; tertiary; treatment failure) and when LP is not needed (isolated ocular with findings; isolated otic); CSF interpretation (CSF-VDRL specific/insensitive, diagnostic with neuro signs; CSF FTA-ABS sensitive, negative excludes; CSF TP-PA with both CDC views; HIV CSF WBC >20/mm³); regimens (aqueous PCN G 18–24 MU/day × 10–14 d; procaine + probenecid × 10–14 d; ceftriaxone 1–2 g × 10–14 d for penicillin allergy; optional benzathine × 1–3 wk after); penicillin allergy (low/high-risk history, skin test → amoxicillin 250 mg challenge → desensitization by allergist; pregnancy penicillin only); HIV testing; follow-up (RPR normalization predicts CSF normalization; failure definition); stage regimens when CSF normal; 7 pitfalls; 5 keyNumbers; 5 relatedIds; 2 sources |

Rules adopted:
- CDC STI guideline regimens are ungraded → `NOT_GRADED`, with CDC's label ("Recommended Regimen", "Alternative Regimen", "Limited data indicate", "can be considered") quoted in `evidenceNote`.
- Where CDC documents disagree (CSF TP-PA), both views are shown and neither is presented as an equal option.
- Penicillin doses are encoded in `UNITS` as integers.

Overlap check (C1): no duplicate and no contradiction. A search of all `data/*.json` for "syphilis", "VDRL", "FTA-ABS" and "treponem" found 14 lines in 6 entries, all of them test-ordering, history or differential mentions with no regimen, dose or LP rule: `acute-neuro:autoimmune-encephalitis` (workup[8]); `acute-neuro:viral-encephalitis` (immediateActions[2] and workup[1], CSF "VDRL" in the LP panel); `consult-workups:young-stroke-workup` (keyHistory[3], workup[9], decisionRules[0]); `consult-workups:myelopathy-workup` (differential[6], workup[5]); `consult-workups:acute-vision-loss` (differential[6], workup[7]); `consult-workups:cns-vasculitis-workup` (keyHistory[4], differential[3], workup[4], workup[5]). `acute-neuro:cns-infection-immunocompromised` and `consult-workups:rapidly-progressive-dementia` have no syphilis content. One thing to know, not a contradiction: viral-encephalitis lists CSF VDRL alone in its LP panel, and the new entry says CSF-VDRL is insensitive (a negative doesn't exclude neurosyphilis). No entry was changed. Rendering check (C2): the `UNITS` structured doses (3000000–4000000; 18000000–24000000; 2400000) are not displayed anywhere; no component reads the structured `dose[]` amounts, so only `doseText` shows ("18–24 million units/day as 3–4 million units IV q4h…", "2.4 million units IM…"). Five treatment rows render with First line, Alternative ×2, Adjunct and Supportive badges and five "Not graded" badges; ceftriaxone shows "Stocked", the other four "Institution varies". `definitions[10]` and `keyNumbers[1]` wrap cleanly at 375 px with no horizontal page scroll. Search finds the entry first for "neurosyphilis", "ocular syphilis", "VDRL", "FTA-ABS", "desensitization" and "otosyphilis". All five related links point at existing entries. Nothing was changed to affect rendering.

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | 2.4.1 | 2.5.0 | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- C1: syphilis content in other entries (back-links and any duplicates).
- A4: Bicillin L-A shortage details (secondary sources; listed only as institution-varies).
- A6: CSF specimen handling for syphilis serology (LAB24 p.13).
- A8: back-links to this entry from related entries.
- A9: delayed-dose rules for weekly benzathine (CDC21 p.44).

### ACCEPT (not raised again)
- A1: stage features beyond timing, partner management, PrEP details, direct-detection and point-of-care tests not encoded.
- A2: stage-based titer schedules not encoded (no neurosyphilis-specific schedule in the sources).
- A3: skin-test reagents and the desensitization protocol not encoded.
- A5: CDC 2021 erratum does not affect encoded lines.
- A7: CSF RPR not encoded.
- A10: adults only.
- A11: formulary statuses as approved (ceftriaxone AVAILABLE; others INSTITUTION_VARIES).
- C2 (pending Claude Code's report): UNITS integers as encoded.

### Open items
- `verify[]`: none.
- Jason: review, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R13/README.md`.

Encoded 2026-11-11 on `content-r13-2026-11-10` (base `a620fcb`). The draft gave no numbers ("as found → next MINOR"); the registry was at 2.4.1 after R10, so the approved MINOR level was applied to that (docs/VERSIONING.md, "Encoding approved drafts").

Update 2026-11-11: signed by Jason (`neurosyphilis`, `lastReviewed` 2026-11-11) and released: acute-neuro 2.5.1, content 2.2.1+d25d664b. The sign-off/release open item above is closed; PARK items C1, A4, A6, A8 and A9 stay open.

## 2026-11-10 — Review item R14 (ARIA on anti-amyloid therapy entry)

Approved by Jason in chat 2026-11-10 ("Otherwise approved"), after the proposal with decisions D1–D12 as recommended. Draft: `planning/drafts/review-2026-11-08/R14/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had no ARIA or anti-amyloid therapy content. Sources: Leqembi PI (rev 7/2026), Kisunla PI (rev 7/2025), Lecanemab AUR (Cummings, JPAD 2023), Donanemab AUR (Rabinovici, JPAD 2025), ASNR imaging recommendations (Cogswell, AJNR 2025). Both labels match the current DailyMed/FDA versions by search snippet only (web check 2026-11-10). The uploaded AHA 2026 Table 8 extract stops before the amyloid immunotherapy/ARIA row; nothing is encoded from it.

| Draft | Findings | Change |
|---|---|---|
| `consult-workups.aria-anti-amyloid.json` | A1–A14, K1–K5 | New entry `aria-anti-amyloid` (COGNITION_ENCEPHALOPATHY): recognition and mimics (stroke, ICH >1 cm, CAA-ri, PRES, seizure); MRI FLAIR, GRE, DWI and grading (ARIA-E by size, ARIA-H by count); surveillance schedules per label (lecanemab: 1, 2, 3, 6 months; donanemab: before infusions 2, 3, 4, 7); label hold rules (ARIA-E and ARIA-H tables, ICH >1 cm, recurrent ARIA-E); AUR rules shown separately (suspend with symptoms, discontinue for severe, drug-specific stopping lists, resume criteria); steroids (AUR only: methylprednisolone 1 g IV daily for 5 days, then oral taper over several weeks); antithrombotics (label caution; AUR stop the antibody if an anticoagulant is needed); thrombolysis as a link plus one label rule and one AUR rule; ApoE ε4 rates per drug; 18 decision rules; 11 pearls; 5 keyNumbers; 5 verify; 8 relatedIds; 5 sources |

Rules adopted:
- Label statements are `NOT_GRADED`. AUR and ASNR statements are `EXPERT_OPINION`, with the document named in `evidenceNote`. Neither AUR is a formal Delphi, so nothing is `CONSENSUS`.
- Where a label and an AUR differ (mild symptoms with mild ARIA-E; severe radiographic ARIA; anticoagulant needed; follow-up MRI interval), both are shown as separate rules and neither is picked.
- Label MRI schedules only; the older lecanemab AUR schedule is not used.
- Seizures: source-stated content only; no antiseizure medication or dose.
- AHA 2026 Table 8 is not restated; IVT is a link to `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics`.

Overlap check (C1): no duplicate; one existing line to weigh against rule 1. A search of all `data/*.json` for "ARIA", "amyloid", "lecanemab", "donanemab", "Leqembi" and "Kisunla" found hits in 3 entries outside the new one. (1) `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics` contraindications[3]: "Amyloid immunotherapy or ARIA", listed under contraindications[4] "(All AHA 2026 Table 8, absolute tier)". The new entry's rule 1 (label: "Consider whether the symptoms could be due to ARIA-E before giving a thrombolytic") is softer than that absolute contraindication; it links to the thrombolysis entry and says Table 8 is not restated, so the two don't conflict, but rule 1 read alone understates the signed line. This signed line also bears on verify item 1 (the Table 8 amyloid row). (2) `consult-workups:caa-related-inflammation`: searchTerms[2], [4], [5] ("ARIA-like"), keyHistory[2] "Anti-amyloid antibody therapy — ARIA has a similar clinicoradiologic picture (Auriel)", and three source titles; its steroid regimen (IV methylprednisolone 1 g daily for 3–5 days, then oral prednisone 60 mg daily tapered over months) is for CAA-ri, a different condition from the AUR ARIA regimen (5 days, taper over several weeks), so not a contradiction. (3) `consult-workups:ich-etiology-workup`: searchTerms[4] and differential[1], cerebral amyloid angiopathy only. `consult-workups:rapidly-progressive-dementia` has no hit. No entry was changed. Rendering check (C2): in the dev app at 375 px, the 18 decision rules appear in order with 10 "Not graded" and 8 "Expert opinion" badges, matching the data. The long lines (`decisionRules[12]`, `[13]`, `[14]`, `[17]`, `workup[1].notes[3]`) wrap with no horizontal page scroll. The five keyNumbers display and are exact copies of their source fields. All five `verify[]` items display. Search finds the entry first for "ARIA", "lecanemab", "donanemab", "Leqembi", "Kisunla", "amyloid related imaging abnormalities" and "superficial siderosis". All eight related links point at existing entries. One oddity, content not changed: rule 1 shows the raw id "see vascular-antithrombotics:thrombolysis-with-prior-antithrombotics" as plain text, not a link.

### Version
| what | from | to | level |
|---|---|---|---|
| consult-workups | 3.0.1 | 3.1.0 | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- C1: ARIA or anti-amyloid mentions in other entries.
- B8: overall ARIA incidence by arm and serious or fatal ARIA counts.
- B9: AUR Table 9 resource list for serious ARIA (one line in institutionVaries only).

### ACCEPT (not raised again)
- B1: category COGNITION_ENCEPHALOPATHY.
- B2: hold/stop and steroid rules held as DecisionRules in consult-workups despite the schema header comment; no schema change.
- B3: label follow-up MRI at 2 to 4 months and AUR monthly MRI both shown.
- B4: older lecanemab AUR and ASNR MRI schedule not used.
- B5: ANA white paper rule as quoted in ASNR not encoded (secondary).
- B6: radiology workflow items (GRE TE values, vendor protocols, templates, orders, communication) not encoded.
- B7: eligibility and exclusion rules, infusion reactions, amyloid confirmation and PET stopping rules not encoded.
- B10: steroid reference (Regenhardt 2020) not read; regimen from the two AURs only.
- B11: local ICU, MRI and prescriber details left as institution-varies.
- B12: aducanumab not covered.
- B13: common knowledge left out (ARIA pathophysiology, antibody mechanism, general status epilepticus care, general stroke workup).
- C2 (pending Claude Code's report): rendering of long rule lines.

### Open items
- `verify[]` (5): AHA 2026 Table 8 amyloid row not seen; lecanemab AUR siderosis threshold (text vs Fig 2); lecanemab AUR Fig 2 vs text on asymptomatic severe ARIA; lecanemab AUR cited by manuscript pages; label currency checked by snippet only.
- Jason: clear the verify[] items, review, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R14/README.md`.

Encoded 2026-11-11 on `content-r14-2026-11-10` (base `00e95a2`). The draft gave no numbers ("as found → next MINOR"); the registry was at 3.0.1, so the approved MINOR level was applied to that (docs/VERSIONING.md, "Encoding approved drafts").

Update 2026-11-11 (Jason, in chat; entry still `lastReviewed: "UNREVIEWED"`, consult-workups stays 3.1.0). All five verify items closed:
- V1 (AHA 2026 Table 8 amyloid row not seen). Reason: the entry restates nothing from Table 8 and links to `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics`; this log already records that the complete Table 8 was checked against that entry and matched, and it lists "Amyloid immunotherapy or ARIA" in the absolute tier.
- V2 (lecanemab AUR siderosis threshold, text 1 area vs Fig 2 more than 1). Reason: internal inconsistency in the AUR; the rule itself says "(AUR text says 1 area)", so both readings are visible. The entry keeps "more than 1".
- V3 (lecanemab AUR, asymptomatic severe ARIA, Fig 2 vs text and Table 8). Reason: the entry follows the text and Table 8, which agree and are the stricter reading; the evidence note names the Fig 2 difference.
- V4 (lecanemab AUR cited by author-manuscript pages). Reason: the source line says "Author manuscript pages"; page numbers are a finding aid, not content.
- V5 (label currency). Reason: Leqembi — DailyMed shows revised 7/2026, matching the draft (web check 2026-11-11). Kisunla — Lilly's current label page prints "Revised: 7/2025" in the Highlights, matching the draft, and "Revised: 8/2025" at the end (version 7, effective 2025-08-12), with Recent Major Changes all dated 07/2025; the ARIA sections were not compared line by line against the 7/2025 PDF. Closed with that noted.
- With `verify[]` empty, the "see verify" pointers were dropped from three lines (rule 1 evidence note; rule 12 evidence note; rule 13 recommendation, which keeps "(AUR text says 1 area)"). No other wording changed. The data entry therefore differs from the draft JSON in `verify` and those three lines.
- Left as drafted: rule 1 uses the label wording ("consider whether the symptoms could be due to ARIA-E before giving a thrombolytic"), softer than the thrombolysis entry's absolute contraindication; it links there.
- Open: sign-off and release, when Jason asks.

Update 2026-11-11 (2): signed by Jason (`aria-anti-amyloid`, `lastReviewed` 2026-11-11) and released: consult-workups 3.1.1, content 2.2.1+a806b227. The sign-off/release open item above is closed; PARK items C1, B8 and B9 stay open.

## 2026-11-11 — Review item R15 (Lyme neuroborreliosis entry)

Approved by Jason in chat 2026-11-11 ("Approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R15/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had no Lyme neuroborreliosis content. Source: IDSA/AAN/ACR 2020 Lyme disease guidelines (Lantos PM, et al. Clin Infect Dis 2021;72(1):e1–e48). No successor guideline found (web check 2026-11-11).

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.lyme-neuroborreliosis.json` | N1–N10, K1–K5 | New entry `lyme-neuroborreliosis` (CNS_INFECTION): who to test (acute meningitis, painful radiculoneuritis, mononeuropathy multiplex, acute cranial neuropathy, cord or brain inflammation, with plausible exposure) and who not to (typical ALS, RRMS, PD, dementia, new-onset seizures, psychiatric illness, nonspecific white matter lesions); testing (serum 2-tier antibody; paired CSF + serum antibody index; no PCR or culture; no CXCL13); reading results (index sensitivity >85% US / 56–79% Europe, stays elevated for years, normal doesn't exclude; CSF PCR 5–17%; early seronegativity → repeat in several weeks); regimens × 14–21 d (ceftriaxone 2000 mg IV daily; doxycycline 100 mg PO BID or 200 mg daily; cefotaxime 2000 mg IV TID; penicillin G 18–24 MU/day divided q4h); parenchymal disease IV, typically 2–4 weeks; facial palsy steroids (within 72 h if Lyme not established, age ≥16; no recommendation once Lyme is established); no additional antibiotics for nonspecific persistent symptoms; 8 pitfalls; 5 keyNumbers; 6 relatedIds; 1 source |

Rules adopted:
- GRADE "strong recommendation" → `STRONG` and "weak" → `WEAK`, with the guideline's exact wording and quality of evidence in `evidenceNote`.
- Agents graded together in one recommendation (XIII.1) all carry that grade; `role` follows the guideline's own Preferred/Alternative labels (Table 3).
- A "no recommendation, knowledge gap" statement is not encoded as a treatment row; it is shown in immediateActions and pitfalls.

Overlap check (C1): no duplicate and no contradiction. A search of all `data/*.json` for "Lyme", "Borrelia" and "neuroborreliosis" found two lines in one entry, `acute-neuro:guillain-barre-syndrome`: workup[6] "HIV, Lyme, CMV, West Nile serology/PCR" and pitfalls[1] "CSF cells >50/μL → think infection (HIV, Lyme, CMV, West Nile), malignancy, sarcoid". Both are test-ordering or differential mentions with no regimen, dose, duration or testing rule. One thing to know, not a contradiction: the GBS line reads "serology/PCR" across four infections, and the new entry says not to use PCR for Lyme. `bacterial-meningitis`, `viral-encephalitis`, `inpatient-neuropathy`, `myelopathy-workup`, `new-demyelinating-lesion` and `acute-vision-loss` have no hit (three other matches were the letters "lyme" inside "DailyMed" in source lines). No entry was changed. Rendering check (C2): in the dev app at 375 px, the four treatment rows render with First line ×2 and Alternative ×2 badges and four "Strong" evidence badges (the two Alternative rows show Strong, as encoded); ceftriaxone shows "Stocked", the other three "Institution varies". The `UNITS` structured dose (18000000–24000000) is not displayed anywhere: no component reads the structured `dose[]` amounts, so only `doseText` shows ("18–24 million units/day IV divided every 4 hours × 14–21 days"). `keyNumbers[4]` and `definitions[5]` wrap cleanly with no horizontal page scroll. Search finds the entry first for "Lyme", "neuroborreliosis", "facial palsy", "antibody index", "Borrelia" and "Bannwarth". All six related links point at existing entries. No relatedId to `neurosyphilis` was added (A3), although that entry now exists. Nothing was changed to affect rendering.

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | 2.5.1 | 2.6.0 | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- C1: Lyme content in other entries (back-links and any duplicates).
- A3: relatedId to `acute-neuro:neurosyphilis` once R13 has merged.
- A5: current US availability of cefotaxime.
- A6: XXV.1 (no additional antibiotics) as a `NOT_RECOMMENDED` treatment row instead of a pitfall.
- A7: tests to avoid (urine antigen, lymphocyte transformation, CD57).
- A8: coinfection (Anaplasma, Babesia).
- A12: back-links to this entry from related entries.

### ACCEPT (not raised again)
- A1: erythema migrans, tick-bite prophylaxis, prevention, arthritis, PNS/CNS anatomy not encoded.
- A2: ICP-lowering doses and the facial palsy steroid dose are not in the source; not encoded.
- A4: formulary statuses as approved (ceftriaxone AVAILABLE; others INSTITUTION_VARIES).
- A9: carditis limited to one escalate line.
- A10: adults only.
- A11: antibody-index sensitivity figures shown with their origin (US vs Europe).
- A13: 2020 guideline is current.
- C2 (pending Claude Code's report): STRONG on ALTERNATIVE rows and UNITS integers as encoded.

### Open items
- `verify[]`: none.
- Jason: review, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R15/README.md`.

Encoded 2026-11-11 on `content-r15-2026-11-11` (base `07662c6`). The draft gave no numbers ("as found → next MINOR"); the registry was at 2.5.1 after R13, so the approved MINOR level was applied to that (docs/VERSIONING.md, "Encoding approved drafts").

Update 2026-11-11: signed by Jason (`lyme-neuroborreliosis`, `lastReviewed` 2026-11-11) and released: acute-neuro 2.6.1, content 2.2.1+1ebce094. The sign-off/release open item above is closed; PARK items C1, A3, A5, A6, A7, A8 and A12 stay open.

## 2026-11-11 — Review item R16 (Boston criteria v2.0 card)

Approved by Jason in chat 2026-11-11 ("Approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R16/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had no Boston criteria content; `ich-etiology-workup` only names CAA in its differential. Source: Charidimou 2022 (Lancet Neurol), published article; cited by Panel, table and journal page. No newer version of the criteria was found (web search 2026-11-11).

| Draft | Findings | Change |
|---|---|---|
| `reference-cards.boston-criteria-caa.json` | N1–N5, K1–K5, V1–V3 | New card `boston-criteria-caa`, 3 row-list sections: Criteria (applies to age ≥50 with spontaneous ICH, TFNE or cognitive impairment/dementia; probable = ≥2 strictly lobar hemorrhagic lesions or 1 + 1 white matter feature; possible = 1 lobar hemorrhagic lesion or 1 white matter feature; exclusions; pathology-based categories), Lesion definitions (severe CSO-PVS >20; WMH multispot >10; multifocal cSS; acute cSAH near cSS), Accuracy vs autopsy for probable CAA (all 74.5% / 95.0%; ICH 90.2% / 92.9%; non-ICH 55.1% / 96.2%); 5 pitfalls; 5 keyNumbers; no verify items; 3 relatedIds; 1 source |

Rules adopted:
- Diagnostic criteria and lesion definitions on a reference card use role TARGET; diagnostic accuracy figures use EVIDENCE_SUMMARY; both NOT_GRADED, with the source location in `evidenceNote`.
- Cite the published version of a paper, not the author manuscript: labels and pages differ (here Table 2 → Panel, Table 5 → Table 4), and the manuscript had a cut-off footnote and two wording differences.

Rendering check (C1): in the dev app at 375 px, the card shows 3 sections in the order Criteria, Lesion definitions, Accuracy vs autopsy. The 9 criteria and definition rows carry a filled blue "Target" badge; on a diagnostic criterion ("Target — Probable CAA", "Target — Exclusions") the word reads a little oddly, since it suggests a treatment goal. The 3 accuracy rows carry an outlined grey "Evidence summary" badge and their figures are set in italics, so they are clearly distinct from the Target rows. All 12 rows show "Not graded". The long Probable CAA target and `keyNumbers[0]` wrap cleanly with no horizontal page scroll; "≥", ">" and "T2*" display correctly. Search finds the card first for "Boston", "cSS", "perivascular" and "TFNE", second for "siderosis" (after aria-anti-amyloid) and third for "CAA" (after caa-related-inflammation and ich-etiology-workup). All three related links point at existing entries. Nothing was changed to affect rendering. Overlap with existing entries (C2): no Boston criteria content elsewhere; nothing duplicates or contradicts the card. A search of `data/` for "Boston", "probable CAA", "possible CAA", "siderosis" and "perivascular" found: `consult-workups:caa-related-inflammation` keyNumbers[0] and decisionRules[0]–[1] "Probable CAA-ri — sensitivity 82%, specificity 97%" / "Possible CAA-ri — sensitivity 82%, specificity 68%" (the Auriel criteria for CAA-ri, a different diagnosis from the card's probable/possible CAA) and differential[0].clues[0] (cortical superficial siderosis as an imaging clue); `consult-workups:ich-etiology-workup` differential[1].clues[0] "Lobar, older age, lobar microbleeds, cortical superficial siderosis"; `vascular-antithrombotics:restart-antithrombotic-after-ich` pearls[0]–[1] (recurrence hazard ratios and ESO-EANS wording that mention siderosis); `consult-workups:aria-anti-amyloid` (ARIA-H siderosis grading and stop rules, eight lines); `neural-antibodies:gfap` (perivascular enhancement). None states a Boston criterion, cut-off or accuracy figure. One thing to know: "probable" and "possible" now label two different criteria sets (CAA here, CAA-ri there) with different accuracy figures. No entry was changed, and no relatedId to `aria-anti-amyloid` was added (B11), although that entry now exists.

### Version
| what | from | to | level |
|---|---|---|---|
| reference-cards | 1.4.1 | 1.5.0 | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- B3: probable+possible accuracy and whole-sample or cohort figures.
- B5: Kropp 2026 memory-clinic validation (not read).
- B6: Edinburgh CT criteria (needs Rodrigues 2018).
- B9: amyloid PET and CSF amyloid-β not yet validated.
- B11: link to `consult-workups:aria-anti-amyloid` once R14 has merged.
- B12: back-links to the card from ich-etiology-workup, caa-related-inflammation and restart-antithrombotic-after-ich.
- C2: possible overlap with caa-related-inflammation.

### ACCEPT (not raised again)
- B1: criteria counts encoded as numerals (the published Panel prints "One").
- B2: no "criterion" role; TARGET used, no schema change.
- B4: v1.5 comparison and what changed from v1.5 not encoded.
- B7: lobar lacunes and superficial cerebellar microbleeds not encoded.
- B8: odds ratios, kappas, study design and pathophysiology not encoded.
- B10: supplementary material not reviewed.
- C1 (pending Claude Code's read-only check): role mapping as approved.

### Open items
- `verify[]`: none. Two first-draft items (manuscript citations; cut-off footnote) were closed against the published article before encoding.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R16/README.md`.

Encoded 2026-11-11 on `content-r16-2026-11-11` (base `86fbb76`). The draft gave no numbers ("as found → next MINOR"); the registry was at 1.4.1 after R12, so the approved MINOR level was applied to that (docs/VERSIONING.md, "Encoding approved drafts").

Update 2026-11-11: signed by Jason (`boston-criteria-caa`, `lastReviewed` 2026-11-11) and released: reference-cards 1.5.1, content 2.2.1+33071d2e. The sign-off/release open item above is closed; PARK items B3, B5, B6, B9, B11, B12 and C2 stay open.

## 2026-11-11 — Review item R17 (monogenic small vessel disease entry)

Approved by Jason in chat 2026-11-11 ("Agree with all recommendations", then "Drop HTRA1 5%. Okay for questions 2-4. One rule as drafted for question 5. Question 6 confirmed. Keep Rule 7 and keyNumbers for question 7"). Draft: `planning/drafts/review-2026-11-08/R17/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`. R17 was added by Jason on 2026-11-11 and is not in RESEARCH_BRIEF_2026-11-08.md.

Finding: the app had one differential line and one workup line on genetic stroke causes (`consult-workups:young-stroke-workup`) and no entry for monogenic small vessel disease. Sources, all read in full: Manini and Pantoni (Neurology 2023), Mancuso et al. EAN consensus (Eur J Neurol 2020), Meschia et al. AHA scientific statement (Stroke 2023), Verdura (Ann Neurol 2016), Plaisier (NEJM 2007), Nozaki (Neurology 2015), Moore (AJNR 2003), Konno (Neurology 2018), GeneReviews CBS deficiency (updated 2025-09-25), Testai and Gorelick (Arch Neurol 2010). Web check 2026-11-11 (three searches): no guideline superseding EAN 2020 or AHA 2023 was found; a limited check.

| Draft | Findings | Change |
|---|---|---|
| `consult-workups.monogenic-csvd-workup.json` | A1–A9, K1–K4 | New entry `monogenic-csvd-workup` (VASCULAR): 15 differential lines in three tiers (core arteriopathies: CADASIL, CARASIL, HTRA1 heterozygous, COL4A1/2, PADMAL, HANAC, RVCL-S, Fabry, CARASAL, hereditary CAA; mimics: MELAS, CSF1R; loose fits: DADA2, pseudoxanthoma elasticum, homocystinuria); 12 workup items (MRI pattern, panel, NOTCH3, Fabry enzyme or GLA, homocysteine, m.3243A>G then POLG, eye exam, urine and CK, thin-section CT, MRA/CTA, COL4A1 3′UTR, counseling); 13 decision rules (6 on when to test, 1 on catheter angiography in CADASIL, 6 antithrombotic and thrombolysis cautions); 4 keyNumbers; 5 pearls; 4 verify; 3 relatedIds; 10 sources |

Rules adopted:
- Option A: one `consult-workups` entry; each disease is a `differential[]` line; no schema change. Option C (a per-disease registry) stays open.
- Tier shows by order plus a tag at the start of the first clue ("Mimic:" or "Loose fit:"); `dx` holds the disease name, gene and inheritance only.
- EAN 2020 Delphi statements are `CONSENSUS` with the paper's grade copied as mean score and % voting 4 or 5. AHA 2023 scientific statement items are `NOT_GRADED`.
- Management is limited to antithrombotic and thrombolysis cautions stated by EAN or AHA, held as DecisionRules. Disease-specific treatment is not encoded.
- Where EAN and AHA differ (thrombolysis in CADASIL), one rule shows both and neither is picked.
- `mustNotMiss`: Fabry, COL4A1/2 and homocystinuria. DADA2 is not flagged (the sources read do not cover its treatment).
- Outbound relatedIds only; no existing entry is edited.

Overlap check (C1): searched all `data/*.json` for CADASIL, NOTCH3, Fabry, GLA (whole word), MELAS, COL4A1, HTRA1, homocyst and hereditary CAA. Outside the new entry: `consult-workups:young-stroke-workup` `differential[8].dx` (line 105, "Genetic: CADASIL, Fabry, MELAS, sickle cell disease") and `workup[13].test` (line 217, "Genetic testing (NOTCH3, GLA, mtDNA)"); `consult-workups:cns-vasculitis-workup` `differential[7].dx` (line 2952, CADASIL as a mimic); `reference-cards:boston-criteria-caa` `pitfalls[1]` (line 2818, not validated in hereditary CAA); acquired-homocysteine lines in `consult-workups:inpatient-neuropathy`, `consult-workups:myelopathy-workup` (B12/MMA/nitrous oxide) and `reference-cards:thrombophilia-test-validity` (timing and pre-analytic notes). None contradicts the new entry; they are briefer or about acquired causes. `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics` names none of these diseases and does not conflict with rules 9, 10, 12 or 13. No hits for COL4A1, HTRA1 or hereditary CAA beyond the Boston pitfall. Nothing changed. Rendering check (C2): 15 differential lines in stored order with the Must not miss marker on COL4A1/COL4A2, Fabry disease and homocystinuria only; 13 rules in order, rules 3 and 7 badged Not graded and the rest Consensus; `decisionRules[5].condition`, `[6].recommendation`, `[9].recommendation` and `[10].evidenceNote[1]` wrap at 375 px with no horizontal page scroll; the four keyNumbers display and equal their source fields; the four verify items display; search finds the entry for all nine terms; the three relatedIds resolve.

### Version
| what | from | to | level |
|---|---|---|---|
| consult-workups | 3.1.1 | 3.2.0 | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- B1: inbound relatedIds from `young-stroke-workup`, `ich-etiology-workup` and `boston-criteria-caa` (add when those entries are next edited).
- B2: disease-specific treatment (Fabry enzyme replacement, MELAS seizure drugs and the valproate contraindication, CBS treatment doses, CADASIL migraine and perioperative targets, pregnancy).
- B3: option C, a per-disease registry.
- B4: GSN (named in AHA Table 1 with no features), FOXC1/PITX2 Axenfeld-Rieger, cerebral cavernous malformations: no source.
- C1: genetic small vessel disease mentions in other entries.

### ACCEPT (not raised again)
- B5: HTRA1 "5% of hereditary CSVD" (AHA Table 1) dropped.
- B6: Axenfeld-Rieger folded into the COL4A1/2 line.
- B7: CARASAL placed in the core group.
- B8: no migraine percentage in the CADASIL line; both figures in pearls.
- B9: antithrombotic and thrombolysis rules held in consult-workups despite the schema header comment; no schema change.
- B10: workbook imaging columns not kept.
- B11: local panel, laboratory and referral details left as institution-varies.
- B12: common knowledge left out (general small vessel imaging definitions, vascular risk factor control, inheritance arithmetic, molecular mechanisms).
- C2 (pending Claude Code's report): rendering of 15 differential lines and the long rule 6.

### Open items
- `verify[]` (4): COL4A1 3′UTR coverage on the local panel; no small vessel MRI pattern for CBS deficiency in the sources; pulvinar sign frequency in later cohorts (Burlina 2008 not read); DADA2 testing and treatment not covered by the sources.
- Jason: clear the verify[] items, review, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R17/README.md`.

Encoded 2026-11-12 on `content-r17-2026-11-11` (base `1726f00`); consult-workups was at 3.1.1 as the draft expected. Registry `lastUpdated` 2026-11-12.

Update 2026-11-12 (Jason, in chat; entry still `lastReviewed: "UNREVIEWED"`, consult-workups stays 3.2.0). Two of four verify items closed:
- V1 (local panel coverage of the COL4A1 3′UTR miR-29 binding site): closed. Local fact; covered by `institutionVaries[0]`.
- V2 (homocystinuria: no small vessel MRI pattern in the CBS sources): closed. Limitation already stated in `differential[14].clues[0]`; kept for treatability.
- No entry text pointed at these items, so no other wording changed. The data entry therefore differs from the draft JSON in `verify` only. V3 (pulvinar sign in later cohorts) and V4 (DADA2 testing and treatment) stay open; Jason supplied Burlina 2008 (J Neurol 2008;255:738-744) and Lee 2023 DADA2 consensus (JAMA Netw Open 2023;6(5):e2315894) for review.

Update 2026-11-12 (2) (Jason, in chat; entry still `lastReviewed: "UNREVIEWED"`, consult-workups stays 3.2.0):
- V3 (pulvinar sign frequency in later cohorts): closed. Burlina 2008 (J Neurol 2008;255:738-744, Table 2, p.741): pooled 35 of 140 males (25%), consistent with the Moore count; 0 of 43 females. No entry text changed; Burlina is not added as a source.
- V4 (DADA2 testing and treatment): stays open. Jason asked for a draft from Lee 2023 (JAMA Netw Open 2023;6(5):e2315894): `planning/drafts/review-2026-11-08/R17/V4/`, pending his approval.

Update 2026-11-12 (3) (Jason, in chat: "Core + A, close V4"; entry still `lastReviewed: "UNREVIEWED"`, consult-workups stays 3.2.0):
- V4 (DADA2 testing and treatment): closed. Covered by Lee 2023 DADA2 consensus (JAMA Netw Open 2023;6(5):e2315894); encoded as rule 14 and workup[12]. `verify[]` is now empty.
- Encoded from `planning/drafts/review-2026-11-08/R17/V4/V4.changes.json`, core plus option A: rule 14 (DADA2: avoid antithrombotic therapy, `CONSENSUS`, statement 5.5); workup[12] (ADA2 enzyme activity and sequencing, 2 indications, 4 notes); Lee 2023 appended to `sources`; `differential[12].mustNotMiss` true with a 4th clue on TNF-inhibitor treatability. This reverses D6 (DADA2 not flagged). Option B (acute-stroke glucocorticoid/TNF inhibitor rule, statement 5.4) not encoded; stays parked under B2.
- The data entry therefore differs from the R17 draft JSON in `verify` (empty), `decisionRules[13]`, `workup[12]`, `differential[12]` and `sources[10]`.
