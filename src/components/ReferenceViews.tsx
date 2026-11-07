import DrugTabs from './DrugTabs';
import RelatedLinks from './RelatedLinks';
import { Bullets, EnumBadge, EvidenceBadge, Section, TreatmentList } from './ProtocolParts';
import { EntryShell, RegistryScreen } from './ProtocolViews';
import { MATRIX_DIRECTION_LEGEND, MATRIX_STATUS_LEGEND, REFERENCE_COPY, TARGET_ROLE_LEGEND } from '../content/copy';
import { fillTemplate } from '../lib/banners';
import { cockcroftGault } from '../lib/calculators';
import { parsePositive, type PatientContext } from '../lib/patientContext';
import {
  CELL_DIRECTION_GLYPH,
  CELL_DIRECTION_LABEL,
  CELL_STATUS_LABEL,
  CELL_STATUS_SHORT,
  CRCL_BASIS_LABEL,
  TARGET_ROLE_LABEL,
  loadAsm,
  loadReferenceCards,
  renalRowMatches,
  type AsmEntry,
  type ReferenceCardEntry,
} from '../lib/protocols';

type CardSection = ReferenceCardEntry['sections'][number];
type MatrixSection = Extract<CardSection, { kind: 'MATRIX' }>;
type RowSection = Exclude<CardSection, { kind: 'MATRIX' }>;
type TargetRow = RowSection['rows'][number];
type MatrixCell = MatrixSection['rows'][number]['cells'][number];
type RenalRow = AsmEntry['renal'][number];

const TARGET_ROLE_HELP = Object.fromEntries(TARGET_ROLE_LEGEND) as Record<string, string>;
const STATUS_HELP = Object.fromEntries(MATRIX_STATUS_LEGEND) as Record<string, string>;

const TARGET_ROLE_TONE: Record<string, string> = {
  TARGET: 'bg-sky-700 text-white',
  RECOMMENDED: 'bg-sky-900 text-sky-100',
  NOT_RECOMMENDED: 'bg-red-900 text-red-100',
  EVIDENCE_SUMMARY: 'border border-slate-500 text-slate-300',
};
const STATUS_TONE: Record<string, string> = {
  VALID: 'bg-emerald-700 text-white',
  CAUTION: 'bg-yellow-400 text-black',
  UNRELIABLE: 'bg-red-600 text-white',
  ASSAY_DEPENDENT: 'bg-sky-800 text-sky-100',
  NOT_ADDRESSED: 'border border-slate-600 text-slate-400',
};

/** Clinician-entered CrCl from the patient context bar (memory only), or null if incomplete or out of range. */
function contextCrcl(c: PatientContext): number | null {
  const w = parsePositive(c.weightKg);
  const a = parsePositive(c.age);
  const cr = parsePositive(c.creatinine);
  if (w === null || a === null || cr === null || c.sex === '') return null;
  try {
    return cockcroftGault(a, w, cr, c.sex === 'F').value;
  } catch {
    return null;
  }
}

function RenalRows({ rows, crcl }: { rows: RenalRow[]; crcl: number | null }) {
  const bands = rows.filter((r) => r.kind === 'CRCL_BAND');
  const cg = bands.some((r) => r.crclBasis === 'CG_ML_MIN');
  const bsa = bands.some((r) => r.crclBasis === 'BSA_NORMALIZED_ML_MIN_1_73M2');
  return (
    <>
      {cg && (
        <p className="mb-1 text-xs text-sky-300">
          {crcl === null ? REFERENCE_COPY.renalNeedContext : fillTemplate(REFERENCE_COPY.renalHighlight, { crcl })}
        </p>
      )}
      {bsa && <p className="mb-1 text-xs text-slate-400">{REFERENCE_COPY.renalBsaNotHighlighted}</p>}
      <ul className="space-y-1.5">
        {rows.map((r) => {
          const hit = renalRowMatches(r, crcl);
          return (
            <li
              key={`${r.kind}-${r.label}`}
              className={`rounded-lg border px-3 py-2 text-sm ${hit ? 'border-sky-400 bg-sky-950/40 ring-1 ring-sky-400' : 'border-slate-800'}`}
              aria-current={hit ? 'true' : undefined}
            >
              <div className="font-semibold text-slate-100">{r.label}</div>
              <p className="text-slate-200">{r.doseText}</p>
              {r.crclBasis && <p className="text-xs text-slate-400">{CRCL_BASIS_LABEL[r.crclBasis] ?? r.crclBasis}</p>}
              <Bullets items={r.notes} tone="text-slate-400" />
            </li>
          );
        })}
      </ul>
    </>
  );
}

