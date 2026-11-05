// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: append batch 2 to data/neural-antibodies.json
import fs from "node:fs";
const path = "data/neural-antibodies.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const syn = (syndrome, typical = true) => ({ syndrome, typical });
const tum = (tumor, frequencyText) => ({ tumor, frequencyText });
const fp = (normalLikelihood, normalPercentText, typicalFindings) => ({ normalLikelihood, normalPercentText, typicalFindings });

const S = {
  graus2016: "Graus F, et al. A clinical approach to diagnosis of autoimmune encephalitis. Lancet Neurol 2016;15(4):391-404. doi:10.1016/S1474-4422(15)00401-9",
  pns2021: "Graus F, et al. Updated diagnostic criteria for paraneoplastic neurologic syndromes (PNS-Care). Neurol Neuroimmunol Neuroinflamm 2021;8:e1014. doi:10.1212/NXI.0000000000001014",
  spatola2018: "Spatola M, et al. Encephalitis with mGluR5 antibodies: symptoms and antibody effects. Neurology 2018;90(22):e1964-e1972. doi:10.1212/WNL.0000000000005614",
  spatola2020: "Spatola M, et al. Clinical features, prognostic factors, and antibody effects in anti-mGluR1 encephalitis. Neurology 2020;95(22):e3012-e3025. doi:10.1212/WNL.0000000000010854",
  gaig2017: "Gaig C, et al. Clinical manifestations of the anti-IgLON5 disease. Neurology 2017;88(18):1736-1743. doi:10.1212/WNL.0000000000003887",
  titulaer2011: "Titulaer MJ, et al. Clinical Dutch-English Lambert-Eaton myasthenic syndrome (LEMS) tumor association prediction score accurately predicts small-cell lung cancer in the LEMS. J Clin Oncol 2011;29(7):902-908. doi:10.1200/JCO.2010.32.0440",
  munoz2020: "Muñoz-Lopetegi A, et al. Neurologic syndromes related to anti-GAD65: clinical and serologic response to treatment. Neurol Neuroimmunol Neuroinflamm 2020;7(3):e696. doi:10.1212/NXI.0000000000000696",
  pittock2005: "Pittock SJ, et al. Amphiphysin autoimmunity: paraneoplastic accompaniments. Ann Neurol 2005;58(1):96-107. doi:10.1002/ana.20529"
};

const SURFACE_CONFIRM = "Surface antibody positive in serum only (CSF negative): confirm with tissue IHC or a research laboratory before calling it definite (PNS-Care 2021)";
const CONFIRM_IHC = "Confirm commercial line-blot/CBA positives with brain IHC, especially with low titer, serum-only testing, or a mismatched phenotype (PNS-Care 2021)";
const LOW_SCREEN = "Comprehensive cancer screening at initial diagnosis is sufficient for lower-risk antibodies (PNS-Care 2021)";
const INT_SCREEN = "Screen at diagnosis; if negative, repeat every 4–6 months for 2 years when a high-risk phenotype occurs with older age, smoking, or a concurrent high-risk antibody (PNS-Care 2021)";
const HIGH_SCREEN = "High-risk antibody: if initial screening is negative, repeat every 4–6 months for 2 years (PNS-Care 2021)";
const AE = "acute-neuro:autoimmune-encephalitis";

