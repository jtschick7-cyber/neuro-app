import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const src = (p: string) => readFileSync(p, 'utf8');

describe('audit P2 UI fixes', () => {
  it('P2-12: each screen renders inside an error boundary that resets per route and offers Reload', () => {
    expect(src('src/App.tsx')).toMatch(/<ErrorBoundary key=\{hash\} where=\{hash\}>\s*<Screen/);
    const eb = src('src/components/ErrorBoundary.tsx');
    expect(eb).toContain('getDerivedStateFromError');
    expect(eb).toContain('window.location.reload()');
  });
  it('P2-1: footer shows the content date; About has last check and a manual update check', () => {
    expect(src('src/App.tsx')).toContain('({about.builtAt})');
    expect(src('src/components/About.tsx')).toContain('<UpdateStatus />');
    expect(src('src/components/UpdateStatus.tsx')).toContain('checkForUpdateNow');
  });
  it('P2-4: asks for persistent storage and announces offline readiness', () => {
    const bar = src('src/components/UpdateBar.tsx');
    expect(bar).toContain('requestPersistentStorage()');
    expect(bar).toContain('UPDATE_COPY.offlineToast');
  });
  it('P2-13: calculator placeholders never look like entered values', () => {
    for (const f of ['src/components/Calculators.tsx', 'src/components/ImmunoSodiumCalculators.tsx', 'src/components/PhenytoinCard.tsx'])
      expect(src(f), f).not.toMatch(/placeholder="\d/);
  });
  it('P2-18: inputs, notes toggle and formula summary are at least 44 px', () => {
    expect(src('src/components/CalculatorCard.tsx')).not.toContain('py-1.5');
    expect(src('src/components/CalculatorCard.tsx')).toContain('h-11');
    expect(src('src/components/BedsideNotes.tsx')).toContain('min-h-11');
    expect(src('src/components/calcShared.tsx')).toMatch(/<summary className="[^"]*min-h-11/);
  });
  it('P2-15: the floating search button hides while scrolling down', () => {
    expect(src('src/components/GlobalSearch.tsx')).toContain('useHideOnScrollDown()');
  });
  it('P2-17: antibody method notes (cautions) are not dimmer than the facts', () => {
    expect(src('src/components/DrugAntibodyViews.tsx')).not.toContain('items={e.testing.methodNotes} tone="text-slate-400"');
  });
  it('P2-19: pins show entry titles from the lazy index, id-derived title only as fallback', () => {
    const pins = src('src/components/Pins.tsx');
    expect(pins).toContain('titles.get(');
    expect(pins).toContain("import { loadIndex } from './GlobalSearch'");
  });
});
