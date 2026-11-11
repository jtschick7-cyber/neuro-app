# Review 2026-11-08, item R14: drafts (planning/drafts/review-2026-11-08/R14/)

ARIA on anti-amyloid therapy (task 4.4): one new consult-workups entry. Approved by Jason in chat 2026-11-10: "Otherwise approved", after the proposal with D1–D12 as recommended and the AHA 2026 and ASN sources added. The decisions:
- D1 (a): one `consult-workups` entry; steroids and hold/stop rules are DecisionRules, no `acute-neuro` split.
- D2: mild ARIA-E with mild symptoms shown as two rules (label: may continue by judgment; AUR: suspend).
- D3: severe radiographic ARIA shown as two rules (label: suspend, judgment on stopping; AUR: discontinue).
- D4: superficial siderosis stop threshold shown as "more than 1"; the lecanemab AUR text says 1 area (verify).
- D5: anticoagulant needed shown as two rules (label caution; AUR stop the antibody).
- D6: thrombolysis is a link to `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics`; one label rule and one AUR rule, no restatement of AHA Table 8.
- D7: AUR and ASNR lines `EXPERT_OPINION`; label lines `NOT_GRADED`.
- D8: label MRI schedules only.
- D9: seizures: source-stated content only, no ASM choice or dose.
- D10: ApoE ε4 rates in pearls; no genotype line in keyNumbers.
- D11: lecanemab AUR Fig 2 vs text inconsistency goes to verify[].
- D12: one entry covering both drugs.
- Assumptions accepted: scope is lecanemab and donanemab (IV and SC); AUR citations by page or section; no formal Delphi, so no `CONSENSUS`.

New entry, so there is no base. `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- **Recognition:** ARIA-E is FLAIR edema or sulcal effusion; ARIA-H is microhemorrhage or superficial siderosis on T2* GRE. It is usually asymptomatic and can mimic stroke. MRI with FLAIR, GRE and DWI; emergent when stroke vs ARIA is in question and EVT or thrombolysis is being considered.
- **Grading (same in both labels):**
  - ARIA-E: mild <5 cm in one location; moderate 5–10 cm or >1 site (each <10 cm); severe >10 cm with gyral swelling and sulcal effacement.
  - ARIA-H microhemorrhages: mild ≤4, moderate 5–9, severe ≥10 new. Siderosis: mild 1 area, moderate 2, severe >2.
- **Hold or stop (labels):**
  - Asymptomatic mild ARIA-E or ARIA-H: may continue.
  - Mild ARIA-E with mild symptoms: may continue by judgment.
  - Everything else: suspend until MRI shows resolution (ARIA-E) or stabilization (ARIA-H) and symptoms resolve.
  - Severe ARIA-H and ICH >1 cm: judgment on permanent discontinuation.
- **Hold or stop (AURs, stricter):**
  - Any symptoms or radiographically moderate: suspend.
  - Radiographically severe or severely symptomatic: discontinue.
  - Drug-specific stopping lists (macrohemorrhage; >10 new microhemorrhages; siderosis; repeat episodes; anticoagulant needed).
- **Steroids:** AUR only. Methylprednisolone 1 g IV daily for 5 days, then oral taper over several weeks, considered early for serious or severe ARIA. Neither label addresses steroids.
- **Seizures:** can occur with serious ARIA; monitor and treat if they occur (lecanemab AUR). No ASM choice or dose in any source.
- **IVT:** link only. Labels: consider ARIA-E first. AURs: no thrombolytic; thrombectomy alone for LVO.
- **ApoE ε4:** homozygotes have the highest ARIA rates (per-drug numbers in pearls); labels say management does not differ by genotype.
- **Currency check (2026-11-10):** by search snippet only. Leqembi (7/2026) and Kisunla (7/2025) match the current DailyMed/FDA versions. No revised US lecanemab AUR found. UK and French lecanemab AURs exist and were not uploaded or used. Confirm on DailyMed before sign-off (in verify).

**Validation actually run** (not only read): the draft was built by script and parsed with zod 3.25 against `ConsultWorkupEntry`. It used `schema/common.ts`, `acute-neuro.ts`, `vascular-antithrombotics.ts` and `consult-workups.ts` as read from the project (consult-workups 2.1.0). Result: **PASS**. A registry envelope holding the entry also passed. Seven negative controls were rejected, which confirms the check is live:
- a source without a year;
- 6 keyNumbers;
- an IF_INDICATED workup item with no indication;
- no mustNotMiss differential;
- non-increasing decisionRules order;
- a malformed relatedId;
- an unknown key.

The same script also confirmed:
- top-level key order matches the export entry `ich-etiology-workup`;
- all 5 `keyNumbers` are exact copies of a field line (max 5);
- all 8 `relatedIds` are in `valid-ids.txt`;
- no removed id appears anywhere in the JSON and there are no calculatorIds;
- `aria-anti-amyloid` is not an existing id.

`npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: append the JSON word for word as a new entry, validate, then apply **one** registry bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `consult-workups.aria-anti-amyloid.json` (+ `…CHANGES.md`) | A1–A14, K1–K5 | New entry: 6 keyHistory, 4 keyExam, 6 redFlags, 6 differential, 5 workup, 18 decisionRules, 4 initialSteps, 3 disposition, 4 institutionVaries, 11 pearls, 5 keyNumbers, 5 verify, 8 relatedIds, 5 sources |

