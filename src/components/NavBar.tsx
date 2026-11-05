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
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-700 bg-slate-900/95 backdrop-blur"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <ul className="mx-auto flex max-w-3xl">
        {SECTIONS.filter((s) => s.built).map((s) => {
          const Icon = ICONS[s.id];
          const on = s.id === active;
          return (
            <li key={s.id} className="flex-1">
              <a
                href={s.hash}
                aria-current={on ? 'page' : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${on ? 'text-sky-300' : 'text-slate-400'}`}
              >
                <Icon size={22} aria-hidden="true" />
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
