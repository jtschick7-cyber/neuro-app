# acute-neuro:elevated-icp-herniation — rebuilt changes (item 7.2, rebuilt 2026-11-07)

**Status:** approved by Jason 2026-11-07 for encoding. AIS outcome wording accepted as adapted. `escalateWhen[1]` aligned to ICP >22 (Jason's decision 2026-11-07; a threshold change beyond the 7.2 approvals). keyNumbers accepted as proposed.

Base: `current.elevated-icp-herniation.json` (signed 2026-11-05). Replaces the 2026-11-06 draft built on v0.7.1. Full replacement entry in the matching .json. Validated with zod against `schema/acute-neuro.ts` (schemaVersion 1.2.0), alone and inside a registry envelope. All `relatedIds` and `calculatorIds` are in `valid-ids.txt`.

## 1. CHANGES

| Field path | Current | New | Source | Why |
|---|---|---|---|---|
| `keyNumbers` | (absent) | 5 lines, see §3 | Copied from this entry's own fields | Task 4.2 / rule 6 (optional; cut any line) |
| `treatment[0].evidenceNote[0]` (HTS) | "NCS 2020: conditional, low-quality evidence" | "NCS 2020: HTS over mannitol in TBI — conditional, low-quality evidence; in ICH — conditional, very low-quality evidence" | Cook 2020, TBI rec 1; ICH hyperosmolar rec 1 | Approved B: grade stated per population. ICH is very low, not low |
| `treatment[0].evidenceNote[1]` (HTS) | (absent) | "NCS 2020: HTS or mannitol in AIS — conditional, low-quality evidence; insufficient evidence for either to improve neurological outcome" | Cook 2020, AIS rec 1 | Approved B, outcome clause adapted (see §2) |
| `treatment[0].evidenceNote[2]` (HTS) | "Central-line threshold: ENLS v5.0" (was [1]) | Unchanged | ENLS v5.0 (Morrison 2022), Hyperosmolar therapy: HTS boluses ≥7.5% via a central venous catheter; lower concentrations may go peripheral. Checked against the v5.0 PDF supplied 2026-11-07 | Kept; now confirmed |
| `treatment[1].evidenceNote[0]` (mannitol) | "NCS 2020: alternative when HTS can't be given (TBI); either agent in AIS" | "NCS 2020: alternative when HTS can't be given (TBI) — conditional, low-quality evidence; either agent in AIS — conditional, low-quality evidence" | Cook 2020, TBI rec 2; AIS rec 1 | Approved B: grades added |
| `treatment[1].evidenceNote[1]` (mannitol) | (absent) | "NCS 2020: osmolar gap over osmolality for AKI monitoring — conditional, very low-quality evidence" | Cook 2020, Recommendations for Assessing the Risk of Renal Injury After Mannitol Administration, rec 1 | Approved B |
| `treatment[1].evidenceNote[2]` (mannitol) | "ENLS v6.0 dosing" (was [1]) | Unchanged | — | Position only |
| `escalateWhen[1]` | "ICP >20 mmHg sustained despite tier-one measures" | "ICP >22 mmHg sustained despite tier-one measures (ENLS v6.0; BTF 4th ed. ch. 16)" | ENLS v6.0 (Bhalla 2024), definition (sustained >5 min ICP >22 mmHg in adults) and algorithm; BTF 4th ed. 2016 ch. 16 Recommendations, Level II B (treat ICP above 22 mm Hg; TBI) | Matches `definitions[0]`. Jason's decision 2026-11-07 |
| `sources[3]` | (absent) | "Brain Trauma Foundation. Guidelines for the Management of Severe Traumatic Brain Injury, 4th Edition. 2016; ch. 16 Intracranial Pressure Thresholds" | Attached chapter (pp. 171–) | Cited by `escalateWhen[1]`. Format follows the ch. 17 citation (DECISION_LOG 7.2 #5) |
| `relatedIds[1]` | (absent) | `reference-cards:neuro-icu-targets` | — | Approved B link; in valid-ids.txt |
| `lastReviewed` | "2026-11-05" | "UNREVIEWED" | — | Rule 5 |

One threshold changed: `escalateWhen[1]` ICP 20 → 22. No dose, evidence level, role or formulary status changed. Both osmotic agents were already WEAK, and mannitol stays FIRST_LINE (README Q3). `sources`: Cook 2020, ENLS v5.0 (kept, as it's the only source for the central-line threshold), ENLS v6.0, and BTF 4th ed. ch. 16 (new). `verify[]` was empty and stays empty.

## 2. How each approved change was handled (approved 2026-11-06)

**Part A: sodium**

| Approved change | Status | Detail |
|---|---|---|
| A1 HTS note "Target Na 145–155 (max ~160)" → "No serum sodium target is endorsed (Cook 2020): SAH…; ICH…; TBI/AIS…" | **Dropped, no longer applies** | The current entry gives no sodium target to correct. Strategy is already in `institutionVaries[1]` "Na target strategy (bolus vs targeted infusion)" |
| A2 + "Ceiling: Na 155–160 and Cl 110–115 may be reasonable to limit AKI; monitor Na, Cl and renal function (Cook 2020)" | **Already present** | `workup[4].notes[1]` "NCS 2020: upper limits Na 155–160 and Cl 110–115 mEq/L may be reasonable". AKI is in `treatment[0].notes[1]` and renal monitoring in `immediateActions[3]` |

**Part B: same-source corrections**

| Approved change | Status | Detail |
|---|---|---|
| HTS note: remove "or serum osm >320" from "Preferred over mannitol if hypotensive…" | **Dropped, no longer applies** | The current entry has no "preferred if hypotensive/hypovolemic" line. The 320 point is in `pitfalls[3]` |
| HTS evidenceLevel STRONG → WEAK | **Already present** | WEAK |
| HTS evidenceNote → Cook grades (TBI low; ICH very low; AIS low, outcome) | **Adapted** | Current [0]: "NCS 2020: conditional, low-quality evidence". New [0]: "NCS 2020: HTS over mannitol in TBI — conditional, low-quality evidence; in ICH — conditional, very low-quality evidence". New [1]: "NCS 2020: HTS or mannitol in AIS — conditional, low-quality evidence; insufficient evidence for either to improve neurological outcome". Uses the entry's "NCS 2020" label instead of "Cook 2020". The approved wording "neither improves neurological outcome" became "insufficient evidence…", because Cook's AIS rec 1 says there is insufficient evidence for either agent to improve outcome (the firmer "neither" statement is Cook's TBI wording) |
| Mannitol frequency → "May repeat q4–6h; follow osmolar gap (no validated cutoff) and MAP" | **Already present** | `dose[0].frequency[0]` "May repeat q4–6h" has no cutoff. Gap and no-cutoff are in `notes[1]`. MAP isn't mentioned (see §4) |
| Mannitol notes[1] → osmolar gap over osmolality; no validated cutoff; 20 / ≥55; 320 no AKI change | **Already present** | `notes[1]` "Redose by osmolar gap; ENLS v6.0 cites gap goals of 20–55 mOsm/kg…; NCS 2020 found no evidence for a specific cutoff", `workup[1].notes[0]`, `pitfalls[3]` |
| Mannitol evidenceLevel STRONG → WEAK | **Already present** | WEAK |
| Mannitol evidenceNote → Cook grades (TBI alternative low; osmolar gap very low) | **Adapted** | Current [0]: "NCS 2020: alternative when HTS can't be given (TBI); either agent in AIS". New [0]: "…(TBI) — conditional, low-quality evidence; either agent in AIS — conditional, low-quality evidence". New [1]: "NCS 2020: osmolar gap over osmolality for AKI monitoring — conditional, very low-quality evidence". "ENLS v6.0 dosing" kept as [2] |
| institutionVaries[1] → "Osmolar-gap cutoff used to hold mannitol…" | **Dropped, no longer applies** | The current entry has no mannitol-monitoring institutionVaries line. Its [1] is the Na target strategy |
| pitfalls[2] + "(Cook 2020: avoid hyponatremia — good practice)" | **Already present** | `pitfalls[2]` "…avoid hyponatremia in brain injury (NCS 2020)" |
| sources[0] Cook title + DOI | **Already present** | Title per PDF and doi:10.1007/s12028-020-00959-7 |
| relatedIds + `reference-cards:neuro-icu-targets` | **Carried forward as is** | |
| lastReviewed → "UNREVIEWED" | **Carried forward as is** | |
| (old CHANGES) four proposed keyNumbers lines | **Not reused** | None match any field in the rebuilt entry ("HTS 3% 250–500 mL", "no sodium goal endorsed", "not osm 320", "ICP >20–22" were all checked) |

**README questions:** Q3 mannitol stays FIRST_LINE (no change). Q4 the strong recommendation against steroids in ICH is already in `treatment[7].evidenceNote[0]`; the current entry has no dexamethasone item, only "Corticosteroids for edema from ICH, TBI, or stroke" (NOT_RECOMMENDED). ENLS v5.0 is kept as a source.

## 3. keyNumbers

| Line | Source field path |
|---|---|
| Hypertonic saline: 2%–23.4% as bolus, alone or with mannitol; 3% may run peripherally, ≥7.5% (incl. 23.4%) via central line | `treatment[0].agent` + ": " + `treatment[0].doseText` (first sentence, cut at ".") |
| Mannitol 20%: 0.5–1 g/kg IV bolus over 5–15 min via peripheral line; may repeat q4–6h (ENLS) | `treatment[1].agent` + ": " + `treatment[1].doseText` (whole) |
| NCS 2020: upper limits Na 155–160 and Cl 110–115 mEq/L may be reasonable | `workup[4].notes[1]` (whole) |
| Intracranial hypertension: sustained (>5 min) ICP >22 mmHg (ENLS v6.0) | `definitions[0]` (whole) |
| Maintain CPP 60–70 mmHg (ENLS v6.0) | `treatment[3].notes[0]` (whole) |

Checked by script: each line matches its field exactly.

## 4. Noticed, not changed
- ~~ICP threshold mismatch (definition >22 vs escalation >20)~~ **Resolved 2026-11-07:** `escalateWhen[1]` changed to >22 (§1). BTF ch. 16 is TBI-specific; ENLS v6.0 covers the general adult definition.
- `treatment[0].notes[0]` "…either acceptable in AIS and SAH": Cook's SAH recommendations compare symptom-based bolus with sodium-target HTS dosing. They don't compare HTS with mannitol, so the SAH part of that note has no matching Cook recommendation.
- ENLS v5.0 adds conditions to peripheral HTS that the entry doesn't have: use a large vessel and watch the site for infiltration, and give IO only at ≤7.5%, with caution.
- ENLS v5.0 says there is no added benefit with an osmolar gap >20. The entry cites v6.0 (20–55), which supersedes it, so no change is needed.
- Old-draft relatedIds `consult-workups:ich-etiology-workup` and `consult-workups:sah-workup` weren't approved 7.2 changes, so they weren't added.
- SOURCES.md has no entry for ENLS v5.0, ENLS v6.0 or BTF ch. 16. Add all three (v5.0: Hyperosmolar therapy section; v6.0: definition, tiers, hyperosmolar therapy, sedation; BTF ch. 16: Recommendations box, Level II B) when this is filed.

## 5. Open verify[] items
None (`verify: []`, same as the current entry).

## 6. Assembly
The `acute-neuro` registry needs a **MINOR** bump at assembly. Apply it once for GBS and ICP together, not once per entry. Take the next MINOR from what `data/` holds (README: 1.1.1 → 1.2.0) and update `lastUpdated`.
