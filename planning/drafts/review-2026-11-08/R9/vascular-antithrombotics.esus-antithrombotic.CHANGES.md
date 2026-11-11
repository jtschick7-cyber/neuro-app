# vascular-antithrombotics:esus-antithrombotic — CHANGES

Review 2026-11-08, item R9 (drafted 2026-11-10). Base: signed `current.vascular-antithrombotics.esus-antithrombotic.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `searchTerms[7]`–`[8]` | (absent) | "ARCADIA", "atrial cardiopathy" | — | F2: findable by trial name and concept (PATCH-level) |
| `pearls[2]` | (absent) | ARCADIA (cryptogenic stroke, age ≥45, no AF, atrial cardiopathy = PTFV1 >5000 μV·ms, NT-proBNP >250 pg/mL or LA diameter index ≥3 cm/m²; apixaban vs aspirin 81 mg, n=1015): recurrent stroke 4.4%/yr in both arms (HR 1.00); stopped for futility; no greater benefit at higher biomarker levels | Kamel 2024 (sources[2]): Abstract p 573 (atrial cardiopathy criteria; no AF at randomization; apixaban 5 or 2.5 mg BID vs aspirin 81 mg; n=1015; stopped for futility after planned interim analysis); Methods, Patient Population p 574 (age ≥45 y; ESUS consensus criteria for cryptogenic stroke); Table 2 p 577 (recurrent stroke 40/507 vs 40/508, annualized 4.4% vs 4.4%, HR 1.00 [0.64–1.55]); Results p 578 and Figure 3 p 579 (no heterogeneity across prespecified subgroups; apixaban not of greater benefit at higher biomarker levels; no interaction with biomarkers as continuous variables) | F1, D1 (a): trial result → pearl, ungraded (D2: AHA 2026 does not cite ARCADIA); D3 (a): criteria + primary result only |
| `relatedIds[2]` | (absent) | vascular-antithrombotics:cancer-associated-stroke | `valid-ids.txt` | D4: that entry already mentions ARCADIA |
| `sources[2]` | (absent) | Kamel H, et al. Apixaban to Prevent Recurrence After Cryptogenic Stroke in Patients With Atrial Cardiopathy: The ARCADIA Randomized Clinical Trial. JAMA 2024;331(7):573-581. doi:10.1001/jama.2023.27188 | p 573 (title, citation, doi) | F1 |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- `rules[0]` (antiplatelet over OAC, `evidenceLevel` STRONG, note "Kleindorfer 2021 and AHA 2026: COR 1, LOE A"): AHA 2026 §4.8 Rec 5, p e378 — "In patients with noncardioembolic AIS or TIA, antiplatelet therapy is indicated in preference to oral anticoagulation…", COR 1, LOE A (refs 8, 9). Unchanged (D1 a: no trial added to the rule text).
- AHA 2026 has no mention of ARCADIA: full-text search of the 121-page PDF for ARCADIA, cardiopathy, cryptogenic, ESUS, "undetermined source", NAVIGATE, RESPECT ESUS, apixaban. Only cryptogenic hit: §4.8 supportive text 5 (p e381), WARSS. No guideline grade exists, so the pearl is ungraded.
- `keyNumbers[0]`, `[1]`: unchanged; exact copies of `rules[4]` and `rules[5]` condition + ": " + recommendation.
- All other fields unchanged.

## Disposition
- F1, F2, D4: FIX.
- See README Disposition Ledger for ACCEPT/PARK items.

## Open verify[]
- None (`verify: []`).

## Registry version
- vascular-antithrombotics: MINOR, applied once at assembly (expected 0.14.0 → 0.15.0 after the R2 PR; see README).
