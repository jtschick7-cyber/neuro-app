import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

function sources(dir: string): { file: string; text: string }[] {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    if (statSync(p).isDirectory()) return sources(p);
    // Comments are stripped so prose mentioning an API doesn't count as using it.
    return /\.(ts|tsx)$/.test(n) ? [{ file: p, text: readFileSync(p, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '') }] : [];
  });
}
const SRC = sources('src');
const uses = (re: RegExp) => SRC.filter((s) => re.test(s.text)).map((s) => s.file);

describe('release audit', () => {
  it('makes no runtime network calls', () => {
    expect(uses(/\bfetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon|https?:\/\/(?!localhost)[^\s'"`]*\.(js|json)\b/)).toEqual([]);
  });
  it('touches localStorage only in the notes, disclaimer gate, storage helpers and legacy purge', () => {
    expect(uses(/localStorage|sessionStorage|indexedDB|document\.cookie/).sort()).toEqual(
      ['src/components/DisclaimerGate.tsx', 'src/lib/patientContext.ts', 'src/lib/storage.ts'].sort(),
    );
  });
  it('only ever writes the note and disclaimer keys', () => {
    const storage = readFileSync('src/lib/storage.ts', 'utf8');
    expect(storage).toMatch(/NOTE_PREFIX\s*=\s*'neurohosp\.note\.v1\./);
    expect(readFileSync('src/components/DisclaimerGate.tsx', 'utf8')).toMatch(/neurohosp\.disclaimerAck/);
    expect(readFileSync('src/lib/patientContext.ts', 'utf8')).not.toMatch(/setItem/);
  });
  it('shows the footer on every entry and calculator view', () => {
    expect(readFileSync('src/components/ReferenceCard.tsx', 'utf8')).toContain('<EntryFooter');
    expect(readFileSync('src/components/ProtocolViews.tsx', 'utf8')).toContain('<EntryFooter');
    expect(readFileSync('src/components/calcShared.tsx', 'utf8')).toContain('calcFooterText');
  });
  it('shows banners on every registry entry', () => {
    expect(readFileSync('src/components/ReferenceCard.tsx', 'utf8')).toContain('<BannerList');
    expect(readFileSync('src/components/ProtocolViews.tsx', 'utf8')).toContain('<BannerList');
  });
  it('ties the service-worker cache name to the content version', () => {
    const cfg = readFileSync('vite.config.ts', 'utf8');
    expect(cfg).toMatch(/cacheId:\s*`neurohosp-\$\{contentVersion\}`/);
    expect(cfg).toContain('generated/about.json');
  });
});
