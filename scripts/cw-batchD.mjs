// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: consult-workups batch D (vertigo, vision, diplopia/ptosis, headache) + inpatient-neuropathy PNS 2010 fix
import fs from "node:fs";
const path = "data/consult-workups.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const dx = (name, clues, mustNotMiss = false) => ({ dx: name, clues, mustNotMiss });
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  grace3: "Edlow JA, Carpenter C, et al. Guidelines for reasonable and appropriate care in the emergency department 3 (GRACE-3): Acute dizziness and vertigo in the emergency department. Acad Emerg Med 2023;30:442-486. doi:10.1111/acem.14728",
  crao2021: "Mac Grory B, et al. Management of Central Retinal Artery Occlusion: A Scientific Statement From the AHA. Stroke 2021;52:e282-e294. doi:10.1161/STR.0000000000000366",
  aha2026: "Prabhakaran S, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (AHA/ASA). Stroke 2026;57:e316-e436. doi:10.1161/STR.0000000000000513",
  eular2023: "Dejaco C, et al. EULAR recommendations for the use of imaging in large vessel vasculitis in clinical practice: 2023 update. Ann Rheum Dis 2024;83:741-751. doi:10.1136/ard-2023-224543",
  eggenberger2025: "Eggenberger E. Optic Neuritis. Continuum (Minneap Minn) 2025;31(2, Neuro-ophthalmology):407-435",
  mackay2025: "Mackay DD. Approach to Diplopia. Continuum (Minneap Minn) 2025;31(2, Neuro-ophthalmology):463-478",
  keene2022: "Keene KR, et al. Clinical and imaging clues to the diagnosis and follow-up of ptosis and ophthalmoparesis. J Cachexia Sarcopenia Muscle 2022. doi:10.1002/jcsm.13089",
  sousa2026: "de Sousa IA, et al. Reversible cerebral vasoconstriction syndrome: A narrative review. Headache 2026;66:1162-1180. doi:10.1111/head.70048",
  snnoop2019: "Do TP, et al. Red and orange flags for secondary headaches in clinical practice: SNNOOP10 list. Neurology 2019;92:134-144. doi:10.1212/WNL.0000000000006697",
  sah2023: "Hoh BL, et al. 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage (AHA/ASA). Stroke 2023;54:e314-e370. doi:10.1161/STR.0000000000000436",
  cvt2024: "Saposnik G, et al. Diagnosis and Management of Cerebral Venous Thrombosis: A Scientific Statement From the AHA. Stroke 2024;55:e77-e90. doi:10.1161/STR.0000000000000456",
  pns2010: "Collins MP, et al. Peripheral Nerve Society Guideline on the classification, diagnosis, investigation, and immunosuppressive therapy of non-systemic vasculitic neuropathy: executive summary. J Peripher Nerv Syst 2010;15:176-184. doi:10.1111/j.1529-8027.2010.00281.x"
};

