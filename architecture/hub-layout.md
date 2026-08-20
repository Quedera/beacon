# Hub Layout

PRD §17 — what Beacon looks like at the chrome level.

## The shape

```
┌─────────────────────────────────────────────────────────────────────┐
│  Global header: QUEDERA / BEACON · customer selector · 🔔 · ❓ · 👤   │
├──────────────┬──────────────────────────────────────────────────────┤
│              │                                                       │
│  Left nav:   │   Main content area                                   │
│              │                                                       │
│  • Overview  │   (Page-level: portfolio cards, subscriptions grid,   │
│  • Products  │    reports library, etc.)                             │
│  • Reports & │                                                       │
│    Dashboards│                                                       │
│  • Subscrip'ns│                                                      │
│  • Insights  │                                                       │
│  • Admin     │                                                       │
│  • Settings  │                                                       │
│              │                                                       │
└──────────────┴──────────────────────────────────────────────────────┘
```

## Page-level content (§17 + §7)

| Page | What it shows |
|---|---|
| Overview | Portfolio health · four product cards · action centre · recent / favourite content |
| Products | Four branded product cards with status, subscription summary, Open Product action |
| Reports & Dashboards | Unified searchable table / grid with Product and Type filters |
| Subscriptions | Consolidated subscription cards / table with status and renewal information |
| Insights | Executive cross-product view with drill-through to originating products |
| Administration | (Per FR-017 — customer admin manages users and access) |
| Settings | (Customer preferences) |

## Persistent header contract

The global header stays the same on every screen, including:

- Active customer / organisation selector (FR-001)
- Notifications icon (FR-016)
- Help (where relevant)
- User profile / logout

This is the "always show the active customer context" rule from §11 — the header makes it impossible to be confused about which customer's data you're seeing.

## Left-nav contract

The left navigation is invariant across products. Once you deep-link into Pulse, Pulse takes over its own chrome (PRD §11 line). The Beacon left-nav doesn't follow you in.
