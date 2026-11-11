# Review 2026-11-08, item R13: drafts (planning/drafts/review-2026-11-08/R13/)

Neurosyphilis / ocular and otic syphilis (task 4.3): one new acute-neuro entry. Approved by Jason in chat 2026-11-10: "approve as recommended". The decisions:
- D1 (a): one `acute-neuro` entry, CNS_INFECTION.
- D2: id `neurosyphilis`.
- D3 (a): CSF FTA-ABS is the test; TP-PA shown with both CDC views.
- D4 (a): `NOT_GRADED`, with CDC's label in `evidenceNote`.
- D5 (a): compact penicillin-allergy content.
- D6 (a): RPR normalization and the treatment-failure definition; no titer schedule.
- D7 (a): benzathine follow-on as ADJUNCT.
- D8 (a): one line of stage regimens.
- Assumptions 1–5 accepted.

New entry, so there is no base. `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- **Who gets an LP:** reactive serology plus neurologic signs; ocular syphilis with cranial nerve dysfunction; ocular symptoms with a normal eye exam (may help); tertiary syphilis; and suspected treatment failure with neurologic findings or no recent exposure.
- **Who doesn't:** isolated ocular syphilis with confirmed findings, and isolated otic syphilis with a normal neuro exam. Both get the neurosyphilis regimen anyway. No routine LP without findings, HIV or not.
- **Reading the CSF:** CSF-VDRL is specific and insensitive; reactive plus neuro signs is diagnostic. CSF FTA-ABS is sensitive and nonspecific; a negative result makes neurosyphilis highly unlikely.
- **Regimens:**
  - Aqueous PCN G 18–24 MU/day × 10–14 d.
  - Alternative: procaine plus probenecid × 10–14 d.
  - Penicillin allergy: ceftriaxone 1–2 g × 10–14 d, or skin test then desensitization.
  - Pregnancy: penicillin only.
- **HIV:** test everyone at diagnosis.
- **Follow-up:** serum RPR normalization predicts CSF normalization, so no repeat LP is needed when serology and clinical status respond.
- **Currency check (2026-11-10):**
  - CDC 2021 is still current; the live CDC neurosyphilis page has the same regimen text.
  - The 2023 erratum (MMWR 2023;72:107–108) changes p.43 and p.55 only, not the neurosyphilis pages.
  - The 2024 lab citation is confirmed: MMWR Recomm Rep 2024;73(No. RR-1):1–32, doi:10.15585/mmwr.rr7301a1.

**Validation actually run** (not only read): the draft was built by script and parsed with zod 3 against `AcuteNeuroEntry`. It used `schema/common.ts` and `schema/acute-neuro.ts` copied verbatim from the project. Result: **PASS**. A registry envelope holding the entry also passed. Four negative controls were rejected, which confirms the check is live:
- a source without a year;
- 6 keyNumbers;
- an IF_INDICATED workup item with no indication;
- a FIXED dose with weightBasis ACTUAL.

The same script also confirmed:
- top-level key order matches the existing acute-neuro entries (bacterial-meningitis, serotonin-syndrome);
- all 5 `keyNumbers` are exact copies (the R5 prefix rule);
- all 5 `relatedIds` are in `valid-ids.txt` (checked against the acute-neuro and consult-workups lines of the export copy);
- no removed id is referenced and there are no calculatorIds;
- `neurosyphilis` is not an existing id.

`npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: append the JSON word for word as a new entry, validate, run the read-only checks C1 and C2, then apply **one** registry bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `acute-neuro.neurosyphilis.json` (+ `…CHANGES.md`) | N1–N12, K1–K5 | New entry: 3 presentation, 12 definitions, 5 immediateActions, 7 workup, 5 treatment rows, 7 pitfalls, 6 escalateWhen, 4 institutionVaries, 5 keyNumbers, 0 verify, 5 relatedIds, 2 sources |

## keyNumbers
- `keyNumbers[0]`–`[2]` (K1–K3): exact copies of `treatment[0]`–`[2]` `agent` + ": " + `doseText`.
- `keyNumbers[3]` (K4): exact copy of `definitions[7]`.
- `keyNumbers[4]` (K5): exact copy of `definitions[2]`.
- All five checked by script; 5 lines, max 5.

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/acute-neuro.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | New entry |

No `package.json` bump and no schema bump: the entry fits acute-neuro 1.3.0. Update `lastUpdated` on `data/acute-neuro.json`.

**Sequencing:** R3, R4, R6 and R10 also bump `acute-neuro` (MINOR each). Encode R13 on a branch from `main` **after** those PRs have merged, so each item gets its own single bump. If any of them is still open, Claude Code stops and asks.

