import { describe, it, expect } from "vitest";
import * as C from "../src/lib/calculators";
import manifest from "../data/calculators.manifest.json";

describe("levetiracetam-load", () => {
  it.each([
    [50, 3000, false], [70, 4200, false], [75, 4500, false], [76, 4500, true], [120, 4500, true],
  ])("%d kg → %d mg (capped %s)", (kg, mg, cap) => {
    const r = C.levetiracetamLoad(kg);
    expect(r.value).toBe(mg); expect(r.capped).toBe(cap);
  });
});

describe("valproate-load", () => {
  it.each([[40, 1600, false], [61, 2450, false], [75, 3000, false], [76, 3000, true], [100, 3000, true]])(
    "%d kg → %d mg (capped %s)", (kg, mg, cap) => { const r = C.valproateLoad(kg); expect(r.value).toBe(mg); expect(r.capped).toBe(cap); });
});

describe("fosphenytoin-load", () => {
  it.each([[50, 1000, 6.7], [62, 1250, 8.3], [75, 1500, 10], [80, 1500, 10], [43, 850, 5.7]])(
    "%d kg → %d mg PE, ≥%d min", (kg, mg, min) => { const r = C.fosphenytoinLoad(kg); expect(r.value).toBe(mg); expect(r.parts?.minInfusionMinutes).toBe(min); });
});

describe("lacosamide-load", () => {
  it.each([[undefined, 0], [80, 0], [50, 0], [49.9, 1], [40, 1]])(
    "weight %s → fixed 200–400 mg, %d warnings", (kg, nWarn) => {
      const r = C.lacosamideLoad(kg as number | undefined);
      expect(r.range).toEqual([200, 400]); expect(r.value).toBeNull(); expect(r.warnings.length).toBe(nWarn);
    });
});

describe("hypertonic-saline-bolus (ICP, institutional protocol)", () => {
  it.each([
    ["3%", {}, 250, 128.3, false],
    ["23.4%", {}, 30, 120.1, false],
    ["3%", { weightKg: 150 }, 250, 128.3, false],
    ["3%", { weightKg: 150, protocol: { concentration: "3%", mlPerKg: 2, maxMl: 250 } }, 250, 128.3, true],
    ["3%", { weightKg: 66, protocol: { concentration: "3%", mlPerKg: 2, maxMl: 500 } }, 130, 66.7, false],
  ] as const)("%s %j → %d mL, %d mEq", (conc, opts, ml, meq, cap) => {
    const r = C.hypertonicSalineIcp(conc, opts as any);
    expect(r.value).toBe(ml); expect(r.parts?.naMeq).toBe(meq); expect(r.capped).toBe(cap);
  });
  it("23.4% warns central line", () => expect(C.hypertonicSalineIcp("23.4%").warnings.join()).toMatch(/central/));
  it("throws when weight-based protocol has no weight", () => expect(() => C.hypertonicSalineIcp("3%", { protocol: { concentration: "3%", mlPerKg: 2 } })).toThrow());
});

describe("mannitol-dose", () => {
  it.each([[70, [35, 70]], [80, [40, 80]], [53, [25, 55]], [100, [50, 100]], [47, [25, 45]]])(
    "%d kg → %j g", (kg, range) => { const r = C.mannitolDose(kg); expect(r.range).toEqual(range); expect(r.parts?.ml20High).toBe((range as number[])[1] * 5); });
});

describe("osmolar gap", () => {
  it.each([
    [310, 140, 90, 14, 20, false], [330, 145, 108, 28, 24, false], [360, 140, 180, 28, 60, true], [290, 140, 90, 14, 0, false], [340, 150, 126, 14, 28, false],
  ])("osm %d Na %d glu %d BUN %d → gap %d", (osm, na, glu, bun, gap, warn) => {
    const r = C.osmolarGap(osm, na, glu, bun);
    expect(r.value).toBe(gap); expect(r.warnings.length > 0).toBe(warn);
  });
});

