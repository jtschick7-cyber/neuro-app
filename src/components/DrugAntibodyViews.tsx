import DrugTabs from './DrugTabs';
import RelatedLinks from './RelatedLinks';
import { EntryShell, RegistryScreen } from './ProtocolViews';
import { Bullets, EnumBadge, EvidenceBadge, Section, TreatmentList } from './ProtocolParts';
import { INTERACTION_TIER_LEGEND, NORMAL_LIKELIHOOD_LEGEND, PNS_RISK_LEGEND } from '../content/copy';
import { loadAntibodies, loadInteractions, loadVascular, type AntibodyEntry, type InteractionEntry, type VascularEntry } from '../lib/protocols';

const PNS_HELP = Object.fromEntries(PNS_RISK_LEGEND) as Record<string, string>;
const LIKELIHOOD_HELP = Object.fromEntries(NORMAL_LIKELIHOOD_LEGEND) as Record<string, string>;
const PNS_TONE: Record<string, string> = {
  HIGH: 'bg-red-600 text-white',
  INTERMEDIATE: 'bg-orange-500 text-black',
  LOW: 'bg-slate-600 text-slate-100',
  NOT_CLASSIFIED: 'border border-slate-600 text-slate-400',
};
const PNS_LABEL: Record<string, string> = { HIGH: 'Cancer risk: high', INTERMEDIATE: 'Cancer risk: intermediate', LOW: 'Cancer risk: low', NOT_CLASSIFIED: 'Cancer risk: not classified' };
const LIKELIHOOD_LABEL: Record<string, string> = { OFTEN_NORMAL: 'Often normal', SOMETIMES_NORMAL: 'Sometimes normal', RARELY_NORMAL: 'Rarely normal', UNKNOWN: 'Frequency unknown' };
const SPECIMEN_LABEL: Record<string, string> = { CSF: 'CSF', SERUM: 'Serum', BOTH: 'Serum and CSF' };
const RESPONSE_LABEL: Record<string, string> = { USUALLY_GOOD: 'Immunotherapy: usually good', VARIABLE: 'Immunotherapy: variable', USUALLY_POOR: 'Immunotherapy: usually poor' };

