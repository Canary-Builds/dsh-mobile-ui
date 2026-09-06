# Releases

Package: `@canary-builds/dsh-mobile-ui`. Repository: `Canary-Builds/dsh-mobile-ui`.

Run `npm test` and `npm run test:package`. Bump package.json to a new stable version, update CHANGELOG.md and RELEASE_NOTES.md, then push main. The npm workflow tests and publishes new versions with OIDC provenance, skips already-published versions, and serializes runs. Registry failures stop publication.

Tag the tested commit `v<version>` and push the tag. The Release workflow creates a GitHub release with the installable tarball and SHA256SUMS. Do not move published tags or reuse npm versions.

## One-time npm trusted publisher setup

The scoped package has its own trust record; the old Splash record does not transfer. In this package's npm Settings, add GitHub Actions:

- Organization/user: `Canary-Builds`
- Repository: `dsh-mobile-ui`
- Workflow filename: `publish.yml`
- Environment: `npm`
- Allow direct `npm publish`.

The GitHub environment and workflow are prepared. Save this npm-side connection before the next version bump. The initial scoped package publication uses the operator's vault credential; no npm token is stored in Actions.

Historical `dsh-plugin-splash` releases remain available. The old package should direct users to the scoped successor. See README.md for migration.
