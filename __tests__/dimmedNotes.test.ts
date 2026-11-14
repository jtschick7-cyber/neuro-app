import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('notes render at full weight (decided 13 Nov 2026, audit P2-17)', () => {
  it('no notes list is dimmed with text-slate-400', () => {
    for (const f of ['src/components/ReferenceViews.tsx', 'src/components/ProtocolParts.tsx'])
      expect(readFileSync(f, 'utf8')).not.toMatch(/items=\{\w+\.notes\} tone="text-slate-400"/);
  });
});
