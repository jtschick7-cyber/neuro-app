# consult-workups:aria-anti-amyloid — CHANGES (R14, task 4.4)

New entry; no base. `lastReviewed: "UNREVIEWED"`. Category `COGNITION_ENCEPHALOPATHY` (assumption; change if you prefer another).

Label statements are `NOT_GRADED`. Appropriate use recommendation (AUR) and ASNR statements are `EXPERT_OPINION` (neither AUR is a formal Delphi, so nothing is `CONSENSUS`). Where a label and an AUR differ, both are shown as separate rules and neither is picked.

| Section | Rows | What it holds | Source |
|---|---|---|---|
| keyNumbers | 5 | Exact copies: lecanemab MRI schedule; donanemab MRI schedule; ARIA-E grading; ARIA-H grading; AUR steroid regimen | see below |
| keyHistory / keyExam / redFlags | 6 / 4 / 6 | Drug and dose count, prior ARIA, ApoE ε4, baseline MRI risk markers, antithrombotics, thrombolytic given; focal deficit, mental status, seizure | PIs §5.1; AURs |
| differential | 6 | Ischemic stroke (must-not-miss), ARIA-E/H (must-not-miss), ICH >1 cm (must-not-miss), CAA-ri, PRES, seizure/status | PIs §5.1; donanemab AUR §5.3, §5.5; ASNR p.27 |
| workup[0] | MRI FLAIR, GRE, DWI | Emergent when stroke vs ARIA and EVT/IVT considered; compare with baseline; field strength; contrast | ASNR 2025 pp.27, 29 |
| workup[1] | Grade ARIA | ARIA-E size, ARIA-H counts, symptom severity definitions | Leqembi PI Table 5 p.12, Table 3 fn p.7; Kisunla PI Table 5 p.10, Table 2 fn p.6 |
| workup[2]–[3] | Surveillance MRI | Lecanemab and donanemab schedules; vigilance windows (14 and 24 weeks) | Leqembi PI §2.4 p.6, §5.1 p.13; Kisunla PI §2.3 p.5, §5.1 p.11 |
| workup[4] | Follow-up MRI | AUR monthly vs label 2–4 months, both shown | AURs; PIs Tables 3, 4 / 2, 3 |
| decisionRules 1–2 | Stroke-like deficit | Label: consider ARIA-E before a thrombolytic; link to thrombolysis entry. AUR: no thrombolytic; thrombectomy alone for LVO | PIs §5.1; lecanemab AUR p.6; donanemab AUR §5.3 |
| decisionRules 3–11 | Label hold rules | ARIA-E and ARIA-H tables, ICH >1 cm, recurrent ARIA-E | Leqembi PI pp.6–7, 13; Kisunla PI pp.5–6, 11 |
| decisionRules 5, 12–15 | AUR hold/stop rules | Suspend with symptoms; discontinue for severe; drug-specific stopping lists; resume criteria | Lecanemab AUR pp.10–11, 30; donanemab AUR §5.4, §5.6 |
| decisionRules 16 | Steroids | Methylprednisolone 1 g IV daily for 5 days, then oral taper over several weeks; AUR only | Lecanemab AUR p.10; donanemab AUR §5.5 |
| decisionRules 17–18 | Antithrombotics | Label caution; AUR stop the antibody if an anticoagulant is needed | PIs §5.1; lecanemab AUR p.9; donanemab AUR §5.6 |
| initialSteps / disposition / institutionVaries | 4 / 3 / 4 | MRI first, admit level, seizure monitoring, local variation | AURs |
| pearls | 11 | Timing, resolution rates, ApoE ε4 rates per drug, ICH and antithrombotic data, thrombolysis deaths, seizures | PIs §5.1; ASNR p.24 |
| verify | 5 | Open items; see README | |
| relatedIds / sources | 8 / 5 | All eight ids are in `valid-ids.txt` | |

## keyNumbers (exact copies)
- `[0]` = `workup[2].notes[0]`
- `[1]` = `workup[3].notes[0]`
- `[2]` = `workup[1].notes[0]`
- `[3]` = `workup[1].notes[1]`
- `[4]` = `decisionRules[15].recommendation`

## Differences between the labels (shown, not resolved)
- Mild ARIA-E with mild symptoms: label may continue by clinical judgment; AURs suspend (rules 4 and 5).
- Radiographically severe ARIA: label suspends, with judgment on discontinuing for ARIA-H; AURs discontinue (rules 9 and 12).
- Anticoagulant needed: label caution; AURs stop the antibody (rules 17 and 18).
- Follow-up MRI after ARIA: label 2 to 4 months; AURs monthly (workup[4]).

## Not used
- Lecanemab AUR and ASNR MRI schedule (5th, 7th, 14th infusion): older than the current label.
- ANA white paper pause/discontinue statement as quoted in ASNR p.25: secondary summary of the lecanemab AUR.
