# consult-workups:monogenic-csvd-workup — CHANGES (R17)

New entry; no base. `lastReviewed: "UNREVIEWED"`. Category `VASCULAR`. Key order copied from `current.consult-workups.young-stroke-workup.json` (export 2026-11-11).

EAN 2020 Delphi statements are `CONSENSUS`, with the paper's own grade copied into `evidenceNote` (mean score, % voting 4 or 5). AHA 2023 scientific statement items carry no COR/LOE and are `NOT_GRADED`. Where EAN and AHA differ (thrombolysis in CADASIL), one rule shows both and neither is picked.

| Section | Rows | What it holds | Source |
|---|---|---|---|
| keyNumbers | 4 | Exact copies: Pescini scale ≥15; AHA NOTCH3 testing trigger (before 55 y); total homocysteine in CBS deficiency; pulvinar sign 22 of 94 | see below |
| keyHistory / keyExam / redFlags | 6 / 3 / 5 | Family history and its limits, onset before 50 y, hemorrhage triggers, systemic clues; skin, eye, build; EAN red flags with scores | Manini Table 5, p.782; EAN Table 1, p.918; GeneReviews |
| differential[0]–[9] | Core arteriopathies | CADASIL, CARASIL, HTRA1 heterozygous, COL4A1/2 (must-not-miss; Axenfeld-Rieger folded in), PADMAL, HANAC, RVCL-S, Fabry (must-not-miss), CARASAL, hereditary CAA (APP, CST3, ITM2B, TTR) | Manini; EAN; AHA Table 1; Verdura; Plaisier; Nozaki; Moore |
| differential[10]–[11] | Mimics | MELAS, CSF1R-related leukoencephalopathy; first clue starts "Mimic:" | EAN p.925; Konno |
| differential[12]–[14] | Loose fits | DADA2, pseudoxanthoma elasticum, homocystinuria (must-not-miss); first clue starts "Loose fit:" | Manini; GeneReviews 2025; Testai |
| workup[0]–[1] | MRI pattern re-read; multigene panel | What to look for; panel vs single variant | Manini Table 4, p.778; AHA p.e456 |
| workup[2] | NOTCH3 sequencing | Pescini scale, AHA trigger, VUS → skin biopsy, temporal pole caveat | Manini p.771; AHA Table 3; EAN p.918 |
| workup[3]–[5] | Fabry enzyme/GLA; homocysteine and amino acids; m.3243A>G then POLG | Sex-specific Fabry test; homocysteine thresholds and B6 washout; MELAS testing order | Manini Table 1; GeneReviews; EAN p.925 |
| workup[6]–[10] | Eye exam; urine, creatinine, CK, renal ultrasound; thin-section CT; MRA/CTA; COL4A1 3′UTR | Targeted tests with indications | Manini; Plaisier; Konno p.1096; Verdura pp.746, 750 |
| workup[11] | Genetic counseling | No predictive testing in children | AHA p.e455 |
| decisionRules 1–6 | When to suspect and test | Risk factors don't exclude; CADASIL; NOTCH3 trigger; VUS; CARASIL; COL4A1/2 | EAN Table 1 (pp.912–913), p.921; AHA Table 3 |
| decisionRules 7 | CADASIL: avoid diagnostic catheter angiography | 11 of 16 with neurologic symptoms | AHA p.e458, Table 3 |
| decisionRules 8–13 | Antithrombotic and thrombolysis cautions (decision 3b) | COL4A1/2 antithrombotics and IV thrombolysis; CADASIL thrombolysis (EAN vs AHA) and anticoagulation; Fabry thrombolysis; MELAS fibrinolysis | EAN Table 1 (pp.913–914); AHA p.e456, Table 3 |
| initialSteps / disposition / institutionVaries | 2 / 3 / 4 | Links to the standard workups; genetics, specialized center, COL4A1/2 multi-organ workup; local panel details | EAN Table 1, p.921 |
| pearls | 5 | MS misdiagnosis, CADASIL and Fabry yield, 1%–5% of strokes, migraine frequency disagreement | EAN; AHA; Manini |
| verify | 4 | Open items; see README | |
| relatedIds / sources | 3 / 10 | All three ids are in `valid-ids.txt` | |

## keyNumbers (exact copies)
- `[0]` = `workup[2].notes[0]`
- `[1]` = `workup[2].notes[1]`
- `[2]` = `workup[4].notes[0]`
- `[3]` = `differential[7].clues[2]`

## Differences between sources (shown, not resolved)
- Thrombolysis in CADASIL: EAN says no unless a large-artery occlusion from a concurrent cause; AHA says safety and efficacy unknown, case by case (rule 10).
- Migraine frequency in CADASIL: about 30% (AHA) and up to 45% (Manini); no figure in the differential, both in `pearls[4]`.
- COL4A1/2 testing statement: EAN Table 1 and the text version (p.921) differ; the text adds early-onset pontine infarcts (rule 6 note).

## Changed from the workbook (`Genetic_Cerebral_Small_Vessel_Diseases.xlsx`)
- 17 conditions → 15 lines: APP and CST3 merged into hereditary CAA (with ITM2B and TTR added from Manini); Axenfeld-Rieger folded into COL4A1/2 (no source treats it as a separate cause).
- HTRA1 "~5% of hereditary cSVD": found in AHA Table 1 with no cited primary source; dropped at Jason's request.
- CARASAL "no consistent extra-neurologic phenotype": contradicted (therapy-resistant hypertension, sicca syndrome); corrected and moved to the core group.
- Imaging columns (non-hemorrhagic vs hemorrhagic) not kept (option A).
