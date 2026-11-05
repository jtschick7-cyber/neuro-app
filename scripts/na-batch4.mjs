// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: append batch 4 (PCA2, AQP4, MOG, GFAP) to data/neural-antibodies.json
import fs from "node:fs";
const path = "data/neural-antibodies.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const syn = (syndrome, typical = true) => ({ syndrome, typical });
const tum = (tumor, frequencyText) => ({ tumor, frequencyText });
const fp = (normalLikelihood, normalPercentText, typicalFindings) => ({ normalLikelihood, normalPercentText, typicalFindings });

const S = {
  pns2021: "Graus F, et al. Updated diagnostic criteria for paraneoplastic neurologic syndromes (PNS-Care). Neurol Neuroimmunol Neuroinflamm 2021;8:e1014. doi:10.1212/NXI.0000000000001014",
  gadoth2017: "Gadoth A, et al. Microtubule-associated protein 1B: novel paraneoplastic biomarker. Ann Neurol 2017;81(2):266-277. doi:10.1002/ana.24872",
  wingerchuk2015: "Wingerchuk DM, et al. International consensus diagnostic criteria for neuromyelitis optica spectrum disorders. Neurology 2015;85(2):177-189. doi:10.1212/WNL.0000000000001729",
  banwell2023: "Banwell B, et al. Diagnosis of myelin oligodendrocyte glycoprotein antibody-associated disease: International MOGAD Panel proposed criteria. Lancet Neurol 2023;22:268-282",
  flanagan2017: "Flanagan EP, et al. Glial fibrillary acidic protein immunoglobulin G as biomarker of autoimmune astrocytopathy: analysis of 102 patients. Ann Neurol 2017;81(2):298-309. doi:10.1002/ana.24881"
};

const HIGH_SCREEN = "High-risk antibody: if initial screening is negative, repeat every 4–6 months for 2 years (PNS-Care 2021)";
const LOW_SCREEN = "Comprehensive cancer screening at initial diagnosis is sufficient for lower-risk antibodies (PNS-Care 2021)";
const BANWELL_T1 = "Banwell 2023 Table 1 frequency bands: infrequent 5–20%, might be present 21–50%";

