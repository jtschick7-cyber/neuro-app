# acute-neuro:nms-parkinsonism-hyperpyrexia — changes (item 7.7, 2026-11-07)

Base: v0.7.1 entry as extracted (signed 2026-11-05). Full replacement entry in the matching .json. Registry bump: MINOR (source added, clinical note changed; absorbed into the acute-neuro MINOR bump already planned for 7.2/7.3 at final assembly).

- treatment[5] ("Resume dopaminergic therapy (parkinsonism-hyperpyrexia)") notes:
  - was: "If no enteral route: rotigotine patch is a non-oral option (convert via LEDD)"
  - now: "If no enteral route: rotigotine patch — dose it with the BMJ 2010 conversion on reference-cards:inpatient-parkinson-disease; don't use the calc:ledd (Jost) total as the input"
- treatment[5] evidenceNote: [] → ["BMJ 2010 practice pointer (rotigotine as non-oral option; ungraded)"]
- treatment[5] calculatorIds: unchanged (["ledd"]) — kept for LEDD context; the note warns against using it as the conversion input (DECISION_LOG 7.7 #2).
- relatedIds: + `reference-cards:inpatient-parkinson-disease`
- sources: + "Brennan KA, Genever RW. Managing Parkinson's disease during surgery. BMJ 2010;341:c5718. doi:10.1136/bmj.c5718"
- lastReviewed: "2026-11-05" → "UNREVIEWED"

No other field changed. Noticed, not changed: relatedIds still lists `acute-neuro:delirium-vs-encephalopathy`, which task 6.1 removes — fix it there.
