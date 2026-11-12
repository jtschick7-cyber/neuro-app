import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { UPDATE_COPY } from '../content/copy';
import { markUpdateChecked, requestPersistentStorage, watchForUpdates } from '../lib/updateCheck';

/**
 * Persistent bar shown while a new version is waiting. The new service worker stays waiting (registerType
 * 'prompt'), so the current version and its cached sections keep working until the user taps Reload.
 */
export default function UpdateBar() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | undefined>();
  const {
    needRefresh: [needRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    // Registration checks for a new worker, so it counts as an update check.
    onRegisteredSW: (_url, reg) => (setRegistration(reg), markUpdateChecked()),
  });

  useEffect(() => (registration ? watchForUpdates(registration, document) : undefined), [registration]);
  // Ask the browser not to evict notes, pins and the offline cache (audit P2-4).
  useEffect(() => void requestPersistentStorage(), []);
  // One-time "saved for offline" notice after the first install; hides itself.
  useEffect(() => {
    if (!offlineReady) return;
    const t = setTimeout(() => setOfflineReady(false), 6000);
    return () => clearTimeout(t);
  }, [offlineReady, setOfflineReady]);

  if (!needRefresh && offlineReady)
    return (
      <div
        role="status"
        className="fixed left-3 z-30 flex items-center gap-3 rounded-lg border border-emerald-500/60 bg-slate-900/95 py-2 pl-3 pr-2 text-sm text-slate-100 shadow-lg shadow-black/40 backdrop-blur"
        style={{ bottom: 'calc(4.25rem + env(safe-area-inset-bottom))', right: 'calc(4.5rem + env(safe-area-inset-right))', marginLeft: 'env(safe-area-inset-left)' }}
      >
        <span className="flex-1">{UPDATE_COPY.offlineToast}</span>
        <button type="button" onClick={() => setOfflineReady(false)} className="min-h-11 rounded-md px-3 text-sm text-slate-300 active:bg-slate-800">
          {UPDATE_COPY.dismiss}
        </button>
      </div>
    );
  if (!needRefresh) return null;
  return (
    <div
      role="status"
      className="fixed left-3 z-30 flex items-center gap-3 rounded-lg border border-sky-500/60 bg-slate-900/95 py-2 pl-3 pr-2 text-sm text-slate-100 shadow-lg shadow-black/40 backdrop-blur"
      style={{ bottom: 'calc(4.25rem + env(safe-area-inset-bottom))', right: 'calc(4.5rem + env(safe-area-inset-right))', marginLeft: 'env(safe-area-inset-left)' }}
    >
      <span className="flex-1">{UPDATE_COPY.available}</span>
      <button
        type="button"
        onClick={() => void updateServiceWorker(true)}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md bg-sky-600 px-3 font-medium text-white active:bg-sky-700"
      >
        <RefreshCw size={16} aria-hidden="true" /> {UPDATE_COPY.reload}
      </button>
    </div>
  );
}
