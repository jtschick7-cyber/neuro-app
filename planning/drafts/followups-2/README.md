# Follow-up batch 2: drafts (planning/drafts/followups-2/)

Approved by Jason in chat 2026-11-08, group by group (A, B, C). Base: the signed `current.*.json` entries from the batch-2 bundle (built 2026-11-07 from `main` at 2be7f92). All 8 entries have `lastReviewed: "UNREVIEWED"`. Every entry passes the zod schemas (`acute-neuro.ts`, `consult-workups.ts`, `vascular-antithrombotics.ts`, `common.ts`), and every `relatedIds` and calculator id is in `valid-ids.txt`.

Claude Code: encode each JSON word for word as the full replacement entry, validate, show per-entry diffs, then apply **one** version bump per registry (table below).

## Files

| Entry file | CHANGES | Items | Change |
|---|---|---|---|
| `acute-neuro.guillain-barre-syndrome.json` | `…CHANGES.md` | 1, 1b | `searchTerms` += "GQ1b"; `keyNumbers[1]` restored as an exact copy of PLEX agent + doseText |
| `consult-workups.sah-workup.json` | `…CHANGES.md` | 3 | `relatedIds` += `vascular-antithrombotics:cervical-artery-dissection`, `vascular-antithrombotics:cvt-anticoagulation` |
| `consult-workups.young-stroke-workup.json` | `…CHANGES.md` | 6 | "ISTH 2024" → "ISTH 2025" (Devreese J Thromb Haemost 2025;23:731-744); `keyNumbers[0]` checked: already an exact copy, unchanged |
| `consult-workups.cns-vasculitis-workup.json` | `…CHANGES.md` | 5a, 5b | ESO 2023 (Pascarella, Eur Stroke J 2023;8(4):842-879) added to `sources`; `decisionRules[1]` EXPERT_OPINION → WEAK (PICO 5) and `decisionRules[2]` EXPERT_OPINION → CONSENSUS (PICO 8), both cited directly; `decisionRules[3]` keeps the Salvarani attribution; "Sousa 2026" → "de Sousa 2026" |
| `vascular-antithrombotics.cvt-anticoagulation.json` | `…CHANGES.md` | 2a, 2b, 2c | `relatedIds` += `pregnancy-antithrombotics`; `rules[0]` note → "Saposnik 2024"; structured enoxaparin CrCl <30 dose (1 mg/kg daily) added, sourced to the Lovenox label §2.2/§2.3 Table 1; Lovenox PI added to `sources` |
| `vascular-antithrombotics.pregnancy-antithrombotics.json` | `…CHANGES.md` | 4b (4a checked) | `pearls[0]` reworded to Miller 2026's endorsement wording; Kopp placeholder kept (still online-first) |
| `vascular-antithrombotics.enoxaparin.json` | `…CHANGES.md` | 7 | LMWH-before-IVT line keeps its Powers 2019 source, now with "§3.5.5 Rec 7"; `keyNumbers[1]` unchanged |
| `vascular-antithrombotics.ticagrelor.json` | `…CHANGES.md` | 8 | `uses[0]` → "Kleindorfer 2021 §5.19 Rec 4" (section was correct); `uses[3]` → "Kleindorfer 2021 §5.1.1 Rec 3" |

**Checked, no edit needed**
- Item 7: `thrombolysis-with-prior-antithrombotics` `rules[4]` already cites Powers 2019 §3.5.5 Rec 7 and says it isn't restated in AHA 2026.
- Item 7: the aPTT wording is consistent. In AHA 2026 Table 8, aPTT >40 s means do not give IVT (`thrombolysis-with-prior-antithrombotics` `rules[1]`; `heparin-ufh` `thrombolysisRule[0]` for patients who had heparin). "PTT abnormal by local standards" is the stop rule when IVT was started before results in patients without recent warfarin or heparin (`rules[0]`). `heparin-ufh` and `thrombolysis-with-prior-antithrombotics` are not edited.

