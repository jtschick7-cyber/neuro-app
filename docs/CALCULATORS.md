# Calculators

Generated from src/lib/calculators.ts — do not edit by hand. Rounding marked "app convention" needs pharmacy review.

## Levetiracetam load (`levetiracetam-load`)
- Formula: 60 mg/kg
- Caps: 4500 mg
- Rounding: nearest 50 mg, cap after rounding (app convention)
- Weight: ACTUAL
- Sources: Glauser T, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults (AES). Epilepsy Curr 2016;16(1):48-61. doi:10.5698/1535-7597-16.1.48 | Kapur J, et al. Randomized trial of three anticonvulsant medications for status epilepticus (ESETT). N Engl J Med 2019;381(22):2103-2113. doi:10.1056/NEJMoa1905795
- VERIFY: none

## Valproate load (`valproate-load`)
- Formula: 40 mg/kg
- Caps: 3000 mg
- Rounding: nearest 50 mg, cap after rounding (app convention)
- Weight: ACTUAL
- Sources: Glauser T, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults (AES). Epilepsy Curr 2016;16(1):48-61. doi:10.5698/1535-7597-16.1.48 | Kapur J, et al. Randomized trial of three anticonvulsant medications for status epilepticus (ESETT). N Engl J Med 2019;381(22):2103-2113. doi:10.1056/NEJMoa1905795
- VERIFY: none

## Fosphenytoin load (`fosphenytoin-load`)
- Formula: 20 mg PE/kg; min infusion time = dose / 150 mg PE/min
- Caps: 1500 mg PE; 150 mg PE/min
- Rounding: nearest 50 mg PE (= whole mL at 50 mg PE/mL; app convention)
- Weight: ACTUAL
- Sources: Glauser T, et al. Evidence-based guideline: treatment of convulsive status epilepticus in children and adults (AES). Epilepsy Curr 2016;16(1):48-61. doi:10.5698/1535-7597-16.1.48 | Kapur J, et al. Randomized trial of three anticonvulsant medications for status epilepticus (ESETT). N Engl J Med 2019;381(22):2103-2113. doi:10.1056/NEJMoa1905795
- VERIFY: none

## Phenytoin level: albumin correction and reload estimate (`phenytoin-correction`)
- Formula: Corrected total = measured total / (0.2 × albumin + 0.1) [Sheiner-Tozer]; on dialysis: / (0.1 × albumin + 0.1) [Mauro 1989]. Albumin g/dL, phenytoin mcg/mL. Not corrected if albumin not entered, or albumin ≥4.4 g/dL on the standard equation. Estimated free = corrected × 0.1. Reload (mg PE) = (target − corrected) × 0.7 L/kg × actual weight; target default 15 (10–20). No 0.92 phenytoin sodium salt factor is applied (reload about 8% lower than a salt-adjusted dose).
- Caps: 10 mg PE/kg (rounded down to 50 mg PE); 1500 mg PE; 150 mg PE/min
- Rounding: Corrected total and estimated free to 0.1 mcg/mL; reload to nearest 50 mg PE (= whole mL at 50 mg PE/mL), then cap (app convention)
- Weight: ACTUAL
- Sources: Kiang TK, Ensom MH. A comprehensive review on the predictive performance of the Sheiner-Tozer and derivative equations for the correction of phenytoin concentrations. Ann Pharmacother 2016;50(4):311-325. doi:10.1177/1060028016628166 | Cerebyx (fosphenytoin sodium) injection US prescribing information. Pfizer; revised 5/2025 (user-supplied label) | Dilantin (extended phenytoin sodium capsules) US prescribing information. Viatris; revised 8/2023 (DailyMed setid 86dd27d1-9cee-48ae-b55d-e2d2f7dbc593, accessed 2026-11-06) | Valproate sodium injection US prescribing information. Hikma; revised 12/2023 (user-supplied label)
- VERIFY: none

## Hypertonic saline (ICP) (`hypertonic-saline-bolus`)
- Formula: institutional protocol: 3% 250 mL over 30 min; 23.4% 30 mL over 5 min (central line). Na mEq = mL × 0.513 (3%) or 4.004 (23.4%)
- Caps: fixed volume per protocol
- Rounding: none (fixed volume)
- Weight: NOT_APPLICABLE
- Sources: Trinity Health Michigan neuro ICU protocol (provided by J. Schick, 11/2026) | Cook AM, et al. Guidelines for the acute treatment of cerebral edema in neurocritical care patients (NCS). Neurocrit Care 2020;32(3):647-666. doi:10.1007/s12028-020-00959-7 | Bhalla P, Dingman JS, Aysenne A. Emergency Neurological Life Support: Intracranial Hypertension and Herniation Protocol, version 6.0. Neurocritical Care Society; 2024
- VERIFY: none

## Mannitol 20% (`mannitol-dose`)
- Formula: 0.5–1 g/kg; mL = g × 5; osmolar gap = measured − (2Na + glucose/18 + BUN/2.8), warns above 20
- Caps: none
- Rounding: nearest 5 g
- Weight: ACTUAL
- Sources: Bhalla P, Dingman JS, Aysenne A. Emergency Neurological Life Support: Intracranial Hypertension and Herniation Protocol, version 6.0. Neurocritical Care Society; 2024 | Cook AM, et al. Guidelines for the acute treatment of cerebral edema in neurocritical care patients (NCS). Neurocrit Care 2020;32(3):647-666. doi:10.1007/s12028-020-00959-7 | Osmitrol (mannitol injection) US prescribing information. Baxter; revised 8/2025
- VERIFY: none

