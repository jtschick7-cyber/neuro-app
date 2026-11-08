# Follow-up batch 3: drafts (planning/drafts/followups-3/)

Approved by Jason in chat 2026-11-08, item by item (Group A, Group B, then the Disposition Ledger). Base: the signed `current.*.json` entries from the batch-3 packet (built 2026-11-08 from `main` at 814629f). All 8 entries have `lastReviewed: "UNREVIEWED"`. Every entry passes the zod schemas (`common.ts`, `acute-neuro.ts`, `consult-workups.ts`, `vascular-antithrombotics.ts`), every `relatedIds` and calculator id is in `valid-ids.txt`, and key order is unchanged.

Claude Code: encode each JSON word for word as the full replacement entry, validate, show per-entry diffs against the CHANGES files, then apply **one** version bump per registry (table below). See `CLAUDE_CODE_PROMPT.md`.

## Files

| Entry file | CHANGES | Items | Change |
|---|---|---|---|
| `consult-workups.sah-workup.json` | `…CHANGES.md` | 1, L1, L2 | New `workup[3]` pointer row: imaging for dissection, RCVS, CVT or pituitary apoplexy, see thunderclap-headache (former `workup[3]`–`[4]` now `[4]`–`[5]`, unchanged); `workup[2].indication` += "CT negative, xanthochromia on LP" (Hoh 2023 Fig 2) |
| `consult-workups.cns-vasculitis-workup.json` | `…CHANGES.md` | 6 | `decisionRules[3]` reworded to ESO 2023 PICO 8 (individual biopsy decision in a multidisciplinary team), EXPERT_OPINION → CONSENSUS, cited directly; de Sousa surname checked, unchanged |
| `consult-workups.young-stroke-workup.json` | `…CHANGES.md` | 7 | "target INR 2–3 over >3" → "target INR 2–3 rather than >3" in `decisionRules[2]` and `keyNumbers[0]` |
| `vascular-antithrombotics.thrombolysis-with-prior-antithrombotics.json` | `…CHANGES.md` | 2, L5, L6 | `rules[0]`/`[1]` CONSENSUS → EXPERT_OPINION + note (Table 8 ungraded); `rules[4]` STRONG → NOT_GRADED (no current AHA grade); `rules[5]` CONSENSUS → NOT_GRADED + note (Table 7 ungraded protocol); `keyNumbers[2]` restored as an exact copy of `rules[2]` |
| `vascular-antithrombotics.ticagrelor.json` | `…CHANGES.md` | 4 | `uses[0].evidenceNote[1]`: Kleindorfer Rec 4 described correctly ("≥30% stenosis of an artery that could account for the event (THALES and AHA 2026: ≥50%)") |
| `vascular-antithrombotics.cvt-anticoagulation.json` | `…CHANGES.md` | 5 | `options[0].dose[0].label` "Enoxaparin" → "q12h"; `options[0].evidenceNote[2]` added: CVT not a labeled indication, doses extrapolated from DVT ± PE |
| `vascular-antithrombotics.enoxaparin.json` | `…CHANGES.md` | 8 | `keyNumbers[1]` restored as an exact copy of `timing.thrombolysisRule[0]` (keeps "Prophylactic doses excluded") |
| `vascular-antithrombotics.pregnancy-antithrombotics.json` | `…CHANGES.md` | 9 | Kopp `sources[3]` title corrected to the published title; DOI and online-first placeholder unchanged |

**Checked, no edit needed**
- Item 3: the complete AHA 2026 Table 8 has no LMWH row. Its coagulopathy, heparin/warfarin and DOAC rows match `thrombolysis-with-prior-antithrombotics`, `heparin-ufh` and `enoxaparin`. `heparin-ufh` is not edited.
- `ticagrelor` `uses[3]` correctly follows Kleindorfer §5.1.1 Rec 3 (">30%").
- `cns-vasculitis-workup` de Sousa source string and label match the paper's own citation line.

## keyNumbers
Every `keyNumbers` line in the 8 drafts was checked by script as an exact copy of its field.
- `young-stroke-workup` `keyNumbers[0]`: changed (item 7). Exact copy of `decisionRules[2]` condition + ": " + recommendation.
- `thrombolysis-with-prior-antithrombotics` `keyNumbers[2]`: changed (L6). Exact copy of `rules[2]` condition + ": " + recommendation. `[0]`, `[1]`, `[3]`, `[4]` unchanged.
- `enoxaparin` `keyNumbers[1]`: changed (item 8). Exact copy of `timing.thrombolysisRule[0]`.
- `sah-workup`, `ticagrelor`, `cvt-anticoagulation`, `pregnancy-antithrombotics`: unchanged; their source fields weren't edited. `cns-vasculitis-workup` has no keyNumbers.

