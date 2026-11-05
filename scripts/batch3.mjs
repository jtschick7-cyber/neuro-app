// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: append batch 3 entries to data/acute-neuro.json
import fs from "node:fs";
const path = "data/acute-neuro.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const NA = "NOT_APPLICABLE";
const fixed = (label, min, unit, timing, frequency = [], duration = [], caps = [], max = min) =>
  ({ label, amountMin: min, amountMax: max, unit, basis: "FIXED", timing, weightBasis: NA, caps, frequency, duration });
const perKg = (label, min, max, unit, timing, frequency = [], duration = [], caps = [], wb = "ACTUAL") =>
  ({ label, amountMin: min, amountMax: max, unit, basis: "PER_KG", timing, weightBasis: wb, caps, frequency, duration });
const tx = (role, agent, routes, doseText, dose, notes, evidenceLevel, evidenceNote, formularyStatus, calculatorIds = []) =>
  ({ role, agent, routes, doseText, dose, notes, evidenceLevel, evidenceNote, formularyStatus, calculatorIds });
const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const acts = (...a) => a.map(([window, action], i) => ({ order: i + 1, window, action }));

const S = {
  cook2020: "Cook AM, et al. Guidelines for the acute treatment of cerebral edema in neurocritical care patients (NCS). Neurocrit Care 2020;32(3):647-666. doi:10.1007/s12028-020-00959-7",
  enls5: "Morrison C, et al. Emergency Neurological Life Support: Intracranial Hypertension and Herniation Protocol, version 5.0. Neurocritical Care Society; 2022",
  enls6: "Bhalla P, Dingman JS, Aysenne A. Emergency Neurological Life Support: Intracranial Hypertension and Herniation Protocol, version 6.0. Neurocritical Care Society; 2024",
  fischer2017: "Fischer M, Schmutzhard E. Posterior reversible encephalopathy syndrome. J Neurol 2017;264:1608-1616. doi:10.1007/s00415-016-8377-8",
  hinduja2020: "Hinduja A. Posterior reversible encephalopathy syndrome: clinical features and outcome. Front Neurol 2020;11:71. doi:10.3389/fneur.2020.00071",
  acog222: "American College of Obstetricians and Gynecologists. Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol 2020;135(6):e237-e260",
  boyer2005: "Boyer EW, Shannon M. The serotonin syndrome. N Engl J Med 2005;352(11):1112-1120. doi:10.1056/NEJMra041867",
  dunkley2003: "Dunkley EJC, et al. The Hunter Serotonin Toxicity Criteria: simple and accurate diagnostic decision rules for serotonin toxicity. QJM 2003;96(9):635-642. doi:10.1093/qjmed/hcg109",
  gurrera2011: "Gurrera RJ, et al. An international consensus study of neuroleptic malignant syndrome diagnostic criteria using the Delphi method. J Clin Psychiatry 2011;72(9):1222-1228. doi:10.4088/JCP.10m06438",
  reulbach2007: "Reulbach U, et al. Managing an effective treatment for neuroleptic malignant syndrome. Crit Care 2007;11(1):R4. doi:10.1186/cc5148",
  efns2010: "Galvin R, et al. EFNS guidelines for diagnosis, therapy and prevention of Wernicke encephalopathy. Eur J Neurol 2010;17(12):1408-1418. doi:10.1111/j.1468-1331.2010.03153.x",
  ese2014: "Spasovski G, et al. Clinical practice guideline on diagnosis and treatment of hyponatraemia. Eur J Endocrinol 2014;170(3):G1-G47. doi:10.1530/EJE-13-1020",
  salsa2021: "Baek SH, et al. Risk of overcorrection in rapid intermittent bolus vs slow continuous infusion therapies of hypertonic saline for symptomatic hyponatremia (SALSA). JAMA Intern Med 2021;181(1):81-92. doi:10.1001/jamainternmed.2020.5519",
  slooter2020: "Slooter AJC, et al. Updated nomenclature of delirium and acute encephalopathy: statement of ten Societies. Intensive Care Med 2020;46(5):1020-1022. doi:10.1007/s00134-019-05907-4",
  padis2018: "Devlin JW, et al. Clinical practice guidelines for the prevention and management of pain, agitation/sedation, delirium, immobility, and sleep disruption in adult patients in the ICU (PADIS). Crit Care Med 2018;46(9):e825-e873",
  astct2019: "Lee DW, et al. ASTCT consensus grading for cytokine release syndrome and neurologic toxicity associated with immune effector cells. Biol Blood Marrow Transplant 2019;25(4):625-638",
  asco2021: "Santomasso BD, et al. Management of immune-related adverse events in patients treated with CAR T-cell therapy: ASCO guideline. J Clin Oncol 2021;39(35):3978-3992"
};

