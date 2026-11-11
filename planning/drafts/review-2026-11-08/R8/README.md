# Review 2026-11-08, item R8: drafts (planning/drafts/review-2026-11-08/R8/)

Home ASMs when NPO; phenobarbital (blocks task 3.8), from label text and the AES ASM summary. Approved by Jason in chat 2026-11-09 ("Approve"; every recommendation as offered): D1 (A) eight full cards in `antiseizure-medications`; D2 one card per drug, XR/suspension/film products inside it; D3 Carnexiv not encoded beyond "oral only in label"; D4 AES 2024 summary accepted as the phenobarbital source, per-kg doses as text only; D5 AES serum ranges added, attributed; D6 `formularyStatus: INSTITUTION_VARIES` on all new items; D7 matching lines in existing cards PARKed; assumptions 1–5 accepted.

Base: `current/antiseizure-medications.json` (version 1.0.1, 6 entries) from the review-2026-11-08 export packet. Every new entry has `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- Liquid/sprinkle forms: oxcarbazepine suspension 60 mg/mL (equal-dose substitution); carbamazepine suspension 100 mg/5 mL (same mg/day, more frequent doses; no other liquids at the same time); topiramate sprinkle capsules 15/25 mg; clobazam suspension 2.5 mg/mL and oral film; zonisamide suspension (Zonisade) 100 mg/5 mL; perampanel suspension 0.5 mg/mL (interchangeable); phenobarbital elixir 4 mg/mL (AES).
- Crush/tube: only Xcopri has label NG-tube instructions (crush, 25 mL water, 10 mL flush; same exposure). Onfi tablets may be crushed in applesauce. Never crush Oxtellar XR or Tegretol-XR; don't break Topamax tablets; swallow Zonegran capsules whole. No other label addresses tubes — each card says "confirm with pharmacy".
- IV: none of the seven has a parenteral form in its label. Carnexiv (IV carbamazepine) is listed as discontinued in the US by Drugs.com (Carnexiv monograph and Carnexiv dosing answer, accessed 2026-11-09) and Pharsight (Orange Book "Discontinued"); Drugs@FDA couldn't be reached from this session. Not encoded (D3). Phenobarbital has an IV form (AES).
- Hyponatremia: oxcarbazepine and carbamazepine only.
- Phenobarbital: Sezaby (approved 2022-11-17) is labeled for neonatal seizures only (Drugs.com approval history); there is no current FDA adult phenobarbital label. Source used: AES summary, which itself takes phenobarbital data from the 1997 PDR label.

**Assumptions accepted:**
1. Sources cite the DailyMed footer revision date. It differs from the Highlights date for Trileptal (9/2025), Oxtellar XR (8/2024), Onfi (3/2024), Sympazan (3/2024), Zonegran (11/2023), Zonisade (5/2025) and Fycompa (6/2023).
2. Oxcarbazepine's "creatinine clearance <30 mL/min" maps to `CG_ML_MIN` (unit not BSA-normalized; the label doesn't name a formula).
3. Zonisamide's "estimated GFR <50 mL/min" sits in `renalNotes`, not as a CrCl band.
4. `relatedIds` only from `valid-ids.txt`; links to R7 entries and between the eight new cards are text only.
5. One MINOR bump; no schema or app bump. Labels as uploaded.

**Validation actually run** (not only read): each of the 8 drafts was parsed with zod 3 against `AsmEntry`, using `schema/common.ts`, `acute-neuro.ts` (TreatmentItem/StructuredDose and their enums) and `antiseizure-medications.ts` with comments stripped (logic unchanged). Result: **PASS**. A registry envelope holding the 8 entries with version 1.1.0 also passed. Three negative controls (source without a year; CRCL_BAND without `crclBasis`; FIXED dose with `weightBasis: ACTUAL`) were rejected, which confirms the check is live. The same script confirmed: key order of entries, treatment items, doses and renal rows matches the schema; `lastReviewed` UNREVIEWED; every `relatedIds` and `calculatorIds` value is in `valid-ids.txt` and none is a removed id; no new id collides with the six existing ids; every `formularyStatus` is INSTITUTION_VARIES.

**Not machine-checked:** the six existing entries weren't re-validated (unchanged); `npm run validate` and `npm test` in the repo are Claude Code's step.

Claude Code: append the 8 new entries word for word after `lamotrigine` in the order below, replace `scopeNotes[2]`, validate, show the diff, then apply **one** MINOR bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File (+ `…CHANGES.md`) | Findings | Change |
|---|---|---|
| `antiseizure-medications.oxcarbazepine.json` | F1 | New card: IR and XR dosing; CrCl <30; suspension equal-dose swap; XR not crushable and not bioequivalent (AUC −19%); phenytoin ↑, inducers ↓ MHD; hyponatremia |
| `antiseizure-medications.carbamazepine.json` | F2, D3 | New card: dosing; suspension conversion and no co-administered liquids; XR never crushed; 4–12 mcg/mL; CYP3A4 inhibitors/inducers; avoid DOACs; NMB resistance; SIADH |
| `antiseizure-medications.topiramate.json` | F3 | New card: dosing; CrCl <70/1.73 m² half dose; HD supplement (no amount); sprinkle; inducers ↓; valproate ammonia; acidosis |
| `antiseizure-medications.clobazam.json` | F4 | New card: LGS weight-band dosing; hepatic; crush in applesauce, suspension, film; CYP2C19 inhibitors; opioids; taper |
| `antiseizure-medications.zonisamide.json` | F5 | New card: dosing; avoid eGFR <50; Zonisade; inducers shorten t½; sulfonamide; acidosis |
| `antiseizure-medications.cenobamate.json` | F6 | New card: titration table; hepatic max 200; crush/NG tube; phenytoin −50%; short QT; DRESS with fast titration |
| `antiseizure-medications.perampanel.json` | F7 | New card: dosing with/without inducers; hepatic max 6/4 mg; suspension interchangeable; boxed psychiatric warning; t½ 105 h |
| `antiseizure-medications.phenobarbital.json` | F8, D4 | New card (AES): 60 mg/day or 1–4 mg/kg/day, max 240; 15–45 mcg/mL; t½ 79 h; inducer; slow taper |
| registry `scopeNotes[2]` (no separate file) | S1 | Current: "Phenobarbital not covered — no source supplied" → New: "Phenobarbital: no current FDA-approved adult label; card sourced from the AES 2024 ASM summary" |

**Placement:** append after `lamotrigine` (the current last entry) in this order: oxcarbazepine, carbamazepine, topiramate, clobazam, zonisamide, cenobamate, perampanel, phenobarbital.

## keyNumbers
- None. The `antiseizure-medications` schema has no `keyNumbers` field.

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/antiseizure-medications.json` | 1.0.1 (export) | 1.1.0 | MINOR | 8 new entries; `scopeNotes[2]` changed |

