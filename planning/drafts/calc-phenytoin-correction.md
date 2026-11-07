# calc:phenytoin-correction — spec (item 7.1)

Status: **final in planning (2026-11-06)** — formula, Vd, caps and rounding approved by Jason, including the two [NEW] items. Code and tests still need sign-off in the repo (rule 0.6).
Items marked **[NEW — accepted]** were proposed during drafting and approved 2026-11-06 (DECISION_LOG 7.1 B, C).

## CALCULATOR_META entry

```ts
"phenytoin-correction": {
  id: "phenytoin-correction",
  title: "Phenytoin level: albumin correction and reload estimate",
  formula: "Corrected total = measured total / (0.2 × albumin + 0.1) [Sheiner-Tozer]; on dialysis: / (0.1 × albumin + 0.1) [Mauro 1989]. Albumin g/dL, phenytoin mcg/mL. Not corrected if albumin not entered, or albumin ≥4.4 g/dL on the standard equation. Estimated free = corrected × 0.1. Reload (mg PE) = (target − corrected) × 0.7 L/kg × actual weight; target default 15 (10–20)",
  caps: ["10 mg PE/kg (rounded down to 50 mg PE)", "1500 mg PE", "150 mg PE/min"],
  rounding: "Corrected total and estimated free to 0.1 mcg/mL; reload to nearest 50 mg PE (= whole mL at 50 mg PE/mL), then cap (app convention)",
  weightBasis: "ACTUAL",
  sources: [S.kiang2016, S.cerebyx, S.dilantin, S.vpaIv],
  verify: [],
}
```

Sources to add to the `S` block:
- `kiang2016`: Kiang TK, Ensom MH. A comprehensive review on the predictive performance of the Sheiner-Tozer and derivative equations for the correction of phenytoin concentrations. Ann Pharmacother 2016;50(4):311-325. doi:10.1177/1060028016628166
- `cerebyx`: Cerebyx (fosphenytoin sodium) injection US prescribing information. Pfizer; revised 5/2025 (user-supplied label)
- `dilantin`: Dilantin (extended phenytoin sodium capsules) US prescribing information. Viatris; revised 8/2023 (DailyMed setid 86dd27d1-9cee-48ae-b55d-e2d2f7dbc593, accessed 2026-11-06)
- `vpaIv`: Valproate sodium injection US prescribing information. Hikma; revised 12/2023 (user-supplied label)

## Why this equation

| Option | Source | Decision |
|---|---|---|
| Original Sheiner-Tozer, coefficient 0.2 | Kiang 2016 Table 1 (the "gold standard"; tested in most studies) | **Default** |
| Dialysis variant, coefficient 0.1 | Mauro 1989, 11 ICU patients on dialysis; MPE −0.1, RMSE 4.3 mg/L (Kiang 2016 Table 1, Kidney Failure section) | **Toggle labeled "On dialysis"**. Not tied to a CrCl cutoff — the source population is dialysis patients |
| Anderson 1997, coefficient 0.25 | Elderly nursing-home patients; internal validation (n = 9) only | Not offered (deprioritized) |
| Kane 2013, coefficient 0.29 | Neuro-ICU; internal validation; Brown 2013 found worse performance in their neuro-ICU | Not offered (deprioritized) |

Kiang 2016 found the original equation biased and imprecise in ICU, head-trauma and general neurology patients, and no study looked at outcomes. Hence the always-on "estimate only" warning, and measured free levels take priority over the estimate. Both labels (Cerebyx §2.7, Dilantin §2.5) say to monitor unbound levels in renal or hepatic disease and hypoalbuminemia.

## Inputs

| Input | Unit | Required | Valid range | Default |
|---|---|---|---|---|
| measuredTotal | mcg/mL | yes | 0–60 | — |
| albuminGdl | g/dL | no | 1.0–6.0 | — (no correction) |
| onDialysis | boolean | no | — | false |
| measuredFree | mcg/mL | no | 0–10 | — |
| weightKg (actual) | kg | for reload | 1–350 (existing `reqWeight`) | — |
| targetTotal | mcg/mL | no | 10–20 | **15** (Jason) |
| onValproate | boolean | no | — | false |
| hoursSinceFosphenytoin | h | no | 0–240 | — |
| fosphenytoinRoute | IV / IM | no | — | IV |

Out-of-range input → `RangeError`, same as other calculators.

## Algorithm

1. Coefficient = 0.1 if `onDialysis`, else 0.2.
2. Corrected total:
   - no albumin → corrected = measured, plus warning;
   - standard equation and albumin ≥4.4 → corrected = measured (4.4 g/dL is the normal albumin the equation assumed, so no correction is needed);
   - otherwise corrected = measured / (coefficient × albumin + 0.1). The dialysis variant always applies when albumin is entered.
