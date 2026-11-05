// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: consult-workups batch B part 2 (TGA, FND) + Michigan driving rule on first seizure
import fs from "node:fs";
const path = "data/consult-workups.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const dx = (name, clues, mustNotMiss = false) => ({ dx: name, clues, mustNotMiss });
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  ropper2023: "Ropper AH. Transient Global Amnesia. N Engl J Med 2023;388:635-640. doi:10.1056/NEJMra2213867",
  aybek2022: "Aybek S, Perez DL. Diagnosis and management of functional neurological disorder. BMJ 2022;376:o64. doi:10.1136/bmj.o64",
  amin2023: "Amin HP, et al. Diagnosis, Workup, Risk Reduction of Transient Ischemic Attack in the Emergency Department Setting: A Scientific Statement From the AHA. Stroke 2023;54:e109-e121. doi:10.1161/STR.0000000000000418"
};

const entries = [
  {
    id: "tga-vs-tia",
    title: "Transient global amnesia vs TIA or seizure",
    searchTerms: ["TGA", "transient global amnesia", "amnesia", "repetitive questioning", "transient epileptic amnesia"],
    category: "COGNITION_ENCEPHALOPATHY",
    consultQuestion: "Sudden memory loss with repetitive questions, now resolving — TGA, or stroke/seizure needing workup?",
    keyHistory: ["Witness account: repetitive stereotyped questions, preserved identity and alertness", "Duration (typically hours; mean ~6 h, most 2–12 h)", "Precipitant: cold water, exertion, emotional shock, intercourse, pain, procedures", "Prior similar episodes, their length and frequency", "Head trauma, seizure features (olfactory aura, automatisms), drugs/alcohol, hypnotics, hypoglycemia"],
    keyExam: ["Attention and orientation to person intact", "No focal signs, ataxia, vertigo, visual field cut", "Bedside cognition otherwise intact apart from memory"],
    redFlags: ["Focal signs, ataxia, vertigo, visual symptoms — posterior circulation ischemia", "Clouded consciousness or inattention — not TGA", "Brief (15–30 min) recurrent episodes, olfactory hallucinations — transient epileptic amnesia", "Memory not recovered by 24 h"],
    differential: [
      dx("Transient global amnesia", ["Witnessed, isolated anterograde amnesia with repetitive questions, resolves <24 h, older adult"]),
      dx("Posterior circulation TIA/stroke (thalamic, hippocampal, PCA)", ["Focal signs, vertigo, visual field loss, persisting deficit"], true),
      dx("Transient epileptic amnesia", ["Short (15–30 min), recurrent weeks apart, younger, olfactory hallucinations, waking episodes"], true),
      dx("Toxic-metabolic or drug-induced amnesia", ["Hypoglycemia, alcohol, benzodiazepines/hypnotics; inattention"], true),
      dx("Concussive amnesia", ["Head trauma, possibly unwitnessed"]),
      dx("Functional amnesia", ["Loss of personal identity, implausible history"])
    ],
    workup: [
      w("Point-of-care glucose", "STAT", [], []),
      w("Basic labs and toxicology", "URGENT", ["Any doubt about alertness or exposure"], []),
      w("Brain imaging (MRI with DWI preferred)", "URGENT", [], ["Usually done to reassure; DWI dots in the hippocampus appear 12–48 h after onset in ~70% — an early normal MRI doesn't exclude them, and their presence supports TGA rather than stroke"]),
      w("EEG", "IF_INDICATED", ["Recurrent brief episodes, epileptic features, waking amnesia"], []),
      w("Vessel imaging and cardiac workup", "IF_INDICATED", ["Atypical features suggesting TIA/stroke"], ["See tia-workup"])
    ],
    decisionRules: rules(
      ["Hodges–Warlow criteria all met: witnessed; clear anterograde amnesia; no clouding of consciousness, other cognitive deficit or loss of identity; resolves within 24 h; no focal signs; no epileptic features; no recent head injury or active epilepsy", "Diagnose TGA; extensive evaluation generally not needed", "EXPERT_OPINION", ["Ropper 2023 review (criteria adapted from Hodges and Warlow); views differ on how much workup is needed"]],
      ["Atypical features: global confusion, seizures, ataxia, vertigo, or deficits beyond memory", "TGA diagnosis is doubtful — work up for TIA/stroke, seizure, toxic-metabolic cause", "EXPERT_OPINION", ["Ropper 2023"]]
    ),
    initialSteps: ["Observe until memory formation recovers; reassure patient and family"],
    recsTemplate: [
      "Presentation consistent with transient global amnesia",
      "MRI brain with DWI [ideally 12–48 h after onset if done for diagnosis]",
      "No antithrombotic changes for TGA alone",
      "Return precautions; recurrence ~15% over years"
    ],
    disposition: ["Discharge once amnesia has resolved if typical", "Neurology follow-up if atypical or recurrent"],
    calculatorIds: [],
    institutionVaries: ["Routine admission vs ED observation for MRI"],
    pearls: [
      "Ischemic stroke risk is not increased after TGA in most series; one large Korean propensity analysis suggested a minimally higher risk (Ropper 2023)",
      "Repetitive questioning is sensitive but not specific — basilar ischemia can produce spotty amnesia with slower, non-stereotyped questioning (Ropper 2023)",
      "About 15% have recurrences, roughly 2 years apart on average (Ropper 2023)"
    ],
    verify: [],
    relatedIds: ["consult-workups:tia-workup", "consult-workups:first-unprovoked-seizure"],
    sources: [S.ropper2023, S.amin2023],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "functional-neurologic-symptoms",
    title: "Functional neurological disorder (FND)",
    searchTerms: ["FND", "functional weakness", "functional seizures", "PNES", "dissociative seizures", "conversion disorder", "Hoover"],
    category: "FUNCTIONAL",
    consultQuestion: "Weakness or seizure-like events that don't fit — functional? How do we make and explain the diagnosis?",
    keyHistory: ["Abrupt onset, fluctuation, physical or emotional trigger (often minor injury or illness)", "Comorbid pain, fatigue, dissociation, prior functional symptoms", "Event semiology from witnesses; home videos of typical events", "Known epilepsy or other neurological disease (FND can co-exist)"],
    keyExam: ["Hoover sign; hip abductor sign", "Give-way weakness, co-contraction, drift without pronation", "Distractibility and variability; entrainment of tremor", "Functional gait signs (leg dragging, knee buckling, falls toward support, chair test)", "During an event: closed eyes resisting opening, asynchronous movements, side-to-side head movements, waxing-waning course, ictal crying, recall of events"],
    redFlags: ["Signs that don't fit FND (true pronator drift, Babinski, objective sensory level, atrophy)", "First event in older adults, or injury and incontinence patterns typical of epilepsy", "Possible status epilepticus in a prolonged event"],
    differential: [
      dx("Functional neurological disorder (rule-in diagnosis)", ["Positive signs of internal inconsistency"]),
      dx("Acute stroke or structural lesion", ["Signs consistent with neuroanatomy, abrupt deficits"], true),
      dx("Epilepsy, including frontal lobe seizures", ["Stereotyped brief events from sleep; asynchronous movements possible in frontal seizures"], true),
      dx("Status epilepticus", ["Prolonged event — don't assume functional"], true),
      dx("FND co-existing with other neurological disease", ["~20% of functional seizure patients also have epilepsy; functional signs reported in Parkinson disease and MS"])
    ],
    workup: [
      w("Imaging/labs appropriate to the presenting complaint", "URGENT", [], ["E.g., stroke code imaging for acute weakness — FND doesn't skip standard emergencies"]),
      w("Interictal EEG", "IF_INDICATED", ["Seizure-type symptoms"], []),
      w("Video-EEG capturing a typical event", "IF_INDICATED", ["Seizure-type symptoms"], ["Gold standard"])
    ],
    decisionRules: rules(
      ["Weakness, movement, or gait symptoms", "Make a rule-in diagnosis from positive signs (DSM-5) — not by exclusion", "EXPERT_OPINION", ["Aybek 2022 review"]],
      ["Seizure-type events: suggestive history/witness account and normal interictal EEG", "Possible functional seizures", "CONSENSUS", ["ILAE staged criteria, as summarized in Aybek 2022"]],
      ["Experienced clinician sees an event (in person or video) with positive signs, normal interictal EEG", "Probable", "CONSENSUS", ["ILAE staged criteria"]],
      ["Semiology seen plus normal ambulatory ictal EEG of a typical event", "Clinically established", "CONSENSUS", ["ILAE staged criteria"]],
      ["Typical event captured on video-EEG", "Documented", "CONSENSUS", ["ILAE staged criteria"]]
    ),
    initialSteps: ["Explain the diagnosis by showing the positive signs; name it as a common, treatable disorder", "Refer to FND-informed physiotherapy/occupational/speech therapy and psychotherapy as fits the subtype (Aybek 2022)"],
    recsTemplate: [
      "Exam shows positive signs of functional weakness: [Hoover positive, give-way, drift without pronation]",
      "Diagnosis of functional neurological disorder explained to the patient using these signs",
      "No further neurological workup needed for these symptoms [if standard workup done]",
      "PT/OT with FND experience; outpatient neurology and psychotherapy referral",
      "Avoid ASM escalation for functional seizures; epilepsy monitoring unit if diagnosis uncertain"
    ],
    disposition: ["Discharge with therapy referrals when the standard emergency workup is negative", "EMU admission for uncertain seizure-type events"],
    calculatorIds: [],
    institutionVaries: ["FND physiotherapy program availability", "EMU access"],
    pearls: [
      "Hoover sign: pooled specificity 99.5%, sensitivity 61% (5 studies) (Aybek 2022)",
      "Drift without pronation: specificity 96%, sensitivity 78%; give-way weakness: specificity 97%, sensitivity 67% (Aybek 2022)",
      "Event signs: eyes closed (specificity 98%, sensitivity 96%), waxing-waning course (100%, 94%), long duration >2 min (93%, 65%) — duration can be short in frontal lobe epilepsy (Aybek 2022)",
      "Misdiagnosis rates since 1970 are low, 1–4% (Aybek 2022)"
    ],
    verify: [],
    relatedIds: ["consult-workups:first-unprovoked-seizure", "consult-workups:syncope-vs-seizure"],
    sources: [S.aybek2022],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);

// --- First seizure: Michigan driving rule (user-confirmed) ---
const f = d.entries.find((e) => e.id === "first-unprovoked-seizure");
f.institutionVaries = f.institutionVaries.filter((x) => !x.startsWith("Michigan driving"));
const mi = "Michigan: no driving until 6 months seizure-free (confirmed by you, 2026-11-04)";
if (!f.pearls.includes(mi)) f.pearls.push(mi);
f.recsTemplate = f.recsTemplate.map((x) => (x.startsWith("Seizure precautions") ? "Seizure precautions; no driving until 6 months seizure-free (Michigan)" : x));

d.version = "0.3.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
