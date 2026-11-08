# neuro-app — Review Task List for Claude Code

Repo: `jtschick7-cyber/neuro-app` · Prepared 2026-11-06 · Owner/clinician: Jason

This list combines a full read-only review of the repo (content, accuracy, rounding UX) with an
external set of recommendations that was evaluated and corrected. Work top to bottom. Each task has
an acceptance check. Tasks marked **[JASON]** need the clinician — stop and ask; do not guess.

---

## 0. Ground rules (read first)

1. Read `CLAUDE.md` and `docs/PWA_BUILD_BRIEF.md` before anything else. They win over this file if they conflict.
2. `data/*.json` is clinician-signed content. Content edits follow `docs/VERSIONING.md`:
   edit → `npm run validate` → `npm run review-sheets` → **[JASON] signoff** → `npm run release`.
   Claude Code never runs `signoff`, never sets `lastReviewed`, and never removes `verify[]` items.
3. Keep `main` deployable. `npm run build` fails on unsigned entries or open `verify[]` items, so every
   content change lives on a feature branch until Jason signs it off. One branch per numbered task group.
4. New registries or new fields: propose the **schema change and the entry list first**, wait for Jason's
   approval, then write entries. One registry at a time.
5. Every new entry needs named sources (author/org, year). Where a dose, threshold, or lab code isn't
   confirmed against a primary source, put the item in `verify[]` — never invent a number or citation.
6. `src/lib/calculators.ts` and its tests are clinical code. New calculators need Jason's sign-off on
   formula, caps, rounding, and sources before merge; add tests for every branch of the math.
7. Patient data is never persisted. Allowed localStorage keys are only those listed in `CLAUDE.md`
   (task 4.4 asks Jason to approve one more).
8. **Do not change** the context bar's `calc(1.75rem + env(safe-area-inset-top))` top padding. It's
   intentional — less than 1.75rem lets the iOS status bar obscure the top of the app.
9. Target device: iPhone 15 Pro, iOS home-screen PWA, used mostly on rounds (not during stroke codes).

---

## 1. Accuracy fixes (small content edits — do first)

**1.1 Andexanet → not US-marketed.** (settled 2026-11-08: done as review task 1.1; see REVIEW_TASKS_2026-11-08)
Andexanet alfa was withdrawn from the US market effective 2025-12-22 (FDA safety communication
2025-12-18). It currently appears as an `ALTERNATIVE` (AHA ICH 2022 COR 2a, "not stocked locally") in
`vascular-antithrombotics`: `apixaban`, `rivaroxaban`, `edoxaban` reversal blocks and
`anticoag-reversal-ich` rule 4 + ANNEXA-I pearl.
- Propose a schema change: add `NOT_US_MARKETED` to `FormularyStatus` (or a `usMarketed` flag on
  treatment items), rendered grey and sorted last — same convention as the caution-list banner.
- Content: mark andexanet NOT_US_MARKETED; note "Withdrawn from US market Dec 2025; AHA ICH 2022 COR 2a
  predates withdrawal." Keep the ANNEXA-I pearl. Add the FDA communication as a source.
- Accept: andexanet visible but grey/last on all 4 cards; no "consider transfer/pharmacy" wording.

**1.2 Stale text left in content.** Replace with real `relatedIds` links (or delete the parenthetical):
- `apixaban` "Timing after stroke: see AF anticoagulation timing (pending)"
- `heparin-ufh`, `enoxaparin` "see VTE prophylaxis entry (pending)" (×2)
- `aspirin` "see DAPT entry, pending"
- `ticagrelor` "see ICAD entry, pending"
- `af-stroke-anticoag-timing` population "see mechanical-valve entry, pending"
- `antithrombotic-after-reperfusion` pearl "see vte-prophylaxis entry (pending)"
- `consult-workups:sah-workup` disposition "see thunderclap-headache (batch D)"
- Accept: `grep -rn "pending)\|(batch" data/` returns nothing user-facing; add a validate rule that fails on `(pending)` / `(batch`.

**1.3 THALES threshold inconsistency.** `ticagrelor` use #1 and `dapt-minor-stroke-tia` rule 4 say
"symptomatic ≥50% stenosis"; `icad-symptomatic` and the Kleindorfer note say ">30%/≥30%".
**Resolved (Jason, 2026-11-06):** these are three different recommendations, not one threshold. Keep
them separate, each labeled by source; don't force one number across the three entries.
- THALES / AHA 2026 §4.8 Rec 13 (COR 2b, LOE B-R): ≥50% symptomatic intracranial/extracranial stenosis
  is a high-risk-TIA qualifier (alternative to ABCD2 ≥6), not a standalone route and not applied to
  stroke. Exact condition text, used verbatim in `ticagrelor` uses[0] and `dapt-minor-stroke-tia` rule 4:
  "Noncardioembolic minor stroke (NIHSS ≤5) or high-risk TIA (ABCD2 ≥6, or symptomatic ≥50%
  intracranial/extracranial stenosis that could account for the TIA), <24 h, no IVT (THALES)".
  Lead evidence note: "AHA 2026: COR 2b, LOE B-R".
- Kleindorfer 2021 §5.19 Rec 4 (≥30% for any event): kept on both entries as the evidence note
  "Kleindorfer 2021 §5.19: COR 2b, LOE B-R (SR) — used ≥30% stenosis for any event", plus one
  `dapt-minor-stroke-tia` pearl naming all three thresholds and pointing to `icad-symptomatic` rule 3.
