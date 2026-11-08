# consult-workups:young-stroke-workup — CHANGES

Follow-up batch 2 (2026-11-08). Base: signed `current.consult-workups.young-stroke-workup.json` (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `workup[5].notes[1]` | Lupus anticoagulant testing is discouraged on anticoagulation (false positives and negatives); DOAC removal or alternate assays only with lab input (ISTH 2024) | Lupus anticoagulant testing is discouraged on anticoagulation (false positives and negatives); DOAC removal or alternate assays only with lab input (ISTH 2025) | Devreese KMJ, et al. J Thromb Haemost 2025;23:731-744 (attached PDF masthead; matches sources[3]) | Item 6 (A): in-text label year now matches the cited year |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 5 | Edited entry |

## Checked, not changed
- `keyNumbers[0]`: Already an exact copy of decisionRules[2] condition + ": " + recommendation. The recommendation shortens Kleindorfer 2021 §5.8.2 Rec 3 (warfarin reasonable, 2a C-LD) and Rec 2 ("target INR between 2 and 3 over a target INR >3", 2a B-R); "over >3" means over a target INR >3. Not truncated.

## Noticed, not changed
- If "over >3" is too terse, the rewording belongs in decisionRules[2].recommendation (e.g. "target INR 2–3 rather than >3"), and keyNumbers[0] would then need to change to stay an exact copy.
- Some labels say "Kleindorfer" and others "Kleindorfer 2021".

## Open verify[]
- None (`verify: []`).

## Registry version
- consult-workups: 2.0.1 → 2.1.0 (MINOR), applied once at assembly (see README).
