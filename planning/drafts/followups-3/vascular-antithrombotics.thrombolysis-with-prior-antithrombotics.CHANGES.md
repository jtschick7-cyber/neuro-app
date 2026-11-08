# vascular-antithrombotics:thrombolysis-with-prior-antithrombotics — CHANGES

Follow-up batch 3 (2026-11-08). Base: signed `current.vascular-antithrombotics.thrombolysis-with-prior-antithrombotics.json` (lastReviewed 2026-11-07, `main` 814629f).

| field path | current | new | source | why |
|---|---|---|---|---|
| `rules[0].evidenceLevel` | CONSENSUS | EXPERT_OPINION | AHA 2026 (sources[0]) text preceding Table 8: "expert opinions and limited data form the basis of the general gradient of risk (Table 8…)"; Table 8 rows carry no COR/LOE | Item 2 (FIX): CONSENSUS means formal consensus (RAND/UCLA, Delphi) in acute-neuro.ts; Table 8 is ungraded expert opinion. Rule: level reflects the current guideline; if ungraded, what the source says it rests on |
| `rules[0].evidenceNote[1]` | (absent) | Table 8 is ungraded: expert opinion and limited data | Same passage | Item 2 (FIX): says why there is no COR/LOE |
| `rules[1].evidenceLevel` | CONSENSUS | EXPERT_OPINION | Same passage | Item 2 (FIX) |
| `rules[1].evidenceNote[1]` | (absent) | Table 8 is ungraded: expert opinion and limited data | Same passage | Item 2 (FIX) |
| `rules[4].evidenceLevel` | STRONG | NOT_GRADED | Powers 2019 (sources[1]) Table 8, LMWH row: COR III: Harm, LOE B-NR; complete AHA 2026 Table 8 has no LMWH row | Item 2 (FIX): no current AHA grade; the 2019 grade stays in evidenceNote[0], unchanged |
| `rules[5].evidenceLevel` | CONSENSUS | NOT_GRADED | AHA 2026 Table 7 (complete, user-supplied screenshots): "Obtain a follow-up CT or MRI scan at 24 h after IVT before starting anticoagulants or antiplatelet agents"; no COR/LOE, no stated basis; footnotes cover pediatric and weight-band dosing only | L5 (FIX): same rule; ungraded with no stated basis → NOT_GRADED |
| `rules[5].evidenceNote[1]` | (absent) | Table 7 is an ungraded treatment protocol | Same table | L5 (FIX) |
| `keyNumbers[2]` | DOAC taken <48 h, disabling deficit, within window: May be considered after individual benefit–risk review | DOAC taken <48 h, disabling deficit, within window: May be considered after individual benefit–risk review: time of last dose, renal function, severity, EVT availability, reversal agents, DOAC-specific anti-Xa or thrombin time assays. Document timing, reversal use, and assay results | Rule 5 | L6 (FIX): was a truncated copy; now an exact copy of rules[2].condition + ": " + recommendation |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- Complete AHA 2026 Table 8 (all three tiers, ends at ARIA row): rules[0]–[2] wording and tier match; contraindications list every absolute-tier row except coagulopathy (covered by rules[1]); no LMWH or antiplatelet row, so rules[4] note "Not restated in AHA 2026 §4.6 or Table 8" and institutionVaries[2] "AHA 2026 silent" are confirmed.
- rules[2] already EXPERT_OPINION; rules[3] STRONG on AHA 2026 §4.6.1 Rec 9 not in scope.
- rules[5] wording matches the Table 7 row.
- keyNumbers[0], [1], [3], [4]: unchanged, exact copies of unedited condition + recommendation.

## Disposition
- Item 2: FIX.
- Item 3: ACCEPT, the complete Table 8 has no LMWH row and matches this entry, enoxaparin and heparin-ufh; no change needed.
- L5: FIX.
- L6: FIX.

## Open verify[]
- None (`verify: []`).

## Registry version
- vascular-antithrombotics: 0.12.1 → 0.13.0 (MINOR), applied once at assembly (see README).