Update `lastUpdated` to the encoding date. No `package.json` bump; no `schemaVersion` change (existing fields and enums only). If the version in `data/` differs from the export, bump one MINOR from the version found and record it.

## Open verify[]
- None. Every new entry has `verify: []`.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F1 | antiseizure-medications:oxcarbazepine | No card; NPO/forms/XR, hyponatremia absent | **FIX** |
| F2 | antiseizure-medications:carbamazepine | No card; suspension/XR rules, interactions, SIADH absent | **FIX** |
| F3 | antiseizure-medications:topiramate | No card | **FIX** |
| F4 | antiseizure-medications:clobazam | No card | **FIX** |
| F5 | antiseizure-medications:zonisamide | No card | **FIX** |
| F6 | antiseizure-medications:cenobamate | No card; only label with NG-tube instructions | **FIX** |
| F7 | antiseizure-medications:perampanel | No card | **FIX** |
| F8 | antiseizure-medications:phenobarbital | Absent (no source until now) | **FIX** (D4: AES 2024 summary) |
| S1 | registry `scopeNotes[2]` | "Phenobarbital not covered" no longer true | **FIX** |
| D5 | `levels[]` of 7 cards | AES serum ranges (committee experience) | **FIX**: added, attributed; carbamazepine uses the label range |
| D6 | all `maintenance[].formularyStatus` | Local stock unknown | **FIX**: INSTITUTION_VARIES |
| D3 | carbamazepine `ivPo`, `pearls[4]` | Carnexiv listed as discontinued (secondary sources only) | **ACCEPT**: status not encoded; card says oral only in label, confirm with pharmacy |
| D7 | phenytoin-fosphenytoin, lamotrigine (existing) | Matching lines: oxcarbazepine >1200 mg ↑ phenytoin; cenobamate ↑ phenytoin up to 2×; topiramate; cenobamate ↓ lamotrigine | **PARK**: candidate follow-up item |
| P2 | new cards, R7 entries | Cross-links between the 8 new cards and to R7 entries | **PARK**: text only now; add `relatedIds` in a later PATCH once ids are valid |
| A1 | — | Sezaby: neonatal-only label | **ACCEPT**: not encoded |
| A2 | cenobamate | Label gives no re-titration rule after missed doses or interruption | **ACCEPT**: not encoded |
| A3 | oxcarbazepine `enteral[3]` | No label XR → IR conversion | **ACCEPT**: card states the exposure data and that no conversion is given |
| A4 | topiramate `renal[1]` | Label gives no HD supplement amount | **ACCEPT**: card says so |
| A5 | phenobarbital `maintenance[0]` | Source doesn't name the weight for per-kg doses; dose not route-specific; no IV↔PO conversion, renal rule or enteral statement | **ACCEPT**: per-kg in text only; each gap stated on the card |
| A6 | clobazam `maintenance[0].dose` | Structured doses for the >30 kg band only; ≤30 kg band in `doseText` | **ACCEPT** |
| A7 | carbamazepine `interactions` | Label list abridged to inpatient-relevant drugs; omitted include cyclophosphamide, lapatinib, temsirolimus, imatinib, everolimus, sirolimus and other oncology/ARV agents | **ACCEPT**; general oncology/ARV entry already PARKed in R7 (D8) |
| A8 | — | Common knowledge / out of scope left out: pediatric dosing, trigeminal neuralgia and migraine dosing, pregnancy and contraception, class suicidality and DRESS text, oligohidrosis, bone density, eye exams, OXC HLA-B*1502 detail | **ACCEPT** |
| A9 | — | Topiramate IV, other non-US forms | **ACCEPT**: no source; not encoded |
| A10 | — | Label currency | **ACCEPT**: as uploaded; only Carnexiv and Sezaby status checked on the web |

