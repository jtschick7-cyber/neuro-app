// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: create data/consult-workups.json with batch A (vascular consults)
import fs from "node:fs";
const path = "data/consult-workups.json";
const d = fs.existsSync(path)
  ? JSON.parse(fs.readFileSync(path, "utf8"))
  : { title: "Consult workups", version: "0.1.0", schemaVersion: "1.0.0", lastUpdated: "2026-11-04", entries: [] };

const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const dx = (name, clues, mustNotMiss = false) => ({ dx: name, clues, mustNotMiss });
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  aha2026: "Prabhakaran S, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (AHA/ASA). Stroke 2026;57:e316-e436. doi:10.1161/STR.0000000000000513",
  sec2021: "Kleindorfer DO, et al. 2021 Guideline for the Prevention of Stroke in Patients With Stroke and Transient Ischemic Attack (AHA/ASA). Stroke 2021;52:e364-e467. doi:10.1161/STR.0000000000000375",
  ich2022: "Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage (AHA/ASA). Stroke 2022;53:e282-e361. doi:10.1161/STR.0000000000000407",
  sah2023: "Hoh BL, et al. 2023 Guideline for the Management of Patients With Aneurysmal Subarachnoid Hemorrhage (AHA/ASA). Stroke 2023;54:e314-e370. doi:10.1161/STR.0000000000000436",
  navi2026: "Navi BB, et al. Classification and Management of Ischemic Stroke in Patients With Active Cancer: A Scientific Statement From the AHA. Stroke 2026;57:e160-e173. doi:10.1161/STR.0000000000000517",
  cvt2024: "Saposnik G, et al. Diagnosis and Management of Cerebral Venous Thrombosis: A Scientific Statement From the AHA. Stroke 2024;55:e77-e90. doi:10.1161/STR.0000000000000456",
  miller2026: "Miller EC, et al. Prevention and Treatment of Maternal Stroke in Pregnancy and Postpartum: A Scientific Statement From the AHA (endorsed by ACOG). Stroke 2026;57:e127-e145. doi:10.1161/STR.0000000000000514"
};

