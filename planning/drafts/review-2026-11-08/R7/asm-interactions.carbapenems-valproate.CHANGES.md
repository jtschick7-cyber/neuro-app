# asm-interactions:carbapenems-valproate — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). Base: signed `carbapenems-valproate` in `current/asm-interactions.json` from the review-2026-11-08 export packet (lastReviewed 2026-11-05). Finding D9b.

| field path | current | new | source | why |
|---|---|---|---|---|
| `management[2]` (new) | (absent) | Imipenem label: generally not recommended — raising the valproate dose may not be enough; prefer a non-carbapenem; if imipenem is necessary, consider supplemental ASM therapy (Primaxin §5.3, §7.3) | Primaxin §5.3 ("Increasing the dose of valproic acid … may not be sufficient … generally not recommended … Antibacterials other than carbapenems should be considered … supplemental anti-convulsant therapy should be considered"); §7.3 | D9b (FIX) |
| `sources[1]` (new) | (absent) | Primaxin (imipenem and cilastatin) for injection US prescribing information. Merck Sharp & Dohme; revised 7/2024 (user-supplied label) | Label footer | D9b |
| `lastReviewed` | 2026-11-05 | UNREVIEWED | Rule | Edited entry |

## Checked, not changed
- `tier` stays HIGH_RISK: the entry also covers meropenem and ertapenem, whose labels aren't on file; "generally not recommended" is attributed to imipenem only.
- `mechanism` unchanged ("Not well understood (label)"). Primaxin §7.3's in-vitro VPA-glucuronide hypothesis not added (ACCEPT A3).
- All other fields identical to base (base transcribed from the project copy of the export and checked by reading; Claude Code step 1 confirms `data/` still matches).

## Disposition
- D9b: FIX.

## Open verify[]
- None. Base had `verify: []`.

## Registry version
- asm-interactions: one MINOR for R7 (covers the six new entries and this edit). See README.
