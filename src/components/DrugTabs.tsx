import { REGISTRIES, type RegistryId } from '../lib/nav';
import { toHash } from '../lib/route';

/** Tab strip across the Drugs section: every built registry that belongs to it. */
export default function DrugTabs({ active }: { active: RegistryId }) {
  const tabs = REGISTRIES.filter((r) => r.section === 'drugs' && r.built);
  return (
    <div className="flex gap-1 overflow-x-auto rounded-lg bg-slate-900 p-1" aria-label="Drug references">
      {tabs.map((r) => (
        <a
          key={r.id}
          href={toHash({ kind: 'registry', registry: r.id })}
          aria-current={r.id === active ? 'page' : undefined}
          className={`flex min-h-10 flex-1 items-center justify-center whitespace-nowrap rounded-md px-2 py-1.5 text-center text-xs font-medium ${r.id === active ? 'bg-slate-700 text-slate-100' : 'text-slate-400'}`}
        >
          {r.label}
        </a>
      ))}
    </div>
  );
}
