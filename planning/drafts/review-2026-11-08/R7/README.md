# Review 2026-11-08, item R7: drafts (planning/drafts/review-2026-11-08/R7/)

Seizure-threshold and ASM-interaction lists (old task 7.8; blocks task 3.7), from label text only. Approved by Jason in chat 2026-11-09 ("Approve"; every recommendation as offered): D1 all six threshold entries, tacrolimus + cyclosporine combined; D2 new imipenem entry, class entry untouched; D3 `fdaBoxedWarning: false` for ifosfamide and IT baclofen, boxed warning named in a pearl; D4 CAUTION for all threshold entries except IT baclofen (AVOID); D5 new DOAC entry, AVOID, per-label wording; D6 oxcarbazepine included; D7 lacosamide entry added; D8 PARK the general chemo/ARV entry; D9 (a) yes, (b) yes, (c) yes, (d) yes, (e) PARK; assumptions 1–4 accepted.

Base: `current/seizure-threshold.json` (version 0.2.5) and `current/asm-interactions.json` (version 0.1.1) from the review-2026-11-08 export packet. Every new or edited entry has `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- Every threshold candidate has label support: isoniazid (overdose → pyridoxine), imipenem, tacrolimus/cyclosporine (PRES/seizures), ifosfamide (encephalopathy), IT baclofen (withdrawal and overdose), busulfan (label-required ASM prophylaxis).
- "Imipenem = strongest carbapenem signal" can't be confirmed: the Primaxin label makes no comparison with other carbapenems. Not encoded.
- Every interaction candidate has label support except the broad "ASMs with oral chemotherapy or antiretrovirals" one, which is PARKed (D8). The two consult-relevant pairs, ifosfamide + CYP3A4 inducers and busulfan + phenytoin, are pearls in their threshold entries.
- Not anticipated: voriconazole is **contraindicated** with carbamazepine and long-acting barbiturates (new AVOID entry); Pradaxa and Savaysa name only rifampin as the inducer to avoid, but Tegretol names both drugs (avoid) and Dilantin lists both as lowered.

**Assumptions accepted:**
1. Sources cite the DailyMed footer revision date. That date differs from the Highlights date for Savaysa, Primaxin, Gablofen and Busulfex.
2. New entries link only to ids already in `valid-ids.txt`. New-to-new cross-references are text only.
3. Labels are treated as current as uploaded; there was no further DailyMed check.
4. Two MINOR bumps, no schema or app bump.

**Validation actually run** (not only read): each of the 13 drafts was parsed with zod 3 against `CautionEntry` / `InteractionEntry`, using `schema/common.ts` verbatim and `caution-list.ts` / `drug-interactions.ts` with comments stripped (logic unchanged). Result: **PASS**. Two negative controls (a source without a year; a drug on both sides) were rejected, which confirms the check is live. The same script confirmed:
- key order matches the schema / existing entries;
- `lastReviewed` is UNREVIEWED;
- every `relatedIds` entry is in `valid-ids.txt` and none is a removed id;
- no new id collides with an existing id;
- `saferAlternatives` is empty in every new threshold entry, so validate.ts's cross-entry rule can't trip.

**Not machine-checked:**
- The `carbapenems-valproate` base was transcribed from the project copy of the export and checked by reading; Claude Code step 1 confirms `data/` still matches.
- `npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: encode the 12 new entries (appended in the order listed below) and the one replacement entry word for word, validate, show the diffs against the CHANGES files, then apply **one** bump per registry. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File (+ `…CHANGES.md`) | Findings | Change |
|---|---|---|
| `seizure-threshold.isoniazid.json` | F-T1, D9c | New CAUTION entry: overdose seizures; pyridoxine gram for gram / 5 g unknown; diazepam; INH ↑ carbamazepine and phenytoin |
| `seizure-threshold.imipenem-cilastatin.json` | F-T2, D2 | New CAUTION entry: 0.4% seizures; CrCl ≤30 / <15 / HD rules; ganciclovir; valproate |
| `seizure-threshold.calcineurin-inhibitors.json` | F-T3, D1 | New CAUTION entry: tacrolimus and cyclosporine PRES/seizures, risk factors, CYP3A-inhibitor spikes |
| `seizure-threshold.ifosfamide.json` | F-T4, D3, D8 | New CAUTION entry: encephalopathy incl. seizures; risk factors; methylene blue (no dose); CYP3A4 inducers |
| `seizure-threshold.intrathecal-baclofen.json` | F-T5, D3, D4 | New AVOID entry (abrupt interruption): withdrawal and overdose seizures, recognition, causes, treatment, physostigmine, CSF removal |
| `seizure-threshold.busulfan.json` | F-T6, D8 | New CAUTION entry: label-required ASM prophylaxis window and agents; phenytoin ↑ clearance |
| `asm-interactions.inducing-asm-calcineurin-inhibitors.json` | F-I1, D6 | New CAUTION entry |
| `asm-interactions.cyp3a4-inhibitors-carbamazepine.json` | F-I2, D9d | New CAUTION entry (macrolides, fluconazole, voriconazole, isoniazid) |
| `asm-interactions.azoles-phenytoin.json` | F-I3 | New CAUTION entry; two-way voriconazole dose increase |
| `asm-interactions.inducing-asm-dabigatran-edoxaban.json` | F-I4, D5 | New AVOID entry |
| `asm-interactions.lacosamide-conduction-drugs.json` | F-I5, D7 | New CAUTION entry |
| `asm-interactions.inducing-asm-voriconazole.json` | F-I6, D9a | New AVOID entry (contraindicated) |
| `asm-interactions.carbapenems-valproate.json` | D9b | Replacement: `management[2]` imipenem line; `sources[1]` Primaxin |

