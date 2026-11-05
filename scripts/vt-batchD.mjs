// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: vascular-antithrombotics batch D (ischemic decision entries) + aspirin/tirofiban VERIFY fixes
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
  elan: "Fischer U, et al. Early versus Later Anticoagulation for Stroke with Atrial Fibrillation (ELAN). N Engl J Med 2023;388:2411-2421. doi:10.1056/NEJMoa2303048",
  optimas: "Werring DJ, et al. Optimal timing of anticoagulation after acute ischaemic stroke with atrial fibrillation (OPTIMAS): a multicentre, blinded-endpoint, phase 4, randomised controlled trial. Lancet 2024;404:1731-1741. doi:10.1016/S0140-6736(24)02197-4",
  fdaIbu: "US Food and Drug Administration. Science paper: Concomitant use of ibuprofen and aspirin — potential for attenuation of the anti-platelet effect of aspirin. 9/8/2006 (user-supplied)",
  aggrastat: "Aggrastat (tirofiban) US prescribing information. Medicure; revised 1/2025 (user-supplied label)"
};

const CLOP_LOAD = fixed("Clopidogrel load", 300, "MG", "SINGLE", [], [], [], 600);
const CLOP_MAINT = fixed("Clopidogrel", 75, "MG", "PER_DAY", ["Daily"]);
const ASA_LOAD = fixed("Aspirin load", 160, "MG", "SINGLE", [], [], [], 325);
const ASA_MAINT = fixed("Aspirin", 75, "MG", "PER_DAY", ["Daily"], [], [], 100);
const TICA_LOAD = fixed("Ticagrelor load", 180, "MG", "SINGLE");
const TICA_MAINT = fixed("Ticagrelor", 90, "MG", "PER_DOSE", ["BID"]);
const AGENT_DOSES = "Agent details, interactions and holds: see the agent entries";

