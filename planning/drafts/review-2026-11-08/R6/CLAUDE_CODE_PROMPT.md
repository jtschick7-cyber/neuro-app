Encode the approved R6 content draft in `planning/drafts/review-2026-11-08/R6/`. Read that folder's `README.md` first. It lists the two entries, the version bump, the R3/R4 sequencing rule and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edits listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Check that the R3 and R4 PRs (both bump `data/acute-neuro.json`) have merged into `main`. If either is still open, stop and ask. Then create branch `content-r6-2026-11-09` from current `main` and put the R6 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm that `myasthenic-crisis` and `nmosd-mogad-attack` in `data/acute-neuro.json` still match the bases in the CHANGES files (the "current" columns; `lastReviewed` 2026-11-07 and 2026-11-08). If either has drifted, stop and tell me. Record the current `data/acute-neuro.json` `version`.
2. Replace the entry with `id` `myasthenic-crisis` with `acute-neuro.myasthenic-crisis.json`, and the entry with `id` `nmosd-mogad-attack` with `acute-neuro.nmosd-mogad-attack.json`, **word for word**: whole entries, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/acute-neuro.json`: one MINOR bump from the version recorded in step 1 (covers both entries).
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"` on both entries. `verify[]` stays empty. Don't sign anything off; I'll do that.
5. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If a draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entries until sign-off; that's fine. Don't hand-edit `generated/about.json`.
6. Run `npm run review-sheets` so I have review sheets for sign-off.
7. Show me the diff of each entry in `data/` (old vs new) and check it against its CHANGES table. Every changed field should appear there, and nothing else should differ apart from `lastReviewed`. Note the index shift listed in the myasthenic-crisis CHANGES: new `treatment[2]` and `[3]`; prednisone/prednisolone, pyridostigmine and supportive move from `[2]`–`[4]` to `[4]`–`[6]`. nmosd-mogad-attack has no index shifts (appends only).
8. Check that both entries render: the new ADJUNCT treatment rows show NOT_GRADED and INSTITUTION_VARIES badges; the long C5 `doseText` wraps cleanly; the four structured doses render with their frequency text; the new keyNumbers lines wrap cleanly; the `acute-neuro:bacterial-meningitis` link works. Search finds myasthenic-crisis for "Soliris", "Ultomiris", "Zilbrysq", "Vyvgart", "Rystiggo", "Imaavy" and "Uplizna", and nmosd-mogad-attack for "Soliris", "Uplizna" and "Enspryng". Report anything that renders oddly; don't change the content to fix it.
9. Add a "2026-11-09 — Review item R6 (MG/NMOSD on FcRn or complement inhibitors)" entry to `planning/DECISION_LOG.md`, using the text below word for word, then fill in the version numbers you recorded where it says `<from>` and `<to>`.
10. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.6 (the task R6 blocks) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 3.6, stop and ask.
11. Commit to the branch, push, and open a PR into `main` titled "Content: R6 MG/NMOSD on FcRn or complement inhibitors (2 entries, 1 registry bump)". Paste the version table and the change summary from README into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate, tsc and tests pass.

---

Decision log entry (step 9), word for word apart from the placeholders:

