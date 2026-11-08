# vascular-antithrombotics:cvt-anticoagulation — CHANGES

Follow-up batch 2 (2026-11-08). Base: signed `current.vascular-antithrombotics.cvt-anticoagulation.json` (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `rules[0].evidenceNote[0]` | AHA scientific statement 2024 (ungraded) | Saposnik 2024 | Saposnik 2024 (sources[0]); management section and Fig. 4: initial LMWH over UFH, then VKA | Item 2b (B): same paper; label form used by rules 2–9 and options[0]. "Ungraded" is still shown by evidenceLevel NOT_GRADED and pearls[1] |
| `options[0].dose[1]` | (absent) | {"label": "CrCl <30", "amountMin": 1, "amountMax": 1, "unit": "MG", "basis": "PER_KG", "timing": "PER_DOSE", "weightBasis": "ACTUAL", "caps": [], "frequency": ["Daily"], "duration": []} | Lovenox (enoxaparin sodium) US prescribing information, Sanofi, revised 5/2025, §2.3 Table 1: inpatient DVT ± PE, CrCl <30 mL/min, 1 mg/kg SC once daily (attached label); identical to enoxaparin uses[1].dose[2] | Item 2c (C): renal dose was only in doseText, so the structured display left it out |
| `options[0].evidenceNote[1]` | (absent) | Dose: Lovenox label §2.2 (1 mg/kg q12h) and §2.3 Table 1 (CrCl <30: 1 mg/kg daily) | Lovenox (enoxaparin sodium) US prescribing information, Sanofi, revised 5/2025, §2.2 and §2.3 Table 1 | Item 2c (C): Saposnik 2024 gives no enoxaparin doses |
| `sources[1]` | (absent) | Lovenox (enoxaparin sodium) US prescribing information. Sanofi; revised 5/2025 (user-supplied label) | Same string as enoxaparin sources[0]; attached label confirms Sanofi-Aventis, Revised 5/2025 | Item 2c (C): dose source |
| `relatedIds[5]` | (absent) | vascular-antithrombotics:pregnancy-antithrombotics | valid-ids.txt | Item 2a (A): rules[4] covers CVT in pregnancy; pregnancy-antithrombotics already links back |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 5 | Edited entry |

## Checked, not changed
- `keyNumbers[0]`: Still an exact copy of options[0].agent + ": " + doseText; doseText unchanged.

## Noticed, not changed
- options[0].dose[0] is labeled "Enoxaparin" and now sits next to "CrCl <30"; the enoxaparin entry labels the same dose "q12h".
- The label's renal dose is for DVT/PE treatment given with warfarin. Using it for CVT is an extrapolation, the same one the existing q12h dose already rests on.
- A verify[] item for the CrCl <30 dose was added in this batch and closed before sign-off by the attached Lovenox label (§2.2, §2.3 Table 1).

## Open verify[]
- None (`verify: []`).

## Registry version
- vascular-antithrombotics: 0.11.1 → 0.12.0 (MINOR), applied once at assembly (see README).
