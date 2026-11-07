# consult-workups:cns-vasculitis-workup — CHANGES (follow-up batch, Group B item 3)

| field path | current | new | source | why |
|---|---|---|---|---|
| `sources[0]` (DOI only) | `doi:10.1161/STR.0000000000000422` | `doi:10.1056/NEJMra2314942` | Salvarani C, Hunder GG, Brown RD Jr. N Engl J Med 2024;391:1028-37, first page ("DOI: 10.1056/NEJMra2314942") | The Stroke DOI doesn't belong to this NEJM review. The rest of the citation string is unchanged |
| `sources[0]` (author order) | `Salvarani C, Brown RD Jr, Hunder GG.` | `Salvarani C, Hunder GG, Brown RD Jr.` | Byline on the NEJM 2024;391:1028-37 first page | Author order didn't match the article (approved by Jason in Group B review) |
| `verify[]` | `[]` | added an item about the Stroke DOI (text in JSON) | Batch rule 2 | Couldn't identify which paper `10.1161/STR.0000000000000422` belongs to from the attached sources. No content in the entry is attributed to an AHA/Stroke paper, so nothing appears to have been drawn from it, but that isn't confirmed |
| `lastReviewed` | `"2026-11-07"` | `"UNREVIEWED"` | Batch rule 5 | Entry edited |

`keyNumbers`: this entry has none.

Registry bump: consult-workups. **PATCH** is recommended (same paper; identifier corrected). It becomes MINOR if a corrected DOI counts as a "source" change under VERSIONING.md. Applied once at assembly.