const entries = [
  {
    id: "acute-vertigo-hints",
    title: "Acute dizziness / vertigo: stroke or inner ear?",
    searchTerms: ["vertigo", "dizziness", "HINTS", "AVS", "vestibular neuritis", "BPPV", "Dix-Hallpike", "posterior circulation stroke"],
    category: "NEURO_OPHTH_VESTIBULAR",
    consultQuestion: "Acute dizziness — posterior circulation stroke, or peripheral vestibular?",
    keyHistory: ["Timing and triggers: continuous for days (acute vestibular syndrome, AVS), spontaneous episodes (s-EVS), or triggered by head position (t-EVS)", "New hearing loss or tinnitus", "Headache or neck pain (dissection)", "Vascular risk factors; prior TIA-like episodes", "Migraine history (vestibular migraine)"],
    keyExam: ["Spontaneous and gaze-evoked nystagmus (look straight, left, right)", "HINTS: head impulse, nystagmus, test of skew — only if ongoing dizziness with nystagmus", "Bedside hearing (finger rub) — HINTS plus", "Gait/truncal ataxia grade", "Dix–Hallpike for positional symptoms", "Cranial nerves, limb coordination, visual fields"],
    redFlags: ["Any central HINTS finding: bilaterally normal head impulse, direction-changing/vertical/torsional nystagmus, skew", "Unable to stand or walk unaided (grade 3 ataxia: 100% stroke in one series)", "New unilateral hearing loss (AICA/labyrinthine infarct)", "Severe headache, decreased consciousness — think hemorrhage; CT first"],
    differential: [
      dx("Posterior circulation stroke", ["Central HINTS sign, severe gait ataxia, new hearing loss, vascular risk"], true),
      dx("Vestibular neuritis", ["AVS with direction-fixed horizontal nystagmus, unilateral corrective saccade on head impulse, no skew, hearing intact — all four needed"]),
      dx("Posterior canal BPPV", ["Brief positional vertigo; positive Dix–Hallpike with characteristic nystagmus"]),
      dx("Vestibular migraine, Menière disease", ["Recurrent spontaneous episodes; migraine features or fluctuating hearing"]),
      dx("Posterior circulation TIA / vertebral dissection", ["Spontaneous episodic dizziness with vascular risk, neck pain"], true),
      dx("Cerebellar hemorrhage", ["Headache, vomiting, inability to stand"], true)
    ],
    workup: [
      w("HINTS (± hearing) by a trained examiner", "STAT", ["Acute vestibular syndrome with nystagmus"], ["Head impulse is only valid with ongoing dizziness and spontaneous nystagmus"]),
      w("Dix–Hallpike test", "STAT", ["Triggered episodic vertigo"], []),
      w("MRI brain with DWI + MRA (stroke protocol)", "URGENT", ["Central or equivocal HINTS", "No trained HINTS examiner available", "Severe gait ataxia"], ["MRI sensitivity ≈80–90% in the first 48 h — a negative early MRI doesn't exclude stroke"]),
      w("CTA or MRA head and neck", "IF_INDICATED", ["Spontaneous episodic vertigo with concern for TIA"], []),
      w("Noncontrast CT ± CTA/CTP", "IF_INDICATED", ["Reperfusion candidate", "Suspected hemorrhage", "MRI contraindicated"], ["CT can't rule out ischemic stroke in AVS"])
    ],
    decisionRules: rules(
      ["Emergency clinicians", "Train in HINTS, Dix–Hallpike and Epley; untrained examiners don't apply or interpret them reliably", "CONSENSUS", ["GRACE-3: ungraded good practice statement"]],
      ["AVS with nystagmus", "HINTS by a trained clinician to separate stroke from vestibular neuritis; any central component = central", "STRONG", ["GRACE-3: strong FOR, high certainty"]],
      ["AVS with nystagmus", "Bedside hearing by finger rub — new unilateral loss suggests stroke even if HINTS looks peripheral", "WEAK", ["GRACE-3: conditional FOR, moderate certainty"]],
      ["AVS without nystagmus", "Grade gait unsteadiness to separate central from peripheral", "WEAK", ["GRACE-3: conditional FOR, moderate certainty"]],
      ["AVS", "No routine noncontrast CT or CTA to distinguish stroke from inner ear", "STRONG", ["GRACE-3: strong AGAINST, high certainty"]],
      ["AVS with a trained HINTS examiner available", "Don't use MRI/MRA as the first test before the exam", "STRONG", ["GRACE-3: strong AGAINST, high certainty"]],
      ["AVS with central or equivocal HINTS", "Stroke-protocol MRI with DWI and MRA", "STRONG", ["GRACE-3: strong FOR, high certainty"]],
      ["Spontaneous episodic vestibular syndrome", "No routine CT; CTA or MRA head and neck if concern for TIA", "STRONG", ["GRACE-3: CT strong AGAINST, moderate; CTA/MRA conditional FOR, moderate"]],
      ["Triggered episodic vestibular syndrome", "Dix–Hallpike routinely; no routine CT/CTA; no MRI if typical posterior-canal BPPV confirmed", "STRONG", ["GRACE-3: Dix–Hallpike strong FOR; CT/CTA strong AGAINST; MRI conditional AGAINST (moderate)"]],
      ["Posterior-canal BPPV confirmed", "Epley maneuver at the time of diagnosis", "STRONG", ["GRACE-3: strong FOR, moderate certainty"]],
      ["Vestibular neuritis within 3 days of onset", "Shared decision on short-course steroids", "WEAK", ["GRACE-3: conditional FOR, very low certainty"]]
    ),
    initialSteps: ["Stroke on MRI: see inpatient-stroke-etiology-workup; IVT/EVT per standard criteria"],
    recsTemplate: [
      "HINTS: [head impulse __, nystagmus __, skew __]; hearing __; gait grade __",
      "Exam [central — MRI brain with DWI + MRA head/neck] / [peripheral — no imaging needed]",
      "[BPPV: Epley performed]",
      "Return precautions; vestibular therapy referral"
    ],
    disposition: ["Peripheral AVS with confident exam: discharge with follow-up", "Central or equivocal: admit for MRI and stroke workup"],
    calculatorIds: [],
    institutionVaries: ["After-hours MRI access; tele-neurology/video-oculography for HINTS"],
    pearls: [
      "HINTS by experts: 98% sensitivity, >92% specificity; head impulse can falsely reassure in AICA/labyrinthine infarcts (GRACE-3)",
      "Gait grade predictive value for stroke: grade 1 7%, grade 2 28%, grade 3 100% (GRACE-3)",
      "Horizontal shifts on alternate cover are common and aren't skew; a diagonal refixation counts as worrisome (GRACE-3)"
    ],
    verify: [],
    relatedIds: ["consult-workups:inpatient-stroke-etiology-workup", "consult-workups:tia-workup"],
    sources: [S.grace3],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "acute-vision-loss",
    title: "Acute monocular vision loss",
    searchTerms: ["vision loss", "CRAO", "retinal artery occlusion", "amaurosis fugax", "GCA", "giant cell arteritis", "optic neuritis", "AION"],
    category: "NEURO_OPHTH_VESTIBULAR",
    consultQuestion: "Sudden monocular vision loss — CRAO (a stroke), arteritis, or optic neuritis?",
    keyHistory: ["Onset: sudden painless (CRAO, AION, vitreous hemorrhage, detachment) vs subacute painful with eye movement (optic neuritis)", "Transient episodes first (amaurosis fugax)", "Age >50: headache, jaw claudication, scalp tenderness, polymyalgia symptoms, weight loss (GCA)", "Last known well time", "Vascular risk factors, AF, carotid disease"],
    keyExam: ["Visual acuity, color plates, visual fields", "Relative afferent pupillary defect", "Fundus: retinal whitening with cherry-red spot (CRAO), disc edema (AION, papillitis), normal disc (retrobulbar optic neuritis)", "Temporal artery tenderness or reduced pulse"],
    redFlags: ["Painless sudden monocular loss within 4.5 h — stroke alert", "Age >50 with GCA symptoms — treat without waiting for imaging", "Bilateral or sequential vision loss", "No light perception or progression beyond 2 weeks in presumed optic neuritis"],
    differential: [
      dx("Central retinal artery occlusion (thromboembolic)", ["Sudden painless loss, RAPD, retinal whitening, cherry-red spot"], true),
      dx("Arteritic CRAO / arteritic AION (giant cell arteritis)", ["Age >50, headache, jaw claudication, high ESR/CRP"], true),
      dx("Nonarteritic AION", ["Painless, disc edema, crowded disc, vascular risk"]),
      dx("MS-associated optic neuritis", ["Young, pain on eye movement, RAPD, normal or mildly swollen disc, short-segment enhancement"]),
      dx("AQP4 or MOG optic neuritis", ["Severe loss, bilateral, longitudinally extensive optic nerve lesion; MOG: marked disc edema"], true),
      dx("Retinal detachment, vitreous hemorrhage", ["Floaters, curtain; fundus findings"]),
      dx("Infectious optic neuropathy (syphilis)", ["Risk factors; treatable"], true)
    ],
    workup: [
      w("Ophthalmological exam with dilated fundus (or non-mydriatic fundus camera) and OCT", "STAT", [], ["Needed to diagnose CRAO and exclude hemorrhage/detachment (AHA 2021/2026)"]),
      w("Stroke code workup: NIHSS, noncontrast CT", "STAT", ["Suspected CRAO within the IVT window"], []),
      w("ESR and CRP", "STAT", ["Age >50 or GCA features"], ["Obtain before IVT decision when GCA suspected (AHA 2021)"]),
      w("Temporal ± axillary artery ultrasound (or FDG-PET/MRI); temporal artery biopsy", "URGENT", ["Suspected GCA"], ["Imaging shouldn't delay treatment (EULAR 2023)"]),
      w("Stroke etiology workup: vessel imaging, echo, telemetry", "URGENT", ["CRAO or retinal TIA"], ["See inpatient-stroke-etiology-workup"]),
      w("MRI brain and orbits with contrast", "URGENT", ["Optic neuritis"], []),
      w("AQP4-IgG and MOG-IgG (cell-based)", "URGENT", ["Optic neuritis, especially severe, bilateral, or atypical"], []),
      w("Syphilis serology; consider sarcoid workup", "IF_INDICATED", ["Optic neuropathy"], [])
    ],
    decisionRules: rules(
      ["Nonarteritic CRAO with disabling vision loss, otherwise IVT-eligible, within 4.5 h", "IVT usefulness is uncertain — shared decision after fundus exam and ESR", "WEAK", ["AHA 2026: COR 2b, LOE C-LD"]],
      ["Suspected CRAO", "Triage to the nearest ED as a stroke", "NOT_GRADED", ["Mac Grory 2021 (AHA statement)"]],
      ["CRAO", "Conservative treatments (ocular massage, paracentesis, hemodilution) aren't effective and may harm", "NOT_GRADED", ["Mac Grory 2021"]],
      ["Intra-arterial tPA", "Unproven; consider only early, in endovascular centers, for disabling loss if not IVT candidates", "NOT_GRADED", ["Mac Grory 2021"]],
      ["Suspected GCA", "Early imaging (ultrasound first-line, including axillary arteries); biopsy if imaging unavailable; don't delay treatment", "CONSENSUS", ["EULAR 2023"]],
      ["Presumed optic neuritis", "Clinical diagnosis; MRI brain/orbits; atypical features demand more workup", "EXPERT_OPINION", ["Eggenberger 2025"]]
    ),
    initialSteps: ["GCA: start steroids on suspicion (dosing per rheumatology/ophthalmology) — imaging/biopsy must not delay treatment", "Optic neuritis treatment: see acute-neuro:ms-relapse or acute-neuro:nmosd-mogad-attack"],
    recsTemplate: [
      "Dilated fundus exam / ophthalmology now",
      "ESR, CRP [age >50]",
      "If CRAO: stroke workup — CTA head/neck, TTE, telemetry, A1c, lipids",
      "If optic neuritis: MRI brain and orbits with contrast; AQP4/MOG antibodies"
    ],
    disposition: ["CRAO: admit for stroke workup", "Optic neuritis: inpatient if severe/bilateral or NMOSD/MOGAD suspected"],
    calculatorIds: [],
    institutionVaries: ["Ophthalmology availability after hours; non-mydriatic fundus camera in the ED", "Temporal artery ultrasound expertise"],
    pearls: [
      "Only ~17–18% of untreated CRAO patients regain functional acuity (AHA 2021)",
      "CRAO is arteritic (GCA) in ~5%; thromboembolic in 95% (AHA 2021)",
      "Optic neuritis misdiagnosis is common — 60% of referrals had another diagnosis in one series (Eggenberger 2025)",
      "MS risk after optic neuritis: normal MRI ~15% at 5 y, 25% at 15 y; abnormal MRI ~50% at 5 y, 75% at 15 y (Eggenberger 2025)",
      "Pain on eye movement in ~90% of MS-related optic neuritis; no light perception or progression >2 weeks is atypical (Eggenberger 2025)"
    ],
    verify: [],
    relatedIds: ["consult-workups:inpatient-stroke-etiology-workup", "acute-neuro:ms-relapse", "acute-neuro:nmosd-mogad-attack", "neural-antibodies:aqp4", "neural-antibodies:mog"],
    sources: [S.crao2021, S.aha2026, S.eular2023, S.eggenberger2025],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "diplopia-ptosis",
    title: "Diplopia and ptosis",
    searchTerms: ["double vision", "diplopia", "ptosis", "third nerve palsy", "sixth nerve palsy", "INO", "ocular myasthenia", "skew"],
    category: "NEURO_OPHTH_VESTIBULAR",
    consultQuestion: "New double vision or droopy eyelid — which nerve, and is it an aneurysm, stroke, or myasthenia?",
    keyHistory: ["Monocular (resolves covering the other eye? no → ocular cause) vs binocular", "Horizontal vs vertical; worse at distance or near; worse in which gaze", "Fatigability: worse later in the day, better after rest (MG)", "Headache or eye pain (aneurysm, Tolosa-Hunt, GCA)", "Age >50 with GCA symptoms; vascular risk factors"],
    keyExam: ["Pupils: dilated pupil with third nerve palsy = compressive until proven otherwise", "Ductions/versions, cover testing; slowed adducting saccades (INO)", "Ptosis fatigability, Cogan lid twitch, ice-pack test", "Other cranial nerves, ataxia, areflexia (Miller Fisher), proptosis (thyroid eye disease)"],
    redFlags: ["Third nerve palsy, especially pupil-involving — CTA/MRA now", "Multiple cranial nerves — cavernous sinus, orbital apex, granulomatous disease, Miller Fisher", "Skew deviation or other brainstem signs — stroke", "Bulbar or respiratory symptoms with ocular weakness — myasthenic crisis risk"],
    differential: [
      dx("PCOM aneurysm (third nerve palsy)", ["Pupil involvement, headache"], true),
      dx("Brainstem stroke (skew, INO, nuclear palsies)", ["Other brainstem signs"], true),
      dx("Giant cell arteritis", ["Age >50, headache, jaw claudication"], true),
      dx("Myasthenia gravis", ["Fluctuating, asymmetric ptosis and ophthalmoparesis; pupils spared"]),
      dx("Microvascular cranial nerve palsy", ["Age >50 with vascular risk; resolves over weeks to months — still image"]),
      dx("Cavernous sinus / orbital apex lesion, Tolosa-Hunt", ["Multiple ipsilateral nerves, pain"], true),
      dx("Thyroid eye disease, CPEO, OPMD", ["Restrictive pattern; slowly progressive symmetric ptosis without diplopia (CPEO/OPMD)"]),
      dx("Horner syndrome", ["Mild ptosis with miosis — carotid dissection if acute"], true)
    ],
    workup: [
      w("CTA or MRA head", "STAT", ["Any new third nerve palsy"], ["Screen for PCOM aneurysm; catheter angiography only if suspicion remains high (Mackay 2025)"]),
      w("MRI brain ± orbits with contrast (thin cuts/CISS through the suspected region)", "URGENT", ["Acute III, IV, or VI palsy, even if microvascular suspected", "Other localization"], []),
      w("ESR and CRP", "URGENT", ["Age >50 with new binocular diplopia, even transient"], []),
      w("AChR (± MuSK) antibodies; ice-pack test; repetitive stimulation/single-fiber EMG", "IF_INDICATED", ["Fluctuating ptosis or ophthalmoparesis, pupils spared"], []),
      w("Thyroid function and antibodies", "IF_INDICATED", ["Restrictive pattern, proptosis"], []),
      w("Anti-GQ1b antibody", "IF_INDICATED", ["Ophthalmoplegia with ataxia/areflexia"], []),
      w("CTA neck / MRI neck", "IF_INDICATED", ["Acute Horner syndrome"], ["Carotid dissection"])
    ],
    decisionRules: rules(
      ["Monocular diplopia", "Ocular cause (refractive, dry eye, lens) — ophthalmology, not neuroimaging", "EXPERT_OPINION", ["Mackay 2025"]],
      ["New third nerve palsy", "Vascular imaging (CTA or MRA) plus brain MRI with contrast in all patients", "EXPERT_OPINION", ["Mackay 2025"]],
      ["Age >50 with vascular risk and presumed microvascular III, IV or VI palsy", "Still obtain MRI (61% of nonmicrovascular causes had vascular risk factors) and ESR/CRP", "EXPERT_OPINION", ["Mackay 2025"]],
      ["Normal pupils with diplopia", "Pupil involvement excludes myasthenia as the cause (beware preexisting pupil abnormalities)", "EXPERT_OPINION", ["Mackay 2025"]]
    ),
    initialSteps: ["Myasthenia with bulbar/respiratory symptoms: see acute-neuro:myasthenic-crisis"],
    recsTemplate: [
      "Exam localizes to [right/left CN __ / INO / skew / NMJ pattern]",
      "CTA head [third nerve palsy]; MRI brain/orbits with contrast",
      "ESR, CRP [age >50]",
      "AChR antibodies [if fatigable]",
      "Patching for symptom relief"
    ],
    disposition: ["Admit: pupil-involving third nerve palsy until aneurysm excluded, brainstem stroke, or bulbar MG", "Outpatient neuro-ophthalmology for isolated stable palsies after imaging"],
    calculatorIds: [],
    institutionVaries: ["CISS/thin-cut MRI protocols"],
    pearls: [
      "Pseudo-INO from MG: symmetric saccadic velocities; true INO: slowed adducting saccades (Mackay 2025)",
      "Skew deviation is a supranuclear vertical misalignment — look for lateral medullary stroke (Mackay 2025)",
      "In MG, extraocular muscles are involved in ~80% of patients; weakness fluctuates within the day (Keene 2022)",
      "Cavernous sinus disease: CN III in ~80%, VI ~70%, IV ~30% (Keene 2022)"
    ],
    verify: [],
    relatedIds: ["acute-neuro:myasthenic-crisis", "consult-workups:acute-vertigo-hints"],
    sources: [S.mackay2025, S.keene2022],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "thunderclap-headache",
    title: "Thunderclap headache",
    searchTerms: ["thunderclap", "worst headache", "RCVS", "reversible cerebral vasoconstriction", "sudden headache"],
    category: "HEADACHE",
    consultQuestion: "Explosive headache peaking within a minute — SAH, RCVS, or something else?",
    keyHistory: ["Time to peak and recurrence of thunderclap attacks (recurrent → RCVS)", "Triggers: exertion, sex, Valsalva, bathing, emotion", "Vasoactive drugs: SSRIs/SNRIs, triptans, cannabis, cocaine, amphetamines, decongestants", "Pregnancy or postpartum (first week)", "Neck pain (dissection), positional component (low CSF pressure), visual loss (apoplexy)"],
    keyExam: ["BP (surges common in RCVS)", "Meningismus, focal deficits, papilledema, third nerve palsy, Horner"],
    redFlags: ["Any focal deficit, seizure, or decreased consciousness", "Recurrent thunderclap attacks over days", "Postpartum onset", "Severe hypertension"],
    differential: [
      dx("Aneurysmal SAH", ["CT/LP positive; aneurysm on CTA"], true),
      dx("RCVS", ["Recurrent thunderclaps, triggers, convexity SAH, segmental vasoconstriction that resolves within 3 months"], true),
      dx("Cervical artery dissection", ["Neck pain, Horner"], true),
      dx("Cerebral venous thrombosis", ["Papilledema, seizures, venous infarcts"], true),
      dx("Pituitary apoplexy", ["Visual loss, ophthalmoplegia"], true),
      dx("Spontaneous intracranial hypotension / CSF leak", ["Orthostatic headache, low opening pressure"]),
      dx("PRES, ICH, meningitis", ["Context-specific"], true),
      dx("Primary thunderclap, cough, exertional or sexual headache", ["Normal complete workup"])
    ],
    workup: [
      w("Noncontrast head CT", "STAT", [], []),
      w("LP with opening pressure, cells, xanthochromia", "URGENT", ["CT negative and >6 h from onset or new deficit (SAH guideline)"], ["Also detects meningitis and low CSF pressure (Sousa 2026)"]),
      w("CTA (or MRA) head and neck", "URGENT", [], ["Aneurysm, dissection, vasoconstriction"]),
      w("CT or MR venography", "URGENT", ["CVT features or postpartum"], []),
      w("MRI brain with DWI, FLAIR, SWI", "URGENT", [], ["Convexity SAH, PRES, infarcts, apoplexy"]),
      w("Repeat vessel imaging in 5–7 days", "IF_INDICATED", ["Normal initial workup with high RCVS suspicion"], ["Early RCVS may involve only distal vessels missed by CTA (Sousa 2026)"]),
      w("Urine drug screen", "URGENT", [], [])
    ],
    decisionRules: rules(
      ["Thunderclap headache", "Exclude SAH first — see sah-workup", "STRONG", ["AHA 2023 aSAH: COR 1, LOE B-NR"]],
      ["RCVS-TCH score: recurrent TCH (2), female (3), vasoconstrictive trigger (single 2, multiple 3), BP surge (4)", "Score ≥7 separates RCVS from other TCH causes (sensitivity 80%, specificity 97%) — doesn't replace SAH workup", "EXPERT_OPINION", ["Cho et al, summarized in Sousa 2026"]],
      ["RCVS2 score: recurrent TCH (5), intracranial carotid affected (−2), vasoconstrictive trigger (3), female (1), SAH (1)", "≥5 confirms RCVS (specificity 99%, sensitivity 90%); ≤2 excludes (specificity 100%, sensitivity 85%)", "EXPERT_OPINION", ["Rocha et al, summarized in Sousa 2026"]],
      ["RCVS confirmed or suspected", "Stop triggers; control severe BP cautiously (avoid hypotension); no corticosteroids", "EXPERT_OPINION", ["Sousa 2026 — steroids associated with worsening and poorer outcomes"]]
    ),
    initialSteps: ["Calcium channel blockers (nimodipine, verapamil) used for headache; no proven disease-modifying effect (Sousa 2026)", "Avoid triptans and other vasoconstrictors"],
    recsTemplate: [
      "CT head; LP with opening pressure if CT negative",
      "CTA head and neck; CTV/MRV [if CVT risk]",
      "MRI brain with SWI",
      "Stop vasoactive drugs [list]; no steroids; no triptans",
      "Repeat vessel imaging in 5–7 days [if RCVS suspected with normal initial study]"
    ],
    disposition: ["Admit RCVS — about a third worsen within 14 days of diagnosis (Sousa 2026)"],
    calculatorIds: [],
    institutionVaries: ["DSA availability for equivocal vasoconstriction"],
    pearls: [
      "RCVS resolves within 3 months; ~95% of hospitalized patients discharged mRS 0–2 (Sousa 2026)",
      "Most postpartum RCVS begins within the first week after delivery (Sousa 2026)",
      "Resume sex and exercise ≥1–2 weeks after full clinical resolution (expert opinion, Sousa 2026)"
    ],
    verify: [],
    relatedIds: ["consult-workups:sah-workup", "vascular-antithrombotics:cvt-anticoagulation", "vascular-antithrombotics:cervical-artery-dissection", "acute-neuro:pres"],
    sources: [S.sah2023, S.sousa2026, S.cvt2024],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "secondary-headache-red-flags",
    title: "Headache: when to work up for a secondary cause (SNNOOP10)",
    searchTerms: ["headache red flags", "SNNOOP10", "secondary headache", "new headache", "when to image headache"],
    category: "HEADACHE",
    consultQuestion: "Inpatient with headache — primary, or does this need imaging/LP?",
    keyHistory: ["Systemic symptoms, fever", "Cancer history", "Onset sudden; age >65 at onset", "Change in pattern or new headache", "Positional; precipitated by cough, sneeze, exercise", "Progressive; pregnancy/puerperium", "Trauma; immunosuppression (HIV); analgesic overuse or new drug"],
    keyExam: ["Neurologic deficits, decreased consciousness", "Papilledema", "Painful red eye with autonomic features", "Temporal artery tenderness"],
    redFlags: ["Thunderclap onset — see thunderclap-headache", "Papilledema or focal deficit", "Fever with meningismus", "New headache over 50/65 with GCA features"],
    differential: [
      dx("Primary headache (migraine, tension-type, cluster)", ["Long stable pattern, normal exam"]),
      dx("SAH, ICH, CVT, dissection, RCVS", ["Sudden onset"], true),
      dx("Meningitis/encephalitis", ["Fever, meningismus"], true),
      dx("Mass lesion / raised ICP / IIH", ["Progressive, positional, papilledema"], true),
      dx("Giant cell arteritis", ["Older, jaw claudication, high ESR/CRP"], true),
      dx("Intracranial hypotension", ["Orthostatic"]),
      dx("Medication-overuse headache, drug-induced", ["Analgesic overuse, new drug"])
    ],
    workup: [
      w("Neuroimaging (CT or MRI)", "IF_INDICATED", ["Any SNNOOP10 red flag"], []),
      w("LP with opening pressure", "IF_INDICATED", ["Fever/meningismus, thunderclap with negative CT, suspected IIH or low pressure"], []),
      w("ESR, CRP", "IF_INDICATED", ["Age >50 new headache"], []),
      w("CTV/MRV", "IF_INDICATED", ["Papilledema, postpartum, prothrombotic state"], [])
    ],
    decisionRules: rules(
      ["New headache in a patient with no red flags and a typical primary pattern", "Workup not needed; a standard battery in every patient adds false positives and incidentalomas", "EXPERT_OPINION", ["Do 2019 (SNNOOP10)"]],
      ["Any SNNOOP10 flag: Systemic symptoms incl. fever; Neoplasm history; Neurologic deficit or decreased consciousness; Onset sudden; Older age (onset >65); Pattern change or new onset; Positional; Precipitated by sneeze/cough/exercise; Papilledema; Progressive/atypical; Pregnancy/puerperium; Painful eye with autonomic features; Posttraumatic onset; Pathology of the immune system (e.g., HIV); Painkiller overuse or new drug", "Investigate for a secondary cause guided by the specific flag", "EXPERT_OPINION", ["Do 2019 (SNNOOP10); sensitivity/specificity mostly unknown — no prospective validation"]]
    ),
    initialSteps: [],
    recsTemplate: [
      "No red flags; consistent with [migraine/tension-type]; no imaging needed",
      "[Red flag present: __] → [CT/MRI, LP, ESR/CRP as indicated]"
    ],
    disposition: ["Outpatient headache follow-up for primary headache"],
    calculatorIds: [],
    institutionVaries: [],
    pearls: ["Neurologists estimate ~18% of headache patients have a secondary cause (Do 2019)"],
    verify: [],
    relatedIds: ["consult-workups:thunderclap-headache", "consult-workups:sah-workup", "acute-neuro:bacterial-meningitis"],
    sources: [S.snnoop2019],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);

// --- inpatient-neuropathy: PNS 2010 vasculitic neuropathy guideline ---
const n = d.entries.find((e) => e.id === "inpatient-neuropathy");
n.workup = n.workup.map((x) =>
  x.test.startsWith("ESR/CRP, ANCA")
    ? w("Vasculitic neuropathy panel: CBC with eosinophils, chemistry, UA, HbA1c, ESR, CRP, ANA, RF, ANCA, SPEP with immunofixation, complement (C3, C4), cryoglobulins, HBsAg, HCV antibody, chest X-ray", "IF_INDICATED", ["Painful multifocal or stepwise neuropathy"], ["PNS 2010 Table 7 routine studies (Good Practice Point)"])
    : x.test.startsWith("Nerve (± muscle) biopsy")
    ? w("Nerve biopsy (with peroneus brevis muscle biopsy through the same incision when possible) of an affected nerve", "IF_INDICATED", ["Suspected nonsystemic vasculitic neuropathy"], ["Required to diagnose NSVN; optional with established systemic vasculitis or diabetic radiculoplexus phenotype (PNS 2010)"])
    : x
);
n.decisionRules.push(
  { order: 3, condition: "Sensory or sensorimotor, asymmetric/multifocal, lower-limb and distal predominant, painful, acute relapsing, non-demyelinating EMG", recommendation: "Clinically typical for vasculitic neuropathy — vasculitis panel and biopsy planning", evidenceLevel: "CONSENSUS", evidenceNote: ["PNS 2010: Good Practice Point"] },
  { order: 4, condition: "Proximal signs, proximal or mixed axonal/demyelinating EMG, or suspected sarcoid, malignancy, or meningeal infection", recommendation: "LP should be considered", evidenceLevel: "CONSENSUS", evidenceNote: ["PNS 2010: Good Practice Point"] }
);
n.pearls.push("PR3/MPO-ANCA, mixed cryoglobulins, ESR ≥100 mm/h, other-organ involvement, or a predisposing condition point to systemic rather than nonsystemic vasculitis (PNS 2010)");
n.verify = [];
if (!n.sources.includes(S.pns2010)) n.sources.push(S.pns2010);

d.version = "0.5.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
