#!/usr/bin/env bash
# BEACON + QUEDERA URL standard — dev environment setup
#
# What this does:
#   1. Installs Caddy (reverse proxy)
#   2. Adds `quedera.local` to /etc/hosts
#   3. Installs the Caddyfile from infra/Caddyfile
#   4. Enables + restarts Caddy
#   5. Restarts the BEACON dev server (picks up basePath)
#   6. Verifies the new URLs respond
#
# Requires: sudo (for steps 1-4). Steps 5-6 run as the invoking user.
# Run: bash infra/setup.sh
#
# Idempotent — re-running is safe. The /etc/hosts entry is checked first.
# See DESIGN.md "Infra standard" for the rationale.

set -euo pipefail

BEACON_DIR="$HOME/.openclaw/workspace/quedera-beacon"

echo "=== 1/6  Install Caddy ==="
sudo apt-get update -y
sudo apt-get install -y caddy

echo ""
echo "=== 2/6  Add quedera.local to /etc/hosts ==="
if grep -qE "^[^#]*\bquedera\.local\b" /etc/hosts; then
    echo "Already present."
else
    echo "127.0.0.1 quedera.local" | sudo tee -a /etc/hosts >/dev/null
    echo "Added."
fi

echo ""
echo "=== 3/6  Install Caddyfile ==="
sudo cp "$BEACON_DIR/infra/Caddyfile" /etc/caddy/Caddyfile
sudo chown root:root /etc/caddy/Caddyfile
sudo chmod 644 /etc/caddy/Caddyfile

echo ""
echo "=== 4/6  Enable + restart Caddy ==="
sudo systemctl enable caddy
sudo systemctl restart caddy
sleep 2

echo ""
echo "=== 5/6  Restart BEACON dev server (picks up basePath) ==="
# Find + kill the BEACON next-server (the one whose cwd is BEACON_DIR)
killed=0
for pid in $(pgrep -f "next-server" 2>/dev/null || true); do
    cwd=$(readlink "/proc/$pid/cwd" 2>/dev/null || true)
    if [[ "$cwd" == "$BEACON_DIR" ]]; then
        echo "  killing pid=$pid (cwd=$cwd)"
        kill "$pid" || true
        killed=1
    fi
done
if [[ "$killed" -eq 1 ]]; then
    sleep 3
fi

# Start fresh in the background
cd "$BEACON_DIR"
nohup npm run dev > /tmp/beacon-dev.log 2>&1 &
BEACON_PID=$!
echo "  BEACON dev server starting, pid=$BEACON_PID"
echo "  Logs: tail -f /tmp/beacon-dev.log"

echo ""
echo "=== 6/6  Verify ==="
# Wait for Next.js to be ready
for i in 1 2 3 4 5 6 7 8 9 10; do
    if curl -sf -o /dev/null http://localhost:3000/overview; then
        break
    fi
    sleep 2
done

echo ""
echo "--- Caddy root (landing) ---"
curl -sI http://quedera.local/ | head -3 || echo "FAILED"

echo ""
echo "--- BEACON /beacon (expect 307 redirect to /beacon/sign-in) ---"
curl -sI http://quedera.local/beacon | head -3 || echo "FAILED"

echo ""
echo "--- BEACON /beacon/overview ---"
curl -sI http://quedera.local/beacon/overview | head -3 || echo "FAILED"

echo ""
echo "--- BEACON /beacon/sign-in ---"
curl -sI http://quedera.local/beacon/sign-in | head -3 || echo "FAILED"

echo ""
echo "=== Done ==="
echo ""
echo "  Landing:     http://quedera.local/"
echo "  BEACON:      http://quedera.local/beacon"
echo "  Sign-in:     http://quedera.local/beacon/sign-in"
echo "  Brand kit:   http://quedera.local/beacon/brand-kit"
echo ""
echo "  DUET (still on :8000, not yet migrated): http://openclaw130:8000/"
echo "  Wekan (still on :8090, not migrated):    http://openclaw130:8090/"
