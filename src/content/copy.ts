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

/** Footer on every calculator card (calculators have no per-entry review date; the content version identifies what shipped). */
export const CALC_FOOTER = "Decision support only — verify doses before ordering. Content {contentVersion}";

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
  ["NOT_US_MARKETED", "Not marketed in the US — shown for reference"],
] as const;

export const PNS_RISK_LEGEND = [
  ["HIGH", "PNS-Care 2021: cancer association >70%"],
  ["INTERMEDIATE", "PNS-Care 2021: cancer association 30–70%"],
  ["LOW", "PNS-Care 2021: cancer association <30%"],
  ["NOT_CLASSIFIED", "Not classified by PNS-Care 2021"],
] as const;

/** App convention, not from a guideline. */
export const NORMAL_LIKELIHOOD_LEGEND = [
  ["OFTEN_NORMAL", "Result normal in more than 50% of cases (app convention)"],
  ["SOMETIMES_NORMAL", "Result normal in 20–50% of cases (app convention)"],
  ["RARELY_NORMAL", "Result normal in fewer than 20% of cases (app convention)"],
  ["UNKNOWN", "Frequency not reported"],
] as const;

export const INTERACTION_TIER_LEGEND = [
  ["AVOID", "Avoid the combination"],
  ["HIGH_RISK", "Use only if no alternative; monitor closely"],
  ["CAUTION", "Use with caution; monitor"],
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

/** reference-cards TargetRole legend. */
export const TARGET_ROLE_LEGEND = [
  ["TARGET", "A value to aim for, from the cited source"],
  ["RECOMMENDED", "A recommended practice or stance"],
  ["NOT_RECOMMENDED", "The source recommends against it"],
  ["EVIDENCE_SUMMARY", "What a trial found, or that no recommendation was made — not a target"],
] as const;

/** reference-cards matrix CellStatus legend. */
export const MATRIX_STATUS_LEGEND = [
  ["VALID", "Source says the result is reliable in this setting"],
  ["CAUTION", "Possible bias or thin evidence — interpret with care"],
  ["UNRELIABLE", "Source says false results are expected — don't test in this setting"],
  ["ASSAY_DEPENDENT", "Depends on the method or reagent"],
  ["NOT_ADDRESSED", "Not addressed by sources"],
] as const;

/** Matrix cell direction legend (↓ ↑ ↕). */
export const MATRIX_DIRECTION_LEGEND = [
  ["FALSE_LOW", "↓ Falsely low result possible"],
  ["FALSE_HIGH", "↑ Falsely high result possible"],
  ["EITHER", "↕ Either direction"],
] as const;

/** Labels and notes on reference-card and ASM dosing screens. */
export const REFERENCE_COPY = {
  keyNumbers: "Key numbers",
  pitfalls: "Pitfalls",
  rowSources: "Sources for this row",
  matrixHint: "Tap a test for each cell's finding, evidence and sources.",
  notAddressed: "Not addressed by sources",
  notes: "Notes",
  renalHighlight: "Highlighted for CrCl {crcl} mL/min (Cockcroft-Gault from the top bar). Rows sharing an endpoint are both highlighted.",
  renalNeedContext: "Enter weight, age, sex and Cr in the top bar to highlight the matching CrCl row.",
  renalBsaNotHighlighted: "These bands use BSA-normalized CrCl (mL/min/1.73 m²), so they are not highlighted from Cockcroft-Gault.",
};

export const SYNDROME_FILTER = {
  label: "Filter by syndrome",
  none: "All antibodies",
  clear: "Clear filter",
  typical: "Typical",
  lessCommon: "Reported, less common",
  empty: "No antibodies match this syndrome and search.",
};

/** Entry layout (task group 4): jump chips, evidence disclosure. */
export const ENTRY_LAYOUT_COPY = {
  evidence: "Evidence",
  jumpTo: "Jump to section",
  sources: "Sources",
};

/** 4.7: preferred-specimen badge on antibody cards (enum `testing.preferredSpecimen`). */
export const SPECIMEN_BADGE = {
  heading: "Send",
  SERUM: { label: "SERUM", detail: "Serum preferred" },
  CSF: { label: "CSF", detail: "CSF preferred" },
  BOTH: { label: "PAIRED", detail: "Serum and CSF" },
} as const;

/** 4.4: pinned favorites (entry ids only). */
export const PINS_COPY = {
  heading: "Pinned",
  pin: "Pin to Home",
  unpin: "Unpin from Home",
};

/** 4.6: link from a block repeated across agent cards to the entry that owns it. */
export const CANONICAL_COPY = {
  prefix: "Full guidance:",
  "antiplatelet-ich": "Antiplatelet-associated ICH",
  "four-factor-pcc": "4F-PCC",
  "periprocedural-holds-lp-evd": "Holds before LP, lumbar drain or EVD",
} as const;

/** Global search (Home and the search button on every other screen). */
export const SEARCH_COPY = {
  partial: "No entry matches every word — closest matches:",
  placeholder: "Search TNK, Keppra, status...",
  label: "Search all references and calculators",
  title: "Search",
  open: "Search all references and calculators",
  close: "Close search",
  loading: "Loading…",
  none: "No matches.",
  failed: "Couldn’t load search.",
};

/** Patient context bar (collapsed chip). */
export const CONTEXT_BAR_COPY = {
  empty: "Patient: tap to enter weight, age, sex, Cr",
  prefix: "Patient:",
  expand: "Edit patient context",
  collapse: "Collapse patient context",
};

/** Service-worker update bar and load-failure states. */
export const UPDATE_COPY = {
  available: "New content available.",
  reload: "Reload",
  sectionFailed: "Couldn’t load this section.",
  offlineToast: "Saved for offline use.",
  dismiss: "Dismiss",
  offlineLabel: "Offline",
  offlineReady: "Saved on this device",
  offlineNotReady: "Not yet saved — open once online, then relaunch",
  storageLabel: "Storage",
  storagePersisted: "Protected from eviction",
  storageBestEffort: "Best effort (the browser may clear it)",
  lastCheckedLabel: "Last update check",
  notYet: "Not this session",
  checkNow: "Check for update",
  result: {
    CHECKING: "Checking…",
    UP_TO_DATE: "Up to date.",
    UPDATE_WAITING: "New content found — tap Reload in the bar below.",
    OFFLINE: "Couldn’t check — offline.",
    UNSUPPORTED: "Updates are unavailable in this browser view.",
  },
};

/** Screen crash fallback (ErrorBoundary). */
export const ERROR_BOUNDARY_COPY = {
  title: "Something went wrong showing this screen.",
  where: "Screen:",
  reload: "Reload",
  home: "Back to home",
};
