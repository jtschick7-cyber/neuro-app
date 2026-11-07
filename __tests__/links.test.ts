import { describe, expect, it } from 'vitest';
import { resolveRef } from '../src/lib/links';
import { CAUTION_LISTS } from '../src/lib/registry';
import { CALC_CARD } from '../src/lib/nav';
import { parseHash } from '../src/lib/route';
import { CALCULATOR_META } from '../src/lib/calculators';
import acute from '../data/acute-neuro.json';
import consults from '../data/consult-workups.json';
import vascular from '../data/vascular-antithrombotics.json';
import antibodies from '../data/neural-antibodies.json';
import asm from '../data/asm-interactions.json';
import asmDosing from '../data/antiseizure-medications.json';
import referenceCards from '../data/reference-cards.json';
import { getRegistry } from '../src/lib/nav';
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
  it('does not link calculator ids that have no card', () => {
    const r = resolveRef('calc:not-yet-built');
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
  it('does not link to an unknown entry or an unknown registry', () => {
    expect(resolveRef('mg-contraindications:not-a-real-entry').href).toBeNull();
    expect(resolveRef('not-a-registry:some-entry').href).toBeNull();
    expect(resolveRef('not-a-registry:some-entry').label).toBe('Some entry');
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
  it('has a UI card for every id in the calculators manifest', () => {
    for (const id of manifest) expect(CALC_CARD[id], id).toBeDefined();
  });
  it('links every stroke, immunotherapy and sodium calculator to its card', () => {
    for (const id of ['tnk-dose', 'alteplase-dose', 'ich-score', 'abcd2', 'sodium-correction']) {
      expect(resolveRef(`calc:${id}`).href).toBe(`#/calc/${id}`);
    }
  });
});

describe('cross-links into the lazy-loaded registries', () => {
  it('links to entries in each lazy-loaded registry', () => {
    expect(resolveRef('neural-antibodies:' + antibodies.entries[0].id).href).toBe('#/neural-antibodies/' + antibodies.entries[0].id);
    expect(resolveRef('vascular-antithrombotics:' + vascular.entries[0].id).href).toBe('#/vascular-antithrombotics/' + vascular.entries[0].id);
    expect(resolveRef('acute-neuro:convulsive-status-epilepticus').href).toBe('#/acute-neuro/convulsive-status-epilepticus');
    expect(resolveRef('consult-workups:young-stroke-workup').href).toBe('#/consult-workups/young-stroke-workup');
    expect(resolveRef('antiseizure-medications:valproate').href).toBe('#/antiseizure-medications/valproate');
    expect(resolveRef('reference-cards:thrombophilia-test-validity').href).toBe('#/reference-cards/thrombophilia-test-validity');
    expect(resolveRef('calc:phenytoin-correction').href).toBe('#/calc/phenytoin-correction');
  });
  it('every shipped reference to a built registry points at a real entry', () => {
    const ids: Record<string, Set<string>> = {
      'acute-neuro': new Set(acute.entries.map((e) => e.id)),
      'consult-workups': new Set(consults.entries.map((e) => e.id)),
      'vascular-antithrombotics': new Set(vascular.entries.map((e) => e.id)),
      'neural-antibodies': new Set(antibodies.entries.map((e) => e.id)),
      'asm-interactions': new Set(asm.entries.map((e) => e.id)),
      'antiseizure-medications': new Set(asmDosing.entries.map((e) => e.id)),
      'reference-cards': new Set(referenceCards.entries.map((e) => e.id)),
    };
    for (const l of CAUTION_LISTS) ids[l.id] = new Set(l.list.entries.map((e) => e.id));
    const refs = [
      ...[...acute.entries, ...consults.entries, ...vascular.entries, ...antibodies.entries, ...asm.entries].flatMap((e) => e.relatedIds),
      ...asmDosing.entries.flatMap((e) => e.relatedIds),
      ...referenceCards.entries.flatMap((e) => e.relatedIds),
    ];
    for (const ref of refs) {
      const [reg, id] = ref.split(':');
      if (reg === 'calc' || !getRegistry(reg)?.built) continue;
      expect(ids[reg]?.has(id), ref).toBe(true);
    }
  });
});
