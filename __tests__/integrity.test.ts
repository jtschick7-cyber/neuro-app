import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { checkSignoffs, collectCalculatorIds, entryHash, readSignoffs, type RawEntry } from '../scripts/integrity';

const signed: RawEntry = { id: 'x', title: 'X', dose: '0.1 mg/kg', lastReviewed: '2026-11-07' };
const records = { 'reg:x': { date: '2026-11-07', sha256: entryHash(signed) } };
const messages = (entries: RawEntry[], release = true) => checkSignoffs('reg', entries, records, release);

describe('sign-off hashes', () => {
  it('ignores lastReviewed but sees any content change', () => {
    expect(entryHash({ ...signed, lastReviewed: 'UNREVIEWED' })).toBe(entryHash(signed));
    expect(entryHash({ ...signed, dose: '1 mg/kg' })).not.toBe(entryHash(signed));
  });
  it('passes an unchanged signed entry', () => {
    expect(messages([signed])).toEqual([]);
  });
  it('fails a signed entry whose dose was edited without re-signing (audit P1-1)', () => {
    const p = messages([{ ...signed, dose: '1 mg/kg' }]);
    expect(p).toHaveLength(1);
    expect(p[0]).toMatchObject({ level: 'error', message: expect.stringContaining('content changed since sign-off') });
  });
  it('fails a lastReviewed date set by hand', () => {
    expect(messages([{ ...signed, lastReviewed: '2026-11-12' }])[0].level).toBe('error');
  });
  it('needs a record for every signed entry in release mode only', () => {
    const other: RawEntry = { id: 'y', lastReviewed: '2026-11-07' };
    expect(messages([signed, other], true)[0].level).toBe('error');
    expect(messages([signed, other], false)[0].level).toBe('warn');
  });
  it('skips UNREVIEWED entries and warns on records for removed entries', () => {
    expect(messages([{ ...signed, lastReviewed: 'UNREVIEWED', dose: '1 mg/kg' }])).toEqual([]);
    expect(messages([])[0]).toMatchObject({ level: 'warn', message: expect.stringContaining('no longer exists') });
  });
  it('matches the committed generated/signoff.json for every shipped entry', () => {
    const all = readSignoffs();
    for (const f of readdirSync('data').filter((f) => f.endsWith('.json') && !f.endsWith('.manifest.json'))) {
      const reg = JSON.parse(readFileSync(`data/${f}`, 'utf8')) as { entries?: RawEntry[] };
      if (!Array.isArray(reg.entries)) continue;
      expect(checkSignoffs(f.replace(/\.json$/, ''), reg.entries, all, true)).toEqual([]);
    }
  });
});

describe('calculatorIds walk (audit P1-3)', () => {
  it('finds ids at any depth, with their paths', () => {
    const entry = {
      id: 'e',
      calculatorIds: ['a'],
      treatment: [{ calculatorIds: ['b'] }],
      maintenance: [{ rows: [{ calculatorIds: ['no-such-calc'] }] }],
    };
    expect(collectCalculatorIds(entry)).toEqual([
      { path: 'calculatorIds[0]', id: 'a' },
      { path: 'treatment[0].calculatorIds[0]', id: 'b' },
      { path: 'maintenance[0].rows[0].calculatorIds[0]', id: 'no-such-calc' },
    ]);
  });
  it('every calculator link in the shipped data is in the manifest', () => {
    const shipped = new Set(JSON.parse(readFileSync('data/calculators.manifest.json', 'utf8')) as string[]);
    let n = 0;
    for (const f of readdirSync('data').filter((f) => f.endsWith('.json') && !f.endsWith('.manifest.json'))) {
      for (const c of collectCalculatorIds(JSON.parse(readFileSync(`data/${f}`, 'utf8')))) {
        n++;
        expect(shipped.has(c.id), `${f} ${c.path}: ${c.id}`).toBe(true);
      }
    }
    expect(n).toBeGreaterThan(15);
  });
});
