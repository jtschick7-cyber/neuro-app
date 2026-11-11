# reference-cards.boston-criteria-caa — CHANGES (review 2026-11-08, item R16)

New entry. There is no base in the export packet, so every "Current" cell is "—". Append the card as the last entry of `data/reference-cards.json`. `lastReviewed: "UNREVIEWED"`. Content is as approved in chat 2026-11-11 ("Approve as recommended", decisions 1–6 and the three assumptions).

Every location below is in the published article (Lancet Neurol 2022;21:714-725; journal page numbers), uploaded 2026-11-11 after the first draft. The first draft cited the NIH author manuscript and carried two `verify[]` items; both were closed against the published article (see "Revision" at the end).

## Card-level fields

| Field | Current | New | Source + location |
|---|---|---|---|
| `id` | — | `boston-criteria-caa` | decision 1 |
| `title` | — | Boston criteria v2.0 for cerebral amyloid angiopathy | decision 1 |
| `searchTerms` | — | 17 terms (CAA … amyloid spells) | wording |
| `scopeNote` | — | MRI criteria for sporadic CAA: categories, definitions and cut-offs, accuracy against autopsy; other CAA topics live in their own entries | decision 1 |
| `pitfalls[0]` | — | Mixed lobar + deep hemorrhagic lesions not addressed: only 36 cases | Discussion, p.723 |
| `pitfalls[1]` | — | Not validated in iatrogenic or hereditary CAA, or asymptomatic people | Methods p.716 (excluded); Discussion pp.723–724 |
| `pitfalls[2]` | — | Derived almost entirely from white participants of European ancestry | Discussion, p.723 |
| `pitfalls[3]` | — | Needs T2* and T2 MRI; accuracy appeared highest with SWI | Discussion p.724; Results p.721; Table 4 p.722 |
| `pitfalls[4]` | — | Accuracy likely overestimated (spectrum bias) | Discussion, p.723 |
| `keyNumbers[0]`–`[4]` | — | Probable CAA; Possible CAA; Severe CSO-PVS; WMH multispot pattern; Multifocal cSS (exact copies; see README) | rows below |
| `verify` | — | `[]` (none) | both first-draft items closed against the published article |
| `relatedIds` | — | ich-etiology-workup, caa-related-inflammation, restart-antithrombotic-after-ich | `valid-ids.txt` |
| `sources[0]` | — | Charidimou 2022 | uploaded published PDF |

## sections[0] — Criteria (Charidimou 2022)

All rows: role `TARGET`, `evidenceLevel` `NOT_GRADED` (diagnostic criteria carry no grade).

| Row | Current | New: target (notes) | Source + location |
|---|---|---|---|
| `rows[0]` Applies to | — | Age ≥50 with spontaneous ICH, TFNE, or cognitive impairment/dementia | Panel, p.720 |
| `rows[1]` Probable CAA | — | ≥2 strictly lobar hemorrhagic lesions on T2* MRI, any combination (ICH, microbleed, cSS/cSAH foci), OR 1 lobar hemorrhagic lesion + 1 white matter feature | Panel, p.720 ("At least two of the following strictly lobar haemorrhagic lesions… OR One lobar haemorrhagic lesion plus one white matter feature") |
| `rows[2]` Possible CAA | — | 1 strictly lobar hemorrhagic lesion, OR 1 white matter feature | Panel, p.720 |
| `rows[3]` Exclusions | — | No deep ICH or microbleed on T2*; no other cause (notes: the five named causes; cerebellar lesions count as neither; other causes of cSS and acute cSAH should also be excluded) | Panel and footnote ‡, p.720 |
| `rows[4]` Pathology-based categories | — | Definite: full post-mortem, severe CAA with vasculopathy. Probable with supporting pathology: some degree of CAA in evacuated hematoma or cortical biopsy (notes: presentations incl. cSAH, no other diagnostic lesion; unchanged in v2.0) | Panel, p.720; Methods p.717 |

