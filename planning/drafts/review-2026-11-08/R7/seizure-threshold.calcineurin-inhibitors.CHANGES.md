# seizure-threshold:calcineurin-inhibitors — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/seizure-threshold.json`. Findings: F-T3, D1. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | calcineurin-inhibitors | — |
| `title` | (absent) | Tacrolimus and cyclosporine | — |
| `searchTerms` | (absent) | [0] Prograf<br>[1] FK506<br>[2] Neoral<br>[3] Sandimmune<br>[4] calcineurin inhibitor<br>[5] transplant PRES | — |
| `drugClass` | (absent) | Calcineurin inhibitor immunosuppressants | — |
| `generics` | (absent) | [0] tacrolimus<br>[1] cyclosporine | — |
| `brands` | (absent) | [0] Prograf<br>[1] Neoral | — |
| `tier` | (absent) | CAUTION | Prograf §5.6 "monitor … consider dosage reduction" → CAUTION (D4) |
| `fdaBoxedWarning` | (absent) | false | Boxed warnings are infection/malignancy (Prograf) and immunosuppression/nephrotoxicity (Neoral) |
| `usMarketed` | (absent) | true | — |
| `effect` | (absent) | [0] Tacrolimus: PRES, delirium, seizures and coma; also tremor, paresthesias, headache — linked to troughs at or above range (Prograf §5.6)<br>[1] Cyclosporine: convulsions, especially with high-dose methylprednisolone; encephalopathy including PRES (Neoral Warnings) | Prograf §5.6; Neoral Warnings (Neurotoxicity) |
| `mechanism` | (absent) | [] |  |
| `pearls` | (absent) | [0] Tacrolimus neurotoxicity: check the trough; consider dose reduction or stopping (Prograf §5.6)<br>[1] Cyclosporine PRES risk factors: hypertension, hypomagnesemia, hypocholesterolemia, high-dose steroids, high cyclosporine levels, GVHD; liver > kidney transplant (Neoral Warnings)<br>[2] Cyclosporine encephalopathy usually reverses after stopping; some improve with dose reduction (Neoral Warnings)<br>[3] Cyclosporine: rare optic disc edema/papilledema from intracranial hypertension (Neoral Warnings)<br>[4] Strong CYP3A inhibitors (voriconazole, posaconazole, clarithromycin, ritonavir): rapid, sharp tacrolimus rise despite dose reduction — neurotoxicity risk (Prograf §5.11, Table 15)<br>[5] Enzyme-inducing ASMs lower both drugs' levels — see asm-interactions | [0] Prograf §5.6; [1]–[3] Neoral Warnings (Neurotoxicity); [4] Prograf §5.11, Table 15; [5] cross-reference to new asm-interactions entry (text only — id not yet in valid-ids.txt) |
| `saferAlternatives` | (absent) | [] | — |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] acute-neuro:pres | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Prograf (tacrolimus) capsules, injection, granules US prescribing information. Astellas; revised 8/2023 (user-supplied label)<br>[1] Neoral (cyclosporine) capsules and oral solution (modified) US prescribing information. Novartis; revised 8/2026 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Sandimmune is a search term only; its label was not read
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-T3, D1: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- seizure-threshold: one MINOR for R7, applied at assembly. See README.
