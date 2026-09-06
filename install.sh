#!/usr/bin/env bash
# Compatibility helper; the standard dsh plugin command is sufficient.
set -euo pipefail
dsh plugin --profile "${1:-web}" add @canary-builds/dsh-wpa
printf '%s\n' 'Installed DSH WPA. Restart DSH and refresh your browser.'
