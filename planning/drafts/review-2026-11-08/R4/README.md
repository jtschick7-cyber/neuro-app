# Review 2026-11-08, item R4: drafts (planning/drafts/review-2026-11-08/R4/)

Post-neurosurgical / EVD / shunt meningitis: re-source the healthcare-associated treatment row to IDSA 2017 and add the EVD/shunt rows Jason picked. Approved by Jason in chat 2026-11-09: rows N1–N4, N6, N7, N9–N13; D1 (a), D2 (a), D3 (a); C. acnes added; `searchTerms` addition OK; assumptions 1–3 accepted. Base: the signed `current.acute-neuro.bacterial-meningitis.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07). The entry has `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:** IDSA 2017 (Tunkel, Clin Infect Dis 2017;64(6):e34–e65) is the specific guideline. It keeps the same empiric regimen as the entry (vancomycin + cefepime, ceftazidime or meropenem; Rec 37, strong, low), and its adult beta-lactam doses match the entry (Table 2). It gives a different vancomycin dose (30–60 mg/kg/day q8–12h, trough 15–20 μg/mL), so the row no longer points to the 2004 community dose. It also covers CSF lactate and procalcitonin, device removal or replacement, and intraventricular antibiotics, as the reviewer recalled. A web check (2026-11-09) found no newer version.

**Assumptions accepted:** (1) community-acquired rows stay on IDSA 2004; (2) GRADE strong → STRONG, weak → WEAK, with the guideline's "strong, low" wording in `evidenceNote` or the line; (3) evidence-summary-only data is labelled "study data (ungraded)" or "evidence summary, ungraded".

**Validation actually run** (not only read): the draft was parsed with zod 3 against `AcuteNeuroEntry`, using `schema/common.ts` and `schema/acute-neuro.ts` copied verbatim from the export packet: **PASS**. A deliberately broken copy (route `INTRAVENTRICULAR`, not in the enum) failed, which confirms the check is live. A script also confirmed:
- top-level key order unchanged; every `treatment`, `workup` and `dose` object has the base key order;
- every `keyNumbers` line is an exact copy of a field (5 lines, max 5);
- both `relatedIds` are in `valid-ids.txt`; no `calculatorIds`; no removed id is referenced;
- the base `verify[]` (empty) is kept; two items added.

