// User-facing app copy. Plain strings only — the UI decides layout.
// Owner and audience: Jason Schick, MD, for his own clinical use. Not for distribution.

export const APP_NAME = "Neuro Consult Reference";

/** Bump when the disclaimer text changes; the gate re-appears until the new revision is acknowledged. */
export const DISCLAIMER_REVISION = 1;

/** Shown on first launch and whenever DISCLAIMER_REVISION changes; must be acknowledged. */
export const DISCLAIMER_GATE = {
  title: "Before you use this",
  body: [
    "Personal decision-support reference for a neurologist. Not patient advice, and not a substitute for clinical judgment.",
    "Doses, thresholds and drug cautions come from the cited guidelines and FDA labels as of each entry's review date. Confirm high-risk doses against the current label, your pharmacist, or the order set before ordering.",
    "Institutional protocols and order sets take precedence where they differ.",
    "Content is stored on this device and works offline, so it can be out of date. Check the review date on each entry.",
    "Not reviewed or endorsed by Trinity Health or any other institution. Institutional values shown (e.g., hypertonic saline volumes) are the author's transcription of local protocol.",
    "Do not enter patient identifiers. Calculator inputs and the patient bar are kept in memory only and clear when the app closes.",
    "Bedside notes are saved on this device only — use them for local pearls, never for patient information.",
  ],
  acknowledge: "I understand",
};

/** Persistent one-line footer on every entry and calculator screen. */
export const FOOTER = "Decision support only — verify doses before ordering. Reviewed {lastReviewed} · Content {contentVersion}";

/** Banners keyed to entry state. */
export const BANNERS = {
  UNREVIEWED: "Not yet signed off — content may be incomplete or wrong. Verify everything against the sources.",
  VERIFY: "Open items flagged VERIFY below are unconfirmed. Don't rely on them.",
  NOT_US_MARKETED: "Not marketed in the US — listed for outside or international medication lists.",
  STALE: "Last reviewed more than {months} months ago — newer guidance may exist.",
  CALC_INSTITUTIONAL: "Uses a local protocol value, not a guideline value.",
  CALC_LABEL_DIFFERS: "The FDA label dose differs — both are shown.",
};

/** Months after which an entry shows the STALE banner. */
export const STALE_AFTER_MONTHS = 24;

/** Evidence badge legend (shown on the About page and as tooltip text). */
export const EVIDENCE_LEGEND = [
  ["STRONG", "AHA/ASA COR 1, or GRADE strong"],
  ["MODERATE", "AHA/ASA COR 2a"],
  ["WEAK", "AHA/ASA COR 2b, or GRADE conditional"],
  ["NOT_RECOMMENDED", "AHA/ASA COR 3 (no benefit or harm)"],
  ["CONSENSUS", "Formal consensus or GRADE good-practice statement"],
  ["EXPERT_OPINION", "Narrative review, position paper, or ungraded statement"],
] as const;

export const FORMULARY_LEGEND = [
  ["LOCAL_PREFERRED", "Preferred at the author's institution"],
  ["AVAILABLE", "Stocked"],
  ["NOT_STOCKED_LOCAL", "Not stocked locally — shown for completeness and transfers"],
] as const;

export const MG_TIER_LEGEND = [
  ["AVOID", "Avoid / should not be used (ICG 2016, MGFA)"],
  ["HIGH_RISK", "Use only if no alternative or absolutely necessary; monitor closely"],
  ["CAUTION", "Use with caution; monitor for worsening"],
] as const;

/** About page static text. Registry, source and review data come from generated/about.json. */
export const ABOUT = {
  title: "About",
  purpose:
    "Offline bedside reference for inpatient neurology consults and emergencies: acute protocols, consult workups, vascular antithrombotics, neural antibodies, MG drug cautions, and dosing calculators. US practice, FDA labeling, adults only.",
  method: [
    "Built from named, current guidelines; every entry lists its sources with year.",
    "Source priority: US society guidelines, then international consensus, then RCTs. ESO positions are shown where they differ.",
    "Values without a source are marked VERIFY and blocked from release builds.",
    "Each entry is signed off by the author before release; unsigned entries carry a banner.",
  ],
  scope: [
    "Adults only. Pregnancy-specific content is limited to what the cited statements cover.",
    "Not a drug-interaction checker or a complete drug reference.",
  ],
  feedback: "Errors or outdated content: note the entry id (shown at the bottom of each entry) and fix it in the source data.",
  sections: {
    versions: "Content versions",
    review: "Review status",
    sources: "Sources",
    calculators: "Calculators",
    legends: "Badge legends",
  },
};
