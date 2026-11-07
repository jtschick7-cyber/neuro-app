# acute-neuro:elevated-icp-herniation — CHANGES (item 7.2)

Full replacement entry: `drafts/acute-neuro.elevated-icp-herniation.json`. `lastReviewed` → `"UNREVIEWED"`.
Registry `acute-neuro`: **MINOR** bump (threshold + evidence level + source change), applied once at final assembly.
No schema change.

Source for every change: Cook AM, et al. Guidelines for the Acute Treatment of Cerebral Edema in Neurocritical Care Patients (NCS). Neurocrit Care 2020;32:647-666. doi:10.1007/s12028-020-00959-7. Sections used: SAH hyperosmolar recs 1–2; TBI rec 1; AIS rec 1 + text; ICH recs 1–2; mannitol AKI-monitoring recs 1–3; HTS AKI/acidosis recs 1–3; continuous vs bolus HTS statements 1–3.

## A. Requested correction — sodium target

| Field | Before | After |
|---|---|---|
| `treatment[0].notes[0]` (HTS 3%) | Target serum Na 145–155 mEq/L (max ~160); check Na q4–6h | No serum sodium target is endorsed (Cook 2020): SAH — symptom-based boluses rather than a sodium target; ICH — bolus or targeted sodium both acceptable; TBI/AIS — no target recommended. Studies that targeted sodium used 145–155 mEq/L |
| `treatment[0].notes[1]` (new) | — | Ceiling: Na 155–160 mEq/L and Cl 110–115 mEq/L may be reasonable to limit AKI; monitor Na, Cl and renal function (Cook 2020) |

Why: Cook 2020 does not endorse a sodium target for ICP/edema (SAH: bolus over target, conditional/very low; ICH: either; TBI, AIS: no target). 155–160 appears only as an AKI ceiling (conditional, very low). The "q4–6h" check was dropped from this note; the workup BMP note "recheck q4–6h" is unchanged and sits inside Cook's BID-to-q2h range.

## B. Same-source corrections (approved by Jason 2026-11-06 — all kept)

| Field | Before | After | Why |
|---|---|---|---|
| `treatment[0].notes[2]` | Preferred over mannitol if hypotensive (SBP <90), hypovolemic, or serum osm >320 mOsm/kg | Preferred over mannitol if hypotensive (SBP <90) or hypovolemic | Cook 2020: osm >320 did not change AKI incidence; panel prefers the osmolar gap over an osmolality threshold |
| `treatment[0].evidenceLevel` | STRONG | WEAK | Cook HTS recs are conditional (low / very low). No strong recommendation for HTS exists in the source |
| `treatment[0].evidenceNote` | Neurocritical Care Society guidelines; Brain Trauma Foundation | Cook 2020: HTS over mannitol in TBI — conditional, low; in ICH — conditional, very low · Cook 2020: HTS or mannitol in AIS — conditional, low; neither improves outcome | Grade stated as the source states it |
| `treatment[1].dose[0].frequency[0]` (mannitol) | May repeat q4–6h if osmolar gap <15–20 mOsm/kg and MAP adequate | May repeat q4–6h; follow osmolar gap (no validated cutoff) and MAP | Cook 2020: insufficient evidence for any gap cutoff |
| `treatment[1].notes[1]` | Hold if osmolar gap >15–20 mOsm/kg (or measured osm >320 … per institutional protocol) due to acute renal failure risk | Monitor the osmolar gap rather than serum osmolality (Cook 2020); no gap cutoff is validated — 20 mOsm/kg is used in practice, ≥55 correlated with mannitol concentration in one study; osmolality >320 did not change AKI incidence | Same |
| `treatment[1].evidenceLevel` | STRONG | WEAK | Cook mannitol recs are conditional (low / very low) |
| `treatment[1].evidenceNote` | AHA/ASA guidelines; BTF guidelines | Cook 2020: mannitol is an effective alternative in TBI when HTS can't be given — conditional, low · Cook 2020: osmolar gap over osmolality for AKI monitoring — conditional, very low | Same |
| `institutionVaries[1]` | Mannitol monitoring: some institutions use osmolar gap (>15–20), others use absolute serum osm (>320 mOsm/kg) | Osmolar-gap cutoff used to hold mannitol (Cook 2020 prefers the gap over osmolality but sets no cutoff) | Same |
| `pitfalls[2]` | …use 0.9% NaCl as maintenance | …use 0.9% NaCl as maintenance (Cook 2020: avoid hyponatremia — good practice) | Attribution only |
| `sources[0]` | Cook AM, et al. Guidelines for the Acute Treatment of Cerebral Edema in Neurocritical Care (NCS). Neurocrit Care 2020;32:647-666 | Cook AM, et al. Guidelines for the Acute Treatment of Cerebral Edema in Neurocritical Care Patients (NCS). Neurocrit Care 2020;32:647-666. doi:10.1007/s12028-020-00959-7 | Title per PDF; DOI added. Vol/pages kept from existing entry (not printed in the PDF) |
| `relatedIds` | — | + `reference-cards:neuro-icu-targets` | Link to new card |
| `lastReviewed` | 2026-11-05 | UNREVIEWED | VERSIONING.md |

## Not changed (noticed only)
- `treatment[1]` mannitol keeps role FIRST_LINE; Cook frames it as the alternative to HTS in TBI and ICH. Role change not made.
- `treatment[3]` dexamethasone: Cook 2020 also has a strong recommendation (moderate quality) against corticosteroids in ICH. It could be added to its evidenceNote; not done here.
- Other evidenceNotes ("NCS ENLS", "NCS guidelines") are loosely attributed; no source in project knowledge to check them.
- `hyponatremia-ods` treatment[0] cap uses scope `CUMULATIVE_PER_EPISODE`, which isn't in the `CapScope` enum — that entry won't validate as extracted. Out of 7.2 scope; flagged for Claude Code.

## Proposed keyNumbers (task 4.2 — the field doesn't exist on acute-neuro yet; usable only after this entry is re-signed)
- Osmotherapy: HTS 3% 250–500 mL or mannitol 0.5–1 g/kg
- HTS ceiling: Na 155–160, Cl 110–115 mEq/L — no sodium goal endorsed
- Mannitol: follow osmolar gap, not osm 320
- Escalate: ICP >20–22 refractory to osmotherapy
