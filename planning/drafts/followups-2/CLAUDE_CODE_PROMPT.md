Encode the approved follow-up batch 2 content drafts in `planning/drafts/followups-2/`. Read that folder's `README.md` first. It lists the 8 entries, the version bumps, the open verify items (none) and the noticed-not-changed items.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply here. Follow `docs/VERSIONING.md` and these rules:

1. Work on branch `content-followups-2-2026-11-08` (it already holds the drafts). Base is `main` at 2be7f92. Before editing, confirm that each target entry in `data/` still matches the base described in its CHANGES file (the "current" column). If any entry has drifted, stop and tell me.
2. For each `<registry>.<id>.json` in the folder, replace the entry with the same `id` in `data/<registry>.json` with the draft, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't "fix" anything listed under "Noticed, not changed"; those are for a later batch.
3. Apply exactly one version bump per registry, and update `lastUpdated` to today's date on each bumped registry:
   - `data/acute-neuro.json`: 1.2.5 → 1.2.6 (PATCH)
   - `data/consult-workups.json`: 2.0.1 → 2.1.0 (MINOR)
   - `data/vascular-antithrombotics.json`: 0.11.1 → 0.12.0 (MINOR)
4. Keep `lastReviewed: "UNREVIEWED"` on all 8 entries. Don't sign anything off; I'll do that.
5. Run `npm run validate` and `npm test`, and fix only problems caused by the encoding itself. If a draft fails validation, stop and report it rather than changing its content. `npm run validate:release` / `build` are expected to fail on the 8 UNREVIEWED entries until sign-off; that's fine.
6. Run `npm run review-sheets` so I have review sheets for sign-off.
7. Show me a per-entry diff of `data/` (old vs new) and check it against each entry's CHANGES table. Every changed field should appear in the table, and nothing else should differ apart from `lastReviewed`.
8. Add a "2026-11-08 — Follow-up batch 2" entry to `planning/DECISION_LOG.md` in the same format as the 2026-11-07 entry: the file/item/change table, the version table, open items (verify: none; Jason: `npm run signoff`, then `npm run release`), and a pointer to the README for noticed-not-changed. In `planning/NEURO_APP_TASKS.md` §10, mark items 1, 1b, 2a, 2b, 2c, 3, 4a, 4b, 5a, 5b, 6, 7 and 8 as settled, and add the README's "Noticed, not changed" items as new open follow-ups.
9. Commit to the branch, push, and open a PR into `main` titled "Content: follow-up batch 2 (8 entries, 3 registry bumps)". Paste the version table and the per-entry change summary into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate and tests pass.
