// Deterministic clinical calculators. Pure functions, no I/O.
// Every calculator returns a CalcResult and has a CALCULATOR_META entry (formula, caps, rounding, sources, verify).
// Rounding conventions marked "app convention" are presentation choices, not clinical recommendations — pharmacy to confirm.
// Decision support for a clinician; not patient advice.

export type CalcResult = {
  value: number | null;
  unit: string;
  display: string;
  range?: [number, number];
  capped: boolean;
  warnings: string[];
  parts?: Record<string, number | string>;
};

export type CalcMeta = {
  id: string;
  title: string;
  formula: string;
  caps: string[];
  rounding: string;
  weightBasis: "ACTUAL" | "NOT_APPLICABLE" | "SELECTABLE";
  sources: string[];
  verify: string[]; // non-empty → blocked from a release build
};

// ---------- helpers ----------
const fix = (x: number) => Number(x.toFixed(6));
// toPrecision guards against binary drift (4.55/0.1 = 45.4999…)
export const roundTo = (x: number, step: number) => fix(Math.round(Number((x / step).toPrecision(12))) * step);
const fmt = (x: number) => (Number.isInteger(x) ? String(x) : String(fix(x)));

function req(name: string, x: number, min: number, max: number) {
  if (typeof x !== "number" || !Number.isFinite(x) || x < min || x > max)
    throw new RangeError(`${name} must be a number between ${min} and ${max}`);
}
const reqWeight = (kg: number) => req("weightKg", kg, 1, 350);

function capped(raw: number, cap: number) {
  return raw > cap ? { v: cap, capped: true } : { v: raw, capped: false };
}

// ---------- 1. Anticonvulsant loading ----------
function perKgLoad(weightKg: number, mgPerKg: number, cap: number, unit: string, step = 50): CalcResult {
  reqWeight(weightKg);
  const r = roundTo(weightKg * mgPerKg, step);
  const c = capped(r, cap);
  return {
    value: c.v,
    unit,
    display: `${fmt(c.v)} ${unit}${c.capped ? ` (capped at ${cap})` : ""}`,
    capped: c.capped,
    warnings: c.capped ? [`Weight-based dose exceeds the ${cap} ${unit} maximum — capped`] : [],
    parts: { mgPerKg, uncapped: r },
  };
}

export const levetiracetamLoad = (weightKg: number) => perKgLoad(weightKg, 60, 4500, "mg");
export const valproateLoad = (weightKg: number) => perKgLoad(weightKg, 40, 3000, "mg");
export function fosphenytoinLoad(weightKg: number): CalcResult {
  const r = perKgLoad(weightKg, 20, 1500, "mg PE");
  const minMinutes = roundTo((r.value as number) / 150, 0.1);
  return { ...r, parts: { ...r.parts, minInfusionMinutes: minMinutes }, display: `${r.display}; infuse over ≥${fmt(minMinutes)} min (≤150 mg PE/min)` };
}

export function lacosamideLoad(weightKg?: number): CalcResult {
  const warnings: string[] = [];
  if (weightKg !== undefined) {
    reqWeight(weightKg);
    if (weightKg < 50)
      warnings.push("Weight <50 kg: no adult status-epilepticus source supports weight-based lacosamide; confirm dose with pharmacy");
  }
  return { value: null, unit: "mg", range: [200, 400], display: "200–400 mg IV (fixed, NCS 2012)", capped: false, warnings };
}

// ---------- 1b. Phenytoin level correction and reload (item 7.1; spec planning/drafts/calc-phenytoin-correction.md) ----------
export type LevelBand = "BELOW" | "WITHIN" | "ABOVE";
const band = (x: number, lo: number, hi: number): LevelBand => (x < lo ? "BELOW" : x > hi ? "ABOVE" : "WITHIN");
const BAND_TEXT: Record<LevelBand, string> = { BELOW: "below", WITHIN: "within", ABOVE: "above" };

export type PhenytoinCorrectionInput = {
  measuredTotal: number; // mcg/mL
  albuminGdl?: number; // g/dL; omitted → no correction
  onDialysis?: boolean; // Mauro 1989 coefficient 0.1
  measuredFree?: number; // mcg/mL
  weightKg?: number; // actual; omitted → no reload estimate
  targetTotal?: number; // mcg/mL, default 15
  onValproate?: boolean;
  hoursSinceFosphenytoin?: number;
  fosphenytoinRoute?: "IV" | "IM";
};

export const PHENYTOIN_WARNINGS = {
  estimateOnly:
    "Estimate only — the Sheiner-Tozer equation is biased and imprecise in ICU, head-trauma and neurology patients; use a measured free level when available (Kiang 2016; Cerebyx §2.7; Dilantin §2.5)",
  noAlbumin: "No albumin entered — measured total used uncorrected",
  dialysis: "Dialysis coefficient 0.1 comes from 11 dialysis patients (Mauro 1989); imprecise and not externally validated (Kiang 2016)",
  valproate:
    "On valproate: valproate displaces phenytoin (free fraction +60%), so the equation is unreliable — send a free level (valproate label §7.2; Kiang 2016)",
  earlyDraw: (route: "IV" | "IM") =>
    `Drawn <${route === "IV" ? 2 : 4} h after ${route} fosphenytoin: immunoassays overestimate phenytoin before conversion, so the level won't reflect the final concentration (Cerebyx §2.5)`,
  discordant: (measured: LevelBand, estimated: LevelBand) =>
    `Measured free level is ${BAND_TEXT[measured]} 1–2 mcg/mL but the estimate is ${BAND_TEXT[estimated]} — trust the measured free level`,
  aboveRange: "Corrected total is above 10–20 mcg/mL",
  capped: (cap: number, perKg: boolean) => (perKg ? `Capped at 10 mg/kg (${cap} mg PE)` : `Capped at ${cap} mg PE`),
} as const;

