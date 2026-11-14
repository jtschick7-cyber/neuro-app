import { describe, expect, it } from 'vitest';
import { LEDD_MORE } from '../src/components/Calculators';
import { LEVODOPA_FACTORS, OTHER_FACTORS } from '../src/lib/calculators';

describe('LEDD "More drugs" (decided 13 Nov 2026)', () => {
  it('hides exactly the nine agreed agents, all of which still have factors', () => {
    expect([...LEDD_MORE].sort()).toEqual([
      'amantadine-er-osmolex', 'apomorphine-sl', 'bromocriptine', 'cabergoline', 'foslevodopa-foscarbidopa-sc',
      'levodopa-carbidopa-intestinal-gel', 'levodopa-inhaled', 'pramipexole-base', 'selegiline-odt',
    ]);
    const factors: Record<string, number> = { ...LEVODOPA_FACTORS, ...OTHER_FACTORS };
    for (const d of LEDD_MORE) expect(factors[d]).toBeGreaterThan(0);
  });
});
