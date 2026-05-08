# AI Spend Audit

AI Spend Audit is a free SaaS-style web application that helps startups identify overspending across AI tooling subscriptions such as ChatGPT, Claude, Cursor, GitHub Copilot, Gemini, and related developer AI products.

The tool generates instant cost optimization recommendations, estimates monthly and annual savings, creates shareable audit reports, and captures high-intent leads for Credex.

---

# Live Demo

https://credex-ai-audit-flax.vercel.app/

---

# Screenshots

## Landing Page

![Landing page] (./public/screenshots/homepage.png)

---

## Audit Results

![Audit results] (./public/screenshots/audit-results.png)

---

## Lead Capture Flow

![Email input form] (./public/screenshots/generate-report.png)

![Report generation confirmation] (./public/screenshots/report-capture.png)

![Confirmation email] (./public/screenshots/audit-report-email.png)

![Lead captured] (./public/screenshots/lead-captured.png)

---

# Features

- Multi-tool AI spend input form
- Persistent form state using localStorage
- Rule-based AI spend optimization engine
- Monthly and annual savings calculations
- AI-generated personalized audit summaries
- Shareable public audit URLs
- Open Graph and Twitter metadata previews
- Firebase Firestore backend persistence
- Lead capture workflow
- Transactional email delivery using EmailJS
- Lightweight abuse protection using honeypot fields
- Automated testing with Vitest
- GitHub Actions CI pipeline

---

# Tech Stack

## Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

## Backend / Services
- Firebase Firestore
- OpenAI API
- EmailJS
- Vercel

## Tooling
- ESLint
- Vitest
- GitHub Actions

---

# Quick Start

## 1. Clone Repository

```bash
git clone https://github.com/yuvika-09/credex-ai-audit.git
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create:

```txt
.env.local
```

Add:

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

---

## 4. Run Locally

```bash
npm run dev
```

---

## 5. Run Tests

```bash
npm run test
```

---

## 6. Run Linting

```bash
npm run lint
```

---

# Deployment

The application is deployed using Vercel.

Production deployment automatically:
- builds the application
- runs CI checks
- deploys latest commits from `main`

---

# Decisions

## 1. Rule-Based Audit Logic Instead of AI Recommendations

The core savings engine uses deterministic business rules instead of LLM-generated financial recommendations.

This improves:
- explainability
- reliability
- pricing consistency
- trustworthiness

AI is only used for generating personalized summary text.

---

## 2. Firebase Instead of a Custom Backend

Firebase Firestore dramatically reduced backend setup complexity and accelerated MVP development.

The tradeoff is reduced backend flexibility compared to a fully custom API server.

---

## 3. EmailJS Instead of Full Transactional Email Infrastructure

EmailJS was chosen for rapid MVP iteration after Resend account limitations interrupted testing.

This simplified delivery while preserving the transactional email workflow requirement.

---

## 4. Client-Side Form State Persistence

Form state is persisted locally using localStorage to reduce friction and improve UX without introducing authentication requirements.

---

## 5. Split Server/Client Component Architecture

Audit pages were refactored into separate server and client components to support both:
- dynamic Open Graph metadata
- Firebase-powered interactive client rendering

This aligned the application more closely with recommended Next.js App Router architecture patterns.

---

# Accessibility & Performance

The application was designed with:
- keyboard-friendly inputs
- semantic HTML structure
- responsive layouts
- high contrast UI styling
- lightweight client bundles

Lighthouse targets:
- Performance ≥ 85
- Accessibility ≥ 90
- Best Practices ≥ 90

---

# Future Improvements

- Dynamic Open Graph image generation
- Benchmark mode for AI spend comparisons
- PDF report exports
- Referral system
- Admin analytics dashboard
- Pricing auto-sync from vendor APIs
- Multi-user organization audits

---

# CI/CD

GitHub Actions automatically runs:
- ESLint
- Vitest test suite

on every push to `main`.

Workflow file:

```txt
.github/workflows/ci.yml
```

---

# License

This project was built as part of the Credex Web Development Internship assignment.