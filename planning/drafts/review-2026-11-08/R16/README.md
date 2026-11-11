# Review 2026-11-08, item R16: drafts (planning/drafts/review-2026-11-08/R16/)

Boston criteria v2.0 for CAA (task 4.6): one new reference card. Approved by Jason in chat 2026-11-11: "Approve as recommended". The decisions:
- D1: new reference card `reference-cards:boston-criteria-caa`; criteria and definition rows `TARGET`, accuracy rows `EVIDENCE_SUMMARY`, all `NOT_GRADED`.
- D2: cite the published version. The first draft cited the author manuscript with two `verify[]` items; Jason then uploaded the published article (Leiden repository copy, publisher's version), the card was re-cited to it, and both items were closed. `verify: []`.
- D3: the two pathology-based categories share one row.
- D4: accuracy = autopsy subgroup only, three rows for probable CAA.
- D5: Kropp 2026 (Neurology, memory-clinic validation) PARKed; seen by search snippet only.
- D6: Edinburgh CT criteria PARKed; would need Rodrigues 2018.
- Assumptions accepted: "I lobar" in the manuscript table is "1"; three `relatedIds`, with `aria-anti-amyloid` parked until R14 merges; no existing entry is edited.

New entry, so there is no base. `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- **Applies to:** age ≥50 with spontaneous ICH, TFNE, or cognitive impairment/dementia.
- **Probable CAA:** ≥2 strictly lobar hemorrhagic lesions on T2* MRI (ICH, microbleed, cSS/cSAH foci, any combination), or 1 lobar hemorrhagic lesion + 1 white matter feature.
- **Possible CAA:** 1 strictly lobar hemorrhagic lesion, or 1 white matter feature.
- **Exclusions:** any deep ICH or microbleed; another cause of the hemorrhagic lesions. Cerebellar lesions count as neither lobar nor deep.
- **White matter features:** severe CSO-PVS (>20 in one hemisphere); WMH multispot (>10 small subcortical lesions, both hemispheres).
- **cSS counting:** multifocal (separated gyri or ≥3 adjacent gyri) counts as ≥2 lesions; acute cSAH near cSS counts as 2.
- **Accuracy, probable CAA vs autopsy:** all 74.5% / 95.0%; ICH presentation 90.2% / 92.9%; non-ICH 55.1% / 96.2% (sensitivity / specificity).
- **Currency check (2026-11-11, web search, snippets only):** no newer version of the Boston criteria found. One later validation study found (Kropp 2026, memory clinic); not read, not encoded.

**Validation actually run** (not only read): the draft was built by script and parsed with zod 3 against `ReferenceCard`. Result: **PASS**; a registry envelope holding the card also passed. Six negative controls were rejected (a source without a year, 6 keyNumbers, a graded EVIDENCE_SUMMARY row, a malformed relatedId, an unknown key, an invalid role), which confirms the check is live. Limits of that check:
The check was re-run after the revision to the published article (PASS, same controls).
- `schema/common.ts` was copied verbatim from the project. `schema/reference-cards.ts` (1.1.0) was retyped with the same logic and the comments trimmed. `acute-neuro.ts` was a stub holding only the verbatim `EvidenceLevel` enum, as in R12.
- The `relatedIds` check ran against a subset of `valid-ids.txt` retyped from the project file (the three linked ids and the four reference-card ids).

The same script confirmed:
- top-level key order matches `ReferenceCard` and the R12 card;
- all 5 `keyNumbers` are exact copies of a row's `parameter` + ": " + `target` (max 5);
- all 3 `relatedIds` are valid, and `boston-criteria-caa` is not an existing reference-card id;
- no removed id appears in the JSON.

`npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: append the JSON word for word as a new entry, validate, run the read-only C1 and C2 checks, then apply **one** registry bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `reference-cards.boston-criteria-caa.json` (+ `…CHANGES.md`) | N1–N5, K1–K5, V1–V3 | New card: 3 sections, 12 rows (criteria 5, lesion definitions 4, accuracy 3), 5 pitfalls, 5 keyNumbers, no verify items, 3 relatedIds, 1 source |

## keyNumbers
- `keyNumbers[0]` (K1): exact copy of `sections[0].rows[1]` `parameter` + ": " + `target`.
- `keyNumbers[1]` (K2): exact copy of `sections[0].rows[2]` `parameter` + ": " + `target`.
- `keyNumbers[2]` (K3): exact copy of `sections[1].rows[0]` `parameter` + ": " + `target`.
- `keyNumbers[3]` (K4): exact copy of `sections[1].rows[1]` `parameter` + ": " + `target`.
- `keyNumbers[4]` (K5): exact copy of `sections[1].rows[2]` `parameter` + ": " + `target`.
- All five checked by script; 5 lines, max 5. Prefix rule as adopted in R5.

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/reference-cards.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | New entry |

No `package.json` bump and no schema bump (fits reference-cards 1.1.0 row-list sections). Update `lastUpdated` on `data/reference-cards.json`.

**Sequencing:** R5 and R12 also bump `data/reference-cards.json`. Encode R16 after those PRs merge so each item gets its own single bump. If either is still open, Claude Code stops and asks.

## Open verify[]
- None. `verify: []`. The release is blocked only by `lastReviewed: "UNREVIEWED"` until you sign off.
- V1 and V2 from the first draft (manuscript citations; cut-off footnote) were closed against the published article on 2026-11-11. They were never encoded in the repo.

Open non-verify items, both read-only (report only):
- C1: how do `TARGET` rows holding diagnostic criteria, and the `EVIDENCE_SUMMARY` accuracy rows, render?
- C2: do `consult-workups:caa-related-inflammation` or other entries already contain Boston criteria content that this card duplicates or contradicts?

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| N1 | new card | No Boston criteria content in the app; `ich-etiology-workup` only names CAA in its differential | **FIX** (D1): `reference-cards:boston-criteria-caa` |
| N2 | sections[0] | Criteria: who they apply to, probable, possible, exclusions, pathology categories | **FIX** (D3): 5 rows |
| N3 | sections[1] | Definitions: severe CSO-PVS >20; WMH multispot >10; multifocal cSS; acute cSAH near cSS | **FIX**: 4 rows |
| N4 | sections[2] | Accuracy vs autopsy for probable CAA: all, ICH, non-ICH | **FIX** (D4): 3 rows |
| N5 | pitfalls | Mixed lobar + deep; unvalidated groups; white cohort; MRI sequences; spectrum bias | **FIX**: 5 pitfalls |
| K1–K5 | keyNumbers | Five glanceable lines | **FIX**: exact copies |
| V1 | all rows | First draft cited the author manuscript; published labels differ (Panel p.720; Table 4 p.722) | **FIX** (D2): re-cited to the published article; verify item closed |
| V2 | sections[0].rows[3] | Footnote cut off in the manuscript | **FIX**: published footnote ‡ (p.720) added as `notes[2]`; verify item closed |
| V3 | sections[1].rows[1]–[2] notes | Two wording differences between manuscript and published text ("will require" replication; "an adjacent gyrus") | **FIX**: published wording followed |
| B1 | Panel | Manuscript printed "I lobar"; the published Panel prints "One" | **ACCEPT**: assumption confirmed; encoded as 1 |
| B2 | role | No "criterion" role in the schema; `TARGET` used | **ACCEPT** (D1): no schema change proposed; rendering reported in C1 |
| B3 | not encoded | Probable+possible accuracy (autopsy 88.2% / 70.0%); whole-sample, derivation and validation figures | **PARK** (D4): one row each if wanted |
| B4 | not encoded | v1.5 comparison (autopsy sensitivity 64.5% vs 74.5%) and what changed from v1.5 | **ACCEPT**: left out as common knowledge |
| B5 | not encoded | Kropp 2026, Neurology, memory-clinic validation (doi:10.1212/WNL.0000000000218314, from a search snippet) | **PARK** (D5): not read; upload to add |
| B6 | not encoded | Edinburgh CT criteria (named in the Discussion only) | **PARK** (D6): needs Rodrigues 2018 |
| B7 | not encoded | Post-hoc markers: lobar lacunes, superficial cerebellar microbleeds (reclassified no one) | **ACCEPT**: not part of the criteria |
| B8 | not encoded | Odds ratios (Table 4), inter-rater kappas, study design, Vonsattel thresholds, CAA pathophysiology | **ACCEPT**: not a rounds lookup |
| B9 | not encoded | Amyloid PET and CSF amyloid-β "not yet validated" | **PARK**: one pitfall line if wanted |
| B10 | not encoded | Supplementary material (rating details, Supplementary Tables 1–3) | **ACCEPT**: not attached; main text only |
| B11 | relatedIds | Link to `consult-workups:aria-anti-amyloid` | **PARK**: id not in `valid-ids.txt` until R14 merges |
| B12 | other entries | Back-links to the card from `ich-etiology-workup`, `caa-related-inflammation`, `restart-antithrombotic-after-ich` | **PARK**: would un-sign those entries |
| C1 | rendering | `TARGET` and `EVIDENCE_SUMMARY` rows for criteria and accuracy | **ACCEPT**: Claude Code reports read-only |
| C2 | other entries | Possible Boston criteria content in `caa-related-inflammation` (not in the export) | **PARK**: Claude Code reports read-only |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Charidimou A, et al. The Boston criteria version 2.0 for cerebral amyloid angiopathy. Lancet Neurol 2022;21(8):714-725. doi:10.1016/S1474-4422(22)00208-3. Published article (publisher's version, Leiden repository copy; 13 PDF pages = cover + pp.714–725). **This is the cited version.**
  - Read via `pdftotext`: abstract, Research in context, Methods, Results, Panel and footnotes, Tables 2–4, Figure 1 legend and Discussion read in full. Table 1 (baseline characteristics), contributors, declarations and references were skimmed. Figure 1 was read from its legend, not graded from the image.
  - Used: Methods pp.716–717; Figure 1 p.717; Results pp.718, 721; Panel p.720; Table 4 p.722; Discussion pp.722–724.
  - Appendix (supplementary material) not attached and not used.
- The same paper as the NIH author manuscript (PMC, 24 pages), read in full for the first draft; Table 2 (ms p.21) also viewed as a page image. Superseded by the published article; not cited.
- Web check only, not cited in the card (2026-11-11):
  - One search for a newer version of the criteria: none found.
  - One fetch of the published article on the Leiden repository, summarized by a tool. Superseded by the uploaded article.
  - Kropp 2026 seen as a search snippet only.
