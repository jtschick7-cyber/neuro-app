# asm-interactions:inducing-asm-dabigatran-edoxaban — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/asm-interactions.json`. Findings: F-I4, D5. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | inducing-asm-dabigatran-edoxaban | — |
| `title` | (absent) | Carbamazepine or phenytoin with dabigatran or edoxaban | — |
| `searchTerms` | (absent) | [0] Pradaxa Tegretol<br>[1] Savaysa Dilantin<br>[2] DOAC seizure medication | — |
| `objectDrugs` | (absent) | [0] dabigatran<br>[1] edoxaban | — |
| `precipitantDrugs` | (absent) | [0] carbamazepine<br>[1] phenytoin<br>[2] fosphenytoin |  |
| `tier` | (absent) | AVOID | Tegretol "avoided" → AVOID (D5); phenytoin wording kept per label in management[1] |
| `effect` | (absent) | [0] ↓ dabigatran/edoxaban levels → reduced anticoagulant effect | Tegretol Other Drug Interactions (DOACs); Dilantin Table 3 (Anticoagulants) |
| `mechanism` | (absent) | [0] Dabigatran and edoxaban are P-gp substrates; P-gp inducers lower exposure (Pradaxa §5.5; Savaysa §12.3) | Pradaxa §5.5; Savaysa §12.3 ("Edoxaban is a substrate of P-gp") |
| `management` | (absent) | [0] Carbamazepine: avoid with dabigatran or edoxaban (Tegretol names both)<br>[1] Phenytoin: lowers dabigatran and edoxaban levels (Dilantin Table 3); Pradaxa: P-gp inducers should generally be avoided (§5.5); Savaysa: avoid rifampin (§7.2) — neither names phenytoin | Tegretol ("should be avoided"); Dilantin Table 3; Pradaxa §5.5 ("should generally be avoided"); Savaysa §7.2 (rifampin) |
| `population` | (absent) | [] | — |
| `pearls` | (absent) | [0] Fosphenytoin is a phenytoin prodrug — same interaction | Prodrug convention |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] vascular-antithrombotics:dabigatran<br>[1] vascular-antithrombotics:edoxaban<br>[2] asm-interactions:inducing-asm-apixaban-rivaroxaban | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Tegretol (carbamazepine) tablets, suspension, XR tablets US prescribing information. Novartis; revised 8/2026 (user-supplied label)<br>[1] Dilantin (extended phenytoin sodium capsules) US prescribing information. Viatris; revised 8/2023 (user-supplied label)<br>[2] Pradaxa (dabigatran etexilate) capsules US prescribing information. Boehringer Ingelheim; revised 6/2025 (user-supplied label)<br>[3] Savaysa (edoxaban) tablets US prescribing information. Daiichi Sankyo; revised 7/2025 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Every number above traces to the label location in the source column.
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-I4, D5: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- asm-interactions: one MINOR for R7, applied at assembly. See README.
