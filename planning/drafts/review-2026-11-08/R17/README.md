# Review 2026-11-08, item R17: drafts (planning/drafts/review-2026-11-08/R17/)

Monogenic cerebral small vessel disease: one new consult-workups entry. R17 was added by Jason on 2026-11-11 and is not in RESEARCH_BRIEF_2026-11-08.md. Approved by Jason in chat 2026-11-11: "Agree with all recommendations", then "Drop HTRA1 5%. Okay for questions 2-4. One rule as drafted for question 5. Question 6 confirmed. Keep Rule 7 and keyNumbers for question 7". The decisions:
- D0 (brief): option A, one `consult-workups` entry, each disease a `differential[]` line; no schema change.
- D1: tier shows by order plus a tag at the start of the first clue. "Mimic:" for MELAS and CSF1R; "Loose fit:" for DADA2, pseudoxanthoma elasticum and homocystinuria; CARASAL in the core group.
- D2: CSF1R and CBS sourced from three uploads (Konno 2018; GeneReviews 2025; Testai 2010).
- D3 (b): antithrombotic and thrombolysis cautions only, as DecisionRules; disease-specific treatment parked.
- D4: id `monogenic-csvd-workup`; title "Suspected monogenic small vessel disease (CADASIL and others)"; category `VASCULAR`.
- D5 (a): outbound relatedIds only; inbound links parked.
- D6: `mustNotMiss` on Fabry, COL4A1/2 and homocystinuria; DADA2 not flagged.
- D7: hereditary CAA as one line with the genes Manini covers (APP, CST3, ITM2B, TTR); cavernous malformations out.
- D8: no migraine percentage in the CADASIL line; pulvinar sign with the Moore count; HTRA1 5% dropped; arc and pulvinar signs kept.
- D9: Axenfeld-Rieger folded into the COL4A1/2 line.
- D10: thrombolysis in CADASIL as one rule showing EAN and AHA.
- D11: EAN Delphi → `CONSENSUS`; AHA scientific statement → `NOT_GRADED`.
- D12: rule 7 (catheter angiography in CADASIL) and four keyNumbers kept.

New entry, so there is no base. `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- **Recognize:** suspect a monogenic cause with a family history, young onset, consanguinity, systemic features or a characteristic imaging pattern. Vascular risk factors and a negative family history do not exclude it.
- **Which gene:**
  - Temporal poles and external capsules, migraine with aura, no systemic disease: CADASIL.
  - Adolescent alopecia and spondylosis: CARASIL (later and milder when heterozygous).
  - Deep hemorrhage with eye, kidney or muscle findings: COL4A1/2. Pontine infarcts at 35–45 y: PADMAL.
  - Retinal vasculopathy with a rim-enhancing mass lesion: RVCL-S.
  - Acroparesthesias, angiokeratomas, kidney and heart disease, pulvinar sign: Fabry.
  - Recurrent lobar hemorrhage before 55 y: hereditary CAA.
- **What to send:** a multigene panel when several diseases fit; NOTCH3 for suspected CADASIL (Pescini ≥15; AHA trigger before 55 y); α-Gal A activity in men and GLA sequencing in women; total homocysteine with amino acids; m.3243A>G in urine then POLG for a stroke-like episode; eye exam, urine, CK, thin-section CT and vessel imaging by indication.
- **Cautions:** no antithrombotics or IV thrombolysis in COL4A1/2 disease; EAN and AHA differ on thrombolysis in CADASIL; thrombolysis is not contraindicated in Fabry; fibrinolysis is not indicated for a MELAS stroke-like episode; avoid diagnostic catheter angiography in CADASIL.
- **Currency check (2026-11-11):** three web searches found no guideline superseding EAN 2020 or AHA 2023. A 2026 narrative review (Practical Neurology, doi 10.1136/pn-2025-004718) turned up on an aggregator page only; it was not verified, read or used.

**Validation actually run** (not only read): the draft was built by script and parsed with zod 4.6.7 against `ConsultWorkupEntry`. It used `consult-workups.ts` (2.1.0) and `common.ts` byte-for-byte from the 2026-11-11 export. `WorkupItem`, `EvidenceLevel` and `DecisionRule` were copied from the Project's `current/schema/acute-neuro.ts` (1.3.0) and `current/schema/vascular-antithrombotics.ts` (1.2.0), dated 2026-11-09; the export did not include those two files, but its manifest lists the same schema versions. Result: **PASS**. A registry envelope holding the entry also passed. Eight negative controls were rejected, which confirms the check is live:
- a source without a year;
- 6 keyNumbers;
- an IF_INDICATED workup item with no indication;
- no mustNotMiss differential;
- non-increasing decisionRules order;
- a malformed relatedId;
- an unknown key;
- an unknown evidenceLevel.

The same script also confirmed:
- top-level key order matches the export entry `young-stroke-workup`;
- all 4 `keyNumbers` are exact copies of a field line (max 5);
- all 3 `relatedIds` are in `valid-ids.txt`;
- no removed id appears anywhere in the JSON and there are no calculatorIds;
- `monogenic-csvd-workup` is not an existing id.

`npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: append the JSON word for word as a new entry, validate, then apply **one** registry bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `consult-workups.monogenic-csvd-workup.json` (+ `…CHANGES.md`) | A1–A9, K1–K4 | New entry: 6 keyHistory, 3 keyExam, 5 redFlags, 15 differential, 12 workup, 13 decisionRules, 2 initialSteps, 3 disposition, 4 institutionVaries, 5 pearls, 4 keyNumbers, 4 verify, 3 relatedIds, 10 sources |
| `DECISION_LOG.md` | | Decision log text, word for word apart from four placeholders |
| `CLAUDE_CODE_PROMPT.md` | | Encoding instructions |