const entries = [
  // ---------------------------------------------------------------- 14
  {
    id: "elevated-icp-herniation",
    title: "Elevated ICP / cerebral herniation",
    category: "ICP_HERNIATION",
    searchTerms: ["ICP", "herniation", "blown pupil", "mannitol", "hypertonic saline", "23.4%", "cerebral edema"],
    presentation: [
      "Declining consciousness, new unilateral fixed/dilated pupil, posturing, Cushing response (hypertension, bradycardia, irregular respirations)",
      "Headache, vomiting, papilledema with subacute rise"
    ],
    definitions: [
      "Intracranial hypertension: sustained (>5 min) ICP >20 mmHg (ENLS)"
    ],
    immediateActions: acts(
      ["Tier 0 — now", "HOB 30° (≤45°), head midline, loosen collar; treat fever, hypoxia, hypercarbia, pain, agitation; avoid hypotonic fluids and hyponatremia"],
      ["Herniation signs", "Hyperosmolar bolus (HTS or mannitol — whichever is fastest) + brief hyperventilation as a bridge"],
      ["Within minutes", "Stat non-contrast CT head; neurosurgery for EVD (CSF diversion) or decompression"],
      ["Ongoing", "Repeat osmotherapy for symptoms/ICP; sodium and renal function q4–6h; serum osmolality/osmolar gap with mannitol"],
      ["Refractory", "Intubate, sedate (propofol bolus/infusion), consider neuromuscular blockade, barbiturates, decompressive surgery per etiology"]
    ),
    workup: [
      w("Non-contrast CT head", "STAT"),
      w("BMP (Na, Cl, creatinine), serum osmolality", "STAT", [], ["Osmolar gap (measured − calculated osm) preferred over an osmolality threshold for mannitol AKI risk (NCS 2020)"]),
      w("ABG", "URGENT", ["Intubated or hyperventilating"]),
      w("Coagulation profile, platelets", "URGENT", [], ["Before EVD/surgery"]),
      w("Na and Cl q4–6h during HTS", "ROUTINE", [], ["NCS 2020: an upper Na 155–160 and Cl 110–115 mEq/L may be reasonable to limit AKI"])
    ],
    treatment: [
      tx("FIRST_LINE", "Hypertonic saline", ["IV"], "Bolus dosing (concentration per access): 3% peripheral OK; ≥7.5% (incl. 23.4%) via central line. VERIFY specific volumes against institutional protocol",
        [], ["NCS 2020: HTS suggested over mannitol for initial ICP management in TBI and ICH; either acceptable in AIS and SAH", "Avoid severe hypernatremia/hyperchloremia (AKI)"],
        "WEAK", ["NCS 2020: conditional, low-quality evidence"], "INSTITUTION_VARIES", ["hypertonic-saline-bolus"]),
      tx("FIRST_LINE", "Mannitol 20%", ["IV"], "0.5–1 g/kg IV bolus over 5–15 min via peripheral line; may repeat q4–6h (ENLS)",
        [perKg("Bolus", 0.5, 1, "G", "PER_DOSE", ["May repeat q4–6h"])],
        ["Osmotic diuresis → hypovolemia/hypotension; replace volume", "AKI risk — monitor osmolar gap and renal function (NCS 2020)", "Use inline filter; check for crystals"],
        "WEAK", ["NCS 2020: effective alternative when HTS can't be given (TBI); either agent in AIS", "ENLS dosing"], "AVAILABLE", ["mannitol-dose"]),
      tx("ADJUNCT", "Brief hyperventilation", ["NON_PHARM"], "Short bridge only for acute ICP elevation/herniation; mild hypocapnia (PaCO2 32–35 mmHg) if used beyond the acute bridge",
        [], ["Cerebral vasoconstriction → ischemia risk; not a sustained therapy"],
        "STRONG", ["NCS 2020: strong recommendation, very low-quality evidence (brief episodes)", "ENLS v6.0: PaCO2 32–35 mmHg target"], "AVAILABLE"),
      tx("ADJUNCT", "CSF diversion (EVD)", ["NON_PHARM"], "Neurosurgical", [], [], "WEAK", ["NCS 2020: conditional"], "AVAILABLE"),
      tx("ADJUNCT", "Propofol sedation", ["IV"], "Bolus 1–2 mg/kg; infusion titrated (max 200 mcg/kg/min, briefly)",
        [perKg("Bolus", 1, 2, "MG", "SINGLE")], ["Hypotension — protect CPP", "PRIS risk >80 mcg/kg/min for >48 h"], "EXPERT_OPINION", ["ENLS"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Corticosteroids for edema from ICH, TBI, or stroke", ["IV"], "Do not use (steroids remain appropriate for vasogenic edema from tumor/abscess)",
        [], [], "STRONG", ["NCS 2020: strong recommendation against steroids in ICH (moderate-quality evidence)"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Prophylactic scheduled mannitol in acute ischemic stroke", ["IV"], "Do not use",
        [], [], "WEAK", ["NCS 2020: conditional recommendation against (potential harm)"], "AVAILABLE")
    ],
    pitfalls: [
      "Hyperventilation is a bridge, not a treatment — prolonged hypocapnia worsens ischemia",
      "No proven outcome benefit from either osmotic agent — they buy time for definitive treatment",
      "Rebound hyponatremia or abrupt HTS discontinuation can worsen edema; avoid hyponatremia in brain injury (NCS 2020)",
      "Mannitol: an osmolality ceiling (e.g., 320) is a convention — NCS 2020 favors the osmolar gap to track accumulation"
    ],
    escalateWhen: [
      "Any herniation sign → neurosurgery + neuro-ICU immediately",
      "ICP >20 mmHg sustained despite tier-one measures",
      "Rising Na/Cl or creatinine limiting further osmotherapy"
    ],
    institutionVaries: ["HTS concentrations stocked, bolus volumes, and peripheral administration policy", "Na target strategy (bolus vs targeted infusion)"],
    verify: [
      "Specific HTS bolus volumes (e.g., 23.4% 30 mL central; 3% 150–250 mL or ~2–2.5 mL/kg) come from secondary pharmacy sources, not NCS 2020 — settle with ENLS pharmacotherapy module or local protocol (feeds the calculator review)"
    ],
    relatedIds: ["acute-neuro:refractory-super-refractory-se"],
    sources: [S.cook2020, S.enls5, S.enls6],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 15
  {
    id: "pres",
    title: "Posterior reversible encephalopathy syndrome (PRES)",
    category: "ENCEPHALOPATHY",
    searchTerms: ["PRES", "RPLS", "hypertensive encephalopathy", "eclampsia", "cortical blindness", "tacrolimus"],
    presentation: [
      "Headache, encephalopathy, seizures, visual disturbance (including cortical blindness), focal deficits",
      "Triggers: BP surges/fluctuation, preeclampsia/eclampsia (incl. postpartum), renal failure, cytotoxic/immunosuppressive drugs (calcineurin inhibitors, chemo), autoimmune disease, sepsis",
      "15–20% are normotensive or hypotensive"
    ],
    definitions: [
      "Clinical-radiologic syndrome: vasogenic edema, classically bilateral parieto-occipital, on MRI with compatible clinical picture; may involve frontal, temporal, cerebellar, brainstem regions"
    ],
    immediateActions: acts(
      ["On suspicion", "MRI brain (FLAIR/DWI/SWI); exclude stroke, venous thrombosis, encephalitis"],
      ["Hypertensive emergency", "Lower BP gradually — no more than ~20–25% in the first hours — with titratable IV agents (e.g., nicardipine, labetalol, clevidipine)"],
      ["Pregnant/postpartum", "Treat as eclampsia: magnesium sulfate; urgent OB"],
      ["Seizures", "Standard SE pathway; long-term ASMs usually unnecessary once resolved"],
      ["Trigger drug", "Reduce or stop calcineurin inhibitor/chemo with the prescribing team"]
    ),
    workup: [
      w("MRI brain with DWI, SWI; MRV if venous thrombosis possible", "URGENT", [], ["Hemorrhage or restricted diffusion signals worse outcome"]),
      w("BMP, Mg, CBC, LFTs, urinalysis/protein", "URGENT"),
      w("hCG", "IF_INDICATED", ["Patient of childbearing potential"], ["Eclampsia can occur up to weeks postpartum"]),
      w("Calcineurin inhibitor levels", "IF_INDICATED", ["On tacrolimus/cyclosporine"]),
      w("EEG", "IF_INDICATED", ["Persistent encephalopathy", "Seizures"])
    ],
    treatment: [
      tx("FIRST_LINE", "Titratable IV antihypertensive (nicardipine, labetalol, clevidipine)", ["IV"], "Target ≤20–25% reduction in the first hours; dose per agent",
        [], ["No RCT-defined BP target in PRES"], "EXPERT_OPINION", ["Review-level consensus (Fischer 2017; Hinduja 2020)"], "AVAILABLE"),
      tx("FIRST_LINE", "Magnesium sulfate (eclampsia/preeclampsia-associated PRES)", ["IV", "IM"], "4–6 g IV over 20–30 min, then 1–2 g/h; continue ≥24 h postpartum/after last seizure; 2 g IV for recurrent seizure",
        [fixed("Load", 4, "G", "SINGLE", [], [], [], 6), fixed("Maintenance", 1, "G", "PER_HOUR", ["Continuous"], ["≥24 h"], [], 2)],
        ["Reduce/monitor in renal impairment; check reflexes, respiration, Mg levels", "Toxicity antidote: calcium gluconate 1 g IV", "Myasthenia gravis: magnesium can precipitate crisis — see mg-contraindications"],
        "STRONG", ["ACOG PB 222 (2020) regimen"], "AVAILABLE"),
      tx("SUPPORTIVE", "Correct hypomagnesemia; remove/reduce trigger", ["NON_PHARM"], "N/A", [], [], "EXPERT_OPINION", [], "AVAILABLE")
    ],
    pitfalls: [
      "Normotension doesn't exclude PRES",
      "Postpartum eclampsia can present days to weeks after delivery",
      "Overly rapid BP lowering risks ischemia",
      "Atypical distributions (frontal, cerebellar, brainstem, unilateral) are common"
    ],
    escalateWhen: [
      "Status epilepticus, depressed consciousness, hemorrhage, or posterior fossa edema with hydrocephalus → ICU/neurosurgery",
      "Eclampsia → OB emergency"
    ],
    institutionVaries: ["Preferred IV antihypertensive agent", "Magnesium protocol (OB-run)"],
    verify: [
      "ACOG PB 222 citation pages — magnesium regimen was confirmed via multiple secondary sources quoting ACOG, not the bulletin itself"
    ],
    relatedIds: ["acute-neuro:convulsive-status-epilepticus", "mg-contraindications:magnesium"],
    sources: [S.fischer2017, S.hinduja2020, S.acog222],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 16
  {
    id: "serotonin-syndrome",
    title: "Serotonin syndrome (serotonin toxicity)",
    category: "TOXIC_METABOLIC",
    searchTerms: ["serotonin toxicity", "Hunter criteria", "cyproheptadine", "clonus", "SSRI", "linezolid"],
    presentation: [
      "Onset usually within 24 h of a new serotonergic drug, dose increase, or interacting combination (e.g., linezolid, methylene blue, MAOIs, tramadol, fentanyl, triptans + SSRI/SNRI)",
      "Neuromuscular: clonus (inducible, spontaneous, ocular), hyperreflexia, tremor — worse in legs; hypertonia in severe cases",
      "Autonomic: hyperthermia, diaphoresis, tachycardia, mydriasis, diarrhea; agitation"
    ],
    definitions: [
      "Hunter criteria — serotonergic agent PLUS any of: spontaneous clonus; inducible clonus + agitation or diaphoresis; ocular clonus + agitation or diaphoresis; tremor + hyperreflexia; hypertonia + temperature >38 °C + ocular or inducible clonus (sens 84%, spec 97% vs toxicologist diagnosis)"
    ],
    immediateActions: acts(
      ["Immediately", "Stop all serotonergic drugs; supportive care, IV fluids, continuous monitoring"],
      ["Agitation", "Benzodiazepines; avoid physical restraints (isometric contraction worsens hyperthermia and lactic acidosis)"],
      ["Persistent moderate symptoms", "Cyproheptadine (oral/NG)"],
      ["Temp >41 °C or severe rigidity", "ICU: sedation, intubation, nondepolarizing paralysis; antipyretics don't work (heat is muscular); avoid succinylcholine"]
    ),
    workup: [
      w("Medication reconciliation incl. OTC/supplements and recent stops (fluoxetine washout is long)", "STAT"),
      w("BMP, CK, LFTs, coagulation, lactate, ABG", "URGENT", [], ["Rhabdomyolysis, DIC, acidosis in severe cases"]),
      w("Exclude mimics: infection (blood cultures; LP if indicated), NMS, anticholinergic toxicity, withdrawal, thyroid storm", "URGENT")
    ],
    treatment: [
      tx("FIRST_LINE", "Benzodiazepine (e.g., lorazepam, diazepam)", ["IV"], "Titrate to agitation and autonomic control", [], [], "EXPERT_OPINION", ["Boyer & Shannon 2005"], "AVAILABLE"),
      tx("SECOND_LINE", "Cyproheptadine", ["PO", "NG"], "12 mg initially, then 2 mg q2h while symptoms continue; maintenance 8 mg q6h (12–32 mg/24 h); oral only — crush via NG",
        [fixed("Initial", 12, "MG", "SINGLE"), fixed("Repeat", 2, "MG", "PER_DOSE", ["q2h while symptomatic"]), fixed("Maintenance", 8, "MG", "PER_DOSE", ["q6h"])],
        ["Efficacy not rigorously established", "Sedation; transient hypotension"],
        "EXPERT_OPINION", ["Boyer & Shannon 2005"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Antipyretics for serotonin-syndrome hyperthermia", ["PO", "IV"], "Not effective — hyperthermia is from muscle activity",
        [], [], "EXPERT_OPINION", ["Boyer & Shannon 2005"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Physical restraints; succinylcholine", ["NON_PHARM"], "Avoid — restraints worsen hyperthermia/acidosis; succinylcholine risks hyperkalemia with rhabdomyolysis",
        [], [], "EXPERT_OPINION", ["Boyer & Shannon 2005"], "AVAILABLE")
    ],
    pitfalls: [
      "Clonus/hyperreflexia (worse in legs) points to serotonin syndrome; lead-pipe rigidity + bradyreflexia + slow onset points to NMS",
      "Severe rigidity can mask clonus and hyperreflexia",
      "Inpatient triggers: linezolid, methylene blue, fentanyl, tramadol, ondansetron/metoclopramide add-ons"
    ],
    escalateWhen: ["Temperature >41 °C, rigidity, or hemodynamic instability → ICU", "Seizures, rhabdomyolysis, DIC"],
    institutionVaries: [],
    verify: [],
    relatedIds: ["acute-neuro:nms-parkinsonism-hyperpyrexia", "acute-neuro:delirium-vs-encephalopathy"],
    sources: [S.boyer2005, S.dunkley2003],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 17
  {
    id: "nms-parkinsonism-hyperpyrexia",
    title: "Neuroleptic malignant syndrome & parkinsonism-hyperpyrexia",
    category: "TOXIC_METABOLIC",
    searchTerms: ["NMS", "neuroleptic malignant", "parkinsonism hyperpyrexia", "levodopa withdrawal", "dantrolene", "bromocriptine", "rigidity fever"],
    presentation: [
      "Days after starting/escalating a dopamine antagonist (antipsychotics, metoclopramide, prochlorperazine), or after stopping/reducing dopaminergic drugs (parkinsonism-hyperpyrexia)",
      "Fever, lead-pipe rigidity, altered mental status, autonomic instability; evolves over days",
      "Average time to resolution ~9 days"
    ],
    definitions: [
      "Gurrera 2011 consensus elements: dopamine antagonist exposure or agonist withdrawal (recent); hyperthermia >38.0 °C on ≥2 occasions; rigidity; altered mental status; CK ≥4× ULN; sympathetic lability (BP ≥25% above baseline or fluctuation ≥20 mmHg diastolic / ≥25 mmHg systolic in 24 h; diaphoresis; incontinence); tachycardia ≥25% + tachypnea ≥50% above baseline; negative workup for other causes"
    ],
    immediateActions: acts(
      ["Immediately", "Stop the dopamine antagonist; restart dopaminergic therapy if it was withdrawn (prior dose, via NG if needed)"],
      ["Now", "ICU-level supportive care: cooling, IV fluids (rhabdomyolysis), VTE prophylaxis, aspiration precautions"],
      ["Agitation/catatonic features", "Benzodiazepines"],
      ["Moderate–severe", "Consider dantrolene and/or bromocriptine (or amantadine)"],
      ["Refractory", "ECT (psychiatry)"]
    ),
    workup: [
      w("CK, BMP, creatinine, LFTs, urinalysis (myoglobin)", "STAT"),
      w("CBC, coagulation (DIC), ABG/lactate", "URGENT"),
      w("Infection workup (blood cultures; LP if meningitis/encephalitis possible)", "URGENT"),
      w("Medication review incl. antiemetics and recent parkinsonian drug changes", "STAT")
    ],
    treatment: [
      tx("SUPPORTIVE", "Cooling, fluids, discontinue offending agent", ["NON_PHARM"], "N/A", [], [], "EXPERT_OPINION", [], "AVAILABLE"),
      tx("FIRST_LINE", "Benzodiazepine (lorazepam)", ["IV"], "Titrate; also treats catatonic overlap", [], [], "EXPERT_OPINION", [], "AVAILABLE"),
      tx("SECOND_LINE", "Dantrolene", ["IV"], "1–2.5 mg/kg IV; if temperature and rigidity improve, 1 mg/kg q6h; max 10 mg/kg/day",
        [perKg("Initial", 1, 2.5, "MG", "SINGLE"), perKg("Continuation", 1, 1, "MG", "PER_DOSE", ["q6h"], [], [{ amount: 10, unit: "MG", scope: "PER_DAY" }])],
        ["Hepatotoxicity — avoid combining with other hepatotoxins", "Case-report meta-analysis: not clearly superior to other therapy overall (Reulbach 2007)"],
        "EXPERT_OPINION", ["Dosing per Utah Poison Control (2025) review"], "AVAILABLE"),
      tx("SECOND_LINE", "Bromocriptine", ["PO", "NG"], "VERIFY dose — case series commonly 2.5 mg q8h, titrated",
        [], ["Can worsen psychosis; hypotension"], "EXPERT_OPINION", [], "AVAILABLE"),
      tx("FIRST_LINE", "Resume dopaminergic therapy (parkinsonism-hyperpyrexia)", ["PO", "NG"], "Restart prior carbidopa/levodopa regimen promptly; NG if NPO",
        [], ["If no enteral route: rotigotine patch is a non-oral option (convert via LEDD)"], "EXPERT_OPINION", [], "AVAILABLE", ["ledd"])
    ],
    pitfalls: [
      "Atypical antipsychotics and antiemetics (metoclopramide, prochlorperazine) cause NMS too",
      "NMS vs serotonin syndrome: NMS = slow onset, lead-pipe rigidity, bradyreflexia; SS = rapid onset, clonus, hyperreflexia",
      "Abrupt levodopa stop (NPO, surgery) in Parkinson's can cause a NMS-like syndrome",
      "Malignant catatonia overlaps — benzodiazepines help both"
    ],
    escalateWhen: ["Temperature >40 °C, rising CK/renal failure, or autonomic instability → ICU", "No response to supportive care + pharmacotherapy → ECT"],
    institutionVaries: ["Dantrolene stock location (often OR malignant-hyperthermia carts)"],
    verify: [
      "Bromocriptine dose — needs a named review source",
      "Dantrolene dosing is from a poison-center review (secondary) — confirm with a primary review or local toxicology"
    ],
    relatedIds: ["acute-neuro:serotonin-syndrome", "acute-neuro:delirium-vs-encephalopathy"],
    sources: [S.gurrera2011, S.reulbach2007],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 18
  {
    id: "wernicke-encephalopathy",
    title: "Wernicke encephalopathy",
    category: "TOXIC_METABOLIC",
    searchTerms: ["Wernicke", "thiamine", "WE", "Korsakoff", "ophthalmoplegia ataxia confusion"],
    presentation: [
      "Confusion, ophthalmoplegia/nystagmus, ataxia — full triad in a minority",
      "Risk: alcohol use disorder, malnutrition, hyperemesis, bariatric surgery, prolonged vomiting, cancer/chemo, refeeding, dialysis"
    ],
    definitions: [
      "EFNS clinical diagnosis in alcohol use disorder — 2 of 4: dietary deficiency, eye signs, cerebellar dysfunction, altered mental state or mild memory impairment (Level B)"
    ],
    immediateActions: acts(
      ["Before glucose/carbohydrate", "Draw blood thiamine, then give IV thiamine — don't wait for the result"],
      ["Treatment", "Thiamine 200 mg IV three times daily (EFNS); many centers use higher doses — see institutionVaries"],
      ["Concurrently", "Check and replete magnesium (deficiency can cause thiamine refractoriness)"]
    ),
    workup: [
      w("Whole-blood thiamine (before dosing)", "URGENT", [], ["Don't delay treatment for it"]),
      w("MRI brain", "ROUTINE", [], ["Supports diagnosis (Level B): medial thalami, mammillary bodies, periaqueductal gray; normal MRI doesn't exclude"]),
      w("Magnesium, glucose, BMP, LFTs", "URGENT")
    ],
    treatment: [
      tx("FIRST_LINE", "Thiamine", ["IV"], "200 mg IV three times daily, before any carbohydrate (EFNS, Level C)",
        [fixed("Dose", 200, "MG", "PER_DOSE", ["TID"])],
        ["Very safe (Level B)", "Parenteral thiamine for all at-risk patients in the ED (GPP)"],
        "WEAK", ["EFNS 2010: Level C"], "AVAILABLE"),
      tx("ADJUNCT", "Magnesium repletion", ["IV", "PO"], "Per electrolyte protocol", [], ["Caution in myasthenia gravis"], "EXPERT_OPINION", [], "AVAILABLE")
    ],
    pitfalls: [
      "Glucose before thiamine can precipitate or worsen WE",
      "Most patients lack the full triad — treat on suspicion",
      "Non-alcoholic causes (bariatric surgery, hyperemesis, cancer) are easily missed"
    ],
    escalateWhen: ["Declining consciousness or hypotension/hypothermia"],
    institutionVaries: ["Thiamine dose (EFNS 200 mg TID vs UK/other protocols up to 500 mg TID)"],
    verify: [],
    relatedIds: ["acute-neuro:delirium-vs-encephalopathy"],
    sources: [S.efns2010],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 19
  {
    id: "hyponatremia-ods",
    title: "Severe hyponatremia & osmotic demyelination syndrome",
    category: "TOXIC_METABOLIC",
    searchTerms: ["hyponatremia", "ODS", "central pontine myelinolysis", "3% saline", "overcorrection", "SIADH", "DDAVP clamp"],
    presentation: [
      "Severe symptoms: vomiting, cardiorespiratory distress, somnolence/coma (GCS ≤8), seizures",
      "Moderately severe: headache, confusion, nausea",
      "ODS (2–6 days after overly rapid correction): dysarthria, dysphagia, quadriparesis, pseudobulbar palsy, locked-in, movement disorders"
    ],
    definitions: [
      "ESE 2014 correction limits: ≤10 mmol/L in the first 24 h, then ≤8 mmol/L per 24 h until Na 130 (1D)",
      "Stricter limit (≤8 mmol/L in first 24 h) when ODS risk factors: hypokalemia, malnutrition, alcohol use disorder (liver disease commonly added)"
    ],
    immediateActions: acts(
      ["Severe symptoms, first hour", "150 mL 3% NaCl IV over 20 min; recheck Na; repeat up to twice more until Na rises 5 mmol/L (ESE 1D/2D)"],
      ["After +5 mmol/L", "Stop 3%; keep line open with minimal 0.9% saline; start cause-specific treatment"],
      ["Monitoring", "Na at 6 h, 12 h, then daily (more often in high-risk); watch urine output (aquaresis signals overcorrection risk)"],
      ["Overcorrection", "Re-lower: D5W ± desmopressin if limit exceeded (ESE 1D)"]
    ),
    workup: [
      w("Serum osmolality, urine osmolality, urine Na", "URGENT", [], ["Draw before treatment if possible"]),
      w("Glucose (pseudohyponatremia/translocation), TSH, cortisol", "URGENT"),
      w("Volume status and medication review (thiazides, SSRIs, carbamazepine/oxcarbazepine)", "URGENT"),
      w("Serum K", "STAT", [], ["Repleting K raises Na — counts toward the correction limit"])
    ],
    treatment: [
      tx("FIRST_LINE", "3% NaCl bolus", ["IV"], "150 mL over 20 min; repeat up to 2 more times until +5 mmol/L (ESE). SALSA bolus arm: 2 mL/kg (moderate) or 4 mL/kg (severe) over 20–40 min",
        [fixed("ESE bolus", 150, "ML", "PER_DOSE", ["Repeat up to ×2 until Na +5"])],
        ["Peripheral line acceptable for boluses", "SALSA: rapid intermittent boluses had no more overcorrection than slow infusion (17.2% vs 24.2%) and less need for re-lowering"],
        "WEAK", ["ESE 2014: 1D/2D", "SALSA 2021 RCT"], "AVAILABLE", ["sodium-correction"]),
      tx("ADJUNCT", "Desmopressin ± D5W (re-lowering or 'clamp')", ["IV", "SC"], "Per nephrology/pharmacy protocol",
        [], ["Use when correction exceeds limits"], "WEAK", ["ESE 2014: re-lower if >10 in 24 h or >8 in any later 24 h (1D)"], "INSTITUTION_VARIES")
    ],
    pitfalls: [
      "Overcorrection often comes from aquaresis once the cause stops (hypovolemia corrected, thiazide or desmopressin stopped)",
      "Potassium repletion raises sodium",
      "ODS risk: Na ≤120, alcohol use disorder, malnutrition, hypokalemia, liver disease",
      "Brain-injured patients: avoid hyponatremia entirely (NCS 2020)"
    ],
    escalateWhen: ["Seizure, coma, or respiratory compromise → ICU", "Na rising faster than limits → nephrology, re-lowering"],
    institutionVaries: ["3% bolus protocol (150 mL vs 100 mL vs weight-based)", "Desmopressin clamp use"],
    verify: [],
    relatedIds: ["acute-neuro:elevated-icp-herniation", "acute-neuro:convulsive-status-epilepticus"],
    sources: [S.ese2014, S.salsa2021, S.cook2020],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 20
  {
    id: "delirium-vs-encephalopathy",
    title: "Delirium vs acute encephalopathy",
    category: "ENCEPHALOPATHY",
    searchTerms: ["delirium", "encephalopathy", "altered mental status", "AMS", "confusion", "ICU delirium"],
    presentation: [
      "Acute, fluctuating disturbance of attention and awareness with cognitive change",
      "Hypoactive delirium is common and easily missed"
    ],
    definitions: [
      "Acute encephalopathy: rapidly developing (<4 weeks) pathobiological brain process, expressed clinically as subsyndromal delirium, delirium, or coma (Slooter 2020)",
      "Delirium: clinical state meeting DSM-5 criteria; subsyndromal delirium: compatible changes not meeting all criteria",
      "'Altered mental status' is not synonymous with delirium and should not be used (Slooter 2020)"
    ],
    immediateActions: acts(
      ["First", "Exclude emergencies: glucose, hypoxia/hypercarbia, hypotension, NCSE, stroke, meningitis/encephalitis, Wernicke"],
      ["Within hours", "Medication review: anticholinergics, benzodiazepines, opioids, sedatives, cefepime/renally cleared drugs, steroids"],
      ["Workup", "Infection, metabolic, toxic screen; neuroimaging and EEG only if focal signs, seizures, or unexplained course"],
      ["Management", "Treat cause; non-pharmacologic measures (sleep, mobility, glasses/hearing aids, reorientation)"]
    ),
    workup: [
      w("Glucose, BMP, Ca, Mg, phos, LFTs, ammonia, TSH, B12, CBC", "URGENT"),
      w("UA, chest X-ray, blood cultures as indicated", "URGENT"),
      w("ABG/VBG", "IF_INDICATED", ["Somnolence", "Lung disease", "Opioids"]),
      w("CT/MRI brain", "IF_INDICATED", ["Focal deficit", "Head trauma", "Anticoagulation", "No explanation after initial workup"]),
      w("EEG", "IF_INDICATED", ["Fluctuating consciousness", "Subtle twitching", "Unexplained persistent encephalopathy"]),
      w("LP", "IF_INDICATED", ["Fever", "Meningism", "Immunocompromise", "Unexplained"])
    ],
    treatment: [
      tx("SUPPORTIVE", "Non-pharmacologic bundle", ["NON_PHARM"], "Sleep hygiene, early mobilization, sensory aids, family presence, avoid restraints", [], [], "EXPERT_OPINION", [], "AVAILABLE"),
      tx("ALTERNATIVE", "Antipsychotic for distressing symptoms/danger only", ["PO", "IV", "IM"], "Lowest dose, shortest duration; not for routine delirium treatment",
        [], ["Parkinson disease/DLB: avoid typical antipsychotics; quetiapine or clozapine if unavoidable", "QTc monitoring"],
        "WEAK", ["PADIS 2018 (ICU)"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Benzodiazepines for delirium (outside alcohol/benzodiazepine withdrawal or seizures)", ["IV", "PO"], "Avoid — can worsen delirium",
        [], [], "EXPERT_OPINION", [], "AVAILABLE")
    ],
    pitfalls: [
      "Hypoactive delirium is missed without a screening tool (e.g., CAM-ICU)",
      "Cefepime neurotoxicity and NCSE in renal failure",
      "Anchoring on 'sundowning' or dementia without workup"
    ],
    escalateWhen: ["Depressed consciousness, airway risk, or suspected NCSE/CNS infection"],
    institutionVaries: ["Delirium screening tool and order set"],
    verify: ["PADIS 2018 statement against routine antipsychotic use — confirm wording/strength in the guideline"],
    relatedIds: ["acute-neuro:nonconvulsive-status-epilepticus", "acute-neuro:wernicke-encephalopathy", "acute-neuro:serotonin-syndrome"],
    sources: [S.slooter2020, S.padis2018],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 21
  {
    id: "icans-car-t-neurotoxicity",
    title: "ICANS (immune effector cell–associated neurotoxicity)",
    category: "NEUROIMMUNOLOGY",
    searchTerms: ["ICANS", "CAR-T", "CAR T neurotoxicity", "ICE score", "bispecific", "teclistamab"],
    presentation: [
      "After CAR-T or bispecific T-cell engagers, usually during/after cytokine release syndrome",
      "Early: expressive aphasia, word-finding difficulty, handwriting change, tremor, inattention",
      "Severe: depressed consciousness, seizures, motor weakness, cerebral edema"
    ],
    definitions: [
      "ICE score (10 pts): orientation to year, month, city, hospital (4); name 3 objects (3); follow simple commands (1); write a standard sentence (1); count back from 100 by 10 (1)",
      "ASTCT grade = worst of: ICE 7–9 (G1), 3–6 (G2), 0–2 (G3), 0 unarousable (G4); consciousness (awakens to voice G2, tactile only G3, unarousable G4); seizure (resolves rapidly/NCS responding = G3; prolonged >5 min or repetitive = G4); motor (deep focal weakness = G4); edema (focal = G3; diffuse/posturing/CN VI palsy/papilledema/Cushing triad = G4)"
    ],
    immediateActions: acts(
      ["Every 8–12 h (more if abnormal)", "ICE score + level of consciousness, seizures, motor exam, papilledema"],
      ["Grade ≥2", "Corticosteroids (dexamethasone); neurology; aspiration precautions; consider EEG and MRI"],
      ["Grade ≥3", "ICU; EEG; imaging for edema; escalate steroids"],
      ["Concurrent CRS", "Tocilizumab is for CRS — it doesn't cross the BBB well and isn't a treatment for isolated ICANS"],
      ["Seizures", "Levetiracetam first; follow SE pathway"]
    ),
    workup: [
      w("ICE score, neuro exam, fundoscopy", "STAT"),
      w("EEG", "URGENT", [], ["NCS common in higher grades"]),
      w("MRI brain (CT if unstable)", "URGENT", [], ["Usually normal; edema = high grade"]),
      w("LP", "IF_INDICATED", ["Infection concern once platelets/coagulation allow"]),
      w("CBC, coags, fibrinogen, ferritin, CRP, BMP", "URGENT", [], ["Concurrent CRS/HLH, DIC"])
    ],
    treatment: [
      tx("FIRST_LINE", "Dexamethasone", ["IV"], "Grade 2–3: 10 mg IV q6h until grade ≤1, then taper (some protocols 10–20 mg; grade 1 optional per product)",
        [fixed("Dose", 10, "MG", "PER_DOSE", ["q6h until grade ≤1, then taper"])],
        ["Dosing varies by product label and institution"],
        "CONSENSUS", ["ASCO 2021 (informal consensus)"], "AVAILABLE"),
      tx("SECOND_LINE", "Methylprednisolone", ["IV"], "Grade 4 or refractory: 1,000 mg IV daily ×3 days, then taper",
        [fixed("Pulse", 1000, "MG", "PER_DAY", ["Daily"], ["3 days"])],
        [], "CONSENSUS", ["ASCO 2021"], "AVAILABLE"),
      tx("ADJUNCT", "Levetiracetam", ["IV", "PO"], "Seizure treatment per SE pathway; prophylaxis per institutional/product protocol",
        [], [], "EXPERT_OPINION", [], "INSTITUTION_VARIES", ["levetiracetam-load"]),
      tx("NOT_RECOMMENDED", "Tocilizumab for isolated ICANS (no CRS)", ["IV"], "Not recommended for neurotoxicity without CRS",
        [], ["May worsen ICANS via raised CNS IL-6"], "CONSENSUS", ["ASCO 2021"], "AVAILABLE")
    ],
    pitfalls: [
      "Handwriting and naming decline are early signs — serial ICE catches them",
      "Steroids are first-line for ICANS; tocilizumab is for CRS",
      "Cerebral edema can progress fast — any grade 4 sign → ICU and neurosurgery awareness"
    ],
    escalateWhen: ["Grade ≥3 → ICU", "Seizures, cerebral edema, or rapidly falling ICE score"],
    institutionVaries: ["Product-specific steroid thresholds", "Levetiracetam prophylaxis practice", "Cellular-therapy team on-call pathway"],
    verify: ["Steroid regimens are from ASCO-concordant institutional/product protocols; confirm against ASCO 2021 ICANS table (Table 2) — attach if available"],
    relatedIds: ["acute-neuro:nonconvulsive-status-epilepticus", "acute-neuro:elevated-icp-herniation"],
    sources: [S.astct2019, S.asco2021],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.6.0";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
