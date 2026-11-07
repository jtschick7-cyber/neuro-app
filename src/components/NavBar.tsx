import { Calculator, House, Microscope, Pill, Siren, ClipboardList, type LucideIcon } from 'lucide-react';
import { SECTIONS, type SectionId } from '../lib/nav';

const ICONS: Record<SectionId, LucideIcon> = {
  home: House,
  acute: Siren,
  consults: ClipboardList,
  drugs: Pill,
  antibodies: Microscope,
  calc: Calculator,
};

/** Bottom navigation (thumb reach). Only sections that have a screen are shown. */
export default function NavBar({ active }: { active: SectionId }) {
  const items = SECTIONS.filter((s) => s.built);
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-700 bg-slate-900/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)', paddingLeft: 'env(safe-area-inset-left)', paddingRight: 'env(safe-area-inset-right)' }}
    >
      <ul className="mx-auto grid max-w-3xl" style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}>
        {items.map((s) => {
          const Icon = ICONS[s.id];
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={s.hash}
                aria-label={s.label}
                aria-current={on ? 'page' : undefined}
                className="flex min-h-14 items-center justify-center px-0.5 text-center text-[11px] font-medium tracking-tight"
              >
                <span className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-0.5 ${on ? 'bg-sky-500/15 text-sky-400' : 'text-slate-400'}`}>
                  <Icon size={22} aria-hidden="true" />
                  {s.navLabel ?? s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
