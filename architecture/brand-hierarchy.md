# Brand Hierarchy

PRD §4 + §4.1 — the brand layer cake and how it manifests in UI. This is NFR-006 ("architecture must support adding future QUEDERA products without redesigning the core information architecture") made concrete.

## The hierarchy

```
QUEDERA           ← master brand (everywhere in chrome)
└── BEACON        ← hub brand (this product)
    ├── Pulse     ← ITSM maturity (separate product)
    ├── Duet      ← Service transition (separate product)
    ├── Atlas     ← SaCM/CMDB discovery (separate product)
    └── Beacon    ← Executive dashboards (separate product, also hosted here)
```

## Brand layer rules

| Brand layer | Rule |
|---|---|
| **Master brand — QUEDERA** | Persistent in global navigation and authenticated shell. Never replaced. |
| **Hub brand — BEACON** | Positioned as the central intelligence and portfolio hub. |
| **Pulse** | Retain QUEDERA Pulse identity for ITSM maturity and continual improvement. |
| **Duet** | Retain QUEDERA Duet identity for structured service transition. |
| **Atlas** | Retain QUEDERA Atlas identity for SaCM / CMDB discovery and validation. |
| **Beacon (as product)** | Retain QUEDERA Beacon identity for executive dashboards and actionable insights. |
| **Visual system** | Shared typography, spacing, accessibility, components, interaction patterns. Product-specific accent / iconography where appropriate. |

## How it shows up in the UI

| Surface | What you see |
|---|---|
| Browser tab / app shell | QUEDERA + BEACON lockup |
| Global header (left) | QUEDERA logo + BEACON product mark |
| Product cards | Product name + product-specific iconography + product accent colour where appropriate |
| Product detail header | Same product name + product iconography, but inside a Beacon shell |
| Inside a product (deep link) | Switch to that product's native chrome — Beacon global nav stays |
| Audit log entries | `quedera.beacon.<action>` style namespace, not `pulse.<action>` |
| API responses | `/api/v1/...` rooted at the Beacon service, not per-product sub-paths |

## Breadcrumb convention

```
Overview › Products › Pulse › Subscriptions
   |         |         |          |
   BEACON   BEACON   Pulse    (Pulse-relative)
```

The hub-level layers never change. The product layer changes based on context. This keeps the IA product-agnostic above the fold.

## What this is NOT

- Not a navigation depth problem. We're not adding a sixth layer; we're making the top layer carry into the chrome.
- Not a competitive brand fight. Pulse / Duet / Atlas retain their identity and their own navigation inside their own products. Beacon just owns the cross-product layer above them.
- Not a marketing claim. This is operational: the IA has to be invariant to which products exist, so the cost of adding a fifth product is one new card, not a redesign.
