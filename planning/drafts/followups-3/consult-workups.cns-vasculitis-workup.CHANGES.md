# consult-workups:cns-vasculitis-workup — CHANGES

Follow-up batch 3 (2026-11-08). Base: signed `current.consult-workups.cns-vasculitis-workup.json` (lastReviewed 2026-11-08, `main` 814629f).

| field path | current | new | source | why |
|---|---|---|---|---|
| `decisionRules[3].condition` | Angiography highly suggestive of medium-to-large-vessel vasculitis | Vascular abnormalities on DSA, CTA or MRA | Pascarella 2023 ESO PACNS (sources[2]), PICO 8 expert consensus statement: "In patients with vascular abnormalities on DSA, CTA or MRA, we suggest that the possibility of a CNS biopsy should be individually discussed in a multidisciplinary team with relevant expertise and/or an expert in the diagnosis and management of PACNS." | Item 6 (FIX): Salvarani 2024's paraphrase ("biopsy only to rule out other diagnoses") doesn't match ESO; cite ESO directly, as decisionRules[2] does |
| `decisionRules[3].recommendation` | Biopsy only to rule out other diagnoses | Decide on brain biopsy case by case in a multidisciplinary team with PACNS expertise | Same passage (ESO 2023 PICO 8) | Item 6 (FIX) |
| `decisionRules[3].evidenceLevel` | EXPERT_OPINION | CONSENSUS | ESO 2023 PICO 8 is an expert consensus statement (no evidence-based recommendation possible) | Item 6 (FIX): same level as decisionRules[2], which cites the same statement |
| `decisionRules[3].evidenceNote[0]` | ESO guideline as cited in Salvarani 2024 | ESO 2023 PICO 8 expert consensus statement | ESO 2023 PICO 8 | Item 6 (FIX): direct citation replaces the secondary one |
| `lastReviewed` | 2026-11-08 | UNREVIEWED | Rule 4 | Edited entry |

## Checked, not changed
- `sources[1]` (de Sousa) checked against the paper's own citation line ("de Sousa ÍA, Machado AdS, Veras… Headache. 2026;66:1162-1180. doi:10.1111/head.70048"); correct, unchanged. `decisionRules[4]` label "de Sousa 2026" correct.
- Salvarani 2024 remains cited by decisionRules[0], initialSteps[0] and pearls.

## Disposition
- Item 6: FIX (decisionRules[3]); surname check: no change needed.

## Open verify[]
- None (`verify: []`).

## Registry version
- consult-workups: 2.1.1 → 2.2.0 (MINOR), applied once at assembly (see README).
