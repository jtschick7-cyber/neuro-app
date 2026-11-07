import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Enforces CLAUDE.md: no runtime network calls, and only the allowed localStorage keys.
function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return sourceFiles(p);
    return /\.(ts|tsx)$/.test(name) ? [p] : [];
  });
}

const files = sourceFiles('src').map((p) => ({ path: p, text: readFileSync(p, 'utf8') }));

describe('offline guards', () => {
  it('finds source files to scan', () => {
    expect(files.length).toBeGreaterThan(10);
  });

  it('makes no network calls', () => {
    const banned = /\b(fetch\s*\(|XMLHttpRequest|WebSocket|EventSource|sendBeacon|importScripts)\b/;
    const hits = files.filter((f) => banned.test(f.text)).map((f) => f.path);
    expect(hits).toEqual([]);
  });

  it('loads no remote URLs (http/https) in code', () => {
    const hits = files.filter((f) => /["'`]https?:\/\//.test(f.text)).map((f) => f.path);
    expect(hits).toEqual([]);
  });

  it('uses only allowed storage mechanisms', () => {
    const hits = files.filter((f) => /\b(sessionStorage|indexedDB|document\.cookie)\b/.test(f.text)).map((f) => f.path);
    expect(hits).toEqual([]);
  });

  it('uses only allowed localStorage keys', () => {
    // Notes prefix, disclaimer acknowledgment, pinned entry ids (4.4, approved), and the legacy patient-context key (purged on load, never written).
    const allowed = new Set(['neurohosp.note.v1.', 'neurohosp.disclaimerAck', 'neurohosp.pins.v1', 'neurohosp.patientContext.v1']);
    const found = new Set(files.flatMap((f) => f.text.match(/neurohosp\.[A-Za-z0-9.]+/g) ?? []));
    expect([...found].filter((k) => !allowed.has(k))).toEqual([]);
  });

  it('never writes the legacy patient-context key', () => {
    const p = files.find((f) => f.path.endsWith('patientContext.ts'))!;
    expect(p.text).not.toMatch(/setItem\(\s*LEGACY_STORAGE_KEY/);
    expect(p.text).not.toMatch(/saveJson\(\s*LEGACY_STORAGE_KEY/);
  });

  it('keeps setItem/saveJson confined to storage, notes and the disclaimer gate', () => {
    const writers = files.filter((f) => /\.setItem\(|\bsaveJson\(|\bsaveNote\(/.test(f.text)).map((f) => f.path.replace(/\\/g, '/'));
    expect(writers.sort()).toEqual(['src/components/BedsideNotes.tsx', 'src/components/DisclaimerGate.tsx', 'src/lib/storage.ts']);
  });
});