const entries = [
  {
    kind: "DECISION",
    id: "dapt-minor-stroke-tia",
    title: "DAPT for minor stroke and high-risk TIA",
    searchTerms: ["DAPT", "dual antiplatelet", "CHANCE", "POINT", "THALES", "INSPIRES", "CHANCE-2", "minor stroke", "TIA"],
    question: "Who gets short-term DAPT after minor stroke or TIA, with which regimen, and for how long?",
    population: ["Noncardioembolic minor ischemic stroke or high-risk TIA", "Did not receive IVT (all DAPT trials excluded IVT)"],
    rules: rules(
      ["NIHSS ≤3 or ABCD2 ≥4, within 24 h of onset", "Clopidogrel (with load) + aspirin, start within 24 h, 21 days, then SAPT", "STRONG",
        ["AHA 2026: COR 1, LOE A", "Kleindorfer 2021: COR 1, LOE A — ideally within 12–24 h, at least within 7 days; 21–90 days"]],
      ["NIHSS ≤5 or ABCD2 ≥4 at 24–72 h, or NIHSS 4–5 within 24 h, with presumed atherosclerotic cause (≥50% stenosis likely causative, or new infarcts of presumed large-artery origin)", "Clopidogrel + aspirin × 21 days, then SAPT (INSPIRES)", "MODERATE",
        ["AHA 2026: COR 2a, LOE B-R"]],
      ["NIHSS ≤3 or ABCD2 ≥4, within 24 h, known CYP2C19 loss-of-function carrier", "Ticagrelor + aspirin × 21 days, then ticagrelor alone, in preference to clopidogrel-based DAPT (CHANCE-2)", "WEAK",
        ["AHA 2026: COR 2b, LOE B-R"]],
      ["NIHSS ≤5, ABCD2 ≥6, or symptomatic ≥50% intracranial/extracranial stenosis, within 24 h", "Ticagrelor + aspirin × 30 days may be considered (THALES) — more severe bleeding including ICH", "WEAK",
        ["AHA 2026: COR 2b, LOE B-R", "Kleindorfer 2021: COR 2b, LOE B-R (stenosis ≥30%)"]],
      ["Any regimen beyond 90 days, or adding a third antiplatelet", "Don't — excess hemorrhage without added benefit", "STRONG",
        ["Kleindorfer 2021: COR 3: Harm, LOE A (DAPT >90 days or triple therapy)", "AHA 2026: triple antiplatelet COR 3: Harm, LOE B-R"]],
      ["Received IVT in the past 24 h", "DAPT not studied after IVT; any antiplatelet in the first 24 h only with a compelling indication — usually after 24-h imaging", "WEAK",
        ["AHA 2026: COR 2b, LOE B-NR (antiplatelets within 24 h of IVT)"]],
      ["Already on aspirin at the time of the event", "Raising the dose or switching agents is of unclear benefit; DAPT criteria above still apply", "WEAK",
        ["AHA 2026: COR 2b, LOE B-NR"]]
    ),
    options: [
      tx("FIRST_LINE", "Clopidogrel + aspirin", ["PO"], "Clopidogrel 300–600 mg load, then 75 mg daily; aspirin 160–325 mg load, then 75–100 mg daily",
        [CLOP_LOAD, CLOP_MAINT, ASA_LOAD, ASA_MAINT], ["CHANCE: 300 mg load, 21 days; POINT: 600 mg load, 90 days", AGENT_DOSES], "STRONG", ["AHA 2026: COR 1, LOE A"], "AVAILABLE"),
      tx("ALTERNATIVE", "Ticagrelor + aspirin", ["PO"], "Ticagrelor 180 mg load, then 90 mg BID; aspirin 300–325 mg load (THALES) or 75–300 mg (CHANCE-2), then 75–100 mg daily",
        [TICA_LOAD, TICA_MAINT, ASA_LOAD, ASA_MAINT], ["Keep aspirin ≤100 mg/day with ticagrelor", "Contraindicated with prior ICH", AGENT_DOSES], "WEAK", ["AHA 2026: COR 2b, LOE B-R"], "INSTITUTION_VARIES")
    ],
    contraindications: ["Cardioembolic source needing anticoagulation", "IVT within 24 h (see rule 6)", "Prior ICH (ticagrelor)", "NIHSS >5 — outside trial populations"],
    esoDiffers: [],
    institutionVaries: ["CYP2C19 genotype testing availability and turnaround", "Ticagrelor formulary restriction"],
    pearls: [
      "Trial NNTs (AHA 2026 Table 9): CHANCE 28, INSPIRES 53, CHANCE-2 63, POINT 67, THALES 91; POINT, THALES, CHANCE-2 and INSPIRES had slightly more bleeding",
      "In a large Italian registry only 7.8% of DAPT-treated patients met trial criteria (AHA 2026 knowledge gaps) — out-of-criteria use is untested"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:clopidogrel", "vascular-antithrombotics:aspirin", "vascular-antithrombotics:ticagrelor"],
    sources: [S.aha2026, S.sec2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "icad-symptomatic",
    title: "Symptomatic intracranial atherosclerotic stenosis (ICAD)",
    searchTerms: ["ICAD", "ICAS", "intracranial stenosis", "SAMMPRIS", "WASID", "intracranial atherosclerosis"],
    question: "What antithrombotic and procedural management fits stroke or TIA from 50–99% intracranial stenosis?",
    population: ["Stroke or TIA attributed to 50–99% stenosis of a major intracranial artery"],
    rules: rules(
      ["Any symptomatic 50–99% stenosis", "Aspirin 325 mg/day rather than warfarin", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-R (WASID)"]],
      ["Severe 70–99% stenosis, event within 30 days", "Add clopidogrel 75 mg/day to aspirin for up to 90 days", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-NR"]],
      ["Minor stroke or high-risk TIA within 24 h with ipsilateral >30% intracranial stenosis", "Ticagrelor 90 mg BID added to aspirin for up to 30 days might be considered", "WEAK", ["Kleindorfer 2021: COR 2b, LOE B-NR"]],
      ["Presumed atherosclerotic minor stroke/TIA at 24–72 h", "Clopidogrel + aspirin × 21 days (INSPIRES) — see dapt-minor-stroke-tia", "MODERATE", ["AHA 2026: COR 2a, LOE B-R"]],
      ["Wanting another add-on agent", "Cilostazol 200 mg/day added to aspirin or clopidogrel might be considered", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"]],
      ["Considering clopidogrel alone, aspirin/dipyridamole, ticagrelor alone or cilostazol alone", "Usefulness not well established", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-EO"]],
      ["All patients", "SBP <140 mm Hg, high-intensity statin, at least moderate physical activity", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-NR"]],
      ["Severe 70–99% stenosis as initial treatment, even if on an antithrombotic at the time", "Do not angioplasty or stent", "STRONG", ["Kleindorfer 2021: COR 3: Harm, LOE A"]],
      ["Moderate 50–69% stenosis", "Do not angioplasty or stent — excess morbidity and mortality", "STRONG", ["Kleindorfer 2021: COR 3: Harm, LOE B-NR"]],
      ["Progressing symptoms or recurrence despite DAPT, SBP <140 and high-intensity statin (medical failure)", "Usefulness of angioplasty or stenting is unknown — neuro-IR discussion", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"]],
      ["50–99% stenosis or occlusion", "EC-IC bypass not recommended", "STRONG", ["Kleindorfer 2021: COR 3: No Benefit, LOE B-R"]]
    ),
    options: [
      tx("FIRST_LINE", "Aspirin + clopidogrel (70–99%, ≤30 days)", ["PO"], "Aspirin 325 mg daily + clopidogrel 75 mg daily up to 90 days, then aspirin alone",
        [fixed("Aspirin", 325, "MG", "PER_DAY", ["Daily"]), CLOP_MAINT], ["Load clopidogrel if within the acute DAPT window", AGENT_DOSES], "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-NR"], "AVAILABLE")
    ],
    contraindications: [],
    esoDiffers: [],
    institutionVaries: ["Neuro-IR thresholds for rescue angioplasty/stenting in medical failures"],
    pearls: ["Warfarin vs aspirin (WASID): more major hemorrhage and death without fewer strokes"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:dapt-minor-stroke-tia", "vascular-antithrombotics:cilostazol", "vascular-antithrombotics:ticagrelor"],
    sources: [S.sec2021, S.aha2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "af-stroke-anticoag-timing",
    title: "When to start anticoagulation after stroke with AF",
    searchTerms: ["ELAN", "OPTIMAS", "TIMING", "AF", "atrial fibrillation", "DOAC timing", "1-3-6-12"],
    question: "How soon after ischemic stroke or TIA should an oral anticoagulant start in AF?",
    population: ["Ischemic stroke or TIA with AF selected for oral anticoagulation", "Excludes mechanical valves and moderate–severe mitral stenosis (warfarin; see mechanical-valve entry, pending)"],
    rules: rules(
      ["TIA (no infarct) with nonvalvular AF", "Start anticoagulation immediately", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE C-EO"]],
      ["Minor or moderate infarct (ELAN imaging size), carefully selected", "Start a DOAC early — within 48 h (ELAN) or ≤4 days (OPTIMAS); low risk and reasonable vs delayed start", "MODERATE",
        ["AHA 2026: COR 2a, LOE A", "Efficacy for preventing early recurrence not established"]],
      ["Major infarct (ELAN imaging size)", "ELAN early arm started on day 6–7 (later arm day 12–14); OPTIMAS early arm ≤4 days at any severity", "MODERATE",
        ["AHA 2026: COR 2a, LOE A covers 'carefully selected' patients", "Trial protocols — individualize for very large infarcts"]],
      ["Hemorrhagic transformation on imaging", "Starting or continuing anticoagulation may be considered depending on the scenario and indication", "WEAK", ["AHA 2026: COR 2b, LOE C-LD"]],
      ["Judged at high risk of hemorrhagic conversion", "Delaying beyond 14 days is reasonable (pre-ELAN/OPTIMAS recommendation)", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-NR"]],
      ["Bridging with heparin/LMWH or parenteral anticoagulation within 48 h to prevent early worsening", "Not recommended", "STRONG", ["AHA 2026: COR 3: No Benefit, LOE A"]],
      ["No active CAD or recent stent", "Don't routinely add an antiplatelet to the anticoagulant", "STRONG", ["AHA 2026: COR 3: Harm, LOE B-NR"]],
      ["Choosing the agent", "DOAC over warfarin unless moderate–severe mitral stenosis or mechanical valve; warfarin or apixaban in ESRD/dialysis", "STRONG", ["Kleindorfer 2021: COR 1, LOE B-R (DOAC preference); ESRD COR 2b, LOE B-NR"]],
      ["Before starting", "CT or MRI may be considered to assess hemorrhagic transformation and final infarct size", "WEAK", ["Kleindorfer 2021: COR 2b, LOE B-NR"]]
    ),
    options: [],
    contraindications: ["Active ICH or symptomatic hemorrhagic transformation with mass effect"],
    esoDiffers: [],
    institutionVaries: ["Who sizes the infarct (team vs radiology) and default start day by size"],
    pearls: [
      "ELAN size: minor ≤1.5 cm; moderate = cortical superficial branch of MCA/ACA/PCA; major = larger infarct in those territories, or brainstem/cerebellar >1.5 cm",
      "ELAN (n=2013): 30-day composite 2.9% early vs 4.1% later (RD −1.18 points, 95% CI −2.84 to 0.47); sICH 0.2% in both; prior IVT/EVT allowed",
      "OPTIMAS (n=3648): early ≤4 days vs delayed 7–14 days; 90-day composite 3.3% vs 3.3% — noninferior; sICH 0.6% early",
      "TIMING: early ≤4 days vs 5–10 days, primary outcome 6.9% vs 8.7% — noninferior (AHA 2026)",
      "The '1-3-6-12 day' rule predates these trials"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:apixaban", "vascular-antithrombotics:rivaroxaban", "vascular-antithrombotics:edoxaban", "vascular-antithrombotics:dabigatran", "vascular-antithrombotics:warfarin"],
    sources: [S.aha2026, S.sec2021, S.elan, S.optimas],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "esus-antithrombotic",
    title: "ESUS / cryptogenic stroke: antithrombotic and PFO",
    searchTerms: ["ESUS", "cryptogenic", "NAVIGATE ESUS", "RESPECT ESUS", "PFO", "patent foramen ovale", "loop recorder"],
    question: "What antithrombotic and workup decisions follow stroke of undetermined source?",
    population: ["Nonlacunar stroke without a cause after standard workup (ESUS / cryptogenic)"],
    rules: rules(
      ["No AF or other anticoagulation indication found", "Antiplatelet therapy, not empiric anticoagulation (NAVIGATE ESUS and RESPECT ESUS showed no DOAC benefit)", "STRONG",
        ["Kleindorfer 2021 and AHA 2026: COR 1, LOE A (antiplatelet over OAC in noncardioembolic stroke)"]],
      ["Minor stroke or high-risk TIA within the DAPT window", "Short-term DAPT per dapt-minor-stroke-tia", "STRONG", ["AHA 2026: COR 1, LOE A"]],
      ["Cryptogenic stroke without contraindication to anticoagulation", "Long-term rhythm monitoring (mobile outpatient telemetry, implantable loop recorder) to find intermittent AF", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-R"]],
      ["ESUS — looking for cardioaortic source or shunt", "TEE, cardiac CT or cardiac MRI might be reasonable", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"]],
      ["Age 18–60, nonlacunar stroke of undetermined cause, PFO with high-risk anatomic features", "PFO closure + long-term antiplatelet over antiplatelet alone", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE B-R"]],
      ["Age 18–60, PFO without high-risk features", "Benefit of closure not well established", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"]],
      ["Closure vs warfarin", "Comparative benefit unknown", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"]],
      ["AF later detected", "Switch to oral anticoagulation — see af-stroke-anticoag-timing", "STRONG", ["Kleindorfer 2021: COR 1, LOE A (OAC with AF)"]]
    ),
    options: [],
    contraindications: [],
    esoDiffers: [],
    institutionVaries: ["Loop-recorder referral pathway and PFO-closure heart team"],
    pearls: ["High-risk PFO features vary by trial (larger shunt, atrial septal aneurysm) — RoPE/PASCAL not in the stored sources", "Serious periprocedural complications of closure ~4.9% at ≤60 y vs 10.9% older (claims data, Kleindorfer)"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:dapt-minor-stroke-tia", "vascular-antithrombotics:af-stroke-anticoag-timing"],
    sources: [S.sec2021, S.aha2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "cervical-artery-dissection",
    title: "Cervical artery dissection: antithrombotic choice",
    searchTerms: ["dissection", "CAD", "carotid dissection", "vertebral dissection", "CADISS", "TREATCAD"],
    question: "Antiplatelet or anticoagulant after stroke/TIA from extracranial carotid or vertebral dissection, and for how long?",
    population: ["Ischemic stroke or TIA from extracranial carotid or vertebral dissection"],
    rules: rules(
      ["All", "Antithrombotic therapy for at least 3 months", "STRONG", ["Kleindorfer 2021: COR 1, LOE C-EO"]],
      ["Choosing the agent", "Either antiplatelet or anticoagulant is reasonable", "MODERATE", ["AHA 2026: COR 2a, LOE B-R", "Kleindorfer 2021: aspirin or warfarin, COR 2a, LOE B-R"]],
      ["Recurrent events despite antithrombotic therapy", "Endovascular therapy may be considered", "WEAK", ["Kleindorfer 2021: COR 2b, LOE C-LD"]]
    ),
    options: [],
    contraindications: ["Intracranial extension with SAH — anticoagulation generally avoided (VERIFY)"],
    esoDiffers: [],
    institutionVaries: ["Default choice (antiplatelet vs anticoagulant) and repeat vessel imaging at 3–6 months"],
    pearls: [
      "CADISS: no difference; 1-year recurrent stroke 2.4% overall",
      "IPD meta-analysis (CADISS + TREATCAD, n=444): ischemic stroke 0.5% anticoagulation vs 4.0% antiplatelet (OR 0.14) with nominally more bleeding",
      "Meta-analysis of 11 studies: anticoagulation lower ischemic stroke (RR 0.63) but higher major bleeding (RR 2.25)",
      "Large infarct, intracranial extension or high bleeding risk tilts toward antiplatelet; occlusive or free-floating thrombus or recurrent emboli tilt toward anticoagulation (expert practice, VERIFY)"
    ],
    verify: [
      "Contraindication 'intracranial extension with SAH' and the agent-choice heuristics pearl are expert practice, not in AHA 2026 or Kleindorfer — confirm against ESO 2021 dissection guideline (Debette) if you want them kept"
    ],
    relatedIds: ["vascular-antithrombotics:aspirin", "vascular-antithrombotics:warfarin"],
    sources: [S.aha2026, S.sec2021],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "antithrombotic-after-reperfusion",
    title: "Antithrombotics after IVT or thrombectomy",
    searchTerms: ["post-tPA", "post-TNK", "post-thrombectomy", "24 hour scan", "HT", "hemorrhagic transformation", "stent"],
    question: "When can antiplatelets or anticoagulants start after IVT or EVT?",
    population: ["AIS treated with IVT and/or EVT"],
    rules: rules(
      ["After IVT, routine case", "Hold antiplatelets and anticoagulants until 24-h CT or MRI excludes hemorrhage", "STRONG", ["AHA 2026 Table 7 (post-IVT care)"]],
      ["Compelling indication within 24 h of IVT (e.g., emergent stent, tandem lesion)", "Antiplatelet might be considered", "WEAK", ["AHA 2026: COR 2b, LOE B-NR"]],
      ["IV aspirin with or within 90 min of starting IVT", "Do not give", "STRONG", ["AHA 2026: COR 3: Harm, LOE B-R"]],
      ["Adjunctive IV eptifibatide or argatroban with IVT", "Not recommended", "STRONG", ["AHA 2026: COR 3: No Benefit, LOE B-R (eptifibatide) and LOE A (argatroban)"]],
      ["Tirofiban before EVT", "Not useful", "STRONG", ["AHA 2026: COR 3: No Benefit, LOE B-R"]],
      ["Tandem occlusion needing emergent extracranial stent", "Treating both may be reasonable; peri-stent antiplatelet regimen per neuro-IR", "WEAK", ["AHA 2026: COR 2b, LOE B-NR"]],
      ["Hemorrhagic transformation on follow-up imaging", "Start or continue antithrombotics depending on scenario and indication", "WEAK", ["AHA 2026: COR 2b, LOE C-LD"]],
      ["AF", "Timing per af-stroke-anticoag-timing (ELAN allowed prior IVT/EVT)", "MODERATE", ["AHA 2026: COR 2a, LOE A"]],
      ["Minor stroke treated with IVT", "DAPT trials excluded IVT — no trial-based DAPT; standard antiplatelet after 24-h imaging", "NOT_GRADED", ["AHA 2026 Table 9 trial populations"]]
    ),
    options: [],
    contraindications: ["sICH or parenchymal hematoma with mass effect on 24-h imaging"],
    esoDiffers: [],
    institutionVaries: ["Post-stent antiplatelet protocol (agent, load, IV vs oral, GP IIb/IIIa bridge) — neuro-IR"],
    pearls: ["VTE prophylaxis timing after IVT is separate — see vte-prophylaxis entry (pending)"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:thrombolysis-with-prior-antithrombotics", "vascular-antithrombotics:af-stroke-anticoag-timing", "vascular-antithrombotics:gp-iib-iiia-inhibitors", "vascular-antithrombotics:dapt-minor-stroke-tia"],
    sources: [S.aha2026],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);

// --- VERIFY fixes ---
const a = d.entries.find((e) => e.id === "aspirin");
a.interactions = [
  "Ibuprofen can blunt low-dose aspirin's antiplatelet effect: give ibuprofen 400 mg ≥30 min after immediate-release aspirin or ≥8 h before; enteric-coated aspirin timing not established; occasional use is low risk (FDA 2006)",
  "Ticagrelor: keep aspirin ≤100 mg/day"
];
a.verify = [];
if (!a.sources.includes(S.fdaIbu)) a.sources.push(S.fdaIbu);

const g = d.entries.find((e) => e.id === "gp-iib-iiia-inhibitors");
g.uses.push(tx("SUPPORTIVE", "Tirofiban — label ACS regimen (reference only)", ["IV"], "25 mcg/kg over 5 min, then 0.15 mcg/kg/min up to 18 h; CrCl ≤60: 0.075 mcg/kg/min",
  [perKg("Bolus", 25, 25, "MCG", "SINGLE"), perKg("Infusion", 0.15, 0.15, "MCG", "PER_MIN", ["Continuous"], ["Up to 18 h"]), perKg("Infusion, CrCl ≤60", 0.075, 0.075, "MCG", "PER_MIN", ["Continuous"], ["Up to 18 h"])],
  ["Cardiac dosing — stroke/IR regimens differ and are off-label", "CrCl by Cockcroft-Gault with actual weight (label)"], "NOT_GRADED", ["FDA-labeled regimen"], "INSTITUTION_VARIES", ["cockcroft-gault"]));
g.renalHepatic.push("Tirofiban: CrCl ≤60 → halve infusion; removed by hemodialysis (label)");
g.timing.halfLifeText = "Eptifibatide ~2.5 h; tirofiban ~2 h — platelet aggregation near baseline 4–8 h after stopping in ~90% (labels)";
g.pearls.push("Tirofiban contraindications: prior tirofiban thrombocytopenia, active internal bleeding or bleeding diathesis, major surgery or severe trauma within 1 month, severe hypersensitivity (label)");
g.verify = [];
if (!g.sources.includes(S.aggrastat)) g.sources.push(S.aggrastat);

d.version = "0.4.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
