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