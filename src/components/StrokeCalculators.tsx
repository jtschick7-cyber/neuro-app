import { useState } from 'react';
import { Brain, Clock, Droplet, HeartPulse, Syringe } from 'lucide-react';
import { CheckField, NeedWeight, NumberField, SelectField } from './CalculatorCard';
import { AlteplaseResult, Card, DoseResult, Result, parseNonNegative, safe } from './calcShared';
import { abcd2, alteplaseDose, cha2ds2Vasc, hasBled, ichScore, tnkDose } from '../lib/calculators';
import { parsePositive, type Sex } from '../lib/patientContext';

interface Inputs {
  weightKg: number | null;
  /** Raw age string from the patient bar. */
  age: string;
  sex: Sex;
}

const NEED_AGE = <p className="text-sm text-amber-300">Enter age in the top bar.</p>;

export function ThrombolyticsCard({ weightKg }: Pick<Inputs, 'weightKg'>) {
  const [exact, setExact] = useState(false);
  return (
    <Card
      noteId="calc-thrombolytics"
      title="Stroke thrombolysis"
      subtitle="Tenecteplase and alteplase, ischemic stroke"
      icon={<Syringe size={18} />}
      metaIds={['tnk-dose', 'alteplase-dose']}
    >
      {weightKg === null ? (
        <NeedWeight />
      ) : (
        <>
          <div className="divide-y divide-slate-800">
            <DoseResult label="Tenecteplase" r={safe(() => tnkDose(weightKg, { exactWeightUnder50: exact }))} />
            <AlteplaseResult r={safe(() => alteplaseDose(weightKg))} />
          </div>
          {weightKg < 50 && <CheckField label="Use 1-kg dosing under 50 kg (accurate measured weight only)" checked={exact} onChange={setExact} />}
        </>
      )}
    </Card>
  );
}

export function IchScoreCard({ age }: Pick<Inputs, 'age'>) {
  const [gcs, setGcs] = useState('');
  const [volume, setVolume] = useState('');
  const [ivh, setIvh] = useState(false);
  const [infra, setInfra] = useState(false);
  const a = parsePositive(age);
  const g = parseNonNegative(gcs);
  const v = parseNonNegative(volume);
  const ready = a !== null && g !== null && v !== null;
  return (
    <Card noteId="calc-ich-score" title="ICH score" subtitle="Intracerebral hemorrhage 30-day mortality (Hemphill 2001)" icon={<Brain size={18} />} metaIds={['ich-score']}>
      <div className="grid grid-cols-2 gap-2">
        <NumberField label="GCS (3–15)" value={gcs} onChange={setGcs} step="1" placeholder="14" />
        <NumberField label="Hematoma volume (mL, ABC/2)" value={volume} onChange={setVolume} placeholder="25" />
      </div>
      <CheckField label="Intraventricular hemorrhage" checked={ivh} onChange={setIvh} />
      <CheckField label="Infratentorial origin" checked={infra} onChange={setInfra} />
      {a === null && NEED_AGE}
      {ready && (
        <Result
          label="ICH score"
          r={safe(() => ichScore({ gcs: g, volumeMl: v, ivh, infratentorial: infra, ageY: a }))}
        />
      )}
    </Card>
  );
}

const CLINICAL_OPTIONS = [
  { value: 'none', label: 'Other symptoms' },
  { value: 'speech', label: 'Speech disturbance without weakness' },
  { value: 'weakness', label: 'Unilateral weakness' },
];

