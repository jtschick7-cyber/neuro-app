import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { UPDATE_COPY } from '../content/copy';
import { watchForUpdates } from '../lib/updateCheck';

/**
 * Persistent bar shown while a new version is waiting. The new service worker stays waiting (registerType
 * 'prompt'), so the current version and its cached sections keep working until the user taps Reload.
 */
export default function UpdateBar() {
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | undefined>();
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({ onRegisteredSW: (_url, reg) => setRegistration(reg) });

  useEffect(() => (registration ? watchForUpdates(registration, document) : undefined), [registration]);

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
