import { describe, expect, it } from 'vitest';
import { calcFooterText, entryBanners, fillTemplate, footerText, isStale } from '../src/lib/banners';
import { BANNERS, STALE_AFTER_MONTHS } from '../src/content/copy';

const d = (iso: string) => new Date(`${iso}T12:00:00Z`);

describe('isStale', () => {
  it('is false inside the window and on the anniversary day', () => {
    expect(isStale('2024-11-05', d('2026-11-05'))).toBe(false);
    expect(isStale('2026-01-01', d('2026-11-05'))).toBe(false);
  });
  it('is true once more than STALE_AFTER_MONTHS have passed', () => {
    expect(STALE_AFTER_MONTHS).toBe(24);
    expect(isStale('2024-11-05', d('2026-11-07'))).toBe(true);
    expect(isStale('2020-03-01', d('2026-11-05'))).toBe(true);
  });
  it('is false for UNREVIEWED or malformed dates', () => {
    expect(isStale('UNREVIEWED', d('2030-01-01'))).toBe(false);
    expect(isStale('soon', d('2030-01-01'))).toBe(false);
  });
});

describe('entryBanners', () => {
  const now = d('2026-11-05');
  it('returns nothing for a clean, current, US-marketed entry', () => {
    expect(entryBanners({ lastReviewed: '2026-11-05', verify: [], usMarketed: true }, now)).toEqual([]);
    expect(entryBanners({ lastReviewed: '2026-11-05', verify: [] }, now)).toEqual([]);
  });
  it('orders banners and always puts NOT_US_MARKETED last', () => {
    const keys = entryBanners({ lastReviewed: 'UNREVIEWED', verify: ['x'], usMarketed: false }, now).map((b) => b.key);
    expect(keys).toEqual(['UNREVIEWED', 'VERIFY', 'NOT_US_MARKETED']);
    const stale = entryBanners({ lastReviewed: '2020-01-01', verify: ['x'], usMarketed: false }, now).map((b) => b.key);
    expect(stale).toEqual(['VERIFY', 'STALE', 'NOT_US_MARKETED']);
  });
  it('fills the STALE months and uses copy.ts text', () => {
    const [b] = entryBanners({ lastReviewed: '2020-01-01', verify: [] }, now);
    expect(b.text).toBe(BANNERS.STALE.replace('{months}', '24'));
    expect(b.text).not.toContain('{');
  });
});

describe('footerText', () => {
  it('fills date and content version', () => {
    const t = footerText('2026-11-05', '1.1.0+abc');
    expect(t).toContain('2026-11-05');
    expect(t).toContain('1.1.0+abc');
    expect(t).not.toContain('{');
  });
  it('does not print the UNREVIEWED sentinel as a date', () => {
    expect(footerText('UNREVIEWED', '1.0.0')).toContain('not yet signed off');
  });
  it('leaves unknown placeholders untouched', () => {
    expect(fillTemplate('a {x} {y}', { x: 1 })).toBe('a 1 {y}');
  });
});

describe('calcFooterText', () => {
  it('fills the content version', () => {
    const t = calcFooterText('1.1.0+abc');
    expect(t).toContain('1.1.0+abc');
    expect(t).not.toContain('{');
  });
});
