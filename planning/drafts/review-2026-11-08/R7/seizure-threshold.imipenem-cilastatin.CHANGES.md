# seizure-threshold:imipenem-cilastatin — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/seizure-threshold.json`. Findings: F-T2, D2. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | imipenem-cilastatin | — |
| `title` | (absent) | Imipenem-cilastatin | — |
| `searchTerms` | (absent) | [0] Primaxin<br>[1] imipenem seizure<br>[2] carbapenem seizure | — |
| `drugClass` | (absent) | Carbapenem antibiotic | — |
| `generics` | (absent) | [0] imipenem-cilastatin | — |
| `brands` | (absent) | [0] Primaxin | — |
| `tier` | (absent) | CAUTION | §5.2 "continue anticonvulsant therapy … re-examine dosage" → CAUTION (D4) |
| `fdaBoxedWarning` | (absent) | false | No boxed warning |
| `usMarketed` | (absent) | true | — |
| `effect` | (absent) | [0] Seizures 0.4% in adult trials; also confusion and myoclonus — mostly with CNS disorders (brain lesions, prior seizures), renal impairment or above-recommended doses | §5.2; §6.1 Table 4 (Nervous system: Seizures 0.4%) |
| `mechanism` | (absent) | [] |  |
| `pearls` | (absent) | [0] CrCl ≤30 mL/min, with or without hemodialysis: higher seizure risk — dose strictly to renal function (§2.3, §8.6)<br>[1] CrCl <15 mL/min: don't give unless hemodialysis starts within 48 h; on hemodialysis only if benefit outweighs seizure risk (§2.3–2.4)<br>[2] Focal tremor, myoclonus or seizure: evaluate, start an ASM if not on one, and reduce the dose or stop (§5.2)<br>[3] Ganciclovir: generalized seizures reported — avoid together unless benefit outweighs risk (§7.1)<br>[4] Valproate: generally not recommended — see asm-interactions (§5.3) | §2.3 (CrCl <30 to ≥15 risk; <15 unless HD within 48 h), §2.4 (HD: only if benefit outweighs risk), §8.6 (CrCl ≤30 higher risk), §5.2 (tremor/myoclonus/seizures → evaluate, ASM, reduce or stop), §7.1 (ganciclovir), §5.3 (valproate) |
| `saferAlternatives` | (absent) | [] | — |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] asm-interactions:carbapenems-valproate<br>[1] seizure-threshold:beta-lactams-carbapenems | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Primaxin (imipenem and cilastatin) for injection US prescribing information. Merck Sharp & Dohme; revised 7/2024 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Brief's "strongest carbapenem signal" not encoded: the label makes no comparison with other carbapenems
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-T2, D2: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- seizure-threshold: one MINOR for R7, applied at assembly. See README.
