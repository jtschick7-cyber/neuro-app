# seizure-threshold:ifosfamide — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/seizure-threshold.json`. Findings: F-T4, D3, D8. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | ifosfamide | — |
| `title` | (absent) | Ifosfamide | — |
| `searchTerms` | (absent) | [0] Ifex<br>[1] ifosfamide encephalopathy<br>[2] methylene blue | — |
| `drugClass` | (absent) | Alkylating agent (antineoplastic) | — |
| `generics` | (absent) | [0] ifosfamide | — |
| `brands` | (absent) | [0] Ifex | — |
| `tier` | (absent) | CAUTION | §5.2 "monitor" → CAUTION (D4) |
| `fdaBoxedWarning` | (absent) | false | Boxed warning is encephalopathy, not seizures → false + pearl[0] (D3) |
| `usMarketed` | (absent) | true | — |
| `effect` | (absent) | [0] Encephalopathy, sometimes fatal: confusion, somnolence, coma, hallucinations, extrapyramidal signs, seizures; onset hours to days after a dose and may recur (§5.2) | §5.2 |
| `mechanism` | (absent) | [] |  |
| `pearls` | (absent) | [0] Boxed warning: encephalopathy (seizures are among its signs, §5.2)<br>[1] Risk factors: high dose, hypoalbuminemia, renal impairment, poor performance status, bulky abdominal-pelvic disease, nephrotoxic drugs incl. cisplatin, CNS-active drugs, alcohol (§5.2)<br>[2] Label: consider methylene blue for encephalopathy — no dose given (§5.2)<br>[3] CYP3A4 inducers may increase chloroacetaldehyde, the neurotoxic metabolite — monitor for toxicity (§7.1)<br>[4] Rechallenge after neurotoxicity: some recurred, including fatal events (§6.2) | Boxed Warning; §5.2; §7.1; §6.2 (postmarketing, Nervous System Disorders) |
| `saferAlternatives` | (absent) | [] | — |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] acute-neuro:pres | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Ifex (ifosfamide) for injection US prescribing information. Baxter; revised 10/2026 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Methylene blue dose not encoded: the label gives none
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-T4, D3, D8: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- seizure-threshold: one MINOR for R7, applied at assembly. See README.
