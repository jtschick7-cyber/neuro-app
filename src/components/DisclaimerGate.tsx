import { useState } from 'react';
import { DISCLAIMER_GATE, DISCLAIMER_REVISION } from '../content/copy';

const ACK_KEY = 'neurohosp.disclaimerAck';

function acknowledged(): boolean {
  try {
    return localStorage.getItem(ACK_KEY) === String(DISCLAIMER_REVISION);
  } catch {
    return false;
  }
}

/** Blocks the app until the current disclaimer revision is acknowledged (the acknowledgment is the only thing stored). */
export default function DisclaimerGate({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(acknowledged);
  if (ok) return <>{children}</>;
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4 text-slate-200">
      <div className="max-w-lg rounded-xl border border-slate-700 bg-slate-900 p-5">
        <h1 className="mb-3 text-lg font-semibold text-slate-100">{DISCLAIMER_GATE.title}</h1>
        <ul className="list-disc space-y-2 pl-5 text-sm">
          {DISCLAIMER_GATE.body.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            try {
              localStorage.setItem(ACK_KEY, String(DISCLAIMER_REVISION));
            } catch {
              // storage unavailable — gate shows again next launch
            }
            setOk(true);
          }}
          className="mt-5 w-full rounded-lg bg-sky-600 py-2.5 text-base font-semibold text-white hover:bg-sky-500"
        >
          {DISCLAIMER_GATE.acknowledge}
        </button>
      </div>
    </div>
  );
}
