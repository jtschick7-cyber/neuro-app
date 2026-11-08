# consult-workups:young-stroke-workup — CHANGES

Follow-up batch 3 (2026-11-08). Base: signed `current.consult-workups.young-stroke-workup.json` (lastReviewed 2026-11-08, `main` 814629f).

| field path | current | new | source | why |
|---|---|---|---|---|
| `decisionRules[2].recommendation` | Warfarin is reasonable; target INR 2–3 over >3 | Warfarin is reasonable; target INR 2–3 rather than >3 | Kleindorfer 2021 §5.8.2 Rec 2 (COR 2a, LOE B-R): "it is reasonable to choose a target INR between 2 and 3 over a target INR >3" | Item 7a (FIX): "over >3" can be read as "above 3"; meaning unchanged |
| `keyNumbers[0]` | Confirmed APS: Warfarin is reasonable; target INR 2–3 over >3 | Confirmed APS: Warfarin is reasonable; target INR 2–3 rather than >3 | Rule 5 | Item 7a: stays an exact copy of decisionRules[2].condition + ": " + recommendation |
| `lastReviewed` | 2026-11-08 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- `decisionRules[2].evidenceNote[0]` ("COR 2a (C-LD; INR target B-R)") matches §5.8.2 Recs 3 and 2.
- Other keyNumbers unchanged; exact copies of unedited fields.

## Disposition
- Item 7a: FIX.
- Item 7b ("Kleindorfer" vs "Kleindorfer 2021" labels): ACCEPT, the entry has one Kleindorfer source, so the short label is unambiguous.

## Open verify[]
- None (`verify: []`).

## Registry version
- consult-workups: 2.1.1 → 2.2.0 (MINOR), applied once at assembly (see README).
