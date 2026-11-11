Encode the approved R4 content draft in `planning/drafts/review-2026-11-08/R4/`. Read that folder's `README.md` first. It lists the one entry, the version bump, the open verify items (V1, V2) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edit listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Check that the R3 PR (branch `content-r3-2026-11-09`) has merged into `main`. If it is still open, stop and ask me; R3 and R4 both bump `data/acute-neuro.json`. Then create branch `content-r4-2026-11-09` from current `main`, and put the R4 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm that `bacterial-meningitis` in `data/acute-neuro.json` still matches the base in the CHANGES file (the "current" column, `lastReviewed` 2026-11-07); if it has drifted, stop and tell me. Record the current `data/acute-neuro.json` `version`.
2. Replace the entry with `id` `bacterial-meningitis` in `data/acute-neuro.json` with `acute-neuro.bacterial-meningitis.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/acute-neuro.json`: one MINOR bump from the version recorded in step 1.
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"` on the entry and keep both `verify[]` items. Don't sign anything off; I'll do that.
5. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry and the open verify items until sign-off; that's fine. Don't hand-edit `generated/about.json`.
6. Run `npm run review-sheets` so I have a review sheet for sign-off.
7. Show me the diff of the entry in `data/` (old vs new) and check it against the CHANGES table. Every changed field should appear there, and nothing else should differ apart from `lastReviewed`. Note the index shifts listed in CHANGES: three `workup` rows are inserted after `workup[4]` (HIV test moves to `[8]`), and one `treatment` row is inserted after `treatment[4]` (allergy, acyclovir and rifampin move to `[6]`–`[8]`).
8. Check that the entry renders: the new `treatment[5]` shows route `INTRATHECAL` and an empty structured dose without errors, and `treatment[4]` shows both structured doses. Report anything that renders oddly; don't change the content to fix it.
9. Add a "2026-11-09 — Review item R4 (healthcare-associated ventriculitis and meningitis)" entry to `planning/DECISION_LOG.md`, using the text below word for word, then fill in the version numbers you recorded where it says `<from>` and `<to>`.
10. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.4 (the task R4 blocks) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 3.4, stop and ask.
11. Commit to the branch, push, and open a PR into `main` titled "Content: R4 healthcare-associated ventriculitis/meningitis (1 entry, 1 registry bump)". Paste the version table, the change summary from README and the open verify items into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate, tsc and tests pass.

---

Decision log entry (step 9), word for word apart from the version placeholders:

```markdown
## 2026-11-09 — Review item R4 (healthcare-associated ventriculitis and meningitis)

Approved by Jason in chat 2026-11-09. Draft: `planning/drafts/review-2026-11-08/R4/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the post-neurosurgical/shunt row in `bacterial-meningitis` cited IDSA 2004. The specific guideline is IDSA 2017 (Tunkel, Clin Infect Dis 2017;64(6):e34–e65). Same empiric regimen (Rec 37, strong, low) and the same adult beta-lactam doses (Table 2), but vancomycin 30–60 mg/kg/day q8–12h with trough 15–20 μg/mL (Table 2, Rec 38), so the row no longer points to the 2004 community dose. No newer version found (web check 2026-11-09).

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.bacterial-meningitis.json` | F1–F7, K1–K2, N1–N4, N6, N7, N9–N13 | `treatment[4]` → IDSA 2017: vancomycin 30–60 mg/kg/day (+ structured dose), beta-lactam by local susceptibility, device removal (Recs 62–63), duration (Recs 58–61); new `treatment[5]` intraventricular antibiotics (Recs 55–57, Table 3; route INTRATHECAL); definitions += EVD culture classification (Rec 22), CoNS contaminant (Rec 26), post-neurosurgery infection vs chemical meningitis (ungraded); blood cultures += VA/VP shunt (Recs 20–21); workup += shunt/EVD culture hold ≥10 days (Rec 17), CSF lactate ± PCT (Rec 30), CSF β-D-glucan/galactomannan (Rec 33); rifampin += hardware note (Rec 44); pitfalls += EVD CSF sampling (Recs 67, 69); presentation += C. acnes; searchTerms += EVD, ventriculitis, shunt infection; keyNumbers[1], [4] exact copies; sources += IDSA 2017 |

Rules adopted:
- Community-acquired rows stay on IDSA 2004; IDSA 2017 applies only to the healthcare-associated rows.
- GRADE strong → STRONG and weak → WEAK regardless of evidence quality; the guideline's "strong, low"-style wording is kept in `evidenceNote` or the line.
- Data from an evidence summary only (study cutoffs, single cohorts) is encoded as "study data (ungraded)", never as a graded recommendation.
- Intraventricular dosing uses route `INTRATHECAL` with "intraventricular" in the text (no schema change).

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | <from> | <to> | MINOR (dose and evidence source changed; new source; new workup and treatment rows) |

### PARK (offered, not picked; can be revived)
- N5: serum procalcitonin (Rec 31, weak, low).
- N8: MRI with gadolinium + DWI (Rec 35, strong, moderate).
- N14: no prolonged EVD prophylaxis, no fixed-interval exchange (Recs 76, 78).
- N15: basilar skull fracture CSF leak (Recs 81–83); guideline vaccine schedule outdated.

### ACCEPT (not raised again)
- A1: community vancomycin stays 30–45 mg/kg/day (IDSA 2004).
- A2: healthcare-associated beta-lactam doses match IDSA 2017 Table 2.
- A3: Rec 39 allergy alternatives not added; the allergy row already names aztreonam and ciprofloxacin.
- A4: organism-directed therapy (Recs 41–54, Table 1) not encoded, except Rec 44.
- A5: shunt reimplantation timing (Recs 70–73) not encoded.
- A6: other IDSA 2017 recommendations not encoded (common knowledge, device-specific, or not picked).
- A7: no newer guideline found.
- A8: vancomycin structured dose uses actual body weight, matching the community row; the guideline is silent.

### Open items
- `verify[]`: V1 vancomycin trough target vs AUC dosing; V2 intraventricular gentamicin 4–8 mg (Table 3 footnote d) vs 2 / 3 / 4–5 mg by ventricle size (footnote e).
- Jason: resolve V1–V2, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R4/README.md`.
```
