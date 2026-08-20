# Data Model

**Status: skeleton.** Filling this in requires resolving the §16 blockers. Until then, this is the shape Beacon will consume from, not the shape Beacon will own.

## What Beacon owns authoritatively

- Customer-level preferences (Settings)
- Customer-level favourites and recently-viewed lists (per user)
- Beacon's own dashboards / insights (Phase 4+)
- Audit and access logs (per NFR-005)

## What Beacon consumes (no local copy)

Per PRD §13:

- **Product catalogue** — from QUEDERA platform service
- **Subscriptions** — from subscription / commercial service
- **Identity** — from enterprise identity service
- **Authorisation** — from QUEDERA access-control service
- **Pulse / Duet / Atlas data** — from each product's own service
- **Beacon data** — owned by Beacon itself (executive insights)

## Implication

Beacon doesn't need a database product entries, subscription records, or product data. Beacon needs *interfaces* to read those from, and a small store for its own concerns (preferences, favourites, audit).

**Until those interfaces exist (see `risks/register.md`), Beacon has nothing to read from.**

## Open shape (when blockers clear)

| Entity | Owner | Beacon's relationship |
|---|---|---|
| `Customer` | platform service | read |
| `User` | identity service | read |
| `Product` (catalogue entry) | platform service | read |
| `Subscription` | commercial service | read |
| `Entitlement` | access-control service | read; enforces NFR-001 |
| `Report` / `Dashboard` / `Scorecard` | per product | index (read summaries) and link out |
| `Favourite` | Beacon | own |
| `RecentlyViewed` | Beacon | own |
| `Notification` | Beacon | own (FR-016) |
| `AuditEvent` | Beacon | own (NFR-005) |

The "what to index" question for Reports / Dashboards / Scorecards is open — see `docs/open-questions.md` Q5.
