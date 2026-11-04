/**
 * Deterministic clinical calculators (see CALCULATORS.md).
 * Pure functions only: no I/O, no randomness, no Date.
 * Weight-based doses are capped BEFORE rounding and rounded to actionable values.
 */

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const DOSE_ROUNDING_MG = 10;
export const LACOSAMIDE_FIXED_LOAD_MG = 400;
export const LACOSAMIDE_MG_PER_KG = 5;
/** Below this weight the weight-based lacosamide load (5 mg/kg) is used instead of the fixed 400 mg. */
export const LACOSAMIDE_LOW_WEIGHT_THRESHOLD_KG = 50;
export const HYPERTONIC_SALINE_ML_PER_KG = 2;
export const HYPERTONIC_SALINE_INFUSION_MIN = 20;
export const MANNITOL_G_PER_KG_LOW = 0.5;
export const MANNITOL_G_PER_KG_HIGH = 1.0;
export const MANNITOL_20_PERCENT_G_PER_ML = 0.2;
export const MANNITOL_OSM_LIMIT_MOSM_KG = 320;
export const CSF_PROTEIN_MG_DL_PER_1000_RBC = 1.1;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AnticonvulsantId = 'levetiracetam' | 'valproate' | 'fosphenytoin' | 'lacosamide';

export interface AnticonvulsantLoadResult {
  id: AnticonvulsantId;
  name: string;
  /** Final recommended load, rounded and capped. */
  doseMg: number;
  /** Unit label: "mg" or "mg PE". */
  unit: 'mg' | 'mg PE';
  /** Dose before capping/rounding (for transparency). */
  rawDoseMg: number;
  capMg: number;
  capApplied: boolean;
  /** Human-readable basis, e.g. "60 mg/kg × 70 kg". */
  basis: string;
}

export interface HypertonicSalineResult {
  volumeMl: number;
  infusionMinutes: number;
  rateMlPerHr: number;
}

export interface MannitolInput {
  weightKg: number;
  serumOsmolality?: number | null;
  severeAki?: boolean;
}

export interface MannitolResult {
  contraindicated: boolean;
  contraindicationReasons: string[];
  doseLowG: number;
  doseHighG: number;
  volumeLowMl: number;
  volumeHighMl: number;
}

export interface CsfProteinInput {
  measuredProteinMgDl: number;
  csfRbcPerUl: number;
  /** Required for the exact method. */
  bloodRbcPerUl?: number;
  /** Serum/blood protein in mg/dL. Required for the exact method. */
  bloodProteinMgDl?: number;
}

export interface CsfProteinResult {
  method: 'exact' | 'approximation';
  correctedProteinMgDl: number;
  subtractedMgDl: number;
  /** True if the raw result was negative and was clamped to 0. */
  clampedToZero: boolean;
}

export type LeddDrugId =
  | 'carbidopaLevodopaIR'
  | 'carbidopaLevodopaCR'
  | 'ropinirole'
  | 'pramipexole'
  | 'rotigotine'
  | 'selegiline'
  | 'rasagiline';

export interface LeddDrug {
  id: LeddDrugId;
  name: string;
  factor: number;
  unitNote: string;
}

export type LeddInput = Partial<Record<LeddDrugId, number>>;

