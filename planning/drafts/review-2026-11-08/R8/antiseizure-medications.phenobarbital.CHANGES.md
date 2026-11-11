# antiseizure-medications:phenobarbital — CHANGES (new entry)

Review 2026-11-08, item R8 (drafted 2026-11-09). New entry: every "current" value is (absent). "§" = label section; older-format labels (Tegretol, Zonegran) are cited by section heading. AES = Vossler & Gidal, AES ASM summary 4th ed., rev. 4/1/2024.

| field path | current | new | source + location | why |
|---|---|---|---|---|
| `id` / `title` | (absent) | phenobarbital / Phenobarbital — maintenance dosing and levels (AES summary) | — | New entry |
| `searchTerms` | (absent) | PB; phenobarbital level; phenobarbital maintenance; barbiturate; phenobarbital elixir | — | Findability |
| `maintenance[0]` | (absent) | **Phenobarbital** — routes PO, IV — Adults and children ≥13 y: initial 60 mg/day or 1–4 mg/kg/day; maintenance 1–4 mg/kg/day; adult maximum 240 mg daily | AES 2024 summary Table 1, phenobarbital row (p. 15) | Source dosing |
| `maintenance[0].dose[0]` | (absent) | Initial: 60–60 MG FIXED PER_DAY; cap 240 MG PER_DAY; Daily | AES 2024 summary Table 1, phenobarbital row (p. 15) | Structured copy of doseText |
| `maintenance[0].notes[0]` | (absent) | Per-kg doses kept as text: the source doesn't state which weight to use | AES 2024 summary Table 1, phenobarbital row (p. 15) | R8 finding F-phenobarbital |
| `maintenance[0].notes[1]` | (absent) | Source dose is not route-specific | AES 2024 summary Table 1, phenobarbital row (p. 15) | R8 finding F-phenobarbital |
| `maintenance[0].notes[2]` | (absent) | No current FDA-approved adult label; AES took phenobarbital data from an older PI (1997 PDR) | AES 2024 summary Table 1, phenobarbital row (p. 15) | R8 finding F-phenobarbital |
| `maintenance[0]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds [] | Label ungraded; D6 formulary | R8 finding F-phenobarbital |
| `renalNotes[0]` | (absent) | 25–50% excreted unchanged by the kidneys; no renal dose rule in source | AES Table 1 (Pharmacokinetics column) | R8 finding F-phenobarbital |
| `renalNotes[1]` | (absent) | Elimination ↑ by diuretics, alkaline urine and activated charcoal | AES Table 1 (Drug-Drug Interactions column) | R8 finding F-phenobarbital |
| `hepatic[0]` | (absent) | Do not use in hepatic encephalopathy or marked hepatic impairment | AES Table 1 (Contraindications/Warnings column) | R8 finding F-phenobarbital |
| `ivPo[0]` | (absent) | Forms: tablets, elixir 4 mg/mL, IV solution; oral bioavailability ~95%; source gives no IV ↔ PO conversion | AES Table 1 (Formulations; Pharmacokinetics F ~95%) | R8 finding F-phenobarbital |
| `enteral[0]` | (absent) | Elixir 4 mg/mL | AES Table 1 (Formulations) | R8 finding F-phenobarbital |
| `enteral[1]` | (absent) | Tube administration not addressed in source — confirm with pharmacy | AES Table 1: no enteral statement | R8 finding F-phenobarbital |
| `levels[0]` | (absent) | 15–45 mcg/mL — AES 2024 summary Table 1 (range from AES Treatments Committee clinical experience, not the label) | range from AES Treatments Committee clinical experience, not the label | R8 finding F-phenobarbital |
| `levels[1]` | (absent) | Half-life 79 h | AES Table 1 (Pharmacokinetics: t1/2 = 79 h) | R8 finding F-phenobarbital |
| `interactions[0]` | (absent) | Strong CYP3A4 inducer: ↑ metabolism of phenytoin, lamotrigine, oral contraceptives, warfarin, corticosteroids and many other drugs (AES Table 1) | AES Table 1 | R8 finding F-phenobarbital |
| `interactions[1]` | (absent) | Valproate ↓ phenobarbital elimination; MAOIs prolong its effects (AES Table 1) | AES Table 1 | R8 finding F-phenobarbital |
| `interactions[2]` | (absent) | Synergistic CNS and respiratory depression with alcohol and sedatives; caution with pain medications and CNS depressants (AES Table 1) | AES Table 1 | R8 finding F-phenobarbital |
| `interactions[3]` | (absent) | Cenobamate ↑ phenobarbital — consider reducing phenobarbital (Xcopri Table 5) | Xcopri Table 5 | R8 finding F-phenobarbital |
| `interactions[4]` | (absent) | Phenobarbital ↓ oxcarbazepine MHD 25–49% (Trileptal §7.2), ↓ carbamazepine (Tegretol Precautions), shortens zonisamide half-life (Zonegran Clinical Pharmacology) | Zonegran Clinical Pharmacology | R8 finding F-phenobarbital |
| `pearls[0]` | (absent) | Taper very slowly after chronic use — barbiturate withdrawal can cause convulsions and delirium and may be fatal (AES Table 1) | AES Table 1 | R8 finding F-phenobarbital |
| `pearls[1]` | (absent) | Do not use in porphyria or marked respiratory disease (AES Table 1) | AES Table 1 | R8 finding F-phenobarbital |
| `pearls[2]` | (absent) | Can cause respiratory depression, hypoventilation, bradycardia and hypotension (AES Table 1) | AES Table 1 | R8 finding F-phenobarbital |
| `pearls[3]` | (absent) | Monitor CBC and CMP (AES Table 1) | AES Table 1 | R8 finding F-phenobarbital |
| `calculatorIds` | (absent) | [] | valid-ids.txt | R8 finding F-phenobarbital |
| `verify` | (absent) | [] | — | Nothing unconfirmed |
| `relatedIds` | (absent) | antiseizure-medications:valproate, antiseizure-medications:lamotrigine, antiseizure-medications:phenytoin-fosphenytoin, asm-interactions:inducing-asm-warfarin | valid-ids.txt | Only ids already valid (assumption 3) |
| `sources[0]` | (absent) | Vossler DG, Gidal BE; American Epilepsy Society Treatments Committee. A Summary of Antiseizure Medications Available in the United States, 4th edition. American Epilepsy Society; revised April 1, 2024 (user-supplied) | Title page | R8 finding F-phenobarbital |
| `sources[1]` | (absent) | Xcopri (cenobamate) tablets US prescribing information. SK Life Science; revised 8/2025 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-phenobarbital |
| `sources[2]` | (absent) | Trileptal (oxcarbazepine) film-coated tablets and oral suspension US prescribing information. Novartis; revised 10/2026 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-phenobarbital |
| `sources[3]` | (absent) | Tegretol (carbamazepine) tablets and suspension; Tegretol-XR extended-release tablets US prescribing information. Novartis; revised 8/2026 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-phenobarbital |
| `sources[4]` | (absent) | Zonegran (zonisamide) capsules US prescribing information. Advanz Pharma; revised 9/2026 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-phenobarbital |
| `lastReviewed` | (absent) | UNREVIEWED | Rule | New entry |

## Open verify[]
- None.

## Registry version
- antiseizure-medications: one MINOR bump for all of R8 (see README).
