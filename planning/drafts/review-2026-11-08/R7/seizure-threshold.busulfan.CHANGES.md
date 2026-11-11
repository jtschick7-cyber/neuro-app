# seizure-threshold:busulfan — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/seizure-threshold.json`. Findings: F-T6, D8. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | busulfan | — |
| `title` | (absent) | Busulfan (high-dose IV conditioning) | — |
| `searchTerms` | (absent) | [0] Busulfex<br>[1] HSCT conditioning<br>[2] busulfan seizure prophylaxis | — |
| `drugClass` | (absent) | Alkylating agent (transplant conditioning) | — |
| `generics` | (absent) | [0] busulfan | — |
| `brands` | (absent) | [0] Busulfex | — |
| `tier` | (absent) | CAUTION | §5.2 "Use caution" → CAUTION (D4) |
| `fdaBoxedWarning` | (absent) | false | Boxed warning is myelosuppression |
| `usMarketed` | (absent) | true | — |
| `effect` | (absent) | [0] Seizures with high-dose busulfan; 1/42 seized despite phenytoin prophylaxis, 36 h after the last dose (§5.2) | §5.2 |
| `mechanism` | (absent) | [] |  |
| `pearls` | (absent) | [0] Label requires ASM prophylaxis: start 12 h before the first dose and continue to 24 h after the last (§2.1)<br>[1] Label options: benzodiazepines, phenytoin, valproic acid or levetiracetam (§2.1, §5.2)<br>[2] Phenytoin ↑ busulfan clearance ≥15%; label PK was studied on phenytoin, so exposure may be higher without it (§7.2)<br>[3] Use caution with prior seizures, head trauma or other epileptogenic drugs (§5.2) | §2.1 (12 h before to 24 h after); §2.1, §5.2 (agents); §7.2 (phenytoin ≥15%); §5.2 (caution) |
| `saferAlternatives` | (absent) | [] | — |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] antiseizure-medications:levetiracetam<br>[1] antiseizure-medications:phenytoin-fosphenytoin | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Busulfex (busulfan) injection US prescribing information. Otsuka; revised 10/2026 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Every number above traces to the label location in the source column.
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-T6, D8: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- seizure-threshold: one MINOR for R7, applied at assembly. See README.
