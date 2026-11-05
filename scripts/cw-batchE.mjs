// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: consult-workups batch E (inflammatory/demyelinating)
import fs from "node:fs";
const path = "data/consult-workups.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const dx = (name, clues, mustNotMiss = false) => ({ dx: name, clues, mustNotMiss });
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  mcdonald2024: "Montalban X, et al. Diagnosis of multiple sclerosis: 2024 revisions of the McDonald criteria. Lancet Neurol 2025;24:850-865",
  salvarani2024: "Salvarani C, Brown RD Jr, Hunder GG. Primary Central Nervous System Vasculitis. N Engl J Med 2024;391:1028-1037. doi:10.1056/NEJMra2314942",
  pnscare2021: "Graus F, et al. Updated diagnostic criteria for paraneoplastic neurologic syndromes (PNS-Care). Neurol Neuroimmunol Neuroinflamm 2021;8:e1014. doi:10.1212/NXI.0000000000001014",
  graus2016: "Graus F, et al. A clinical approach to diagnosis of autoimmune encephalitis. Lancet Neurol 2016;15(4):391-404. doi:10.1016/S1474-4422(15)00401-9",
  eggenberger2025: "Eggenberger E. Optic Neuritis. Continuum (Minneap Minn) 2025;31(2, Neuro-ophthalmology):407-435",
  sousa2026: "de Sousa IA, et al. Reversible cerebral vasoconstriction syndrome: A narrative review. Headache 2026;66:1162-1180. doi:10.1111/head.70048"
};
const MC = "McDonald 2024 (consensus position paper)";

