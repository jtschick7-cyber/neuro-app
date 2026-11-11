Encode the approved R8 content draft in `planning/drafts/review-2026-11-08/R8/`. Read that folder's `README.md` first. It lists the 8 new entries, the one `scopeNotes` change, the placement order, the version bump and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edits listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r8-2026-11-09` from current `main` and put the R8 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm that `data/antiseizure-medications.json` still has exactly the six entries `levetiracetam`, `lacosamide`, `brivaracetam`, `valproate`, `phenytoin-fosphenytoin`, `lamotrigine`, that `scopeNotes[2]` reads "Phenobarbital not covered — no source supplied", and that none of the 8 new ids already exists. If anything has drifted, stop and tell me. Record the current registry `version` (export: 1.0.1).
2. Append the 8 `antiseizure-medications.*.json` entries after `lamotrigine` in this order: oxcarbazepine, carbamazepine, topiramate, clobazam, zonisamide, cenobamate, perampanel, phenobarbital. **Word for word**: whole entries, same key order, nothing added, removed or reworded. Replace `scopeNotes[2]` with exactly: `Phenobarbital: no current FDA-approved adult label; card sourced from the AES 2024 ASM summary`. Don't touch any other entry, `scopeNotes[0]`–`[1]` or the registry `title`. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one MINOR bump to `data/antiseizure-medications.json` from the version recorded in step 1, and set `lastUpdated` to today's date. No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"` on all 8 entries. `verify[]` stays empty. Don't sign anything off; I'll do that.
5. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If a draft fails validation, stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entries until sign-off; that's fine. Don't hand-edit `generated/about.json`.
6. Run `npm run review-sheets` so I have review sheets for sign-off.
7. Show me the diff of `data/antiseizure-medications.json` (old vs new) and check it against the CHANGES files. Every new entry should match its JSON exactly; apart from the 8 appended entries, only `scopeNotes[2]`, `version` and `lastUpdated` should differ.
8. Check that the new cards render:
   - `INSTITUTION_VARIES` formulary badge on every maintenance item; `NOT_GRADED` evidence badge;
   - renal rows: oxcarbazepine CrCl <30 (Cockcroft-Gault), topiramate CrCl <70 (BSA-normalized) plus an HD row; HD rows on cenobamate and perampanel; carbamazepine, clobazam, zonisamide and phenobarbital have no renal rows (notes only);
   - the long carbamazepine `interactions` list and `enteral` list wrap cleanly;
   - every `relatedIds` and `calculatorIds` link works (`calc:cockcroft-gault` on oxcarbazepine, topiramate, cenobamate).
   Search should find:
   - `oxcarbazepine` for "Trileptal", "Oxtellar XR" and "MHD level";
   - `carbamazepine` for "Tegretol" and "Carnexiv";
   - `topiramate` for "Topamax" and "topiramate sprinkle";
   - `clobazam` for "Onfi" and "Sympazan";
   - `zonisamide` for "Zonegran" and "Zonisade";
   - `cenobamate` for "Xcopri" and "cenobamate NG tube";
   - `perampanel` for "Fycompa";
   - `phenobarbital` for "phenobarbital level".
   Report anything that renders oddly; don't change the content to fix it.
9. Add a "2026-11-09 — Review item R8 (home ASMs when NPO; phenobarbital)" entry to `planning/DECISION_LOG.md`, using the text below word for word, then fill in the version numbers you recorded where it says `<from>` and `<to>`.
10. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.8 (the task R8 blocks) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 3.8, stop and ask.
11. Commit to the branch, push, and open a PR into `main` titled "Content: R8 home ASMs when NPO + phenobarbital (8 new cards, 1 registry bump)". Paste the version table and the Files table from README into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate, tsc and tests pass.

---

Decision log entry (step 9), word for word apart from the placeholders:

