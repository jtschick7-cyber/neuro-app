Encode the approved R13 content draft in `planning/drafts/review-2026-11-08/R13/`. Read that folder's `README.md` first. It lists the one new entry, the version bump, the two read-only checks (C1, C2) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edit listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r13-2026-11-10` from current `main`, and put the R13 drafts folder on it. Record the base commit hash in the PR body. Confirm that no entry with `id` `neurosyphilis` already exists in `data/acute-neuro.json`; if one does, stop and tell me. Record the current `data/acute-neuro.json` `version`. R3, R4, R6 and R10 also bump this registry: if any of those PRs (or any other open PR touching `data/acute-neuro.json`) is still open, stop and ask me about merge order.
2. Append `acute-neuro.neurosyphilis.json` as the **last** entry of `entries` in `data/acute-neuro.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/acute-neuro.json`: one MINOR bump from the version recorded in step 1.
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"`. `verify[]` is empty; leave it empty. Don't sign anything off; I'll do that.
5. C1, read-only: search all of `data/*.json` for "syphilis", "VDRL", "FTA-ABS" and "treponem". For each hit, report the entry id, the field path and the line, and say whether it contradicts the new entry (e.g., a different regimen, dose or LP rule). Check especially `acute-neuro:cns-infection-immunocompromised`, `consult-workups:acute-vision-loss`, `consult-workups:cns-vasculitis-workup`, `consult-workups:young-stroke-workup` and `consult-workups:rapidly-progressive-dementia`. **Don't change any of them.**
6. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry until sign-off; that's fine. Don't hand-edit `generated/about.json`.
7. Run `npm run review-sheets` so I have a review sheet for sign-off.
8. Show me the diff of `data/acute-neuro.json` and check it against the CHANGES file. Only the new entry, `version` and `lastUpdated` should differ.
9. C2, check that the entry renders, and report only:
   - The five treatment rows appear with the FIRST_LINE, ALTERNATIVE, ADJUNCT and SUPPORTIVE badges and the NOT_GRADED evidence badge.
   - How the `UNITS` structured doses display (3000000–4000000; 18000000–24000000; 2400000): as raw integers or formatted. Don't change the data or the components to fix it; just report.
   - The long `definitions[10]` and `keyNumbers[1]` lines wrap cleanly.
   - Search finds the entry for "neurosyphilis", "ocular syphilis", "VDRL", "FTA-ABS", "desensitization" and "otosyphilis".
   - The five relatedIds resolve.
10. Add a "2026-11-10 — Review item R13 (neurosyphilis entry)" entry to `planning/DECISION_LOG.md`, using the text below word for word. Fill in the version numbers you recorded where it says `<from>` and `<to>`, and the C1 and C2 results where it says `<C1>` and `<C2>`.
11. In `REVIEW_TASKS_2026-11-08.md`, mark task 4.3 (the task R13 delivers) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 4.3, stop and ask.
12. Commit to the branch, push, and open a PR into `main` titled "Content: R13 neurosyphilis entry (1 new entry, 1 registry bump)". Paste the version table, the change summary from README and the C1 and C2 results into the PR body. Don't merge.

When you're done, tell me the PR link, the C1 and C2 results, and confirm validate, tsc and tests pass.

---

Decision log entry (step 10), word for word apart from the placeholders:

```markdown
## 2026-11-10 — Review item R13 (neurosyphilis entry)

Approved by Jason in chat 2026-11-10 ("approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R13/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had no neurosyphilis, ocular or otic syphilis content. Sources: CDC STI Treatment Guidelines 2021 (MMWR Recomm Rep 2021;70[RR-4]) and CDC Laboratory Recommendations for Syphilis Testing 2024 (MMWR Recomm Rep 2024;73[RR-1]). CDC 2021 is still current (web check 2026-11-10); its 2023 erratum does not touch the neurosyphilis pages.

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.neurosyphilis.json` | N1–N12, K1–K5 | New entry `neurosyphilis` (CNS_INFECTION): LP indications (neuro signs; ocular with CN dysfunction; ocular symptoms with normal exam; tertiary; treatment failure) and when LP is not needed (isolated ocular with findings; isolated otic); CSF interpretation (CSF-VDRL specific/insensitive, diagnostic with neuro signs; CSF FTA-ABS sensitive, negative excludes; CSF TP-PA with both CDC views; HIV CSF WBC >20/mm³); regimens (aqueous PCN G 18–24 MU/day × 10–14 d; procaine + probenecid × 10–14 d; ceftriaxone 1–2 g × 10–14 d for penicillin allergy; optional benzathine × 1–3 wk after); penicillin allergy (low/high-risk history, skin test → amoxicillin 250 mg challenge → desensitization by allergist; pregnancy penicillin only); HIV testing; follow-up (RPR normalization predicts CSF normalization; failure definition); stage regimens when CSF normal; 7 pitfalls; 5 keyNumbers; 5 relatedIds; 2 sources |

Rules adopted:
- CDC STI guideline regimens are ungraded → `NOT_GRADED`, with CDC's label ("Recommended Regimen", "Alternative Regimen", "Limited data indicate", "can be considered") quoted in `evidenceNote`.
- Where CDC documents disagree (CSF TP-PA), both views are shown and neither is presented as an equal option.
- Penicillin doses are encoded in `UNITS` as integers.

Overlap check (C1): <C1>. Rendering check (C2): <C2>.

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | <from> | <to> | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- C1: syphilis content in other entries (back-links and any duplicates).
- A4: Bicillin L-A shortage details (secondary sources; listed only as institution-varies).
- A6: CSF specimen handling for syphilis serology (LAB24 p.13).
- A8: back-links to this entry from related entries.
- A9: delayed-dose rules for weekly benzathine (CDC21 p.44).

### ACCEPT (not raised again)
- A1: stage features beyond timing, partner management, PrEP details, direct-detection and point-of-care tests not encoded.
- A2: stage-based titer schedules not encoded (no neurosyphilis-specific schedule in the sources).
- A3: skin-test reagents and the desensitization protocol not encoded.
- A5: CDC 2021 erratum does not affect encoded lines.
- A7: CSF RPR not encoded.
- A10: adults only.
- A11: formulary statuses as approved (ceftriaxone AVAILABLE; others INSTITUTION_VARIES).
- C2 (pending Claude Code's report): UNITS integers as encoded.

### Open items
- `verify[]`: none.
- Jason: review, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R13/README.md`.
```
