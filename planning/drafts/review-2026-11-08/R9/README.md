# Review 2026-11-08, item R9: drafts (planning/drafts/review-2026-11-08/R9/)

ESUS: ARCADIA (blocks task 3.9). Approved by Jason in chat 2026-11-10 ("Approve as recommended"): D1 (a) pearl only, `rules[0]` unchanged; D2 (a) AHA 2026 uploaded and checked — it does not cite ARCADIA, so the pearl is ungraded; D3 (a) criteria + primary result only; D4 yes, link `cancer-associated-stroke`; PARK the secondary analyses; assumptions 1–3 accepted. Base: the signed `current.vascular-antithrombotics.esus-antithrombotic.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07). The entry has `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:** ARCADIA goes in as one ungraded pearl. No guideline in hand grades it: AHA 2026 (full text, 121 pages) never mentions ARCADIA or atrial cardiopathy; its graded statement remains §4.8 Rec 5 (antiplatelet in preference to OAC in noncardioembolic AIS/TIA, COR 1, LOE A, p e378), already in `rules[0]`. Kleindorfer 2021 predates the trial.

**Assumptions accepted:**
1. New pearl appended as `pearls[2]`; `lastReviewed` "UNREVIEWED".
2. One MINOR bump to `vascular-antithrombotics`, sequenced after the R2 PR.
3. `verify[]` stays empty.

**Validation actually run** (not only read): the draft was built by script from the base JSON and parsed with zod 3 against `VascularAntithromboticEntry`, using `schema/common.ts`, `schema/vascular-antithrombotics.ts` and the parts of `schema/acute-neuro.ts` it imports (`EvidenceLevel`, `FormularyStatus`, `TreatmentItem`), copied from the project: **PASS**. A registry envelope holding the entry (version 0.15.0) also passed. Three negative controls (bad `evidenceLevel`; source without a year; non-increasing rule order) were rejected, which confirms the check is live. The same script confirmed:
- top-level key order unchanged;
- `rules`, `keyNumbers` and every other base field byte-identical; base items of `searchTerms`, `pearls`, `relatedIds`, `sources` kept in order (appends only);
- both `keyNumbers` are exact copies of `rules[4]`/`rules[5]` condition + ": " + recommendation;
- every `relatedIds` value is in `valid-ids.txt` (checked against the relevant lines copied from the export's list) and none is a removed id;
- base `verify[]` (empty) kept.

`npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: encode the JSON word for word as the full replacement entry, validate, show the diff against the CHANGES file, then apply **one** version bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| Entry file | CHANGES | Findings | Change |
|---|---|---|---|
| `vascular-antithrombotics.esus-antithrombotic.json` | `…CHANGES.md` | F1, F2, D4 | `pearls[2]` ARCADIA (ungraded); 2 search terms; `relatedIds` += cancer-associated-stroke; `sources[2]` Kamel 2024 |

## keyNumbers
- `keyNumbers[0]`: unchanged. Exact copy of `rules[4]` condition + ": " + recommendation.
- `keyNumbers[1]`: unchanged. Exact copy of `rules[5]` condition + ": " + recommendation.
- None added (the ARCADIA result is a null trial result, not a rounds number). Checked by script.

## Version
| registry | from | to | level | why |
|---|---|---|---|---|
| vascular-antithrombotics | 0.14.0 (expected, after R2; the export was 0.13.0) | 0.15.0 | MINOR | New source and evidence statement (ARCADIA); no rule, tier or evidence level changed |

Update `lastUpdated` to the encoding date. No `package.json` bump; no `schemaVersion` change.

**R2 interaction:** R2 also bumps `vascular-antithrombotics` (0.13.0 → 0.14.0). Encode R9 on a branch from `main` **after** the R2 PR has merged, so each item gets its own single bump. If the R2 PR is still open, or the version found isn't 0.14.0, Claude Code stops and asks.

## Open verify[]
- None. The entry had `verify: []` at base and still does.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F1 | `pearls`, `sources` | ARCADIA (apixaban vs aspirin, cryptogenic stroke with atrial cardiopathy; no benefit) not cited | **FIX**: `pearls[2]`, `sources[2]` (D1 a; ungraded per D2) |
| F2 | `searchTerms` | "ARCADIA", "atrial cardiopathy" not searchable | **FIX** |
| D4 | `relatedIds` | No link to `cancer-associated-stroke`, which already mentions ARCADIA | **FIX**: `relatedIds[2]` |
| D1b | `rules[0]` | Adding ARCADIA to the rule's trial parenthetical | **ACCEPT**: not done; trial results go in pearls (R2 rule); rule stays on the graded statement |
| D2 | — | Guideline grade for ARCADIA | **ACCEPT**: none. AHA 2026 does not cite it (full-text search); Kleindorfer 2021 predates it. Pearl ungraded |
| A1 | `rules[0].evidenceNote` | AHA 2026 location of the COR 1, LOE A statement | **ACCEPT**: confirmed §4.8 Rec 5, p e378; wording unchanged |
| A2 | — | sICH 0 vs 7 on aspirin (1.1%/yr); major bleeding 0.7 vs 0.8%/yr (Table 2) | **ACCEPT**: left out (D3 a); authors call the ICH difference possibly chance (p 579) |
| A3 | — | AF found after randomization in 149 (14.7%), median 30 wk; no apixaban benefit in them (HR 0.84; post hoc, p 578) | **ACCEPT**: left out (D3 a); small post hoc analysis |
| A4 | — | Trial exclusions: any AF history, LVEF <30%, creatinine ≥2.5 mg/dL, prior spontaneous ICH; randomized ≤180 d (median 50 d) | **ACCEPT**: not encoded; trial-eligibility detail, not a rounds decision |
| P1 | — | Secondary analyses: ARCADIA-MRI (fewer covert infarcts on apixaban; Lansberg, JAMA Neurol 2025;82:220-227) and a 2025 post hoc LV-systolic-dysfunction analysis (citation not confirmed) | **PARK**: found by web search, not read; outside R9 |
| P2 | `cancer-associated-stroke` | Mentions an "ARCADIA cancer subgroup"; the primary paper reports no cancer subgroup, so it must come from a later analysis | **PARK**: check that entry's source in a later item; outside R9 |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Kamel H, et al. ARCADIA. JAMA 2024;331(7):573-581 (user-supplied PDF, 9 pages, read in full via `pdftotext -layout`). Used: Abstract and Key Points p 573; Methods (Patient Population, Screening and Randomization) p 574; Intervention, Table 1 p 575; Table 2, Results p 577; Results p 578; Figure 3, Discussion p 579.
- Prabhakaran S, et al. AHA/ASA 2026 AIS guideline. Stroke 2026;57:e316-e436 (user-supplied PDF, 121 pages; full-text search). Used: §4.8 Rec 5 (p e378); §4.8 supportive text 5 (p e381, WARSS; the only "cryptogenic" hit).
- Web checks only, not cited in the entry: AHA 2026 abstract and coverage (PubMed 41582814; Practical Neurology 2026-02-05); ESC 2024 ESUS clinical consensus statement (Ntaios, Eur Heart J 2024;45:1701-1715; consensus statement, not graded guideline; not read); ARCADIA secondary analyses (UMN Experts, Weill Cornell VIVO listings).
