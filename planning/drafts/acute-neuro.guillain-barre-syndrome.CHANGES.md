# acute-neuro:guillain-barre-syndrome — rebuilt changes (item 7.3, rebuilt 2026-11-07)

**Status:** approved by Jason 2026-11-07 for encoding. AMAN/PCB/MFS edits stay dropped; Bickerstaff line kept; CSF protein log item closed (no change); keyNumbers accepted as proposed; `calc:egris` not carried.

Base: `current.guillain-barre-syndrome.json` (signed 2026-11-05, acute-neuro registry 1.1.1). Replaces the 2026-11-06 draft built on v0.7.1. Full replacement entry in the matching .json. Validated with zod against `schema/acute-neuro.ts` (schemaVersion 1.2.0), alone and inside a registry envelope. All `relatedIds` and `calculatorIds` are in `valid-ids.txt`.

## 1. CHANGES

| Field path | Current | New | Source | Why |
|---|---|---|---|---|
| `keyNumbers` | (absent) | 5 lines, see §3 | Copied from this entry's own fields | Task 4.2 / rule 6 (optional; cut any line) |
| `definitions[6]` | (absent) | "Bickerstaff brainstem encephalitis: MFS features plus impaired consciousness and pyramidal signs, often overlapping with GBS; IgG anti-GQ1b/GT1a (Leonhard 2019; Willison & Yuki 2002)" | Leonhard 2019 Table 1 (BBE row) and "Variants" text (MFS-like onset, then impaired consciousness and pyramidal tract signs); Willison & Yuki 2002 Table 1 (BBE grouped with MFS: GQ1b, GT1a, IgG) | Approved 7.3 addition, carried forward |
| `workup[4].notes[0]` (Anti-GQ1b antibody) | "Anti-ganglioside panels of limited value in typical GBS" | "Anti-ganglioside panels of limited value in typical GBS; assay-dependent; a negative result doesn't exclude GBS (Leonhard 2019)" | Leonhard 2019, Laboratory investigations: limited and assay-dependent; a negative result does not rule out GBS; anti-GQ1b more useful when MFS is suspected | Approved 7.3 note, merged into the existing note |
| `relatedIds[1]` | (absent) | `consult-workups:acute-hepatic-porphyria` | Leonhard 2019 Box 2 (porphyria listed as a GBS mimic) | Approved 7.3 link |
| `sources[2]` | (absent) | Leonhard SE, et al. … Nat Rev Neurol 2019;15:671-683. doi:10.1038/s41582-019-0250-9 | — | Cited by the new lines |
| `sources[3]` | (absent) | Willison HJ, Yuki N. … Brain 2002;125:2591-2625 | — | Cited by the Bickerstaff line |
| `lastReviewed` | "2026-11-05" | "UNREVIEWED" | — | Rule 5 |

No dose, threshold, grade, evidence level or formulary status changed. `verify[]` was empty and stays empty.

## 2. How each approved change was handled (approved 2026-11-06)

| Approved change | Status | Detail |
|---|---|---|
| definitions[1] AMAN → "IgG anti-GM1, GM1b, GD1a, GalNAc-GD1a (Willison & Yuki 2002)" | **Dropped, no longer applies** | The current entry has no AMAN line ("AMAN" is only in `searchTerms`), so there's nothing to edit. Putting the line back would be new content |
| definitions[2] MFS ">90%" → "up to 90% (Leonhard 2019)" | **Dropped, no longer applies** | The current text has no ">90%" figure. MFS is covered in `presentation[3]` "MFS: ophthalmoplegia, ataxia, areflexia (anti-GQ1b)" with no percentage, so there's nothing to correct |
| definitions[3] PCB → "IgG anti-GT1a (± GQ1b)" | **Dropped, no longer applies** | The current entry has no PCB line |
| definitions: + Bickerstaff line | **Carried forward as is** (position changed) | Same wording. It goes at the end of `definitions` (index 6), because the variant list it was inserted into (index 4) is gone |
| workup[ganglioside panel].notes: + Leonhard line | **Adapted** | The current workup item is "Anti-GQ1b antibody" (IF_INDICATED: suspected MFS), and its note already says "limited value". Current: "Anti-ganglioside panels of limited value in typical GBS". New: "Anti-ganglioside panels of limited value in typical GBS; assay-dependent; a negative result doesn't exclude GBS (Leonhard 2019)". The old clause "most useful when MFS is suspected" was left out because the item's indication already says this |
| relatedIds: + `consult-workups:acute-hepatic-porphyria` | **Carried forward as is** | In valid-ids.txt |
| sources: + Leonhard 2019, Willison & Yuki 2002 | **Carried forward as is** | Both are cited by the new lines. If the Bickerstaff line is dropped, drop Willison & Yuki too |
| lastReviewed → "UNREVIEWED" | **Carried forward as is** | |
| (old draft) `calc:egris` in relatedIds | **Not carried** | Not in the current entry and not in valid-ids.txt. No calculator was created. mEGRIS still appears in the text only |

## 3. keyNumbers

| Line | Source field path |
|---|---|
| IVIG: 0.4 g/kg/day IV ×5 days (2 g/kg total) | `treatment[0].agent` + ": " + `treatment[0].doseText` (whole) |
| Plasma exchange (PLEX): 12–15 L total in 4–5 exchanges over 1–2 weeks (within 4 weeks of onset, unable to walk unaided) | `treatment[1].agent` + ": " + `treatment[1].doseText` (first clause, cut at ";") |
| Ward → ICU: FVC <60% predicted, SBC <20, autonomic instability, worsening bulbar/neck weakness, or mEGRIS ≥23 (EAN/PNS 2023 Fig. 2) | `escalateWhen[0]` (whole) |
| FVC fall >30% in 24 h → immediate ICU transfer; 50% fall in <24 h → likely needs ventilation | `escalateWhen[1]` (whole) |
| In ICU: FVC <20 mL/kg, MEP <30 cmH2O, MIP <40 cmH2O, or FVC >30% below baseline → consider elective intubation before FVC ≤10 mL/kg | `escalateWhen[2]` (whole) |

Checked by script: each line matches its field exactly.

## 4. Noticed, not changed
- **CSF protein wording (README Q1 / DECISION_LOG 7.3):** The conflicting "~50% normal early" text isn't in the current entry. `definitions[4]` matches the EAN/PNS 2023 CSF evidence summary (>1000 patients: raised in 50% at <3 days, 84% at >7 days). `workup[0].notes[0]` and `pitfalls[0]` match the EAN/PNS GPP "Normal CSF protein is common during the first week… does not exclude GBS". Leonhard 2019 (normal in 30–50% in week 1) agrees with this. No change needed. **Closed 2026-11-07 (Jason).**
- If the Bickerstaff line stays, `searchTerms` has no "Bickerstaff" or "BBE", so search won't find it.
- The old draft also linked `consult-workups:acute-generalized-weakness` and `consult-workups:inpatient-neuropathy`. Both are valid ids, but they weren't approved 7.3 changes and the current entry doesn't have them.
- If an MFS anti-GQ1b percentage is ever added, the sources give different figures: Leonhard 2019 says "up to 90%"; EAN/PNS 2023 gives 88–100% sensitivity.

## 5. Open verify[] items
None (`verify: []`, same as the current entry).

## 6. Assembly
The `acute-neuro` registry needs a **MINOR** bump at assembly. Apply it once for GBS and ICP together, not once per entry. Take the next MINOR from what `data/` holds (README: 1.1.1 → 1.2.0) and update `lastUpdated`.
