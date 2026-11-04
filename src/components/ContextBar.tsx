import { Eraser } from 'lucide-react';
import type { PatientContext, Sex } from '../lib/patientContext';

interface Props {
  context: PatientContext;
  onChange: (patch: Partial<PatientContext>) => void;
  onClear: () => void;
}

const inputCls =
  'w-full rounded-md border border-slate-600 bg-slate-800 px-2 py-1.5 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none';

export default function ContextBar({ context, onChange, onClear }: Props) {
  return (
    <header
      className="sticky top-0 z-20 border-b border-slate-700 bg-slate-900/95 px-3 pb-2 backdrop-blur"
      style={{ paddingTop: 'max(0.5rem, env(safe-area-inset-top))' }}
      aria-label="Patient context"
    >
      <div className="mx-auto flex max-w-3xl items-end gap-2">
        <label className="flex-1 text-xs text-slate-400">
          Weight (kg)
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.1"
            className={inputCls}
            value={context.weightKg}
            onChange={(e) => onChange({ weightKg: e.target.value })}
            placeholder="70"
          />
        </label>
        <label className="w-16 text-xs text-slate-400">
          Age
          <input
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            className={inputCls}
            value={context.age}
            onChange={(e) => onChange({ age: e.target.value })}
            placeholder="65"
          />
        </label>
        <label className="w-16 text-xs text-slate-400">
          Sex
          <select
            className={inputCls}
            value={context.sex}
            onChange={(e) => onChange({ sex: e.target.value as Sex })}
          >
            <option value="">—</option>
            <option value="M">M</option>
            <option value="F">F</option>
          </select>
        </label>
        <label className="flex-1 text-xs text-slate-400">
          Cr (mg/dL)
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            className={inputCls}
            value={context.creatinine}
            onChange={(e) => onChange({ creatinine: e.target.value })}
            placeholder="1.0"
          />
        </label>
        <button
          type="button"
          onClick={onClear}
          className="rounded-md border border-slate-600 p-2 text-slate-300 hover:bg-slate-800"
          aria-label="Clear patient context"
          title="Clear"
        >
          <Eraser size={18} />
        </button>
      </div>
    </header>
  );
}
