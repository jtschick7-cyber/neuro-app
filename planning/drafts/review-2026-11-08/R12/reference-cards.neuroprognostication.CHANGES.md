# reference-cards.neuroprognostication — CHANGES (review 2026-11-08, item R12)

New entry. There is no base in the export packet, so every "Current" cell is "—". Append the card as the last entry of `data/reference-cards.json`. `lastReviewed: "UNREVIEWED"`. Row content is as approved in chat 2026-11-10 ("approve as recommended", D1–D8); the layout differences are listed at the end.

Abbreviations: GPS = good practice statement; Rec = RECOMMENDED; Not rec = NOT_RECOMMENDED.

## Card-level fields

| Field | Current | New | Source + location |
|---|---|---|---|
| `id` | — | `neuroprognostication` | D1 (a) |
| `title` | — | Neuroprognostication: ICH, AIS, SE, GBS, TBI (NCS guidelines) | D1, D2 |
| `searchTerms` | — | 24 terms (prognosis … fixed pupils) | wording |
| `scopeNote` | — | When to prognosticate and which predictors are rated moderately reliable vs not reliable; post–cardiac arrest lives in its own entry | D2 |
| `pitfalls[0]` | — | None of the five guidelines rates any predictor or model "reliable" | Hwang abstract p.395; Mainali abstract p.745; Madzar abstract p.365; Muehlschlegel abstract p.448; Busl abstract p.564 |
| `pitfalls[1]` | — | A moderately reliable single predictor counts only alongside another; the outcome is then "likely", with "substantial" uncertainty. Moderately reliable probability models may be used alone, presented as an objective estimate subject to considerable uncertainty | Muehlschlegel "How to use these guidelines" p.451; Madzar p.367 (same text in Hwang p.398, Busl p.567) |
| `pitfalls[2]` | — | EGRIS overpredicted ventilation in IGOS (10% observed vs 21% predicted); AUC 0.63 in a Peruvian cohort | Busl p.577 |
| `pitfalls[3]` | — | Age >85 after thrombectomy: trial outcomes are a best-case estimate; present the full range | Mainali PICO 1 rationale, p.753 |
| `keyNumbers[0]`–`[4]` | — | ICH timing; msTBI timing; ENI; EGRIS; SE of unclear etiology (exact copies; see README) | rows below |
| `verify[0]` | — | ASTRAL grade mismatch (Table 3 moderate vs text low) | Mainali p.752 vs p.758 |
| `verify[1]` | — | Helsinki CT (6-month function) printed as a strong recommendation | Muehlschlegel p.473 |
| `relatedIds` | — | post-cardiac-arrest-prognostication, guillain-barre-syndrome, refractory-super-refractory-se, brain-death-determination | `valid-ids.txt` |
| `sources[0]`–`[4]` | — | Hwang 2024; Mainali 2026; Madzar 2026; Busl 2023; Muehlschlegel 2024 | uploaded PDFs |

## sections[0] — ICH (Hwang 2024)

| Row | Current | New: role · target (notes) | Grade (copied word for word) | Source + location |
|---|---|---|---|---|
| `rows[0]` Timing / ICH | — | Rec · Defer ≥48–72 h of ICU admission, except the most clinically devastated (notes: definition of clinically devastated; agrees with AHA/ASA 2022 second full day) | conditional recommendation, evidence not graded → WEAK | Table 2 p.401; GPS #1 rationale p.402 |
| `rows[1]` Recovery horizon | — | Rec · several days to several months or years (note: 50–64% functional recovery at up to 32 months) | strong recommendation, evidence not graded → STRONG | Table 2 p.401; GPS #4 rationale p.402 |
| `rows[2]` Not reliable alone / function ≥3 mo | — | Not rec · age; admission exam; volume; infratentorial; IVH; anticoagulation; original ICH score; max-ICH score | weak; very low (age) / low (others) → WEAK | Table 2 p.401 |
| `rows[3]` Not reliable / 30-day mortality | — | Not rec · original ICH score; no single variable; max-ICH not graded (insufficient evidence) | weak; very low quality → WEAK | Table 2 + footnotes a, b, p.401 |

## sections[1] — Acute ischemic stroke (Mainali 2026)

