# seizure-threshold:isoniazid — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/seizure-threshold.json`. Findings: F-T1, D9c. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | isoniazid | — |
| `title` | (absent) | Isoniazid | — |
| `searchTerms` | (absent) | [0] INH<br>[1] tuberculosis<br>[2] isoniazid overdose<br>[3] pyridoxine | — |
| `drugClass` | (absent) | Antimycobacterial | — |
| `generics` | (absent) | [0] isoniazid | — |
| `brands` | (absent) | [] | — |
| `tier` | (absent) | CAUTION | Label has no seizure-disorder restriction; risk is overdose → CAUTION (D4) |
| `fdaBoxedWarning` | (absent) | false | Boxed warning is hepatitis |
| `usMarketed` | (absent) | true | — |
| `effect` | (absent) | [0] Convulsions uncommon at conventional doses; overdose → severe, intractable seizures, coma and severe metabolic acidosis within 30 min–3 h | Adverse Reactions (Nervous System: convulsions uncommon at conventional doses); Overdosage (Signs and Symptoms) |
| `mechanism` | (absent) | [] |  |
| `pearls` | (absent) | [0] Gross overdose 80–150 mg/kg can be fatal; acute ingestion >80 mg/kg gets IV pyridoxine even if asymptomatic<br>[1] Pyridoxine IV gram for gram equal to the isoniazid dose; amount unknown: 5 g (adult)<br>[2] Symptomatic: give pyridoxine as a slow IV bolus over 3–5 min; asymptomatic with unknown amount: 5 g over 30–60 min<br>[3] Seizures continue: repeat pyridoxine (rarely >10 g; maximum safe dose unknown); no response: diazepam<br>[4] Phenytoin only with caution — isoniazid inhibits its metabolism<br>[5] Isoniazid raises carbamazepine and phenytoin levels — check a carbamazepine level before starting; adjust the ASM dose | [0]–[4] Overdosage (Treatment: 80–150 mg/kg; >80 mg/kg; gram for gram; 5 g; 3–5 min; 30–60 min; repeat, rarely >10 g, max safe dose unknown; diazepam; phenytoin cautiously). [5] Drug Interactions (Carbamazepine; Phenytoin) — D9c |
| `saferAlternatives` | (absent) | [] | — |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] acute-neuro:convulsive-status-epilepticus<br>[1] antiseizure-medications:phenytoin-fosphenytoin | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Isoniazid tablets USP US prescribing information. Marlex; revised 9/2025 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Every number above traces to the label location in the source column.
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-T1, D9c: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- seizure-threshold: one MINOR for R7, applied at assembly. See README.
