# acute-neuro:serotonin-syndrome — CHANGES

Review 2026-11-08, item R10 (drafted 2026-11-10). Base: signed `current.acute-neuro.serotonin-syndrome.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `searchTerms[6]` | (absent) | "triptan" | — | D3: the new pitfall is findable by drug class (PATCH-level) |
| `presentation[0]` | "Onset usually within 24 h of a new serotonergic drug, dose increase, or interacting combination (e.g., linezolid, methylene blue, MAOIs, tramadol, fentanyl, triptans + SSRI/SNRI)" | "Onset usually within 24 h of a new serotonergic drug, dose increase, or interacting combination (e.g., linezolid, methylene blue, MAOIs, tramadol, fentanyl)" | Orlova 2018 (sources[2]): Results p 569; Discussion p 569–570 | F1, D1 (c): example removed; co-prescription rarely produced serotonin syndrome and never unequivocally implicated the triptan |
| `pitfalls[3]` | (absent) | "Triptan + SSRI/SNRI rarely causes it: 0.6 definite cases/10,000 person-years (95% CI 0–1.5; 2.3 incl. possible cases) over 30,928 person-years of co-prescription; none life-threatening" | Orlova 2018: Abstract (Results) p 566 (30,928 person-years; 0.6, 95% CI 0.0–1.5; 2.3 incl. possible); Results p 569 (2 definite per 30,928 person-years = 0.6/10,000, 95% CI 0–1.5; 7 definite + possible = 2.3/10,000, 95% CI 0.6–3.9); Table and footnote a p 570; Discussion p 569 ("no cases of life-threatening serotonin syndrome") | F1, D1 (c), D2 (ii) |
| `sources[2]` | (absent) | Orlova Y, Rizzoli P, Loder E. Association of Coprescription of Triptan Antimigraine Drugs and Selective Serotonin Reuptake Inhibitor or Selective Norepinephrine Reuptake Inhibitor Antidepressants With Serotonin Syndrome. JAMA Neurol 2018;75(5):566-572. doi:10.1001/jamaneurol.2017.5144 | p 566 (title, authors, citation, doi) | F1 |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- `definitions[0]` (Hunter criteria): follows Dunkley 2003 (its cited source). Orlova's Box (p 568, "adapted from Dunkley") lays out hypertonia and temperature >38 °C on separate lines; the entry is not changed to match it (A1).
- `pitfalls[2]` (inpatient triggers incl. ondansetron/metoclopramide): not examined; outside R10 (P1).
- `keyNumbers[0]`, `[1]`: unchanged; exact copies of `treatment[1].agent` + ": " + `doseText` and `escalateWhen[0]`.
- All other fields unchanged.

## Disposition
- F1, D3: FIX.
- See README Disposition Ledger for ACCEPT/PARK items.

## Open verify[]
- None (`verify: []`).

## Registry version
- acute-neuro: MINOR, applied once at assembly (version as found after the R3, R4 and R6 PRs; see README).
