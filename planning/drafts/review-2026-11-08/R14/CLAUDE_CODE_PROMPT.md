Encode the approved R14 content draft in `planning/drafts/review-2026-11-08/R14/`. Read that folder's `README.md` first. It lists the one new entry, the version bump, the two read-only checks (C1, C2) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edit listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r14-2026-11-10` from current `main`, and put the R14 drafts folder on it. Record the base commit hash in the PR body. Confirm that no entry with `id` `aria-anti-amyloid` already exists in `data/consult-workups.json`; if one does, stop and tell me. Record the current `data/consult-workups.json` `version`. If any other open PR touches `data/consult-workups.json`, stop and ask me about merge order.
2. Append `consult-workups.aria-anti-amyloid.json` as the **last** entry of `entries` in `data/consult-workups.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/consult-workups.json`: one MINOR bump from the version recorded in step 1.
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"`. `verify[]` has five items; leave all five. Don't sign anything off; I'll do that.
5. C1, read-only: search all of `data/*.json` for "ARIA", "amyloid", "lecanemab", "donanemab", "Leqembi" and "Kisunla". For each hit outside the new entry, report the entry id, the field path and the line, and say whether it contradicts the new entry (e.g., a different hold rule, thrombolysis statement or steroid regimen). Check especially `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics`, `consult-workups:caa-related-inflammation`, `consult-workups:rapidly-progressive-dementia` and `consult-workups:ich-etiology-workup`. **Don't change any of them.**
6. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry and its open verify[] items until sign-off; that's fine. Don't hand-edit `generated/about.json`.
7. Run `npm run review-sheets` so I have a review sheet for sign-off.
8. Show me the diff of `data/consult-workups.json` and check it against the CHANGES file. Only the new entry, `version` and `lastUpdated` should differ.
9. C2, check that the entry renders, and report only:
   - The 18 decision rules appear in order with the NOT_GRADED and EXPERT_OPINION badges.
   - The long lines wrap cleanly: `decisionRules[12]`, `[13]`, `[14]` and `[17]` recommendations, and `workup[1].notes[3]`.
   - The five `keyNumbers` lines display and match their source fields.
   - The `verify[]` items display.
   - Search finds the entry for "ARIA", "lecanemab", "donanemab", "Leqembi", "Kisunla", "amyloid related imaging abnormalities" and "superficial siderosis".
   - The eight relatedIds resolve.
10. Add a "2026-11-10 — Review item R14 (ARIA on anti-amyloid therapy entry)" entry to `planning/DECISION_LOG.md`, using the text below word for word. Fill in the version numbers you recorded where it says `<from>` and `<to>`, and the C1 and C2 results where it says `<C1>` and `<C2>`.
11. In `REVIEW_TASKS_2026-11-08.md`, mark task 4.4 (the task R14 delivers) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 4.4, stop and ask.
12. Commit to the branch, push, and open a PR into `main` titled "Content: R14 ARIA on anti-amyloid therapy entry (1 new entry, 1 registry bump)". Paste the version table, the change summary from README and the C1 and C2 results into the PR body. Don't merge.

When you're done, tell me the PR link, the C1 and C2 results, and confirm validate, tsc and tests pass.

---

Decision log entry (step 10), word for word apart from the placeholders:

```markdown
## 2026-11-10 — Review item R14 (ARIA on anti-amyloid therapy entry)

Approved by Jason in chat 2026-11-10 ("Otherwise approved"), after the proposal with decisions D1–D12 as recommended. Draft: `planning/drafts/review-2026-11-08/R14/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had no ARIA or anti-amyloid therapy content. Sources: Leqembi PI (rev 7/2026), Kisunla PI (rev 7/2025), Lecanemab AUR (Cummings, JPAD 2023), Donanemab AUR (Rabinovici, JPAD 2025), ASNR imaging recommendations (Cogswell, AJNR 2025). Both labels match the current DailyMed/FDA versions by search snippet only (web check 2026-11-10). The uploaded AHA 2026 Table 8 extract stops before the amyloid immunotherapy/ARIA row; nothing is encoded from it.

