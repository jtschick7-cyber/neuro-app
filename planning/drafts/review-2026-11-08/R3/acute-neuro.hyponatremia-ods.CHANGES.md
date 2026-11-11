# acute-neuro:hyponatremia-ods — CHANGES

Review 2026-11-08, item R3 (drafted 2026-11-09). Base: signed `current.acute-neuro.hyponatremia-ods.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `keyNumbers[2]` | Stricter limit (≤8 mmol/L in first 24 h) when ODS risk factors: hypokalemia, malnutrition, alcohol use disorder | Verbalis 2013 (US expert panel, ungraded), high ODS risk: limit ≤8 mmol/L in any 24 h; goal 4–6 mmol/L/day. High risk: Na ≤105, hypokalemia, alcohol use disorder, malnutrition, advanced liver disease | Exact copy of `definitions[1]` | F1, F2: was a truncated copy (dropped the liver-disease clause) and unsourced |
| `keyNumbers[3]` | Na at 6 h, 12 h, then daily (more often in high-risk) | Na at 6 h, 12 h, then daily (ESE 2D); if Na ≤120: q4–6h until ≥125 (Verbalis); watch urine output (aquaresis signals overcorrection risk) | Exact copy of `immediateActions[2].action` | F7, decision 3 (c): was a truncated copy with an unsourced phrase |
| `definitions[1]` | Stricter limit (≤8 mmol/L in first 24 h) when ODS risk factors: hypokalemia, malnutrition, alcohol use disorder (liver disease commonly added) | Verbalis 2013 (US expert panel, ungraded), high ODS risk: limit ≤8 mmol/L in any 24 h; goal 4–6 mmol/L/day. High risk: Na ≤105, hypokalemia, alcohol use disorder, malnutrition, advanced liver disease | Verbalis 2013 (sources[3]) S21, box "Avoiding ODS in Patients with Chronic Hyponatremia": Goal "Minimum correction of serum [Na+] by 4-8 mmol/L per day, with a lower goal of 4-6 mmol/L per day if the risk of ODS is high"; Limits "For high risk of ODS: 8 mmol/L in any 24-hour period". S20 Table 3: "Serum sodium concentration ≤105 mmol/L; Hypokalemia; Alcoholism; Malnutrition; Advanced liver disease". S6 Level of Evidence: grading "was not feasible" → "ungraded" | F1, decision 1 (goal added). ESE 2014 has no first-24-h high-risk limit (checked: 7.1.2.4 G28, 7.2.1.6 G32, 7.4.1.4 G33, 7.5.1.1 G38; rationale G30–G31, G36). "First 24 h" → "any 24 h" per source. "Alcoholism" rendered as "alcohol use disorder" to match the entry |
| `immediateActions[2].action` | Na at 6 h, 12 h, then daily (more often in high-risk); watch urine output (aquaresis signals overcorrection risk) | Na at 6 h, 12 h, then daily (ESE 2D); if Na ≤120: q4–6h until ≥125 (Verbalis); watch urine output (aquaresis signals overcorrection risk) | ESE 2014 7.1.2.5 (G28): "checking the serum sodium concentration after 6 and 12 h and daily afterwards… (2D)". Verbalis S21: for serum [Na+] ≤120, "Serum [Na+] measurements at 4- to 6-hour intervals and monitoring of urine volume are advisable until mildly hyponatremic levels of ≥125 mmol/L have been reached". Urine output: ESE G37 ("Sudden increases in urine output can act as a warning signal that overly rapid correction of hyponatraemia is imminent"); Verbalis S20 (aquaresis) | F7, decision 3 (c): "(more often in high-risk)" had no source; replaced with the sourced Verbalis interval. Urine-output clause unchanged, now sourced |
| `treatment[1].evidenceNote[1]` | (absent) | Verbalis 2013 (ungraded): high ODS risk, >8 mmol/L in any 24 h may justify re-lowering (S21) | Verbalis S21: "in high-risk patients (Table 3), correction by >8 mmol/L in any 24-hour period may be justification for therapeutic re-lowering" | F8, decision 5: keeps the re-lowering row consistent with `definitions[1]` and the calculator. `evidenceLevel` stays WEAK (ESE 7.5.1.1, 1D) |
| `pitfalls[2]` | ODS risk: Na ≤120, alcohol use disorder, malnutrition, hypokalemia, liver disease | (deleted; former `pitfalls[3]` is now `pitfalls[2]`, unchanged) | — | F6, decision 2 (b): unsourced duplicate of the risk list now in `definitions[1]`; its "Na ≤120" conflicted with Verbalis Table 3 (≤105) |
| `sources[3]` | (absent) | Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med 2013;126(10 Suppl 1):S1-S42. doi:10.1016/j.amjmed.2013.07.006 | PDF title page (S5: authors, "The American Journal of Medicine (2013) 126, S1-S42"); DOI printed on S5; issue printed as "Vol 126, No 10A" in page headers, cited as 10 Suppl 1 as in the brief | F3 |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule | Edited entry |

## Checked, not changed
- `definitions[0]` / `keyNumbers[1]` ("≤10 … then ≤8 … until Na 130 (1D)"): matches ESE 7.1.2.4 (G28, 1D). ESE 7.2.1.6 (moderately severe symptoms) is the same limit at 2D; 7.4.1.4 (chronic, no severe symptoms, 1D) omits "until 130". ACCEPT (A2).
- `keyNumbers[0]`: exact copy of `immediateActions[0].action`, unchanged.
- `immediateActions[3]` ("Re-lower: D5W ± desmopressin if limit exceeded (ESE 1D)"): matches ESE 7.5.1.1–7.5.1.4 (G38, 1D); unchanged.
- `treatment[1].evidenceNote[0]`: matches ESE 7.5.1.1 (G38); unchanged.
- `workup[3].notes[0]` (K repletion counts toward the limit): ESE G28 bullet; Verbalis S24–S25. Unchanged.
- `presentation`, `searchTerms`, `treatment[0]`, `escalateWhen`, `institutionVaries`, `relatedIds`: unchanged (outside R3).

## Disposition
- F1, F2, F3, F6, F7, F8: FIX (entry). F4, F5: FIX (calculator; see README).
- A1–A7: ACCEPT. C1: check by Claude Code, no edit. See README Disposition Ledger.

## Open verify[]
- None (`verify: []`).

## Registry version
- acute-neuro: MINOR, applied once at assembly (from the version in `data/acute-neuro.json`; the export has no registry header). See README.
