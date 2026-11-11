# Review 2026-11-08, item R3: drafts (planning/drafts/review-2026-11-08/R3/)

Hyponatremia: source the stricter ODS-risk correction limit. Approved by Jason in chat 2026-11-09 ("approve as recommended", decisions 1–5). Base: the signed `current.acute-neuro.hyponatremia-ods.json` and `calculators-excerpt.ts` from the review-2026-11-08 export packet (entry lastReviewed 2026-11-07). The entry has `lastReviewed: "UNREVIEWED"`.

**Answer to the brief's question:** ESE 2014 does not state an 8 mmol/L first-24-h limit for high-risk patients, in any graded recommendation or in the rationale. The stricter limit comes from Verbalis 2013 (US expert panel, S21), worded as "8 mmol/L in **any** 24-hour period", with its own high-risk list (Table 3, S20) and a 4–6 mmol/L/day goal. Verbalis grades nothing (S6). The calculator logic already matches: with ODS risk it applies 8 in every period (Verbalis), otherwise 10 then 8 (ESE). **Logic unchanged.**

**Validation actually run** (not only read): the draft was parsed with zod 3 against `AcuteNeuroEntry`, using `schema/common.ts` and `schema/acute-neuro.ts` copied verbatim from the export packet: **PASS**. A deliberately broken copy (bad `evidenceLevel`) failed, which confirms the check is live. A script also confirmed:
- top-level and nested key order is unchanged;
- every `keyNumbers` line is an exact copy of a field (4 lines, max 5);
- both `relatedIds` and `calc:sodium-correction` are in `valid-ids.txt` (checked against the acute-neuro and calc lines of that file);
- no removed id is referenced;
- the base `verify[]` (empty) is kept.

The calculator excerpt was checked by reading only; it isn't compiled. `npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: encode the JSON word for word as the full replacement entry, apply the calculator edits in `calculators-excerpt.proposed.ts`, validate, show the diffs against the CHANGES file, then apply **one** registry bump and one app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `acute-neuro.hyponatremia-ods.json` (+ `…CHANGES.md`) | F1–F3, F6–F8 | `definitions[1]` re-attributed to Verbalis 2013 ("any 24 h", goal 4–6, Table 3 risk list), `keyNumbers[2]` exact copy; `immediateActions[2].action` sourced (ESE 2D; Verbalis q4–6h if Na ≤120), `keyNumbers[3]` exact copy; `treatment[1].evidenceNote[1]` Verbalis re-lowering note; `pitfalls[2]` deleted; `sources[3]` Verbalis 2013 |
| `calculators-excerpt.proposed.ts` | F4, F5 | `sodiumCorrectionCheck` docstring; warning string attribution; `CALCULATOR_META["sodium-correction"]` `formula` and `sources` (+ new `S.verbalis2013`). Logic unchanged |

## keyNumbers
- `keyNumbers[0]`: unchanged; exact copy of `immediateActions[0].action`.
- `keyNumbers[1]`: unchanged; exact copy of `definitions[0]`.
- `keyNumbers[2]`: changed (F1, F2); exact copy of `definitions[1]`.
- `keyNumbers[3]`: changed (F7); exact copy of `immediateActions[2].action`.
- All four checked by script.

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/acute-neuro.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | Threshold statement re-attributed and reworded ("any 24 h", Table 3 list, goal); new source; monitoring interval added |
| `package.json` app version | as found | next PATCH | PATCH | `src/lib/calculators.ts` changed (docstring, warning text, META); no formula, cap or rounding change. Per VERSIONING.md "Code or UI changes" |

Update `lastUpdated` on `data/acute-neuro.json` to the encoding date. Calculator META is part of the content hash, so `contentVersion` changes at `build:about`.