/**
 * Sheiner-Tozer albumin correction (dialysis variant optional), estimated free level, and a fosphenytoin reload estimate.
 * Unrounded intermediates throughout; rounding only for the reported values.
 */
export function phenytoinCorrection(i: PhenytoinCorrectionInput): CalcResult {
  req("measuredTotal", i.measuredTotal, 0, 60);
  if (i.albuminGdl !== undefined) req("albuminGdl", i.albuminGdl, 1, 6);
  if (i.measuredFree !== undefined) req("measuredFree", i.measuredFree, 0, 10);
  if (i.weightKg !== undefined) reqWeight(i.weightKg);
  const target = i.targetTotal ?? 15;
  req("targetTotal", target, 10, 20);
  if (i.hoursSinceFosphenytoin !== undefined) req("hoursSinceFosphenytoin", i.hoursSinceFosphenytoin, 0, 240);
  const route = i.fosphenytoinRoute ?? "IV";
  const dialysis = i.onDialysis === true;

  const warnings: string[] = [PHENYTOIN_WARNINGS.estimateOnly];
  if (i.albuminGdl === undefined) warnings.push(PHENYTOIN_WARNINGS.noAlbumin);
  if (dialysis) warnings.push(PHENYTOIN_WARNINGS.dialysis);
  if (i.onValproate) warnings.push(PHENYTOIN_WARNINGS.valproate);
  if (i.hoursSinceFosphenytoin !== undefined && i.hoursSinceFosphenytoin < (route === "IV" ? 2 : 4))
    warnings.push(PHENYTOIN_WARNINGS.earlyDraw(route));

  // Corrected total. Denominator (coef × albumin + 0.1) is computed in tenths — (k × albumin + 1) / 10 with k = 2, or 1 on
  // dialysis — the same value without binary drift (6 / (0.1 × 3 + 0.1) would otherwise give 14.999…).
  const k = dialysis ? 1 : 2;
  const corrects = i.albuminGdl !== undefined && (dialysis || i.albuminGdl < 4.4);
  const corrected = corrects ? (i.measuredTotal * 10) / (k * (i.albuminGdl as number) + 1) : i.measuredTotal;
  const estFree = corrected * 0.1;
  const totalBand = band(corrected, 10, 20);
  const estFreeBand = band(estFree, 1, 2);
  const measuredFreeBand = i.measuredFree !== undefined ? band(i.measuredFree, 1, 2) : null;
  if (measuredFreeBand && measuredFreeBand !== estFreeBand) warnings.push(PHENYTOIN_WARNINGS.discordant(measuredFreeBand, estFreeBand));
  if (totalBand === "ABOVE") warnings.push(PHENYTOIN_WARNINGS.aboveRange);

  const correctedR = roundTo(corrected, 0.1);
  const estFreeR = roundTo(estFree, 0.1);
  const parts: Record<string, number | string> = {
    coefficient: dialysis ? 0.1 : 0.2,
    correctedTotal: correctedR,
    estimatedFree: estFreeR,
    totalBand,
    estimatedFreeBand: estFreeBand,
    corrected: corrects ? "yes" : "no",
    targetTotal: target,
  };
  if (measuredFreeBand) parts.measuredFreeBand = measuredFreeBand;

  const levelText =
    (i.measuredFree !== undefined ? `Measured free ${fmt(i.measuredFree)} mcg/mL (${BAND_TEXT[measuredFreeBand as LevelBand]} 1–2); ` : "") +
    `${corrects ? "corrected" : "uncorrected"} total ${fmt(correctedR)} mcg/mL (${BAND_TEXT[totalBand]} 10–20), est. free ${fmt(estFreeR)}`;

  let reloadText = "enter weight for a reload estimate";
  let isCapped = false;
  if (i.weightKg !== undefined) {
    const w = i.weightKg;
    let reload = 0;
    if (measuredFreeBand === "WITHIN" || measuredFreeBand === "ABOVE") {
      reloadText = "no reload — measured free level within or above 1–2 mcg/mL";
    } else if (corrected >= target) {
      reloadText = `no reload — at or above target ${fmt(target)} mcg/mL`;
    } else {
      const raw = (target - corrected) * 0.7 * w;
      const rounded = roundTo(raw, 50);
      const perKgCap = Math.floor((10 * w) / 50) * 50;
      const cap = Math.min(perKgCap, 1500);
      const c = capped(rounded, cap);
      reload = c.v;
      isCapped = c.capped;
      parts.reloadUncapped = rounded;
      if (c.capped) warnings.push(PHENYTOIN_WARNINGS.capped(cap, perKgCap < 1500));
      if (reload === 0) {
        reloadText = "calculated reload <25 mg PE — not meaningful";
      } else {
        const minMinutes = roundTo(reload / 150, 0.1);
        parts.minInfusionMinutes = minMinutes;
        reloadText = `reload ${fmt(reload)} mg PE fosphenytoin${c.capped ? " (capped)" : ""}; infuse over ≥${fmt(minMinutes)} min (≤150 mg PE/min)`;
      }
    }
    parts.reloadMgPe = reload;
  }

  const primary = i.measuredFree !== undefined ? i.measuredFree : correctedR;
  parts.primary = i.measuredFree !== undefined ? "MEASURED_FREE" : "CORRECTED_TOTAL";
  return { value: primary, unit: "mcg/mL", display: `${levelText}; ${reloadText}`, capped: isCapped, warnings, parts };
}