describe("ledd", () => {
  it.each([
    [[{ drug: "levodopa-ir", mgPerDay: 300 }], {}, 300],
    [[{ drug: "levodopa-cr", mgPerDay: 400 }, { drug: "levodopa-er-ipx066", mgPerDay: 390 }], {}, 495],
    [[{ drug: "selegiline-oral", mgPerDay: 10 }, { drug: "rotigotine", mgPerDay: 4 }], {}, 221.2],
    [[{ drug: "levodopa-ir", mgPerDay: 400 }], { comt: { drug: "entacapone" } }, 532],
    [[{ drug: "levodopa-ir", mgPerDay: 300 }, { drug: "levodopa-cr", mgPerDay: 200 }], { comt: { drug: "opicapone" } }, 675],
    [[{ drug: "levodopa-ir", mgPerDay: 300 }, { drug: "safinamide", mgPerDay: 100 }], {}, 450],
    [[{ drug: "levodopa-ir", mgPerDay: 300 }], { comt: { drug: "entacapone", coveredLevodopaLed: 300 }, istradefylline: true }, 478.8],
    [[{ drug: "pramipexole-base", mgPerDay: 1.05 }, { drug: "ropinirole", mgPerDay: 9 }], {}, 330],
  ] as const)("%j %j → %d", (items, opts, total) => expect(C.ledd(items as any, opts as any).value).toBe(total));
});

describe("cockcroft-gault", () => {
  it.each([[60, 70, 1.0, false, 78], [60, 70, 1.0, true, 66], [80, 50, 2.0, false, 21], [40, 100, 0.8, false, 174], [90, 45, 1.5, true, 18]])(
    "age %d wt %d SCr %d female %s → %d", (age, wt, scr, f, out) => expect(C.cockcroftGault(age, wt, scr, f).value).toBe(out));
});

describe("ich-score", () => {
  it.each([
    [{ gcs: 15, volumeMl: 10, ivh: false, infratentorial: false, ageY: 60 }, 0, "0%"],
    [{ gcs: 12, volumeMl: 30, ivh: false, infratentorial: false, ageY: 60 }, 2, "26%"],
    [{ gcs: 4, volumeMl: 50, ivh: true, infratentorial: true, ageY: 85 }, 6, "no patients in derivation cohort"],
    [{ gcs: 13, volumeMl: 29.9, ivh: true, infratentorial: false, ageY: 80 }, 2, "26%"],
    [{ gcs: 4, volumeMl: 35, ivh: false, infratentorial: false, ageY: 79 }, 3, "72%"],
  ])("%j → %d (%s)", (i, s, m) => { const r = C.ichScore(i); expect(r.value).toBe(s); expect(r.parts?.mortality30d).toBe(m); });
});

describe("abcd2", () => {
  it.each([
    [{ ageY: 65, bpHigh: true, weakness: true, speechOnly: false, durationMin: 90, diabetes: true }, 7],
    [{ ageY: 50, bpHigh: false, weakness: false, speechOnly: false, durationMin: 5, diabetes: false }, 0],
    [{ ageY: 60, bpHigh: false, weakness: false, speechOnly: true, durationMin: 10, diabetes: false }, 3],
    [{ ageY: 59, bpHigh: true, weakness: true, speechOnly: true, durationMin: 59, diabetes: false }, 4],
    [{ ageY: 70, bpHigh: true, weakness: false, speechOnly: false, durationMin: 60, diabetes: true }, 5],
  ])("%j → %d", (i, s) => expect(C.abcd2(i).value).toBe(s));
});

