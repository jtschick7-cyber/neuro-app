// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: vascular-antithrombotics batch C (antiplatelet agents) + batch B fixes from current warfarin and Lovenox labels
import fs from "node:fs";
const path = "data/vascular-antithrombotics.json";
const d = JSON.parse(fs.readFileSync(path, "utf8"));

const NA = "NOT_APPLICABLE";
const fixed = (label, min, unit, timing, frequency = [], duration = [], caps = [], max = min) =>
  ({ label, amountMin: min, amountMax: max, unit, basis: "FIXED", timing, weightBasis: NA, caps, frequency, duration });
const perKg = (label, min, max, unit, timing, frequency = [], duration = [], caps = [], wb = "ACTUAL") =>
  ({ label, amountMin: min, amountMax: max, unit, basis: "PER_KG", timing, weightBasis: wb, caps, frequency, duration });
const tx = (role, agent, routes, doseText, dose, notes, evidenceLevel, evidenceNote, formularyStatus, calculatorIds = []) =>
  ({ role, agent, routes, doseText, dose, notes, evidenceLevel, evidenceNote, formularyStatus, calculatorIds });

const S = {
  aha2026: "Prabhakaran S, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (AHA/ASA). Stroke 2026;57:e316-e436. doi:10.1161/STR.0000000000000513",
  sec2021: "Kleindorfer DO, et al. 2021 Guideline for the Prevention of Stroke in Patients With Stroke and Transient Ischemic Attack (AHA/ASA). Stroke 2021;52:e364-e467. doi:10.1161/STR.0000000000000375",
  ich2022: "Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage (AHA/ASA). Stroke 2022;53:e282-e361. doi:10.1161/STR.0000000000000407",
  ncs2016: "Frontera JA, et al. Guideline for reversal of antithrombotics in intracranial hemorrhage: executive summary (NCS/SCCM). Crit Care Med 2016;44:2251-2257",
  aspirinOtc: "Aspirin 325 mg tablets, OTC Drug Facts label. Trifecta Pharmaceuticals USA; revised 7/2026 (user-supplied label)",
  clopidogrel: "Clopidogrel bisulfate tablets US prescribing information. ACI Healthcare USA; revised 6/2020 (user-supplied label)",
  ticagrelor: "Ticagrelor tablets US prescribing information. AiPing Pharmaceutical; revised 6/2026 (user-supplied label)",
  cilostazol: "Cilostazol tablets US prescribing information. Apotex; revised 5/2017 (user-supplied label)",
  asaDp: "Aspirin and extended-release dipyridamole capsules US prescribing information. Amneal; revised 6/2021 (user-supplied label)",
  eptifibatide: "Eptifibatide injection US prescribing information. Baxter; revised 5/2024 (user-supplied label)",
  warfarin: "Warfarin sodium tablets US prescribing information (RemedyRepack); revised 10/2026 (user-supplied label)",
  lovenoxUser: "Lovenox (enoxaparin sodium) US prescribing information. Sanofi; revised 5/2025 (user-supplied label)"
};

const IVT_RULE = ["Antiplatelets alone don't exclude IVT — not addressed as a contraindication in AHA 2026", "See vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"];
const AFTER_IVT = "After IVT: antiplatelets in the first 24 h might be considered only with a compelling indication (AHA 2026: COR 2b, B-NR); usual practice is 24-h imaging first";
const SECONDARY = (agent, doseText, dose) =>
  tx("FIRST_LINE", `${agent} — noncardioembolic stroke/TIA (long-term SAPT)`, ["PO"], doseText, dose,
    ["Antiplatelet preferred over anticoagulation (AHA 2026 and Kleindorfer 2021: COR 1, A)", "Choose agent on risk profile, cost, tolerance (AHA 2026: COR 1, C-EO)"],
    "STRONG", ["Kleindorfer 2021: COR 1, LOE A (aspirin 50–325 mg, clopidogrel 75 mg, or aspirin 25 mg/ER-dipyridamole 200 mg BID)"], "AVAILABLE");

