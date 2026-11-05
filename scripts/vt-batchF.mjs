// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// One-off: vascular-antithrombotics batch F (valves, cancer, pregnancy) + CLOTS 3 IPC fix + agent pregnancy lines
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
  cvt2024: "Saposnik G, et al. Diagnosis and Management of Cerebral Venous Thrombosis: A Scientific Statement From the AHA. Stroke 2024;55:e77-e90. doi:10.1161/STR.0000000000000456",
  vhd2020: "Otto CM, et al. 2020 ACC/AHA Guideline for the Management of Patients With Valvular Heart Disease. Circulation 2021;143:e72-e227. doi:10.1161/CIR.0000000000000923",
  navi2026: "Navi BB, et al. Classification and Management of Ischemic Stroke in Patients With Active Cancer: A Scientific Statement From the AHA. Stroke 2026;57:e160-e173. doi:10.1161/STR.0000000000000517",
  jauregui2026: "Jauregui Larrañaga C, et al. Stroke secondary to cancer-associated coagulopathy: a systematic review. J Neurol 2026;273:609. doi:10.1007/s00415-026-14119-y",
  miller2026: "Miller EC, et al. Prevention and Treatment of Maternal Stroke in Pregnancy and Postpartum: A Scientific Statement From the AHA (endorsed by ACOG). Stroke 2026;57:e127-e145. doi:10.1161/STR.0000000000000514",
  clots3: "CLOTS Trials Collaboration. Effectiveness of intermittent pneumatic compression in reduction of risk of deep vein thrombosis in patients who have had a stroke (CLOTS 3). Lancet 2013. doi:10.1016/S0140-6736(13)61050-8 (protocol exclusion criteria, user-supplied)",
  asra2025: "Kopp SL, et al. Regional anesthesia in the patient receiving antithrombotic or thrombolytic therapy: ASRA Pain Medicine evidence-based guidelines (fifth edition). Reg Anesth Pain Med 2025;0:1-29. doi:10.1136/rapm-2024-105766"
};
const STATEMENT = "AHA scientific statement (ungraded)";