| Row | Current | New | Grade | Source + location |
|---|---|---|---|---|
| `rows[0]` ENI / good outcome ≥3 mo | — | Rec · NIHSS 0–1 at 24 h after revascularization (or after admission) = moderately reliable for a good outcome | weak; low quality → WEAK | Table 3 #7, p.752 |
| `rows[1]` Timing | — | Rec · avoid premature prognostication; no fixed window | strong, evidence cannot be graded → STRONG | Table 5 GPS 6, p.753 |
| `rows[2]` Large hemispheric infarction | — | Rec · discuss before deterioration, so there is time to decide on craniectomy | → STRONG | Table 5 GPS 10, p.753 |
| `rows[3]` Recovery horizon | — | Rec · severe: up to 6 months or longer; mild–moderate: mostly within 3 months | → STRONG | Table 5 GPS 7, p.753 |
| `rows[4]` Feeding tube and tracheostomy | — | Rec · tube removal likely, not certain; decannulation possible; both within several months | → STRONG | Table 5 GPS 8–9, p.753 |
| `rows[5]` Not reliable alone | — | Not rec · 7 variables + successful revascularization (good outcome) | weak; very low / moderate (revascularization) → WEAK | Table 3 #1–6, 8–9, p.752 |
| `rows[6]` Prediction models | — | Not rec · ASTRAL, DRAGON family, iScore, THRIVE family | weak; per model → WEAK | Table 3 #10–13, p.752; p.758 (ASTRAL, see verify) |

## sections[2] — Status epilepticus (Madzar 2026)

| Row | Current | New | Grade | Source + location |
|---|---|---|---|---|
| `rows[0]` Timing / SE of unclear etiology | — | Rec · defer until the cause workup is done; run it alongside treatment | strong, cannot be graded → STRONG | Table 3 GPS 6, p.380 |
| `rows[1]` Known etiology | — | Rec · use disease-specific validated predictors (e.g., post–cardiac arrest) | → STRONG | Table 3 GPS 4, p.380 |
| `rows[2]` Confounders | — | Rec · residual sedation, toxic-metabolic, prolonged postictal (note: 4–10 days reported) | → STRONG | Table 3 GPS 5, p.380; rationale p.374 |
| `rows[3]` RSE / SRSE counseling | — | Rec · coma and life support for days to months; recovery to or near baseline feasible | → STRONG | Table 3 GPS 2–3, p.380 |
| `rows[4]` Not reliable alone / in-hospital mortality | — | Not rec · 9 variables + STESS, mSTESS, EMSE (note: no functional-outcome recommendations) | weak; low / moderate / very low per item → WEAK | Table 3, p.380; pp.380–381 |

## sections[3] — Guillain–Barré syndrome (Busl 2023)

| Row | Current | New | Grade | Source + location |
|---|---|---|---|---|
| `rows[0]` Bulbar or limb weakness | — | Rec · moderately reliable for ventilation ≤14 days | weak; very low (bulbar) / low (limb) → WEAK | p.572 |
| `rows[1]` EGRIS | — | Rec · 0–7 → 1–90% risk; point table in notes | weak; moderate quality → WEAK | Table 4 p.576; p.577 |
| `rows[2]` EGOS | — | Rec · within 2 weeks; 1–7; point table in notes | weak; moderate quality → WEAK | Table 5 p.577; p.578 |
| `rows[3]` mEGOS | — | Rec · admission 0–9, day 7 0–12; point tables in notes | weak; moderate quality → WEAK | Table 6 p.578; p.578 |
| `rows[4]` Acute-phase counseling | — | Rec · discuss ventilation and enteral nutrition (note: 10–30%; 7 of 10 need a tracheostomy) | strong, cannot be graded → STRONG | GPS 2, p.571 |
| `rows[5]` Not reliable | — | Not rec · grouped by ventilation / walking / function | weak; per item → WEAK | pp.573–579 |

## sections[4] — Moderate–severe TBI (Muehlschlegel 2024)

| Row | Current | New | Grade | Source + location |
|---|---|---|---|---|
| `rows[0]` Timing / msTBI | — | Rec · ≥3 days of full care, ideally 1–2 weeks; exceptions; may remain uncertain after 2 weeks | strong, cannot be graded → STRONG | GPS 2, p.464 |
| `rows[1]` Bilateral nonreactive pupils | — | Rec · moderately reliable for in-hospital mortality and poor function at 6 months if not confounded | weak; low (mortality) / moderate (function) → WEAK | p.464; pp.467–468 |
| `rows[2]` CRASH and IMPACT models | — | Rec · moderately reliable; components and calculators in notes | weak; moderate quality → WEAK | pp.470–473 |
| `rows[3]` Not reliable alone | — | Not rec · 11 clinical variables + 4 CT scores | weak; per item (Helsinki issue, see verify) → WEAK | pp.464–469, 471–474; Table 2 p.454 |

## Layout differences from the approved row list (content unchanged)
- Approved row 8 (AIS recovery + feeding tube/trach) is two rows: `sections[1].rows[3]` and `[4]`.
- Approved row 18 (EGOS / mEGOS) is two rows: `sections[3].rows[2]` and `[3]`, so each point table sits under its own score.
- 26 rows in total (24 approved).
- The approved warning "moderately reliable = substantial uncertainty" (`pitfalls[1]`) also carries the guidelines' companion sentence that probability models may be used alone. Same "How to use" paragraph.

## Not encoded (see README ledger)
- Generic good-practice statements (D4), AIS Table 6 (D4), the reliability definitions table (assumption 2), back-links from other entries (D8).
