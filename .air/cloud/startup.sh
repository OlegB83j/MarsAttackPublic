#!/bin/sh
set -e
# Prove the script ran (check environment logs)
echo "[startup] running at $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "[startup] cwd=$(pwd)"
echo "[startup] user=$(whoami)"
# Install a tool only if missing (idempotent on resume)
if ! command -v jq >/dev/null; then
  apt-get update
  apt-get install -y jq
fi
# Optional: expose a var to the agent via ~/.bashrc (export alone won't persist)
grep -q 'AIR_STARTUP_OK' ~/.bashrc || echo 'export AIR_STARTUP_OK=1' >> ~/.bashrc
echo "[startup] done"
