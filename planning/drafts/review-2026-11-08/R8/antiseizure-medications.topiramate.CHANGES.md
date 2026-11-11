# antiseizure-medications:topiramate — CHANGES (new entry)

Review 2026-11-08, item R8 (drafted 2026-11-09). New entry: every "current" value is (absent). "§" = label section; older-format labels (Tegretol, Zonegran) are cited by section heading. AES = Vossler & Gidal, AES ASM summary 4th ed., rev. 4/1/2024.

| field path | current | new | source + location | why |
|---|---|---|---|---|
| `id` / `title` | (absent) | topiramate / Topiramate (Topamax) — maintenance dosing and NPO options | — | New entry |
| `searchTerms` | (absent) | Topamax; TPM; topiramate sprinkle; topiramate renal dose; topiramate dialysis; topiramate acidosis | — | Findability |
| `maintenance[0]` | (absent) | **Topiramate — adjunctive (adults ≥17 y)** — routes PO — Start 25–50 mg/day; ↑ by 25–50 mg/day weekly. Recommended 200–400 mg/day in 2 divided doses (focal or LGS); 400 mg/day for PGTC. >400 mg/day no added benefit (focal) | Topamax label §2.2 | Label dosing |
| `maintenance[0].dose[0]` | (absent) | Start: 25–50 MG FIXED PER_DAY; no cap; Daily | Topamax label §2.2 | Structured copy of doseText |
| `maintenance[0].dose[1]` | (absent) | Maintenance: 100–200 MG FIXED PER_DOSE; cap 400 MG PER_DAY; BID | Topamax label §2.2 | Structured copy of doseText |
| `maintenance[0].notes[0]` | (absent) | 25 mg/day weekly increments may delay reaching an effective dose (§2.2) | §2.2 | R8 finding F-topiramate |
| `maintenance[0]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds ['cockcroft-gault'] | Label ungraded; D6 formulary | R8 finding F-topiramate |
| `maintenance[1]` | (absent) | **Topiramate — monotherapy (adults and children ≥10 y)** — routes PO — Target 400 mg/day in 2 doses: 25 mg BID wk 1, 50 BID wk 2, 75 BID wk 3, 100 BID wk 4, 150 BID wk 5, 200 BID wk 6 | Topamax label §2.1, Table 1 | Label dosing |
| `maintenance[1].dose[0]` | (absent) | Target: 200–200 MG FIXED PER_DOSE; cap 400 MG PER_DAY; BID | Topamax label §2.1, Table 1 | Structured copy of doseText |
| `maintenance[1]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds ['cockcroft-gault'] | Label ungraded; D6 formulary | R8 finding F-topiramate |
| `renal[0]` | (absent) | CRCL_BAND CrCl <70 mL/min/1.73 m² (BSA_NORMALIZED_ML_MIN_1_73M2): One-half the usual adult dose | Topamax §2.5 | R8 finding F-topiramate |
| `renal[1]` | (absent) | INTERMITTENT_HD Intermittent hemodialysis (None): A supplemental dose may be required; label gives no amount — base it on dialysis duration, dialyzer clearance and the patient's renal clearance — notes: HD clears topiramate 4–6 times faster than normal (§8.7); 120 mL/min dialyzer clearance vs 20–30 mL/min total oral clearance (§12.3) | Topamax §2.6, §8.7, §12.3 | R8 finding F-topiramate |
| `renalNotes[0]` | (absent) | Moderate (30–69) and severe (<30 mL/min/1.73 m²) impairment both reduce clearance (§8.6) | §8.6 | R8 finding F-topiramate |
| `renalNotes[1]` | (absent) | Elderly: adjust for age-related CrCl <70 mL/min/1.73 m² (§8.5) | §8.5 | R8 finding F-topiramate |
| `hepatic[0]` | (absent) | Moderate–severe: plasma clearance ↓ ~26%; no dose rule in label (§12.3) | §12.3 | R8 finding F-topiramate |
| `ivPo[0]` | (absent) | Oral only — no parenteral formulation (§3) | §3 | R8 finding F-topiramate |
| `enteral[0]` | (absent) | Tablets: don't break — bitter taste (§2.4) | §2.4 | R8 finding F-topiramate |
| `enteral[1]` | (absent) | Sprinkle capsules 15 mg and 25 mg: swallow whole, or open and sprinkle the entire contents on a teaspoon of soft food; swallow immediately without chewing; don't store (§2.4, §3) | §2.4, §3 | R8 finding F-topiramate |
| `enteral[2]` | (absent) | Tube administration not addressed in label — confirm with pharmacy | Topamax label(s) read in full: no tube statement | R8 finding F-topiramate |
| `levels[0]` | (absent) | 7–30 mcg/mL — AES 2024 summary Table 1 (range from AES Treatments Committee clinical experience, not the label) | range from AES Treatments Committee clinical experience, not the label | R8 finding F-topiramate |
| `interactions[0]` | (absent) | Phenytoin ↓ topiramate 48%; carbamazepine ↓ 40% — dose adjustment may be needed (§7.1, Table 11) | §7.1, Table 11 | R8 finding F-topiramate |
| `interactions[1]` | (absent) | Valproate: hyperammonemia with or without encephalopathy, and hypothermia — check ammonia (§5.14, §5.16, §7.1) | §5.14, §5.16, §7.1 | R8 finding F-topiramate |
| `interactions[2]` | (absent) | Other carbonic anhydrase inhibitors (zonisamide, acetazolamide): more severe acidosis, kidney stones — monitor (§7.2) | §7.2 | R8 finding F-topiramate |
| `interactions[3]` | (absent) | Lithium: exposure ↑ at high-dose topiramate — monitor levels (§7.7) | §7.7 | R8 finding F-topiramate |
| `interactions[4]` | (absent) | Hydrochlorothiazide ↑ topiramate; dose decrease may be needed (§7.5) | §7.5 | R8 finding F-topiramate |
| `pearls[0]` | (absent) | Hyperchloremic non-anion-gap metabolic acidosis at any time; baseline and periodic bicarbonate. Additive with renal disease, severe respiratory disorders, status epilepticus, diarrhea, ketogenic diet (§5.4) | §5.4 | R8 finding F-topiramate |
| `pearls[1]` | (absent) | Acute myopia and secondary angle-closure glaucoma: stop as soon as possible (§5.1) | §5.1 | R8 finding F-topiramate |
| `pearls[2]` | (absent) | Encephalopathic symptoms: measure ammonia (§5.14) | §5.14 | R8 finding F-topiramate |
| `pearls[3]` | (absent) | Withdraw gradually (§5.8) | §5.8 | R8 finding F-topiramate |
| `calculatorIds` | (absent) | ['cockcroft-gault'] | valid-ids.txt | CrCl-based label rule |
| `verify` | (absent) | [] | — | Nothing unconfirmed |
| `relatedIds` | (absent) | antiseizure-medications:valproate, consult-workups:valproate-hyperammonemic-encephalopathy | valid-ids.txt | Only ids already valid (assumption 3) |
| `sources[0]` | (absent) | Topamax (topiramate) tablets and sprinkle capsules US prescribing information. Janssen Pharmaceuticals; revised 3/2026 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-topiramate |
| `sources[1]` | (absent) | Vossler DG, Gidal BE; American Epilepsy Society Treatments Committee. A Summary of Antiseizure Medications Available in the United States, 4th edition. American Epilepsy Society; revised April 1, 2024 (user-supplied) | Title page | R8 finding F-topiramate |
| `lastReviewed` | (absent) | UNREVIEWED | Rule | New entry |

## Open verify[]
- None.

## Registry version
- antiseizure-medications: one MINOR bump for all of R8 (see README).
