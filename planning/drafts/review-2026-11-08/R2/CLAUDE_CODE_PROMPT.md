Encode the approved R2 content draft in `planning/drafts/review-2026-11-08/R2/`. Read that folder's `README.md` first. It lists the one entry, the version bump, the open verify items (none) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; the PARK items are recorded as open lines in the decision log, not in `verify[]`.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply here. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r2-2026-11-09` from current `main`, and put the R2 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm two things; if either has drifted, stop and tell me:
   - `restart-antithrombotic-after-ich` in `data/vascular-antithrombotics.json` still matches the base in the CHANGES file (the "current" column, `lastReviewed` 2026-11-07).
   - The registry version is 0.13.0.
2. Replace the entry with `id` `restart-antithrombotic-after-ich` in `data/vascular-antithrombotics.json` with `vascular-antithrombotics.restart-antithrombotic-after-ich.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply exactly one version bump, and update `lastUpdated` to today's date: `data/vascular-antithrombotics.json` 0.13.0 → 0.14.0 (MINOR).
4. Keep `lastReviewed: "UNREVIEWED"` on the entry. Don't sign anything off; I'll do that.
5. Run `npm run validate` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry until sign-off; that's fine.
6. Run `npm run review-sheets` so I have a review sheet for sign-off.
7. Show me the diff of the entry in `data/` (old vs new) and check it against the CHANGES table. Every changed field should appear in the table, and nothing else should differ apart from `lastReviewed`. `pearls[0]` is replaced and `pearls[1]`–`[4]` are new.
8. Add a "2026-11-09 — Review item R2 (restart anticoagulation after ICH)" entry to `planning/DECISION_LOG.md`, using the text below word for word.
9. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.2 (the task R2 blocks) as drafted with the PR link, in the file's existing style. Add one open line under it: `- [ ] Recheck restart-antithrombotic-after-ich pearls[3]–[4] against the ENRICH-AF peer-reviewed publication; revisit the dose-eligibility subgroup (R2 B1) then.` Don't restructure the file. If you can't find task 3.2, stop and ask.
10. Commit to the branch, push, and open a PR into `main` titled "Content: R2 restart anticoagulation after ICH (1 entry, 1 registry bump)". Paste the version table and the change summary from README into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate and tests pass.

---

Decision log entry (step 8), word for word:

```markdown
## 2026-11-09 — Review item R2 (restart anticoagulation after ICH)

Approved by Jason in chat 2026-11-09. Draft: `planning/drafts/review-2026-11-08/R2/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

| Draft | Findings | Change |
|---|---|---|
| `vascular-antithrombotics.restart-antithrombotic-after-ich.json` | F1–F9, F12, F13 | `rules[2].evidenceNote` += ESO-EANS 2025 PICO 6.2 (no evidence-based recommendation; expert consensus 14/15: DOAC may be considered); `rules[4].evidenceNote` += ESO PICO 6.3 expert consensus (CAA example); `pearls[0]` → AHA ICH 2022 §9.1.1 recurrence HRs; pearls added: ESO "may not benefit" criteria (ungraded), PRESTIGE-AF, ENRICH-AF (unpublished), lobar ICH/cSAH; searchTerms += PRESTIGE-AF, ENRICH-AF, microbleeds; relatedIds += consult-workups:ich-etiology-workup; sources += ESO-EANS 2025, PRESTIGE-AF, ENRICH-AF slides, ESC press release |

Rules adopted:
- Trial results go in `pearls`, never `rules`. A guideline that agrees in direction but grades differently goes in the rule's `evidenceNote`, not `esoDiffers`. `evidenceLevel` stays on the current graded statement (AHA ICH 2022).
- Unpublished trial data may be encoded as a labelled pearl when every figure is confirmed against primary presentation material read in full. The publication recheck is tracked here and in REVIEW_TASKS, not in `verify[]`.

### Version
| registry | from | to | level |
|---|---|---|---|
| vascular-antithrombotics | 0.13.0 | 0.14.0 | MINOR (new sources and evidence statements; no rule, tier or evidence level changed) |

### ACCEPT (not raised again)
- F10: ESO-EANS 2025 PICO 6.4 (antiplatelet) agrees with AHA Rec 2; not added (outside R2).
- F11: 7–8-week timing kept; still the only graded timing statement (ESO-EANS 2025 has none).
- B2: DOAC over VKA left out as common knowledge.
- B3: A3ICH has no results (recruiting, 2026-11-09).
- B4: AHA ICH 2022 is still the current AHA/ASA ICH guideline.

### PARK
- F5b: recheck `pearls[3]`–`[4]` (ENRICH-AF) against the peer-reviewed publication.
- B1: ENRICH-AF major bleeding by label-based dose eligibility (60 mg HR 3.95 vs 30 mg HR 0.97, interaction p=0.002; slide 17). Not encoded; revisit at publication.

### Open items
- `verify[]`: none.
- PARK F5b and B1 (above).
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R2/README.md`.
```
