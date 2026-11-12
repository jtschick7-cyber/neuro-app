Encode the approved R17 content draft in `planning/drafts/review-2026-11-08/R17/`. Read that folder's `README.md` first. It lists the one new entry, the version bump, the two read-only checks (C1, C2) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edit listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r17-2026-11-11` from current `main`, and put the R17 drafts folder on it. Record the base commit hash in the PR body. Confirm that no entry with `id` `monogenic-csvd-workup` already exists in `data/consult-workups.json`; if one does, stop and tell me. Record the current `data/consult-workups.json` `version` (the export of 2026-11-11 had 3.1.1). If any other open PR touches `data/consult-workups.json`, stop and ask me about merge order.
2. Append `consult-workups.monogenic-csvd-workup.json` as the **last** entry of `entries` in `data/consult-workups.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/consult-workups.json`: one MINOR bump from the version recorded in step 1 (3.1.1 → 3.2.0 if unchanged).
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"`. `verify[]` has four items; leave all four. Don't sign anything off; I'll do that.
5. C1, read-only: search all of `data/*.json` for "CADASIL", "NOTCH3", "Fabry", "GLA" (whole word), "MELAS", "COL4A1", "HTRA1", "homocyst" and "hereditary CAA". For each hit outside the new entry, report the entry id, the field path and the line, and say whether it contradicts the new entry. Check especially `consult-workups:young-stroke-workup` (`differential[8]`, `workup[13]`), `consult-workups:cns-vasculitis-workup` (`differential[7]`), `reference-cards:boston-criteria-caa` (`pitfalls[1]`) and `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics` (does anything there conflict with rules 9, 10, 12 or 13?). **Don't change any of them.**
6. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry and its open verify[] items until sign-off; that's fine. Don't hand-edit `generated/about.json`.
7. Run `npm run review-sheets` so I have a review sheet for sign-off.
8. Show me the diff of `data/consult-workups.json` and check it against the CHANGES file. Only the new entry, `version` and `lastUpdated` should differ.
9. C2, check that the entry renders, and report only:
   - The 15 differential lines appear in stored order, with the must-not-miss marker on COL4A1/COL4A2, Fabry disease and homocystinuria only.
   - The 13 decision rules appear in order with the CONSENSUS and NOT_GRADED badges.
   - The long lines wrap cleanly: `decisionRules[5].condition`, `decisionRules[6].recommendation`, `decisionRules[9].recommendation` and `decisionRules[10].evidenceNote[1]`.
   - The four `keyNumbers` lines display and match their source fields.
   - The `verify[]` items display.
   - Search finds the entry for "CADASIL", "NOTCH3", "Fabry", "COL4A1", "MELAS", "CSF1R", "homocystinuria", "genetic small vessel disease" and "leukoencephalopathy".
   - The three relatedIds resolve.
10. Add a "2026-11-11 — Review item R17 (monogenic small vessel disease entry)" entry to `planning/DECISION_LOG.md`, using the text in `DECISION_LOG.md` in the drafts folder word for word. Fill in the version numbers you recorded where it says `<from>` and `<to>`, and the C1 and C2 results where it says `<C1>` and `<C2>`.
11. R17 is not in `RESEARCH_BRIEF_2026-11-08.md`. If `REVIEW_TASKS_2026-11-08.md` has a row for R17 or for genetic small vessel disease, mark it drafted with the PR link in the file's existing style. If it has none, don't add one; say so in the PR body.
12. Commit to the branch, push, and open a PR into `main` titled "Content: R17 monogenic small vessel disease entry (1 new entry, 1 registry bump)". Paste the version table, the change summary from README and the C1 and C2 results into the PR body. Don't merge.

When you're done, tell me the PR link, the C1 and C2 results, and confirm validate, tsc and tests pass.