// ---------- 2. Cerebral edema / ICP ----------
export type HtsConcentration = "3%" | "23.4%";
const NACL_MEQ_PER_ML: Record<HtsConcentration, number> = { "3%": 0.513, "23.4%": 4.004 };

export type HtsIcpProtocol = { concentration: HtsConcentration; mlPerKg?: number; fixedMl?: number; maxMl?: number; durationMin?: number };

/** Trinity Health Michigan ICP protocol (per J. Schick, 11/2026). Fixed volumes — not weight-based. */
export const INSTITUTION_HTS_PROTOCOLS: Record<HtsConcentration, HtsIcpProtocol> = {
  "3%": { concentration: "3%", fixedMl: 250, durationMin: 30 },
  "23.4%": { concentration: "23.4%", fixedMl: 30, durationMin: 5 },
};

/** ICP bolus — volume comes ONLY from the institutional protocol (NCS 2020 / ENLS v6 give no bolus volume). */
export function hypertonicSalineIcp(
  concentration: HtsConcentration,
  opts: { weightKg?: number; protocol?: HtsIcpProtocol } = {},
): CalcResult {
  const protocol = opts.protocol ?? INSTITUTION_HTS_PROTOCOLS[concentration];
  if (!protocol || (protocol.mlPerKg === undefined && protocol.fixedMl === undefined))
    throw new Error("No institutional HTS protocol configured — NCS 2020 and ENLS v6 give no bolus volume");
  const warnings: string[] = [];
  let ml: number;
  if (protocol.fixedMl !== undefined) ml = protocol.fixedMl;
  else {
    if (opts.weightKg === undefined) throw new RangeError("weightKg required for a weight-based protocol");
    reqWeight(opts.weightKg);
    ml = roundTo(opts.weightKg * (protocol.mlPerKg as number), 10);
    if (protocol.maxMl === undefined) warnings.push("No institutional maximum volume configured");
  }
  let isCapped = false;
  if (protocol.maxMl !== undefined && ml > protocol.maxMl) { ml = protocol.maxMl; isCapped = true; warnings.push(`Capped at institutional maximum ${protocol.maxMl} mL`); }
  if (protocol.concentration === "23.4%") warnings.push("23.4% requires a central line");
  const meq = roundTo(ml * NACL_MEQ_PER_ML[protocol.concentration], 0.1);
  const over = protocol.durationMin ? ` over ${protocol.durationMin} min (${roundTo((ml / protocol.durationMin) * 60, 1)} mL/h)` : "";
  return { value: ml, unit: "mL", display: `${ml} mL ${protocol.concentration} NaCl${over}; ${meq} mEq Na`, capped: isCapped, warnings, parts: { naMeq: meq } };
}

/** Osmitrol US prescribing information, Baxter, rev. 8/2025 — section 4. */
export const MANNITOL_LABEL_CONTRAINDICATIONS = [
  "Known hypersensitivity to mannitol",
  "Anuria",
  "Severe hypovolemia",
  "Pre-existing severe pulmonary vascular congestion or pulmonary edema",
  "Active intracranial bleeding except during craniotomy",
];

export function mannitolDose(weightKg: number): CalcResult {
  reqWeight(weightKg);
  const lo = roundTo(weightKg * 0.5, 5);
  const hi = roundTo(weightKg * 1.0, 5);
  const label = roundTo(weightKg * 0.25, 5);
  return {
    value: null,
    unit: "g",
    range: [lo, hi],
    display: `${lo}–${hi} g (20%: ${lo * 5}–${hi * 5} mL) IV over 5–15 min (ENLS v6); may repeat q4–6h guided by osmolar gap`,
    capped: false,
    warnings: [
      `Label contraindications: ${MANNITOL_LABEL_CONTRAINDICATIONS.join("; ")}`,
      `Label ICP dose is lower: 0.25 g/kg (${label} g = ${label * 5} mL of 20%) over 30 min, repeat q6–8h`,
      "Label: preferably a large central vein; use a set with a final in-line filter (crystals); not through the same set as blood products",
      "Label: stop if renal, cardiac or pulmonary status worsens or CNS toxicity develops; watch for rebound ICP rise hours after a dose",
    ],
    parts: { ml20Low: lo * 5, ml20High: hi * 5, labelDoseG: label },
  };
}

