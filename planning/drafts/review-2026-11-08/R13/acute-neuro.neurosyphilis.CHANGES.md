# acute-neuro.neurosyphilis — CHANGES (review 2026-11-08, item R13)

New entry. There is no base in the export packet, so every "Current" cell is "—". Append it as the last entry of `data/acute-neuro.json`. `lastReviewed: "UNREVIEWED"`. Content as approved in chat 2026-11-10 ("approve as recommended", D1–D8, assumptions 1–5).

Source keys: **CDC21** = Workowski KA, et al. MMWR Recomm Rep 2021;70(No. RR-4) (`sources[0]`; uploaded pp.39–59). **LAB24** = Papp JR, et al. MMWR Recomm Rep 2024;73(No. RR-1) (`sources[1]`). Page numbers are journal pages. CDC does not grade these regimens or statements, so every treatment row is `NOT_GRADED`, with CDC's own label quoted in `evidenceNote` (D4).

## Entry-level fields

| Field | Current | New | Source + location |
|---|---|---|---|
| `id` | — | `neurosyphilis` | D1 (a), D2 |
| `title` | — | Neurosyphilis, ocular and otic syphilis (adult) | D2; assumption 1 (adults) |
| `category` | — | `CNS_INFECTION` | D1 |
| `keyNumbers[0]` | — | Aqueous crystalline penicillin G: 18–24 million units/day as 3–4 million units IV q4h or continuous infusion × 10–14 days | exact copy of `treatment[0].agent` + ": " + `doseText` |
| `keyNumbers[1]` | — | Procaine penicillin G + probenecid: 2.4 million units IM once daily + 500 mg PO 4 times/day, both × 10–14 days — only if adherence can be ensured | exact copy of `treatment[1]` agent + doseText |
| `keyNumbers[2]` | — | Ceftriaxone (penicillin allergy): 1–2 g IV or IM daily × 10–14 days | exact copy of `treatment[2]` agent + doseText |
| `keyNumbers[3]` | — | HIV: CSF WBC >5/mm³ can reflect HIV alone; a >20/mm³ cutoff may improve neurosyphilis specificity | exact copy of `definitions[7]` |
| `keyNumbers[4]` | — | Fourfold titer change (2 dilutions, e.g., 1:16 → 1:4) is significant; … ideally the same lab | exact copy of `definitions[2]` |
| `searchTerms` | — | 16 terms (neurosyphilis … Jarisch-Herxheimer) | wording |
| `verify` | — | `[]` | no open item |
| `relatedIds` | — | cns-infection-immunocompromised, bacterial-meningitis, acute-vision-loss, cns-vasculitis-workup, rapidly-progressive-dementia | `valid-ids.txt` |
| `sources[0]`–`[1]` | — | CDC21; LAB24 (DOIs confirmed: PMC8344968, PubMed 38319847) | uploaded PDFs |

## presentation

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `presentation[0]` | — | Early (months–years): CN dysfunction, meningitis, meningovascular, stroke, acute AMS; late (10 to >30 y): tabes, paresis; any stage | CDC21 p.39 |
| `presentation[1]` | — | Ocular: often panuveitis; other structures listed; any stage; permanent vision loss | CDC21 p.39; neuroretinitis p.46 |
| `presentation[2]` | — | Otic: tinnitus, vertigo, SNHL; uni/bilateral, sudden, rapid; permanent | CDC21 p.39 |

## definitions

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `definitions[0]` | — | Both test types needed | CDC21 p.39; LAB24 Box p.8 |
| `definitions[1]` | — | Reverse-algorithm discordance handling | CDC21 p.40; LAB24 Fig 3 p.11 |
| `definitions[2]` | — | Fourfold = 2 dilutions; same test; RPR slightly higher than VDRL | CDC21 p.39; LAB24 Box p.8 |
| `definitions[3]` | — | Neurosyphilis = CSF tests + reactive serology + neuro signs | CDC21 p.40 |
| `definitions[4]` | — | CSF-VDRL specific/insensitive; only FDA-cleared; reactive + signs = diagnostic | CDC21 p.40; LAB24 p.16 |
| `definitions[5]` | — | CSF-VDRL negative → CSF FTA-ABS; negative makes NS highly unlikely | CDC21 pp.40–41; LAB24 pp.15–16 |
| `definitions[6]` | — | CSF TP-PA: CDC 2021 vs CDC 2024 lab views (D3 a) | CDC21 p.41; LAB24 p.17 |
| `definitions[7]` | — | HIV CSF WBC >5 vs >20/mm³ | CDC21 p.41 |
| `definitions[8]` | — | Ocular/otic CSF-VDRL sensitivity <50% / <10%; no CSF treponemal test | LAB24 p.17 |
| `definitions[9]` | — | Low-risk allergy history (Box 2) → challenge / 3rd-gen cephalosporin | CDC21 pp.58–59 (Box 2 p.58) |
| `definitions[10]` | — | High-risk allergy history → allergist; SJS/TEN etc. avoid β-lactams indefinitely | CDC21 p.58 |
| `definitions[11]` | — | Stage regimens when no neuro/ocular/otic findings or normal CSF (D8) | CDC21 p.42 (P&S), p.44 (latent), p.45 (tertiary) |

