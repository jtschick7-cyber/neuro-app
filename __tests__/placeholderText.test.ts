import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { findPlaceholderText } from '../scripts/placeholder-text';

describe('placeholder text rule', () => {
  it('flags "(pending)", ", pending)" and "(batch …)" with their paths', () => {
    const entry = {
      notes: ['Timing: see VTE prophylaxis entry (pending)', 'fine'],
      dose: [{ doseText: 'Load 160 mg (trial regimens; see DAPT entry, pending)' }],
      disposition: 'see thunderclap-headache (batch D)',
    };
    expect(findPlaceholderText(entry).map((p) => p.path)).toEqual(['notes[0]', 'dose[0].doseText', 'disposition']);
  });

  it('ignores ordinary uses of the words', () => {
    expect(findPlaceholderText({ a: 'Results pending at discharge', b: 'Batch testing (send-out)' })).toEqual([]);
  });

  it('finds none in data/', () => {
    const hits = readdirSync('data')
      .filter((f) => f.endsWith('.json'))
      .flatMap((f) => findPlaceholderText(JSON.parse(readFileSync(`data/${f}`, 'utf8'))).map((p) => `${f}: ${p.text}`));
    expect(hits).toEqual([]);
  });
});
