# antiseizure-medications:oxcarbazepine — CHANGES (new entry)

Review 2026-11-08, item R8 (drafted 2026-11-09). New entry: every "current" value is (absent). "§" = label section; older-format labels (Tegretol, Zonegran) are cited by section heading. AES = Vossler & Gidal, AES ASM summary 4th ed., rev. 4/1/2024.

| field path | current | new | source + location | why |
|---|---|---|---|---|
| `id` / `title` | (absent) | oxcarbazepine / Oxcarbazepine (Trileptal / Oxtellar XR) — maintenance dosing and NPO options | — | New entry |
| `searchTerms` | (absent) | Trileptal; Oxtellar XR; OXC; oxcarbazepine suspension; oxcarbazepine NPO; oxcarbazepine hyponatremia; MHD level | — | Findability |
| `maintenance[0]` | (absent) | **Oxcarbazepine IR (Trileptal tablets or suspension)** — routes PO, NG — Adults: start 600 mg/day BID; ↑ by ≤600 mg/day at ~weekly intervals. Adjunctive: recommended 1200 mg/day. Conversion to monotherapy: up to 2400 mg/day | Trileptal label §2.1–2.3 | Label dosing |
| `maintenance[0].dose[0]` | (absent) | Start: 300–300 MG FIXED PER_DOSE; no cap; BID | Trileptal label §2.1–2.3 | Structured copy of doseText |
| `maintenance[0].dose[1]` | (absent) | Adjunctive (recommended): 600–600 MG FIXED PER_DOSE; cap 1200 MG PER_DAY; BID | Trileptal label §2.1–2.3 | Structured copy of doseText |
| `maintenance[0].dose[2]` | (absent) | Monotherapy (maximum recommended): 1200–1200 MG FIXED PER_DOSE; cap 2400 MG PER_DAY; BID | Trileptal label §2.1–2.3 | Structured copy of doseText |
| `maintenance[0].notes[0]` | (absent) | Adjunctive >1200 mg/day: somewhat more effective, but most patients couldn't tolerate 2400 mg/day (CNS effects) (§2.1) | §2.1 | R8 finding F-oxcarbazepine |
| `maintenance[0].notes[1]` | (absent) | Strong CYP3A4 or UGT inducers: dose adjustment recommended (§2.1, §7.2) | §2.1, §7.2 | R8 finding F-oxcarbazepine |
| `maintenance[0]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds [] | Label ungraded; D6 formulary | R8 finding F-oxcarbazepine |
| `maintenance[1]` | (absent) | **Oxcarbazepine XR (Oxtellar XR)** — routes PO — Adults: 600 mg once daily for 1 week; ↑ by 600 mg/day weekly to 1200–2400 mg once daily. With strong CYP3A4 inducers (carbamazepine, phenobarbital, phenytoin) or UGT inducers (rifampin): consider starting 900 mg once daily | Oxtellar XR label §2.1–2.2, §2.4–2.5 | Label dosing |
| `maintenance[1].dose[0]` | (absent) | Start: 600–600 MG FIXED PER_DOSE; no cap; Once daily | Oxtellar XR label §2.1–2.2, §2.4–2.5 | Structured copy of doseText |
| `maintenance[1].dose[1]` | (absent) | Maintenance: 1200–2400 MG FIXED PER_DOSE; cap 2400 MG PER_DAY; Once daily | Oxtellar XR label §2.1–2.2, §2.4–2.5 | Structured copy of doseText |
| `maintenance[1].notes[0]` | (absent) | Take on an empty stomach (≥1 h before or ≥2 h after meals) — food raises peak levels and adverse reactions (§2.1) | §2.1 | R8 finding F-oxcarbazepine |
| `maintenance[1].notes[1]` | (absent) | Geriatric: consider starting 300 or 450 mg/day; ↑ by 300–450 mg/day weekly (§2.4) | §2.4 | R8 finding F-oxcarbazepine |
| `maintenance[1]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds [] | Label ungraded; D6 formulary | R8 finding F-oxcarbazepine |
| `renal[0]` | (absent) | CRCL_BAND CrCl <30 mL/min (CG_ML_MIN): Start at half the usual starting dose (300 mg/day; IR given BID) and increase slowly. XR: ↑ by 300–450 mg/day weekly | Trileptal §2.7; Oxtellar §2.3 | R8 finding F-oxcarbazepine |
| `renalNotes[0]` | (absent) | CrCl <30 mL/min: MHD half-life prolonged to 19 h, AUC 2-fold (Trileptal §12.3) | Trileptal §12.3 | R8 finding F-oxcarbazepine |
| `renalNotes[1]` | (absent) | Label units are mL/min, not BSA-normalized | Trileptal §2.7, §8.6; Oxtellar §2.3 — "creatinine clearance < 30 mL/min" (unit not BSA-normalized; assumption 2) | R8 finding F-oxcarbazepine |
| `renalNotes[2]` | (absent) | Labels give no hemodialysis dosing | Trileptal and Oxtellar read in full: no dialysis statement | R8 finding F-oxcarbazepine |
| `hepatic[0]` | (absent) | Mild–moderate: no effect on oxcarbazepine or MHD PK (Trileptal §12.3) | Trileptal §12.3 | R8 finding F-oxcarbazepine |
| `hepatic[1]` | (absent) | Severe: not evaluated; Oxtellar XR not recommended (Oxtellar §8.7) | Oxtellar §8.7 | R8 finding F-oxcarbazepine |
| `ivPo[0]` | (absent) | Oral only — no parenteral formulation (Trileptal §3; Oxtellar §3) | Trileptal §3; Oxtellar §3 | R8 finding F-oxcarbazepine |
| `enteral[0]` | (absent) | Trileptal oral suspension 300 mg/5 mL (60 mg/mL); tablets and suspension substitute at equal doses (Trileptal §2.8, §3) | Trileptal §2.8, §3 | R8 finding F-oxcarbazepine |
| `enteral[1]` | (absent) | Suspension: shake well; may be mixed in a small glass of water or given straight from the syringe (Trileptal §2.8) | Trileptal §2.8 | R8 finding F-oxcarbazepine |
| `enteral[2]` | (absent) | Oxtellar XR: swallow whole — do not cut, crush or chew; for difficulty swallowing use multiples of lower-strength tablets (Oxtellar §2.1) | Oxtellar §2.1 | R8 finding F-oxcarbazepine |
| `enteral[3]` | (absent) | XR once daily is not bioequivalent to IR BID: at 1200 mg/day, XR MHD AUC and Cmax ~19% lower, Cmin ~16% lower (Oxtellar §12.3). IR → XR may need higher doses (§2.7); no label XR → IR conversion | Oxtellar §12.3 (Absorption), §2.7; Trileptal and Oxtellar read in full: no XR → IR conversion | R8 finding F-oxcarbazepine |
| `enteral[4]` | (absent) | Tube administration not addressed in label — confirm with pharmacy | Trileptal label(s) read in full: no tube statement | R8 finding F-oxcarbazepine |
| `levels[0]` | (absent) | MHD 10–35 mcg/mL — AES 2024 summary Table 1 (range from AES Treatments Committee clinical experience, not the label) | range from AES Treatments Committee clinical experience, not the label | R8 finding F-oxcarbazepine |
| `levels[1]` | (absent) | With strong CYP3A4/UGT inducers, monitor MHD levels during titration (Trileptal §7.2) | Trileptal §7.2 | R8 finding F-oxcarbazepine |
| `interactions[0]` | (absent) | Phenytoin: levels rise with oxcarbazepine >1200 mg/day — monitor phenytoin levels; phenytoin dose may need to be reduced (Trileptal §7.1) | Trileptal §7.1 | R8 finding F-oxcarbazepine |
| `interactions[1]` | (absent) | Strong CYP450/UGT inducers (rifampin, carbamazepine, phenytoin, phenobarbital) ↓ MHD 25–49%; adjust when inducers are started, changed or stopped (Trileptal §7.2) | Trileptal §7.2 | R8 finding F-oxcarbazepine |
| `interactions[2]` | (absent) | Perampanel: oxcarbazepine ↓ perampanel levels (Fycompa §7.2) | Fycompa §7.2 | R8 finding F-oxcarbazepine |
| `pearls[0]` | (absent) | Hyponatremia: Na <125 mmol/L in 2.5% in trials; usually in the first 3 months, sometimes after >1 year; SIADH reported. Check Na with other Na-lowering drugs or symptoms (nausea, lethargy, confusion, more seizures) (Trileptal §5.1) | Trileptal §5.1 | R8 finding F-oxcarbazepine |
| `pearls[1]` | (absent) | Elderly: MHD AUC 30–60% higher (age-related CrCl); close Na monitoring if at risk (Trileptal §8.5) | Trileptal §8.5 | R8 finding F-oxcarbazepine |
| `pearls[2]` | (absent) | ~25–30% of patients with carbamazepine hypersensitivity react to oxcarbazepine (Trileptal §5.3) | Trileptal §5.3 | R8 finding F-oxcarbazepine |
| `pearls[3]` | (absent) | Contraindicated with hypersensitivity to oxcarbazepine or eslicarbazepine (Trileptal §4) | Trileptal §4 | R8 finding F-oxcarbazepine |
| `pearls[4]` | (absent) | Withdraw gradually; rapid stop can be considered for a serious adverse event (Trileptal §5.6) | Trileptal §5.6 | R8 finding F-oxcarbazepine |
| `calculatorIds` | (absent) | ['cockcroft-gault'] | valid-ids.txt | CrCl-based label rule |
| `verify` | (absent) | [] | — | Nothing unconfirmed |
| `relatedIds` | (absent) | antiseizure-medications:phenytoin-fosphenytoin, acute-neuro:hyponatremia-ods | valid-ids.txt | Only ids already valid (assumption 3) |
| `sources[0]` | (absent) | Trileptal (oxcarbazepine) film-coated tablets and oral suspension US prescribing information. Novartis; revised 10/2026 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-oxcarbazepine |
| `sources[1]` | (absent) | Oxtellar XR (oxcarbazepine) extended-release tablets US prescribing information. Supernus Pharmaceuticals; revised 10/2026 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-oxcarbazepine |
| `sources[2]` | (absent) | Fycompa (perampanel) tablets and oral suspension US prescribing information. Catalyst Pharmaceuticals; revised 1/2024 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-oxcarbazepine |
| `sources[3]` | (absent) | Vossler DG, Gidal BE; American Epilepsy Society Treatments Committee. A Summary of Antiseizure Medications Available in the United States, 4th edition. American Epilepsy Society; revised April 1, 2024 (user-supplied) | Title page | R8 finding F-oxcarbazepine |
| `lastReviewed` | (absent) | UNREVIEWED | Rule | New entry |

## Open verify[]
- None.

## Registry version
- antiseizure-medications: one MINOR bump for all of R8 (see README).
