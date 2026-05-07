# DEVLOG

## Day 1 — 2026-05-06

**Hours worked:** 1

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



