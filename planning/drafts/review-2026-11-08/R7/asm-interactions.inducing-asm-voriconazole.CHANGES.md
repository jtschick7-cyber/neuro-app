# asm-interactions:inducing-asm-voriconazole — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/asm-interactions.json`. Findings: F-I6, D9a. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | inducing-asm-voriconazole | — |
| `title` | (absent) | Carbamazepine or long-acting barbiturates with voriconazole | — |
| `searchTerms` | (absent) | [0] Vfend Tegretol<br>[1] voriconazole phenobarbital<br>[2] antifungal seizure medication | — |
| `objectDrugs` | (absent) | [0] voriconazole | — |
| `precipitantDrugs` | (absent) | [0] carbamazepine<br>[1] long-acting barbiturates (e.g., phenobarbital) |  |
| `tier` | (absent) | AVOID | Contraindicated → AVOID |
| `effect` | (absent) | [0] ↓ voriconazole levels (likely significant) → loss of antifungal efficacy | Voriconazole §4; Table 10 ("Not Studied … but Likely to Result in Significant Reduction") |
| `mechanism` | (absent) | [0] CYP450 induction (voriconazole Table 10) | Table 10 (CYP450 Induction) |
| `management` | (absent) | [0] Contraindicated (voriconazole §4) | §4 |
| `population` | (absent) | [] | — |
| `pearls` | (absent) | [0] Phenytoin is not contraindicated — increase the voriconazole dose; see the fluconazole/voriconazole–phenytoin entry | §2.7, Table 10 (phenytoin: increase dose) |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [] | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Voriconazole tablets US prescribing information. Aurobindo; revised 4/2026 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Every number above traces to the label location in the source column.
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-I6, D9a: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- asm-interactions: one MINOR for R7, applied at assembly. See README.
