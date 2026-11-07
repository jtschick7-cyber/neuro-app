import { readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { alternatives, prepare, search } from '../src/lib/search';
import { BODY_SECTIONS, NOT_BODY, buildDocs, searchIndex } from '../src/lib/searchIndex';
import { CALC_CARD } from '../src/lib/nav';
import { parseHash } from '../src/lib/route';

const hrefs = (q: string) => search(searchIndex, q).map((h) => h.doc.href);
const top3 = (q: string) => hrefs(q).slice(0, 3);

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

describe('body text, fallback, short words, synonyms (tasks 3.1–3.5)', () => {
  const idx = prepare([
    { href: '#/title', title: 'Andexanet alfa', context: 'x', terms: [] },
    { href: '#/term', title: 'Factor Xa reversal', context: 'x', terms: ['andexanet'] },
    {
      href: '#/body',
      title: 'Apixaban',
      context: 'x',
      terms: [],
      body: [
        { section: 'Reversal · Andexanet alfa', text: 'Andexanet alfa bolus then infusion' },
        { section: 'Pearls', text: 'Cerebellar bleeding; MTB testing' },
      ],
    },
  ]);
  const order = (q: string) => search(idx, q).map((h) => h.doc.href);
  it('indexes body text below title and terms, and reports the matched section', () => {
    expect(order('andexanet')).toEqual(['#/title', '#/term', '#/body']);
    expect(search(idx, 'andexanet')[2].section).toBe('Reversal · Andexanet alfa');
    expect(search(idx, 'andexanet')[0].section).toBeUndefined();
  });
  it('falls back to best partial matches when nothing matches every word', () => {
    const hits = search(idx, 'apixaban zzzz');
    expect(hits.map((h) => h.doc.href)).toEqual(['#/body']);
    expect(hits[0].complete).toBe(false);
    expect(search(idx, 'apixaban andexanet').every((h) => h.complete)).toBe(true);
  });
  it('requires word-start matches for words under 5 letters, substrings from 5', () => {
    expect(order('bell')).toEqual([]);
    expect(order('rebellar')).toEqual(['#/body']);
  });
  it('expands synonyms to whole words only', () => {
    expect(alternatives('evt')).toContainEqual(['mt']);
    expect(alternatives('hit')).toContainEqual(['heparin', 'induced', 'thrombocytopenia']);
    expect(order('evt')).toEqual([]); // "MT" must not prefix-match "MTB"
  });
});

describe('body index coverage', () => {
  it('classifies every entry field as body text or not', () => {
    const unknown = new Set<string>();
    for (const f of readdirSync('data').filter((n) => n.endsWith('.json') && n !== 'calculators.manifest.json')) {
      const raw = JSON.parse(readFileSync(`data/${f}`, 'utf8')) as { entries?: Record<string, unknown>[] };
      for (const e of raw.entries ?? []) for (const k of Object.keys(e)) if (!(k in BODY_SECTIONS) && !NOT_BODY.has(k)) unknown.add(`${f}:${k}`);
    }
    expect([...unknown]).toEqual([]);
  });
  it('never indexes sources, verify items or ids as body text', () => {
    for (const k of ['sources', 'verify', 'relatedIds', 'lastReviewed', 'id']) expect(k in BODY_SECTIONS).toBe(false);
  });
});

describe('task 3 acceptance queries (right entry in the top 3)', () => {
  it.each([
    ['andexanet', '#/vascular-antithrombotics/apixaban'],
    ['hemicraniectomy', '#/acute-neuro/elevated-icp-herniation'],
    ['nimodipine', '#/reference-cards/asah-numbers'],
    ['HIT', '#/vascular-antithrombotics/heparin-ufh'],
    ['EVT', '#/vascular-antithrombotics/antithrombotic-after-reperfusion'],
    ['basilar', '#/acute-neuro/status-migrainosus'],
    ['vanc', '#/acute-neuro/bacterial-meningitis'],
    ['phenytoin level', '#/calc/phenytoin-correction'],
    ['apixaban ICH', '#/vascular-antithrombotics/apixaban'],
    ['apixaban ICH', '#/vascular-antithrombotics/anticoag-reversal-ich'],
    ['mag', '#/mg-contraindications/magnesium'],
    ['TNK', '#/calc/tnk-dose'],
    ['TNK', '#/vascular-antithrombotics/tenecteplase'],
    ['ICH', '#/calc/ich-score'],
    ['Botox', '#/mg-contraindications/botulinum-toxin'],
    ['Keppra', '#/calc/levetiracetam-load'],
    ['Keppra', '#/antiseizure-medications/levetiracetam'],
    ['status', '#/acute-neuro/convulsive-status-epilepticus'],
    ['MG', '#/acute-neuro/myasthenic-crisis'],
  ])('%s → %s', (q, href) => expect(top3(q)).toContain(href));
  it('"bell" no longer matches cerebellar antibody cards', () => {
    expect(hrefs('bell').filter((h) => h.startsWith('#/neural-antibodies/'))).toEqual([]);
  });
  it('shows the section a body-only match came from', () => {
    const hit = search(searchIndex, 'andexanet').find((h) => h.doc.href === '#/vascular-antithrombotics/apixaban');
    expect(hit?.section).toMatch(/^Reversal · /);
  });
  it('keeps the index lazy-loaded (only a dynamic import from the UI)', () => {
    const ui = readFileSync('src/components/GlobalSearch.tsx', 'utf8'); // shared by Home and the search launcher (4.1)
    expect(ui).toMatch(/import\('\.\.\/lib\/searchIndex'\)/);
    expect(ui).not.toMatch(/^import .*searchIndex/m);
    expect(readFileSync('src/components/Home.tsx', 'utf8')).not.toMatch(/searchIndex/);
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
