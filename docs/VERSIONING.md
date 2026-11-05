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

## Content version
`npm run build:about` writes `generated/about.json` with `contentVersion = <app version>+<8-char hash of all data and calculator metadata>`.
- Shown in the app footer and on the About page.
- Used as the service-worker cache name, so a changed hash makes devices fetch fresh content on next online launch.
- Changing the disclaimer text: bump `DISCLAIMER_REVISION` in `src/content/copy.ts` — the gate re-appears until acknowledged.

## Release
`npm run release` = validate in release mode → tests → build schemas, spec and about.json. Any open VERIFY or UNREVIEWED entry fails the release. See `docs/RELEASE_CHECKLIST.md`.