/** Osmolar gap = measured − calculated (2·Na + glucose/18 + BUN/2.8), US units. */
export function osmolarGap(measuredOsm: number, naMmol: number, glucoseMgDl: number, bunMgDl: number): CalcResult {
  req("measuredOsm", measuredOsm, 200, 450); req("naMmol", naMmol, 100, 200); req("glucoseMgDl", glucoseMgDl, 10, 2000); req("bunMgDl", bunMgDl, 1, 300);
  const calc = 2 * naMmol + glucoseMgDl / 18 + bunMgDl / 2.8;
  const gap = roundTo(measuredOsm - calc, 1);
  const warnings = gap > 55 ? ["Gap above the 20–55 mOsm/kg range cited by ENLS v6 — little added benefit, AKI risk"] : [];
  return { value: gap, unit: "mOsm/kg", display: `${gap} mOsm/kg (calculated osm ${roundTo(calc, 1)})`, capped: false, warnings, parts: { calculatedOsm: roundTo(calc, 1) } };
}

// ---------- 4. LEDD (Jost 2023 Table 1) ----------
// US-available agents only. Not included: Madopar DR, piribedil, lisuride, pergolide, DHEC (not US);
// zonisamide (Jost: not for use outside Japan); anticholinergics (Jost: count only if a dose gives ≥5-point UPDRS-III gain).
export const LEVODOPA_FACTORS = {
  "levodopa-ir": 1, "levodopa-cr": 0.75, "levodopa-er-ipx066": 0.5, "levodopa-inhaled": 0.69,
  "levodopa-carbidopa-intestinal-gel": 1.11, "foslevodopa-foscarbidopa-sc": 0.75,
} as const;
export const OTHER_FACTORS = {
  "selegiline-oral": 10, "selegiline-odt": 80, rasagiline: 100,
  "pramipexole-salt": 100, "pramipexole-base": 142.86, ropinirole: 20, rotigotine: 30.3,
  "apomorphine-sc": 10, "apomorphine-sl": 1.5, bromocriptine: 10, cabergoline: 66.67,
  "amantadine-ir": 1, "amantadine-er-gocovri": 1.25, "amantadine-er-osmolex": 1,
} as const;
export const COMT_FACTORS = { entacapone: 0.33, tolcapone: 0.5, opicapone: 0.5 } as const;
export type LeddDrug = keyof typeof LEVODOPA_FACTORS | keyof typeof OTHER_FACTORS | "safinamide";
export type LeddOptions = {
  /** coveredLevodopaLed = levodopa LED taken within the COMT window (entacapone 4 h, tolcapone 8 h). Opicapone covers the whole day. */
  comt?: { drug: keyof typeof COMT_FACTORS; coveredLevodopaLed?: number };
  istradefylline?: boolean;
};

/** Total LED = levodopa LED + COMT LED + istradefylline LED + agonists/MAO-B/other. */
export function ledd(items: { drug: LeddDrug; mgPerDay: number }[], opts: LeddOptions = {}): CalcResult {
  if (!items.length) throw new RangeError("at least one drug required");
  const parts: Record<string, number> = {};
  const warnings: string[] = [];
  let levodopa = 0, other = 0;
  const add = (k: string, v: number) => (parts[k] = roundTo((parts[k] ?? 0) + v, 0.1));
  for (const { drug, mgPerDay } of items) {
    req(`${drug} mgPerDay`, mgPerDay, 0, 5000);
    if (drug in LEVODOPA_FACTORS) { const v = mgPerDay * LEVODOPA_FACTORS[drug as keyof typeof LEVODOPA_FACTORS]; levodopa += v; add(drug, v); }
    else if (drug in OTHER_FACTORS) { const v = mgPerDay * OTHER_FACTORS[drug as keyof typeof OTHER_FACTORS]; other += v; add(drug, v); }
    else if (drug === "safinamide") {
      if (mgPerDay !== 50 && mgPerDay !== 100) warnings.push("Safinamide LED is defined only for 50 or 100 mg/day");
      const v = mgPerDay > 0 ? 150 : 0; other += v; add(drug, v);
    } else throw new RangeError(`unknown drug ${drug}`);
  }
  let comt = 0;
  if (opts.comt) {
    const { drug, coveredLevodopaLed } = opts.comt;
    if (!(drug in COMT_FACTORS)) throw new RangeError(`unknown COMT inhibitor ${drug}`);
    let covered = levodopa;
    if (coveredLevodopaLed !== undefined) {
      req("coveredLevodopaLed", coveredLevodopaLed, 0, levodopa + 1e-9);
      if (drug === "opicapone") warnings.push("Opicapone covers all levodopa doses for the day — covered amount ignored");
      else covered = coveredLevodopaLed;
    } else if (drug !== "opicapone") warnings.push(`Assumed every levodopa dose falls within the ${drug} window (${drug === "entacapone" ? "4" : "8"} h)`);
    comt = covered * COMT_FACTORS[drug];
    add(drug, comt);
  }
  let istra = 0;
  if (opts.istradefylline) { istra = (levodopa + comt) * 0.2; add("istradefylline", istra); }
  const t = roundTo(levodopa + comt + istra + other, 0.1);
  return { value: t, unit: "mg/day LEDD", display: `${fmt(t)} mg/day LEDD`, capped: false, warnings, parts };
}

