// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: append batch 3 (classic onconeuronal antibodies) to data/neural-antibodies.json
import fs from "node:fs";
const path = "data/neural-antibodies.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const syn = (syndrome, typical = true) => ({ syndrome, typical });
const tum = (tumor, frequencyText) => ({ tumor, frequencyText });
const fp = (normalLikelihood, normalPercentText, typicalFindings) => ({ normalLikelihood, normalPercentText, typicalFindings });

const S = {
  graus2016: "Graus F, et al. A clinical approach to diagnosis of autoimmune encephalitis. Lancet Neurol 2016;15(4):391-404. doi:10.1016/S1474-4422(15)00401-9",
  pns2021: "Graus F, et al. Updated diagnostic criteria for paraneoplastic neurologic syndromes (PNS-Care). Neurol Neuroimmunol Neuroinflamm 2021;8:e1014. doi:10.1212/NXI.0000000000001014",
  psimaras2010: "Psimaras D, Carpentier AF, Rossi C; PNS Euronetwork. Cerebrospinal fluid study in paraneoplastic syndromes. J Neurol Neurosurg Psychiatry 2010;81(1):42-45. doi:10.1136/jnnp.2008.159483",
  graus2001: "Graus F, et al. Anti-Hu-associated paraneoplastic encephalomyelitis: analysis of 200 patients. Brain 2001;124(6):1138-1148. doi:10.1093/brain/124.6.1138",
  saiz2009: "Saiz A, et al. Anti-Hu-associated brainstem encephalitis. J Neurol Neurosurg Psychiatry 2009;80(4):404-407",
  yu2001: "Yu Z, et al. CRMP-5 neuronal autoantibody: marker of lung cancer and thymoma-related autoimmunity. Ann Neurol 2001;49(2):146-154",
  pittock2003: "Pittock SJ, Lucchinetti CF, Lennon VA. Anti-neuronal nuclear autoantibody type 2: paraneoplastic accompaniments. Ann Neurol 2003;53(5):580-587. doi:10.1002/ana.10518",
  pittock2010: "Pittock SJ, et al. Paraneoplastic jaw dystonia and laryngospasm with antineuronal nuclear autoantibody type 2 (anti-Ri). Arch Neurol 2010. doi:10.1001/archneurol.2010.209",
  rojas2000: "Rojas I, et al. Long-term clinical outcome of paraneoplastic cerebellar degeneration and anti-Yo antibodies. Neurology 2000;55(5):713-715. doi:10.1212/WNL.55.5.713",
  dalmau2004: "Dalmau J, et al. Clinical analysis of anti-Ma2-associated encephalitis. Brain 2004;127(8):1831-1844. doi:10.1093/brain/awh203",
  bernal2003: "Bernal F, et al. Anti-Tr antibodies as markers of paraneoplastic cerebellar degeneration and Hodgkin's disease. Neurology 2003;60(2):230-234",
  degraaff2012: "de Graaff E, et al. Identification of delta/notch-like epidermal growth factor-related receptor as the Tr antigen in paraneoplastic cerebellar degeneration. Ann Neurol 2012;71(6):815-824. doi:10.1002/ana.23550",
  sabater2008: "Sabater L, et al. SOX1 antibodies are markers of paraneoplastic Lambert-Eaton myasthenic syndrome. Neurology 2008;70(12):924-928",
  titulaer2011: "Titulaer MJ, et al. Clinical Dutch-English Lambert-Eaton myasthenic syndrome (LEMS) tumor association prediction score accurately predicts small-cell lung cancer in the LEMS. J Clin Oncol 2011;29(7):902-908. doi:10.1200/JCO.2010.32.0440",
  dubey2020: "Dubey D, et al. Expanded clinical phenotype, oncological associations, and immunopathologic insights of paraneoplastic Kelch-like protein-11 encephalitis. JAMA Neurol 2020;77(11):1420-1429. doi:10.1001/jamaneurol.2020.2231"
};

