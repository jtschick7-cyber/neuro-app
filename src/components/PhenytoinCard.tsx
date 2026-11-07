import { useState } from 'react';
import { FlaskConical } from 'lucide-react';
import { CheckField, NumberField, SelectField } from './CalculatorCard';
import { Card, Warnings, parseNonNegative, safe } from './calcShared';
import { phenytoinCorrection, type PhenytoinCorrectionInput } from '../lib/calculators';

const ROUTE_OPTIONS = [
  { value: 'IV', label: 'IV' },
  { value: 'IM', label: 'IM' },
];

/** Optional numeric field: blank → undefined (the calculator treats it as not entered). */
const opt = (v: string): number | undefined => parseNonNegative(v) ?? undefined;

/** Phenytoin albumin correction and fosphenytoin reload estimate. All math is phenytoinCorrection(); this card only collects inputs. */
export function PhenytoinCard({ weightKg }: { weightKg: number | null }) {
  const [total, setTotal] = useState('');
  const [albumin, setAlbumin] = useState('');
  const [free, setFree] = useState('');
  const [target, setTarget] = useState('15');
  const [hours, setHours] = useState('');
  const [route, setRoute] = useState<'IV' | 'IM'>('IV');
  const [dialysis, setDialysis] = useState(false);
  const [valproate, setValproate] = useState(false);

  const measuredTotal = parseNonNegative(total);
  const input = (): PhenytoinCorrectionInput => ({
    measuredTotal: measuredTotal as number,
    albuminGdl: opt(albumin),
    measuredFree: opt(free),
    weightKg: weightKg ?? undefined,
    targetTotal: opt(target),
    onDialysis: dialysis,
    onValproate: valproate,
    hoursSinceFosphenytoin: opt(hours),
    fosphenytoinRoute: route,
  });
  const r = measuredTotal === null ? null : safe(() => phenytoinCorrection(input()));

  return (
    <Card
      noteId="calc-phenytoin"
      title="Phenytoin level correction"
      subtitle="Sheiner-Tozer albumin correction and fosphenytoin reload estimate"
      icon={<FlaskConical size={18} />}
      metaIds={['phenytoin-correction']}
    >
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="Total phenytoin (mcg/mL)" value={total} onChange={setTotal} placeholder="8" />
        <NumberField label="Albumin (g/dL)" value={albumin} onChange={setAlbumin} placeholder="optional" />
        <NumberField label="Measured free (mcg/mL)" value={free} onChange={setFree} placeholder="optional" />
        <NumberField label="Target total (10–20)" value={target} onChange={setTarget} />
        <NumberField label="Hours since fosphenytoin" value={hours} onChange={setHours} placeholder="optional" />
        <SelectField label="Fosphenytoin route" value={route} onChange={(v) => setRoute(v as 'IV' | 'IM')} options={ROUTE_OPTIONS} />
      </div>
      <CheckField label="On dialysis" checked={dialysis} onChange={setDialysis} />
      <CheckField label="On valproate" checked={valproate} onChange={setValproate} />
      {weightKg === null && <p className="text-xs text-amber-300">Enter weight in the top bar for a reload estimate.</p>}
      {r === null ? (
        <p className="py-2 text-sm text-slate-400">Enter the measured total level.</p>
      ) : typeof r === 'string' ? (
        <p className="py-2 text-sm text-red-300">{r}</p>
      ) : (
        <div className="py-2">
          <div className="text-sm text-slate-200">{r.parts?.primary === 'MEASURED_FREE' ? 'Measured free level' : 'Corrected total'}</div>
          <div className="text-2xl font-bold text-sky-400">
            {r.value} {r.unit}
          </div>
          <div className="text-sm text-slate-300">{r.display}</div>
          <Warnings items={r.warnings} />
        </div>
      )}
    </Card>
  );
}
