// HISTORICAL — generated the initial data. Do not rerun: data/*.json is now the source of truth (edit it directly; sign-off dates live there).
// Builds data/mg-contraindications.json (v2). Replaces the v1 upload wholesale: tiers re-derived from MGFA 2023,
// sources added, alternatives limited to sourced statements.
import { writeFileSync } from "node:fs";

const MGFA = "Myasthenia Gravis Foundation of America. Cautionary drug list (derived from the International Consensus Guidance for Management of MG, Neurology 2016;87:419-425). MGFA Medical/Scientific and Nurses Advisory Boards; 2023";
const SHEIKH = "Sheikh S, Alvi U, Soliven B, Rezania K. Drugs that induce or cause deterioration of myasthenia gravis: an update. J Clin Med 2021;10(7):1537. doi:10.3390/jcm10071537";
const GILHUS = "Gilhus NE, et al. Generalized myasthenia gravis with acetylcholine receptor antibodies: a guidance for treatment. Eur J Neurol 2024;31:e16229. doi:10.1111/ene.16229";
const ICG_E2 = "Sanders DB, et al. International consensus guidance for management of myasthenia gravis. Neurology 2016;87:419-425, supplemental Table e-2: Drugs to avoid or use with caution in MG";
const TIMOLOL = "Timolol maleate ophthalmic solution 0.25% and 0.5%, US prescribing information. Bausch & Lomb; revised 3/2025";
const AASLD = "Roberts EA, Schilsky ML. Diagnosis and treatment of Wilson disease: an update (AASLD practice guideline). Hepatology 2008;47(6):2089-2111";
const ACOG = "American College of Obstetricians and Gynecologists. Practice Bulletin No. 222: Gestational hypertension and preeclampsia. Obstet Gynecol 2020;135(6):e237-e260";

const ANTIBIOTIC_ALTS = [
  "Penicillins — generally considered safe; rare case reports (ampicillin, amoxicillin)",
  "Cephalosporins — no exacerbations reported",
  "TMP-SMX, clindamycin, nitrofurantoin — no exacerbations reported",
  "Tetracyclines (e.g., doxycycline) — no clinical reports of worsening",
];

const e = (o) => ({
  searchTerms: [], brands: [], fdaBoxedWarningMg: false, usMarketed: true, mechanism: [], pearls: [],
  saferAlternatives: [], verify: [], relatedIds: [], lastReviewed: "2026-11-05", ...o,
});

