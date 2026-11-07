import { describe, expect, it } from 'vitest';
import { prepare, search } from '../src/lib/search';
import { buildDocs, searchIndex } from '../src/lib/searchIndex';
import { CALC_CARD } from '../src/lib/nav';
import { parseHash } from '../src/lib/route';

const hrefs = (q: string) => search(searchIndex, q).map((h) => h.doc.href);

describe('search ranking', () => {
  const idx = prepare([
    { href: '#/a', title: 'Alpha drug', context: 'x', terms: ['brandx'] },
    { href: '#/b', title: 'Beta', context: 'x', terms: ['alpha-like'] },
  ]);
  it('ranks title matches above term matches', () => expect(search(idx, 'alpha').map((h) => h.doc.href)).toEqual(['#/a', '#/b']));
  it('requires every token to match', () => expect(search(idx, 'alpha beta')).toHaveLength(1));
  it('returns nothing for an empty query and finds brand terms', () => {
    expect(search(idx, '  ')).toEqual([]);
    expect(search(idx, 'BrandX')[0].doc.href).toBe('#/a');
  });
});

describe('global search over the real data', () => {
  it('finds the required queries', () => {
    expect(hrefs('mag')).toContain('#/mg-contraindications/magnesium');
    expect(hrefs('TNK')).toContain('#/calc/tnk-dose');
    expect(hrefs('TNK')).toContain('#/vascular-antithrombotics/tenecteplase');
    expect(hrefs('ICH')).toContain('#/calc/ich-score');
    expect(hrefs('ICH').some((h) => h.startsWith('#/vascular-antithrombotics/'))).toBe(true);
    expect(hrefs('Botox')).toContain('#/mg-contraindications/botulinum-toxin');
    expect(hrefs('Keppra')).toContain('#/calc/levetiracetam-load');
    expect(hrefs('status')).toContain('#/acute-neuro/convulsive-status-epilepticus');
  });
  it('finds an antibody by antigen and an interaction by brand', () => {
    expect(hrefs('NMDA')).toContain('#/neural-antibodies/nmdar');
    expect(hrefs('Eliquis')).toContain('#/asm-interactions/inducing-asm-apixaban-rivaroxaban');
  });
  it('finds the ASM dosing cards, reference cards and the phenytoin calculator', () => {
    expect(hrefs('Keppra')).toContain('#/antiseizure-medications/levetiracetam');
    expect(hrefs('Vimpat')).toContain('#/antiseizure-medications/lacosamide');
    expect(hrefs('thrombophilia')).toContain('#/reference-cards/thrombophilia-test-validity');
    expect(hrefs('nimodipine')).toContain('#/reference-cards/asah-numbers');
    expect(hrefs('rotigotine')).toContain('#/reference-cards/inpatient-parkinson-disease');
    expect(hrefs('sodium target')).toContain('#/reference-cards/neuro-icu-targets');
    expect(hrefs('lupus anticoagulant')).toContain('#/reference-cards/thrombophilia-test-validity');
    expect(hrefs('phenytoin level')).toContain('#/calc/phenytoin-correction');
  });
  it('indexes every calculator card', () => {
    const calcs = buildDocs().filter((d) => d.context === 'Calculator');
    expect(calcs).toHaveLength(Object.keys(CALC_CARD).length);
  });
  it('every result href parses to a real route', () => {
    for (const d of buildDocs()) expect(parseHash(d.href).kind, d.href).not.toBe('home');
  });
});
