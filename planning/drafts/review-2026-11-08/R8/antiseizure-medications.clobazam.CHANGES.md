# antiseizure-medications:clobazam — CHANGES (new entry)

Review 2026-11-08, item R8 (drafted 2026-11-09). New entry: every "current" value is (absent). "§" = label section; older-format labels (Tegretol, Zonegran) are cited by section heading. AES = Vossler & Gidal, AES ASM summary 4th ed., rev. 4/1/2024.

| field path | current | new | source + location | why |
|---|---|---|---|---|
| `id` / `title` | (absent) | clobazam / Clobazam (Onfi / Sympazan) — maintenance dosing and NPO options | — | New entry |
| `searchTerms` | (absent) | Onfi; Sympazan; CLB; clobazam suspension; clobazam film; clobazam crush; N-desmethylclobazam | — | Findability |
| `maintenance[0]` | (absent) | **Clobazam (tablets, suspension or oral film)** — routes PO, NG — Label dosing (LGS, ≥2 y): ≤30 kg: 5 mg/day → 10 mg/day from day 7 → 20 mg/day from day 14. >30 kg: 10 → 20 → 40 mg/day. >5 mg/day in 2 divided doses; escalate no faster than weekly | Onfi label §2.1, Table 1; Sympazan label §2.1 | Label dosing |
| `maintenance[0].dose[0]` | (absent) | Start (>30 kg): 10–10 MG FIXED PER_DAY; no cap; Divided BID | Onfi label §2.1, Table 1; Sympazan label §2.1 | Structured copy of doseText |
| `maintenance[0].dose[1]` | (absent) | Maximum (>30 kg): 40–40 MG FIXED PER_DAY; cap 40 MG PER_DAY; Divided BID | Onfi label §2.1, Table 1; Sympazan label §2.1 | Structured copy of doseText |
| `maintenance[0].notes[0]` | (absent) | Label indication is adjunctive treatment of LGS only (§1) | §1 | R8 finding F-clobazam |
| `maintenance[0].notes[1]` | (absent) | Steady state: clobazam 5 days, N-desmethylclobazam 9 days (§2.1) | §2.1 | R8 finding F-clobazam |
| `maintenance[0]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds [] | Label ungraded; D6 formulary | R8 finding F-clobazam |
| `renalNotes[0]` | (absent) | No adjustment for mild or moderate renal impairment; essentially no experience in severe impairment or ESRD; dialyzability unknown (Onfi §2.6, §8.7) | Onfi §2.6, §8.7 | R8 finding F-clobazam |
| `hepatic[0]` | (absent) | Mild–moderate (Child-Pugh 5–9): start 5 mg/day; titrate to half the Table 1 doses; may titrate to the maximum from day 21 (Onfi §2.7) | Onfi §2.7 | R8 finding F-clobazam |
| `hepatic[1]` | (absent) | Severe: no dosing recommendation (Onfi §2.7) | Onfi §2.7 | R8 finding F-clobazam |
| `ivPo[0]` | (absent) | Oral only — no parenteral formulation (Onfi §3; Sympazan §3) | Onfi §3; Sympazan §3 | R8 finding F-clobazam |
| `enteral[0]` | (absent) | Onfi tablets 10 and 20 mg: whole, broken in half along the score, or crushed and mixed in applesauce (Onfi §2.3) | Onfi §2.3 | R8 finding F-clobazam |
| `enteral[1]` | (absent) | Onfi oral suspension 2.5 mg/mL; shake well; use the supplied syringe and adapter (Onfi §2.3, §3) | Onfi §2.3, §3 | R8 finding F-clobazam |
| `enteral[2]` | (absent) | Sympazan oral film 5, 10, 20 mg: on top of the tongue; don't give with liquids; one film at a time; bioequivalent to clobazam tablets (Sympazan §2.3, §12.3) | Sympazan §2.3, §12.3 | R8 finding F-clobazam |
| `enteral[3]` | (absent) | Tube administration not addressed in label — confirm with pharmacy | Onfi label(s) read in full: no tube statement | R8 finding F-clobazam |
| `levels[0]` | (absent) | Clobazam 30–300 ng/mL; N-desmethylclobazam 300–3000 ng/mL — AES 2024 summary Table 1 (range from AES Treatments Committee clinical experience, not the label) | range from AES Treatments Committee clinical experience, not the label | R8 finding F-clobazam |
| `interactions[0]` | (absent) | Opioids: profound sedation, respiratory depression, death — limit dose and duration (boxed warning; Onfi §7.1) | boxed warning; Onfi §7.1 | R8 finding F-clobazam |
| `interactions[1]` | (absent) | Strong (fluconazole, fluvoxamine, ticlopidine) or moderate (omeprazole) CYP2C19 inhibitors: up to 5-fold ↑ N-desmethylclobazam — dose adjustment may be needed (Onfi §7.4, §12.3) | Onfi §7.4, §12.3 | R8 finding F-clobazam |
| `interactions[2]` | (absent) | Cenobamate ↑ N-desmethylclobazam — consider a lower clobazam dose (Xcopri Table 5) | Xcopri Table 5 | R8 finding F-clobazam |
| `interactions[3]` | (absent) | Phenobarbital, phenytoin, carbamazepine: no significant change in clobazam or N-desmethylclobazam PK (Onfi §12.3) | Onfi §12.3 | R8 finding F-clobazam |
| `interactions[4]` | (absent) | CYP2D6 substrates: lower doses may be needed (Onfi §7.3) | Onfi §7.3 | R8 finding F-clobazam |
| `interactions[5]` | (absent) | Alcohol ↑ clobazam exposure ~50% (Onfi §7.2) | Onfi §7.2 | R8 finding F-clobazam |
| `pearls[0]` | (absent) | Boxed warnings: opioids; abuse, misuse and addiction; dependence and withdrawal | Onfi boxed warning | R8 finding F-clobazam |
| `pearls[1]` | (absent) | Taper: ↓ total daily dose by 5–10 mg/day weekly; abrupt stop can cause life-threatening withdrawal (Onfi §2.2) | Onfi §2.2 | R8 finding F-clobazam |
| `pearls[2]` | (absent) | Elderly or known CYP2C19 poor metabolizers: start 5 mg/day; titrate to half the Table 1 doses (Onfi §2.4–2.5) | Onfi §2.4–2.5 | R8 finding F-clobazam |
| `pearls[3]` | (absent) | Half-life 36–42 h; N-desmethylclobazam 71–82 h (Onfi §12.3) | Onfi §12.3 | R8 finding F-clobazam |
| `calculatorIds` | (absent) | [] | valid-ids.txt | R8 finding F-clobazam |
| `verify` | (absent) | [] | — | Nothing unconfirmed |
| `relatedIds` | (absent) | [] | valid-ids.txt | Only ids already valid (assumption 3) |
| `sources[0]` | (absent) | Onfi (clobazam) tablets and oral suspension US prescribing information. Lundbeck; revised 10/2026 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-clobazam |
| `sources[1]` | (absent) | Sympazan (clobazam) oral film US prescribing information. Aquestive Therapeutics; revised 12/2025 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-clobazam |
| `sources[2]` | (absent) | Xcopri (cenobamate) tablets US prescribing information. SK Life Science; revised 8/2025 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-clobazam |
| `sources[3]` | (absent) | Vossler DG, Gidal BE; American Epilepsy Society Treatments Committee. A Summary of Antiseizure Medications Available in the United States, 4th edition. American Epilepsy Society; revised April 1, 2024 (user-supplied) | Title page | R8 finding F-clobazam |
| `lastReviewed` | (absent) | UNREVIEWED | Rule | New entry |

## Open verify[]
- None.

## Registry version
- antiseizure-medications: one MINOR bump for all of R8 (see README).
