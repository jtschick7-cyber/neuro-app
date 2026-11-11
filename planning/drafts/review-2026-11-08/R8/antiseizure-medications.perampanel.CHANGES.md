# antiseizure-medications:perampanel — CHANGES (new entry)

Review 2026-11-08, item R8 (drafted 2026-11-09). New entry: every "current" value is (absent). "§" = label section; older-format labels (Tegretol, Zonegran) are cited by section heading. AES = Vossler & Gidal, AES ASM summary 4th ed., rev. 4/1/2024.

| field path | current | new | source + location | why |
|---|---|---|---|---|
| `id` / `title` | (absent) | perampanel / Perampanel (Fycompa) — maintenance dosing and NPO options | — | New entry |
| `searchTerms` | (absent) | Fycompa; PER; perampanel suspension; perampanel inducers; perampanel aggression | — | Findability |
| `maintenance[0]` | (absent) | **Perampanel — no moderate/strong CYP3A4 inducer** — routes PO, NG — Start 2 mg once daily at bedtime; ↑ by 2 mg/day no more often than weekly. Maintenance 8–12 mg once daily (focal; some respond to 4 mg); 8 mg once daily for PGTC, up to 12 mg if tolerated | Fycompa label §2.1–2.2 | Label dosing |
| `maintenance[0].dose[0]` | (absent) | Start: 2–2 MG FIXED PER_DOSE; no cap; Once daily at bedtime | Fycompa label §2.1–2.2 | Structured copy of doseText |
| `maintenance[0].dose[1]` | (absent) | Maintenance: 8–12 MG FIXED PER_DOSE; cap 12 MG PER_DAY; Once daily at bedtime | Fycompa label §2.1–2.2 | Structured copy of doseText |
| `maintenance[0].notes[0]` | (absent) | 12 mg: somewhat greater seizure reduction than 8 mg, with substantially more adverse reactions (§2.1) | §2.1 | R8 finding F-perampanel |
| `maintenance[0]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds [] | Label ungraded; D6 formulary | R8 finding F-perampanel |
| `maintenance[1]` | (absent) | **Perampanel — WITH moderate/strong CYP3A4 inducer (phenytoin, carbamazepine, oxcarbazepine)** — routes PO, NG — Start 4 mg once daily at bedtime; ↑ by 2 mg/day no more often than weekly. No established maintenance dose; highest studied 12 mg once daily | Fycompa label §2.3 | Label dosing |
| `maintenance[1].dose[0]` | (absent) | Start: 4–4 MG FIXED PER_DOSE; no cap; Once daily at bedtime | Fycompa label §2.3 | Structured copy of doseText |
| `maintenance[1]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds [] | Label ungraded; D6 formulary | R8 finding F-perampanel |
| `renal[0]` | (absent) | INTERMITTENT_HD Hemodialysis (None): Not recommended (§2.5) | §2.5 | R8 finding F-perampanel |
| `renalNotes[0]` | (absent) | Mild: no adjustment; moderate: use with close monitoring, consider slower titration; severe: not recommended (§2.5, §8.7) | §2.5, §8.7 | R8 finding F-perampanel |
| `hepatic[0]` | (absent) | Mild or moderate: start 2 mg; ↑ by 2 mg no more often than every 2 weeks; max 6 mg (mild) or 4 mg (moderate) (§2.4) | §2.4 | R8 finding F-perampanel |
| `hepatic[1]` | (absent) | Severe: not recommended (§2.4) | §2.4 | R8 finding F-perampanel |
| `ivPo[0]` | (absent) | Oral only — no parenteral formulation (§3) | §3 | R8 finding F-perampanel |
| `enteral[0]` | (absent) | Oral suspension 0.5 mg/mL; comparable bioavailability to tablets — interchangeable (§3, §12.3) | §3, §12.3 | R8 finding F-perampanel |
| `enteral[1]` | (absent) | Suspension: shake well; use the supplied adapter and syringe; discard 90 days after opening (§2.7) | §2.7 | R8 finding F-perampanel |
| `enteral[2]` | (absent) | Crushing tablets or tube administration not addressed in label — confirm with pharmacy | Fycompa label(s) read in full: no tube statement | R8 finding F-perampanel |
| `levels[0]` | (absent) | No established range — AES 2024 summary Table 1 | AES 2024 Table 1, perampanel row ("Not established") | R8 finding F-perampanel |
| `interactions[0]` | (absent) | Moderate/strong CYP3A4 inducers (carbamazepine, phenytoin, oxcarbazepine) ↓ perampanel ~50–67%; monitor and adjust when started or stopped (§7.2) | §7.2 | R8 finding F-perampanel |
| `interactions[1]` | (absent) | Alcohol and CNS depressants: additive CNS depression (§7.3) | §7.3 | R8 finding F-perampanel |
| `pearls[0]` | (absent) | Boxed warning: aggression, hostility, homicidal ideation — reduce dose if they occur; stop if severe or worsening (§5.1) | §5.1 | R8 finding F-perampanel |
| `pearls[1]` | (absent) | Half-life ~105 h: steady state 2–3 weeks; levels fall gradually even after abrupt stop (§5.6, §12.3) | §5.6, §12.3 | R8 finding F-perampanel |
| `pearls[2]` | (absent) | Elderly: ↑ dose no more often than every 2 weeks (§2.6) | §2.6 | R8 finding F-perampanel |
| `pearls[3]` | (absent) | Falls: monitor (§5.4) | §5.4 | R8 finding F-perampanel |
| `calculatorIds` | (absent) | [] | valid-ids.txt | R8 finding F-perampanel |
| `verify` | (absent) | [] | — | Nothing unconfirmed |
| `relatedIds` | (absent) | [] | valid-ids.txt | Only ids already valid (assumption 3) |
| `sources[0]` | (absent) | Fycompa (perampanel) tablets and oral suspension US prescribing information. Catalyst Pharmaceuticals; revised 1/2024 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-perampanel |
| `sources[1]` | (absent) | Vossler DG, Gidal BE; American Epilepsy Society Treatments Committee. A Summary of Antiseizure Medications Available in the United States, 4th edition. American Epilepsy Society; revised April 1, 2024 (user-supplied) | Title page | R8 finding F-perampanel |
| `lastReviewed` | (absent) | UNREVIEWED | Rule | New entry |

## Open verify[]
- None.

## Registry version
- antiseizure-medications: one MINOR bump for all of R8 (see README).
