// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: vascular-antithrombotics batch E (hemorrhage, VTE, CVT, procedure holds) + ESO dissection update + LP pointers
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
const rules = (...r) => r.map(([condition, recommendation, evidenceLevel, evidenceNote = []], i) => ({ order: i + 1, condition, recommendation, evidenceLevel, evidenceNote }));

const S = {
  aha2026: "Prabhakaran S, et al. 2026 Guideline for the Early Management of Patients With Acute Ischemic Stroke (AHA/ASA). Stroke 2026;57:e316-e436. doi:10.1161/STR.0000000000000513",
  sec2021: "Kleindorfer DO, et al. 2021 Guideline for the Prevention of Stroke in Patients With Stroke and Transient Ischemic Attack (AHA/ASA). Stroke 2021;52:e364-e467. doi:10.1161/STR.0000000000000375",
  ich2022: "Greenberg SM, et al. 2022 Guideline for the Management of Patients With Spontaneous Intracerebral Hemorrhage (AHA/ASA). Stroke 2022;53:e282-e361. doi:10.1161/STR.0000000000000407",
  ncs2016: "Frontera JA, et al. Guideline for reversal of antithrombotics in intracranial hemorrhage: executive summary (NCS/SCCM). Crit Care Med 2016;44:2251-2257",
  cvt2024: "Saposnik G, et al. Diagnosis and Management of Cerebral Venous Thrombosis: A Scientific Statement From the AHA. Stroke 2024;55:e77-e90. doi:10.1161/STR.0000000000000456",
  asra2025: "Kopp SL, et al. Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy: ASRA Pain Medicine evidence-based guidelines (fifth edition). Reg Anesth Pain Med 2025;0:1-29. doi:10.1136/rapm-2024-105766",
  eso2021: "Debette S, et al. ESO guideline for the management of extracranial and intracranial artery dissection. Eur Stroke J 2021;6(3):XXXIX-LXXXVIII. doi:10.1177/23969873211046475",
  ticagrelor: "Ticagrelor tablets US prescribing information. AiPing Pharmaceutical; revised 6/2026 (user-supplied label)"
};
const ASRA_MAP = "ASRA grading mapped: 'we recommend' (grade I) → STRONG, 'we suggest' (grade II) → WEAK";

