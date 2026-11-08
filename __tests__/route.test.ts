import { describe, expect, it } from 'vitest';
import { parseHash, sectionOf, toHash, type Route } from '../src/lib/route';
import { REGISTRIES, SECTIONS } from '../src/lib/nav';

describe('parseHash', () => {
  it('falls back to home for empty or unknown hashes', () => {
    for (const h of ['', '#', '#/', '#/nope', '#/nope/entry', '#//']) expect(parseHash(h)).toEqual({ kind: 'home' });
  });
  it('parses registry lists and entries', () => {
    expect(parseHash('#/mg-contraindications')).toEqual({ kind: 'registry', registry: 'mg-contraindications' });
    expect(parseHash('#/mg-contraindications/magnesium')).toEqual({
      kind: 'registry',
      registry: 'mg-contraindications',
      entryId: 'magnesium',
    });
  });
  it('parses calculator routes', () => {
    expect(parseHash('#/calc')).toEqual({ kind: 'calc', calcId: undefined });
    expect(parseHash('#/calc/ledd')).toEqual({ kind: 'calc', calcId: 'ledd' });
  });
  it('parses the about route', () => {
    expect(parseHash('#/about')).toEqual({ kind: 'about' });
    expect(toHash({ kind: 'about' })).toBe('#/about');
  });
  it('ignores a query string and a trailing slash', () => {
    expect(parseHash('#/calc/ledd/?x=1')).toEqual({ kind: 'calc', calcId: 'ledd' });
    expect(parseHash('#/rcvs-triggers/')).toEqual({ kind: 'registry', registry: 'rcvs-triggers' });
  });
  it('drops entry ids that are not kebab-case or not decodable', () => {
    expect(parseHash('#/rcvs-triggers/%E0%A4%A')).toEqual({ kind: 'registry', registry: 'rcvs-triggers' });
    expect(parseHash('#/rcvs-triggers/Bad_Id')).toEqual({ kind: 'registry', registry: 'rcvs-triggers' });
    expect(parseHash('#/calc/<script>')).toEqual({ kind: 'calc', calcId: undefined });
  });
});

describe('toHash', () => {
  const routes: Route[] = [
    { kind: 'home' },
    { kind: 'calc' },
    { kind: 'calc', calcId: 'ledd' },
    ...REGISTRIES.flatMap<Route>((r) => [
      { kind: 'registry', registry: r.id },
      { kind: 'registry', registry: r.id, entryId: 'some-entry' },
    ]),
  ];
  it('round-trips through parseHash', () => {
    for (const r of routes) {
      const back = parseHash(toHash(r));
      expect(toHash(back)).toBe(toHash(r));
      expect(back.kind).toBe(r.kind);
    }
  });
});

describe('sections', () => {
  it('maps every registry to a section that exists', () => {
    const ids = new Set(SECTIONS.map((s) => s.id));
    for (const r of REGISTRIES) expect(ids.has(sectionOf({ kind: 'registry', registry: r.id }))).toBe(true);
  });
  it('points every section nav item at a route in that section', () => {
    for (const s of SECTIONS) expect(sectionOf(parseHash(s.hash))).toBe(s.id);
  });
});