## keyNumbers
- `keyNumbers[0]` (K1): exact copy of `workup[2].notes[0]`.
- `keyNumbers[1]` (K2): exact copy of `workup[3].notes[0]`.
- `keyNumbers[2]` (K3): exact copy of `workup[1].notes[0]`.
- `keyNumbers[3]` (K4): exact copy of `workup[1].notes[1]`.
- `keyNumbers[4]` (K5): exact copy of `decisionRules[15].recommendation`.
- All five checked by script; 5 lines, max 5.

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/consult-workups.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | New entry |

No `package.json` bump and no schema bump: the entry fits consult-workups 2.1.0. Update `lastUpdated` on `data/consult-workups.json`.

**Sequencing:** if any other open PR touches `data/consult-workups.json`, encode R14 after it merges so each item gets its own single bump. If one is still open, Claude Code stops and asks.

## Open verify[]
All five are in the entry's `verify[]`; they block release until you clear them.
1. AHA 2026 Table 8: the uploaded extract (PDF pp.22–25) ends after the aortic arch dissection row and has no amyloid immunotherapy/ARIA row. Wording unconfirmed. To close it, upload the remaining pages of Table 8.
2. Lecanemab AUR superficial siderosis stop threshold: text says 1 area; Fig 2 and the donanemab AUR say more than 1.
3. Lecanemab AUR Fig 2 vs text and Table 8 on asymptomatic severe ARIA (suspend path vs discontinue).
4. Lecanemab AUR cited by author-manuscript pages.
5. Currency of the two labels checked by snippet only.

Open non-verify items, both read-only (report only):
- C1: do other entries already contain ARIA or anti-amyloid content that this entry duplicates or contradicts?
- C2: how do the long `decisionRules` lines (rules 13, 14, 15, 18) render?

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| A1 | new entry | No ARIA or anti-amyloid content in the app | **FIX** (D1, D12): `consult-workups:aria-anti-amyloid` |
| A2 | differential, redFlags, keyHistory, keyExam | Recognition, mimics (stroke, CAA-ri, PRES), seizure | **FIX** |
| A3 | workup[1], K3–K4 | MRI grading and symptom-severity definitions | **FIX**: same thresholds in both labels |
| A4 | workup[0], [2]–[3], K1–K2 | MRI protocol and surveillance schedules | **FIX** (D8): label schedules only |
| A5 | decisionRules 3–6, 11 | Label ARIA-E hold rules; recurrent ARIA-E | **FIX** |
| A6 | decisionRules 7–9 | Label ARIA-H hold rules | **FIX** |
| A7 | decisionRules 10 | ICH >1 cm | **FIX** |
| A8 | decisionRules 5, 12–15 | AUR suspend, discontinue, stopping lists, resume | **FIX** (D2, D3, D4, D11) |
| A9 | decisionRules 16, K5 | Steroids, AUR only | **FIX** (D7) |
| A10 | decisionRules 17–18 | Anticoagulant and antithrombotic: label caution vs AUR stop | **FIX** (D5) |
| A11 | decisionRules 1–2 | Thrombolysis: link, one label rule, one AUR rule | **FIX** (D6) |
| A12 | differential[5], redFlags, pearls, initialSteps | Seizures: source-stated content only | **FIX** (D9) |
| A13 | pearls, keyHistory | ApoE ε4 and baseline MRI risk | **FIX** (D10) |
| A14 | workup[0] | ASNR imaging recommendations (emergent MRI, DWI, field strength, contrast) | **FIX** |
| K1–K5 | keyNumbers | Five glanceable lines | **FIX**: exact copies |
| V1–V5 | verify | See Open verify[] | **FIX**: carried as verify[]; release blocked until cleared |
| B1 | category | `COGNITION_ENCEPHALOPATHY` chosen; `VASCULAR` also fits | **ACCEPT**: one-line change if you prefer another |
| B2 | schema header | consult-workups says "diagnosis and disposition only; treatment lives elsewhere", but this entry holds hold/stop and steroid rules | **ACCEPT** (D1): DecisionRules are the only fit; no schema change proposed |
| B3 | workup[4], decisionRules | Label follow-up MRI at 2 to 4 months vs AUR monthly | **ACCEPT**: both shown, neither picked |
| B4 | not encoded | Lecanemab AUR and ASNR MRI schedule (5th, 7th, 14th infusion) | **ACCEPT** (D8): older than the current label |
| B5 | not encoded | ANA white paper pause/discontinue rule as quoted in ASNR p.25 | **ACCEPT**: secondary summary of the lecanemab AUR |
| B6 | not encoded | ASNR GRE TE values, vendor protocols, reporting templates, order sets, radiologist communication | **ACCEPT**: radiology workflow, not a neurology lookup |
| B7 | not encoded | Eligibility and exclusion rules (anticoagulants, seizure history, BP control, immunosuppressants, DAPT), infusion reactions, amyloid confirmation, PET stopping rules | **ACCEPT**: prescribing decisions, not the ARIA consult |
| B8 | not encoded | Overall ARIA incidence by arm, serious and fatal ARIA counts | **PARK**: can be added to pearls |
| B9 | not encoded | AUR Table 9 resource list for serious ARIA | **PARK**: one line in institutionVaries only |
| B10 | not encoded | AUR steroid reference (Regenhardt, JAMA Neurol 2020) not read | **ACCEPT**: regimen taken from the two AURs only |
| B11 | institutionVaries | Local ICU, MRI, prescriber roles | **ACCEPT**: INSTITUTION_VARIES, no local detail |
| B12 | not encoded | Aducanumab | **ACCEPT**: out of scope; no source uploaded |
| B13 | not encoded | Common knowledge: ARIA pathophysiology, antibody mechanism, general status epilepticus care, general stroke workup | **ACCEPT**: left out as you asked |
| C1 | other entries | Possible ARIA or anti-amyloid mentions in other entries (none in the export) | **PARK**: Claude Code reports read-only |
| C2 | decisionRules | Rendering of long rule lines | **ACCEPT**: Claude Code reports read-only |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Eisai. LEQEMBI (lecanemab-irmb) prescribing information, revised 7/2026. 66 pages.
  - Read in full via `pdftotext`; dosing tables (PDF pp.6–7) and Table 5 viewed as page images.
  - Used: boxed warning, §2.4 (p.6–7), §5.1 (pp.10–13).