## immediateActions

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `[0]` order 1 | — | Neuro signs → LP before treatment | CDC21 p.40, p.46 |
| `[1]` order 2 | — | Ocular pathway (exam incl. CNs, ophthalmology, when LP) | CDC21 p.40, p.46 |
| `[2]` order 3 | — | Isolated otic → no LP; ENT; neurosyphilis regimen | CDC21 p.43, p.46 |
| `[3]` order 4 | — | HIV test; PrEP if negative | CDC21 p.46 |
| `[4]` order 5 | — | Report to health department | LAB24 p.23 |

## workup

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `[0]` URGENT | — | Quantitative RPR/VDRL + treponemal; prozone rule-out | CDC21 p.39; LAB24 p.8 |
| `[1]` IF_INDICATED | — | LP: cell count, protein, CSF-VDRL; 5 indications; avoid blood contamination; not routine | CDC21 pp.40, 43, 45–46, 48; LAB24 p.13 |
| `[2]` IF_INDICATED | — | CSF FTA-ABS; off-label; negative is what counts | CDC21 p.40; LAB24 pp.15–17 |
| `[3]` ROUTINE | — | HIV test; HIV → thorough neuro/ocular/otic exam, CSF only if neuro exam abnormal | CDC21 pp.46, 48 |
| `[4]` IF_INDICATED | — | Slit-lamp exam | CDC21 p.43 |
| `[5]` IF_INDICATED | — | Otologic exam | CDC21 p.43 |
| `[6]` IF_INDICATED | — | Follow-up RPR: normalization predicts CSF; HIV slower; failure definition (D6 a) | CDC21 p.47, p.49, pp.42–43 |

## treatment

| Field | Current | New (short) | Evidence (copied) | Source + location |
|---|---|---|---|---|
| `[0]` FIRST_LINE | — | Aqueous PCN G 18–24 MU/day, 3–4 MU IV q4h or continuous × 10–14 d; 2 structured doses (UNITS) | "Recommended Regimen" → NOT_GRADED | CDC21 p.46; HIV p.49; pregnancy p.47 |
| `[1]` ALTERNATIVE | — | Procaine 2.4 MU IM daily + probenecid 500 mg PO QID × 10–14 d | "Alternative Regimen … if compliance … can be ensured" → NOT_GRADED | CDC21 p.46 |
| `[2]` ALTERNATIVE | — | Ceftriaxone 1–2 g IV/IM daily × 10–14 d; cross-reactivity <1%; not in pregnancy | "Limited data indicate" → NOT_GRADED | CDC21 p.47, p.49, p.51, p.57 |
| `[3]` ADJUNCT | — | Benzathine 2.4 MU IM weekly × 1–3 wk after the course (D7 a) | "can be considered" → NOT_GRADED | CDC21 p.46 |
| `[4]` SUPPORTIVE | — | Skin test → amoxicillin 250 mg challenge → penicillin; desensitization by allergist (D5 a) | no grade → NOT_GRADED | CDC21 pp.57–59 |

formularyStatus (assumption 2): ceftriaxone `AVAILABLE` (as in the signed bacterial-meningitis entry); all penicillin products, probenecid and the allergy pathway `INSTITUTION_VARIES`.

## pitfalls, escalateWhen, institutionVaries

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `pitfalls[0]` | — | Benzathine alone not a NS regimen; Bicillin C-R not appropriate | CDC21 p.41 |
| `pitfalls[1]` | — | Jarisch-Herxheimer ≠ allergy; pregnancy | CDC21 p.41 |
| `pitfalls[2]` | — | Steroids not proven | CDC21 p.47 |
| `pitfalls[3]` | — | Treponemal tests stay reactive (15–25% revert) | CDC21 p.40 |
| `pitfalls[4]` | — | CSF abnormalities in early syphilis: unknown significance | CDC21 p.40, p.43 |
| `pitfalls[5]` | — | HIV: CD4 ≤350 / RPR ≥1:32 vs LP only for abnormal exam | CDC21 p.48 |
| `pitfalls[6]` | — | CSF FTA-ABS specificity 55–100% | LAB24 p.17 |
| `escalateWhen[0]`–`[5]` | — | Ophthalmology; ENT; allergist + ID; pregnancy/OB; tertiary/cardiovascular → ID; STD Clinical Consultation Network | CDC21 p.46 (ophthalmology, ENT, cardiovascular → ID), p.47 + p.49 ("other regimens have not been adequately evaluated"), p.58 (allergist), p.47 + p.50 (pregnancy: desensitize; obstetric consultation); LAB24 p.7 |
| `institutionVaries[0]`–`[3]` | — | Lab algorithm / CSF FTA-ABS send-out; benzathine supply; allergy service; Michigan reporting | local (INSTITUTION_VARIES rule) |

## Not encoded (see README ledger)
Stage-based titer schedules (D6), CSF TP-PA as an equal option (D3), skin-test reagents (D5), specimen handling, darkfield/PCR/IHC/point-of-care tests, partner management, congenital and pediatric syphilis, shortage dates.
