import { useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { PINS_COPY } from '../content/copy';
import { getRegistry } from '../lib/nav';
import { loadPins, togglePin } from '../lib/storage';

/** Pin/unpin toggle for one entry (4.4). Stores the entry id only. */
export function PinButton({ registryId, entryId }: { registryId: string; entryId: string }) {
  const id = `${registryId}:${entryId}`;
  const [pinned, setPinned] = useState(() => loadPins().includes(id));
  return (
    <button
      type="button"
      onClick={() => setPinned(togglePin(id).includes(id))}
      aria-pressed={pinned}
      aria-label={pinned ? PINS_COPY.unpin : PINS_COPY.pin}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-slate-400 active:bg-slate-800"
    >
      <Star size={20} aria-hidden="true" className={pinned ? 'fill-amber-400 text-amber-400' : ''} />
    </button>
  );
}

/** "registry:entry-id" → readable title without loading the registry ("Convulsive status epilepticus"). */
export function pinTitle(id: string): string {
  const words = id.split(':')[1]?.replace(/-/g, ' ') ?? id;
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** Pinned list at the top of Home; hidden when nothing is pinned. */
export function PinnedList() {
  const pins = loadPins().filter((p) => getRegistry(p.split(':')[0])?.built);
  if (pins.length === 0) return null;
  return (
    <section>
      <h2 className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400">{PINS_COPY.heading}</h2>
      <ul className="space-y-1.5">
        {pins.map((p) => {
          const [reg, entry] = p.split(':');
          return (
            <li key={p}>
              <a
                href={`#/${reg}/${entry}`}
                className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 hover:border-sky-500"
              >
                <span>
                  <span className="block text-base text-slate-100">{pinTitle(p)}</span>
                  <span className="block text-xs text-slate-400">{getRegistry(reg)?.label}</span>
                </span>
                <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-slate-400" />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
