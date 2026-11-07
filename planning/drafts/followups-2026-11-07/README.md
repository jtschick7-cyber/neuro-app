# Follow-up batch (2026-11-07): approved drafts

Six follow-ups noticed during earlier planning (DECISION_LOG lines ~340 and ~380, plus items 1.3/1.5) were settled and approved by Jason in chat on 2026-11-07. Base: `main` at 6ff3179. All 7 drafts are whole-entry replacements; each is `lastReviewed: "UNREVIEWED"`.

Encode each JSON **word for word** into its registry, replacing the entry with the same `id`. Don't edit anything else in `data/`.

## Files
| Draft | Item | Change |
|---|---|---|
| `acute-neuro.guillain-barre-syndrome.json` | A1 | `searchTerms` += "Bickerstaff", "BBE" |
| `consult-workups.sah-workup.json` | A2 | `relatedIds` += `reference-cards:asah-numbers` |
| `vascular-antithrombotics.cvt-anticoagulation.json` | A2 | `relatedIds` += `reference-cards:thrombophilia-test-validity` |
| `consult-workups.cns-vasculitis-workup.json` | B3 | Salvarani DOI → 10.1056/NEJMra2314942; author order → Salvarani, Hunder, Brown; `verify[]` +1 |
| `consult-workups.young-stroke-workup.json` | B4 | Devreese → J Thromb Haemost 2025;23:731-744 (year 2024 → 2025) |
| `vascular-antithrombotics.heparin-ufh.json` | C5 | IVT line sourced to AHA 2026 §4.6.5 Table 8 (ungraded); new aPTT-wait line; `keyNumbers[1]` kept identical to `thrombolysisRule[0]` |
| `vascular-antithrombotics.ticagrelor.json` | C6 | `uses[3].role` SECOND_LINE → ALTERNATIVE; `verify[]` +1 |

Field-level detail and sources: each `<registry>.<id>.CHANGES.md`.

Not edited: `vascular-antithrombotics:pregnancy-antithrombotics` (the proposed back-link was dropped at review).

## Registry version bumps (once per registry)
| registry | current | new | level |
|---|---|---|---|
| acute-neuro | 1.2.1 | 1.2.2 | PATCH |
| consult-workups | 1.1.1 | 1.1.2 | PATCH (approved: citation corrections to the same papers) |
| vascular-antithrombotics | 0.10.1 | 0.11.0 | MINOR (re-sourced/graded IVT line, new IVT instruction, role change) |

Update `lastUpdated` on each bumped registry.

## Pre-check done in chat
All 7 drafts were spliced into temp copies of the registries with the bumps above. `scripts/validate.ts` gave 0 errors and 9 warnings: 7 UNREVIEWED, plus 2 open VERIFY items.

## Open `verify[]` items (block release until closed)
- `cns-vasculitis-workup`: which paper `doi:10.1161/STR.0000000000000422` belongs to (formerly on the Salvarani citation).
- `ticagrelor`: whether any AHA 2026 section other than §4.6/§4.8 restates or supersedes Kleindorfer 2021 §5.1.1 Rec 3.

## Noticed, not changed (track; don't fix in this batch)
- GBS: `searchTerms` lacks "GQ1b". The PLEX line in `keyNumbers` is shortened from `doseText`.
- cvt-anticoagulation: no back-link to `pregnancy-antithrombotics`. The enoxaparin CrCl <30 dose has no `dose[]` object. `rules[0].evidenceNote` says "AHA scientific statement 2024" rather than "Saposnik 2024".
- sah-workup: no `relatedIds` to `cervical-artery-dissection` or `cvt-anticoagulation`, though both are in the differential.
- pregnancy-antithrombotics: the Kopp 2025 citation has an online-first placeholder (0:1-29). `pearls[0]` overstates the ACOG endorsement.
- cns-vasculitis: the ESO PACNS guideline is used only "as cited in Salvarani 2024" and isn't in `sources`. "Sousa 2026" vs "de Sousa IA".
- young-stroke: `keyNumbers[0]` looks truncated ("…over >3"). The in-text labels still say "ISTH 2024".
- AHA 2026 Table 8 has no LMWH row (Powers 2019 had one): check against `enoxaparin` and `thrombolysis-with-prior-antithrombotics`. Table 8's coagulopathy row gives both "aPTT>40s" and "PTT abnormal by local standards".
- ticagrelor: `uses[0].evidenceNote` cites "§5.19 … ≥30% stenosis" (the ≥30% subgroup is in §5.1.1). `uses[3].evidenceNote` names no section.

Source PDFs are not committed (copyrighted; public repo).
