# asm-interactions:azoles-phenytoin — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/asm-interactions.json`. Findings: F-I3. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | azoles-phenytoin | — |
| `title` | (absent) | Fluconazole or voriconazole with phenytoin | — |
| `searchTerms` | (absent) | [0] Diflucan Dilantin<br>[1] Vfend phenytoin<br>[2] phenytoin toxicity<br>[3] azole antifungal seizure medication | — |
| `objectDrugs` | (absent) | [0] phenytoin | — |
| `precipitantDrugs` | (absent) | [0] fluconazole<br>[1] voriconazole |  |
| `tier` | (absent) | CAUTION | "monitor" → CAUTION |
| `effect` | (absent) | [0] ↑ phenytoin levels → toxicity<br>[1] Fluconazole 200 mg/day: phenytoin AUC +88% (range 16–247%) in volunteers; nonlinear kinetics make the size unpredictable (fluconazole label) | Dilantin Table 2 (azoles increase phenytoin); fluconazole Clinical Pharmacology (Phenytoin: AUC +88%, 16–247%) and Precautions |
| `mechanism` | (absent) | [0] CYP2C9 inhibition (voriconazole Table 11) | Voriconazole Table 11 (Phenytoin, CYP2C9 Inhibition) |
| `management` | (absent) | [0] Monitor phenytoin levels closely (both labels)<br>[1] Voriconazole: also monitor frequently for phenytoin adverse effects (Table 11)<br>[2] Voriconazole maintenance must be increased with phenytoin: 4 → 5 mg/kg IV q12h, or 200 → 400 mg PO q12h (100 → 200 mg if <40 kg) (voriconazole §2.7, Table 10) | Fluconazole Precautions; voriconazole Table 11; voriconazole §2.7 and Table 10 (Phenytoin row: 4→5 mg/kg IV, 200→400 mg PO, 100→200 mg <40 kg) |
| `population` | (absent) | [] | — |
| `pearls` | (absent) | [0] Two-way: phenytoin significantly lowers voriconazole<br>[1] Phenytoin impairs efficacy of fluconazole, ketoconazole, itraconazole, posaconazole and voriconazole (Dilantin Table 3)<br>[2] Fosphenytoin is a phenytoin prodrug — same interaction | [0] voriconazole Table 10; [1] Dilantin Table 3; [2] prodrug convention |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] antiseizure-medications:phenytoin-fosphenytoin<br>[1] calc:phenytoin-correction | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Dilantin (extended phenytoin sodium capsules) US prescribing information. Viatris; revised 8/2023 (user-supplied label)<br>[1] Fluconazole tablets USP US prescribing information. ANI; revised 8/2025 (user-supplied label)<br>[2] Voriconazole tablets US prescribing information. Aurobindo; revised 4/2026 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Every number above traces to the label location in the source column.
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-I3: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- asm-interactions: one MINOR for R7, applied at assembly. See README.
