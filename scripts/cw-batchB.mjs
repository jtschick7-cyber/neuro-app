// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: consult-workups batch B (part 1: seizure, syncope, RPD, AMS) + batch A VERIFY fixes
import fs from "node:fs";
const path = "data/consult-workups.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const dx = (name, clues, mustNotMiss = false) => ({ dx: name, clues, mustNotMiss });
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  krumholz2015: "Krumholz A, et al. Evidence-based guideline: management of an unprovoked first seizure in adults (AAN/AES). Neurology 2015;84:1705-1713",
  syncope2017: "Shen WK, et al. 2017 ACC/AHA/HRS Guideline for the Evaluation and Management of Patients With Syncope. Circulation 2017;136:e60-e122. doi:10.1161/CIR.0000000000000499",
  hermann2021: "Hermann P, et al. Biomarkers and diagnostic guidelines for sporadic Creutzfeldt-Jakob disease. Lancet Neurol 2021;20:235-246. doi:10.1016/S1474-4422(20)30477-4",
  satyadev2026: "Satyadev N, et al. Standardizing 'Rapid': Applying the CDR to Define Rapidly Progressive Dementia. Neurology 2026;106:e214439. doi:10.1212/WNL.0000000000214439",
  slooter2020: "Slooter AJC, et al. Updated nomenclature of delirium and acute encephalopathy: statement of ten Societies. Intensive Care Med 2020;46(5):1020-1022. doi:10.1007/s00134-019-05907-4",
  brophy2012: "Brophy GM, et al. Guidelines for the evaluation and management of status epilepticus (NCS). Neurocrit Care 2012;17(1):3-23. doi:10.1007/s12028-012-9695-z",
  amin2023: "Amin HP, et al. Diagnosis, Workup, Risk Reduction of Transient Ischemic Attack in the Emergency Department Setting: A Scientific Statement From the AHA. Stroke 2023;54:e109-e121. doi:10.1161/STR.0000000000000418",
  isthLA2024: "Devreese KMJ, et al. An update on laboratory detection and interpretation of antiphospholipid antibodies for diagnosis of antiphospholipid syndrome: guidance from the ISTH-SSC Subcommittee on Lupus Anticoagulant/Antiphospholipid Antibodies. J Thromb Haemost 2024. doi:10.1016/j.jtha.2024.10.022"
};

