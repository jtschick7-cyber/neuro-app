# vascular-antithrombotics:enoxaparin — CHANGES

Follow-up batch 3 (2026-11-08). Base: signed `current.vascular-antithrombotics.enoxaparin.json` (lastReviewed 2026-11-08, `main` 814629f).

| field path | current | new | source | why |
|---|---|---|---|---|
| `keyNumbers[1]` | Full treatment-dose LMWH within 24 h: no IVT | Full treatment-dose LMWH within 24 h: no IVT (Powers 2019 §3.5.5 Rec 7: COR III: Harm, B-NR; not restated in AHA 2026). Prophylactic doses excluded | Rule 5; field: timing.thrombolysisRule[0] (unchanged) | Item 8 (FIX): copied only the opening clause; the dropped "Prophylactic doses excluded" could wrongly exclude patients on prophylactic LMWH from IVT |
| `lastReviewed` | 2026-11-08 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- `timing.thrombolysisRule[0]`: unchanged; "not restated in AHA 2026" confirmed against the complete AHA 2026 Table 8 (item 3).
- Other keyNumbers unchanged; exact copies of unedited fields.

## Disposition
- Item 8: FIX.
- Item 3: ACCEPT (no change needed; see README).

## Open verify[]
- None (`verify: []`).

## Registry version
- vascular-antithrombotics: 0.12.1 → 0.13.0 (MINOR), applied once at assembly (see README).
