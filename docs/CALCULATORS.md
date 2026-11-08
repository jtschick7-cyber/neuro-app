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
- Formula: Corrected total = measured total / (0.2 × albumin + 0.1) [Sheiner-Tozer]; on dialysis: / (0.1 × albumin + 0.1) [Mauro 1989]. Albumin g/dL, phenytoin mcg/mL. Not corrected if albumin not entered, or albumin ≥4.4 g/dL on the standard equation. Estimated free = corrected × 0.1. Reload (mg PE) = (target − corrected) × 0.7 L/kg × actual weight; target default 15 (10–20)
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
- Formula: 0.5–1 g/kg; mL = g × 5; osmolar gap = measured − (2Na + glucose/18 + BUN/2.8)
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
- Formula: (140 − age) × weight / (72 × SCr) × 0.85 if female
- Caps: none
- Rounding: nearest 1 mL/min
- Weight: ACTUAL
- Sources: Xarelto (rivaroxaban) US prescribing information. Janssen; revised 3/2026 (user-supplied label) | Cockcroft DW, Gault MH. Prediction of creatinine clearance from serum creatinine. Nephron 1976;16:31-41
- VERIFY: none

## Hyponatremia: 3% bolus and correction limits (`sodium-correction`)
- Formula: ESE 150 mL; SALSA 2 or 4 mL/kg; limit ≤10 (≤8 if ODS risk) first 24 h, ≤8 thereafter
- Caps: none
- Rounding: nearest 10 mL
- Weight: ACTUAL
- Sources: Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014;170(3):G1-G47. doi:10.1530/EJE-13-1020 | Baek SH, et al. Risk of overcorrection in rapid intermittent bolus vs slow continuous infusion therapies of hypertonic saline for symptomatic hyponatremia (SALSA). JAMA Intern Med 2021;181(1):81-92. doi:10.1001/jamainternmed.2020.5519
- VERIFY: none
