/**
 * Ask the service worker to look for a new version whenever the app comes back to the foreground.
 * iOS only checks on a cold launch, so an app left in the switcher would otherwise stay on old content for days.
 * Throttled; offline failures are ignored (the next resume tries again).
 */
export const UPDATE_CHECK_MIN_INTERVAL_MS = 60_000;

type Updatable = Pick<ServiceWorkerRegistration, 'update'>;
type VisibilityTarget = Pick<Document, 'visibilityState' | 'addEventListener' | 'removeEventListener'>;

export function watchForUpdates(registration: Updatable, doc: VisibilityTarget, now: () => number = Date.now): () => void {
  let last = now();
  const onVisible = () => {
    if (doc.visibilityState !== 'visible' || now() - last < UPDATE_CHECK_MIN_INTERVAL_MS) return;
    last = now();
    registration.update().catch(() => undefined);
  };
  doc.addEventListener('visibilitychange', onVisible);
  return () => doc.removeEventListener('visibilitychange', onVisible);
}
