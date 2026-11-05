// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: create data/neural-antibodies.json with batch 1 (surface AE antibodies)
import fs from "node:fs";
const path = "data/neural-antibodies.json";
const d = fs.existsSync(path)
  ? JSON.parse(fs.readFileSync(path, "utf8"))
  : { title: "Neural antibodies", version: "0.1.0", schemaVersion: "1.0.0", lastUpdated: "2026-11-04", entries: [] };

const syn = (syndrome, typical = true) => ({ syndrome, typical });
const tum = (tumor, frequencyText) => ({ tumor, frequencyText });
const fp = (normalLikelihood, normalPercentText, typicalFindings) => ({ normalLikelihood, normalPercentText, typicalFindings });

const S = {
  graus2016: "Graus F, et al. A clinical approach to diagnosis of autoimmune encephalitis. Lancet Neurol 2016;15(4):391-404. doi:10.1016/S1474-4422(15)00401-9",
  pns2021: "Graus F, et al. Updated diagnostic criteria for paraneoplastic neurologic syndromes (PNS-Care). Neurol Neuroimmunol Neuroinflamm 2021;8:e1014. doi:10.1212/NXI.0000000000001014",
  titulaer2013: "Titulaer MJ, et al. Treatment and prognostic factors for long-term outcome in patients with anti-NMDA receptor encephalitis: an observational cohort study. Lancet Neurol 2013;12(2):157-165. doi:10.1016/S1474-4422(12)70310-1",
  gresa2014: "Gresa-Arribas N, et al. Antibody titres at diagnosis and during follow-up of anti-NMDA receptor encephalitis: a retrospective study. Lancet Neurol 2014;13(2):167-177. doi:10.1016/S1474-4422(13)70282-5",
  vansonderenLgi1: "van Sonderen A, et al. Anti-LGI1 encephalitis: clinical syndrome and long-term follow-up. Neurology 2016;87(14):1449-1456. doi:10.1212/WNL.0000000000003173",
  arino2016: "Ariño H, et al. Anti-LGI1-associated cognitive impairment: presentation and long-term outcome. Neurology 2016;87(8):759-765. doi:10.1212/WNL.0000000000003009",
  vansonderenCaspr2: "van Sonderen A, et al. The clinical spectrum of Caspr2 antibody-associated disease. Neurology 2016;87(5):521-528. doi:10.1212/WNL.0000000000002917",
  hoftberger2013: "Höftberger R, et al. Encephalitis and GABAB receptor antibodies: novel findings in a new case series of 20 patients. Neurology 2013;81(17):1500-1506. doi:10.1212/WNL.0b013e3182a9585f",
  mckay2019: "McKay JH, Dimberg EL, Lopez Chiriboga AS. A systematic review of gamma-aminobutyric acid receptor type B autoimmunity. Neurol Neurochir Pol 2019;53(1):1-7. doi:10.5603/PJNNS.a2018.0005",
  hoftberger2015: "Höftberger R, et al. Encephalitis and AMPA receptor antibodies: novel findings in a case series of 22 patients. Neurology 2015;84(24):2403-2412. doi:10.1212/WNL.0000000000001682",
  spatola2017: "Spatola M, et al. Investigations in GABAA receptor antibody-associated encephalitis. Neurology 2017;88(11):1012-1020. doi:10.1212/WNL.0000000000003713",
  hara2017: "Hara M, et al. DPPX antibody-associated encephalitis: main syndrome and antibody effects. Neurology 2017;88(14):1340-1348. doi:10.1212/WNL.0000000000003796",
  tobin2014: "Tobin WO, et al. DPPX potassium channel antibody: frequency, clinical accompaniments, and outcomes in 20 patients. Neurology 2014;83(20):1797-1803. doi:10.1212/WNL.0000000000000991",
  carvajal2014: "Carvajal-González A, et al. Glycine receptor antibodies in PERM and related syndromes: characteristics, clinical features and outcomes. Brain 2014;137(8):2178-2192. doi:10.1093/brain/awu142",
  inhibRev2016: "Encephalitis associated with autoantibodies binding to GABA-A, GABA-B and glycine receptors: immunopathogenic mechanisms and clinical characteristics. Neuroimmunol Neuroinflamm 2016;3:86-92. doi:10.4103/2347-8659.170633"
};

