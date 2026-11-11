# acute-neuro.lyme-neuroborreliosis — CHANGES (review 2026-11-08, item R15)

New entry. There is no base in the export packet, so every "Current" cell is "—". Append it as the last entry of `data/acute-neuro.json`. `lastReviewed: "UNREVIEWED"`. Content as approved in chat 2026-11-11 ("Approve as recommended", decisions 1–9).

Source key: **L20** = Lantos PM, et al. Clin Infect Dis 2021;72(1):e1–e48 (`sources[0]`; uploaded PDF, 48 pages; PDF page n = journal page e-n). Roman numerals are the guideline's question numbers. Grades are GRADE, copied as written: "strong recommendation" → `STRONG`, "weak" → `WEAK`, "no recommendation, knowledge gap" → not a treatment row (decision 9).

## Entry-level fields

| Field | Current | New | Source + location |
|---|---|---|---|
| `id` | — | `lyme-neuroborreliosis` | Decisions 1, 2 |
| `title` | — | Lyme neuroborreliosis (adult) | Decision 2 (adult doses only) |
| `category` | — | `CNS_INFECTION` | Decision 1 |
| `keyNumbers[0]` | — | Ceftriaxone: 2000 mg IV once daily × 14–21 days | exact copy of `treatment[0].agent` + ": " + `doseText` |
| `keyNumbers[1]` | — | Doxycycline: 100 mg PO twice daily or 200 mg once daily × 14–21 days | exact copy of `treatment[1]` agent + doseText |
| `keyNumbers[2]` | — | Parenchymal brain or spinal cord involvement: IV over oral; typically 2–4-week courses (duration never studied) | exact copy of `treatment[0].notes[1]` |
| `keyNumbers[3]` | — | Lyme vs enteroviral meningitis: … facial nerve palsy, symptoms >7 days, mononuclear-predominant CSF pleocytosis | exact copy of `definitions[11]` |
| `keyNumbers[4]` | — | CSF:serum antibody index: … >85% … 56–79% … years after successful treatment | exact copy of `definitions[5]` |
| `searchTerms` | — | 17 terms (Lyme … tick) | wording |
| `verify` | — | `[]` | no open item |
| `relatedIds` | — | bacterial-meningitis, viral-encephalitis, elevated-icp-herniation, inpatient-neuropathy, myelopathy-workup, new-demyelinating-lesion | `valid-ids.txt` |
| `sources[0]` | — | L20 (title and DOI read from the PDF's first page) | uploaded PDF e1 |

## presentation

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `[0]` | — | Early (first few months; hours to days) vs later (indolent) | L20 e24, "Neurologic Lyme Disease" |
| `[1]` | — | Cranial nerves: VII most common; VIII; less commonly III, V, VI | L20 X.1 (e25–e26); evidence e26 |
| `[2]` | — | PNS patterns | L20 e24; X.1 (e25) |
| `[3]` | — | Raised ICP / papilledema, mostly children; vision | L20 e25 (CSF examination), e28–e29 ("All but 2 of the reported cases have been in children") |
| `[4]` | — | Parenchymal disease exceedingly rare; cord + painful radiculitis | L20 XIV evidence (e28); X.1 (e26) |

## definitions

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `[0]` | — | Who to test | L20 X.1 (e25–e26): strong, moderate |
| `[1]` | — | Who not to test routinely | L20 X.2 (e26): strong, low; XI.1 (e26): strong, low |
| `[2]` | — | Other syndromes: don't screen; white matter lesions: suggest against | L20 X.3 strong, low; X.4 weak, low (e26) |
| `[3]` | — | Serum 2-tier antibody, not PCR/culture | L20 IX.1 (e24): strong, moderate; 2-tier methods e10 |
| `[4]` | — | Paired CSF + serum index; no CSF serology without it; no routine PCR/culture | L20 IX.2 (e24): strong, moderate |
| `[5]` | — | Index: specific; >85% (2 small US studies); 56–79% Europe; normal doesn't exclude; elevated for years | L20 e25 (evidence and rationale, IX) |
| `[6]` | — | CSF PCR 17% / 5%; blood 1–28% | L20 e25 |
| `[7]` | — | Pleocytosis in active CNS disease; CSF may be normal in PNS-only disease | L20 e25 |
| `[8]` | — | Early seronegative → repeat several weeks later; index rarely positive first | L20 e24–e25 |
| `[9]` | — | IgG seronegative after months–years of symptoms rules out | L20 e10 |
| `[10]` | — | IgM and IgG persist years to decades | L20 e10 |
| `[11]` | — | Lyme vs enteroviral meningitis features | L20 e26 (rationale, X) |
| `[12]` | — | CXCL13 not recommended | L20 e25 |

## immediateActions

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `[0]` order 1 | — | Empiric IV coverage first; then oral doxycycline may be considered | L20 e28 (rationale, XIII) |
| `[1]` order 2 | — | Serum 2-tier; paired CSF + serum if LP | L20 IX.1–2 (e24) |
| `[2]` order 3 | — | Facial palsy, Lyme not established, age ≥16: steroids within 72 h | L20 XV.1 comment and evidence (e28) |
| `[3]` order 4 | — | Lyme facial palsy established: no recommendation on steroids | L20 XV.1 (e28): no recommendation, knowledge gap |
| `[4]` order 5 | — | Papilledema: lower ICP | L20 e29 |

## workup

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `[0]` URGENT | — | Serum 2-tier (standard or modified) | L20 IX.1; e10; modified 2-tier e24 |
| `[1]` IF_INDICATED | — | LP: opening pressure, cell count, paired antibody index; 4 purposes; individualize; herniation never reported | L20 e25 (CSF examination); e28 (ICP) |
| `[2]` IF_INDICATED | — | MRI brain/spine for focal CNS findings | L20 e26 (evidence and rationale, X); XIV evidence e28 |

## treatment

| Field | Current | New (short) | Evidence (copied) | Source + location |
|---|---|---|---|---|
| `[0]` FIRST_LINE | — | Ceftriaxone 2000 mg IV once daily × 14–21 d; parenchymal: IV, typically 2–4 wk | XIII.1 "strong recommendation, moderate-quality evidence" → STRONG; XIV.1 same grade | L20 e27 (XIII), e28 (XIV), Table 3 + Table 4 footnote d (e11) |
| `[1]` FIRST_LINE | — | Doxycycline 100 mg PO BID or 200 mg daily × 14–21 d | XIII.1 → STRONG | L20 e27–e28; Tables 3–4 (e11); pregnancy e12 |
| `[2]` ALTERNATIVE | — | Cefotaxime 2000 mg IV TID × 14–21 d | XIII.1 → STRONG | L20 e27; Table 3 (footnote a), Table 4 footnote d (e11) |
| `[3]` ALTERNATIVE | — | Penicillin G 18–24 MU/day IV divided q4h × 14–21 d | XIII.1 → STRONG | L20 e27; Table 3 (footnote a), Table 4 footnote d (e11) |

Roles (decision 3): XIII.1 ranks the four agents equally; Table 3 labels ceftriaxone "Preferred" and cefotaxime and penicillin G "Alternative" among IV agents. Duration: XIII.1, "The preferred antibiotic duration is 14–21 days".

formularyStatus (assumption — tell me if wrong): ceftriaxone `AVAILABLE` (as in R13 and the signed bacterial-meningitis entry); doxycycline, cefotaxime and penicillin G `INSTITUTION_VARIES`.

## pitfalls, escalateWhen, institutionVaries

| Field | Current | New (short) | Source + location |
|---|---|---|---|
| `pitfalls[0]` | — | Steroids in Lyme facial palsy: no recommendation; mixed small studies | L20 XV evidence (e28) |
| `pitfalls[1]` | — | Persistent nonspecific symptoms: no additional antibiotics | L20 XXV.1 (e36): strong, moderate |
| `pitfalls[2]` | — | Nonspecific T2 white matter lesions not diagnostic | L20 e26 |
| `pitfalls[3]` | — | Lyme encephalopathy is generally not encephalitis | L20 e24 |
| `pitfalls[4]` | — | >21 days not more effective; 100 days amoxicillin RR 3.70 adverse effects | L20 e27 (evidence, XIII) |
| `pitfalls[5]` | — | Response lags; pleocytosis slow to resolve | L20 Table 3 note (e11); e25 |
| `pitfalls[6]` | — | Jarisch-Herxheimer-like reaction, first 24 h | L20 e12 |
| `pitfalls[7]` | — | No immunoblots on paired serum/CSF outside research | L20 e25 |
| `escalateWhen[0]` | — | Parenchymal involvement → IV | L20 XIV.1 (e28) |
| `escalateWhen[1]` | — | Papilledema → lower ICP | L20 e29 |
| `escalateWhen[2]` | — | Cardiac symptoms → ECG; PR >300 ms etc. → admit, continuous ECG (decision 7) | L20 XVI.1 (weak, low), XVII.1 (strong, very low) (e29) |
| `escalateWhen[3]` | — | Objective relapse → second course may be needed | L20 Table 3 note (e11); XXV.1 comment (e36) |
| `institutionVaries[0]`–`[3]` | — | Lab algorithm / antibody index access; cefotaxime and penicillin G; outpatient IV; Michigan reporting | local (INSTITUTION_VARIES rule) |

## Not encoded (see README ledger)
Erythema migrans, tick-bite prophylaxis, arthritis, carditis treatment, pediatric doses, PNS/CNS anatomy, ICP-lowering doses, the facial palsy steroid dose, non-validated tests, coinfections, a link to `neurosyphilis`.