The draft was built by a script from the base JSON, so unchanged fields are byte-identical to it. `npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: encode the JSON word for word as the full replacement entry, validate, show the diff against the CHANGES file, then apply **one** registry bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `acute-neuro.bacterial-meningitis.json` (+ `…CHANGES.md`) | F1–F7, K1–K2, N1–N4, N6, N7, N9–N13 | Healthcare-associated row (`treatment[4]`) re-sourced to IDSA 2017 with the 2017 vancomycin dose (+ structured dose), device-removal and duration notes; new intraventricular row (`treatment[5]`); 3 definitions; blood-culture note; 3 workup rows; rifampin hardware note; EVD CSF-sampling pitfall; C. acnes; 3 search terms; 2 truncated keyNumbers fixed; source added; 2 verify items |

## keyNumbers
- `keyNumbers[0]`: unchanged; exact copy of `immediateActions[1].action`.
- `keyNumbers[1]`: changed (K1); exact copy of `treatment[1].agent` + ": " + `doseText` (community vancomycin, IDSA 2004 — unchanged dose).
- `keyNumbers[2]`: unchanged; exact copy of `treatment[2].agent` + ": " + `doseText`.
- `keyNumbers[3]`: unchanged; exact copy of `treatment[3].agent` + ": " + `doseText`.
- `keyNumbers[4]`: changed (K2); exact copy of `treatment[7].agent` + ": " + `doseText`.
- All five checked by script. No healthcare-associated number was added (already at the 5-line maximum).

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/acute-neuro.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | Dose and evidence source changed (healthcare-associated row); new source; new workup and treatment rows |

No `package.json` bump (no code or UI change) and no schema bump (D2 (a): existing `INTRATHECAL` route). Update `lastUpdated` on `data/acute-neuro.json` to the encoding date.

**R3 interaction:** R3 also bumps `acute-neuro` (MINOR). Encode R4 on a branch from `main` **after** the R3 PR has merged, so each item gets its own single bump. If the R3 PR is still open, Claude Code stops and asks.

## Open verify[]
- V1: "IDSA 2017 vancomycin trough target 15–20 μg/mL (Rec 38) predates AUC-based dosing; reconcile with the local vancomycin protocol"
- V2: "Intraventricular gentamicin: IDSA 2017 Table 3 footnote d gives 4–8 mg for adults, but footnote e (by ventricle size) gives 2 / 3 / 4–5 mg; confirm which to show"

Both block `validate:release` until resolved at sign-off.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F1 | `treatment[4].evidenceNote[0]` | Cites IDSA 2004 for the healthcare-associated regimen | **FIX**: IDSA 2017 Rec 37 (strong, low), Rec 38, Table 2 |
| F2 | `sources` | IDSA 2017 not cited | **FIX**: `sources[3]` |
| F3 | `treatment[4].doseText`, `dose` | "Vancomycin as above" pointed to the 2004 community dose (30–45 mg/kg/day) | **FIX** (D1 a): 30–60 mg/kg/day q8–12h, trough 15–20 μg/mL if intermittent bolus (Table 2, Rec 38); structured `dose[1]`; V1 added |
| F4 | `treatment[4].notes[1]` | "Device removal/neurosurgery involvement" unsourced and vague | **FIX**: Recs 62–63 wording |
| F5 | `treatment[4].agent` | Didn't mention drains | **FIX**: "CSF shunt or drain" |
| F6 | `presentation[3]` | C. acnes missing from the organism list | **FIX**: "C. acnes (P. acnes)"; "EVD" added |
| F7 | `searchTerms` | EVD/ventriculitis/shunt infection not searchable | **FIX**: three terms |
| K1 | `keyNumbers[1]` | Truncated copy of `treatment[1]` | **FIX**: exact copy (R3 rule) |
| K2 | `keyNumbers[4]` | Truncated copy of `treatment[7]` | **FIX**: exact copy (R3 rule) |
| N1 | `definitions[2]` | EVD culture classification (Rec 22) | **FIX** |
| N2 | `definitions[3]` | CoNS contaminant (Rec 26) | **FIX** (own line; neurosurgery subsection) |
| N3 | `workup[5]` | Hold device CSF cultures ≥10 days (Rec 17) | **FIX** |
| N4 | `workup[6]` | CSF lactate ± CSF procalcitonin (Rec 30) with study cutoffs and caveats | **FIX** (combined PCT+lactate line included; within N4) |
| N5 | — | Serum procalcitonin (Rec 31, weak, low) | **PARK**: offered, not picked |
| N6 | `definitions[4]` | Post-neurosurgery infection vs chemical meningitis (e47, ungraded) | **FIX** |
| N7 | `workup[0].notes[1]` | Blood cultures by shunt type (Recs 20–21) | **FIX** |
| N8 | — | MRI with gadolinium + DWI (Rec 35) | **PARK**: offered, not picked |
| N9 | `workup[7]` | CSF β-D-glucan / galactomannan (Rec 33) | **FIX** |
| N10 | `treatment[8].notes[1]` | Rifampin with hardware, staphylococci (Rec 44) | **FIX**; row stays WEAK |
| N11 | `treatment[5]` | Intraventricular antibiotics (Recs 55–57, Table 3) | **FIX** (D2 a); V2 added |
| N12 | `treatment[4].notes[2]` | Duration (Recs 58–61) | **FIX** |
| N13 | `pitfalls[4]` | EVD CSF sampling (Recs 67, 69) | **FIX** |
| N14 | — | No prolonged EVD prophylaxis; no fixed-interval exchange (Recs 76, 78) | **PARK**: offered, not picked |
| N15 | — | Basilar skull fracture CSF leak (Recs 81–83); guideline's PCV13→PPSV23 schedule is outdated | **PARK**: offered, not picked; if revived, encode "vaccinate" only |
| A1 | community rows | IDSA 2017 doses differ from 2004 for vancomycin | **ACCEPT**: 2017 applies to healthcare-associated infection only (assumption 1) |
| A2 | `treatment[4]` beta-lactams | 2 g q8h each | **ACCEPT**: matches Table 2 (6 g/day q8h) |
| A3 | `treatment[6]` (allergy) | Rec 39 (aztreonam or ciprofloxacin, strong, low) for healthcare-associated anaphylaxis | **ACCEPT**: not picked; the row already names both as gram-negative alternatives |
| A4 | — | Organism-directed therapy (Recs 41–54, Table 1), except Rec 44 | **ACCEPT**: ID's domain; not encoded |
| A5 | — | Shunt reimplantation timing (Recs 70–73) | **ACCEPT**: neurosurgery's call; not encoded |
| A6 | — | Symptom recs 1–12; CSF-parameter recs 13–15; recs 16, 18–19, 23–25, 27–29, 32, 34, 36, 40, 64–66, 68, 74–75, 77, 79–80 | **ACCEPT**: common knowledge, device-specific outside the consult role, or not picked |
| A7 | — | Newer guideline? | **ACCEPT**: none found (web check 2026-11-09); IDSA's guideline-status page not checked |
| A8 | `treatment[4].dose[1].weightBasis` | Guideline doesn't state a weight basis | **ACCEPT**: ACTUAL, matching the existing community vancomycin row |

No PARK item needs action now; N5, N8, N14 and N15 can be revived in a later item.

## Sources used (attached to the planning chat)
- Tunkel AR, et al. 2017 IDSA Clinical Practice Guidelines for Healthcare-Associated Ventriculitis and Meningitis. Clin Infect Dis 2017;64(6):e34–e65 (uploaded PDF, 32 pages). Read in full, e34–e61; reference list skimmed. Used: e45–e47 (Recs 17, 20–22, 26, 30; definitions and VA-shunt bacteremia e46; post-neurosurgery CSF data e47), e48 (Rec 33; lactate and procalcitonin data), e49 (β-D-glucan data), e49–e50 (Recs 37–38), e50 (organisms; Rec 44), e52 (Table 1; Recs 55–57), e53 (Table 2; intraventricular safety text), e54 (Table 3; dosing text), e55 (Recs 58–63), e56 (Recs 67, 69).
- Web check only, not cited in the entry: guideline currency search (2026-11-09) returned 2017 coverage and later reviews (US Pharmacist 2021); no update found.
- Note for future items: the extracted text renders "μg" correctly in this PDF; Table 2's two-column layout needed the layout-mode extraction to pair child and adult columns.
