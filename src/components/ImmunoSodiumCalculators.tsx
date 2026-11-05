import { useState } from 'react';
import { Activity, Droplets } from 'lucide-react';
import { CheckField, NeedWeight, NumberField, SelectField } from './CalculatorCard';
import { Card, Result, parseNonNegative, safe } from './calcShared';
import { adjustedBodyWeight, hyponatremiaBolus, idealBodyWeight, ivigDose, sodiumCorrectionCheck } from '../lib/calculators';
import { type Sex } from '../lib/patientContext';

/** Display-only rounding for the reference line; dosing uses the unrounded helper values. */
const kg1 = (n: number): string => n.toFixed(1);

type WeightBasis = 'actual' | 'ideal' | 'adjusted';
type IvigDays = 2 | 3 | 4 | 5;

const BASIS_OPTIONS = [
  { value: 'actual', label: 'Actual body weight' },
  { value: 'ideal', label: 'Ideal body weight' },
  { value: 'adjusted', label: 'Adjusted body weight' },
];
const DAYS_OPTIONS = [2, 3, 4, 5].map((d) => ({ value: String(d), label: `${d} days` }));

export function IvigCard({ weightKg, sex }: { weightKg: number | null; sex: Sex }) {
  const [height, setHeight] = useState('');
  const [basis, setBasis] = useState<WeightBasis>('actual');
  const [days, setDays] = useState<IvigDays>(5);
  const h = parseNonNegative(height);
  const female = sex === 'F';
  const needsHeight = basis !== 'actual';
  const missing: string[] = [];
  if (weightKg === null) missing.push('weight');
  if (needsHeight && sex === '') missing.push('sex');
  if (needsHeight && (h === null || h === 0)) missing.push('height');

  // Selected dosing weight, computed with the clinical helpers (never re-implemented here).
  const dosing = (): number => {
    if (weightKg === null) throw new RangeError('Enter weight');
    if (basis === 'actual') return weightKg;
    const hh = h ?? 0;
    return basis === 'ideal' ? idealBodyWeight(hh, female) : adjustedBodyWeight(weightKg, hh, female);
  };

  const ready = missing.length === 0;
  const weightsShown =
    weightKg !== null && h !== null && h > 0 && sex !== ''
      ? safe(() => ({
          value: 0,
          unit: 'kg',
          display: `Actual ${kg1(weightKg)} kg · Ideal ${kg1(idealBodyWeight(h, female))} kg · Adjusted ${kg1(adjustedBodyWeight(weightKg, h, female))} kg`,
          capped: false,
          warnings: [],
        }))
      : null;

  return (
    <Card noteId="calc-ivig" title="IVIG" subtitle="2 g/kg total over 2–5 days (e.g. GBS, CIDP, MG)" icon={<Activity size={18} />} metaIds={['ivig-dose']}>
      <div className="grid grid-cols-2 gap-2">
        <SelectField label="Dosing weight" value={basis} onChange={(v) => setBasis(v as WeightBasis)} options={BASIS_OPTIONS} />
        <SelectField label="Duration" value={String(days)} onChange={(v) => setDays(Number(v) as IvigDays)} options={DAYS_OPTIONS} />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <NumberField label="Height (cm), for ideal/adjusted" value={height} onChange={setHeight} step="1" placeholder="170" />
      </div>
      {weightKg === null && <NeedWeight />}
      {needsHeight && weightKg !== null && missing.length > 0 && (
        <p className="text-sm text-amber-300">Enter {missing.join(' and ')} ({sex === '' ? 'sex is in the top bar' : 'height is above'}).</p>
      )}
      {typeof weightsShown === 'string' && <p className="py-1 text-sm text-red-300">{weightsShown}</p>}
      {weightsShown !== null && typeof weightsShown !== 'string' && <p className="py-1 text-xs text-slate-400">{weightsShown.display}</p>}
      {ready && <Result label={`IVIG, ${basis} body weight`} r={safe(() => ivigDose(dosing(), { days }))} />}
    </Card>
  );
}

const BOLUS_OPTIONS = [
  { value: 'ese', label: 'ESE 2014: 150 mL fixed' },
  { value: 'salsa-moderate', label: 'SALSA: 2 mL/kg (moderate)' },
  { value: 'salsa-severe', label: 'SALSA: 4 mL/kg (severe)' },
];
type BolusMode = 'ese' | 'salsa-moderate' | 'salsa-severe';

export function SodiumCard({ weightKg }: { weightKg: number | null }) {
  const [mode, setMode] = useState<BolusMode>('ese');
  const [startNa, setStartNa] = useState('');
  const [currentNa, setCurrentNa] = useState('');
  const [period, setPeriod] = useState('1');
  const [ods, setOds] = useState(false);
  const s = parseNonNegative(startNa);
  const c = parseNonNegative(currentNa);
  const p = parseNonNegative(period);

  return (
    <Card
      noteId="calc-sodium"
      title="Hyponatremia"
      subtitle="3% saline bolus and correction-rate check"
      icon={<Droplets size={18} />}
      metaIds={['sodium-correction']}
    >
      <SelectField label="3% NaCl bolus" value={mode} onChange={(v) => setMode(v as BolusMode)} options={BOLUS_OPTIONS} />
      {mode !== 'ese' && weightKg === null ? <NeedWeight /> : <Result label="3% NaCl bolus" r={safe(() => hyponatremiaBolus(mode, weightKg ?? undefined))} />}
      <div className="mt-3 border-t border-slate-800 pt-2">
        <div className="text-xs font-semibold text-slate-400">Correction limit check</div>
        <div className="mt-1 grid grid-cols-3 gap-2">
          <NumberField label="Starting Na" value={startNa} onChange={setStartNa} step="1" placeholder="118" />
          <NumberField label="Current Na" value={currentNa} onChange={setCurrentNa} step="1" placeholder="126" />
          <NumberField label="24-h period #" value={period} onChange={setPeriod} step="1" placeholder="1" />
        </div>
        <CheckField label="High ODS risk (Na ≤105, alcoholism, malnutrition, liver disease, hypokalemia)" checked={ods} onChange={setOds} />
        {s !== null && c !== null && p !== null && (
          <Result label="Correction" r={safe(() => sodiumCorrectionCheck({ startNa: s, currentNa: c, periodNumber: p, odsRisk: ods }))} />
        )}
      </div>
    </Card>
  );
}
