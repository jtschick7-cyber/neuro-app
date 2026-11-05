import { createContext, useContext, type ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import CalculatorCard from './CalculatorCard';
import { CALCULATOR_META, type CalcResult } from '../lib/calculators';
import { calcFooterText } from '../lib/banners';
import about from '../../generated/about.json';

/** noteId of the card to highlight when opened via `#/calc/<id>`. */
export const FocusContext = createContext<string | undefined>(undefined);

/** Calculators throw RangeError on out-of-range input; show the message instead of crashing. */
export function safe(fn: () => CalcResult): CalcResult | string {
  try {
    return fn();
  } catch (e) {
    return e instanceof Error ? e.message : 'Invalid input';
  }
}

export function parseNonNegative(v: string): number | null {
  if (v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

export function Warnings({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-1 space-y-0.5">
      {items.map((w) => (
        <li key={w} className="flex gap-1 text-xs text-amber-300">
          <AlertTriangle size={12} className="mt-0.5 shrink-0" /> {w}
        </li>
      ))}
    </ul>
  );
}

export function Result({ r, label }: { r: CalcResult | string; label: string }) {
  if (typeof r === 'string') return <p className="py-2 text-sm text-red-300">{label}: {r}</p>;
  return (
    <div className="py-2">
      <div className="text-sm text-slate-200">{label}</div>
      <div className="text-lg font-semibold text-sky-300">{r.display}</div>
      <Warnings items={r.warnings} />
    </div>
  );
}

/** Formula, caps, rounding and sources straight from CALCULATOR_META. */
function MetaFooter({ ids }: { ids: string[] }) {
  return (
    <details className="mt-2 text-xs text-slate-500">
      <summary className="cursor-pointer">Formula and sources</summary>
      {ids.map((id) => {
        const m = CALCULATOR_META[id];
        return (
          <div key={id} className="mt-1">
            <div className="font-semibold text-slate-400">{m.title}</div>
            <div>Formula: {m.formula}</div>
            {m.caps.length > 0 && <div>Caps: {m.caps.join('; ')}</div>}
            <div>Rounding: {m.rounding}</div>
            <ul className="list-inside list-disc">
              {m.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </details>
  );
}

export function Card(props: { noteId: string; title: string; subtitle: string; icon: ReactNode; metaIds: string[]; children: ReactNode }) {
  const focusNoteId = useContext(FocusContext);
  return (
    <CalculatorCard noteId={props.noteId} title={props.title} subtitle={props.subtitle} icon={props.icon} focused={focusNoteId === props.noteId}>
      {props.children}
      <MetaFooter ids={props.metaIds} />
      <p className="mt-2 text-[11px] text-slate-500">{calcFooterText(about.contentVersion)}</p>
      <p className="text-[11px] text-slate-600">{props.metaIds.map((id) => `calc:${id}`).join(' · ')}</p>
    </CalculatorCard>
  );
}

