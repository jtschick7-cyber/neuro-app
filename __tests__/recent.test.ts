import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { getRecent, recordRecent } from '../src/lib/recent';

describe('recently opened (6f)', () => {
  it('keeps newest first, de-duplicates, caps at 5', () => {
    for (const id of ['a:1', 'a:2', 'a:3', 'a:1', 'a:4', 'a:5', 'a:6']) recordRecent(id);
    expect(getRecent()).toEqual(['a:6', 'a:5', 'a:4', 'a:1', 'a:3']);
  });
  it('is memory only (no storage access)', () => {
    expect(readFileSync('src/lib/recent.ts', 'utf8')).not.toMatch(/localStorage|sessionStorage|indexedDB|storage/i);
  });
});
