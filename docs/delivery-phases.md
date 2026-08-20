# Delivery Phases

PRD §15 — five phases, no dates.

| Phase | Scope | Outcome |
|---|---|---|
| **Phase 1 – Foundation** | Beacon shell, customer context, product catalogue, navigation, access control | Single authenticated QUEDERA portfolio entry point |
| **Phase 2 – Reports Hub** | Central dashboards / reports, search, filtering, favourites, recent content | One place to find all customer reporting |
| **Phase 3 – Subscriptions** | Plans, entitlement status, renewal dates, admin views | Consolidated subscription centre |
| **Phase 4 – Insights** | Cross-product KPIs, action centre, executive portfolio view | Beacon becomes portfolio intelligence layer |
| **Phase 5 – Optimisation** | Recommendations, usage analytics, advanced administration | More proactive customer experience |

## What's NOT in any phase yet

The PRD has no date for any phase and no in-flight commitment from Craig or James to ship one in particular. The blocking risks (see `risks/register.md`) have to clear before Phase 1 even starts.

## My read

**Don't build Phase 1 until §16's three blockers are closed.** A portal with two empty product cards (Pulse, Atlas) is a demo, not a product. Even Phase 1's "Foundation" is gated by:

- A working identity / entitlement service (or explicit decision to mock it for the prototype)
- A working subscription / commercial service (or explicit decision to mock it)
- An agreed customer / tenancy model

Working hypothesis: Phase 1 doesn't start until at least Pulse and Atlas have working data surfaces. Pulse is the nearest to having something; Atlas is design-only per Craig + James's note in `#beacon`.

## Recommended sequencing

1. **Wait for Pulse + Atlas to have something to surface.** No need to be GA; even a "minimum viable data surface" is enough to make Phase 1's product cards come alive.
2. **Pick the hosting target first.** This gates §16 row 2 (Subscription source — what API contract exists?)
3. **Decide on the IdP question.** Build, buy, or hand off to a third-party service (Auth0, Entra ID, etc.).
4. **Then** pick the phase 1 scope and a target date.
