import { useState } from 'react';
import { Activity } from 'lucide-react';
import { CheckField, NumberField } from './CalculatorCard';
import { Card, Result, parseNonNegative, safe } from './calcShared';
import { megris } from '../lib/calculators';

export function MegrisCard() {
  const [bulbar, setBulbar] = useState(false);
  const [days, setDays] = useState('');
  const [neck, setNeck] = useState('');
  const [hipL, setHipL] = useState('');
  const [hipR, setHipR] = useState('');
  const v = [days, neck, hipL, hipR].map(parseNonNegative);
  const ready = v.every((x) => x !== null);
  return (
    <Card noteId="calc-megris" title="mEGRIS (GBS)" subtitle="Ventilation risk at hospital admission — Luijten 2023" icon={<Activity size={18} />} metaIds={['megris']}>
      <CheckField label="Bulbar weakness (speech or swallowing, lower cranial nerves)" checked={bulbar} onChange={setBulbar} />
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="Days, weakness onset → admission" value={days} onChange={setDays} step="1" placeholder="—" />
        <NumberField label="Neck flexion MRC (0–5)" value={neck} onChange={setNeck} step="1" placeholder="—" />
        <NumberField label="Hip flexion MRC left (0–5)" value={hipL} onChange={setHipL} step="1" placeholder="—" />
        <NumberField label="Hip flexion MRC right (0–5)" value={hipR} onChange={setHipR} step="1" placeholder="—" />
      </div>
      {ready && (
        <Result
          label="mEGRIS"
          r={safe(() => megris({ bulbarWeakness: bulbar, daysOnsetToAdmission: v[0] as number, neckFlexionMrc: v[1] as number, hipFlexionMrcLeft: v[2] as number, hipFlexionMrcRight: v[3] as number }))}
        />
      )}
    </Card>
  );
}
