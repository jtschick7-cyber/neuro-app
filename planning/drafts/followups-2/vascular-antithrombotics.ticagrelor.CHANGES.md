# vascular-antithrombotics:ticagrelor — CHANGES

Follow-up batch 2 (2026-11-08). Base: signed `current.vascular-antithrombotics.ticagrelor.json` (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `uses[0].evidenceNote[1]` | Kleindorfer 2021 §5.19: COR 2b, LOE B-R (SR) — used ≥30% stenosis for any event | Kleindorfer 2021 §5.19 Rec 4: COR 2b, LOE B-R (SR) — used ≥30% stenosis for any event | Kleindorfer 2021 §5.19 Rec 4 (COR 2b, LOE B-R(SR)); its text includes "symptomatic intracranial or extracranial ≥30% stenosis of an artery that could account for the event" | Item 8 (B): §5.19 was correct (the ≥30% threshold is in Rec 4 itself); "Rec 4" added for precision |
| `uses[3].evidenceNote[0]` | Kleindorfer 2021: COR 2b, LOE B-NR | Kleindorfer 2021 §5.1.1 Rec 3: COR 2b, LOE B-NR | Kleindorfer 2021 §5.1.1 Rec 3 (COR 2b, LOE B-NR): ticagrelor added to aspirin ≤30 days, ipsilateral >30% intracranial stenosis | Item 8 (B): section was missing |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 5 | Edited entry |

## Noticed, not changed
- uses[0]: the note's "for any event" doesn't match Rec 4's "an artery that could account for the event". The agent text uses ≥50% stenosis (AHA 2026/THALES); Kleindorfer Rec 4 says ≥30%.
- uses[3]: Rec 3 says ">30%"; the §5.1.1 supportive text describes the subgroup as "≥30%". The entry follows the recommendation.

## Open verify[]
- None (`verify: []`).

## Registry version
- vascular-antithrombotics: 0.11.1 → 0.12.0 (MINOR), applied once at assembly (see README).
