Set-Content -Path .\README.md -Value @'
# voidmerge Action

A lightweight GitHub Action that installs `voidmerge` from the `voidmerge` GitHub release assets and exposes it on the runner `PATH`.

This action is intended to make it easy to add `voidmerge` tooling to workflows by downloading the requested version or the latest available release.

## Features

- Installs `voidmerge` for the current runner platform
- Supports Linux, macOS, and Windows
- Downloads a versioned binary asset from `https://github.com/voidmerge/voidmerge/download`
- Defaults to the latest `voidmerge` release if no version is provided
- Prints the installed `voidmerge` version after installation

## Inputs

| Input | Required | Default | Description |
|---|---|---|---|
| `voidmerge-version` | No | `latest` | The version of `voidmerge` to download and install. Example: `0.3.5`. If omitted or set to `latest`, the action resolves the most recent GitHub release.

## Example

```yaml
name: Build documentation

on:
  push:
    branches:
      - main

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Set up voidmerge
        uses: voidmerge/actions-voidmerge@v0.0.1
        with:
          voidmerge-version: latest
      - name: Show voidmerge version
        run: voidmerge --version
```

## How it works

1. The action reads the configured version input.
2. If the version is omitted or set to `latest`, it queries GitHub releases for `voidmerge/voidmerge`.
3. It determines the runner platform and constructs the appropriate release asset URL.
4. The action downloads the distribution archive and extracts the `voidmerge` binary.
5. The binary is moved into a tool directory and added to the runner `PATH`.
6. Finally, the action prints the installed `voidmerge` version.

## Supported Platforms

- `linux` → `unknown-linux-gnu`
- `darwin` → `apple-darwin`
- `win32` → `pc-windows-msvc`

## Repository structure

- `action.yml` — GitHub Action metadata and inputs
- `src/index.ts` — action entry point
- `src/main.ts` — main runtime logic
- `src/installer.ts` — download and install helper functions
- `src/get-os.ts` — platform to target triple mapping
- `src/get-url.ts` — asset URL builder
- `src/get-latest-version.ts` — resolves the latest version from GitHub releases
- `lib/` — compiled output from `npm run build`

## Build

```bash
npm install
npm run build
```

## Notes

- The action currently uses `@actions/tool-cache`, `@actions/io`, `@actions/exec`, and `node-fetch`.
- If you want to pin a specific `voidmerge` version, provide it through the action input.
- The action sets the download destination under the runner's temporary/tool path and adds the binary to `PATH`.

## License

This repository does not currently specify a license in `package.json`.
'@ -Encoding UTF8