export function Abcd2Card({ age }: Pick<Inputs, 'age'>) {
  const [bp, setBp] = useState(false);
  const [clinical, setClinical] = useState('none');
  const [duration, setDuration] = useState('');
  const [dm, setDm] = useState(false);
  const a = parsePositive(age);
  const d = parseNonNegative(duration);
  return (
    <Card noteId="calc-abcd2" title="ABCD2" subtitle="Early stroke risk after TIA" icon={<Clock size={18} />} metaIds={['abcd2']}>
      <CheckField label="BP ≥140/90 at first assessment" checked={bp} onChange={setBp} />
      <SelectField label="Clinical features" value={clinical} onChange={setClinical} options={CLINICAL_OPTIONS} />
      <div className="mt-2">
        <NumberField label="Symptom duration (minutes)" value={duration} onChange={setDuration} step="1" placeholder="30" />
      </div>
      <CheckField label="Diabetes" checked={dm} onChange={setDm} />
      {a === null && NEED_AGE}
      {a !== null && d !== null && (
        <Result
          label="ABCD2"
          r={safe(() => abcd2({ ageY: a, bpHigh: bp, weakness: clinical === 'weakness', speechOnly: clinical === 'speech', durationMin: d, diabetes: dm }))}
        />
      )}
    </Card>
  );
}

export function Cha2ds2VascCard({ age, sex }: Pick<Inputs, 'age' | 'sex'>) {
  const [chf, setChf] = useState(false);
  const [htn, setHtn] = useState(false);
  const [dm, setDm] = useState(false);
  const [stroke, setStroke] = useState(false);
  const [vasc, setVasc] = useState(false);
  const a = parsePositive(age);
  return (
    <Card noteId="calc-cha2ds2-vasc" title="CHA₂DS₂-VASc" subtitle="Atrial fibrillation stroke risk" icon={<HeartPulse size={18} />} metaIds={['cha2ds2-vasc']}>
      <CheckField label="Heart failure / LV dysfunction" checked={chf} onChange={setChf} />
      <CheckField label="Hypertension" checked={htn} onChange={setHtn} />
      <CheckField label="Diabetes" checked={dm} onChange={setDm} />
      <CheckField label="Prior stroke / TIA / thromboembolism" checked={stroke} onChange={setStroke} />
      <CheckField label="Vascular disease (MI, PAD, aortic plaque)" checked={vasc} onChange={setVasc} />
      {(a === null || sex === '') && <p className="text-sm text-amber-300">Enter age and sex in the top bar.</p>}
      {a !== null && sex !== '' && (
        <Result
          label="CHA₂DS₂-VASc"
          r={safe(() => cha2ds2Vasc({ chf, htn, ageY: a, diabetes: dm, strokeTiaTe: stroke, vascular: vasc, female: sex === 'F' }))}
        />
      )}
    </Card>
  );
}

export function HasBledCard({ age }: Pick<Inputs, 'age'>) {
  const [f, setF] = useState({ htn: false, renal: false, liver: false, stroke: false, bleeding: false, labileInr: false, drugs: false, alcohol: false });
  const set = (k: keyof typeof f) => (v: boolean) => setF((p) => ({ ...p, [k]: v }));
  const a = parsePositive(age);
  return (
    <Card noteId="calc-has-bled" title="HAS-BLED" subtitle="Major bleeding risk on anticoagulation, atrial fibrillation" icon={<Droplet size={18} />} metaIds={['has-bled']}>
      <CheckField label="Uncontrolled hypertension (SBP >160)" checked={f.htn} onChange={set('htn')} />
      <CheckField label="Renal disease (dialysis, transplant, Cr >2.26 mg/dL)" checked={f.renal} onChange={set('renal')} />
      <CheckField label="Liver disease (cirrhosis or marked LFT/bilirubin elevation)" checked={f.liver} onChange={set('liver')} />
      <CheckField label="Prior stroke" checked={f.stroke} onChange={set('stroke')} />
      <CheckField label="Prior major bleeding or predisposition" checked={f.bleeding} onChange={set('bleeding')} />
      <CheckField label="Labile INR (TTR <60%)" checked={f.labileInr} onChange={set('labileInr')} />
      <CheckField label="Antiplatelet or NSAID use" checked={f.drugs} onChange={set('drugs')} />
      <CheckField label="Alcohol ≥8 drinks/week" checked={f.alcohol} onChange={set('alcohol')} />
      {a === null && NEED_AGE}
      {a !== null && <Result label="HAS-BLED" r={safe(() => hasBled({ ...f, ageY: a }))} />}
    </Card>
  );
}
