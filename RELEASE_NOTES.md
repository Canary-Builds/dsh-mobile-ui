DSH Mobile UI is the renamed successor to Splash, now published as `@canary-builds/dsh-mobile-ui`.

Replaces both `dsh-plugin-splash` and the interim `@canary-builds/dsh-wpa` package.

The same mobile/PWA UI behavior now installs as a Profile Bundle in one command:

```sh
dsh plugin --profile web add @canary-builds/dsh-mobile-ui
```

Existing Splash users must remove the old manual `splash` composition row and uninstall `dsh-plugin-splash` before installing DSH Mobile UI. See the README migration instructions. Restart DSH after installation.

Includes a prebuilt package and SHA256SUMS. Node.js 22.19+ is required; UI selectors target DSH 0.1.1-rc.x. Existing Git tags remain available.