## sections[1] — Lesion definitions

All rows: role `TARGET`, `NOT_GRADED`.

| Row | Current | New | Source + location |
|---|---|---|---|
| `rows[0]` Severe CSO-PVS | — | >20 visible perivascular spaces in the centrum semiovale of one hemisphere (note: axial T2) | Figure 1, p.717; Methods (Procedures) p.716 |
| `rows[1]` WMH multispot pattern | — | >10 small circular or ovoid T2/FLAIR lesions, subcortical white matter, both hemispheres (notes: less robust than CSO-PVS; periventricular and deep WMH severity not associated) | Figure 1, p.717; Methods p.716; Discussion p.723; Results p.718 |
| `rows[2]` Multifocal cSS | — | Gyri separated by uninvolved areas, or ≥3 adjacent gyri = ≥2 lesions (notes: an adjacent gyrus is still one focus; cSS adjacent to lobar ICH not counted; alone can meet probable) | Discussion, p.722 |
| `rows[3]` Acute cSAH near cSS | — | Counts as 2 markers (dissemination in time) (note: cSAH and cSS equivalent markers) | Discussion, p.722 |

## sections[2] — Accuracy vs autopsy (probable CAA)

All rows: role `EVIDENCE_SUMMARY`, `NOT_GRADED`. Figures are for probable vs non-probable CAA, Boston v2.0.

| Row | Current | New | Source + location |
|---|---|---|---|
| `rows[0]` All presentations, n=150 | — | Sensitivity 74.5% (65.4–82.4), specificity 95.0% (83.1–99.4), AUC 0.848 | Table 4, p.722; Results p.721 |
| `rows[1]` ICH presentation, n=75 | — | Sensitivity 90.2% (79.8–96.3), specificity 92.9% (66.1–99.8), AUC 0.915 | Table 4, p.722 |
| `rows[2]` Non-ICH presentation, n=75 | — | Sensitivity 55.1% (40.2–69.3), specificity 96.2% (80.4–99.9), AUC 0.756 | Table 4, p.722 |

## Wording notes
- The Panel prints "One lobar haemorrhagic lesion" and "One white matter feature"; encoded as "1". (The author manuscript's "I" was a typo, as assumed.)
- The source prints decimals with a mid-dot (74·5%); encoded with a full stop.
- "Microbleed" is used for CMB; US spelling throughout.

## Not encoded (see README ledger)
What changed from v1.5 and the v1.5 comparison figures; probable+possible accuracy; whole-sample, derivation and validation-cohort figures; odds ratios; study design; CAA pathophysiology; Edinburgh CT criteria; the 2026 memory-clinic validation; a link to `aria-anti-amyloid`.

## Revision 2026-11-11 (published article uploaded)
The first draft was built from the NIH author manuscript. After Jason uploaded the published article, the card was re-checked against it line by line:

| Field | First draft | Now | Source + location |
|---|---|---|---|
| every row `evidenceNote`; location text in three `notes` | manuscript labels and pages (Table 2 p.21, Table 5 p.24, Figure 1 p.17) | Panel p.720; Table 4 p.722; Figure 1 p.717; Methods pp.716–717; Results p.718; Discussion pp.722–723 | published article |
| `sections[0].rows[3].notes[2]` | "footnote … is cut off in the author manuscript (see verify)" | Other causes of cSS and acute cSAH should also be excluded | Panel footnote ‡, p.720 |
| `sections[1].rows[1].notes[0]` | "may need independent replication" | "needs independent replication" | Discussion p.723 ("it will require independent replication") |
| `sections[1].rows[2].notes[0]` | "…extends to a second adjacent gyrus" | "…extends to an adjacent gyrus" | Discussion p.722 ("even if it extends to an adjacent gyrus") |
| `verify` | 2 items (manuscript citations; cut-off footnote) | `[]` | both confirmed against the published article |

No criterion, cut-off or accuracy figure changed: all numbers matched between the two versions.
