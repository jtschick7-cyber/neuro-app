# acute-neuro:guillain-barre-syndrome — CHANGES

Follow-up batch 2 (2026-11-08). Base: signed `current.acute-neuro.guillain-barre-syndrome.json` (lastReviewed 2026-11-07).

| field path | current | new | source | why |
|---|---|---|---|---|
| `searchTerms[9]` | (absent) | GQ1b | Entry text (presentation[3], workup 'Anti-GQ1b antibody', definitions[6]) | Item 1 (A): term appears in the entry but wasn't searchable |
| `keyNumbers[1]` | Plasma exchange (PLEX): 12–15 L total in 4–5 exchanges over 1–2 weeks (within 4 weeks of onset, unable to walk unaided) | Plasma exchange (PLEX): 12–15 L total in 4–5 exchanges over 1–2 weeks (within 4 weeks of onset, unable to walk unaided); 2 exchanges if able to walk but not run (within 2 weeks) | Copy of treatment[1].agent + ": " + treatment[1].doseText; doseText matches EAN/PNS 2023 PE section (strong: 4–5 exchanges, 12–15 L, 1–2 wk, unable to walk unaided, ≤4 wk; weak: 2 exchanges, GBS-DS 2, ≤2 wk) | Item 1b (C): keyNumbers lines are word-for-word copies; the line had been cut at the semicolon |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule 5 | Edited entry |

## Noticed, not changed
- None.

## Open verify[]
- None (`verify: []`).

## Registry version
- acute-neuro: 1.2.5 → 1.2.6 (PATCH), applied once at assembly (see README).