// ---------- 5. Renal ----------
export function cockcroftGault(ageY: number, weightKg: number, scrMgDl: number, female: boolean): CalcResult {
  req("ageY", ageY, 18, 120); reqWeight(weightKg); req("scrMgDl", scrMgDl, 0.1, 20);
  const raw = ((140 - ageY) * weightKg) / (72 * scrMgDl) * (female ? 0.85 : 1);
  const v = Math.round(raw);
  return { value: v, unit: "mL/min", display: `${v} mL/min (actual body weight)`, capped: false, warnings: [] };
}

// ---------- 6. Scores ----------
/** Hemphill 2001 UCSF derivation cohort (n=152). No patient scored 6. */
export const ICH_SCORE_MORTALITY = ["0%", "13%", "26%", "72%", "97%", "100%", "no patients in derivation cohort"];
export function ichScore(i: { gcs: number; volumeMl: number; ivh: boolean; infratentorial: boolean; ageY: number }): CalcResult {
  req("gcs", i.gcs, 3, 15); req("volumeMl", i.volumeMl, 0, 500); req("ageY", i.ageY, 18, 120);
  const parts = { gcs: i.gcs <= 4 ? 2 : i.gcs <= 12 ? 1 : 0, volume: i.volumeMl >= 30 ? 1 : 0, ivh: i.ivh ? 1 : 0, infratentorial: i.infratentorial ? 1 : 0, age: i.ageY >= 80 ? 1 : 0 };
  const v = Object.values(parts).reduce((a, b) => a + b, 0);
  const mort = ICH_SCORE_MORTALITY[v];
  return { value: v, unit: "points", display: `ICH score ${v}/6 — derivation-cohort 30-day mortality ${mort}`, capped: false, warnings: [], parts: { ...parts, mortality30d: mort } };
}

export function abcd2(i: { ageY: number; bpHigh: boolean; weakness: boolean; speechOnly: boolean; durationMin: number; diabetes: boolean }): CalcResult {
  req("ageY", i.ageY, 18, 120); req("durationMin", i.durationMin, 0, 1440);
  const clinical = i.weakness ? 2 : i.speechOnly ? 1 : 0;
  const duration = i.durationMin >= 60 ? 2 : i.durationMin >= 10 ? 1 : 0;
  const parts = { age: i.ageY >= 60 ? 1 : 0, bp: i.bpHigh ? 1 : 0, clinical, duration, diabetes: i.diabetes ? 1 : 0 };
  const v = Object.values(parts).reduce((a, b) => a + b, 0);
  return { value: v, unit: "points", display: `ABCD2 ${v}/7`, capped: false, warnings: v >= 4 ? [] : ["ABCD2 misses posterior-circulation signs, mechanism and stenosis — image vessels regardless (Amin 2023)"], parts };
}

export function cha2ds2Vasc(i: { chf: boolean; htn: boolean; ageY: number; diabetes: boolean; strokeTiaTe: boolean; vascular: boolean; female: boolean }): CalcResult {
  req("ageY", i.ageY, 18, 120);
  const parts = { chf: +i.chf, htn: +i.htn, age: i.ageY >= 75 ? 2 : i.ageY >= 65 ? 1 : 0, diabetes: +i.diabetes, stroke: i.strokeTiaTe ? 2 : 0, vascular: +i.vascular, sex: +i.female };
  const v = Object.values(parts).reduce((a, b) => a + b, 0);
  return { value: v, unit: "points", display: `CHA₂DS₂-VASc ${v}/9`, capped: false, warnings: [], parts };
}

export function hasBled(i: { htn: boolean; renal: boolean; liver: boolean; stroke: boolean; bleeding: boolean; labileInr: boolean; ageY: number; drugs: boolean; alcohol: boolean }): CalcResult {
  req("ageY", i.ageY, 18, 120);
  const parts = { htn: +i.htn, renal: +i.renal, liver: +i.liver, stroke: +i.stroke, bleeding: +i.bleeding, labileInr: +i.labileInr, elderly: i.ageY > 65 ? 1 : 0, drugs: +i.drugs, alcohol: +i.alcohol };
  const v = Object.values(parts).reduce((a, b) => a + b, 0);
  return { value: v, unit: "points", display: `HAS-BLED ${v}/9`, capped: false, warnings: [], parts };
}

// ---------- 7. Thrombolytics ----------
export function tnkDose(weightKg: number, opts: { exactWeightUnder50?: boolean } = {}): CalcResult {
  reqWeight(weightKg);
  let mg: number;
  const warnings: string[] = [];
  if (weightKg < 50 && opts.exactWeightUnder50) {
    mg = roundTo(Math.floor(weightKg) * 0.25, 0.25);
    warnings.push("1-kg band dosing — requires an accurate measured weight");
  } else {
    mg = weightKg < 60 ? 15 : weightKg < 70 ? 17.5 : weightKg < 80 ? 20 : weightKg < 90 ? 22.5 : 25;
  }
  const ml = roundTo(mg / 5, 0.05);
  return { value: mg, unit: "mg", display: `${fmt(mg)} mg (${fmt(ml)} mL at 5 mg/mL) IV push over 5–10 s`, capped: weightKg >= 100, warnings: [...warnings, "Stroke dose — the STEMI chart is double; don't use it"], parts: { ml } };
}

