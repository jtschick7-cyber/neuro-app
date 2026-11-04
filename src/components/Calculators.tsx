import { useState } from 'react';
import { AlertTriangle, Droplets, FlaskConical, Pill, Zap } from 'lucide-react';
import CalculatorCard, { NeedWeight, NumberField } from './CalculatorCard';
import {
  LEDD_DRUGS,
  allAnticonvulsantLoads,
  calculateLedd,
  correctCsfProtein,
  hypertonicSalineBolus,
  mannitolDose,
  type LeddDrugId,
  type LeddInput,
} from '../lib/calculators';
import { parsePositive } from '../lib/patientContext';

function parseNonNegative(v: string): number | null {
  if (v.trim() === '') return null;
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

function Anticonvulsants({ weightKg }: { weightKg: number | null }) {
  return (
    <CalculatorCard title="Anticonvulsant loading" subtitle="Rounded to 10 mg; capped at max single load" icon={<Zap size={18} />}>
      {weightKg === null ? (
        <NeedWeight />
      ) : (
        <ul className="divide-y divide-slate-800">
          {allAnticonvulsantLoads(weightKg).map((r) => (
            <li key={r.id} className="py-2">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm text-slate-200">{r.name}</span>
                <span className="text-lg font-semibold text-sky-300">
                  {r.doseMg} {r.unit}
                </span>
              </div>
              <div className="text-xs text-slate-500">{r.basis}</div>
              {r.capApplied && (
                <div className="mt-1 flex items-center gap-1 text-xs text-amber-300">
                  <AlertTriangle size={12} /> Capped at {r.capMg} {r.unit} (uncapped {r.rawDoseMg})
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </CalculatorCard>
  );
}

function IcpCard({ weightKg, creatinine }: { weightKg: number | null; creatinine: string }) {
  const [osm, setOsm] = useState('');
  const [aki, setAki] = useState(false);
  const osmVal = parseNonNegative(osm);

  const saline = weightKg === null ? null : hypertonicSalineBolus(weightKg);
  const mannitol = weightKg === null ? null : mannitolDose({ weightKg, serumOsmolality: osmVal, severeAki: aki });

  return (
    <CalculatorCard title="Cerebral edema / ICP" subtitle="3% saline and 20% mannitol" icon={<Droplets size={18} />}>
      {saline === null || mannitol === null ? (
        <NeedWeight />
      ) : (
        <div className="space-y-4">
          <div>
            <div className="text-sm text-slate-200">3% hypertonic saline bolus</div>
            <div className="text-lg font-semibold text-sky-300">{saline.volumeMl} mL</div>
            <div className="text-xs text-slate-500">
              2 mL/kg over {saline.infusionMinutes} min ({saline.rateMlPerHr} mL/hr) — acute herniation
            </div>
          </div>
          <div>
            <div className="text-sm text-slate-200">Mannitol 20%</div>
            <div className={`text-lg font-semibold ${mannitol.contraindicated ? 'text-slate-500 line-through' : 'text-sky-300'}`}>
              {mannitol.doseLowG}–{mannitol.doseHighG} g ({mannitol.volumeLowMl}–{mannitol.volumeHighMl} mL)
            </div>
            <div className="text-xs text-slate-500">0.5–1.0 g/kg over 20–30 min</div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <NumberField label="Serum osm (mOsm/kg)" value={osm} onChange={setOsm} placeholder="295" />
              <label className="flex items-end gap-2 pb-2 text-sm text-slate-300">
                <input type="checkbox" checked={aki} onChange={(e) => setAki(e.target.checked)} className="h-5 w-5" />
                Severe AKI
              </label>
            </div>
            {creatinine !== '' && <div className="mt-1 text-xs text-slate-500">Cr in context: {creatinine} mg/dL</div>}
            {mannitol.contraindicated && (
              <div className="mt-2 rounded-md border border-red-500/50 bg-red-950/50 p-2 text-sm text-red-300">
                <strong>CONTRAINDICATED:</strong> {mannitol.contraindicationReasons.join('; ')}
              </div>
            )}
          </div>
        </div>
      )}
    </CalculatorCard>
  );
}

function CsfCard() {
  const [protein, setProtein] = useState('');
  const [csfRbc, setCsfRbc] = useState('');
  const [bloodRbc, setBloodRbc] = useState('');
  const [bloodProtein, setBloodProtein] = useState('');

  const p = parseNonNegative(protein);
  const c = parseNonNegative(csfRbc);
  const bRbc = parsePositive(bloodRbc);
  const bProt = parseNonNegative(bloodProtein);

  const result =
    p !== null && c !== null
      ? correctCsfProtein({
          measuredProteinMgDl: p,
          csfRbcPerUl: c,
          bloodRbcPerUl: bRbc ?? undefined,
          bloodProteinMgDl: bRbc !== null && bProt !== null ? bProt : undefined,
        })
      : null;

  return (
    <CalculatorCard
      title="CSF traumatic tap correction"
      subtitle="Exact if blood RBC + protein entered; else 1.1 mg/dL per 1000 RBC"
      icon={<FlaskConical size={18} />}
    >
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="CSF protein (mg/dL)" value={protein} onChange={setProtein} />
        <NumberField label="CSF RBC (/µL)" value={csfRbc} onChange={setCsfRbc} />
        <NumberField label="Blood RBC (/µL) – opt." value={bloodRbc} onChange={setBloodRbc} placeholder="5000000" />
        <NumberField label="Blood protein (mg/dL) – opt." value={bloodProtein} onChange={setBloodProtein} placeholder="7000" />
      </div>
      {result && (
        <div className="mt-3">
          <div className="text-lg font-semibold text-sky-300">Corrected: {result.correctedProteinMgDl} mg/dL</div>
          <div className="text-xs text-slate-500">
            −{result.subtractedMgDl} mg/dL ({result.method})
          </div>
          {result.clampedToZero && <div className="text-xs text-amber-300">Result was negative; shown as 0.</div>}
        </div>
      )}
    </CalculatorCard>
  );
}

function LeddCard() {
  const [doses, setDoses] = useState<Partial<Record<LeddDrugId, string>>>({});

  const numeric: LeddInput = {};
  for (const d of LEDD_DRUGS) {
    const v = parseNonNegative(doses[d.id] ?? '');
    if (v !== null) numeric[d.id] = v;
  }
  const result = calculateLedd(numeric);

  return (
    <CalculatorCard title="Parkinson's LEDD converter" subtitle="Total daily doses" icon={<Pill size={18} />}>
      <div className="grid grid-cols-2 gap-2">
        {LEDD_DRUGS.map((d) => (
          <NumberField
            key={d.id}
            label={`${d.name} (${d.unitNote}) ×${d.factor}`}
            value={doses[d.id] ?? ''}
            onChange={(v) => setDoses((prev) => ({ ...prev, [d.id]: v }))}
          />
        ))}
      </div>
      <div className="mt-3 text-lg font-semibold text-sky-300">Total LEDD: {result.totalLedd} mg/day</div>
    </CalculatorCard>
  );
}

export default function Calculators({ weight, creatinine }: { weight: string; creatinine: string }) {
  const weightKg = parsePositive(weight);
  return (
    <div className="space-y-4">
      <Anticonvulsants weightKg={weightKg} />
      <IcpCard weightKg={weightKg} creatinine={creatinine} />
      <CsfCard />
      <LeddCard />
    </div>
  );
}
