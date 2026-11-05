import { describe, expect, it } from 'vitest';
import { alteplaseDose, tnkDose } from '../src/lib/calculators';

// Guards the static administration text and string split used by the dose tiles in calcShared.tsx.
describe('dose display contract', () => {
  it('alteplase exposes parts and the timing text the tiles hard-code', () => {
    const r = alteplaseDose(70);
    expect(r.parts).toEqual({ bolus: 6.3, infusion: 56.7 });
    expect(r.display).toContain('bolus over 1 min');
    expect(r.display).toContain('over 60 min (1 mg/mL)');
  });
  it('alteplase cap still reported at 90 mg', () => {
    const r = alteplaseDose(120);
    expect(r.value).toBe(90);
    expect(r.warnings).toContain('Capped at 90 mg');
  });
  it('tnk display starts with "<value> <unit>" so it splits into dose and detail', () => {
    const r = tnkDose(70);
    expect(r.display.startsWith(`${r.value} ${r.unit}`)).toBe(true);
  });
});
