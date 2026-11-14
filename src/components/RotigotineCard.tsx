import { useState } from 'react';
import { Pill } from 'lucide-react';
import { CheckField, NumberField } from './CalculatorCard';
import { Card, Result, parseNonNegative, safe } from './calcShared';
import { BMJ_AGONIST_FACTORS, rotigotineConversion, type BmjAgonist } from '../lib/calculators';

const AGONIST_LABELS: Record<BmjAgonist, string> = {
  ropinirole: 'Ropinirole',
  rotigotine: 'Rotigotine',
  'pramipexole-base': 'Pramipexole (base)',
  cabergoline: 'Cabergoline',
  bromocriptine: 'Bromocriptine',
  apomorphine: 'Apomorphine',
};
const AGONISTS = Object.keys(BMJ_AGONIST_FACTORS) as BmjAgonist[];

export function RotigotineCard() {
  const [ir, setIr] = useState('');
  const [cr, setCr] = useState('');
  const [comt, setComt] = useState(false);
  const [ag, setAg] = useState<Partial<Record<BmjAgonist, string>>>({});
  const n = (v: string) => parseNonNegative(v) ?? 0;
  const agonists = Object.fromEntries(AGONISTS.map((d) => [d, n(ag[d] ?? '')])) as Record<BmjAgonist, number>;
  const any = n(ir) > 0 || n(cr) > 0 || AGONISTS.some((d) => agonists[d] > 0);

  return (
    <Card
      noteId="calc-rotigotine"
      title="Rotigotine patch (no enteral route)"
      subtitle="BMJ 2010 conversion, mg/day — BMJ factors, not the LEDD (Jost) card"
      icon={<Pill size={18} />}
      metaIds={['rotigotine-conversion']}
    >
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="Levodopa IR (excl. carbidopa)" value={ir} onChange={setIr} placeholder="—" />
        <NumberField label="Levodopa CR (excl. carbidopa)" value={cr} onChange={setCr} placeholder="—" />
        {AGONISTS.map((d) => (
          <NumberField key={d} label={AGONIST_LABELS[d]} value={ag[d] ?? ''} onChange={(v) => setAg((p) => ({ ...p, [d]: v }))} placeholder="—" />
        ))}
      </div>
      <CheckField label="On a COMT inhibitor" checked={comt} onChange={setComt} />
      {any && (
        <Result
          label="Rotigotine"
          r={safe(() => rotigotineConversion({ levodopaIrMgPerDay: n(ir), levodopaCrMgPerDay: n(cr), onComtInhibitor: comt, agonists }))}
        />
      )}
    </Card>
  );
}
