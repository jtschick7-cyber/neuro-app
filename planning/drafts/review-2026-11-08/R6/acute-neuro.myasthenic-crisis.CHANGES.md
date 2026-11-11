# acute-neuro:myasthenic-crisis — CHANGES

Review 2026-11-08, item R6 (drafted 2026-11-09). Base: signed `current.acute-neuro.myasthenic-crisis.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07). Every new line is label text: Soliris PI (rev 6/2026), Ultomiris PI (rev 10/2026), Zilbrysq PI (rev 1/2026), Vyvgart PI (rev 5/2026), Vyvgart Hytrulo PI (rev 5/2026), Rystiggo PI (rev 12/2025), Imaavy PI (rev 8/2026), Uplizna PI (rev 9/2026). "§" = label section.

| field path | current | new | source | why |
|---|---|---|---|---|
| `keyNumbers[2]` | IVIG: 2 g/kg total over 2–5 days | IVIG: 2 g/kg total over 2–5 days (Gilhus 2024: over 3–5 consecutive days; e.g., 0.4 g/kg/day ×5) | Exact copy of `treatment[0].agent` + ": " + `doseText` (unchanged field) | K1 (FIX): truncated copy; R3/R4 exact-copy rule. Wording only |
| `keyNumbers[3]` | Plasma exchange (PLEX): 1–1.5 total plasma volumes per exchange; 3–6 exchanges over 10–14 days (daily or alternate days) | … (daily or alternate days); albumin replacement | Exact copy of `treatment[1].agent` + ": " + `doseText` (unchanged field) | K2 (FIX): truncated copy. Wording only |
| `searchTerms[5–20]` | (absent) | eculizumab; Soliris; ravulizumab; Ultomiris; zilucoplan; Zilbrysq; efgartigimod; Vyvgart; rozanolixizumab; Rystiggo; nipocalimab; Imaavy; inebilizumab; Uplizna; FcRn blocker; complement inhibitor | — | F6 (FIX): findability |
| `treatment[2]` (new) | (absent) | **ADJUNCT — Already on a C5 inhibitor (eculizumab, ravulizumab, zilucoplan): supplemental dose with PLEX or IVIG.** doseText: "Eculizumab: after each PLEX session, 300 mg if the most recent dose was 300 mg, or 600 mg if it was ≥600 mg, within 60 min; acute-rescue IVIG needs no supplement. Ravulizumab: after each PLEX session, within 4 h — 40 to <60 kg: 1,200 mg (most recent dose 2,400 mg) or 1,500 mg (3,000 mg); 60 to <100 kg: 1,500 mg (2,700 mg) or 1,800 mg (3,300 mg); ≥100 kg: 1,500 mg (3,000 mg) or 1,800 mg (3,600 mg); after completing an IVIG cycle, 600 mg within 4 h. Zilucoplan: label gives no PLEX/IVIG guidance". Routes IV; NOT_GRADED; INSTITUTION_VARIES | Soliris §2.5 Table 2 (PLEX: 300 mg after 300 mg / 600 mg after ≥600 mg, "Within 60 minutes after each plasmapheresis or plasma exchange session"; applies to gMG and NMOSD), §2.5 Table 3 (IVIG "Acute rescue therapy: No supplemental SOLIRIS dose needed"), §7.1. Ultomiris §2.4 Table 3 (weight × most recent dose; "Within 4 hours following each PE or PP intervention"; 600 mg "Within 4 hours following completion of an IVIg cycle"), §7.1. Zilbrysq: whole label read; no PLEX/IVIG statement, no §7 | F1 (FIX), D1 (a). Placed after PLEX (assumption 2) |
| `treatment[2].dose[0–3]` | (absent) | Eculizumab 300 mg; eculizumab 600 mg (frequency "Within 60 min after each PLEX session"); ravulizumab 1,200–1,800 mg ("Within 4 h after each PLEX session"; label points to doseText for the tier); ravulizumab 600 mg ("Within 4 h after completing the IVIG cycle"). All MG, FIXED, PER_DOSE, NOT_APPLICABLE, caps [] | Same | F1 |
| `treatment[2].notes[0]` | (absent) | Eculizumab with scheduled (non-rescue) IVIG in gMG: 300 or 600 mg supplement by IVIG frequency and most recent dose (Soliris Table 3) | Soliris §2.5 Table 3: IVIG every ≤4 weeks → with the scheduled dose; less often → at the next scheduled dose after the last IVIG cycle; 600 mg if most recent ≥900 mg, 300 mg if ≤600 mg | F1 |
| `treatment[2].evidenceNote` | (absent) | Soliris PI §2.5 (Tables 2–3), §7.1 · Ultomiris PI §2.4 (Table 3), §7.1 · Zilbrysq PI: no PLEX/IVIG statement; no drug-interaction section | — | Assumption 1 |
| `treatment[3]` (new) | (absent) | **ADJUNCT — Already on an FcRn blocker (efgartigimod IV or SC, rozanolixizumab, nipocalimab): IVIG, PLEX or a C5 inhibitor.** doseText: "No label dose adjustment or timing interval. Labels: FcRn blockers may lower exposure and reduce effectiveness of drugs that bind FcRn (IVIG, IgG monoclonal antibodies) — monitor for reduced effect". dose []; routes IV; NOT_GRADED; INSTITUTION_VARIES | Vyvgart, Vyvgart Hytrulo, Rystiggo, Imaavy §7.1 ("immunoglobulin products, monoclonal antibodies, or antibody derivates containing the human Fc domain of the IgG subclass … may lower systemic exposures and reduce effectiveness … Closely monitor") | F2 (FIX), D1 (a), D3 (no half-lives) |
| `treatment[3].notes[0]` | (absent) | Eculizumab and ravulizumab labels: FcRn blockers may lower their exposure — monitor for reduced effect | Soliris §7.2; Ultomiris §7.2 (names efgartigimod) | F2 |
| `treatment[3].notes[1]` | (absent) | FcRn-blocker labels say nothing about PLEX | All four labels read (§1–8, §12 in full; keyword search of the rest) | F2 |
| `treatment[3].notes[2]` | (absent) | Active infection: labels say delay the FcRn-blocker dose; serious infection: consider withholding until resolved | §5.1 of all four labels | D4 (iii) |
| `treatment[3].notes[3]` | (absent) | Long-term need for an FcRn-binding drug: labels say consider stopping the FcRn blocker | §7.1 of all four ("When concomitant long-term use of such medications is essential … consider discontinuing") | F2 |
| `treatment[3].evidenceNote` | (absent) | Vyvgart PI §5.1, §7.1 · Vyvgart Hytrulo PI §5.1, §7.1 · Rystiggo PI §5.1, §7.1 · Imaavy PI §5.1, §7.1 · Soliris PI §7.2; Ultomiris PI §7.2 | — | Assumption 1 |
| `pitfalls[7]` (new) | (absent) | On a C5 inhibitor (eculizumab, ravulizumab, zilucoplan): signs of meningococcal infection → evaluate immediately, even if vaccinated (boxed warning); consider interrupting the drug during treatment of serious meningococcal infection | Boxed Warning and §5.1 of Soliris, Ultomiris, Zilbrysq | F3 (FIX) |
| `pitfalls[8]` (new) | (absent) | Meningococcal Patient Safety Card (REMS) is carried after stopping eculizumab (3 months), ravulizumab (8 months) or zilucoplan (2 months) | Soliris §5.2 ("during and for 3 months following treatment"); Ultomiris §5.2 ("8 months"); Zilbrysq §5.2 ("2 months following treatment discontinuation") | D4 (ii) |
| `pitfalls[9]` (new) | (absent) | Rozanolixizumab: serious drug-induced aseptic meningitis reported — work up per standard care; trial headache 44%, pyrexia 17% | Rystiggo §5.2; §6.1 Table 2 (headache 44% vs 19%; pyrexia 17% vs 2%) and "Aseptic Meningitis" (hospitalization, discontinuation) | D4 (i) |
| `pitfalls[10]` (new) | (absent) | Inebilizumab (Uplizna, also gMG-indicated): label gives no PLEX/IVIG guidance | Uplizna §1.3 (gMG, AChR+ or MuSK+; Recent Major Change 12/2025); label read §1–8, §12; no PLEX/IVIG statement (§7.1 covers immunosuppressants only) | D2 |
| `institutionVaries[4]` (new) | (absent) | REMS: eculizumab and ravulizumab are dispensed only by REMS-certified healthcare settings and pharmacies — confirm before PLEX so the supplemental dose can be given | Soliris §5.2; Ultomiris §5.2 ("Healthcare settings and pharmacies that dispense … must be certified in the REMS") | F4 (FIX) |
| `relatedIds[6]` (new) | (absent) | acute-neuro:bacterial-meningitis | valid-ids.txt | F5 (FIX) |
| `sources[6]`–`[13]` | (absent) | Soliris; Ultomiris; Zilbrysq; Vyvgart; Vyvgart Hytrulo; Rystiggo; Imaavy; Uplizna (US prescribing information strings, R5 format) | Label headers "Revised: …" | F7 (FIX) |
| `lastReviewed` | 2026-11-07 | UNREVIEWED | Rule | Edited entry |

## Index shifts (no content change)
- `treatment`: new `[2]` (C5) and `[3]` (FcRn); old `[2]`–`[4]` (prednisone/prednisolone, pyridostigmine, supportive) → `[4]`–`[6]`.

## Checked, not changed
- `treatment[0]`, `[1]` (IVIG, PLEX), `immediateActions`, `workup`, `escalateWhen`, `definitions`, `presentation`, base `pitfalls[0–6]`, base `institutionVaries[0–3]`: byte-identical to base (checked by script).
- `keyNumbers[0]`, `[1]`: already exact copies of `escalateWhen[0]` and `[2]`.

## Disposition
- F1–F7, K1–K2, D2, D4 (i–iii): FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None. Base had `verify: []`; nothing added.

## Registry version
- acute-neuro: one MINOR for R6 (covers this entry and `nmosd-mogad-attack`), applied at assembly from the version in `data/acute-neuro.json`. See README.
