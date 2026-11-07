import DrugTabs from './DrugTabs';
import RelatedLinks from './RelatedLinks';
import { EntryShell, RegistryScreen, jumpTargets } from './ProtocolViews';
import SyndromeBrowse from './SyndromeBrowse';
import { Bullets, EnumBadge, EvidenceBadge, EvidenceNote, Section, TreatmentList } from './ProtocolParts';
import { CANONICAL_COPY, INTERACTION_TIER_LEGEND, NORMAL_LIKELIHOOD_LEGEND, PNS_RISK_LEGEND, SPECIMEN_BADGE } from '../content/copy';
import { loadAntibodies, loadInteractions, loadVascular, type AntibodyEntry, type InteractionEntry, type VascularEntry } from '../lib/protocols';

const PNS_HELP = Object.fromEntries(PNS_RISK_LEGEND) as Record<string, string>;
const LIKELIHOOD_HELP = Object.fromEntries(NORMAL_LIKELIHOOD_LEGEND) as Record<string, string>;
const PNS_TONE: Record<string, string> = {
  HIGH: 'bg-red-600 text-white',
  INTERMEDIATE: 'bg-orange-500 text-black',
  LOW: 'bg-slate-600 text-slate-100',
  NOT_CLASSIFIED: 'border border-slate-600 text-slate-400',
};
const PNS_LABEL: Record<string, string> = {
  HIGH: 'Cancer risk: high',
  INTERMEDIATE: 'Cancer risk: intermediate',
  LOW: 'Cancer risk: low',
  NOT_CLASSIFIED: 'Cancer risk: not classified',
};
const LIKELIHOOD_LABEL: Record<string, string> = {
  OFTEN_NORMAL: 'Often normal',
  SOMETIMES_NORMAL: 'Sometimes normal',
  RARELY_NORMAL: 'Rarely normal',
  UNKNOWN: 'Frequency unknown',
};
const RESPONSE_LABEL: Record<string, string> = {
  USUALLY_GOOD: 'Immunotherapy: usually good',
  VARIABLE: 'Immunotherapy: variable',
  USUALLY_POOR: 'Immunotherapy: usually poor',
};

type CanonicalId = Exclude<keyof typeof CANONICAL_COPY, 'prefix'>;

/**
 * 4.6: blocks repeated across agent cards (platelet transfusion / desmopressin, 4F-PCC, the neuraxial boxed warning)
 * stay in full — their grading differs by agent — and get a link to the entry that owns the full guidance.
 */
export function reversalCanonical(agent: string): CanonicalId | undefined {
  if (/^(Platelet transfusion|Desmopressin)\b/.test(agent)) return 'antiplatelet-ich';
  if (/^4F-PCC\b/.test(agent)) return 'four-factor-pcc';
  return undefined;
}
export const NEURAXIAL_PEARL = /^Boxed warning: spinal\/epidural hematoma/;