const entries = [
  e({
    id: "botulinum-toxin", title: "Botulinum toxins", drugClass: "Neurotoxin",
    searchTerms: ["Botox", "botulinum", "spasticity injection", "cosmetic"],
    generics: ["onabotulinumtoxinA", "abobotulinumtoxinA", "incobotulinumtoxinA", "rimabotulinumtoxinB", "daxibotulinumtoxinA"],
    brands: ["Botox", "Dysport", "Xeomin", "Myobloc", "Daxxify"], tier: "AVOID",
    effect: ["Distant weakness mimicking MG; can unmask subclinical MG or worsen controlled MG — including after cosmetic doses"],
    mechanism: ["Blocks presynaptic ACh release"],
    pearls: ["Sheikh 2021: may be offered cautiously in mild/stable MG with blepharospasm or cervical dystonia — slow titration, close monitoring"],
    sources: [ICG_E2, MGFA, SHEIKH],
  }),
  e({
    id: "d-penicillamine", title: "D-penicillamine", drugClass: "Chelating agent",
    searchTerms: ["penicillamine", "Wilson disease"], generics: ["penicillamine"], brands: ["Cuprimine", "Depen"], tier: "AVOID",
    effect: ["Induces de novo autoimmune MG in ~1–7% of treated patients — usually mild/ocular, ~80% AChR-Ab positive"],
    mechanism: ["Immune — no direct effect on neuromuscular transmission"],
    pearls: ["Onset typically ~6–7 months after starting (range 1 month–8 years)", "~70% remit 6–10 months after stopping"],
    saferAlternatives: ["Wilson disease: trientine — chelator alternative, may be better tolerated (AASLD 2008, Class I, Level B); zinc for presymptomatic or maintenance therapy — hepatology decision"],
    sources: [ICG_E2, MGFA, SHEIKH, AASLD],
  }),
  e({
    id: "fluoroquinolones", title: "Fluoroquinolones", drugClass: "Antibiotic",
    searchTerms: ["cipro", "levaquin", "quinolone", "UTI", "pneumonia"],
    generics: ["ciprofloxacin", "levofloxacin", "moxifloxacin", "ofloxacin"],
    brands: ["Cipro", "Levaquin", "Avelox"], tier: "HIGH_RISK", fdaBoxedWarningMg: true,
    effect: ["Worsening reported 15 min to 5 days after starting; one series averaged a 10-point rise in QMG score"],
    mechanism: ["Reduces miniature endplate potential/current (pre- or postsynaptic)"],
    pearls: ["MGFA: use cautiously, if at all", "Common ED/hospitalist empiric choice for UTI and CAP — check the MAR on every MG consult"],
    saferAlternatives: ANTIBIOTIC_ALTS,
    relatedIds: ["acute-neuro:myasthenic-crisis"],
    sources: [ICG_E2, MGFA, SHEIKH],
  }),
  e({
    id: "macrolides", title: "Macrolides", drugClass: "Antibiotic",
    searchTerms: ["azithromycin", "Z-pack", "atypical pneumonia", "CAP"],
    generics: ["azithromycin", "clarithromycin", "erythromycin"], brands: ["Zithromax", "Biaxin"], tier: "HIGH_RISK",
    effect: ["Azithromycin was the most common drug linked to deterioration in a series of 212 MG exacerbations"],
    mechanism: ["Direct effect on neuromuscular transmission"],
    pearls: ["MGFA: use cautiously, if at all", "Sheikh 2021: avoid if another option exists"],
    saferAlternatives: ANTIBIOTIC_ALTS,
    relatedIds: ["acute-neuro:myasthenic-crisis"],
    sources: [ICG_E2, MGFA, SHEIKH],
  }),
  e({
    id: "aminoglycosides", title: "Aminoglycosides", drugClass: "Antibiotic",
    searchTerms: ["gentamicin", "tobramycin", "gram-negative"],
    generics: ["gentamicin", "tobramycin", "amikacin", "neomycin", "streptomycin"], brands: [], tier: "HIGH_RISK",
    effect: ["Exacerbation and MG-like weakness even in non-MG patients — worst with high doses, renal failure, or concurrent neuromuscular blockers"],
    pearls: ["MGFA: use cautiously, only if no alternative", "Sheikh 2021: tobramycin suggested as least likely to cause neuromuscular blockade if one is required"],
    saferAlternatives: ["Cephalosporins — no exacerbations reported", "TMP-SMX — no exacerbations reported"],
    relatedIds: ["acute-neuro:myasthenic-crisis"],
    sources: [ICG_E2, MGFA, SHEIKH],
  }),
  e({
    id: "magnesium", title: "Magnesium (IV and repletion)", drugClass: "Electrolyte",
    searchTerms: ["mag sulfate", "magnesium repletion", "preeclampsia", "eclampsia", "milk of magnesia", "magnesium citrate", "magnesium oxide"],
    generics: ["magnesium sulfate"],
    brands: [], tier: "HIGH_RISK",
    effect: ["Crisis reported after magnesium for preeclampsia and after inpatient repletion"],
    mechanism: ["Reduces presynaptic ACh release and postsynaptic sensitivity"],
    pearls: [
      "MGFA: IV magnesium potentially dangerous — only if absolutely necessary, then observe",
      "ICG 2016 and Gilhus 2024: magnesium sulfate not recommended for eclampsia/preeclampsia in MG; ACOG 2020 lists MG as a contraindication to MgSO4",
      "Watch automatic electrolyte-replacement protocols",
      "Oral magnesium (milk of magnesia, citrate, oxide) is not addressed by ICG 2016, MGFA or Sheikh 2021 — this caution is for IV magnesium and repletion",
    ],
    saferAlternatives: [
      "Eclampsia seizure control in MG: barbiturates or phenytoin (ICG 2016); benzodiazepines or phenytoin (ACOG 2020) — with obstetrics",
    ],
    relatedIds: ["acute-neuro:myasthenic-crisis"],
    sources: [ICG_E2, MGFA, SHEIKH, GILHUS, ACOG],
  }),
  e({
    id: "immune-checkpoint-inhibitors", title: "Immune checkpoint inhibitors", drugClass: "Cancer immunotherapy",
    searchTerms: ["ICI", "immunotherapy", "irAE", "pembrolizumab", "triple M"],
    generics: ["pembrolizumab", "nivolumab", "ipilimumab", "atezolizumab", "avelumab", "durvalumab"],
    brands: ["Keytruda", "Opdivo", "Yervoy", "Tecentriq", "Bavencio", "Imfinzi"], tier: "HIGH_RISK",
    effect: [
      "De novo MG (~0.24% of treated patients) or flare of known MG (~85% in one series, half to MGFA class IV–V)",
      "Respiratory failure ~45%, mortality 25–40% in one series; myositis overlap up to 40%, myocarditis rare but potentially fatal",
    ],
    mechanism: ["Immune — loss of tolerance"],
    pearls: [
      "Onset usually within ~6 weeks (range 2–12) of starting; risk may be higher with combinations",
      "Look for myositis/myocarditis overlap — worse prognosis (Sheikh 2021)",
      "Decisions on continuing ICI belong to oncology + neurology",
    ],
    relatedIds: ["acute-neuro:myasthenic-crisis"],
    sources: [MGFA, SHEIKH],
  }),
  e({
    id: "class-ia-antiarrhythmics", title: "Class Ia antiarrhythmics", drugClass: "Antiarrhythmic",
    searchTerms: ["procainamide", "quinidine", "antiarrhythmic"],
    generics: ["procainamide", "quinidine"], brands: [], tier: "HIGH_RISK",
    effect: ["Procainamide: respiratory failure in MG; MG-like weakness in non-MG patients with renal failure"],
    pearls: ["MGFA: procainamide — use with caution", "Sheikh 2021: avoid class Ia agents or use with extreme caution", "Propafenone (Ic) has also worsened MG within hours"],
    sources: [ICG_E2, MGFA, SHEIKH],
  }),
  e({
    id: "quinine-antimalarials", title: "Quinine, chloroquine, hydroxychloroquine", drugClass: "Quinoline antimalarials",
    searchTerms: ["quinine", "leg cramps", "Plaquenil", "lupus"],
    generics: ["quinine", "chloroquine", "hydroxychloroquine"], brands: ["Qualaquin", "Plaquenil"], tier: "HIGH_RISK",
    effect: ["Worsening of MG; chloroquine and hydroxychloroquine can also induce MG"],
    mechanism: ["Pre- and postsynaptic effects"],
    pearls: [
      "MGFA: chloroquine and hydroxychloroquine — use with caution; quinine use restricted in the US to malaria",
      "Sheikh 2021: quinine and chloroquine listed among drugs to avoid",
    ],
    sources: [ICG_E2, MGFA, SHEIKH],
  }),
  e({
    id: "beta-blockers", title: "Beta-blockers", drugClass: "Cardiovascular",
    searchTerms: ["metoprolol", "propranolol", "labetalol", "rate control", "timolol", "glaucoma drops"],
    generics: ["metoprolol", "propranolol", "atenolol", "labetalol", "carvedilol", "esmolol", "timolol (ophthalmic)"], brands: [], tier: "CAUTION",
    effect: ["Transient worsening reported", "Ophthalmic timolol: rarely increases weakness in MG — the label warns despite topical use"],
    pearls: [
      "MGFA: use cautiously",
      "Controlled studies of IV/oral propranolol showed no significant change in strength or RNS decrement (Sheikh 2021)",
      "Well-controlled MG: usually acceptable at the lowest effective dose with monitoring",
    ],
    sources: [ICG_E2, MGFA, SHEIKH, TIMOLOL],
  }),
  e({
    id: "calcium-channel-blockers", title: "Calcium channel blockers", drugClass: "Cardiovascular",
    searchTerms: ["nifedipine", "verapamil", "diltiazem", "amlodipine"],
    generics: ["nifedipine", "felodipine", "verapamil"], brands: [], tier: "CAUTION",
    effect: ["Felodipine and nifedipine: exacerbation with positive dechallenge/rechallenge", "Verapamil/nifedipine start preceded respiratory failure in severe gMG (confounded)"],
    pearls: ["Not in ICG 2016 Table e-2 or the MGFA list — case reports only (Sheikh 2021)", "Amlodipine and diltiazem are not addressed by any source on file", "Controlled verapamil studies showed no significant change", "Well-controlled MG: lowest effective dose with monitoring (Sheikh 2021)"],
    sources: [SHEIKH],
  }),
  e({
    id: "statins", title: "Statins", drugClass: "Lipid-lowering",
    searchTerms: ["atorvastatin", "rosuvastatin", "cholesterol", "secondary prevention"],
    generics: ["atorvastatin", "rosuvastatin", "simvastatin", "pravastatin"], brands: [], tier: "CAUTION",
    effect: ["Worsening in ~11% of statin-exposed MG patients in one series (1–16 weeks after start); rarely de novo MG"],
    pearls: ["MGFA: use cautiously if indicated, at the lowest dose needed", "Generally safe; occasionally worsens MG and then needs stopping (Sheikh 2021)"],
    saferAlternatives: ["Bile acid sequestrants, niacin, PCSK9 inhibitors — not reported to worsen MG (Sheikh 2021)", "Ezetimibe: one case report of worsening"],
    sources: [ICG_E2, MGFA, SHEIKH],
  }),
  e({
    id: "iodinated-contrast", title: "Iodinated contrast", drugClass: "Radiologic contrast",
    searchTerms: ["CTA", "contrast", "code stroke"], generics: ["iodinated contrast media"], brands: [], tier: "CAUTION",
    effect: ["Older reports of increased weakness; modern agents appear safer"],
    pearls: ["MGFA: use cautiously and observe for worsening"],
    relatedIds: ["acute-neuro:myasthenic-crisis"],
    sources: [ICG_E2, MGFA],
  }),
  e({
    id: "corticosteroids", title: "Corticosteroids (initiation)", drugClass: "Immunosuppressant",
    searchTerms: ["prednisone", "steroid dip", "methylprednisolone"],
    generics: ["prednisone", "methylprednisolone", "dexamethasone"], brands: [], tier: "CAUTION",
    effect: ["Transient worsening within the first ~2 weeks of starting"],
    pearls: ["Standard MG treatment — monitor closely when starting", "Pair high-dose starts with IVIG/PLEX when rapid response is needed (Gilhus 2024)"],
    relatedIds: ["acute-neuro:myasthenic-crisis"],
    sources: [ICG_E2, MGFA, GILHUS],
  }),
  e({
    id: "lithium", title: "Lithium", drugClass: "Mood stabilizer",
    searchTerms: ["lithium", "bipolar"], generics: ["lithium"], brands: [], tier: "CAUTION",
    effect: ["Myasthenic symptoms soon after starting, resolving on withdrawal and recurring on rechallenge; may unmask AChR+ MG"],
    mechanism: ["Fewer postsynaptic AChRs; may reduce presynaptic ACh synthesis/release"],
    sources: [SHEIKH],
  }),
  e({
    id: "desferrioxamine", title: "Deferoxamine", drugClass: "Chelating agent",
    searchTerms: ["desferrioxamine", "iron overload"], generics: ["deferoxamine"], brands: ["Desferal"], tier: "CAUTION",
    effect: ["May worsen MG"], sources: [ICG_E2, MGFA],
  }),
  e({
    id: "telithromycin", title: "Telithromycin", drugClass: "Ketolide antibiotic",
    searchTerms: ["Ketek"], generics: ["telithromycin"], brands: ["Ketek"], tier: "AVOID", fdaBoxedWarningMg: true, usMarketed: false,
    effect: ["Severe exacerbation from 1 hour to days after the first dose"],
    pearls: ["No longer marketed in the US — kept for outside-hospital or international medication lists"],
    sources: [ICG_E2, MGFA, SHEIKH],
  }),
];

const reg = { title: "Myasthenia gravis: drugs to avoid or use with caution", version: "2.2.0", schemaVersion: "2.0.0", lastUpdated: "2026-11-05", entries };
writeFileSync("data/mg-contraindications.json", JSON.stringify(reg, null, 2) + "\n");
console.log(`wrote ${entries.length} entries`);