- Eli Lilly. KISUNLA (donanemab-azbt) prescribing information, revised 7/2025. 29 pages.
  - Read in full; Tables 2 and 3 (PDF pp.5–6) viewed as page images.
  - Used: boxed warning, §2.3 (pp.5–6), §5.1 (pp.8–11).
- Cummings J, et al. Lecanemab: appropriate use recommendations. J Prev Alzheimers Dis 2023;10(3):362-377. doi:10.14283/jpad.2023.30. Author manuscript.
  - Read in full; cited by manuscript "Page N". Fig 2 viewed as an image.
  - Used: p.6 (anticoagulants, thrombolytics), p.9 (macrohemorrhage), pp.10–11 (management, serious ARIA, steroids, stopping), p.30 (Table 8).
- Rabinovici GD, et al. Donanemab: appropriate use recommendations. J Prev Alzheimers Dis 2025;12:100150. doi:10.1016/j.tjpad.2025.100150.
  - Read in full (re-extracted in reading order to untangle the two-column text); Fig 2 and Table 8 viewed as images. Printed pages equal PDF pages.
  - Used: p.6, §5.2 (p.9), §5.3 (p.10), §5.4 (pp.10–11, Table 8), §5.5 (pp.10–11), §5.6 (p.12).
- Cogswell PM, et al. Alzheimer disease anti-amyloid immunotherapies: imaging recommendations and practice considerations for monitoring of amyloid-related imaging abnormalities. AJNR Am J Neuroradiol 2025;46:24-32. doi:10.3174/ajnr.A8469.
  - Read in full (10 pages); Fig 1 caption read, figure not graded from the image.
  - Used: p.24 (asymptomatic share, thrombolysis fatality), pp.27–29 (MRI scenarios, sequences, field strength).
- 2026 AHA/ASA Guideline for the Early Management of Patients With Acute Ischemic Stroke (uploaded extract, 26 PDF pages; Table 8 on PDF pp.22–25).
  - Table 8 (PDF pp.22–25) viewed as page images, the lead-in text read, and the whole extract searched for "amyloid" and "ARIA". It was not read end to end; only a cerebral amyloid angiopathy mention in the microbleed text turned up.
  - The extract stops after the aortic arch dissection row, so the amyloid immunotherapy/ARIA row was not seen.
  - Not cited in the entry; nothing is encoded from it. The IVT link goes through the existing thrombolysis entry.
- Web check only, not cited in the entry (2026-11-10): search snippets for the current DailyMed/FDA versions of both labels and for any revised US lecanemab AUR.
