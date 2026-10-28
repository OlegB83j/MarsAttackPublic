#!/usr/bin/env bash
set -euo pipefail

log() { printf 'startup: %s\n' "$*"; }
err() { printf 'startup: ERROR: %s\n' "$*" >&2; }

sudo mkdir -p /usr/local/etc
printf '%s\n' 'export PATH=/usr/local/bin:$PATH' | sudo tee /usr/local/etc/air-env.sh >/dev/null

healthcheck() {
  log "waiting for Vite on port 3000"
  while ! curl -fsS http://127.0.0.1:3000/ | grep -q '<div id="root">'; do
    if ! kill -0 "$VITE_PID" 2>/dev/null; then
      err "Vite exited before serving the application"
      return 1
    fi
    sleep 1
  done
  log "Vite is serving the application"
}

log "installing dependencies"
npm ci

log "building the application"
npm run build

log "starting Vite development server"
npm run dev -- --host 0.0.0.0 >"${TMPDIR:-/tmp}/marsattack-vite.log" 2>&1 &
VITE_PID=$!

if [ "${AIR_STARTUP_MODE:-}" = warmup ]; then
  healthcheck
fi

log "environment ready"
