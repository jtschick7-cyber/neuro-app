import { useState, type ReactNode } from 'react';
import { AlertTriangle, Droplets, Pill, Zap, FlaskConical } from 'lucide-react';
import CalculatorCard, { NeedWeight, NumberField } from './CalculatorCard';
import {
  CALCULATOR_META,
  COMT_FACTORS,
  LEVODOPA_FACTORS,
  OTHER_FACTORS,
  cockcroftGault,
  fosphenytoinLoad,
  hypertonicSalineIcp,
  lacosamideLoad,
  ledd,
  levetiracetamLoad,
  mannitolDose,
  osmolarGap,
  valproateLoad,
  type CalcResult,
  type LeddDrug,
} from '../lib/calculators';
import { BANNERS } from '../content/copy';
import { parsePositive, type Sex } from '../lib/patientContext';

/** Calculators throw RangeError on out-of-range input; show the message instead of crashing. */
function safe(fn: () => CalcResult): CalcResult | string {
  try {
    return fn();
  } catch (e) {
    return e instanceof Error ? e.message : 'Invalid input';
  }
}

function parseNonNegative(v: string): number | null {
  if (v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function Warnings({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="mt-1 space-y-0.5">
      {items.map((w) => (
        <li key={w} className="flex gap-1 text-xs text-amber-300">
          <AlertTriangle size={12} className="mt-0.5 shrink-0" /> {w}
        </li>
      ))}
    </ul>
  );
}

function Result({ r, label }: { r: CalcResult | string; label: string }) {
  if (typeof r === 'string') return <p className="py-2 text-sm text-red-300">{label}: {r}</p>;
  return (
    <div className="py-2">
      <div className="text-sm text-slate-200">{label}</div>
      <div className="text-lg font-semibold text-sky-300">{r.display}</div>
      <Warnings items={r.warnings} />
    </div>
  );
}

/** Formula, caps, rounding and sources straight from CALCULATOR_META. */
function MetaFooter({ ids }: { ids: string[] }) {
  return (
    <details className="mt-2 text-xs text-slate-500">
      <summary className="cursor-pointer">Formula and sources</summary>
      {ids.map((id) => {
        const m = CALCULATOR_META[id];
        return (
          <div key={id} className="mt-1">
            <div className="font-semibold text-slate-400">{m.title}</div>
            <div>Formula: {m.formula}</div>
            {m.caps.length > 0 && <div>Caps: {m.caps.join('; ')}</div>}
            <div>Rounding: {m.rounding}</div>
            <ul className="list-inside list-disc">
              {m.sources.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </details>
  );
}

function Card(props: { noteId: string; title: string; subtitle: string; icon: ReactNode; metaIds: string[]; children: ReactNode }) {
  return (
    <CalculatorCard noteId={props.noteId} title={props.title} subtitle={props.subtitle} icon={props.icon}>
      {props.children}
      <MetaFooter ids={props.metaIds} />
    </CalculatorCard>
  );
}

function Anticonvulsants({ weightKg }: { weightKg: number | null }) {
  return (
    <Card
      noteId="calc-anticonvulsants"
      title="Antiseizure medication loading"
      subtitle="Status epilepticus second-line loads"
      icon={<Zap size={18} />}
      metaIds={['levetiracetam-load', 'valproate-load', 'fosphenytoin-load', 'lacosamide-load']}
    >
      {weightKg === null ? (
        <NeedWeight />
      ) : (
        <div className="divide-y divide-slate-800">
          <Result label="Levetiracetam" r={safe(() => levetiracetamLoad(weightKg))} />
          <Result label="Valproate" r={safe(() => valproateLoad(weightKg))} />
          <Result label="Fosphenytoin" r={safe(() => fosphenytoinLoad(weightKg))} />
          <Result label="Lacosamide" r={safe(() => lacosamideLoad(weightKg))} />
        </div>
      )}
    </Card>
  );
}

function IcpCard({ weightKg }: { weightKg: number | null }) {
  const [osm, setOsm] = useState('');
  const [na, setNa] = useState('');
  const [glu, setGlu] = useState('');
  const [bun, setBun] = useState('');
  const vals = [osm, na, glu, bun].map(parseNonNegative);
  const gap = vals.every((v) => v !== null)
    ? safe(() => osmolarGap(vals[0] as number, vals[1] as number, vals[2] as number, vals[3] as number))
    : null;

  return (
    <Card
      noteId="calc-icp"
      title="Cerebral edema / ICP"
      subtitle="Hypertonic saline (local protocol) and 20% mannitol"
      icon={<Droplets size={18} />}
      metaIds={['hypertonic-saline-bolus', 'mannitol-dose']}
    >
      <p className="text-xs text-sky-300">{BANNERS.CALC_INSTITUTIONAL}</p>
      <div className="divide-y divide-slate-800">
        <Result label="3% NaCl bolus" r={safe(() => hypertonicSalineIcp('3%'))} />
        <Result label="23.4% NaCl bolus" r={safe(() => hypertonicSalineIcp('23.4%'))} />
      </div>
      <div className="mt-3 border-t border-slate-800 pt-2">
        <p className="text-xs text-sky-300">{BANNERS.CALC_LABEL_DIFFERS}</p>
        {weightKg === null ? <NeedWeight /> : <Result label="Mannitol 20%" r={safe(() => mannitolDose(weightKg))} />}
        <div className="mt-2 text-xs font-semibold text-slate-400">Osmolar gap</div>
        <div className="grid grid-cols-2 gap-2">
          <NumberField label="Measured osm (mOsm/kg)" value={osm} onChange={setOsm} placeholder="300" />
          <NumberField label="Na (mmol/L)" value={na} onChange={setNa} placeholder="140" />
          <NumberField label="Glucose (mg/dL)" value={glu} onChange={setGlu} placeholder="100" />
          <NumberField label="BUN (mg/dL)" value={bun} onChange={setBun} placeholder="14" />
        </div>
        {gap !== null && <Result label="Osmolar gap" r={gap} />}
      </div>
    </Card>
  );
}

function CrClCard({ weightKg, age, sex, creatinine }: { weightKg: number | null; age: string; sex: Sex; creatinine: string }) {
  const a = parsePositive(age);
  const cr = parsePositive(creatinine);
  const ready = weightKg !== null && a !== null && cr !== null && sex !== '';
  return (
    <Card noteId="calc-crcl" title="Creatinine clearance" subtitle="Cockcroft-Gault, actual body weight" icon={<FlaskConical size={18} />} metaIds={['cockcroft-gault']}>
      {ready ? (
        <Result label="CrCl" r={safe(() => cockcroftGault(a as number, weightKg as number, cr as number, sex === 'F'))} />
      ) : (
        <p className="text-sm text-amber-300">Enter weight, age, sex and Cr in the top bar.</p>
      )}
    </Card>
  );
}

const LEDD_LABELS: Record<LeddDrug, string> = {
  'levodopa-ir': 'Levodopa IR',
  'levodopa-cr': 'Levodopa CR',
  'levodopa-er-ipx066': 'Levodopa ER (Rytary)',
  'levodopa-inhaled': 'Levodopa inhaled (Inbrija)',
  'levodopa-carbidopa-intestinal-gel': 'LCIG (Duopa)',
  'foslevodopa-foscarbidopa-sc': 'Foslevodopa SC (Vyalev)',
  'selegiline-oral': 'Selegiline oral',
  'selegiline-odt': 'Selegiline ODT (Zelapar)',
  rasagiline: 'Rasagiline',
  'pramipexole-salt': 'Pramipexole (salt)',
  'pramipexole-base': 'Pramipexole (base)',
  ropinirole: 'Ropinirole',
  rotigotine: 'Rotigotine',
  'apomorphine-sc': 'Apomorphine SC',
  'apomorphine-sl': 'Apomorphine SL',
  bromocriptine: 'Bromocriptine',
  cabergoline: 'Cabergoline',
  'amantadine-ir': 'Amantadine IR',
  'amantadine-er-gocovri': 'Amantadine ER (Gocovri)',
  'amantadine-er-osmolex': 'Amantadine ER (Osmolex)',
  safinamide: 'Safinamide',
};
const LEDD_DRUGS = [...Object.keys(LEVODOPA_FACTORS), ...Object.keys(OTHER_FACTORS), 'safinamide'] as LeddDrug[];
type Comt = keyof typeof COMT_FACTORS | '';

function LeddCard() {
  const [doses, setDoses] = useState<Partial<Record<LeddDrug, string>>>({});
  const [comt, setComt] = useState<Comt>('');
  const [istra, setIstra] = useState(false);

  const items = LEDD_DRUGS.flatMap((drug) => {
    const v = parseNonNegative(doses[drug] ?? '');
    return v !== null && v > 0 ? [{ drug, mgPerDay: v }] : [];
  });
  const result = items.length ? safe(() => ledd(items, { comt: comt ? { drug: comt } : undefined, istradefylline: istra })) : null;

  return (
    <Card noteId="calc-ledd" title="Levodopa equivalent daily dose" subtitle="Total daily doses (mg/day) — Jost 2023" icon={<Pill size={18} />} metaIds={['ledd']}>
      <div className="grid grid-cols-2 gap-2">
        {LEDD_DRUGS.map((d) => (
          <NumberField key={d} label={LEDD_LABELS[d]} value={doses[d] ?? ''} onChange={(v) => setDoses((p) => ({ ...p, [d]: v }))} />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="block text-xs text-slate-400">
          COMT inhibitor
          <select
            value={comt}
            onChange={(e) => setComt(e.target.value as Comt)}
            className="mt-0.5 w-full rounded-md border border-slate-600 bg-slate-800 px-2 py-1.5 text-base text-slate-100"
          >
            <option value="">None</option>
            <option value="entacapone">Entacapone</option>
            <option value="tolcapone">Tolcapone</option>
            <option value="opicapone">Opicapone</option>
          </select>
        </label>
        <label className="flex items-end gap-2 pb-2 text-sm text-slate-300">
          <input type="checkbox" checked={istra} onChange={(e) => setIstra(e.target.checked)} className="h-5 w-5" />
          Istradefylline
        </label>
      </div>
      {result !== null && <Result label="Total" r={result} />}
    </Card>
  );
}

export default function Calculators({ weight, age, sex, creatinine }: { weight: string; age: string; sex: Sex; creatinine: string }) {
  const weightKg = parsePositive(weight);
  return (
    <div className="space-y-4">
      <Anticonvulsants weightKg={weightKg} />
      <IcpCard weightKg={weightKg} />
      <CrClCard weightKg={weightKg} age={age} sex={sex} creatinine={creatinine} />
      <LeddCard />
    </div>
  );
}