3. Estimated free = corrected × 0.1. Bands: total vs 10–20, free vs 1–2 (below / within / above).
4. Measured free entered and its band differs from the estimate's band → warning "trust the measured free level".
5. Reload is computed only if weight is entered:
   - **[NEW — accepted]** if measured free is entered and is within or above 1–2 → **no reload** (value 0). Approved decision #7 computed the reload from the corrected total regardless. Changed because, in case 9 below, a measured free level of 2.4 would still have produced a 200 mg PE reload.
   - corrected ≥ target → no reload (value 0);
   - otherwise raw = (target − corrected) × 0.7 × weight. Round to the nearest 50 mg PE (half-up). Cap = min(floor-to-50(10 × weight), 1500).
   - **[NEW — accepted]** the 10 mg/kg cap is **rounded down** to a 50 mg PE multiple, so the cap is never exceeded and the volume stays in whole mL (e.g., 63 kg → 630 → 600 mg PE).
   - rounded result 0 → "Calculated reload <25 mg PE — not meaningful".
   - minimum infusion time = dose / 150, rounded to 0.1 min (same as `fosphenytoin-load`).
6. Use unrounded intermediates throughout; round only for display.

No salt factor (approved #9): mg PE = mg phenytoin sodium with no molecular-weight adjustment (Cerebyx §2.1). Output is fosphenytoin mg PE only, because no phenytoin injection label is in hand and so there's no IV phenytoin rate.

## Warnings

| Trigger | Text (paraphrase) | Source |
|---|---|---|
| Always | Estimate only — Sheiner-Tozer biased/imprecise in ICU, head-trauma and neurology patients; use a measured free level when available | Kiang 2016; Cerebyx §2.7; Dilantin §2.5 |
| No albumin | Measured total used uncorrected | — |
| On dialysis | Coefficient 0.1 from 11 dialysis patients; imprecise; not externally validated | Kiang 2016 |
| On valproate | Valproate displaces phenytoin (free fraction +60%); equation unreliable — send a free level | Valproate label §7.2; Kiang 2016 (Ibarra) |
| <2 h after IV / <4 h after IM fosphenytoin | Immunoassays overestimate before conversion; the level won't reflect the final concentration | Cerebyx §2.5 |
| Free bands disagree | Trust the measured free level | — |
| Corrected total >20 | Above 10–20 mcg/mL | Labels |
| Capped | Capped at 10 mg/kg (… mg PE) or at 1500 mg PE | Jason; existing `fosphenytoin-load` |

## Test cases (all checkable by hand; target 15 unless stated)

| # | Inputs | Corrected total | Est. free | Reload (mg PE) | Check |
|---|---|---|---|---|---|
| 1 | total 8, alb 2.0, 70 kg | 8/0.5 = **16.0** | 1.6 | **0** (≥ target) | no warnings beyond the standard one |
| 2 | total 5, alb 2.5, 80 kg | 5/0.6 = **8.3** | 0.8 | (15−8.333)×0.7×80 = 373.3 → **350**; ≥2.3 min | cap 800 not hit |
| 3 | total 6, alb 3.0, dialysis, 70 kg | 6/0.4 = **15.0** | 1.5 | **0** (= target) | dialysis warning |
| 4 | total 12, alb 4.6, 70 kg | **12.0** (not corrected: alb ≥4.4) | 1.2 | 3×0.7×70 = 147 → **150**; ≥1 min | — |
| 5 | total 4, no alb, 60 kg | **4.0** (uncorrected) | 0.4 | 11×0.7×60 = 462 → **450**; ≥3 min | no-albumin warning |
| 6 | total 2, alb 4.0, 70 kg, target 20 | 2/0.9 = **2.2** | 0.2 | 871.1 → 850 → **700** (10 mg/kg cap); ≥4.7 min | capped = true |
| 7 | total 0, no alb, 200 kg, target 20 | **0** | 0 | 2800 → **1500** (absolute cap; 10 mg/kg = 2000); ≥10 min | capped = true |
| 8 | total 3, no alb, 63 kg, target 20 | **3.0** | 0.3 | 749.7 → 750 → **600** (630 rounded down to 600) | capped = true |
| 9 | total 9, alb 3.5, measured free 2.4, 70 kg | 9/0.8 = **11.3** | 1.1 | **0** — measured free above range [NEW — accepted]; would be 200 under decision #7 | discordance warning |
| 10 | total 6, alb 3.0, measured free 0.6, 70 kg | 6/0.7 = **8.6** | 0.9 | (15−8.571)×49 = 315 → **300**; ≥2 min | free low → reload allowed |
| 11 | total 14.7, no alb, 70 kg | **14.7** | 1.5 | 14.7 → **0** ("<25 mg PE") | — |
| 12 | total 10, alb 3.0, valproate, 1 h after IV fos, 70 kg | 10/0.7 = **14.3** | 1.4 | 35 → **50**; ≥0.3 min | valproate + early-draw warnings |
| 13 | total 10, alb 4.4, dialysis, 70 kg | 10/0.54 = **18.5** | 1.9 | **0** | dialysis variant still applies at alb ≥4.4 |
| 14 | albumin 0.5 / target 25 / total −1 | — | — | — | each throws `RangeError` |

I computed these with a scratch implementation of the algorithm above and checked them by hand. Claude Code writes the real function and tests in `src/lib/calculators.ts` / `__tests__`.

## Deprioritized (visible)
- Kane 0.29 and Anderson 0.25 coefficients: internal validation only; Kane failed external replication.
- Multivariate equations for valproate co-medication (Kiang refs 28–30): not in project knowledge; the valproate warning points to a free level instead.
- IV phenytoin (not fosphenytoin) output and rate: no phenytoin injection label supplied.
- A CrCl-based renal toggle (e.g., "CrCl <10"): not supported by the source; the toggle is dialysis only.
