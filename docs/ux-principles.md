# UX & Navigation Principles

PRD §11 — the design rules.

## The principles

- Beacon should feel like a **control centre**, not a fifth operational product competing with Pulse / Duet / Atlas.
- Global navigation stays stable regardless of which product is selected.
- Product identity visible at the point of discovery and access (cards, headers, deep-link landing).
- Consistent card, table, filter, status, and notification patterns across the hub.
- Minimise duplicate navigation: once inside a product, users experience that product's native workflow.
- **Always show the active customer context** to prevent cross-customer confusion.
- Important actions explicit and understandable without product-specific knowledge.

## What this means in practice

| Pattern | Rule |
|---|---|
| Header chrome | QUEDERA + BEACON brand identity, customer selector / context, notifications, help, profile |
| Navigation | Seven primary areas (see `architecture/information-architecture.md`) — global, persistent, never re-themed per product |
| Product cards | Branded per product, but use the Beacon card + filter + status grammar consistently |
| Notifications | Surfaced once in Beacon shell; product-level notifications should defer to the originating product once clicked into |
| Tables / lists | One column vocabulary across Beacon — Product, Type, Status, Owner, Last Updated |
| Status badges | Five-state enum everywhere: Active / Trial / Expiring / Suspended / Not Subscribed |

## Design debt to avoid

Building product-specific navigation patterns inside Beacon. The moment Beacon shows a different sub-nav per product it's a fifth product, not a control centre.
