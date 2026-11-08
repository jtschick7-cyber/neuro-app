# vascular-antithrombotics:ticagrelor — CHANGES

Follow-up batch 3 (2026-11-08). Base: signed `current.vascular-antithrombotics.ticagrelor.json` (lastReviewed 2026-11-08, `main` 814629f).

| field path | current | new | source | why |
|---|---|---|---|---|
| `uses[0].evidenceNote[1]` | Kleindorfer 2021 §5.19 Rec 4: COR 2b, LOE B-R (SR) — used ≥30% stenosis for any event | Kleindorfer 2021 §5.19 Rec 4: COR 2b, LOE B-R (SR) — ≥30% stenosis of an artery that could account for the event (THALES and AHA 2026: ≥50%) | Kleindorfer 2021 (sources[1]) §5.19 Rec 4 (COR 2b, LOE B-R^SR): "symptomatic intracranial or extracranial ≥30% stenosis of an artery that could account for the event"; AHA 2026 §4.8 Rec 13 (COR 2b, B-R) and THALES (sources[2], p. 208): ≥50% that could account for the TIA | Item 4 (FIX): "for any event" misstated Rec 4; agent text (≥50%) already matches AHA 2026/THALES |
| `lastReviewed` | 2026-11-08 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- `uses[3]` follows Kleindorfer §5.1.1 Rec 3's recommendation text (">30%"); supportive text 3's "≥30%" describes the THALES subgroup. Unchanged.
- `keyNumbers[2]`: unchanged; exact copy of uses[0].agent + doseText (unedited).

## Disposition
- Item 4: FIX (uses[0]); uses[3]: no change needed.

## Open verify[]
- None (`verify: []`).

## Registry version
- vascular-antithrombotics: 0.12.1 → 0.13.0 (MINOR), applied once at assembly (see README).
