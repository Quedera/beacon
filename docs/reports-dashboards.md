# Central Reports & Dashboards Requirements

PRD §10 — the unified reporting library.

| Capability | Requirement |
|---|---|
| All Content | Unified view of dashboards, reports, and scorecards from all entitled products. |
| Product filter | Pulse / Duet / Atlas / Beacon. |
| Content type | Dashboard / Report / Scorecard / Executive Insight. |
| Search | Title, description, metadata. |
| Sort | Name, product, type, last updated, relevance. |
| Actions | Open, favourite, share (where permitted), more actions. |
| Product context | Every item identifies its originating product. |
| Access | Only show / open content the user is entitled to access. |
| Freshness | Last updated date and, where relevant, data freshness. |

## Phase

Phase 2 — Reports Hub. Gated by what Pulse / Duet / Atlas expose (per §13 systems-of-record table). If two of the four products have no data, this view is half-empty by definition.

## Read-write scope

This is read-only surfacing, not authoring. "Building dashboards" stays in the originating product. Beacon doesn't compete with Pulse / Duet / Atlas as a fifth analytics tool — that's the §11 line.
