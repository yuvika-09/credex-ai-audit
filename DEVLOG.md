# DEVLOG

## Day 1 — 2026-05-06

**Hours worked:** 2

**What I did:**
- Initialized the project using Next.js 16 with TypeScript, Tailwind CSS, App Router, and ESLint.
- Set up the initial project structure and cleaned the default starter page.
- Created core folders including `components`, `lib`, `data`, `types`, `utils`, and `tests`.
- Installed initial dependencies such as Firebase, Resend, Zod, UUID, Lucide React, and Vitest.
- Created all required markdown documentation files mentioned in the assignment instructions.
- Initialized Git and prepared the repository structure for daily commits and CI setup.
- Began Firebase setup by creating environment variable placeholders and configuring the Firebase initialization file.

**What I learned:**
- Next.js App Router structure is cleaner for dynamic routes like shareable audit URLs.
- The assignment places heavy emphasis on documentation quality, consistency, and product thinking in addition to code quality.
- A rule-based audit engine will likely be more reliable and defensible than relying entirely on AI-generated recommendations.

**Blockers / what I'm stuck on:**
- Still deciding the exact recommendation logic and thresholds for determining when a team is overspending versus already on an optimal plan.
- Need to research current pricing models carefully because pricing structures differ significantly between seat-based plans and API usage pricing.

**Plan for tomorrow:**
- Build the spend input form UI.
- Add localStorage persistence for form state.
- Start collecting and structuring pricing data from official vendor pricing pages.
- Design the first version of the audit engine logic.


------------


## Day 2 — 2026-05-07

**Hours worked:** 5

**What I did:**
- Built the core spend input form UI using React client components and Tailwind CSS.
- Added support for multiple AI tools with dynamic form entries including tool name, plan, monthly spend, and seat count.
- Implemented persistent form state using localStorage so audit inputs survive page reloads.
- Improved the UI styling for dark mode readability and added reusable input styling across the form.
- Created the initial rule-based audit engine to evaluate AI tool overspending scenarios.
- Added recommendation logic for cases such as:
  - ChatGPT Team being unnecessary for very small teams
  - Cursor Business overkill for low seat counts
  - Claude Team downgrade suggestions
- Added monthly and annual savings calculations.
- Implemented conditional Credex recommendation logic for high-savings audits.
- Built the first audit results interface showing:
  - total savings
  - annual savings
  - per-tool recommendations
  - reasoning for each recommendation
- Integrated Firebase Firestore and created logic to save completed audits into the database.
- Implemented unique shareable audit URLs using Firebase document IDs.
- Built dynamic audit result pages using Next.js dynamic routes.
- Fixed a Next.js 16 issue related to async route params in client components using React `use()` for resolving params.
- Verified that audit data is correctly stored and retrieved from Firestore.

**What I learned:**
- Rule-based audit logic works better than AI-generated calculations for predictable financial recommendations.
- Firebase Firestore is fast to integrate for MVP-style products and works well for storing generated reports.
- Next.js 16 introduced async route params behavior, which required updating how dynamic routes are accessed inside client components.
- Small UX improvements like persistent form state make the app feel significantly more polished and production-like.

**Blockers / what I'm stuck on:**
- Current pricing data is still placeholder data and needs to be replaced with verified pricing from official vendor pages.
- Need to design a cleaner structure for handling different recommendation rules as the audit engine grows.
- Still need to add email capture, AI-generated summaries, Open Graph metadata, and proper social sharing previews.

**Plan for tomorrow:**
- Add AI-generated personalized summaries using Anthropic or OpenAI.
- Implement lead capture form and save lead data separately in Firestore.
- Add transactional email confirmation flow.
- Improve audit results page design and add Open Graph metadata support.
- Begin writing automated tests for the audit engine.


------------


## Day 3 — 2026-05-08

**Hours worked:** 6

**What I did:**
- Extended the application from a local-only audit tool into a backend-connected product workflow.
- Integrated Firebase Firestore for persistent audit storage.
- Implemented shareable audit URLs using dynamic Next.js routes and Firestore document IDs.
- Built dynamic audit result pages that fetch saved audit data from Firestore.
- Fixed a Next.js 16 async route params issue in dynamic client components using React `use()` for param resolution.
- Added AI-generated personalized summaries using the OpenAI API.
- Refactored AI summary generation from client-side execution into secure server-side API routes to avoid exposing API credentials.
- Implemented fallback summary handling in case the LLM request fails.
- Built a lead capture workflow with:
  - email
  - company name
  - role
  - audit association
- Added lead persistence into Firestore using a separate `leads` collection.
- Initially implemented transactional email delivery using Resend, then migrated to EmailJS after Resend account restrictions interrupted testing.
- Configured EmailJS using environment variables instead of hardcoded credentials.
- Added loading states, success states, and improved error handling for lead submission.
- Added lightweight abuse protection using a hidden honeypot field to reduce automated spam submissions.
- Improved overall audit page polish and UX consistency.

