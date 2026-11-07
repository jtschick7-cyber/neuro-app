# vascular-antithrombotics:ticagrelor — CHANGES (follow-up batch, Group C item 6)

**Decision: SECOND_LINE → ALTERNATIVE.** Evidence level, evidenceNote, dose and agent text are unchanged.

| field path | current | new | source | why |
|---|---|---|---|---|
| `uses[3].role` | `"SECOND_LINE"` | `"ALTERNATIVE"` | Kleindorfer 2021 §5.1.1 Rec 3 (COR 2b, LOE B-NR; confirmed in attached PDF). §5.1.1 supportive text 3 says choosing ticagrelor or clopidogrel to add to aspirin "should be based on patient factors" | (1) Consistency: the other COR 2b primary-therapy rows in the attached entries are ALTERNATIVE (`uses[0]` THALES, `uses[1]` CHANCE-2, same entry). `uses[3]` was the only SECOND_LINE row in the batch. (2) Meaning: the recommendation is an add-on choice in the first 24 h, offered beside clopidogrel + aspirin. It doesn't depend on a first-line agent failing, which SECOND_LINE implies |
| `verify[]` | `[]` | added an item about the AHA 2026 sections not checked (text in JSON) | Batch rule 2 | Only §4.6 and §4.8 were attached |
| `lastReviewed` | `"2026-11-07"` | `"UNREVIEWED"` | Batch rule 5 | Entry edited |

**AHA 2026 check:** §4.8 (Recs 1–18) neither restates nor supersedes this recommendation. The closest is §4.8 Rec 13 (THALES, COR 2b, LOE B-R), which covers *symptomatic ≥50%* intracranial or extracranial stenosis that could account for a TIA. That's already in `uses[0]`. The ≥30% ipsilateral subgroup isn't addressed, so Kleindorfer 2021 stays the source.

`keyNumbers` not touched: none is drawn from `uses[3]`.

Registry bump: vascular-antithrombotics **MINOR** (role/tier change; not a reversal). Applied once at assembly.
