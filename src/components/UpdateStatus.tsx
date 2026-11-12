import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { UPDATE_COPY } from '../content/copy';
import { checkForUpdateNow, lastUpdateCheck, onUpdateChecked, type UpdateCheckResult } from '../lib/updateCheck';

const time = (d: Date | null) => (d ? d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : UPDATE_COPY.notYet);

/** About → versions: offline status, storage persistence, last update check and a manual "Check for update". */
export default function UpdateStatus() {
  const [checked, setChecked] = useState(lastUpdateCheck());
  const [result, setResult] = useState<UpdateCheckResult | 'CHECKING' | null>(null);
  const [persisted, setPersisted] = useState<boolean | null>(null);
  const offline = typeof navigator !== 'undefined' && !!navigator.serviceWorker?.controller;

  useEffect(() => {
    navigator.storage?.persisted?.().then(setPersisted, () => setPersisted(false));
  }, []);
  useEffect(() => onUpdateChecked(setChecked), []);

  const check = async () => {
    setResult('CHECKING');
    setResult(await checkForUpdateNow());
  };

  return (
    <>
      <dt className="text-slate-400">{UPDATE_COPY.offlineLabel}</dt>
      <dd>{offline ? UPDATE_COPY.offlineReady : UPDATE_COPY.offlineNotReady}</dd>
      <dt className="text-slate-400">{UPDATE_COPY.storageLabel}</dt>
      <dd>{persisted === null ? '—' : persisted ? UPDATE_COPY.storagePersisted : UPDATE_COPY.storageBestEffort}</dd>
      <dt className="text-slate-400">{UPDATE_COPY.lastCheckedLabel}</dt>
      <dd>{time(checked)}</dd>
      <dd className="col-span-2 mt-1 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => void check()}
          disabled={result === 'CHECKING'}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-slate-600 px-3 text-sm font-medium text-slate-100 active:bg-slate-800 disabled:opacity-60"
        >
          <RefreshCw size={16} aria-hidden="true" /> {UPDATE_COPY.checkNow}
        </button>
        {result && <span className="text-xs text-slate-300">{UPDATE_COPY.result[result]}</span>}
      </dd>
    </>
  );
}