## Open verify[]
- None. `verify: []`. The release is blocked only by `lastReviewed: "UNREVIEWED"` until you sign off.
- Open non-verify items, both read-only (report only):
  - C1: do other entries already contain syphilis content that this entry duplicates or contradicts?
  - C2: how do the `UNITS` structured doses (e.g., 24000000) render?

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| N1 | new entry | No neurosyphilis / ocular / otic syphilis content in the app | **FIX** (D1 a, D2): `acute-neuro:neurosyphilis` |
| N2 | presentation | Early vs late timing; ocular and otic patterns | **FIX**: 3 lines |
| N3 | definitions[0]–[2] | Two-test rule; reverse-algorithm discordance; fourfold rule, RPR ≠ VDRL | **FIX** |
| N4 | definitions[3]–[8] | How to read CSF: VDRL vs FTA-ABS vs TP-PA; HIV cutoff; ocular/otic CSF sensitivity | **FIX** (D3 a) |
| N5 | immediateActions, workup[1] | Who gets an LP (neuro, ocular, otic, tertiary, failure) | **FIX** |
| N6 | treatment[0]–[3] | Neurosyphilis regimens and durations, benzathine follow-on | **FIX** (D4 a, D7 a) |
| N7 | treatment[2], [4]; definitions[9]–[10] | Penicillin allergy: ceftriaxone, skin test/challenge, desensitization, risk histories | **FIX** (D5 a) |
| N8 | immediateActions[3], workup[3], pitfalls[5] | HIV testing; HIV-specific CSF and exam rules | **FIX** |
| N9 | workup[6] | Follow-up: RPR normalization; HIV slower CSF; failure definition | **FIX** (D6 a) |
| N10 | pitfalls | Benzathine/Bicillin C-R; Jarisch-Herxheimer; steroids; treponemal persistence; asymptomatic CSF; HIV LP; FTA-ABS specificity | **FIX**: 7 lines |
| N11 | escalateWhen | Ophthalmology, ENT, allergy/ID, pregnancy, tertiary, STD-CCN | **FIX**: 6 lines |
| N12 | definitions[11] | Stage regimens when CSF is normal or no LP is indicated | **FIX** (D8 a) |
| K1–K5 | keyNumbers | Five glanceable lines | **FIX**: exact copies |
| C1 | other entries | Possible syphilis content in cns-infection-immunocompromised, acute-vision-loss, cns-vasculitis-workup, young-stroke-workup, rapidly-progressive-dementia (none in the export) | **PARK**: Claude Code reports read-only |
| C2 | treatment doses | Rendering of large `UNITS` amounts (assumption 3) | **ACCEPT**: encoded as integers; Claude Code reports rendering read-only |
| D3 | definitions[6] | CDC 2021 says CSF TP-PA is similar to FTA-ABS; CDC 2024 lab says not yet recommended | **ACCEPT**: both views shown; not an equal option |
| D4 | evidenceLevel | CDC regimens are ungraded | **ACCEPT**: NOT_GRADED; labels quoted |
| A1 | — | Stage features beyond timing, partner management, PrEP details, darkfield/PCR/IHC/point-of-care tests | **ACCEPT**: common knowledge or outside inpatient neurology |
| A2 | — | Stage-based titer schedules (P&S 6/12 mo; latent 6/12/24; HIV P&S 3/6/9/12/24; HIV latent 6/12/18/24) | **ACCEPT** (D6): owned by ID/STI follow-up; no neurosyphilis-specific schedule exists in the sources |
| A3 | — | Skin-test reagents and procedure (Box 3); desensitization protocol (p.60, not uploaded) | **ACCEPT** (D5): allergist's domain |
| A4 | institutionVaries[1] | National Bicillin L-A shortage (state health alerts 2025–2026, secondary sources) | **PARK**: no dates or products encoded; listed as institution-varies |
| A5 | — | CDC 2021 erratum (2023) | **ACCEPT**: affects p.43 azithromycin wording and p.55 congenital doses only. The upload is the pre-erratum PDF; no encoded line is affected |
| A6 | — | CSF specimen handling (≈1 mL, 2–8 °C if delayed >4 h, ≤5 days; LAB24 p.13) | **PARK**: lab handling; can be added as an LP note |
| A7 | — | CSF RPR performance data (LAB24 p.15) | **ACCEPT**: not recommended for CSF; not encoded |
| A8 | other entries | Back-links to this entry from related entries | **PARK** |
| A9 | — | Delayed-dose rules for weekly benzathine (10–14 d acceptable; pregnancy >9 d → restart; CDC21 p.44) | **PARK**: outside neurosyphilis; can be added to definitions[11] |
| A10 | — | Congenital and pediatric syphilis | **ACCEPT** (assumption 1): adult entry |
| A11 | formularyStatus | Local formulary unknown | **ACCEPT** (assumption 2) |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Workowski KA, et al. Sexually Transmitted Infections Treatment Guidelines, 2021. MMWR Recomm Rep 2021;70(No. RR-4):1–187. doi:10.15585/mmwr.rr7004a1.
  - Uploaded PDF: journal pp.39–59 (syphilis through penicillin allergy; it stops mid-paragraph in Desensitization on p.59).
  - Read in full via `pdftotext`; the congenital syphilis pages (pp.51–56) were skimmed.
  - Used: pp.39–49 (diagnosis, CSF evaluation, treatment, P&S, latent, tertiary, neurosyphilis, HIV), p.47 and p.51 (pregnancy), pp.57–59 (penicillin allergy).
- Papp JR, Park IU, Fakile Y, Pereira L, Pillay A, Bolan GA. CDC Laboratory Recommendations for Syphilis Testing, United States, 2024. MMWR Recomm Rep 2024;73(No. RR-1):1–32. doi:10.15585/mmwr.rr7301a1.
  - Uploaded PDF, 35 pages.
  - Read in full: Box (p.8); nontreponemal tests and prozone (pp.6–8); algorithms (pp.10–12); CSF collection (p.13); CSF antibody tests for neurosyphilis, ocular and otic syphilis (pp.15–17); HIV (pp.18–19); reporting (p.23).
  - Skimmed: serum test performance, darkfield, PCR/IHC, point-of-care.
- Page numbers were mapped by script from PDF page breaks to journal pagination.
- Web check only, not cited in the entry (2026-11-10):
  - CDC neurosyphilis treatment-guideline page (search snippet; the regimen text matches 2021);
  - Erratum: Vol. 70, No. RR-4 (MMWR 2023;72:107–108);
  - PubMed/PMC citation records for both sources;
  - state health department alerts on the Bicillin L-A shortage (secondary).
