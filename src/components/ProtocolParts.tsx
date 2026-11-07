import { useEffect, useRef, useState, type ReactNode } from 'react';
import RelatedLinks from './RelatedLinks';
import { ENTRY_LAYOUT_COPY, EVIDENCE_LEGEND, FORMULARY_LEGEND } from '../content/copy';
import { EVIDENCE_LABEL, FORMULARY_LABEL, PRIORITY_LABEL, ROLE_LABEL } from '../lib/protocols';
import type { TreatmentItem } from '../../schema/acute-neuro';
import type { z } from 'zod';

const EVIDENCE_HELP = Object.fromEntries(EVIDENCE_LEGEND) as Record<string, string>;
const FORMULARY_HELP = Object.fromEntries(FORMULARY_LEGEND) as Record<string, string>;

const EVIDENCE_TONE: Record<string, string> = {
  STRONG: 'bg-emerald-600 text-white',
  MODERATE: 'bg-emerald-800 text-emerald-100',
  WEAK: 'bg-yellow-400 text-black',
  NOT_RECOMMENDED: 'bg-red-600 text-white',
  CONSENSUS: 'bg-sky-800 text-sky-100',
  EXPERT_OPINION: 'bg-slate-600 text-slate-100',
  NOT_GRADED: 'bg-slate-700 text-slate-300',
};
const PRIORITY_TONE: Record<string, string> = {
  STAT: 'bg-red-600 text-white',
  URGENT: 'bg-orange-500 text-black',
  ROUTINE: 'bg-slate-600 text-slate-100',
  IF_INDICATED: 'border border-slate-500 text-slate-300',
};

