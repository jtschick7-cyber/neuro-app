import { describe, expect, it } from 'vitest';
import {
  allAnticonvulsantLoads,
  calculateLedd,
  correctCsfProtein,
  fosphenytoinLoad,
  hypertonicSalineBolus,
  lacosamideLoad,
  levetiracetamLoad,
  mannitolDose,
  valproateLoad,
} from '../src/lib/calculators';

describe('weight-based anticonvulsant loads', () => {
  it('levetiracetam 60 mg/kg', () => {
    const r = levetiracetamLoad(70);
    expect(r.doseMg).toBe(4200);
    expect(r.capApplied).toBe(false);
  });

  it('levetiracetam caps at 4500 mg', () => {
    const r = levetiracetamLoad(100);
    expect(r.doseMg).toBe(4500);
    expect(r.capApplied).toBe(true);
    expect(r.rawDoseMg).toBe(6000);
  });

  it('levetiracetam at exactly the cap weight (75 kg) is not flagged as capped', () => {
    const r = levetiracetamLoad(75);
    expect(r.doseMg).toBe(4500);
    expect(r.capApplied).toBe(false);
  });

  it('valproate 40 mg/kg, capped at 3000 mg', () => {
    expect(valproateLoad(60).doseMg).toBe(2400);
    expect(valproateLoad(75).doseMg).toBe(3000);
    const heavy = valproateLoad(120);
    expect(heavy.doseMg).toBe(3000);
    expect(heavy.capApplied).toBe(true);
  });

  it('fosphenytoin 20 mg PE/kg, capped at 1500 mg PE', () => {
    const r = fosphenytoinLoad(70);
    expect(r.doseMg).toBe(1400);
    expect(r.unit).toBe('mg PE');
    const heavy = fosphenytoinLoad(110);
    expect(heavy.doseMg).toBe(1500);
    expect(heavy.capApplied).toBe(true);
  });

  it('rounds to the nearest 10 mg', () => {
    expect(levetiracetamLoad(72.3).doseMg).toBe(4340); // 4338 -> 4340
    expect(valproateLoad(63.4).doseMg).toBe(2540); // 2536 -> 2540
    expect(fosphenytoinLoad(63.7).doseMg).toBe(1270); // 1274 -> 1270
  });

  it('lacosamide is a fixed 400 mg for typical and large adults', () => {
    expect(lacosamideLoad(70).doseMg).toBe(400);
    expect(lacosamideLoad(150).doseMg).toBe(400);
    expect(lacosamideLoad(250).doseMg).toBe(400);
  });

  it('lacosamide uses 5 mg/kg at low extremes of weight and never exceeds 400 mg', () => {
    const r = lacosamideLoad(40);
    expect(r.doseMg).toBe(200);
    expect(r.basis).toContain('5 mg/kg');
    expect(lacosamideLoad(49.9).doseMg).toBeLessThan(400);
    expect(lacosamideLoad(50).doseMg).toBe(400);
  });

  it('allAnticonvulsantLoads returns all four agents in order', () => {
    const r = allAnticonvulsantLoads(80);
    expect(r.map((x) => x.id)).toEqual(['levetiracetam', 'valproate', 'fosphenytoin', 'lacosamide']);
    expect(r.map((x) => x.doseMg)).toEqual([4500, 3000, 1500, 400]);
  });

  it.each([0, -5, NaN, Infinity])('rejects invalid weight %s', (w) => {
    expect(() => levetiracetamLoad(w)).toThrow(RangeError);
    expect(() => valproateLoad(w)).toThrow(RangeError);
    expect(() => fosphenytoinLoad(w)).toThrow(RangeError);
    expect(() => lacosamideLoad(w)).toThrow(RangeError);
    expect(() => hypertonicSalineBolus(w)).toThrow(RangeError);
    expect(() => mannitolDose({ weightKg: w })).toThrow(RangeError);
  });
});

describe('3% hypertonic saline', () => {
  it('2 mL/kg over 20 min', () => {
    expect(hypertonicSalineBolus(70)).toEqual({ volumeMl: 140, infusionMinutes: 20, rateMlPerHr: 420 });
  });

  it('rounds volume to whole mL', () => {
    expect(hypertonicSalineBolus(72.4).volumeMl).toBe(145);
  });
});

