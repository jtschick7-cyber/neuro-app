# Review 2026-11-08, item R12: drafts (planning/drafts/review-2026-11-08/R12/)

Neuroprognostication card (task 4.2): one new reference card covering the five NCS GRADE neuroprognostication guidelines outside cardiac arrest (timing, which predictors are moderately reliable or not reliable, and the good-practice statements specific to each disease). Approved by Jason in chat 2026-11-10: "approve as recommended" — D1 (a) reference card with row-list sections; D2 ICH, AIS, SE, GBS + TBI, cardiac arrest linked only, aSAH skipped; D3 (a) one collapsed NOT_RECOMMENDED row per outcome; D4 keep disease-specific GPS, cut generic GPS and AIS Table 6; D5 EGRIS/EGOS/mEGOS point tables in notes, no calculator; D6 grade mapping below; D7 role mapping below; D8 back-links PARKed; assumptions 1–2 accepted. New entry, so there is no base. `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- The NCS neuroprognostication series also has **AIS** (Mainali 2026) and **moderate–severe TBI** (Muehlschlegel 2024); both are on the card.
- No NCS neuroprognostication guideline for **aSAH** was found (two web searches, 2026-11-10). The NCS 2023 aSAH guideline (Treggiari, doi:10.1007/s12028-023-01713-5) covers management, not prognosis.
- Post–cardiac arrest (Rajajee 2023) stays in `consult-workups:post-cardiac-arrest-prognostication`; the card links to it.
- Across all five guidelines, no predictor or model is rated "reliable". The moderately reliable ones are ENI (AIS, for a good outcome); bulbar or limb weakness, EGRIS, EGOS and mEGOS (GBS); bilateral nonreactive pupils on admission, CRASH and IMPACT (TBI). There are none for ICH or SE.
- Timing: ICH ≥48–72 h (conditional); TBI ≥3 days, ideally 1–2 weeks; SE defer until the etiology workup is done; AIS no fixed window.

**Rules applied (D6, D7):**
- Weak recommendation → `WEAK`; "strong recommendation, evidence cannot be graded / not graded" (GPS) → `STRONG`; Hwang GPS #1 "conditional recommendation, evidence not graded" → `WEAK`. The source wording is copied word for word into `evidenceNote`.
- Moderately reliable predictor or model → `RECOMMENDED`; not reliable → `NOT_RECOMMENDED`; GPS → `RECOMMENDED`.
- Claude Code checks this mapping against `post-cardiac-arrest-prognostication` (C1, read-only).

**Validation actually run** (not only read): the draft was parsed with zod 3 against `ReferenceCard`. The check used `schema/reference-cards.ts` and `schema/common.ts` copied verbatim from the export packet, plus a stub `acute-neuro.ts` holding only the verbatim `EvidenceLevel` enum (the only import reference-cards uses). Result: **PASS**, including the card-level rule that every row source appears in `sources[]`. A deliberately broken copy (a row source without a year, not in `sources[]`, and 6 keyNumbers) failed, which confirms the check is live. A script also confirmed:
- top-level key order matches `ReferenceCard` and the R5 card;
- every `keyNumbers` line is an exact copy of a row's `parameter` or `condition` + ": " + `target`; 5 lines, max 5;
- all 4 `relatedIds` are in `valid-ids.txt`; no removed id is referenced (the "ICH score" search term is text, not an id).

`npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: append the JSON word for word as a new entry, validate, run the read-only C1 and C2 checks, then apply **one** registry bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `reference-cards.neuroprognostication.json` (+ `…CHANGES.md`) | N1–N7, K1–K5, V1–V2 | New card: 5 sections, 26 rows (ICH 4, AIS 7, SE 5, GBS 6, TBI 4), 4 pitfalls, 5 keyNumbers, 2 verify items, 4 relatedIds, 5 sources |

## keyNumbers
- `keyNumbers[0]` (K1): exact copy of ICH `rows[0]` `condition` + ": " + `target`.
- `keyNumbers[1]` (K2): exact copy of TBI `rows[0]` `condition` + ": " + `target`.
- `keyNumbers[2]` (K3): exact copy of AIS `rows[0]` `parameter` + ": " + `target`.
- `keyNumbers[3]` (K4): exact copy of GBS `rows[1]` `parameter` + ": " + `target`.
- `keyNumbers[4]` (K5): exact copy of SE `rows[0]` `condition` + ": " + `target`.
- All five checked by script. This uses the prefix rule adopted in R5 (decision log 2026-11-09).

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/reference-cards.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | New entry |

No `package.json` bump and no schema bump (fits reference-cards 1.1.0 row-list sections). Update `lastUpdated` on `data/reference-cards.json`. R5 also bumps `data/reference-cards.json`: if the R5 PR is still open, Claude Code stops and asks about merge order.

