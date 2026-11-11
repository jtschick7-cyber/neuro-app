# Review 2026-11-08, item R6: drafts (planning/drafts/review-2026-11-08/R6/)

MG / NMOSD patients already on an FcRn blocker or a complement inhibitor: IVIG/PLEX timing, supplemental-dose rules and the meningococcal warning, from label text only. Approved by Jason in chat 2026-11-09 ("approve"; recommendations as offered): D1 (a) treatment rows for C5 dosing and FcRn, meningococcal line in pitfalls; D2 mirror in `nmosd-mogad-attack` + inebilizumab/satralizumab "no guidance" line in both entries; D3 no half-lives; D4 (i), (ii), (iii) all yes; D5 PARK; D6 PARK; assumptions 1–4 accepted. Base: the signed `current.acute-neuro.myasthenic-crisis.json` (lastReviewed 2026-11-07) and `current.acute-neuro.nmosd-mogad-attack.json` (lastReviewed 2026-11-08) from the review-2026-11-08 export packet. Both entries have `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- The brief's from-memory claims hold: Soliris (§2.5) and Ultomiris (§2.4) give supplemental doses after PLEX, and all three C5 inhibitors (Soliris, Ultomiris, Zilbrysq) carry the meningococcal boxed warning.
- Not anticipated: Soliris needs **no** supplement for acute-rescue IVIG (Table 3, gMG-only table); Ultomiris needs 600 mg after **any** IVIG cycle; Zilbrysq says nothing about PLEX or IVIG (no §7); the four FcRn-blocker labels give no dose or interval for IVIG and say nothing about PLEX; Rystiggo carries an aseptic meningitis warning (§5.2).
- Nipocalimab's US brand is **Imaavy** (Janssen; "Initial U.S. Approval: 2025"; gMG AChR+ or MuSK+, ≥12 years).
- Uplizna gained a gMG indication (12/2025). Neither NMOSD label (Uplizna, Enspryng) addresses PLEX/IVIG.

**Assumptions accepted:** (1) label rows are NOT_GRADED with "<Drug> PI §…" in `evidenceNote` (R5 precedent); (2) new myasthenic-crisis treatment items go after PLEX, before steroids; (3) the uploaded label revisions are current (no DailyMed check beyond the uploads); (4) one acute-neuro bump for R6.

**One change not explicitly offered in chat:** K1–K3. Three existing `keyNumbers` were truncated copies of their `agent + ": " + doseText` field (myasthenic-crisis `[2]`, `[3]`; nmosd-mogad-attack `[2]`). The required keyNumbers check can't pass otherwise, and R3/R4 fixed the same defect the same way, so they are now exact copies. Wording only; the doses are unchanged. If Jason prefers, revert K1–K3 and treat them as PARK.

**Validation actually run** (not only read): both drafts were parsed with zod 3 against `AcuteNeuroEntry`, using `schema/common.ts` and `schema/acute-neuro.ts` copied verbatim from the project: **PASS** (the base myasthenic-crisis also passes). A deliberately broken copy (a FIXED dose with weightBasis ACTUAL; a source without a year) failed both rules, which confirms the check is live. A script also confirmed:
- top-level key order unchanged; every new `treatment` and `dose` object has the base key order;
- every `keyNumbers` line is an exact copy of a field (4 lines each, max 5);
- every `relatedIds` entry is in `valid-ids.txt`; no removed id is referenced; no `calculatorIds`;
- every base treatment item is byte-identical and in its original relative order; all other base fields unchanged except the listed appends; base `verify[]` (empty) and base `sources[]` kept in order.

The drafts were built by a script from the base JSON. The base was transcribed from the project copy of the export; Claude Code's step 1 checks `data/` still matches it. `npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: encode both JSON files word for word as full replacement entries, validate, show the diffs against the CHANGES files, then apply **one** acute-neuro bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `acute-neuro.myasthenic-crisis.json` (+ `…CHANGES.md`) | F1–F7, K1–K2, D2, D4 (i–iii) | New `treatment[2]` C5-inhibitor supplemental dosing (eculizumab, ravulizumab, zilucoplan; 4 structured doses) and `treatment[3]` FcRn-blocker interaction row; 4 pitfalls (meningococcal, safety-card duration, rozanolixizumab aseptic meningitis, inebilizumab no guidance); REMS line; `relatedIds` += bacterial-meningitis; 16 search terms; 8 label sources; 2 keyNumbers made exact copies |
| `acute-neuro.nmosd-mogad-attack.json` (+ `…CHANGES.md`) | N1–N4, K3, D2, D4 (ii) | New `treatment[3]` C5-inhibitor supplemental dosing (eculizumab PLEX only; ravulizumab PLEX and IVIG); 3 pitfalls (meningococcal, safety card, inebilizumab/satralizumab no guidance); REMS line; `relatedIds` += bacterial-meningitis; 9 search terms; 4 label sources; 1 keyNumber made an exact copy |

