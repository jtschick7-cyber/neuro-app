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
