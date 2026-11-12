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
    [310, 140, 90, 14, 20, false], [330, 145, 108, 28, 24, true], [360, 140, 180, 28, 60, true], [290, 140, 90, 14, 0, false], [340, 150, 126, 14, 28, true],
  ])("osm %d Na %d glu %d BUN %d → gap %d", (osm, na, glu, bun, gap, warn) => {
    const r = C.osmolarGap(osm, na, glu, bun);
    expect(r.value).toBe(gap); expect(r.warnings.length > 0).toBe(warn);
  });
  it("warns above 20, not 55 (decided 2026-11-12)", () => {
    expect(C.osmolarGap(311, 140, 90, 14).warnings).toEqual([C.OSMOLAR_GAP_WARNING]); // gap 21
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

describe("sodium-correction", () => {
  it.each([
    ["ese", undefined, 150], ["salsa-moderate", 70, 140], ["salsa-severe", 70, 140], ["salsa-moderate", 54, 110], ["salsa-severe", 82, 160],
  ] as const)("%s %s kg → %d mL per bolus", (mode, kg, ml) => expect(C.hyponatremiaBolus(mode, kg as number | undefined).value).toBe(ml));
  it("SALSA severe reads as two 2 mL/kg boluses, not one 4 mL/kg volume (audit P1-6)", () => {
    const r = C.hyponatremiaBolus("salsa-severe", 70);
    expect(r.display).toBe("140 mL 3% NaCl × 2 (2 mL/kg × 2, 280 mL total; SALSA bolus arm)");
    expect(r.parts).toEqual({ mlPerKg: 2, boluses: 2 });
    expect(C.hyponatremiaBolus("salsa-moderate", 70).display).toBe("140 mL 3% NaCl (2 mL/kg, SALSA bolus arm)");
    expect(C.hyponatremiaBolus("salsa-severe", 150).warnings).toEqual([]); // no volume cap
  });
  it.each([
    [{ startNa: 115, currentNa: 125, periodNumber: 1, odsRisk: false }, false],
    [{ startNa: 115, currentNa: 126, periodNumber: 1, odsRisk: false }, true],
    [{ startNa: 115, currentNa: 124, periodNumber: 1, odsRisk: true }, true],
    [{ startNa: 125, currentNa: 133, periodNumber: 2, odsRisk: false }, false],
    [{ startNa: 125, currentNa: 134, periodNumber: 2, odsRisk: false }, true],
  ])("limit check %j → exceeded %s", (i, over) => expect(C.sodiumCorrectionCheck(i).warnings.length > 0).toBe(over));
});

describe("input guards", () => {
  it.each([[0], [-5], [Number.NaN], [400], [Infinity], [1], [29.9]])("weight %d throws", (w) => expect(() => C.levetiracetamLoad(w)).toThrow(RangeError));
  it("adult floor is 30 kg (audit P1-6)", () => expect(C.levetiracetamLoad(30).value).toBe(1800));
  it("every shipped weight-based result cautions above 150 kg, and only above (audit P1-6)", () => {
    const results = (kg: number) => [
      C.levetiracetamLoad(kg), C.valproateLoad(kg), C.fosphenytoinLoad(kg),
      C.phenytoinCorrection({ measuredTotal: 5, albuminGdl: 3, weightKg: kg }),
      C.hypertonicSalineIcp("3%", { weightKg: kg, protocol: { concentration: "3%", mlPerKg: 2, maxMl: 500 } }),
      C.mannitolDose(kg), C.cockcroftGault(60, kg, 1, false), C.hyponatremiaBolus("salsa-moderate", kg), C.hyponatremiaBolus("salsa-severe", kg),
    ];
    for (const r of results(150.5)) expect(r.warnings).toContain(C.WEIGHT_CAUTION);
    for (const r of results(150)) expect(r.warnings).not.toContain(C.WEIGHT_CAUTION);
  });
});

describe("metadata", () => {
  it("covers every manifest id", () => {
    for (const id of manifest as string[]) expect(C.CALCULATOR_META[id], id).toBeDefined();
  });
});

describe("phenytoin-correction (worked cases, planning/drafts/calc-phenytoin-correction.md)", () => {
  const W = C.PHENYTOIN_WARNINGS;
  type Case = [number, C.PhenytoinCorrectionInput, number, number, number, number | undefined, boolean];
  // #, inputs, corrected total, est. free, reload mg PE, min infusion minutes, capped
  it.each<Case>([
    [1, { measuredTotal: 8, albuminGdl: 2.0, weightKg: 70 }, 16.0, 1.6, 0, undefined, false],
    [2, { measuredTotal: 5, albuminGdl: 2.5, weightKg: 80 }, 8.3, 0.8, 350, 2.3, false],
    [3, { measuredTotal: 6, albuminGdl: 3.0, onDialysis: true, weightKg: 70 }, 15.0, 1.5, 0, undefined, false],
    [4, { measuredTotal: 12, albuminGdl: 4.6, weightKg: 70 }, 12.0, 1.2, 150, 1, false],
    [5, { measuredTotal: 4, weightKg: 60 }, 4.0, 0.4, 450, 3, false],
    [6, { measuredTotal: 2, albuminGdl: 4.0, weightKg: 70, targetTotal: 20 }, 2.2, 0.2, 700, 4.7, true],
    [7, { measuredTotal: 0, weightKg: 200, targetTotal: 20 }, 0, 0, 1500, 10, true],
    [8, { measuredTotal: 3, weightKg: 63, targetTotal: 20 }, 3.0, 0.3, 600, 4, true],
    [9, { measuredTotal: 9, albuminGdl: 3.5, measuredFree: 2.4, weightKg: 70 }, 11.3, 1.1, 0, undefined, false],
    [10, { measuredTotal: 6, albuminGdl: 3.0, measuredFree: 0.6, weightKg: 70 }, 8.6, 0.9, 300, 2, false],
    [11, { measuredTotal: 14.7, weightKg: 70 }, 14.7, 1.5, 0, undefined, false],
    [12, { measuredTotal: 10, albuminGdl: 3.0, onValproate: true, hoursSinceFosphenytoin: 1, fosphenytoinRoute: "IV", weightKg: 70 }, 14.3, 1.4, 50, 0.3, false],
    [13, { measuredTotal: 10, albuminGdl: 4.4, onDialysis: true, weightKg: 70 }, 18.5, 1.9, 0, undefined, false],
  ])("case %d", (_n, input, corr, free, reload, minutes, cap) => {
    const r = C.phenytoinCorrection(input);
    expect(r.parts?.correctedTotal).toBe(corr);
    expect(r.parts?.estimatedFree).toBe(free);
    expect(r.parts?.reloadMgPe).toBe(reload);
    expect(r.parts?.minInfusionMinutes).toBe(minutes);
    expect(r.capped).toBe(cap);
    expect(r.warnings[0]).toBe(W.estimateOnly);
  });

  it("low measured free level with an at-target estimate: no 'no reload' (audit P1-5)", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 16, albuminGdl: 4.5, measuredFree: 0.5, weightKg: 70 });
    expect(r.display).not.toMatch(/no reload/);
    expect(r.display).toContain("Estimate can't guide a reload — measured free level is below range; dose from the measured free level.");
    expect(r.parts?.reloadMgPe).toBe(0);
    expect(r.warnings).toContain(C.PHENYTOIN_WARNINGS.discordant("BELOW", "WITHIN"));
  });
  it("case 1: no warnings beyond the standard one; at/above target → no reload", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 8, albuminGdl: 2.0, weightKg: 70 });
    expect(r.warnings).toEqual([W.estimateOnly]);
    expect(r.display).toContain("no reload — at or above target 15");
  });
  it("case 2: 10 mg/kg cap (800) not hit", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 5, albuminGdl: 2.5, weightKg: 80 });
    expect(r.parts?.reloadUncapped).toBe(350);
    expect(r.warnings).toEqual([W.estimateOnly]);
  });
  it("case 3: dialysis coefficient 0.1 and its warning; exactly at target → no reload", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 6, albuminGdl: 3.0, onDialysis: true, weightKg: 70 });
    expect(r.parts?.coefficient).toBe(0.1);
    expect(r.warnings).toContain(W.dialysis);
    expect(r.display).toContain("no reload — at or above target");
  });
  it("case 4: albumin ≥4.4 on the standard equation → not corrected", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 12, albuminGdl: 4.6, weightKg: 70 });
    expect(r.parts?.corrected).toBe("no");
    expect(r.parts?.coefficient).toBe(0.2);
    expect(C.phenytoinCorrection({ measuredTotal: 12, albuminGdl: 4.4 }).parts?.correctedTotal).toBe(12);
    expect(C.phenytoinCorrection({ measuredTotal: 12, albuminGdl: 4.3 }).parts?.corrected).toBe("yes");
  });
  it("case 5: no albumin → uncorrected, with warning", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 4, weightKg: 60 });
    expect(r.parts?.corrected).toBe("no");
    expect(r.warnings).toContain(W.noAlbumin);
    expect(r.value).toBe(4);
    expect(r.parts?.primary).toBe("CORRECTED_TOTAL");
  });
  it("case 6: 10 mg/kg cap (700 mg PE) after rounding 871.1 → 850", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 2, albuminGdl: 4.0, weightKg: 70, targetTotal: 20 });
    expect(r.parts?.reloadUncapped).toBe(850);
    expect(r.warnings).toContain(W.capped(700, true));
  });
  it("case 7: absolute 1500 mg PE cap (10 mg/kg would be 2000)", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 0, weightKg: 200, targetTotal: 20 });
    expect(r.parts?.reloadUncapped).toBe(2800);
    expect(r.warnings).toContain(W.capped(1500, false));
  });
  it("case 8: 10 mg/kg cap rounded down to a 50 mg PE multiple (630 → 600)", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 3, weightKg: 63, targetTotal: 20 });
    expect(r.parts?.reloadUncapped).toBe(750);
    expect(r.warnings).toContain(W.capped(600, true));
  });
  it("case 9: measured free above range → no reload, primary result, discordance warning", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 9, albuminGdl: 3.5, measuredFree: 2.4, weightKg: 70 });
    expect(r.value).toBe(2.4);
    expect(r.parts?.primary).toBe("MEASURED_FREE");
    expect(r.parts?.measuredFreeBand).toBe("ABOVE");
    expect(r.warnings).toContain(W.discordant("ABOVE", "WITHIN"));
    expect(r.display).toContain("no reload — measured free level within or above");
  });
  it("measured free within range → no reload even when the corrected total is low", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 5, albuminGdl: 2.5, measuredFree: 1.5, weightKg: 80 });
    expect(r.parts?.reloadMgPe).toBe(0);
    expect(r.warnings).toContain(W.discordant("WITHIN", "BELOW"));
  });
  it("case 10: measured free low and concordant → reload allowed, no discordance warning", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 6, albuminGdl: 3.0, measuredFree: 0.6, weightKg: 70 });
    expect(r.parts?.measuredFreeBand).toBe("BELOW");
    expect(r.warnings).toEqual([W.estimateOnly]);
  });
  it("case 11: rounded reload 0 → '<25 mg PE — not meaningful'", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 14.7, weightKg: 70 });
    expect(r.display).toContain("<25 mg PE — not meaningful");
    expect(r.parts?.reloadUncapped).toBe(0);
  });
  it("case 12: valproate and early-draw (IV <2 h) warnings", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 10, albuminGdl: 3.0, onValproate: true, hoursSinceFosphenytoin: 1, fosphenytoinRoute: "IV", weightKg: 70 });
    expect(r.warnings).toContain(W.valproate);
    expect(r.warnings).toContain(W.earlyDraw("IV"));
  });
  it("case 13: dialysis variant still applies at albumin ≥4.4", () => {
    expect(C.phenytoinCorrection({ measuredTotal: 10, albuminGdl: 4.4, onDialysis: true, weightKg: 70 }).parts?.corrected).toBe("yes");
  });
  it.each([
    ["IV", 1.9, true], ["IV", 2, false], ["IM", 3.9, true], ["IM", 4, false], [undefined, 1, true], [undefined, 3, false],
  ] as const)("early draw: %s at %d h → warning %s", (route, h, warned) => {
    const r = C.phenytoinCorrection({ measuredTotal: 10, hoursSinceFosphenytoin: h, fosphenytoinRoute: route });
    expect(r.warnings.some((w) => w.startsWith("Drawn <"))).toBe(warned);
  });
  it("corrected total >20 → above-range warning", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 15, albuminGdl: 3.0 });
    expect(r.parts?.correctedTotal).toBe(21.4);
    expect(r.parts?.totalBand).toBe("ABOVE");
    expect(r.warnings).toContain(W.aboveRange);
    expect(C.phenytoinCorrection({ measuredTotal: 20 }).warnings).not.toContain(W.aboveRange);
  });
  it("no weight → no reload estimate", () => {
    const r = C.phenytoinCorrection({ measuredTotal: 5, albuminGdl: 2.5 });
    expect(r.parts?.reloadMgPe).toBeUndefined();
    expect(r.capped).toBe(false);
    expect(r.display).toContain("enter weight for a reload estimate");
  });
  it("target defaults to 15", () => expect(C.phenytoinCorrection({ measuredTotal: 5 }).parts?.targetTotal).toBe(15));
  it.each<[string, C.PhenytoinCorrectionInput]>([
    ["albumin 0.5", { measuredTotal: 10, albuminGdl: 0.5 }],
    ["target 25", { measuredTotal: 10, targetTotal: 25 }],
    ["total −1", { measuredTotal: -1 }],
    ["total 61", { measuredTotal: 61 }],
    ["albumin 6.1", { measuredTotal: 10, albuminGdl: 6.1 }],
    ["free 10.1", { measuredTotal: 10, measuredFree: 10.1 }],
    ["target 9", { measuredTotal: 10, targetTotal: 9 }],
    ["weight 0", { measuredTotal: 10, weightKg: 0 }],
    ["hours 241", { measuredTotal: 10, hoursSinceFosphenytoin: 241 }],
    ["total NaN", { measuredTotal: Number.NaN }],
  ])("case 14: %s throws RangeError", (_l, input) => expect(() => C.phenytoinCorrection(input)).toThrow(RangeError));
});