const entries = [
  {
    id: "mglur5",
    antigen: "Metabotropic glutamate receptor 5 (mGluR5)",
    searchTerms: ["anti-mGluR5", "Ophelia syndrome", "Hodgkin encephalitis"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "INTERMEDIATE",
    syndromes: [syn("Encephalitis with psychiatric (10/11) and cognitive (10/11) symptoms, movement disorders (7/11), sleep dysfunction (7/11), seizures (6/11) — not restricted to LE"), syn("Limbic encephalitis with Hodgkin lymphoma (Ophelia syndrome)")],
    demographics: ["Median 29 y (6–75); 5/11 female (Spatola 2018)"],
    tumors: [tum("Hodgkin lymphoma", "~50% (PNS-Care); 5/11 Hodgkin + 1/11 SCLC (Spatola 2018)")],
    cancerScreening: [INT_SCREEN, "Screen for Hodgkin lymphoma (CT chest/abdomen/pelvis ± PET per local protocol)"],
    testing: {
      preferredSpecimen: "BOTH",
      rationale: ["No paired serum/CSF sensitivity data in the sources read; PNS-Care recommends testing both for surface antibodies"],
      methodNotes: [SURFACE_CONFIRM]
    },
    csf: fp("RARELY_NORMAL", ["Pleocytosis in 11/11 (median 22 cells/mm³) (Spatola 2018)"], []),
    mri: fp("OFTEN_NORMAL", ["Abnormal in 5/11 — normal in 6/11 (Spatola 2018)"], ["Limbic (1/5) or extralimbic (4/5) involvement"]),
    otherTests: [],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: [
      "Median peak mRS 4; 4/11 needed ICU care, yet at median 48 months 6 recovered completely and 5 partially",
      "Relapses in 2/11 (Spatola 2018)"
    ],
    verify: [],
    relatedIds: [AE],
    sources: [S.spatola2018, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "mglur1",
    antigen: "Metabotropic glutamate receptor 1 (mGluR1)",
    searchTerms: ["anti-mGluR1", "autoimmune cerebellar ataxia"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "LOW",
    syndromes: [syn("Subacute cerebellar syndrome"), syn("Cerebellar syndrome with behavioral/cognitive or other neurologic symptoms (86%)")],
    demographics: ["Median 55 y (n=30, new + previously reported) (Spatola 2020)"],
    tumors: [tum("Mostly hematologic malignancies", "~30% (PNS-Care); 3/26 (11%) (Spatola 2020)")],
    cancerScreening: [LOW_SCREEN],
    testing: {
      preferredSpecimen: "BOTH",
      rationale: ["No paired serum/CSF sensitivity data in the sources read; PNS-Care recommends testing both"],
      methodNotes: [SURFACE_CONFIRM, "Antibodies mainly IgG1 (Spatola 2020)"]
    },
    csf: fp("UNKNOWN", [], []),
    mri: fp("OFTEN_NORMAL", ["Normal at onset in 12/19 (63%) (Spatola 2020)"], ["Cerebellar atrophy at follow-up in 10/12 (83%)"]),
    otherTests: [],
    immunotherapyResponse: "VARIABLE",
    pearls: [
      "Outcome (n=25): stabilization 52%, significant improvement 40%, 2 died — long-term disability and cerebellar atrophy are common",
      "Worse initial disability (needing walking assistance, higher SARA) predicted bad outcome — treat early (Spatola 2020)"
    ],
    verify: ["CSF findings not in the abstract — settle with Spatola 2020 full text"],
    relatedIds: [AE],
    sources: [S.spatola2020, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "iglon5",
    antigen: "IgLON5",
    searchTerms: ["anti-IgLON5", "IgLON5 disease", "parasomnia", "PSP-like"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "NOT_CLASSIFIED",
    syndromes: [syn("Sleep disorder: NREM/REM parasomnia with sleep-breathing difficulty (36% at diagnosis; all eventually had sleep problems)"), syn("Bulbar syndrome: dysphagia, sialorrhea, stridor, acute respiratory insufficiency (27%)"), syn("PSP-like syndrome (23%)"), syn("Cognitive decline ± chorea (14%)", false)],
    demographics: ["Median 64 y (46–83) (Gaig 2017)"],
    tumors: [],
    cancerScreening: ["No cancer association established (1 hypernephroma in 22)"],
    testing: {
      preferredSpecimen: "BOTH",
      rationale: ["Paired samples: both positive 14/16, serum-only 2/16 (both PSP-like) (Gaig 2017)"],
      methodNotes: ["IgG4 predominates (16/21); IgG1 + IgG4 in 20/21"]
    },
    csf: fp("UNKNOWN", [], []),
    mri: fp("UNKNOWN", [], []),
    otherTests: ["Video-polysomnography", "HLA typing: DRB1*10:01 and DQB1*05:01 in 13/15 (87%)"],
    immunotherapyResponse: "VARIABLE",
    pearls: [
      "Mimics a neurodegenerative disorder (PSP, chronic sleep disorder) — the antibody is missed unless considered",
      "Stridor and acute respiratory insufficiency can be life-threatening"
    ],
    verify: ["CSF, MRI, and immunotherapy response not in the abstract — settle with Gaig 2017 full text"],
    relatedIds: [AE],
    sources: [S.gaig2017],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "p-q-vgcc",
    antigen: "P/Q-type voltage-gated calcium channel (VGCC)",
    searchTerms: ["VGCC", "P/Q", "Lambert-Eaton", "LEMS", "DELTA-P", "paraneoplastic cerebellar degeneration"],
    antigenClass: "NEURONAL_SURFACE",
    pnsRisk: "INTERMEDIATE",
    syndromes: [syn("Lambert-Eaton myasthenic syndrome: proximal leg-predominant weakness, autonomic dysfunction (~90%), reduced reflexes that improve after exercise"), syn("Rapidly progressive cerebellar syndrome")],
    demographics: [],
    tumors: [tum("Small-cell lung cancer", "~50% in LEMS; nearly 90% with rapidly progressive cerebellar syndrome (PNS-Care)")],
    cancerScreening: [INT_SCREEN, "LEMS: use the DELTA-P score to estimate SCLC risk (see pearls)"],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Present in nearly 90% of LEMS, similarly in paraneoplastic and nonparaneoplastic forms (PNS-Care)"],
      methodNotes: ["Brain IHC isn't useful for P/Q VGCC antibodies (PNS-Care)", "SOX1 antibodies in LEMS strongly suggest SCLC; N-type VGCC co-occurrence may be slightly more common in paraneoplastic LEMS (PNS-Care)"]
    },
    csf: fp("UNKNOWN", [], []),
    mri: fp("UNKNOWN", [], []),
    otherTests: ["Electrodiagnostic confirmation of LEMS is required (PNS-Care)", "SOX1 antibodies"],
    immunotherapyResponse: "VARIABLE",
    pearls: [
      "DELTA-P (1 point each, at or within 3 months of onset): age ≥50, smoking at diagnosis, weight loss ≥5%, bulbar involvement, erectile dysfunction, low Karnofsky score — 0–1 points = 0–2.6% SCLC; 4, 5, 6 points = 93.5%, 96.6%, 100% (Titulaer 2011)",
      "LEMS + VGCC without cancer is 'probable' PNS; upgrade if SCLC appears within 2 years, downgrade to 'possible' after >2 years without cancer (PNS-Care)"
    ],
    verify: ["DELTA-P Karnofsky cutoff and the authors' rescreening schedule — abstract truncated; settle with Titulaer 2011 full text"],
    relatedIds: ["acute-neuro:neuromuscular-respiratory-failure", "neural-antibodies:sox1"],
    sources: [S.pns2021, S.titulaer2011],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "gad65",
    antigen: "Glutamic acid decarboxylase 65 (GAD65)",
    searchTerms: ["anti-GAD", "GAD65", "stiff person syndrome", "SPS", "autoimmune epilepsy"],
    antigenClass: "INTRACELLULAR_SYNAPTIC",
    pnsRisk: "LOW",
    syndromes: [syn("Stiff-person syndrome"), syn("Cerebellar ataxia"), syn("Chronic (temporal lobe) epilepsy"), syn("Limbic encephalitis"), syn("Overlap of the above", false)],
    demographics: ["Paraneoplastic cases are older, more often male, with associated neuronal antibodies and atypical presentations (PNS-Care)"],
    tumors: [tum("SCLC, other neuroendocrine tumors, malignant thymoma", "<15% (PNS-Care); cancer association mainly with LE, men >50 (Graus 2016)")],
    cancerScreening: [LOW_SCREEN, "GAD65-associated SPS: call it paraneoplastic only if the tumor expresses GAD65 (PNS-Care)"],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Titer matters: classic syndromes in 34/36 (94%) with serum >10,000 IU/mL by ELISA; low titers, especially with atypical phenotypes, make alternative diagnoses more likely (Muñoz-Lopetegi 2020)"],
      methodNotes: ["Low-titer GAD65 is common in type 1 diabetes — interpret with titer and phenotype", CONFIRM_IHC]
    },
    csf: fp("UNKNOWN", [], []),
    mri: fp("UNKNOWN", [], []),
    otherTests: ["Serum titer (quantitative ELISA)", "EMG for stiff-person syndrome"],
    immunotherapyResponse: "VARIABLE",
    pearls: [
      "High-titer patients mostly improve with immunotherapy but rarely recover completely",
      "Falling serum concentration tracked clinical improvement (15/17 fell, 14 improved; the 2 unchanged didn't improve) (Muñoz-Lopetegi 2020)"
    ],
    verify: ["CSF and MRI frequencies not in the abstract — settle with Muñoz-Lopetegi 2020 full text"],
    relatedIds: [AE, "neural-antibodies:amphiphysin", "neural-antibodies:glyr"],
    sources: [S.munoz2020, S.pns2021, S.graus2016],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "amphiphysin",
    antigen: "Amphiphysin",
    searchTerms: ["anti-amphiphysin", "paraneoplastic stiff person", "breast cancer"],
    antigenClass: "INTRACELLULAR_SYNAPTIC",
    pnsRisk: "HIGH",
    syndromes: [syn("Neuropathy / polyradiculoneuropathy, sensory neuronopathy (most frequent)"), syn("Encephalomyelitis, myelopathy"), syn("Stiff-person phenomena (39% of women, 12% of men; full SPS criteria in 10% and 4%)"), syn("Cerebellar syndrome", false)],
    demographics: ["Isolated amphiphysin-IgG (19/63): more often women with breast cancer, myelopathy, or stiff-person phenomena (Pittock 2005)"],
    tumors: [tum("SCLC, breast cancer", "~80% (PNS-Care); cancer in 50/63: SCLC 27, breast 16, NSCLC 1, melanoma 2 (Pittock 2005)")],
    cancerScreening: [HIGH_SCREEN, "Chest CT and breast imaging"],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Cohort identified by serum testing (Pittock 2005); PNS-Care recommends testing both serum and CSF"],
      methodNotes: ["Intracellular antigen: confirm with immunoblot after tissue IHC (PNS-Care)", "Coexisting paraneoplastic antibodies in 74% — they predict the tumor (Pittock 2005)"]
    },
    csf: fp("UNKNOWN", [], []),
    mri: fp("UNKNOWN", [], []),
    otherTests: ["Full onconeuronal panel", "EMG/nerve conduction"],
    immunotherapyResponse: "USUALLY_POOR",
    pearls: [
      "Paraneoplastic SPS with amphiphysin: older patients, more neck and upper-limb involvement than GAD65 SPS (PNS-Care)",
      "Amphiphysin or CV2/CRMP5 can replace Hu in some LE with SCLC (Graus 2016)"
    ],
    verify: ["CSF/MRI frequencies and immunotherapy response not in the sources read — USUALLY_POOR is my inference from its intracellular, high-risk class; settle with Pittock 2005 full text"],
    relatedIds: [AE, "neural-antibodies:gad65"],
    sources: [S.pittock2005, S.pns2021, S.graus2016],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.2.0";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