const entries = [
  {
    id: "pca2-map1b",
    antigen: "PCA-2 (MAP1B, microtubule-associated protein 1B)",
    searchTerms: ["PCA-2", "PCA2", "MAP1B", "Purkinje cell antibody type 2"],
    antigenClass: "INTRACELLULAR",
    pnsRisk: "HIGH",
    syndromes: [syn("Peripheral (sensorimotor) neuropathy (53%)"), syn("Cerebellar ataxia/dysmetria/dysarthria (38%)"), syn("Encephalopathy / encephalomyelitis (27%)"), syn("Optic neuropathy, retinopathy, myelopathy, LEMS", false)],
    demographics: [],
    tumors: [tum("SCLC (majority), NSCLC, breast cancer", "~80% (PNS-Care); cancer in 66/84 (79%), mostly SCLC (Gadoth 2017)")],
    cancerScreening: [HIGH_SCREEN, "Chest CT ± FDG-PET for SCLC"],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Cohort defined mainly by serum (92 of 96 archived specimens) (Gadoth 2017)"],
      methodNotes: ["Intracellular antigen: tissue IHC with confirmatory testing (PNS-Care)", "Often accompanied by other SCLC markers: CRMP5 26%, VGCC 22%, Hu 13% (Gadoth 2017)"]
    },
    csf: fp("UNKNOWN", [], ["Pleocytosis in 15/29 (52%, median 20 cells); raised protein in 21/29 (74%, median 60 mg/dL) (Gadoth 2017)"]),
    mri: fp("SOMETIMES_NORMAL", ["Brain/spine MRI normal in 15/43 (35%); nonspecific white-matter change in 8 more (Gadoth 2017)"], ["Pathologic in 46%: spinal cord T2 lesions/enhancement, cerebral atrophy, optic nerve or temporal lobe involvement, meningeal enhancement"]),
    otherTests: ["Full onconeuronal panel (CRMP5, Hu, VGCC)", "Nerve conduction studies"],
    immunotherapyResponse: "VARIABLE",
    pearls: ["Physician-reported benefit from immunotherapy in 14/26; some neurologic benefit after chemotherapy in 11/15 (Gadoth 2017)", "Detection rate similar to amphiphysin and higher than Ri or Tr — worth including in paraneoplastic panels"],
    verify: [],
    relatedIds: ["neural-antibodies:cv2-crmp5", "neural-antibodies:anti-hu", "neural-antibodies:p-q-vgcc"],
    sources: [S.pns2021, S.gadoth2017],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "aqp4",
    antigen: "Aquaporin-4 (AQP4)",
    searchTerms: ["AQP4-IgG", "NMO-IgG", "NMOSD", "neuromyelitis optica"],
    antigenClass: "GLIAL",
    pnsRisk: "LOW",
    syndromes: [syn("Optic neuritis (often severe, posterior, bilateral; chiasm/tract)"), syn("Acute myelitis — single longitudinally extensive lesion across the cord's transverse diameter"), syn("Area postrema syndrome (intractable hiccups, nausea, vomiting)"), syn("Acute brainstem, diencephalic (symptomatic narcolepsy), or cerebral syndromes", false)],
    demographics: ["Female > male; pediatric onset extremely rare (Banwell 2023 Table 1)", "Paraneoplastic AQP4: older age, male, severe nausea/vomiting at onset (PNS-Care)"],
    tumors: [tum("Adenocarcinomas", "<5% (PNS-Care)")],
    cancerScreening: [LOW_SCREEN],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Diagnosis rests on positive serum AQP4-IgG by cell-based assay plus ≥1 core clinical characteristic (Wingerchuk 2015)"],
      methodNotes: ["Cell-based assay recommended (Wingerchuk 2015)"]
    },
    csf: fp("UNKNOWN", [], ["CSF-restricted oligoclonal bands infrequent (5–20%) vs >80% in MS (Banwell 2023 Table 1)", "Pleocytosis can be marked"]),
    mri: fp("UNKNOWN", [], ["Brain MRI might be normal with optic neuritis or myelitis presentations (Banwell 2023 Table 1)", "Lesions in AQP4-rich regions: peri-third/fourth ventricle, splenium, internal capsule, dorsal medulla; patchy cloud-like or pencil-thin ependymal enhancement", "Spinal cord: bright spotty lesions; residual T1-hypointense lesions might be present (21–50%)", BANWELL_T1]),
    otherTests: ["MOG-IgG if AQP4 negative", "MRI orbits and whole spine with contrast"],
    immunotherapyResponse: "VARIABLE",
    pearls: ["Attacks risk poor visual and motor recovery, and disability accrues with relapses — treat attacks urgently and start maintenance", "Interferon-beta, natalizumab, and fingolimod can worsen NMOSD"],
    verify: [],
    relatedIds: ["acute-neuro:nmosd-mogad-attack", "neural-antibodies:mog", "neural-antibodies:gfap"],
    sources: [S.wingerchuk2015, S.banwell2023, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "mog",
    antigen: "Myelin oligodendrocyte glycoprotein (MOG)",
    searchTerms: ["MOG-IgG", "MOGAD", "ADEM", "optic neuritis", "cortical encephalitis"],
    antigenClass: "GLIAL",
    pnsRisk: "LOW",
    syndromes: [syn("Optic neuritis — frequently bilateral, anterior, longitudinally extensive, with optic nerve sheath enhancement and disc edema"), syn("Myelitis — longitudinally extensive or multiple; gray-matter H-sign; conus lesions"), syn("ADEM (especially children)"), syn("Cerebral cortical encephalitis with seizures; brainstem/cerebellar syndromes", false)],
    demographics: ["Female = male; pediatric onset frequent (Banwell 2023 Table 1)"],
    tumors: [tum("Ovarian teratoma (mostly)", "5 cases reported (PNS-Care)")],
    cancerScreening: [LOW_SCREEN],
    testing: {
      preferredSpecimen: "SERUM",
      rationale: ["Serum is the preferred specimen; CSF positivity in seropositive MOGAD ranged 42–61% in cited series (Banwell 2023)", "CSF-only positives occur rarely and can support MOGAD in seronegative patients with supportive clinical/MRI features"],
      methodNotes: ["Live cell-based assay preferred; fixed CBA acceptable; ELISA not recommended (Banwell 2023)", "Fixed CBA: clear positive ≥1:100; low positive 1:10 to <1:100 — low positives need AQP4-IgG negativity plus ≥1 supporting clinical or MRI feature", "Test before steroids/IVIG/PLEX when possible; if negative but suspicion high, repeat ≥3 months later or at relapse", "Titers usually fall over time but can stay positive for years"]
    },
    csf: fp("UNKNOWN", [], ["CSF-restricted oligoclonal bands infrequent (5–20%) vs >80% in MS (Banwell 2023 Table 1)"]),
    mri: fp("UNKNOWN", [], ["Brain MRI might be normal with optic neuritis or myelitis presentations", "Fluffy, poorly demarcated T2 lesions in white matter, deep gray matter, middle cerebellar peduncle; partial or complete resolution expected; T1-hypointense residua extremely rare (<5%)", "Leptomeningeal enhancement around brainstem; unilateral/bilateral cortical leptomeningeal enhancement with cortical encephalitis", BANWELL_T1]),
    otherTests: ["AQP4-IgG (negative result needed to interpret low-positive MOG)", "Fundoscopy / OCT"],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: ["Course monophasic or relapsing; recovery after attacks typically favorable (vision, motor), though residual sphincter/erectile dysfunction can follow myelitis (Banwell 2023 Table 1)", "False positives more likely with low titers — don't diagnose MOGAD from a low positive in an MS-like picture"],
    verify: [],
    relatedIds: ["acute-neuro:nmosd-mogad-attack", "neural-antibodies:aqp4"],
    sources: [S.banwell2023, S.pns2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    id: "gfap",
    antigen: "Glial fibrillary acidic protein (GFAPα)",
    searchTerms: ["GFAP-IgG", "autoimmune GFAP astrocytopathy", "meningoencephalomyelitis", "radial enhancement"],
    antigenClass: "GLIAL",
    pnsRisk: "LOW",
    syndromes: [syn("Meningoencephalomyelitis — meningitis, encephalitis, myelitis, or combinations (81%)"), syn("Optic neuritis/papillitis, tremor/ataxia, dysautonomia, neuropathy", false)],
    demographics: ["Median onset 44 y (8–103); 54% women (Flanagan 2017)"],
    tumors: [tum("Ovarian teratoma (most common), adenocarcinomas, others", "≈20% (PNS-Care); neoplasm found prospectively in 22% (Flanagan 2017)")],
    cancerScreening: [LOW_SCREEN, "Pelvic imaging for ovarian teratoma — predicted best when NMDAR-IgG and AQP4-IgG coexist (71%) (Flanagan 2017)"],
    testing: {
      preferredSpecimen: "CSF",
      rationale: ["Paired samples: CSF positive 45/49 (92%) vs serum 22/49 (45%); CSF testing had the highest specificity for meningoencephalomyelitis (94%) (Flanagan 2017)"],
      methodNotes: ["GFAPα-IgG is the most sensitive isoform (100%)", "Rare false positives in controls: serum tissue assay 0.5%, serum CBA 1.5%, CSF CBA 0.9% — serum-only positives are less specific"]
    },
    csf: fp("RARELY_NORMAL", ["Pleocytosis >5/μL in 45/51 (88%) (Flanagan 2017)"], ["Median 78.5 cells (13–550), lymphocyte-predominant; protein raised in 30/36 (median 80 mg/dL); low glucose in 4/22; CSF-restricted OCB in 13/24"]),
    mri: fp("RARELY_NORMAL", ["Normal imaging in 7 patients (18%) (Flanagan 2017)"], ["Linear perivascular radial enhancement extending from the ventricles in 53%; also leptomeningeal (22%), serpentine (19%), ependymal (9%)", "Spinal cord: longitudinally extensive lesions common; central canal enhancement in 21%", "DWI normal in all evaluated; lesions often resolve with steroids"]),
    otherTests: ["NMDAR-IgG and AQP4-IgG (coexist; affect tumor risk)", "Vessel imaging if vasculitis is suspected — angiography was normal in all tested"],
    immunotherapyResponse: "USUALLY_GOOD",
    pearls: ["Improved with corticosteroids in 14/16 — but relapses during taper (often below prednisone 20 mg/day) or after stopping steroid-sparing therapy; plan steroid-sparing maintenance (Flanagan 2017)", "Mimics CNS vasculitis on imaging (32% considered) — angiography was uniformly negative"],
    verify: [],
    relatedIds: ["acute-neuro:autoimmune-encephalitis", "neural-antibodies:nmdar", "neural-antibodies:aqp4"],
    sources: [S.flanagan2017, S.pns2021],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.4.0";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
