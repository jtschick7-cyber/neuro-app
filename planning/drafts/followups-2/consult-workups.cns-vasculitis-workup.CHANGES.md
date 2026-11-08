# consult-workups:cns-vasculitis-workup — CHANGES

Follow-up batch 2 (2026-11-08). Base: signed `current.consult-workups.cns-vasculitis-workup.json` (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `decisionRules[1].evidenceLevel` | EXPERT_OPINION | WEAK | Pascarella 2023 (ESO PACNS) PICO 5 evidence-based recommendation: weak for, very low quality | Item 5a (B): cite ESO directly; grade now matches the cited GRADE recommendation (approved) |
| `decisionRules[1].evidenceNote` | ["ESO guideline as cited in Salvarani 2024"] | ["ESO 2023 PICO 5: weak recommendation for DSA if MRA normal (very low quality)", "ESO 2023 PICO 4 expert consensus statement: consider DSA when MRA/CTA not diagnostic"] | Pascarella 2023 PICO 5 recommendation; PICO 4 expert consensus statement 2 | Item 5a (B): direct citation; normal CTA is covered only by the PICO 4 consensus statement |
| `decisionRules[2].evidenceLevel` | EXPERT_OPINION | CONSENSUS | Pascarella 2023 Methods: consensus statements voted by all writing-group members, wording settled by Delphi | Item 5a (B): formal consensus fits the CONSENSUS enum (approved) |
| `decisionRules[2].evidenceNote` | ["ESO guideline as cited in Salvarani 2024"] | ["ESO 2023 PICO 8 expert consensus statement"] | Pascarella 2023 PICO 8 expert consensus statement ("propose CNS biopsy in patients with suspicion of SV-PACNS, that is, with normal angiogram") | Item 5a (B): direct citation |
| `decisionRules[4].evidenceNote` | ["Sousa 2026"] | ["de Sousa 2026"] | sources[1] (de Sousa IA, et al. Headache 2026) | Item 5b (A): label matches the stored source |
| `sources[2]` | (absent) | Pascarella R, et al. European Stroke Organisation (ESO) guidelines on Primary Angiitis of the Central Nervous System (PACNS). Eur Stroke J 2023;8(4):842-879. doi:10.1177/23969873231190431 | Attached ESO guideline PDF masthead (Eur Stroke J 2023, Vol. 8(4) 842–879, doi 10.1177/23969873231190431) | Item 5a (B): ESO guideline now cited directly |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 5 | Edited entry |

## Checked, not changed
- `decisionRules[3].evidenceNote`: Kept "ESO guideline as cited in Salvarani 2024": ESO doesn't say "biopsy only to rule out other diagnoses". The closest is PICO 8 (discuss biopsy case by case in a multidisciplinary team when angiography is abnormal; DSA before biopsy unless biopsy helps exclude differentials). The rule follows Salvarani's paraphrase.

## Noticed, not changed
- decisionRules[3]: citing ESO directly would need the recommendation reworded to ESO's multidisciplinary-team wording. That's a recommendation change and needs its own item.
- The de Sousa article wasn't attached, so the surname form ("de Sousa" vs "Sousa") wasn't checked against the paper itself.

## Open verify[]
- None (`verify: []`).

## Registry version
- consult-workups: 2.0.1 → 2.1.0 (MINOR), applied once at assembly (see README).