// Shared Kleindorfer 2021 diagnostic rules (stroke and TIA)
const K = {
  ecg: ["Suspected stroke or TIA", "12-lead ECG to screen for AF/flutter and other cardiac disease", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-R", "AHA 2026: baseline ECG COR 1, C-LD — don't delay IVT/EVT"]],
  within48: ["Ischemic stroke or TIA", "Etiologic workup completed or underway within 48 h of onset", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-NR"]],
  carotid: ["Anterior-circulation infarct or TIA, revascularization candidate", "Cervical carotid imaging — duplex, CTA or MRA", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-NR"]],
  brain: ["Suspected stroke or TIA", "CT or MRI brain to confirm the diagnosis", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-NR"]],
  labs: ["Confirmed ischemic cerebrovascular disease", "CBC, PT, PTT, glucose, HbA1c, creatinine, lipid profile (fasting not required)", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-NR"]],
  troponin: ["Suspected acute stroke", "Baseline troponin — don't delay IVT/EVT", "STRONG", ["AHA 2026: COR 1, LOE B-NR"]],
  intracranial: ["Ischemic stroke or TIA", "Noninvasive intracranial and vertebrobasilar imaging (MRA or CTA) for atherosclerosis, dissection, moyamoya, vasculopathy", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE C-LD"]],
  echo: ["Cryptogenic stroke", "Echocardiography with or without contrast (bubble) for cardiac source or shunt", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-R"]],
  monitor: ["Cryptogenic stroke, no contraindication to anticoagulation", "Long-term rhythm monitoring (mobile outpatient telemetry, implantable loop recorder) for intermittent AF", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-R"]],
  tee: ["ESUS", "TEE, cardiac CT or cardiac MRI might be reasonable", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"]],
  tcd: ["PFO closure being considered", "TCD with bubble/embolus detection might be reasonable to screen for right-to-left shunt", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"]],
  preAc: ["Anticoagulation planned", "CT or MRI before starting, to assess hemorrhagic transformation and final infarct size", "WEAK", ["Kleindorfer 2021: COR 2b, LOE B-NR"]],
  special: ["Cryptogenic stroke, clinically indicated", "Targeted tests: hypercoagulable state, blood/CSF infection, infections causing CNS vasculitis (e.g., HIV, syphilis), drug use (cocaine, amphetamines), systemic inflammation markers, genetic tests for inherited stroke diseases", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE C-LD"]]
};

const entries = [
  {
    id: "inpatient-stroke-etiology-workup",
    title: "Ischemic stroke: etiologic workup",
    searchTerms: ["stroke workup", "TOAST", "stroke etiology", "secondary prevention workup", "echo", "telemetry", "lipids", "A1c"],
    category: "VASCULAR",
    consultQuestion: "New ischemic stroke — what workup before discharge, and what's the mechanism?",
    keyHistory: ["Last known well and symptom tempo (sudden vs stuttering)", "AF, palpitations, recent MI, cardiac surgery or procedures", "Prior strokes/TIAs and their territories", "Neck pain, trauma or chiropractic manipulation (dissection)", "Current antithrombotics and adherence", "Cancer, pregnancy/postpartum, drug use"],
    keyExam: ["NIHSS", "Cortical vs lacunar syndrome", "Horner syndrome (carotid dissection)", "Carotid bruit, irregular rhythm, murmurs, endocarditis stigmata"],
    redFlags: ["Fluctuating or worsening deficits (large-artery stenosis, branch disease)", "Multiple territories (cardioembolism, endocarditis, cancer)", "Fever with new murmur (endocarditis — no thrombolytics or anticoagulation until clarified)", "Large infarct with early edema (malignant MCA, cerebellar swelling)"],
    differential: [
      dx("Cardioembolism (AF, LV thrombus, endocarditis)", ["Cortical or multi-territory infarcts", "AF on ECG or telemetry"], true),
      dx("Large-artery atherosclerosis", ["≥50% stenosis in the symptomatic territory", "Stuttering course"], true),
      dx("Small-vessel (lacunar)", ["Classic lacunar syndrome", "Small subcortical infarct", "Hypertension, diabetes"]),
      dx("Other determined: dissection, vasculopathy, hypercoagulable, cancer-related", ["Young age, neck pain, active cancer, multiterritory with high D-dimer"], true),
      dx("Undetermined / ESUS", ["Nonlacunar infarct with negative standard workup"])
    ],
    workup: [
      w("CT or MRI brain (MRI with DWI preferred for etiology)", "STAT", [], ["Kleindorfer: COR 1"]),
      w("Vessel imaging: CTA or MRA head and neck (or carotid duplex + intracranial MRA/CTA)", "URGENT", [], ["Cervical carotid imaging COR 1; intracranial COR 2a"]),
      w("12-lead ECG and continuous telemetry", "STAT", [], []),
      w("Troponin", "STAT", [], ["AHA 2026: COR 1"]),
      w("CBC, PT/INR, PTT, glucose, HbA1c, creatinine, lipid panel", "URGENT", [], ["Kleindorfer: COR 1"]),
      w("Transthoracic echo (with bubble if cryptogenic or young)", "ROUTINE", [], ["Cryptogenic: COR 2a"]),
      w("TEE, cardiac CT or cardiac MRI", "IF_INDICATED", ["ESUS", "Suspected endocarditis, LAA thrombus or aortic arch disease"], ["COR 2b"]),
      w("Long-term rhythm monitoring (30-day monitor or loop recorder)", "IF_INDICATED", ["Cryptogenic stroke with no anticoagulation contraindication"], ["COR 2a"]),
      w("Blood cultures", "IF_INDICATED", ["Fever, new murmur, or multiterritory infarcts"], []),
      w("D-dimer", "IF_INDICATED", ["Active cancer or cryptogenic multiterritory stroke"], ["Navi 2026: check late in stay if IVT/EVT given"]),
      w("Special tests (hypercoagulable, infection, drugs, inflammation, genetics)", "IF_INDICATED", ["Cryptogenic stroke, especially young — see young-stroke-workup"], ["COR 2a"])
    ],
    decisionRules: rules(K.within48, K.brain, K.ecg, K.troponin, K.labs, K.carotid, K.intracranial, K.echo, K.monitor, K.tee, K.tcd, K.preAc, K.special),
    initialSteps: ["Antithrombotic choice and timing: see vascular-antithrombotics (DAPT, AF timing, ESUS entries)", "Dysphagia screen before oral intake; VTE prophylaxis per vascular-antithrombotics"],
    recsTemplate: [
      "MRI brain without contrast (if not done)",
      "CTA head and neck (or MRA head/neck)",
      "TTE with bubble study",
      "Continuous telemetry for the admission",
      "HbA1c, lipid panel",
      "Antithrombotic: [per mechanism — see recommendation]",
      "If no mechanism found: 30-day ambulatory monitor or loop recorder at discharge",
      "Stroke clinic follow-up in [x] weeks"
    ],
    disposition: ["Stroke unit admission", "Outpatient: rhythm monitoring if cryptogenic; vascular neurology follow-up"],
    calculatorIds: ["cha2ds2-vasc", "has-bled"],
    institutionVaries: ["Stroke order set contents (lipid/A1c timing, telemetry duration)", "Loop-recorder referral pathway"],
    pearls: ["Workup should be completed or underway within 48 h (COR 1)", "A transient deficit with an infarct on imaging is a stroke, not a TIA — work it up the same way"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:dapt-minor-stroke-tia", "vascular-antithrombotics:af-stroke-anticoag-timing", "vascular-antithrombotics:esus-antithrombotic", "vascular-antithrombotics:cancer-associated-stroke"],
    sources: [S.sec2021, S.aha2026, S.navi2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "young-stroke-workup",
    title: "Young adult stroke (<50): extended workup",
    searchTerms: ["young stroke", "stroke in young", "hypercoagulable workup", "thrombophilia", "APS", "PFO", "cryptogenic young"],
    category: "VASCULAR",
    consultQuestion: "Stroke in a young adult — what beyond the standard workup?",
    keyHistory: ["Personal or family history of VTE, miscarriage, early stroke", "Migraine with aura, oral contraceptives/estrogen, pregnancy or postpartum", "Drugs: cocaine, amphetamines, other stimulants", "Neck trauma, recent infection, HIV/syphilis risk", "Systemic symptoms: rash, arthritis, livedo, weight loss", "Hearing loss, renal disease, neuropathic pain (genetic syndromes)"],
    keyExam: ["Horner syndrome, bruits (dissection)", "Livedo reticularis, skin lesions", "Murmur, signs of endocarditis", "Marfanoid or connective-tissue features"],
    redFlags: ["Headache with stroke-like deficits (dissection, RCVS, CVT)", "Fever or new murmur (endocarditis)", "Pregnancy or postpartum", "Recurrent events in different territories"],
    differential: [
      dx("Cervical artery dissection", ["Neck pain or headache, Horner, preceding trauma"], true),
      dx("Paradoxical embolism via PFO", ["Cortical infarct, no other cause, Valsalva at onset, DVT"]),
      dx("Antiphospholipid syndrome", ["Prior VTE or pregnancy loss, livedo, thrombocytopenia"], true),
      dx("Infective endocarditis", ["Fever, murmur, multiple emboli"], true),
      dx("Reversible cerebral vasoconstriction syndrome", ["Recurrent thunderclap headache, postpartum, vasoactive drugs"], true),
      dx("Cerebral venous thrombosis", ["Headache, seizures, hemorrhagic infarcts not respecting arterial territories"], true),
      dx("Drug-related (cocaine, amphetamines)", ["Toxicology positive, vasospasm"]),
      dx("Primary/secondary CNS vasculitis, moyamoya", ["Multifocal infarcts, abnormal vessel imaging, CSF pleocytosis"]),
      dx("Genetic: CADASIL, Fabry, MELAS, sickle cell disease", ["Family history, migraine, white-matter disease, systemic features"])
    ],
    workup: [
      w("Everything in inpatient-stroke-etiology-workup", "URGENT", [], []),
      w("CTA or MRA head and neck (dissection, vasculopathy)", "URGENT", [], ["MRI with fat-saturated T1 neck if dissection suspected"]),
      w("TTE with agitated saline; TEE if negative and suspicion remains", "URGENT", [], []),
      w("Urine drug screen", "URGENT", [], []),
      w("Pregnancy test (people who can become pregnant)", "STAT", [], []),
      w("Antiphospholipid antibodies (lupus anticoagulant, anticardiolipin, anti-β2GPI)", "IF_INDICATED", ["Cryptogenic stroke, prior VTE or pregnancy loss"], ["Confirm persistence 12 weeks apart (Kleindorfer)", "Lupus anticoagulant unreliable on anticoagulation"]),
      w("Protein C, protein S, antithrombin, factor VIII", "IF_INDICATED", ["Paradoxical embolism or VTE history"], ["Defer or repeat ≥4–6 weeks after stroke; factor VIII up to 6 months (Kleindorfer)"]),
      w("Factor V Leiden, prothrombin 20210A (genetic — valid anytime)", "IF_INDICATED", ["Venous thrombosis, PFO with suspected paradoxical embolism"], []),
      w("Blood cultures", "IF_INDICATED", ["Fever, murmur"], []),
      w("HIV, syphilis serology; ESR/CRP", "IF_INDICATED", ["Cryptogenic stroke"], ["Kleindorfer COR 2a"]),
      w("Lower-extremity duplex", "IF_INDICATED", ["PFO with suspected paradoxical embolism"], []),
      w("Hemoglobin electrophoresis", "IF_INDICATED", ["Sickle cell risk"], []),
      w("LP", "IF_INDICATED", ["Suspected vasculitis or infection"], []),
      w("Genetic testing (NOTCH3, GLA, mtDNA)", "IF_INDICATED", ["Suggestive phenotype or family history"], ["Kleindorfer COR 2a"])
    ],
    decisionRules: rules(
      K.special,
      ["Isolated antiphospholipid antibody, APS criteria not met", "Antiplatelet therapy alone", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-NR"]],
      ["Confirmed APS", "Warfarin is reasonable; target INR 2–3 over >3", "MODERATE", ["Kleindorfer 2021: COR 2a (C-LD; INR target B-R)"]],
      ["Triple-positive APS with thrombosis history", "No rivaroxaban — excess thrombosis vs warfarin", "STRONG", ["Kleindorfer 2021: COR 3: Harm, LOE B-R"]],
      ["Inherited thrombophilia found, no other thrombotic history, cryptogenic stroke", "Antiplatelet therapy is reasonable", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE C-LD"]],
      ["Age 18–60, nonlacunar cryptogenic stroke, PFO", "Closure decision by PFO features — see esus-antithrombotic", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-R (high-risk features)"]]
    ),
    initialSteps: ["Pregnancy or postpartum: see pregnancy-antithrombotics", "Dissection: see cervical-artery-dissection"],
    recsTemplate: [
      "TTE with bubble study; TEE if negative",
      "CTA head/neck (or MRA with fat-sat T1 neck)",
      "Urine drug screen; HIV; RPR; ESR/CRP",
      "Antiphospholipid panel (repeat in 12 weeks if positive)",
      "Defer protein C/S/antithrombin/factor VIII until ≥4–6 weeks out",
      "Lower-extremity duplex if PFO present"
    ],
    disposition: ["Repeat APS testing at 12 weeks", "Hematology referral for confirmed thrombophilia or APS", "PFO heart team referral when criteria met"],
    calculatorIds: [],
    institutionVaries: ["Send-out thrombophilia panel contents and turnaround"],
    pearls: ["Acute-phase protein C/S/antithrombin levels are unreliable — testing too early creates false positives (Kleindorfer)", "Thrombophilia testing rarely changes default antiplatelet therapy unless it shows APS or venous thrombosis (Kleindorfer supportive text)"],
    verify: ["'Lupus anticoagulant unreliable on anticoagulation' and 'factor V Leiden/prothrombin genetics valid anytime' are standard lab facts not in the stored guideline text — confirm with your lab or hematology"],
    relatedIds: ["consult-workups:inpatient-stroke-etiology-workup", "vascular-antithrombotics:esus-antithrombotic", "vascular-antithrombotics:cervical-artery-dissection", "vascular-antithrombotics:pregnancy-antithrombotics", "vascular-antithrombotics:cvt-anticoagulation"],
    sources: [S.sec2021, S.miller2026, S.cvt2024],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "tia-workup",
    title: "Transient ischemic attack (TIA)",
    searchTerms: ["TIA", "transient ischemic attack", "ABCD2", "amaurosis fugax", "mini-stroke"],
    category: "VASCULAR",
    consultQuestion: "Resolved transient deficit — TIA? Admit or expedited outpatient workup?",
    keyHistory: ["Exact symptoms: negative (loss) vs positive (tingling, jerking, visual scintillations)", "Duration and onset — sudden vs marching", "Prior similar episodes and their stereotypy", "Vascular risk factors, AF", "Headache (migraine aura), seizure features, syncope"],
    keyExam: ["Residual deficit (if present, it may be a stroke)", "Carotid bruit, rhythm", "Fundi (retinal emboli after amaurosis)"],
    redFlags: ["Crescendo TIAs", "Symptomatic carotid stenosis", "AF not anticoagulated", "Stuttering motor or speech episodes (capsular warning syndrome)"],
    differential: [
      dx("TIA (focal ischemia without infarct)", ["Sudden negative symptoms in a vascular territory, minutes to hours"], true),
      dx("Minor stroke (infarct on DWI)", ["DWI lesion despite resolution"], true),
      dx("Migraine aura", ["Positive spreading symptoms over minutes, followed by headache"]),
      dx("Focal seizure / postictal deficit", ["Positive motor symptoms, jerking, impaired awareness"]),
      dx("Hypoglycemia", ["Low point-of-care glucose"], true),
      dx("Amyloid spells (CAA)", ["Recurrent stereotyped spreading paresthesias, cortical SAH or lobar microbleeds"], true),
      dx("Syncope, TGA, functional symptoms", ["Global rather than focal symptoms"])
    ],
    workup: [
      w("Point-of-care glucose", "STAT", [], []),
      w("MRI brain with DWI", "URGENT", [], ["If initial CT/MRI shows no infarct, follow-up MRI is reasonable (COR 2a)"]),
      w("Vessel imaging: CTA or MRA head and neck, or carotid duplex", "URGENT", [], []),
      w("ECG and telemetry", "STAT", [], []),
      w("CBC, PT/PTT, glucose, HbA1c, creatinine, lipids", "URGENT", [], []),
      w("TTE", "ROUTINE", [], []),
      w("Long-term rhythm monitoring", "IF_INDICATED", ["No mechanism found"], [])
    ],
    decisionRules: rules(
      K.within48, K.brain, K.ecg, K.carotid, K.labs,
      ["Initial imaging shows no infarct", "Follow-up MRI is reasonable to predict early stroke risk and confirm the diagnosis", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-NR"]],
      ["High-risk TIA (ABCD2 ≥4) or minor stroke, within 24 h, no IVT", "Start DAPT — see dapt-minor-stroke-tia", "STRONG", ["AHA 2026: COR 1, LOE A"]],
      ["TIA with nonvalvular AF", "Start anticoagulation immediately", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE C-EO"]]
    ),
    initialSteps: ["Antithrombotic: see dapt-minor-stroke-tia and af-stroke-anticoag-timing"],
    recsTemplate: [
      "MRI brain with DWI",
      "CTA head and neck",
      "Telemetry; TTE",
      "HbA1c, lipid panel",
      "DAPT: clopidogrel 300–600 mg load + aspirin, then clopidogrel 75 mg + aspirin 81 mg × 21 days, then single agent [if criteria met]",
      "Stroke clinic follow-up"
    ],
    disposition: ["Admit or rapid TIA clinic per local pathway — whole workup within 48 h either way", "Urgent carotid revascularization referral if symptomatic stenosis"],
    calculatorIds: ["abcd2", "cha2ds2-vasc"],
    institutionVaries: ["Admission vs rapid-access TIA clinic criteria"],
    pearls: ["Up to a third of 'TIAs' show DWI infarcts — these are minor strokes and get the same workup", "ABCD2 under-calls risk from carotid stenosis or AF — image vessels and check rhythm regardless"],
    verify: ["'Up to a third show DWI infarcts' and the ABCD2 limitation pearl are from general knowledge — not in the stored guideline text; confirm (AHA 2023 TIA ED statement) or drop"],
    relatedIds: ["consult-workups:inpatient-stroke-etiology-workup", "vascular-antithrombotics:dapt-minor-stroke-tia", "vascular-antithrombotics:af-stroke-anticoag-timing"],
    sources: [S.sec2021, S.aha2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "ich-etiology-workup",
    title: "Intracerebral hemorrhage: cause and early course",
    searchTerms: ["ICH workup", "ICH etiology", "AVM", "CAA", "cerebral amyloid angiopathy", "spot sign", "hemorrhage expansion"],
    category: "VASCULAR",
    consultQuestion: "Spontaneous ICH — what imaging finds the cause, and who needs a DSA?",
    keyHistory: ["Onset time and progression", "Anticoagulants, antiplatelets, thrombolytics", "Hypertension, prior ICH, dementia (CAA)", "Cocaine/amphetamines", "Cancer (hemorrhagic metastases)", "Pregnancy/postpartum (RCVS, CVT, eclampsia)", "Headache before the bleed, seizures (CVT)"],
    keyExam: ["GCS and NIHSS", "Signs of herniation", "Papilledema (CVT)"],
    redFlags: ["Anticoagulant use — reverse immediately", "Declining GCS, hydrocephalus, posterior fossa ICH (surgical)", "Atypical location or young age (macrovascular cause)", "Isolated IVH"],
    differential: [
      dx("Hypertensive arteriolosclerosis", ["Deep (basal ganglia, thalamus, pons) or cerebellar; hypertensive"]),
      dx("Cerebral amyloid angiopathy", ["Lobar, older age, lobar microbleeds, cortical superficial siderosis"]),
      dx("Macrovascular: AVM, aneurysm, dural AV fistula", ["Young, lobar, IVH, calcifications or enlarged vessels at the margin"], true),
      dx("Cerebral venous thrombosis", ["Hyperdense sinus/cortical vein, bilateral or parasagittal hemorrhage, headache"], true),
      dx("Hemorrhagic tumor or metastasis", ["Disproportionate edema, enhancement, known cancer"], true),
      dx("Hemorrhagic transformation of infarct", ["Hemorrhage within an arterial infarct"]),
      dx("Coagulopathy-related", ["Anticoagulant, abnormal labs"], true),
      dx("Cavernous malformation, RCVS, vasculitis, drugs", ["Specific imaging or clinical context"])
    ],
    workup: [
      w("Noncontrast head CT (or MRI)", "STAT", [], ["COR 1, B-NR"]),
      w("CBC, PT/INR, PTT, creatinine/eGFR, glucose, troponin, ECG, toxicology screen, inflammatory markers", "STAT", [], ["ICH 2022: COR 1, LOE C-LD"]),
      w("CTA (± CT venography)", "STAT", ["Lobar ICH age <70; deep/posterior fossa age <45; deep/posterior fossa 45–70 without hypertension"], ["COR 1, B-NR; also useful in all ICH (COR 2a) and to predict expansion (COR 2b)"]),
      w("Repeat head CT within 24 h", "URGENT", [], ["Hemorrhage expansion (COR 2a); sooner if exam worsens"]),
      w("MRI brain with SWI/GRE ± contrast, and MRA", "URGENT", [], ["After negative CTA: identifies CAA, small-vessel disease, cavernoma, tumor (COR 2a)"]),
      w("Catheter DSA", "IF_INDICATED", ["Isolated IVH", "CTA/MRA suggests a macrovascular cause", "High-risk group above with negative CTA/MRI"], ["COR 1 (IVH; positive CTA/MRA), COR 2a (negative noninvasive imaging)"]),
      w("Repeat DSA at 3–6 months", "IF_INDICATED", ["Negative DSA with no clear microvascular or structural cause"], ["COR 2b, C-LD"])
    ],
    decisionRules: rules(
      ["Stroke-like symptoms", "Rapid CT or MRI to confirm ICH", "STRONG", ["ICH 2022: COR 1, LOE B-NR"]],
      ["Lobar ICH <70 y; deep/posterior fossa <45 y; deep/posterior fossa 45–70 y without hypertension", "Acute CTA, consider venography", "STRONG", ["ICH 2022: COR 1, LOE B-NR"]],
      ["Isolated IVH without parenchymal hemorrhage", "Catheter DSA", "STRONG", ["ICH 2022: COR 1, LOE B-NR"]],
      ["CTA or MRA suggests macrovascular cause", "Catheter DSA as soon as possible", "STRONG", ["ICH 2022: COR 1, LOE C-LD"]],
      ["High-risk group, CTA/venography and MRI/MRA negative", "Catheter DSA is reasonable", "MODERATE", ["ICH 2022: COR 2a, LOE B-NR"]],
      ["Negative CTA/venography", "MRI and MRA for nonmacrovascular cause (CAA, deep perforator disease, cavernoma, tumor)", "MODERATE", ["ICH 2022: COR 2a, LOE B-NR"]],
      ["Any ICH, first 24 h", "Serial CT for hemorrhage expansion", "MODERATE", ["ICH 2022: COR 2a, LOE B-NR"]],
      ["Negative DSA, no clear cause", "Repeat DSA at 3–6 months may be reasonable", "WEAK", ["ICH 2022: COR 2b, LOE C-LD"]]
    ),
    initialSteps: ["Anticoagulant-associated: reverse now — see anticoag-reversal-ich", "Antiplatelet-associated: see antiplatelet-ich (no platelets unless surgery)", "VTE: IPC from day 1 — see vte-prophylaxis-stroke-ich"],
    recsTemplate: [
      "CTA head (± CTV) now",
      "Repeat head CT in [6–24] h or with any decline",
      "MRI brain with SWI ± contrast and MRA",
      "Hold all antithrombotics; reversal per protocol",
      "IPC on admission",
      "Neurosurgery now if cerebellar ICH ≥15 mL, brainstem compression, hydrocephalus, or deterioration (ICH 2022: COR 1)"
    ],
    disposition: ["Neuro ICU or stroke unit", "Repeat DSA at 3–6 months if cause still unexplained"],
    calculatorIds: ["ich-score"],
    institutionVaries: ["Who orders and reads the CTA (ED vs stroke team)"],
    pearls: ["Macrovascular cause yield ranges from ~1% (age 51–70, deep, small-vessel signs) to >50% (age 18–50, lobar or posterior fossa, no small-vessel signs) (ICH 2022)", "Isolated IVH: DSA yield ~58% in pooled studies (ICH 2022)"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:anticoag-reversal-ich", "vascular-antithrombotics:antiplatelet-ich", "vascular-antithrombotics:vte-prophylaxis-stroke-ich", "vascular-antithrombotics:restart-antithrombotic-after-ich"],
    sources: [S.ich2022],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "sah-workup",
    title: "Suspected subarachnoid hemorrhage",
    searchTerms: ["SAH", "thunderclap", "worst headache", "xanthochromia", "Ottawa SAH rule", "aneurysm", "LP after CT"],
    category: "VASCULAR",
    consultQuestion: "Sudden severe headache — rule out SAH? CT negative, need LP?",
    keyHistory: ["Time to peak intensity (instant/within 1 h)", "Onset during exertion, sex, Valsalva", "Loss of consciousness, seizure, vomiting", "Neck pain or stiffness", "Prior sentinel headache in recent weeks", "Family history of aneurysm/SAH, polycystic kidney disease"],
    keyExam: ["GCS, Hunt-Hess and WFNS grade", "Meningismus, limited neck flexion", "Third-nerve palsy (PCOM aneurysm)", "Subhyaloid hemorrhage on fundoscopy"],
    redFlags: ["Decreased consciousness or focal deficit", "Third-nerve palsy with pupil involvement", "Hydrocephalus on CT", "Rebleeding (sudden worsening)"],
    differential: [
      dx("Aneurysmal SAH", ["Diffuse basal cisternal blood", "Thunderclap onset"], true),
      dx("Perimesencephalic nonaneurysmal SAH", ["Blood anterior to the midbrain/pons only, good grade"]),
      dx("RCVS", ["Recurrent thunderclap headaches, convexity SAH, segmental vasoconstriction"], true),
      dx("Cervical artery dissection", ["Neck pain, Horner, focal deficits"], true),
      dx("Cerebral venous thrombosis", ["Progressive headache, papilledema, seizures"], true),
      dx("Pituitary apoplexy", ["Visual loss, ophthalmoplegia, known adenoma"], true),
      dx("Convexity SAH from CAA", ["Older, transient focal spells, superficial siderosis"]),
      dx("Primary thunderclap or exertional headache", ["Diagnosis of exclusion after negative workup"])
    ],
    workup: [
      w("Noncontrast head CT", "STAT", [], ["<6 h from onset, no new deficit, high-quality scanner read by neuroradiology: sensitivity ~98.7%"]),
      w("LP: opening pressure, cell counts in tubes 1 and 4, xanthochromia (spectrophotometry if available)", "URGENT", ["CT negative and presentation >6 h from onset or new neurological deficit"], ["Often done >6–12 h after onset; xanthochromia sensitivity 100%, specificity 95.2% (pooled)"]),
      w("CTA head", "STAT", ["SAH on CT"], ["Sensitivity for aneurysms <3 mm ~61%"]),
      w("Catheter DSA", "IF_INDICATED", ["Diffuse SAH with negative or inconclusive CTA", "Aneurysm confirmed — to plan treatment"], []),
      w("ECG, troponin, electrolytes (sodium)", "URGENT", ["Confirmed SAH"], [])
    ],
    decisionRules: rules(
      ["Acute severe headache", "Prompt workup to diagnose or exclude aSAH", "STRONG", ["AHA 2023 aSAH: COR 1, LOE B-NR"]],
      ["Alert, >15 y, severe nontraumatic headache peaking within 1 h", "Ottawa SAH Rule: further testing if any of age ≥40, neck pain/stiffness, witnessed LOC, onset with exertion, thunderclap (instant peak), limited neck flexion", "WEAK", ["AHA 2023 aSAH: COR 2b, LOE B-NR", "100% sensitive, 7.6–15.3% specific in validation"]],
      ["Presentation <6 h, no new deficit", "Negative high-quality CT read by neuroradiology is reasonable to exclude aSAH", "MODERATE", ["AHA 2023 aSAH: COR 2a, LOE B-NR"]],
      ["Presentation >6 h, or new neurological deficit", "CT; if negative, LP", "STRONG", ["AHA 2023 aSAH: COR 1, LOE B-NR"]],
      ["Spontaneous SAH with high concern for aneurysm, CTA negative or inconclusive", "Catheter DSA", "STRONG", ["AHA 2023 aSAH: COR 1, LOE B-NR"]],
      ["Confirmed aneurysm", "DSA can help plan treatment", "MODERATE", ["AHA 2023 aSAH: COR 2a, LOE B-NR"]],
      ["Confirmed aSAH", "Grade with Hunt-Hess or WFNS for severity and prognosis", "STRONG", ["AHA 2023 aSAH: COR 1, LOE B-NR"]],
      ["Confirmed aSAH at a low-volume hospital", "Timely transfer to a high-volume center with neurocritical care and cerebrovascular/endovascular expertise", "STRONG", ["AHA 2023 aSAH: COR 1, LOE B-NR"]]
    ),
    initialSteps: [
      "Neurosurgery/neuroendovascular now; neuro ICU (AHA 2023: COR 1)",
      "Secure the aneurysm early, preferably within 24 h (AHA 2023 key message)",
      "Enteral nimodipine early (AHA 2023 key message); routine antifibrinolytics don't improve outcome",
      "No routine seizure prophylaxis (consider in high-risk patients); avoid phenytoin; new seizures → ASM for 7 days (AHA 2023 key message)"
    ],
    recsTemplate: [
      "If CT negative and >6 h from onset: LP with opening pressure, cell counts tubes 1 and 4, xanthochromia",
      "If SAH confirmed: CTA head now; neurosurgery/neuro-IR consult; neuro ICU",
      "Nimodipine per neuro ICU protocol",
      "Hold antithrombotics"
    ],
    disposition: ["Confirmed aSAH: neuro ICU at a high-volume center", "Negative CT + LP: consider other thunderclap causes — see thunderclap-headache (batch D)"],
    calculatorIds: [],
    institutionVaries: ["Spectrophotometric xanthochromia availability vs visual inspection", "CTA-first vs LP-first for CT-negative patients (no head-to-head data; AHA 2023)"],
    pearls: [
      "Sentinel headache precedes aSAH in 10–43% (AHA 2023)",
      "Negative CT within 6 h may miss <1.5 per 1000 SAH — but this doesn't apply to atypical presentations (neck pain, syncope, seizure, focal deficit) (AHA 2023)",
      "Perimesencephalic SAH: CTA alone vs DSA is in equipoise (AHA 2023)"
    ],
    verify: [],
    relatedIds: ["consult-workups:ich-etiology-workup"],
    sources: [S.sah2023],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.1.0";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
