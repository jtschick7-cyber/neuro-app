import { describe, expect, it } from 'vitest';
import { renalRowMatches, type AsmEntry } from '../src/lib/protocols';
import asmDosing from '../data/antiseizure-medications.json';

type RenalRow = AsmEntry['renal'][number];
const row = (crclMin: number | null, crclMax: number | null, basis: RenalRow['crclBasis'] = 'CG_ML_MIN'): RenalRow => ({
  kind: 'CRCL_BAND', crclMin, crclMax, crclBasis: basis, label: 'x', doseText: 'x', dose: [], notes: [],
});

describe('ASM renal row highlighting', () => {
  it('matches inclusive bounds, open-ended bands, and both rows on a shared endpoint', () => {
    const lo = row(null, 30);
    const hi = row(30, null);
    expect([renalRowMatches(lo, 29), renalRowMatches(hi, 29)]).toEqual([true, false]);
    expect([renalRowMatches(lo, 30), renalRowMatches(hi, 30)]).toEqual([true, true]);
    expect([renalRowMatches(lo, 31), renalRowMatches(hi, 31)]).toEqual([false, true]);
  });
  it('never highlights without a CrCl, for BSA-normalized bands, or for intermittent HD rows', () => {
    expect(renalRowMatches(row(30, 50), null)).toBe(false);
    expect(renalRowMatches(row(30, 50, 'BSA_NORMALIZED_ML_MIN_1_73M2'), 40)).toBe(false);
    expect(renalRowMatches({ ...row(null, null, null), kind: 'INTERMITTENT_HD' }, 40)).toBe(false);
  });
  it('highlights no Keppra row from Cockcroft-Gault, and lacosamide rows from it', () => {
    const lev = asmDosing.entries.find((e) => e.id === 'levetiracetam')!.renal as RenalRow[];
    const lcm = asmDosing.entries.find((e) => e.id === 'lacosamide')!.renal as RenalRow[];
    for (const crcl of [10, 30, 50, 80, 120]) expect(lev.some((r) => renalRowMatches(r, crcl))).toBe(false);
    expect(lcm.filter((r) => renalRowMatches(r, 30))).toHaveLength(2);
    expect(lcm.filter((r) => renalRowMatches(r, 60))).toHaveLength(1);
  });
});
