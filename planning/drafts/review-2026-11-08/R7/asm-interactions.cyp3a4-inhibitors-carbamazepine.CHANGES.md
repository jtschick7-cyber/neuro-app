# asm-interactions:cyp3a4-inhibitors-carbamazepine — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/asm-interactions.json`. Findings: F-I2, D9d. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | cyp3a4-inhibitors-carbamazepine | — |
| `title` | (absent) | Macrolides, azoles or isoniazid with carbamazepine | — |
| `searchTerms` | (absent) | [0] Tegretol clarithromycin<br>[1] Biaxin<br>[2] erythromycin carbamazepine<br>[3] fluconazole Tegretol<br>[4] carbamazepine toxicity | — |
| `objectDrugs` | (absent) | [0] carbamazepine | — |
| `precipitantDrugs` | (absent) | [0] clarithromycin<br>[1] erythromycin<br>[2] fluconazole<br>[3] voriconazole<br>[4] isoniazid |  |
| `tier` | (absent) | CAUTION | "close monitoring … dosage adjustment may be required" → CAUTION |
| `effect` | (absent) | [0] ↑ carbamazepine levels → toxicity<br>[1] Fluconazole: serum carbamazepine +30% observed (fluconazole label) | Tegretol "Agents That Increase Carbamazepine Levels"; fluconazole Precautions (Carbamazepine: +30%) |
| `mechanism` | (absent) | [0] CYP3A4 inhibition (Tegretol) | Tegretol (CYP3A4 inhibitors) |
| `management` | (absent) | [0] Monitor carbamazepine levels closely; dose adjustment may be required (Tegretol)<br>[1] Isoniazid: check a carbamazepine level before starting; watch for toxicity and adjust (isoniazid label) | Tegretol; isoniazid Drug Interactions (Carbamazepine) |
| `population` | (absent) | [] | — |
| `pearls` | (absent) | [0] Voriconazole with carbamazepine is contraindicated — carbamazepine lowers voriconazole (voriconazole §4); see the voriconazole entry<br>[1] Carbamazepine raises isoniazid hepatotoxicity (Tegretol)<br>[2] Tegretol label also lists ciprofloxacin, diltiazem, verapamil, fluoxetine, omeprazole, aprepitant, protease inhibitors, grapefruit juice | [0] voriconazole §4; [1] Tegretol Other Drug Interactions; [2] Tegretol inhibitor list |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [] | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Tegretol (carbamazepine) tablets, suspension, XR tablets US prescribing information. Novartis; revised 8/2026 (user-supplied label)<br>[1] Fluconazole tablets USP US prescribing information. ANI; revised 8/2025 (user-supplied label)<br>[2] Isoniazid tablets USP US prescribing information. Marlex; revised 9/2025 (user-supplied label)<br>[3] Voriconazole tablets US prescribing information. Aurobindo; revised 4/2026 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Erythromycin/clarithromycin labels not read; the carbamazepine label is the source
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-I2, D9d: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- asm-interactions: one MINOR for R7, applied at assembly. See README.