// Antiplatelet-associated ICH (aspirin / ADP-receptor inhibitors)
const apReversal = (isAspirin) => [
  tx("NOT_RECOMMENDED", "Platelet transfusion — ICH without planned surgery", ["IV"], "Do not give (unstructured: recommendation against)",
    [], ["NCS: against, regardless of agent, platelet-function result, volume or exam"],
    isAspirin ? "STRONG" : "WEAK",
    isAspirin ? ["AHA ICH 2022: COR 3: Harm, LOE B-R (aspirin)", "NCS 2016: conditional against, low quality"] : ["NCS 2016: conditional against, low quality", "AHA ICH 2022 harm recommendation is for aspirin specifically"],
    "AVAILABLE"),
  tx("ALTERNATIVE", "Platelet transfusion — before emergency neurosurgery", ["IV"], "1 single-donor apheresis unit; platelet-function testing first if available",
    [fixed("Apheresis platelets", 1, "UNITS", "SINGLE")],
    ["Repeat only if platelet function stays abnormal (NCS)", "Don't transfuse if platelet function is normal or documented resistance (NCS strong)"],
    "WEAK", [isAspirin ? "AHA ICH 2022: COR 2b, LOE C-LD (aspirin)" : "AHA ICH 2022 addresses aspirin only", "NCS 2016: conditional, moderate quality (aspirin or ADP inhibitor)"], "AVAILABLE"),
  tx("ADJUNCT", "Desmopressin", ["IV"], "0.4 mcg/kg IV once",
    [perKg("Desmopressin", 0.4, 0.4, "MCG", "SINGLE")],
    ["Watch sodium — hyponatremia risk", "Can be combined with platelet transfusion before surgery (NCS)"],
    "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD (effectiveness uncertain)", "NCS 2016: suggestion (conditional)"], "AVAILABLE")
];