export interface LeddResult {
  totalLedd: number;
  breakdown: Array<{ id: LeddDrugId; name: string; dailyDoseMg: number; ledd: number }>;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function assertPositiveFinite(value: number, label: string): void {
  if (!Number.isFinite(value) || value <= 0) {
    throw new RangeError(`${label} must be a positive, finite number`);
  }
}

function assertNonNegativeFinite(value: number, label: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${label} must be a non-negative, finite number`);
  }
}

export function roundToNearest(value: number, step: number): number {
  return Math.round(value / step) * step;
}

/** Round to a fixed number of decimals while avoiding float artefacts (e.g. 1.005). */
export function roundTo(value: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * f) / f;
}

// ---------------------------------------------------------------------------
// 1. Anticonvulsant loading
// ---------------------------------------------------------------------------

interface WeightBasedSpec {
  id: Exclude<AnticonvulsantId, 'lacosamide'>;
  name: string;
  mgPerKg: number;
  capMg: number;
  unit: 'mg' | 'mg PE';
}

const WEIGHT_BASED_SPECS: Record<WeightBasedSpec['id'], WeightBasedSpec> = {
  levetiracetam: { id: 'levetiracetam', name: 'Levetiracetam (Keppra)', mgPerKg: 60, capMg: 4500, unit: 'mg' },
  valproate: { id: 'valproate', name: 'Valproic acid (Depacon)', mgPerKg: 40, capMg: 3000, unit: 'mg' },
  fosphenytoin: { id: 'fosphenytoin', name: 'Fosphenytoin (Cerebyx)', mgPerKg: 20, capMg: 1500, unit: 'mg PE' },
};

function weightBasedLoad(spec: WeightBasedSpec, weightKg: number): AnticonvulsantLoadResult {
  assertPositiveFinite(weightKg, 'Weight');
  const raw = spec.mgPerKg * weightKg;
  const capped = Math.min(raw, spec.capMg);
  return {
    id: spec.id,
    name: spec.name,
    doseMg: Math.min(roundToNearest(capped, DOSE_ROUNDING_MG), spec.capMg),
    unit: spec.unit,
    rawDoseMg: roundTo(raw, 1),
    capMg: spec.capMg,
    capApplied: raw > spec.capMg,
    basis: `${spec.mgPerKg} ${spec.unit === 'mg PE' ? 'mg PE' : 'mg'}/kg × ${weightKg} kg`,
  };
}

export function levetiracetamLoad(weightKg: number): AnticonvulsantLoadResult {
  return weightBasedLoad(WEIGHT_BASED_SPECS.levetiracetam, weightKg);
}

export function valproateLoad(weightKg: number): AnticonvulsantLoadResult {
  return weightBasedLoad(WEIGHT_BASED_SPECS.valproate, weightKg);
}

export function fosphenytoinLoad(weightKg: number): AnticonvulsantLoadResult {
  return weightBasedLoad(WEIGHT_BASED_SPECS.fosphenytoin, weightKg);
}

/**
 * Lacosamide: 400 mg fixed load; 5 mg/kg when weight is below
 * LACOSAMIDE_LOW_WEIGHT_THRESHOLD_KG (never exceeds 400 mg).
 */
export function lacosamideLoad(weightKg: number): AnticonvulsantLoadResult {
  assertPositiveFinite(weightKg, 'Weight');
  const useWeightBased = weightKg < LACOSAMIDE_LOW_WEIGHT_THRESHOLD_KG;
  const raw = useWeightBased ? LACOSAMIDE_MG_PER_KG * weightKg : LACOSAMIDE_FIXED_LOAD_MG;
  const capped = Math.min(raw, LACOSAMIDE_FIXED_LOAD_MG);
  return {
    id: 'lacosamide',
    name: 'Lacosamide (Vimpat)',
    doseMg: Math.min(roundToNearest(capped, DOSE_ROUNDING_MG), LACOSAMIDE_FIXED_LOAD_MG),
    unit: 'mg',
    rawDoseMg: roundTo(raw, 1),
    capMg: LACOSAMIDE_FIXED_LOAD_MG,
    capApplied: raw > LACOSAMIDE_FIXED_LOAD_MG,
    basis: useWeightBased
      ? `${LACOSAMIDE_MG_PER_KG} mg/kg × ${weightKg} kg (weight < ${LACOSAMIDE_LOW_WEIGHT_THRESHOLD_KG} kg)`
      : `${LACOSAMIDE_FIXED_LOAD_MG} mg fixed load`,
  };
}

export function allAnticonvulsantLoads(weightKg: number): AnticonvulsantLoadResult[] {
  return [
    levetiracetamLoad(weightKg),
    valproateLoad(weightKg),
    fosphenytoinLoad(weightKg),
    lacosamideLoad(weightKg),
  ];
}

// ---------------------------------------------------------------------------
// 2. Cerebral edema / ICP
// ---------------------------------------------------------------------------

/** 3% saline: 2 mL/kg over 20 minutes. Volume rounded to whole mL; rate to whole mL/hr. */
export function hypertonicSalineBolus(weightKg: number): HypertonicSalineResult {
  assertPositiveFinite(weightKg, 'Weight');
  const volumeMl = Math.round(HYPERTONIC_SALINE_ML_PER_KG * weightKg);
  return {
    volumeMl,
    infusionMinutes: HYPERTONIC_SALINE_INFUSION_MIN,
    rateMlPerHr: Math.round((volumeMl * 60) / HYPERTONIC_SALINE_INFUSION_MIN),
  };
}

/**
 * Mannitol 20% (0.2 g/mL): 0.5–1.0 g/kg. Contraindicated if serum osm > 320 mOsm/kg
 * or severe AKI. Doses are still returned so the UI can show them struck-through.
 */
export function mannitolDose(input: MannitolInput): MannitolResult {
  assertPositiveFinite(input.weightKg, 'Weight');
  const reasons: string[] = [];
  if (input.serumOsmolality != null) {
    assertNonNegativeFinite(input.serumOsmolality, 'Serum osmolality');
    if (input.serumOsmolality > MANNITOL_OSM_LIMIT_MOSM_KG) {
      reasons.push(`Serum osmolality ${input.serumOsmolality} > ${MANNITOL_OSM_LIMIT_MOSM_KG} mOsm/kg`);
    }
  }
  if (input.severeAki) reasons.push('Severe acute kidney injury');

  const doseLowG = roundTo(MANNITOL_G_PER_KG_LOW * input.weightKg, 1);
  const doseHighG = roundTo(MANNITOL_G_PER_KG_HIGH * input.weightKg, 1);
  return {
    contraindicated: reasons.length > 0,
    contraindicationReasons: reasons,
    doseLowG,
    doseHighG,
    volumeLowMl: Math.round(doseLowG / MANNITOL_20_PERCENT_G_PER_ML),
    volumeHighMl: Math.round(doseHighG / MANNITOL_20_PERCENT_G_PER_ML),
  };
}

// ---------------------------------------------------------------------------
// 3. CSF traumatic-tap protein correction
// ---------------------------------------------------------------------------

/**
 * Exact method when both blood RBC and blood protein are supplied:
 *   corrected = measured − (CSF RBC / blood RBC) × blood protein
 * Otherwise the approximation: subtract 1.1 mg/dL per 1000 CSF RBC/µL.
 * Result is rounded to 0.1 mg/dL and never negative.
 */
export function correctCsfProtein(input: CsfProteinInput): CsfProteinResult {
  assertNonNegativeFinite(input.measuredProteinMgDl, 'Measured protein');
  assertNonNegativeFinite(input.csfRbcPerUl, 'CSF RBC');

  const useExact = input.bloodRbcPerUl != null && input.bloodProteinMgDl != null;
  let subtracted: number;
  if (useExact) {
    assertPositiveFinite(input.bloodRbcPerUl as number, 'Blood RBC');
    assertNonNegativeFinite(input.bloodProteinMgDl as number, 'Blood protein');
    subtracted = (input.csfRbcPerUl / (input.bloodRbcPerUl as number)) * (input.bloodProteinMgDl as number);
  } else {
    subtracted = (input.csfRbcPerUl / 1000) * CSF_PROTEIN_MG_DL_PER_1000_RBC;
  }

  const raw = input.measuredProteinMgDl - subtracted;
  return {
    method: useExact ? 'exact' : 'approximation',
    correctedProteinMgDl: roundTo(Math.max(raw, 0), 1),
    subtractedMgDl: roundTo(subtracted, 1),
    clampedToZero: raw < 0,
  };
}

// ---------------------------------------------------------------------------
// 4. Levodopa equivalent daily dose (LEDD)
// ---------------------------------------------------------------------------

export const LEDD_DRUGS: readonly LeddDrug[] = [
  { id: 'carbidopaLevodopaIR', name: 'Carbidopa/Levodopa IR', factor: 1.0, unitNote: 'mg levodopa/day' },
  { id: 'carbidopaLevodopaCR', name: 'Carbidopa/Levodopa CR/ER', factor: 0.75, unitNote: 'mg levodopa/day' },
  { id: 'ropinirole', name: 'Ropinirole', factor: 20, unitNote: 'mg/day' },
  { id: 'pramipexole', name: 'Pramipexole', factor: 100, unitNote: 'mg/day (salt)' },
  { id: 'rotigotine', name: 'Rotigotine patch', factor: 30, unitNote: 'mg/24 h patch' },
  { id: 'selegiline', name: 'Selegiline', factor: 100, unitNote: 'mg/day' },
  { id: 'rasagiline', name: 'Rasagiline', factor: 100, unitNote: 'mg/day' },
];

/** Sum LEDD across drugs. Omitted/zero entries are ignored; result rounded to whole mg. */
export function calculateLedd(doses: LeddInput): LeddResult {
  const breakdown: LeddResult['breakdown'] = [];
  let total = 0;
  for (const drug of LEDD_DRUGS) {
    const dose = doses[drug.id];
    if (dose == null || dose === 0) continue;
    assertNonNegativeFinite(dose, `${drug.name} dose`);
    const ledd = dose * drug.factor;
    total += ledd;
    breakdown.push({ id: drug.id, name: drug.name, dailyDoseMg: dose, ledd: roundTo(ledd, 1) });
  }
  return { totalLedd: Math.round(total), breakdown };
}
