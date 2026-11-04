import { useState } from 'react';
import { Calculator, ShieldAlert } from 'lucide-react';
import ContextBar from './components/ContextBar';
import Calculators from './components/Calculators';
import MgRegistryView from './components/MgRegistryView';
import { usePatientContext } from './lib/patientContext';

type Tab = 'calculators' | 'mg';

export default function App() {
  const { context, update, clear } = usePatientContext();
  const [tab, setTab] = useState<Tab>('calculators');

  const tabCls = (t: Tab) =>
    `flex flex-1 items-center justify-center gap-2 py-2 text-sm font-medium ${
      tab === t ? 'border-b-2 border-sky-400 text-sky-300' : 'text-slate-400'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <ContextBar context={context} onChange={update} onClear={clear} />
      <nav className="mx-auto flex max-w-3xl border-b border-slate-800 bg-slate-950" role="tablist">
        <button role="tab" aria-selected={tab === 'calculators'} className={tabCls('calculators')} onClick={() => setTab('calculators')}>
          <Calculator size={16} /> Calculators
        </button>
        <button role="tab" aria-selected={tab === 'mg'} className={tabCls('mg')} onClick={() => setTab('mg')}>
          <ShieldAlert size={16} /> MG Meds
        </button>
      </nav>
      <main className="mx-auto max-w-3xl px-3 py-4 pb-12">
        {tab === 'calculators' ? (
          <Calculators weight={context.weightKg} creatinine={context.creatinine} />
        ) : (
          <MgRegistryView />
        )}
        <p className="mt-6 text-center text-xs text-slate-600">
          Decision support only. Verify all doses against institutional protocols.
        </p>
      </main>
    </div>
  );
}