describe('mannitol 20%', () => {
  it('computes 0.5–1.0 g/kg and the 20% volume (0.2 g/mL)', () => {
    const r = mannitolDose({ weightKg: 80 });
    expect(r.doseLowG).toBe(40);
    expect(r.doseHighG).toBe(80);
    expect(r.volumeLowMl).toBe(200);
    expect(r.volumeHighMl).toBe(400);
    expect(r.contraindicated).toBe(false);
  });

  it('is contraindicated when osmolality > 320', () => {
    const r = mannitolDose({ weightKg: 80, serumOsmolality: 321 });
    expect(r.contraindicated).toBe(true);
    expect(r.contraindicationReasons).toHaveLength(1);
  });

  it('osmolality of exactly 320 is not contraindicated', () => {
    expect(mannitolDose({ weightKg: 80, serumOsmolality: 320 }).contraindicated).toBe(false);
  });

  it('is contraindicated with severe AKI, and reports both reasons', () => {
    expect(mannitolDose({ weightKg: 80, severeAki: true }).contraindicated).toBe(true);
    const both = mannitolDose({ weightKg: 80, serumOsmolality: 335, severeAki: true });
    expect(both.contraindicationReasons).toHaveLength(2);
  });

  it('rounds g doses to 0.1', () => {
    expect(mannitolDose({ weightKg: 67.3 }).doseLowG).toBe(33.7); // 33.65 -> 33.7
  });

  it('rejects negative osmolality', () => {
    expect(() => mannitolDose({ weightKg: 70, serumOsmolality: -1 })).toThrow(RangeError);
  });
});

describe('CSF traumatic tap correction', () => {
  it('exact formula', () => {
    // 100 - (5000 / 5,000,000) * 7000 = 100 - 7 = 93
    const r = correctCsfProtein({
      measuredProteinMgDl: 100,
      csfRbcPerUl: 5000,
      bloodRbcPerUl: 5_000_000,
      bloodProteinMgDl: 7000,
    });
    expect(r.method).toBe('exact');
    expect(r.correctedProteinMgDl).toBe(93);
    expect(r.subtractedMgDl).toBe(7);
  });

  it('approximation: 1.1 mg/dL per 1000 RBC', () => {
    const r = correctCsfProtein({ measuredProteinMgDl: 80, csfRbcPerUl: 10_000 });
    expect(r.method).toBe('approximation');
    expect(r.correctedProteinMgDl).toBe(69);
  });

  it('approximation scales fractionally and rounds to 0.1', () => {
    const r = correctCsfProtein({ measuredProteinMgDl: 50, csfRbcPerUl: 2500 });
    expect(r.correctedProteinMgDl).toBe(47.3); // 50 - 2.75 = 47.25 -> 47.3
  });

  it('falls back to approximation if only one blood value is given', () => {
    const r = correctCsfProtein({ measuredProteinMgDl: 80, csfRbcPerUl: 1000, bloodRbcPerUl: 5_000_000 });
    expect(r.method).toBe('approximation');
  });

  it('clamps negative results to zero and flags it', () => {
    const r = correctCsfProtein({ measuredProteinMgDl: 10, csfRbcPerUl: 100_000 });
    expect(r.correctedProteinMgDl).toBe(0);
    expect(r.clampedToZero).toBe(true);
  });

  it('zero RBC leaves protein unchanged', () => {
    const r = correctCsfProtein({ measuredProteinMgDl: 45, csfRbcPerUl: 0 });
    expect(r.correctedProteinMgDl).toBe(45);
    expect(r.clampedToZero).toBe(false);
  });

  it('rejects invalid inputs', () => {
    expect(() => correctCsfProtein({ measuredProteinMgDl: -1, csfRbcPerUl: 0 })).toThrow(RangeError);
    expect(() =>
      correctCsfProtein({ measuredProteinMgDl: 50, csfRbcPerUl: 100, bloodRbcPerUl: 0, bloodProteinMgDl: 7000 }),
    ).toThrow(RangeError);
  });
});

describe('LEDD converter', () => {
  it('applies each conversion factor', () => {
    expect(calculateLedd({ carbidopaLevodopaIR: 300 }).totalLedd).toBe(300);
    expect(calculateLedd({ carbidopaLevodopaCR: 400 }).totalLedd).toBe(300);
    expect(calculateLedd({ ropinirole: 6 }).totalLedd).toBe(120);
    expect(calculateLedd({ pramipexole: 1.5 }).totalLedd).toBe(150);
    expect(calculateLedd({ rotigotine: 6 }).totalLedd).toBe(180);
    expect(calculateLedd({ selegiline: 10 }).totalLedd).toBe(1000);
    expect(calculateLedd({ rasagiline: 1 }).totalLedd).toBe(100);
  });

  it('sums a combined regimen and reports a breakdown', () => {
    const r = calculateLedd({ carbidopaLevodopaIR: 600, carbidopaLevodopaCR: 200, ropinirole: 3, rasagiline: 1 });
    // 600 + 150 + 60 + 100
    expect(r.totalLedd).toBe(910);
    expect(r.breakdown.map((b) => b.id)).toEqual([
      'carbidopaLevodopaIR',
      'carbidopaLevodopaCR',
      'ropinirole',
      'rasagiline',
    ]);
  });

  it('ignores missing and zero entries; empty input is 0', () => {
    expect(calculateLedd({}).totalLedd).toBe(0);
    expect(calculateLedd({ ropinirole: 0 }).breakdown).toHaveLength(0);
  });

  it('rounds total to whole mg', () => {
    expect(calculateLedd({ carbidopaLevodopaCR: 250 }).totalLedd).toBe(188); // 187.5 -> 188
  });

  it('rejects negative doses', () => {
    expect(() => calculateLedd({ ropinirole: -1 })).toThrow(RangeError);
  });
});
