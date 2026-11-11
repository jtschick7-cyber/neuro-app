// R3 proposed excerpt of src/lib/calculators.ts. Reference only; not compiled.
// Changed vs current/calculators-excerpt.ts: docstring, the warning string, CALCULATOR_META formula and sources.
// Logic (limit selection, rounding, ranges) is UNCHANGED.

/** ESE 2014: ≤10 mmol/L in the first 24 h, then ≤8 per 24 h. High ODS risk: ≤8 in any 24 h (Verbalis 2013). */
export function sodiumCorrectionCheck(i: { startNa: number; currentNa: number; periodNumber: number; odsRisk: boolean }): CalcResult {
  req("startNa", i.startNa, 95, 160); req("currentNa", i.currentNa, 95, 175); req("periodNumber", i.periodNumber, 1, 10);
  const limit = i.periodNumber === 1 && !i.odsRisk ? 10 : 8;
  const rise = roundTo(i.currentNa - i.startNa, 1);
  const over = rise > limit;
  return {
    value: rise, unit: "mmol/L", display: `Rise ${fmt(rise)} mmol/L in this 24-h period (limit ${limit})`,
    capped: false, warnings: over ? ["Limit exceeded — re-lower with D5W ± desmopressin (ESE 2014; ODS risk: Verbalis 2013) and involve nephrology"] : [], parts: { limit },
  };
}

// CALCULATOR_META entry
  "sodium-correction": { id: "sodium-correction", title: "Hyponatremia: 3% bolus and correction limits", formula: "ESE 150 mL; SALSA 2 or 4 mL/kg; limit ≤10 first 24 h, then ≤8 (ESE); ≤8 in any 24 h if ODS risk (Verbalis)", caps: [], rounding: "nearest 10 mL", weightBasis: "ACTUAL", sources: [S.ese2014, S.salsa2021, S.verbalis2013], verify: [] },

// New source constant (add beside S.ese2014 / S.salsa2021, same shape as those entries):
//   verbalis2013: "Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med 2013;126(10 Suppl 1):S1-S42. doi:10.1016/j.amjmed.2013.07.006"