## Open verify[]
- V1: Mainali 2026 ASTRAL grade — Table 3 #10 (p.752) states moderate quality evidence; PICO 10 text (p.758) states low quality evidence.
- V2: Muehlschlegel 2024 Helsinki CT model for poor outcome at 6 months (p.473) is printed as "strong recommendation; low-quality evidence", unlike every other predictor. Check for an erratum.
- Both keep the release blocked until you resolve them (`npm run release` fails on open verify[]).
- Open non-verify items: C1 (evidence and role mapping vs the cardiac-arrest entry) and C2 (does the GBS entry already contain EGRIS/EGOS/mEGOS?). Both are read-only; report only.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| N1 | new card | No home for neuroprognostication outside cardiac arrest | **FIX** (D1 a): `reference-cards:neuroprognostication` |
| N2 | sections[0] | ICH: 48–72 h deferral, recovery horizon, nothing reliable | **FIX**: 4 rows |
| N3 | sections[1] | AIS: ENI moderately reliable; GPS 6, 7, 8–9, 10; nothing else reliable | **FIX**: 7 rows (approved row 8 split in two) |
| N4 | sections[2] | SE: defer for etiology; disease-specific predictors; confounders; RSE/SRSE counseling; nothing reliable | **FIX**: 5 rows |
| N5 | sections[3] | GBS: bulbar/limb weakness, EGRIS, EGOS, mEGOS moderately reliable; GPS 2 | **FIX** (D5): 6 rows (approved row 18 split in two), point tables in notes |
| N6 | sections[4] | TBI: timing; pupils; CRASH/IMPACT; nothing else reliable | **FIX** (D2): 4 rows |
| N7 | pitfalls | No "reliable" predictor; meaning of moderately reliable; EGRIS miscalibration; age >85 after EVT | **FIX**: 4 pitfalls; `pitfalls[1]` also carries the companion sentence that probability models may be used alone |
| K1–K5 | keyNumbers | Five glanceable numbers | **FIX**: exact copies |
| V1 | AIS models row | ASTRAL grade inconsistent within the guideline | **FIX**: both grades shown in `evidenceNote`; `verify[0]` |
| V2 | TBI not-reliable row | Helsinki printed as "strong recommendation" | **FIX**: printed grade shown; `verify[1]` |
| C1 | evidenceLevel / role | Mapping of GPS → STRONG and reliability → role; the cardiac-arrest entry wasn't in the export | **ACCEPT**: as approved (D6, D7); Claude Code reports any mismatch read-only |
| C2 | acute-neuro:guillain-barre-syndrome | Possible duplicate EGRIS/EGOS content; entry not in the export | **PARK**: Claude Code reports read-only |
| D8 | other entries | Back-links from the GBS, RSE/SRSE and cardiac-arrest entries | **PARK** |
| S1 | — | aSAH: no NCS neuroprognostication guideline found | **ACCEPT**: finding; no section |
| A1 | — | Generic GPS (complete clinical condition; confounders, where generic; baseline function and comorbidities; acceptable outcomes; no nihilism/anecdote): AIS 1–5, ICH 2–3, SE 1, TBI 1 and 3, GBS 1 and 3 | **ACCEPT** (D4): common knowledge; not encoded |
| A2 | — | AIS Table 6 recovery by deficit (p.757) | **ACCEPT** (D4): not encoded |
| A3 | — | Reliability definitions (Table 1 in each guideline) | **ACCEPT** (assumption 2): only the counseling consequence is in `pitfalls[1]` |
| A4 | — | "Not-reliable variables may still sit inside a reliable or moderately reliable model" (Madzar p.367) | **PARK**: drafted, then removed as beyond the approved pitfalls; can be revived |
| A5 | — | GBS disability scale (Busl Table 2, p.568), needed to score EGOS | **PARK**: assumed known; can be added as an EGOS note |
| A6 | — | Supplementary appendices (ICH 30-day variable details; AIS glucose/collateral rationale) | **ACCEPT**: not uploaded; only main-text statements encoded |
| A7 | — | Calculators for EGRIS/EGOS/mEGOS/CRASH/IMPACT | **PARK** (D5): separate item if wanted |
| A8 | — | Guideline currency | **ACCEPT**: uploads are the published versions (GBS is the 2023 corrected publication); AIS and SE are 2026. No erratum search done beyond V1–V2 |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Hwang DY, et al. Neurocrit Care 2024;40:395–414 (ICH; uploaded PDF, 20 pages). Used: Table 2 p.401; GPS rationale p.402; "How to use" p.398.
- Mainali S, et al. Neurocrit Care 2026;44:745–769 (AIS; uploaded PDF, 25 pages). Used: Table 3 p.752, Table 4 p.753, Table 5 p.753, PICO 1 rationale p.753, PICO 10 p.758.
- Madzar D, et al. Neurocrit Care 2026;44:365–383 (SE; uploaded PDF, 19 pages). Used: "How to use" p.367; GPS and rationale pp.373–374; Table 3 p.380; pp.380–381.
- Busl KM, et al. Neurocrit Care 2023;38:564–583 (GBS, corrected publication; uploaded PDF, 20 pages). Used: "How to use" p.567; GPS p.571; recommendations pp.572–579; Tables 4–6 pp.576–578.
- Muehlschlegel S, et al. Neurocrit Care 2024;40:448–476 (moderate–severe TBI; uploaded PDF, 29 pages). Used: abstract p.448; "How to use" p.451; Table 2 p.454; GPS p.464; recommendations pp.464–474.
- Reading: all recommendation statements, good-practice statements and their rationales, score tables and "How to use" sections were read in full. The GRADE evidence-profile tables and some background text were skimmed, not read line by line. Text was extracted with `pdftotext` (layout and raw modes); page numbers come from the PDF page breaks offset to journal pagination.
- Web check only, not cited in the entry: two searches for an NCS aSAH neuroprognostication guideline (none found); the NCS 2023 aSAH management guideline (Treggiari) was identified.
