# BEACON — Dev infrastructure

Standard for hosting QUEDERA products on the miniPC for local dev.
Agreed with Craig in #beacon on 2026-09-04.

## The standard

| Layer | Value |
|---|---|
| **Naming convention** | `quedera-{product}-{env}` for resource names (RGs, App Services, key vault entries, secrets). |
| **Dev URL pattern** | `http://quedera.local/{product}` — path-based, single port (80). |
| **Reverse proxy** | Caddy on port 80, path-based routing. |
| **Hostname** | `quedera.local` resolved via `/etc/hosts` → `127.0.0.1` (LAN also resolvable from other machines on `192.168.0.3`). |
| **Apps** | Each Next.js app sets `basePath: "/{slug}"` in `next.config.js`. Each Vite app sets `base: "/{slug}/"` in `vite.config.js`. |

The path-based pattern mirrors the Azure naming convention for symmetry —
local path matches remote resource name — and means adding a 5th product is
a 3-line Caddyfile change instead of a DNS dance.

## Current state

| Path | Status | Backed by |
|---|---|---|
| `/beacon` | ✅ Live | BEACON Next.js dev server, port 3030, `basePath: "/beacon"` |
| `/duet` | ⏸ Deferred | Vite dev server (port 8000) running but not yet routed — see *DUET migration* below |
| `/wekan` | ⏸ Deferred | Docker stack on port 8090 — separate project, not in scope for this PR |

**Why port 3030, not 3000?** The miniPC runs multiple Next.js scaffolds simultaneously (CMMI v2/v4, quedera-scaffold-template). Letting Next.js auto-pick the next free port via its fallback chain is fragile — it landed BEACON on :3002 the first time and Caddy was still pointing at :3000. Explicit port per product removes the lottery. The table is in `infra/Caddyfile`; add new products to both.

## One-time setup

```bash
cd ~/.openclaw/workspace/quedera-beacon
bash infra/setup.sh
```

This installs Caddy, adds the host entry, installs the Caddyfile, restarts
Caddy, and restarts the BEACON dev server with the new `basePath`. Re-runnable.

## DUET migration

The `/duet` path is commented out in `Caddyfile`. To enable it:

1. Confirm with Craig that Neil's functional test on the DUET dev server is done.
2. Edit `service-transition-duo/frontend/vite.config.js` to add `base: "/duet/"`.
3. Restart the Vite dev server (kill pid, restart from `service-transition-duo/frontend`).
4. Uncomment the `/duet/*` block in `infra/Caddyfile`.
5. Re-run `sudo cp infra/Caddyfile /etc/caddy/Caddyfile && sudo systemctl restart caddy`.

If DUET moves to Azure first (per the slide v0.1 timeline: "Azure deploy Sat 5 Sep"),
this local routing can be skipped — DUET will be served from Azure directly.

## Adding a new product

Three lines, one restart:

1. Add `basePath: "/{slug}"` (Next.js) or `base: "/{slug}/"` (Vite) to the app's config.
2. Add a `handle /{slug}/* { reverse_proxy localhost:{port} }` block to `Caddyfile`.
3. Re-run `bash infra/setup.sh` (or just `sudo cp + systemctl restart caddy`).

That's the whole standard. Scales to N products without DNS changes, port
conflicts, or a reverse-proxy rewrite.

## Production (deferred until Azure)

Pattern when we cross the Cloud/Azure boundary: subdomain per product,
`https://{product}.{quedera-domain}`. Not configured yet — the slide v0.1
path is miniPC → NS test → humans signoff → Azure, and we're at the
miniPC step.
