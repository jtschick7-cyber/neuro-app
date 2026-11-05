// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: vascular-antithrombotics batch B (anticoagulant agents) + alteplase label patch
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
  ich2022: "Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage (AHA/ASA). Stroke 2022;53:e282-e361. doi:10.1161/STR.0000000000000407",
  ncs2016: "Frontera JA, et al. Guideline for reversal of antithrombotics in intracranial hemorrhage: executive summary (NCS/SCCM). Crit Care Med 2016;44:2251-2257",
  sec2021: "Kleindorfer DO, et al. 2021 Guideline for the Prevention of Stroke in Patients With Stroke and Transient Ischemic Attack (AHA/ASA). Stroke 2021;52:e364-e467. doi:10.1161/STR.0000000000000375",
  cvt2024: "Saposnik G, et al. Diagnosis and Management of Cerebral Venous Thrombosis: A Scientific Statement From the AHA. Stroke 2024;55:e77-e90. doi:10.1161/STR.0000000000000456",
  aha2026: "Prabhakaran S, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (AHA/ASA). Stroke 2026;57:e316-e436. doi:10.1161/STR.0000000000000513",
  eliquis: "Eliquis (apixaban) US prescribing information. Bristol-Myers Squibb; revised 6/2026 (user-supplied label)",
  xarelto: "Xarelto (rivaroxaban) US prescribing information. Janssen; revised 3/2026 (user-supplied label)",
  savaysa: "Savaysa (edoxaban) US prescribing information. Daiichi Sankyo; revised 10/2023 (user-supplied label)",
  pradaxa: "Pradaxa (dabigatran etexilate) US prescribing information. Boehringer Ingelheim; revised 6/2025 (user-supplied label)",
  coumadin: "Coumadin (warfarin sodium) US prescribing information. Bristol-Myers Squibb; revised 10/2011 (user-supplied label)",
  heparinPremix: "Heparin Sodium in 0.45% Sodium Chloride Injection US prescribing information. B. Braun; revised 12/2023 (user-supplied label)",
  heparinVial: "Heparin Sodium Injection (vial) US prescribing information, §2.6 low-dose prophylaxis (label text via PrescriberPoint, accessed 2026-11-04)",
  lovenox: "Lovenox (enoxaparin sodium) US prescribing information. Sanofi; revised 5/2025 (label text via Drugs.com, accessed 2026-11-04)",
  activase: "Activase (alteplase) US prescribing information. Genentech; revised 9/2022 (user-supplied label)"
};

const DOAC_IVT = [
  "Last dose <48 h (or unknown) with normal renal function: IVT generally not given; may be considered after individualized review",
  "See vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"
];
const NEURAXIAL = "Boxed warning: spinal/epidural hematoma with neuraxial anesthesia or spinal puncture — weigh before LP; risk up with indwelling catheters, NSAIDs/antiplatelets, traumatic or repeated punctures";
const LP_LOCAL = "LP/neuraxial interruption intervals: follow local ASRA-based policy; label intervals are for surgery";
const DOAC_PREG = ["Avoid in pregnancy and breastfeeding — use LMWH (Saposnik 2024)"];
const AF_REC = ["Kleindorfer 2021: OAC indicated after stroke/TIA with AF, COR 1 (A for OAC; B-R for DOAC over warfarin)", "DOAC preferred over warfarin unless moderate–severe mitral stenosis or mechanical valve"];

