# Reflection

## 1. The hardest bug I hit this week, and how I debugged it

The hardest issue I encountered was related to generating AI summaries using the OpenAI SDK inside a client component. Initially, I imported the OpenAI logic directly into a React client component because it felt simpler during early prototyping. The feature worked inconsistently locally, but eventually failed with credential errors during development and deployment.

The issue became clearer after inspecting browser console errors and realizing the OpenAI SDK was being executed client-side, where environment variables are not securely available. At first I thought the API key itself was incorrect, but after tracing the import chain and checking where the SDK was initialized, I realized the architectural mistake was exposing server-side logic inside a client-rendered component.

I fixed this by moving AI summary generation into a dedicated Next.js API route. The frontend now calls the route through `fetch()`, while the OpenAI SDK and credentials remain server-side only. This also improved the overall architecture because secrets are now isolated properly and the frontend no longer directly depends on the SDK.

The debugging process reinforced the importance of understanding rendering boundaries in Next.js App Router instead of only focusing on “making the feature work.”

---

## 2. A decision I reversed mid-week, and what made me reverse it

One major decision I reversed was the transactional email provider.

I initially implemented the email workflow using Resend because it had a clean developer experience and good documentation. The backend integration itself worked correctly, but during testing my account was temporarily suspended by automated platform checks. Rather than spending several hours trying to recover the account and potentially blocking the rest of the assignment timeline, I decided to pivot quickly.

I migrated the transactional email flow to EmailJS instead. While EmailJS is less backend-centric architecturally, it allowed me to maintain the required product workflow without delaying the project.

The important lesson for me was that shipping momentum matters. A technically “ideal” choice is not always the correct decision under deadline constraints. I also learned the value of loosely coupling external integrations so providers can be swapped without rewriting the entire feature.

---

## 3. What I would build in week 2 if I had it

If I had another full week, I would focus less on adding isolated features and more on making the audit engine substantially smarter and more defensible.

The current implementation uses deterministic optimization rules, which are intentionally simple and explainable. In week 2 I would expand this into a more sophisticated recommendation system using:
- usage thresholds
- role-based recommendations
- developer-to-tool ratios
- API spend analysis
- benchmark comparisons across company sizes

I would also build:
- dynamic Open Graph image generation
- PDF export functionality
- analytics instrumentation
- referral tracking
- admin dashboards
- pricing synchronization from vendor APIs

On the growth side, I would heavily improve the viral loop. Shareable audits are already implemented, but I would add benchmarking features such as:
“Your AI spend per engineer is 38% above companies your size.”

That type of comparison would likely increase social sharing significantly.

---

## 4. How I used AI tools

I used ChatGPT heavily throughout the project for:
- debugging assistance
- TypeScript fixes
- architecture brainstorming
- CI troubleshooting
- copywriting support
- documentation drafting

I also used AI tools for generating and refining UI copy, improving metadata descriptions, and validating edge cases in the audit engine.

However, I intentionally avoided using AI for the core audit calculations themselves. Financial recommendations need deterministic and explainable logic, so I implemented those rules manually instead of relying on generated outputs.

One specific case where AI was wrong was during the OpenAI integration. An earlier implementation suggestion placed OpenAI SDK usage directly inside a client component, which caused credential exposure issues and deployment failures. I caught this after reviewing how Next.js client/server boundaries work and refactored the implementation into secure API routes.

That experience reinforced that AI is extremely useful for acceleration, but architectural judgment still requires human validation.

---

## 5. Self-rating

### Discipline — 8/10

I maintained consistent daily progress across multiple days, documented work regularly, and kept commits incremental rather than batching everything together at the end.

---

### Code Quality — 7/10

The project architecture is reasonably clean, typed, tested, and production-oriented for an MVP, though several areas could still benefit from stronger abstraction and stricter schema validation.

---

### Design Sense — 7/10

The UI is visually consistent, responsive, and shareable, but I focused more heavily on shipping product functionality than advanced visual design polish.

---

### Problem Solving — 8/10

I encountered multiple integration and deployment issues throughout the project and was able to debug them systematically rather than abandoning features or relying on workarounds.

---

### Entrepreneurial Thinking — 8/10

I tried to approach the assignment as an actual lead-generation SaaS product rather than a coding challenge, especially around shareability, friction reduction, and user acquisition loops.