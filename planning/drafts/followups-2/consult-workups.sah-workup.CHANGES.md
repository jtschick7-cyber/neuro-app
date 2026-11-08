# consult-workups:sah-workup — CHANGES

Follow-up batch 2 (2026-11-08). Base: signed `current.consult-workups.sah-workup.json` (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `relatedIds[3]` | (absent) | vascular-antithrombotics:cervical-artery-dissection | valid-ids.txt | Item 3 (A): cervical artery dissection is a mustNotMiss differential; no consult-workups dissection entry exists |
| `relatedIds[4]` | (absent) | vascular-antithrombotics:cvt-anticoagulation | valid-ids.txt | Item 3 (A): CVT is a mustNotMiss differential; no consult-workups CVT entry exists |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 5 | Edited entry |

## Noticed, not changed
- The differential lists dissection and CVT as mustNotMiss, but the workup has no neck vessel imaging or CTV/MRV; CTA head is indicated only for "SAH on CT".

## Open verify[]
- None (`verify: []`).

## Registry version
- consult-workups: 2.0.1 → 2.1.0 (MINOR), applied once at assembly (see README).
