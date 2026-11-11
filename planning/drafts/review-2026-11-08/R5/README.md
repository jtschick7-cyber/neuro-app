# Review 2026-11-08, item R5: drafts (planning/drafts/review-2026-11-08/R5/)

Parkinson infusion therapies: reword the outdated continuous-apomorphine pitfall and add an "admitted on an infusion pump" section (Vyalev, Onapgo, Duopa) from label text only. Approved by Jason in chat 2026-11-09: "approve as recommended" — D1 (a), D2 (a), D3 (b), D4 (a), D5 E1–E4 all yes, D6 (a), D7 yes, D8 (a); assumptions 1–4 accepted. Base: the signed `current.reference-cards.inpatient-parkinson-disease.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-07). The entry has `lastReviewed: "UNREVIEWED"`.

**Answer to the brief:**
- `pitfalls[1]` was out of date: Onapgo (continuous SC apomorphine) is FDA-approved (Feb 4, 2025, Supernus press release) for motor fluctuations in advanced PD. Apokyn still covers pen doses only. The reworded pitfall says so and notes that the Onapgo label doesn't address use as a bridge when the oral route fails.
- New section with one row per pump, label text only: keep it running, interruption cut-offs (Vyalev >1 h / >3 h; Onapgo ≥1 h; Duopa 2 h), backup oral therapy, taper rather than stop, and the inpatient safety items each label raises. No label addresses NPO status directly; Vyalev states it bypasses the gut (§12.3).
- LEDD calculator: Jost 2023 Table 1 (p. 1242) gives "Subcutaneous foslevodopa/foscarbidopa DD × 0.75" (consensus vote, Table 2 p. 1244: 63.0% strong, 33.3% weak); the Table 3 example (p. 1245) shows DD is the foslevodopa mg dose (1,296 mg → 972 mg). So 0.75 matches **if** the calculator applies it to foslevodopa mg. The export doesn't include the `ledd` code, so Claude Code confirms this read-only (C1). For context (not encoded): the label's own oral → pump factor (× 1.3) inverts to ~0.77, and its extra-dose table implies ~0.71 (molar).
- The uploaded labels are newer than the brief's dates (Onapgo PI 5/2026, Vyalev 3/2026, Duopa 3/2026). Vyalev and Duopa 3/2026 add the vitamin B6 / refractory-seizure warning (E1).

**Assumptions accepted:** (1) label-only rows are NOT_GRADED with "<Drug> PI §…" in `evidenceNote`, as in the existing Neupro and Apokyn rows; (2) one source string per product, with the pump IFU or operator's manual inside that product's label source; (3) one reference-cards MINOR bump, no schema bump, no app bump unless C1 finds a mismatch; (4) `verify[]` stays empty.

**Validation actually run** (not only read): the draft was parsed with zod 3 against `ReferenceCard`, using `schema/common.ts`, `schema/acute-neuro.ts` (EvidenceLevel) and `schema/reference-cards.ts` copied verbatim from the export packet: **PASS**, including the card-level rule that every row source appears in `sources[]`. A deliberately broken copy (a row source without a year, not in `sources[]`) failed both checks, which confirms the check is live. A script also confirmed:
- top-level, section and row key order unchanged;
- every `keyNumbers` line is an exact copy of a field (optionally prefixed by the row's `parameter` or `condition` + ": "); 5 lines, max 5;
- both `relatedIds` are in `valid-ids.txt`; no removed id is referenced;
- every base row other than Rotigotine dose and 5-HT3 antagonists is byte-identical to the base; base `sources[]` kept in order; base `verify[]` (empty) kept.

The draft was built by a script from the base JSON. The base was transcribed from the project copy of the export; Claude Code's step 1 checks `data/` still matches it. `npm run validate` and `npm test` in the repo have not been run; that is Claude Code's step.

Claude Code: encode the JSON word for word as the full replacement entry, validate, show the diff against the CHANGES file, run the read-only C1 check, then apply **one** registry bump. No code change, no schema change, no app bump. See `CLAUDE_CODE_PROMPT.md`.

## Files

| File | Findings | Change |
|---|---|---|
| `reference-cards.inpatient-parkinson-disease.json` (+ `…CHANGES.md`) | F1–F5, E1–E4, K1–K5, D8 | New `sections[1]` with Vyalev, Onapgo and Duopa rows; trimethobenzamide row in Antiemetics; Onapgo added to the 5-HT3 row; `pitfalls[1]` reworded; Rotigotine dose `notes[0]` split (wording); 5 keyNumbers made exact copies; title and 7 search terms; 3 sources added |

## keyNumbers
- `keyNumbers[0]`: changed (K1); exact copy of Rotigotine dose `parameter` + ": " + `target`.
- `keyNumbers[1]`: changed (K2); exact copy of Rotigotine dose `notes[0]` (new, split from the old `notes[0]`).
- `keyNumbers[2]`: changed (K3); exact copy of 5-HT3 antagonists `target`.
- `keyNumbers[3]`: changed (K4); exact copy of Controlled release `condition` + ": " + `target`.
- `keyNumbers[4]`: changed (K5); exact copy of Pimavanserin `parameter` + ": " + `target`.
- All five checked by script. Same five topics as before; no pump number added (already at the 5-line maximum).

## Version
| what | from | to | level | why |
|---|---|---|---|---|
| `data/reference-cards.json` | as found (not in the export; Claude Code records it) | next MINOR | MINOR | New rows and sources; clinical content added (pump handling, trimethobenzamide dose); pitfall meaning changed |

No `package.json` bump (no code or UI change) and no schema bump. Update `lastUpdated` on `data/reference-cards.json` to the encoding date. No other R2–R4 item touches `data/reference-cards.json`, so there's no merge-order dependency.

## Open verify[]
- None.
- Open non-verify item: C1 — Claude Code reports the `ledd` calculator's foslevodopa input and factor (read-only). If it is not foslevodopa mg × 0.75, stop and report; any fix is a separate item.

## Disposition Ledger

| # | Entry / field | Finding | Disposition |
|---|---|---|---|
| F1 | `pitfalls[1]` | Implied no US label for continuous SC apomorphine; Onapgo is approved | **FIX** (D4 a): reworded |
| F2 | `sections[1]` | No guidance for patients admitted on a pump | **FIX** (D1 a, D2 a): Vyalev, Onapgo, Duopa rows |
| F3 | 5-HT3 antagonists row | Cited Apokyn only; Onapgo carries the same contraindication | **FIX**: Onapgo §2.2, §4, §7.1 added |
| F4 | `title`, `searchTerms` | Pumps not findable | **FIX** (D7): title + 7 terms |
| F5 | `sources` | Three labels not cited | **FIX**: `sources[10]`–`[12]` |
| D3 | Vyalev `notes[3]`, Duopa `notes[2]` | Conversion numbers for an estimate when no backup list exists | **FIX** (D3 b): label forward facts only; "no label pump → oral conversion" stated |
| D8 | Vyalev `notes[5]` | Vyalev label has no pump imaging/MRI statement; VYAFUSER IFU not uploaded | **FIX** (D8 a): note to check the pump IFU |
| D8b | — | Sourced Vyalev MRI line from the VYAFUSER IFU | **PARK**: revive if Jason uploads the IFU |
| E1 | Vyalev `notes[4]`, Duopa `notes[4]` | B6-deficiency seizures refractory to ASMs (labels 3/2026) | **FIX** |
| E2 | Antiemetics `rows[2]` | No antiemetic option listed for patients on apomorphine | **FIX**: trimethobenzamide row |
| E3 | Duopa `notes[5]` | Polyneuropathy 5% (§5.10) | **FIX** |
| E4 | Onapgo `notes[4]`–`[6]` | Never IV; QTc; hemolytic anemia | **FIX** |
| K1–K5 | `keyNumbers[0]`–`[4]` | None was an exact copy of its field | **FIX** (D6 a); K2 needed a wording-only split of Rotigotine dose `notes[0]` |
| C1 | calc:ledd | Foslevodopa factor 0.75 vs Jost 2023 | **ACCEPT**: matches Jost Table 1 when applied to foslevodopa mg; Claude Code confirms the input unit read-only |
| C2 | calc:ledd | Jost also gives intrajejunal levodopa/carbidopa (LCIG) "DD × 1.11" and SC apomorphine × 10 (infusion example 64 mg/d → 640) | **PARK**: Claude Code reports whether the calculator covers them; outside R5 |
| A1 | — | Nonselective MAOI contraindication (Vyalev §4, Duopa §4) | **ACCEPT**: common knowledge; not encoded |
| A2 | — | D2 antagonists, isoniazid, iron, high-protein diet (pump labels §7) | **ACCEPT**: covered by existing antiemetic and feeds rows |
| A3 | — | Maximum doses, titration steps, Duopa starting-dose formula, storage and handling | **ACCEPT**: not rounds lookups |
| A4 | — | Papaverine listed as reducing levodopa effect (Vyalev §7.3, Duopa §7.3) | **PARK**: left out as recommended; can be revived (intra-arterial use) |
| A5 | — | Onapgo nitroglycerin (lie down), alcohol, renal first-extra-dose ≤1 mg, sulfite hypersensitivity | **ACCEPT**: low yield on rounds |
| A6 | — | NPO status not addressed by any label | **ACCEPT**: finding; rows state only what labels say (Vyalev §12.3) |
| A7 | — | Duopa §5.12: BUN and CPK elevations (CPK >3× ULN in 9%), false-positive pheochromocytoma screens | **PARK**: noticed during build, not offered in chat; possibly relevant to an NMS/PHS CK workup |
| A8 | — | Label currency | **ACCEPT**: uploads are newer than the brief's dates; no DailyMed check beyond the uploaded files |
| A9 | — | Jost 2023 read via web-fetch text extraction, not the PDF | **ACCEPT**: no Jost number is encoded; Table 3 arithmetic consistent. Upload the PDF to re-check directly |
| A10 | — | "trimethobenzamide" search term | **PARK**: not in the approved term list |

No PARK item needs action now.

## Sources used (attached to the planning chat)
- Vyalev (foscarbidopa and foslevodopa) injection PI, AbbVie, revised 3/2026, with Medication Guide (3/2026) and drug Instructions for Use (10/2024) (uploaded PDF, 35 pages). Read in full. Used: §2.3, §2.5, §3, §5.4, §5.5, §5.7, §12.3, §14, §17.
- Onapgo (apomorphine hydrochloride) injection PI, MDD US Operations/Supernus, revised 5/2026, with Patient Information (2/2025), Patient IFU (6/2026) and HCP IFU (uploaded PDF, 112 pages). PI and Patient Information read in full; the pump IFUs were searched (MRI, radiation, interruption, emergency disconnect, backup, occlusion) rather than read line by line. Used: §1, §2.2–2.6, §4, §5.1, §5.2, §5.6, §5.9, §5.12, §7.1, §7.5, §12.2, §14, §17; Patient IFU pump storage and symbol key.
- Duopa (carbidopa and levodopa) enteral suspension PI and Medication Guide, AbbVie, revised 3/2026, with CADD-Legacy 1400 Operator's Manual (Smiths Medical, revised 3/2019) (uploaded PDF, 108 pages). PI and Medication Guide read in full; the patient IFU and operator's manual were searched (MRI, radiation, ultrasound, ECG, disconnect). Used: §2.2, §2.5, §3, §5.1, §5.9, §5.10, §12.3, §17; Medication Guide; manual warnings.
- Jost ST, et al. Mov Disord 2023;38(7):1236-1252, doi:10.1002/mds.29410 (open-access copy, University of Padua repository, fetched 2026-11-09). Used: Table 1 (p. 1242), Table 2 (p. 1244), Table 3 (p. 1245). Already cited on the card; not re-cited for new lines.
- Web check only, not cited in the entry: Supernus press release, Feb 4, 2025 (Onapgo approval).
- Note for future items: `pdftotext -layout` handled all three labels; the Onapgo and Duopa PDFs are mostly pump IFU pages after the PI.
