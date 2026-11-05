import { useEffect } from 'react';
import ContextBar from './components/ContextBar';
import Calculators from './components/Calculators';
import MgRegistryView from './components/MgRegistryView';
import NavBar from './components/NavBar';
import { AcuteView, ConsultView } from './components/ProtocolViews';
import { AntibodiesView, AntithromboticsView, InteractionsView } from './components/DrugAntibodyViews';
import Home from './components/Home';
import DisclaimerGate from './components/DisclaimerGate';
import { usePatientContext, type PatientContext } from './lib/patientContext';
import { useRoute } from './lib/useRoute';
import { sectionOf, toHash, type Route } from './lib/route';
import { getRegistry, isCautionListId } from './lib/nav';
import about from '../generated/about.json';

function Unavailable() {
  return (
    <p className="text-sm text-slate-400">
      This section isn’t available yet. <a href="#/" className="text-sky-300">Back to home</a>
    </p>
  );
}

export default function App() {
  const { context, update, clear } = usePatientContext();
  const route = useRoute();

  // New screen → top of page, except a calculator deep link, which scrolls to its own card.
  const hash = toHash(route);
  useEffect(() => {
    if (!(route.kind === 'calc' && route.calcId)) window.scrollTo(0, 0);
  }, [hash]);

  return (
    <DisclaimerGate>
      <div className="min-h-screen bg-slate-950 text-slate-200">
        <ContextBar context={context} onChange={update} onClear={clear} />
        <main className="mx-auto max-w-3xl px-3 py-4" style={{ paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom))' }}>
          <Screen route={route} context={context} />
          <p className="mt-6 text-center text-xs text-slate-600">
            Decision support only — verify doses before ordering. Content {about.contentVersion}
          </p>
        </main>
        <NavBar active={sectionOf(route)} />
      </div>
    </DisclaimerGate>
  );
}

function Screen({ route, context }: { route: Route; context: PatientContext }) {
  switch (route.kind) {
    case 'home':
      return <Home />;
    case 'calc':
      return (
        <Calculators
          weight={context.weightKg}
          age={context.age}
          sex={context.sex}
          creatinine={context.creatinine}
          focusCalcId={route.calcId}
        />
      );
    case 'registry':
      if (isCautionListId(route.registry)) return <MgRegistryView listId={route.registry} entryId={route.entryId} />;
      if (route.registry === 'acute-neuro') return <AcuteView entryId={route.entryId} />;
      if (route.registry === 'consult-workups') return <ConsultView entryId={route.entryId} />;
      if (route.registry === 'vascular-antithrombotics') return <AntithromboticsView entryId={route.entryId} />;
      if (route.registry === 'asm-interactions') return <InteractionsView entryId={route.entryId} />;
      if (route.registry === 'neural-antibodies') return <AntibodiesView entryId={route.entryId} />;
      return getRegistry(route.registry)?.built ? null : <Unavailable />;
  }
}
