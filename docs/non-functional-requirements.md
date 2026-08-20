# Non-Functional Requirements

PRD §12 — all 8 NFRs with category and requirement.

## Source-of-truth table

| ID | Category | Requirement |
|---|---|---|
| NFR-001 | Security | All requests must enforce customer and user entitlement boundaries **server-side**. |
| NFR-002 | Performance | Beacon home page should target a responsive initial experience and progressively load secondary content. |
| NFR-003 | Availability | Meet the agreed QUEDERA SaaS availability target. |
| NFR-004 | Accessibility | Target WCAG 2.2 AA for core customer journeys. |
| NFR-005 | Auditability | Administrative and access-sensitive actions must generate audit records. |
| NFR-006 | Scalability | Architecture must support adding future QUEDERA products **without redesigning the core information architecture**. |
| NFR-007 | Observability | Product integrations and content synchronisation failures must be detectable and diagnosable. |
| NFR-008 | Data Integrity | Subscription and entitlement status must have a defined **authoritative source**. |

## Hidden contract

These look like the usual NFR list, but two of them are doing structural work:

- **NFR-001** *requires* an identity provider / entitlement service — yet PRD §2.2 explicitly excludes building one. This is the conflict flagged in `risks/register.md`.
- **NFR-006** *requires* a navigational architecture that's product-agnostic — which is exactly the "QUEDERA → BEACON → Product Portfolio → Product → Capability → Report" hierarchy. The IA has to survive adding Pulse / Atlas / Duet / Beacon and any future products without a fork-and-redesign.

The rest (NFR-002, 003, 004, 005, 007, 008) are conventional. NFR-008 in particular pairs with §13's systems-of-record table — Beacon must consume authoritative state, never invent it.
