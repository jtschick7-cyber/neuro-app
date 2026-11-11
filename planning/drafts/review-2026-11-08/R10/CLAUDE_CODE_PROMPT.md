Encode the approved R10 content draft in `planning/drafts/review-2026-11-08/R10/`. Read that folder's `README.md` first. It lists the one entry, the version bump, the open verify items (none) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; the PARK items are recorded as open lines in the decision log, not in `verify[]`.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply here. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r10-2026-11-10` from current `main` **after the R3, R4 and R6 PRs have merged**, and put the R10 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm three things; if any has drifted, stop and tell me:
   - The R3, R4 and R6 PRs are merged into `main`.
   - `serotonin-syndrome` in `data/acute-neuro.json` still matches the base in the CHANGES file (the "current" column, `lastReviewed` 2026-11-07).
   - Record the current `acute-neuro` registry version.
2. Replace the entry with `id` `serotonin-syndrome` in `data/acute-neuro.json` with `acute-neuro.serotonin-syndrome.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry (including `nms-parkinsonism-hyperpyrexia`). Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply exactly one version bump, and update `lastUpdated` to today's date: `data/acute-neuro.json` as found → next MINOR.
4. Keep `lastReviewed: "UNREVIEWED"` on the entry. Don't sign anything off; I'll do that.
5. Run `npm run validate` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry until sign-off; that's fine.
6. Run `npm run review-sheets` so I have a review sheet for sign-off.
7. Show me the diff of the entry in `data/` (old vs new) and check it against the CHANGES table. Every changed field should appear in the table, and nothing else should differ apart from `lastReviewed`. One in-place edit (`presentation[0]`) and appends only: `searchTerms[6]`, `pitfalls[3]`, `sources[2]`.
8. Add a "2026-11-10 — Review item R10 (serotonin syndrome: triptan example)" entry to `planning/DECISION_LOG.md`, using the text below word for word, with the version numbers you recorded in step 1 filled into the version table.
9. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.10 (the task R10 blocks) as drafted with the PR link, in the file's existing style. Add one open line under it: `- [ ] Check the evidence for "ondansetron/metoclopramide add-ons" in serotonin-syndrome pitfalls[2] (R10 P1); check current triptan label wording on serotonin syndrome (R10 P2).` Don't restructure the file. If you can't find task 3.10, stop and ask.
10. Commit to the branch, push, and open a PR into `main` titled "Content: R10 serotonin syndrome triptan example (1 entry, 1 registry bump)". Paste the version table and the change summary from README into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate and tests pass.

---

Decision log entry (step 8), word for word (fill in `<from>` and `<to>` from step 1):

```markdown
## 2026-11-10 — Review item R10 (serotonin syndrome: triptan example)

Approved by Jason in chat 2026-11-10. Draft: `planning/drafts/review-2026-11-08/R10/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.serotonin-syndrome.json` | F1, D3 | `presentation[0]`: "triptans + SSRI/SNRI" removed from example triggers; `pitfalls[3]` Orlova 2018 (30,928 person-years of co-prescription; 0.6 definite cases/10,000 person-years, 95% CI 0–1.5; 2.3 incl. possible; none life-threatening); searchTerms += triptan; sources += Orlova 2018 (JAMA Neurol) |

Rules applied:
- Trial and cohort results go in their own line with their numbers, not in descriptive lists (R2/R9 rule). Pitfalls carry no grade.

### Version
| registry | from | to | level |
|---|---|---|---|
| acute-neuro | <from> | <to> | MINOR (new source and evidence statement; example removed; no dose, threshold or evidence level changed) |

### ACCEPT (not raised again)
- D1a/b: delete-only and inline "rarely" qualifier not chosen.
- D2iii: authors' "daily SSRI/SNRI is the likelier cause" left out (opinion).
- A1: `definitions[0]` Hunter criteria follow Dunkley 2003; Orlova's adapted Box layout not adopted.
- A2–A3: mechanism and study limitations not encoded.

### PARK
- P1: `pitfalls[2]` "ondansetron/metoclopramide add-ons": evidence not examined.
- P2: current triptan label wording on serotonin syndrome: no label read.

### Open items
- `verify[]`: none.
- PARK P1 and P2 (above).
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R10/README.md`.
```
