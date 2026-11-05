// Entry banners and footer text. Wording lives in src/content/copy.ts; this file only decides which apply.

import { BANNERS, FOOTER, STALE_AFTER_MONTHS } from '../content/copy';

export type EntryBannerKey = 'UNREVIEWED' | 'VERIFY' | 'STALE' | 'NOT_US_MARKETED';

export interface EntryBanner {
  key: EntryBannerKey;
  text: string;
}

export function fillTemplate(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}

const ISO = /^(\d{4})-(\d{2})-(\d{2})$/;

/** True when `lastReviewed` (ISO date) is more than `months` calendar months before `now`. UNREVIEWED is not "stale" — it has its own banner. */
export function isStale(lastReviewed: string, now: Date, months: number = STALE_AFTER_MONTHS): boolean {
  const m = ISO.exec(lastReviewed);
  if (!m) return false;
  const cutoff = Date.UTC(Number(m[1]), Number(m[2]) - 1 + months, Number(m[3]));
  return now.getTime() >= cutoff + 24 * 60 * 60 * 1000;
}

export interface BannerInput {
  lastReviewed: string;
  verify: string[];
  /** Omit for registries without a US-market flag. */
  usMarketed?: boolean;
}

/** Banners in display order. NOT_US_MARKETED is always last (grey, never hides the entry). */
export function entryBanners(e: BannerInput, now: Date = new Date()): EntryBanner[] {
  const out: EntryBanner[] = [];
  if (e.lastReviewed === 'UNREVIEWED') out.push({ key: 'UNREVIEWED', text: BANNERS.UNREVIEWED });
  if (e.verify.length > 0) out.push({ key: 'VERIFY', text: BANNERS.VERIFY });
  if (isStale(e.lastReviewed, now)) out.push({ key: 'STALE', text: fillTemplate(BANNERS.STALE, { months: STALE_AFTER_MONTHS }) });
  if (e.usMarketed === false) out.push({ key: 'NOT_US_MARKETED', text: BANNERS.NOT_US_MARKETED });
  return out;
}

export function footerText(lastReviewed: string, contentVersion: string): string {
  return fillTemplate(FOOTER, {
    lastReviewed: lastReviewed === 'UNREVIEWED' ? 'not yet signed off' : lastReviewed,
    contentVersion,
  });
}
