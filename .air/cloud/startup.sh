#!/usr/bin/env bash
set -euo pipefail

log() { printf 'startup: %s\n' "$*"; }
err() { printf 'startup: ERROR: %s\n' "$*" >&2; }

readonly PROFILE_HOOK="$HOME/.air-marsattack-env.sh"

init_profile_hook() {
    cat > "$PROFILE_HOOK" <<'EOF'
# Environment prepared by .air/cloud/startup.sh.
export PATH="$HOME/.local/bin:$PATH"
EOF

    local profile
    for profile in "$HOME/.bash_profile" "$HOME/.bash_login" "$HOME/.profile"; do
        if [ -f "$profile" ]; then
            break
        fi
    done
    if [ ! -f "${profile:-}" ]; then
        profile="$HOME/.profile"
        touch "$profile"
    fi
    grep -Fq "$PROFILE_HOOK" "$profile" 2>/dev/null || \
        printf '\n[ -f %q ] && . %q\n' "$PROFILE_HOOK" "$PROFILE_HOOK" >> "$profile"
    touch "$HOME/.bashrc"
    grep -Fq "$PROFILE_HOOK" "$HOME/.bashrc" 2>/dev/null || \
        printf '\n[ -f %q ] && . %q\n' "$PROFILE_HOOK" "$PROFILE_HOOK" >> "$HOME/.bashrc"
    # shellcheck source=/dev/null
    . "$PROFILE_HOOK"
}

healthcheck() {
    local response
    log "waiting for Vite on port 3000"
    while true; do
        response=$(curl -fsS http://127.0.0.1:3000/ 2>/dev/null || true)
        if [[ "$response" == *"Mars Attacks - Animated Project Cover"* ]]; then
            log "Vite served the Mars Attacks page successfully"
            return 0
        fi
        log "Vite is not ready yet; checking again"
        sleep 2
    done
}

init_profile_hook

if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
    err "Node.js and npm are required by this repository"
    exit 1
fi

log "installing locked npm dependencies"
npm ci
log "running production build"
npm run build

log "starting Vite development server"
nohup npm run dev -- --host 0.0.0.0 --port 3000 > /tmp/marsattack-vite.log 2>&1 &

if [ "${AIR_STARTUP_MODE:-}" = warmup ]; then
    healthcheck
fi

log "environment ready"
