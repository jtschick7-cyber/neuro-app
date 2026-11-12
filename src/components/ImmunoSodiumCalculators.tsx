import { useState } from 'react';
import { Droplets } from 'lucide-react';
import { CheckField, NeedWeight, NumberField, SelectField } from './CalculatorCard';
import { Card, Result, parseNonNegative, safe } from './calcShared';
import { hyponatremiaBolus, sodiumCorrectionCheck } from '../lib/calculators';

const BOLUS_OPTIONS = [
  { value: 'ese', label: 'ESE 2014: 150 mL fixed' },
  { value: 'salsa-moderate', label: 'SALSA: 2 mL/kg (moderate)' },
  { value: 'salsa-severe', label: 'SALSA: 2 mL/kg × 2 (severe)' },
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
        <CheckField label="High ODS risk (Na ≤105, hypokalemia, alcohol use disorder, malnutrition, advanced liver disease)" checked={ods} onChange={setOds} />
        {s !== null && c !== null && p !== null && (
          <Result label="Correction" r={safe(() => sodiumCorrectionCheck({ startNa: s, currentNa: c, periodNumber: p, odsRisk: ods }))} />
        )}
      </div>
    </Card>
  );
}
