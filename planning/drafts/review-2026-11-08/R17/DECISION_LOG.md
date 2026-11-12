## 2026-11-11 — Review item R17 (monogenic small vessel disease entry)

Approved by Jason in chat 2026-11-11 ("Agree with all recommendations", then "Drop HTRA1 5%. Okay for questions 2-4. One rule as drafted for question 5. Question 6 confirmed. Keep Rule 7 and keyNumbers for question 7"). Draft: `planning/drafts/review-2026-11-08/R17/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`. R17 was added by Jason on 2026-11-11 and is not in RESEARCH_BRIEF_2026-11-08.md.

Finding: the app had one differential line and one workup line on genetic stroke causes (`consult-workups:young-stroke-workup`) and no entry for monogenic small vessel disease. Sources, all read in full: Manini and Pantoni (Neurology 2023), Mancuso et al. EAN consensus (Eur J Neurol 2020), Meschia et al. AHA scientific statement (Stroke 2023), Verdura (Ann Neurol 2016), Plaisier (NEJM 2007), Nozaki (Neurology 2015), Moore (AJNR 2003), Konno (Neurology 2018), GeneReviews CBS deficiency (updated 2025-09-25), Testai and Gorelick (Arch Neurol 2010). Web check 2026-11-11 (three searches): no guideline superseding EAN 2020 or AHA 2023 was found; a limited check.

| Draft | Findings | Change |
|---|---|---|
| `consult-workups.monogenic-csvd-workup.json` | A1–A9, K1–K4 | New entry `monogenic-csvd-workup` (VASCULAR): 15 differential lines in three tiers (core arteriopathies: CADASIL, CARASIL, HTRA1 heterozygous, COL4A1/2, PADMAL, HANAC, RVCL-S, Fabry, CARASAL, hereditary CAA; mimics: MELAS, CSF1R; loose fits: DADA2, pseudoxanthoma elasticum, homocystinuria); 12 workup items (MRI pattern, panel, NOTCH3, Fabry enzyme or GLA, homocysteine, m.3243A>G then POLG, eye exam, urine and CK, thin-section CT, MRA/CTA, COL4A1 3′UTR, counseling); 13 decision rules (6 on when to test, 1 on catheter angiography in CADASIL, 6 antithrombotic and thrombolysis cautions); 4 keyNumbers; 5 pearls; 4 verify; 3 relatedIds; 10 sources |

Rules adopted:
- Option A: one `consult-workups` entry; each disease is a `differential[]` line; no schema change. Option C (a per-disease registry) stays open.
- Tier shows by order plus a tag at the start of the first clue ("Mimic:" or "Loose fit:"); `dx` holds the disease name, gene and inheritance only.
- EAN 2020 Delphi statements are `CONSENSUS` with the paper's grade copied as mean score and % voting 4 or 5. AHA 2023 scientific statement items are `NOT_GRADED`.
- Management is limited to antithrombotic and thrombolysis cautions stated by EAN or AHA, held as DecisionRules. Disease-specific treatment is not encoded.
- Where EAN and AHA differ (thrombolysis in CADASIL), one rule shows both and neither is picked.
- `mustNotMiss`: Fabry, COL4A1/2 and homocystinuria. DADA2 is not flagged (the sources read do not cover its treatment).
- Outbound relatedIds only; no existing entry is edited.

Overlap check (C1): <C1>. Rendering check (C2): <C2>.

### Version
| what | from | to | level |
|---|---|---|---|
| consult-workups | <from> | <to> | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- B1: inbound relatedIds from `young-stroke-workup`, `ich-etiology-workup` and `boston-criteria-caa` (add when those entries are next edited).
- B2: disease-specific treatment (Fabry enzyme replacement, MELAS seizure drugs and the valproate contraindication, CBS treatment doses, CADASIL migraine and perioperative targets, pregnancy).
- B3: option C, a per-disease registry.
- B4: GSN (named in AHA Table 1 with no features), FOXC1/PITX2 Axenfeld-Rieger, cerebral cavernous malformations: no source.
- C1: genetic small vessel disease mentions in other entries.

### ACCEPT (not raised again)
- B5: HTRA1 "5% of hereditary CSVD" (AHA Table 1) dropped.
- B6: Axenfeld-Rieger folded into the COL4A1/2 line.
- B7: CARASAL placed in the core group.
- B8: no migraine percentage in the CADASIL line; both figures in pearls.
- B9: antithrombotic and thrombolysis rules held in consult-workups despite the schema header comment; no schema change.
- B10: workbook imaging columns not kept.
- B11: local panel, laboratory and referral details left as institution-varies.
- B12: common knowledge left out (general small vessel imaging definitions, vascular risk factor control, inheritance arithmetic, molecular mechanisms).
- C2 (pending Claude Code's report): rendering of 15 differential lines and the long rule 6.

### Open items
- `verify[]` (4): COL4A1 3′UTR coverage on the local panel; no small vessel MRI pattern for CBS deficiency in the sources; pulvinar sign frequency in later cohorts (Burlina 2008 not read); DADA2 testing and treatment not covered by the sources.
- Jason: clear the verify[] items, review, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R17/README.md`.