const entries = [
  {
    kind: "DECISION",
    id: "anticoag-reversal-ich",
    title: "Anticoagulant-associated ICH: reversal by agent",
    searchTerms: ["reversal", "ICH on anticoagulation", "warfarin ICH", "DOAC ICH", "Kcentra", "PCC"],
    question: "How is each anticoagulant reversed in spontaneous ICH, given local stock?",
    population: ["Spontaneous ICH on an anticoagulant"],
    rules: rules(
      ["Any anticoagulant-associated ICH", "Stop the anticoagulant immediately; reverse as soon as possible after diagnosis", "STRONG", ["AHA ICH 2022: COR 1, LOE C-LD"]],
      ["Warfarin, INR ≥2.0", "4F-PCC (INR-banded) in preference to FFP, then IV vitamin K right after", "STRONG", ["AHA ICH 2022: PCC COR 1, LOE B-R; vitamin K COR 1, LOE C-LD"]],
      ["Warfarin, INR 1.3–1.9", "PCC may be reasonable", "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"]],
      ["Apixaban, rivaroxaban or edoxaban", "4F-PCC 50 U/kg (local pathway); andexanet is not stocked", "WEAK", ["AHA ICH 2022: 4F-PCC/aPCC COR 2b, LOE B-NR; andexanet COR 2a, LOE B-NR"]],
      ["Dabigatran", "Idarucizumab is not stocked — 4F-PCC (or aPCC) 50 U/kg and consider dialysis; call pharmacy about idarucizumab or transfer", "WEAK", ["AHA ICH 2022: idarucizumab COR 2a, LOE B-NR; PCC and RRT COR 2b, LOE C-LD"]],
      ["DOAC taken within the previous few hours", "Activated charcoal may be reasonable if the airway is protected", "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"]],
      ["IV or SC unfractionated heparin", "Protamine 1 mg per 100 U given in the prior 2–3 h, max 50 mg", "MODERATE", ["AHA ICH 2022: COR 2a, LOE C-LD"]],
      ["Enoxaparin", "Protamine (partial reversal only)", "WEAK", ["AHA ICH 2022: COR 2b"]],
      ["After IVT", "See sich-after-thrombolysis", "NOT_GRADED", []]
    ),
    options: [],
    contraindications: [],
    esoDiffers: [],
    institutionVaries: ["Who releases PCC (pharmacy vs blood bank) and the time-to-dose target", "Idarucizumab transfer/borrow pathway"],
    pearls: ["PT/INR don't reflect factor Xa reversal after PCC — don't titrate to them (edoxaban label)"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:four-factor-pcc", "vascular-antithrombotics:vitamin-k", "vascular-antithrombotics:protamine", "vascular-antithrombotics:sich-after-thrombolysis", "vascular-antithrombotics:apixaban", "vascular-antithrombotics:dabigatran"],
    sources: [S.ich2022, S.ncs2016],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "antiplatelet-ich",
    title: "Antiplatelet-associated ICH: platelets and desmopressin",
    searchTerms: ["platelet transfusion", "PATCH", "DDAVP", "desmopressin", "aspirin ICH", "Plavix ICH"],
    question: "When do platelet transfusion or desmopressin help in ICH on antiplatelets?",
    population: ["Spontaneous ICH on aspirin, a P2Y12 inhibitor, or another antiplatelet"],
    rules: rules(
      ["All", "Stop antiplatelet agents", "CONSENSUS", ["NCS 2016: good practice statement"]],
      ["Aspirin, no emergency surgery planned", "Do not transfuse platelets — potentially harmful", "STRONG", ["AHA ICH 2022: COR 3: Harm, LOE B-R"]],
      ["Any antiplatelet, no neurosurgery planned", "Don't transfuse, regardless of agent, platelet-function result, volume or exam", "WEAK", ["NCS 2016: conditional, low quality"]],
      ["Aspirin or ADP inhibitor, emergency neurosurgery", "Platelet transfusion (1 apheresis unit) might be considered; test platelet function first if available", "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD (aspirin)", "NCS 2016: conditional, moderate; platelet-function testing strong, moderate"]],
      ["Platelet function normal or documented antiplatelet resistance", "Don't transfuse", "STRONG", ["NCS 2016: strong, moderate quality"]],
      ["NSAID or GP IIb/IIIa inhibitor", "Don't transfuse, even with neurosurgery", "WEAK", ["NCS 2016: conditional, very low quality"]],
      ["Ticagrelor", "Platelet transfusion is unlikely to help — circulating drug blocks transfused platelets", "NOT_GRADED", ["Ticagrelor label §10"]],
      ["Considering desmopressin", "Desmopressin 0.4 mcg/kg IV once may be considered; effectiveness uncertain", "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD", "NCS 2016: suggestion (conditional)"]]
    ),
    options: [
      tx("ADJUNCT", "Desmopressin", ["IV"], "0.4 mcg/kg IV once", [perKg("Desmopressin", 0.4, 0.4, "MCG", "SINGLE")], ["Check sodium afterward"], "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"], "AVAILABLE")
    ],
    contraindications: [],
    esoDiffers: [],
    institutionVaries: ["Platelet-function assay availability (e.g., VerifyNow) and neurosurgery transfusion protocol"],
    pearls: [],
    verify: [],
    relatedIds: ["vascular-antithrombotics:aspirin", "vascular-antithrombotics:clopidogrel", "vascular-antithrombotics:ticagrelor"],
    sources: [S.ich2022, S.ncs2016, S.ticagrelor],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "restart-antithrombotic-after-ich",
    title: "Restarting antithrombotics after ICH",
    searchTerms: ["restart anticoagulation ICH", "RESTART", "LAAO", "Watchman", "resume aspirin after ICH"],
    question: "Whether and when to resume antiplatelets or anticoagulants after spontaneous ICH",
    population: ["Survivors of spontaneous ICH with a prior antithrombotic indication"],
    rules: rules(
      ["High thromboembolic risk (mechanical valve, LVAD)", "Early resumption of anticoagulation is reasonable", "MODERATE", ["AHA ICH 2022: COR 2a, LOE C-LD"]],
      ["Antiplatelet indication", "Resuming antiplatelet therapy may be reasonable, weighing benefit and risk", "WEAK", ["AHA ICH 2022: COR 2b, LOE B-R (RESTART)"]],
      ["Nonvalvular AF", "Resuming anticoagulation may be considered to prevent thromboembolism and reduce mortality", "WEAK", ["AHA ICH 2022: COR 2b, LOE B-NR"]],
      ["Nonvalvular AF, decision made to restart", "Start about 7–8 weeks after ICH, adjusted to the patient", "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"]],
      ["Nonvalvular AF, judged ineligible for anticoagulation", "Left atrial appendage closure may be considered", "WEAK", ["AHA ICH 2022: COR 2b, LOE C-LD"]]
    ),
    options: [],
    contraindications: [],
    esoDiffers: [],
    institutionVaries: ["Heart-team pathway for LAA closure"],
    pearls: ["Recurrence risk is higher after lobar ICH and with more lobar microbleeds (AHA ICH 2022 prognosis text) — weigh in the decision"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:af-stroke-anticoag-timing"],
    sources: [S.ich2022],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "vte-prophylaxis-stroke-ich",
    title: "VTE prophylaxis in ischemic stroke and ICH",
    searchTerms: ["DVT prophylaxis", "VTE prophylaxis", "SCDs", "IPC", "heparin SQ", "Lovenox prophylaxis", "CLOTS"],
    question: "What VTE prophylaxis, and when, for immobile stroke and ICH patients?",
    population: ["Ischemic stroke with impaired mobility", "Spontaneous ICH, nonambulatory"],
    rules: rules(
      ["AIS, impaired mobility, no IPC contraindication", "IPC in addition to routine care", "STRONG", ["AHA 2026: COR 1, LOE B-R"]],
      ["AIS, impaired mobility", "Prophylactic SC UFH or LMWH is reasonable; LMWH vs UFH difference uncertain; survival benefit not established", "MODERATE", ["AHA 2026: COR 2a, LOE B-R; LMWH vs UFH COR 2b, LOE B-R; survival COR 2b, LOE A"]],
      ["AIS after IVT", "No anticoagulant (including prophylactic heparin) until 24-h imaging", "STRONG", ["AHA 2026 Table 7"]],
      ["AIS", "No elastic compression stockings — skin breakdown, ulceration, necrosis", "STRONG", ["AHA 2026: COR 3: Harm, LOE B-R"]],
      ["ICH, nonambulatory", "IPC starting on the day of diagnosis", "STRONG", ["AHA ICH 2022: COR 1, LOE B-R"]],
      ["ICH, nonambulatory", "Low-dose UFH or LMWH can be useful to reduce PE; starting at 24–48 h from onset may be reasonable", "MODERATE", ["AHA ICH 2022: COR 2a, LOE C-LD (use); COR 2b, LOE C-LD (24–48 h timing)"]],
      ["ICH", "Graduated compression stockings alone don't help", "STRONG", ["AHA ICH 2022: COR 3: No Benefit, LOE B-R"]],
      ["ICH with proximal DVT, not yet an anticoagulation candidate", "Temporary retrievable IVC filter as a bridge is reasonable", "MODERATE", ["AHA ICH 2022: COR 2a, LOE C-LD"]]
    ),
    options: [
      tx("FIRST_LINE", "UFH prophylaxis", ["SC"], "5,000 U SC every 8–12 h", [fixed("UFH", 5000, "UNITS", "PER_DOSE", ["q8–12h"])], ["Preferred if CrCl <30"], "MODERATE", ["AHA 2026: COR 2a, LOE B-R"], "AVAILABLE"),
      tx("FIRST_LINE", "Enoxaparin prophylaxis", ["SC"], "40 mg SC daily; CrCl <30: 30 mg daily", [fixed("CrCl ≥30", 40, "MG", "PER_DAY", ["Daily"]), fixed("CrCl <30", 30, "MG", "PER_DAY", ["Daily"])], [], "MODERATE", ["AHA 2026: COR 2a, LOE B-R"], "AVAILABLE", ["cockcroft-gault"])
    ],
    contraindications: ["IPC: acute DVT in the limb, severe peripheral arterial disease, leg skin lesions (VERIFY)"],
    esoDiffers: [],
    institutionVaries: ["Default chemoprophylaxis start time after ICH (often stable repeat CT at 24 h)", "LP/EVD timing with prophylaxis — see periprocedural-holds-lp-evd"],
    pearls: ["Start IPC at admission; chemoprophylaxis is added, not substituted"],
    verify: ["IPC contraindication list is general practice (CLOTS 3 exclusions), not in the stored guideline text — confirm or drop"],
    relatedIds: ["vascular-antithrombotics:heparin-ufh", "vascular-antithrombotics:enoxaparin", "vascular-antithrombotics:antithrombotic-after-reperfusion"],
    sources: [S.aha2026, S.ich2022],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "cvt-anticoagulation",
    title: "Cerebral venous thrombosis: anticoagulation",
    searchTerms: ["CVT", "CVST", "venous sinus thrombosis", "cerebral venous thrombosis", "VITT"],
    question: "How is CVT anticoagulated, for how long, and when to escalate?",
    population: ["Confirmed cerebral venous thrombosis in adults"],
    rules: rules(
      ["Confirmed CVT", "Parenteral heparin first; LMWH favored over UFH", "NOT_GRADED", ["AHA scientific statement 2024 (ungraded)"]],
      ["Venous (hemorrhagic) infarct or ICH at presentation", "Not a contraindication — anticoagulate", "NOT_GRADED", ["Saposnik 2024"]],
      ["After the acute phase", "VKA (INR 2.0–3.0) for 3–12 months depending on cause; indefinitely with thrombophilia or recurrent VTE", "NOT_GRADED", ["Saposnik 2024"]],
      ["Considering a DOAC instead of VKA", "DOACs appear safe and effective (RE-SPECT CVT: dabigatran after 5–15 days of parenteral lead-in); avoid in pregnancy, breastfeeding and antiphospholipid syndrome", "NOT_GRADED", ["Saposnik 2024"]],
      ["CVT during pregnancy", "Full-dose LMWH throughout pregnancy, then LMWH or VKA ≥6 weeks postpartum (total ≥3 months)", "NOT_GRADED", ["Saposnik 2024"]],
      ["Deciding duration from repeat imaging", "Using recanalization on CTV/MRV to set duration remains uncertain", "NOT_GRADED", ["Saposnik 2024"]],
      ["Thrombus propagation, deterioration despite medical therapy, or contraindication to anticoagulation", "Consider endovascular therapy (no controlled studies; poorer outcomes in meta-analyses)", "NOT_GRADED", ["Saposnik 2024"]],
      ["Clinical signs of herniation", "Decompressive surgery — lifesaving and may improve function", "NOT_GRADED", ["Saposnik 2024"]],
      ["Suspected VITT (after adenovirus-vector vaccine, thrombocytopenia)", "Send PF4 antibodies; avoid all heparin; IVIG 1 g/kg daily × 2 days; steroids; no platelet transfusion; argatroban or fondaparinux, then DOAC after platelet recovery", "NOT_GRADED", ["Saposnik 2024"]]
    ),
    options: [
      tx("FIRST_LINE", "Enoxaparin (treatment dose)", ["SC"], "1 mg/kg SC q12h (CrCl <30: 1 mg/kg daily)", [perKg("Enoxaparin", 1, 1, "MG", "PER_DOSE", ["q12h"])], ["UFH if procedure or surgery likely"], "NOT_GRADED", ["Saposnik 2024: LMWH favored"], "AVAILABLE", ["cockcroft-gault"])
    ],
    contraindications: [],
    esoDiffers: [],
    institutionVaries: ["Neuro-IR thresholds for venous thrombectomy"],
    pearls: ["Hemorrhage is present in up to 40% of CVT (Saposnik 2024)", "Saposnik 2024 is an ungraded scientific statement; the ESO 2017 CVT guideline (graded) is not stored"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:enoxaparin", "vascular-antithrombotics:heparin-ufh", "vascular-antithrombotics:warfarin", "vascular-antithrombotics:dabigatran"],
    sources: [S.cvt2024],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "periprocedural-holds-lp-evd",
    title: "Holds before LP, lumbar drain or EVD",
    searchTerms: ["LP", "lumbar puncture", "spinal tap", "EVD", "lumbar drain", "ASRA", "neuraxial", "hold anticoagulation"],
    question: "How long to hold each antithrombotic before a lumbar puncture or drain, and when to restart?",
    population: ["Adults needing LP or lumbar drain on antithrombotics", "Intervals are ASRA neuraxial-anesthesia guidance, applied to diagnostic LP by extrapolation"],
    rules: rules(
      ["Aspirin or NSAIDs alone", "No timing restriction", "STRONG", ["ASRA 2025: grade IC"]],
      ["Clopidogrel / prasugrel", "Stop 5–7 days (clopidogrel) or 7–10 days (prasugrel) before; resume right after unless loading — then wait 6 h", "WEAK", ["ASRA 2025: grade IIC"]],
      ["Ticagrelor", "Stop 5 days before; resume right after unless loading — then wait 6 h", "WEAK", ["ASRA 2025: grade 2C"]],
      ["Cilostazol", "Stop 2 days before; first dose 6 h after catheter removal", "WEAK", ["ASRA 2025: grade IIC"]],
      ["GP IIb/IIIa inhibitor", "Wait for platelet recovery: eptifibatide/tirofiban 4–8 h, abciximab 24–48 h", "STRONG", ["ASRA 2025: grade IC"]],
      ["Warfarin", "Stop 5 days before and confirm normal INR", "STRONG", ["ASRA 2025: grade IB"]],
      ["IV heparin", "Stop ≥4–6 h and confirm normal coagulation; restart ≥1 h after the puncture", "STRONG", ["ASRA 2025: grade IA"]],
      ["SC heparin 5,000 U BID/TID", "≥4–6 h after the dose, or normal coagulation", "WEAK", ["ASRA 2025: grade IIC"]],
      ["SC heparin 7,500–10,000 U BID (≤20,000 U/day) / higher", "≥12 h / ≥24 h after the dose, with normal coagulation", "WEAK", ["ASRA 2025: grade IIC"]],
      ["Enoxaparin prophylactic / therapeutic", "≥12 h / ≥24 h after the last dose; first prophylactic dose ≥12 h after puncture, therapeutic ≥24 h after; ≥4 h after catheter removal", "STRONG", ["ASRA 2025: grade IC"]],
      ["Apixaban, rivaroxaban or edoxaban at treatment/AF doses (including reduced AF doses)", "Stop ≥72 h before — or level <30 ng/mL or anti-Xa ≤0.1 IU/mL if <72 h; first dose ≥24 h after", "WEAK", ["ASRA 2025: grade IIC"]],
      ["Prophylactic apixaban 2.5 mg BID / rivaroxaban 10 mg daily", "Stop ≥36 h (apixaban) or ≥24 h (rivaroxaban; 30 h if CrCl <30); first dose ≥6 h after", "WEAK", ["ASRA 2025: grade IIC"]],
      ["Dabigatran at treatment/AF doses", "Stop ≥72 h (CrCl ≥50) or 120 h (CrCl 30–49); CrCl <30 only if level <30 ng/mL; first dose ≥24 h after", "WEAK", ["ASRA 2025: grade IIC"]],
      ["Thrombolytic within 48 h", "No neuraxial puncture for ≥48 h; confirm normal clotting studies including fibrinogen", "STRONG", ["ASRA 2025: grade IA"]],
      ["EVD or ICP monitor placement", "Not covered by ASRA — follow the neurosurgery protocol", "NOT_GRADED", []]
    ),
    options: [],
    contraindications: [],
    esoDiffers: [],
    institutionVaries: ["Local LP/IR-procedure hold policy may differ from ASRA", "EVD/ICP monitor antithrombotic protocol (neurosurgery)", ASRA_MAP],
    pearls: [
      "Before IVT, ask about LP or epidural in the prior days; if a puncture was near the time of thrombolysis, neuro checks every 2 h for ≥48 h (ASRA, grade IA)",
      "Traumatic/bloody tap: no data mandating cancellation — individual risk-benefit (ASRA, UFH section); labels delay the next apixaban dose 48 h and rivaroxaban 24 h",
      "On UFH or LMWH >4 days: check platelets before the puncture (HIT) (ASRA, grade IC)"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:apixaban", "vascular-antithrombotics:rivaroxaban", "vascular-antithrombotics:edoxaban", "vascular-antithrombotics:dabigatran", "vascular-antithrombotics:warfarin", "vascular-antithrombotics:heparin-ufh", "vascular-antithrombotics:enoxaparin", "vascular-antithrombotics:clopidogrel", "vascular-antithrombotics:ticagrelor"],
    sources: [S.asra2025],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);

// --- Point agent LP lines at the new entry ---
const OLD_LP = "LP/neuraxial interruption intervals: follow local ASRA-based policy; label intervals are for surgery";
for (const e of d.entries) {
  if (e.kind !== "AGENT") continue;
  if (e.institutionVaries.includes(OLD_LP)) {
    e.institutionVaries = e.institutionVaries.map((x) => (x === OLD_LP ? "LP/neuraxial holds: see periprocedural-holds-lp-evd (ASRA 2025); label intervals are for surgery" : x));
    if (!e.relatedIds.includes("vascular-antithrombotics:periprocedural-holds-lp-evd")) e.relatedIds.push("vascular-antithrombotics:periprocedural-holds-lp-evd");
  }
}

// --- Dissection: replace unsourced lines with ESO 2021 ---
const c = d.entries.find((e) => e.id === "cervical-artery-dissection");
c.rules = rules(
  ["All extracranial dissection with stroke/TIA", "Antithrombotic therapy for at least 3 months", "STRONG", ["Kleindorfer 2021: COR 1, LOE C-EO"]],
  ["Choosing the agent, extracranial dissection", "Either antiplatelet or anticoagulant", "STRONG", ["AHA 2026: COR 2a, LOE B-R", "Kleindorfer 2021: aspirin or warfarin, COR 2a, LOE B-R", "ESO 2021: strong, moderate quality"]],
  ["Extracranial dissection with TIA or minor stroke", "Aspirin + clopidogrel for a few weeks is reasonable", "CONSENSUS", ["ESO 2021 expert consensus (all but one expert)"]],
  ["Anticoagulation chosen", "A DOAC can replace a VKA", "CONSENSUS", ["ESO 2021 expert consensus (all but three experts)"]],
  ["Intracranial dissection with ischemia, no SAH", "Antiplatelet preferred over anticoagulant", "CONSENSUS", ["ESO 2021 expert consensus (all but one expert)"]],
  ["Intracranial dissection with SAH", "Early surgical or endovascular treatment (multidisciplinary); antithrombotics generally withheld", "WEAK", ["ESO 2021: weak, very low quality (intervention); withholding antithrombotics from supportive text"]],
  ["Extracranial dissection, AIS within 4.5 h, otherwise eligible", "IVT (ESO: alteplase) if standard criteria are met", "WEAK", ["ESO 2021: weak, low quality"]],
  ["Recurrent events despite antithrombotic therapy", "Endovascular therapy may be considered (multidisciplinary)", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD", "ESO 2021: no routine post-acute stenting (consensus)"]]
);
c.contraindications = ["Intracranial dissection with SAH: antithrombotics generally withheld (ESO 2021)"];
c.pearls = c.pearls.filter((p) => !p.startsWith("Large infarct, intracranial extension"));
c.pearls.push("Intracranial dissection with ischemia: if imaging can't exclude minor SAH, LP before antithrombotics is an option (ESO 2021)");
c.esoDiffers = [
  "ESO grades 'either agent' as strong (moderate quality) vs AHA COR 2a",
  "ESO adds consensus: short DAPT for TIA/minor stroke, DOAC acceptable, antiplatelet preferred in intracranial dissection",
  "ESO covers intracranial dissection; AHA/Kleindorfer address extracranial only"
];
c.verify = [];
if (!c.sources.includes(S.eso2021)) c.sources.push(S.eso2021);

d.version = "0.5.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
