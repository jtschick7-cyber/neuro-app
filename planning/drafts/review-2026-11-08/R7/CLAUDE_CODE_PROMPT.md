Encode the approved R7 content draft in `planning/drafts/review-2026-11-08/R7/`. Read that folder's `README.md` first. It lists the 12 new entries and 1 replacement entry, the placement order, the two version bumps and the complete Disposition Ledger. Every item is FIX, ACCEPT or PARK; PARK items need no action.

This is an approved content change, so the CLAUDE.md rule against editing `data/*.json` doesn't apply to the edits listed here. There is no code, calculator or schema change. Follow `docs/VERSIONING.md` and these rules:

1. Create branch `content-r7-2026-11-09` from current `main` and put the R7 drafts folder on it. Record the base commit hash in the PR body. Before editing, confirm that `carbapenems-valproate` in `data/asm-interactions.json` still matches the base in its CHANGES file (the "current" column; `lastReviewed` 2026-11-05), and that none of the 12 new ids already exists in `data/seizure-threshold.json` or `data/asm-interactions.json`. If anything has drifted, stop and tell me. Record the current `version` of both registries (export: 0.2.5 and 0.1.1).
2. Append the six `seizure-threshold.*.json` entries to `data/seizure-threshold.json` after `meperidine`, and the six new `asm-interactions.*.json` entries (all except `carbapenems-valproate`) to `data/asm-interactions.json` after `cns-polypharmacy-falls`, in the order of the README Files table. Replace the entry with `id` `carbapenems-valproate` with `asm-interactions.carbapenems-valproate.json` in place. All **word for word**: whole entries, same key order, nothing added, removed or reworded. Don't touch any other entry or the registry `title`, `condition` or `scopeNotes`. Don't change anything a ledger row marks ACCEPT or PARK.
3. Apply one bump per registry, and update `lastUpdated` to today's date on each:
   - `data/seizure-threshold.json`: one MINOR bump from the version recorded in step 1.
   - `data/asm-interactions.json`: one MINOR bump from the version recorded in step 1.
   - No `package.json` bump and no `schemaVersion` change.
4. Keep `lastReviewed: "UNREVIEWED"` on all 13 entries. `verify[]` stays empty. Don't sign anything off; I'll do that.
5. Run `npm run validate`, `npx tsc --noEmit` and `npm test`, and fix only problems caused by the encoding itself. If a draft fails validation (including the `saferAlternatives` cross-entry rule), stop and report it rather than changing its content. `npm run validate:release` and `build` are expected to fail on the UNREVIEWED entries until sign-off; that's fine. Don't hand-edit `generated/about.json`.
6. Run `npm run review-sheets` so I have review sheets for sign-off.
7. Show me the diff of each registry in `data/` (old vs new) and check it against the CHANGES files. Every new entry should match its JSON exactly; `carbapenems-valproate` should differ only in `management[2]`, `sources[1]` and `lastReviewed`; nothing else should differ apart from `version` and `lastUpdated`.
8. Check that the new entries render:
   - tier badges: AVOID on `intrathecal-baclofen`, `inducing-asm-dabigatran-edoxaban` and `inducing-asm-voriconazole`; CAUTION elsewhere; `carbapenems-valproate` stays HIGH_RISK;
   - no boxed-warning badge on any new threshold entry;
   - the long `intrathecal-baclofen` pearls list and the long precipitant list on `lacosamide-conduction-drugs` wrap cleanly;
   - every `relatedIds` link works.
   Search should find:
   - `isoniazid` for "INH" and "pyridoxine";
   - `imipenem-cilastatin` for "Primaxin";
   - `calcineurin-inhibitors` for "Prograf", "Neoral" and "Sandimmune";
   - `intrathecal-baclofen` for "Gablofen", "baclofen pump" and "ITB withdrawal";
   - `busulfan` for "Busulfex";
   - `azoles-phenytoin` for "Vfend phenytoin";
   - `inducing-asm-voriconazole` for "Vfend Tegretol";
   - `inducing-asm-dabigatran-edoxaban` for "Pradaxa Tegretol".
   Report anything that renders oddly; don't change the content to fix it.
9. Add a "2026-11-09 — Review item R7 (seizure-threshold and ASM-interaction lists)" entry to `planning/DECISION_LOG.md`, using the text below word for word, then fill in the version numbers you recorded where it says `<from>` and `<to>`.
10. In `REVIEW_TASKS_2026-11-08.md`, mark task 3.7 (the task R7 blocks) as drafted with the PR link, in the file's existing style. Don't restructure the file. If you can't find task 3.7, stop and ask.
11. Commit to the branch, push, and open a PR into `main` titled "Content: R7 seizure-threshold and ASM-interaction lists (13 entries, 2 registry bumps)". Paste the version table and the Files table from README into the PR body. Don't merge.

When you're done, tell me the PR link and confirm validate, tsc and tests pass.

---

Decision log entry (step 9), word for word apart from the placeholders:

