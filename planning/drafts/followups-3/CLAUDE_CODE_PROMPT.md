Encode the approved follow-up batch 3 content drafts in `planning/drafts/followups-3/`. Read that folder's `README.md` first. It lists the 8 entries, the version bumps, the open verify items (none) and the complete Disposition Ledger (every item is FIX or ACCEPT; nothing is parked or open).

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply here. Follow `docs/VERSIONING.md` and these rules:

1. Work on branch `content-followups-3-2026-11-08` (it already holds the drafts). Base is `main` at 814629f. Before editing, confirm that each target entry in `data/` still matches the base described in its CHANGES file (the "current" column), and that the registry versions are still consult-workups 2.1.1 and vascular-antithrombotics 0.12.1. If anything has drifted, stop and tell me.
2. For each `<registry>.<id>.json` in the folder, replace the entry with the same `id` in `data/<registry>.json` with the draft, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry; `heparin-ufh` and `thunderclap-headache` are not edited. Don't change anything a ledger row marks ACCEPT.
3. Apply exactly one version bump per registry, and update `lastUpdated` to today's date on each bumped registry:
   - `data/consult-workups.json`: 2.1.1 → 2.2.0 (MINOR)
   - `data/vascular-antithrombotics.json`: 0.12.1 → 0.13.0 (MINOR)
4. Keep `lastReviewed: "UNREVIEWED"` on all 8 entries. Don't sign anything off; I'll do that.
5. Run `npm run validate` and `npm test`, and fix only problems caused by the encoding itself. If a draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the 8 UNREVIEWED entries until sign-off; that's fine.
6. Run `npm run review-sheets` so I have review sheets for sign-off.
7. Show me a per-entry diff of `data/` (old vs new) and check it against each entry's CHANGES table. Every changed field should appear in the table, and nothing else should differ apart from `lastReviewed`. In `sah-workup`, the new `workup[3]` shifts the former `workup[3]`–`[4]` to `[4]`–`[5]`; confirm those two rows are unchanged.
8. Add a "2026-11-08 — Follow-up batch 3" entry to `planning/DECISION_LOG.md`, using the text below word for word.
9. In `planning/NEURO_APP_TASKS.md` §10, under "Noticed in follow-up batch 2 (2026-11-08), not changed", mark all nine lines as settled in the existing style, e.g. `- [x] (settled 2026-11-08, batch 3 item 1) …`, keeping each line's text. Use this mapping:
   - sah-workup line: batch 3 item 1 (FIX)
   - young-stroke-workup line: batch 3 item 7 (FIX wording; ACCEPT labels: one Kleindorfer source, so the short label is unambiguous)
   - cns-vasculitis-workup line: batch 3 item 6 (FIX; surname checked, correct)
   - ticagrelor line: batch 3 item 4 (FIX uses[0]; uses[3] correct)
   - pregnancy-antithrombotics line: batch 3 item 9 (FIX)
   - cvt-anticoagulation line: batch 3 item 5 (FIX)
   - enoxaparin line: batch 3 item 8 (FIX)
   - AHA 2026 PDF line: batch 3 item 3 (ACCEPT: complete Table 8 has no LMWH row and matches all three entries; no change needed)
   - thrombolysis-with-prior-antithrombotics line: batch 3 item 2 (FIX)

   Then add one already-closed line for the batch-3 ACCEPT that has no existing line: `- [x] (settled 2026-11-08, batch 3 L4, ACCEPT) thunderclap-headache labels say "Sousa 2026"; its source string correctly reads "de Sousa IA…", so the paper is findable (label only).` Add no new open lines: this batch closes with no open items.
10. Commit to the branch, push, and open a PR into `main` titled "Content: follow-up batch 3 (8 entries, 2 registry bumps)". Paste the version table and the per-entry change summary into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate and tests pass.

---

Decision log entry (step 8), word for word:

```markdown
## 2026-11-08 — Follow-up batch 3

Approved by Jason in chat 2026-11-08. Drafts: `planning/drafts/followups-3/` (base `main` 814629f). All 8 entries `lastReviewed: "UNREVIEWED"`.

| Draft | Item | Change |
|---|---|---|
| `consult-workups.sah-workup.json` | 1, L1, L2 | New `workup[3]` pointer row (dissection, RCVS, CVT, pituitary apoplexy → thunderclap-headache); `workup[2].indication` += "CT negative, xanthochromia on LP" (Hoh 2023 Fig 2) |
| `consult-workups.cns-vasculitis-workup.json` | 6 | `decisionRules[3]` → ESO 2023 PICO 8 wording, CONSENSUS, cited directly |
| `consult-workups.young-stroke-workup.json` | 7 | "over >3" → "rather than >3" in `decisionRules[2]` and `keyNumbers[0]` |
| `vascular-antithrombotics.thrombolysis-with-prior-antithrombotics.json` | 2, L5, L6 | `rules[0]`/`[1]` → EXPERT_OPINION; `rules[4]`, `rules[5]` → NOT_GRADED; notes added; `keyNumbers[2]` exact copy |
| `vascular-antithrombotics.ticagrelor.json` | 4 | `uses[0].evidenceNote[1]` describes Kleindorfer Rec 4 correctly |
| `vascular-antithrombotics.cvt-anticoagulation.json` | 5 | `dose[0].label` → "q12h"; extrapolation note added |
| `vascular-antithrombotics.enoxaparin.json` | 8 | `keyNumbers[1]` exact copy of `timing.thrombolysisRule[0]` |
| `vascular-antithrombotics.pregnancy-antithrombotics.json` | 9 | Kopp source title corrected |

Grading rule adopted (thrombolysis-with-prior-antithrombotics): `evidenceLevel` reflects the current guideline; if it is ungraded, use what the source says the statement rests on; if the source states no basis, NOT_GRADED, with any older grade kept in `evidenceNote`.

### Version
| registry | from | to | level |
|---|---|---|---|
| consult-workups | 2.1.1 | 2.2.0 | MINOR (new workup row/indication; recommendation and evidence level changed) |
| vascular-antithrombotics | 0.12.1 | 0.13.0 | MINOR (four evidence levels changed) |

### ACCEPT (not raised again)
- Item 3 (AHA 2026 Table 8 vs enoxaparin, heparin-ufh, thrombolysis-with-prior-antithrombotics): the complete Table 8 has no LMWH row and matches all three entries; no change needed.
- Item 7b (young-stroke-workup "Kleindorfer" vs "Kleindorfer 2021" labels): the entry has one Kleindorfer source, so the short label is unambiguous.
- L4 (thunderclap-headache "Sousa 2026" labels): its source string correctly reads "de Sousa IA…", so the paper is findable; label only.

### PARK
- None.

### Open items
- `verify[]`: none.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/followups-3/README.md`; every row closed.
```
