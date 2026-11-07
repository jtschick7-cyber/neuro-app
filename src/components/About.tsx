import {
  ABOUT,
  DISCLAIMER_GATE,
  EVIDENCE_LEGEND,
  FORMULARY_LEGEND,
  INTERACTION_TIER_LEGEND,
  MATRIX_DIRECTION_LEGEND,
  MATRIX_STATUS_LEGEND,
  MG_TIER_LEGEND,
  NORMAL_LIKELIHOOD_LEGEND,
  PNS_RISK_LEGEND,
  TARGET_ROLE_LEGEND,
} from '../content/copy';
import { Bullets } from './ProtocolParts';
import about from '../../generated/about.json';

const LEGENDS: [string, readonly (readonly [string, string])[]][] = [
  ['Evidence level', EVIDENCE_LEGEND],
  ['Formulary status', FORMULARY_LEGEND],
  ['Caution tier (MG)', MG_TIER_LEGEND],
  ['Interaction tier', INTERACTION_TIER_LEGEND],
  ['Cancer risk (PNS-Care)', PNS_RISK_LEGEND],
  ['Normal-result likelihood (antibodies)', NORMAL_LIKELIHOOD_LEGEND],
  ['Reference-card row role', TARGET_ROLE_LEGEND],
  ['Test-validity matrix', MATRIX_STATUS_LEGEND],
  ['Matrix direction', MATRIX_DIRECTION_LEGEND],
];

function Block({ title, children, open = false }: { title: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details open={open} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <summary className="min-h-8 cursor-pointer text-base font-semibold text-slate-100">{title}</summary>
      <div className="mt-2 text-sm text-slate-300">{children}</div>
    </details>
  );
}

/** About: purpose, method, versions, review status, calculators, sources and badge legends (all from copy.ts and generated/about.json). */
export default function About() {
  const unsigned = about.registries.reduce((n, r) => n + r.unreviewedIds.length, 0);
  const openVerify = about.registries.reduce((n, r) => n + r.openVerify, 0) + about.calculators.reduce((n, c) => n + c.openVerify, 0);
  return (
    <div className="space-y-3">
      <h1 className="text-lg font-semibold text-slate-100">{ABOUT.title}</h1>
      <p className="text-sm text-slate-300">{ABOUT.purpose}</p>
      <Block title="Method and scope" open>
        <Bullets items={[...ABOUT.method, ...ABOUT.scope]} />
        <p className="mt-2 text-xs text-slate-400">{ABOUT.feedback}</p>
      </Block>
      <Block title={ABOUT.sections.versions} open>
        <dl className="grid grid-cols-2 gap-1">
          <dt className="text-slate-400">App</dt>
          <dd>{about.appVersion}</dd>
          <dt className="text-slate-400">Content</dt>
          <dd>{about.contentVersion}</dd>
          <dt className="text-slate-400">Content built</dt>
          <dd>{about.builtAt}</dd>
          <dt className="text-slate-400">Build</dt>
          <dd>{__BUILD_ID__}</dd>
        </dl>
      </Block>
      <Block title={ABOUT.sections.review}>
        <p className="mb-2 text-xs text-slate-400">
          {unsigned} unsigned entries · {openVerify} open VERIFY items
        </p>
        <ul className="space-y-1.5">
          {about.registries.map((r) => (
            <li key={r.id}>
              <div className="text-slate-100">{r.title}</div>
              <div className="text-xs text-slate-400">
                v{r.version} · {r.reviewed}/{r.entries} signed off · reviewed {r.oldestReview === r.newestReview ? r.oldestReview : `${r.oldestReview} to ${r.newestReview}`} · {r.openVerify} open VERIFY
              </div>
            </li>
          ))}
        </ul>
      </Block>
      <Block title={ABOUT.sections.calculators}>
        <ul className="space-y-0.5">
          {about.calculators.map((c) => (
            <li key={c.id}>
              {c.title} <span className="text-xs text-slate-500">({c.id}{c.openVerify > 0 ? ` · ${c.openVerify} open VERIFY` : ''})</span>
            </li>
          ))}
        </ul>
      </Block>
      <Block title={ABOUT.sections.legends}>
        {LEGENDS.map(([name, rows]) => (
          <div key={name} className="mb-2">
            <div className="text-xs font-semibold text-slate-400">{name}</div>
            <ul className="space-y-0.5">
              {rows.map(([k, v]) => (
                <li key={k}>
                  <span className="font-semibold text-slate-100">{k.replace(/_/g, ' ').toLowerCase()}</span> — {v}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Block>
      <Block title={`${ABOUT.sections.sources} (${about.sources.length}, oldest ${about.oldestSourceYear})`}>
        <ul className="list-inside list-disc space-y-1 text-xs text-slate-400">
          {about.sources.map((s) => (
            <li key={s.citation}>{s.citation}</li>
          ))}
        </ul>
      </Block>
      <Block title={DISCLAIMER_GATE.title}>
        <Bullets items={DISCLAIMER_GATE.body} />
      </Block>
    </div>
  );
}
