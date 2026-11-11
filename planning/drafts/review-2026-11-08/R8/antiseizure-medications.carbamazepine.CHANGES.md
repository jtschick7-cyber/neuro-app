# antiseizure-medications:carbamazepine — CHANGES (new entry)

Review 2026-11-08, item R8 (drafted 2026-11-09). New entry: every "current" value is (absent). "§" = label section; older-format labels (Tegretol, Zonegran) are cited by section heading. AES = Vossler & Gidal, AES ASM summary 4th ed., rev. 4/1/2024.

| field path | current | new | source + location | why |
|---|---|---|---|---|
| `id` / `title` | (absent) | carbamazepine / Carbamazepine (Tegretol / Tegretol-XR) — maintenance dosing and NPO options | — | New entry |
| `searchTerms` | (absent) | Tegretol; Tegretol XR; CBZ; carbamazepine suspension; carbamazepine NPO; Carnexiv; IV carbamazepine; carbamazepine level | — | Findability |
| `maintenance[0]` | (absent) | **Carbamazepine (tablets, XR tablets or suspension)** — routes PO, NG — Adults and children >12 y: start 200 mg BID (tablets or XR) or 100 mg (1 tsp) QID (suspension) = 400 mg/day; ↑ by up to 200 mg/day weekly — XR BID, other forms TID–QID. Usual maintenance 800–1200 mg/day. Generally ≤1200 mg/day above age 15; up to 1600 mg/day in adults in rare instances | Tegretol label, Dosage and Administration (epilepsy, >12 y) and Dosage Information table | Label dosing |
| `maintenance[0].dose[0]` | (absent) | Start: 400–400 MG FIXED PER_DAY; no cap; Tablets/XR: BID; suspension: QID | Tegretol label, Dosage and Administration (epilepsy, >12 y) and Dosage Information table | Structured copy of doseText |
| `maintenance[0].dose[1]` | (absent) | Maintenance: 800–1200 MG FIXED PER_DAY; cap 1200 MG PER_DAY; XR: BID; tablets or suspension: TID–QID | Tegretol label, Dosage and Administration (epilepsy, >12 y) and Dosage Information table | Structured copy of doseText |
| `maintenance[0].notes[0]` | (absent) | Take with meals (D&A) | D&A | R8 finding F-carbamazepine |
| `maintenance[0].notes[1]` | (absent) | When added to other ASMs, add gradually; phenytoin may have to be increased (D&A) | D&A | R8 finding F-carbamazepine |
| `maintenance[0]` evidence / formulary | (absent) | NOT_GRADED / INSTITUTION_VARIES / calculatorIds [] | Label ungraded; D6 formulary | R8 finding F-carbamazepine |
| `renalNotes[0]` | (absent) | No renal dose adjustment in label | Tegretol read in full: no renal dosing statement | R8 finding F-carbamazepine |
| `hepatic[0]` | (absent) | Baseline and periodic LFTs, especially with a history of liver disease; stop for new or worsening liver dysfunction or active liver disease (Precautions, Laboratory Tests) | Precautions, Laboratory Tests | R8 finding F-carbamazepine |
| `ivPo[0]` | (absent) | Oral only — no parenteral formulation in label (Description) | Description | R8 finding F-carbamazepine |
| `enteral[0]` | (absent) | Suspension 100 mg/5 mL. Tablets → suspension: same mg/day in smaller, more frequent doses (BID tablets → TID suspension) (D&A) | D&A | R8 finding F-carbamazepine |
| `enteral[1]` | (absent) | Suspension gives higher peaks than tablets at the same dose — start low (D&A; Clinical Pharmacology) | D&A; Clinical Pharmacology | R8 finding F-carbamazepine |
| `enteral[2]` | (absent) | Don't give the suspension at the same time as other liquid medicines or diluents — precipitate with chlorpromazine and thioridazine solutions (D&A; Precautions) | D&A; Precautions | R8 finding F-carbamazepine |
| `enteral[3]` | (absent) | XR: swallow whole, never crush or chew; discard damaged tablets or those without a release portal. Tablets → XR: same total daily dose (D&A) | D&A | R8 finding F-carbamazepine |
| `enteral[4]` | (absent) | Suspension contains propylene glycol 25 mg/mL — count total propylene glycol from all sources (Description; Warnings) | Description; Warnings | R8 finding F-carbamazepine |
| `enteral[5]` | (absent) | Tube administration not addressed in label — confirm with pharmacy | Tegretol label(s) read in full: no tube statement | R8 finding F-carbamazepine |
| `levels[0]` | (absent) | Usual adult therapeutic level 4–12 mcg/mL (Clinical Pharmacology) | Clinical Pharmacology | R8 finding F-carbamazepine |
| `levels[1]` | (absent) | Autoinduction completes after 3–5 weeks; half-life 25–65 h initially, 12–17 h on repeated dosing (Clinical Pharmacology) | Clinical Pharmacology | R8 finding F-carbamazepine |
| `interactions[0]` | (absent) | CYP3A4 inhibitors ↑ carbamazepine: macrolides, azoles, isoniazid, diltiazem, verapamil, cimetidine, omeprazole, fluoxetine, protease inhibitors, grapefruit juice — monitor levels (Precautions, Drug Interactions) | Precautions, Drug Interactions | R8 finding F-carbamazepine |
| `interactions[1]` | (absent) | Valproate, brivaracetam, quetiapine, loxapine ↑ carbamazepine-epoxide — adjust dose or monitor (Precautions) | Precautions | R8 finding F-carbamazepine |
| `interactions[2]` | (absent) | Inducers ↓ carbamazepine: phenytoin/fosphenytoin, phenobarbital, primidone, rifampin, felbamate, theophylline, cisplatin, doxorubicin (Precautions) | Precautions | R8 finding F-carbamazepine |
| `interactions[3]` | (absent) | Avoid with apixaban, rivaroxaban, dabigatran and edoxaban — anticoagulant levels may be inadequate (Precautions) | Precautions | R8 finding F-carbamazepine |
| `interactions[4]` | (absent) | Lowers levels of many drugs, incl. warfarin, tacrolimus, cyclosporine, corticosteroids (dexamethasone, prednisolone), lamotrigine, valproate, phenytoin, topiramate, zonisamide, oxcarbazepine, methadone, haloperidol, clozapine, aripiprazole (double its dose) (Precautions) | Precautions | R8 finding F-carbamazepine |
| `interactions[5]` | (absent) | Resistance to nondepolarizing neuromuscular blockers (pancuronium, vecuronium, rocuronium, cisatracurium) — faster recovery, higher infusion rates (Precautions) | Precautions | R8 finding F-carbamazepine |
| `interactions[6]` | (absent) | Lithium: ↑ neurotoxicity risk (Precautions) | Precautions | R8 finding F-carbamazepine |
| `interactions[7]` | (absent) | Nefazodone: contraindicated. MAOIs: stop ≥14 days before (Contraindications) | Contraindications | R8 finding F-carbamazepine |
| `interactions[8]` | (absent) | Cenobamate ↓ carbamazepine (Xcopri Table 5); perampanel ↓ by carbamazepine (Fycompa §7.2) | Fycompa §7.2 | R8 finding F-carbamazepine |
| `pearls[0]` | (absent) | Hyponatremia, often SIADH; risk dose-related, higher in elderly and with diuretics; consider stopping if symptomatic (Warnings, General) | Warnings, General | R8 finding F-carbamazepine |
| `pearls[1]` | (absent) | Boxed warnings: SJS/TEN with HLA-B*1502; aplastic anemia and agranulocytosis | Tegretol boxed warning | R8 finding F-carbamazepine |
| `pearls[2]` | (absent) | Avoid in hepatic porphyria (Warnings, General) | Warnings, General | R8 finding F-carbamazepine |
| `pearls[3]` | (absent) | Withdraw gradually (Warnings, General) | Warnings, General | R8 finding F-carbamazepine |
| `pearls[4]` | (absent) | IV carbamazepine (Carnexiv) is not in this label — confirm availability with pharmacy | Tegretol read in full: no parenteral form; Carnexiv status — README D3 | R8 finding F-carbamazepine |
| `calculatorIds` | (absent) | [] | valid-ids.txt | R8 finding F-carbamazepine |
| `verify` | (absent) | [] | — | Nothing unconfirmed |
| `relatedIds` | (absent) | asm-interactions:inducing-asm-apixaban-rivaroxaban, asm-interactions:inducing-asm-warfarin, antiseizure-medications:lamotrigine, antiseizure-medications:valproate, antiseizure-medications:brivaracetam, acute-neuro:hyponatremia-ods | valid-ids.txt | Only ids already valid (assumption 3) |
| `sources[0]` | (absent) | Tegretol (carbamazepine) tablets and suspension; Tegretol-XR extended-release tablets US prescribing information. Novartis; revised 8/2026 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-carbamazepine |
| `sources[1]` | (absent) | Xcopri (cenobamate) tablets US prescribing information. SK Life Science; revised 8/2025 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-carbamazepine |
| `sources[2]` | (absent) | Fycompa (perampanel) tablets and oral suspension US prescribing information. Catalyst Pharmaceuticals; revised 1/2024 (user-supplied label) | Label footer revision date (assumption 1) | R8 finding F-carbamazepine |
| `lastReviewed` | (absent) | UNREVIEWED | Rule | New entry |

## Open verify[]
- None.

## Registry version
- antiseizure-medications: one MINOR bump for all of R8 (see README).
