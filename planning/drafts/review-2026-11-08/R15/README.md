# Review 2026-11-08, item R15: drafts (planning/drafts/review-2026-11-08/R15/)

Lyme neuroborreliosis (task 4.5, optional): one new acute-neuro entry. Approved by Jason in chat 2026-11-11: "Approve as recommended". The decisions:
- 1: `acute-neuro` entry, CNS_INFECTION.
- 2: id `lyme-neuroborreliosis`; title "Lyme neuroborreliosis (adult)"; adult doses only.
- 3: ceftriaxone and doxycycline FIRST_LINE; cefotaxime and penicillin G ALTERNATIVE.
- 4: parenchymal duration as a note ("typically 2–4-week courses"), no separate dosed row.
- 5: facial palsy steroids as immediate actions plus a pitfall; no treatment row, no steroid dose.
- 6: sensitivity figures included.
- 7: carditis as one escalate line only.
- 8: no link to `neurosyphilis` until R13 merges (parked).
- 9: GRADE strong → STRONG, weak → WEAK, exact wording in `evidenceNote`; "no recommendation" is not a treatment row.

New entry, so there is no base. `lastReviewed: "UNREVIEWED"`.

**Answer to the brief** (the brief gives R15 no Output line; scope taken from the R13 pattern):
- **Who to test:** acute meningitis, painful radiculoneuritis, mononeuropathy multiplex, acute cranial neuropathy, or cord/brain inflammation, with plausible tick exposure.
- **Who not to test:** typical ALS, RRMS, Parkinson's disease, dementia, new-onset seizures, psychiatric illness; nonspecific white matter lesions alone.
- **Tests:** serum 2-tier antibody. If CSF is sent, paired CSF + serum antibody index. No PCR or culture.
- **Reading them:** the index is specific but can stay elevated for years, and a normal index doesn't exclude. CSF PCR sensitivity 5–17%.
- **Regimens (14–21 days):**
  - Ceftriaxone 2000 mg IV daily.
  - Doxycycline 100 mg PO BID or 200 mg daily.
  - Alternatives: cefotaxime 2000 mg IV TID; penicillin G 18–24 MU/day divided q4h.
  - Parenchymal brain or cord disease: IV, typically 2–4 weeks.
- **Facial palsy:** if Lyme isn't established (age ≥16), steroids within 72 h. Once Lyme is established the guideline makes no recommendation.
- **Currency check (2026-11-11):** no successor guideline found. Secondary sources dated July 2025 and May 2026 still cite the 2020 guideline as current. Search results only; nothing from them is encoded.

**Validation actually run** (not only read): the draft was parsed with zod 3 against `AcuteNeuroEntry`, using `schema/common.ts` and `schema/acute-neuro.ts` retyped from the project copies. Result: **PASS**. A registry envelope holding the entry also passed. Four negative controls were rejected, which confirms the check is live:
- a source without a year;
- 6 keyNumbers;
- an IF_INDICATED workup item with no indication;
- a FIXED dose with weightBasis ACTUAL.

The same script also confirmed:
- top-level and treatment key order match the R13 acute-neuro entry;
- all 5 `keyNumbers` are exact copies of their source fields;
- all 6 `relatedIds` are in `valid-ids.txt` (acute-neuro and consult-workups lines);
- no removed id is referenced and there are no calculatorIds;
- `lyme-neuroborreliosis` is not an existing id.

`npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: append the JSON word for word as a new entry, validate, run the read-only checks C1 and C2, then apply **one** registry bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `acute-neuro.lyme-neuroborreliosis.json` (+ `…CHANGES.md`) | N1–N10, K1–K5 | New entry: 5 presentation, 13 definitions, 5 immediateActions, 3 workup, 4 treatment rows, 8 pitfalls, 4 escalateWhen, 4 institutionVaries, 5 keyNumbers, 0 verify, 6 relatedIds, 1 source |

## keyNumbers
- `keyNumbers[0]`–`[1]` (K1–K2): exact copies of `treatment[0]`–`[1]` `agent` + ": " + `doseText`.
- `keyNumbers[2]` (K3): exact copy of `treatment[0].notes[1]`.
- `keyNumbers[3]` (K4): exact copy of `definitions[11]`.
- `keyNumbers[4]` (K5): exact copy of `definitions[5]`.
- All five checked by script; 5 lines, max 5.

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/acute-neuro.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | New entry |

No `package.json` bump and no schema bump: the entry fits acute-neuro 1.3.0. Update `lastUpdated` on `data/acute-neuro.json`.

**Sequencing:** R3, R4, R6, R10 and R13 also bump `acute-neuro` (MINOR each). Encode R15 on a branch from `main` **after** those PRs have merged, so each item gets its own single bump. If any of them is still open, Claude Code stops and asks.

## Open verify[]
- None. `verify: []`. The release is blocked only by `lastReviewed: "UNREVIEWED"` until you sign off.
- Open non-verify items, both read-only (report only):
  - C1: do other entries already contain Lyme content that this entry duplicates or contradicts?
  - C2: how do the STRONG badge on ALTERNATIVE rows and the `UNITS` dose (18000000–24000000) render?

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| N1 | new entry | No Lyme neuroborreliosis content in the app | **FIX** (decisions 1, 2): `acute-neuro:lyme-neuroborreliosis` |
| N2 | presentation | Early vs late timing; cranial nerves; PNS patterns; raised ICP; parenchymal disease | **FIX**: 5 lines |
| N3 | definitions[0]–[2] | Who to test and who not to (X.1–X.4, XI) | **FIX** |
| N4 | definitions[3]–[4], workup[0]–[1] | Serum 2-tier; paired antibody index; no PCR or culture (IX) | **FIX** |
| N5 | definitions[5]–[12] | Reading results: index sensitivity and persistence, PCR sensitivity, pleocytosis, early seronegativity, IgG rule-out, antibody persistence, enteroviral discriminators, CXCL13 | **FIX** (decision 6) |
| N6 | treatment[0]–[3] | Regimens, doses, 14–21 days (XIII, Tables 3–4) | **FIX** (decision 3) |
| N7 | treatment[0].notes, escalateWhen[0] | Parenchymal disease: IV over oral; 2–4 weeks (XIV) | **FIX** (decision 4) |
| N8 | immediateActions[2]–[3], pitfalls[0] | Facial palsy steroids (XV) | **FIX** (decision 5) |
| N9 | pitfalls[1]–[7] | No retreatment for nonspecific symptoms; white matter lesions; encephalopathy; long courses; slow response; first-24-h reaction; immunoblots | **FIX**: 7 lines |
| N10 | escalateWhen[1]–[3], immediateActions[0], [4] | ICP, carditis line (decision 7), relapse, empiric coverage first | **FIX** |
| K1–K5 | keyNumbers | Five glanceable lines | **FIX**: exact copies |
| C1 | other entries | Possible Lyme content in bacterial-meningitis, viral-encephalitis, inpatient-neuropathy, myelopathy-workup, new-demyelinating-lesion, acute-vision-loss (none in the export) | **PARK**: Claude Code reports read-only |
| C2 | treatment | ALTERNATIVE rows carry STRONG (XIII.1 grades all four agents together); UNITS integers | **ACCEPT**: encoded as graded; Claude Code reports rendering read-only |
| A1 | — | Erythema migrans, tick-bite prophylaxis, prevention, arthritis, PNS/CNS anatomy | **ACCEPT**: common knowledge or outside inpatient neurology |
| A2 | — | ICP-lowering doses; facial palsy steroid dose | **ACCEPT**: not in this source (it says only "techniques to lower intracranial pressure" and "current facial nerve palsy guideline recommendations"); not encoded |
| A3 | relatedIds | Link to `acute-neuro:neurosyphilis` | **PARK** (decision 8): id not in `valid-ids.txt` until R13 merges |
| A4 | formularyStatus | Local formulary unknown | **ACCEPT** (assumption): ceftriaxone AVAILABLE; others INSTITUTION_VARIES |
| A5 | treatment[2] | Current US availability of cefotaxime not checked | **PARK**: listed under institutionVaries |
| A6 | pitfalls[1] | XXV.1 could instead be a `NOT_RECOMMENDED` treatment row | **PARK**: encoded as a pitfall, as proposed and approved |
| A7 | — | Tests to avoid (urine antigen, lymphocyte transformation, CD57; e10) | **PARK**: not in the approved rows; can be added as a pitfall |
| A8 | — | Coinfection (Anaplasma, Babesia; XXVI–XXVIII) | **PARK**: sections skimmed only, not encoded |
| A9 | — | Carditis antibiotics and pacing (XVIII–XIX) | **ACCEPT** (decision 7): one escalate line only |
| A10 | — | Pediatric doses and oral doxycycline in children | **ACCEPT** (decision 2): adult entry |
| A11 | definitions[5] | Antibody-index sensitivity data are mostly European | **ACCEPT**: origin of each figure is stated in the line |
| A12 | other entries | Back-links to this entry from related entries | **PARK** |
| A13 | — | Guideline dated 2020 | **ACCEPT**: no successor found (web check 2026-11-11) |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Lantos PM, et al. Clinical Practice Guidelines by the Infectious Diseases Society of America (IDSA), American Academy of Neurology (AAN), and American College of Rheumatology (ACR): 2020 Guidelines for the Prevention, Diagnosis and Treatment of Lyme Disease. Clin Infect Dis 2021;72(1):e1–e48. doi:10.1093/cid/ciaa1215.
  - Uploaded PDF, 48 pages. PDF page n = journal page e-n (checked from the page footers by script).
  - Read in full via `pdftotext`: e10–e12 (diagnostic testing principles, treatment principles, Tables 3–4), e24–e29 (Neurologic Lyme Disease, IX–XV, ICP, XVI–XVII), XXV.1 on e36. Recommendation wording was cross-checked against the executive summary (e3–e4).
  - Tables 3 and 4 (e11) were also checked on a rendered image of the page, because the text extraction scrambles table columns.
  - Skimmed or not read: prevention and tick sections, erythema migrans, carditis treatment, arthritis, coinfections, references.
- Web check only, not cited in the entry (2026-11-11): Guideline Central listing (page updated May 5, 2026) and a UIC Drug Information Group review (July 2025), both search results naming the 2020 guideline as current.