## Version
| registry | from | to | level | why |
|---|---|---|---|---|
| consult-workups | 2.1.1 | 2.2.0 | MINOR | New workup row and indication (sah-workup); recommendation and evidence level changed (cns-vasculitis-workup); young-stroke wording is PATCH-level |
| vascular-antithrombotics | 0.12.1 | 0.13.0 | MINOR | Four evidence levels changed (thrombolysis-with-prior-antithrombotics); the other changes are PATCH-level |

Update `lastUpdated` to 2026-11-08 on both registries.

## Open verify[]
- None. All 8 entries had `verify: []` at base and still do; no items added or removed.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| 1 | `sah-workup` `workup` | Dissection and CVT (and RCVS) are mustNotMiss but the workup had no neck vessel or venous imaging | **FIX**: pointer row `workup[3]` to thunderclap-headache (option P; RCVS kept) |
| 2 | `thrombolysis-with-prior-antithrombotics` `rules` | Table 8 graded CONSENSUS in `rules[0]`/`[1]`, EXPERT_OPINION in `rules[2]`; `rules[4]` STRONG on Powers 2019 | **FIX**: `rules[0]`/`[1]` → EXPERT_OPINION + note; `rules[4]` → NOT_GRADED |
| 3 | AHA 2026 Table 8 vs `enoxaparin`, `heparin-ufh`, `thrombolysis` | Earlier copy cut off mid-table | **ACCEPT**: the complete Table 8 has no LMWH row and matches all three entries; no change needed |
| 4 | `ticagrelor` `uses[0]`, `uses[3]` | "for any event" misstated Kleindorfer Rec 4; ≥30% vs ≥50% | **FIX**: `uses[0].evidenceNote[1]`; `uses[3]` unchanged (follows Rec 3 text) |
| 5 | `cvt-anticoagulation` `options[0]` | Label dose extrapolated to CVT, not stated; "Enoxaparin" dose label | **FIX**: `evidenceNote[2]` added; `dose[0].label` → "q12h" |
| 6 | `cns-vasculitis-workup` `decisionRules[3]` | Salvarani paraphrase doesn't match ESO PICO 8; de Sousa surname | **FIX**: reworded to ESO PICO 8, CONSENSUS; surname correct, no change |
| 7a | `young-stroke-workup` `decisionRules[2]`, `keyNumbers[0]` | "over >3" can be read as "above 3" | **FIX**: "rather than >3" |
| 7b | `young-stroke-workup` labels | "Kleindorfer" vs "Kleindorfer 2021" | **ACCEPT**: the entry has one Kleindorfer source, so the short label is unambiguous |
| 8 | `enoxaparin` `keyNumbers[1]` | Partial copy dropped "Prophylactic doses excluded" | **FIX**: exact full copy |
| 9 | `pregnancy-antithrombotics` `sources[3]` | Kopp title differs from the published title | **FIX**: published title |
| L1 | `sah-workup` `workup[2]` | CTA head row omitted the positive-LP route (Hoh 2023 Fig 2) | **FIX**: `indication[1]` added; CTA-first stays in `institutionVaries[1]` |
| L2 | `sah-workup` `workup` | Pituitary apoplexy mustNotMiss with no workup row | **FIX**: covered by the item-1 pointer row |
| L3 | `sah-workup` vs thunderclap-headache | Conflict that full duplicate rows (option R) would have created | Dropped: option P chosen, so it didn't arise |
| L4 | thunderclap-headache labels | "Sousa 2026" in 11 labels vs "de Sousa" | **ACCEPT**: its source string correctly reads "de Sousa IA…", so the paper is findable; label only |
| L5 | `thrombolysis` `rules[5]` | CONSENSUS on AHA 2026 Table 7 | **FIX**: NOT_GRADED + note (Table 7 is an ungraded protocol with no stated basis) |
| L6 | `thrombolysis` `keyNumbers[2]` | Truncated copy of `rules[2]` | **FIX**: exact full copy |

No PARK items. No open items.

## Sources used (attached to the planning chat)
- Prabhakaran 2026 AHA/ASA AIS guideline: complete Table 8 and its preceding text; §4.8 Recs 13–15, Table 9 and supportive text 13; complete Table 7.
- Powers 2019: Table 8.
- Hoh 2023 AHA/ASA aSAH guideline: §4 Recs 1–6, supportive text, Figure 2.
- Kleindorfer 2021: §5.1.1, §5.8.2, §5.19.
- THALES (Johnston, N Engl J Med 2020).
- Lovenox PI (Sanofi-Aventis, revised 5/2025): §2.2, §2.3 Table 1.
- Saposnik 2024.
- Pascarella 2023 ESO PACNS guideline (PICO 4, 5, 8).
- Salvarani 2024.
- de Sousa 2026 (Headache).
- Kopp 2025 (online-first).
- Thunderclap-headache entry (`consult-workups:thunderclap-headache`, `main` 814629f).
- Review only, not cited in any entry: Long 2019 (J Emerg Med), Yaghi 2024, García-Azorín 2026 (J Headache Pain), ESO 2021 dissection guideline.