const HIGH_SCREEN = "High-risk antibody: if initial screening is negative, repeat every 4–6 months for 2 years (PNS-Care 2021)";
const INTRA = "Intracellular antigen: tissue IHC/IF with confirmatory immunoblot; confirm commercial line-blot positives with IHC, especially at low titer or with a mismatched phenotype (PNS-Care 2021)";
const PNS_CSF = (extra = []) => fp("RARELY_NORMAL", ["Pooled Hu/Yo/CV2/Ri/Ma/Tr cohort: CSF abnormal in 93% (n=295); profile similar across antibody types (Psimaras 2010)"], ["Pleocytosis more often early: 47% before vs 28% after month 3; oligoclonal bands the only abnormality in 10%", ...extra]);
const AE = "acute-neuro:autoimmune-encephalitis";

const entries = [
  {
    id: "anti-hu",
    antigen: "Hu (ANNA-1)",
    searchTerms: ["anti-Hu", "ANNA-1", "HuD", "sensory neuronopathy", "encephalomyelitis"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Sensory neuronopathy"), syn("Encephalomyelitis"), syn("Limbic encephalitis"), syn("Chronic gastrointestinal pseudo-obstruction"), syn("Brainstem encephalitis", false)],
    demographics: ["Median 63 y (28–82); 75% men (Graus 2001, n=200)", "LE with Hu antibodies is usually nonparaneoplastic in patients <18 y (PNS-Care)"],
    tumors: [tum("SCLC >> NSCLC, other neuroendocrine tumors, neuroblastoma", "85% (PNS-Care); >85% of Hu-positive patients have SCLC")],
    cancerScreening: [HIGH_SCREEN, "Chest CT ± FDG-PET for SCLC"],
    testing: { preferredSpecimen: "SERUM", rationale: ["Onconeuronal antibodies are usually detected in serum; PNS-Care recommends testing serum and CSF"], methodNotes: [INTRA] },
    csf: PNS_CSF(),
    mri: fp("UNKNOWN", [], ["Brainstem encephalitis subgroup: MRI normal in 22/22; pleocytosis in only 2/19 (Saiz 2009)"]),
    otherTests: ["Nerve conduction studies (sensory neuronopathy)", "Full onconeuronal panel"],
    immunotherapyResponse: "USUALLY_POOR",
    pearls: [
      "Tumor treatment (± immunotherapy) independently predicted improvement or stabilization (OR 4.56); immunotherapy alone showed no clear benefit (Graus 2001)",
      "Treat the cancer early while the patient is still independent"
    ],
    verify: ["Overall MRI findings in Hu encephalomyelitis not in the abstracts read — settle with Graus 2001 full text"],
    relatedIds: [AE, "neural-antibodies:cv2-crmp5", "neural-antibodies:amphiphysin"],
    sources: [S.pns2021, S.graus2001, S.saiz2009, S.psimaras2010],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "cv2-crmp5",
    antigen: "CV2 / CRMP5 (collapsin response-mediator protein 5)",
    searchTerms: ["anti-CV2", "CRMP-5", "CRMP5-IgG", "paraneoplastic chorea", "optic neuropathy"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Encephalomyelitis, sensory neuronopathy"), syn("Peripheral neuropathy (47%), autonomic neuropathy (31%), cerebellar ataxia (26%), subacute dementia (25%)"), syn("Chorea (11%); cranial neuropathy (17%) incl. loss of smell/taste and optic neuropathy"), syn("Neuromuscular junction disorders (12%)", false)],
    demographics: ["Patients with thymoma are younger and more often have myasthenia gravis, less often neuropathy (PNS-Care)"],
    tumors: [tum("SCLC and thymoma", ">80% (PNS-Care); lung carcinoma (mostly limited SCLC) 77%, thymoma 6% (Yu 2001)")],
    cancerScreening: [HIGH_SCREEN, "Chest CT ± FDG-PET (SCLC, thymoma)"],
    testing: { preferredSpecimen: "BOTH", rationale: ["CSF titer equaled or exceeded serum in 37% (Yu 2001)"], methodNotes: [INTRA] },
    csf: fp("RARELY_NORMAL", ["Inflammatory in 86% (Yu 2001)", "Pooled cohort incl. CV2: abnormal in 93% (Psimaras 2010)"], []),
    mri: fp("UNKNOWN", [], []),
    otherTests: ["Ophthalmology exam (optic neuropathy)", "Acetylcholine receptor antibodies if thymoma"],
    immunotherapyResponse: "VARIABLE",
    pearls: ["Multifocal neuraxis involvement; chorea or vision loss in a smoker should prompt testing", "Can replace Hu in some LE with SCLC (Graus 2016)"],
    verify: ["MRI frequencies and immunotherapy response not in the abstract — settle with Yu 2001 full text"],
    relatedIds: [AE, "neural-antibodies:anti-hu"],
    sources: [S.pns2021, S.yu2001, S.psimaras2010, S.graus2016],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "anti-ri",
    antigen: "Ri (ANNA-2; NOVA1/NOVA2)",
    searchTerms: ["anti-Ri", "ANNA-2", "opsoclonus-myoclonus", "jaw dystonia", "laryngospasm"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Brainstem/cerebellar syndrome"), syn("Opsoclonus-myoclonus"), syn("Jaw-opening dystonia and laryngospasm (9/48, 19%)"), syn("Myelopathy, peripheral neuropathy, seizures", false)],
    demographics: ["10 men / 18 women (Pittock 2003); breast cancer in women, lung cancer in men (PNS-Care)"],
    tumors: [tum("Breast > lung (SCLC and NSCLC)", ">70% (PNS-Care)")],
    cancerScreening: [HIGH_SCREEN, "Breast imaging in women; chest CT ± FDG-PET"],
    testing: { preferredSpecimen: "SERUM", rationale: ["Cohort defined by serum immunofluorescence screening (Pittock 2003); PNS-Care recommends serum and CSF"], methodNotes: [INTRA, "Coexisting paraneoplastic antibodies in 73% (Hu, ANNA-3, CRMP5, P/Q and N-type VGCC, AChR) (Pittock 2003)"] },
    csf: PNS_CSF(),
    mri: fp("UNKNOWN", [], []),
    otherTests: ["Swallow/airway assessment if jaw dystonia or laryngospasm"],
    immunotherapyResponse: "VARIABLE",
    pearls: ["32% wheelchair-bound 1 month after onset, yet most improved after immunomodulatory or tumor-directed therapy (Pittock 2003)", "Jaw dystonia can cause severe malnutrition; laryngospasm is an airway risk (Pittock 2010)"],
    verify: ["MRI frequencies not in the abstracts — settle with Pittock 2003 full text"],
    relatedIds: ["neural-antibodies:anti-hu", "neural-antibodies:p-q-vgcc"],
    sources: [S.pns2021, S.pittock2003, S.pittock2010, S.psimaras2010],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "anti-yo",
    antigen: "Yo (PCA-1; CDR2/CDR2L)",
    searchTerms: ["anti-Yo", "PCA-1", "paraneoplastic cerebellar degeneration", "PCD"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Rapidly progressive cerebellar syndrome")],
    demographics: ["Almost all female; in men, antigen expression by the tumor should be proven (PNS-Care)"],
    tumors: [tum("Ovarian and breast cancer", ">90% (PNS-Care); 30/34: breast 12 (all node-positive), gynecologic 18 incl. ovary 13 (Rojas 2000)")],
    cancerScreening: [HIGH_SCREEN, "Breast and pelvic (gynecologic) imaging; FDG-PET if conventional imaging is negative", "PCD led to the cancer diagnosis in 63% (Rojas 2000)"],
    testing: { preferredSpecimen: "SERUM", rationale: ["Serum detection standard; PNS-Care recommends serum and CSF"], methodNotes: [INTRA, "Yo in a man or with an incongruent phenotype (e.g., seizures) — seek expert confirmatory testing (PNS-Care Table 4)"] },
    csf: PNS_CSF(),
    mri: fp("UNKNOWN", [], ["Cerebellar atrophy may develop later"]),
    otherTests: [],
    immunotherapyResponse: "USUALLY_POOR",
    pearls: ["94% became nonambulatory; no patient improved with cancer treatment or immunotherapy (Rojas 2000)", "Median survival 100 months with breast vs 22 months with gynecologic cancer — tumor type drives survival"],
    verify: ["MRI frequencies not reported in Rojas 2000 — need a cohort with imaging data"],
    relatedIds: [],
    sources: [S.pns2021, S.rojas2000, S.psimaras2010],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "ma2",
    antigen: "Ma2 (± Ma1)",
    searchTerms: ["anti-Ma2", "anti-Ta", "Ma1", "diencephalic encephalitis", "testicular"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Limbic, diencephalic, or brainstem encephalitis (95% over follow-up); classic LE alone only 26%"), syn("Excessive daytime sleepiness (32%), sometimes narcolepsy-cataplexy with low CSF hypocretin"), syn("Hypothalamic-diencephalic involvement (34%)"), syn("Eye movement abnormalities with brainstem involvement", false)],
    demographics: ["Young men → testicular tumors and isolated Ma2; older patients → lung cancer, often with Ma1 + Ma2 (PNS-Care; Dalmau 2004)"],
    tumors: [tum("Testicular germ-cell tumor, NSCLC", ">75% (PNS-Care); 34/38 had cancer, 53% testicular germ-cell (Dalmau 2004)")],
    cancerScreening: [HIGH_SCREEN, "Men: testicular ultrasound (microcalcification and cryptorchidism were risk markers in 2 patients without cancer); chest CT", "Neurologic symptoms preceded tumor diagnosis in 62% (Dalmau 2004)"],
    testing: { preferredSpecimen: "SERUM", rationale: ["PNS-Care recommends serum and CSF"], methodNotes: [INTRA, "Additional Ma1 antibodies (15/38): more non-testicular tumors, ataxia, and worse prognosis"] },
    csf: PNS_CSF(["CSF hypocretin can be low with hypersomnolence (Dalmau 2004)"]),
    mri: fp("SOMETIMES_NORMAL", ["Abnormal in 74% overall; 89% with limbic or diencephalic dysfunction (Dalmau 2004)"], ["T2/FLAIR changes in medial temporal lobes, diencephalon/hypothalamus, or upper brainstem"]),
    otherTests: ["Endocrine panel (hypothalamic involvement)", "Sleep study / CSF hypocretin if hypersomnolent"],
    immunotherapyResponse: "VARIABLE",
    pearls: ["Better outcome with male sex, age <45, testicular tumor with complete response, no Ma1 antibodies, limited CNS involvement", "Immunosuppression wasn't associated with improvement overall but clearly helped some (Dalmau 2004)", "MRI can mimic a tumor — test for Ma2 before biopsy"],
    verify: [],
    relatedIds: [AE, "neural-antibodies:klhl11"],
    sources: [S.pns2021, S.dalmau2004, S.psimaras2010],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "tr-dner",
    antigen: "Tr (DNER, delta/notch-like EGF-related receptor)",
    searchTerms: ["anti-Tr", "DNER", "PCA-Tr", "Hodgkin cerebellar"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Rapidly progressive cerebellar syndrome (27/28)"), syn("Possible limbic encephalitis", false)],
    demographics: ["Median 61 y (14–75); 22/28 male (Bernal 2003)"],
    tumors: [tum("Hodgkin lymphoma", "90% (PNS-Care); 25/28 (Bernal 2003)")],
    cancerScreening: [HIGH_SCREEN, "CT chest/abdomen/pelvis ± FDG-PET for Hodgkin lymphoma"],
    testing: {
      preferredSpecimen: "BOTH",
      rationale: ["CSF positive with serum negative in 2/28 — send CSF (Bernal 2003)"],
      methodNotes: ["DNER cell-based assay available (de Graaff 2012)", "Antibodies disappeared spontaneously in all patients without tumor and in 10/10 after successful Hodgkin treatment — a negative later test doesn't exclude Tr-PCD"]
    },
    csf: PNS_CSF(),
    mri: fp("UNKNOWN", [], []),
    otherTests: [],
    immunotherapyResponse: "VARIABLE",
    pearls: ["Tr immunoreactivity is usually absent in the tumor itself (Bernal 2003)"],
    verify: ["Antigen class: DNER is a transmembrane protein — confirm whether to class as NEURONAL_SURFACE", "MRI and treatment response not in the abstract — settle with Bernal 2003 full text"],
    relatedIds: ["neural-antibodies:mglur1"],
    sources: [S.pns2021, S.bernal2003, S.degraaff2012, S.psimaras2010],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "sox1",
    antigen: "SOX1 (anti-glial nuclear antibody, AGNA)",
    searchTerms: ["anti-SOX1", "AGNA", "anti-glial nuclear", "LEMS SCLC"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Lambert-Eaton myasthenic syndrome with or without rapidly progressive cerebellar syndrome")],
    demographics: [],
    tumors: [tum("Small-cell lung cancer", ">90% (PNS-Care)")],
    cancerScreening: [HIGH_SCREEN, "Chest CT + FDG-PET for SCLC"],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["LEMS: present in 64% with SCLC vs 0/50 idiopathic LEMS; also in 32% of Hu-positive SCLC and 22% of SCLC without a neurologic syndrome (Sabater 2008)"],
      methodNotes: ["Utility of tissue IHC is unclear for SOX1 (PNS-Care)", "Correlates with SCLC more than with any particular neurologic syndrome (PNS-Care)"]
    },
    csf: fp("UNKNOWN", [], []),
    mri: fp("UNKNOWN", [], []),
    otherTests: ["Electrodiagnostic testing for LEMS", "P/Q VGCC antibodies"],
    immunotherapyResponse: "VARIABLE",
    pearls: ["SOX1 in a patient with LEMS strongly suggests SCLC — screen intensively even if the first search is negative", "SOX1 is an independent SCLC predictor in LEMS alongside the DELTA-P items (Titulaer 2011)"],
    verify: [],
    relatedIds: ["neural-antibodies:p-q-vgcc", "neural-antibodies:anti-hu"],
    sources: [S.pns2021, S.sabater2008, S.titulaer2011],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "klhl11",
    antigen: "Kelch-like protein 11 (KLHL11)",
    searchTerms: ["anti-KLHL11", "rhombencephalitis", "seminoma", "hearing loss", "tinnitus"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Rhombencephalitis (brainstem/cerebellar): ataxia 82%, diplopia 56%, vertigo 54%, hearing loss 39%, tinnitus 36%, dysarthria 28%"), syn("Limbic encephalitis; seizures (23%)", false), syn("Myeloneuropathy, cervical amyotrophy, neuropsychiatric dysfunction", false)],
    demographics: ["All men; median 46 y (28–73) (Dubey 2020)"],
    tumors: [tum("Testicular germ-cell tumor (mostly seminoma)", "80% (PNS-Care); of 36 screened: germ-cell tumor 64%, microlithiasis/fibrosis suggesting regressed tumor 19% (Dubey 2020)")],
    cancerScreening: [HIGH_SCREEN, "Testicular ultrasound (look for microlithiasis/fibrosis as well as tumor); CT chest/abdomen/pelvis ± FDG-PET"],
    testing: { preferredSpecimen: "BOTH", rationale: ["PNS-Care recommends serum and CSF"], methodNotes: [INTRA] },
    csf: fp("UNKNOWN", [], []),
    mri: fp("UNKNOWN", [], []),
    otherTests: ["Audiometry", "HLA: DQB1*02:01 in 7/10, DRB1*03:01 in 6/10 (Dubey 2020)"],
    immunotherapyResponse: "USUALLY_POOR",
    pearls: ["Hearing loss or tinnitus preceded other deficits by 1–8 months in 26% — think of it in a young man with new sensorineural loss plus ataxia", "Often refractory; wheelchair dependence more likely when no testicular cancer is found; outcomes similar to Ma2 (Dubey 2020)"],
    verify: ["CSF and MRI frequencies not in the abstract — settle with Dubey 2020 full text"],
    relatedIds: [AE, "neural-antibodies:ma2"],
    sources: [S.pns2021, S.dubey2020],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
const vgcc = d.entries.find((e) => e.id === "p-q-vgcc");
if (!vgcc.relatedIds.includes("neural-antibodies:sox1")) vgcc.relatedIds.push("neural-antibodies:sox1");
d.version = "0.3.0";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