## keyNumbers
- `guillain-barre-syndrome` `keyNumbers[1]`: changed (item 1b). Now an exact copy of `treatment[1].agent` + ": " + `treatment[1].doseText`.
- `young-stroke-workup` `keyNumbers[0]`: unchanged. Already an exact copy of `decisionRules[2]` condition + ": " + recommendation.
- `cvt-anticoagulation` `keyNumbers[0]`: unchanged. Its source field (`options[0].doseText`) wasn't edited.
- `enoxaparin` `keyNumbers[1]`: unchanged. It's the unchanged opening clause of the edited `timing.thrombolysisRule[0]`.

## Version
| registry | from | to | level | why |
|---|---|---|---|---|
| acute-neuro | 1.2.5 | 1.2.6 | PATCH | Search term added; keyNumbers copy restored from an unchanged doseText (no dose changed) |
| consult-workups | 2.0.1 | 2.1.0 | MINOR | ESO 2023 added as a source; two evidence levels changed (cns-vasculitis-workup); links and label fixes in sah/young-stroke are PATCH-level |
| vascular-antithrombotics | 0.11.1 | 0.12.0 | MINOR | New structured dose and new source (cvt-anticoagulation); the other changes are PATCH-level |

## Open verify[]
- None. The one item added in this batch (the `cvt-anticoagulation` CrCl <30 dose) was closed before sign-off with the attached Lovenox label (Sanofi-Aventis, Revised 5/2025, §2.2 and §2.3 Table 1). No existing `verify[]` items were removed. All 8 entries had `verify: []` at base.

## Noticed, not changed
- `sah-workup`: dissection and CVT are mustNotMiss, but the workup has no neck vessel imaging or CTV/MRV; CTA head is indicated only for "SAH on CT".
- `young-stroke-workup`: if "over >3" is too terse, reword `decisionRules[2].recommendation` (e.g. "target INR 2–3 rather than >3"); `keyNumbers[0]` would then need to change to stay a copy. Some labels say "Kleindorfer" and others "Kleindorfer 2021".
- `cns-vasculitis-workup`: `decisionRules[3]` follows Salvarani's paraphrase. Citing ESO directly would mean rewording to ESO's multidisciplinary-team wording (PICO 8), which needs its own item. The de Sousa paper wasn't attached, so the surname form wasn't checked against it.
- `ticagrelor`: `uses[0]` "for any event" doesn't match Rec 4's "an artery that could account for the event"; the agent text uses ≥50% stenosis (AHA 2026/THALES) and Kleindorfer Rec 4 says ≥30%. `uses[3]` follows Rec 3's ">30%"; the supportive text says "≥30%".
- `pregnancy-antithrombotics`: Kopp source title differs from the PDF title ("ASRA Pain Medicine…" vs "American Society of Regional Anesthesia and Pain Medicine…"); the DOI matches.
- `cvt-anticoagulation`: `options[0].dose[0]` is labeled "Enoxaparin" next to "CrCl <30" (the enoxaparin entry says "q12h"). The label's renal dose is for DVT/PE with warfarin, so using it for CVT is an extrapolation, as with the existing q12h dose.
- `enoxaparin`: `keyNumbers[1]` copies only the opening clause of its field (the pattern item 1b fixed in GBS).
- AHA 2026 PDF: the attached copy cuts Table 8 off mid-row ("Amyloid…") at the bottom of p. 94/245. No LMWH row up to that point; the rest of the table wasn't checked.
- `thrombolysis-with-prior-antithrombotics`: Table 8 rows are CONSENSUS in `rules[0]`/`rules[1]` but EXPERT_OPINION in `rules[2]`; `heparin-ufh` says "expert opinion, not graded"; Table 8 says it rests on "expert opinions and limited data". `rules[4]` is STRONG on a Powers 2019 recommendation that AHA 2026 replaced.

## Sources used (attached to the planning chat)
AHA/ASA 2026 AIS guideline §4.6 incl. Table 8 (Prabhakaran); Powers 2019 §3.5.5 and Table 8; Kleindorfer 2021 §5.1.1, §5.8.2, §5.19; Kopp 2025 (online-first); Miller 2026 (title-page endorsement); Pascarella 2023 ESO PACNS guideline; Salvarani 2024 NEJM; Saposnik 2024; van Doorn 2023 EAN/PNS GBS guideline; Devreese 2025 J Thromb Haemost; Lovenox PI (Sanofi-Aventis, revised 5/2025).
