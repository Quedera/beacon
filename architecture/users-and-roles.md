# Users & Roles

PRD §5 — five user roles with primary needs and typical permissions.

## The five roles

| Role | Primary needs | Typical permissions |
|---|---|---|
| **Executive** | High-level insight, risk, performance, and strategic dashboards | View assigned products / content |
| **Service Manager** | ITSM, transition, CMDB, and operational reports | View; possibly contribute depending on product |
| **Product / Platform Owner** | Product status, adoption, and data quality | View and manage relevant product content |
| **Customer Administrator** | Users, roles, subscriptions, and access | Manage users / access; view subscription information |
| **QUEDERA Consultant** | Deliver services and review customer outcomes | Scoped customer / product access |

## Role-based visibility (NFR-001 / FR-018)

Every screen must respect:

- **Customer tenancy** — never mix data across customers.
- **User identity** — pin to the authenticated user.
- **Role** — determine which primary areas appear, and which items within them.
- **Entitlement** — the final say on whether a specific item (product, report, etc.) is visible.

Combine: a user is who they are, with a role, on behalf of a customer, with a set of entitlements. Every page query is bounded by all four.

## Things explicitly NOT roles

- **"Anonymous"** — Beacon is fully authenticated; there's no public-facing Beacon surface.
- **"Super admin"** — the QUEDERA-side admin role isn't a Beacon role per PRD. The §16 "Admin model" risk notes this needs agreement.

## What this means for the prototype

Even the prototype (if we build one) needs at least three roles wired: Customer Administrator, Service Manager, Executive. Service Manager is the natural "power user" — sees most content but can't administer users. Executive is the natural "view-only" customer demo persona.
