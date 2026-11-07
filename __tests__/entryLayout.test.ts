import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { jumpTargets } from '../src/components/ProtocolViews';
import { ENTRY_LAYOUT_COPY, SPECIMEN_BADGE } from '../src/content/copy';
import { Specimen } from '../schema/neural-antibodies';

const src = (p: string) => readFileSync(p, 'utf8');

describe('Entry layout (task group 4)', () => {
  it('4.1 search launcher is on every non-home screen and reuses the shared search', () => {
    const app = src('src/App.tsx');
    expect(app).toContain("route.kind !== 'home' && <SearchLauncher");
    expect(src('src/components/Home.tsx')).toContain('<GlobalSearch>');
    const gs = src('src/components/GlobalSearch.tsx');
    expect(gs).toContain("import('../lib/searchIndex')"); // lazy index, not a static import
    expect(gs).not.toMatch(/^import .*searchIndex/m);
  });

  it('4.3 jump targets keep on-screen order, drop absent sections, end with Sources', () => {
    expect(jumpTargets([['a', 'A', true], ['b', 'B', false], ['c', 'C', true]])).toEqual([
      { id: 'a', label: 'A' },
      { id: 'c', label: 'C' },
      { id: 'sec-sources', label: ENTRY_LAYOUT_COPY.sources },
    ]);
  });

  it('4.3 acute: immediate actions and treatment open; presentation, workup, pitfalls collapsed', () => {
    const v = src('src/components/ProtocolViews.tsx');
    expect(v).toContain('id="sec-immediate" title="Immediate actions" open>');
    expect(v).toContain('id="sec-treatment" title="Treatment" open>');
    expect(v).toContain('id="sec-presentation" title="Presentation">');
    expect(v).toContain('id="sec-workup" title="Workup">');
    expect(v).toContain('id="sec-pitfalls" title="Pitfalls">');
  });

  it('4.3 every evidenceNote renders behind the Evidence disclosure', () => {
    for (const f of ['src/components/ProtocolParts.tsx', 'src/components/ProtocolViews.tsx', 'src/components/DrugAntibodyViews.tsx']) {
      expect(src(f)).not.toMatch(/<Bullets items=\{\w+\.evidenceNote\}/);
    }
  });

  it('4.5 agent card section order', () => {
    const v = src('src/components/DrugAntibodyViews.tsx');
    const order = ['sec-reversal', 'sec-lysis', 'sec-hold', 'sec-uses', 'sec-renal', 'sec-monitoring', 'sec-interactions', 'sec-pregnancy', 'sec-pearls'];
    const at = order.map((id) => v.indexOf(`<Section id="${id}"`));
    expect(at.every((x) => x > 0)).toBe(true);
    expect([...at].sort((a, b) => a - b)).toEqual(at);
    expect(v).toContain('id="sec-uses" title="Uses and doses">'); // collapsed
  });

  it('4.7 specimen badge covers every Specimen enum value', () => {
    for (const s of Specimen.options) expect(SPECIMEN_BADGE[s].label).toBeTruthy();
    expect(SPECIMEN_BADGE.BOTH.label).toBe('PAIRED');
  });
});
