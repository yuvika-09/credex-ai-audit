# Round 2 — Pricing Re-Audit Workflow

## Overview

For Round 2, I extended the AI Spend Audit platform with a pricing re-audit system that allows previously generated audits to be recalculated whenever vendor pricing changes.

The system stores historical pricing snapshots with each audit, compares those snapshots against the latest pricing configuration, recalculates recommendations dynamically, preserves previous audit states, and notifies users when their savings opportunities change.

This transforms the project from a one-time calculator into a continuously updateable audit platform.

---

# What I Built

## 1. Centralized Dynamic Pricing System

I moved all pricing values into a dedicated `currentPricing.ts` source-of-truth file.

Previously, pricing logic was hardcoded directly inside the audit engine. That approach prevented future recalculations from reacting to pricing updates.

The new structure enables:

- Dynamic recalculation
- Easier vendor pricing maintenance
- Snapshot comparisons
- Cleaner architecture separation

---

## 2. Pricing Snapshot Persistence

Every audit now stores a complete pricing snapshot at the moment it is generated.

Example:

```ts
pricingSnapshot: {
  cursor_pro: 20,
  cursor_business: 40,
  chatgpt_plus: 20,
  chatgpt_team: 30
}