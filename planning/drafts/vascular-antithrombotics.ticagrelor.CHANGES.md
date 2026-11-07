# vascular-antithrombotics:ticagrelor — changes (task 1.3)

Registry bump: MINOR (threshold + evidence note + source). lastReviewed → "UNREVIEWED".

| Field | Before | After |
|---|---|---|
| `uses[0].agent` | Ticagrelor + aspirin — minor stroke (NIHSS ≤5) or high-risk TIA (ABCD2 ≥6) or symptomatic ≥50% stenosis, <24 h, no IVT (THALES) | Ticagrelor + aspirin — noncardioembolic minor stroke (NIHSS ≤5) or high-risk TIA (ABCD2 ≥6, or symptomatic ≥50% intracranial/extracranial stenosis that could account for the TIA), <24 h, no IVT (THALES) |
| `uses[0].evidenceNote[1]` | Kleindorfer 2021: COR 2b, LOE B-R | Kleindorfer 2021 §5.19: COR 2b, LOE B-R (SR) — used ≥30% stenosis for any event |
| `sources` | — | Added (3rd): Johnston SC, et al. … THALES. N Engl J Med 2020;383:207-217 |
| `lastReviewed` | 2026-11-05 | UNREVIEWED |

Unchanged on purpose:
- `uses[3]` (Kleindorfer ICAD >30%, COR 2b B-NR): matches Kleindorfer §5.1.1 Rec 3. Its "(unstructured: see ICAD entry, pending)" text belongs to task 1.2; its SECOND_LINE role on a COR 2b rec was noted, not changed.
- `uses[1]` "Preferred over clopidogrel + aspirin in carriers": task 1.4.
- `timing.thrombolysisRule`: task 1.5.

---

# Task 1.5 changes (applied on top of the final 1.3 draft above)

| Field | Before | After |
|---|---|---|
| `timing.thrombolysisRule[0]` | Antiplatelets alone don't exclude IVT — not addressed as a contraindication in AHA 2026 | Prior SAPT/DAPT doesn't exclude IVT — give if otherwise eligible (AHA 2026 §4.6.1 Rec 9: COR 1, B-NR); sICH +0.9% SAPT / +1.2% DAPT absolute (class-level statement; agent not named) |

`thrombolysisRule[1]` (see-also) unchanged.