const entries = [
  {
    id: "first-unprovoked-seizure",
    title: "First unprovoked seizure in an adult",
    searchTerms: ["first seizure", "new-onset seizure", "single seizure", "start AED", "start ASM", "recurrence risk"],
    category: "SEIZURE",
    consultQuestion: "First seizure — provoked or unprovoked, what workup, and should an antiseizure medication be started?",
    keyHistory: ["Witness account: onset, focal features, duration, postictal state", "Provoking factors: sleep deprivation, alcohol or benzodiazepine withdrawal, drugs, hypoglycemia, hyponatremia, acute brain insult within 7 days", "Prior unrecognized events: staring spells, myoclonic jerks, nocturnal events, déjà vu", "Prior brain insult (stroke, trauma, CNS infection)", "Seizure from sleep (nocturnal)", "Driving and occupation"],
    keyExam: ["Focal deficits (structural cause)", "Lateral tongue bite, injuries", "Mental status return to baseline"],
    redFlags: ["Not back to baseline — consider nonconvulsive status (EEG)", "Focal deficit, fever, immunocompromise, anticoagulation", "Second seizure in the ED"],
    differential: [
      dx("Acute symptomatic (provoked) seizure", ["Metabolic derangement, withdrawal, toxin, acute stroke/ICH/infection/trauma"], true),
      dx("Unprovoked seizure / new epilepsy", ["No acute cause; prior brain insult, epileptiform EEG, lesion on MRI"]),
      dx("Convulsive syncope", ["Brief jerks after loss of tone, quick reorientation, triggers or prodrome"]),
      dx("Functional/dissociative seizures", ["Eyes closed, prolonged waxing-waning movements, ictal crying"]),
      dx("Nonconvulsive status epilepticus", ["Persistent altered mental status after the event"], true)
    ],
    workup: [
      w("Glucose, BMP with Ca/Mg/phos, CBC", "STAT", [], ["Excludes provoked causes"]),
      w("Toxicology, ethanol; pregnancy test", "URGENT", [], []),
      w("CT head", "STAT", ["Focal deficit, trauma, anticoagulation, not at baseline"], []),
      w("MRI brain (epilepsy protocol if available)", "URGENT", [], ["Significant imaging abnormality raises recurrence risk (Level B)"]),
      w("Routine EEG", "URGENT", [], ["Epileptiform abnormality raises recurrence risk (Level A)"]),
      w("Continuous EEG", "IF_INDICATED", ["Not back to baseline"], ["See nonconvulsive-status-epilepticus"]),
      w("LP", "IF_INDICATED", ["Fever, meningismus, immunocompromise"], []),
      w("ECG", "URGENT", [], ["Arrhythmic syncope mimic"])
    ],
    decisionRules: rules(
      ["Unprovoked first seizure — counseling", "Recurrence risk is highest in the first 2 years (21–45%)", "STRONG", ["AAN/AES 2015: Level A"]],
      ["Prior brain insult (stroke, trauma) or epileptiform EEG", "Higher recurrence risk", "STRONG", ["AAN/AES 2015: Level A"]],
      ["Significant brain-imaging abnormality or nocturnal seizure", "Higher recurrence risk", "MODERATE", ["AAN/AES 2015: Level B"]],
      ["Considering immediate ASM", "Immediate ASM likely lowers 2-year recurrence vs waiting for a second seizure", "MODERATE", ["AAN/AES 2015: Level B"]],
      ["Considering immediate ASM", "Immediate ASM may not improve quality of life", "WEAK", ["AAN/AES 2015: Level C"]],
      ["Long-term outlook", "Immediate ASM is unlikely to improve sustained remission beyond 3 years", "MODERATE", ["AAN/AES 2015: Level B"]],
      ["Starting an ASM", "Adverse effects in 7–31%, mostly mild and reversible", "MODERATE", ["AAN/AES 2015: Level B"]],
      ["Recurrence risk ≥60% over 10 years after one unprovoked seizure", "Meets the ILAE practical definition of epilepsy", "CONSENSUS", ["ILAE 2014 definition, cited in AAN/AES 2015"]]
    ),
    initialSteps: ["Provoked seizure: treat the cause; ASM usually not needed long term", "ASM choice and loading: see convulsive-status-epilepticus calculators (levetiracetam, lacosamide, valproate)"],
    recsTemplate: [
      "MRI brain with and without contrast (epilepsy protocol if available)",
      "Routine EEG (sleep-deprived if outpatient)",
      "Seizure precautions; no driving per state law",
      "ASM: [start / defer — shared decision; recurrence risk discussed]",
      "Outpatient neurology/epilepsy follow-up"
    ],
    disposition: ["Usually discharge after workup if back to baseline", "Outpatient EEG/MRI acceptable if not done inpatient"],
    calculatorIds: ["levetiracetam-load", "lacosamide-load"],
    institutionVaries: ["Michigan driving restriction rules — check current state law before counseling", "Inpatient vs outpatient EEG/MRI access"],
    pearls: ["Risk factors may not add up — no formula combines them; individualize (AAN/AES 2015, quoting ILAE)", "After a second unprovoked seizure, recurrence risk is ~57% at 1 year and 73% at 4 years (AAN/AES 2015)"],
    verify: [],
    relatedIds: ["acute-neuro:convulsive-status-epilepticus", "acute-neuro:nonconvulsive-status-epilepticus", "consult-workups:syncope-vs-seizure"],
    sources: [S.krumholz2015],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "syncope-vs-seizure",
    title: "Transient loss of consciousness: syncope vs seizure",
    searchTerms: ["syncope", "convulsive syncope", "TLOC", "seizure vs syncope", "pseudosyncope", "tilt table"],
    category: "SEIZURE",
    consultQuestion: "Passed out with jerking — seizure or syncope? Does the patient need an EEG or head imaging?",
    keyHistory: ["Prodrome: lightheadedness, warmth, nausea, tunnel vision (reflex syncope) vs none (cardiac)", "Posture and triggers: standing, pain, micturition, cough, medical setting", "Exertional or supine onset, palpitations (cardiac)", "Duration of jerks and of confusion afterward", "Family history of sudden death <50 y", "Known heart disease"],
    keyExam: ["Orthostatic BP and HR: lying, sitting, standing immediately and at 3 min", "Murmurs, gallops, rhythm", "Basic neuro exam for focal deficits"],
    redFlags: ["Exertional or supine syncope, palpitations, structural heart disease, abnormal ECG — cardiac workup now", "Family history of premature sudden death", "Focal neurological findings or significant head injury"],
    differential: [
      dx("Cardiac (arrhythmic or structural) syncope", ["Older, male, known heart disease, no prodrome, exertional or supine"], true),
      dx("Reflex (vasovagal/situational) syncope", ["Younger, standing, prodrome, triggers"]),
      dx("Orthostatic hypotension, including neurogenic", ["Positional onset; parkinsonism or neuropathy"]),
      dx("Epileptic seizure", ["Prolonged convulsions, marked postictal confusion, lateral tongue bite"], true),
      dx("Psychogenic pseudosyncope / functional seizures", ["Frequent episodes, eyes closed, normal BP/HR during event"])
    ],
    workup: [
      w("Detailed history and physical including orthostatics", "STAT", [], ["COR I, B-NR"]),
      w("12-lead ECG", "STAT", [], ["COR I, B-NR"]),
      w("Cardiac monitoring / echo per cardiology risk", "IF_INDICATED", ["Suspected cardiac syncope"], []),
      w("Routine EEG", "IF_INDICATED", ["Specific features suggesting seizure"], ["Not routine: COR III: No Benefit, B-NR (diagnostic yield 0.7%)"]),
      w("CT or MRI head", "IF_INDICATED", ["Focal neurological findings or head injury"], ["Not routine: COR III: No Benefit, B-NR (yield ~1% CT, 0.24% MRI)"]),
      w("Carotid imaging", "IF_INDICATED", ["Focal neurological findings"], ["Not routine: COR III: No Benefit, B-NR"]),
      w("Tilt-table testing (± simultaneous EEG and hemodynamics)", "IF_INDICATED", ["History can't separate convulsive syncope, epilepsy and pseudosyncope"], ["Tilt COR IIa, B-NR; tilt + EEG COR IIa, C-LD"])
    ],
    decisionRules: rules(
      ["All syncope", "Detailed history and physical exam", "STRONG", ["ACC/AHA/HRS 2017: COR I, LOE B-NR"]],
      ["All syncope", "Resting 12-lead ECG", "STRONG", ["ACC/AHA/HRS 2017: COR I, LOE B-NR"]],
      ["No features suggesting seizure", "No routine EEG", "STRONG", ["ACC/AHA/HRS 2017: COR III: No Benefit, LOE B-NR"]],
      ["No focal findings or head injury", "No routine CT/MRI head", "STRONG", ["ACC/AHA/HRS 2017: COR III: No Benefit, LOE B-NR"]],
      ["No focal neurological findings", "No routine carotid imaging", "STRONG", ["ACC/AHA/HRS 2017: COR III: No Benefit, LOE B-NR"]],
      ["Convulsive syncope vs epilepsy unclear after history", "Tilt-table testing is reasonable in selected patients", "MODERATE", ["ACC/AHA/HRS 2017: COR IIa, LOE B-NR"]],
      ["Syncope vs pseudosyncope vs epilepsy unclear", "Tilt-table with simultaneous EEG and hemodynamic monitoring can be useful", "MODERATE", ["ACC/AHA/HRS 2017: COR IIa, LOE C-LD"]],
      ["Suspected pseudosyncope", "Tilt-table testing is reasonable to establish the diagnosis", "MODERATE", ["ACC/AHA/HRS 2017: COR IIa, LOE B-NR"]]
    ),
    initialSteps: [],
    recsTemplate: [
      "Presentation most consistent with [convulsive syncope / seizure]",
      "Orthostatic vitals; 12-lead ECG; telemetry",
      "EEG and head imaging not indicated in the absence of seizure features or focal findings (ACC/AHA/HRS 2017)",
      "Cardiology evaluation if high-risk features"
    ],
    disposition: ["Disposition by cardiac risk per syncope guideline", "Neurology follow-up only if seizure features or neurogenic orthostatic hypotension"],
    calculatorIds: [],
    institutionVaries: ["Tilt-table and video-EEG availability"],
    pearls: [
      "Myoclonic jerks are common in syncope; prolonged convulsions and marked postictal confusion are uncommon — fatigue after reflex syncope can mimic a postictal state (ACC/AHA/HRS 2017)",
      "About half of patients with questionable or drug-refractory 'epilepsy' have tilt findings suggesting vasovagal syncope (ACC/AHA/HRS 2017)",
      "EEG during syncope: diffuse slowing then flattening; pseudosyncope and functional seizures: normal EEG (ACC/AHA/HRS 2017)",
      "Refer for autonomic testing with parkinsonism, peripheral neuropathy, or progressive autonomic failure (ACC/AHA/HRS 2017)"
    ],
    verify: [],
    relatedIds: ["consult-workups:first-unprovoked-seizure"],
    sources: [S.syncope2017],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "rapidly-progressive-dementia",
    title: "Rapidly progressive dementia (incl. CJD)",
    searchTerms: ["RPD", "CJD", "prion", "RT-QuIC", "14-3-3", "rapid dementia", "Creutzfeldt-Jakob"],
    category: "COGNITION_ENCEPHALOPATHY",
    consultQuestion: "Cognition declining over weeks to months — treatable cause, or CJD?",
    keyHistory: ["Tempo: dementia within 1 year or dependence within 2 years of onset", "Myoclonus, visual or cerebellar symptoms, extrapyramidal or pyramidal signs, akinetic mutism", "Seizures, psychiatric features, sleep disturbance", "Cancer, autoimmune disease, immunosuppression", "Family history (genetic prion disease), prior neurosurgery/dura or growth hormone (iatrogenic CJD)", "Weight loss, alcohol, nutritional risk"],
    keyExam: ["Myoclonus (startle-sensitive)", "Cerebellar signs, visual field or cortical visual deficits", "Parkinsonism, pyramidal signs", "Faciobrachial dystonic seizures (LGI1)"],
    redFlags: ["Seizures or fluctuating consciousness — EEG for nonconvulsive status", "Fever or CSF pleocytosis (infection, autoimmune)", "Subacute decline with cancer history (paraneoplastic)"],
    differential: [
      dx("Autoimmune encephalitis", ["Subacute onset, seizures, psychiatric features, CSF pleocytosis, mesial temporal FLAIR"], true),
      dx("Sporadic CJD", ["Myoclonus, ataxia, cortical ribboning/basal ganglia DWI, RT-QuIC positive"], true),
      dx("Atypical or rapid neurodegenerative disease (Alzheimer, Lewy body, FTD)", ["Most common cause in community series"]),
      dx("Nonconvulsive status epilepticus", ["Fluctuation, subtle twitching"], true),
      dx("CNS infection, vasculitis, neoplasm (lymphoma, gliomatosis)", ["Enhancement, CSF abnormalities"], true),
      dx("Toxic-metabolic and nutritional", ["Wernicke, B12, hepatic, uremic, medication toxicity"], true),
      dx("Vascular (multiple infarcts, CAA-related inflammation)", ["Stepwise course, microbleeds"])
    ],
    workup: [
      w("MRI brain with DWI/ADC, FLAIR, and contrast", "URGENT", [], ["CJD-typical restricted diffusion is best seen on DWI (Hermann 2021)"]),
      w("EEG", "URGENT", [], ["Periodic sharp-wave complexes; excludes NCSE"]),
      w("Routine blood work for reversible causes", "URGENT", [], ["Hermann 2021: routine blood, CSF and imaging should always be done to exclude common differentials"]),
      w("LP: cells, protein, glucose, oligoclonal bands, IgG index, cytology/flow, infection studies", "URGENT", [], []),
      w("CSF RT-QuIC, 14-3-3, total tau (reference prion lab)", "URGENT", ["Suspected prion disease"], ["RT-QuIC should be done in every suspected case if available (Hermann 2021)"]),
      w("Autoimmune encephalitis panels, CSF and serum", "URGENT", [], ["See neural-antibodies"]),
      w("PRNP gene analysis (codon 129, pathogenic mutations)", "IF_INDICATED", ["Suspected CJD — consider in all cases, even without family history"], []),
      w("Body CT / PET for occult cancer", "IF_INDICATED", ["Paraneoplastic antibody or cancer risk"], []),
      w("Brain biopsy", "IF_INDICATED", ["Noninvasive workup inconclusive and a treatable alternative suspected"], [])
    ],
    decisionRules: rules(
      ["Defining RPD", "Dementia (global CDR ≥1) within 1 year, or dependence (CDR ≥2) within 2 years of onset", "EXPERT_OPINION", ["Satyadev 2026 (proposed CDR-based definition; needs validation)"]],
      ["Progressive neuropsychiatric syndrome + positive RT-QuIC (CSF or other tissue)", "Probable sCJD (after excluding other causes)", "CONSENSUS", ["Hermann 2021 amended criteria"]],
      ["Rapidly progressive cognitive impairment + ≥2 of: myoclonus; visual or cerebellar disturbance; pyramidal/extrapyramidal signs; akinetic mutism — plus typical EEG (PSWCs), typical MRI, or positive CSF 14-3-3", "Probable sCJD (after excluding other causes)", "CONSENSUS", ["Hermann 2021 amended criteria"]],
      ["Typical MRI definition", "Restricted diffusion in caudate/putamen (± thalamus) or ≥2 cortical regions (temporal, parietal, occipital); no subcortical white-matter involvement; not isolated thalamic", "CONSENSUS", ["Hermann 2021"]],
      ["Same clinical criteria, duration <2 years, no supportive biomarkers", "Possible sCJD — only after extensive workup excludes alternatives", "CONSENSUS", ["Hermann 2021"]],
      ["Negative biomarkers early", "Repeat testing may help — all markers are less sensitive early and in some subtypes", "CONSENSUS", ["Hermann 2021"]]
    ),
    initialSteps: ["Autoimmune encephalitis suspected: see acute-neuro:autoimmune-encephalitis — don't delay treatment for antibody results", "Suspected CJD: notify infection prevention per policy; contact the national prion surveillance center for RT-QuIC and guidance (Hermann 2021)"],
    recsTemplate: [
      "MRI brain with DWI/ADC, FLAIR, and contrast",
      "EEG (routine; continuous if fluctuating)",
      "LP: cell count, protein, glucose, OCB/IgG index, cytology/flow, infectious studies; send RT-QuIC/14-3-3/t-tau to the prion reference lab",
      "Serum and CSF autoimmune encephalitis panels",
      "Labs for reversible causes per institutional panel"
    ],
    disposition: ["Inpatient workup when decline is rapid or treatable causes are suspected", "Palliative care involvement once prion disease is likely"],
    calculatorIds: [],
    institutionVaries: ["Prion-disease LP and instrument-handling precautions (infection prevention)", "Standard reversible-dementia lab panel"],
    pearls: [
      "In a specialist RPD cohort, autoimmune (30%), neurodegenerative (28%) and prion (19%) causes predominated; in a general cognitive-impairment cohort, Alzheimer disease dominated (Satyadev 2026)",
      "RT-QuIC sensitivity varies 73–97% and it can't distinguish prion disease forms (Hermann 2021)",
      "Autoimmune encephalitis, status epilepticus and ischemia can mimic sCJD clinically and on most surrogate biomarkers (Hermann 2021)"
    ],
    verify: [],
    relatedIds: ["acute-neuro:autoimmune-encephalitis", "acute-neuro:nonconvulsive-status-epilepticus", "acute-neuro:wernicke-encephalopathy", "neural-antibodies:lgi1", "neural-antibodies:nmdar"],
    sources: [S.hermann2021, S.satyadev2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "altered-mental-status",
    title: "Altered mental status: neurology triage",
    searchTerms: ["AMS", "encephalopathy", "confusion", "delirium", "obtunded", "unresponsive"],
    category: "COGNITION_ENCEPHALOPATHY",
    consultQuestion: "Confused or not waking up — structural, seizure, or toxic-metabolic?",
    keyHistory: ["Baseline cognition and tempo of change", "Medications: new sedatives, anticholinergics, opioids, antibiotics (cefepime), ASMs, immune therapies (CAR-T)", "Alcohol use, nutrition (Wernicke)", "Seizure history, witnessed twitching", "Fever, immunosuppression, cancer"],
    keyExam: ["Level of arousal and attention", "Focal deficits, gaze deviation, pupils", "Subtle twitching, nystagmus", "Asterixis, myoclonus", "Meningismus", "Rigidity, hyperthermia, clonus (NMS, serotonin syndrome)"],
    redFlags: ["Focal deficit or asymmetric pupils — urgent imaging", "Fluctuating consciousness or subtle twitching — EEG for NCSE", "Fever, meningismus, immunocompromise — LP", "Rigidity with hyperthermia"],
    differential: [
      dx("Structural lesion (stroke, ICH, mass, hydrocephalus)", ["Focal signs, sudden onset"], true),
      dx("Nonconvulsive status epilepticus", ["Fluctuation, twitching, known epilepsy"], true),
      dx("CNS infection", ["Fever, meningismus, CSF pleocytosis"], true),
      dx("Wernicke encephalopathy", ["Alcohol, malnutrition, bariatric surgery; ophthalmoplegia, ataxia"], true),
      dx("Toxic-metabolic or septic encephalopathy / delirium", ["Abnormal labs, infection, drugs; nonfocal"]),
      dx("PRES", ["Hypertension, renal failure, immunosuppressants; posterior edema"], true),
      dx("Serotonin syndrome / NMS", ["Clonus vs rigidity, hyperthermia, drug exposure"], true)
    ],
    workup: [
      w("Glucose (point-of-care)", "STAT", [], []),
      w("BMP, Ca, Mg, phos, LFTs, ammonia, CBC, TSH, B12", "URGENT", [], []),
      w("Toxicology; medication levels", "URGENT", [], []),
      w("ABG/VBG", "IF_INDICATED", ["Somnolence, lung disease, opioids"], []),
      w("CT head", "STAT", ["Focal deficit, trauma, anticoagulation, unexplained"], []),
      w("MRI brain", "IF_INDICATED", ["No explanation after initial workup"], []),
      w("EEG (continuous if available)", "IF_INDICATED", ["Fluctuation, subtle twitching, unexplained persistent encephalopathy"], []),
      w("LP", "IF_INDICATED", ["Fever, meningismus, immunocompromise, unexplained"], [])
    ],
    decisionRules: [],
    initialSteps: ["Thiamine before glucose if any risk of Wernicke — see acute-neuro:wernicke-encephalopathy", "Delirium management: see acute-neuro:delirium-vs-encephalopathy"],
    recsTemplate: [
      "Labs: BMP, Mg, phos, LFTs, ammonia, CBC, TSH, B12, tox",
      "Review and minimize deliriogenic medications",
      "CT head [if focal/trauma/anticoagulated]; MRI if unexplained",
      "EEG [if fluctuating or unexplained]",
      "Delirium precautions; thiamine if at risk"
    ],
    disposition: ["Neurology signs off if toxic-metabolic cause identified and improving"],
    calculatorIds: [],
    institutionVaries: ["cEEG availability and reading turnaround"],
    pearls: ["Use 'acute encephalopathy' for the process and 'delirium' for the clinical syndrome (Slooter 2020)"],
    verify: [],
    relatedIds: ["acute-neuro:delirium-vs-encephalopathy", "acute-neuro:nonconvulsive-status-epilepticus", "acute-neuro:wernicke-encephalopathy", "acute-neuro:pres", "acute-neuro:serotonin-syndrome", "acute-neuro:bacterial-meningitis"],
    sources: [S.slooter2020, S.brophy2012],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);

// --- Batch A VERIFY fixes ---
const t = d.entries.find((e) => e.id === "tia-workup");
t.pearls = [
  "MRI DWI is positive in ≈40% of patients with TIA symptoms; DWI positivity carries >6-fold higher 1-year recurrent stroke risk (Amin 2023)",
  "ABCD2 ignores posterior-circulation signs, mechanism, and large-artery stenosis — image vessels regardless of score (Amin 2023)",
  "If MRI with DWI is available without delay, NCCT can be skipped (Amin 2023)",
  "No ED neurology? Arrange a neurology visit ideally within 48 h and no later than 1 week (Amin 2023)"
];
t.verify = [];
if (!t.sources.includes(S.amin2023)) t.sources.push(S.amin2023);

const y = d.entries.find((e) => e.id === "young-stroke-workup");
y.workup = y.workup.map((x) =>
  x.test.startsWith("Antiphospholipid antibodies")
    ? { ...x, notes: ["Confirm persistence 12 weeks apart (Kleindorfer)", "Lupus anticoagulant testing is discouraged on anticoagulation (false positives and negatives); DOAC removal or alternate assays only with lab input (ISTH 2024)"] }
    : x.test.startsWith("Factor V Leiden")
    ? { ...x, test: "Factor V Leiden, prothrombin 20210A (genetic tests)" }
    : x
);
y.verify = [];
if (!y.sources.includes(S.isthLA2024)) y.sources.push(S.isthLA2024);

d.version = "0.2.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
