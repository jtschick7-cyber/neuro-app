Encode the approved R16 content draft in `planning/drafts/review-2026-11-08/R16/`. Read that folder's `README.md` first. It lists the one new entry, the version bump, the two read-only checks (C1, C2) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edit listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r16-2026-11-11` from current `main`, and put the R16 drafts folder on it. Record the base commit hash in the PR body. Confirm that no entry with `id` `boston-criteria-caa` already exists in `data/reference-cards.json`; if one does, stop and tell me. Record the current `data/reference-cards.json` `version`. R5 and R12 also bump this registry: if either PR (or any other open PR touching `data/reference-cards.json`) is still open, stop and ask me about merge order.
2. Append `reference-cards.boston-criteria-caa.json` as the **last** entry of `entries` in `data/reference-cards.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/reference-cards.json`: one MINOR bump from the version recorded in step 1.
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"`. `verify` is `[]`; leave it empty. Don't sign anything off; I'll do that.
5. C1, read-only: report how the card renders. The 9 criteria and definition rows have role `TARGET` and the 3 accuracy rows have role `EVIDENCE_SUMMARY`, all `NOT_GRADED`. Say whether a `TARGET` badge or label on a diagnostic criterion reads oddly, and whether the accuracy rows are clearly shown as evidence and not as targets. **Don't change the content or the code to fix it.**
6. C2, read-only: search `data/` for existing Boston criteria content ("Boston", "probable CAA", "possible CAA", "siderosis", "perivascular"), starting with `consult-workups:caa-related-inflammation`, `consult-workups:ich-etiology-workup` and `vascular-antithrombotics:restart-antithrombotic-after-ich`. Quote any line that duplicates or contradicts the card. **Don't change any entry.**
7. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry until sign-off; that's fine. Don't hand-edit `generated/about.json`.
8. Run `npm run review-sheets` so I have a review sheet for sign-off.
9. Show me the diff of `data/reference-cards.json` and check it against the CHANGES table. Only the new entry, `version` and `lastUpdated` should differ.
10. Check that the card renders: 3 sections in the order Criteria, Lesion definitions, Accuracy vs autopsy; the long Probable CAA target and `keyNumbers[0]` wrap cleanly; the "≥", ">" and "T2*" characters display correctly. Search finds the card for "CAA", "Boston", "siderosis", "cSS", "perivascular" and "TFNE". The three relatedIds resolve. Report anything that renders oddly; don't change the content to fix it.
11. Add a "2026-11-11 — Review item R16 (Boston criteria v2.0 card)" entry to `planning/DECISION_LOG.md`, using the text below word for word, then fill in the version numbers you recorded where it says `<from>` and `<to>`, and the C1 and C2 results where it says `<C1>` and `<C2>`.
12. In `REVIEW_TASKS_2026-11-08.md`, mark task 4.6 (the task R16 delivers) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 4.6, stop and ask.
13. Commit to the branch, push, and open a PR into `main` titled "Content: R16 Boston criteria v2.0 card (1 new entry, 1 registry bump)". Paste the version table, the change summary from README and the C1 and C2 results into the PR body. Don't merge.

When you're done, tell me the PR link, the C1 and C2 results, and confirm validate, tsc and tests pass.

---

Decision log entry (step 11), word for word apart from the placeholders:

```markdown
## 2026-11-11 — Review item R16 (Boston criteria v2.0 card)

Approved by Jason in chat 2026-11-11 ("Approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R16/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had no Boston criteria content; `ich-etiology-workup` only names CAA in its differential. Source: Charidimou 2022 (Lancet Neurol), published article; cited by Panel, table and journal page. No newer version of the criteria was found (web search 2026-11-11).

| Draft | Findings | Change |
|---|---|---|
| `reference-cards.boston-criteria-caa.json` | N1–N5, K1–K5, V1–V3 | New card `boston-criteria-caa`, 3 row-list sections: Criteria (applies to age ≥50 with spontaneous ICH, TFNE or cognitive impairment/dementia; probable = ≥2 strictly lobar hemorrhagic lesions or 1 + 1 white matter feature; possible = 1 lobar hemorrhagic lesion or 1 white matter feature; exclusions; pathology-based categories), Lesion definitions (severe CSO-PVS >20; WMH multispot >10; multifocal cSS; acute cSAH near cSS), Accuracy vs autopsy for probable CAA (all 74.5% / 95.0%; ICH 90.2% / 92.9%; non-ICH 55.1% / 96.2%); 5 pitfalls; 5 keyNumbers; no verify items; 3 relatedIds; 1 source |

Rules adopted:
- Diagnostic criteria and lesion definitions on a reference card use role TARGET; diagnostic accuracy figures use EVIDENCE_SUMMARY; both NOT_GRADED, with the source location in `evidenceNote`.
- Cite the published version of a paper, not the author manuscript: labels and pages differ (here Table 2 → Panel, Table 5 → Table 4), and the manuscript had a cut-off footnote and two wording differences.

Rendering check (C1): <C1>. Overlap with existing entries (C2): <C2>.

### Version
| what | from | to | level |
|---|---|---|---|
| reference-cards | <from> | <to> | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- B3: probable+possible accuracy and whole-sample or cohort figures.
- B5: Kropp 2026 memory-clinic validation (not read).
- B6: Edinburgh CT criteria (needs Rodrigues 2018).
- B9: amyloid PET and CSF amyloid-β not yet validated.
- B11: link to `consult-workups:aria-anti-amyloid` once R14 has merged.
- B12: back-links to the card from ich-etiology-workup, caa-related-inflammation and restart-antithrombotic-after-ich.
- C2: possible overlap with caa-related-inflammation.

### ACCEPT (not raised again)
- B1: criteria counts encoded as numerals (the published Panel prints "One").
- B2: no "criterion" role; TARGET used, no schema change.
- B4: v1.5 comparison and what changed from v1.5 not encoded.
- B7: lobar lacunes and superficial cerebellar microbleeds not encoded.
- B8: odds ratios, kappas, study design and pathophysiology not encoded.
- B10: supplementary material not reviewed.
- C1 (pending Claude Code's read-only check): role mapping as approved.

### Open items
- `verify[]`: none. Two first-draft items (manuscript citations; cut-off footnote) were closed against the published article before encoding.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R16/README.md`.
```