## keyNumbers
myasthenic-crisis:
- `[0]`: unchanged; exact copy of `escalateWhen[0]`.
- `[1]`: unchanged; exact copy of `escalateWhen[2]`.
- `[2]`: changed (K1); exact copy of `treatment[0].agent` + ": " + `doseText`.
- `[3]`: changed (K2); exact copy of `treatment[1].agent` + ": " + `doseText`.

nmosd-mogad-attack:
- `[0]`: unchanged; exact copy of `immediateActions[1].action`.
- `[1]`: unchanged; exact copy of `escalateWhen[0]`.
- `[2]`: changed (K3); exact copy of `treatment[1].agent` + ": " + `doseText`.
- `[3]`: unchanged; exact copy of `treatment[2].agent` + ": " + `doseText`.

All eight checked by script. No supplemental-dose number added (weight-tiered; one line would have to drop tiers).

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/acute-neuro.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | New treatment rows with doses; new sources; new safety lines (two entries, one bump) |

No `package.json` bump (no code or UI change) and no schema bump (existing fields and enums only). Update `lastUpdated` on `data/acute-neuro.json` to the encoding date.

**R3/R4 interaction:** R3 and R4 also bump `acute-neuro` (MINOR each; R4 is sequenced after R3). Encode R6 on a branch from `main` **after** both the R3 and R4 PRs have merged, so each item gets its own single bump. If either PR is still open, Claude Code stops and asks.

