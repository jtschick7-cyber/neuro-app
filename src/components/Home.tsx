import { APP_NAME } from '../content/copy';
import { SECTIONS } from '../lib/nav';

/** Landing screen: one large tile per available section. (Global search arrives in a later milestone.) */
export default function Home() {
  const tiles = SECTIONS.filter((s) => s.built && s.id !== 'home');
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold text-slate-100">{APP_NAME}</h1>
      <ul className="grid gap-2">
        {tiles.map((s) => (
          <li key={s.id}>
            <a href={s.hash} className="block rounded-xl border border-slate-700 bg-slate-900 p-4 hover:border-sky-500">
              <div className="text-base font-semibold text-slate-100">{s.label}</div>
              <div className="text-sm text-slate-400">{s.blurb}</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
