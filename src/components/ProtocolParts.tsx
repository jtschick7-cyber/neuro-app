import type { ReactNode } from 'react';
import RelatedLinks from './RelatedLinks';
import { EVIDENCE_LEGEND, FORMULARY_LEGEND } from '../content/copy';
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

/** Collapsible section; `open` for the parts needed in the first seconds. Empty sections are omitted by the caller. */
export function Section({ title, open = false, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details open={open} className="mt-3 border-t border-slate-800 pt-2">
      <summary className="min-h-8 cursor-pointer text-sm font-semibold text-slate-200">{title}</summary>
      <div className="mt-1">{children}</div>
    </details>
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
    <details className="mt-2 text-xs text-slate-500">
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
  );
}

/** Generic enum badge with optional legend tooltip. */
export const EnumBadge = ({ label, help, tone = 'border border-slate-600 text-slate-300' }: { label: string; help?: string; tone?: string }) => (
  <Pill tone={tone} title={help}>
    {label}
  </Pill>
);
