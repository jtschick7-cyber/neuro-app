import { describe, expect, it } from 'vitest';
import { buildQueue, itemKey, TIERS } from '../scripts/rereview-queue';
import { calculatorList, loadRegistries, CALCULATOR_META } from '../scripts/load-registries';

const regs = loadRegistries();
const queue = buildQueue(Object.fromEntries(Object.entries(regs).map(([k, r]) => [k, r.entries])), calculatorList());
const tierOf = (key: string) => queue.find((q) => itemKey(q) === key)?.tier;

describe('re-review queue (task 2.1)', () => {
  it('lists every calculator and every registry entry exactly once', () => {
    const expected = [
      ...Object.keys(CALCULATOR_META).map((id) => `calc:${id}`),
      ...Object.entries(regs).flatMap(([name, r]) => r.entries.map((e) => `${name}:${e.id}`)),
    ].sort();
    expect(queue.map(itemKey).sort()).toEqual(expected);
  });

  it('is in non-decreasing tier order with calculators first', () => {
    const tiers = queue.map((q) => q.tier);
    expect(tiers).toEqual([...tiers].sort((a, b) => a - b));
    expect(queue.slice(0, Object.keys(CALCULATOR_META).length).every((q) => q.registry === 'calc')).toBe(true);
    expect(new Set(tiers).size).toBeLessThanOrEqual(TIERS.length);
  });

  it('places entries in the task 2.1 tiers', () => {
    expect(tierOf('acute-neuro:convulsive-status-epilepticus')).toBe(2);
    expect(tierOf('vascular-antithrombotics:apixaban')).toBe(3);
    expect(tierOf('vascular-antithrombotics:anticoag-reversal-ich')).toBe(3);
    expect(tierOf('vascular-antithrombotics:thrombolysis-with-prior-antithrombotics')).toBe(3);
    expect(tierOf('vascular-antithrombotics:esus-antithrombotic')).toBe(4);
    expect(tierOf('consult-workups:sah-workup')).toBe(4);
    expect(tierOf('mg-contraindications:' + regs['mg-contraindications'].entries[0].id)).toBe(5);
    expect(tierOf('neural-antibodies:lgi1')).toBe(6);
    expect(tierOf('antiseizure-medications:levetiracetam')).toBe(2);
    expect(tierOf('reference-cards:neuro-icu-targets')).toBe(4);
    expect(queue.filter((q) => q.tier === 7)).toEqual([]);
  });
});
