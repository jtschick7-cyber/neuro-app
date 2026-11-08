# vascular-antithrombotics:cvt-anticoagulation — CHANGES

Follow-up batch 3 (2026-11-08). Base: signed `current.vascular-antithrombotics.cvt-anticoagulation.json` (lastReviewed 2026-11-08, `main` 814629f).

| field path | current | new | source | why |
|---|---|---|---|---|
| `options[0].dose[0].label` | Enoxaparin | q12h | enoxaparin uses[1].dose[0] label "q12h" (same dose) | Item 5b (FIX): "Enoxaparin" next to "CrCl <30" could read as applying at any CrCl; matches the enoxaparin entry |
| `options[0].evidenceNote[2]` | (absent) | CVT is not a labeled indication; both doses are extrapolated from the label's DVT ± PE treatment regimen | Lovenox PI (sources[1]) §2.2 (DVT ± PE treatment, 1 mg/kg q12h) and §2.3 Table 1 (CrCl <30: inpatient DVT ± PE with warfarin, 1 mg/kg daily); no CVT indication. Saposnik 2024 gives no enoxaparin dose | Item 5a (FIX): the label is cited as the dose source for a CVT option; the reader couldn't tell both doses are extrapolated |
| `lastReviewed` | 2026-11-08 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- `options[0].evidenceNote[0]`–`[1]`, doses, frequencies and sources unchanged.
- `keyNumbers[0]`: unchanged; exact copy of options[0].agent + doseText (unedited).

## Disposition
- Item 5: FIX (5a note, 5b label).

## Open verify[]
- None (`verify: []`).

## Registry version
- vascular-antithrombotics: 0.12.1 → 0.13.0 (MINOR), applied once at assembly (see README).
