#!/usr/bin/env bash
# Compatibility helper; the standard dsh plugin command is sufficient.
set -euo pipefail
dsh plugin --profile "${1:-web}" add @canary-builds/dsh-mobile-ui
printf '%s\n' 'Installed DSH Mobile UI. Restart DSH and refresh your browser.'