export function alteplaseDose(weightKg: number): CalcResult {
  reqWeight(weightKg);
  const c = capped(roundTo(weightKg * 0.9, 0.1), 90);
  const bolus = roundTo(c.v * 0.1, 0.1);
  const infusion = roundTo(c.v - bolus, 0.1);
  return {
    value: c.v, unit: "mg",
    display: `${fmt(c.v)} mg total: ${fmt(bolus)} mg bolus over 1 min, ${fmt(infusion)} mg over 60 min (1 mg/mL)`,
    capped: c.capped, warnings: c.capped ? ["Capped at 90 mg"] : [], parts: { bolus, infusion },
  };
}

// ---------- 8. Immunotherapy ----------
export function idealBodyWeight(heightCm: number, female: boolean) {
  req("heightCm", heightCm, 120, 230);
  const inchesOver60 = Math.max(0, heightCm / 2.54 - 60);
  return fix((female ? 45.5 : 50) + 2.3 * inchesOver60);
}
export function adjustedBodyWeight(weightKg: number, heightCm: number, female: boolean) {
  const ibw = idealBodyWeight(heightCm, female);
  return weightKg <= ibw ? weightKg : fix(ibw + 0.4 * (weightKg - ibw));
}

export function ivigDose(dosingWeightKg: number, opts: { days?: 2 | 3 | 4 | 5; totalGPerKg?: number } = {}): CalcResult {
  reqWeight(dosingWeightKg);
  const days = opts.days ?? 5;
  const total = opts.totalGPerKg ?? 2;
  const daily = roundTo((dosingWeightKg * total) / days, 5);
  return {
    value: daily * days, unit: "g",
    display: `${daily} g/day × ${days} days (${daily * days} g total; ${total} g/kg)`,
    capped: false, warnings: [], parts: { dailyG: daily, days },
  };
}

// ---------- 9. Hyponatremia ----------
export function hyponatremiaBolus(mode: "ese" | "salsa-moderate" | "salsa-severe", weightKg?: number): CalcResult {
  if (mode === "ese") return { value: 150, unit: "mL", display: "150 mL 3% NaCl over 20 min; recheck Na; repeat up to 2 more times until +5 mmol/L", capped: false, warnings: [] };
  if (weightKg === undefined) throw new RangeError("weightKg required for SALSA dosing");
  reqWeight(weightKg);
  const perKg = mode === "salsa-moderate" ? 2 : 4;
  const ml = roundTo(weightKg * perKg, 10);
  return { value: ml, unit: "mL", display: `${ml} mL 3% NaCl (${perKg} mL/kg, SALSA bolus arm)`, capped: false, warnings: [], parts: { mlPerKg: perKg } };
}

/** ESE 2014: ≤10 mmol/L in the first 24 h (≤8 if ODS risk), then ≤8 per 24 h. */
export function sodiumCorrectionCheck(i: { startNa: number; currentNa: number; periodNumber: number; odsRisk: boolean }): CalcResult {
  req("startNa", i.startNa, 95, 160); req("currentNa", i.currentNa, 95, 175); req("periodNumber", i.periodNumber, 1, 10);
  const limit = i.periodNumber === 1 && !i.odsRisk ? 10 : 8;
  const rise = roundTo(i.currentNa - i.startNa, 1);
  const over = rise > limit;
  return {
    value: rise, unit: "mmol/L", display: `Rise ${fmt(rise)} mmol/L in this 24-h period (limit ${limit})`,
    capped: false, warnings: over ? ["Limit exceeded — re-lower with D5W ± desmopressin (ESE 2014) and involve nephrology"] : [], parts: { limit },
  };
}