- Kleindorfer 2021 §5.1.1 Rec 3 (ipsilateral >30% intracranial, COR 2b, LOE B-NR): `icad-symptomatic`
  rule 3 condition clarified (applies below the entry's 50–99% range; not the THALES ≥50% criterion),
  population line and pearl added; recommendation, COR and LOE unchanged. `ticagrelor` uses[3] unchanged.
- THALES added to `sources[]` of `ticagrelor` and `dapt-minor-stroke-tia`; `relatedIds`
  `dapt-minor-stroke-tia` → `vascular-antithrombotics:icad-symptomatic`.
- Drafts: `drafts/vascular-antithrombotics.{ticagrelor,dapt-minor-stroke-tia,icad-symptomatic}.json`
  + `.CHANGES.md` (exact before/after text). The `ticagrelor` draft also carries the 1.5 edit. Apply
  tasks 1.2 (`ticagrelor` uses[3] "pending") and 1.4 (`ticagrelor` uses[1] wording) to the drafts.
- Sources: Johnston 2020 (THALES, Methods → Patients); Prabhakaran 2026 §4.8 Rec 13; Kleindorfer 2021
  §5.19 Rec 4 and §5.1.1 Rec 3 — see `SOURCES.md`.
- Schema: none. Version: `vascular-antithrombotics` registry MINOR (one bump shared with 1.5).
  Edited entries `lastReviewed: "UNREVIEWED"`.
- Status: content drafted — ready for Claude Code.

**1.4 CHANCE-2 wording.** `ticagrelor` CHANCE-2 note says "Preferred over clopidogrel + aspirin in
carriers" but the cited recommendation is COR 2b. Reword to "may be reasonable instead of".

**1.5 IVT with prior LMWH / antiplatelets.** `thrombolysis-with-prior-antithrombotics` rule 4 says
"Not addressed in AHA 2026"; agent cards repeat this. Secondary summaries of the 2026 guideline list
therapeutic LMWH within 24 h as a contraindication and describe IVT as recommended despite prior DAPT.
**Resolved (Jason, 2026-11-06)** from Prabhakaran 2026 §4.6.1 and every Table 8 row, checked directly:
- Rule 4 → prior SAPT or DAPT: IVT recommended in otherwise-eligible patients (AHA 2026 §4.6.1 Rec 9:
  COR 1, LOE B-NR → STRONG); sICH +0.9% SAPT / +1.2% DAPT absolute vs ~8% absolute benefit. One rule,
  because the guideline makes one recommendation for both. The old "not addressed" text was wrong.
- New rule 5 → full treatment dose of LMWH within 24 h: no IVT; does not apply to prophylactic doses
  (Powers 2019 §3.5.5 Rec 7: COR III: Harm, LOE B-NR → STRONG per the repo's COR 3 convention).
  evidenceNote includes "Not restated in AHA 2026 §4.6 or Table 8" — LMWH is absent from AHA 2026.
  Old rule 5 ("After IVT") → order 6, text unchanged.
- `thrombolysisRule`: aspirin, clopidogrel, ticagrelor, cilostazol, aspirin-dipyridamole get the Rec 9
  line ("(class-level statement; agent not named)" on ticagrelor, cilostazol, aspirin-dipyridamole);
  aspirin also gets AHA 2026 §4.8 Recs 16 and 17 (both COR 3: Harm, B-R); enoxaparin gets the
  Powers 2019 full-dose LMWH line. See-also lines kept. Exact text in each `.CHANGES.md`.
- `institutionVaries` on the rule entry: "Local policy on LMWH exposure (AHA 2026 silent; Powers 2019
  rule applies to full doses only)".
- Drafts: `drafts/vascular-antithrombotics.{thrombolysis-with-prior-antithrombotics,aspirin,clopidogrel,
  ticagrelor,cilostazol,aspirin-dipyridamole,enoxaparin}.json` + `.CHANGES.md` (built from
  `data/vascular-antithrombotics.json` v0.7.1).
- Sources: Prabhakaran 2026 §4.6.1 Rec 9 + supportive text, Table 8, §4.8 Recs 16–17; Powers 2019
  §3.5.5 Rec 7 (added to `sources[]` of the rule entry and `enoxaparin`; AHA 2026 newly added to
  `cilostazol`) — see `SOURCES.md`.
- Schema: none. Version: shared `vascular-antithrombotics` MINOR with 1.3 (apply once).
  Edited entries `lastReviewed: "UNREVIEWED"`. Not in scope: `heparin-ufh` `thrombolysisRule`.
- Status: content drafted — ready for Claude Code.

---

## 2. Support Jason's re-review (batch sign-off)

All 158 entries were signed off in one batch on 2026-11-05. Do **not** reset `lastReviewed`
(that would block deploys). Instead:

**2.1** Create `docs/REREVIEW.md`: a checklist of every entry, ordered by risk —
(1) all 16 calculators, (2) every `doseText`/structured dose in `acute-neuro`, (3) reversal and
thrombolysis rules in `vascular-antithrombotics`, (4) all other decision rules, (5) caution lists,
(6) `neural-antibodies`. One checkbox per entry; Jason ticks them.
**2.2** Extend `npm run review-sheets` to accept `--order risk` and emit sheets in that order.
- Accept: Jason can work through the queue registry by registry; signoff updates still use `npm run signoff`.

---

## 3. Search (highest-impact UX fix)

Current behavior: `src/lib/searchIndex.ts` indexes only titles + `searchTerms`/aliases, and
`search()` requires every token to match the same doc. Verified misses today: "andexanet",
"hemicraniectomy", "nimodipine", "HIT", "EVT", "basilar", "vanc", "phenytoin level", "apixaban ICH";
"bell" matches cerebellar antibody cards via substring.

**3.1** Index body text (doseText, notes, rules, pearls, workup tests, antibody syndromes) at a lower
weight than title/terms (e.g., title 3, terms 2, body 1).
**3.2** If no doc matches all tokens, fall back to best partial matches (rank by tokens matched, then score).
**3.3** Add a small synonym map (`src/lib/searchSynonyms.ts`): EVT/MT/thrombectomy, vanc/vancomycin,
HIT/heparin-induced thrombocytopenia, tPA/alteplase, TNK, Keppra, Dilantin/phenytoin, Depakote/valproate,
Vimpat/lacosamide, Kcentra/PCC, LP/lumbar puncture, SAH, ICH, CVT, GBS, MG, PRES, NMS, AIP, CAA-ri…
**3.4** Require word-start matches for tokens <5 characters (stops "bell" → cerebellar).
**3.5** Show which section matched in each result ("Reversal · Apixaban").
- Accept: add `__tests__/search.test.ts` cases for every query above plus the brief's
  "mag", "TNK", "ICH", "Botox", "Keppra", "status". Search index stays lazy-loaded.

---

## 4. Entry layout & navigation (glanceability)

**4.1 Global search entry point.** Add a search button to the bottom nav (or header) on every screen,
opening the same global search as Home. Accept: from any entry, ≤2 taps to results.

**4.2 Key-numbers block.** Propose an optional `keyNumbers: Text[]` field (max ~5 lines) on acute,
consult, and antithrombotic entries, rendered as a high-contrast card directly under the title.
Draft values **only by copying existing signed-off numbers** (doses, thresholds, targets) — no new
numbers. Drafts go to Jason for sign-off.

**4.3 Collapse by default.** In `ProtocolViews`/`ProtocolParts`: open by default = key numbers,
immediate actions, treatment; collapsed = presentation/definitions, workup, pitfalls, institution
varies, sources. Move every `evidenceNote` line behind a per-item "Evidence" disclosure (keep the badge
visible). Add a sticky row of jump chips to sections at the top of long entries.

**4.4 Pinned favorites.** **[JASON]** approve adding one localStorage key (e.g., `neurohosp.pins.v1`,
entry ids only — no patient data) and update `CLAUDE.md` guardrails accordingly. Then add pin/unpin
on entries and a "Pinned" list at the top of Home.

**4.5 Antithrombotic agent card order.** Reversal → Thrombolysis rule → Hold before procedure →
Uses and doses (collapsed) → renal/hepatic → monitoring → interactions → pregnancy → pearls.

**4.6 Dedupe repeated boilerplate on screen.** The platelet-transfusion/desmopressin reversal block
(aspirin, clopidogrel, aspirin-dipyridamole), "4F-PCC 50 U/kg" (4 DOAC cards), and the neuraxial
boxed-warning pearl are repeated. Render shared blocks once with a link to the canonical entry
(`antiplatelet-ich`, `four-factor-pcc`, `periprocedural-holds-lp-evd`). Data can stay as-is if the UI dedupes.

**4.7 Specimen badge on antibody cards.** `neural-antibodies.testing.preferredSpecimen` already exists —
render it as a large SERUM / CSF / PAIRED badge at the top of each card, with "Draw before IVIG/PLEX"
when applicable. (UI only.)

---

## 5. UX polish (iPhone 15 Pro, rounds)

5.1 Context bar: collapse to a one-line chip showing entered values (tap to expand); auto-expand on
calculator screens. **Keep the 1.75rem top padding** (rule 0.8).
5.2 Drugs tab: open on Antithrombotics instead of MG cautions (code default; no storage).
5.3 Contrast: raise `text-xs text-slate-500` (≈3.8:1 on slate-900) to ≥4.5:1 (e.g., slate-400) for
evidence notes, counts, and footers; check `text-slate-600` footer too.
5.4 Bottom-nav labels: 10 px → 11–12 px; confirm 6 items still fit at 393 pt width.
- Accept: screenshot check on iPhone 15 Pro (or 393×852 viewport) for Home, an acute entry, an
  antithrombotic card, a calculator.

---

## 6. Cuts (Jason approved)

6.1 Remove consult entries: `inpatient-stroke-etiology-workup`, `tia-workup`, `syncope-vs-seizure`,
`functional-neurologic-symptoms`, `secondary-headache-red-flags`, `delirium-vs-encephalopathy`,
`tga-vs-tia`, `altered-mental-status`. Fix any `relatedIds` that pointed to them (validate must pass).
6.2 Remove the `recsTemplate` field from the consult-workups schema and data (schema version bump).
6.3 Remove calculator UIs/manifest ids: `cha2ds2-vasc`, `has-bled`, and the fixed-dose `lacosamide-load`
card (keep the lacosamide dose text in entries). Leave functions in `calculators.ts` unless Jason says delete.
6.4 Remove the eptifibatide and tirofiban "label ACS regimen (reference only)" uses from `gp-iib-iiia-inhibitors`.
- Accept: `npm run validate`, `npm test`, `npm run build` (after signoff) all pass; search tests updated.

---

## 7. New content (propose schema + entry list first; one registry at a time)

Priority order below. Every accepted item from the external recommendations has been corrected —
use the corrected version, assign primary sources, and put anything unconfirmed in `verify[]`.

**7.1 ASM practical dosing card + phenytoin calculator.**
- Card: maintenance dosing for levetiracetam, lacosamide, valproate, fosphenytoin/phenytoin,
  phenobarbital, brivaracetam, lamotrigine (titration only), with CrCl, intermittent HD, and CRRT
  adjustments; IV↔PO conversion; NG/crush notes; levels (free vs total; valproate free level;
  carbapenem interaction link).
- Calculator: phenytoin albumin correction (Sheiner-Tozer; the external spec calls it "Winter-Tozer")
  incl. the renal-failure variant, plus reload estimate (target − measured) × Vd × weight.
  Formula, Vd, caps and rounding approved by Jason 2026-11-06 (below); rule 0.6 still applies to the
  encoded calculator and its tests.

**Resolved (Jason, 2026-11-06):**
- Home: new registry `antiseizure-medications` (`schema/antiseizure-medications.ts`), one card per drug:
  `levetiracetam`, `lacosamide`, `brivaracetam`, `valproate`, `phenytoin-fosphenytoin`, `lamotrigine`
  (epilepsy titration only). Structured CrCl rows for context-bar highlighting; at shared band endpoints
  highlight both rows. `RenalRow.crclBasis` (`CG_ML_MIN` | `BSA_NORMALIZED_ML_MIN_1_73M2`): Keppra bands
  are BSA-normalized, so don't highlight them straight from `calc:cockcroft-gault` (normalize by BSA, or
  don't highlight).
- Not covered (in registry `scopeNotes`): phenobarbital (no source supplied) and CRRT (no institutional
  or published source — ask pharmacy).
- Levels only where a label states them (phenytoin, valproate; lamotrigine "no established range").
  Where a label is silent on tube administration, `enteral[]` reads "Tube administration not addressed
  in label — confirm with pharmacy". All label content NOT_GRADED. `formularyStatus` AVAILABLE except
  brivaracetam INSTITUTION_VARIES. weightBasis ACTUAL for valproate mg/kg/day and fosphenytoin mg PE/kg/day.
  Lacosamide severe renal/hepatic: "reduce the maximum dosage by 25%" + "(300 mg/day if the maximum is
  400 mg/day)". Links: `asm-interactions:carbapenems-valproate`, `tmp-smx-phenytoin`,
  `inducing-asm-apixaban-rivaroxaban`, `inducing-asm-warfarin`.
