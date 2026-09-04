# BEACON — Design Model (v0.1)

> Phase 1 Foundation scaffold built against PRD v1.0.
> 2026-09-04 — design modelling + Phase 1 build delivered to #beacon.

---

## Status

**Phase 1 Foundation built end-to-end with mock data.** Real integration contracts (subscription service, identity service, Pulse/Duet/Atlas APIs) are deferred pending §16 decisions — this build is the IA validation prototype, not a production release.

## Ownership (confirmed 2026-09-04)

- **Product / brand / UX decisions** — James Macmillan Wood (MacWood)
- **Infra / DB / tenancy decisions** — Craig Norton
- **Eng / build / weekly commits** — TACbot
- **Functional testing gate** — Neil Scotting (Tyto alba), per slide v0.1

Mirrors the SENTINEL pattern: co-driven product, Craig owns the infra underneath, Neil gates pre-Azure functional test.

This document captures the design decisions made during the build. Pair it with:

- `architecture/` — durable IA, brand, role, data-model decisions
- `docs/` — PRD section-by-section breakdown
- `risks/register.md` — §16 blockers, with this build's mitigation noted
- `lib/types.ts` — concrete TS shape for every entity
- `lib/mock-data.ts` — seed data driving the UI

---

## Reading the brief

BEACON v1.0 is a **reframing** — Beacon evolves from "executive insight product" (the original scaffold tagline) into the **central customer-facing hub for the entire QUEDERA portfolio**.

The shift changes everything:

- BEACON now hosts product cards for Pulse, Duet, Atlas, AND itself
- The IA has to be product-agnostic above the product layer (NFR-006)
- Subscription centre consolidates per-customer commercial view
- Reports library is cross-product
- "Beacon" appears twice in the brand map — as hub brand and as a product within the portfolio it hosts

The product.config.ts tagline updates from "Executive Dashboards & Insights" → "QUEDERA Control Centre" to reflect this. The original "executive dashboards" framing is preserved as one of Beacon's own product offerings inside the hub.

## Relationship to other products (confirmed 2026-09-04)

> "BEACON provides Dashboards, Reports, Subscriptions, and Product Status across all products." — James, #beacon

BEACON's role in the QUEDERA portfolio is unambiguous: it owns **four cross-product surfaces** for every product in scope:

| Surface | Where it lives in this build | Phase |
|---|---|---|
| **Dashboards** | `/reports` (filter: type = dashboard) | Phase 2 |
| **Reports** | `/reports` (filter: type = report) | Phase 2 |
| **Subscriptions** | `/subscriptions` | Phase 3 |
| **Product Status** | `/products` cards + `/overview` (5-state badges everywhere) | Phase 1 |

The 7 nav areas (Overview / Products / Reports & Dashboards / Subscriptions / Insights / Administration / Settings) are **how users navigate the hub**. The 4 surfaces are **what BEACON actually delivers to the rest of the portfolio** — the four things BEACON exists to provide.

This is the cleanest statement of BEACON's role I've seen. It maps directly onto NFR-006: "architecture must support adding future QUEDERA products without redesigning the core information architecture" — because adding a 5th product means rendering one more card under Product Status, surfacing one more product's reports under Reports, and one more subscription under Subscriptions. Nothing in the IA moves.

**Open scope question:** "All products" — the 4 hub products (Pulse / Duet / Atlas / Beacon) per PRD §1, or the full 5-product QUEDERA palette (which includes SENTINEL)? This build currently excludes SENTINEL from the catalogue. Awaiting explicit confirmation.

---

## Brand hierarchy decisions

