import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';
const root = resolve(import.meta.dirname, '..');
const scratch = mkdtempSync(join(tmpdir(), 'dsh-wpa-package-'));
try {
  const packed = JSON.parse(execFileSync('npm', ['pack', '--json', '--pack-destination', scratch], { cwd: root, encoding: 'utf8' }))[0];
  for (const { path } of packed.files) assert.match(path, /^(lib\/(index|client)\.js|package\.json|cordis\.patch\.yml|README\.md|CHANGELOG\.md|LICENSE)$/);
  execFileSync('tar', ['-xzf', join(scratch, packed.filename), '-C', scratch]);
  const installed = join(scratch, 'package');
  const pkg = JSON.parse(readFileSync(join(installed, 'package.json'), 'utf8'));
  const patch = JSON.parse(readFileSync(join(installed, pkg.dsh.bundle.patch), 'utf8'));
  assert.equal(patch[0].insert[0].name, pkg.name);
  const entry = await import(pathToFileURL(join(installed, pkg.main)));
  assert.equal(typeof entry.apply, 'function');
  let registration;
  vm.runInNewContext(readFileSync(join(installed, pkg.exports['./client']), 'utf8'), { window: { __ModuleLoader__: { load: value => { registration = value; } } } });
  assert.equal(registration.id, pkg.name);
  console.log(`Verified ${pkg.name}@${pkg.version}: ${packed.files.length} allowed files, host/client entries and bundle patch.`);
} finally { rmSync(scratch, { recursive: true, force: true }); }