## Open verify[]
- None. The entry had `verify: []` at base and still does.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F1 | `definitions[1]` | Stricter limit had no source; ESE 2014 has no first-24-h high-risk limit; Verbalis S21 says "8 mmol/L in any 24-hour period" for Table 3 high risk | **FIX**: re-attributed to Verbalis 2013, "any 24 h", Table 3 list (adds Na ≤105; liver disease → advanced liver disease, no longer "commonly added"), goal 4–6 mmol/L/day (decision 1), labelled ungraded |
| F2 | `keyNumbers[2]` | Truncated copy of `definitions[1]` | **FIX**: exact copy of the new field |
| F3 | `sources` | Verbalis 2013 not cited | **FIX**: `sources[3]` |
| F4 | calculator docstring, META `formula`/`sources` | Stricter limit attributed to ESE 2014 | **FIX**: Verbalis 2013 attribution; `S.verbalis2013` added; logic unchanged (already matches both sources) |
| F5 | calculator warning string | Cites ESE for re-lowering at a first-24-h rise of 9–10 with ODS risk, which ESE doesn't advise | **FIX**: "(ESE 2014; ODS risk: Verbalis 2013)" (decision 4 b); test expectation updated only if it asserts this string |
| F6 | `pitfalls[2]` | Unsourced duplicate risk list; "Na ≤120" conflicts with Table 3 (≤105) | **FIX**: deleted (decision 2 b) |
| F7 | `keyNumbers[3]`, `immediateActions[2]` | Truncated copy; "(more often in high-risk)" unsourced | **FIX**: field sourced (ESE 7.1.2.5 2D; Verbalis S21 q4–6h until ≥125 if Na ≤120), keyNumber exact copy (decision 3 c) |
| F8 | `treatment[1].evidenceNote` | Re-lowering note ESE-only | **FIX**: `evidenceNote[1]` Verbalis S21 (decision 5); `evidenceLevel` stays WEAK |
| A1 | `definitions[1]` | ESE's risk-factor list differs (alcohol abuse, liver disease, thiazides/antidepressants, degree and duration; G31, G36) | **ACCEPT**: ESE sets no separate limit for them; the line keeps the list that goes with the limit |
| A2 | `definitions[0]`, `keyNumbers[1]` | "(1D) … until Na 130" | **ACCEPT**: matches ESE 7.1.2.4; 7.2.1.6 is the same limit at 2D |
| A3 | `definitions[1]` | Verbalis limits are for chronic hyponatremia | **ACCEPT**: "chronic" left out as common knowledge |
| A4 | entry, calculator | Verbalis normal-risk limits (10–12/24 h, 18/48 h); no limit in true acute hyponatremia; calculator has no 48-h check | **ACCEPT**: ESE governs normal risk in the entry; outside R3 |
| A5 | — | Newer guideline? | **ACCEPT**: none found (web check 2026-11-09: no ESE update; no newer comprehensive US guideline) |
| A6 | — | Observational data questioning strict limits (MacMillan 2023, Seethapathy 2023, Chauhan 2025 meta-analysis; Sterns 2026 AJKD review defends caution) | **ACCEPT**: not guidelines, not read in full; not encoded |
| A7 | `sources[3]` | Verbalis 2013 funded by an unrestricted Otsuka (tolvaptan) grant (CME page) | **ACCEPT**: context only |
| C1 | calculator UI | Whether the calculator screen lists ODS risk factors (not in the export) | **Check**: Claude Code reports; if it lists factors that differ from Table 3, stop and ask. No edit in R3 |

No PARK items.

## Sources used (attached to the planning chat)
- Spasovski 2014 ESE/ESICM/ERBP hyponatraemia guideline (Eur J Endocrinol 170:G1–G47), read in full: 7.1 recommendations and rationale (G28–G32), 7.2 (G32), 7.3–7.4 (G33), chronic rationale (G36–G37), 7.5 (G38–G39).
- Verbalis 2013 US expert panel (Am J Med 126 Suppl, S1–S42), read in full: Level of Evidence (S6); rate-of-correction text, Figure 3 (S19); Table 3 and goals (S20); recommendation boxes "Avoiding ODS" and "Managing Excessive Correction" (S21); K repletion (S24–S25).
- Web checks only, not cited in the entry: ESE guideline currency (ESE publication page; NDT/ICM co-publications 2014); US guideline currency (iatroX US summary, 2026 source check); observational studies via CCJM letter 2024 and Sterns & Rondon-Berrios, AJKD 2026.
- Note for future items: in text extraction of both PDFs, "μg" renders as "mg" (desmopressin 2 μg / 2–4 μg). Not encoded here.