## Open verify[]
- None. Both bases had `verify: []`; nothing added.
- Open non-verify item: gefurulimab (D6), a decision-log open item so it doesn't block release.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F1 | MG `treatment[2]` | No supplemental-dose guidance for patients on eculizumab/ravulizumab who get PLEX or IVIG; zilucoplan label silent | **FIX** (D1 a): C5 row, 4 structured doses |
| F2 | MG `treatment[3]` | No guidance for patients on FcRn blockers who get IVIG/PLEX/C5 mAbs | **FIX** (D1 a): FcRn row, label §7.1 text; no interval (none exists) |
| F3 | MG `pitfalls[7]` | Meningococcal boxed warning absent | **FIX** |
| F4 | MG `institutionVaries[4]` | REMS dispensing certification can block the supplemental dose | **FIX** |
| F5 | MG `relatedIds` | No link to bacterial meningitis | **FIX** |
| F6 | MG `searchTerms` | Drug names not searchable | **FIX** |
| F7 | MG `sources` | 8 labels not cited | **FIX** |
| N1 | NMOSD `treatment[3]` | Same C5 gap (eculizumab and ravulizumab are NMOSD-indicated) | **FIX** (D2): eculizumab PLEX only; IVIG table is gMG-only (note) |
| N2 | NMOSD `pitfalls[4]` | Meningococcal warning absent | **FIX** (D2) |
| N3 | NMOSD `pitfalls[6]` | Uplizna/Enspryng silent on PLEX/IVIG | **FIX** (D2): visible "no guidance" line |
| N4 | NMOSD `institutionVaries`, `relatedIds`, `sources`, `searchTerms` | Same additions as F4–F7 | **FIX** |
| D2 | MG `pitfalls[10]` | Uplizna now gMG-indicated; label silent on PLEX/IVIG | **FIX** |
| D3 | — | FcRn half-lives (efgartigimod 80–120 h; nipocalimab 29.3 h; Rystiggo gives clearance only) | **ACCEPT**: not encoded; labels never link half-life to IVIG/PLEX timing |
| D4i | MG `pitfalls[9]` | Rozanolixizumab aseptic meningitis (§5.2) | **FIX** |
| D4ii | MG `pitfalls[8]`, NMOSD `pitfalls[5]` | Safety Card duration after stopping (3 / 8 / 2 months) | **FIX** |
| D4iii | MG `treatment[3].notes[2]` | FcRn labels: delay with active infection; consider withholding if serious | **FIX** |
| D5 | — | Starting a C5 or FcRn inhibitor during crisis (Gilhus 2024 p6 rec iv; ICG 2020 p6 antibiotic cover ≥4 weeks if started <2 weeks after vaccination, penicillin VK 250–500 mg q12h; Gilhus 2024 p5: prophylactic antibiotics not recommended for most) | **PARK**: outside R6 ("already on"); candidate new item |
| D6 | — | Gefurulimab: EMA CHMP positive opinion 17 Sep 2026 (Klygefa, AChR+ gMG); no US approval found (web check 2026-11-09) | **PARK**: decision-log open item, not `verify[]` |
| K1–K3 | MG `keyNumbers[2]`, `[3]`; NMOSD `keyNumbers[2]` | Truncated copies of their fields | **FIX**: exact copies (R3/R4 rule); not offered in chat (see note above) |
| A1 | Ultomiris §7.1 | Cross-references "§2.5"; the supplemental table is in §2.4 | **ACCEPT**: cited as §2.4 |
| A2 | — | Soliris fresh-frozen-plasma row (300 mg 60 min before each FFP unit) | **ACCEPT**: outside the brief; not encoded |
| A3 | — | Eculizumab clearance ↑ ~6-fold with PLEX, half-life 90.2 h (Soliris §12.3) | **ACCEPT**: the dosing table already encodes the consequence |
| A4 | — | Whether PLEX removes FcRn blockers or zilucoplan | **ACCEPT**: no label addresses it; not inferred |
| A5 | — | Imaavy §5.1: latent viral reactivation, 2 serious EBV events (1 fatal) | **PARK**: noticed during build, not offered |
| A6 | — | Vyvgart Hytrulo §6.2: CIDP worsening when switching from IVIG | **PARK**: CIDP, outside R6 |
| A7 | — | Vyvgart indication broadened to adult gMG without serostatus restriction (Recent Major Change 5/2026) | **ACCEPT**: not encoded (not a rounds lookup here) |
| A8 | — | NMOSD-label screening/premedication items (HBV, TB, Ig levels, Uplizna premeds) | **ACCEPT**: outpatient start items; outside R6 |
| A9 | MG `treatment[3].routes` | Advisory row needs ≥1 route | **ACCEPT**: `IV` (the row concerns IVIG/PLEX and IV mAbs) |
| A10 | — | Label currency | **ACCEPT**: as uploaded (6/2026–10/2026, Rystiggo 12/2025); no DailyMed check |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Soliris (eculizumab) PI, Alexion, revised 6/2026 (45 pages). Highlights, Boxed Warning, §1–8 and §12 read in full; §6.1 trial tables and §14 searched. Used: Boxed Warning, §2.1, §2.5 (Tables 2–3), §4, §5.1–5.3, §7.1, §7.2, §12.3.
- Ultomiris (ravulizumab-cwvz) PI, Alexion, revised 10/2026 (53 pages). Same reading. Used: Boxed Warning, §1.3–1.4, §2.2, §2.4 (Table 3), §5.1–5.3, §7.1, §7.2, §12.3.
- Zilbrysq (zilucoplan) PI, UCB, revised 1/2026 (48 pages). Same reading; confirmed no §7 and no PLEX/IVIG statement. Used: Boxed Warning, §2.1, §4, §5.1–5.2, §12.3.
- Vyvgart (efgartigimod alfa-fcab) PI, argenx, revised 5/2026 (19 pages). Used: §5.1, §7.1, §12.3.
- Vyvgart Hytrulo (efgartigimod alfa and hyaluronidase-qvfc) PI, argenx, revised 5/2026 (44 pages). Used: §5.1, §6.2, §7.1.
- Rystiggo (rozanolixizumab-noli) PI, UCB, revised 12/2025 (25 pages). Used: §5.1, §5.2, §6.1 (Table 2; aseptic meningitis; headache), §7.1.
- Imaavy (nipocalimab-aahu) PI, Janssen Biotech, revised 8/2026 (30 pages). Used: §1.1, §5.1, §7.1, §12.3.
- Uplizna (inebilizumab-cdon) PI, Horizon Therapeutics (Amgen), revised 9/2026 (31 pages). Used: §1.3, §2–5, §7.1 (absence of PLEX/IVIG guidance).
- Enspryng (satralizumab-mwge) PI, Genentech, revised 10/2026 (50 pages). Used: §2, §4, §5, §12.3 (absence of PLEX/IVIG guidance; no §7).
- Narayanaswami P, et al. ICG 2020 update. Neurology 2021;96(3):114-122 (9 pages; already cited). Used for D5 only: p6 eculizumab section.
- Gilhus NE, et al. Eur J Neurol 2024;31:e16229 (13 pages; already cited). Used for D5 only: p5 (complement inhibitors), p6 recs (iii)–(iv).
- Web check only, not cited in the entries: EMA Klygefa (gefurulimab) CHMP opinion page; NeurologyLive PREVAIL report (2025).
- Note for future items: `pdftotext -layout` handled every label; the Ultomiris and Soliris supplemental tables need careful column reading (checked against Ultomiris Table 6).
