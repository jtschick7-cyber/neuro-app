# acute-neuro:nmosd-mogad-attack — CHANGES

Review 2026-11-08, item R6 (drafted 2026-11-09). Base: signed `current.acute-neuro.nmosd-mogad-attack.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-08). Every new line is label text: Soliris PI (rev 6/2026), Ultomiris PI (rev 10/2026), Uplizna PI (rev 9/2026), Enspryng PI (rev 10/2026). "§" = label section.

| field path | current | new | source | why |
|---|---|---|---|---|
| `keyNumbers[2]` | Plasma exchange (PLEX): 1–1.5 total plasma volumes per exchange, daily or every other day; median 5 exchanges over ~10 days (range 2–10) | … (range 2–10); albumin replacement | Exact copy of `treatment[1].agent` + ": " + `doseText` (unchanged field) | K3 (FIX): truncated copy; R3/R4 exact-copy rule. Wording only |
| `searchTerms[8–16]` | (absent) | eculizumab; Soliris; ravulizumab; Ultomiris; inebilizumab; Uplizna; satralizumab; Enspryng; complement inhibitor | — | N4 (FIX) |
| `treatment[3]` (new) | (absent) | **ADJUNCT — Already on a C5 inhibitor (eculizumab, ravulizumab): supplemental dose with PLEX or IVIG.** doseText: "Eculizumab: after each PLEX session, 300 mg if the most recent dose was 300 mg, or 600 mg if it was ≥600 mg, within 60 min. Ravulizumab: after each PLEX session, within 4 h — 40 to <60 kg: 1,200 mg (most recent dose 2,400 mg) or 1,500 mg (3,000 mg); 60 to <100 kg: 1,500 mg (2,700 mg) or 1,800 mg (3,300 mg); ≥100 kg: 1,500 mg (3,000 mg) or 1,800 mg (3,600 mg); after completing an IVIG cycle, 600 mg within 4 h". 4 structured doses (as in myasthenic-crisis `treatment[2]`). Routes IV; NOT_GRADED; INSTITUTION_VARIES | Soliris §2.5 ("adult patients with NMOSD"; Table 2), §7.1; Ultomiris §1.4 (NMOSD AQP4+), §2.4 Table 3, §7.1 | N1 (FIX), D2 (a). Appended after IVIG so the PLEX and IVIG rows stay together |
| `treatment[3].notes[0]` | (absent) | Eculizumab with IVIG: the label's IVIG supplement table is gMG-only — no NMOSD statement | Soliris §2.5: "For patients with gMG, a supplemental dose … with concomitant … IVIg" (Table 3); §7.1 likewise | N1 |
| `treatment[3].evidenceNote` | (absent) | Soliris PI §2.5 (Table 2), §7.1 · Ultomiris PI §2.4 (Table 3), §7.1 | — | Assumption 1 |
| `pitfalls[4]` (new) | (absent) | On a C5 inhibitor (eculizumab, ravulizumab): signs of meningococcal infection → evaluate immediately, even if vaccinated (boxed warning); consider interrupting the drug during treatment of serious meningococcal infection | Boxed Warning, §5.1 (Soliris, Ultomiris) | N2 (FIX) |
| `pitfalls[5]` (new) | (absent) | Meningococcal Patient Safety Card (REMS) is carried after stopping eculizumab (3 months) or ravulizumab (8 months) | Soliris §5.2; Ultomiris §5.2 | D4 (ii) |
| `pitfalls[6]` (new) | (absent) | Inebilizumab (Uplizna) and satralizumab (Enspryng): labels give no PLEX/IVIG guidance | Uplizna and Enspryng read §1–8, §12; Uplizna §7.1 covers immunosuppressants only; Enspryng has no §7 and §12.3 has no biologic interaction statement | N3 (FIX), D2 |
| `institutionVaries[2]` (new) | (absent) | REMS: eculizumab and ravulizumab are dispensed only by REMS-certified healthcare settings and pharmacies — confirm before PLEX so the supplemental dose can be given | Soliris §5.2; Ultomiris §5.2 | N4 (FIX) |
| `relatedIds[3]` (new) | (absent) | acute-neuro:bacterial-meningitis | valid-ids.txt | N4 |
| `sources[5]`–`[8]` | (absent) | Soliris; Ultomiris; Uplizna; Enspryng (US prescribing information strings) | Label headers "Revised: …" | N4 |
| `lastReviewed` | 2026-11-08 | UNREVIEWED | Rule | Edited entry |

## Index shifts
- None. All additions are appended.

## Checked, not changed
- `treatment[0]`–`[2]`, `immediateActions`, `workup`, `definitions`, `presentation`, `escalateWhen`, base `pitfalls[0–3]`: byte-identical to base (checked by script).
- `keyNumbers[0]`, `[1]`, `[3]`: already exact copies (`immediateActions[1].action`, `escalateWhen[0]`, `treatment[2].agent` + ": " + `doseText`).
- No FcRn blocker is NMOSD-indicated in the provided labels, so no FcRn row here.

## Disposition
- N1–N4, K3, D4 (ii): FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None. Base had `verify: []`; nothing added.

## Registry version
- acute-neuro: the same single R6 MINOR as `myasthenic-crisis`. See README.
