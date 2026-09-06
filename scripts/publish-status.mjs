import { readFileSync, appendFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
assert.match(pkg.version, /^\d+\.\d+\.\d+$/, 'Automated latest publishing requires a stable version');
const ref = process.env.GITHUB_REF;
assert.ok(ref === 'refs/heads/main' || ref === `refs/tags/v${pkg.version}`, 'Publish only main or the matching version tag');
// Installation metadata avoids npm's full-metadata CDN lag for new packages.
const response = await fetch(`https://registry.npmjs.org/${encodeURIComponent(pkg.name)}`, {
  headers: { Accept: 'application/vnd.npm.install-v1+json' },
  signal: AbortSignal.timeout(30000),
});
assert.ok(response.ok, `Registry check failed (${response.status}); refusing to guess publication state`);
const metadata = await response.json();
assert.equal(metadata.name, pkg.name);
assert.ok(metadata.versions && typeof metadata.versions === 'object');
const publish = !Object.hasOwn(metadata.versions, pkg.version);
console.log(`${pkg.name}@${pkg.version}: ${publish ? 'new version; publish after checks' : 'already published; skipping'}`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `publish=${publish}\n`);
