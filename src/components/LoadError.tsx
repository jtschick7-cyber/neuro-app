import { RefreshCw } from 'lucide-react';
import { UPDATE_COPY } from '../content/copy';

/** Load failure with a Reload button: a standalone iOS app has no browser reload control. */
export default function LoadError({ message }: { message: string }) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-red-300">{message}</p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-slate-600 px-3 text-sm font-medium text-slate-100 active:bg-slate-800"
      >
        <RefreshCw size={16} aria-hidden="true" /> {UPDATE_COPY.reload}
      </button>
    </div>
  );
}
