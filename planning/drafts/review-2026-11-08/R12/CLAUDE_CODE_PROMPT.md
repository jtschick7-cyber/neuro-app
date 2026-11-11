Encode the approved R12 content draft in `planning/drafts/review-2026-11-08/R12/`. Read that folder's `README.md` first. It lists the one new entry, the version bump, the two read-only checks (C1, C2) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edit listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r12-2026-11-10` from current `main`, and put the R12 drafts folder on it. Record the base commit hash in the PR body. Confirm that no entry with `id` `neuroprognostication` already exists in `data/reference-cards.json`; if one does, stop and tell me. Record the current `data/reference-cards.json` `version`. R5 also bumps this registry: if the R5 PR (or any other open PR touching `data/reference-cards.json`) is still open, stop and ask me about merge order.
2. Append `reference-cards.neuroprognostication.json` as the **last** entry of `entries` in `data/reference-cards.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/reference-cards.json`: one MINOR bump from the version recorded in step 1.
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"`. Keep both `verify[]` items. Don't sign anything off; I'll do that.
5. C1, read-only: open `consult-workups:post-cardiac-arrest-prognostication`. Report how it encodes (a) GRADE good-practice statements ("strong recommendation, evidence cannot be graded") in `evidenceLevel`, and (b) "moderately reliable" vs "not reliable" predictors (field and value). If it differs from the R12 mapping (GPS → STRONG; moderately reliable → RECOMMENDED; not reliable → NOT_RECOMMENDED), say so. **Don't change either entry.**
6. C2, read-only: open `acute-neuro:guillain-barre-syndrome`. Report whether it already contains EGRIS, EGOS or mEGOS content (quote the lines). **Don't change it.**
7. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry and the open verify[] items until sign-off; that's fine. Don't hand-edit `generated/about.json`.
8. Run `npm run review-sheets` so I have a review sheet for sign-off.
9. Show me the diff of `data/reference-cards.json` and check it against the CHANGES table. Only the new entry, `version` and `lastUpdated` should differ.
10. Check that the card renders: 5 sections in the order ICH, AIS, SE, GBS, TBI; RECOMMENDED and NOT_RECOMMENDED badges, with NOT_RECOMMENDED rows visibly deprioritized; the long GBS "Not reliable" target and the long `keyNumbers[2]` line wrap cleanly; the EGRIS, EGOS and mEGOS point-table notes read as lists. Search finds the card for "EGRIS", "ICH score", "CRASH", "prognosis" and "goals of care". The four relatedIds resolve. Report anything that renders oddly; don't change the content to fix it.
11. Add a "2026-11-10 — Review item R12 (neuroprognostication card)" entry to `planning/DECISION_LOG.md`, using the text below word for word, then fill in the version numbers you recorded where it says `<from>` and `<to>`, and the C1 and C2 results where it says `<C1>` and `<C2>`.
12. In `REVIEW_TASKS_2026-11-08.md`, mark task 4.2 (the task R12 delivers) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 4.2, stop and ask.
13. Commit to the branch, push, and open a PR into `main` titled "Content: R12 neuroprognostication card (1 new entry, 1 registry bump)". Paste the version table, the change summary from README and the C1 and C2 results into the PR body. Don't merge.

When you're done, tell me the PR link, the C1 and C2 results, and confirm validate, tsc and tests pass.

---

Decision log entry (step 11), word for word apart from the placeholders:

```markdown
## 2026-11-10 — Review item R12 (neuroprognostication card)

Approved by Jason in chat 2026-11-10 ("approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R12/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had neuroprognostication only for cardiac arrest. The NCS GRADE series also covers ICH (Hwang 2024), AIS (Mainali 2026), SE (Madzar 2026), GBS (Busl 2023) and moderate–severe TBI (Muehlschlegel 2024). No NCS aSAH neuroprognostication guideline was found (web search 2026-11-10). No guideline rates any predictor or model "reliable"; moderately reliable: ENI (AIS, good outcome); bulbar/limb weakness, EGRIS, EGOS, mEGOS (GBS); bilateral nonreactive pupils on admission, CRASH, IMPACT (TBI).

| Draft | Findings | Change |
|---|---|---|
| `reference-cards.neuroprognostication.json` | N1–N7, K1–K5, V1–V2 | New card `neuroprognostication`, 5 row-list sections: ICH (defer ≥48–72 h except clinically devastated; recovery days to years; not reliable alone for function ≥3 mo or 30-day mortality, incl. original and max-ICH scores), AIS (ENI NIHSS 0–1 at 24 h moderately reliable for good outcome; no fixed timing window; LHI goals before decline; recovery horizon; feeding tube/trach; not-reliable variables and models), SE (defer until etiology workup; disease-specific predictors; confounders incl. prolonged postictal 4–10 days; RSE/SRSE counseling; nothing reliable for in-hospital mortality), GBS (bulbar/limb weakness and EGRIS for ventilation ≤14 d; EGOS, mEGOS for walking ≥3 mo, with point tables; counsel on ventilation and enteral nutrition; not-reliable list), TBI (≥3 days, ideally 1–2 weeks; bilateral nonreactive pupils; CRASH/IMPACT; not-reliable list); 4 pitfalls; 5 keyNumbers; 2 verify items; 4 relatedIds; 5 sources |

Rules adopted:
- NCS neuroprognostication grades: weak recommendation → WEAK; good-practice "strong recommendation, evidence cannot be graded" → STRONG; "conditional recommendation, evidence not graded" → WEAK. Verbatim wording in `evidenceNote`.
- Moderately reliable predictor/model → RECOMMENDED; not reliable → NOT_RECOMMENDED, collapsed to one row per outcome per disease with per-item grades in `evidenceNote`.
- Generic good-practice statements (complete clinical condition, baseline function, acceptable outcomes, no nihilism) are not encoded.

Mapping check (C1): <C1>. GBS entry overlap (C2): <C2>.

### Version
| what | from | to | level |
|---|---|---|---|
| reference-cards | <from> | <to> | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- C2: possible EGRIS/EGOS overlap with acute-neuro:guillain-barre-syndrome.
- D8: back-links to the card from the GBS, RSE/SRSE and cardiac-arrest entries.
- A4: "not-reliable variables may sit inside reliable models" pitfall (Madzar p.367).
- A5: GBS disability scale as an EGOS note.
- A7: calculators for EGRIS/EGOS/mEGOS/CRASH/IMPACT.

### ACCEPT (not raised again)
- C1 (pending Claude Code's read-only check): grade and role mapping as approved.
- S1: no NCS aSAH neuroprognostication guideline.
- A1: generic good-practice statements not encoded.
- A2: AIS Table 6 recovery by deficit not encoded.
- A3: reliability definitions not encoded beyond `pitfalls[1]`.
- A6: supplementary appendices not reviewed; main-text statements only.
- A8: guideline versions as uploaded.

### Open items
- `verify[]`: V1 ASTRAL grade (Mainali Table 3 vs p.758); V2 Helsinki CT "strong recommendation" (Muehlschlegel p.473).
- Jason: resolve verify[], then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R12/README.md`.
```
