import { useState } from 'react';
import { Droplets } from 'lucide-react';
import { NeedWeight, NumberField } from './CalculatorCard';
import { Card, Result, parseNonNegative, safe } from './calcShared';
import { plasmaVolume } from '../lib/calculators';

export function PlasmaVolumeCard({ weightKg }: { weightKg: number | null }) {
  const [hct, setHct] = useState('');
  const h = parseNonNegative(hct);
  return (
    <Card
      noteId="calc-plasma-volume"
      title="Plasma volume for PLEX"
      subtitle="Kaplan 1990, actual body weight"
      icon={<Droplets size={18} />}
      metaIds={['plasma-volume']}
    >
      {weightKg === null ? (
        <NeedWeight />
      ) : (
        <>
          <NumberField label="Hematocrit (%)" value={hct} onChange={setHct} step="1" placeholder="—" />
          {h !== null && <Result label="Plasma volume" r={safe(() => plasmaVolume(weightKg, h))} />}
        </>
      )}
    </Card>
  );
}
