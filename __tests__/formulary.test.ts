import { describe, expect, it } from 'vitest';
import { FORMULARY_LABEL, usMarketedFirst } from '../src/lib/protocols';
import { FORMULARY_LEGEND } from '../src/content/copy';
import vascular from '../data/vascular-antithrombotics.json';

describe('NOT_US_MARKETED treatment items', () => {
  it('has a label and a legend row', () => {
    expect(FORMULARY_LABEL.NOT_US_MARKETED).toBe('Not US-marketed');
    expect(FORMULARY_LEGEND.some(([key]) => key === 'NOT_US_MARKETED')).toBe(true);
  });

  it('sorts last and keeps the order of everything else', () => {
    const items = [
      { agent: 'a', formularyStatus: 'AVAILABLE' },
      { agent: 'b', formularyStatus: 'NOT_US_MARKETED' },
      { agent: 'c', formularyStatus: 'NOT_STOCKED_LOCAL' },
    ];
    expect(usMarketedFirst(items).map((t) => t.agent)).toEqual(['a', 'c', 'b']);
  });

  it.each(['apixaban', 'rivaroxaban', 'edoxaban'])('%s: andexanet is shown, last', (id) => {
    const entry = vascular.entries.find((e) => e.id === id) as { reversal: { agent: string; formularyStatus: string }[] };
    expect(usMarketedFirst(entry.reversal).at(-1)).toMatchObject({ agent: 'Andexanet alfa', formularyStatus: 'NOT_US_MARKETED' });
  });
});
