# vascular-antithrombotics:dapt-minor-stroke-tia — changes (task 1.3)

Registry bump: MINOR (threshold + evidence note + source). lastReviewed → "UNREVIEWED".

| Field | Before | After |
|---|---|---|
| `rules[3].condition` (order 4) | NIHSS ≤5, ABCD2 ≥6, or symptomatic ≥50% intracranial/extracranial stenosis, within 24 h | Noncardioembolic minor stroke (NIHSS ≤5) or high-risk TIA (ABCD2 ≥6, or symptomatic ≥50% intracranial/extracranial stenosis that could account for the TIA), <24 h, no IVT (THALES) |
| `rules[3].evidenceNote[1]` | Kleindorfer 2021: COR 2b, LOE B-R (stenosis ≥30%) | Kleindorfer 2021 §5.19: COR 2b, LOE B-R (SR) — used ≥30% stenosis for any event |
| `pearls` | — | Added (3rd): Stenosis thresholds differ by source: THALES enrollment and AHA 2026 use ≥50% as a high-risk-TIA criterion; Kleindorfer 2021 §5.19 used ≥30% for any event; ipsilateral >30% intracranial stenosis has its own recommendation (icad-symptomatic rule 3) |
| `relatedIds` | — | Added: vascular-antithrombotics:icad-symptomatic (target of the new pearl) |
| `sources` | — | Added (3rd): Johnston SC, et al. … THALES. N Engl J Med 2020;383:207-217 |
| `lastReviewed` | 2026-11-05 | UNREVIEWED |

`rules[3].recommendation` unchanged.
