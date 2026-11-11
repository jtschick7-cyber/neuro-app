# asm-interactions:lacosamide-conduction-drugs — CHANGES

Review 2026-11-08, item R7 (drafted 2026-11-09). **New entry**, appended after the last existing entry of `data/asm-interactions.json`. Findings: F-I5, D7. "§" = label section.

| field | current | new | source + location |
|---|---|---|---|
| `id` | (absent) | lacosamide-conduction-drugs | — |
| `title` | (absent) | Lacosamide with drugs that affect cardiac conduction | — |
| `searchTerms` | (absent) | [0] Vimpat beta-blocker<br>[1] lacosamide PR interval<br>[2] AV block<br>[3] bradycardia | — |
| `objectDrugs` | (absent) | [0] lacosamide | — |
| `precipitantDrugs` | (absent) | [0] sodium channel blockers (including sodium channel-blocking ASMs)<br>[1] beta-blockers<br>[2] calcium channel blockers<br>[3] potassium channel blockers<br>[4] other PR-prolonging drugs | §7.2 list |
| `tier` | (absent) | CAUTION | "used with caution" → CAUTION |
| `effect` | (absent) | [0] Further PR prolongation; AV block, bradycardia, ventricular tachyarrhythmia — rarely asystole, cardiac arrest, death (§5.3) | Vimpat §5.3 |
| `mechanism` | (absent) | [] |  |
| `management` | (absent) | [0] ECG before starting and after titration to steady state (§5.3, §7.2)<br>[1] Monitor closely if given IV (§7.2) | §5.3, §7.2 |
| `population` | (absent) | [] | — |
| `pearls` | (absent) | [0] Also caution with marked 1st-degree AV block, 2nd-degree or higher AV block, sick sinus without pacemaker, severe cardiac disease, Brugada (§5.3)<br>[1] Profound bradycardia (26 bpm) during a 15-min 150 mg IV infusion in a patient on a beta-blocker (§6.1) | [0] §5.3; [1] §6.1 (IV, adults: 26 bpm, 15-min 150 mg, on a beta-blocker) |
| `verify` | (absent) | [] | — |
| `relatedIds` | (absent) | [0] antiseizure-medications:lacosamide | valid-ids.txt (existing ids only; assumption 2) |
| `sources` | (absent) | [0] Vimpat (lacosamide) tablets, injection, oral solution US prescribing information. UCB; revised 5/2026 (user-supplied label) | Label footers "Revised: …" (DailyMed date; assumption 1) |
| `lastReviewed` | (absent) | UNREVIEWED | Rule: new entry |

## Notes
- Every number above traces to the label location in the source column.
- No cross-links to other new R7 entries (their ids aren't in `valid-ids.txt` yet); cross-references are text only.

## Disposition
- F-I5, D7: FIX. Remaining findings: README Disposition Ledger.

## Open verify[]
- None.

## Registry version
- asm-interactions: one MINOR for R7, applied at assembly. See README.
