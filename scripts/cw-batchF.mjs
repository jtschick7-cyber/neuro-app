// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: consult-workups batch F (post-arrest prognostication, brain death)
import fs from "node:fs";
const path = "data/consult-workups.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const dx = (name, clues, mustNotMiss = false) => ({ dx: name, clues, mustNotMiss });
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  ncs2023: "Rajajee V, et al. Guidelines for Neuroprognostication in Comatose Adult Survivors of Cardiac Arrest (NCS). Neurocrit Care 2023. doi:10.1007/s12028-023-01688-3",
  erc2025: "Nolan JP, Sandroni C, et al. European Resuscitation Council and European Society of Intensive Care Medicine Guidelines 2025: Post-Resuscitation Care. Resuscitation 2025;215:110809",
  bd2023: "Lewis A, Kirschen MP, Greer D. The 2023 AAN/AAP/CNS/SCCM Pediatric and Adult Brain Death/Death by Neurologic Criteria Consensus Practice Guideline: A Comparison With the 2010 and 2011 Guidelines. Neurol Clin Pract 2023;13:e200189. doi:10.1212/CPJ.0000000000200189"
};
const GP = "NCS 2023: good practice statement (strong, evidence cannot be graded)";

const entries = [
  {
    id: "post-cardiac-arrest-prognostication",
    title: "Neuroprognostication after cardiac arrest",
    searchTerms: ["anoxic brain injury", "HIBI", "post-arrest", "cardiac arrest prognosis", "SSEP", "NSE", "myoclonus", "withdrawal of care"],
    category: "PROGNOSIS_DEATH",
    consultQuestion: "Still comatose after cardiac arrest — what is the neurologic prognosis?",
    keyHistory: ["Time of ROSC; temperature control used (rewarming time)", "Sedatives, opioids, paralytics given and when last; renal/hepatic function", "Baseline function, life-limiting illness, multiorgan failure", "Arrest details (rhythm, no-flow/low-flow time) — context only, not predictors alone"],
    keyExam: ["Pupillary light reflex (± quantitative pupillometry)", "Corneal reflexes", "Best motor response", "Myoclonus: timing, generalized vs multifocal, with EEG correlation", "Signs of awakening"],
    redFlags: ["Assessment within 72 h or with sedation, hypothermia, or paralytics on board — don't prognosticate yet", "Loss of all brainstem reflexes — consider brain death evaluation", "Clinical seizures — EEG and treat"],
    differential: [
      dx("Severe hypoxic-ischemic brain injury", ["Multiple concordant poor-outcome predictors"]),
      dx("Delayed awakening (sedation, renal/hepatic failure, hypothermia)", ["Confounders present; predictors indeterminate"], true),
      dx("Nonconvulsive status epilepticus", ["Unexplained coma, subtle twitching"], true),
      dx("Brain death", ["Absent brainstem reflexes and apnea"], true)
    ],
    workup: [
      w("Serial neurologic examination off sedation", "URGENT", [], ["At ≥72 h from ROSC or rewarming"]),
      w("EEG (continuous or intermittent)", "URGENT", [], ["Suppressed or burst-suppression background ≥72 h, unconfounded = moderately reliable (NCS)"]),
      w("SSEP (median nerve)", "IF_INDICATED", ["Comatose ≥48 h from ROSC (NCS) / ≥24 h (ERC)"], ["Bilaterally absent N20 with preserved Erb's point and cervical responses = reliable"]),
      w("Noncontrast head CT", "URGENT", [], ["Diffuse loss of grey–white differentiation with sulcal effacement ≥48 h = moderately reliable (NCS)"]),
      w("MRI brain with DWI", "IF_INDICATED", ["Day 2–7 after ROSC"], ["Diffuse restricted diffusion (cortex + deep grey, bilateral anterior and posterior) = moderately reliable (NCS)"]),
      w("Serum NSE at 24, 48 and 72 h", "IF_INDICATED", ["Comatose after ROSC, assay available"], ["ERC uses >60 µg/L at 48/72 h; NCS: not reliable alone until a threshold is validated; hemolysis falsely raises"]),
      w("Sedative drug levels, renal and hepatic function", "IF_INDICATED", ["Possible confounding"], [])
    ],
    decisionRules: rules(
      ["Timing", "Defer prognostication ≥72 h from ROSC (no hypothermia) or ≥72 h from rewarming; persistent coma beyond this doesn't by itself mean poor prognosis", "CONSENSUS", [GP]],
      ["Confounders", "Assess only without sedation or other confounders", "CONSENSUS", [GP]],
      ["Whole-patient prognosis", "Weigh baseline function, life-limiting illness and multiorgan failure separately from the neurologic prognosis", "CONSENSUS", [GP]],
      ["Approach", "Multimodal — never based on a single variable", "CONSENSUS", [GP]],
      ["Age, initial rhythm, or time to ROSC", "Not reliable predictors alone", "WEAK", ["NCS 2023: weak, low–moderate quality"]],
      ["Bilaterally absent pupillary light reflex ≥72 h, unconfounded, picture of severe widespread injury", "Reliable predictor of poor outcome", "WEAK", ["NCS 2023: weak, moderate quality"]],
      ["Bilaterally absent N20 on SSEP ≥48 h, accurately measured", "Reliable predictor of poor outcome", "WEAK", ["NCS 2023: weak, moderate quality"]],
      ["Diffuse CT injury ≥48 h; diffuse DWI injury day 2–7; suppressed/burst-suppression EEG ≥72 h", "Moderately reliable predictors (use in combination)", "WEAK", ["NCS 2023: weak, low to very low quality"]],
      ["Absent corneal reflexes alone; absent/extensor motor alone; myoclonus <48 h without EEG; NSE alone ≤72 h", "Not reliable predictors on their own", "WEAK", ["NCS 2023: weak, very low to moderate quality"]],
      ["No reliable (or multiple moderately reliable) predictors", "Counsel that recovery is uncertain and may take days to months; extended observation if consistent with goals of care", "CONSENSUS", [GP]],
      ["ERC/ESICM algorithm: not obeying commands (GCS motor <6) at ≥72 h from ROSC, confounders excluded", "Poor outcome likely with ≥2 of: no pupillary and corneal reflexes at 72 h; bilaterally absent N20 at 24 h; highly malignant EEG at >24 h; NSE >60 µg/L at 48 and/or 72 h; status myoclonus within 72 h; diffuse extensive anoxic injury on CT/MRI", "CONSENSUS", ["ERC/ESICM 2025"]]
    ),
    initialSteps: ["Fever prevention and seizure management per ERC 2025 (no seizure prophylaxis; levetiracetam or valproate for seizures)", "Use short-acting sedation with daily holds to allow unconfounded exams (ERC 2025)"],
    recsTemplate: [
      "Too early for neuroprognostication — reassess at ≥72 h from [ROSC/rewarming] off sedation",
      "EEG [continuous]; SSEP [if still comatose ≥48 h]; MRI brain with DWI day 2–7; NSE 24/48/72 h",
      "Exam today: pupils __, corneals __, motor __, myoclonus __",
      "Predictors: [reliable __ / moderately reliable __] — prognosis [poor / indeterminate]",
      "Family meeting with ICU team"
    ],
    disposition: ["Goals-of-care discussion with surrogates once multimodal data are in", "Indeterminate prognosis: extended observation if consistent with goals"],
    calculatorIds: [],
    institutionVaries: ["SSEP availability and turnaround", "NSE assay availability"],
    pearls: [
      "10–22% of survivors not treated with hypothermia awaken >72 h after ROSC, and 67–88% of late awakeners have good outcomes (NCS 2023)",
      "Seven TTM patients awoke on days 15–22; 3 had good outcomes (NCS 2023)",
      "NSE: NCS says not reliable alone; ERC uses >60 µg/L at 48/72 h as one of the ≥2 predictors — the guidelines differ",
      "With myoclonus and a benign EEG background, attempt a wake-up trial (ERC 2025)"
    ],
    verify: [],
    relatedIds: ["consult-workups:brain-death-determination", "acute-neuro:nonconvulsive-status-epilepticus"],
    sources: [S.ncs2023, S.erc2025],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "brain-death-determination",
    title: "Brain death / death by neurologic criteria (adult)",
    searchTerms: ["brain death", "BD/DNC", "death by neurologic criteria", "apnea test", "ancillary test"],
    category: "PROGNOSIS_DEATH",
    consultQuestion: "Absent brainstem reflexes — does the patient meet prerequisites for brain death evaluation, and how is it done?",
    keyHistory: ["Mechanism of catastrophic brain injury and time of injury", "Hypoxic-ischemic injury: time since arrest", "Temperature management and rewarming time", "CNS-depressant drugs (including pentobarbital) and paralytics; renal/hepatic function", "Chronic hypercarbia (COPD, OSA) and baseline PaCO2"],
    keyExam: ["Unresponsive to visual, auditory and tactile stimulation", "Absent pupillary, corneal, oculocephalic, oculovestibular, cough and gag reflexes", "No brain-mediated motor responses (spinal reflexes allowed)", "Apnea"],
    redFlags: ["Any breath during apnea testing — does not meet criteria", "Primary posterior fossa injury without supratentorial catastrophic injury", "Unmet prerequisites (BP, temperature, drugs, metabolic)"],
    differential: [
      dx("Brain death", ["All prerequisites met; full exam and apnea test consistent"]),
      dx("Drug intoxication or residual sedation/paralysis", ["Recent CNS depressants, renal/hepatic failure, no train-of-four twitches"], true),
      dx("Hypothermia", ["Core temperature ≤36°C or recently rewarmed"], true),
      dx("Severe metabolic/endocrine derangement", ["Uncorrected labs"], true),
      dx("Locked-in syndrome / Guillain-Barré mimic", ["Preserved vertical eye movements; peripheral process"], true)
    ],
    workup: [
      w("Neuroimaging consistent with mechanism and severity", "STAT", [], ["Must show catastrophic supratentorial injury if the primary injury is in the posterior fossa"]),
      w("Core temperature, BP, electrolytes, glucose, ABG", "STAT", [], ["Correct severe derangements first"]),
      w("Drug levels for CNS depressants (pentobarbital <5 µg/mL or undetectable)", "IF_INDICATED", ["CNS-depressant exposure"], []),
      w("Train-of-four or deep tendon reflexes", "IF_INDICATED", ["Paralytic given or suspected"], []),
      w("Apnea test after the final examination", "STAT", [], []),
      w("Ancillary test: 4-vessel catheter angiography, radionuclide CBF scan, or TCD (adults)", "IF_INDICATED", ["Exam or apnea test can't be completed or interpreted; metabolic derangements can't be corrected"], ["Unacceptable: EEG, evoked potentials, CTA, MRA, MRI"])
    ],
    decisionRules: rules(
      ["Hypoxic-ischemic injury (e.g., cardiac arrest), age ≥24 months", "Observe ≥24 h after the injury before starting the evaluation", "CONSENSUS", ["2023 AAN/AAP/CNS/SCCM guideline (via Lewis 2023)"]],
      ["Temperature", "Core temperature >36°C; wait ≥24 h after rewarming to 36°C if temperature was lowered", "CONSENSUS", ["2023 guideline"]],
      ["Blood pressure (adults)", "SBP ≥100 mm Hg and MAP ≥75 mm Hg (or near chronic baseline if it differs substantially)", "CONSENSUS", ["2023 guideline"]],
      ["Examinations", "Minimum of 1 exam in adults, but 2 independent exams by 2 clinicians recommended; clinicians involved in organ recovery may not participate", "CONSENSUS", ["2023 guideline"]],
      ["Apnea test target", "PaCO2 ≥60 mm Hg AND ≥20 mm Hg above pre-test baseline AND arterial pH <7.3; with known chronic hypercarbia, ≥20 above the chronic baseline", "CONSENSUS", ["2023 guideline (pH target new vs 2010)"]],
      ["Apnea test prerequisite", "Pre-test PaCO2 35–45 mm Hg unless known chronic hypercarbia", "CONSENSUS", ["2023 guideline"]],
      ["Ancillary testing", "Only when exam/apnea can't be completed or interpreted, after performing all testable elements; not for hypothermia, high CNS-depressant levels, or skull defects/CSF diversion alone; never if any finding shows brain-mediated activity", "CONSENSUS", ["2023 guideline"]]
    ),
    initialSteps: ["Before starting, make a reasonable attempt to inform the family and offer support (2023 guideline)"],
    recsTemplate: [
      "Prerequisites: mechanism __; time since injury __ h; temp __; SBP/MAP __; drugs __; labs __; TOF __",
      "Exam #1: [findings]; Exam #2: [findings]",
      "Apnea test: baseline PaCO2 __ → final PaCO2 __, pH __; no respirations",
      "[Ancillary test __ if indicated]",
      "Time of death = time the final determination is completed [per institutional policy]"
    ],
    disposition: ["Notify the organ procurement organization per law and policy"],
    calculatorIds: [],
    institutionVaries: ["Hospital BD/DNC policy (examiner qualifications, 1 vs 2 exams, documentation)", "Michigan law and organ procurement notification process"],
    pearls: [
      "EEG is no longer an acceptable ancillary test — it doesn't assess the brainstem (2023 guideline)",
      "Ancillary testing should not shorten the observation period (2023 guideline)",
      "On VA-ECMO, sample blood gases from both the distal arterial line and the post-oxygenator circuit (2023 guideline)"
    ],
    verify: [],
    relatedIds: ["consult-workups:post-cardiac-arrest-prognostication"],
    sources: [S.bd2023],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.7.0";
d.lastUpdated = "2026-11-05";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
