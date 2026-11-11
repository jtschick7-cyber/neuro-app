Encode the approved R15 content draft in `planning/drafts/review-2026-11-08/R15/`. Read that folder's `README.md` first. It lists the one new entry, the version bump, the two read-only checks (C1, C2) and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edit listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r15-2026-11-11` from current `main`, and put the R15 drafts folder on it. Record the base commit hash in the PR body. Confirm that no entry with `id` `lyme-neuroborreliosis` already exists in `data/acute-neuro.json`; if one does, stop and tell me. Record the current `data/acute-neuro.json` `version`. R3, R4, R6, R10 and R13 also bump this registry: if any of those PRs (or any other open PR touching `data/acute-neuro.json`) is still open, stop and ask me about merge order.
2. Append `acute-neuro.lyme-neuroborreliosis.json` as the **last** entry of `entries` in `data/acute-neuro.json`, **word for word**: the whole entry, same key order, nothing added, removed or reworded. Don't touch any other entry. Don't change anything a ledger row marks ACCEPT or PARK. Don't add a relatedId to `neurosyphilis`, even if that entry now exists (ledger A3).
3. Apply one bump, and update `lastUpdated` to today's date on the registry:
   - `data/acute-neuro.json`: one MINOR bump from the version recorded in step 1.
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"`. `verify[]` is empty; leave it empty. Don't sign anything off; I'll do that.
5. C1, read-only: search all of `data/*.json` for "Lyme", "Borrelia" and "neuroborreliosis". For each hit, report the entry id, the field path and the line, and say whether it contradicts the new entry (e.g., a different regimen, dose, duration or testing rule). Check especially `acute-neuro:bacterial-meningitis`, `acute-neuro:viral-encephalitis`, `consult-workups:inpatient-neuropathy`, `consult-workups:myelopathy-workup`, `consult-workups:new-demyelinating-lesion` and `consult-workups:acute-vision-loss`. **Don't change any of them.**
6. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If the draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entry until sign-off; that's fine. Don't hand-edit `generated/about.json`.
7. Run `npm run review-sheets` so I have a review sheet for sign-off.
8. Show me the diff of `data/acute-neuro.json` and check it against the CHANGES file. Only the new entry, `version` and `lastUpdated` should differ.
9. C2, check that the entry renders, and report only:
   - The four treatment rows appear with the FIRST_LINE and ALTERNATIVE badges and the STRONG evidence badge (the two ALTERNATIVE rows are STRONG on purpose).
   - How the `UNITS` structured dose (18000000–24000000) displays: as raw integers or formatted. Don't change the data or the components to fix it; just report.
   - The long `keyNumbers[4]` and `definitions[5]` lines wrap cleanly.
   - Search finds the entry for "Lyme", "neuroborreliosis", "facial palsy", "antibody index", "Borrelia" and "Bannwarth".
   - The six relatedIds resolve.
10. Add a "2026-11-11 — Review item R15 (Lyme neuroborreliosis entry)" entry to `planning/DECISION_LOG.md`, using the text below word for word. Fill in the version numbers you recorded where it says `<from>` and `<to>`, and the C1 and C2 results where it says `<C1>` and `<C2>`.
11. In `REVIEW_TASKS_2026-11-08.md`, mark task 4.5 (the task R15 delivers) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 4.5, stop and ask.
12. Commit to the branch, push, and open a PR into `main` titled "Content: R15 Lyme neuroborreliosis entry (1 new entry, 1 registry bump)". Paste the version table, the change summary from README and the C1 and C2 results into the PR body. Don't merge.

When you're done, tell me the PR link, the C1 and C2 results, and confirm validate, tsc and tests pass.

---

Decision log entry (step 10), word for word apart from the placeholders:

```markdown
## 2026-11-11 — Review item R15 (Lyme neuroborreliosis entry)

Approved by Jason in chat 2026-11-11 ("Approve as recommended"). Draft: `planning/drafts/review-2026-11-08/R15/` (new entry; no base). Entry `lastReviewed: "UNREVIEWED"`.

Finding: the app had no Lyme neuroborreliosis content. Source: IDSA/AAN/ACR 2020 Lyme disease guidelines (Lantos PM, et al. Clin Infect Dis 2021;72(1):e1–e48). No successor guideline found (web check 2026-11-11).

| Draft | Findings | Change |
|---|---|---|
| `acute-neuro.lyme-neuroborreliosis.json` | N1–N10, K1–K5 | New entry `lyme-neuroborreliosis` (CNS_INFECTION): who to test (acute meningitis, painful radiculoneuritis, mononeuropathy multiplex, acute cranial neuropathy, cord or brain inflammation, with plausible exposure) and who not to (typical ALS, RRMS, PD, dementia, new-onset seizures, psychiatric illness, nonspecific white matter lesions); testing (serum 2-tier antibody; paired CSF + serum antibody index; no PCR or culture; no CXCL13); reading results (index sensitivity >85% US / 56–79% Europe, stays elevated for years, normal doesn't exclude; CSF PCR 5–17%; early seronegativity → repeat in several weeks); regimens × 14–21 d (ceftriaxone 2000 mg IV daily; doxycycline 100 mg PO BID or 200 mg daily; cefotaxime 2000 mg IV TID; penicillin G 18–24 MU/day divided q4h); parenchymal disease IV, typically 2–4 weeks; facial palsy steroids (within 72 h if Lyme not established, age ≥16; no recommendation once Lyme is established); no additional antibiotics for nonspecific persistent symptoms; 8 pitfalls; 5 keyNumbers; 6 relatedIds; 1 source |

Rules adopted:
- GRADE "strong recommendation" → `STRONG` and "weak" → `WEAK`, with the guideline's exact wording and quality of evidence in `evidenceNote`.
- Agents graded together in one recommendation (XIII.1) all carry that grade; `role` follows the guideline's own Preferred/Alternative labels (Table 3).
- A "no recommendation, knowledge gap" statement is not encoded as a treatment row; it is shown in immediateActions and pitfalls.

Overlap check (C1): <C1>. Rendering check (C2): <C2>.

### Version
| what | from | to | level |
|---|---|---|---|
| acute-neuro | <from> | <to> | MINOR (new entry) |

### PARK (offered or noticed, not encoded; can be revived)
- C1: Lyme content in other entries (back-links and any duplicates).
- A3: relatedId to `acute-neuro:neurosyphilis` once R13 has merged.
- A5: current US availability of cefotaxime.
- A6: XXV.1 (no additional antibiotics) as a `NOT_RECOMMENDED` treatment row instead of a pitfall.
- A7: tests to avoid (urine antigen, lymphocyte transformation, CD57).
- A8: coinfection (Anaplasma, Babesia).
- A12: back-links to this entry from related entries.

### ACCEPT (not raised again)
- A1: erythema migrans, tick-bite prophylaxis, prevention, arthritis, PNS/CNS anatomy not encoded.
- A2: ICP-lowering doses and the facial palsy steroid dose are not in the source; not encoded.
- A4: formulary statuses as approved (ceftriaxone AVAILABLE; others INSTITUTION_VARIES).
- A9: carditis limited to one escalate line.
- A10: adults only.
- A11: antibody-index sensitivity figures shown with their origin (US vs Europe).
- A13: 2020 guideline is current.
- C2 (pending Claude Code's report): STRONG on ALTERNATIVE rows and UNITS integers as encoded.

### Open items
- `verify[]`: none.
- Jason: review, then `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R15/README.md`.
```
