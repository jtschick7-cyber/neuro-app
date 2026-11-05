import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import BannerList from './BannerList';
import BedsideNotes from './BedsideNotes';
import EntryFooter from './EntryFooter';
import RelatedLinks from './RelatedLinks';
import { Bullets, EvidenceBadge, FormularyBadge, RoleBadge, Section, Sources, WorkupList } from './ProtocolParts';
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
}

function RegistryScreen<E extends Searchable & { id: string }>({ registry, noun, placeholder, load, entryId, renderEntry }: ScreenProps<E>) {
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
        <a href={toHash({ kind: 'registry', registry })} className="inline-flex min-h-10 items-center gap-1 text-sm text-sky-300">
          <ArrowLeft size={16} aria-hidden="true" /> {noun}
        </a>
        {entry ? renderEntry(entry) : <p className="text-sm text-slate-400">No entry “{entryId}” in {noun}.</p>}
      </div>
    );
  }

  const shown = groups.reduce((n, [, g]) => n + g.length, 0);
  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          aria-label={`Search ${noun}`}
          className="w-full rounded-lg border border-slate-600 bg-slate-800 py-2 pl-10 pr-3 text-base text-slate-100 placeholder-slate-500 focus:border-sky-400 focus:outline-none"
        />
      </div>
      <p className="text-xs text-slate-500">
        {shown} of {entries.length} · v{state.data.version}
      </p>
      {groups.map(([cat, list]) => (
        <section key={cat}>
          <h2 className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{CATEGORY_LABEL[cat] ?? cat}</h2>
          <ul className="space-y-1.5">
            {list.map((e) => (
              <li key={e.id}>
                <a
                  href={toHash({ kind: 'registry', registry, entryId: e.id })}
                  className="flex min-h-12 items-center rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-base text-slate-100 hover:border-sky-500"
                >
                  {e.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      {shown === 0 && <p className="text-sm text-slate-400">No matches.</p>}
    </div>
  );
}

function EntryShell({
  registry,
  entry,
  children,
}: {
  registry: RegistryId;
  entry: { id: string; title: string; category: string; verify: string[]; lastReviewed: string; sources: string[] };
  children: ReactNode;
}) {
  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <h1 className="text-lg font-semibold text-slate-100">{entry.title}</h1>
      <p className="text-xs text-slate-500">{CATEGORY_LABEL[entry.category] ?? entry.category}</p>
      <BannerList entry={entry} />
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
  return (
    <EntryShell registry="acute-neuro" entry={e}>
      <Section title="Immediate actions" open>
        <ol className="space-y-1.5">
          {e.immediateActions.map((a) => (
            <li key={a.order} className="flex gap-2 text-sm">
              <span className="w-24 shrink-0 font-semibold text-sky-300">{a.window}</span>
              <span className="text-slate-100">{a.action}</span>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Presentation" open>
        <Bullets items={e.presentation} />
        <Bullets items={e.definitions} tone="text-slate-400" />
      </Section>
      <Section title="Workup" open>
        <WorkupList items={e.workup} />
      </Section>
      <Section title="Treatment" open>
        <ul className="space-y-3">
          {e.treatment.map((t) => (
            <li key={`${t.role}-${t.agent}`} className={t.role === 'NOT_RECOMMENDED' ? 'opacity-60' : ''}>
              <div className="flex flex-wrap items-center gap-2">
                <RoleBadge role={t.role} />
                <span className="text-sm font-semibold text-slate-100">{t.agent}</span>
                <span className="text-xs text-slate-500">{t.routes.join(', ')}</span>
              </div>
              <p className="text-sm text-slate-200">{t.doseText}</p>
              <Bullets items={t.notes} tone="text-slate-400" />
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <EvidenceBadge level={t.evidenceLevel} />
                <FormularyBadge status={t.formularyStatus} />
              </div>
              <Bullets items={t.evidenceNote} tone="text-xs text-slate-500" />
              <RelatedLinks relatedIds={[]} calculatorIds={t.calculatorIds} />
            </li>
          ))}
        </ul>
      </Section>
      {e.pitfalls.length > 0 && (
        <Section title="Pitfalls" open>
          <Bullets items={e.pitfalls} tone="text-amber-200" />
        </Section>
      )}
      <Section title="Escalate when" open>
        <Bullets items={e.escalateWhen} tone="text-red-200" />
      </Section>
      {e.institutionVaries.length > 0 && (
        <Section title="Varies by institution">
          <Bullets items={e.institutionVaries} />
        </Section>
      )}
      <RelatedLinks relatedIds={e.relatedIds} />
    </EntryShell>
  );
}

function ConsultEntryView({ e }: { e: ConsultEntry }) {
  return (
    <EntryShell registry="consult-workups" entry={e}>
      <p className="mt-2 text-sm text-slate-200">{e.consultQuestion}</p>
      <Section title="Red flags" open>
        <Bullets items={e.redFlags} tone="text-red-200" />
      </Section>
      <Section title="Key history" open>
        <Bullets items={e.keyHistory} />
      </Section>
      <Section title="Key exam" open>
        <Bullets items={e.keyExam} />
      </Section>
      <Section title="Differential" open>
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
      <Section title="Workup" open>
        <WorkupList items={e.workup} />
      </Section>
      {e.decisionRules.length > 0 && (
        <Section title="Decision rules" open>
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
                <Bullets items={r.evidenceNote} tone="text-xs text-slate-500" />
              </li>
            ))}
          </ol>
        </Section>
      )}
      {e.initialSteps.length > 0 && (
        <Section title="Initial steps">
          <Bullets items={e.initialSteps} />
        </Section>
      )}
      {e.recsTemplate.length > 0 && (
        <Section title="Recs template">
          <Bullets items={e.recsTemplate} />
        </Section>
      )}
      {e.disposition.length > 0 && (
        <Section title="Disposition">
          <Bullets items={e.disposition} />
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
    <RegistryScreen
      registry="consult-workups"
      noun="Consult workups"
      placeholder="Search consult (e.g. TIA, syncope, headache)"
      load={loadConsults}
      entryId={entryId}
      renderEntry={(e) => <ConsultEntryView e={e} />}
    />
  );
}
