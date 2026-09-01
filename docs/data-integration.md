# Integration & Data

PRD §13 — the systems-of-record table. Beacon consumes authoritative product and subscription metadata through well-defined service interfaces. **Beacon does not become the system of record for operational data owned by Pulse, Duet, or Atlas.**

## Source-of-truth table

| Domain | System of record | Beacon responsibility |
|---|---|---|
| Product catalogue | QUEDERA platform service | Display product metadata and availability |
| Subscriptions | Subscription / commercial service | Display status, dates, entitlements |
| Identity | Enterprise identity service | Authenticate and provide user identity |
| Authorisation | QUEDERA access-control service | Enforce product / content permissions |
| Pulse data | QUEDERA Pulse | Surface approved metrics / content |
| Duet data | QUEDERA Duet | Surface approved metrics / content |
| Atlas data | QUEDERA Atlas | Surface approved metrics / content |
| Beacon data | QUEDERA Beacon | Own and render executive insights |

## Implications

1. **No data duplication.** Beacon is a presentation layer over authoritative services, not a database.
2. **Every status Beacon shows must be traceable to a source service.** If Pulse is the system of record for "Pulse subscription status" and Pulse's status disagrees with what Beacon shows, that's a bug in Beacon — not Pulse.
3. **The integration surface IS the product surface.** Until the subscription and identity services exist (§16 risks), Beacon is conceptually buildable but practically blocked at Phase 1.

See `risks/register.md` for the full register of architectural decisions blocking delivery.