const entries = [
  {
    kind: "DECISION",
    id: "mechanical-valve-stroke",
    title: "Stroke with a prosthetic heart valve",
    searchTerms: ["mechanical valve", "MVR", "AVR", "On-X", "prosthetic valve", "INR goal", "bioprosthetic", "TAVR", "TAVI"],
    question: "What anticoagulation and INR target fit a stroke patient with a prosthetic valve, and what changes after an embolic event?",
    population: ["Ischemic stroke or TIA with a mechanical or bioprosthetic heart valve"],
    rules: rules(
      ["Any mechanical valve", "Warfarin (VKA) is the only option", "STRONG", ["Otto 2020: COR 1, LOE A"]],
      ["Mechanical valve — DOACs", "Dabigatran contraindicated; factor Xa DOACs not assessed and not recommended", "STRONG", ["Otto 2020: COR 3: Harm, LOE B-R (dabigatran) and C-EO (anti-Xa)"]],
      ["Bileaflet or current single-tilting-disk AVR, no thromboembolic risk factors", "INR goal 2.5", "STRONG", ["Otto 2020: COR 1, LOE B-NR"]],
      ["Mechanical AVR with a risk factor (AF, prior thromboembolism, LV dysfunction, hypercoagulable) or older-generation valve; or any mechanical MVR", "INR goal 3.0", "STRONG", ["Otto 2020: COR 1, LOE B-NR"]],
      ["Mechanical AVR with prior stroke/TIA", "INR 3.0 (2.5–3.5) or add aspirin 75–100 mg/day", "MODERATE", ["Kleindorfer 2021: COR 2a, LOE C-EO"]],
      ["Mechanical MVR with stroke/TIA before valve replacement", "Warfarin INR 3.0 (2.5–3.5) plus aspirin 75–100 mg/day", "STRONG", ["Kleindorfer 2021: COR 1, LOE C-LD"]],
      ["New stroke on a mechanical AVR while INR therapeutic", "Raise INR goal from 2.5 to 3.0 (2.5–3.5) or add aspirin 75–100 mg, weighing bleeding", "MODERATE", ["Otto 2020: COR 2a, LOE C-EO"]],
      ["New stroke on a mechanical MVR while INR therapeutic", "Raise INR goal from 3.0 to 4.0 or add aspirin 75–100 mg, weighing bleeding", "MODERATE", ["Otto 2020: COR 2a, LOE C-EO (range printed as 3.5–4.0)"]],
      ["New stroke on a bioprosthetic valve while on antiplatelet therapy", "Switching to warfarin may be considered", "WEAK", ["Otto 2020: COR 2b, LOE C-EO"]],
      ["Bioprosthetic valve, stroke/TIA before replacement, no other anticoagulant indication beyond 3–6 months", "Long-term aspirin rather than anticoagulation", "STRONG", ["Kleindorfer 2021: COR 1, LOE C-EO"]],
      ["AF with a bioprosthetic valve", "Counts as nonvalvular AF — DOAC acceptable", "STRONG", ["Kleindorfer 2021 (definition of valvular AF)"]],
      ["Invasive procedure: bileaflet AVR, no risk factors", "Interrupt warfarin without bridging", "STRONG", ["Otto 2020: COR 1, LOE C-LD"]],
      ["Invasive procedure: AVR with a risk factor, older-generation AVR, or mechanical MVR", "Bridging while INR is subtherapeutic is reasonable, individualized", "MODERATE", ["Otto 2020: COR 2a, LOE C-LD"]],
      ["Emergency surgery or procedure on warfarin", "4F-PCC (or aPCC) is reasonable", "MODERATE", ["Otto 2020: COR 2a, LOE C-LD"]],
      ["Spontaneous ICH with a mechanical valve", "Early resumption of anticoagulation is reasonable", "MODERATE", ["AHA ICH 2022: COR 2a, LOE C-LD"]]
    ),
    options: [],
    contraindications: ["IVT if INR >1.7 (see thrombolysis-with-prior-antithrombotics)"],
    esoDiffers: [],
    institutionVaries: ["Bridging agent (IV UFH vs LMWH) and the cardiology consult pathway"],
    pearls: [
      "After an embolic event: check time in therapeutic range, exclude infective endocarditis, screen for new AF, consider a hypercoagulable state (Otto 2020)",
      "On-X AVR without risk factors: INR 1.5–2.0 plus aspirin may be reasonable from ≥3 months after surgery (Otto 2020: COR 2b, B-R)",
      "Restart timing after acute ischemic stroke with a mechanical valve isn't addressed in these sources — cardiology/neurology joint decision"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:warfarin", "vascular-antithrombotics:four-factor-pcc", "vascular-antithrombotics:restart-antithrombotic-after-ich", "vascular-antithrombotics:thrombolysis-with-prior-antithrombotics"],
    sources: [S.vhd2020, S.sec2021, S.ich2022],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "cancer-associated-stroke",
    title: "Ischemic stroke with active cancer",
    searchTerms: ["cancer stroke", "Trousseau", "NBTE", "marantic endocarditis", "DIC", "cancer-associated coagulopathy", "3-territory sign", "D-dimer"],
    question: "How are acute treatment, workup and antithrombotic choice adjusted for stroke with active cancer?",
    population: ["Ischemic stroke with active cancer (diagnosis or treatment within 6 months, recurrent/advanced/metastatic, or not in remission; excludes basal/squamous skin cancer)"],
    rules: rules(
      ["IVT candidate", "Use standard criteria; check CBC and coagulation studies first; review imaging for metastases", "NOT_GRADED", [STATEMENT]],
      ["Brain metastases on imaging", "Generally defer IVT — high hemorrhage risk", "NOT_GRADED", [STATEMENT]],
      ["LVO", "Consider EVT individually, weighing goals of care and cancer prognosis (more recurrence and death than without cancer)", "NOT_GRADED", [STATEMENT]],
      ["Workup", "Add D-dimer (late in the stay if IVT/EVT given — early values falsely high), blood cultures, bubble echo or TEE, chest CT, prolonged rhythm monitoring", "NOT_GRADED", [STATEMENT]],
      ["Probable cancer-related: NBTE (vegetation, negative cultures), overt DIC (ISTH ≥5), or tumor embolism", "Therapeutic anticoagulation is typical — often UFH/LMWH first (especially DIC), DOAC long term; no trial data, and antiplatelets are arguable for NBTE", "NOT_GRADED", [STATEMENT]],
      ["Possible cancer-related: cryptogenic with spread or progressing cancer plus ≥1 of D-dimer >2,500 ng/mL FEU (no VTE), multiterritory infarcts, bilateral microemboli on TCD, or no susceptibility vessel sign", "Equipoise between anticoagulant and antiplatelet; decide individually", "NOT_GRADED", [STATEMENT, "NAVIGATE-ESUS and ARCADIA cancer subgroups neutral; TEACH and ENCHASE too small for efficacy"]],
      ["Known conventional mechanism", "Treat the mechanism: DOAC for nonvalvular AF; antiplatelet + risk-factor control for small-vessel disease; usually stenting for radiation-induced carotid stenosis", "NOT_GRADED", [STATEMENT]],
      ["All", "Statin for most; revisit goals of care periodically; palliative care alongside cancer therapy", "NOT_GRADED", [STATEMENT]]
    ),
    options: [],
    contraindications: ["Thrombocytopenia and procedure-related bleeding risk — check before anticoagulating"],
    esoDiffers: [],
    institutionVaries: ["Oncology/hematology co-management and D-dimer follow-up schedule"],
    pearls: [
      "1-year recurrent stroke 14–29% — 2–3× the general stroke population (Navi 2026)",
      "Cancer-associated coagulopathy stroke: mostly within 6 months of diagnosis, advanced disease, adenocarcinoma (lung, pancreas); '3-territory sign'; 30-day mortality 25–50%; LMWH and DOACs are the most used strategies (Jauregui 2026 systematic review)",
      "Navi 2026 follows D-dimer every few months to track treatment response"
    ],
    verify: [],
    relatedIds: ["vascular-antithrombotics:esus-antithrombotic", "vascular-antithrombotics:enoxaparin", "vascular-antithrombotics:apixaban"],
    sources: [S.navi2026, S.jauregui2026],
    lastReviewed: "UNREVIEWED"
  },
  {
    kind: "DECISION",
    id: "pregnancy-antithrombotics",
    title: "Stroke and antithrombotics in pregnancy and postpartum",
    searchTerms: ["pregnancy", "postpartum", "maternal stroke", "lactation", "breastfeeding", "pregnant tPA", "LMWH pregnancy"],
    question: "Which acute treatments and antithrombotics are used in pregnancy, postpartum and lactation?",
    population: ["Pregnant or postpartum patients with stroke or a stroke-prevention indication"],
    rules: rules(
      ["AIS in pregnancy or postpartum", "Don't delay standard treatment. IVT when benefit outweighs risk (alteplase and TNK don't cross the placenta; TNK data limited); individualize with planned or recent cesarean or neuraxial anesthesia", "NOT_GRADED", ["Miller 2026 (AHA statement, ACOG-endorsed)"]],
      ["LVO", "EVT as in nonpregnant patients; transradial approach preferred; consider continuous fetal monitoring in third trimester", "NOT_GRADED", ["Miller 2026"]],
      ["Antiplatelet needed", "Aspirin <100 mg daily first choice (safe in lactation; no hold for neuraxial); clopidogrel for the shortest needed duration; ticagrelor/prasugrel minimal data", "NOT_GRADED", ["Miller 2026 Table 2"]],
      ["Anticoagulant needed", "LMWH first choice (safe in lactation); UFH safe; warfarin teratogenic in first trimester (select mechanical-valve cases after) and safe in lactation; DOACs — insufficient data", "NOT_GRADED", ["Miller 2026 Table 2", "Saposnik 2024: DOACs contraindicated in breastfeeding"]],
      ["Secondary prevention after prior ischemic stroke/TIA", "Low-dose aspirin for most; therapeutic LMWH for antiphospholipid syndrome, mechanical valve or prior cardioembolic stroke", "NOT_GRADED", ["Miller 2026"]],
      ["Cryptogenic stroke with PFO, planning pregnancy", "PFO closure may be considered before a future pregnancy if RoPE ≥7", "NOT_GRADED", ["Miller 2026"]],
      ["CVT during pregnancy", "Full-dose LMWH throughout pregnancy, then LMWH or VKA ≥6 weeks postpartum (≥3 months total); LMWH prophylaxis in future pregnancies", "NOT_GRADED", ["Saposnik 2024"]],
      ["Mechanical valve", "Therapeutic anticoagulation with frequent monitoring; shared decision on strategy", "STRONG", ["Otto 2020: COR 1, LOE B-NR"]],
      ["Mechanical valve, warfarin ≤5 mg/day keeps INR therapeutic", "Continuing warfarin through all trimesters is reasonable after counseling", "MODERATE", ["Otto 2020: COR 2a, LOE B-NR"]],
      ["Mechanical valve, warfarin >5 mg/day needed", "Dose-adjusted LMWH ≥BID (anti-Xa 0.8–1.2 U/mL 4–6 h post-dose) in first trimester, then warfarin; IV UFH (aPTT 2× control) if LMWH unavailable", "MODERATE", ["Otto 2020: COR 2a, LOE B-NR"]],
      ["Mechanical valve, approaching planned delivery", "Warfarin → BID LMWH or IV UFH ≥1 week before; LMWH → UFH ≥36 h before; stop UFH ≥6 h before vaginal delivery; labor on warfarin → cesarean after reversal", "STRONG", ["Otto 2020: COR 1, LOE C-LD"]],
      ["Neuraxial anesthesia timing", "Aspirin: no hold; prophylactic LMWH ≥12 h; therapeutic LMWH ≥24 h; low-dose UFH 4–6 h", "NOT_GRADED", ["Miller 2026 Table 2 (from ASRA)"]]
    ),
    options: [
      tx("FIRST_LINE", "Aspirin (low dose)", ["PO"], "<100 mg daily (e.g., 81 mg)", [fixed("Aspirin", 81, "MG", "PER_DAY", ["Daily"])], ["Safe in lactation"], "NOT_GRADED", ["Miller 2026"], "AVAILABLE"),
      tx("FIRST_LINE", "Enoxaparin — prophylactic", ["SC"], "40 mg daily (or 30 mg q12h) — fixed dosing preferred to weight-based for prophylaxis in pregnancy",
        [fixed("Daily", 40, "MG", "PER_DAY", ["Daily"]), fixed("q12h", 30, "MG", "PER_DOSE", ["q12h"])], [], "NOT_GRADED", ["Miller 2026 Table 2"], "AVAILABLE"),
      tx("FIRST_LINE", "Enoxaparin — therapeutic", ["SC"], "1 mg/kg q12h or 1.5 mg/kg daily; mechanical valve: dose-adjust to anti-Xa 0.8–1.2 U/mL",
        [perKg("q12h", 1, 1, "MG", "PER_DOSE", ["q12h"]), perKg("Daily", 1.5, 1.5, "MG", "PER_DOSE", ["Daily"])], [], "NOT_GRADED", ["Miller 2026 Table 2; Otto 2020 for anti-Xa target"], "AVAILABLE", ["cockcroft-gault"])
    ],
    contraindications: ["Warfarin in the first trimester outside mechanical-valve decisions", "DOACs in pregnancy and breastfeeding"],
    esoDiffers: [],
    institutionVaries: ["Maternal stroke alert pathway (L&D vs ED) and MFM/anesthesia co-management"],
    pearls: ["Miller 2026 is endorsed by ACOG and should be read as ACOG clinical guidance", "Pregnancy-associated CVT risk is >8-fold (Miller 2026)"],
    verify: [],
    relatedIds: ["vascular-antithrombotics:cvt-anticoagulation", "vascular-antithrombotics:mechanical-valve-stroke", "vascular-antithrombotics:enoxaparin", "vascular-antithrombotics:aspirin", "vascular-antithrombotics:warfarin"],
    sources: [S.miller2026, S.vhd2020, S.cvt2024, S.asra2025],
    lastReviewed: "UNREVIEWED"
  }
];

const existing = new Set(d.entries.map((e) => e.id));
for (const e of entries) if (!existing.has(e.id)) d.entries.push(e);

// --- CLOTS 3 IPC exclusions ---
const v = d.entries.find((e) => e.id === "vte-prophylaxis-stroke-ich");
v.contraindications = [
  "IPC (CLOTS 3 exclusions): local leg conditions the sleeves would worsen (e.g., dermatitis); severe arteriosclerosis (absent pedal pulses or definite claudication); massive leg edema or pulmonary edema from heart failure",
  "Leg swelling or signs of DVT — exclude DVT (D-dimer or duplex) before applying IPC"
];
v.verify = [];
if (!v.sources.includes(S.clots3)) v.sources.push(S.clots3);

// --- Agent pregnancy lines (only where management changes) ---
const MILLER_DOAC = "Pregnancy and lactation: insufficient data (Miller 2026); contraindicated in breastfeeding (Saposnik 2024) — use LMWH";
const preg = {
  apixaban: [MILLER_DOAC], rivaroxaban: [MILLER_DOAC], edoxaban: [MILLER_DOAC], dabigatran: [MILLER_DOAC],
  aspirin: ["Aspirin <100 mg daily is the first-choice antiplatelet in pregnancy; safe in lactation (Miller 2026)"],
  clopidogrel: ["Pregnancy: use for the shortest duration needed; lactation: low infant risk on limited data (Miller 2026)"],
  ticagrelor: ["Crosses the placenta; minimal pregnancy and lactation data (Miller 2026)"],
  enoxaparin: ["First-choice anticoagulant in pregnancy; minimal transfer to breast milk (Miller 2026)", "Prophylaxis in pregnancy: fixed dose (40 mg daily or 30 mg q12h) preferred to weight-based (Miller 2026)"],
  "heparin-ufh": ["Safe in pregnancy and does not pass into breast milk (Miller 2026)"],
  warfarin: ["Contraindicated in pregnancy except mechanical heart valves at high thrombotic risk (label); see pregnancy-antithrombotics", "Safe in lactation (Miller 2026)"]
};
for (const [id, lines] of Object.entries(preg)) {
  const e = d.entries.find((x) => x.id === id);
  e.pregnancy = lines;
  if (!e.sources.includes(S.miller2026)) e.sources.push(S.miller2026);
  if (!e.relatedIds.includes("vascular-antithrombotics:pregnancy-antithrombotics")) e.relatedIds.push("vascular-antithrombotics:pregnancy-antithrombotics");
}

d.version = "0.6.0";
d.lastUpdated = "2026-11-04";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(`entries: ${d.entries.length}`);
