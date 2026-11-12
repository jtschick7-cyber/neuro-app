import { useState } from 'react';
import { ChevronDown, ChevronUp, Eraser } from 'lucide-react';
import type { PatientContext, Sex } from '../lib/patientContext';
import { CONTEXT_BAR_COPY } from '../content/copy';

interface Props {
  context: PatientContext;
  onChange: (patch: Partial<PatientContext>) => void;
  onClear: () => void;
  /** Always show the full input row (calculator screens). */
  forceExpanded?: boolean;
}

/** One-line summary of entered values ("70 kg · 64 y · M · Cr 1.1"); empty string when nothing is entered. */
export function contextSummary(c: PatientContext): string {
  const parts = [
    c.weightKg.trim() && `${c.weightKg.trim()} kg`,
    c.age.trim() && `${c.age.trim()} y`,
    c.sex,
    c.creatinine.trim() && `Cr ${c.creatinine.trim()}`,
  ];
  return parts.filter((p) => p !== '').join(' · ');
}

const baseCls = 'block h-11 w-full rounded-md border px-2 text-base placeholder:italic placeholder:text-slate-600 focus:border-sky-400 focus:outline-none';
/** Entered values are visibly confirmed; untouched fields stay muted so nothing looks like patient data by default. */
const fieldCls = (filled: boolean) =>
  `${baseCls} ${filled ? 'border-sky-500/60 bg-sky-950/25 font-semibold text-sky-100' : 'border-slate-800 bg-slate-900/60 text-slate-400'}`;

export default function ContextBar({ context, onChange, onClear, forceExpanded = false }: Props) {
  const [open, setOpen] = useState(false);
  const expanded = forceExpanded || open;
  const summary = contextSummary(context);
  return (
    <header
      className="sticky top-0 z-20 border-b border-slate-700 bg-slate-900/95 pb-2 backdrop-blur"
      style={{
        // Extra 1.75rem on top of the inset: the iOS standalone status bar (black-translucent) can overlap the first rows below it.
        paddingTop: 'calc(1.75rem + env(safe-area-inset-top))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
      }}
      aria-label="Patient context"
    >
      {!expanded && (
        <div className="mx-auto flex max-w-3xl items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={false}
            aria-label={CONTEXT_BAR_COPY.expand}
            className={`flex h-10 min-w-0 flex-1 items-center justify-between gap-2 rounded-md border px-3 text-left text-sm ${summary ? 'border-sky-500/60 bg-sky-950/25 font-semibold text-sky-100' : 'border-slate-800 bg-slate-900/60 text-slate-400'}`}
          >
            <span className="truncate">{summary ? `${CONTEXT_BAR_COPY.prefix} ${summary}` : CONTEXT_BAR_COPY.empty}</span>
            <ChevronDown size={16} aria-hidden="true" className="shrink-0 text-slate-400" />
          </button>
          {summary && <ClearButton onClear={onClear} />}
        </div>
      )}
      {expanded && (
        <div className="mx-auto flex max-w-3xl items-end gap-2">
          <label className="min-w-0 flex-1 text-xs font-medium text-slate-400">
            Weight (kg)
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              className={fieldCls(context.weightKg.trim() !== '')}
              value={context.weightKg}
              onChange={(e) => onChange({ weightKg: e.target.value })}
              placeholder="—"
            />
          </label>
          <label className="w-14 shrink-0 text-xs font-medium text-slate-400">
            Age
            <input
              type="number"
              inputMode="numeric"
              min="0"
              step="1"
              className={fieldCls(context.age.trim() !== '')}
              value={context.age}
              onChange={(e) => onChange({ age: e.target.value })}
              placeholder="—"
            />
          </label>
          <label className="relative w-16 shrink-0 text-xs font-medium text-slate-400">
            Sex
            <select
              className={`${fieldCls(context.sex !== '')} appearance-none pr-6`}
              value={context.sex}
              onChange={(e) => onChange({ sex: e.target.value as Sex })}
            >
              <option value="">—</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
            <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute bottom-3 right-2 text-slate-400" />
          </label>
          <label className="min-w-0 flex-1 text-xs font-medium text-slate-400">
            Cr (mg/dL)
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              className={fieldCls(context.creatinine.trim() !== '')}
              value={context.creatinine}
              onChange={(e) => onChange({ creatinine: e.target.value })}
              placeholder="—"
            />
          </label>
          <ClearButton onClear={onClear} />
          {!forceExpanded && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-expanded={true}
              aria-label={CONTEXT_BAR_COPY.collapse}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-300 active:bg-slate-800"
            >
              <ChevronUp size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      )}
    </header>
  );
}

function ClearButton({ onClear }: { onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-300 hover:text-white active:bg-slate-800"
      aria-label="Clear patient context"
      title="Clear"
    >
      <Eraser size={18} />
    </button>
  );
}