// ---------- metadata ----------
const S = {
  aes2016: "Glauser T, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults (AES). Epilepsy Curr 2016;16(1):48-61. doi:10.5698/1535-7597-16.1.48",
  ncs2012: "Brophy GM, et al. Guidelines for the evaluation and management of status epilepticus (NCS). Neurocrit Care 2012;17(1):3-23. doi:10.1007/s12028-012-9695-z",
  esett2019: "Kapur J, et al. Randomized trial of three anticonvulsant medications for status epilepticus (ESETT). N Engl J Med 2019;381(22):2103-2113. doi:10.1056/NEJMoa1905795",
  ncs2020: "Cook AM, et al. Guidelines for the acute treatment of cerebral edema in neurocritical care patients (NCS). Neurocrit Care 2020;32(3):647-666. doi:10.1007/s12028-020-00959-7",
  enls6: "Bhalla P, Dingman JS, Aysenne A. Emergency Neurological Life Support: Intracranial Hypertension and Herniation Protocol, version 6.0. Neurocritical Care Society; 2024",
  aha2026: "Prabhakaran S, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (AHA/ASA). Stroke 2026;57:e316-e436. doi:10.1161/STR.0000000000000513",
  tnkLabel: "TNKase (tenecteplase) US prescribing information. Genentech; revised 2/2025 (label text via Drugs.com, accessed 2026-11-04)",
  activase: "Activase (alteplase) US prescribing information. Genentech; revised 9/2022 (user-supplied label)",
  amin2023: "Amin HP, et al. Diagnosis, Workup, Risk Reduction of Transient Ischemic Attack in the Emergency Department Setting: A Scientific Statement From the AHA. Stroke 2023;54:e109-e121. doi:10.1161/STR.0000000000000418",
  ese2014: "Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014;170(3):G1-G47. doi:10.1530/EJE-13-1020",
  salsa2021: "Baek SH, et al. Risk of overcorrection in rapid intermittent bolus vs slow continuous infusion therapies of hypertonic saline for symptomatic hyponatremia (SALSA). JAMA Intern Med 2021;181(1):81-92. doi:10.1001/jamainternmed.2020.5519",
  gbs2023: "van Doorn PA, et al. EAN/PNS guideline on diagnosis and treatment of Guillain-Barré syndrome. Eur J Neurol 2023;30(12):3646-3674. doi:10.1111/ene.16073",
  xarelto: "Xarelto (rivaroxaban) US prescribing information. Janssen; revised 3/2026 (user-supplied label)",
  kiang2016: "Kiang TK, Ensom MH. A comprehensive review on the predictive performance of the Sheiner-Tozer and derivative equations for the correction of phenytoin concentrations. Ann Pharmacother 2016;50(4):311-325. doi:10.1177/1060028016628166",
  cerebyx: "Cerebyx (fosphenytoin sodium) injection US prescribing information. Pfizer; revised 5/2025 (user-supplied label)",
  dilantin: "Dilantin (extended phenytoin sodium capsules) US prescribing information. Viatris; revised 8/2023 (DailyMed setid 86dd27d1-9cee-48ae-b55d-e2d2f7dbc593, accessed 2026-11-06)",
  vpaIv: "Valproate sodium injection US prescribing information. Hikma; revised 12/2023 (user-supplied label)",
};

