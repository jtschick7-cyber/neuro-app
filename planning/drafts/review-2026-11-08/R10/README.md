# Review 2026-11-08, item R10: drafts (planning/drafts/review-2026-11-08/R10/)

Serotonin syndrome example wording (blocks task 3.10). Approved by Jason in chat 2026-11-10 ("approve as recommended"): D1 (c) remove the triptan example from `presentation[0]` and add a pitfall with the Orlova numbers; D2 (ii) definite rate + rate incl. possible cases + "none life-threatening" (authors' "daily SSRI/SNRI is the likelier cause" left out as opinion); D3 add "triptan" to `searchTerms`; assumptions 1–3 accepted. Base: the signed `current.acute-neuro.serotonin-syndrome.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07). The entry has `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:** the reviewer's recollection holds. In 30,928 person-years of triptan + SSRI/SNRI co-prescription, Orlova 2018 found 2 definite cases (0.6/10,000 person-years, 95% CI 0–1.5), 2.3/10,000 including possible cases, no life-threatening case and no case where the triptan was unequivocally implicated. The example is removed from `presentation[0]` and the result is stated as a pitfall. A web check (2026-11-10) found no newer study and no change to the 2006 FDA advisory; only secondary coverage of Orlova.

**Assumptions accepted:**
1. New pitfall appended as `pitfalls[3]`, next to the inpatient-triggers line; pitfalls carry no evidence grade.
2. One MINOR bump to `acute-neuro` (new source and evidence statement; R9 precedent), sequenced after the R3, R4 and R6 PRs.
3. `verify[]` stays empty.

**Validation actually run** (not only read): the draft was built by script from the base JSON (the base round-trips byte-for-byte through the 2-space JSON serializer) and parsed with zod 3 against `AcuteNeuroEntry`, using `schema/common.ts` and `schema/acute-neuro.ts` copied from the project: **PASS** (the base also passes). A registry envelope holding the entry also passed. Three negative controls (source without a year; blank pitfall; 6 keyNumbers) were rejected, which confirms the check is live. The same script confirmed:
- top-level key order unchanged;
- only `searchTerms`, `presentation`, `pitfalls`, `sources`, `lastReviewed` differ from base; `presentation[1]`–`[2]` unchanged; base items of `searchTerms`, `pitfalls`, `sources`, `relatedIds`, `verify` kept in order (appends only);
- both `keyNumbers` are exact copies of their fields;
- `relatedIds` unchanged (one id, already in `valid-ids.txt`); no removed id referenced; no `calculatorIds` change;
- no "triptan" left in `presentation`.

The base was transcribed from the project copy of the export; Claude Code's step 1 checks `data/` still matches it. `npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: encode the JSON word for word as the full replacement entry, validate, show the diff against the CHANGES file, then apply **one** version bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| Entry file | CHANGES | Findings | Change |
|---|---|---|---|
| `acute-neuro.serotonin-syndrome.json` | `…CHANGES.md` | F1, D3 | `presentation[0]` triptan example removed; `pitfalls[3]` Orlova result; `searchTerms[6]` "triptan"; `sources[2]` Orlova 2018 |

## keyNumbers
- `keyNumbers[0]`: unchanged. Exact copy of `treatment[1].agent` + ": " + `doseText`.
- `keyNumbers[1]`: unchanged. Exact copy of `escalateWhen[0]`.
- None added (a reassurance rate, not a rounds number). Checked by script.

## Version
| registry | from | to | level | why |
|---|---|---|---|---|
| acute-neuro | as found (not in the export; Claude Code records it) | next MINOR | MINOR | New source and evidence statement; example trigger removed; no dose, threshold or evidence level changed |

Update `lastUpdated` to the encoding date. No `package.json` bump; no `schemaVersion` change.

**R3/R4/R6 interaction:** R3, R4 and R6 also bump `acute-neuro` (MINOR each). Encode R10 on a branch from `main` **after** all three PRs have merged, so each item gets its own single bump. If any is still open, Claude Code stops and asks.

## Open verify[]
- None. The entry had `verify: []` at base and still does.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F1 | `presentation[0]`, `pitfalls`, `sources` | "triptans + SSRI/SNRI" listed as an example trigger; Orlova 2018 shows serotonin syndrome is rare with this co-prescription | **FIX** (D1 c, D2 ii): example removed; `pitfalls[3]`; `sources[2]` |
| D3 | `searchTerms` | "triptan" not searchable | **FIX**: `searchTerms[6]` |
| D1a/b | `presentation[0]` | Delete only, or qualify inline as "rarely" | **ACCEPT**: not chosen (D1 c) |
| D2iii | `pitfalls[3]` | Authors: daily SSRI/SNRI a more plausible cause than intermittent triptan use (Discussion p 570) | **ACCEPT**: left out; authors' argument, not a finding |
| A1 | `definitions[0]` | Orlova Box (p 568, adapted) splits the Hunter hypertonia criterion over separate lines | **ACCEPT**: entry follows its own source (Dunkley 2003); unchanged |
| A2 | — | Mechanism (triptans 5-HT1B/1D, low 5-HT1A affinity; syndrome mediated by 5-HT2A; p 570) | **ACCEPT**: not encoded; common knowledge, not a rounds lookup |
| A3 | — | Study limitations (single network, ICD-9 search, imprecise person-time; p 571) | **ACCEPT**: not encoded; pitfall states the estimate with its CI |
| P1 | `pitfalls[2]` | "ondansetron/metoclopramide add-ons" as triggers may have a similarly weak evidence base | **PARK**: not examined; outside R10 |
| P2 | — | Whether current triptan labels still carry a serotonin-syndrome warning | **PARK**: no label read; the pitfall makes no label claim |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Orlova Y, Rizzoli P, Loder E. JAMA Neurol 2018;75(5):566-572. doi:10.1001/jamaneurol.2017.5144 (user-supplied PDF, 7 pages, read in full via `pdftotext -layout`). Used: Abstract and Key Points p 566–567; Methods (Statistical Analysis, case definitions) p 568; Box p 568; Results and Figure 1 p 569; Discussion p 569–570; Table p 570; Strengths and Limitations p 571.
- Web check only, not cited in the entry (2026-11-10): search for newer triptan + SSRI/SNRI serotonin syndrome studies and FDA advisory changes; found only secondary coverage of Orlova 2018 (e.g., The Hospitalist, Carlat Report).