const entries = [
  {
    id: "new-demyelinating-lesion",
    title: "New demyelinating event or lesions: is it MS?",
    searchTerms: ["MS", "multiple sclerosis", "McDonald", "CIS", "clinically isolated syndrome", "RIS", "central vein sign", "kFLC", "oligoclonal bands"],
    category: "INFLAMMATORY_DEMYELINATING",
    consultQuestion: "First demyelinating event or white-matter lesions — does this meet MS criteria, or is it a mimic?",
    keyHistory: ["Typical attack: optic neuritis, partial myelitis, brainstem/cerebellar syndrome, lasting ≥24 h", "Prior unexplained episodes (sensory, visual, Lhermitte)", "Progression ≥12 months from onset (progressive presentation)", "Age ≥50 and vascular risk factors (misdiagnosis risk); migraine", "Systemic disease, infections, area postrema symptoms (NMOSD)"],
    keyExam: ["Visual acuity, color, RAPD, fundus", "Internuclear ophthalmoplegia, nystagmus", "Sensory level, UMN signs, ataxia"],
    redFlags: ["Severe or bilateral optic neuritis, area postrema syndrome, longitudinally extensive myelitis — NMOSD/MOGAD", "Encephalopathy, fever, meningeal enhancement — infection, ADEM", "Age ≥50 with vascular risk — require extra confirmation before diagnosing MS"],
    differential: [
      dx("Multiple sclerosis", ["Typical lesions in ≥2 of 5 locations; CSF OCB/kFLC; central vein sign"]),
      dx("NMOSD (AQP4)", ["Longitudinally extensive myelitis, severe optic neuritis, area postrema"], true),
      dx("MOGAD", ["Bilateral optic neuritis with disc edema, ADEM, conus myelitis"], true),
      dx("Small-vessel ischemic disease / migraine-associated lesions", ["Age ≥50, vascular risk, nonspecific periventricular lesions without CVS"]),
      dx("CNS vasculitis, sarcoidosis, infection, lymphoma", ["Leptomeningeal enhancement, systemic disease, atypical CSF"], true)
    ],
    workup: [
      w("MRI brain with and without gadolinium (3D FLAIR; SWI-type sequences for CVS/PRL if available)", "URGENT", [], []),
      w("MRI cervical and thoracic spine with gadolinium", "URGENT", [], ["Spinal lesions add DIS and support diagnosis at age ≥50"]),
      w("Optic nerve MRI with fat saturation, OCT, or VEP", "IF_INDICATED", ["Visual symptoms or to show optic nerve DIS"], ["OCT inter-eye difference: pRNFL ≥6 µm or GCIPL ≥4 µm supports optic nerve involvement (McDonald 2024)"]),
      w("LP: cell count, protein, paired oligoclonal bands and/or kappa free light chain index", "URGENT", [], ["kFLC index is interchangeable with OCB"]),
      w("AQP4-IgG (cell-based)", "IF_INDICATED", ["Optic neuritis, myelitis, area postrema, brainstem syndromes or red flags"], []),
      w("MOG-IgG (cell-based)", "IF_INDICATED", ["Age ≥12: presentation not specific to MS or suggestive of MOGAD — not for everyone"], ["Strongly recommended in all children <12 with incident demyelination (McDonald 2024)"]),
      w("Mimic-directed blood tests", "IF_INDICATED", ["Atypical features or systemic disease"], [])
    ],
    decisionRules: rules(
      ["Dissemination in space (DIS)", "Typical lesions in ≥2 of 5 locations: optic nerve, cortical/juxtacortical, periventricular, infratentorial, spinal cord — symptomatic or not", "CONSENSUS", [MC]],
      ["Progressive course ≥12 months from onset", "Two spinal cord lesions satisfy DIS", "CONSENSUS", [MC]],
      ["Typical presentation, better explanations excluded, DIS met", "MS if any one of: CSF positive (OCB or kFLC), CVS positive (select 6), DIT (new T2 or gadolinium-positive lesion or a clinical attack), or lesions in 4–5 locations", "CONSENSUS", [MC]],
      ["Typical presentation, lesions in only one location", "MS if any pair: CSF + CVS, CSF + PRL, DIT + CVS, or DIT + PRL", "CONSENSUS", [MC]],
      ["Radiologically isolated syndrome (incidental typical lesions) fulfilling DIS", "MS if DIT, positive CSF, or select-6 CVS also present", "CONSENSUS", [MC]],
      ["Age ≥50 or significant vascular risk factors", "Strongly recommended to confirm with a spinal cord lesion, CSF positivity, or CVS positivity", "CONSENSUS", [MC]],
      ["Primary progressive presentation", "Requires clinical progression ≥12 months; same unified criteria", "CONSENSUS", [MC]],
      ["After ADEM", "Apply MS criteria only after a second typical attack or new T2 lesions >90 days after ADEM onset", "CONSENSUS", [MC]]
    ),
    initialSteps: ["Relapse treatment: see acute-neuro:ms-relapse", "NMOSD/MOGAD suspected: see acute-neuro:nmosd-mogad-attack"],
    recsTemplate: [
      "MRI brain, C- and T-spine with and without contrast [3D FLAIR; SWI for CVS if available]",
      "LP: OCB (paired serum), kFLC index, cells, protein",
      "AQP4-IgG [± MOG-IgG if atypical]",
      "OCT/VEP or optic nerve MRI [if visual symptoms]",
      "Outpatient MS clinic follow-up"
    ],
    disposition: ["Usually outpatient completion of workup once severe attacks are treated", "MS clinic referral"],
    calculatorIds: [],
    institutionVaries: ["CVS/PRL imaging protocols (3T, SWI/FLAIR*) and kFLC availability"],
    pearls: [
      "CVS positivity (select 6): ≥6 lesions with a central vein; if <10 lesions, CVS-positive must outnumber CVS-negative (McDonald 2024)",
      "Optic nerve lesions shouldn't count toward DIS with prominent chiasmal involvement, perineuritis, or longitudinal extent (McDonald 2024)",
      "Migraine, small-vessel disease, psychiatric and some autoimmune disorders drive MS misdiagnosis (McDonald 2024)"
    ],
    verify: [],
    relatedIds: ["acute-neuro:ms-relapse", "acute-neuro:nmosd-mogad-attack", "consult-workups:acute-vision-loss", "consult-workups:myelopathy-workup", "neural-antibodies:aqp4", "neural-antibodies:mog"],
    sources: [S.mcdonald2024, S.eggenberger2025],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "cns-vasculitis-workup",
    title: "Suspected primary CNS vasculitis",
    searchTerms: ["PACNS", "primary angiitis", "CNS vasculitis", "brain biopsy", "vessel wall imaging", "beading"],
    category: "INFLAMMATORY_DEMYELINATING",
    consultQuestion: "Multifocal strokes or abnormal angiogram — is this CNS vasculitis or a mimic like RCVS?",
    keyHistory: ["Subacute headache, cognitive decline, focal deficits, seizures over weeks–months", "Thunderclap headache and vasoactive triggers (RCVS)", "Systemic symptoms, rash, oral ulcers, sicca (secondary vasculitis)", "Shingles or chickenpox recently (VZV vasculopathy)", "Immunosuppression, HIV, syphilis risk, TB exposure", "Lymphoma history"],
    keyExam: ["Focal deficits, cognitive impairment", "Skin, joints, eyes for systemic disease"],
    redFlags: ["Normal brain MRI — PACNS very unlikely", "Thunderclap onset, normal parenchyma, convexity SAH — favors RCVS (avoid steroids)", "Fever, immunocompromise — infection first"],
    differential: [
      dx("Primary CNS vasculitis (small-vessel vs medium-to-large-vessel)", ["Subacute course, multifocal infarcts, inflammatory CSF, enhancing lesions"]),
      dx("RCVS", ["Thunderclap, triggers, normal MRI or cSAH, minimal vessel-wall enhancement"], true),
      dx("Intracranial atherosclerosis", ["Eccentric plaque on vessel-wall MRI, vascular risk"]),
      dx("Infectious vasculitis (VZV, syphilis, TB, fungal, HIV, endocarditis)", ["Recent zoster, CSF anti-VZV IgG, serologies"], true),
      dx("Intravascular or primary CNS lymphoma", ["Progressive, nonspecific lesions"], true),
      dx("Secondary CNS vasculitis (connective tissue disease, systemic vasculitis, Behçet)", ["Systemic disease activity"]),
      dx("Aβ-related angiitis (CAA-related inflammation)", ["Vasogenic edema, leptomeningeal enhancement, lobar microbleeds"]),
      dx("Moyamoya, FMD, radiation vasculopathy, APS, MOGAD, CADASIL", ["Specific imaging/genetic features"])
    ],
    workup: [
      w("MRI brain with and without gadolinium, DWI, SWI", "URGENT", [], ["Normal MRI makes CNS vasculitis very unlikely"]),
      w("High-resolution vessel-wall MRI", "IF_INDICATED", ["Intracranial stenoses"], ["Concentric smooth enhancement favors vasculitis over plaque or RCVS; specificity not established"]),
      w("CTA or MRA head", "URGENT", [], ["Less sensitive for medium-sized and posterior-circulation vessels"]),
      w("Catheter DSA", "IF_INDICATED", ["Strong suspicion with normal CTA/MRA"], ["Sensitivity vs biopsy ~15–43%; specificity low"]),
      w("LP: cells, protein, glucose, Gram stain/culture, VZV PCR and CSF anti-VZV IgG, syphilis, fungal studies, cytology, flow cytometry", "URGENT", [], ["Inflammatory CSF in ~75%; mainly used to rule out mimics"]),
      w("Serum: ESR, CRP, ANA, ANCA, antiphospholipid antibodies, HIV, syphilis, hepatitis B/C", "URGENT", [], ["ESR/CRP usually normal in PACNS"]),
      w("Brain and leptomeningeal biopsy (lesional preferred; nondominant frontal if random)", "IF_INDICATED", ["Small-vessel vasculitis suspected with normal angiogram", "To exclude mimics"], ["30–50% false negatives; finds another diagnosis in ~30%"])
    ],
    decisionRules: rules(
      ["Diagnosing PACNS", "1988 Calabrese–Mallek criteria (angiographic or histological vasculitis + exclusion of other causes) — not prospectively validated", "EXPERT_OPINION", ["Salvarani 2024"]],
      ["Strong clinical suspicion, normal CTA/MRA", "Consider catheter DSA", "EXPERT_OPINION", ["ESO guideline as cited in Salvarani 2024"]],
      ["Suspected small-vessel vasculitis with normal angiogram", "Brain biopsy", "EXPERT_OPINION", ["ESO guideline as cited in Salvarani 2024"]],
      ["Angiography highly suggestive of medium-to-large-vessel vasculitis", "Biopsy only to rule out other diagnoses", "EXPERT_OPINION", ["ESO guideline as cited in Salvarani 2024"]],
      ["Thunderclap headache with vasoconstriction", "Score with RCVS2 before labeling vasculitis — see thunderclap-headache", "EXPERT_OPINION", ["Sousa 2026"]]
    ),
    initialSteps: ["Confirmed PACNS: glucocorticoids ± cyclophosphamide (Salvarani 2024) — rheumatology co-management", "Hold steroids if RCVS remains likely"],
    recsTemplate: [
      "MRI brain with contrast, DWI, SWI; vessel-wall MRI",
      "CTA/MRA head; DSA if normal and suspicion high",
      "LP: cells, protein, cultures, VZV PCR + CSF VZV IgG, VDRL, fungal studies, cytology/flow",
      "ESR, CRP, ANA, ANCA, APLA, HIV, RPR, hepatitis B/C",
      "Neurosurgery for brain/leptomeningeal biopsy [if small-vessel suspected or diagnosis uncertain]"
    ],
    disposition: ["Inpatient workup; rheumatology involvement"],
    calculatorIds: [],
    institutionVaries: ["Vessel-wall MRI protocol availability"],
    pearls: [
      "Only 11.9% of patients with both studies had classic angiography plus pathologically confirmed vasculitis (Salvarani 2024)",
      "Common presentations: focal deficits (67–83%), headache (54–63%), cognitive impairment (35–50%) (Salvarani 2024)",
      "Most drug-induced 'vasculitis' on angiography is vasospasm (Salvarani 2024)"
    ],
    verify: [],
    relatedIds: ["consult-workups:thunderclap-headache", "consult-workups:young-stroke-workup", "consult-workups:rapidly-progressive-dementia"],
    sources: [S.salvarani2024, S.sousa2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "paraneoplastic-workup",
    title: "Suspected paraneoplastic neurologic syndrome",
    searchTerms: ["paraneoplastic", "PNS", "PNS-Care", "onconeural", "cancer screening", "Hu", "Yo", "LEMS"],
    category: "INFLAMMATORY_DEMYELINATING",
    consultQuestion: "Subacute neurologic syndrome — could this be paraneoplastic, which antibodies, and how hard to look for cancer?",
    keyHistory: ["Tempo: rapidly progressive (<3 months)", "Smoking, known cancer, weight loss", "Immune checkpoint inhibitor therapy", "Multifocal involvement (CNS + DRG/nerve)"],
    keyExam: ["Phenotype: encephalomyelitis, limbic encephalitis, rapidly progressive cerebellar syndrome, opsoclonus-myoclonus, sensory neuronopathy, GI dysmotility, LEMS"],
    redFlags: ["High-risk phenotype — screen for cancer even if antibodies are negative", "Rapid decline while independent — treat the tumor early"],
    differential: [
      dx("Paraneoplastic neurologic syndrome", ["High- or intermediate-risk phenotype and antibody"], true),
      dx("Nonparaneoplastic autoimmune encephalitis (LGI1, CASPR2, NMDAR without tumor)", ["Lower-risk antibodies"]),
      dx("Direct cancer effects: metastasis, leptomeningeal disease, treatment toxicity", ["Imaging, CSF cytology"], true),
      dx("Immune checkpoint inhibitor–related neurotoxicity", ["Recent ICI"], true)
    ],
    workup: [
      w("Neural antibodies in serum AND CSF, matched to the phenotype", "URGENT", [], ["Avoid indiscriminate panels; confirm line-blot/CBA positives with tissue IHC when low titer or phenotype-discordant; ignore IgM/IgA (PNS-Care Table 4)"]),
      w("MRI brain/spine with contrast; LP with cells, protein, OCB, cytology", "URGENT", [], []),
      w("EMG/NCS", "IF_INDICATED", ["Neuronopathy, LEMS, neuropathy"], []),
      w("Cancer screening by the antibody's usual tumors", "URGENT", [], ["Modality per the antibody entry in neural-antibodies (e.g., chest CT ± FDG-PET for SCLC; breast/pelvic imaging for Yo)"]),
      w("Repeat cancer screening every 4–6 months for 2 years", "IF_INDICATED", ["High-risk phenotype + high-risk antibody with negative initial screen", "High-risk phenotype + intermediate-risk antibody with older age, smoking, or SOX1 with LEMS"], [])
    ],
    decisionRules: rules(
      ["Clinical level", "High-risk phenotype 3; intermediate-risk phenotype 2; phenotype not associated with cancer 0", "CONSENSUS", ["PNS-Care 2021 Table 5"]],
      ["Laboratory level", "High-risk antibody (>70% cancer) 3; intermediate-risk (30–70%) 2; lower-risk (<30%) or negative 0", "CONSENSUS", ["PNS-Care 2021 Table 5"]],
      ["Cancer", "Found and consistent with phenotype/antibody (or antigen expression shown) 4; not found but follow-up <2 years 1; not found with ≥2 years follow-up 0", "CONSENSUS", ["PNS-Care 2021 Table 5"]],
      ["Total PNS-Care score", "Definite ≥8; probable 6–7; possible 4–5; non-PNS ≤3 — definite requires a high- or intermediate-risk antibody (except opsoclonus-myoclonus)", "CONSENSUS", ["PNS-Care 2021"]],
      ["Intermediate-risk phenotype", "Consider when onset is rapidly progressive (<3 months) or CSF/MRI is inflammatory", "CONSENSUS", ["PNS-Care 2021"]],
      ["Lower-risk antibody or criteria for repeat screening not met", "Comprehensive cancer screening once at initial assessment is sufficient", "CONSENSUS", ["PNS-Care 2021"]],
      ["Autoimmune encephalitis phenotype", "Apply Graus 2016 clinical criteria; don't wait for antibodies to treat", "CONSENSUS", ["Graus 2016"]]
    ),
    initialSteps: ["Treat the tumor first and early — see neural-antibodies entry", "Immunotherapy: see acute-neuro:autoimmune-encephalitis"],
    recsTemplate: [
      "Serum and CSF paraneoplastic/autoimmune antibody panels [targeted to phenotype]",
      "MRI brain/spine with contrast; LP with OCB and cytology",
      "CT chest/abdomen/pelvis ± FDG-PET [modality by antibody]",
      "PNS-Care score: __ ([definite/probable/possible])",
      "If high-risk antibody with negative screen: repeat every 4–6 months for 2 years"
    ],
    disposition: ["Oncology referral when tumor found; neuroimmunology follow-up"],
    calculatorIds: [],
    institutionVaries: ["Send-out antibody lab (e.g., Mayo, ARUP) and turnaround"],
    pearls: [
      "High-risk phenotypes: encephalomyelitis, limbic encephalitis, rapidly progressive cerebellar syndrome, opsoclonus-myoclonus, sensory neuronopathy, GI pseudo-obstruction, LEMS (PNS-Care 2021)",
      "Diagnostic level can change over time with follow-up length (PNS-Care 2021)",
      "Surface antibodies positive in serum but negative in CSF should be reassessed (PNS-Care 2021)"
    ],
    verify: [],
    relatedIds: ["acute-neuro:autoimmune-encephalitis", "neural-antibodies:anti-hu", "neural-antibodies:anti-yo", "neural-antibodies:cv2-crmp5", "neural-antibodies:p-q-vgcc", "neural-antibodies:sox1", "consult-workups:rapidly-progressive-dementia"],
    sources: [S.pnscare2021, S.graus2016],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.6.0";
d.lastUpdated = "2026-11-05";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
