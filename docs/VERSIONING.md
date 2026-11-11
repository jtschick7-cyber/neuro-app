# Versioning

Three version numbers, each semver. One content version string ties them together.

| Version | Where | Bump when |
|---|---|---|
| App | `package.json` `version` | Code or UI changes. MAJOR = data contract changed |
| Registry | each `data/*.json` `version` | See below |
| Schema | each `data/*.json` `schemaVersion` + `schema/*.ts` | Field added/removed/renamed (MAJOR if old data no longer validates) |

## Registry version rules
- **MAJOR** — entries removed or ids renamed (breaks bookmarks and `relatedIds`), or a tier/recommendation reversed.
- **MINOR** — any change to clinical meaning: a dose, threshold, tier, evidence level, source, or a new entry.
- **PATCH** — wording, typos, search terms; no clinical meaning changes.

Update `lastUpdated` on every bump. An edited entry goes back to `"UNREVIEWED"` until re-signed; a PATCH may keep its date.

### Encoding approved drafts (`planning/drafts/`)
A draft README or prompt names a bump as "from → to" (for example 0.13.0 → 0.14.0). Those numbers are a guess made when the draft was written, often from an export with no registry header. **The level (MAJOR, MINOR or PATCH) is what was approved; the numbers are not.** Apply that level once to whatever version the registry is at when you encode, and write the real from → to in the decision log and PR body, even where that text is otherwise "word for word". A registry version that differs from the draft is not drift: don't stop for it; say it in the PR body.

Still stop and ask when the **entry itself** no longer matches the draft's base ("current" column or base `lastReviewed`), or when the draft gives no level. Sign-off later adds its own PATCH bump (`scripts/signoff.ts`), so the merged version ends one PATCH above the encoded one. (Rule set by Jason 2026-11-11 after R2, PR #40.)

## Content version
`npm run build:about` writes `generated/about.json` with `contentVersion = <app version>+<8-char hash of all data and calculator metadata>`.
- Shown in the app footer and on the About page.
- Used as the service-worker cache name, so a changed hash makes devices fetch fresh content on next online launch.
- Changing the disclaimer text: bump `DISCLAIMER_REVISION` in `src/content/copy.ts` — the gate re-appears until acknowledged.

## Release
`npm run release` = validate in release mode → tests → build schemas, spec and about.json. Any open VERIFY or UNREVIEWED entry fails the release. See `docs/RELEASE_CHECKLIST.md`.
