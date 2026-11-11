Encode the approved R3 content draft in `planning/drafts/review-2026-11-08/R3/`. Read that folder's `README.md` first. It lists the one entry, the calculator edits, the version bumps, the open verify items (none) and the complete Disposition Ledger. Every item is FIX, ACCEPT or a check (C1); there are no PARK items.

This is an approved content change, so the CLAUDE.md rules against editing `data/*.json` and `src/lib/calculators.ts` don't apply to the edits listed here. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r3-2026-11-09` from current `main`, and put the R3 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm two things; if either has drifted, stop and tell me:
   - `hyponatremia-ods` in `data/acute-neuro.json` still matches the base in the CHANGES file (the "current" column, `lastReviewed` 2026-11-07).
   - `sodiumCorrectionCheck` and `CALCULATOR_META["sodium-correction"]` in `src/lib/calculators.ts` still match `planning/drafts/review-2026-11-08/current/calculators-excerpt.ts`.
   Record the current `data/acute-neuro.json` `version` and the `package.json` `version`.
2. Replace the entry with `id` `hyponatremia-ods` in `data/acute-neuro.json` with `acute-neuro.hyponatremia-ods.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT.
3. In `src/lib/calculators.ts`, make exactly the four edits shown in `calculators-excerpt.proposed.ts`, word for word:
   - the `sodiumCorrectionCheck` docstring;
   - the warning string (attribution only);
   - `CALCULATOR_META["sodium-correction"].formula`;
   - `CALCULATOR_META["sodium-correction"].sources` → `[S.ese2014, S.salsa2021, S.verbalis2013]`, adding `verbalis2013` to the same source-constant object that holds `ese2014`, in the same shape as its neighbours, with the exact string from the entry's `sources[3]`. If the source constants aren't a simple map you can extend that way, stop and ask.
   Don't change the limit logic, ranges, rounding or any other calculator. In `__tests__/calculators.test.ts`, update an expectation only if it asserts the old warning string or old META text; don't add or remove tests.
4. C1 check: find where the sodium-correction calculator's `odsRisk` input is labelled or explained in the UI. Report the exact label/help text. If it lists ODS risk factors that differ from Verbalis Table 3 (Na ≤105, hypokalemia, alcohol use disorder, malnutrition, advanced liver disease), stop and ask; don't edit it.
5. Apply the bumps, and update `lastUpdated` to today's date on the registry:
   - `data/acute-neuro.json`: one MINOR bump from the version recorded in step 1.
   - `package.json`: one PATCH bump (calculator code changed; no formula change).
6. Keep `lastReviewed: "UNREVIEWED"` on the entry. Don't sign anything off; I'll do that.
7. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry until sign-off; that's fine. Don't hand-edit `docs/CALCULATORS.md` or `generated/about.json`; they regenerate at release.
8. Run `npm run review-sheets` so I have a review sheet for sign-off.
9. Show me the diff of the entry in `data/` (old vs new) and of `src/lib/calculators.ts`, and check them against the CHANGES table and `calculators-excerpt.proposed.ts`. Every changed field should appear there, and nothing else should differ apart from `lastReviewed`. Note: `pitfalls[2]` is deleted, so the old `pitfalls[3]` becomes `pitfalls[2]`, unchanged.
10. Add a "2026-11-09 — Review item R3 (hyponatremia ODS-risk correction limit)" entry to `planning/DECISION_LOG.md`, using the text below word for word, then fill in the two version numbers you recorded where it says `<from>` and `<to>`.
11. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.3 (the task R3 blocks) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 3.3, stop and ask.
12. Commit to the branch, push, and open a PR into `main` titled "Content: R3 hyponatremia ODS-risk limit (1 entry, 1 registry bump, calculator metadata)". Paste the version table, the change summary from README and the C1 result into the PR body. Don't merge.

When you're done, tell me the PR link, the C1 result, and confirm validate, tsc and tests pass.

---

Decision log entry (step 10), word for word apart from the version placeholders:

```markdown
## 2026-11-09 — Review item R3 (hyponatremia ODS-risk correction limit)

Approved by Jason in chat 2026-11-09. Draft: `planning/drafts/review-2026-11-08/R3/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

Finding: ESE 2014 has no 8 mmol/L first-24-h limit for high-risk patients (recommendations 7.1.2.4, 7.2.1.6, 7.4.1.4, 7.5.1.1 and rationale checked). The stricter limit is Verbalis 2013 (US expert panel, ungraded, S21): 8 mmol/L in any 24-hour period for high ODS risk (Table 3, S20), goal 4–6 mmol/L/day. Calculator logic already matches (ODS risk: 8 every period; otherwise ESE 10 then 8) and is unchanged.

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.hyponatremia-ods.json` | F1–F3, F6–F8 | `definitions[1]` → Verbalis 2013 (any 24 h; goal 4–6 mmol/L/day; high risk: Na ≤105, hypokalemia, alcohol use disorder, malnutrition, advanced liver disease), `keyNumbers[2]` exact copy; `immediateActions[2].action` → "Na at 6 h, 12 h, then daily (ESE 2D); if Na ≤120: q4–6h until ≥125 (Verbalis); …", `keyNumbers[3]` exact copy; `treatment[1].evidenceNote` += Verbalis re-lowering (>8 in any 24 h, high risk); `pitfalls[2]` deleted (unsourced duplicate, Na ≤120 conflicted with Table 3); sources += Verbalis 2013 |
| `src/lib/calculators.ts` (`sodium-correction`) | F4, F5 | Docstring, META `formula` and `sources` (+ `S.verbalis2013`) attribute the ODS-risk limit to Verbalis 2013; warning text "(ESE 2014; ODS risk: Verbalis 2013)". No formula, cap or rounding change |

Rules adopted:
- A limit from an ungraded source is labelled with the source and "ungraded" in the line itself; ESE 2014 stays the graded primary limit, and `evidenceLevel` follows ESE.
- Truncated keyNumbers copies are fixed to exact copies whenever an item touches the entry.

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | <from> | <to> | MINOR (threshold re-attributed and reworded; new source; monitoring interval) |
| app (package.json) | <from> | <to> | PATCH (calculator docstring, warning text, META; no formula change) |

### ACCEPT (not raised again)
- A1: ESE's ODS risk-factor list (alcohol abuse, liver disease, thiazides/antidepressants, degree and duration) not encoded; ESE sets no separate limit for it.
- A2: `definitions[0]` "(1D) … until Na 130" matches ESE 7.1.2.4.
- A3: "chronic" qualifier left out as common knowledge.
- A4: Verbalis normal-risk limits (10–12/24 h, 18/48 h), acute-hyponatremia exemption and a 48-h calculator check are outside R3.
- A5: no newer ESE or US hyponatremia guideline (web check 2026-11-09).
- A6: observational data questioning strict limits (MacMillan 2023, Seethapathy 2023, Chauhan 2025) not encoded.
- A7: Verbalis 2013 was funded by an unrestricted Otsuka grant; context only.

### Open items
- `verify[]`: none.
- C1 result (calculator `odsRisk` label): see PR.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R3/README.md`.
```