- Calculator `phenytoin-correction` (spec in CALCULATOR_META style with worked test cases:
  `drafts/calc-phenytoin-correction.md`):
  - Sheiner-Tozer coefficient 0.2; 0.1 only via an "On dialysis" toggle (Mauro 1989), no CrCl cutoff;
    0.25 (Anderson) and 0.29 (Kane) not offered. Albumin ≥4.4 g/dL → report the measured level uncorrected.
  - A measured free level, if entered, is the primary result, with a discordance warning vs estimated
    free (corrected × 0.1). Free level within or above 1–2 mcg/mL → no reload.
  - Reload = (target − corrected) × 0.7 L/kg × actual weight; default target 15, adjustable 10–20.
    Output in fosphenytoin mg PE (1 mg PE = 1 mg phenytoin sodium, Cerebyx §2.1); no salt factor.
  - Caps: 10 mg PE/kg (rounded down to a 50 mg PE multiple) and 1500 mg PE absolute; rate ≤150 mg PE/min.
    Round to the nearest 50 mg PE, cap after rounding. No IV phenytoin rate (no injection label).
  - Warnings: always-on "estimate only"; on input — dialysis, valproate, <2 h IV / <4 h IM after
    fosphenytoin, no albumin, free-level discordance, corrected >20, dose capped.
- Drafts: `drafts/schema.antiseizure-medications.ts`, `drafts/antiseizure-medications.registry-envelope.json`,
  `drafts/antiseizure-medications.{levetiracetam,lacosamide,brivaracetam,valproate,phenytoin-fosphenytoin,lamotrigine}.json`,
  `drafts/calc-phenytoin-correction.md`.
