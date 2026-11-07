import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contextSummary } from '../src/components/ContextBar';
import { SECTIONS } from '../src/lib/nav';
import { EMPTY_CONTEXT } from '../src/lib/patientContext';

describe('UX polish (task group 5)', () => {
  it('5.1 summarises entered context values for the collapsed chip', () => {
    expect(contextSummary(EMPTY_CONTEXT)).toBe('');
    expect(contextSummary({ weightKg: '70', age: '64', sex: 'M', creatinine: '1.1' })).toBe('70 kg · 64 y · M · Cr 1.1');
    expect(contextSummary({ ...EMPTY_CONTEXT, creatinine: ' 0.8 ' })).toBe('Cr 0.8');
  });
  it('5.1 keeps the 1.75rem safe-area top padding (rule 0.8)', () => {
    expect(readFileSync('src/components/ContextBar.tsx', 'utf8')).toContain("paddingTop: 'calc(1.75rem + env(safe-area-inset-top))'");
  });
  it('5.2 Drugs opens on Antithrombotics', () => {
    expect(SECTIONS.find((s) => s.id === 'drugs')?.hash).toBe('#/vascular-antithrombotics');
  });
});
