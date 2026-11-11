Encode the approved R9 content draft in `planning/drafts/review-2026-11-08/R9/`. Read that folder's `README.md` first. It lists the one entry, the version bump, the open verify items (none) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; the PARK items are recorded as open lines in the decision log, not in `verify[]`.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply here. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r9-2026-11-10` from current `main` **after the R2 PR has merged**, and put the R9 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm three things; if any has drifted, stop and tell me:
   - The R2 PR (`content-r2-2026-11-09`) is merged into `main`.
   - `esus-antithrombotic` in `data/vascular-antithrombotics.json` still matches the base in the CHANGES file (the "current" column, `lastReviewed` 2026-11-07).
   - The registry version is 0.14.0.
2. Replace the entry with `id` `esus-antithrombotic` in `data/vascular-antithrombotics.json` with `vascular-antithrombotics.esus-antithrombotic.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry (including `cancer-associated-stroke`). Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply exactly one version bump, and update `lastUpdated` to today's date: `data/vascular-antithrombotics.json` 0.14.0 → 0.15.0 (MINOR).
4. Keep `lastReviewed: "UNREVIEWED"` on the entry. Don't sign anything off; I'll do that.
5. Run `npm run validate` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry until sign-off; that's fine.
6. Run `npm run review-sheets` so I have a review sheet for sign-off.
7. Show me the diff of the entry in `data/` (old vs new) and check it against the CHANGES table. Every changed field should appear in the table, and nothing else should differ apart from `lastReviewed`. Only appends: `searchTerms[7]`–`[8]`, `pearls[2]`, `relatedIds[2]`, `sources[2]`.
8. Add a "2026-11-10 — Review item R9 (ESUS: ARCADIA)" entry to `planning/DECISION_LOG.md`, using the text below word for word.
9. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.9 (the task R9 blocks) as drafted with the PR link, in the file's existing style. Add one open line under it: `- [ ] Check the source of the "ARCADIA cancer subgroup" line in cancer-associated-stroke (R9 P2); consider ARCADIA secondary analyses as a new item (R9 P1).` Don't restructure the file. If you can't find task 3.9, stop and ask.
10. Commit to the branch, push, and open a PR into `main` titled "Content: R9 ESUS ARCADIA (1 entry, 1 registry bump)". Paste the version table and the change summary from README into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate and tests pass.

---

Decision log entry (step 8), word for word:

```markdown
## 2026-11-10 — Review item R9 (ESUS: ARCADIA)

Approved by Jason in chat 2026-11-10. Draft: `planning/drafts/review-2026-11-08/R9/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

| Draft | Findings | Change |
|---|---|---|
| `vascular-antithrombotics.esus-antithrombotic.json` | F1, F2, D4 | `pearls[2]` ARCADIA (cryptogenic stroke + atrial cardiopathy, no AF; apixaban vs aspirin 81 mg, n=1015; recurrent stroke 4.4%/yr both, HR 1.00; stopped for futility; no greater benefit at higher biomarker levels), ungraded; searchTerms += ARCADIA, atrial cardiopathy; relatedIds += vascular-antithrombotics:cancer-associated-stroke; sources += Kamel 2024 (JAMA) |

Rules applied:
- Trial results go in `pearls`, never `rules` (R2 rule). A pearl carries a grade only if a guideline grades the trial; AHA 2026 (full text) does not cite ARCADIA and Kleindorfer 2021 predates it, so the pearl is ungraded.

### Version
| registry | from | to | level |
|---|---|---|---|
| vascular-antithrombotics | 0.14.0 | 0.15.0 | MINOR (new source and evidence statement; no rule, tier or evidence level changed) |

### ACCEPT (not raised again)
- D1b: ARCADIA not added to the `rules[0]` parenthetical.
- D2: no guideline grade for ARCADIA (AHA 2026 silent; Kleindorfer 2021 predates it).
- A1: `rules[0]` AHA 2026 statement confirmed as §4.8 Rec 5 (COR 1, LOE A, p e378).
- A2–A4: ARCADIA safety outcomes, post-randomization AF analysis and trial exclusions left out of the pearl.

### PARK
- P1: ARCADIA secondary analyses (ARCADIA-MRI covert infarcts, JAMA Neurol 2025; LV systolic dysfunction post hoc, 2025): not read; candidate new item.
- P2: `cancer-associated-stroke` "ARCADIA cancer subgroup" line: not in the primary paper; check its source.

### Open items
- `verify[]`: none.
- PARK P1 and P2 (above).
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R9/README.md`.
```