```markdown
## 2026-11-09 — Review item R7 (seizure-threshold and ASM-interaction lists)

Approved by Jason in chat 2026-11-09 ("Approve"; all recommendations as offered). Draft: `planning/drafts/review-2026-11-08/R7/` (base: review-2026-11-08 export packet). All 13 entries `lastReviewed: "UNREVIEWED"`.

Finding: the seizure-threshold list lacked isoniazid, imipenem, calcineurin inhibitors, ifosfamide, intrathecal baclofen and busulfan; the ASM-interaction list lacked inducer–calcineurin-inhibitor, CYP3A4-inhibitor–carbamazepine, azole–phenytoin, inducer–dabigatran/edoxaban, lacosamide–conduction-drug and inducer–voriconazole entries. Sources: isoniazid PI (Marlex) 9/2025, Primaxin PI 7/2024, Prograf PI 8/2023, Neoral PI 8/2026, Ifex PI 10/2026, Gablofen PI 5/2026, Lioresal Intrathecal PI 12/2022, Busulfex PI 10/2026, Tegretol PI 8/2026, Dilantin PI 8/2023, fluconazole PI (ANI) 8/2025, voriconazole PI (Aurobindo) 4/2026, Pradaxa PI 6/2025, Savaysa PI 7/2025, Vimpat PI 5/2026. The Primaxin label makes no comparison with other carbapenems, so "strongest carbapenem signal" was not encoded.

| Registry | New / edited | Change |
|---|---|---|
| seizure-threshold | isoniazid, imipenem-cilastatin, calcineurin-inhibitors, ifosfamide, intrathecal-baclofen, busulfan (new) | Isoniazid: overdose seizures; pyridoxine gram for gram, 5 g if unknown; diazepam. Imipenem: 0.4% seizures; CrCl ≤30 higher risk; <15 only with HD within 48 h; ganciclovir. Tacrolimus/cyclosporine: PRES, seizures; cyclosporine PRES risk factors. Ifosfamide: encephalopathy incl. seizures; methylene blue (no label dose); CYP3A4 inducers. IT baclofen (AVOID abrupt interruption): withdrawal and overdose seizures; restore IT dose; physostigmine 2 mg ≤1 mg/min; CSF 30–40 mL. Busulfan: label ASM prophylaxis 12 h before to 24 h after |
| asm-interactions | inducing-asm-calcineurin-inhibitors, cyp3a4-inhibitors-carbamazepine, azoles-phenytoin, inducing-asm-dabigatran-edoxaban, lacosamide-conduction-drugs, inducing-asm-voriconazole (new); carbapenems-valproate (edited) | Inducers ↓ tacrolimus/cyclosporine (CAUTION). Macrolides, fluconazole (+30%), voriconazole, isoniazid ↑ carbamazepine (CAUTION). Fluconazole (AUC +88%) / voriconazole ↑ phenytoin; voriconazole dose ↑ with phenytoin (CAUTION). Carbamazepine/phenytoin with dabigatran/edoxaban (AVOID; Tegretol names both; Pradaxa/Savaysa name only rifampin). Lacosamide + conduction-affecting drugs: ECG before and at steady state (CAUTION). Voriconazole contraindicated with carbamazepine and long-acting barbiturates (AVOID). carbapenems-valproate: + Primaxin "generally not recommended" line and source; tier unchanged |

Rules adopted:
- `fdaBoxedWarning` is true only when the boxed warning itself names seizures; a boxed warning on a related hazard (encephalopathy, withdrawal) is named in a pearl instead.
- When a tier word could be misread (IT baclofen AVOID), the title and `pearls[0]` say what is to be avoided.
- When labels disagree in strength for drugs sharing an entry, the entry takes the strongest label wording as its tier and states each label's own wording in `management`.
- New entries link only to ids already in `valid-ids.txt`; links between entries added in the same item are text until a later PATCH.

### Version
| what | from | to | level |
|---|---|---|---|
| seizure-threshold | <from> | <to> | MINOR (6 new entries) |
| asm-interactions | <from> | <to> | MINOR (6 new entries; 1 edited) |

### PARK (offered or noticed, not encoded; can be revived)
- D8: general ASM + oral chemotherapy / antiretroviral entry (Tegretol and Dilantin label-named pairs) — candidate item.
- D9e: Beers 2023 baclofen eGFR <60 encephalopathy (oral baclofen).

### ACCEPT (not raised again)
- A1: "imipenem = strongest carbapenem signal" not encoded (no label comparison).
- A2: methylene blue dose for ifosfamide encephalopathy not encoded (label gives none).
- A3: Primaxin VPA-glucuronide mechanism hypothesis not added.
- A4: Sandimmune label not read; search term only.
- A5: macrolide labels not uploaded; Tegretol is the source.
- A6: fosphenytoin covered by the prodrug pearl (Cerebyx not re-uploaded).
- A7: common-knowledge items left out.
- A8: no Beers 2023 seizure row applies.
- A9: existing apixaban/rivaroxaban entry unchanged.
- A10: labels as uploaded; no further DailyMed check.
- A11: cross-links between new R7 entries left for a later PATCH.

### Open items
- `verify[]`: none.
- Jason: `npm run signoff`, then `npm run release`.
- Disposition Ledger: see `planning/drafts/review-2026-11-08/R7/README.md`.
```
