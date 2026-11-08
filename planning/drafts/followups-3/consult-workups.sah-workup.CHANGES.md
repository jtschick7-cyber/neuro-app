# consult-workups:sah-workup — CHANGES

Follow-up batch 3 (2026-11-08). Base: signed `current.consult-workups.sah-workup.json` (lastReviewed 2026-11-08, `main` 814629f).

| field path | current | new | source | why |
|---|---|---|---|---|
| `workup[2].indication[1]` | (absent) | CT negative, xanthochromia on LP | Hoh 2023 (sources[0]) Figure 2: CT negative → LP → xanthochromia → CTA/DSA (Class 1); §4 Rec 2 (COR 1, LOE B-NR): CT, then LP if negative | L1 (FIX): the CTA row omitted the positive-LP path. CTA instead of LP after a negative CT is not added: Hoh 2023 supportive text 2 reports no study comparing them, and institutionVaries[1] already covers it |
| `workup[3]` | (absent; inserted: former workup[3]–[4] are now workup[4]–[5], unchanged) | {"test": "Imaging for other thunderclap causes: CTA/MRA head and neck, CT/MR venography, MRI brain — see thunderclap-headache", "priority": "URGENT", "indication": ["Features of cervical artery dissection, RCVS, CVT or pituitary apoplexy"], "notes": []} | Points to consult-workups:thunderclap-headache workup (CTA/MRA head and neck; CT/MR venography; MRI brain), already linked in relatedIds[1]; indication names the differential's mustNotMiss items | Item 1 (FIX, option P), 1b (RCVS kept), L2 (pituitary apoplexy): these mustNotMiss diagnoses had no imaging in the workup. Pointer instead of duplicate rows so the two entries can't drift; indication doesn't depend on the CT or LP result |
| `lastReviewed` | 2026-11-08 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- `workup[0]`–`[2]` notes, `decisionRules[0]`–`[5]` and `institutionVaries[1]`: checked against Hoh 2023 §4 Recs 1–6, supportive text 2–5 and Figure 2; consistent, unchanged.
- `keyNumbers`: unchanged; all five are exact copies of unedited fields.
- No sources added: the new row carries no claim of its own; its content and sources live in thunderclap-headache.

## Disposition
- Item 1: FIX (option P pointer row, RCVS included).
- L1: FIX (`workup[2].indication[1]`).
- L2: FIX (covered by the item-1 row).
- L3: dropped (would only have arisen with full duplicate rows, option R).
- L4: ACCEPT, recorded here because it surfaced in this item: thunderclap-headache labels say "Sousa 2026"; its source string correctly reads "de Sousa IA…", so the paper is findable (label only; entry not edited).

## Open verify[]
- None (`verify: []`).

## Registry version
- consult-workups: 2.1.1 → 2.2.0 (MINOR), applied once at assembly (see README).
