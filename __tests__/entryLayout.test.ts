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

describe('Pins and draw-before (4.4, 4.7b)', () => {
  it('4.4 pin titles come from the id only', async () => {
    const { pinTitle } = await import('../src/components/Pins');
    expect(pinTitle('acute-neuro:convulsive-status-epilepticus')).toBe('Convulsive status epilepticus');
  });
  it('4.4 pins store ids only and drop anything else', async () => {
    const store = new Map<string, string>();
    (globalThis as { localStorage?: Storage }).localStorage = {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      removeItem: (k: string) => void store.delete(k),
    } as Storage;
    const { loadPins, togglePin } = await import('../src/lib/storage');
    store.set('neurohosp.pins.v1', JSON.stringify(['acute-neuro:x', 'weight 70kg', 3, 'bad id:Y']));
    expect(loadPins()).toEqual(['acute-neuro:x']);
    expect(togglePin('Patient Name')).toEqual(['acute-neuro:x']);
    expect(togglePin('neural-antibodies:mog')).toEqual(['neural-antibodies:mog', 'acute-neuro:x']);
    expect(togglePin('acute-neuro:x')).toEqual(['neural-antibodies:mog']);
    delete (globalThis as { localStorage?: Storage }).localStorage;
  });
  it('4.7b draw-before line is copied verbatim from signed-off testing text (MOG only today)', async () => {
    const { drawBeforeLines } = await import('../src/components/DrugAntibodyViews');
    const reg = JSON.parse(src('data/neural-antibodies.json')) as { entries: { id: string; testing: Parameters<typeof drawBeforeLines>[0] }[] };
    const hits = reg.entries.filter((e) => drawBeforeLines(e.testing).length > 0).map((e) => e.id);
    expect(hits).toEqual(['mog']);
  });
});

describe('Canonical links (4.6)', () => {
  it('links every repeated block to its owning entry, which exists', async () => {
    const { reversalCanonical, NEURAXIAL_PEARL } = await import('../src/components/DrugAntibodyViews');
    type Row = { agent: string };
    const reg = JSON.parse(src('data/vascular-antithrombotics.json')) as { entries: { id: string; kind: string; reversal?: Row[]; pearls: string[] }[] };
    const ids = new Set(reg.entries.map((e) => e.id));
    const linked = (id: string) => reg.entries.find((e) => e.id === id)!.reversal!.map((r) => reversalCanonical(r.agent));
    expect(linked('aspirin')).toEqual(['antiplatelet-ich', 'antiplatelet-ich', 'antiplatelet-ich']);
    expect(linked('clopidogrel')).toEqual(['antiplatelet-ich', 'antiplatelet-ich', 'antiplatelet-ich']);
    for (const d of ['apixaban', 'rivaroxaban', 'edoxaban']) expect(linked(d)[0]).toBe('four-factor-pcc');
    expect(linked('dabigatran')[1]).toBe('four-factor-pcc');
    expect(reg.entries.filter((e) => e.pearls.some((p) => NEURAXIAL_PEARL.test(p))).map((e) => e.id)).toEqual([
      'apixaban', 'rivaroxaban', 'edoxaban', 'dabigatran', 'enoxaparin',
    ]);
    for (const id of ['antiplatelet-ich', 'four-factor-pcc', 'periprocedural-holds-lp-evd']) expect(ids.has(id)).toBe(true);
  });
});