describe("cha2ds2-vasc", () => {
  it.each([
    [{ chf: false, htn: false, ageY: 50, diabetes: false, strokeTiaTe: false, vascular: false, female: false }, 0],
    [{ chf: false, htn: false, ageY: 50, diabetes: false, strokeTiaTe: false, vascular: false, female: true }, 1],
    [{ chf: false, htn: true, ageY: 70, diabetes: false, strokeTiaTe: true, vascular: false, female: false }, 4],
    [{ chf: true, htn: true, ageY: 80, diabetes: true, strokeTiaTe: true, vascular: true, female: true }, 9],
    [{ chf: false, htn: false, ageY: 75, diabetes: true, strokeTiaTe: false, vascular: false, female: false }, 3],
  ])("%j → %d", (i, s) => expect(C.cha2ds2Vasc(i).value).toBe(s));
});

describe("has-bled", () => {
  const base = { htn: false, renal: false, liver: false, stroke: false, bleeding: false, labileInr: false, ageY: 50, drugs: false, alcohol: false };
  it.each([
    [base, 0], [{ ...base, ageY: 66 }, 1], [{ ...base, ageY: 65 }, 0], [{ ...base, stroke: true, drugs: true, htn: true }, 3],
    [{ htn: true, renal: true, liver: true, stroke: true, bleeding: true, labileInr: true, ageY: 70, drugs: true, alcohol: true }, 9],
  ])("%j → %d", (i, s) => expect(C.hasBled(i).value).toBe(s));
});

describe("tnk-dose", () => {
  it.each([[55, false, 15], [60, false, 17.5], [79.9, false, 20], [90, false, 25], [45.6, true, 11.25]])(
    "%d kg (exact <50: %s) → %d mg", (kg, exact, mg) => expect(C.tnkDose(kg, { exactWeightUnder50: exact }).value).toBe(mg));
});

describe("alteplase-dose", () => {
  it.each([[70, 63, 6.3, 56.7], [100, 90, 9, 81], [120, 90, 9, 81], [55, 49.5, 5, 44.5], [83, 74.7, 7.5, 67.2]])(
    "%d kg → %d mg (bolus %d, infusion %d)", (kg, tot, b, inf) => {
      const r = C.alteplaseDose(kg); expect(r.value).toBe(tot); expect(r.parts?.bolus).toBe(b); expect(r.parts?.infusion).toBe(inf);
    });
});

describe("ivig-dose", () => {
  it.each([[70, 5, 30, 150], [80, 5, 30, 150], [100, 2, 100, 200], [62, 5, 25, 125], [50, 4, 25, 100]] as const)(
    "%d kg over %d days → %d g/day", (kg, days, daily, total) => {
      const r = C.ivigDose(kg, { days }); expect(r.parts?.dailyG).toBe(daily); expect(r.value).toBe(total);
    });
});

describe("sodium-correction", () => {
  it.each([
    ["ese", undefined, 150], ["salsa-moderate", 70, 140], ["salsa-severe", 70, 280], ["salsa-moderate", 54, 110], ["salsa-severe", 82, 330],
  ] as const)("%s %s kg → %d mL", (mode, kg, ml) => expect(C.hyponatremiaBolus(mode, kg as number | undefined).value).toBe(ml));
  it.each([
    [{ startNa: 115, currentNa: 125, periodNumber: 1, odsRisk: false }, false],
    [{ startNa: 115, currentNa: 126, periodNumber: 1, odsRisk: false }, true],
    [{ startNa: 115, currentNa: 124, periodNumber: 1, odsRisk: true }, true],
    [{ startNa: 125, currentNa: 133, periodNumber: 2, odsRisk: false }, false],
    [{ startNa: 125, currentNa: 134, periodNumber: 2, odsRisk: false }, true],
  ])("limit check %j → exceeded %s", (i, over) => expect(C.sodiumCorrectionCheck(i).warnings.length > 0).toBe(over));
});

describe("input guards", () => {
  it.each([[0], [-5], [Number.NaN], [400], [Infinity]])("weight %d throws", (w) => expect(() => C.levetiracetamLoad(w)).toThrow(RangeError));
});

describe("metadata", () => {
  it("covers every manifest id", () => {
    for (const id of manifest as string[]) expect(C.CALCULATOR_META[id], id).toBeDefined();
  });
});
