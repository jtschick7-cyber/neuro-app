// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: append batch 2 entries to data/acute-neuro.json
import fs from "node:fs";
const path = "data/acute-neuro.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const NA = "NOT_APPLICABLE";
const fixed = (label, amt, unit, timing, frequency = [], duration = [], caps = [], amtMax = amt) =>
  ({ label, amountMin: amt, amountMax: amtMax, unit, basis: "FIXED", timing, weightBasis: NA, caps, frequency, duration });
const perKg = (label, min, max, unit, timing, frequency = [], duration = [], caps = [], wb = "ACTUAL") =>
  ({ label, amountMin: min, amountMax: max, unit, basis: "PER_KG", timing, weightBasis: wb, caps, frequency, duration });
const tx = (role, agent, routes, doseText, dose, notes, evidenceLevel, evidenceNote, formularyStatus, calculatorIds = []) =>
  ({ role, agent, routes, doseText, dose, notes, evidenceLevel, evidenceNote, formularyStatus, calculatorIds });
const w = (test, priority, indication = [], notes = []) => ({ test, priority, indication, notes });
const acts = (...a) => a.map(([window, action], i) => ({ order: i + 1, window, action }));

const S = {
  graus2016: "Graus F, et al. A clinical approach to diagnosis of autoimmune encephalitis. Lancet Neurol 2016;15(4):391-404. doi:10.1016/S1474-4422(15)00401-9",
  pnscare2021: "Graus F, et al. Updated diagnostic criteria for paraneoplastic neurologic syndromes (PNS-Care). Neurol Neuroimmunol Neuroinflamm 2021;8:e1014. doi:10.1212/NXI.0000000000001014",
  abboud2021: "Abboud H, et al. Autoimmune encephalitis: proposed best practice recommendations for diagnosis and acute management. J Neurol Neurosurg Psychiatry 2021;92(7):757-768. doi:10.1136/jnnp-2020-325300",
  aeMimics2023: "Mimics of autoimmune encephalitis: validation of the 2016 clinical autoimmune encephalitis criteria. Neurol Neuroimmunol Neuroinflamm 2023;10(6):e200148. doi:10.1212/NXI.0000000000200148",
  idsa2004: "Tunkel AR, et al. Practice guidelines for the management of bacterial meningitis (IDSA). Clin Infect Dis 2004;39(9):1267-1284. doi:10.1086/425368",
  ctlp2017: "Cranial imaging before lumbar puncture in adults with community-acquired meningitis: clinical utility and adherence to the IDSA guidelines. Clin Infect Dis 2017;64(12):1657-1662. doi:10.1093/cid/cix240",
  degans2002: "de Gans J, van de Beek D. Dexamethasone in adults with bacterial meningitis. N Engl J Med 2002;347(20):1549-1556",
  idsa2008: "Tunkel AR, et al. The management of encephalitis: clinical practice guidelines by the IDSA. Clin Infect Dis 2008;47(3):303-327. doi:10.1086/589747",
  idsaCrypto2010: "Perfect JR, et al. Clinical practice guidelines for the management of cryptococcal disease: 2010 update by the IDSA. Clin Infect Dis 2010;50(3):291-322",
  nihOI: "Panel on Guidelines for the Prevention and Treatment of Opportunistic Infections in Adults and Adolescents with HIV (NIH/CDC/HIVMA-IDSA). Cryptococcosis; Toxoplasma gondii encephalitis sections. clinicalinfo.hiv.gov (living guideline), accessed 2026",
  wingerchuk2015: "Wingerchuk DM, et al. International consensus diagnostic criteria for neuromyelitis optica spectrum disorders. Neurology 2015;85(2):177-189. doi:10.1212/WNL.0000000000001729",
  banwell2023: "Banwell B, et al. Diagnosis of myelin oligodendrocyte glycoprotein antibody-associated disease: International MOGAD Panel proposed criteria. Lancet Neurol 2023;22(3):268-282",
  kleiter2016: "Kleiter I, et al. Neuromyelitis optica: evaluation of 871 attacks and 1,153 treatment courses. Ann Neurol 2016;79(2):206-216. doi:10.1002/ana.24554",
  cortese2011: "Cortese I, et al. Evidence-based guideline update: plasmapheresis in neurologic disorders (AAN; since retired). Neurology 2011;76(3):294-300. doi:10.1212/WNL.0b013e318207b1f6",
  copousep2015: "Le Page E, et al. Oral versus intravenous high-dose methylprednisolone for treatment of relapses in MS (COPOUSEP). Lancet 2015;386(9997):974-981. doi:10.1016/S0140-6736(15)61137-0",
  mcdonald2017: "Thompson AJ, et al. Diagnosis of multiple sclerosis: 2017 revisions of the McDonald criteria. Lancet Neurol 2018;17(2):162-173",
  nice234: "NICE. Spinal metastases and metastatic spinal cord compression (NG234). 2023",
  tetsuka2019: "Tetsuka S, et al. Spinal epidural abscess: a review highlighting early diagnosis and management. JMA J 2020;3(1):29-40. doi:10.31662/jmaj.2019-0038",
};