// Reversal items shared across factor Xa inhibitors
const fxaReversal = (name) => [
  tx("FIRST_LINE", `4F-PCC — ${name}-associated ICH`, ["IV"], "50 U/kg IV (NCS 2016)",
    [perKg("4F-PCC", 50, 50, "UNITS", "SINGLE")],
    ["Local pathway for factor Xa reversal", "PT/INR and aPTT don't reflect reversal — don't titrate to them", "See vascular-antithrombotics:four-factor-pcc"],
    "WEAK", ["AHA ICH 2022: COR 2b, LOE B-NR (4F-PCC or aPCC)", "NCS 2016: conditional, low quality"], "LOCAL_PREFERRED"),
  tx("ALTERNATIVE", "Andexanet alfa", ["IV"], "Dose depends on agent, dose and time since last dose (unstructured: not stocked locally)",
    [], ["Not stocked — not part of local pathway", `Not mentioned in the current ${name} label`], "MODERATE", ["AHA ICH 2022: COR 2a, LOE B-NR"], "NOT_STOCKED_LOCAL"),
  tx("ADJUNCT", "Activated charcoal", ["PO", "NG"], "If last dose within a few hours and airway protected (unstructured: guideline gives no dose)",
    [], ["Reduces absorption per label"], "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"], "AVAILABLE")
];

