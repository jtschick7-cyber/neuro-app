import { describe, expect, it } from 'vitest';
import { resolveRef } from '../src/lib/links';
import { CAUTION_LISTS } from '../src/lib/registry';
import { CALC_CARD } from '../src/lib/nav';
import { parseHash } from '../src/lib/route';
import { CALCULATOR_META } from '../src/lib/calculators';
import manifest from '../data/calculators.manifest.json';

describe('resolveRef', () => {
  it('links to a built calculator, with its title', () => {
    const r = resolveRef('calc:levetiracetam-load');
    expect(r.href).toBe('#/calc/levetiracetam-load');
    expect(r.label).toBe('Levetiracetam load');
    expect(r.context).toBe('Calculator');
  });
  it('accepts a bare calculator id (from calculatorIds)', () => {
    expect(resolveRef('cockcroft-gault').href).toBe('#/calc/cockcroft-gault');
  });
  it('does not link calculators that have no UI yet', () => {
    const r = resolveRef('calc:ivig-dose');
    expect(r.href).toBeNull();
    expect(r.label).toBeTruthy();
  });
  it('links to caution-list entries using the real title', () => {
    const list = CAUTION_LISTS[0];
    const e = list.list.entries[0];
    const r = resolveRef(`${list.id}:${e.id}`);
    expect(r.href).toBe(`#/${list.id}/${e.id}`);
    expect(r.label).toBe(e.title);
  });
  it('does not link to an unknown entry or to registries without a screen', () => {
    expect(resolveRef('mg-contraindications:not-a-real-entry').href).toBeNull();
    expect(resolveRef('acute-neuro:status-epilepticus').href).toBeNull();
    expect(resolveRef('acute-neuro:status-epilepticus').label).toBe('Status epilepticus');
  });
});

describe('every cross-link in the built registries', () => {
  it('resolves without throwing, and any href parses back to a route', () => {
    for (const l of CAUTION_LISTS) {
      for (const e of l.list.entries) {
        for (const ref of e.relatedIds) {
          const r = resolveRef(ref);
          expect(r.label).toBeTruthy();
          if (r.href) expect(parseHash(r.href).kind).not.toBe('home');
        }
      }
    }
  });
  it('maps each calculator card id to a note id with the calc- prefix', () => {
    for (const note of Object.values(CALC_CARD)) expect(note.startsWith('calc-')).toBe(true);
  });
  it('only maps calculator ids that exist in the manifest and in CALCULATOR_META', () => {
    for (const id of Object.keys(CALC_CARD)) {
      expect(manifest).toContain(id);
      expect(CALCULATOR_META[id]).toBeDefined();
    }
  });
  it('links every stroke calculator to its card', () => {
    for (const id of ['tnk-dose', 'alteplase-dose', 'ich-score', 'abcd2', 'cha2ds2-vasc', 'has-bled']) {
      expect(resolveRef(`calc:${id}`).href).toBe(`#/calc/${id}`);
    }
  });
});