Resolved per the working hypothesis in `architecture/brand-hierarchy.md` (sensible default pending Craig + James sign-off — Risk #1, Tier 5):

| Layer | Treatment in chrome |
|---|---|
| **QUEDERA** (master) | Navy wordmark in global header — persistent everywhere |
| **BEACON** (hub) | Amber sublabel in header ("QUEDERA / BEACON") + "Control Centre" positioning |
| **Pulse** | Cyan accent on cards and detail pages |
| **Duet** | Violet accent on cards and detail pages |
| **Atlas** | Deep-blue accent on cards and detail pages |
| **Beacon** (product) | Amber accent on its own product card inside the catalogue |

Risk #1 is documented as Tier 5 — assumed default until ratified. No new palette tokens invented; uses the seven canonical `quedera-*` tokens only.

**Surfacing the brand layer in breadcrumb convention:**

```
QUEDERA › BEACON › Products › Pulse › Subscriptions
  navy    amber     BEACON   cyan   (product-relative)
```

The top two layers never change. The product layer follows context.

---

## Information Architecture — route map

7 nav areas per PRD §3, plus sign-in and brand-kit reference:

| Route | Phase | Built? | What's there |
|---|---|---|---|
| `/sign-in` | 1 | ✓ | Customer + user picker (mock auth) |
| `/overview` | 1 | ✓ | Beacon home — 8 elements from PRD §7 |
| `/products` | 1 | ✓ | Product catalogue — 4 branded cards |
| `/products/[slug]` | 1 | ✓ | Product detail — Pulse / Duet / Atlas / Beacon |
| `/reports` | 2 | ⚠ Skeleton | Table UI + filters + seed data; gated by Risk #5 (content metadata) |
| `/subscriptions` | 3 | ⚠ Skeleton | Table UI + seed data; gated by Risk #2 (subscription source) |
| `/insights` | 4 | ⚠ Skeleton | Empty state with Phase 4 banner; gated by Risk #6 (cross-product metrics) |
| `/admin` | 1 (limited) | ⚠ Skeleton | User list + role assignment mock; gated by RoleGate |
| `/settings` | 1 | ⚠ Skeleton | Preference form mock |
| `/brand-kit` | reference | ✓ | Kept — palette + product suite reference |
| `/` | — | ✓ | Redirect → /sign-in if no session, → /overview if signed in |

**Skeleton means:** the route renders, the IA structure is visible, the layout matches production intent, and seed data demonstrates the eventual content shape. Skeletons are NOT placeholders for "do later" — they're the IA under review.

---

## Data model — concrete shape

Full TS types in `lib/types.ts`. Top-level relationships:

```
Customer (org)
  ├── Users[]                    (each has a Role)
  ├── Subscriptions[]            (one per Product, sometimes more)
  │     ├── Plan / tier
  │     ├── Status enum          (Active | Trial | Expiring | Suspended | NotSubscribed)
  │     ├── Dates                (start, end, renewal)
  │     └── Entitlements[]       (modules, environments, seats, allowances)
  ├── AuditEvents[]
  ├── Notifications[]
  ├── Favourites[]               (per user)
  └── RecentlyViewed[]           (per user)

Products (catalogue, from QUEDERA platform service)
  ├── Metadata
  ├── Capabilities[]
  ├── Reports / Dashboards / Scorecards[]   (owned by product, indexed by Beacon)
  └── Health                                 (when product exposes)
```

**Beacon-owned vs consumed:**

| Entity | Owner | Beacon's relationship |
|---|---|---|
| `Customer` | platform service | read |
| `User` | identity service | read |
| `Product` (catalogue) | platform service | read |
| `Subscription` | commercial service | read |
| `Entitlement` | access-control service | read; enforces NFR-001 |
| `Report` / `Dashboard` / `Scorecard` | per product | index (read summaries) + link out |
| `Favourite` | Beacon | own |
| `RecentlyViewed` | Beacon | own |
| `Notification` | Beacon | own (FR-016) |
| `AuditEvent` | Beacon | own (NFR-005) |

Beacon is a presentation layer over authoritative services. Nothing in this build pretends otherwise — the seeded data is clearly marked as such, and a "Mock data — not connected to live services" notice renders in the footer of authenticated pages.

---

## Component map

All brand-locked. No off-palette colours.

| Component | Purpose | File |
|---|---|---|
| `<Shell>` | Header + left nav + content frame | `components/Shell.tsx` |
| `<Header>` | QUEDERA lockup, BEACON hub label, customer selector, notifications, profile | `components/Header.tsx` |
| `<LeftNav>` | 7 nav areas, role-gated, active state | `components/LeftNav.tsx` |
| `<ProductMark>` | Product lockup (existing) — BEACON variant renders amber | `components/ProductMark.tsx` |
| `<ProductCard>` | Branded card per product with status + primary action | `components/ProductCard.tsx` |
| `<StatusBadge>` | 5-state enum with semantic mapping | `components/StatusBadge.tsx` |
| `<Breadcrumb>` | QUEDERA › BEACON › … | `components/Breadcrumb.tsx` |
| `<PageHeader>` | Title + breadcrumb + actions slot | `components/PageHeader.tsx` |
| `<MetricCard>` | KPI tile for portfolio summary | `components/MetricCard.tsx` |
| `<ActionItem>` | Action centre item (renewal, access request, etc.) | `components/ActionItem.tsx` |
| `<EmptyState>` | Phase-deferred empty placeholder | `components/EmptyState.tsx` |
| `<RoleGate>` | Conditional render based on user role | `components/RoleGate.tsx` |
| `<CustomerSelector>` | Active customer switcher in header | `components/CustomerSelector.tsx` |
| `<NotificationBell>` | Header notifications trigger | `components/NotificationBell.tsx` |
| `<Footer>` | Existing | `components/Footer.tsx` |

---

## Mock data spec

`lib/mock-data.ts` provides:

- **2 customers:** Acme Corp (active, 3 products subscribed), BlueArc Insurance (1 product trial, 1 expiring)
- **5 users across both customers** with different roles:
  - Customer Administrator (sees everything for their org)
  - Executive (view-only, no admin)
  - Service Manager (operational content, no admin)
  - Product / Platform Owner (manages one product)
  - QUEDERA Consultant (cross-customer scoped view)
- **4 products** with realistic metadata:
  - **Pulse** (Active, Acme) — ITSM maturity assessment
  - **Duet** (Trial, Acme) — service transition
  - **Atlas** (Expiring, BlueArc) — SaCM discovery & CMDB validation
  - **Beacon** (Active, Acme + BlueArc) — executive dashboards
- **Subscriptions** with 5 distinct statuses across customers (Active / Trial / Expiring / Suspended / Not Subscribed — all five represented)
- **10 reports / dashboards / scorecards** across products
- **8 audit events** spanning access, subscription change, and admin actions
- **4 favourites, 6 recently-viewed items** (per user)
- **3 notifications** for action-required states

---

## What's mocked vs real

### Real in this build (UI surfaces, behaviour, contracts)

- All UI surfaces — header, navigation, all 7 nav areas (built or skeleton)
- Role-based visibility (Executive vs Service Manager vs Customer Admin)
- Customer-context switching (active org visible in header, all data scopes to it)
- Status badge 5-state grammar — used everywhere a product/subscription appears
- Product brand layering on cards (Pulse cyan, Duet violet, Atlas deep-blue, Beacon amber)
- Deep-link architecture — URLs preserve customer + product context as query strings
- Audit trail UI (read-only view of seeded events, with "Open Product" / "View Subscription" actions)
- Action Centre surfacing renewal, access, and report-available actions
- Breadcrumb convention enforced on every page

### Mocked in this build (will be replaced by real services)

- **Identity service** → demo picker at /sign-in picks customer + user + role
- **Subscription / commercial service** → seeded data, no API contract
- **Product catalogue** → seeded data, no QUEDERA platform service
- **Pulse / Duet / Atlas data** → seeded reports only; "Open Product" links are anchor links to product detail mock, not real product entries
- **Audit log** → seeded events; writes are not yet persisted
- **Notifications** → seeded; the bell shows them but doesn't dispatch new ones
- **Search** → client-side filter on seeded data (no full-text index yet)

A persistent footer notice on every authenticated page reads: **"Mock data — not connected to live services. See §16 in `risks/register.md`."**

---

## Known gaps from §16 — honest accounting

The Phase 1 Foundation still depends on the seven §16 decisions. This build doesn't resolve them — it makes them **visible** so they can be reviewed against a working surface:

| # | Risk | Tier | This build's mitigation |
|---|---|---|---|
| 1 | Brand hierarchy | 5 | Working hypothesis applied; brand-kit still canonical |
| 2 | Subscription source | 1 | Mock data; "Subscription Source Pending" footer note |
| 3 | Identity | 1 | Demo picker at /sign-in |
| 4 | Entitlements | 3 | Mock entitlement check based on role + subscription status |
| 5 | Content metadata | 2 | Mock report metadata with sensible common schema |
| 6 | Cross-product metrics | 4 | Mock aggregated KPIs only |
| 7 | Admin model | 5 | Customer-admin role only; QUEDERA-admin deferred |

The risks are now visible **in the UI**, not buried in the docs. That's deliberate — the build is the surface where they get reviewed.

---

## Build verification

Post-build checks (run 2026-09-04 ~16:20 BST, commit `c361c90`):

- `npm run build` — **clean**. 13 routes generated. First-load JS shared chunk 87.3 kB.
- Off-palette Tailwind audit — **0 matches** across `app/` and `components/`.
- Non-canonical hex audit — **0 matches** outside the seven canonical palette tokens.
- Role-gating manual test — Executive does NOT see `/admin` (RoleGate fallback renders); Customer Admin sees the user table.
- Customer-switching manual test — switching from Acme Corp to BlueArc Insurance in the header dropdown re-scopes every visible subscription, product card, audit event, and notification.
- TypeScript strict mode — clean.

### Route inventory

| Route | Type | Notes |
|---|---|---|
| `/` | static | redirects to `/sign-in` |
| `/sign-in` | static | demo customer + user picker |
| `/_not-found` | static | default 404 |
| `/brand-kit` | static | palette reference (unchanged from scaffold) |
| `/overview` | static | the 8 elements from PRD §7 |
| `/products` | static | catalogue grid |
| `/products/[slug]` | dynamic | per-product detail (7 sections per PRD §8) |
| `/reports` | static | library with search + filters |
| `/subscriptions` | static | subscription table, role-gated |
| `/insights` | static | empty state, gated by Risk #6 |
| `/admin` | static | user table, customer_admin only |
| `/settings` | static | preferences skeleton |

---

## Acceptance check against PRD §14 (MVP criteria)

10 MVP criteria from PRD §14:

| # | Criterion | Status |
|---|---|---|
| 1 | Customer signs in and sees portfolio | ✓ /sign-in picker → /overview |
| 2 | Pulse/Duet/Atlas/Beacon consistent + branded | ✓ all 4 cards use brand colours |
| 3 | User identifies entitled products | ✓ status badges on cards + detail |
| 4 | Admin views consolidated subscription status | ✓ /subscriptions (admin-gated) |
| 5 | Find report without knowing product | ✓ /reports search |
| 6 | Filter by product + type | ✓ /reports filter bar |
| 7 | Open entitled report → correct product context | ✓ deep links preserve customer + product |
| 8 | Unauthorised users blocked | ✓ RoleGate + server-side mock check |
| 9 | Status requiring attention surfaced | ✓ Overview action centre |
| 10 | New products via config, not redesign | ✓ product catalogue is data-driven |

---

## Next steps (proposed)

1. **Sign off on §16 Risk #1** (brand hierarchy) — Craig + James review the chrome treatment
2. **Decide Phase 1 readiness:**
   - Option A — keep building with mock data until Tier 1 risks close (current path)
   - Option B — pause for Tier 1 decisions before further build
3. **Schedule design review** — James + Craig walk through this build, flag IA changes
4. **Triage §18 open questions** — Q1+Q3+Q5+Q8 reachable now; the rest need product decisions
5. **Phase 1 → Phase 2 transition** — what does Reports Hub need from Pulse/Duet/Atlas content metadata? (Risk #5)
