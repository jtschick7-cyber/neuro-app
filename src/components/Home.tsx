import { ChevronRight } from 'lucide-react';
import { APP_NAME } from '../content/copy';
import { SECTIONS, type SectionId } from '../lib/nav';
import { GlobalSearch } from './GlobalSearch';
import { PinnedList } from './Pins';

/** Semantic accent per section: left border and blurb tint (static strings so Tailwind keeps them). */
const ACCENT: Partial<Record<SectionId, { border: string; text: string }>> = {
  acute: { border: 'border-l-rose-500', text: 'text-rose-400' },
  consults: { border: 'border-l-sky-400', text: 'text-sky-400' },
  drugs: { border: 'border-l-amber-500', text: 'text-amber-400' },
  antibodies: { border: 'border-l-purple-500', text: 'text-purple-400' },
  calc: { border: 'border-l-emerald-500', text: 'text-emerald-400' },
};

/** Landing screen: global search over every registry and calculator, then one tile per section. */
export default function Home() {
  const tiles = SECTIONS.filter((s) => s.built && s.id !== 'home');
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold text-slate-100">{APP_NAME}</h1>
      <GlobalSearch>
        <div className="space-y-3">
          <PinnedList />
          <ul className="grid gap-2">
            {tiles.map((s) => (
              <li key={s.id}>
                <a
                  href={s.hash}
                  className={`flex items-center justify-between gap-2 rounded-xl border border-l-4 border-slate-800 bg-slate-900/90 p-4 hover:border-sky-500 ${ACCENT[s.id]?.border ?? ''}`}
                >
                  <div>
                    <div className="text-base font-semibold text-slate-100">{s.label}</div>
                    <div className={`text-sm ${ACCENT[s.id]?.text ?? 'text-slate-400'}`}>{s.blurb}</div>
                  </div>
                  <ChevronRight size={20} aria-hidden="true" className="shrink-0 text-slate-400" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </GlobalSearch>
    </div>
  );
}
