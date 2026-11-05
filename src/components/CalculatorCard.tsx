import type { ReactNode } from 'react';
import BedsideNotes from './BedsideNotes';

interface Props {
  /** Stable id used to persist this card's bedside note. */
  noteId: string;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  children: ReactNode;
  /** Highlighted when opened from a cross-link (`#/calc/<id>`). */
  focused?: boolean;
}

export default function CalculatorCard({ noteId, title, subtitle, icon, children, focused = false }: Props) {
  return (
    <section
      id={noteId}
      className={`scroll-mt-32 rounded-xl border bg-slate-900 p-4 ${focused ? 'border-sky-400 ring-1 ring-sky-400' : 'border-slate-700'}`}
    >
      <div className="mb-3 flex items-center gap-2">
        {icon && <span className="text-sky-400">{icon}</span>}
        <div>
          <h2 className="text-base font-semibold text-slate-100">{title}</h2>
          {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {children}
      <BedsideNotes noteId={noteId} />
    </section>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder,
  step = 'any',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  step?: string;
}) {
  return (
    <label className="block text-xs text-slate-400">
      {label}
      <input
        type="number"
        inputMode="decimal"
        min="0"
        step={step}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-0.5 w-full rounded-md border border-slate-600 bg-slate-800 px-2 py-1.5 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
      />
    </label>
  );
}

export function NeedWeight() {
  return <p className="text-sm text-amber-300">Enter patient weight in the top bar.</p>;
}