const SURFACE_CONFIRM = "Surface antibody positive in serum only (CSF negative): confirm with tissue IHC or a research laboratory before calling it definite (PNS-Care 2021)";
const LOW_SCREEN = "Comprehensive cancer screening at initial diagnosis is sufficient for lower-risk antibodies (PNS-Care 2021)";
const INT_SCREEN = "Screen at diagnosis; if negative, repeat every 4–6 months for 2 years when a high-risk phenotype (e.g., limbic encephalitis) occurs with older age, smoking, or a concurrent high-risk antibody (PNS-Care 2021)";
const AE = "acute-neuro:autoimmune-encephalitis";

const entries = [
  {
    id: "nmdar",
    antigen: "NMDA receptor (GluN1 subunit)",
    searchTerms: ["anti-NMDAR", "NMDA receptor encephalitis", "GluN1", "NR1"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "INTERMEDIATE",
    syndromes: [syn("Anti-NMDAR encephalitis: psychiatric symptoms, memory/speech deficits, seizures, dyskinesias, decreased consciousness, autonomic instability, central hypoventilation"), syn("Isolated psychiatric episodes", false), syn("Post-HSV encephalitis autoimmune relapse", false)],
    demographics: ["95% younger than 45 y and 37% younger than 18 y; female:male ~4:1, less marked in children <12 and adults >45 (Graus 2016, citing Titulaer 2013)"],
    tumors: [tum("Ovarian teratoma (mostly mature)", "Overall 38% (PNS-Care); 58% in women >18 y; 0–5% in children <12 y (Graus 2016)"), tum("Carcinomas (older adults)", "Tumors in 23% of adults >45 y, usually carcinomas rather than teratomas (Graus 2016)")],
    cancerScreening: ["Women: screen for ovarian teratoma (pelvic imaging per local protocol)", "Adults >45 y: screen for carcinoma", "Consider rescreening in relapsing or refractory disease (PNS-Care 2021)"],
    testing: {
      preferredSpecimen: "CSF",
      rationale: ["CSF positive in 250/250 vs serum 214/250 (sensitivity 100% vs 85.6%) on paired samples (Gresa-Arribas 2014)", "Test both serum and CSF; CSF screening is obligatory for suspected surface-antibody encephalitis (PNS-Care 2021)"],
      methodNotes: [SURFACE_CONFIRM, "IgG against GluN1 is the relevant antibody (Graus 2016)"]
    },
    csf: fp("SOMETIMES_NORMAL", ["Abnormal in 78.6% (418/532) (Titulaer 2013)"], ["Lymphocytic pleocytosis, elevated protein, or oligoclonal bands"]),
    mri: fp("OFTEN_NORMAL", ["Abnormal in 33.3% (180/540) (Titulaer 2013)"], ["Often normal or nonspecific; may show transient cortical/subcortical FLAIR changes"]),
    otherTests: ["EEG: abnormal in 89.6% (Titulaer 2013); extreme delta brush supports the diagnosis (Graus 2016 criteria)"],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: [
      "Titers fall with recovery but often stay positive (24/28 CSF, 17/23 serum after recovery) — persistent positivity alone doesn't define activity",
      "CSF titer change tracks relapse better than serum (14/19 vs 7/16); higher titers with teratoma or poor outcome (Gresa-Arribas 2014)"
    ],
    verify: ["Titulaer 2013 CSF (78.6%), MRI (33.3%), and EEG (89.6%) figures were taken from a review table citing the cohort, not the paper itself — confirm in Titulaer 2013 Table", "USUALLY_GOOD response — attach Titulaer 2013 outcome figures"],
    relatedIds: [AE],
    sources: [S.titulaer2013, S.gresa2014, S.graus2016, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "lgi1",
    antigen: "LGI1 (leucine-rich glioma-inactivated 1)",
    searchTerms: ["anti-LGI1", "VGKC", "faciobrachial dystonic seizures", "FBDS"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "LOW",
    syndromes: [syn("Limbic encephalitis (34/38)"), syn("Faciobrachial dystonic seizures (47%) and subtle focal seizures (66%), usually before memory loss"), syn("Cognitive impairment without encephalitis criteria (up to 13%)", false)],
    demographics: [],
    tumors: [tum("Malignant thymoma, neuroendocrine tumors", "<10%; paraneoplastic cases mainly Morvan syndrome with both LGI1 and CASPR2 (PNS-Care)")],
    cancerScreening: [LOW_SCREEN],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Best detected in serum; CSF less sensitive (PNS-Care 2021)", "Paired samples: both positive 92%, CSF-only 8% — send both (Ariño 2016)"],
      methodNotes: ["Antibodies are IgG4 (Ariño 2016)"]
    },
    csf: fp("UNKNOWN", [], ["Pleocytosis 41%, elevated protein 47%; intrathecal IgG synthesis rare (Graus 2016)", "Pleocytosis in 14/62 (23%) with encephalitis (Ariño 2016)"]),
    mri: fp("UNKNOWN", [], ["Hippocampal T2 hyperintensity on initial MRI in 74%; evolves to mesial temporal sclerosis in 44% (van Sonderen 2016)", "Initial MRI can be normal with later limbic changes (Ariño 2016)"]),
    otherTests: ["EEG", "Serum sodium (see verify)"],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: [
      "FBDS often precede memory loss — treating early is the window",
      "Substantial response in 80%, but relapses in 35% (up to 8 y later); most survivors have mild residual cognitive deficit; 2-y case fatality 19% (van Sonderen 2016)",
      "VGKC-complex antibodies without LGI1/CASPR2 are not syndrome-specific and don't prove autoimmunity (Graus 2016)",
      "Serum LGI1 antibodies can persist after full recovery (Ariño 2016)"
    ],
    verify: ["Hyponatremia frequency and demographics (age, sex) not in the abstracts I could read — settle with van Sonderen 2016 Table 1", "Normal CSF and normal MRI proportions not reported in sources read — left UNKNOWN"],
    relatedIds: [AE, "neural-antibodies:caspr2"],
    sources: [S.vansonderenLgi1, S.arino2016, S.graus2016, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "caspr2",
    antigen: "CASPR2 (contactin-associated protein-like 2)",
    searchTerms: ["anti-CASPR2", "Caspr2", "Morvan syndrome", "neuromyotonia", "Isaacs syndrome", "VGKC"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "LOW",
    syndromes: [syn("Limbic encephalitis (42%)"), syn("Morvan syndrome (29%)"), syn("Peripheral nerve hyperexcitability (acquired neuromyotonia)"), syn("Cerebellar dysfunction, neuropathic pain, insomnia, dysautonomia, weight loss", false)],
    demographics: ["89% male (34/38); median onset 66 y; women younger (median 49 vs 68 y) (van Sonderen 2016)"],
    tumors: [tum("Thymoma (mostly)", "19% overall (van Sonderen 2016); ~50% malignant thymoma in Morvan syndrome, LE almost always nonparaneoplastic (PNS-Care)")],
    cancerScreening: [LOW_SCREEN, "Morvan syndrome: treated as intermediate risk by PNS-Care — screen for thymoma"],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Serum positive with both CBA and IHC in all 38 patients (van Sonderen 2016)", "CSF IHC was negative in 3 patients, all with tumor and Morvan syndrome"],
      methodNotes: ["IgG4 in all; IgG1 also in 63% (van Sonderen 2016)"]
    },
    csf: fp("OFTEN_NORMAL", ["Normal in 65% (van Sonderen 2016)"], ["Mild pleocytosis (6–20 cells/μL) in 7 patients"]),
    mri: fp("OFTEN_NORMAL", ["Unremarkable in 70% of patients with cognitive decline or seizures (van Sonderen 2016)"], ["Bilateral medial temporal T2 hyperintensity in 24%"]),
    otherTests: ["EMG/nerve conduction for peripheral nerve hyperexcitability"],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: [
      "Seven core features: encephalopathy (cognitive/seizures), cerebellar dysfunction, peripheral nerve hyperexcitability, dysautonomia, insomnia, neuropathic pain, weight loss — ≥3 in 77%",
      "Slow course: median time to nadir 4 months, >1 year in 30%",
      "Treatment response 93%; relapses 25% (van Sonderen 2016)"
    ],
    verify: [],
    relatedIds: [AE, "neural-antibodies:lgi1"],
    sources: [S.vansonderenCaspr2, S.pns2021, S.graus2016],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "gabab-r",
    antigen: "GABA-B receptor",
    searchTerms: ["anti-GABAB", "GABABR", "GABA-B receptor encephalitis", "KCTD16"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "INTERMEDIATE",
    syndromes: [syn("Limbic encephalitis with prominent seizures (95% eventually)"), syn("Status epilepticus, ataxia, opsoclonus-myoclonus", false)],
    demographics: ["Paraneoplastic cases mostly older men who smoke; most young patients are not paraneoplastic (PNS-Care)"],
    tumors: [tum("Small-cell lung cancer", ">50% (PNS-Care); 10/20 (50%), all with LE (Höftberger 2013)")],
    cancerScreening: [INT_SCREEN, "Chest CT (± PET) for SCLC"],
    testing: {
      preferredSpecimen: "CSF",
      rationale: ["Pooled: CSF positive 98.3% (71/72) vs serum 88.1% (69/77) (McKay 2019)"],
      methodNotes: [SURFACE_CONFIRM, "Co-occurring KCTD16 antibodies point to a paraneoplastic case (PNS-Care)"]
    },
    csf: fp("UNKNOWN", [], ["Pleocytosis 59.3% (51/86), elevated protein 43.9% (29/66); a substantial minority non-inflammatory (McKay 2019)"]),
    mri: fp("UNKNOWN", [], ["Unilateral or bilateral temporal T2 hyperintensity in 54.8% (51/94) (McKay 2019)"]),
    otherTests: ["Onconeuronal antibody panel"],
    immunotherapyResponse: "VARIABLE",
    pearls: [
      "SCLC patients often carry additional onconeuronal antibodies (Ri, amphiphysin, SOX1) (Höftberger 2013)",
      "Long-term prognosis is driven by the tumor; most improve with immunotherapy ± oncologic treatment (15/19)"
    ],
    verify: [],
    relatedIds: [AE],
    sources: [S.hoftberger2013, S.mckay2019, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "ampar",
    antigen: "AMPA receptor (GluA1/GluA2)",
    searchTerms: ["anti-AMPAR", "AMPA receptor encephalitis"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "INTERMEDIATE",
    syndromes: [syn("Limbic encephalitis (55%)"), syn("Limbic dysfunction with multifocal/diffuse encephalopathy (36%)"), syn("Psychosis with bipolar features", false)],
    demographics: ["Median 62 y (23–81); 14/22 female (Höftberger 2015)"],
    tumors: [tum("Lung cancer (incl. SCLC), thymoma, breast, ovarian teratoma", "64% (14/22): 5 lung, 4 thymoma, 2 breast, 2 ovarian teratoma pathologic + 1 lung radiologic (Höftberger 2015); >50% SCLC and malignant thymoma (PNS-Care)")],
    cancerScreening: [INT_SCREEN],
    testing: {
      preferredSpecimen: "CSF",
      rationale: ["Paired samples: CSF 14/14 vs serum 10/14 positive (Höftberger 2015)"],
      methodNotes: [SURFACE_CONFIRM]
    },
    csf: fp("UNKNOWN", [], ["Pleocytosis 11/22 (median 23 cells/μL); elevated protein 10/20; isolated protein elevation 5/22 (Höftberger 2015)"]),
    mri: fp("UNKNOWN", [], ["LE subgroup: mesiotemporal FLAIR/T2 hyperintensity in 11/12", "Diffuse subgroup: multifocal cortical, basal ganglia, thalamic, hypothalamic lesions"]),
    otherTests: ["Onconeuronal antibody panel (coexisting antibodies in 7/22)"],
    immunotherapyResponse: "VARIABLE",
    pearls: [
      "Coexisting onconeuronal antibodies predicted poor outcome; all 5 deaths had tumor or additional paraneoplastic symptoms",
      "Response: 5 good, 10 partial, 6 none (n=21)",
      "Relapses occurred only without aggressive therapy (0/19 vs 6/18) (Höftberger 2015)"
    ],
    verify: ["Overall normal CSF and normal MRI counts appear only in Table 1 of Höftberger 2015 — my extraction (CSF normal 6/22, MRI normal 4/22) is unconfirmed; left UNKNOWN"],
    relatedIds: [AE],
    sources: [S.hoftberger2015, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "gabaa-r",
    antigen: "GABA-A receptor (α1/β3 ± γ2 subunits)",
    searchTerms: ["anti-GABAA", "GABAAR", "GABA-A receptor encephalitis"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "LOW",
    syndromes: [syn("Encephalitis with seizures (88%) and refractory status epilepticus"), syn("Cognitive, behavioral, consciousness changes; movement disorders (more in children)")],
    demographics: ["Children and adults: median 40.5 y; children median 13 y, adults median 59 y; 50% female (Spatola 2017)"],
    tumors: [tum("Malignant thymoma (mostly)", "<30% overall (PNS-Care); 9/15 adults vs 1/10 children (Spatola 2017)")],
    cancerScreening: [LOW_SCREEN, "Adults: screen for thymoma"],
    testing: {
      preferredSpecimen: "BOTH",
      rationale: ["Paired samples: both positive 14/16, serum-only 2/16, none CSF-only (Spatola 2017)"],
      methodNotes: []
    },
    csf: fp("SOMETIMES_NORMAL", ["Abnormal in 58% (15/26); children 10/11, adults 5/15 (Spatola 2017)"], ["Pleocytosis, elevated protein, or oligoclonal bands"]),
    mri: fp("RARELY_NORMAL", ["Abnormal in 88% (23/26) (Spatola 2017)"], ["Multifocal, asynchronous cortical-subcortical T2/FLAIR lesions in 77% — temporal (95%) and frontal (65%), also basal ganglia"]),
    otherTests: ["EEG: epileptiform activity in 16/21 (Spatola 2017)", "Evaluate for myasthenia/thymoma"],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: [
      "Multifocal cortical-subcortical MRI lesions are the diagnostic clue",
      "Children: more often post-viral (post-HSV, HHV6, with coexisting NMDAR antibodies); adults: tumor-related",
      "Substantial improvement in 18/21; 3 died (Spatola 2017)"
    ],
    verify: [],
    relatedIds: [AE, "acute-neuro:refractory-super-refractory-se"],
    sources: [S.spatola2017, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "dppx",
    antigen: "DPPX (dipeptidyl-peptidase-like protein 6)",
    searchTerms: ["anti-DPPX", "DPP6", "hyperekplexia", "PERM"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "LOW",
    syndromes: [syn("Prodromal weight loss/diarrhea → cognitive-mental dysfunction + CNS hyperexcitability (hyperekplexia, myoclonus, tremor, seizures); triad in 67%"), syn("Brainstem/cerebellar dysfunction; PERM", false)],
    demographics: ["Median 57 y, 8/9 male (Hara 2017); median 53 y, 12/20 men (Tobin 2014)"],
    tumors: [tum("B-cell neoplasms (lymphoma)", "<10% (PNS-Care); mantle cell lymphoma in 1/9 (Hara 2017)")],
    cancerScreening: [LOW_SCREEN],
    testing: {
      preferredSpecimen: "BOTH",
      rationale: ["Serum positive in 20/20; CSF positive in all 7 tested (Tobin 2014)"],
      methodNotes: ["IgG4 and IgG1 in all (Hara 2017)"]
    },
    csf: fp("UNKNOWN", [], ["Pleocytosis 5/9 (median 12 cells/μL); intrathecal IgG synthesis 2/5 (Hara 2017)"]),
    mri: fp("OFTEN_NORMAL", ["Normal in 5/9 (Hara 2017; small series)"], ["Nonspecific white-matter T2/FLAIR changes in 3/9; temporal atrophy 1/9"]),
    otherTests: ["EEG (slow background 5/7)", "GI evaluation for unexplained diarrhea/weight loss"],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: [
      "Unexplained weight loss (median 20 kg) or diarrhea preceding neurologic symptoms (median 4 months) is the clue",
      "Peak may come late (median 8 months); relapses in 23%, immunotherapy-responsive (Hara 2017)"
    ],
    verify: [],
    relatedIds: [AE, "neural-antibodies:glyr"],
    sources: [S.hara2017, S.tobin2014, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "glyr",
    antigen: "Glycine receptor (α1 subunit)",
    searchTerms: ["anti-GlyR", "glycine receptor", "PERM", "stiff person"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "LOW",
    syndromes: [syn("Progressive encephalomyelitis with rigidity and myoclonus (PERM) — majority"), syn("Stiff-person syndrome, limbic encephalitis/epileptic encephalopathy, brainstem syndromes", false)],
    demographics: [],
    tumors: [tum("Malignant thymoma, Hodgkin lymphoma", "<10% (PNS-Care); 3 thymoma + 1 lymphoma among 45 (Carvajal-González 2014)")],
    cancerScreening: [LOW_SCREEN],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Serum levels higher than (10/11) or equal to (1/11) CSF; intrathecal synthesis in all 6 pairs studied (Carvajal-González 2014)"],
      methodNotes: ["Brain IHC isn't useful for GlyR — rely on CBA (PNS-Care 2021)", "Very low serum titers with alternative diagnoses were excluded from the cohort — interpret low titers with caution"]
    },
    csf: fp("UNKNOWN", [], ["Inflammatory CSF in ~50%; oligoclonal bands frequently negative (2016 review table)"]),
    mri: fp("UNKNOWN", [], ["Temporal T2/FLAIR abnormalities in <30% (2016 review table)"]),
    otherTests: [],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: [
      "Most improve markedly with immunotherapy (median mRS 5 → 1), but 4/45 died acutely and relapses occur — maintenance immunosuppression may be needed",
      "Can coexist with high-titer GAD65 antibodies (4 patients)"
    ],
    verify: ["CSF and MRI rates come from a 2016 review table (no primary figures available to me) — confirm with Carvajal-González 2014 full text"],
    relatedIds: [AE, "neural-antibodies:dppx"],
    sources: [S.carvajal2014, S.inhibRev2016, S.pns2021],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.1.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
