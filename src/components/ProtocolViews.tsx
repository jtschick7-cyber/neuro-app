import { useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react';
import { ArrowLeft, ChevronRight, Search } from 'lucide-react';
import BannerList from './BannerList';
import BedsideNotes from './BedsideNotes';
import EntryFooter from './EntryFooter';
import RelatedLinks from './RelatedLinks';
import DrugTabs from './DrugTabs';
import { Bullets, EvidenceBadge, EvidenceNote, JumpChips, Section, Sources, TreatmentList, WorkupList, type JumpTarget } from './ProtocolParts';
import { ENTRY_LAYOUT_COPY } from '../content/copy';
import { PinButton } from './Pins';
import {
  CATEGORY_LABEL,
  groupByCategory,
  loadAcute,
  loadConsults,
  searchEntries,
  type AcuteEntry,
  type ConsultEntry,
  type ProtocolRegistry,
  type Searchable,
} from '../lib/protocols';
import { toHash } from '../lib/route';
import type { RegistryId } from '../lib/nav';

type Loaded<E> = { status: 'loading' } | { status: 'error' } | { status: 'ready'; data: ProtocolRegistry<E> };

function useLoaded<E>(load: () => Promise<ProtocolRegistry<E>>): Loaded<E> {
  const [state, setState] = useState<Loaded<E>>({ status: 'loading' });
  useEffect(() => {
    let live = true;
    load().then(
      (data) => live && setState({ status: 'ready', data }),
      () => live && setState({ status: 'error' }),
    );
    return () => {
      live = false;
    };
  }, [load]);
  return state;
}

interface ScreenProps<E extends Searchable & { id: string }> {
  registry: RegistryId;
  noun: string;
  placeholder: string;
  load: () => Promise<ProtocolRegistry<E>>;
  entryId?: string;
  renderEntry: (e: E) => ReactNode;
  /** Optional wrapper around the list (e.g. the syndrome filter); receives the search-matched entries and the normal list as children. */
  Browse?: ComponentType<{ entries: E[]; children: ReactNode }>;
}

export function RegistryScreen<E extends Searchable & { id: string }>({ registry, noun, placeholder, load, entryId, renderEntry, Browse }: ScreenProps<E>) {
  const state = useLoaded(load);
  const [query, setQuery] = useState('');
  const entries = state.status === 'ready' ? state.data.entries : [];
  const groups = useMemo(() => groupByCategory(searchEntries(entries, query)), [entries, query]);

  if (state.status === 'loading') return <p className="text-sm text-slate-400">Loading…</p>;
  if (state.status === 'error') return <p className="text-sm text-red-300">Couldn’t load this section. Reload the app.</p>;

  if (entryId !== undefined) {
    const entry = entries.find((e) => e.id === entryId);
    return (
      <div className="space-y-3">
        <a href={toHash({ kind: 'registry', registry })} className="inline-flex min-h-10 items-center gap-1 text-xs font-medium text-sky-400 hover:text-sky-300">
          <ArrowLeft size={16} aria-hidden="true" /> {noun}
          {entry && (CATEGORY_LABEL[entry.category] ?? entry.category) !== noun ? ` · ${CATEGORY_LABEL[entry.category] ?? entry.category}` : ''}
        </a>
        {entry ? renderEntry(entry) : <p className="text-sm text-slate-400">No entry “{entryId}” in {noun}.</p>}
      </div>
    );
  }

  const shown = groups.reduce((n, [, g]) => n + g.length, 0);
  const listView = (
    <>
      {groups.map(([cat, list]) => (
        <section key={cat}>
          <h2 className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-sky-400">{CATEGORY_LABEL[cat] ?? cat}</h2>
          <ul className="space-y-1.5">
            {list.map((e) => (
              <li key={e.id}>
                <a
                  href={toHash({ kind: 'registry', registry, entryId: e.id })}
                  className="flex min-h-12 items-center justify-between gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-4 py-2 text-base text-slate-100 hover:border-sky-500"
                >
                  {e.title}
                  <ChevronRight size={18} aria-hidden="true" className="shrink-0 text-slate-400" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {shown === 0 && <p className="text-sm text-slate-400">No matches.</p>}
    </>
  );
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={`Search ${noun}`}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/90 py-2 pl-10 pr-3 text-base text-slate-100 placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50"
        />
      </div>
      <p className="text-xs text-slate-400">
        {shown} of {entries.length} · v{state.data.version}
      </p>
      {state.data.scopeNotes?.map((n) => (
        <p key={n} className="text-xs text-slate-400">
          {n}
        </p>
      ))}
      {Browse ? <Browse entries={groups.flatMap(([, g]) => g)}>{listView}</Browse> : listView}
    </div>
  );
}

/** Jump-chip targets for the sections an entry actually renders (in on-screen order), plus Sources. */
export function jumpTargets(sections: [id: string, label: string, present: boolean][]): JumpTarget[] {
  return [...sections.filter(([, , present]) => present).map(([id, label]) => ({ id, label })), { id: 'sec-sources', label: ENTRY_LAYOUT_COPY.sources }];
}

export function EntryShell({
  registry,
  entry,
  jump = [],
  children,
}: {
  registry: RegistryId;
  entry: { id: string; title: string; category: string; verify: string[]; lastReviewed: string; sources: string[] };
  jump?: JumpTarget[];
  children: ReactNode;
}) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-start justify-between gap-2">
        <h1 className="text-lg font-semibold text-slate-100">{entry.title}</h1>
        <PinButton registryId={registry} entryId={entry.id} />
      </div>
      <p className="text-xs text-slate-400">{CATEGORY_LABEL[entry.category] ?? entry.category}</p>
      <BannerList entry={entry} />
      <JumpChips targets={jump} />
      {children}
      {entry.verify.length > 0 && (
        <Section title="VERIFY" open>
          <Bullets items={entry.verify} tone="text-amber-300" />
        </Section>
      )}
      <Sources items={entry.sources} />
      <EntryFooter registryId={registry} entryId={entry.id} lastReviewed={entry.lastReviewed} />
      <BedsideNotes noteId={`${registry}-${entry.id}`} />
    </article>
  );
}

function AcuteEntryView({ e }: { e: AcuteEntry }) {
  // 4.3: open = immediate actions, treatment (and escalation triggers); collapsed = presentation, workup, pitfalls, institution varies, sources.
  const jump = jumpTargets([
    ['sec-immediate', 'Immediate', true],
    ['sec-treatment', 'Treatment', true],
    ['sec-escalate', 'Escalate', true],
    ['sec-presentation', 'Presentation', true],
    ['sec-workup', 'Workup', true],
    ['sec-pitfalls', 'Pitfalls', e.pitfalls.length > 0],
    ['sec-varies', 'Institution', e.institutionVaries.length > 0],
  ]);
  return (
    <EntryShell registry="acute-neuro" entry={e} jump={jump}>
      <Section id="sec-immediate" title="Immediate actions" open>
        <ol className="space-y-1.5">
          {e.immediateActions.map((a) => (
            <li key={a.order} className="flex gap-2 text-sm">
              <span className="w-24 shrink-0 font-semibold text-sky-300">{a.window}</span>
              <span className="text-slate-100">{a.action}</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section id="sec-treatment" title="Treatment" open>
        <TreatmentList items={e.treatment} />
      </Section>
      <Section id="sec-escalate" title="Escalate when" open>
        <Bullets items={e.escalateWhen} tone="text-red-200" />
      </Section>
      <Section id="sec-presentation" title="Presentation">
        <Bullets items={e.presentation} />
        <Bullets items={e.definitions} tone="text-slate-400" />
      </Section>
      <Section id="sec-workup" title="Workup">
        <WorkupList items={e.workup} />
      </Section>
      {e.pitfalls.length > 0 && (
        <Section id="sec-pitfalls" title="Pitfalls">
          <Bullets items={e.pitfalls} tone="text-amber-200" />
        </Section>
      )}
      {e.institutionVaries.length > 0 && (
        <Section id="sec-varies" title="Varies by institution">
          <Bullets items={e.institutionVaries} />
        </Section>
      )}
      <RelatedLinks relatedIds={e.relatedIds} />
    </EntryShell>
  );
}

function ConsultEntryView({ e }: { e: ConsultEntry }) {
  return (
    <EntryShell
      registry="consult-workups"
      entry={e}
      jump={jumpTargets([
        ['sec-redflags', 'Red flags', true],
        ['sec-history', 'History', true],
        ['sec-exam', 'Exam', true],
        ['sec-differential', 'Differential', true],
        ['sec-workup', 'Workup', true],
        ['sec-rules', 'Rules', e.decisionRules.length > 0],
        ['sec-initial', 'Initial steps', e.initialSteps.length > 0],
        ['sec-dispo', 'Disposition', e.disposition.length > 0],
        ['sec-pearls', 'Pearls', e.pearls.length > 0],
        ['sec-varies', 'Institution', e.institutionVaries.length > 0],
      ])}
    >
      <p className="mt-2 text-sm text-slate-200">{e.consultQuestion}</p>
      <Section id="sec-redflags" title="Red flags" open alert>
        <Bullets items={e.redFlags} tone="text-red-200" />
      </Section>
      <Section id="sec-history" title="Key history">
        <Bullets items={e.keyHistory} />
      </Section>
      <Section id="sec-exam" title="Key exam">
        <Bullets items={e.keyExam} />
      </Section>
      <Section id="sec-differential" title="Differential" open>
        <ul className="space-y-1.5">
          {e.differential.map((d) => (
            <li key={d.dx} className="text-sm">
              <span className="text-slate-100">{d.dx}</span>
              {d.mustNotMiss && <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">Must not miss</span>}
              <Bullets items={d.clues} tone="text-slate-400" />
            </li>
          ))}
        </ul>
      </Section>
      <Section id="sec-workup" title="Workup">
        <WorkupList items={e.workup} />
      </Section>
      {e.decisionRules.length > 0 && (
        <Section id="sec-rules" title="Decision rules" open>
          <ol className="space-y-2">
            {e.decisionRules.map((r) => (
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
      )}
      {e.initialSteps.length > 0 && (
        <Section id="sec-initial" title="Initial steps">
          <Bullets items={e.initialSteps} />
        </Section>
      )}
      {e.disposition.length > 0 && (
        <Section id="sec-dispo" title="Disposition">
          <Bullets items={e.disposition} />
        </Section>
      )}
      {e.pearls.length > 0 && (
        <Section id="sec-pearls" title="Pearls">
          <Bullets items={e.pearls} />
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

export function AcuteView({ entryId }: { entryId?: string }) {
  return (
    <RegistryScreen
      registry="acute-neuro"
      noun="Acute protocols"
      placeholder="Search protocol (e.g. status, cord, herniation)"
      load={loadAcute}
      entryId={entryId}
      renderEntry={(e) => <AcuteEntryView e={e} />}
    />
  );
}

export function ConsultView({ entryId }: { entryId?: string }) {
  return (
    <div className="space-y-3">
      {entryId === undefined && <DrugTabs active="consult-workups" section="consults" />}
      <RegistryScreen
        registry="consult-workups"
        noun="Consult workups"
        placeholder="Search TIA, syncope, seizure..."
        load={loadConsults}
        entryId={entryId}
        renderEntry={(e) => <ConsultEntryView e={e} />}
      />
    </div>
  );
}
