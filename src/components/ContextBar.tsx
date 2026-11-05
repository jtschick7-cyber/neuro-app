import { ChevronDown, Eraser } from 'lucide-react';
import type { PatientContext, Sex } from '../lib/patientContext';

interface Props {
  context: PatientContext;
  onChange: (patch: Partial<PatientContext>) => void;
  onClear: () => void;
}

const baseCls = 'block h-10 w-full rounded-md border px-2 text-base placeholder:italic placeholder:text-slate-600 focus:border-sky-400 focus:outline-none';
/** Entered values are visibly confirmed; untouched fields stay muted so nothing looks like patient data by default. */
const fieldCls = (filled: boolean) =>
  `${baseCls} ${filled ? 'border-sky-500/60 bg-sky-950/25 font-semibold text-sky-100' : 'border-slate-800 bg-slate-900/60 text-slate-400'}`;

export default function ContextBar({ context, onChange, onClear }: Props) {
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
          <ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute bottom-3 right-2 text-slate-500" />
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
        <button
          type="button"
          onClick={onClear}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-slate-700 bg-slate-900 text-slate-300 hover:text-white active:bg-slate-800"
          aria-label="Clear patient context"
          title="Clear"
        >
          <Eraser size={18} />
        </button>
      </div>
    </header>
  );
}
