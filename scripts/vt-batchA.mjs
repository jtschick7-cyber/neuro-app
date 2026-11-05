// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: create data/vascular-antithrombotics.json with batch A (thrombolysis & reversal)
import fs from "node:fs";
const path = "data/vascular-antithrombotics.json";
const d = fs.existsSync(path)
  ? JSON.parse(fs.readFileSync(path, "utf8"))
  : { title: "Vascular antithrombotics", version: "0.1.0", schemaVersion: "1.0.0", lastUpdated: "2026-11-04", entries: [] };

const NA = "NOT_APPLICABLE";
const fixed = (label, min, unit, timing, frequency = [], duration = [], caps = [], max = min) =>
  ({ label, amountMin: min, amountMax: max, unit, basis: "FIXED", timing, weightBasis: NA, caps, frequency, duration });
const perKg = (label, min, max, unit, timing, frequency = [], duration = [], caps = [], wb = "ACTUAL") =>
  ({ label, amountMin: min, amountMax: max, unit, basis: "PER_KG", timing, weightBasis: wb, caps, frequency, duration });
const cap = (amount, unit, scope = "PER_DOSE") => ({ amount, unit, scope });
const tx = (role, agent, routes, doseText, dose, notes, evidenceLevel, evidenceNote, formularyStatus, calculatorIds = []) =>
  ({ role, agent, routes, doseText, dose, notes, evidenceLevel, evidenceNote, formularyStatus, calculatorIds });
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  aha2026: "Prabhakaran S, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (AHA/ASA). Stroke 2026;57:e316-e436. doi:10.1161/STR.0000000000000513",
  ich2022: "Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage (AHA/ASA). Stroke 2022;53:e282-e361. doi:10.1161/STR.0000000000000407",
  ncs2016: "Frontera JA, et al. Guideline for reversal of antithrombotics in intracranial hemorrhage: executive summary (NCS/SCCM). Crit Care Med 2016;44:2251-2257",
  tnkLabel: "TNKase (tenecteplase) US prescribing information. Genentech; revised 2/2025 (label text via Drugs.com, accessed 2026-11-04)",
  kcentraLabel: "Kcentra (prothrombin complex concentrate, human) US prescribing information. CSL Behring (label text via Drugs.com, accessed 2026-11-04)"
};

const IVT_MONITOR = [
  "Neuro checks and BP every 15 min during and for 2 h after, every 30 min for 6 h, then hourly to 24 h (AHA 2026 Table 7)",
  "Keep BP ≤180/105 mm Hg; increase BP checks if above (AHA 2026 Table 7)",
  "Delay NG tube, Foley, or arterial line if safely possible (AHA 2026 Table 7)",
  "CT or MRI at 24 h before starting antiplatelets or anticoagulants (AHA 2026 Table 7)"
];
const ANGIOEDEMA = "Orolingual angioedema (AHA 2026 Table 6): airway first; stop alteplase infusion, hold ACE inhibitors; methylprednisolone 125 mg IV, diphenhydramine 50 mg IV, famotidine 20 mg IV; if progressing epinephrine 0.3 mg IM (0.3 mL of 1 mg/mL); icatibant 30 mg SC or C1-esterase inhibitor 20 IU/kg are options";
const IVT_THROMBOLYSIS_RULE = ["See vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"];

