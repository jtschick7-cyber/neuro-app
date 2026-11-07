import { useEffect, useRef } from 'react';
import { REGISTRIES, type RegistryId, type RegistryInfo } from '../lib/nav';
import { toHash } from '../lib/route';

/** Tab strip across a section (Drugs by default): every built registry that belongs to it. */
export default function DrugTabs({ active, section = 'drugs' }: { active: RegistryId; section?: RegistryInfo['section'] }) {
  const tabs = REGISTRIES.filter((r) => r.section === section && r.built);
  // The strip scrolls sideways on a phone; keep the active tab visible.
  const activeRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    // Block body on purpose: newer browsers return a Promise from scrollIntoView, which must not become the effect cleanup.
    activeRef.current?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
  }, [active]);
  return (
    <div className="flex gap-1 overflow-x-auto rounded-lg bg-slate-900 p-1" aria-label={section === 'drugs' ? 'Drug references' : 'References in this section'}>
      {tabs.map((r) => (
        <a
          key={r.id}
          ref={r.id === active ? activeRef : undefined}
          href={toHash({ kind: 'registry', registry: r.id })}
          aria-current={r.id === active ? 'page' : undefined}
          className={`flex min-h-10 flex-1 items-center justify-center whitespace-nowrap rounded-md px-2 py-1.5 text-center text-xs font-medium ${r.id === active ? 'bg-slate-700 text-slate-100' : 'text-slate-400'}`}
        >
          {r.tabLabel ?? r.label}
        </a>
      ))}
    </div>
  );
}
