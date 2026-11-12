import { describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { UPDATE_CHECK_MIN_INTERVAL_MS, watchForUpdates } from '../src/lib/updateCheck';

function fakeDoc() {
  const listeners = new Set<() => void>();
  const doc = {
    visibilityState: 'visible' as DocumentVisibilityState,
    addEventListener: (_t: string, l: () => void) => listeners.add(l),
    removeEventListener: (_t: string, l: () => void) => listeners.delete(l),
  };
  const fire = (state: DocumentVisibilityState) => ((doc.visibilityState = state), listeners.forEach((l) => l()));
  return { doc: doc as unknown as Document, fire, listeners };
}

describe('update path (audit P1-2)', () => {
  it('checks for a new version on resume, throttled, and stops when disposed', () => {
    let t = 0;
    const update = vi.fn(() => Promise.resolve(undefined as unknown as ServiceWorkerRegistration));
    const { doc, fire, listeners } = fakeDoc();
    const stop = watchForUpdates({ update }, doc, () => t);
    t = UPDATE_CHECK_MIN_INTERVAL_MS + 1;
    fire('hidden');
    expect(update).not.toHaveBeenCalled();
    fire('visible');
    expect(update).toHaveBeenCalledTimes(1);
    t += 1000;
    fire('visible');
    expect(update).toHaveBeenCalledTimes(1);
    stop();
    expect(listeners.size).toBe(0);
  });
  it('swallows an offline update failure', async () => {
    const update = vi.fn(() => Promise.reject(new Error('offline')));
    const { doc, fire } = fakeDoc();
    let t = 0;
    watchForUpdates({ update }, doc, () => t);
    t = UPDATE_CHECK_MIN_INTERVAL_MS + 1;
    expect(() => fire('visible')).not.toThrow();
    await Promise.resolve();
    expect(update).toHaveBeenCalledTimes(1);
  });
  it('waits for a tap instead of activating a new worker mid-session', () => {
    const cfg = readFileSync('vite.config.ts', 'utf8');
    expect(cfg).toMatch(/registerType:\s*'prompt'/);
    expect(cfg).not.toMatch(/skipWaiting|clientsClaim/);
    expect(readFileSync('src/App.tsx', 'utf8')).toContain('<UpdateBar />');
    expect(readFileSync('src/components/UpdateBar.tsx', 'utf8')).toContain('watchForUpdates(');
  });
  it('offers Reload wherever a lazy section can fail to load', () => {
    expect(readFileSync('src/components/ProtocolViews.tsx', 'utf8')).toContain('<LoadError');
    expect(readFileSync('src/components/GlobalSearch.tsx', 'utf8')).toContain('<LoadError');
  });
});