function CanonicalLink({ id, self }: { id: CanonicalId | undefined; self: string }) {
  if (!id || id === self) return null;
  return (
    <a href={`#/vascular-antithrombotics/${id}`} className="mt-1 inline-flex min-h-8 items-center text-xs font-medium text-sky-400 hover:text-sky-300">
      {CANONICAL_COPY.prefix}&nbsp;<span className="underline">{CANONICAL_COPY[id]}</span>&nbsp;→
    </a>
  );
}

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
                <EvidenceNote items={r.evidenceNote} />
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
  // 4.5: reversal → thrombolysis rule → hold before procedure → uses and doses (collapsed) → renal/hepatic → monitoring → interactions → pregnancy → pearls.
  const t = e.timing;
  const jump = jumpTargets([
    ['sec-reversal', 'Reversal', e.reversal.length > 0],
    ['sec-lysis', 'Thrombolysis', t.thrombolysisRule.length > 0],
    ['sec-hold', 'Hold', t.holdBeforeProcedure.length > 0],
    ['sec-uses', 'Uses', true],
    ['sec-renal', 'Renal/hepatic', e.renalHepatic.length > 0],
    ['sec-monitoring', 'Monitoring', e.monitoring.length > 0],
    ['sec-interactions', 'Interactions', e.interactions.length > 0],
    ['sec-pregnancy', 'Pregnancy', e.pregnancy.length > 0],
    ['sec-pearls', 'Pearls', e.pearls.length > 0],
    ['sec-varies', 'Institution', e.institutionVaries.length > 0],
  ]);
  return (
    <EntryShell registry="vascular-antithrombotics" entry={e} jump={jump}>
      <p className="mt-2 text-sm text-slate-200">
        {e.subclass} · {e.mechanism}
      </p>
      <p className="text-sm text-slate-300">Half-life: {t.halfLifeText}</p>
      {e.reversal.length > 0 && (
        <Section id="sec-reversal" title="Reversal" open>
          <TreatmentList items={e.reversal} canonical={(t) => <CanonicalLink id={reversalCanonical(t.agent)} self={e.id} />} />
        </Section>
      )}
      {t.thrombolysisRule.length > 0 && (
        <Section id="sec-lysis" title="Thrombolysis" open>
          <Bullets items={t.thrombolysisRule} />
        </Section>
      )}
      {t.holdBeforeProcedure.length > 0 && (
        <Section id="sec-hold" title="Hold before procedure" open>
          <Bullets items={t.holdBeforeProcedure} />
        </Section>
      )}
      <Section id="sec-uses" title="Uses and doses">
        <TreatmentList items={e.uses} />
      </Section>
      {e.renalHepatic.length > 0 && (
        <Section id="sec-renal" title="Renal / hepatic">
          <Bullets items={e.renalHepatic} />
        </Section>
      )}
      {e.monitoring.length > 0 && (
        <Section id="sec-monitoring" title="Monitoring">
          <Bullets items={e.monitoring} />
        </Section>
      )}
      {e.interactions.length > 0 && (
        <Section id="sec-interactions" title="Interactions">
          <Bullets items={e.interactions} />
        </Section>
      )}
      {e.pregnancy.length > 0 && (
        <Section id="sec-pregnancy" title="Pregnancy">
          <Bullets items={e.pregnancy} />
        </Section>
      )}
      {e.pearls.length > 0 && (
        <Section id="sec-pearls" title="Pearls">
          <Bullets items={e.pearls} />
          <CanonicalLink id={e.pearls.some((p) => NEURAXIAL_PEARL.test(p)) ? 'periprocedural-holds-lp-evd' : undefined} self={e.id} />
        </Section>
      )}
      {e.institutionVaries.length > 0 && (
        <Section id="sec-varies" title="Varies by institution">
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
      <Bullets items={f.normalPercentText} tone="text-xs text-slate-400" />
      <Bullets items={f.typicalFindings} />
    </Section>
  );
}

const SPECIMEN_TONE: Record<AntibodyEntry['testing']['preferredSpecimen'], string> = {
  SERUM: 'border-rose-400 bg-rose-950/40 text-rose-100',
  CSF: 'border-sky-400 bg-sky-950/40 text-sky-100',
  BOTH: 'border-purple-400 bg-purple-950/40 text-purple-100',
};

/** 4.7: large preferred-specimen badge at the top of each antibody card (from `testing.preferredSpecimen`). */
/** Signed-off testing lines about drawing before immunotherapy (e.g. MOG). Shown verbatim next to the badge; never authored here. */
const BEFORE_IMMUNOTHERAPY = /\bbefore\b[^.;]*\b(steroids|IVIG|IVIg|PLEX|immunotherapy)\b/i;
export function drawBeforeLines(t: AntibodyEntry['testing']): string[] {
  return [...t.rationale, ...t.methodNotes].filter((x) => BEFORE_IMMUNOTHERAPY.test(x));
}

function SpecimenBadge({ specimen, drawBefore }: { specimen: AntibodyEntry['testing']['preferredSpecimen']; drawBefore: string[] }) {
  const b = SPECIMEN_BADGE[specimen];
  return (
    <div className={`mt-3 rounded-lg border-2 px-3 py-2 ${SPECIMEN_TONE[specimen]}`}>
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">{SPECIMEN_BADGE.heading}</span>
        <span className="text-2xl font-bold tracking-wide">{b.label}</span>
        <span className="text-sm opacity-90">{b.detail}</span>
      </div>
      {drawBefore.map((l) => (
        <p key={l} className="mt-1 text-sm font-semibold">
          {l}
        </p>
      ))}
    </div>
  );
}

function AntibodyEntryView({ e }: { e: AntibodyEntry }) {
  return (
    <EntryShell registry="neural-antibodies" entry={e}>
      <SpecimenBadge specimen={e.testing.preferredSpecimen} drawBefore={drawBeforeLines(e.testing)} />
      <div className="mt-2 flex flex-wrap gap-2">
        <EnumBadge label={PNS_LABEL[e.pnsRisk] ?? e.pnsRisk} help={PNS_HELP[e.pnsRisk]} tone={PNS_TONE[e.pnsRisk]} />
        <EnumBadge label={RESPONSE_LABEL[e.immunotherapyResponse] ?? e.immunotherapyResponse} />
      </div>
      <Section title="Syndromes" open>
        <ul className="space-y-0.5 text-sm">
          {e.syndromes.map((s) => (
            <li key={s.syndrome} className={s.typical ? 'text-slate-100' : 'text-slate-400'}>
              {s.syndrome}
              {!s.typical && <span className="text-xs text-slate-400"> (less typical)</span>}
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
                {t.tumor} <span className="text-slate-400">— {t.frequencyText}</span>
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
      Browse={SyndromeBrowse}
    />
  );
}

const TIER_HELP = Object.fromEntries(INTERACTION_TIER_LEGEND) as Record<string, string>;
const TIER_TONE: Record<string, string> = {
  AVOID: 'bg-red-600 text-white',
  HIGH_RISK: 'bg-orange-500 text-black',
  CAUTION: 'bg-yellow-400 text-black',
};
const TIER_LABEL: Record<string, string> = {
  AVOID: 'Avoid',
  HIGH_RISK: 'High risk',
  CAUTION: 'Caution',
};

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
