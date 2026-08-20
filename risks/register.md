# Risk Register

PRD §16 — the seven risks James flagged, with a status column reflecting the conversation that followed.

## The seven

| # | Topic | Risk / decision required | Status | Gates phase |
|---|---|---|---|---|
| 1 | **Brand hierarchy** | Confirm whether Beacon is the visible umbrella brand or simply the technology hosting the portfolio hub. | **Open** — sensible default is umbrella (per `architecture/brand-hierarchy.md`); needs Craig + James to sign off | Phase 1 |
| 2 | **Subscription source** | Confirm authoritative commercial / subscription system and API contract. | **Blocker** — no such service exists yet. Beacon has nothing to read from. | Phase 1 (subscriptions view) Phase 3 (centre) |
| 3 | **Identity** | Define SSO, customer tenancy, and cross-product session behaviour. | **Conflict** — PRD §2.2 says no IdP in scope; NFR-001 requires server-side entitlement enforcement. Resolvable via "build" / "buy" / "borrow" decision. | Phase 1 |
| 4 | **Entitlements** | Standardise how each product exposes plans, modules, seats, and access state. | **Open** — depends on Pulse / Duet / Atlas standardising before Beacon can render consistently. | Phase 1 (access control) Phase 3 (entitlements) |
| 5 | **Content metadata** | Agree common metadata model for dashboards / reports across products. | **Open** — depends on each product tagging its reports / dashboards similarly. | Phase 2 |
| 6 | **Cross-product metrics** | Define which metrics Beacon may aggregate and how freshness is represented. | **Open** — depends on what Pulse / Duet / Atlas expose. | Phase 4 |
| 7 | **Admin model** | Agree Customer Administrator vs QUEDERA Administrator responsibilities. | **Open** — Craig as brand owner of record suggests Customer Admin is the customer-side scope; QUEDERA Admin is a separate (out-of-scope-per-§2.2) concern. | Phase 1 (Foundation) |

## Severity ranking (working hypothesis)

| Rank | Risk | Why |
|---|---|---|
| **Tier 1 — Block Phase 1** | #2 Subscription source, #3 Identity | Beacon literally can't render anything that needs them |
| **Tier 2 — Block Phase 2** | #5 Content metadata | Reports library needs consistent metadata |
| **Tier 3 — Block Phase 3** | #4 Entitlements | Subscription centre needs entitlement surface |
| **Tier 4 — Block Phase 4** | #6 Cross-product metrics | Insights need aggregation surface |
| **Tier 5 — Slow but not blocking** | #1 Brand hierarchy, #7 Admin model | Can be defaulted and ratified later |

## Mitigation patterns

- **For Tier 1 risks** — Sequence the decisions before scoping Phase 1. A "decision-first" workshop is the natural shape.
- **For Tier 2-4 risks** — Build the contracts early. Even mocks with stable shape let Beacon start the UI work.
- **For Tier 5 risks** — Document the working hypothesis and explicitly note it's a default until ratified (see `docs/open-questions.md`).

## Sequencing rule

**Don't start Phase 1 (Foundation) until Tier 1 risks close.** A portal with two empty product cards isn't a control centre — it's a demo.

## Compared to MEMORY.md's compressed §16

Earlier sessions compressed §16 down to "Pulse+Atlas design-only, no commercial API, no IdP". That was useful but underspecified. The actual PRD §16 has **seven** distinct risks; the three "compressed" ones map to:

- "Pulse + Atlas design-only" → #6 Cross-product metrics (Tier 4, not Tier 1)
- "No commercial API" → #2 Subscription source (Tier 1)
- "No IdP" → #3 Identity (Tier 1)

So Tier 1 is broader than the compressed version: two distinct blockers, not one.

## Open questions for James (when the time comes)

- Confirm the Tier 1 / Tier 2 ranking above.
- Confirm the "decision-first workshop" mitigation pattern is acceptable, or propose an alternative.
- Confirm anyone on the team owns these risks, or whether Craig (as brand owner) is the natural owner by default.
