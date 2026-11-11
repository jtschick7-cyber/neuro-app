# Review 2026-11-08, item R2: drafts (planning/drafts/review-2026-11-08/R2/)

Restarting anticoagulation after ICH. Approved by Jason in chat 2026-11-09 ("approve as recommended", decisions 1–5). Base: the signed `current.vascular-antithrombotics.restart-antithrombotic-after-ich.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07). The entry has `lastReviewed: "UNREVIEWED"`.

**Validation actually run** (not only read): the draft was parsed with zod 3 against `VascularAntithromboticEntry`, using `schema/common.ts`, `schema/vascular-antithrombotics.ts`, and the parts of `schema/acute-neuro.ts` it imports (`EvidenceLevel`, `FormularyStatus`, `TreatmentItem`), copied verbatim from the export packet: **PASS**. A deliberately broken copy (bad `evidenceLevel`) failed, which confirms the check is live. A script also confirmed:
- key order is unchanged;
- `keyNumbers[0]` is an exact copy of its field;
- both `relatedIds` are in `valid-ids.txt`;
- no removed id is referenced;
- the base `verify[]` is kept.

`npm run validate` in the repo has not been run; that is Claude Code's step.

Claude Code: encode the JSON word for word as the full replacement entry, validate, show the diff against the CHANGES file, then apply **one** version bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| Entry file | CHANGES | Findings | Change |
|---|---|---|---|
| `vascular-antithrombotics.restart-antithrombotic-after-ich.json` | `…CHANGES.md` | F1–F9, F12, F13 | ESO-EANS 2025 notes on `rules[2]` (PICO 6.2) and `rules[4]` (PICO 6.3); `pearls[0]` rewritten with AHA §9.1.1 recurrence HRs; 4 pearls added (ESO "may not benefit" list, PRESTIGE-AF, ENRICH-AF, lobar ICH/cSAH); 3 search terms; `relatedIds` += ich-etiology-workup; 4 sources added |

## keyNumbers
- `keyNumbers[0]`: unchanged. Exact copy of `rules[3]` condition + ": " + recommendation (unedited). Checked by script.
- No keyNumbers added.

## Version
| registry | from | to | level | why |
|---|---|---|---|---|
| vascular-antithrombotics | 0.13.0 (expected; the export has no registry header) | 0.14.0 | MINOR | New sources and evidence statements (ESO-EANS 2025, PRESTIGE-AF, ENRICH-AF); no rule, tier or evidence level changed |

Update `lastUpdated` to the encoding date. If `data/vascular-antithrombotics.json` is not at 0.13.0, Claude Code stops and reports.

## Open verify[]
- None. The entry had `verify: []` at base and still does. The ENRICH-AF figures are confirmed against the primary slides. The recheck at publication is tracked as a decision-log open item (PARK), not in `verify[]`, so it doesn't block `npm run release`.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F1 | `sources` | ESO-EANS 2025 ICH guideline not cited | **FIX**: `sources[1]` |
| F2 | `sources` | PRESTIGE-AF not cited | **FIX**: `sources[2]` |
| F3 | `rules[2]` | ESO PICO 6.2: no evidence-based recommendation (low quality, no strength); expert consensus 14/15, "DOAC may be considered" | **FIX**: `evidenceNote[1]` (decision 3 b; not `esoDiffers`, because ESO doesn't disagree). `evidenceLevel` stays WEAK (AHA Rec 3) |
| F4 | `pearls` | PRESTIGE-AF results (brief figures confirmed; brief rounds the 90% CI upper limit to 60.7, paper 60·72) | **FIX**: `pearls[2]` |
| F5 | `pearls`, `sources` | ENRICH-AF presented (ESC Aug 29, WSC Oct 2026), not published (web check 2026-11-09) | **FIX**: `pearls[3]` labelled unpublished; slides `sources[3]`, press release `sources[4]` (decision 1 a) |
| F5b | — | Recheck ENRICH-AF figures at publication | **PARK**: decision-log open item; no `verify[]` (would block release) |
| F6 | `pearls` | Lobar ICH / cSAH caution (ENRICH-AF DSMB stop; slide 18 rates); PRESTIGE-AF post hoc finds no location effect | **FIX**: `pearls[4]`, conflict kept visible |
| F7 | `pearls[0]` | Vague pearl, mislabelled "prognosis text" | **FIX**: AHA §9.1.1 supportive text 1 HRs (p e332) |
| F8 | `pearls` | ESO "may not benefit" selection criteria (microbleed/siderosis thresholds) | **FIX**: `pearls[1]`, labelled ungraded |
| F9 | `rules[4]` | ESO PICO 6.3 expert consensus (15/15) agrees with AHA Rec 5 and adds the CAA example | **FIX**: `evidenceNote[1]` |
| F10 | `rules[1]` | ESO PICO 6.4 (antiplatelet; weak for, moderate) agrees with AHA Rec 2 | **ACCEPT**: outside the brief; no change in meaning |
| F11 | `rules[3]` | 7–8-week timing | **ACCEPT**: unchanged; still the only graded timing statement (ESO silent) |
| F12 | `searchTerms` | Trial names and "microbleeds" not searchable | **FIX** |
| F13 | `relatedIds` | No link to where microbleeds/CAA are assessed | **FIX**: `consult-workups:ich-etiology-workup` |
| B1 | brief | "Excess major bleeding confined to the 60-mg dose" | **PARK**: slide 17 shows a subgroup by label-based dose *eligibility* (60 mg HR 3.95 [2.03–7.71] vs 30 mg HR 0.97 [0.45–2.07], interaction p=0.002), not randomized dose; the "confined" wording comes from a secondary interview. Not encoded; revisit at publication |
| B2 | — | DOAC preferred over VKA (ESO p 1060; AHA supportive text 3) | **ACCEPT**: left out as common knowledge |
| B3 | — | A3ICH results (optional in the brief) | **ACCEPT**: still recruiting, no results (registry listings, 2026-11-09) |
| B4 | `sources[0]` | Newer AHA ICH guideline? | **ACCEPT**: none found; AHA ICH 2022 is current |

## Sources used (attached to the planning chat)
- Greenberg 2022 AHA/ASA ICH guideline: §9.1.1 supportive text 1 (p e332); §9.1.3 Recs 1–5 and supportive text (pp e333–e334).
- Steiner 2025 ESO-EANS ICH guideline (Eur Stroke J 2025;10:1007-1086): methods and Table 1 (pp 1012–1013); PICO 6.2 (p 1058); Additional information (pp 1059–1060); PICO 6.3 (p 1060); PICO 6.4 (p 1061).
- Veltkamp 2025 PRESTIGE-AF (Lancet 2025;405:927-936), full text: pp 927–934 incl. Tables 1–3.
- ENRICH-AF primary results slides, ESC Congress 2026 (user-supplied pptx): slides 6, 9, 10, 12, 13, 16, 17, 18.
- ESC press release, ENRICH-AF, 28 Aug 2026 (user-supplied PDF).
- Web checks only, not cited in the entry: ENRICH-AF publication status (HCPLive Aug 29 and Oct 23 2026; PHRI release); AHA ICH guideline currency; A3ICH status (trial registry listings).