function AsmEntryView({ e, crcl }: { e: AsmEntry; crcl: number | null }) {
  const lists: [string, string[]][] = [
    ['Hepatic', e.hepatic],
    ['IV ↔ PO', e.ivPo],
    ['Enteral / tube', e.enteral],
    ['Levels', e.levels],
    ['Interactions', e.interactions],
    ['Pearls', e.pearls],
  ];
  return (
    <EntryShell registry="antiseizure-medications" entry={e}>
      <Section title="Maintenance" open>
        <TreatmentList items={e.maintenance} />
      </Section>
      {(e.renal.length > 0 || e.renalNotes.length > 0) && (
        <Section title="Renal" open>
          <RenalRows rows={e.renal} crcl={crcl} />
          <Bullets items={e.renalNotes} tone="mt-1 text-slate-400" />
        </Section>
      )}
      {lists.map(([title, items]) =>
        items.length > 0 ? (
          <Section key={title} title={title}>
            <Bullets items={items} />
          </Section>
        ) : null,
      )}
      <RelatedLinks relatedIds={e.relatedIds} calculatorIds={e.calculatorIds} />
    </EntryShell>
  );
}

function RowSources({ items }: { items: string[] }) {
  return (
    <details className="mt-0.5 text-xs text-slate-400">
      <summary className="cursor-pointer">{REFERENCE_COPY.rowSources}</summary>
      <ul className="mt-1 list-inside list-disc">
        {items.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </details>
  );
}

function TargetRows({ rows }: { rows: TargetRow[] }) {
  return (
    <ul className="space-y-3">
      {rows.map((r) => {
        const summary = r.role === 'EVIDENCE_SUMMARY';
        return (
          <li key={`${r.parameter}-${r.condition}-${r.target}`} className={r.role === 'NOT_RECOMMENDED' ? 'opacity-60' : ''}>
            <div className="flex flex-wrap items-center gap-2">
              <EnumBadge label={TARGET_ROLE_LABEL[r.role] ?? r.role} help={TARGET_ROLE_HELP[r.role]} tone={TARGET_ROLE_TONE[r.role]} />
              <span className="text-sm font-semibold text-slate-100">{r.parameter}</span>
              <span className="text-xs text-slate-400">{r.condition}</span>
            </div>
            <p className={summary ? 'text-sm italic text-slate-300' : 'text-base font-semibold text-sky-200'}>{r.target}</p>
            <Bullets items={r.notes} tone="text-slate-400" />
            <div className="mt-1">
              <EvidenceBadge level={r.evidenceLevel} />
            </div>
            <Bullets items={r.evidenceNote} tone="text-xs text-slate-400" />
            <RowSources items={r.sources} />
          </li>
        );
      })}
    </ul>
  );
}

function StatusChip({ cell, short = false }: { cell: MatrixCell; short?: boolean }) {
  const full = `${CELL_STATUS_LABEL[cell.status] ?? cell.status}${cell.direction ? ` — ${CELL_DIRECTION_LABEL[cell.direction] ?? cell.direction}` : ''}`;
  const tone = STATUS_TONE[cell.status] ?? STATUS_TONE.NOT_ADDRESSED;
  if (!short)
    return (
      <span title={STATUS_HELP[cell.status]} className={`inline-flex min-h-6 items-center rounded-md px-1.5 text-[11px] font-semibold ${tone}`}>
        {full}
      </span>
    );
  // Grid form: short label, direction glyph stacked beneath so four chips fit a phone width.
  return (
    <span
      title={STATUS_HELP[cell.status]}
      aria-label={full}
      className={`flex min-h-9 flex-col items-center justify-center rounded-md px-0.5 text-[11px] font-semibold leading-tight ${tone}`}
    >
      <span>{CELL_STATUS_SHORT[cell.status] ?? cell.status}</span>
      {cell.direction && <span aria-hidden="true">{CELL_DIRECTION_GLYPH[cell.direction]}</span>}
    </span>
  );
}

/** Test × setting grid: each row shows status chips; tapping it opens every cell's finding, evidence and sources. */
export function MatrixView({ section }: { section: MatrixSection }) {
  const label = Object.fromEntries(section.columns.map((c) => [c.key, c.label]));
  // Test name on its own line; status chips in an equal-width grid under it, aligned with the column header (fits 375 px).
  const grid = { gridTemplateColumns: `repeat(${section.columns.length}, minmax(0, 1fr))` };
  return (
    <div>
      <p className="mb-1 text-xs text-slate-400">{REFERENCE_COPY.matrixHint}</p>
      <div className="grid gap-1 px-2 py-1 text-[11px] font-semibold text-slate-400" style={grid} aria-hidden="true">
        {section.columns.map((c) => (
          <span key={c.key} className="break-words text-center leading-tight">
            {c.label}
          </span>
        ))}
      </div>
      <ul className="space-y-1">
        {section.rows.map((r) => (
          <li key={r.test}>
            <details className="rounded-lg border border-slate-800 bg-slate-900/80">
              <summary className="cursor-pointer list-none px-2 py-1.5">
                <span className="text-sm leading-tight text-slate-100">{r.test}</span>
                <span className="mt-1 grid gap-1" style={grid}>
                  {r.cells.map((c) => (
                    <StatusChip key={c.column} cell={c} short />
                  ))}
                </span>
              </summary>
              <div className="space-y-2 border-t border-slate-800 px-3 py-2">
                {r.cells.map((c) => (
                  <div key={c.column} className="text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-200">{label[c.column] ?? c.column}</span>
                      <StatusChip cell={c} />
                    </div>
                    {c.status === 'NOT_ADDRESSED' ? (
                      <p className="text-slate-400">{REFERENCE_COPY.notAddressed}</p>
                    ) : (
                      <>
                        <p className="text-slate-200">{c.text}</p>
                        <div className="mt-0.5">
                          <EvidenceBadge level={c.evidenceLevel} />
                        </div>
                        <Bullets items={c.evidenceNote} tone="text-xs text-slate-400" />
                        <RowSources items={c.sources} />
                      </>
                    )}
                  </div>
                ))}
                {r.notes.length > 0 && (
                  <div className="text-sm">
                    <div className="font-semibold text-slate-200">{REFERENCE_COPY.notes}</div>
                    <ul className="space-y-1.5">
                      {r.notes.map((n) => (
                        <li key={n.text}>
                          <p className="text-slate-300">{n.text}</p>
                          <div className="mt-0.5">
                            <EvidenceBadge level={n.evidenceLevel} />
                          </div>
                          <Bullets items={n.evidenceNote} tone="text-xs text-slate-400" />
                          <RowSources items={n.sources} />
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </details>
          </li>
        ))}
      </ul>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-slate-400">
        {MATRIX_DIRECTION_LEGEND.map(([k, t]) => (
          <li key={k}>{t}</li>
        ))}
      </ul>
    </div>
  );
}

function ReferenceCardView({ e }: { e: ReferenceCardEntry }) {
  return (
    <EntryShell registry="reference-cards" entry={e}>
      <p className="mt-1 text-sm text-slate-400">{e.scopeNote}</p>
      {e.sections.map((s) => (
        <Section key={s.heading} title={s.heading} open>
          {'kind' in s ? <MatrixView section={s} /> : <TargetRows rows={s.rows} />}
        </Section>
      ))}
      {e.pitfalls.length > 0 && (
        <Section title={REFERENCE_COPY.pitfalls} open>
          <Bullets items={e.pitfalls} tone="text-amber-200" />
        </Section>
      )}
      <RelatedLinks relatedIds={e.relatedIds} />
    </EntryShell>
  );
}

export function AsmView({ entryId, context }: { entryId?: string; context: PatientContext }) {
  const crcl = contextCrcl(context);
  return (
    <div className="space-y-3">
      {entryId === undefined && <DrugTabs active="antiseizure-medications" />}
      <RegistryScreen
        registry="antiseizure-medications"
        noun="ASM dosing"
        placeholder="Search drug or brand (e.g. Keppra, Vimpat)"
        load={loadAsm}
        entryId={entryId}
        renderEntry={(e) => <AsmEntryView e={e} crcl={crcl} />}
      />
    </div>
  );
}

export function ReferenceCardsView({ entryId }: { entryId?: string }) {
  return (
    <div className="space-y-3">
      {entryId === undefined && <DrugTabs active="reference-cards" section="consults" />}
      <RegistryScreen
        registry="reference-cards"
        noun="Reference cards"
        placeholder="Search ICU targets, aSAH, thrombophilia, Parkinson..."
        load={loadReferenceCards}
        entryId={entryId}
        renderEntry={(e) => <ReferenceCardView e={e} />}
      />
    </div>
  );
}
