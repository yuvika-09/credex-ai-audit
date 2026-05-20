# Round 2 Reflection

## 1. The hardest bug I hit during Round 2

The hardest bug during Round 2 was that pricing changes were being detected correctly, but updated audits still showed the exact same savings values as previous audits.

At first, I assumed the issue was with Firestore writes or the pricing snapshot comparison logic. I verified that:
- pricing snapshots were saving correctly
- pricing differences were being detected
- updated audits were being written to Firestore

Despite that, the “Previous Audit” and “Updated Audit” sections always displayed identical savings numbers.

I debugged the issue by tracing the entire re-audit workflow step by step:
1. snapshot comparison
2. pricing update detection
3. audit recalculation
4. Firestore updates
5. diff page rendering

Eventually, I discovered the actual issue inside the audit engine itself. Even though I had introduced a centralized `currentPricing.ts` file, the audit engine still relied on hardcoded pricing values internally, such as:

```ts
20 * seats
```

instead of consuming dynamic pricing data from the centralized pricing source.

As a result, pricing updates had no real impact on recalculated audits.

I refactored the audit engine to use centralized pricing dynamically, and the diff system immediately started working correctly.

The second major issue involved stale React state during re-audit email notifications. The audit page loaded before Firestore updated with the captured email address, causing `audit.email` to remain undefined locally even though Firestore already contained the value.

I solved this by synchronizing local React state immediately after lead capture instead of relying entirely on a fresh Firestore fetch.

This round reinforced how many real engineering bugs are integration and state synchronization problems rather than syntax errors.

---

## 2. A decision I reversed mid-way

Initially, I planned to overwrite existing audits whenever pricing changed because I assumed users only cared about the latest recommendation state.

Midway through implementation, I realized this would make debugging extremely difficult and would completely remove historical context. If a user wanted to understand why their recommendations changed, there would be no way to compare old calculations against updated ones.

I reversed the design and introduced:
- `previousAudit`
- `updatedAudit`

as separate persisted states.

This significantly improved:
- traceability
- debugging
- product realism
- UX clarity

It also made the diff page much more meaningful because users could visually compare changes over time instead of simply seeing updated numbers.

The tradeoff was increased Firestore complexity and additional UI logic, but the architecture became much stronger and closer to how real financial reporting systems work.

---

## 3. What I would build next with more time

If I had another week, I would focus on transforming the project from a manually triggered re-audit workflow into a fully automated monitoring platform.

The biggest missing feature is scheduled re-auditing. Right now, pricing changes only matter if a user manually clicks “Re-check Pricing.” In production, I would implement:
- scheduled background jobs
- automated vendor pricing checks
- automatic audit recalculation
- notification batching

I would also improve pricing ingestion itself. Currently, pricing updates are manually maintained inside `currentPricing.ts`. A real production system would ingest pricing directly from:
- official APIs
- structured scraping pipelines
- pricing verification jobs

On the frontend side, I would improve the diff experience with:
- before/after recommendation cards
- animated savings deltas
- pricing trend charts
- historical audit timelines

Finally, I would build an internal admin dashboard for:
- pricing update history
- re-audit activity
- lead conversion tracking
- notification metrics

At that point, the product would start resembling a real continuously updating AI infrastructure optimization platform rather than a static calculator.

---

## 4. How I used AI tools

I used ChatGPT heavily throughout both rounds for:
- debugging assistance
- architecture brainstorming
- TypeScript fixes
- React state debugging
- documentation drafting
- linting issue resolution

I treated AI primarily as an iterative engineering assistant rather than a code generator.

I did not trust AI-generated code blindly, especially during integration-heavy parts of the project. Most debugging still required manually tracing:
- Firestore document structures
- React state updates
- EmailJS variable mappings
- pricing calculation flows

One specific example where AI-generated logic initially failed was during the pricing re-audit implementation. The suggested architecture correctly introduced centralized pricing, but the actual audit engine still contained hardcoded pricing values internally. The result was that pricing changes appeared to work while updated audits remained identical.

I caught this by manually tracing savings calculations and comparing expected versus actual outputs after changing pricing values.

I also discovered several smaller integration bugs that AI did not detect automatically:
- stale local audit state
- EmailJS template variable mismatches
- invalid string matching caused by `"Buisness"` vs `"Business"`

AI accelerated development significantly, but validating assumptions manually remained critical throughout the project.

---

## 5. Self-rating

### Discipline — 8/10

I stayed consistent through debugging-heavy parts of the implementation and continued iterating through difficult integration issues instead of abandoning the architecture midway.

### Code Quality — 8/10

The codebase became significantly cleaner after centralizing pricing logic and separating concerns properly. There are still areas I would refactor further with more time, especially around shared types and Firestore data access layers.

### Design Sense — 7/10

The UI is clean, readable, and functional, especially the audit results and diff workflows. However, visual polish could still improve further with more advanced interactions and animations.

### Problem Solving — 9/10

Most of Round 2 involved debugging distributed state and integration workflows rather than writing isolated features. I handled multiple architecture and synchronization issues while continuing to improve the maintainability of the system.

### Entrepreneurial Thinking — 8/10

I focused heavily on making the product feel like a real SaaS workflow instead of a coding assignment. Features like pricing snapshots, re-audit notifications, and audit versioning were designed around retention and long-term product utility rather than simply satisfying feature requirements.