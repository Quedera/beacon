# Open Questions

PRD §18 — eight questions James flagged as unresolved. **All eight are still open as of v0.1.0** — none have been answered in any post-PRD conversation.

| # | Question |
|---|---|
| 1 | Should non-subscribed products be visible for discovery, or only subscribed products? |
| 2 | Should Beacon allow customers to request additional products / subscriptions? |
| 3 | Who owns the customer / product access model? |
| 4 | Should subscription pricing be visible to customer administrators? |
| 5 | Should dashboards be embedded in Beacon or opened in their originating product? |
| 6 | What level of cross-product data aggregation is required for Beacon MVP? |
| 7 | What notification channels are required: in-app, email, or both? |
| 8 | Which QUEDERA brand guidelines, product icons, and colour tokens are already approved? |

## Working hypotheses (not commitments)

For anyone reading this without time to track the answers:

- **Q1** — Default to **yes**, show non-subscribed products as "Available — request access" cards. Drives discovery.
- **Q2** — Default to **yes** — Beacon is the natural place; product pages deep-link to a Beacon-hosted request form.
- **Q3** — Default to **Craig** for QUEDERA-side ownership; **Customer Administrator** role owns per-customer access (per PRD §5).
- **Q4** — Default to **yes for admins, no for executives** (matches role-based visibility in PRD §11).
- **Q5** — Default to **embedded** where product APIs support it, deep-link where they don't (graceful degradation).
- **Q6** — Default to **aggregated KPIs only** for Phase 4. Drill-through defers to the originating product.
- **Q7** — Default to **both**. In-app is non-negotiable; email is the obvious Phase 5 extension.
- **Q8** — Tied to the QUEDERA wordmark project (see `quedera/brand/reference/gaps-and-roadmap.md`). No product-level icons or palette yet.

> These are reading guides, not decisions. James and Craig (the brand owner of record) haven't agreed to any of them — flag if you disagree.