## Levodopa equivalent daily dose (`ledd`)
- Formula: Σ (daily dose × factor) for levodopa, agonists, MAO-B, amantadine; + COMT LED = covered levodopa LED × 0.33 (entacapone) or 0.5 (tolcapone, opicapone); + istradefylline = (levodopa + COMT LED) × 0.2; safinamide 50/100 mg = 150
- Caps: none
- Rounding: 0.1 mg
- Weight: NOT_APPLICABLE
- Sources: Jost ST, et al. Levodopa dose equivalency in Parkinson's disease: updated systematic review and proposals. Mov Disord 2023;38(7):1236-1252
- VERIFY: none

## Creatinine clearance (Cockcroft-Gault) (`cockcroft-gault`)
- Formula: (140 − age) × weight / (72 × SCr) × 0.85 if female. Uses actual body weight (Xarelto PI §2.1: "Calculate CrCl based on actual weight"). Weight can be affected by edema or obesity, and creatinine-based estimates may be misleading with very low muscle mass (KDIGO 2024 ch. 4 and Fig. 11). In extremes of body weight, KDIGO suggests nonindexed eGFR (PP 4.2.4); where accuracy matters, creatinine + cystatin C or measured GFR (PP 4.2.3).
- Caps: none
- Rounding: nearest 1 mL/min
- Weight: ACTUAL
- Sources: Xarelto (rivaroxaban) US prescribing information. Janssen; revised 3/2026 (user-supplied label) | Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron 1976;16:31-41 | Kidney Disease: Improving Global Outcomes (KDIGO) CKD Work Group. KDIGO 2024 clinical practice guideline for the evaluation and management of chronic kidney disease. Kidney Int 2024;105(4S):S117-S314 (ch. 4, PP 4.2.3–4.2.4; Fig. 11)
- VERIFY: none

## Hyponatremia: 3% bolus and correction limits (`sodium-correction`)
- Formula: ESE 150 mL; SALSA 2 mL/kg (moderate) or 2 mL/kg × 2 (severe); limit ≤10 first 24 h, then ≤8 (ESE); ≤8 in any 24 h if ODS risk (Verbalis). Period number = whole 24-h periods since the first correction (1 = first 24 h).
- Caps: none
- Rounding: nearest 10 mL per bolus
- Weight: ACTUAL
- Sources: Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014;170(3):G1-G47. doi:10.1530/EJE-13-1020 | Baek SH, et al. Risk of overcorrection in rapid intermittent bolus vs slow continuous infusion therapies of hypertonic saline for symptomatic hyponatremia (SALSA). JAMA Intern Med 2021;181(1):81-92. doi:10.1001/jamainternmed.2020.5519 | Verbalis JG, et al. Diagnosis, evaluation, and treatment of hyponatremia: expert panel recommendations. Am J Med 2013;126(10 Suppl 1):S1-S42. doi:10.1016/j.amjmed.2013.07.006
- VERIFY: none

## Rotigotine patch (no enteral route, BMJ 2010) (`rotigotine-conversion`)
- Formula: A = levodopa mg/day (×0.7 if CR), then ×1.3 if on a COMT inhibitor. B = agonist mg/day × factor (ropinirole 20, rotigotine 20, pramipexole base 100, cabergoline 100, bromocriptine 10, apomorphine 10). LEDD = A + B. Adjusted LEDD = LEDD × 0.55; rotigotine mg/24 h = adjusted LEDD ÷ 20, rounded to the nearest 2 mg, once daily. BMJ factors, not calc:ledd (Jost 2023)
- Caps: none
- Rounding: nearest 2 mg (exact odd-mg ties round up; app convention); warns above 8 mg/24 h (label) and adjusted LEDD >350 mg
- Weight: NOT_APPLICABLE
- Sources: Brennan KA, Genever RW. Managing Parkinson's disease during surgery. BMJ 2010;341:c5718. doi:10.1136/bmj.c5718 | Neupro (rotigotine transdermal system) US prescribing information. UCB; revised 9/2026
- VERIFY: none

## Plasma volume for plasma exchange (PLEX) (`plasma-volume`)
- Formula: EPV (L) = 0.065 × weight (kg) × (1 − Hct) [Kaplan 1990]; Hct entered as %. Exchange volume = EPV × 1.0 and × 1.5
- Caps: none
- Rounding: 0.1 L (app convention)
- Weight: ACTUAL
- Sources: Kaplan AA. A simple and accurate method for prescribing plasma exchange. ASAIO Trans 1990;36(3):M597-9. PMID 2252761
- VERIFY: none

## mEGRIS (GBS ventilation risk at admission) (`megris`)
- Formula: Bulbar weakness 5; days from weakness onset to admission 0/1/2/3/4/5/6/≥7 → 7/6/5/4/3/2/1/0; neck flexion MRC 0/1/2/3/4/5 → 10/8/6/4/2/0; bilateral hip flexion MRC sum 0–10 → 10 − sum. Total 0–32 (Luijten 2023 Table 4). Flags: ≥23 ward → ICU; 25–32 >70% ventilation risk (EAN/PNS 2023 Fig. 2). Per-score probabilities are plotted only (Fig. 3) and not shown
- Caps: none
- Rounding: integer (whole-number inputs)
- Weight: NOT_APPLICABLE
- Sources: Luijten LWG, Doets AY, et al. Modified Erasmus GBS Respiratory Insufficiency Score: a simplified clinical tool to predict the risk of mechanical ventilation in Guillain-Barré syndrome. J Neurol Neurosurg Psychiatry 2023;94(4):300-308. doi:10.1136/jnnp-2022-329937 | van Doorn PA, et al. EAN/PNS guideline on diagnosis and treatment of Guillain-Barré syndrome. Eur J Neurol 2023;30(12):3646-3674. doi:10.1111/ene.16073
- VERIFY: none