**Placement:** append the new entries after the current last entry of each registry, in the order in this table (seizure-threshold: after `meperidine`; asm-interactions: after `cns-polypharmacy-falls`). `carbapenems-valproate` stays in place.

## keyNumbers
- None. The caution-list and drug-interactions schemas have no `keyNumbers` field.

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/seizure-threshold.json` | 0.2.5 (export) | 0.3.0 | MINOR | 6 new entries |
| `data/asm-interactions.json` | 0.1.1 (export) | 0.2.0 | MINOR | 6 new entries; new management line and source on `carbapenems-valproate` |

Update `lastUpdated` on both registries to the encoding date. No `package.json` bump (no code or UI change); no `schemaVersion` change (existing fields and enums only). If either registry's version in `data/` differs from the export, Claude Code bumps one MINOR from the version it finds and records it.

## Open verify[]
- None. Every new entry has `verify: []`; `carbapenems-valproate` base had `verify: []` and nothing was added.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F-T1 | seizure-threshold:isoniazid | INH overdose seizures and pyridoxine dosing absent | **FIX** |
| F-T2 | seizure-threshold:imipenem-cilastatin | Imipenem label seizure rules absent (only class entry) | **FIX** (D2) |
| F-T3 | seizure-threshold:calcineurin-inhibitors | Tacrolimus/cyclosporine PRES and seizures absent | **FIX** (D1 combined) |
| F-T4 | seizure-threshold:ifosfamide | Ifosfamide encephalopathy absent | **FIX** |
| F-T5 | seizure-threshold:intrathecal-baclofen | IT baclofen withdrawal/overdose absent | **FIX** (D4 AVOID) |
| F-T6 | seizure-threshold:busulfan | Busulfan prophylaxis requirement absent | **FIX** |
| D3 | ifosfamide, intrathecal-baclofen `fdaBoxedWarning` | Boxed warnings are encephalopathy / withdrawal, not seizures | **FIX**: false + boxed warning named in a pearl |
| F-I1 | asm-interactions:inducing-asm-calcineurin-inhibitors | Inducer–CNI interaction absent | **FIX** (D6 oxcarbazepine incl.) |
| F-I2 | asm-interactions:cyp3a4-inhibitors-carbamazepine | Macrolide–carbamazepine absent | **FIX** (D9d broadened to azoles, INH) |
| F-I3 | asm-interactions:azoles-phenytoin | Fluconazole/voriconazole–phenytoin absent | **FIX** |
| F-I4 | asm-interactions:inducing-asm-dabigatran-edoxaban | Existing DOAC entry covers apixaban/rivaroxaban only | **FIX** (D5 new entry; existing entry unchanged) |
| F-I5 | asm-interactions:lacosamide-conduction-drugs | Not in the interaction list (partly in `lacosamide` card) | **FIX** (D7) |
| F-I6 | asm-interactions:inducing-asm-voriconazole | Voriconazole contraindicated with carbamazepine/long-acting barbiturates | **FIX** (D9a) |
| D9b | asm-interactions:carbapenems-valproate | Primaxin §5.3: "generally not recommended", dose increase may not suffice | **FIX** (tier unchanged HIGH_RISK) |
| D9c | isoniazid `pearls[5]` | INH ↑ carbamazepine/phenytoin | **FIX** |
| D8 | — | General ASM + oral chemotherapy/antiretroviral entry (Tegretol: temsirolimus, lapatinib, imatinib, cyclophosphamide, protease inhibitors; Dilantin: capecitabine/5-FU, irinotecan, paclitaxel, teniposide, delavirdine, efavirenz, lopinavir/ritonavir etc.) | **PARK**: would become a checker; candidate item if wanted |
| D9e | — | Beers 2023 Table 6: baclofen eGFR <60 → encephalopathy (oral baclofen; avoid / lowest dose) | **PARK**: not a seizure item |
| A1 | — | Brief's "imipenem = strongest carbapenem signal" | **ACCEPT**: not encoded; label has no comparison |
| A2 | ifosfamide | Methylene blue dose | **ACCEPT**: label gives none; not encoded |
| A3 | carbapenems-valproate `mechanism` | Primaxin §7.3 VPA-glucuronide hypothesis | **ACCEPT**: not added |
| A4 | calcineurin-inhibitors | Sandimmune label not read | **ACCEPT**: search term only; Neoral is the cyclosporine source |
| A5 | — | Erythromycin/clarithromycin labels not uploaded | **ACCEPT**: Tegretol (object-drug label) is the source |
| A6 | — | Cerebyx not in this upload | **ACCEPT**: fosphenytoin via "prodrug — same interaction" pearl (existing-entry precedent) |
| A7 | — | Common knowledge left out: routine pyridoxine for neuropathy, acetylator status, generic CYP/P-gp text, pediatric-only lines, Neoral alcohol-content note | **ACCEPT** |
| A8 | — | Beers 2023 has no seizure-history drug–disease row relevant to R7 | **ACCEPT**: Beers not cited in R7 entries |
| A9 | inducing-asm-apixaban-rivaroxaban | Tegretol now also says avoid apixaban/rivaroxaban | **ACCEPT**: existing entry already sourced; unchanged |
| A10 | — | Label currency | **ACCEPT**: as uploaded; no DailyMed check |
| A11 | — | Cross-links between new R7 entries | **ACCEPT**: text only (ids not yet in `valid-ids.txt`); can be added in a later PATCH |

No PARK item needs action now.

## Sources used (attached to the planning chat)
Reading method: each label was keyword-searched in full (seizure, convulsion, encephalopathy, withdrawal, overdose and every interacting drug named in the brief), and every section used below was read in full.

- Isoniazid tablets USP PI, Marlex, revised 9/2025 (17 pages). Used: Adverse Reactions, Drug Interactions, Overdosage.
- Primaxin IV PI, Merck, revised 7/2024 (33 pages). Used: §2.3–2.4, §5.2–5.3, §6.1 Table 4, §7.1, §7.3, §8.6.
- Prograf PI, Astellas, revised 8/2023 (80 pages). Used: §5.6, §5.11, Table 15.
- Neoral PI, Novartis, revised 8/2026 (38 pages). Used: Warnings (Neurotoxicity), Precautions (Drug Interactions A and B).
- Ifex PI, Baxter, revised 10/2026 (35 pages). Used: Boxed Warning, §5.2, §6.2, §7.1.
- Gablofen PI, Piramal Critical Care, revised 5/2026 (39 pages). Used: Boxed Warning, §5.5, §6.1 Tables 1–2, §10.
- Lioresal Intrathecal PI, Amneal, revised 12/2022 (69 pages). Same content as Gablofen (older format); second source.
- Busulfex PI, Otsuka, revised 10/2026 (25 pages). Used: §2.1, §5.2, §7.2.
- Tegretol PI, Novartis, revised 8/2026 (25 pages). Used: Precautions (Drug Interactions).
- Dilantin PI, Viatris, revised 8/2023 (31 pages). Used: §7.1–7.2, Tables 2–3.
- Fluconazole tablets PI, ANI, revised 8/2025 (41 pages). Used: Clinical Pharmacology (Drug Interaction Studies), Precautions (Drug Interactions).
- Voriconazole tablets PI, Aurobindo, revised 4/2026 (70 pages). Used: §2.7, §4, §7 Tables 10–11.
- Pradaxa PI, Boehringer Ingelheim, revised 6/2025 (59 pages). Used: §5.5.
- Savaysa PI, Daiichi Sankyo, revised 7/2025 (43 pages). Used: §7.2, §12.3.
- Vimpat PI, UCB, revised 5/2026 (55 pages; already cited in the app). Used: §5.3, §6.1, §7.2.
- AGS Beers Criteria 2023 (J Am Geriatr Soc 2023;71:2052-2081). Searched; only the Table 6 baclofen row was relevant (D9e PARK). Not cited in R7 entries.
- Note for future items: `pdftotext -layout` handled every label; the voriconazole Tables 10–11 and Dilantin Tables 2–3 need careful column reading.
