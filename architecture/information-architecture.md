# Information Architecture

PRD §3 — the seven primary nav areas. **Beacon is a control centre, not a fifth product**: the IA shouldn't reshuffle when you switch which product card you came from.

## The seven areas

| Primary area | Purpose | Key content |
|---|---|---|
| **Overview** | Portfolio-level customer landing page | Portfolio health, actions, product status, subscription summary |
| **Products** | Discover and access products | Pulse / Duet / Atlas / Beacon — capabilities, status, access |
| **Reports & Dashboards** | Central reporting library | Dashboards, reports, scorecards; product filters; favourites |
| **Subscriptions** | Understand commercial / entitlement position | Plan, status, seats, dates, entitlements, renewal |
| **Insights** | Cross-product executive view | KPIs, trends, risks, recommendations |
| **Administration** | Customer administration | Users, roles, product access, groups, audit |
| **Settings** | Customer preferences | Notifications, profile, display and organisation settings |

## Why seven and not fewer / more

- **Overview** needs to be its own screen — it's the single thing the customer opens by default. Without it, you have to navigate to find out what's wrong.
- **Products** is the right home for the catalogue — it's how customers enumerate what they have, not how they reach a single one (that's via deep links from elsewhere).
- **Reports & Dashboards** has to be separate from Products — items in this library belong to a product but the library itself is a cross-product concept.
- **Subscriptions** stands alone because the business question ("what's renewing, what's expiring?") is different from the navigation question ("open Pulse").
- **Insights** is distinct from Reports & Dashboards because the user goal is different — Insights are advisory and curated, Reports & Dashboards are a searchable catalogue.
- **Administration** is its own area because admins need a focused workspace that doesn't compete with the operator UI every time they go to manage users.
- **Settings** is conventional and low-cost to add.

## Things that are NOT primary nav areas

| Concept | Why it's not its own area |
|---|---|
| Help | Header icon, not nav area |
| Notifications | Header icon, not nav area |
| Search | Cross-cutting; exists as a global search overlay |
| User profile / logout | Account menu in header |
| Customer selector (when present) | Persistent header element, not a screen |

## Edge cases to confirm with James (not yet decided)

- Should **Favourites** be a top-level nav area? Currently part of Overview and Reports library. PRD doesn't elevate it.
- Should **Insights** be a fifth priority after Phase 4, or fold into Overview as a sub-section? PRD treats them as separate areas.
