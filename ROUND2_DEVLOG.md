# Round 2 Devlog

## Day 1 — Pricing Re-Audit Workflow

**Hours worked:** 9

### What I did
- Refactored all pricing values into a centralized `currentPricing.ts` source-of-truth file
- Removed hardcoded pricing dependencies from the audit engine
- Added pricing snapshot persistence to Firestore audit documents
- Built pricing comparison logic for detecting vendor pricing changes
- Implemented dynamic re-audit workflow
- Added:
  - `previousAudit`
  - `updatedAudit`
  versioning system
- Created dedicated audit diff page for comparing savings changes
- Added recommendation comparison rendering to the diff UI
- Implemented re-audit email notifications using EmailJS
- Connected lead capture flow with historical audits
- Added email persistence inside audit documents
- Debugged stale React state issues during re-audit email flow
- Fixed recommendation mismatches caused by incorrect input values
- Tested full end-to-end workflow:
  - create audit
  - capture email
  - modify pricing
  - re-run audit
  - compare diff
  - receive notification email
- Cleaned up lint issues and removed temporary debugging logs
- Updated deployment configuration and preview testing on Vercel
- Added Round 2 documentation files and screenshots

### What I learned
This round felt much closer to maintaining a real SaaS product than building a standalone assignment. Most of the complexity came from:
- keeping state synchronized
- evolving architecture cleanly
- debugging integrations between frontend, Firestore, and EmailJS

I also learned how important immutable historical state is when dealing with finance-style workflows and audit systems.

### Blockers / Issues
The biggest blocker was that pricing changes initially had no effect on updated audits. After debugging, I realized the audit engine was still using hardcoded pricing internally despite having a centralized pricing file.

Another major issue was stale React state. The audit page loaded before Firestore updated with the captured email, causing re-audit emails to silently fail because `audit.email` remained undefined locally.

I also hit EmailJS template variable mismatches between:
- initial report emails
- re-audit notification emails

which caused notifications to fail until the templates were separated properly.

### Final Reflection
Round 2 became heavily focused on debugging integration flows and evolving architecture rather than just adding features. By the end, the project evolved from a static AI spend calculator into a continuously updateable audit platform with:
- historical pricing snapshots
- versioned audits
- diff comparisons
- notification workflows
- dynamic recalculation support