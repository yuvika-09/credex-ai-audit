# AGENTS.md

## Project Overview

AI Spend Audit is a web application that helps startups and engineering teams identify unnecessary spending across AI tooling subscriptions such as ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and related API products.

The project was built as part of the Credex Web Development Intern Assignment and focuses on:
- deterministic audit recommendations
- shareable audit reports
- lead generation workflows
- lightweight SaaS-style architecture

The application uses:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Firebase Firestore
- OpenAI API
- EmailJS
- Vitest
- GitHub Actions CI

---

# Repository Structure

```txt
app/
components/
lib/
public/
tests/
types/
.github/workflows/
```

---

# Key Architectural Principles

## 1. Deterministic Audit Logic

The audit engine intentionally avoids using AI for financial recommendations.

Reasoning:
- recommendations should be explainable
- savings calculations should remain testable
- deterministic outputs improve reliability

LLMs are used only for personalized summaries.

---

## 2. Server/Client Separation

Next.js App Router is split between:
- server-rendered metadata logic
- client-rendered interactive audit flows

`generateMetadata()` must remain server-side.

Interactive Firebase operations remain client-side.

---

## 3. Minimal Friction UX

The product intentionally:
- requires no authentication
- delays email capture until after value delivery
- prioritizes shareability and speed

This mirrors real growth-oriented SaaS onboarding patterns.

---

# Important Files

## Core Application

### `components/SpendForm.tsx`
Main audit input flow and audit generation UI.

Responsibilities:
- collect AI tooling inputs
- persist form state
- trigger audit generation
- save audits to backend

---

### `lib/auditEngine.ts`
Core deterministic recommendation engine.

Handles:
- downgrade detection
- savings calculations
- Credex recommendation logic

This file contains the most important business logic.

---

### `components/AuditClient.tsx`
Client-rendered public audit results page.

Handles:
- audit display
- lead capture
- Firebase document fetching

---

### `app/api/generate-summary/route.ts`
Server-side AI summary generation endpoint.

Responsibilities:
- securely call OpenAI
- build personalized summaries
- return fallback summaries on failure

Never expose API keys client-side.

---

# Firebase Usage

Firestore collections:
- `audits`
- `leads`

Audit documents store:
- tool inputs
- recommendations
- savings totals
- AI summaries

Lead documents store:
- email
- optional company information
- associated audit ID

Public audit pages intentionally exclude identifying user information.

---

# Environment Variables

Required variables:

```env
OPENAI_API_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Never commit `.env.local`.

---

# Testing

The project uses:
- Vitest
- GitHub Actions CI

Audit engine tests live in:
```txt
tests/
```

Run locally:

```bash
npm run test
```

Lint:

```bash
npm run lint
```

---

# Deployment

Primary deployment target:
- Vercel

Deployment flow:
- GitHub push
- automatic CI
- Vercel production deploy

---

# Code Style Expectations

## TypeScript
Avoid:
```ts
any
```

Prefer:
- explicit interfaces
- shared types
- typed Firestore responses

---

## Commit Style

Preferred:
```txt
feat:
fix:
docs:
refactor:
test:
chore:
```

Examples:
```txt
fix: normalize audit engine comparisons
feat: add shareable audit pages
docs: add architecture documentation
```

---

# Product Philosophy

This project is intentionally positioned as:
- a launchable growth product
- a lead-generation engine
- a financial optimization tool

not:
- a toy coding assignment
- an AI chatbot wrapper
- a dashboard template

Every major UX decision prioritizes:
- trust
- speed
- explainability
- shareability

---

# Future Improvements

If development continued, likely next steps would include:
- API token usage modeling
- benchmark analytics
- organization accounts
- PDF export
- referral system
- advanced pricing heuristics
- queue-based AI generation
- analytics instrumentation

---

# Important Notes for Contributors

- Preserve deterministic recommendation behavior.
- Avoid introducing unnecessary authentication friction.
- Keep public audit pages privacy-safe.
- Do not expose secrets client-side.
- Maintain mobile responsiveness and accessibility standards.
- Keep audit recommendations financially defensible and explainable.