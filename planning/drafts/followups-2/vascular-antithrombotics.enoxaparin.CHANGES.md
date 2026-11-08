# vascular-antithrombotics:enoxaparin — CHANGES

Follow-up batch 2 (2026-11-08). Base: signed `current.vascular-antithrombotics.enoxaparin.json` (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `timing.thrombolysisRule[0]` | Full treatment-dose LMWH within 24 h: no IVT (Powers 2019: COR III: Harm, B-NR; not restated in AHA 2026). Prophylactic doses excluded | Full treatment-dose LMWH within 24 h: no IVT (Powers 2019 §3.5.5 Rec 7: COR III: Harm, B-NR; not restated in AHA 2026). Prophylactic doses excluded | Powers 2019 §3.5.5 Rec 7 (COR III: Harm, LOE B-NR); also the Powers 2019 Table 8 LMWH row | Item 7 (C): this line keeps its Powers 2019 source (AHA 2026 has no LMWH row and no LMWH text in §4.6); section added to match thrombolysis-with-prior-antithrombotics rules[4] |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 5 | Edited entry |

## Checked, not changed
- `keyNumbers[1]`: "Full treatment-dose LMWH within 24 h: no IVT" is the unchanged opening clause of timing.thrombolysisRule[0], so it's still an exact copy of that clause.

## Noticed, not changed
- keyNumbers[1] copies only the opening clause of its field, the same pattern item 1b fixed in GBS.
- The attached AHA 2026 PDF cuts Table 8 off mid-row ("Amyloid…") at the bottom of p. 94/245, and p. 95 starts at §4.7. No LMWH row up to that point; the rest of the table couldn't be checked.

## Open verify[]
- None (`verify: []`).

## Registry version
- vascular-antithrombotics: 0.11.1 → 0.12.0 (MINOR), applied once at assembly (see README).