function Pill({ tone, title, children }: { tone: string; title?: string; children: ReactNode }) {
  return (
    <span title={title} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${tone}`}>
      {children}
    </span>
  );
}

export const EvidenceBadge = ({ level }: { level: string }) => (
  <Pill tone={EVIDENCE_TONE[level] ?? EVIDENCE_TONE.NOT_GRADED} title={EVIDENCE_HELP[level]}>
    {EVIDENCE_LABEL[level] ?? level}
  </Pill>
);
export const PriorityBadge = ({ priority }: { priority: string }) => (
  <Pill tone={PRIORITY_TONE[priority] ?? PRIORITY_TONE.ROUTINE}>{PRIORITY_LABEL[priority] ?? priority}</Pill>
);
export const FormularyBadge = ({ status }: { status: string }) => (
  <Pill tone="border border-slate-600 text-slate-300" title={FORMULARY_HELP[status]}>
    {FORMULARY_LABEL[status] ?? status}
  </Pill>
);
export const RoleBadge = ({ role }: { role: string }) => (
  <Pill tone={role === 'NOT_RECOMMENDED' ? 'bg-red-900 text-red-100' : 'bg-sky-900 text-sky-100'}>{ROLE_LABEL[role] ?? role}</Pill>
);

/** Collapsible section; `open` for the parts needed in the first seconds. Empty sections are omitted by the caller. `id` = jump-chip target. */
export function Section({ id, title, open = false, alert = false, children }: { id?: string; title: string; open?: boolean; alert?: boolean; children: ReactNode }) {
  if (alert) {
    return (
      <details id={id} open={open} className="my-3 rounded-r-lg border-l-2 border-rose-500 bg-rose-950/20 py-2 pl-3 pr-2">
        <summary className="cursor-pointer select-none text-sm font-semibold text-rose-400">{title}</summary>
        <div className="mt-1">{children}</div>
      </details>
    );
  }
  return (
    <details id={id} open={open} className="my-1.5">
      <summary className="cursor-pointer select-none rounded-lg border border-slate-800/80 bg-slate-900/80 px-3 py-2 text-sm font-semibold text-slate-100">{title}</summary>
      <div className="mt-1 px-1">{children}</div>
    </details>
  );
}

/** Per-item evidence note, collapsed behind an "Evidence" disclosure (the evidence badge stays visible beside it). */
export function EvidenceNote({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <details className="mt-1 text-xs text-slate-400">
      <summary className="inline-flex min-h-8 cursor-pointer select-none items-center font-medium text-sky-400">{ENTRY_LAYOUT_COPY.evidence}</summary>
      <Bullets items={items} tone="text-xs text-slate-400" />
    </details>
  );
}

const CONTEXT_BAR = 'header[aria-label="Patient context"]';

/** Height of the sticky patient context bar, so the chip row can stick just below it. */
function useContextBarHeight(): number {
  const [h, setH] = useState(0);
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(CONTEXT_BAR);
    if (!el) return;
    const measure = () => setH(el.getBoundingClientRect().height);
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return h;
}

export interface JumpTarget {
  id: string;
  label: string;
}

/** Sticky row of chips that open and scroll to a section. Shown only on long entries (4+ sections). */
export function JumpChips({ targets }: { targets: JumpTarget[] }) {
  const top = useContextBarHeight();
  const row = useRef<HTMLDivElement>(null);
  if (targets.length < 4) return null;
  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el instanceof HTMLDetailsElement) el.open = true;
    const offset = top + (row.current?.getBoundingClientRect().height ?? 0) + 8;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  };
  return (
    <div ref={row} className="sticky z-10 -mx-4 mt-2 border-b border-slate-800 bg-slate-900/95 px-4 py-1.5 backdrop-blur" style={{ top }}>
      <nav aria-label={ENTRY_LAYOUT_COPY.jumpTo} className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {targets.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => jump(t.id)}
            className="min-h-8 shrink-0 whitespace-nowrap rounded-full border border-slate-700 bg-slate-950 px-3 text-xs font-medium text-slate-200 active:bg-slate-800"
          >
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}

export function Bullets({ items, tone = 'text-slate-300' }: { items: string[]; tone?: string }) {
  if (items.length === 0) return null;
  return (
    <ul className={`list-inside list-disc space-y-0.5 text-sm ${tone}`}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

export function WorkupList({ items }: { items: { test: string; priority: string; indication: string[]; notes: string[] }[] }) {
  return (
    <ul className="space-y-2">
      {items.map((w) => (
        <li key={w.test} className="text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <PriorityBadge priority={w.priority} />
            <span className="text-slate-100">{w.test}</span>
          </div>
          {w.indication.length > 0 && <p className="text-xs text-slate-400">If: {w.indication.join('; ')}</p>}
          <Bullets items={w.notes} tone="text-slate-400" />
        </li>
      ))}
    </ul>
  );
}

export function Sources({ items }: { items: string[] }) {
  return (
    <details id="sec-sources" className="mt-2 text-xs text-slate-400">
      <summary className="cursor-pointer">Sources</summary>
      <ul className="mt-1 list-inside list-disc">
        {items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </details>
  );
}

/** Treatment / use rows: role, agent, routes, dose text (as signed off), notes, evidence and formulary badges. */
export function TreatmentList({ items }: { items: z.infer<typeof TreatmentItem>[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={`${t.role}-${t.agent}`} className={t.role === 'NOT_RECOMMENDED' ? 'opacity-60' : ''}>
          <div className="flex flex-wrap items-center gap-2">
            <RoleBadge role={t.role} />
            <span className="text-sm font-semibold text-slate-100">{t.agent}</span>
            <span className="text-xs text-slate-400">{t.routes.join(', ')}</span>
          </div>
          <p className="text-sm text-slate-200">{t.doseText}</p>
          <Bullets items={t.notes} tone="text-slate-400" />
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <EvidenceBadge level={t.evidenceLevel} />
            <FormularyBadge status={t.formularyStatus} />
          </div>
          <EvidenceNote items={t.evidenceNote} />
          <RelatedLinks relatedIds={[]} calculatorIds={t.calculatorIds} />
        </li>
      ))}
    </ul>
  );
}

/** Generic enum badge with optional legend tooltip. */
export const EnumBadge = ({ label, help, tone = 'border border-slate-600 text-slate-300' }: { label: string; help?: string; tone?: string }) => (
  <Pill tone={tone} title={help}>
    {label}
  </Pill>
);