const entries = [
  {
    kind: "AGENT",
    id: "aspirin",
    title: "Aspirin",
    searchTerms: ["ASA", "acetylsalicylic acid", "baby aspirin", "SAPT", "antiplatelet"],
    drugClass: "ANTIPLATELET",
    subclass: "Irreversible COX-1 inhibitor",
    mechanism: "Irreversibly acetylates platelet COX-1 → less thromboxane A2 for the platelet's lifespan",
    uses: [
      tx("FIRST_LINE", "Aspirin — acute ischemic stroke (no IVT)", ["PO", "PR"], "Start within 48 h of onset; trials used 160–300 mg daily early (IST 300 mg, CAST 160 mg)",
        [fixed("Early dose", 160, "MG", "PER_DAY", ["Daily"], [], [], 300)],
        ["Not a substitute for IVT or EVT in eligible patients (COR 3: Harm, B-R)"],
        "STRONG", ["AHA 2026: COR 1, LOE A (within 48 h)"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "IV aspirin with or within 90 min of starting IVT", ["IV"], "Do not give (unstructured: recommendation against)",
        [], ["Increased hemorrhage"], "STRONG", ["AHA 2026: COR 3: Harm, LOE B-R"], "NOT_STOCKED_LOCAL"),
      SECONDARY("Aspirin", "50–325 mg daily", [fixed("Maintenance", 50, "MG", "PER_DAY", ["Daily"], [], [], 325)]),
      tx("FIRST_LINE", "Aspirin — DAPT partner for minor stroke/high-risk TIA", ["PO"], "Load 160–325 mg, then 75–100 mg daily (trial regimens; see DAPT entry, pending)",
        [fixed("Load", 160, "MG", "SINGLE", [], [], [], 325), fixed("Maintenance", 75, "MG", "PER_DAY", ["Daily"], [], [], 100)],
        ["With ticagrelor: aspirin maintenance 75–100 mg (ticagrelor label)"], "STRONG", ["AHA 2026: DAPT COR 1, LOE A (clopidogrel + aspirin, 21 days)"], "AVAILABLE")
    ],
    renalHepatic: ["Avoid in severe renal failure (GFR <10) or severe hepatic insufficiency (aspirin/ER-dipyridamole label, aspirin component)"],
    timing: {
      halfLifeText: "Short plasma half-life, but platelet inhibition is irreversible and lasts the platelet lifespan (7–10 days)",
      holdBeforeProcedure: ["Usually continued for LP and most neuro procedures — follow local policy"],
      thrombolysisRule: IVT_RULE
    },
    reversal: apReversal(true),
    monitoring: ["GI bleeding symptoms"],
    interactions: ["NSAIDs (ibuprofen) may blunt aspirin's antiplatelet effect when taken first", "Ticagrelor: keep aspirin ≤100 mg/day"],
    pregnancy: [],
    formularyStatus: "AVAILABLE",
    calculatorIds: [],
    institutionVaries: ["Rectal aspirin dose in dysphagia orders"],
    pearls: [
      AFTER_IVT,
      "Already on aspirin at the time of stroke: raising the dose or switching agents is of unclear benefit (AHA 2026: COR 2b, B-NR)",
      "Contraindicated with NSAID allergy or the asthma/rhinitis/nasal polyp syndrome (aspirin/ER-dipyridamole label)"
    ],
    verify: ["NSAID–aspirin interaction pearl is from general knowledge — not in the OTC Drug Facts label supplied"],
    relatedIds: ["vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.aha2026, S.sec2021, S.ich2022, S.ncs2016, S.aspirinOtc, S.asaDp, S.ticagrelor],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "clopidogrel",
    title: "Clopidogrel (Plavix)",
    searchTerms: ["Plavix", "P2Y12 inhibitor", "thienopyridine", "DAPT"],
    drugClass: "ANTIPLATELET",
    subclass: "P2Y12 inhibitor (thienopyridine prodrug)",
    mechanism: "Active metabolite (via CYP2C19) irreversibly blocks the platelet P2Y12 ADP receptor",
    uses: [
      tx("FIRST_LINE", "Clopidogrel + aspirin — minor stroke (NIHSS ≤3) or high-risk TIA (ABCD2 ≥4), no IVT", ["PO"], "Load 300–600 mg, then 75 mg daily with aspirin × 21 days (up to 90), then SAPT",
        [fixed("Load", 300, "MG", "SINGLE", [], [], [], 600), fixed("Maintenance", 75, "MG", "PER_DAY", ["Daily"])],
        ["Start within 24 h (Kleindorfer: ideally 12–24 h, at least within 7 days)", "CHANCE: 300 mg load, 21 days; POINT: 600 mg load, 90 days (more bleeding)", "INSPIRES: up to 72 h with presumed atherosclerotic cause, 21 days (AHA 2026: COR 2a, B-R)", "DAPT >90 days: excess hemorrhage (Kleindorfer: COR 3: Harm, A)"],
        "STRONG", ["AHA 2026: COR 1, LOE A", "Kleindorfer 2021: COR 1, LOE A"], "AVAILABLE"),
      SECONDARY("Clopidogrel", "75 mg daily", [fixed("Maintenance", 75, "MG", "PER_DAY", ["Daily"])])
    ],
    renalHepatic: [],
    timing: {
      halfLifeText: "Parent ~6 h; active metabolite ~30 min; platelet effect lasts the platelet lifespan (7–10 days) (label)",
      holdBeforeProcedure: ["Stop 5 days before elective surgery if an antiplatelet effect isn't wanted (label)"],
      thrombolysisRule: IVT_RULE
    },
    reversal: apReversal(false),
    monitoring: ["CBC if TTP suspected (thrombocytopenia, anemia with schistocytes, neuro findings, renal dysfunction, fever) (label)"],
    interactions: ["Avoid omeprazole and esomeprazole (CYP2C19 inhibition) (label)", "Repaglinide exposure increased (CYP2C8) (label)"],
    pregnancy: [],
    formularyStatus: "AVAILABLE",
    calculatorIds: [],
    institutionVaries: ["CYP2C19 genotype testing availability and turnaround"],
    pearls: [
      "Boxed warning: reduced effect in CYP2C19 poor metabolizers — consider another P2Y12 inhibitor (label)",
      "CYP2C19 loss-of-function carriers with minor stroke/TIA: ticagrelor + aspirin × 21 days may be reasonable instead (AHA 2026: COR 2b, B-R)",
      "Without a load, the antiplatelet effect takes several days (label)",
      "Platelet transfusion within 4 h of a load or 2 h of a maintenance dose may be less effective (label)",
      AFTER_IVT
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:aspirin", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.aha2026, S.sec2021, S.ich2022, S.ncs2016, S.clopidogrel],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "ticagrelor",
    title: "Ticagrelor (Brilinta)",
    searchTerms: ["Brilinta", "P2Y12 inhibitor", "THALES", "CHANCE-2", "DAPT"],
    drugClass: "ANTIPLATELET",
    subclass: "P2Y12 inhibitor (reversible, direct-acting)",
    mechanism: "Reversibly blocks P2Y12; no metabolic activation needed (CYP2C19-independent)",
    uses: [
      tx("ALTERNATIVE", "Ticagrelor + aspirin — minor stroke (NIHSS ≤5) or high-risk TIA (ABCD2 ≥6) or symptomatic ≥50% stenosis, <24 h, no IVT (THALES)", ["PO"], "180 mg load, then 90 mg BID for up to 30 days; first maintenance dose 6–12 h after the load; with aspirin 300–325 mg load then 75–100 mg daily",
        [fixed("Load", 180, "MG", "SINGLE"), fixed("Maintenance", 90, "MG", "PER_DOSE", ["BID"], ["Up to 30 days"])],
        ["FDA-labeled stroke indication (NIHSS ≤5 or high-risk TIA)", "More severe bleeding including ICH (Kleindorfer)"],
        "WEAK", ["AHA 2026: COR 2b, LOE B-R", "Kleindorfer 2021: COR 2b, LOE B-R"], "INSTITUTION_VARIES"),
      tx("ALTERNATIVE", "Ticagrelor + aspirin — CYP2C19 loss-of-function carrier, minor stroke (NIHSS ≤3) or TIA (ABCD2 ≥4), <24 h, no IVT (CHANCE-2)", ["PO"], "180 mg load, then 90 mg BID with aspirin × 21 days, then ticagrelor monotherapy",
        [fixed("Load", 180, "MG", "SINGLE"), fixed("Maintenance", 90, "MG", "PER_DOSE", ["BID"])],
        ["Preferred over clopidogrel + aspirin in carriers"], "WEAK", ["AHA 2026: COR 2b, LOE B-R"], "INSTITUTION_VARIES"),
      tx("NOT_RECOMMENDED", "Ticagrelor monotherapy instead of aspirin (SOCRATES)", ["PO"], "Not recommended over aspirin (unstructured: recommendation against)",
        [], [], "STRONG", ["AHA 2026: COR 3: No Benefit, LOE B-R"], "INSTITUTION_VARIES"),
      tx("SECOND_LINE", "Ticagrelor — minor stroke/high-risk TIA <24 h with ipsilateral >30% intracranial stenosis", ["PO"], "90 mg BID added to aspirin for up to 30 days (unstructured: see ICAD entry, pending)",
        [], [], "WEAK", ["Kleindorfer 2021: COR 2b, LOE B-NR"], "INSTITUTION_VARIES")
    ],
    renalHepatic: ["No renal adjustment; ESRD on hemodialysis: exposure ~38% higher on non-dialysis days (label)", "Severe hepatic impairment: exposure likely increased (label)"],
    timing: {
      halfLifeText: "~7 h (parent), ~9 h (active metabolite) (label)",
      holdBeforeProcedure: ["Stop 5 days before surgery with major bleeding risk when possible (label)"],
      thrombolysisRule: IVT_RULE
    },
    reversal: [
      tx("NOT_RECOMMENDED", "Platelet transfusion", ["IV"], "Did not reverse ticagrelor in healthy volunteers; unlikely to help (unstructured: label statement)",
        [], ["Circulating drug inhibits transfused platelets"], "NOT_GRADED", ["Label §10 overdosage"], "AVAILABLE"),
      tx("ADJUNCT", "Desmopressin", ["IV"], "0.4 mcg/kg IV once",
        [perKg("Desmopressin", 0.4, 0.4, "MCG", "SINGLE")], ["Watch sodium"], "WEAK", ["NCS 2016: suggestion for ADP-receptor inhibitor ICH", "AHA ICH 2022: COR 2b, C-LD"], "AVAILABLE")
    ],
    monitoring: ["Dyspnea (common, self-limiting) and bradyarrhythmias/ventricular pauses (label)"],
    interactions: ["Avoid strong CYP3A inhibitors (e.g., ketoconazole, itraconazole, voriconazole, clarithromycin, nefazodone) and strong inducers (rifampin, phenytoin, carbamazepine, phenobarbital) (label)", "Aspirin maintenance >100 mg reduces effectiveness — keep 75–100 mg (label)"],
    pregnancy: [],
    formularyStatus: "INSTITUTION_VARIES",
    calculatorIds: [],
    institutionVaries: ["Formulary restriction for neuro indications", "CYP2C19 genotype testing"],
    pearls: [
      "Contraindicated with any history of intracranial hemorrhage (label)",
      "Tablets can be crushed and given in water orally or by NG tube (label)",
      "Can cause false-negative platelet function tests for HIT; PF4 antibody testing unaffected (label)",
      AFTER_IVT
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:aspirin", "vascular-antithrombotics:clopidogrel"],
    sources: [S.aha2026, S.sec2021, S.ich2022, S.ncs2016, S.ticagrelor],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "cilostazol",
    title: "Cilostazol (Pletal)",
    searchTerms: ["Pletal", "PDE3 inhibitor", "ICAD"],
    drugClass: "ANTIPLATELET",
    subclass: "Phosphodiesterase-3 inhibitor",
    mechanism: "PDE3 inhibition → raised cAMP in platelets and vessels: antiplatelet and vasodilator",
    uses: [
      tx("ADJUNCT", "Cilostazol — added to aspirin or clopidogrel, symptomatic intracranial stenosis 50–99%", ["PO"], "100 mg BID, 30 min before or 2 h after breakfast and dinner",
        [fixed("Standard", 100, "MG", "PER_DOSE", ["BID"])],
        ["Kleindorfer 2021 dose: 200 mg/day", "Label indication is claudication — stroke use is off-label in the US"],
        "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"], "INSTITUTION_VARIES")
    ],
    renalHepatic: ["No renal adjustment; not removed by dialysis (95–98% protein bound) (label)", "Mild hepatic impairment: no adjustment (label)"],
    timing: {
      halfLifeText: "~11–13 h (cilostazol and active metabolites) (label)",
      holdBeforeProcedure: ["Not stated in label — local policy"],
      thrombolysisRule: IVT_RULE
    },
    reversal: [],
    monitoring: ["Platelets and WBC — rare thrombocytopenia/leukopenia progressing to agranulocytosis (label)", "Headache, diarrhea, palpitations common (label)"],
    interactions: ["Reduce to 50 mg BID with CYP3A4 inhibitors (ketoconazole, itraconazole, erythromycin, diltiazem) or CYP2C19 inhibitors (ticlopidine, fluconazole, omeprazole) (label)"],
    pregnancy: [],
    formularyStatus: "INSTITUTION_VARIES",
    calculatorIds: [],
    institutionVaries: [],
    pearls: ["Boxed warning: contraindicated in heart failure of any severity (label)"],
    verify: [],
    relatedIds: [],
    sources: [S.sec2021, S.cilostazol],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "aspirin-dipyridamole",
    title: "Aspirin / extended-release dipyridamole (Aggrenox)",
    searchTerms: ["Aggrenox", "ASA-ERDP", "dipyridamole"],
    drugClass: "ANTIPLATELET",
    subclass: "COX-1 inhibitor + phosphodiesterase/adenosine-uptake inhibitor",
    mechanism: "Aspirin COX-1 inhibition plus dipyridamole adenosine-uptake and PDE inhibition",
    uses: [
      SECONDARY("Aspirin 25 mg / ER-dipyridamole 200 mg", "1 capsule BID (morning and evening), with or without food",
        [fixed("Capsule (25/200 mg)", 1, "UNITS", "PER_DOSE", ["BID"])]),
      tx("ALTERNATIVE", "Headache-intolerance regimen", ["PO"], "1 capsule at bedtime + low-dose aspirin in the morning; return to BID within about 1 week",
        [fixed("Capsule (25/200 mg)", 1, "UNITS", "PER_DAY", ["At bedtime"], ["~1 week"])],
        ["No outcome data for this regimen (label)"], "NOT_GRADED", ["Label §2.1"], "INSTITUTION_VARIES")
    ],
    renalHepatic: ["Avoid in severe hepatic or severe renal insufficiency (GFR <10) (label)"],
    timing: {
      halfLifeText: "Dipyridamole terminal ~15.5 h; aspirin ~20 min (label)",
      holdBeforeProcedure: ["Not stated in label — local policy"],
      thrombolysisRule: IVT_RULE
    },
    reversal: apReversal(true),
    monitoring: ["Headache (most common early reason to stop) (label)"],
    interactions: ["Dipyridamole raises adenosine levels — hold before adenosine/dipyridamole stress testing (label)", "NSAIDs: decreased renal function (label)"],
    pregnancy: [],
    formularyStatus: "INSTITUTION_VARIES",
    calculatorIds: [],
    institutionVaries: ["Often non-formulary"],
    pearls: [
      "Not interchangeable with separate aspirin and dipyridamole tablets (label)",
      "Contraindicated with NSAID allergy or the asthma/rhinitis/nasal polyp syndrome (label)",
      "Never combine with clopidogrel: triple antiplatelet therapy is harmful (AHA 2026: COR 3: Harm, B-R)"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:aspirin"],
    sources: [S.sec2021, S.aha2026, S.ich2022, S.ncs2016, S.asaDp],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "gp-iib-iiia-inhibitors",
    title: "GP IIb/IIIa inhibitors (eptifibatide, tirofiban, abciximab)",
    searchTerms: ["eptifibatide", "Integrilin", "tirofiban", "Aggrastat", "abciximab", "ReoPro", "GPIIb/IIIa"],
    drugClass: "ANTIPLATELET",
    subclass: "IV glycoprotein IIb/IIIa receptor antagonists",
    mechanism: "Block fibrinogen and vWF binding to platelet GP IIb/IIIa — final common pathway of aggregation",
    uses: [
      tx("ALTERNATIVE", "Tirofiban — AIS (general)", ["IV"], "Efficacy not well established; stroke regimens are off-label (unstructured: no stroke dose in a guideline or label)",
        [], ["Used by neurointerventionalists for rescue stenting/reocclusion — follow the IR protocol"], "WEAK", ["AHA 2026: COR 2b, LOE B-R"], "INSTITUTION_VARIES"),
      tx("NOT_RECOMMENDED", "Tirofiban before EVT for LVO", ["IV"], "Do not give pre-procedure (unstructured: recommendation against)",
        [], [], "STRONG", ["AHA 2026: COR 3: No Benefit, LOE B-R"], "INSTITUTION_VARIES"),
      tx("NOT_RECOMMENDED", "Eptifibatide as adjunct to IVT within 3 h", ["IV"], "Do not give (unstructured: recommendation against)",
        [], [], "STRONG", ["AHA 2026: COR 3: No Benefit, LOE B-R"], "INSTITUTION_VARIES"),
      tx("NOT_RECOMMENDED", "Abciximab in AIS", ["IV"], "Do not give — more bleeding (unstructured: recommendation against)",
        [], [], "STRONG", ["AHA 2026: COR 3: Harm, LOE B-R"], "NOT_STOCKED_LOCAL"),
      tx("SUPPORTIVE", "Eptifibatide — label ACS/PCI regimen (reference only)", ["IV"], "180 mcg/kg bolus, then 2 mcg/kg/min; CrCl <50: 1 mcg/kg/min",
        [perKg("Bolus", 180, 180, "MCG", "SINGLE"), perKg("Infusion", 2, 2, "MCG", "PER_MIN", ["Continuous"]), perKg("Infusion, CrCl <50", 1, 1, "MCG", "PER_MIN", ["Continuous"])],
        ["Cardiac dosing — not a stroke recommendation"], "NOT_GRADED", ["FDA-labeled regimen"], "INSTITUTION_VARIES", ["cockcroft-gault"])
    ],
    renalHepatic: ["Eptifibatide: halve infusion if CrCl <50; contraindicated if dialysis-dependent (label)"],
    timing: {
      halfLifeText: "Eptifibatide ~2.5 h; platelet inhibition reversible after stopping (label)",
      holdBeforeProcedure: ["Eptifibatide: sheath removal only after heparin off 3–4 h with aPTT <45 s (label, PCI context)"],
      thrombolysisRule: ["Not combined with IVT — eptifibatide adjunct to IVT is COR 3: No Benefit"]
    },
    reversal: [
      tx("FIRST_LINE", "Stop the infusion", ["NON_PHARM"], "Stop infusion — eptifibatide effect wanes over hours (unstructured: action)",
        [], [], "NOT_GRADED", ["Label pharmacology"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Platelet transfusion — GP IIb/IIIa-related ICH", ["IV"], "Not suggested, even before neurosurgery (unstructured: recommendation against)",
        [], [], "WEAK", ["NCS 2016: conditional against, very low quality"], "AVAILABLE")
    ],
    monitoring: ["Baseline Hgb, platelets, creatinine, PT/aPTT (label)", "Stop if platelets <100,000/mm³ or confirmed thrombocytopenia (label)"],
    interactions: ["Other parenteral GP IIb/IIIa inhibitors: contraindicated together (label)", "Anticoagulants, thrombolytics, other antiplatelets raise bleeding (label)"],
    pregnancy: [],
    formularyStatus: "INSTITUTION_VARIES",
    calculatorIds: ["cockcroft-gault"],
    institutionVaries: ["Which agent is stocked and the neuro-IR intra-procedural protocol (dose, route, duration, post-procedure antiplatelet bridge)"],
    pearls: [
      "Eptifibatide contraindications: bleeding diathesis or abnormal bleeding within 30 days; SBP >200 or DBP >110 uncontrolled; major surgery within 6 weeks; stroke within 30 days or any hemorrhagic stroke; dialysis dependence (label)",
      "Rescue balloon angioplasty/stenting after failed EVT: benefit uncertain (AHA 2026: COR 2b, B-NR)"
    ],
    verify: ["Tirofiban: the upload was a shipping label, not the prescribing information — no tirofiban dose, half-life or contraindications stored; attach the Aggrastat PI if you want them"],
    relatedIds: [],
    sources: [S.aha2026, S.ncs2016, S.eptifibatide],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);

// --- Batch B fixes from the current warfarin (10/2026) and full Lovenox (5/2025) labels ---
const w = d.entries.find((e) => e.id === "warfarin");
w.interactions = [
  "More frequent INR checks when starting, stopping or changing any drug, including short courses of antibiotics, antifungals or steroids (label)",
  "CYP2C9/1A2/3A4 inhibitors raise INR — label examples: amiodarone, TMP-SMX (cotrimoxazole), fluconazole, metronidazole",
  "Inducers lower INR — label examples: carbamazepine, phenobarbital, phenytoin, rifampin",
  "Dietary vitamin K changes INR"
];
w.verify = [];
w.title = "Warfarin (Coumadin, Jantoven)";
w.sources = w.sources.map((s) => (s.startsWith("Coumadin") ? S.warfarin : s));
w.pearls = w.pearls.map((p) => p.replace("cerebral aneurysm,", "cerebral aneurysm, dissecting aorta,"));

const n = d.entries.find((e) => e.id === "enoxaparin");
n.verify = [];
n.sources = n.sources.map((s) => (s.startsWith("Lovenox") ? S.lovenoxUser : s));

d.version = "0.3.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
