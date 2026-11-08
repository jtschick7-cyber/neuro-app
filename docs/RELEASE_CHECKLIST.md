# Release checklist

## A. Per-entry sign-off (every entry, every edit)
Review from the sheets: `npm run review-sheets` → `generated/review/<registry>.html`. Sign off with `npm run signoff -- <registry> <id> [<id>…]`.

**All registries**
- [ ] Every dose, threshold, cap and unit matches the cited source or FDA label (per-kg vs fixed, max dose, route, rate)
- [ ] Every claim traces to a listed source; nothing from memory
- [ ] Sources are the newest version of each guideline; each has a year
- [ ] Evidence levels follow the mapping: COR 1 → STRONG, 2a → MODERATE, 2b → WEAK, 3 → NOT_RECOMMENDED; GRADE strong → STRONG, conditional → WEAK, good practice → CONSENSUS
- [ ] ESO shown where it differs from US guidance
- [ ] Local variation is in `institutionVaries`, not stated as fact
- [ ] Formulary: 4F-PCC for factor Xa reversal; idarucizumab NOT_STOCKED_LOCAL; andexanet NOT_US_MARKETED
- [ ] Linked calculators and `relatedIds` point to the right content
- [ ] Adult US practice; terse; nothing reads as patient advice

**Registry-specific**
- [ ] *acute-neuro* — immediate actions in the right order and time windows; escalation triggers; treatment roles (first-line vs adjunct)
- [ ] *consult-workups* — must-not-miss diagnoses flagged; test priorities (STAT/URGENT/ROUTINE) sensible; recs template usable in a note
- [ ] *vascular-antithrombotics* — renal/hepatic adjustments and hold times match label/ASRA; reversal matches formulary; decision rules in the right order
- [ ] *neural-antibodies* — antigen class (surface vs intracellular); PNS risk and tumor associations; specimen (serum/CSF) and method
- [ ] *Caution lists* (mg-contraindications, seizure-threshold, rcvs-triggers) — tier matches source wording; alternatives name no listed drug (validator checks); renal/dose conditions stated
- [ ] *asm-interactions* — direction right (object vs precipitant); management matches label wording; population limits (e.g., Beers ≥65) stated

## B. Release (once per release)
**Data**
- [ ] `npm run release` passes: 0 errors, no open VERIFY, no UNREVIEWED, tests green
- [ ] Registry `version` and `lastUpdated` bumped per `docs/VERSIONING.md`; app version bumped if code changed
- [ ] In `generated/about.json`, sources ≥5 years old checked for a newer edition
- [ ] Calculator spot-checks match: levetiracetam 80 kg → 4500 mg; fosphenytoin 62 kg → 1250 mg PE; 3% saline → 250 mL over 30 min

**App**
- [ ] Disclaimer gate shows on first launch and after `DISCLAIMER_REVISION` changes
- [ ] Footer content version matches `about.json`
- [ ] No patient data saved: after use, localStorage holds only bedside notes and the disclaimer acknowledgment; IndexedDB and the URL hold no inputs; reopening the app shows an empty patient bar
- [ ] Airplane mode: app opens and every registry and calculator loads
- [ ] Cache name = content version; old caches deleted on update
- [ ] Search finds: "mag", "TNK", "ICH", "Botox", "Keppra", "status"
- [ ] Spot-checks above repeated on the phone

**Archive**
- [ ] Release commit tagged `content-<contentVersion>`
