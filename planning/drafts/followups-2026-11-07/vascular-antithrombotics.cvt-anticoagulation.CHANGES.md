# vascular-antithrombotics:cvt-anticoagulation — CHANGES (follow-up batch, Group A item 2)

| field path | current | new | source | why |
|---|---|---|---|---|
| `relatedIds` | `[… "vascular-antithrombotics:warfarin", "vascular-antithrombotics:dabigatran"]` | appended `"reference-cards:thrombophilia-test-validity"` | None needed (navigation link; target is in `valid-ids.txt`) | `rules[2]` makes duration depend on thrombophilia ("indefinitely with thrombophilia"), and `rules[3]` excludes DOACs in APS. Both need a thrombophilia result, and the patient is already on the heparin, VKA or DOAC that can make those tests unreliable |
| `lastReviewed` | `"2026-11-07"` | `"UNREVIEWED"` | Batch rule 5 | Entry edited |

No other fields changed. `keyNumbers` not touched.

Registry bump: vascular-antithrombotics **PATCH** for this item. The final bump is set at assembly, after Group C.