| Draft | Findings | Change |
|---|---|---|
| `consult-workups.aria-anti-amyloid.json` | A1–A14, K1–K5 | New entry `aria-anti-amyloid` (COGNITION_ENCEPHALOPATHY): recognition and mimics (stroke, ICH >1 cm, CAA-ri, PRES, seizure); MRI FLAIR, GRE, DWI and grading (ARIA-E by size, ARIA-H by count); surveillance schedules per label (lecanemab: 1, 2, 3, 6 months; donanemab: before infusions 2, 3, 4, 7); label hold rules (ARIA-E and ARIA-H tables, ICH >1 cm, recurrent ARIA-E); AUR rules shown separately (suspend with symptoms, discontinue for severe, drug-specific stopping lists, resume criteria); steroids (AUR only: methylprednisolone 1 g IV daily for 5 days, then oral taper over several weeks); antithrombotics (label caution; AUR stop the antibody if an anticoagulant is needed); thrombolysis as a link plus one label rule and one AUR rule; ApoE ε4 rates per drug; 18 decision rules; 11 pearls; 5 keyNumbers; 5 verify; 8 relatedIds; 5 sources |

Rules adopted:
- Label statements are `NOT_GRADED`. AUR and ASNR statements are `EXPERT_OPINION`, with the document named in `evidenceNote`. Neither AUR is a formal Delphi, so nothing is `CONSENSUS`.
- Where a label and an AUR differ (mild symptoms with mild ARIA-E; severe radiographic ARIA; anticoagulant needed; follow-up MRI interval), both are shown as separate rules and neither is picked.
- Label MRI schedules only; the older lecanemab AUR schedule is not used.
- Seizures: source-stated content only; no antiseizure medication or dose.
- AHA 2026 Table 8 is not restated; IVT is a link to `vascular-antithrombotics:thrombolysis-with-prior-antithrombotics`.

Overlap check (C1): <C1>. Rendering check (C2): <C2>.

### Version
| what | from | to | level |
|---|---|---|---|
| consult-workups | <from> | <to> | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- C1: ARIA or anti-amyloid mentions in other entries.
- B8: overall ARIA incidence by arm and serious or fatal ARIA counts.
- B9: AUR Table 9 resource list for serious ARIA (one line in institutionVaries only).

### ACCEPT (not raised again)
- B1: category COGNITION_ENCEPHALOPATHY.
- B2: hold/stop and steroid rules held as DecisionRules in consult-workups despite the schema header comment; no schema change.
- B3: label follow-up MRI at 2 to 4 months and AUR monthly MRI both shown.
- B4: older lecanemab AUR and ASNR MRI schedule not used.
- B5: ANA white paper rule as quoted in ASNR not encoded (secondary).
- B6: radiology workflow items (GRE TE values, vendor protocols, templates, orders, communication) not encoded.
- B7: eligibility and exclusion rules, infusion reactions, amyloid confirmation and PET stopping rules not encoded.
- B10: steroid reference (Regenhardt 2020) not read; regimen from the two AURs only.
- B11: local ICU, MRI and prescriber details left as institution-varies.
- B12: aducanumab not covered.
- B13: common knowledge left out (ARIA pathophysiology, antibody mechanism, general status epilepticus care, general stroke workup).
- C2 (pending Claude Code's report): rendering of long rule lines.

### Open items
- `verify[]` (5): AHA 2026 Table 8 amyloid row not seen; lecanemab AUR siderosis threshold (text vs Fig 2); lecanemab AUR Fig 2 vs text on asymptomatic severe ARIA; lecanemab AUR cited by manuscript pages; label currency checked by snippet only.
- Jason: clear the verify[] items, review, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R14/README.md`.
```
