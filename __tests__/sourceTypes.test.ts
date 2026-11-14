import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { entryBanners, hasOldSources } from '../src/lib/banners';
import { citationYear, collectSources, newestGuidelineYear } from '../scripts/source-years';

const NOW = new Date('2026-11-14T12:00:00Z');
const base = { lastReviewed: '2026-11-01', verify: [] };

describe('P2-2 source types and OLD_SOURCES banner', () => {
  it('reads the citation year, ignoring DOI digits and taking the newest year', () => {
    expect(citationYear('Tunkel AR, et al. Clin Infect Dis 2008;47(3):303-327. doi:10.1086/2019')).toBe(2008);
    expect(citationYear('Soliris (eculizumab) US prescribing information. Alexion; revised 6/2026')).toBe(2026);
    expect(citationYear('No year here')).toBeNull();
  });
  it('collects nested sources and uses only GUIDELINE/LABEL for the newest year', () => {
    const entry = { sources: ['G. 2008', 'T. 2024'], cells: [{ sources: ['L. 2012'] }] };
    expect([...collectSources(entry)].sort()).toEqual(['G. 2008', 'L. 2012', 'T. 2024']);
    expect(newestGuidelineYear(entry, { 'G. 2008': 'GUIDELINE', 'T. 2024': 'TRIAL', 'L. 2012': 'LABEL' })).toBe(2012);
    expect(newestGuidelineYear({ sources: ['T. 2024'] }, { 'T. 2024': 'TRIAL' })).toBeNull();
  });
  it('shows OLD_SOURCES at 10+ calendar years, not at 9, not without a guideline/label', () => {
    expect(hasOldSources(2016, NOW)).toBe(true);
    expect(hasOldSources(2017, NOW)).toBe(false);
    expect(hasOldSources(undefined, NOW)).toBe(false);
    const b = entryBanners({ ...base, newestSourceYear: 2008 }, NOW);
    expect(b.map((x) => x.key)).toEqual(['OLD_SOURCES']);
    expect(b[0].text).toBe('Newest guideline or label cited is from 2008 — check for a newer edition.');
  });
  it('generated years flag the five entries in draft 08 (as of 2026)', () => {
    const years = JSON.parse(readFileSync('generated/source-years.json', 'utf8')) as Record<string, number>;
    const flagged = Object.keys(years).filter((k) => hasOldSources(years[k], NOW)).sort();
    expect(flagged).toEqual([
      'acute-neuro:nms-parkinsonism-hyperpyrexia',
      'acute-neuro:serotonin-syndrome',
      'acute-neuro:viral-encephalitis',
      'consult-workups:susac-syndrome',
      'seizure-threshold:flumazenil',
    ]);
  });
  it('tag file stays out of the app bundle (only the generated year map is imported)', () => {
    expect(readFileSync('src/components/BannerList.tsx', 'utf8')).not.toContain('source-types.json');
  });
});
