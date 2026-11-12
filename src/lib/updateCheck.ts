/**
 * Service-worker update checks and offline status helpers.
 * - watchForUpdates: ask for a new version whenever the app returns to the foreground (iOS only checks on a cold
 *   launch, so an app left in the switcher would otherwise stay on old content for days). Throttled; offline failures ignored.
 * - lastUpdateCheck / checkForUpdateNow: shown on About ("last checked", manual check). Memory only, never stored.
 * - requestPersistentStorage: ask the browser not to evict notes, pins and the offline cache.
 */
export const UPDATE_CHECK_MIN_INTERVAL_MS = 60_000;

type Updatable = Pick<ServiceWorkerRegistration, 'update'>;
type VisibilityTarget = Pick<Document, 'visibilityState' | 'addEventListener' | 'removeEventListener'>;

let lastCheck: Date | null = null;
const listeners = new Set<(d: Date) => void>();
export const lastUpdateCheck = (): Date | null => lastCheck;
export const markUpdateChecked = (at = new Date()) => {
  lastCheck = at;
  listeners.forEach((l) => l(at));
};
/** Subscribe to update-check times (About shows them live); returns an unsubscribe function. */
export function onUpdateChecked(l: (d: Date) => void): () => void {
  listeners.add(l);
  return () => void listeners.delete(l);
}

export function watchForUpdates(registration: Updatable, doc: VisibilityTarget, now: () => number = Date.now): () => void {
  let last = now();
  const onVisible = () => {
    if (doc.visibilityState !== 'visible' || now() - last < UPDATE_CHECK_MIN_INTERVAL_MS) return;
    last = now();
    registration.update().then(() => markUpdateChecked(), () => undefined);
  };
  doc.addEventListener('visibilitychange', onVisible);
  return () => doc.removeEventListener('visibilitychange', onVisible);
}

export type UpdateCheckResult = 'UP_TO_DATE' | 'UPDATE_WAITING' | 'OFFLINE' | 'UNSUPPORTED';

/** Manual check from About. A found update shows the Reload bar (UpdateBar) as usual. */
export async function checkForUpdateNow(): Promise<UpdateCheckResult> {
  const reg = await navigator.serviceWorker?.getRegistration().catch(() => undefined);
  if (!reg) return 'UNSUPPORTED';
  try {
    await reg.update();
  } catch {
    return 'OFFLINE';
  }
  markUpdateChecked();
  return reg.waiting || reg.installing ? 'UPDATE_WAITING' : 'UP_TO_DATE';
}

/** Best effort; Safari may grant it only to Home Screen apps. Returns whether storage is persisted. */
export async function requestPersistentStorage(): Promise<boolean> {
  try {
    if (!navigator.storage?.persist) return false;
    return (await navigator.storage.persisted()) || (await navigator.storage.persist());
  } catch {
    return false;
  }
}