```markdown
## 2026-11-09 — Review item R6 (MG/NMOSD on FcRn or complement inhibitors)

Approved by Jason in chat 2026-11-09 ("approve"; recommendations as offered). Draft: `planning/drafts/review-2026-11-08/R6/` (base: review-2026-11-08 export packet). Both entries `lastReviewed: "UNREVIEWED"`.

Finding: `myasthenic-crisis` and `nmosd-mogad-attack` had no guidance for patients already on a complement C5 inhibitor or an FcRn blocker who need PLEX or IVIG, and no meningococcal warning. Sources: Soliris PI 6/2026, Ultomiris PI 10/2026, Zilbrysq PI 1/2026, Vyvgart PI 5/2026, Vyvgart Hytrulo PI 5/2026, Rystiggo PI 12/2025, Imaavy (nipocalimab) PI 8/2026, Uplizna PI 9/2026, Enspryng PI 10/2026. Soliris and Ultomiris give supplemental doses after PLEX (and Ultomiris after any IVIG cycle; Soliris none for acute-rescue IVIG). Zilbrysq, the four FcRn-blocker labels, Uplizna and Enspryng give no PLEX/IVIG dosing guidance.

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.myasthenic-crisis.json` | F1–F7, K1–K2, D2, D4 (i–iii) | New ADJUNCT `treatment[2]` "Already on a C5 inhibitor": eculizumab 300/600 mg within 60 min after each PLEX (by most recent dose), no supplement for acute-rescue IVIG; ravulizumab 1,200–1,800 mg within 4 h after each PLEX (by weight and most recent dose), 600 mg within 4 h after an IVIG cycle; zilucoplan label silent. New ADJUNCT `treatment[3]` "Already on an FcRn blocker": no label interval; may reduce effect of IVIG and IgG mAbs incl. eculizumab/ravulizumab; labels silent on PLEX; delay dose with active infection. Pitfalls += meningococcal (boxed warning), Safety Card 3/8/2 months, rozanolixizumab aseptic meningitis, inebilizumab no PLEX/IVIG guidance. institutionVaries += REMS dispensing. relatedIds += bacterial-meningitis. 16 search terms; 8 label sources; keyNumbers[2], [3] made exact copies |
| `acute-neuro.nmosd-mogad-attack.json` | N1–N4, K3, D2, D4 (ii) | New ADJUNCT `treatment[3]` C5 supplemental dosing (eculizumab PLEX only — IVIG table is gMG-only; ravulizumab PLEX and IVIG). Pitfalls += meningococcal, Safety Card 3/8 months, inebilizumab/satralizumab no PLEX/IVIG guidance. institutionVaries += REMS. relatedIds += bacterial-meningitis. 9 search terms; 4 label sources; keyNumbers[2] made an exact copy |

Rules adopted:
- Patients already on a biologic get an ADJUNCT treatment row ("Already on …") when the label gives doses or a concrete action; otherwise a pitfall line.
- When a label is silent on an interaction we'd look up (PLEX/IVIG), the entry says so explicitly rather than staying silent or inferring.
- Label rows are NOT_GRADED with "<Drug> PI §…" in `evidenceNote` (as R5).

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | <from> | <to> | MINOR (new dosed treatment rows, sources and safety lines; 2 entries) |

### PARK (offered or noticed, not encoded; can be revived)
- D5: starting a C5 or FcRn inhibitor during crisis (Gilhus 2024 p6 rec iv; ICG 2020 p6 antibiotic cover; label urgent-start prophylaxis) — candidate new item.
- D6: gefurulimab (EMA CHMP positive opinion 17 Sep 2026, Klygefa); no US approval found 2026-11-09 — recheck.
- A5: Imaavy latent viral reactivation / serious EBV events (§5.1).
- A6: Vyvgart Hytrulo CIDP worsening when switching from IVIG (§6.2).

### ACCEPT (not raised again)
- D3: FcRn half-lives not encoded (labels don't link them to IVIG/PLEX timing).
- A1: Ultomiris §7.1 cross-reference typo (§2.5 → table is §2.4).
- A2: Soliris FFP supplemental row not encoded.
- A3: eculizumab PLEX clearance data not encoded (dosing table covers it).
- A4: PLEX removal of FcRn blockers or zilucoplan not inferred.
- A7: Vyvgart indication broadened (5/2026) not encoded.
- A8: NMOSD-label screening and premedication items not encoded.
- A9: `IV` route on the advisory FcRn row.
- A10: labels as uploaded; no further DailyMed check.

### Open items
- `verify[]`: none.
- K1–K3 (keyNumbers made exact copies) were not offered in chat; revert to PARK if Jason prefers.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R6/README.md`.
```