**What I learned:**
- API integrations should always be isolated behind server-side routes whenever secrets are involved.
- Next.js App Router behavior in version 16 differs significantly for dynamic params compared to older versions.
- Email providers can introduce unexpected operational constraints during MVP development, so fallback handling and provider abstraction matter.
- Small UX improvements like loading states and success feedback dramatically improve perceived product quality.

**Blockers / what I'm stuck on:**
- Need to improve audit logic sophistication beyond basic downgrade heuristics.
- Public share pages still need proper Open Graph metadata and preview images.
- Need to implement automated tests and CI pipeline before polishing the final UI.

**Plan for tomorrow:**
- Add Open Graph metadata and Twitter preview support for audit URLs.
- Implement automated tests for the audit engine.
- Setup GitHub Actions CI workflow.
- Begin populating PRICING_DATA.md using verified vendor pricing sources.
- Improve landing page polish and responsive behavior.


------------


## Day 4 — 2026-05-09

**Hours worked:** 8

**What I did:**
- Deployed the application publicly using Vercel.
- Configured production environment variables for:
  - Firebase
  - OpenAI
  - EmailJS
- Fixed deployment failures caused by missing `OPENAI_API_KEY` values in the Vercel environment configuration.
- Added Open Graph and Twitter metadata support for audit pages.
- Refactored the audit route into separate server/client components after discovering that `generateMetadata()` cannot run inside client components marked with `"use client"`.
- Implemented proper server-side metadata generation while preserving interactive Firebase client rendering.
- Added shareable Open Graph preview images for audit URLs.
- Fixed Open Graph image caching issues by renaming preview assets and updating metadata references.
- Improved metadata titles and descriptions for better social sharing previews.
- Added Vitest-based automated tests for the audit engine.
- Implemented tests covering:
  - downgrade recommendations
  - annual savings calculations
  - Credex recommendation thresholds
  - already-optimal plan handling
- Added GitHub Actions CI pipeline running lint + tests on every push to `main`.
- Refactored large parts of the application to use strict TypeScript types instead of `any`.
- Added shared audit interfaces and typed Firestore document handling.
- Fixed multiple ESLint and CI failures related to:
  - explicit `any`
  - unused imports
  - React hook warnings
- Completed major documentation files:
  - README.md
  - TESTS.md
  - ARCHITECTURE.md
  - PRICING_DATA.md
  - REFLECTION.md
  - GTM.md
  - ECONOMICS.md
  - METRICS.md
  - LANDING_COPY.md

**What I learned:**
- Next.js App Router has strict separation rules between server and client components, especially around metadata generation.
- CI pipelines expose architectural and typing weaknesses much faster than local-only development.
- Strong TypeScript typing significantly improves maintainability once the application grows beyond early prototyping.
- Open Graph metadata and preview images require careful deployment and cache handling to work reliably across platforms.

**Blockers / what I'm stuck on:**
- Try to complete real user interviews for `USER_INTERVIEWS.md`.
- Still need a final Lighthouse pass and mobile responsiveness review before submission.
- Some audit heuristics are intentionally simplified and could be expanded further with more time.

**Plan for tomorrow:**
- Conduct and document real user interviews.
- Finalize README screenshots and polish.
- Run Lighthouse audits and fix any remaining issues.
- Remove temporary debug logs and cleanup unused code.
- Perform full end-to-end production testing before submission.


---


## Day 5 — 2026-05-10

**Hours worked:** 4

**What I did:**
- Conducted conversations with potential users for the project’s user research requirement.
- Spoke with developers and startup-oriented users who actively use AI tools such as ChatGPT, Claude, Cursor, and GitHub Copilot in their workflows.
- Asked questions focused on:
  - AI subscription overlap
  - monthly spend visibility
  - team purchasing decisions
  - willingness to switch tools for cost savings
  - trust factors for an automated audit product
- Collected direct quotes and documented surprising responses for `USER_INTERVIEWS.md`.
- Updated interview notes into structured writeups including:
  - role and company stage
  - major pain points
  - contradictions in tool usage
  - product feedback
  - design implications
- Refined parts of the landing page messaging and audit positioning based on repeated feedback from interviews.
- Adjusted some wording in the app to make recommendations sound more trustworthy and less aggressive after noticing users responded better to neutral, finance-style language.

**What I learned:**
- Most users do not actually track AI tooling spend carefully, especially when purchases happen across individual employee subscriptions.
- Multiple people mentioned paying for overlapping AI tools simply because different teammates preferred different workflows.
- Users trusted deterministic savings calculations more than vague AI-generated recommendations.
- Several users said they would only share an audit publicly if the results looked benchmarkable or visually impressive.

**Blockers / what I'm stuck on:**
- Some interviewees had difficulty estimating their actual monthly AI spend because costs were spread across personal cards, startup reimbursements, and API usage.
- Need to ensure the final interview writeups remain concise while still sounding authentic and detailed.

**Plan for tomorrow:**
- Finalize remaining documentation files.
- Perform final QA pass across deployed production flows.
- Run Lighthouse checks and improve any weak scores.
- Clean up repository before submission.