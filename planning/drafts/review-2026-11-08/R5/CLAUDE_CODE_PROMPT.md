Encode the approved R5 content draft in `planning/drafts/review-2026-11-08/R5/`. Read that folder's `README.md` first. It lists the one entry, the version bump, the read-only calculator check (C1) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edit listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r5-2026-11-09` from current `main`, and put the R5 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm that `inpatient-parkinson-disease` in `data/reference-cards.json` still matches the base in the CHANGES file (the "current" column, `lastReviewed` 2026-11-07); if it has drifted, stop and tell me. Record the current `data/reference-cards.json` `version`. No other open R-item touches this registry; if you find an open PR that does, stop and ask.
2. Replace the entry with `id` `inpatient-parkinson-disease` in `data/reference-cards.json` with `reference-cards.inpatient-parkinson-disease.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/reference-cards.json`: one MINOR bump from the version recorded in step 1.
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"` on the entry. `verify[]` stays empty. Don't sign anything off; I'll do that.
5. C1, read-only: open `src/lib/calculators.ts` and its `CALCULATOR_META` entry for `ledd`. Report (a) the foslevodopa / Vyalev factor and what the input is (foslevodopa mg/day, mL, mL/h, or levodopa mg), and (b) whether the calculator handles intrajejunal levodopa-carbidopa (Duopa/LCIG) and apomorphine infusion, with their factors. If the foslevodopa factor is 0.75 applied to foslevodopa mg/day, it matches Jost 2023 Table 1; say so. If it is anything else, stop and report it. **Don't change calculator code, tests or META** in this PR either way.
6. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry until sign-off; that's fine. Don't hand-edit `generated/about.json`.
7. Run `npm run review-sheets` so I have a review sheet for sign-off.
8. Show me the diff of the entry in `data/` (old vs new) and check it against the CHANGES table. Every changed field should appear there, and nothing else should differ apart from `lastReviewed`. Note the index shifts listed in CHANGES: a new `sections[1]` (old `[1]`–`[4]` move to `[2]`–`[5]`); a trimethobenzamide row inserted at Antiemetics `rows[2]` (Dopamine-blocking antiemetics moves to `rows[3]`); Rotigotine dose `notes[0]` split in two (the examples move to `notes[2]`–`[4]`).
9. Check that the card renders: the new pump section appears second, its three rows show role RECOMMENDED and NOT_GRADED badges, and the long `keyNumbers[2]` line wraps cleanly. Search finds the card for "Vyalev", "Onapgo" and "Duopa". Report anything that renders oddly; don't change the content to fix it.
10. Add a "2026-11-09 — Review item R5 (Parkinson infusion therapies)" entry to `planning/DECISION_LOG.md`, using the text below word for word, then fill in the version numbers you recorded where it says `<from>` and `<to>`, and the C1 result where it says `<C1>`.
11. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.5 (the task R5 blocks) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 3.5, stop and ask.
12. Commit to the branch, push, and open a PR into `main` titled "Content: R5 Parkinson infusion pumps (1 entry, 1 registry bump)". Paste the version table, the change summary from README and the C1 result into the PR body. Don't merge.

When you're done, tell me the PR link, the C1 result, and confirm validate, tsc and tests pass.

---

Decision log entry (step 10), word for word apart from the placeholders:

```markdown
## 2026-11-09 — Review item R5 (Parkinson infusion therapies)

Approved by Jason in chat 2026-11-09 ("approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R5/` (base: review-2026-11-08 export packet). Entry `lastReviewed: "UNREVIEWED"`.

Finding: `inpatient-parkinson-disease` `pitfalls[1]` implied there is no US label for continuous SC apomorphine. Onapgo (continuous SC apomorphine; approved Feb 4, 2025) is labeled for motor fluctuations in advanced PD; Apokyn still covers pen doses only. The card had no guidance for patients admitted on Vyalev, Onapgo or Duopa. Sources: Vyalev PI 3/2026, Onapgo PI 5/2026 + Patient IFU 6/2026, Duopa PI and Medication Guide 3/2026 + CADD-Legacy 1400 Operator's Manual. No label addresses NPO status directly.

| Draft | Findings | Change |
|---|---|---|
| `reference-cards.inpatient-parkinson-disease.json` | F1–F5, E1–E4, K1–K5, D8 | New `sections[1]` "Admitted on an infusion pump": Vyalev (keep running; off >1 h new set/site, >3 h loading dose; backup oral carbidopa-levodopa; site infection; ×1.3 oral → pump; B6 seizures; pump MRI guidance not in label), Onapgo (keep running over waking day; ≥1 h break → extra dose as loading dose, max 2 mg, ≥3 h apart, ≤3/day; oral PD meds for prolonged stop; daily site/cartridge; no MRI; never IV; QTc; hemolytic anemia), Duopa (16-h infusion + night oral IR; off >2 h → oral IR; GI/tube complications; 20 mg/mL, 97% bioavailability; pump off for MRI; B6 seizures; polyneuropathy 5%); new Antiemetics row trimethobenzamide (only antiemetic studied with apomorphine; 300 mg PO TID); 5-HT3 row += Onapgo; `pitfalls[1]` reworded; Rotigotine dose `notes[0]` split (wording); keyNumbers[0]–[4] exact copies; title += pumps; 7 search terms; sources += 3 labels |

Rules adopted:
- Label-only rows are NOT_GRADED, with "<Drug> PI §…" in `evidenceNote`; a pump IFU or operator's manual is cited inside that product's label source string.
- Labels give oral → pump conversions only; the card states that and points to the patient's prescribed backup regimen rather than deriving a pump → oral conversion.
- keyNumbers are exact copies of one field, optionally prefixed by the row's `parameter` or `condition` + ": " (applies to reference cards as R3/R4 applied it to acute-neuro).

LEDD check (C1): Jost 2023 Table 1 gives subcutaneous foslevodopa/foscarbidopa "DD × 0.75", DD = foslevodopa mg (Table 3 example). Calculator: <C1>.

### Version
| what | from | to | level |
|---|---|---|---|
| reference-cards | <from> | <to> | MINOR (new rows and sources; pitfall meaning changed) |

### PARK (offered or noticed, not encoded; can be revived)
- D8b: sourced Vyalev MRI line (needs the VYAFUSER pump IFU).
- C2: calc:ledd coverage of LCIG (Jost × 1.11) and apomorphine infusion (× 10).
- A4: papaverine reduces levodopa effect (Vyalev/Duopa §7.3).
- A7: Duopa BUN/CPK elevations and false-positive pheochromocytoma screens (§5.12).
- A10: "trimethobenzamide" search term.

### ACCEPT (not raised again)
- C1 (pending Claude Code's read-only check): 0.75 matches Jost when applied to foslevodopa mg.
- A1: nonselective MAOI contraindication not encoded (common knowledge).
- A2: pump-label D2-antagonist, isoniazid, iron and protein interactions already covered by existing rows.
- A3: maximum doses, titration, Duopa starting-dose formula, storage not encoded.
- A5: Onapgo nitroglycerin, alcohol, renal first-extra-dose and sulfite items not encoded.
- A6: no label addresses NPO status; rows state only what labels say.
- A8: labels as uploaded (newer than the brief's dates); no further DailyMed check.
- A9: Jost 2023 read via web-fetch extraction; no Jost number encoded.

### Open items
- `verify[]`: none.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R5/README.md`.
```