## keyNumbers
- `keyNumbers[0]` (K1): exact copy of `workup[2].notes[0]`.
- `keyNumbers[1]` (K2): exact copy of `workup[2].notes[1]`.
- `keyNumbers[2]` (K3): exact copy of `workup[4].notes[0]`.
- `keyNumbers[3]` (K4): exact copy of `differential[7].clues[2]`.
- All four checked by script; 4 lines, max 5.

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/consult-workups.json` | 3.1.1 (export 2026-11-11) | 3.2.0 | MINOR | New entry |

No `package.json` bump and no schema bump: the entry fits consult-workups 2.1.0. Update `lastUpdated` on `data/consult-workups.json`. If the registry is no longer at 3.1.1, the approved level (MINOR) applies to whatever version is found.

## Open verify[]
All four are in the entry's `verify[]`; they block release until you clear them.
1. Whether the local clinical panel covers the COL4A1 3′UTR miR-29 binding site (PADMAL). Local fact; ask the laboratory.
2. Homocystinuria: neither CBS source describes a small vessel MRI pattern. The line is a loose fit on thromboembolic stroke only.
3. Pulvinar sign frequency in later cohorts: Burlina 2008 (cited by Manini) was not uploaded. The Moore 2003 count is from hemizygous males only.
4. DADA2: ADA2 enzyme testing and treatment are not covered by the sources read.

Open non-verify items, both read-only (report only):
- C1: do other entries hold genetic small vessel disease content that this entry duplicates or contradicts?
- C2: how do the 15 differential lines and the long `decisionRules` lines (rules 6, 7, 10, 11) render?

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| A1 | new entry | No monogenic small vessel disease entry in the app | **FIX** (D0, D4): `consult-workups:monogenic-csvd-workup` |
| A2 | differential[0]–[9] | Core arteriopathies with discriminating clues | **FIX** (D1, D7, D9) |
| A3 | differential[10]–[14] | Mimics and loose fits, tagged in the first clue | **FIX** (D1, D2) |
| A4 | workup[0]–[11] | What to send, with indications | **FIX** |
| A5 | decisionRules 1–6 | When to suspect and test (EAN, AHA) | **FIX** (D11) |
| A6 | decisionRules 7 | Avoid diagnostic catheter angiography in CADASIL | **FIX** (D12) |
| A7 | decisionRules 8–13 | Antithrombotic and thrombolysis cautions | **FIX** (D3, D10) |
| A8 | keyHistory, keyExam, redFlags | Red flags with EAN scores; history and exam clues | **FIX** |
| A9 | pearls, disposition, institutionVaries, initialSteps | Yield figures, referral, local variation, links | **FIX** |
| K1–K4 | keyNumbers | Four glanceable lines | **FIX** (D12): exact copies |
| V1–V4 | verify | See Open verify[] | **FIX**: carried as verify[]; release blocked until cleared |
| W1 | workbook | CARASAL "no consistent extra-neurologic phenotype" | **FIX**: contradicted by Manini p.774 and EAN Table 1; hypertension and sicca encoded |
| W2 | workbook | CARASAL onset seventh decade | **FIX**: confirmed (Manini p.769) |
| W3 | workbook | Pulvinar sign ~20–25% of hemizygous males | **FIX**: Moore count encoded (22 of 94); later cohorts in verify |
| W4 | workbook | CADASIL migraine with aura ~30% | **ACCEPT** (D8, B8): sources differ; no figure in the line, both in pearls |
| W5 | workbook | HTRA1 heterozygous ~5% of hereditary cSVD | **ACCEPT** (D8, B5): in AHA Table 1 with no cited primary source; dropped |
| B1 | other entries | Inbound relatedIds from `young-stroke-workup`, `ich-etiology-workup`, `boston-criteria-caa` | **PARK** (D5): add when those entries are next edited |
| B2 | not encoded | Disease-specific treatment: Fabry enzyme replacement; MELAS seizure drugs and valproate contraindication; CBS doses; CADASIL migraine drugs, donepezil, perioperative targets (MAP >60 mm Hg, end-tidal CO2 about 40 mm Hg); pregnancy | **PARK** (D3) |
| B3 | registry design | Option C, a per-disease registry like neural-antibodies | **PARK** (D0) |
| B4 | not encoded | GSN (AHA names the gene only); FOXC1/PITX2 Axenfeld-Rieger; cerebral cavernous malformations | **PARK** (D7): no source uploaded |
| B5 | differential[2] | HTRA1 5% figure dropped | **ACCEPT** |
| B6 | differential[3] | Axenfeld-Rieger folded into COL4A1/2 | **ACCEPT** (D9) |
| B7 | differential[8] | CARASAL in the core group though fewer than 20 cases are reported | **ACCEPT** (D1) |
| B8 | differential[0], pearls[4] | Migraine frequency: 30% (AHA) vs up to 45% (Manini) | **ACCEPT**: both shown in pearls |
| B9 | schema header | consult-workups says "diagnosis and disposition only", but rules 8–13 are treatment cautions | **ACCEPT** (D3): DecisionRules are the only fit; no schema change proposed |
| B10 | not encoded | Workbook imaging columns (non-hemorrhagic vs hemorrhagic) | **ACCEPT** (D0) |
| B11 | institutionVaries | Panel, laboratory, assay and referral details | **ACCEPT**: INSTITUTION_VARIES, no local detail |
| B12 | not encoded | Common knowledge: general small vessel imaging definitions, vascular risk factor control, inheritance arithmetic, molecular mechanisms | **ACCEPT**: left out as you asked |
| B13 | decisionRules 6 | EAN Table 1 statement and the text version (p.921) differ; pontine infarcts only in the text | **ACCEPT**: both cited in the note |
| B14 | not encoded | Mancuso Table 2 (feature matrix) reads as scrambled columns in text extraction; nothing taken from it | **ACCEPT**: clues come from the paper's text and Table 1 |
| B15 | not encoded | Manini online supplement (eTables 1–3) not uploaded | **ACCEPT**: print tables and text used |
| C1 | other entries | Genetic small vessel disease mentions elsewhere (`young-stroke-workup` differential[8], workup[13]; `cns-vasculitis-workup` differential[7]) | **PARK**: Claude Code reports read-only |
| C2 | rendering | 15 differential lines; long rule lines | **ACCEPT**: Claude Code reports read-only |

No PARK item needs action now.

## Sources used (attached to the planning chat)
All ten were read in full as extracted text (reference lists excluded). Page numbers are printed journal pages unless stated; the cited statements were located on their PDF pages by script (Manini: 31 phrases; the other sources: the phrases behind each cited number or recommendation).
- Manini A, Pantoni L. Genetic Causes of Cerebral Small Vessel Diseases. Neurology 2023;100:766-783. doi:10.1212/WNL.0000000000201720.
  - Used: abstract p.766; Table 1 (pp.768–769); text pp.769–771, 774–775, 778, 781–782; Tables 2–5.
- Mancuso M, et al. Monogenic cerebral small-vessel diseases: EAN consensus recommendations. Eur J Neurol 2020;27:909-927. doi:10.1111/ene.14183.
  - Used: consensus definition p.911; Table 1 (pp.912–915), scores read from the layout-preserved extraction; disease sections pp.918–926. Table 2 (p.916) not used.
- Meschia JF, et al. Management of Inherited CNS Small Vessel Diseases: The CADASIL Example. Stroke 2023;54:e452-e464. doi:10.1161/STR.0000000000000444.
  - Used: p.e452; Table 1 (p.e454); pp.e455–e456, e458; Table 3 (p.e460). No COR/LOE grades in this document.
- Verdura E, et al. Ann Neurol 2016;80:741-753. doi:10.1002/ana.24782. Used: pp.746, 748–750.
- Plaisier E, et al. N Engl J Med 2007;357:2687-2695. Used: pp.2688–2691, Table 1.
- Nozaki H, et al. Neurology 2015;85:459-463. Used: pp.460, 462.
- Moore DF, et al. AJNR Am J Neuroradiol 2003;24:1096-1101. Used: abstract; Results pp.1097–1098.
- Konno T, et al. Neurology 2018;91:1092-1104. doi:10.1212/WNL.0000000000006642. Used: pp.1093–1096.
- Sacharow SJ, Levy HL. Homocystinuria due to Cystathionine Beta-Synthase Deficiency. GeneReviews, updated 2025-09-25. Used: Suggestive Findings and Table 1 (PDF p.4), Clinical Description (PDF pp.7–8), Differential Diagnosis (PDF p.10), Table 5 (PDF p.13).
- Testai FD, Gorelick PB. Arch Neurol 2010;67(2):148-153. Used: pp.148–149.
- Not a source: `Genetic_Cerebral_Small_Vessel_Diseases.xlsx` (Project file) was the starting list only; nothing is encoded from it without a source location.
- Web check only, not cited in the entry (2026-11-11): three searches for newer monogenic small vessel disease or CADASIL guidance.