```markdown
## 2026-11-09 — Review item R8 (home ASMs when NPO; phenobarbital)

Approved by Jason in chat 2026-11-09 ("Approve"; all recommendations as offered). Draft: `planning/drafts/review-2026-11-08/R8/` (base: review-2026-11-08 export packet). All 8 entries `lastReviewed: "UNREVIEWED"`.

Finding: the antiseizure-medications registry covered 6 ASMs; patients on oxcarbazepine, carbamazepine, topiramate, clobazam, zonisamide, cenobamate or perampanel who go NPO or get a tube had no card, and phenobarbital had no source. Sources: Trileptal PI 10/2026, Oxtellar XR PI 10/2026, Tegretol/Tegretol-XR PI 8/2026, Topamax PI 3/2026, Onfi PI 10/2026, Sympazan PI 12/2025, Zonegran PI 9/2026, Zonisade PI 9/2025, Xcopri PI 8/2025, Fycompa PI 1/2024; phenobarbital from the AES Treatments Committee ASM summary, 4th ed., rev. 4/1/2024 (Table 1), accepted by Jason because there is no current FDA adult phenobarbital label (Sezaby is neonatal only). Carnexiv (IV carbamazepine) is listed as discontinued by secondary sources; not encoded.

| Registry | New / edited | Change |
|---|---|---|
| antiseizure-medications | oxcarbazepine, carbamazepine, topiramate, clobazam, zonisamide, cenobamate, perampanel, phenobarbital (new); `scopeNotes[2]` (edited) | Oxcarbazepine: suspension 60 mg/mL equal-dose swap; Oxtellar XR not crushable, AUC ~19% lower than IR BID; CrCl <30 start 300 mg/day; Na <125 in 2.5%. Carbamazepine: suspension same mg/day more often, no co-administered liquids; XR never crushed; 4–12 mcg/mL; avoid DOACs; NMB resistance; SIADH. Topiramate: CrCl <70/1.73 m² half dose; HD supplement (no amount); sprinkle on soft food; valproate hyperammonemia. Clobazam: crush in applesauce, suspension, film; CYP2C19 inhibitors up to 5× metabolite. Zonisamide: avoid eGFR <50; Zonisade suspension; inducers shorten t½ to 27–38 h. Cenobamate: crush, 25 mL water, NG tube; phenytoin ↓ up to 50%; DRESS with fast titration. Perampanel: start 4 mg with inducers; suspension interchangeable; t½ ~105 h. Phenobarbital: 60 mg/day or 1–4 mg/kg/day, max 240; 15–45 mcg/mL; slow taper. scopeNotes: phenobarbital now covered from AES |

Rules adopted:
- One card per drug; XR, suspension and film products sit inside the generic card.
- New ASM items get `formularyStatus: INSTITUTION_VARIES` until a local status is supplied.
- AES serum ranges may be added to `levels[]` only with the attribution "range from AES Treatments Committee clinical experience, not the label"; a label range, where one exists, is used instead.
- Per-kg doses whose source doesn't name the weight stay in `doseText` and aren't structured.
- Where no label addresses tube administration, the card says "Tube administration not addressed in label — confirm with pharmacy".

### Version
| what | from | to | level |
|---|---|---|---|
| antiseizure-medications | <from> | <to> | MINOR (8 new entries; scopeNotes[2] edited) |

### PARK (offered or noticed, not encoded; can be revived)
- D7: matching lines in existing cards (phenytoin-fosphenytoin: oxcarbazepine >1200 mg/day and cenobamate ↑ phenytoin, topiramate; lamotrigine: cenobamate ↓ lamotrigine) — candidate follow-up item.
- P2: `relatedIds` between the 8 new cards and to R7 entries — later PATCH once the ids are valid.

### ACCEPT (not raised again)
- D3: Carnexiv market status not encoded (secondary sources only).
- A1: Sezaby neonatal label not encoded.
- A2: no label re-titration rule for cenobamate after interruption.
- A3: no label Oxtellar XR → IR conversion (card states the exposure data).
- A4: no label topiramate HD supplement amount (card says so).
- A5: phenobarbital gaps in the AES source stated on the card (weight basis, route, IV↔PO, renal, enteral).
- A6: clobazam structured doses for the >30 kg band only.
- A7: carbamazepine interaction list abridged.
- A8: common-knowledge and out-of-scope items left out.
- A9: no topiramate IV or other non-US forms.
- A10: labels as uploaded; only Carnexiv and Sezaby status checked on the web.

### Open items
- `verify[]`: none.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R8/README.md`.
```
