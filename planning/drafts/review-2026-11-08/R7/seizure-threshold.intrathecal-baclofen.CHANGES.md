# seizure-threshold:intrathecal-baclofen — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/seizure-threshold.json`. Findings: F-T5, D3, D4. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | intrathecal-baclofen | — |
| `title` | (absent) | Intrathecal baclofen — abrupt withdrawal or overdose | — |
| `searchTerms` | (absent) | [0] Gablofen<br>[1] Lioresal Intrathecal<br>[2] baclofen pump<br>[3] ITB withdrawal<br>[4] pump failure<br>[5] baclofen overdose | — |
| `drugClass` | (absent) | GABA-B agonist (intrathecal) | — |
| `generics` | (absent) | [0] baclofen (intrathecal) | — |
| `brands` | (absent) | [0] Gablofen<br>[1] Lioresal Intrathecal | — |
| `tier` | (absent) | AVOID | Boxed "DO NOT DISCONTINUE ABRUPTLY" → AVOID, meaning avoid interruption (D4); explained in pearls[0] and title |
| `fdaBoxedWarning` | (absent) | false | Boxed warning is withdrawal, not seizures → false + pearls[1] (D3) |
| `usMarketed` | (absent) | true | — |
| `effect` | (absent) | [0] Seizures with withdrawal, with overdose, and at therapeutic doses (Gablofen §5.5)<br>[1] Convulsion on maintenance infusion: 4.7% (spinal origin), 10.0% (cerebral origin) in trials (Gablofen §6.1, Tables 1–2) | Gablofen §5.5; §6.1 Table 1 (spinal, maintenance 4.7%) and Table 2 (cerebral, maintenance 10.0%); same in Lioresal Intrathecal tables |
| `mechanism` | (absent) | [] |  |
| `pearls` | (absent) | [0] AVOID = avoid abrupt interruption (boxed warning: "Do not discontinue abruptly")<br>[1] Abrupt stop → high fever, altered mental status, rebound spasticity, rigidity; rarely rhabdomyolysis, multiorgan failure, death (boxed warning)<br>[2] Early withdrawal: return of spasticity, pruritus, hypotension, paresthesias; onset hours to a few days (§5.5)<br>[3] Advanced withdrawal can resemble autonomic dysreflexia, sepsis, malignant hyperthermia or NMS (§5.5)<br>[4] Common causes: catheter malfunction (especially disconnection), low reservoir volume, pump battery end of life (§5.5)<br>[5] Higher risk: spinal cord injury at T6 or above, communication difficulties, prior withdrawal (boxed warning)<br>[6] Treat withdrawal: restore intrathecal baclofen at or near the prior dose; if delayed, oral/enteral baclofen or oral/enteral/IV benzodiazepines — oral baclofen alone isn't enough (§5.5)<br>[7] Overdose: drowsiness, respiratory depression, seizures, rostral hypotonia, coma up to 72 h; no antidote — remove residual drug from the pump, intubate if needed (§10)<br>[8] Overdose: physostigmine 2 mg IM/IV at ≤1 mg/min may reverse drowsiness and respiratory depression (anecdotal), but can induce seizures and bradycardia (§10)<br>[9] Overdose: if LP not contraindicated, consider withdrawing 30–40 mL CSF (§10) | [0]–[1], [5] Gablofen Boxed Warning; [2]–[4], [6] §5.5; [7]–[9] §10. Same content in Lioresal Intrathecal (Warnings; Overdosage) |
| `saferAlternatives` | (absent) | [] | — |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] acute-neuro:nms-parkinsonism-hyperpyrexia<br>[1] acute-neuro:convulsive-status-epilepticus | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Gablofen (baclofen injection) intrathecal US prescribing information. Piramal Critical Care; revised 5/2026 (user-supplied label)<br>[1] Lioresal Intrathecal (baclofen injection) US prescribing information. Amneal; revised 12/2022 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Every number above traces to the label location in the source column.
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-T5, D3, D4: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- seizure-threshold: one MINOR for R7, applied at assembly. See README.
