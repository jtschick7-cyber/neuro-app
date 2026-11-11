# antiseizure-medications:cenobamate — CHANGES (new entry)

Review 2026-11-08, item R8 (drafted 2026-11-09). New entry: every "current" value is (absent). "§" = label section; older-format labels (Tegretol, Zonegran) are cited by section heading. AES = Vossler & Gidal, AES ASM summary 4th ed., rev. 4/1/2024.

| field path | current | new | source + location | why |
|---|---|---|---|---|
| `id` / `title` | (absent) | cenobamate / Cenobamate (Xcopri) — titration and NPO options | — | New entry |
| `searchTerms` | (absent) | Xcopri; CNB; cenobamate titration; cenobamate crush; cenobamate NG tube; cenobamate phenytoin | — | Findability |
| `maintenance[0]` | (absent) | **Cenobamate** — routes PO, NG — Adults: 12.5 mg once daily wk 1–2; 25 mg wk 3–4; 50 mg wk 5–6; 100 mg wk 7–8; 150 mg wk 9–10; 200 mg once daily from wk 11. If needed ↑ by 50 mg every 2 weeks to max 400 mg once daily. Don't exceed this schedule | Xcopri label §2.2, Table 1 | Label dosing |
| `maintenance[0].dose[0]` | (absent) | Start: 12.5–12.5 MG FIXED PER_DOSE; no cap; Once daily ; Weeks 1–2 | Xcopri label §2.2, Table 1 | Structured copy of doseText |
| `maintenance[0].dose[1]` | (absent) | Maintenance: 200–200 MG FIXED PER_DOSE; cap 400 MG PER_DAY; Once daily | Xcopri label §2.2, Table 1 | Structured copy of doseText |
| `maintenance[0].notes[0]` | (absent) | Faster titration risks serious adverse reactions incl. DRESS (§2.2, §5.1) | §2.2, §5.1 | R8 finding F-cenobamate |
| `maintenance[0]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds ['cockcroft-gault'] | Label ungraded; D6 formulary | R8 finding F-cenobamate |
| `renal[0]` | (absent) | INTERMITTENT_HD ESRD on dialysis (None): Not recommended (§8.6) | §8.6 | R8 finding F-cenobamate |
| `renalNotes[0]` | (absent) | Mild–moderate (CLcr 30 to <90 mL/min) and severe (<30 mL/min): use with caution; dose reduction may be considered (§8.6) | §8.6 | R8 finding F-cenobamate |
| `hepatic[0]` | (absent) | Baseline ALT, AST and total bilirubin before starting if none within 3 months (§2.1) | §2.1 | R8 finding F-cenobamate |
| `hepatic[1]` | (absent) | Mild–moderate (Child-Pugh A–B): max 200 mg once daily; further reduction may be considered (§2.3, §8.7) | §2.3, §8.7 | R8 finding F-cenobamate |
| `hepatic[2]` | (absent) | Severe (Child-Pugh C): not recommended (§2.3) | §2.3 | R8 finding F-cenobamate |
| `ivPo[0]` | (absent) | Oral only — no parenteral formulation (§3) | §3 | R8 finding F-cenobamate |
| `enteral[0]` | (absent) | Tablets may be crushed, mixed with 25 mL water and given by mouth or NG tube; flush with 10 mL water; confirm no particles remain (§2.4) | §2.4 | R8 finding F-cenobamate |
| `enteral[1]` | (absent) | Crushed tablets by mouth or NG tube: Cmax and AUC similar to whole tablets; median Tmax 0.5 h (§12.3) | §12.3 | R8 finding F-cenobamate |
| `levels[0]` | (absent) | 10–35 mcg/mL — AES 2024 summary Table 1 (range from AES Treatments Committee clinical experience, not the label) | range from AES Treatments Committee clinical experience, not the label | R8 finding F-cenobamate |
| `interactions[0]` | (absent) | Phenytoin: up to 2-fold ↑ — gradually ↓ phenytoin dose by up to 50% during titration (§7.1, Table 5) | §7.1, Table 5 | R8 finding F-cenobamate |
| `interactions[1]` | (absent) | Phenobarbital and N-desmethylclobazam ↑ — consider reducing phenobarbital or clobazam (Table 5) | Table 5 | R8 finding F-cenobamate |
| `interactions[2]` | (absent) | Lamotrigine and carbamazepine ↓ — increase as needed (Table 5) | Table 5 | R8 finding F-cenobamate |
| `interactions[3]` | (absent) | CYP2C19 substrates ↑ (consider reducing); CYP2B6 and CYP3A substrates ↓ (increase as needed) (Table 5) | Table 5 | R8 finding F-cenobamate |
| `interactions[4]` | (absent) | Drugs that shorten QT: use caution (§7.2) | §7.2 | R8 finding F-cenobamate |
| `pearls[0]` | (absent) | Contraindicated in familial short QT syndrome (§4) | §4 | R8 finding F-cenobamate |
| `pearls[1]` | (absent) | DRESS, incl. one death, with weekly or faster titration; none in 1339 patients started at 12.5 mg and titrated every 2 weeks (§5.1) | §5.1 | R8 finding F-cenobamate |
| `pearls[2]` | (absent) | Taper over ≥2 weeks unless safety requires abrupt stop (§2.5) | §2.5 | R8 finding F-cenobamate |
| `pearls[3]` | (absent) | Half-life 50–60 h (§12.3) | §12.3 | R8 finding F-cenobamate |
| `calculatorIds` | (absent) | ['cockcroft-gault'] | valid-ids.txt | CrCl-based label rule |
| `verify` | (absent) | [] | — | Nothing unconfirmed |
| `relatedIds` | (absent) | antiseizure-medications:phenytoin-fosphenytoin, antiseizure-medications:lamotrigine | valid-ids.txt | Only ids already valid (assumption 3) |
| `sources[0]` | (absent) | Xcopri (cenobamate) tablets US prescribing information. SK Life Science; revised 8/2025 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-cenobamate |
| `sources[1]` | (absent) | Vossler DG, Gidal BE; American Epilepsy Society Treatments Committee. A Summary of Antiseizure Medications Available in the United States, 4th edition. American Epilepsy Society; revised April 1, 2024 (user-supplied) | Title page | R8 finding F-cenobamate |
| `lastReviewed` | (absent) | UNREVIEWED | Rule | New entry |

## Open verify[]
- None.

## Registry version
- antiseizure-medications: one MINOR bump for all of R8 (see README).