export const CALCULATOR_META: Record<string, CalcMeta> = {
  "levetiracetam-load": { id: "levetiracetam-load", title: "Levetiracetam load", formula: "60 mg/kg", caps: ["4500 mg"], rounding: "nearest 50 mg, cap after rounding (app convention)", weightBasis: "ACTUAL", sources: [S.aes2016, S.esett2019], verify: [] },
  "valproate-load": { id: "valproate-load", title: "Valproate load", formula: "40 mg/kg", caps: ["3000 mg"], rounding: "nearest 50 mg, cap after rounding (app convention)", weightBasis: "ACTUAL", sources: [S.aes2016, S.esett2019], verify: [] },
  "fosphenytoin-load": { id: "fosphenytoin-load", title: "Fosphenytoin load", formula: "20 mg PE/kg; min infusion time = dose / 150 mg PE/min", caps: ["1500 mg PE", "150 mg PE/min"], rounding: "nearest 50 mg PE (= whole mL at 50 mg PE/mL; app convention)", weightBasis: "ACTUAL", sources: [S.aes2016, S.esett2019], verify: [] },
  "lacosamide-load": { id: "lacosamide-load", title: "Lacosamide load", formula: "fixed 200–400 mg IV", caps: [], rounding: "none", weightBasis: "NOT_APPLICABLE", sources: [S.ncs2012], verify: [] },
  "phenytoin-correction": {
    id: "phenytoin-correction",
    title: "Phenytoin level: albumin correction and reload estimate",
    formula: "Corrected total = measured total / (0.2 × albumin + 0.1) [Sheiner-Tozer]; on dialysis: / (0.1 × albumin + 0.1) [Mauro 1989]. Albumin g/dL, phenytoin mcg/mL. Not corrected if albumin not entered, or albumin ≥4.4 g/dL on the standard equation. Estimated free = corrected × 0.1. Reload (mg PE) = (target − corrected) × 0.7 L/kg × actual weight; target default 15 (10–20)",
    caps: ["10 mg PE/kg (rounded down to 50 mg PE)", "1500 mg PE", "150 mg PE/min"],
    rounding: "Corrected total and estimated free to 0.1 mcg/mL; reload to nearest 50 mg PE (= whole mL at 50 mg PE/mL), then cap (app convention)",
    weightBasis: "ACTUAL",
    sources: [S.kiang2016, S.cerebyx, S.dilantin, S.vpaIv],
    verify: [],
  },
  "hypertonic-saline-bolus": { id: "hypertonic-saline-bolus", title: "Hypertonic saline (ICP)", formula: "institutional protocol: 3% 250 mL over 30 min; 23.4% 30 mL over 5 min (central line). Na mEq = mL × 0.513 (3%) or 4.004 (23.4%)", caps: ["fixed volume per protocol"], rounding: "none (fixed volume)", weightBasis: "NOT_APPLICABLE", sources: ["Trinity Health Michigan neuro ICU protocol (provided by J. Schick, 11/2026)", S.ncs2020, S.enls6], verify: [] },
  "mannitol-dose": { id: "mannitol-dose", title: "Mannitol 20%", formula: "0.5–1 g/kg; mL = g × 5; osmolar gap = measured − (2Na + glucose/18 + BUN/2.8)", caps: [], rounding: "nearest 5 g", weightBasis: "ACTUAL", sources: [S.enls6, S.ncs2020, "Osmitrol (mannitol injection) US prescribing information. Baxter; revised 8/2025"], verify: [] },
  ledd: { id: "ledd", title: "Levodopa equivalent daily dose", formula: "Σ (daily dose × factor) for levodopa, agonists, MAO-B, amantadine; + COMT LED = covered levodopa LED × 0.33 (entacapone) or 0.5 (tolcapone, opicapone); + istradefylline = (levodopa + COMT LED) × 0.2; safinamide 50/100 mg = 150", caps: [], rounding: "0.1 mg", weightBasis: "NOT_APPLICABLE", sources: ["Jost ST, et al. Levodopa dose equivalency in Parkinson's disease: updated systematic review and proposals. Mov Disord 2023;38(7):1236-1252"], verify: [] },
  "cockcroft-gault": { id: "cockcroft-gault", title: "Creatinine clearance (Cockcroft-Gault)", formula: "(140 − age) × weight / (72 × SCr) × 0.85 if female", caps: [], rounding: "nearest 1 mL/min", weightBasis: "ACTUAL", sources: [S.xarelto, "Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron 1976;16:31-41"], verify: [] },
  "ich-score": { id: "ich-score", title: "ICH score", formula: "GCS 3–4 = 2, 5–12 = 1, 13–15 = 0; volume ≥30 cm³ (ABC/2) 1; IVH 1; infratentorial 1; age ≥80 1. GCS as at ED transfer in the derivation study", caps: ["0–6"], rounding: "integer", weightBasis: "NOT_APPLICABLE", sources: ["Hemphill JC 3rd, et al. The ICH score: a simple, reliable grading scale for intracerebral hemorrhage. Stroke 2001;32:891-897"], verify: [] },
  abcd2: { id: "abcd2", title: "ABCD2", formula: "age ≥60 1; BP ≥140/90 1; unilateral weakness 2 or speech only 1; duration ≥60 min 2, 10–59 1; diabetes 1", caps: ["0–7"], rounding: "integer", weightBasis: "NOT_APPLICABLE", sources: [S.amin2023], verify: [] },
  "cha2ds2-vasc": { id: "cha2ds2-vasc", title: "CHA₂DS₂-VASc", formula: "CHF/LV dysfunction 1, HTN 1, age ≥75 2, DM 1, stroke/TIA/TE 2, vascular disease 1, age 65–74 1, female 1", caps: ["0–9"], rounding: "integer", weightBasis: "NOT_APPLICABLE", sources: ["Lip GYH, et al. Refining clinical risk stratification for predicting stroke and thromboembolism in AF. Chest 2010;137(2):263-272", "Lip GYH, et al. CHA2DS2-VASc risk scheme: response. Chest 2010;138(4):1020-1021"], verify: [] },
  "has-bled": { id: "has-bled", title: "HAS-BLED", formula: "1 point each: HTN (uncontrolled, SBP >160); renal (dialysis, transplant, Cr >2.26 mg/dL); liver (cirrhosis, or bilirubin >2× normal with AST/ALT/AP >3× normal); stroke history; prior major bleeding or predisposition; labile INR (TTR <60%); age >65; drugs (antiplatelets, NSAIDs); alcohol ≥8 drinks/week", caps: ["0–9"], rounding: "integer", weightBasis: "NOT_APPLICABLE", sources: ["Pisters R, et al. A novel user-friendly score (HAS-BLED) to assess 1-year risk of major bleeding in patients with atrial fibrillation. Chest 2010;138:1093-1100 (as summarized by MDCalc; primary article not reviewed)"], verify: [] },
  "tnk-dose": { id: "tnk-dose", title: "Tenecteplase (stroke)", formula: "0.25 mg/kg via 10-kg bands; optional 1-kg dosing <50 kg", caps: ["25 mg"], rounding: "label band chart", weightBasis: "ACTUAL", sources: [S.aha2026, S.tnkLabel], verify: [] },
  "alteplase-dose": { id: "alteplase-dose", title: "Alteplase (stroke)", formula: "0.9 mg/kg; 10% bolus, 90% over 60 min", caps: ["90 mg"], rounding: "0.1 mg", weightBasis: "ACTUAL", sources: [S.aha2026, S.activase], verify: [] },
  "ivig-dose": { id: "ivig-dose", title: "IVIG", formula: "2 g/kg total over 2–5 days", caps: [], rounding: "daily dose to nearest 5 g (app convention)", weightBasis: "SELECTABLE", sources: [S.gbs2023], verify: [] },
  "sodium-correction": { id: "sodium-correction", title: "Hyponatremia: 3% bolus and correction limits", formula: "ESE 150 mL; SALSA 2 or 4 mL/kg; limit ≤10 (≤8 if ODS risk) first 24 h, ≤8 thereafter", caps: [], rounding: "nearest 10 mL", weightBasis: "ACTUAL", sources: [S.ese2014, S.salsa2021], verify: [] },
};