- Sources: US labels — Keppra inj (UCB 6/2025), Vimpat (UCB 5/2026), Briviact (UCB 4/2026), valproate
  sodium inj (Hikma 12/2023), Depakote (AbbVie 3/2026), Cerebyx (Pfizer 5/2025), Dilantin (Viatris 8/2023),
  phenytoin oral suspension (Sun 8/2025), Lamictal (GSK 10/2025); Kiang & Ensom 2016 (Sheiner-Tozer review)
  — see `SOURCES.md`.
- Schema/version: new `schema/antiseizure-medications.ts` 1.0.0 (includes `crclBasis`); registry 1.0.0;
  app MINOR (new registry + calculator UI). All entries `lastReviewed: "UNREVIEWED"`.
- Status: content drafted — ready for Claude Code.

**7.2 Neuro-ICU targets card** (rounds lookup, not a protocol): sodium goals by condition, glucose,
temperature, CPP, Hb thresholds (TRAIN; SAHaRA for aSAH), and aSAH numbers — nimodipine dose and
split-dose for hypotension, duration, DCI surveillance, salt wasting vs SIADH and fludrocortisone,
seizure prophylaxis stance. Source: AHA aSAH 2023, NCS edema 2020, primary trials.

**Resolved (Jason, 2026-11-06):**
- Home: new registry `reference-cards` (`schema/reference-cards.ts`), two cards: `neuro-icu-targets` and
  `asah-numbers`. Every row carries its own `sources[]`; a card-level refine requires each row source to
  appear in the card's `sources[]`. `TargetRow.role` = TARGET / RECOMMENDED / NOT_RECOMMENDED /
  EVIDENCE_SUMMARY (EVIDENCE_SUMMARY forced to NOT_GRADED, so trial findings can't read as targets).
  `keyNumbers` (≤5) drafted on both cards in the task 4.2 shape.
- Content: sodium by condition per Cook 2020 (replaces the old "145–155 (max ~160)"); CPP from BTF 4th ed.
  ch. 17 (TBI only; scope note on the row); Hb rows stated as what TRAIN and SAHARA each found
  (EVIDENCE_SUMMARY, NOT_GRADED); aSAH numbers from Hoh 2023 §6, §8, §8.1–8.3, §8.5 and the nimodipine
  label. Elevating SBP in symptomatic vasospasm uses the §8.3 table (COR 2b, LOE B-NR); Figure 3 shows 2a —
  discrepancy noted on the row. BTF Level II B / III → WEAK; COR 3 rows → NOT_RECOMMENDED, STRONG.
- Left off (Jason's decision; listed in `DECISION_LOG.md`): glucose and temperature targets; nimodipine
  split dose for hypotension (no source — Hoh's "continue through manageable hypotension" kept);
  fludrocortisone dose; salt wasting vs SIADH criteria; HEMOTION; CPP for aSAH/ICH/AIS; ICP threshold.
- Same-source correction to `acute-neuro:elevated-icp-herniation` (CHANGES parts A and B, both approved):
  sodium targets per Cook; HTS/mannitol STRONG → WEAK; osmolar-gap and 320 mOsm/kg cutoffs removed;
  Cook title/DOI corrected. Its proposed `keyNumbers` stay in the CHANGES file until task 4.2 adds the field.
- Drafts: `drafts/schema.reference-cards.ts` (now 1.1.0 — see 7.5), `drafts/reference-cards.registry-envelope.json`,
  `drafts/reference-cards.{neuro-icu-targets,asah-numbers}.json`,
  `drafts/acute-neuro.elevated-icp-herniation.json` + `.CHANGES.md`.
- Sources: Hoh 2023 (AHA aSAH, incl. §8/§8.3 table screenshots); Cook 2020 (NCS cerebral edema); Brain
  Trauma Foundation 4th ed. 2016 ch. 17; Taccone 2024 (TRAIN); English 2025 (SAHARA); nimodipine label
  (Bionpharma 12/2025) — see `SOURCES.md`.
- Schema/version: new `reference-cards` schema (1.0.0, shipped as 1.1.0 with 7.5); `reference-cards`
  registry new (final version under 7.7); `acute-neuro` registry MINOR (one bump shared with 7.3/7.7/7.9);
  app MINOR (card view). All drafts `lastReviewed: "UNREVIEWED"`.
- Status: content drafted — ready for Claude Code.

**7.3 Inpatient mimics & send-out traps** (fits `consult-workups` schema). Corrected from the external spec:
- **Acute intermittent porphyria** (GBS + abdominal pain + hyponatremia mimic): spot urine PBG with
  creatinine, protect from light, refrigerate/freeze; avoid porphyrinogenic drugs; hemin via hematology.
- **Valproate hyperammonemic encephalopathy**: occurs with normal LFTs and therapeutic levels;
  ammonia on ice; carnitine; L-carnitine dosing — resolved below.
- **Copper deficiency (incl. zinc excess — denture cream, bariatric)** and **nitrous oxide myelopathy**
  (B12 can be normal; send MMA + homocysteine). Fold sIL-2R into existing myelopathy workup but do
  **not** call it "far superior" to ACE; fix the garbled "Schistosoma/Brucella/B12/E" line.
- **CAA-related inflammation**: Auriel 2016 probable/possible criteria (sens 82%, spec 97%); APOE ε4/ε4
  enrichment (Kinnecom 2007); empiric high-dose steroids then taper as expert practice (label
  EXPERT_OPINION); biopsy if no response. Drop "protein >100 mg/dL in >70%" unless sourced, and drop
  "blue-top" (implies citrate) — say "polypropylene tube".
- **Susac syndrome**: triad often incomplete at onset; callosal "snowball" lesions; fluorescein
  angiography even without visual symptoms; audiogram.
- **Intravascular large B-cell lymphoma**: LDH/sIL-2R; random deep skin biopsies before brain biopsy.
- **Autoimmune nodopathy** (NF155, CNTN1, CASPR1, pan-NF): IVIG-refractory IgG4 disease, early rituximab
  (EAN/PNS CIDP 2021). Note pan-NF can be IgG3 and behave differently.
- **Ganglioside phenotype map** (GM1/GD1a AMAN, IgM GM1 MMN, GQ1b MFS/Bickerstaff, GT1a PCB, disialosyl
  CANOMAD, MAG DADS + SPEP/IFE) as a compact table inside the GBS/neuropathy entries.
- **IMNM (HMGCR/SRP)**: CK pattern, statin exposure; fix the transaminase pearl — AST typically exceeds ALT
  early in muscle injury, and a normal GGT *supports* (does not "prove") a muscle source.
- Skip IBM/cN-1A as an inpatient card (outpatient diagnosis); at most a one-line pearl.

**Resolved (Jason, 2026-11-06):**
- New `consult-workups` entries: `acute-hepatic-porphyria` (NEUROMUSCULAR),
  `valproate-hyperammonemic-encephalopathy` (COGNITION_ENCEPHALOPATHY), `caa-related-inflammation`
  (VASCULAR), `susac-syndrome` and `intravascular-lymphoma` (INFLAMMATORY_DEMYELINATING).
  Edited (full replacement + CHANGES): `consult-workups:{myelopathy-workup,inpatient-neuropathy,
  elevated-ck-myopathy,cns-vasculitis-workup}`, `acute-neuro:guillain-barre-syndrome`.
- L-carnitine: only Perrott 2010's acute-overdose regimen (100 mg/kg IV, then 50 mg/kg, max 3 g/dose,
  q8h; for >100 mg/kg ingestion with decreased LOC), EXPERT_OPINION, labeled as not applicable to VHE on
  therapeutic dosing (the review excluded chronic-therapy toxicity).
- Where the drafts differ from the spec bullets above (reasons in `DECISION_LOG.md`):
  - AIP urine handling (light/refrigerate/freeze) and hemin ordering pathway → generic `institutionVaries`
    lines (not in AGA 2023; local process).
  - VHE: "at therapeutic levels" dropped (not in label); "ammonia on ice" → generic `institutionVaries` line.
  - CAA-ri: "protein >100 in >70%" replaced by Regenhardt 2020 (CSF protein >45 in 92%); tube wording
    dropped entirely (no CAA-ri source names a tube; CSF anti-Aβ is research-only per Auriel).
  - Myelopathy: sIL-2R and ACE folded in as "no proven diagnostic value / insufficiently sensitive and
    specific" (Stern 2018). The "Schistosoma/Brucella/B12/E" line isn't in the repo (v0.7.1) — no action.
  - Nodopathy merged into `inpatient-neuropathy` (no standalone entry); "IgG4" omitted (guideline text
    never states it); "early" rituximab → "may be effective" (anecdotal); pan-neurofascin IgG3 kept.
  - Ganglioside map as text lines (`inpatient-neuropathy` pearls + GBS definitions; Willison & Yuki 2002
    Table 1) — no table component, no schema change. GBS: anti-GQ1b in MFS ">90%" → "up to 90%".
  - IMNM pearl: Nathwani 2005 (AST/ALT >3 acutely → ~1 within days; ~1.2 in polymyositis) and ACG 2017
    (GGT confirms a hepatic ALP, doesn't localize AST/ALT; raised by phenytoin/barbiturates). The
    "normal GGT supports a muscle source" sentence is not used — ACG doesn't support it for aminotransferases.
  - IVLBCL: sIL-2R kept with Shimada's scope (Japanese cohort, higher in the Asian variant); skin-before-brain
    biopsy → EXPERT_OPINION (order not tested in Rozenbaum 2021).
  - IBM: existing pearl kept; no cN-1A line.
- Evidence: AGA best-practice advice → EXPERT_OPINION; EAN/PNS Good Practice Points and EuSaC criteria →
  CONSENSUS; labels → NOT_GRADED. New entries carry `recsTemplate: []` (required until task 6.2).
- Drafts: `drafts/consult-workups.{acute-hepatic-porphyria,valproate-hyperammonemic-encephalopathy,
  caa-related-inflammation,susac-syndrome,intravascular-lymphoma}.json`;
  `drafts/consult-workups.{myelopathy-workup,inpatient-neuropathy,elevated-ck-myopathy,cns-vasculitis-workup}.json`
  + `.CHANGES.md`; `drafts/acute-neuro.guillain-barre-syndrome.json` + `.CHANGES.md`.
- Sources: Wang 2023 (AGA AHP); Leonhard 2019; Van den Bergh 2021 (EAN/PNS CIDP); valproate sodium label;
  Perrott 2010; Auriel 2016; Regenhardt 2020; Kinnecom 2007; Kleffner 2016 (EuSaC); Rozenbaum 2021;
  Shimada 2009; Kumar 2006; Ménétrier 2023; Stern 2018; Willison & Yuki 2002; Nathwani 2005; Kwo 2017
  (ACG) — see `SOURCES.md`.
- Schema: none. Version: `consult-workups` registry MINOR; `acute-neuro` registry MINOR (shared).
  All drafts `lastReviewed: "UNREVIEWED"`.
- Status: content drafted — ready for Claude Code.

**7.4 Merge collection rules into existing entries (small edits):** (settled 2026-11-08: dropped; see REVIEW_TASKS_2026-11-08)
- `rapidly-progressive-dementia`: CSF for RT-QuIC in polypropylene tube, non-bloody (tube 3–4), blood
  contamination can cause rejection/false 14-3-3; NPDPSC as performing lab. Verify any t-tau or
  t-tau/p-tau ratio cutoff before adding.
- `wernicke-encephalopathy`: add whole-blood thiamine sample handling (EDTA, protect from light) and the
  higher-dose regimen (e.g., 500 mg IV TID) as an ALTERNATIVE with its own source; keep EFNS.
- `autoimmune-encephalitis` / `ma2`: Mayo ENS2 does **not** include Ma1/Ma2 — order separately;
  scrotal ultrasound in men with unexplained subacute encephalitis.
- `acute-neuro:serotonin-syndrome`: add linezolid, methylene blue, fentanyl, tramadol, meperidine,
  dextromethorphan to triggers.

**7.5 Thrombophilia test-validity matrix** (new table component; home resolved below). Rows: FVL/PT20210A
PCR, aCL/β2GPI, lupus anticoagulant, AT, protein C/S,
JAK2/CALR/MPL, PNH flow, Lp(a), homocysteine. Columns: acute thrombosis, UFH/LMWH, VKA, DOAC.
Source each cell (ISTH-SSC LA guidance — already cited as Devreese — plus a lab-hematology review).
Keep the existing caveat that inherited thrombophilia testing rarely changes arterial-stroke management.

**Resolved (Jason, 2026-11-06):**
- Home: new card `reference-cards:thrombophilia-test-validity` (not a `young-stroke-workup` section, not a
  new registry). `young-stroke-workup` gets a `relatedIds` link only.
- Schema `reference-cards` 1.0.0 → 1.1.0 (MINOR, additive): `MatrixSection` (`kind: "MATRIX"`, columns,
  rows of cells + cited notes) via `AnySection = z.union([CardSection, MatrixSection])`; the card-level
  source refine extends to cells and notes. `CellStatus` = VALID / CAUTION / UNRELIABLE / ASSAY_DEPENDENT /
  NOT_ADDRESSED; `CellDirection` = FALSE_LOW / FALSE_HIGH / EITHER (null for VALID and NOT_ADDRESSED).
- Columns `acute-thrombosis`, `ufh-lmwh`, `vka`, `doac`; the 9 rows above, protein C/S as one row, APCR as
  a note on the FVL/PT20210A row.
- NOT_ADDRESSED is a finding, not a VERIFY item: 12 cells (JAK2 ×4, PNH ×4, Lp(a) UFH-LMWH/VKA/DOAC,
  homocysteine/DOAC) render "Not addressed by sources", no source, NOT_GRADED, not in `verify[]`.
- Conflicts: AT on warfarin = VALID (Favaloro 2019; ASCP item 18's "ATIII elevated on warfarin" not used);
  homocysteine acute = "may underestimate … recheck at ≥3 months if it changes management" citing both
  sides; Lp(a) acute = "possible acute-phase rise (uncertain)".
- Evidence: ICSH / ISTH-SSC / Anticoagulation Forum → CONSENSUS; ASCP Choosing Wisely → EXPERT_OPINION;
  BSH GRADE 1B → STRONG, 2C → WEAK; others NOT_GRADED; a cell takes the highest level among its sources.
- `scopeNote` keeps the Kleindorfer caveat and Middeldorp's acquired-deficiency point; `keyNumbers`: 4
  sourced timing lines.
- Drafts: `drafts/schema.reference-cards.ts` (1.1.0), `drafts/reference-cards.thrombophilia-test-validity.json`,
  `drafts/reference-cards.registry-envelope.json`, `drafts/consult-workups.young-stroke-workup.json` +
  `.CHANGES.md` (validated against a local stub of `DecisionRule` — validate against the real schema).
- Sources: Gosselin 2018 (ICSH DOAC); Devreese 2020 and 2014 (ISTH-SSC); Stevens 2016; Favaloro 2019;
  ASCP Choosing Wisely; Middeldorp 2023 (ASH); Kleindorfer 2021; Cross 2021 (BSH); Xia 2016; Preis 2014;
  Devalet 2015; Tsimikas 2017 and 2018; Koutsogianni 2023; Nygård 1999; Meiklejohn 2001; Haapaniemi 2007;
  Shi 2018; Haviv 2002; Muruá 2001 — see `SOURCES.md`.
- Version: `reference-cards` schema 1.1.0; registry MINOR (new entry); `consult-workups` relatedIds edit =
  PATCH, absorbed into the 7.3 MINOR; app MINOR for the matrix component (combined with 7.2's).
  All drafts `lastReviewed: "UNREVIEWED"`.
- Status: content drafted — ready for Claude Code.

**7.6 Serotonin toxicity vs NMS side-by-side view** (settled 2026-11-08: dropped; see REVIEW_TASKS_2026-11-08) (UI over the two existing acute entries — no
duplicate content): onset, neuromuscular signature, GI/pupils, criteria, treatment. Link from both entries.

**7.7 Inpatient Parkinson disease card** (links to the existing LEDD calculator). Corrected from the external spec:
- Enteral route first: crushed IR carbidopa-levodopa via tube (never crush CR/ER); timing vs feeds.
- Rotigotine for true NPO: the LEDD→patch conversion **must be sourced** (e.g., published perioperative
  PD guidance); the spec's "LEDD/50–60 for elderly, cap 8–16 mg" has no source — omit unless found.
  Patch strengths, don't cut, remove before MRI/cardioversion. Source found — resolved below.
- Antiemetics: ondansetron acceptable **except with apomorphine (contraindicated — severe hypotension)**;
  avoid metoclopramide, prochlorperazine, promethazine, droperidol.
- Psychosis/agitation: quetiapine low dose; pimavanserin is not an acute agent; clozapine needs ANC
  monitoring and isn't a practical inpatient start; benzodiazepines can worsen delirium — use sparingly;
  avoid haloperidol, risperidone, olanzapine.

**Resolved (Jason, 2026-11-07):**
- Home: new card `reference-cards:inpatient-parkinson-disease` on the existing 1.1.0 row-list sections;
  no schema change. Links `calc:ledd`.
- Rotigotine conversion: Brennan & Genever (BMJ 2010) flowchart with BMJ's own factors — levodopa (×0.7 CR;
  ×1.3 with COMT inhibitor) + agonist × LEF = LEDD; × 0.55; adjusted LEDD ≤350 mg → rotigotine = adjusted
  LEDD ÷ 20, nearest 2 mg, up to 16 mg, once daily. The card links `calc:ledd` with an explicit "don't feed
  its result into these steps" note (Jost 2023 factors differ). Results >8 mg/24 h are flagged as above
  the US label maximum (Neupro 6 mg/24 h early, 8 mg/24 h advanced PD) — shown, not clamped. The >350 mg
  continuous-apomorphine branch is a pitfall line only. The unsourced "LEDD/50–60, cap 8–16" is not used.
- Enteral: keep the home regimen; crushed IR via NG from Hwang & Norris 2021 (EXPERT_OPINION) with "IR
  label silent — confirm with pharmacy"; never crush CR (Sinemet CR label). Feed-hold interval not given (no source).
- Antiemetics: ondansetron acceptable except with apomorphine — all 5-HT3 antagonists contraindicated
  (Apokyn §4); avoid metoclopramide, prochlorperazine, promethazine; droperidol included under Hwang's
  class statement, labeled "class-level statement; agent not named".
- Psychosis/agitation: MDS 2019 EBM mapped as clozapine/pimavanserin → STRONG, quetiapine → WEAK (no dose
  given in sources), olanzapine → NOT_RECOMMENDED, WEAK (deliberate exception to COR 3 → STRONG);
  pimavanserin not an acute agent; clozapine ANC monitoring; benzodiazepines sparingly (NMS exception);
  avoid haloperidol/typical antipsychotics. Risperidone "avoid" dropped — no provided source names it.
- Added and kept: trigger search + Hwang Table 3 withdrawal order; other deliriogenic drugs row
  (anticholinergics, opioids, amantadine); DBS electrocautery pitfall.
- Edit: `acute-neuro:nms-parkinsonism-hyperpyrexia` "convert via LEDD" note now points to the card; BMJ 2010
  added to sources; `relatedIds` → the card.
- Drafts: `drafts/reference-cards.inpatient-parkinson-disease.json`,
  `drafts/acute-neuro.nms-parkinsonism-hyperpyrexia.json` + `.CHANGES.md`,
  `drafts/reference-cards.registry-envelope.json` (updated at final assembly to include this card).
- Sources: Brennan & Genever 2010 (BMJ); Hwang & Norris 2021; Seppi 2019 (MDS EBM); Jost 2023; labels —
  Sinemet (Organon 7/2026), Sinemet CR (Merck 4/2018), Neupro (UCB 9/2026), Apokyn (MDD 6/2022),
  Nuplazid (Acadia 4/2026), clozapine (Accord 10/2025) — see `SOURCES.md`.
- Version: `reference-cards` registry MINOR (new entry) → final registry 1.2.0 (schema 1.1.0);
  `acute-neuro` registry MINOR (shared). All drafts `lastReviewed: "UNREVIEWED"`.
- Status: content drafted — ready for Claude Code.

**7.8 Expand short lists.** (settled 2026-11-08: moved to task 3.7; see REVIEW_TASKS_2026-11-08) `seizure-threshold`: isoniazid (pyridoxine), metronidazole, ifosfamide,
calcineurin inhibitors, baclofen withdrawal (± others Jason picks). `asm-interactions`: inducers with
tacrolimus/cyclosporine, antiretrovirals, oral chemo; valproate–lamotrigine; others Jason picks.

**7.9 Inpatient headache entry**: status migrainosus regimens (DHE protocol, dopamine antagonists with
akathisia prophylaxis, IV valproate, magnesium, nerve blocks; avoid opioids), post-LP headache and blood patch.

**Resolved (Jason, 2026-11-07):**
- Home: two `acute-neuro` entries, `status-migrainosus` and `post-dural-puncture-headache`, cross-linked.
- Schema `acute-neuro` 1.0.0 → 1.1.0 (MINOR, additive enum values): `AcuteNeuroCategory` + `"HEADACHE"`;
  `Route` + `"EPIDURAL"`, `"PERINEURAL"`. Every 1.0.0 entry still validates. App MINOR only if the UI maps
  these enums to labels (add labels for the three new values). Exact zod change: `drafts/schema.acute-neuro.CHANGES.md`.
- Status migrainosus: ICHD-3 1.4.1 definition; AHS 2025 agents and levels (dopamine antagonists,
  dexamethasone for recurrence, NSAIDs, IV valproate, nerve blocks); magnesium as ADJUNCT (aura, Level U);
  opioids NOT_RECOMMENDED. Akathisia prophylaxis shows both sides (AHS 2025 "may reduce", no trial cited;
  AHS 2016 class 1 trial: no EPS difference). DHE: contraindications from the Provepharm label, Nagy 2011's
  stricter items in notes. DHE dosing CONFLICT shown on the row — Nagy protocol (to 1 mg q8h, ~11.25 mg
  over 5 days) vs label (IV ≤2 mg/24 h, ≤6 mg/week, not chronic daily); label regimen carries a 2 mg
  PER_DAY cap, weekly limit in duration/notes (no weekly CapScope).
- Source discrepancies shown, not resolved: SONB Level B wording; GONB volume 0.5–3 vs 0.75–3 mL;
  hydromorphone "should" vs "must" not offer (box/table used); metoclopramide 10–20 mg (2016) vs 10 mg (2025).
- Post-dural-puncture headache: Uppal 2023 multisociety consensus — conservative care, oral caffeine,
  GONB, epidural blood patch timing/level/volume/contraindications/consent, imaging, follow-up; bed rest
  SUPPORTIVE (temporizing), prophylactic bed rest a pitfall; grade I "doesn't support routine use" items
  → NOT_RECOMMENDED, WEAK.
- Evidence: AAN levels A → STRONG, B → MODERATE, C/U → WEAK, "must/may not offer" → NOT_RECOMMENDED;
  USPSTF A → STRONG, B → MODERATE, C/I → WEAK, D → NOT_RECOMMENDED; ungraded consensus statements →
  CONSENSUS; Nagy → EXPERT_OPINION; labels → NOT_GRADED.
- Pitfall lines only (not drafted as rows): Level U agents (eptinezumab, ketamine, IV lidocaine, propofol,
  IV caffeine, granisetron, IV ibuprofen, SPG block, promethazine, trimethobenzamide); agents whose US
  availability isn't addressed (dexketoprofen, IV acetylsalicylic acid, IM diclofenac, lysine clonixinate);
  dipyrone (withdrawn from US). Not drafted: Raskin 2-day DHE protocol; PDPH prevention technique detail.
- `relatedIds` include `consult-workups:thunderclap-headache`, `antiseizure-medications:valproate`,
  `vascular-antithrombotics:periprocedural-holds-lp-evd` — confirm they resolve (`npm run validate`).
- Drafts: `drafts/schema.acute-neuro.CHANGES.md`, `drafts/acute-neuro.status-migrainosus.json`,
  `drafts/acute-neuro.post-dural-puncture-headache.json`.
- Sources: ICHD-3 1.4.1 (2018); Robblee 2026 (AHS 2025 ED update); Orr 2016 (AHS); Nagy 2011; DHE injection
  label (Provepharm 2/2025); Uppal 2023 (PDPH consensus) — see `SOURCES.md`.
- Version: `acute-neuro` schema 1.1.0; `acute-neuro` registry MINOR (shared with 7.2/7.3/7.7).
  All drafts `lastReviewed: "UNREVIEWED"`.
- Status: content drafted — ready for Claude Code.

**7.10 Lab order codes (optional, last).** (settled 2026-11-08: dropped; see REVIEW_TASKS_2026-11-08) **[JASON]** first: which reference lab(s) does Trinity Health
Grand Rapids send to (Mayo, Quest, ARUP, other)? Only add that vendor's codes. Add `orderCodes`
(vendor, code, specimen, volume, container, catalog URL, access date) to `neural-antibodies` and relevant
consult entries — not a separate duplicated matrix. Every code goes in `verify[]` until checked against
the live catalog. Already confirmed by web check 2026-11-06: Mayo ENS2 (serum, 4 mL, red top), ENC2
(CSF), CDS1 (serum AQP4 + MOG FACS); Quest 94955 (encephalitis eval, serum), 36952 (MOG), 10266 (cN-1A).
Quest's own neuroimmunology sheet lists AQP4 CBA as **38321**, not 38312 as the external spec says.
Note Quest's encephalitis and epilepsy panels can't be ordered together.

---

## 8. Final verification

8.1 `npm run validate`, `npm test`, `npx tsc --noEmit`, `npm run build` all pass on `main` after signoff.
8.2 Search acceptance queries (task 3) all return the right entry in the top 3.
8.3 iPhone 15 Pro check: airplane-mode load, search, pin, an antithrombotic card, a calculator, the
context-bar chip, safe-area top unchanged.
8.4 Regenerate `generated/about.json` and `docs/CALCULATORS.md` via `npm run release`.

---

## 9. Deprioritized or rejected (kept visible on purpose)

| Item | Decision | Why |
|---|---|---|
| Full vascular protocols (code stroke/EVT, ICH bundle, malignant infarct, carotid revascularization) | Not doing | Jason knows these cold; codes aren't the use case |
| External 5-tab nav restructure (ICU/DNC, Send-Out Labs, Status & ASMs, Consult Crisis, Vascular/LP) | Rejected | Reorganizes by module, not by task; current nav works; churn without speed gain. Global search + pins solve findability |
| "Copy Epic SmartText summary" buttons | Deprioritized | Jason rarely writes inpatient notes; recs templates were cut for the same reason |
| Onconeural antibody → malignancy screening matrix | Not as new module | Duplicates `neural-antibodies.tumors/cancerScreening`; fold any missing imaging specifics into those cards |
| ICANS ICE/grading table | Not needed | Existing `icans-car-t-neurotoxicity` is correct and ASCO-sourced. Note: the external ICE item "spell WORLD backward" is not part of ICE |
| RCVS2 / RCVS vs PACNS card | Not needed | Already in `thunderclap-headache` and `cns-vasculitis-workup` |
| Ma2-positive "orchiectomy exploration if progressive" | Omit | Specialist decision; don't encode as a rule |
| Cangrelor bridging, DNC calculator/apnea validator, CRRT PK, MG 20-30-40 drug checker | Not specified | Referenced by the external spec but its sections weren't provided. Brain death and MG content already exist; CRRT dosing is folded into 7.1 |
| IBM / cN-1A card | Pearl only | Outpatient diagnosis |
| External spec's file layout (`src/data/*.json`) | Rejected | Use the repo's `data/` + `schema/` zod pipeline with sources and sign-off |

---

## 10. Open follow-ups (noticed in the 2026-11-07 follow-up batch, not changed)

Content items: each needs an approved draft (docs/VERSIONING.md) before any edit.

- [x] (settled 2026-11-08, batch 2 items 1, 1b) GBS: `searchTerms` lacks "GQ1b". The PLEX line in `keyNumbers` is shortened from `doseText`.
- [x] (settled 2026-11-08, batch 2 items 2a, 2b, 2c) cvt-anticoagulation: no back-link to `pregnancy-antithrombotics`. The enoxaparin CrCl <30 dose has no `dose[]` object. `rules[0].evidenceNote` says "AHA scientific statement 2024" rather than "Saposnik 2024".
- [x] (settled 2026-11-08, batch 2 items 3) sah-workup: no `relatedIds` to `cervical-artery-dissection` or `cvt-anticoagulation`, though both are in the differential.
- [x] (settled 2026-11-08, batch 2 items 4a, 4b) pregnancy-antithrombotics: the Kopp 2025 citation has an online-first placeholder (0:1-29). `pearls[0]` overstates the ACOG endorsement.
- [x] (settled 2026-11-08, batch 2 items 5a, 5b) cns-vasculitis: the ESO PACNS guideline is used only "as cited in Salvarani 2024" and isn't in `sources`. "Sousa 2026" vs "de Sousa IA".
- [x] (settled 2026-11-08, batch 2 items 6) young-stroke: `keyNumbers[0]` looks truncated ("…over >3"). The in-text labels still say "ISTH 2024".
- [x] (settled 2026-11-08, batch 2 items 7) AHA 2026 Table 8 has no LMWH row (Powers 2019 had one): check against `enoxaparin` and `thrombolysis-with-prior-antithrombotics`. Table 8's coagulopathy row gives both "aPTT>40s" and "PTT abnormal by local standards".
- [x] (settled 2026-11-08, batch 2 items 8) ticagrelor: `uses[0].evidenceNote` cites "§5.19 … ≥30% stenosis" (the ≥30% subgroup is in §5.1.1). `uses[3].evidenceNote` names no section.

### Noticed in follow-up batch 2 (2026-11-08), not changed

Each needs an approved draft before any edit. Detail: `planning/drafts/followups-2/README.md`.

- [x] (settled 2026-11-08, batch 3 item 1, FIX) sah-workup: dissection and CVT are mustNotMiss, but the workup has no neck vessel imaging or CTV/MRV; CTA head is indicated only for "SAH on CT".
- [x] (settled 2026-11-08, batch 3 item 7, FIX wording; ACCEPT labels: one Kleindorfer source, so the short label is unambiguous) young-stroke-workup: if "over >3" is too terse, reword `decisionRules[2].recommendation` (e.g. "target INR 2–3 rather than >3"); `keyNumbers[0]` would then need to change to stay a copy. Some labels say "Kleindorfer" and others "Kleindorfer 2021".
- [x] (settled 2026-11-08, batch 3 item 6, FIX; surname checked, correct) cns-vasculitis-workup: `decisionRules[3]` follows Salvarani's paraphrase; citing ESO directly would mean rewording to ESO's multidisciplinary-team wording (PICO 8), its own item. The de Sousa paper wasn't attached, so the surname form wasn't checked against it.
- [x] (settled 2026-11-08, batch 3 item 4, FIX uses[0]; uses[3] correct) ticagrelor: `uses[0]` "for any event" doesn't match Rec 4's "an artery that could account for the event"; the agent text uses ≥50% stenosis (AHA 2026/THALES) and Kleindorfer Rec 4 says ≥30%. `uses[3]` follows Rec 3's ">30%"; the supportive text says "≥30%".
- [x] (settled 2026-11-08, batch 3 item 9, FIX) pregnancy-antithrombotics: Kopp source title differs from the PDF title ("ASRA Pain Medicine…" vs "American Society of Regional Anesthesia and Pain Medicine…"); the DOI matches.
- [x] (settled 2026-11-08, batch 3 item 5, FIX) cvt-anticoagulation: `options[0].dose[0]` is labeled "Enoxaparin" next to "CrCl <30" (the enoxaparin entry says "q12h"). The label's renal dose is for DVT/PE with warfarin, so using it for CVT is an extrapolation, as with the existing q12h dose.
- [x] (settled 2026-11-08, batch 3 item 8, FIX) enoxaparin: `keyNumbers[1]` copies only the opening clause of its field (the pattern item 1b fixed in GBS).
- [x] (settled 2026-11-08, batch 3 item 3, ACCEPT: complete Table 8 has no LMWH row and matches all three entries; no change needed) AHA 2026 PDF: the attached copy cuts Table 8 off mid-row ("Amyloid…") at the bottom of p. 94/245. No LMWH row up to that point; the rest of the table wasn't checked.
- [x] (settled 2026-11-08, batch 3 item 2, FIX) thrombolysis-with-prior-antithrombotics: Table 8 rows are CONSENSUS in `rules[0]`/`rules[1]` but EXPERT_OPINION in `rules[2]`; `heparin-ufh` says "expert opinion, not graded"; Table 8 says it rests on "expert opinions and limited data". `rules[4]` is STRONG on a Powers 2019 recommendation that AHA 2026 replaced.
- [x] (settled 2026-11-08, batch 3 L4, ACCEPT) thunderclap-headache labels say "Sousa 2026"; its source string correctly reads "de Sousa IA…", so the paper is findable (label only).