function VascularEntryView({ e }: { e: VascularEntry }) {
  if (e.kind === 'DECISION') {
    return (
      <EntryShell registry="vascular-antithrombotics" entry={e}>
        <p className="mt-2 text-sm text-slate-200">{e.question}</p>
        {e.population.length > 0 && (
          <Section title="Population" open>
            <Bullets items={e.population} />
          </Section>
        )}
        <Section title="Rules" open>
          <ol className="space-y-2">
            {e.rules.map((r) => (
              <li key={r.order} className="text-sm">
                <p className="text-slate-300">
                  <span className="font-semibold text-sky-300">If </span>
                  {r.condition}
                </p>
                <p className="text-slate-100">
                  <span className="font-semibold text-sky-300">→ </span>
                  {r.recommendation}
                </p>
                <div className="mt-0.5">
                  <EvidenceBadge level={r.evidenceLevel} />
                </div>
                <Bullets items={r.evidenceNote} tone="text-xs text-slate-500" />
              </li>
            ))}
          </ol>
        </Section>
        {e.options.length > 0 && (
          <Section title="Options" open>
            <TreatmentList items={e.options} />
          </Section>
        )}
        {e.contraindications.length > 0 && (
          <Section title="Contraindications" open>
            <Bullets items={e.contraindications} tone="text-red-200" />
          </Section>
        )}
        {e.esoDiffers.length > 0 && (
          <Section title="ESO guideline differs">
            <Bullets items={e.esoDiffers} />
          </Section>
        )}
        {e.pearls.length > 0 && (
          <Section title="Pearls">
            <Bullets items={e.pearls} />
          </Section>
        )}
        {e.institutionVaries.length > 0 && (
          <Section title="Varies by institution">
            <Bullets items={e.institutionVaries} />
          </Section>
        )}
        <RelatedLinks relatedIds={e.relatedIds} />
      </EntryShell>
    );
  }
  return (
    <EntryShell registry="vascular-antithrombotics" entry={e}>
      <p className="mt-2 text-sm text-slate-200">
        {e.subclass} · {e.mechanism}
      </p>
      <Section title="Uses and doses" open>
        <TreatmentList items={e.uses} />
      </Section>
      <Section title="Timing" open>
        <p className="text-sm text-slate-300">Half-life: {e.timing.halfLifeText}</p>
        {e.timing.holdBeforeProcedure.length > 0 && (
          <>
            <div className="mt-1 text-xs font-semibold text-slate-400">Hold before procedure</div>
            <Bullets items={e.timing.holdBeforeProcedure} />
          </>
        )}
        {e.timing.thrombolysisRule.length > 0 && (
          <>
            <div className="mt-1 text-xs font-semibold text-slate-400">Thrombolysis</div>
            <Bullets items={e.timing.thrombolysisRule} />
          </>
        )}
      </Section>
      {e.reversal.length > 0 && (
        <Section title="Reversal" open>
          <TreatmentList items={e.reversal} />
        </Section>
      )}
      {e.renalHepatic.length > 0 && (
        <Section title="Renal / hepatic">
          <Bullets items={e.renalHepatic} />
        </Section>
      )}
      {e.monitoring.length > 0 && (
        <Section title="Monitoring">
          <Bullets items={e.monitoring} />
        </Section>
      )}
      {e.interactions.length > 0 && (
        <Section title="Interactions">
          <Bullets items={e.interactions} />
        </Section>
      )}
      {e.pregnancy.length > 0 && (
        <Section title="Pregnancy">
          <Bullets items={e.pregnancy} />
        </Section>
      )}
      {e.pearls.length > 0 && (
        <Section title="Pearls">
          <Bullets items={e.pearls} />
        </Section>
      )}
      {e.institutionVaries.length > 0 && (
        <Section title="Varies by institution">
          <Bullets items={e.institutionVaries} />
        </Section>
      )}
      <RelatedLinks relatedIds={e.relatedIds} calculatorIds={e.calculatorIds} />
    </EntryShell>
  );
}

export function AntithromboticsView({ entryId }: { entryId?: string }) {
  return (
    <div className="space-y-3">
      {entryId === undefined && <DrugTabs active="vascular-antithrombotics" />}
      <RegistryScreen
        registry="vascular-antithrombotics"
        noun="Antithrombotics"
        placeholder="Search drug or question (e.g. apixaban, TNK, DAPT)"
        load={loadVascular}
        entryId={entryId}
        renderEntry={(e) => <VascularEntryView e={e} />}
      />
    </div>
  );
}

function FindingBlock({ label, f }: { label: string; f: AntibodyEntry['csf'] }) {
  return (
    <Section title={label}>
      <EnumBadge label={LIKELIHOOD_LABEL[f.normalLikelihood] ?? f.normalLikelihood} help={LIKELIHOOD_HELP[f.normalLikelihood]} />
      <Bullets items={f.normalPercentText} tone="text-xs text-slate-500" />
      <Bullets items={f.typicalFindings} />
    </Section>
  );
}