const entries = [
  {
    kind: "AGENT",
    id: "tenecteplase",
    title: "Tenecteplase (TNK)",
    searchTerms: ["TNK", "TNKase", "thrombolysis", "IVT", "lytic"],
    drugClass: "THROMBOLYTIC",
    subclass: "Fibrin-specific plasminogen activator",
    mechanism: "Modified tPA with greater fibrin specificity and longer half-life — single IV bolus",
    uses: [
      tx("FIRST_LINE", "Tenecteplase — AIS within 4.5 h", ["IV"], "0.25 mg/kg (max 25 mg) IV push over 5–10 s; 10-kg weight bands: <60 kg 15 mg, 60–<70 17.5 mg, 70–<80 20 mg, 80–<90 22.5 mg, ≥90 25 mg (5 mg/mL)",
        [perKg("Bolus", 0.25, 0.25, "MG", "SINGLE", ["Once, IV push over 5–10 s"], [], [cap(25, "MG")])],
        ["Equivalent to alteplase within 4.5 h — single bolus, no infusion", "If <50 kg with an accurate weight, 1-kg band dosing may be used; don't delay to get an exact weight", "Don't delay thrombectomy to assess response"],
        "STRONG", ["AHA 2026: COR 1, LOE A (tenecteplase 0.25 mg/kg or alteplase 0.9 mg/kg)", "FDA-approved for AIS in adults (label revised 2/2025)"], "LOCAL_PREFERRED", ["tnk-dose"]),
      tx("ALTERNATIVE", "Tenecteplase — extended window (4.5–9 h or wake-up) with perfusion mismatch", ["IV"], "0.25 mg/kg (max 25 mg) IV push",
        [perKg("Bolus", 0.25, 0.25, "MG", "SINGLE", [], [], [cap(25, "MG")])],
        ["Not EVT-eligible; salvageable penumbra on automated perfusion imaging; awoke within 9 h of sleep midpoint or 4.5–9 h from last known well (2a B-R)", "LVO with penumbra 4.5–24 h who cannot get EVT: may be beneficial under experienced thrombolysis teams (2b B-R)"],
        "MODERATE", ["AHA 2026 §4.6.3: COR 2a, LOE B-R"], "LOCAL_PREFERRED", ["tnk-dose"]),
      tx("NOT_RECOMMENDED", "Tenecteplase 0.4 mg/kg", ["IV"], "Do not use — no outcome benefit and possible harm (NOR-TEST 2)",
        [perKg("Rejected dose", 0.4, 0.4, "MG", "SINGLE")], [], "STRONG", ["AHA 2026: COR 3: No Benefit, LOE A"], "LOCAL_PREFERRED"),
      tx("NOT_RECOMMENDED", "Thrombolysis for mild non-disabling deficits", ["IV"], "Do not give — use DAPT instead (unstructured: recommendation against treatment)",
        [], ["e.g., isolated sensory syndrome; judge 'disabling' per patient (AHA 2026 Table 4)"], "STRONG", ["AHA 2026: COR 3: No Benefit, LOE B-R"], "LOCAL_PREFERRED")
    ],
    renalHepatic: [],
    timing: {
      halfLifeText: "Initial 20–24 min; terminal 90–130 min (STEMI PK data, label)",
      holdBeforeProcedure: [],
      thrombolysisRule: IVT_THROMBOLYSIS_RULE
    },
    reversal: [],
    monitoring: IVT_MONITOR,
    interactions: ["Label: discontinue concomitant heparin or antiplatelet agents immediately if serious bleeding occurs; concomitant hemostasis-impairing drugs raise bleeding risk"],
    pregnancy: ["May be considered in pregnancy/postpartum when benefit for moderate–severe stroke outweighs uterine bleeding risk; emergent OB consult (AHA 2026 Table 8)"],
    formularyStatus: "LOCAL_PREFERRED",
    calculatorIds: ["tnk-dose"],
    institutionVaries: ["Weight-band (10-kg) vs 1-kg band dosing chart", "Order set and pharmacy preparation workflow"],
    pearls: ["Two dosing tables on the label: AIS (max 25 mg) and STEMI (30–50 mg). Use the AIS table — STEMI doses are double", ANGIOEDEMA],
    verify: [],
    relatedIds: ["vascular-antithrombotics:alteplase", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics", "vascular-antithrombotics:sich-after-thrombolysis", "calc:tnk-dose"],
    sources: [S.aha2026, S.tnkLabel],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "alteplase",
    title: "Alteplase (tPA)",
    searchTerms: ["tPA", "Activase", "rtPA", "thrombolysis", "IVT"],
    drugClass: "THROMBOLYTIC",
    subclass: "Recombinant tissue plasminogen activator",
    mechanism: "Converts fibrin-bound plasminogen to plasmin",
    uses: [
      tx("ALTERNATIVE", "Alteplase — AIS within 4.5 h", ["IV"], "0.9 mg/kg (max 90 mg): 10% as IV bolus over 1 min, remainder infused over 60 min",
        [perKg("Total dose", 0.9, 0.9, "MG", "SINGLE", ["10% bolus over 1 min, remainder over 60 min"], [], [cap(90, "MG")])],
        ["Equivalent alternative to tenecteplase (your formulary prefers TNK)", "If severe headache, acute hypertension, nausea/vomiting, or neuro worsening: stop infusion and get emergency CT"],
        "STRONG", ["AHA 2026: COR 1, LOE A"], "AVAILABLE", ["alteplase-dose"]),
      tx("ALTERNATIVE", "Alteplase — unknown onset with DWI–FLAIR mismatch", ["IV"], "0.9 mg/kg (max 90 mg) within 4.5 h of symptom recognition",
        [perKg("Total dose", 0.9, 0.9, "MG", "SINGLE", [], [], [cap(90, "MG")])],
        ["DWI lesion < one-third MCA territory and no marked FLAIR change"],
        "MODERATE", ["AHA 2026 §4.6.3: COR 2a, LOE B-R"], "AVAILABLE", ["alteplase-dose"])
    ],
    renalHepatic: [],
    timing: { halfLifeText: "VERIFY — label half-life not yet sourced", holdBeforeProcedure: [], thrombolysisRule: IVT_THROMBOLYSIS_RULE },
    reversal: [],
    monitoring: IVT_MONITOR,
    interactions: [],
    pregnancy: ["May be considered in pregnancy/postpartum when benefit for moderate–severe stroke outweighs uterine bleeding risk; emergent OB consult (AHA 2026 Table 8)"],
    formularyStatus: "AVAILABLE",
    calculatorIds: ["alteplase-dose"],
    institutionVaries: ["Whether alteplase is stocked alongside TNK"],
    pearls: [ANGIOEDEMA],
    verify: ["Alteplase half-life and label contraindications — Drugs.com Activase label was blocked; attach the Activase PI or I'll use a reachable copy"],
    relatedIds: ["vascular-antithrombotics:tenecteplase", "vascular-antithrombotics:sich-after-thrombolysis", "calc:alteplase-dose"],
    sources: [S.aha2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "thrombolysis-with-prior-antithrombotics",
    title: "Thrombolysis in patients on antithrombotics or with coagulopathy",
    searchTerms: ["DOAC thrombolysis", "INR thrombolysis", "heparin tPA", "TNK eligibility anticoagulant"],
    question: "Can this patient on (or recently on) an antithrombotic receive IV thrombolysis?",
    population: ["Adults with AIS otherwise eligible for IVT within the treatment window"],
    rules: rules(
      ["No recent warfarin or heparin", "Start IVT before coagulation results return; stop if INR >1.7 or PT/PTT is abnormal by local standards", "CONSENSUS", ["AHA 2026 Table 8 (absolute-contraindication tier)"]],
      ["Platelets <100,000/mm³, INR >1.7, aPTT >40 s, or PT >15 s", "Do not give IVT", "CONSENSUS", ["AHA 2026 Table 8: safety unknown, may substantially increase harm"]],
      ["DOAC taken <48 h, disabling deficit, within window", "May be considered after individual benefit–risk review: time of last dose, renal function, severity, EVT availability, reversal agents, DOAC-specific anti-Xa or thrombin time assays. Document timing, reversal use, and assay results", "EXPERT_OPINION", ["AHA 2026 Table 8: relative contraindication; observational data only", "Several cohorts found no excess sICH with DOAC exposure, but anticoagulated patients were excluded from pivotal trials"]],
      ["Prior antiplatelet monotherapy/DAPT, or prophylactic/therapeutic LMWH", "Not addressed in AHA 2026 — follow institutional protocol", "NOT_GRADED", ["Gap in source: AHA 2026 text and Table 8 don't address these exposures"]],
      ["After IVT", "Hold antiplatelets and anticoagulants until the 24-h CT/MRI", "CONSENSUS", ["AHA 2026 Table 7"]]
    ),
    options: [],
    contraindications: ["Acute intracranial hemorrhage or extensive clear hypodensity on CT", "Intracranial/spinal surgery within 14 days; moderate–severe TBI within 14 days; spinal cord injury within 3 months", "Intra-axial intracranial neoplasm; infective endocarditis; aortic arch dissection", "Amyloid immunotherapy or ARIA", "(All AHA 2026 Table 8, absolute tier)"],
    esoDiffers: [],
    institutionVaries: ["Availability of rapid drug-specific anti-Xa / thrombin-time assays", "Local policy on IVT with DOAC <48 h", "Policy on prior antiplatelets and LMWH"],
    pearls: ["Don't delay thrombectomy work-up while sorting out anticoagulant status"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:tenecteplase", "vascular-antithrombotics:alteplase"],
    sources: [S.aha2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "sich-after-thrombolysis",
    title: "Symptomatic ICH within 24 h of thrombolysis",
    searchTerms: ["sICH after tPA", "post-thrombolysis hemorrhage", "cryoprecipitate", "tranexamic acid TNK bleed"],
    question: "How do I manage symptomatic intracranial bleeding within 24 h of alteplase or tenecteplase?",
    population: ["Adults with AIS within 24 h of IV alteplase or tenecteplase"],
    rules: rules(
      ["Suspected bleed (headache, vomiting, BP surge, neuro decline)", "Stop alteplase infusion or TNK if still being pushed", "CONSENSUS", ["AHA 2026 Table 5"]],
      ["Immediately", "Emergent CBC, PT/INR, aPTT, fibrinogen, type and cross; emergent noncontrast head CT if clinical concern", "CONSENSUS", ["AHA 2026 Table 5"]],
      ["Bleed confirmed", "Cryoprecipitate 10 U IV over 10–30 min to keep fibrinogen ≥150 mg/dL (10 U raises fibrinogen ~50 mg/dL)", "CONSENSUS", ["AHA 2026 Table 5"]],
      ["Adjunct — especially if blood products refused or cryoprecipitate delayed", "Tranexamic acid 1,000 mg IV over 10 min, or ε-aminocaproic acid 4–5 g IV over 1 h then 1 g IV until bleeding controlled", "CONSENSUS", ["AHA 2026 Table 5", "NCS/SCCM 2016 alternative: TXA 10–15 mg/kg IV over 20 min if cryoprecipitate contraindicated"]],
      ["In parallel", "Hematology and neurosurgery as needed; supportive care: BP, ICP, CPP, MAP, temperature, glucose", "CONSENSUS", ["AHA 2026 Table 5"]]
    ),
    options: [
      tx("FIRST_LINE", "Cryoprecipitate", ["IV"], "10 U IV over 10–30 min; titrate to fibrinogen ≥150 mg/dL",
        [fixed("Dose", 10, "UNITS", "SINGLE", ["Repeat per fibrinogen"])], [], "CONSENSUS", ["AHA 2026 Table 5"], "AVAILABLE"),
      tx("ADJUNCT", "Tranexamic acid", ["IV"], "1,000 mg IV over 10 min (AHA 2026); NCS 2016 lists 10–15 mg/kg over 20 min",
        [fixed("AHA 2026 dose", 1000, "MG", "SINGLE", ["Over 10 min"])], [], "CONSENSUS", ["AHA 2026 Table 5"], "AVAILABLE"),
      tx("ALTERNATIVE", "ε-Aminocaproic acid", ["IV"], "4–5 g IV over 1 h, then 1 g IV until bleeding controlled",
        [fixed("Load", 4, "G", "SINGLE", ["Over 1 h"], [], [], 5), fixed("Continuation", 1, "G", "PER_DOSE", ["Until bleeding controlled"])], [], "CONSENSUS", ["AHA 2026 Table 5"], "INSTITUTION_VARIES")
    ],
    contraindications: [],
    esoDiffers: [],
    institutionVaries: ["Tranexamic acid dose (AHA 2026 fixed 1 g vs NCS 2016 weight-based)", "Cryoprecipitate turnaround time"],
    pearls: ["Peak antifibrinolytic effect at about 3 h (AHA 2026 Table 5)"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:tenecteplase", "vascular-antithrombotics:alteplase", "acute-neuro:elevated-icp-herniation"],
    sources: [S.aha2026, S.ncs2016],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "four-factor-pcc",
    title: "Four-factor prothrombin complex concentrate (4F-PCC)",
    searchTerms: ["Kcentra", "PCC", "4F-PCC", "warfarin reversal", "factor Xa reversal", "apixaban reversal", "rivaroxaban reversal"],
    drugClass: "REVERSAL",
    subclass: "Plasma-derived factors II, VII, IX, X with proteins C and S",
    mechanism: "Replaces vitamin K–dependent factors; overwhelms factor Xa inhibition (off-label)",
    uses: [
      tx("FIRST_LINE", "4F-PCC — warfarin (VKA) with ICH, INR ≥2.0", ["IV"], "By pre-treatment INR and weight (weight capped at 100 kg): INR 2–<4: 25 U/kg (max 2,500 U); INR 4–6: 35 U/kg (max 3,500 U); INR >6: 50 U/kg (max 5,000 U). Give with IV vitamin K",
        [perKg("INR 2–<4", 25, 25, "UNITS", "SINGLE", [], [], [cap(2500, "UNITS")]), perKg("INR 4–6", 35, 35, "UNITS", "SINGLE", [], [], [cap(3500, "UNITS")]), perKg("INR >6", 50, 50, "UNITS", "SINGLE", [], [], [cap(5000, "UNITS")])],
        ["Infuse 0.12 mL/kg/min (~3 U/kg/min), max 8.4 mL/min (label)", "Recheck INR soon after; label: repeat dosing not supported", "If INR still ≥1.4 at 24–48 h, NCS suggests FFP rather than more PCC", "Fixed-dose regimens (e.g., 1,500 U for intracranial bleeding) are also used (AHA ICH 2022)"],
        "STRONG", ["AHA ICH 2022: COR 1, LOE B-R — preferred over FFP", "NCS 2016: 4F over 3F PCC (conditional, low)"], "AVAILABLE"),
      tx("SECOND_LINE", "PCC — warfarin with ICH, INR 1.3–1.9", ["IV"], "Dose per protocol (unstructured: below the label's INR range; AHA notes 10–20 IU/kg has been suggested)",
        [], [], "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"], "AVAILABLE"),
      tx("FIRST_LINE", "4F-PCC — factor Xa inhibitor ICH (apixaban, rivaroxaban, edoxaban)", ["IV"], "50 U/kg IV (NCS 2016)",
        [perKg("Dose", 50, 50, "UNITS", "SINGLE")],
        ["Your formulary's factor Xa reversal agent (andexanet not stocked)", "Activated charcoal 50 g if the DOAC was taken within ~2 h and the airway is protected"],
        "WEAK", ["AHA ICH 2022: COR 2b, LOE B-NR (4F-PCC or aPCC)", "NCS 2016: conditional, low quality"], "LOCAL_PREFERRED"),
      tx("ALTERNATIVE", "4F-PCC — dabigatran ICH when idarucizumab unavailable", ["IV"], "50 U/kg IV (NCS 2016)",
        [perKg("Dose", 50, 50, "UNITS", "SINGLE")], ["Consider hemodialysis to lower dabigatran levels (AHA 2b C-LD)"],
        "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"], "AVAILABLE")
    ],
    renalHepatic: [],
    timing: { halfLifeText: "Single dose; INR usually ≤1.3 within 30 min in label trials", holdBeforeProcedure: [], thrombolysisRule: [] },
    reversal: [],
    monitoring: ["INR soon after dosing (VKA)", "Clinical/radiographic hemostasis; thrombosis"],
    interactions: [],
    pregnancy: [],
    formularyStatus: "LOCAL_PREFERRED",
    calculatorIds: [],
    institutionVaries: ["INR-based vs fixed-dose protocol", "Weight used for >100 kg"],
    pearls: ["Boxed warning: arterial and venous thromboembolism; contraindicated in DIC and heparin-induced thrombocytopenia (contains heparin) (label)", "Don't wait for INR to start reversal in anticoagulant-associated ICH (AHA ICH 2022: COR 1)"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:vitamin-k", "vascular-antithrombotics:protamine"],
    sources: [S.ich2022, S.ncs2016, S.kcentraLabel],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "vitamin-k",
    title: "Vitamin K (phytonadione)",
    searchTerms: ["vitamin K", "phytonadione", "warfarin reversal"],
    drugClass: "REVERSAL",
    subclass: "Vitamin K1",
    mechanism: "Restores hepatic synthesis of factors II, VII, IX, X — durable after PCC wears off",
    uses: [
      tx("FIRST_LINE", "Vitamin K — warfarin-associated ICH", ["IV"], "10 mg IV once (NCS 2016); AHA ICH 2022 cites 5–10 mg IV. Give directly after PCC/factor replacement",
        [fixed("Dose", 5, "MG", "SINGLE", ["Redose 10 mg IV if INR still ≥1.4 at 24–48 h (NCS)"], [], [], 10)],
        ["Always pair with PCC — PCC alone can rebound INR at 12–24 h"],
        "STRONG", ["AHA ICH 2022: COR 1, LOE C-LD", "NCS 2016: strong, moderate quality; dose a good practice statement"], "AVAILABLE")
    ],
    renalHepatic: [],
    timing: { halfLifeText: "Effect takes hours — follow-up INR guides redosing (NCS 2016)", holdBeforeProcedure: [], thrombolysisRule: [] },
    reversal: [],
    monitoring: ["Repeat INR; redose if ≥1.4 at 24–48 h"],
    interactions: [],
    pregnancy: [],
    formularyStatus: "AVAILABLE",
    calculatorIds: [],
    institutionVaries: [],
    pearls: [],
    verify: [],
    relatedIds: ["vascular-antithrombotics:four-factor-pcc"],
    sources: [S.ich2022, S.ncs2016],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "AGENT",
    id: "protamine",
    title: "Protamine sulfate",
    searchTerms: ["protamine", "heparin reversal", "enoxaparin reversal", "LMWH reversal"],
    drugClass: "REVERSAL",
    subclass: "Heparin antagonist",
    mechanism: "Binds heparin; only partially neutralizes LMWH anti-Xa activity",
    uses: [
      tx("FIRST_LINE", "Protamine — UFH-associated ICH", ["IV"], "1 mg per 100 U heparin given in the previous 2–3 h, max 50 mg per dose; if aPTT stays high, 0.5 mg per 100 U (unstructured: ratio to recent heparin exposure)",
        [], ["Slow IV over ~10 min"], "MODERATE", ["AHA ICH 2022: COR 2a, LOE C-LD", "NCS 2016: strong, moderate–high quality"], "AVAILABLE"),
      tx("FIRST_LINE", "Protamine — enoxaparin-associated ICH (therapeutic dose)", ["IV"], "Enoxaparin within 8 h: 1 mg per 1 mg enoxaparin; 8–12 h: 0.5 mg per 1 mg; max 50 mg per dose; >3–5 half-lives probably unnecessary (unstructured: ratio to enoxaparin dose)",
        [], ["Partial reversal only", "Redose 0.5 mg per 1 mg enoxaparin if bleeding persists or renal insufficiency (NCS conditional)", "Dalteparin/tinzaparin: 1 mg per 100 anti-Xa units in past 3–5 half-lives"],
        "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD", "NCS 2016: strong, moderate quality"], "AVAILABLE"),
      tx("NOT_RECOMMENDED", "Protamine for fondaparinux", ["IV"], "Do not use (unstructured: recommendation against)", [], ["NCS: aPCC 20 IU/kg suggested instead"], "STRONG", ["NCS 2016: strong, low quality"], "AVAILABLE")
    ],
    renalHepatic: ["Renal insufficiency prolongs LMWH effect — consider redosing (NCS 2016)"],
    timing: { halfLifeText: "Recheck aPTT after dosing; redose per NCS if still prolonged", holdBeforeProcedure: [], thrombolysisRule: [] },
    reversal: [],
    monitoring: ["aPTT (UFH)", "Anti-Xa (LMWH) if available"],
    interactions: [],
    pregnancy: [],
    formularyStatus: "AVAILABLE",
    calculatorIds: [],
    institutionVaries: [],
    pearls: ["If protamine is contraindicated: rFVIIa 90 μg/kg IV may be considered (NCS conditional, very low)"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:four-factor-pcc"],
    sources: [S.ich2022, S.ncs2016],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);
d.version = "0.1.0";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