const entries = [
  // ---------------------------------------------------------------- 7
  {
    id: "autoimmune-encephalitis",
    title: "Autoimmune encephalitis (incl. paraneoplastic)",
    category: "NEUROIMMUNOLOGY",
    searchTerms: ["AE", "limbic encephalitis", "anti-NMDAR", "LGI1", "paraneoplastic", "Graus criteria", "PNS-Care"],
    presentation: [
      "Subacute (<3 months) working-memory loss, altered mental status, or psychiatric symptoms",
      "Seizures (often new and refractory), focal CNS signs, movement disorders, autonomic instability, central hypoventilation",
      "NMDAR phenotype: psychiatric/behavioral onset → speech change, seizures, dyskinesias, decreased consciousness, dysautonomia",
      "Relapse weeks after treated HSV encephalitis can be post-HSV autoimmune (often NMDAR) encephalitis"
    ],
    definitions: [
      "Possible AE (Graus 2016) — all 3: (1) subacute onset <3 mo of working-memory deficit, altered mental status, or psychiatric symptoms; (2) ≥1 of: new focal CNS findings, unexplained seizures, CSF WBC >5/mm³, MRI suggestive of encephalitis; (3) reasonable exclusion of alternatives",
      "Definite autoimmune limbic encephalitis (Graus 2016) — all 4: subacute limbic syndrome; bilateral medial temporal T2/FLAIR abnormality; CSF WBC >5/mm³ or temporal EEG epileptic/slow activity; reasonable exclusion. If one of the first 3 is missing, definite LE requires an antibody",
      "Probable anti-NMDAR (Graus 2016): ≥4 of 6 symptom groups (behavior/cognition, speech, seizures, movement disorder, ↓consciousness, autonomic/hypoventilation) + abnormal EEG or CSF pleocytosis/OCB + exclusion; or 3 groups + systemic teratoma",
      "Definite anti-NMDAR: ≥1 symptom group + IgG anti-GluN1 antibodies (CSF testing required) after exclusion of other disorders",
      "PNS-Care 2021: high-risk antibodies >70% cancer association; intermediate-risk 30–70%. High-risk phenotypes: encephalomyelitis, limbic encephalitis, rapidly progressive cerebellar syndrome, opsoclonus-myoclonus, sensory neuronopathy, GI pseudo-obstruction, LEMS"
    ],
    immediateActions: acts(
      ["On suspicion", "Treat as infection until excluded: empiric acyclovir ± bacterial meningitis coverage"],
      ["Hours", "MRI brain with/without contrast; LP; EEG (cEEG if fluctuating or seizing)"],
      ["With LP", "Send PAIRED serum + CSF neural antibody panels, ideally before IVIG/PLEX"],
      ["Infection reasonably excluded (CSF cells, glucose, Gram stain, viral PCR)", "Start first-line immunotherapy without waiting for antibodies — unless biopsy for lymphoma/neurosarcoid is being considered"],
      ["Early", "Tumor screen: CT chest/abdomen/pelvis with contrast; pelvic/testicular US for NMDAR phenotype; if negative: mammogram/breast MRI, pelvic US, FDG-PET"],
      ["End of first cycle, no improvement", "Add IVIG or PLEX"],
      ["2–4 wk of optimized first-line, no improvement", "Second-line: rituximab (antibody-mediated) or cyclophosphamide (cell-mediated/classic paraneoplastic)"]
    ),
    workup: [
      w("MRI brain with/without contrast", "URGENT", [], ["Normal in many antibody-positive cases"]),
      w("LP: cells, protein, glucose, Gram stain/culture, HSV/VZV PCR, OCB, IgG index; cytology/flow if lymphoma possible", "URGENT"),
      w("Paired serum + CSF autoimmune encephalitis antibody panels", "URGENT", [], ["CSF more sensitive for NMDAR, GFAP; serum more sensitive for LGI1, AQP4 (Abboud 2021)", "Cell-surface antibody in serum only (CSF negative) → confirm before calling definite (PNS-Care)"]),
      w("EEG / cEEG", "URGENT", [], ["Extreme delta brush supports NMDAR"]),
      w("Serum sodium", "STAT", [], ["Hyponatremia is common in LGI1 encephalitis"]),
      w("CT chest/abdomen/pelvis with contrast", "URGENT", [], ["Repeat every 4–6 months for 2 years if high-risk phenotype + high-risk antibody and initial screen negative (PNS-Care)"]),
      w("Pelvic (women) or testicular (men) ultrasound", "IF_INDICATED", ["NMDAR phenotype in young/middle-aged adults"]),
      w("Mammogram/breast MRI, FDG-PET body", "IF_INDICATED", ["Initial CT negative and paraneoplastic suspicion persists"]),
      w("HIV, syphilis, TSH/TPO antibodies, B12, ammonia, toxicology", "ROUTINE", [], ["Mimic exclusion"])
    ],
    treatment: [
      tx("FIRST_LINE", "Methylprednisolone", ["IV"], "1 g IV daily ×3–7 days, then bridging (oral taper or monthly IVMP/IVIG)",
        [fixed("Pulse", 1, "G", "PER_DAY", ["Daily"], ["3–7 days"])],
        ["84% of surveyed experts chose steroids alone or combined as first-line for a general AE presentation"],
        "CONSENSUS", ["Abboud 2021 (AEA Clinicians Network best-practice recommendations; survey + literature)"], "AVAILABLE"),
      tx("FIRST_LINE", "IVIG", ["IV"], "2 g/kg total over 2–5 days",
        [perKg("Daily (5-day)", 0.4, 0.4, "G", "PER_DAY", ["Daily"], ["5 days"])],
        ["Consider IVIG first in agitated patients and bleeding disorders", "Draw antibodies before IVIG"],
        "CONSENSUS", ["Abboud 2021"], "LOCAL_PREFERRED", ["ivig-dose"]),
      tx("FIRST_LINE", "Plasma exchange (PLEX)", ["IV"], "5–10 exchanges, every other day",
        [],
        ["Consider PLEX first with severe hyponatremia, high thromboembolic or cancer risk, or associated demyelination", "Don't give PLEX right after IVIG"],
        "CONSENSUS", ["Abboud 2021"], "AVAILABLE", []),
      tx("SECOND_LINE", "Rituximab", ["IV"], "375 mg/m² weekly ×4, OR 1000 mg ×2 doses 2 weeks apart",
        [fixed("Fixed regimen", 1000, "MG", "PER_DOSE", ["2 doses, 2 weeks apart"])],
        ["Preferred for suspected antibody-mediated (cell-surface) disease", "Screen HBV before"],
        "CONSENSUS", ["Abboud 2021: 80% of responders chose rituximab as second-line with unknown antibody"], "INSTITUTION_VARIES"),
      tx("SECOND_LINE", "Cyclophosphamide", ["IV"], "600–1000 mg/m² (per neuroimmunology/oncology)",
        [],
        ["Favored for suspected cell-mediated disease (classic paraneoplastic, intracellular antibodies)"],
        "CONSENSUS", ["Abboud 2021"], "INSTITUTION_VARIES"),
      tx("ADJUNCT", "Tumor treatment (e.g., ovarian teratoma resection)", ["NON_PHARM"], "N/A — surgical/oncologic",
        [], ["Tumor removal is part of immunotherapy response in paraneoplastic disease"], "EXPERT_OPINION", [], "AVAILABLE")
    ],
    pitfalls: [
      "Graus 'possible AE' is an entry point, not a diagnosis — specificity was 27% in a real-world validation (mimics common)",
      "LGI1: CSF pleocytosis in only ~41% and MRI may be normal; antibody best detected in serum",
      "NMDAR: test CSF — serum-only testing risks false negatives and positives",
      "IVIG/PLEX before sampling can mask antibodies",
      "Faciobrachial dystonic seizures (LGI1) respond poorly to ASMs — immunotherapy is the treatment",
      "Steroids before biopsy can obscure CNS lymphoma"
    ],
    escalateWhen: [
      "Refractory seizures or NORSE → see refractory-super-refractory-se",
      "Central hypoventilation, autonomic storm, or declining consciousness (NMDAR) → ICU",
      "No response after first-line + IVIG/PLEX → neuroimmunology for second-line"
    ],
    institutionVaries: [
      "Reference lab and panel composition/turnaround (serum vs CSF panels)",
      "Rituximab/cyclophosphamide inpatient access and HBV screening workflow"
    ],
    verify: [
      "Bridging regimen details (oral taper vs monthly IVMP/IVIG) came from the AE Alliance summary of Abboud 2021 — confirm in paper",
      "First author of the 2023 AE-criteria validation paper (cited by title/DOI only)"
    ],
    relatedIds: ["acute-neuro:viral-encephalitis", "acute-neuro:refractory-super-refractory-se", "acute-neuro:nmosd-mogad-attack"],
    sources: [S.graus2016, S.pnscare2021, S.abboud2021, S.aeMimics2023],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 8
  {
    id: "bacterial-meningitis",
    title: "Bacterial meningitis (community-acquired & post-neurosurgical, adult)",
    category: "CNS_INFECTION",
    searchTerms: ["meningitis", "ABM", "CT before LP", "dexamethasone", "Listeria", "pneumococcal"],
    presentation: [
      "Fever, headache, neck stiffness, altered mental status — classic triad often incomplete",
      "Petechial/purpuric rash → meningococcus",
      "Older, immunocompromised, or alcohol use → Listeria risk",
      "Recent neurosurgery, shunt, or penetrating trauma → staphylococci and gram-negative rods"
    ],
    definitions: [
      "IDSA CT-before-LP criteria (any): immunocompromise (HIV, immunosuppressants, transplant); history of CNS disease (mass, stroke, focal infection); new-onset seizure within 1 week; papilledema; abnormal level of consciousness; focal neurologic deficit (B-II)",
      "Typical bacterial CSF: neutrophilic pleocytosis, low CSF glucose / low CSF:serum ratio, high protein, elevated opening pressure"
    ],
    immediateActions: acts(
      ["0–30 min", "Blood cultures ×2 — then give dexamethasone and antibiotics; do NOT wait for CT or LP"],
      ["With first antibiotic", "Dexamethasone 0.15 mg/kg IV q6h, started 10–20 min before or with the first antibiotic dose (IDSA A-I)"],
      ["Decide imaging", "CT before LP only if IDSA criteria met — antibiotics go in before the patient leaves for CT"],
      ["LP", "Opening pressure, cell count/diff, glucose (paired serum), protein, Gram stain, culture; multiplex PCR if available; save extra CSF"],
      ["Organism known", "Narrow therapy; stop dexamethasone if a non-pneumococcal organism is identified"],
      ["Suspected meningococcus", "Droplet precautions; notify public health for contact prophylaxis"]
    ),
    workup: [
      w("Blood cultures ×2", "STAT", [], ["Before antibiotics"]),
      w("CBC, BMP, coagulation profile, lactate", "STAT"),
      w("Non-contrast CT head", "IF_INDICATED", ["Any IDSA CT-before-LP criterion"], ["Most head CTs before LP don't change management — only 1.5% did in one cohort (CID 2017)"]),
      w("LP with opening pressure", "STAT", [], ["CSF culture yield falls within hours of antibiotics; cell profile persists"]),
      w("CSF multiplex PCR", "IF_INDICATED", ["Pretreated with antibiotics or Gram stain negative"]),
      w("HIV test", "ROUTINE")
    ],
    treatment: [
      tx("FIRST_LINE", "Dexamethasone", ["IV"], "0.15 mg/kg IV q6h ×2–4 days; first dose before or with antibiotics. Many adult protocols use 10 mg q6h ×4 days (de Gans 2002 regimen)",
        [perKg("Dose", 0.15, 0.15, "MG", "PER_DOSE", ["q6h"], ["2–4 days"])],
        ["Benefit established for pneumococcal meningitis", "May lower CSF vancomycin penetration — some experts add rifampin for suspected resistant pneumococcus"],
        "STRONG", ["IDSA 2004: A-I"], "AVAILABLE"),
      tx("FIRST_LINE", "Vancomycin", ["IV"], "30–45 mg/kg/day divided q8–12h (IDSA 2004); load and monitor per institutional AUC/trough protocol",
        [perKg("Daily total", 30, 45, "MG", "PER_DAY", ["Divided q8–12h"])],
        ["Covers resistant pneumococcus pending susceptibilities"],
        "STRONG", ["IDSA 2004 empiric regimen"], "INSTITUTION_VARIES"),
      tx("FIRST_LINE", "Ceftriaxone", ["IV"], "2 g IV q12h (4 g/day)",
        [fixed("Dose", 2, "G", "PER_DOSE", ["q12h"])],
        ["Cefotaxime 8–12 g/day divided q4–6h is the IDSA alternative"],
        "STRONG", ["IDSA 2004 empiric regimen"], "AVAILABLE"),
      tx("ADJUNCT", "Ampicillin (Listeria coverage)", ["IV"], "2 g IV q4h (12 g/day) — add if age >50, immunocompromised, or alcohol use disorder",
        [fixed("Dose", 2, "G", "PER_DOSE", ["q4h"])],
        ["TMP-SMX is the Listeria alternative in severe penicillin allergy"],
        "STRONG", ["IDSA 2004 (age >50)"], "AVAILABLE"),
      tx("ALTERNATIVE", "Post-neurosurgery / penetrating trauma / CSF shunt: vancomycin + cefepime, ceftazidime, or meropenem", ["IV"],
        "Vancomycin as above + one of: cefepime 2 g q8h, ceftazidime 2 g q8h, or meropenem 2 g q8h",
        [fixed("Beta-lactam dose", 2, "G", "PER_DOSE", ["q8h"])],
        ["Pseudomonas coverage required", "Device removal/neurosurgery involvement"],
        "STRONG", ["IDSA 2004"], "AVAILABLE"),
      tx("ALTERNATIVE", "Severe beta-lactam allergy", ["IV"], "Per ID: vancomycin + moxifloxacin (± TMP-SMX for Listeria); aztreonam as gram-negative alternative",
        [], [], "EXPERT_OPINION", [], "INSTITUTION_VARIES"),
      tx("ADJUNCT", "Acyclovir", ["IV"], "10 mg/kg IV q8h until HSV excluded — see viral-encephalitis",
        [perKg("Dose", 10, 10, "MG", "PER_DOSE", ["q8h"])], [], "EXPERT_OPINION", [], "AVAILABLE")
    ],
    pitfalls: [
      "Never delay antibiotics for imaging or LP",
      "Avoid piperacillin-tazobactam — poor CNS penetration",
      "CSF can sterilize within hours of antibiotics — blood cultures first, multiplex PCR helps",
      "Over-use of CT before LP delays treatment; apply the IDSA criteria"
    ],
    escalateWhen: [
      "Altered consciousness, seizures, shock, or rising ICP → ICU",
      "Hydrocephalus, abscess, or empyema on imaging → neurosurgery",
      "No clinical improvement at 48 h → repeat LP/imaging, reconsider organism/resistance"
    ],
    institutionVaries: [
      "Vancomycin dosing protocol (AUC vs trough)",
      "Local pneumococcal resistance (antibiogram)",
      "CSF multiplex PCR availability"
    ],
    verify: [
      "IDSA 2004 dosing table and dexamethasone continuation rule were read via secondary summaries (AAFP 2005, institutional pathways); the CID full text was blocked — confirm Table 5 and the 'continue only if pneumococcal' rule",
      "Whether to give dexamethasone after antibiotics have already started (IDSA position) — confirm in text"
    ],
    relatedIds: ["acute-neuro:viral-encephalitis", "acute-neuro:cns-infection-immunocompromised"],
    sources: [S.idsa2004, S.ctlp2017, S.degans2002],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 9
  {
    id: "viral-encephalitis",
    title: "Viral encephalitis (HSV, VZV, arboviral incl. West Nile)",
    category: "CNS_INFECTION",
    searchTerms: ["HSV encephalitis", "HSE", "acyclovir", "VZV", "West Nile", "WNV", "arbovirus"],
    presentation: [
      "Fever, altered mental status, behavioral change, seizures, focal deficits",
      "HSV: temporal/frontal localization, aphasia, olfactory/gustatory auras",
      "VZV: with or without rash; may present as vasculopathy/stroke",
      "West Nile (summer–fall): encephalitis with tremor/parkinsonism or acute flaccid paralysis"
    ],
    definitions: [
      "IDSA 2008: CSF analysis essential in all patients unless contraindicated (A-III); MRI is the most sensitive imaging (A-I)",
      "Start acyclovir in ALL suspected encephalitis pending results (A-III)"
    ],
    immediateActions: acts(
      ["Immediately", "Acyclovir 10 mg/kg IV q8h (renally adjusted) + bacterial meningitis coverage if not excluded"],
      ["Hours", "MRI brain with/without contrast (CT if MRI impossible); LP"],
      ["LP", "CSF HSV PCR on all specimens (A-III); plus VZV, enterovirus PCR, WNV IgM in season, cryptococcal Ag, VDRL"],
      ["Initial HSV PCR negative, picture compatible", "Continue acyclovir and repeat HSV PCR 3–7 days later (B-III)"],
      ["Fluctuating exam", "EEG to look for nonconvulsive seizures"]
    ),
    workup: [
      w("MRI brain with/without contrast", "URGENT"),
      w("LP: cells, protein, glucose, HSV-1/2 PCR, VZV PCR, enterovirus PCR, cryptococcal Ag, VDRL", "URGENT"),
      w("CSF West Nile (and other arbovirus) IgM", "IF_INDICATED", ["Mosquito season / exposure"], ["CSF IgM preferred; WNV CSF PCR positive in <60%"]),
      w("HIV serology (plasma HIV RNA if high suspicion and serology negative)", "ROUTINE"),
      w("EEG", "IF_INDICATED", ["Fluctuating consciousness", "Seizures"]),
      w("Renal function daily on acyclovir", "ROUTINE", [], ["Crystal nephropathy — hydrate"])
    ],
    treatment: [
      tx("FIRST_LINE", "Acyclovir (HSV)", ["IV"], "10 mg/kg IV q8h ×14–21 days for confirmed HSV encephalitis; renally adjust",
        [perKg("Dose", 10, 10, "MG", "PER_DOSE", ["q8h"], ["14–21 days (confirmed HSV)"], [], "ACTUAL")],
        ["Nephrotoxicity: maintain hydration, monitor creatinine", "Dosing weight in obesity varies (many use ideal body weight)"],
        "STRONG", ["IDSA 2008: acyclovir recommended for HSV (A-I)"], "AVAILABLE"),
      tx("FIRST_LINE", "Acyclovir (VZV)", ["IV"], "VERIFY dose — IDSA 2008 recommends acyclovir (B-III); ganciclovir alternative (C-III); adjunctive steroids may be considered (C-III)",
        [], [], "MODERATE", ["IDSA 2008: B-III"], "AVAILABLE"),
      tx("FIRST_LINE", "Ganciclovir + foscarnet (CMV)", ["IV"], "Combination recommended (B-III); dose per ID with renal adjustment",
        [], ["Cidofovir not recommended"], "MODERATE", ["IDSA 2008: B-III"], "INSTITUTION_VARIES"),
      tx("SUPPORTIVE", "West Nile / other arboviral", ["NON_PHARM"], "Supportive care; no proven antiviral",
        [], [], "NOT_GRADED", ["IDSA 2008"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Ribavirin for West Nile virus", ["PO", "IV"], "Do not use",
        [], [], "NOT_GRADED", ["IDSA 2008: not recommended"], "AVAILABLE")
    ],
    pitfalls: [
      "HSV PCR can be falsely negative early — repeat in 3–7 days if suspicion persists",
      "Watch for post-HSV autoimmune (NMDAR) encephalitis weeks after HSE",
      "Recent infection or vaccination + multifocal white-matter lesions → consider ADEM",
      "Fever and pleocytosis may be absent in immunosuppressed patients"
    ],
    escalateWhen: [
      "Seizures or status epilepticus",
      "Cerebral edema or herniation signs",
      "Deterioration despite acyclovir with unknown etiology → ID/neurology; brain biopsy may be considered"
    ],
    institutionVaries: ["Acyclovir dosing weight in obesity", "Arbovirus panel availability"],
    verify: [
      "Acyclovir 10 mg/kg q8h ×14–21 d is from IDSA 2008 treatment table as cited in secondary sources (IHMF, reviews); the primary table was not readable — confirm",
      "VZV acyclovir dose (IDSA 2008 table)"
    ],
    relatedIds: ["acute-neuro:bacterial-meningitis", "acute-neuro:autoimmune-encephalitis", "acute-neuro:nonconvulsive-status-epilepticus"],
    sources: [S.idsa2008, S.graus2016],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 10
  {
    id: "cns-infection-immunocompromised",
    title: "CNS infection in the immunocompromised (HIV, transplant, biologics)",
    category: "CNS_INFECTION",
    searchTerms: ["cryptococcal meningitis", "toxoplasmosis", "PML", "Listeria", "CMV", "ring-enhancing lesion", "HIV"],
    presentation: [
      "Subacute headache, confusion, or focal deficits; fever and meningismus often blunted",
      "Cryptococcus: headache, raised ICP, vision loss, cranial neuropathies",
      "Toxoplasma: multiple ring-enhancing lesions (basal ganglia, gray-white junction), usually CD4 <100",
      "PML: subacute deficits with non-enhancing white-matter lesions (HIV, natalizumab, other immunosuppression)",
      "Also: CNS lymphoma, Listeria rhombencephalitis, CMV ventriculitis, Nocardia, TB, invasive fungi"
    ],
    definitions: [
      "Immunocompromise is an IDSA indication for imaging before LP",
      "Cryptococcal opening pressure ≥25 cm H2O occurs in 60–80% of HIV-associated cases (NIH OI)"
    ],
    immediateActions: acts(
      ["On arrival", "Blood cultures; empiric meningitis coverage including ampicillin (Listeria) + acyclovir if meningitis/encephalitis possible"],
      ["Before LP", "CT or MRI with contrast"],
      ["LP", "ALWAYS measure opening pressure; CSF + serum cryptococcal antigen, fungal culture"],
      ["Crypto with OP ≥25 cm H2O + symptoms", "Drain CSF to cut pressure by 50% (if very high) or to ≤20 cm H2O; repeat daily until stable >2 days (IDSA 2010)"],
      ["Ring-enhancing lesions, HIV, CD4 <100", "Empiric toxoplasma treatment; reassess clinically/radiographically in ~2 weeks — biopsy if no response"],
      ["Concurrently", "ID consult; HIV: ART timing per ID (deferred in cryptococcal meningitis)"]
    ),
    workup: [
      w("CD4 count, HIV viral load", "URGENT", ["HIV"]),
      w("Serum and CSF cryptococcal antigen; CSF fungal culture", "STAT"),
      w("MRI brain with/without contrast", "URGENT"),
      w("CSF PCRs: HSV, VZV, CMV, EBV (lymphoma marker in HIV), JC virus; AFB/MTB PCR", "URGENT"),
      w("Serum Toxoplasma IgG", "URGENT", [], ["Negative IgG makes toxo unlikely, but doesn't exclude"]),
      w("Transplant drug levels (tacrolimus etc.)", "IF_INDICATED", ["Transplant recipient"], ["Azole interactions"]),
      w("Brain biopsy", "IF_INDICATED", ["Mass lesion not responding to empiric therapy", "Lymphoma suspected"])
    ],
    treatment: [
      tx("FIRST_LINE", "Cryptococcal induction: liposomal amphotericin B + flucytosine", ["IV", "PO"],
        "Liposomal AmB 3–4 mg/kg IV daily + flucytosine 25 mg/kg PO QID ×≥2 weeks; then fluconazole consolidation per ID",
        [perKg("Liposomal AmB", 3, 4, "MG", "PER_DAY", ["Daily"], ["≥2 weeks induction"]), perKg("Flucytosine", 25, 25, "MG", "PER_DOSE", ["QID"], ["With AmB induction"])],
        ["Flucytosine: renally adjust; monitor counts", "AmB: pre-hydrate, replace K and Mg", "Longer induction (4–6 wk) for cryptococcoma, C. gattii, or some non-HIV hosts"],
        "STRONG", ["NIH OI: AmB + flucytosine (AI); liposomal AmB 3–4 mg/kg favored (AI)"], "AVAILABLE"),
      tx("SUPPORTIVE", "Therapeutic lumbar puncture (cryptococcal raised ICP)", ["NON_PHARM"],
        "Reduce OP by 50% or to ≤20 cm H2O; repeat daily while OP ≥25 cm H2O and symptomatic",
        [], ["Persistent elevation despite daily LPs → lumbar drain or VP shunt (IDSA 2010 A-II)"], "MODERATE", ["IDSA 2010: B-II"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Acetazolamide, mannitol, or corticosteroids for cryptococcal raised ICP", ["IV", "PO"], "Do not use",
        [], [], "NOT_GRADED", ["Reflected in guideline-derived quality scoring; primary IDSA statement to confirm"], "AVAILABLE"),
      tx("FIRST_LINE", "Toxoplasma encephalitis: pyrimethamine + sulfadiazine + leucovorin", ["PO"],
        "Pyrimethamine 200 mg PO ×1, then ≤60 kg: 50 mg daily + sulfadiazine 1000 mg q6h; >60 kg: 75 mg daily + sulfadiazine 1500 mg q6h; leucovorin 10–25 mg daily (↑ to 50 mg daily/BID if needed); ≥6 weeks",
        [fixed("Pyrimethamine load", 200, "MG", "SINGLE"), fixed("Pyrimethamine ≤60 kg", 50, "MG", "PER_DAY", ["Daily"], ["≥6 weeks"]), fixed("Pyrimethamine >60 kg", 75, "MG", "PER_DAY", ["Daily"], ["≥6 weeks"])],
        ["Alternatives: pyrimethamine + leucovorin + clindamycin 600 mg IV/PO q6h (AI); TMP-SMX 5/25 mg/kg IV/PO BID (BI)", "Then chronic maintenance therapy", "Dexamethasone only for significant mass effect"],
        "STRONG", ["NIH OI: preferred regimen AI; duration ≥6 weeks BII"], "INSTITUTION_VARIES"),
      tx("ADJUNCT", "Listeria: ampicillin", ["IV"], "2 g IV q4h (± gentamicin per ID)",
        [fixed("Dose", 2, "G", "PER_DOSE", ["q4h"])], [], "STRONG", ["IDSA 2004"], "AVAILABLE"),
      tx("FIRST_LINE", "CMV encephalitis/ventriculitis: ganciclovir + foscarnet", ["IV"], "Dose per ID with renal adjustment",
        [], [], "MODERATE", ["IDSA 2008: B-III"], "INSTITUTION_VARIES"),
      tx("SUPPORTIVE", "PML: restore immunity", ["NON_PHARM"], "No specific antiviral — ART in HIV; stop offending immunosuppressant (e.g., natalizumab, ± PLEX to clear it)",
        [], ["Watch for IRIS after immune reconstitution"], "EXPERT_OPINION", [], "AVAILABLE")
    ],
    pitfalls: [
      "Cryptococcal meningitis in AIDS can have bland CSF (few cells) — the antigen test and opening pressure matter most",
      "Skipping opening pressure measurement misses the main driver of early cryptococcal death and blindness",
      "Steroids before biopsy can obscure CNS lymphoma",
      "Pyrimethamine may be hard to obtain quickly in the US — TMP-SMX is an accepted alternative",
      "Azoles raise calcineurin-inhibitor levels in transplant patients"
    ],
    escalateWhen: [
      "Persistent raised ICP despite daily LPs → neurosurgery (drain/shunt)",
      "Herniation signs or mass effect",
      "Lesion not responding to ~2 weeks of empiric toxoplasma therapy → biopsy"
    ],
    institutionVaries: ["Pyrimethamine availability", "Inpatient ID and transplant ID coverage"],
    verify: [
      "NIH OI cryptococcus and toxoplasma sections were read via verbatim copies (clinicalinfo.hiv.gov blocked from this session) — confirm current living-guideline wording",
      "IDSA 2010 statement on acetazolamide/mannitol/corticosteroids for cryptococcal ICP — confirm grade and wording"
    ],
    relatedIds: ["acute-neuro:bacterial-meningitis", "acute-neuro:viral-encephalitis"],
    sources: [S.nihOI, S.idsaCrypto2010, S.idsa2004, S.idsa2008],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 11
  {
    id: "nmosd-mogad-attack",
    title: "NMOSD / MOGAD acute attack",
    category: "NEUROIMMUNOLOGY",
    searchTerms: ["NMO", "NMOSD", "AQP4", "MOG", "MOGAD", "LETM", "optic neuritis", "area postrema"],
    presentation: [
      "Severe or bilateral optic neuritis; longitudinally extensive myelitis",
      "Area postrema syndrome: intractable hiccups, nausea, vomiting",
      "Brainstem, diencephalic, or cerebral syndromes",
      "MOGAD: optic disc edema, perineural enhancement, ADEM, conus lesions, cortical encephalitis with seizures"
    ],
    definitions: [
      "AQP4-IgG+ NMOSD (Wingerchuk 2015): ≥1 core clinical characteristic + positive AQP4-IgG (cell-based assay recommended) + exclusion of alternatives. Core: optic neuritis, acute myelitis, area postrema syndrome, acute brainstem syndrome, symptomatic narcolepsy/diencephalic syndrome with typical lesions, symptomatic cerebral syndrome with typical lesions",
      "AQP4-negative/unknown NMOSD: ≥2 core characteristics with dissemination, ≥1 being optic neuritis, LETM, or area postrema syndrome, plus MRI requirements",
      "MOGAD (Banwell 2023): (A) core demyelinating event + (B) positive serum MOG-IgG by cell-based assay (clear positive alone; low positive/no titer/CSF-only needs AQP4-negative + ≥1 supporting clinical/MRI feature) + (C) exclusion of better diagnosis incl. MS"
    ],
    immediateActions: acts(
      ["Before treatment if possible", "Serum AQP4-IgG and MOG-IgG (live cell-based assay preferred); steroids, IVIG, and PLEX can lower detection"],
      ["Immediately — don't wait for antibodies", "IV methylprednisolone 1 g daily ×3–5 days"],
      ["Severe attack or no response in 48–72 h", "Escalate to PLEX; consider PLEX early for severe myelitis"],
      ["Within 24 h", "MRI brain, orbits, and whole spine with contrast"],
      ["Until MS excluded", "Avoid starting MS disease-modifying therapies — some worsen NMOSD"]
    ),
    workup: [
      w("Serum AQP4-IgG (cell-based assay)", "URGENT"),
      w("Serum MOG-IgG (live cell-based assay preferred)", "URGENT", [], ["Serum preferred over CSF; repeat ≥3 months later or at relapse if negative and suspicion high"]),
      w("MRI brain, orbits, whole spine with contrast", "URGENT"),
      w("LP: cells, protein, OCB", "URGENT", [], ["OCB usually absent in NMOSD/MOGAD; pleocytosis can be marked"]),
      w("Infection, B12/copper, ANA/SSA, ACE as indicated", "ROUTINE", [], ["Myelitis mimics"])
    ],
    treatment: [
      tx("FIRST_LINE", "Methylprednisolone", ["IV"], "1 g IV daily ×3–5 days, then oral taper (MOGAD relapses can occur during weaning)",
        [fixed("Pulse", 1, "G", "PER_DAY", ["Daily"], ["3–5 days"])],
        ["Taper length individualized (weeks for AQP4; often longer for MOGAD)"],
        "EXPERT_OPINION", ["Standard practice; no RCT for attack treatment"], "AVAILABLE"),
      tx("SECOND_LINE", "Plasma exchange (PLEX)", ["IV"], "5–7 exchanges, every other day, 1–1.5 plasma volumes each",
        [],
        ["Escalation improves outcomes; first-line PLEX/IA beat steroids for isolated myelitis (Kleiter 2016, retrospective)", "AAN 2011 (since retired): possibly effective for fulminant CNS demyelination (Level C)"],
        "WEAK", ["Kleiter 2016 (n=871 attacks, retrospective)", "AAN 2011 Level C"], "AVAILABLE", []),
      tx("ALTERNATIVE", "IVIG", ["IV"], "0.4 g/kg/day ×5 days if PLEX not feasible",
        [perKg("Daily", 0.4, 0.4, "G", "PER_DAY", ["Daily"], ["5 days"])],
        [], "EXPERT_OPINION", [], "LOCAL_PREFERRED", ["ivig-dose"])
    ],
    pitfalls: [
      "Don't wait for AQP4/MOG results to treat",
      "Interferon-beta, natalizumab, and fingolimod can worsen NMOSD",
      "Low-titer MOG-IgG has lower specificity — interpret with the clinical/MRI picture",
      "Bilateral optic neuritis and myelitis have the poorest remission rates — escalate early"
    ],
    escalateWhen: [
      "Severe myelitis or vision loss, or no improvement within 48–72 h of steroids → PLEX",
      "Respiratory compromise from high cervical myelitis → ICU",
      "Confirmed diagnosis → neuroimmunology for relapse prevention"
    ],
    institutionVaries: ["AQP4/MOG send-out lab (live vs fixed cell-based assay)", "PLEX timing (early vs after steroid failure)"],
    verify: [
      "PLEX regimen (5–7 exchanges every other day, 1–1.5 TPV) is from treatment reviews (Curr Treat Options Neurol 2022; Neurol Clin 2023) whose authors/titles I couldn't confirm — confirm with ASFA 2023 NMOSD fact sheet"
    ],
    relatedIds: ["acute-neuro:ms-relapse", "acute-neuro:autoimmune-encephalitis"],
    sources: [S.wingerchuk2015, S.banwell2023, S.kleiter2016, S.cortese2011],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 12
  {
    id: "ms-relapse",
    title: "Multiple sclerosis relapse",
    category: "NEUROIMMUNOLOGY",
    searchTerms: ["MS flare", "MS exacerbation", "pseudo-relapse", "Solu-Medrol", "steroids MS"],
    presentation: [
      "New or worsening focal deficit (optic neuritis, myelitis, brainstem) evolving over days",
      "Pseudo-relapse: transient worsening of old deficits with fever, infection, heat, or stress"
    ],
    definitions: [
      "Relapse: patient-reported or objectively observed acute inflammatory demyelinating event lasting ≥24 h, in the absence of fever or infection (McDonald 2017)"
    ],
    immediateActions: acts(
      ["First", "Exclude pseudo-relapse: temperature, UA/urine culture, CXR as indicated, review new meds"],
      ["Disabling relapse", "High-dose methylprednisolone (IV or bioequivalent oral) ×3–5 days"],
      ["Steroid-refractory, severe", "Consider PLEX"],
      ["Atypical features", "Reconsider NMOSD/MOGAD — send AQP4/MOG-IgG"]
    ),
    workup: [
      w("UA/urine culture, CBC, temperature", "URGENT", [], ["Infection is the most common pseudo-relapse trigger"]),
      w("MRI brain/spine with contrast", "IF_INDICATED", ["Diagnosis uncertain", "Atypical or severe presentation", "Treatment decision depends on activity"]),
      w("AQP4-IgG, MOG-IgG", "IF_INDICATED", ["LETM", "Severe/bilateral optic neuritis", "Area postrema syndrome", "Poor steroid response"])
    ],
    treatment: [
      tx("FIRST_LINE", "Methylprednisolone", ["IV", "PO"], "500–1000 mg/day ×3–5 days; oral 1000 mg/day ×3 days noninferior to IV (COPOUSEP)",
        [fixed("Daily", 500, "MG", "PER_DAY", ["Daily"], ["3–5 days"], [], 1000)],
        ["Speeds recovery; no proven effect on long-term disability", "Oral route: more insomnia; give with GI protection"],
        "MODERATE", ["COPOUSEP 2015 RCT (n=199): oral noninferior to IV"], "AVAILABLE"),
      tx("SECOND_LINE", "Plasma exchange (PLEX)", ["IV"], "Course per apheresis service",
        [], ["For steroid-refractory, disabling relapses"],
        "MODERATE", ["AAN 2011 (since retired): probably effective as adjunct for steroid-resistant relapses (Level B)"], "AVAILABLE", [])
    ],
    pitfalls: [
      "Treating a pseudo-relapse with steroids — check for infection first",
      "Mild sensory relapses often need no steroids",
      "Steroids: hyperglycemia, insomnia, mood change, GI bleeding"
    ],
    escalateWhen: [
      "Severe deficit (e.g., paraparesis, severe vision loss) or no response to steroids → PLEX",
      "Atypical features → NMOSD/MOGAD workup"
    ],
    institutionVaries: ["Outpatient vs inpatient steroid pathway"],
    verify: [],
    relatedIds: ["acute-neuro:nmosd-mogad-attack"],
    sources: [S.mcdonald2017, S.copousep2015, S.cortese2011],
    lastReviewed: "UNREVIEWED"
  },
  // ---------------------------------------------------------------- 13
  {
    id: "spinal-cord-compression",
    title: "Acute spinal cord compression (malignant, epidural abscess)",
    category: "SPINAL",
    searchTerms: ["MSCC", "cord compression", "epidural abscess", "SEA", "cauda equina", "dexamethasone 16 mg"],
    presentation: [
      "Back/radicular pain (often nocturnal, worse with straining), limb weakness, gait disturbance, sensory level, bladder/bowel dysfunction",
      "Known or prior cancer → malignant compression",
      "Fever, injection drug use, bacteremia, recent spinal procedure, dialysis → epidural abscess"
    ],
    definitions: [
      "NICE NG234: past/current cancer + symptoms/signs of cord compression = oncologic emergency"
    ],
    immediateActions: acts(
      ["Immediately", "Neurosurgery/spine + oncology (or MSCC coordinator); immobilize if instability suspected"],
      ["Malignant, neurologic signs", "Dexamethasone 16 mg PO (or IV equivalent) now; don't wait for imaging"],
      ["ASAP, ≤24 h", "MRI whole spine (CT if MRI contraindicated); contrast if infection suspected"],
      ["Epidural abscess suspected", "Blood cultures ×2, then empiric antibiotics; urgent surgical evaluation"],
      ["Ongoing", "VTE prophylaxis (mechanical if surgery imminent), bladder scan/catheter, bowel regimen, pain control"]
    ),
    workup: [
      w("MRI whole spine (with contrast if infection or tumor characterization)", "STAT", [], ["Whole spine — multilevel disease is common"]),
      w("Blood cultures ×2, CBC, ESR/CRP", "STAT", ["Infection suspected"]),
      w("Post-void residual / bladder scan", "URGENT"),
      w("Coagulation profile, type and screen", "URGENT", [], ["Pre-operative"]),
      w("LP", "IF_INDICATED", ["Only if meningitis suspected AND compression excluded"], ["LP is contraindicated with epidural abscess/complete block"])
    ],
    treatment: [
      tx("FIRST_LINE", "Dexamethasone (malignant compression)", ["PO", "IV"], "16 mg PO (or IV equivalent) as soon as possible, then 16 mg daily until surgery/radiotherapy; taper after definitive treatment starts",
        [fixed("Load", 16, "MG", "SINGLE"), fixed("Daily", 16, "MG", "PER_DAY", ["Daily"], ["Until surgery/RT, then taper"])],
        ["Stop if MSCC is excluded", "Glucose monitoring; GI protection"],
        "NOT_GRADED", ["NICE NG234 2023"], "AVAILABLE"),
      tx("FIRST_LINE", "Empiric antibiotics (epidural abscess)", ["IV"], "Vancomycin + ceftriaxone (cefepime if Pseudomonas risk/post-procedure); dose per pharmacy — meningeal dosing if concurrent meningitis",
        [], ["After blood cultures, without delaying for MRI if very ill"], "EXPERT_OPINION", [], "AVAILABLE"),
      tx("FIRST_LINE", "Surgical decompression", ["NON_PHARM"], "N/A — neurosurgery/spine",
        [], ["Epidural abscess with neurologic deficit → emergent drainage; 30–40% fail antibiotics alone", "Malignant: surgery and/or radiotherapy per spine/oncology"], "EXPERT_OPINION", [], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "High-dose dexamethasone for epidural abscess", ["IV"], "Not indicated — infectious compression",
        [], [], "EXPERT_OPINION", [], "AVAILABLE")
    ],
    pitfalls: [
      "Don't wait for weakness or sphincter loss — pain plus a red flag warrants urgent MRI",
      "Image the whole spine — skip lesions are common",
      "Epidural abscess often lacks fever; look at risk factors and inflammatory markers",
      "Steroids before tissue diagnosis can obscure lymphoma — discuss with oncology if lymphoma is likely"
    ],
    escalateWhen: [
      "Any new or progressive neurologic deficit → emergent spine surgery evaluation",
      "Spinal instability"
    ],
    institutionVaries: ["After-hours MRI access", "Radiation oncology on-call pathway"],
    verify: [
      "Epidural abscess management has no single guideline here — antibiotic regimen and surgery thresholds rest on reviews; confirm with local ID/spine"
    ],
    relatedIds: ["acute-neuro:bacterial-meningitis"],
    sources: [S.nice234, S.tetsuka2019],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.4.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