function AntibodyEntryView({ e }: { e: AntibodyEntry }) {
  return (
    <EntryShell registry="neural-antibodies" entry={e}>
      <div className="mt-2 flex flex-wrap gap-2">
        <EnumBadge label={PNS_LABEL[e.pnsRisk] ?? e.pnsRisk} help={PNS_HELP[e.pnsRisk]} tone={PNS_TONE[e.pnsRisk]} />
        <EnumBadge label={`Test: ${SPECIMEN_LABEL[e.testing.preferredSpecimen] ?? e.testing.preferredSpecimen}`} />
        <EnumBadge label={RESPONSE_LABEL[e.immunotherapyResponse] ?? e.immunotherapyResponse} />
      </div>
      <Section title="Syndromes" open>
        <ul className="space-y-0.5 text-sm">
          {e.syndromes.map((s) => (
            <li key={s.syndrome} className={s.typical ? 'text-slate-100' : 'text-slate-400'}>
              {s.syndrome}
              {!s.typical && <span className="text-xs text-slate-500"> (less typical)</span>}
            </li>
          ))}
        </ul>
        <Bullets items={e.demographics} tone="text-slate-400" />
      </Section>
      <Section title="Testing" open>
        <Bullets items={e.testing.rationale} />
        <Bullets items={e.testing.methodNotes} tone="text-slate-400" />
      </Section>
      {e.tumors.length > 0 && (
        <Section title="Tumor associations" open>
          <ul className="space-y-0.5 text-sm text-slate-300">
            {e.tumors.map((t) => (
              <li key={t.tumor}>
                {t.tumor} <span className="text-slate-500">— {t.frequencyText}</span>
              </li>
            ))}
          </ul>
          <Bullets items={e.cancerScreening} />
        </Section>
      )}
      <FindingBlock label="CSF" f={e.csf} />
      <FindingBlock label="MRI" f={e.mri} />
      {e.otherTests.length > 0 && (
        <Section title="Other tests">
          <Bullets items={e.otherTests} />
        </Section>
      )}
      {e.pearls.length > 0 && (
        <Section title="Pearls" open>
          <Bullets items={e.pearls} />
        </Section>
      )}
      <RelatedLinks relatedIds={e.relatedIds} />
    </EntryShell>
  );
}

export function AntibodiesView({ entryId }: { entryId?: string }) {
  return (
    <RegistryScreen
      registry="neural-antibodies"
      noun="Neural antibodies"
      placeholder="Search antibody (e.g. NMDA, LGI1, anti-Hu)"
      load={loadAntibodies}
      entryId={entryId}
      renderEntry={(e) => <AntibodyEntryView e={e} />}
    />
  );
}

const TIER_HELP = Object.fromEntries(INTERACTION_TIER_LEGEND) as Record<string, string>;
const TIER_TONE: Record<string, string> = { AVOID: 'bg-red-600 text-white', HIGH_RISK: 'bg-orange-500 text-black', CAUTION: 'bg-yellow-400 text-black' };
const TIER_LABEL: Record<string, string> = { AVOID: 'Avoid', HIGH_RISK: 'High risk', CAUTION: 'Caution' };

function InteractionEntryView({ e }: { e: InteractionEntry }) {
  return (
    <EntryShell registry="asm-interactions" entry={e}>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <EnumBadge label={TIER_LABEL[e.tier] ?? e.tier} help={TIER_HELP[e.tier]} tone={TIER_TONE[e.tier]} />
      </div>
      <p className="mt-2 text-sm text-slate-300">
        <span className="font-semibold text-slate-400">Affected: </span>
        {e.objectDrugs.join(', ')}
      </p>
      <p className="text-sm text-slate-300">
        <span className="font-semibold text-slate-400">Caused by: </span>
        {e.precipitantDrugs.join(', ')}
      </p>
      <Section title="Effect" open>
        <Bullets items={e.effect} tone="text-slate-100" />
      </Section>
      <Section title="Management" open>
        <Bullets items={e.management} tone="text-emerald-300" />
      </Section>
      {e.population.length > 0 && (
        <Section title="Population" open>
          <Bullets items={e.population} />
        </Section>
      )}
      {e.mechanism.length > 0 && (
        <Section title="Mechanism">
          <Bullets items={e.mechanism} tone="text-slate-400" />
        </Section>
      )}
      {e.pearls.length > 0 && (
        <Section title="Pearls">
          <Bullets items={e.pearls} />
        </Section>
      )}
      <RelatedLinks relatedIds={e.relatedIds} />
    </EntryShell>
  );
}

export function InteractionsView({ entryId }: { entryId?: string }) {
  return (
    <div className="space-y-3">
      {entryId === undefined && <DrugTabs active="asm-interactions" />}
      <RegistryScreen
        registry="asm-interactions"
        noun="ASM interactions"
        placeholder="Search drug or brand (e.g. Eliquis, carbamazepine)"
        load={loadInteractions}
        entryId={entryId}
        renderEntry={(e) => <InteractionEntryView e={e} />}
      />
    </div>
  );
}