No PARK item needs action now.

## Sources used (attached to the planning chat)
Reading method: `pdftotext -layout`; §2–3 and the renal, hepatic, interaction, warnings and PK sections read in full; full-text keyword sweeps (crush, chew, tube, nasogastric, IV, suspension, sprinkle, hyponatremia, SIADH, level, half-life, dialysis, inducer).

- Trileptal PI, Novartis, revised 10/2026 (52 pages). Used: §2.1–2.3, §2.7–2.8, §3, §4, §5.1, §5.3, §5.6, §7.1–7.2, §8.5–8.6, §12.3.
- Oxtellar XR PI, Supernus, revised 10/2026 (38 pages). Used: §2.1–2.5, §2.7, §3, §8.7, §12.3.
- Tegretol / Tegretol-XR PI, Novartis, revised 8/2026 (25 pages; old format). Used: Description, Clinical Pharmacology, Contraindications, Warnings (boxed; Propylene Glycol Toxicity; General), Precautions (Laboratory Tests; Drug Interactions), Dosage and Administration.
- Topamax PI, Janssen, revised 3/2026 (70 pages). Used: §2.1–2.6, §3, §5.1, §5.4, §5.8, §5.14, §5.16, §7.1–7.2, §7.5, §7.7, §8.5–8.7, §12.3 Table 11.
- Onfi PI, Lundbeck, revised 10/2026 (45 pages). Used: boxed warning, §1, §2.1–2.7, §3, §7.1–7.4, §8.7–8.8, §12.3, §12.5.
- Sympazan PI, Aquestive, revised 12/2025 (33 pages). Used: §2.1, §2.3, §3, §12.3, §14.1.
- Zonegran PI, Advanz, revised 9/2026 (25 pages; old format). Used: Clinical Pharmacology, Contraindications, Warnings (Metabolic Acidosis), Precautions (Effect on Renal Function), Dosage and Administration, How Supplied.
- Zonisade PI, Azurity, revised 9/2025 (36 pages). Used: §2.1–2.4, §3, §7.2, §8.6, §12.3.
- Xcopri PI, SK Life Science, revised 8/2025 (52 pages). Used: §2.1–2.5, §3, §4, §5.1, §7.1–7.2, §8.6–8.7, §12.3.
- Fycompa PI, Catalyst, revised 1/2024 (63 pages). Used: boxed warning, §2.1–2.7, §3, §5.4, §5.6, §7.2–7.3, §8.6–8.7, §12.3.
- Vossler DG, Gidal BE; AES Treatments Committee. A Summary of Antiseizure Medications Available in the United States, 4th ed., revised April 1, 2024 (28 pages). Used: introduction (sources; serum ranges from committee experience), Table 1 rows for phenobarbital (p. 15), carbamazepine, oxcarbazepine, topiramate, clobazam, zonisamide, cenobamate, perampanel.
- Web (status only, not encoded): Drugs.com Carnexiv pages; Pharsight Carnexiv page; Drugs.com Sezaby approval history (all accessed 2026-11-09).
