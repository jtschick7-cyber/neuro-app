# R17 V4 draft: DADA2 from the 2023 international consensus (planning/drafts/review-2026-11-08/R17/V4/)

Drafted 2026-11-12 by Claude Code at Jason's request ("Close V3, draft V4"). **Not approved yet; nothing is encoded.** Target: `consult-workups:monogenic-csvd-workup` on PR #55. Proposed JSON: `V4.changes.json`.

Source (supplied by Jason, read in full, pp.1–13): Lee PY, et al. Evaluation and Management of Deficiency of Adenosine Deaminase 2: An International Consensus Statement. JAMA Netw Open 2023;6(5):e2315894. Modified Delphi with 38 voters; Oxford levels of evidence; agreement on a 9-point scale. Every statement used is LOE 5 (D) except 2.3–2.5 (LOE 2 (B)), so rules are `CONSENSUS`, the same mapping as the EAN 2020 Delphi rules.

## Why
The entry's verify item V4 said the sources read did not cover ADA2 testing or treatment, and D6 left DADA2 off must-not-miss for that reason. Lee 2023 covers both, and statement 5.5 is an antithrombotic caution, the only management the entry holds (D3). Without it, a stroke patient with DADA2 gets no caution against routine antiplatelets, unlike COL4A1/2 (rules 8–9).

## Core (recommended)
| # | Field | Change | Source |
|---|---|---|---|
| V4-1 | `decisionRules` | Append rule 14: DADA2 → avoid antiplatelet, anticoagulant and other antithrombotic therapy, to prevent hemorrhagic stroke (`CONSENSUS`) | Table 5, 5.5 (8.3 of 9); p.7 |
| V4-2 | `workup` | Append workup[12]: ADA2 enzyme activity and ADA2 sequencing, IF_INDICATED, with 4 notes (near-absent activity diagnostic, normal excludes; biallelic variants diagnostic; sequencing misses intronic and copy-number variants; assay availability and panel coverage) | Table 2, 2.3–2.5, 2.7; Table 3, 3.5; p.4 |
| V4-3 | `sources` | Append Lee 2023 | |
| V4-4 | `verify` | Remove V4 (empties `verify[]`) | |

Appending keeps every existing index and rule number unchanged, so the CHANGES file references, keyNumbers sources and decision log stay valid.

## Options (Jason decides)
- **A. Must-not-miss DADA2:** `differential[12].mustNotMiss` → true, plus a 4th clue "Treatable: TNF inhibitors lower the risk of ischemic and hemorrhagic stroke (Lee 2023 p.6)", matching the homocystinuria line. Reverses D6. Recommended: yes.
- **B. Acute stroke treatment rule 15:** glucocorticoids and/or a TNF inhibitor; consider a TNF inhibitor to prevent further strokes (5.4, 7.7 of 9, the lowest agreement used). This is disease-specific treatment, which D3 parks for every disease (B2). Recommended: no, keep parked; option A's clue already flags treatability.

## Not proposed
- Screening statements 3.4, 3.6, 3.7 (vasculitis, cytopenia, immunodeficiency triggers): outside stroke scope; differential[12] already lists those features from Manini.
- HSCT, immunization and carrier statements (5.6–5.11): treatment, parked (B2).
- `dx` and the "Loose fit:" tag on differential[12]: unchanged; the fit to small vessel disease is still loose (D1).

## Checks run
- Applied to a scratch copy of the registry (core only, and core + A + B): `scripts/validate.ts` 0 errors; only warnings are UNREVIEWED and cross-registry relatedIds not loaded in a single-file run.
- Each line was checked against the PDF text: 5.5 and 5.4 (Table 5), 2.3–2.5 and 2.7 with footnote a (Table 2), 3.5 (Table 3), pp.4, 6, 7.

## Version
consult-workups stays 3.2.0 if encoded on PR #55 before release (as R12 and R14 changed entries in their open PRs without a further bump). Sign-off adds its PATCH.

## To encode
Jason approves core plus his choice on A and B in chat, and closes V4 with a reason (suggested: "Covered by Lee 2023 DADA2 consensus; encoded as rule 14 and workup[12]").
