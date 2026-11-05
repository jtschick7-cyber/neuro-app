// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: consult-workups batch C (neuromuscular and spine)
import fs from "node:fs";
const path = "data/consult-workups.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const dx = (name, clues, mustNotMiss = false) => ({ dx: name, clues, mustNotMiss });
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  ats2014: "Fan E, et al. An Official American Thoracic Society Clinical Practice Guideline: The Diagnosis of Intensive Care Unit-acquired Weakness in Adults. Am J Respir Crit Care Med 2014;190:1437-1446. doi:10.1164/rccm.201411-2011ST",
  enmc2017: "Allenbach Y, et al. 224th ENMC International Workshop: Clinico-sero-pathological classification of immune-mediated necrotizing myopathies. Neuromuscul Disord 2018;28:87-99",
  myositis2026: "Allenbach Y, Benveniste O. Inflammatory Myopathies. N Engl J Med 2026;394:1925-1938. doi:10.1056/NEJMra2415426",
  frohman2010: "Frohman EM, Wingerchuk DM. Transverse Myelitis. N Engl J Med 2010;363:564-572",
  douglas2022: "Douglas AG, Xu DJ, Shah MP. Approach to Myelopathy and Myelitis. Neurol Clin 2022;40:133-156. doi:10.1016/j.ncl.2021.08.009",
  gbs2023: "van Doorn PA, et al. EAN/PNS guideline on diagnosis and treatment of Guillain-Barré syndrome. Eur J Neurol 2023;30(12):3646-3674. doi:10.1111/ene.16073",
  mg2021: "Narayanaswami P, et al. International consensus guidance for management of myasthenia gravis: 2020 update. Neurology 2021;96(3):114-122. doi:10.1212/WNL.0000000000011124",
  botulism2021: "Rao AK, et al. Clinical guidelines for diagnosis and treatment of botulism, 2021. MMWR Recomm Rep 2021;70(2):1-30. doi:10.15585/mmwr.rr7002a1"
};

