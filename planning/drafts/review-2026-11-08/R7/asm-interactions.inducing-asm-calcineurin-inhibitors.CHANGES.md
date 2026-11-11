# asm-interactions:inducing-asm-calcineurin-inhibitors — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/asm-interactions.json`. Findings: F-I1, D6. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | inducing-asm-calcineurin-inhibitors | — |
| `title` | (absent) | Enzyme-inducing antiseizure medications with tacrolimus or cyclosporine | — |
| `searchTerms` | (absent) | [0] Prograf Tegretol<br>[1] tacrolimus phenytoin<br>[2] cyclosporine carbamazepine<br>[3] transplant seizure medication<br>[4] rejection | — |
| `objectDrugs` | (absent) | [0] tacrolimus<br>[1] cyclosporine | — |
| `precipitantDrugs` | (absent) | [0] carbamazepine<br>[1] phenytoin<br>[2] fosphenytoin<br>[3] phenobarbital<br>[4] oxcarbazepine | Prograf Table 15 (phenytoin, carbamazepine, phenobarbital); Neoral A.2 (carbamazepine, oxcarbazepine, phenobarbital, phenytoin); fosphenytoin by prodrug convention (existing entry precedent) |
| `tier` | (absent) | CAUTION | "monitor … adjust" → CAUTION |
| `effect` | (absent) | [0] ↓ tacrolimus/cyclosporine levels → rejection risk | Prograf Table 15 ("increase the risk of rejection"); Neoral Drug Interactions A.2 |
| `mechanism` | (absent) | [0] CYP3A induction | Prograf Table 15 (Strong CYP3A Inducers); Neoral (CYP3A4/P-gp) |
| `management` | (absent) | [0] Tacrolimus: increase the dose and monitor whole-blood troughs (Prograf Table 15)<br>[1] Cyclosporine: adjust the dose to target levels (Neoral Drug Interactions)<br>[2] Carbamazepine label: monitor tacrolimus levels and adjust (Tegretol) | Prograf Table 15; Neoral Drug Interactions ("Appropriate Neoral dosage adjustment … is essential"); Tegretol ("monitoring of tacrolimus blood concentrations") |
| `population` | (absent) | [] | — |
| `pearls` | (absent) | [0] Oxcarbazepine is named in the cyclosporine label only<br>[1] Fosphenytoin is a phenytoin prodrug — same interaction<br>[2] Carbamazepine and phenytoin labels also list cyclosporine as lowered (Tegretol; Dilantin Table 3) | [0] Neoral A.2 only (D6); [1] prodrug convention; [2] Tegretol "Decreased Levels" list; Dilantin Table 3 |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] antiseizure-medications:phenytoin-fosphenytoin | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Prograf (tacrolimus) capsules, injection, granules US prescribing information. Astellas; revised 8/2023 (user-supplied label)<br>[1] Neoral (cyclosporine) capsules and oral solution (modified) US prescribing information. Novartis; revised 8/2026 (user-supplied label)<br>[2] Tegretol (carbamazepine) tablets, suspension, XR tablets US prescribing information. Novartis; revised 8/2026 (user-supplied label)<br>[3] Dilantin (extended phenytoin sodium capsules) US prescribing information. Viatris; revised 8/2023 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Every number above traces to the label location in the source column.
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-I1, D6: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- asm-interactions: one MINOR for R7, applied at assembly. See README.
