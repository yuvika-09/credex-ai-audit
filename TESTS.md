# Tests

The project uses Vitest for automated testing of the audit engine logic.

---

## Test File

```txt
tests/auditEngine.test.ts
```

---

# Test Coverage

## 1. ChatGPT Team Downgrade Logic

Verifies that small teams using ChatGPT Team are recommended to downgrade to ChatGPT Plus when the additional collaboration features are unnecessary.

---

## 2. Cursor Business Downgrade Logic

Checks that small engineering teams on Cursor Business receive recommendations to move to Cursor Pro when enterprise-level features are not justified.

---

## 3. Annual Savings Calculation

Ensures annual savings are correctly derived from monthly savings calculations.

---

## 4. Credex Recommendation Threshold

Validates that high-savings audits correctly surface Credex consultation recommendations.

---

## 5. Optimal Plan Handling

Ensures already cost-efficient configurations do not generate artificial savings recommendations.

---

# Running Tests

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npm run test
```

Run linting:

```bash
npm run lint
```

---

# CI Workflow

GitHub Actions automatically runs:
- ESLint
- Vitest test suite

on every push to the `main` branch.

Workflow file:

```txt
.github/workflows/ci.yml
```