const entries = [
  {
    kind: "AGENT",
    id: "apixaban",
    title: "Apixaban (Eliquis)",
    searchTerms: ["Eliquis", "DOAC", "NOAC", "factor Xa inhibitor", "anti-Xa"],
    drugClass: "ANTICOAGULANT",
    subclass: "Oral direct factor Xa inhibitor",
    mechanism: "Direct, reversible factor Xa inhibition (free and clot-bound)",
    uses: [
      tx("FIRST_LINE", "Apixaban — AF (secondary stroke prevention)", ["PO"], "5 mg BID; 2.5 mg BID if ≥2 of: age ≥80, weight ≤60 kg, SCr ≥1.5 mg/dL",
        [fixed("Standard", 5, "MG", "PER_DOSE", ["BID"]), fixed("Reduced (≥2 criteria)", 2.5, "MG", "PER_DOSE", ["BID"])],
        ["Dose reduction uses SCr, age and weight — not CrCl", "Timing after stroke: see AF anticoagulation timing (pending)"],
        "STRONG", AF_REC, "AVAILABLE"),
      tx("FIRST_LINE", "Apixaban — DVT/PE treatment", ["PO"], "10 mg BID × 7 days, then 5 mg BID",
        [fixed("Lead-in", 10, "MG", "PER_DOSE", ["BID"], ["7 days"]), fixed("Maintenance", 5, "MG", "PER_DOSE", ["BID"])],
        ["CVT: DOACs used after parenteral lead-in in trials — see Saposnik 2024"], "NOT_GRADED", ["FDA-labeled indication"], "AVAILABLE")
    ],
    renalHepatic: [
      "AF: reduce only by the 2-of-3 rule (age, weight, SCr)",
      "ESRD on hemodialysis: label dose gives exposure similar to ARISTOTLE; outcomes not studied (label)",
      "Kleindorfer 2021: warfarin or apixaban may be reasonable in ESRD/dialysis (COR 2b, B-NR)",
      "Hepatic: Child-Pugh A no change; B — no dose recommendation (limited data); C — not recommended (label)"
    ],
    timing: {
      halfLifeText: "~12 h (oral); effect persists ≥24 h after last dose; ~27% renal clearance (label)",
      holdBeforeProcedure: ["Moderate/high bleeding risk: stop ≥48 h before", "Low bleeding risk: stop ≥24 h before", "No bridging needed (label)"],
      thrombolysisRule: DOAC_IVT
    },
    reversal: fxaReversal("apixaban"),
    monitoring: ["No routine monitoring; PT/INR/aPTT unreliable", "Apixaban-calibrated anti-Xa level if available (institution varies)", "Renal function and CBC periodically"],
    interactions: [
      "Combined strong CYP3A4 + P-gp inhibitors: reduce 5 or 10 mg doses by 50%; avoid if already on 2.5 mg BID (label)",
      "Combined strong CYP3A4 + P-gp inducers (rifampin, carbamazepine, phenytoin): avoid (label)",
      "Antiplatelets, NSAIDs, SSRIs/SNRIs raise bleeding risk"
    ],
    pregnancy: DOAC_PREG,
    formularyStatus: "AVAILABLE",
    calculatorIds: [],
    institutionVaries: [LP_LOCAL, "Anti-Xa assay calibrated for apixaban may not be available"],
    pearls: [
      NEURAXIAL,
      "Not recommended with prosthetic heart valves or triple-positive antiphospholipid syndrome (label)",
      "Label reversal section lists PCC, aPCC or rFVIIa (not evaluated); protamine and vitamin K have no effect; hemodialysis has little effect"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:four-factor-pcc", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.eliquis, S.sec2021, S.ich2022, S.ncs2016, S.cvt2024],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "rivaroxaban",
    title: "Rivaroxaban (Xarelto)",
    searchTerms: ["Xarelto", "DOAC", "NOAC", "factor Xa inhibitor"],
    drugClass: "ANTICOAGULANT",
    subclass: "Oral direct factor Xa inhibitor",
    mechanism: "Direct factor Xa inhibition",
    uses: [
      tx("FIRST_LINE", "Rivaroxaban — AF (secondary stroke prevention)", ["PO"], "CrCl >50: 20 mg daily; CrCl ≤50: 15 mg daily — with the evening meal",
        [fixed("CrCl >50", 20, "MG", "PER_DAY", ["Daily with evening meal"]), fixed("CrCl ≤50", 15, "MG", "PER_DAY", ["Daily with evening meal"])],
        ["15 and 20 mg doses must be taken with food", "CrCl by Cockcroft-Gault using actual weight (label)"],
        "STRONG", AF_REC, "INSTITUTION_VARIES", ["cockcroft-gault"]),
      tx("FIRST_LINE", "Rivaroxaban — DVT/PE treatment", ["PO"], "15 mg BID with food × 21 days, then 20 mg daily with food; avoid if CrCl <15",
        [fixed("Lead-in", 15, "MG", "PER_DOSE", ["BID with food"], ["21 days"]), fixed("Maintenance", 20, "MG", "PER_DAY", ["Daily with food"])],
        [], "NOT_GRADED", ["FDA-labeled indication"], "INSTITUTION_VARIES", ["cockcroft-gault"])
    ],
    renalHepatic: [
      "AF: 15 mg daily if CrCl ≤50; CrCl <30 not studied but exposure expected similar to CrCl 30–<50 (label)",
      "VTE treatment: avoid if CrCl <15 (label)",
      "Hepatic: avoid in Child-Pugh B or C, or any hepatic disease with coagulopathy (label)"
    ],
    timing: {
      halfLifeText: "5–9 h in healthy adults 20–45 y; 11–13 h in adults 60–76 y (label)",
      holdBeforeProcedure: ["Stop ≥24 h before surgery or other procedures (label)"],
      thrombolysisRule: DOAC_IVT
    },
    reversal: fxaReversal("rivaroxaban"),
    monitoring: ["No routine monitoring; PT may be prolonged but is not quantitative", "Rivaroxaban-calibrated anti-Xa if available", "Renal function periodically"],
    interactions: [
      "Combined P-gp and strong CYP3A inhibitors (e.g., ketoconazole, ritonavir): avoid (label)",
      "Combined P-gp and strong CYP3A inducers (rifampin, carbamazepine, phenytoin, St John's wort): avoid (label)"
    ],
    pregnancy: DOAC_PREG,
    formularyStatus: "INSTITUTION_VARIES",
    calculatorIds: ["cockcroft-gault"],
    institutionVaries: [LP_LOCAL, "Formulary DOAC may differ — confirm with pharmacy"],
    pearls: [
      NEURAXIAL,
      "Not recommended with prosthetic heart valves or triple-positive antiphospholipid syndrome (label)",
      "Label reversal section lists PCC, aPCC or rFVIIa; protamine and vitamin K have no effect; not dialyzable"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:four-factor-pcc", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.xarelto, S.sec2021, S.ich2022, S.ncs2016, S.cvt2024],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "edoxaban",
    title: "Edoxaban (Savaysa)",
    searchTerms: ["Savaysa", "DOAC", "NOAC", "factor Xa inhibitor"],
    drugClass: "ANTICOAGULANT",
    subclass: "Oral direct factor Xa inhibitor",
    mechanism: "Direct factor Xa inhibition",
    uses: [
      tx("FIRST_LINE", "Edoxaban — AF (secondary stroke prevention)", ["PO"], "CrCl >50 to ≤95: 60 mg daily; CrCl 15–50: 30 mg daily; do not use if CrCl >95",
        [fixed("CrCl >50 to ≤95", 60, "MG", "PER_DAY", ["Daily"]), fixed("CrCl 15–50", 30, "MG", "PER_DAY", ["Daily"])],
        ["Boxed warning: reduced efficacy with CrCl >95 (more ischemic strokes than warfarin) — choose another agent"],
        "STRONG", AF_REC, "INSTITUTION_VARIES", ["cockcroft-gault"]),
      tx("FIRST_LINE", "Edoxaban — DVT/PE treatment", ["PO"], "After 5–10 days of parenteral anticoagulation: 60 mg daily; 30 mg daily if CrCl 15–50, weight ≤60 kg, or certain P-gp inhibitors",
        [fixed("Standard", 60, "MG", "PER_DAY", ["Daily"]), fixed("Reduced", 30, "MG", "PER_DAY", ["Daily"])],
        ["Requires parenteral lead-in"], "NOT_GRADED", ["FDA-labeled indication"], "INSTITUTION_VARIES", ["cockcroft-gault"])
    ],
    renalHepatic: [
      "AF: CrCl >95 do not use; >50–95 60 mg; 15–50 30 mg; <15 not recommended (label)",
      "Hemodialysis does not meaningfully clear edoxaban (label)",
      "Hepatic: Child-Pugh B or C not recommended (label)"
    ],
    timing: {
      halfLifeText: "10–14 h; effect persists ~24 h after last dose (label)",
      holdBeforeProcedure: ["Stop ≥24 h before invasive or surgical procedures (label)"],
      thrombolysisRule: DOAC_IVT
    },
    reversal: fxaReversal("edoxaban"),
    monitoring: ["No routine monitoring; PT/INR/aPTT and anti-Xa not useful after PCC (label)", "CrCl before starting — upper and lower limits matter"],
    interactions: ["Rifampin: avoid (label)", "VTE indication: 30 mg with certain P-gp inhibitors (label)"],
    pregnancy: DOAC_PREG,
    formularyStatus: "INSTITUTION_VARIES",
    calculatorIds: ["cockcroft-gault"],
    institutionVaries: [LP_LOCAL, "Formulary DOAC may differ — confirm with pharmacy"],
    pearls: [
      NEURAXIAL,
      "Not recommended with mechanical heart valves or moderate–severe mitral stenosis (label)",
      "Label: no specific reversal agent; protamine, vitamin K and TXA not expected to work; PCC/aPCC/rFVIIa may be considered (not evaluated)"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:four-factor-pcc", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.savaysa, S.sec2021, S.ich2022, S.ncs2016, S.cvt2024],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "dabigatran",
    title: "Dabigatran (Pradaxa)",
    searchTerms: ["Pradaxa", "DOAC", "NOAC", "direct thrombin inhibitor", "DTI"],
    drugClass: "ANTICOAGULANT",
    subclass: "Oral direct thrombin inhibitor",
    mechanism: "Direct, reversible thrombin inhibition (prodrug dabigatran etexilate)",
    uses: [
      tx("FIRST_LINE", "Dabigatran — AF (secondary stroke prevention)", ["PO"], "CrCl >30: 150 mg BID; CrCl 15–30: 75 mg BID; no dosing for CrCl <15 or dialysis",
        [fixed("CrCl >30", 150, "MG", "PER_DOSE", ["BID"]), fixed("CrCl 15–30", 75, "MG", "PER_DOSE", ["BID"])],
        ["Idarucizumab not stocked locally — weigh this when choosing an agent"],
        "STRONG", AF_REC, "INSTITUTION_VARIES", ["cockcroft-gault"]),
      tx("FIRST_LINE", "Dabigatran — DVT/PE treatment", ["PO"], "150 mg BID after 5–10 days of parenteral anticoagulation (CrCl >30)",
        [fixed("Standard", 150, "MG", "PER_DOSE", ["BID"])],
        ["CVT: RE-SPECT CVT compared dabigatran 150 mg BID with warfarin after 5–15 days of parenteral lead-in (Saposnik 2024)"], "NOT_GRADED", ["FDA-labeled indication"], "INSTITUTION_VARIES", ["cockcroft-gault"])
    ],
    renalHepatic: [
      "Mostly renally cleared; half-life and effect rise with renal impairment (label)",
      "AF: CrCl 30–50 with dronedarone or systemic ketoconazole → 75 mg BID; CrCl 15–30 with any P-gp inhibitor → avoid (label)",
      "VTE: avoid P-gp inhibitors if CrCl <50; no dosing for CrCl ≤30 (label)"
    ],
    timing: {
      halfLifeText: "12–17 h in healthy adults; longer in renal impairment (label)",
      holdBeforeProcedure: ["CrCl ≥50: stop 1–2 days before", "CrCl <50: stop 3–5 days before", "Longer for major surgery, spinal puncture or catheter placement (label)"],
      thrombolysisRule: DOAC_IVT
    },
    reversal: [
      tx("FIRST_LINE", "Idarucizumab (Praxbind)", ["IV"], "5 g IV (unstructured: not stocked locally — pharmacy or transfer)",
        [], ["Not stocked — call pharmacy; consider transfer if reversal is critical", "Label names it as the specific reversal agent for urgent procedures or life-threatening bleeding"],
        "MODERATE", ["AHA ICH 2022: COR 2a, LOE B-NR"], "NOT_STOCKED_LOCAL"),
      tx("SECOND_LINE", "4F-PCC (or aPCC) when idarucizumab unavailable", ["IV"], "50 U/kg IV (NCS 2016)",
        [perKg("4F-PCC", 50, 50, "UNITS", "SINGLE")], ["Local fallback", "See vascular-antithrombotics:four-factor-pcc"],
        "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"], "LOCAL_PREFERRED"),
      tx("ADJUNCT", "Hemodialysis / renal replacement", ["NON_PHARM"], "When idarucizumab unavailable (unstructured: procedure)",
        [], ["Removes dabigatran; ~7–15% redistribution rebound after stopping (label)"], "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"], "AVAILABLE"),
      tx("ADJUNCT", "Activated charcoal", ["PO", "NG"], "If last dose within a few hours and airway protected (unstructured: guideline gives no dose)",
        [], [], "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"], "AVAILABLE")
    ],
    monitoring: ["No routine monitoring; standard clotting tests are not quantitative — local dabigatran assay availability varies", "Renal function before start and periodically"],
    interactions: ["P-gp inducers (rifampin): avoid (label)", "P-gp inhibitors: renal-function–dependent rules above"],
    pregnancy: DOAC_PREG,
    formularyStatus: "INSTITUTION_VARIES",
    calculatorIds: ["cockcroft-gault"],
    institutionVaries: [LP_LOCAL, "Idarucizumab availability — local pathway is PCC + dialysis"],
    pearls: [
      NEURAXIAL,
      "Contraindicated with mechanical heart valves; not recommended with bioprosthetic valves (label)",
      "Swallow capsules whole — breaking, chewing or opening raises exposure (label)"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:four-factor-pcc", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.pradaxa, S.sec2021, S.ich2022, S.ncs2016, S.cvt2024],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "warfarin",
    title: "Warfarin (Coumadin)",
    searchTerms: ["Coumadin", "Jantoven", "VKA", "vitamin K antagonist"],
    drugClass: "ANTICOAGULANT",
    subclass: "Vitamin K antagonist",
    mechanism: "Inhibits VKORC1 → reduced synthesis of factors II, VII, IX, X and proteins C and S",
    uses: [
      tx("FIRST_LINE", "Warfarin — valvular AF (moderate–severe mitral stenosis or any mechanical valve)", ["PO"], "Target INR 2.5 (2.0–3.0); mechanical mitral valve INR 3.0 (2.5–3.5) (unstructured: titrated to INR)",
        [], ["Start usually 2–5 mg daily; adjust by INR (label)", "Mechanical mitral valve with prior stroke/TIA: add aspirin 75–100 mg/day (Kleindorfer 2021, COR 1 C-LD)"],
        "STRONG", ["Kleindorfer 2021: COR 1, LOE B-R"], "AVAILABLE"),
      tx("SECOND_LINE", "Warfarin — nonvalvular AF", ["PO"], "Target INR 2.5 (2.0–3.0) (unstructured: titrated to INR)",
        [], ["DOAC preferred over warfarin (COR 1 B-R)", "ESRD/dialysis: warfarin or apixaban may be reasonable (COR 2b B-NR)"],
        "STRONG", ["Kleindorfer 2021: OAC COR 1"], "AVAILABLE")
    ],
    renalHepatic: ["Hepatic impairment increases INR response (label)", "No renal dose adjustment; preferred over most DOACs in ESRD"],
    timing: {
      halfLifeText: "Effective half-life 20–60 h (mean ~40 h); anticoagulant effect onset 24 h, peak may take 72–96 h (label)",
      holdBeforeProcedure: ["Label gives no fixed interval — check INR immediately before any procedure (label)"],
      thrombolysisRule: ["INR >1.7 or PT >15 s: do not give IVT", "See vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"]
    },
    reversal: [
      tx("FIRST_LINE", "4F-PCC + IV vitamin K — VKA-associated ICH", ["IV"], "INR-banded 4F-PCC (25/35/50 U/kg) plus vitamin K 10 mg IV (unstructured: see four-factor-pcc and vitamin-k)",
        [], ["See vascular-antithrombotics:four-factor-pcc and vascular-antithrombotics:vitamin-k"],
        "STRONG", ["AHA ICH 2022: COR 1, LOE B-R (PCC over FFP)"], "LOCAL_PREFERRED")
    ],
    monitoring: ["INR daily during initiation; then per stability (label)", "INR >4.0 adds no benefit and raises bleeding risk (label)"],
    interactions: [
      "CYP2C9, 1A2 and 3A4 inhibitors/inducers alter INR — check every new drug (label)",
      "Common neuro culprits: valproate, phenytoin, carbamazepine, fluconazole, amiodarone, metronidazole, TMP-SMX (VERIFY list)",
      "Dietary vitamin K changes INR"
    ],
    pregnancy: ["Contraindicated in pregnancy except mechanical heart valves at high thrombotic risk (label)", "CVT in pregnancy: LMWH (Saposnik 2024)"],
    formularyStatus: "AVAILABLE",
    calculatorIds: [],
    institutionVaries: ["Warfarin dosing nomogram and pharmacy-to-dose protocols"],
    pearls: [
      "Label contraindications relevant to neuro: CNS hemorrhage, cerebral aneurysm, recent or planned CNS/eye surgery, spinal puncture, lumbar block anesthesia, malignant hypertension",
      "Proteins C and S fall early: when treating thrombosis, continue full heparin for several days until INR is stable in range (heparin vial label)",
      "Genotype (CYP2C9, VKORC1) informs start dose if known (label)"
    ],
    verify: [
      "Interaction drug list is from general knowledge — confirm against a current warfarin label or Lexicomp before release",
      "Label supplied is Coumadin 10/2011 (marked 'may not be the latest'); confirm against a current generic warfarin label"
    ],
    relatedIds: ["vascular-antithrombotics:four-factor-pcc", "vascular-antithrombotics:vitamin-k", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.coumadin, S.sec2021, S.ich2022, S.cvt2024],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "heparin-ufh",
    title: "Unfractionated heparin (UFH)",
    searchTerms: ["heparin", "UFH", "heparin drip", "heparin infusion", "SQ heparin"],
    drugClass: "ANTICOAGULANT",
    subclass: "Indirect thrombin/factor Xa inhibitor (antithrombin-dependent)",
    mechanism: "Potentiates antithrombin → inactivates thrombin and factor Xa",
    uses: [
      tx("FIRST_LINE", "UFH — therapeutic IV infusion", ["IV"], "Label: 5,000 U IV bolus, then 20,000–40,000 U/24 h (68-kg basis); weight-based nomogram per local protocol",
        [fixed("Bolus", 5000, "UNITS", "SINGLE"), fixed("Infusion", 20000, "UNITS", "PER_DAY", ["Continuous"], [], [], 40000)],
        ["Stroke/ICH-adjacent use: many centers omit the bolus — follow local neuro nomogram", "Short half-life and full protamine reversal make it the choice when procedures or bleeding risk are likely"],
        "NOT_GRADED", ["FDA-labeled regimen"], "AVAILABLE"),
      tx("FIRST_LINE", "UFH — VTE prophylaxis", ["SC"], "5,000 U SC every 8–12 h",
        [fixed("Prophylaxis", 5000, "UNITS", "PER_DOSE", ["q8–12h"])],
        ["Label regimen is postoperative (5,000 U 2 h before surgery then q8–12h); same dose used for medical/stroke prophylaxis", "Timing after ICH/IVT: see VTE prophylaxis entry (pending)"],
        "NOT_GRADED", ["FDA-labeled regimen (heparin vial PI §2.6)"], "AVAILABLE")
    ],
    renalHepatic: ["No renal adjustment — preferred over LMWH when CrCl <30 or dialysis is likely"],
    timing: {
      halfLifeText: "Dose-dependent, 0.5–2 h (label)",
      holdBeforeProcedure: ["IV infusion: stop and confirm normalized aPTT before LP/procedure — interval per local policy"],
      thrombolysisRule: ["Received heparin with aPTT >40 s: do not give IVT", "See vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"]
    },
    reversal: [
      tx("FIRST_LINE", "Protamine", ["IV"], "1 mg per 100 U UFH given in the prior 2–3 h, max 50 mg (unstructured: see protamine)",
        [], ["See vascular-antithrombotics:protamine"], "MODERATE", ["AHA ICH 2022: COR 2a, LOE C-LD"], "AVAILABLE")
    ],
    monitoring: [
      "Label target: aPTT 1.5–2× control; check ~every 4 h early in infusion (label)",
      "Anti-Xa targets and nomograms are institutional",
      "Platelets periodically for HIT; platelets usually fall 5–10 days after starting; rapid-onset HIT within 24 h if heparin in the prior 3 months (label)"
    ],
    interactions: ["Antiplatelets and NSAIDs increase bleeding (label)", "Hyperkalemia: check K+ before and during therapy in at-risk patients (label)"],
    pregnancy: ["Use a preservative-free product if heparin is needed in pregnancy (vial label)"],
    formularyStatus: "AVAILABLE",
    calculatorIds: [],
    institutionVaries: ["Weight-based nomogram (bolus/no bolus, starting rate, aPTT vs anti-Xa target) — use the local stroke/neuro nomogram", LP_LOCAL],
    pearls: [
      "Contraindicated: history of HIT/HITT, pork/heparin hypersensitivity, or when coagulation tests can't be done for full-dose use (label)",
      "Suspected HIT: stop all heparin, including flushes"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:protamine", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.heparinPremix, S.heparinVial, S.ich2022, S.aha2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "enoxaparin",
    title: "Enoxaparin (Lovenox)",
    searchTerms: ["Lovenox", "LMWH", "low molecular weight heparin"],
    drugClass: "ANTICOAGULANT",
    subclass: "Low-molecular-weight heparin",
    mechanism: "Antithrombin-mediated factor Xa > IIa inhibition",
    uses: [
      tx("FIRST_LINE", "Enoxaparin — VTE prophylaxis (medical)", ["SC"], "40 mg SC daily; CrCl <30: 30 mg SC daily",
        [fixed("CrCl ≥30", 40, "MG", "PER_DAY", ["Daily"]), fixed("CrCl <30", 30, "MG", "PER_DAY", ["Daily"])],
        ["Timing after ICH/IVT: see VTE prophylaxis entry (pending)"], "NOT_GRADED", ["FDA-labeled regimen"], "AVAILABLE", ["cockcroft-gault"]),
      tx("FIRST_LINE", "Enoxaparin — DVT/PE treatment", ["SC"], "1 mg/kg SC q12h (or 1.5 mg/kg daily); CrCl <30: 1 mg/kg daily",
        [perKg("q12h", 1, 1, "MG", "PER_DOSE", ["q12h"]), perKg("Daily", 1.5, 1.5, "MG", "PER_DOSE", ["Daily"]), perKg("CrCl <30", 1, 1, "MG", "PER_DOSE", ["Daily"])],
        ["CVT and pregnancy: LMWH is the preferred parenteral agent (Saposnik 2024)"], "NOT_GRADED", ["FDA-labeled regimen"], "AVAILABLE", ["cockcroft-gault"])
    ],
    renalHepatic: ["CrCl <30: reduce dose (above) — accumulates; consider UFH (label)"],
    timing: {
      halfLifeText: "~4.5 h after a single dose; ~7 h after repeated dosing (anti-Xa) (label)",
      holdBeforeProcedure: [
        "Neuraxial/LP: ≥12 h after a prophylactic dose; ≥24 h after a treatment dose (label)",
        "Next dose ≥4 h after catheter removal (label)",
        "CrCl <30: consider roughly doubling these intervals (label)"
      ],
      thrombolysisRule: ["Therapeutic LMWH within 24 h: not addressed in AHA 2026 — see vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"]
    },
    reversal: [
      tx("FIRST_LINE", "Protamine", ["IV"], "<8 h since dose: 1 mg per 1 mg enoxaparin; 8–12 h: 0.5 mg per 1 mg (unstructured: see protamine)",
        [], ["Neutralizes at most ~60% of anti-Xa activity (label)", "See vascular-antithrombotics:protamine"], "WEAK", ["AHA ICH 2022: COR 2b"], "AVAILABLE")
    ],
    monitoring: ["No routine monitoring; anti-Xa in renal impairment, obesity, pregnancy (institution varies)", "Platelets for HIT"],
    interactions: ["Antiplatelets, NSAIDs, other anticoagulants increase bleeding — and neuraxial hematoma risk (label)"],
    pregnancy: ["LMWH is the anticoagulant of choice in pregnancy (Saposnik 2024)"],
    formularyStatus: "AVAILABLE",
    calculatorIds: ["cockcroft-gault"],
    institutionVaries: ["Obesity and anti-Xa–guided dosing", LP_LOCAL],
    pearls: [NEURAXIAL, "Contraindicated with history of immune-mediated HIT within the past 100 days or circulating antibodies (label)"],
    verify: ["HIT contraindication wording ('within the past 100 days') — confirm in Lovenox PI §4"],
    relatedIds: ["vascular-antithrombotics:protamine"],
    sources: [S.lovenox, S.ich2022, S.cvt2024],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);

// Alteplase: clear VERIFY using the Activase label
const a = d.entries.find((e) => e.id === "alteplase");
a.timing.halfLifeText = "Initial plasma half-life <5 min; rapid hepatic clearance (label, AMI PK data)";
a.verify = [];
const ci = "Label AIS contraindications: current ICH, SAH, active internal bleeding, intracranial/intraspinal surgery or serious head trauma within 3 months, intracranial conditions raising bleeding risk (some neoplasms, AVMs, aneurysms), bleeding diathesis, current severe uncontrolled hypertension";
const win = "Label indication is within 3 h of onset; guideline use to 4.5 h (and imaging-selected extended windows) is off-label";
for (const p of [ci, win]) if (!a.pearls.includes(p)) a.pearls.push(p);
if (!a.sources.includes(S.activase)) a.sources.push(S.activase);

d.version = "0.2.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
