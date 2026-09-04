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
| **Dev port** | Explicit per product (table below). No lottery on the Next.js fallback chain. |

## All QUEDERA products + CORE

| Product | Port | Stack | Scaffold | Status | Route |
|---|---|---|---|---|---|
| **BEACON** | 3030 | Next.js 14 | `quedera-beacon/` | ✅ live — Phase 1 built, basePath set | `/beacon` |
| **CORE** | 4000 | Next.js 14 + Prisma + SQLite | `core/` | ✅ live — Tier 1 ISMS scaffold (mock data); basePath not yet set | `/core` |
| **DUET** | 8000 | Vite (frontend) + Node/Express (backend) | `service-transition-duo/` | 🟡 active, migration deferred — Craig's timing call | `/duet` |
| **PULSE** | 3040 | Next.js 14 | `quedera-pulse/` | ⚪ not started — pre-brief scaffold exists | `/pulse` |
| **ATLAS** | 3050 | Next.js 14 | `quedera-atlas/` | ⚪ not started — pre-brief scaffold exists, design-only per slide | `/atlas` |
| **SENTINEL** | 3060 | Next.js 14 | `sentinel/` | ⏸ paused — Tier 1 scaffold shipped 2026-08-16 | `/sentinel` |

SENTINEL is a separate QUEDERA product family per the brand kit (not part of the BEACON hub catalogue per PRD §1), but it still needs a dev route on the same gateway — so it gets a slot here too.

**CORE** is QUEDERA's ISMS (Information Security Management System) — different product family from the 5 customer-facing QUEDERA products. Tier 1 scaffold already shipped; Tier 2 wires Postgres + WorkOS + real AI adapters.

**CMMI apps phased out 2026-09-04** — previously held :3000 and :3001. Replaced by PULSE.

## Why explicit ports?

The miniPC runs multiple Next.js scaffolds simultaneously. Letting `next dev` auto-pick the next free port (the 3000 → 3001 → 3002 fallback chain) is a lottery — BEACON landed on :3002 the first time and Caddy was pointing at :3000. Explicit port per product removes the lottery.

The table in `infra/Caddyfile` is the source of truth. When you add a new product, pick the next free port from the 30xx range (Next.js) or use the product's natural default (Vite uses :8000).

## Adding a new product — three steps, one restart

1. **App config** — set `basePath: "/{slug}"` (Next.js) or `base: "/{slug}/"` (Vite). Set `"dev": "next dev -p {port}"` (Next.js) so the port is deterministic.
2. **Caddy route** — uncomment or add a `handle /{slug}/* { reverse_proxy localhost:{port} }` block in `infra/Caddyfile`.
3. **Re-run setup** — `bash infra/setup.sh` (or just `sudo cp infra/Caddyfile /etc/caddy/Caddyfile && sudo systemctl restart caddy`).

That's the whole pattern. The 5-product table is already in the Caddyfile so the next product (PULSE) just needs lines 1 and 2 uncommented.

## One-time setup (already done on this miniPC)

```bash
bash ~/.openclaw/workspace/quedera-beacon/infra/setup.sh
```

Installs Caddy, adds the host entry, installs the Caddyfile, restarts Caddy, restarts the BEACON dev server. Idempotent — re-runnable.

## DUET timing — open question

DUET's Vite dev server is currently running on :8000 with no path prefix (links go to `/`, not `/duet/`). To enable the `/duet` route in Caddy:

1. Edit `service-transition-duo/frontend/vite.config.js` to add `base: "/duet/"`.
2. Restart the Vite dev server.
3. Uncomment the `/duet/*` block in `infra/Caddyfile`.
4. Re-run `bash infra/setup.sh`.

Per Craig 2026-09-04, this is deferred to his timing call (NS functional test window).

## Production (deferred until Azure)

Pattern when we cross the Cloud/Azure boundary: subdomain per product, `https://{product}.{quedera-domain}`. Not configured yet — slide v0.1 path is miniPC → NS test → humans signoff → Azure, and we're at the miniPC step.