const entries = [
  {
    id: "acute-generalized-weakness",
    title: "Acute generalized weakness: localize first",
    searchTerms: ["weakness", "can't walk", "paraparesis", "quadriparesis", "GBS vs", "bulbar weakness", "floppy"],
    category: "NEUROMUSCULAR",
    consultQuestion: "Weak all over — where's the lesion, and is the airway at risk?",
    keyHistory: ["Tempo (hours, days, weeks) and pattern (ascending, descending, fluctuating, fatigable)", "Sensory symptoms, back pain, bladder/bowel", "Preceding infection, vaccination, travel, tick exposure, home-canned food or injection drug use", "New drugs: statins, steroids, checkpoint inhibitors, neuromuscular blockers, aminoglycosides, magnesium", "Diplopia, ptosis, dysphagia, dyspnea"],
    keyExam: ["Reflexes (absent → peripheral; brisk → central)", "Sensory level, saddle anesthesia, rectal tone", "Pattern: proximal vs distal, symmetric, fatigable, bulbar/ocular", "Pupils (botulism), ophthalmoplegia", "Neck flexion strength, single-breath count, FVC/NIF"],
    redFlags: ["Bulbar weakness, neck flexion weakness, rising respiratory rate or paradox — check FVC/NIF and involve ICU", "Sensory level or sphincter dysfunction — emergent MRI spine", "Dilated pupils with descending paralysis — botulism", "Autonomic instability"],
    differential: [
      dx("Spinal cord compression or myelopathy", ["Sensory level, sphincters, back pain, upper motor neuron signs (may be areflexic acutely)"], true),
      dx("Guillain-Barré syndrome", ["Ascending, areflexic, paresthesias, preceding infection"], true),
      dx("Myasthenic crisis", ["Fatigable ocular/bulbar/proximal weakness, normal reflexes and sensation"], true),
      dx("Botulism", ["Descending paralysis, cranial nerves first, dilated pupils, no sensory loss"], true),
      dx("Electrolyte causes (hypokalemia, hypophosphatemia, hypermagnesemia)", ["Abnormal labs, periodic paralysis"], true),
      dx("Myopathy / rhabdomyolysis / necrotizing myositis", ["Proximal weakness, high CK"]),
      dx("Tick paralysis, toxins, critical illness weakness", ["Exposure, ICU course"])
    ],
    workup: [
      w("FVC and NIF (serial), ABG/VBG", "STAT", [], ["Single-breath count at bedside"]),
      w("BMP with K, Mg, phos, Ca; CK; TSH; CBC", "STAT", [], []),
      w("MRI spine (whole) ± brain", "STAT", ["Sensory level, sphincter involvement, UMN signs, or unclear localization"], []),
      w("LP: cells, protein", "URGENT", ["Suspected GBS"], ["Protein may be normal in week 1"]),
      w("EMG/NCS with repetitive nerve stimulation", "URGENT", [], []),
      w("AChR/MuSK antibodies; anti-GQ1b", "URGENT", ["Fatigable or ocular/bulbar weakness; ophthalmoplegia-ataxia"], []),
      w("Botulinum toxin testing via health department", "STAT", ["Descending paralysis with cranial nerve involvement"], ["Don't wait for results to request antitoxin"])
    ],
    decisionRules: rules(
      ["Weakness with sensory level, sphincter loss, or UMN signs", "Image the whole spine emergently before LP", "EXPERT_OPINION", ["Frohman 2010; Douglas 2022"]],
      ["Ascending areflexic weakness ± paresthesias", "Work up GBS — see acute-neuro:guillain-barre-syndrome", "CONSENSUS", ["EAN/PNS 2023"]],
      ["Severe respiratory failure with only mild limb weakness", "Reconsider GBS — think MG, botulism, myopathy", "CONSENSUS", ["EAN/PNS 2023"]],
      ["Descending paralysis starting with cranial nerves", "Treat as botulism until proven otherwise; call the health department", "CONSENSUS", ["CDC 2021 botulism guideline"]]
    ),
    initialSteps: ["Airway: see acute-neuro:neuromuscular-respiratory-failure", "Avoid MG-worsening drugs until MG excluded"],
    recsTemplate: [
      "FVC/NIF every [4–6] h; ICU if declining",
      "MRI whole spine [if UMN signs/sensory level]",
      "LP: cell count, protein, glucose",
      "EMG/NCS with repetitive stimulation",
      "BMP, Mg, phos, CK, TSH",
      "AChR/MuSK antibodies [if fatigable]"
    ],
    disposition: ["ICU for bulbar weakness, falling FVC/NIF, or dysautonomia"],
    calculatorIds: [],
    institutionVaries: ["EMG availability after hours and weekends"],
    pearls: ["Acute cord lesions can be areflexic early (spinal shock) — a sensory level still points to the cord (Frohman 2010)"],
    verify: [],
    relatedIds: ["acute-neuro:guillain-barre-syndrome", "acute-neuro:myasthenic-crisis", "acute-neuro:neuromuscular-respiratory-failure", "acute-neuro:spinal-cord-compression", "consult-workups:myelopathy-workup"],
    sources: [S.gbs2023, S.mg2021, S.botulism2021, S.frohman2010, S.douglas2022],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "icu-acquired-weakness",
    title: "ICU-acquired weakness (CIP/CIM)",
    searchTerms: ["ICUAW", "critical illness polyneuropathy", "critical illness myopathy", "CIP", "CIM", "can't wean", "failure to wean"],
    category: "NEUROMUSCULAR",
    consultQuestion: "Weak after a long ICU stay and won't wean — ICU-acquired weakness, or something else?",
    keyHistory: ["Sepsis, multiorgan failure, prolonged ventilation, difficult weaning", "Steroids and neuromuscular blockers", "Strength before the ICU stay; prior neuromuscular disease", "Weakness timing: present at admission (pre-existing disease) vs developed in ICU"],
    keyExam: ["Symmetric, limb > facial weakness; facial and ocular muscles relatively spared", "MRC sum score in a cooperative patient", "Reflexes reduced or normal; distal sensory loss suggests polyneuropathy", "Asymmetry, ptosis/ophthalmoplegia, or UMN signs point elsewhere"],
    redFlags: ["Asymmetric weakness, UMN signs, sensory level — image brain/spine", "Ocular or bulbar fatigability — test for MG", "Weakness present before ICU course — GBS, MG, ALS, myopathy"],
    differential: [
      dx("ICU-acquired weakness (critical illness polyneuropathy, myopathy, or both)", ["Symmetric limb weakness after sepsis/prolonged ventilation, facial sparing"]),
      dx("Guillain-Barré syndrome", ["Weakness that began before or early in admission, CSF protein, demyelinating NCS"], true),
      dx("Myasthenia gravis / Lambert-Eaton", ["Ptosis, ophthalmoplegia, fatigability, decrement on RNS"], true),
      dx("Cervical myelopathy or brainstem lesion", ["UMN signs, sensory level"], true),
      dx("Prolonged neuromuscular blockade", ["Recent NMB, renal/hepatic failure"]),
      dx("Electrolyte disorders (phosphate, potassium, magnesium)", ["Abnormal labs"])
    ],
    workup: [
      w("Structured manual muscle testing (MRC) once awake and cooperative", "URGENT", [], ["Reference standard: average MRC <4 across muscles tested (ATS 2014)"]),
      w("BMP, Mg, phos, CK", "URGENT", [], []),
      w("EMG/NCS (± direct muscle stimulation)", "IF_INDICATED", ["Not cooperative for MMT", "Weakness persists or atypical features"], ["In-ICU EMG: PPV 50%, NPV 89% for final weakness diagnosis (one study, ATS 2014)"]),
      w("MRI brain/cervical spine", "IF_INDICATED", ["Asymmetry, UMN signs, or encephalopathy out of proportion"], []),
      w("AChR/MuSK antibodies, RNS", "IF_INDICATED", ["Ocular/bulbar or fatigable weakness"], []),
      w("Muscle or nerve biopsy", "IF_INDICATED", ["Atypical course where diagnosis changes management"], ["Rarely used (ATS 2014)"])
    ],
    decisionRules: rules(
      ["Cooperative patient", "Diagnose by manual muscle testing; average MRC <4 = ICUAW", "EXPERT_OPINION", ["ATS 2014 reference standard (MMT in cooperative patients; electrophysiology in uncooperative)"]],
      ["Uncooperative patient", "Electrophysiological testing", "EXPERT_OPINION", ["ATS 2014"]],
      ["ICUAW identified", "Physical rehabilitation — low risk; very low-quality evidence of benefit specific to ICUAW", "WEAK", ["ATS 2014 (research recommendations; no treatment-specific recommendation)"]]
    ),
    initialSteps: ["Early PT/OT; minimize steroids and neuromuscular blockers when possible", "Glucose control per ICU protocol"],
    recsTemplate: [
      "Exam consistent with ICU-acquired weakness [MRC sum score __]",
      "BMP, Mg, phos, CK",
      "EMG/NCS [if atypical or not cooperative]",
      "PT/OT; mobilize as tolerated",
      "No further neuro workup unless atypical features develop"
    ],
    disposition: ["Rehabilitation planning; recovery over months"],
    calculatorIds: [],
    institutionVaries: ["Bedside EMG in the ICU"],
    pearls: [
      "About 25% of patients on prolonged ventilation develop ICUAW (ATS 2014)",
      "Associated with severe sepsis, difficult weaning, and prolonged ventilation (ATS 2014)",
      "Diagnosing ICUAW avoids unnecessary testing for alternatives (ATS 2014)"
    ],
    verify: [],
    relatedIds: ["consult-workups:acute-generalized-weakness", "acute-neuro:guillain-barre-syndrome", "acute-neuro:myasthenic-crisis"],
    sources: [S.ats2014],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "inpatient-neuropathy",
    title: "Acute or subacute neuropathy on the wards",
    searchTerms: ["neuropathy", "polyneuropathy", "mononeuritis multiplex", "vasculitic neuropathy", "CIDP", "B12", "copper", "nitrous oxide"],
    category: "NEUROMUSCULAR",
    consultQuestion: "Numbness and weakness in the limbs — what kind of neuropathy, and does it need urgent treatment?",
    keyHistory: ["Tempo: days (GBS, vasculitis, toxic) vs weeks (CIDP, nutritional) vs years", "Pattern: length-dependent vs multifocal (mononeuritis multiplex) vs proximal and distal", "Pain (vasculitis), systemic symptoms, rash, weight loss", "Bariatric surgery, malabsorption, zinc products, nitrous oxide use", "Alcohol, chemotherapy, other neurotoxic drugs; diabetes"],
    keyExam: ["Distribution of weakness and sensory loss", "Reflexes", "Upper motor neuron signs (combined myelopathy — B12, copper, nitrous oxide)", "Skin: purpura, livedo"],
    redFlags: ["Rapid progression or respiratory/bulbar involvement — treat as GBS", "Painful asymmetric deficits in separate nerves — vasculitis", "Myelopathy plus neuropathy — B12, copper, nitrous oxide"],
    differential: [
      dx("Guillain-Barré syndrome", ["Progression ≤4 weeks, areflexia"], true),
      dx("Acute-onset CIDP", ["Progression >8 weeks or ≥3 treatment-related fluctuations"]),
      dx("Vasculitic neuropathy (mononeuritis multiplex)", ["Painful, stepwise, asymmetric; systemic vasculitis"], true),
      dx("B12 deficiency / nitrous oxide toxicity", ["Myeloneuropathy, high MMA/homocysteine"], true),
      dx("Copper deficiency", ["Bariatric surgery, zinc excess; cytopenias; myeloneuropathy"]),
      dx("Toxic (chemotherapy, alcohol, heavy metals)", ["Exposure history"])
    ],
    workup: [
      w("EMG/NCS", "URGENT", [], ["Axonal vs demyelinating; multifocal pattern"]),
      w("B12 with MMA and homocysteine; copper and ceruloplasmin; zinc", "URGENT", [], ["MMA/homocysteine also rise in nitrous oxide toxicity (Douglas 2022)"]),
      w("Glucose/HbA1c, CBC, BMP, LFTs, TSH, SPEP with immunofixation", "URGENT", [], []),
      w("LP", "IF_INDICATED", ["Suspected GBS or CIDP"], []),
      w("ESR/CRP, ANCA, cryoglobulins, hepatitis B/C, HIV", "IF_INDICATED", ["Multifocal painful neuropathy"], []),
      w("Nerve (± muscle) biopsy", "IF_INDICATED", ["Suspected vasculitic neuropathy without systemic diagnosis"], []),
      w("MRI spine", "IF_INDICATED", ["UMN signs or sensory level"], [])
    ],
    decisionRules: rules(
      ["Progression to nadir ≤4 weeks", "GBS pathway — see acute-neuro:guillain-barre-syndrome", "CONSENSUS", ["EAN/PNS 2023"]],
      ["Progression >8 weeks from onset or ≥3 treatment-related fluctuations", "Consider acute-onset CIDP", "CONSENSUS", ["EAN/PNS 2023"]]
    ),
    initialSteps: ["B12 deficiency or nitrous oxide toxicity: replace B12 promptly (dosing per institutional protocol)"],
    recsTemplate: [
      "EMG/NCS",
      "B12, MMA, homocysteine; copper, ceruloplasmin, zinc; SPEP/IFE; HbA1c; TSH",
      "LP [if GBS/CIDP suspected]",
      "Vasculitis labs [if multifocal/painful]"
    ],
    disposition: ["Outpatient neuromuscular follow-up for subacute or chronic patterns"],
    calculatorIds: [],
    institutionVaries: ["Nerve biopsy access and turnaround"],
    pearls: ["Nitrous oxide toxicity looks identical to B12 deficiency on exam and imaging — ask about recreational use ('whippets') and recent anesthesia (Douglas 2022)"],
    verify: ["Vasculitic-neuropathy workup (ANCA, cryoglobulins, hepatitis serologies, nerve biopsy) and the SPEP/IFE screening item are standard practice without a stored source — confirm against the PNS vasculitic neuropathy guideline (Collins 2010) or the EAN/PNS 2021 CIDP guideline, or tell me to keep them as expert opinion"],
    relatedIds: ["acute-neuro:guillain-barre-syndrome", "consult-workups:myelopathy-workup", "consult-workups:acute-generalized-weakness"],
    sources: [S.gbs2023, S.douglas2022],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "elevated-ck-myopathy",
    title: "Elevated CK / suspected myopathy",
    searchTerms: ["CK", "myositis", "statin myopathy", "HMGCR", "SRP", "IMNM", "necrotizing myopathy", "dermatomyositis", "inclusion body myositis"],
    category: "NEUROMUSCULAR",
    consultQuestion: "High CK with proximal weakness — statin myopathy, myositis, or something else?",
    keyHistory: ["Tempo: rapid (IMNM, antisynthetase) vs slow over years (IBM, dystrophy)", "Statin exposure, including past exposure — HMGCR myopathy can persist or worsen after stopping", "Rash (heliotrope, Gottron, shawl), mechanic's hands, Raynaud, arthritis, dyspnea/cough (ILD)", "Dysphagia", "Cancer history or symptoms; checkpoint inhibitors", "Family history of muscle disease"],
    keyExam: ["Pattern: proximal symmetric (IMNM, DM, antisynthetase) vs quadriceps + finger flexors, often asymmetric (IBM)", "Skin and nailfold findings", "Neck flexor and bulbar weakness, respiratory muscle weakness"],
    redFlags: ["Dysphagia or respiratory weakness", "ILD symptoms (antisynthetase, anti-MDA5)", "Myocarditis signs (troponin, arrhythmia) — especially with checkpoint inhibitors", "Pigmenturia / AKI (rhabdomyolysis)"],
    differential: [
      dx("Immune-mediated necrotizing myopathy (anti-HMGCR, anti-SRP, seronegative)", ["Rapid proximal, lumbopelvic weakness, very high CK; statin exposure (HMGCR)"], true),
      dx("Dermatomyositis", ["Typical rash; cancer risk high with TIF-1γ, NXP2"], true),
      dx("Antisynthetase syndrome", ["Myositis, arthritis, ILD, mechanic's hands; anti-Jo-1 and others"], true),
      dx("Inclusion-body myositis", ["Slow, quadriceps and finger flexors, dysphagia; CK normal to moderate"]),
      dx("Self-limited statin myalgia / toxic myopathy", ["Improves after stopping the statin"]),
      dx("Checkpoint inhibitor myositis (± myocarditis, MG overlap)", ["Recent ICI therapy"], true),
      dx("Genetic myopathy (especially age <30), hypothyroid myopathy, rhabdomyolysis", ["Family history, TSH, triggers"])
    ],
    workup: [
      w("CK, aldolase, LFTs (AST/ALT may be muscle), TSH, BMP", "URGENT", [], []),
      w("Troponin and ECG", "URGENT", ["High CK, especially with checkpoint inhibitors"], []),
      w("Myositis-specific antibodies including anti-HMGCR and anti-SRP", "URGENT", [], ["Commercial line-blots don't cover all antibodies; methods differ (ENMC 2017)"]),
      w("EMG", "URGENT", [], ["Myopathic pattern; guides biopsy site"]),
      w("Muscle MRI (STIR/T1)", "IF_INDICATED", ["Choose biopsy site; distinguish edema from fatty replacement"], []),
      w("Muscle biopsy", "IF_INDICATED", ["No myositis-specific antibody", "Suspected IBM"], ["Not mandatory with a well-defined clinical–serologic picture; essential if seronegative and for all IBM (NEJM 2026)"]),
      w("Chest CT, PFTs with DLCO", "IF_INDICATED", ["Antisynthetase, anti-MDA5, or respiratory symptoms"], []),
      w("Cancer screening", "IF_INDICATED", ["Dermatomyositis, HMGCR-positive, seronegative IMNM, age >40, dysphagia"], ["Intensity by risk — see pearls"]),
      w("Swallow evaluation, FVC/NIF", "IF_INDICATED", ["Dysphagia or respiratory weakness"], [])
    ],
    decisionRules: rules(
      ["Elevated CK + proximal weakness + anti-HMGCR", "Anti-HMGCR myopathy (biopsy, EMG, MRI not required for subtyping); stop statin", "CONSENSUS", ["ENMC 2017 IMNM classification"]],
      ["Elevated CK + proximal weakness + anti-SRP", "Anti-SRP myopathy", "CONSENSUS", ["ENMC 2017"]],
      ["Elevated CK + proximal weakness, no myositis-specific antibody, biopsy with scattered necrotic fibers, necrosis/regeneration at different stages, macrophage-predominant sparse infiltrates", "Antibody-negative IMNM — exclude drug/toxin myopathy", "CONSENSUS", ["ENMC 2017"]],
      ["HMGCR-positive IMNM", "Malignancy workup recommended", "CONSENSUS", ["ENMC 2017"]],
      ["Idiopathic limb-girdle syndrome", "Test anti-HMGCR and anti-SRP so a treatable myopathy isn't missed", "CONSENSUS", ["ENMC 2017"]]
    ),
    initialSteps: ["Stop the statin", "IMNM treatment (steroids plus early second agent; IVIG for HMGCR, rituximab for SRP): see ENMC 2017 — rheumatology/neuromuscular co-management"],
    recsTemplate: [
      "CK, aldolase, TSH, troponin, ECG",
      "Myositis panel including HMGCR and SRP antibodies",
      "EMG; muscle MRI to guide biopsy",
      "Hold statin",
      "Muscle biopsy [if seronegative or IBM suspected]",
      "Age-appropriate cancer screening [risk-stratified]"
    ],
    disposition: ["Inpatient if dysphagia, respiratory weakness, myocarditis, or rhabdomyolysis", "Neuromuscular and rheumatology follow-up"],
    calculatorIds: [],
    institutionVaries: ["Myositis panel send-out lab and turnaround", "Muscle biopsy processing (needs a neuromuscular pathology lab)"],
    pearls: [
      "Cancer occurs in about 10% of adults with myositis within 3 years of diagnosis; risk is high with seronegative IMNM, TIF-1γ, NXP2, anti-OJ, and seronegative DM over age 40; intermediate with HMGCR, Mi-2, MDA5, SAE (NEJM 2026 Table 1)",
      "IBM: quadriceps and finger flexor weakness is almost pathognomonic; CK normal to moderately raised (NEJM 2026)",
      "Under age 30, distinguish early IMNM from genetic myopathy — antibody status matters most (NEJM 2026)",
      "Statin-associated HMGCR myopathy persists or worsens after the statin is stopped (ENMC 2017)"
    ],
    verify: [],
    relatedIds: ["consult-workups:acute-generalized-weakness"],
    sources: [S.enmc2017, S.myositis2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "myelopathy-workup",
    title: "Myelopathy / transverse myelitis workup",
    searchTerms: ["myelopathy", "myelitis", "transverse myelitis", "LETM", "spinal cord infarct", "dural AV fistula", "subacute combined degeneration"],
    category: "SPINAL",
    consultQuestion: "Spinal cord syndrome — compressive, vascular, nutritional, or inflammatory?",
    keyHistory: ["Tempo: hyperacute (minutes — infarct), hours–days (myelitis), weeks–months (DAVF, nutritional, spondylotic)", "Aortic surgery/procedures or bypass (cord infarct)", "Bariatric surgery, malabsorption, zinc products, nitrous oxide", "Optic neuritis, area postrema symptoms (NMOSD), prior demyelinating events (MS)", "Preceding infection or vaccination", "Systemic disease: sarcoid, lupus, Sjögren, cancer"],
    keyExam: ["Sensory level, dissociated sensory loss", "Pattern: anterior (spared vibration/proprioception — anterior spinal artery), posterior columns (B12, copper)", "UMN signs; may be areflexic acutely", "Bladder/bowel function; Lhermitte sign"],
    redFlags: ["Compressive lesion on MRI — neurosurgery now", "Hyperacute onset with back pain — cord infarct or hematoma", "Fever/back pain — epidural abscess", "Area postrema or optic neuritis — NMOSD"],
    differential: [
      dx("Compressive (disc, spondylosis, metastasis, abscess, hematoma)", ["Back/radicular pain, extradural lesion"], true),
      dx("Spinal cord infarction", ["Hyperacute, aortic procedure; anterior pencil-like T2, DWI restriction"], true),
      dx("Dural AV fistula", ["Man >50, subacute progression; central T2 often to the conus, flow voids; spinal angiogram"], true),
      dx("NMOSD (AQP4) or MOGAD", ["Longitudinally extensive (≥3 segments) lesion; AQP4/MOG antibodies"], true),
      dx("Multiple sclerosis", ["Short (<2 segments), peripheral lesions; brain lesions; oligoclonal bands"]),
      dx("B12 deficiency / nitrous oxide / copper deficiency", ["Posterior ± lateral columns, inverted-V; MMA/homocysteine; copper/ceruloplasmin"], true),
      dx("Neurosarcoidosis, infection (HIV, HTLV-1, syphilis, VZV), paraneoplastic, spondylotic myelopathy with enhancement", ["Trident sign (sarcoid); pancake-like enhancement (spondylotic)"])
    ],
    workup: [
      w("MRI entire spine with and without gadolinium", "STAT", [], ["Image the whole cord — a thoracic sensory level can come from a cervical lesion (Frohman 2010); DWI for suspected infarct (Douglas 2022)"]),
      w("MRI brain with gadolinium", "URGENT", [], ["MS lesions; NMOSD/MOGAD patterns"]),
      w("LP: cells, protein, glucose, oligoclonal bands, IgG index, cytology, infectious studies", "URGENT", ["No compressive lesion"], ["Pleocytosis or raised IgG index supports myelitis (Frohman 2010)"]),
      w("Serum AQP4-IgG and MOG-IgG (cell-based)", "URGENT", [], []),
      w("B12, MMA, homocysteine; copper, ceruloplasmin, zinc", "URGENT", [], []),
      w("HIV, HTLV-1, syphilis serology", "URGENT", [], []),
      w("ACE / chest CT for sarcoidosis; ANA/SSA/SSB", "IF_INDICATED", ["Systemic features"], ["Autoantibodies alone don't prove a connective-tissue cause — they occur in MS and NMOSD (Frohman 2010)"]),
      w("Spinal catheter angiography", "IF_INDICATED", ["Suspected dural AV fistula"], []),
      w("Paraneoplastic antibodies", "IF_INDICATED", ["Cancer risk or LETM without AQP4/MOG"], ["See neural-antibodies (e.g., CRMP5, amphiphysin)"])
    ],
    decisionRules: rules(
      ["Any acute myelopathy", "Exclude compression first with whole-spine MRI", "EXPERT_OPINION", ["Frohman 2010; Douglas 2022"]],
      ["Transverse myelitis criteria: bilateral sensory/motor/autonomic cord dysfunction with sensory level, peak 4 h–21 days, plus inflammation (CSF pleocytosis or raised IgG index, or gadolinium-enhancing lesion), with compressive, radiation, neoplastic and vascular causes excluded", "Idiopathic or disease-associated transverse myelitis", "CONSENSUS", ["Transverse Myelitis Consortium criteria, Frohman 2010 Table 1"]],
      ["Lesion ≥3 vertebral segments (LETM)", "Test AQP4-IgG and MOG-IgG; NMOSD likely if AQP4-positive", "EXPERT_OPINION", ["Frohman 2010; Douglas 2022"]],
      ["Normal spinal MRI", "Reconsider myelopathy — central or peripheral alternative", "EXPERT_OPINION", ["Frohman 2010"]]
    ),
    initialSteps: ["Compression: see acute-neuro:spinal-cord-compression", "NMOSD/MOGAD attack: see acute-neuro:nmosd-mogad-attack", "Nutritional/nitrous oxide: replace B12/copper promptly"],
    recsTemplate: [
      "MRI entire spine with and without contrast; MRI brain with contrast",
      "LP: cells, protein, glucose, OCB, IgG index, cytology, infectious studies",
      "AQP4-IgG and MOG-IgG (serum)",
      "B12, MMA, homocysteine, copper, ceruloplasmin, zinc, HIV, HTLV-1, RPR",
      "Bladder scan / post-void residual"
    ],
    disposition: ["Admit for acute myelopathy", "Neuroimmunology follow-up for myelitis"],
    calculatorIds: [],
    institutionVaries: ["Spinal angiography availability (neuro-IR)"],
    pearls: [
      "Spondylotic myelopathy can show pancake-like transverse enhancement and mimic myelitis (Douglas 2022)",
      "Cord infarct imaging can be normal early — DWI is more sensitive (Douglas 2022)",
      "Cavernous malformations: stepwise episodes with recovery; popcorn lesions with GRE blooming (Douglas 2022)"
    ],
    verify: [],
    relatedIds: ["acute-neuro:spinal-cord-compression", "acute-neuro:nmosd-mogad-attack", "acute-neuro:ms-relapse", "neural-antibodies:aqp4", "neural-antibodies:mog", "neural-antibodies:cv2-crmp5"],
    sources: [S.frohman2010, S.douglas2022],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.4.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
