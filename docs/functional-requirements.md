# Functional Requirements

PRD §6 — all 20 FRs with area, requirement, and priority (Must / Should).

## Source-of-truth table

| ID | Area | Requirement | Priority |
|---|---|---|---|
| FR-001 | Customer Context | Identify the active customer / organisation and display it prominently in the authenticated shell. | Must |
| FR-002 | Portfolio Overview | Display all products available to the customer, including products not currently subscribed to where discovery is permitted. | Must |
| FR-003 | Product Status | Each product card shall show subscription / access state such as Active, Trial, Expiring, Suspended, or Not Subscribed. | Must |
| FR-004 | Product Access | Launch a product directly from its Beacon product card or detail page when entitled. | Must |
| FR-005 | Product Detail | Each product shall have a standard detail view containing description, capabilities, subscription status, users / access, and relevant content. | Must |
| FR-006 | Subscriptions | Consolidated view of subscriptions across Pulse, Duet, Atlas, and Beacon. | Must |
| FR-007 | Subscription Dates | Display plan start / end dates, renewal dates, and relevant status indicators where data is available. | Must |
| FR-008 | Entitlements | Show product entitlements such as modules, environments, seats, or usage allowances where applicable. | Should |
| FR-009 | Reports Library | Central searchable library of reports, dashboards, and scorecards across all QUEDERA products. | Must |
| FR-010 | Filtering | Filter reporting content by product, type, status, owner, and date where applicable. | Must |
| FR-011 | Search | Search report / dashboard title, description, product, and relevant metadata. | Must |
| FR-012 | Favourites | Favourite products, dashboards, and reports. | Should |
| FR-013 | Recently Viewed | Recently accessed content for the current user. | Should |
| FR-014 | Deep Linking | Support deep links into the originating product while preserving customer context. | Must |
| FR-015 | Cross-Product Insights | Surface selected executive insights across the portfolio without duplicating the full product experience. | Should |
| FR-016 | Notifications | Actionable notifications relating to subscriptions, access, product status, and important reports. | Should |
| FR-017 | Administration | Authorised customer administrators can manage user access to products and content. | Must |
| FR-018 | Access Control | All product and content visibility respects customer, user, role, and entitlement permissions. | Must |
| FR-019 | Audit | Material access and administration actions shall be auditable. | Must |
| FR-020 | Responsive UX | Desktop and tablet layouts in scope; mobile for a later phase. | Should |

## Counts

- 13 **Must** (FR-001, 002, 003, 004, 005, 006, 007, 009, 010, 011, 014, 017, 018, 019)
- 7 **Should** (FR-008, 012, 013, 015, 016, 020)
- Total: **20** (matches PRD §6 framing)

## Phase mapping

| Phase | Likely FR coverage |
|---|---|
| Phase 1 – Foundation | FR-001, 002, 003, 004, 017, 018 (shell, customer context, product catalogue, access control) |
| Phase 2 – Reports Hub | FR-005, 009, 010, 011, 012, 013 |
| Phase 3 – Subscriptions | FR-006, 007, 008 |
| Phase 4 – Insights | FR-015 |
| Phase 5 – Optimisation | FR-016 + recommendation layer |

**Note:** This is a working hypothesis, not a commitment. See `architecture/data-model.md` for the data-side dependencies that gate any of these.
