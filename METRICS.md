# Metrics

## North Star Metric

### Qualified Audits Completed Per Week

The North Star metric for this product is:

```txt
Qualified audits completed per week
```

A “qualified audit” means:
- a user completes the audit flow
- receives recommendations
- has meaningful AI tooling spend
- optionally submits contact information

This metric matters more than raw traffic because the product is fundamentally a lead-generation and intent-discovery tool, not a social application or daily-use SaaS platform.

A completed audit represents:
- real user engagement
- demonstrated operational pain
- high purchase intent
- measurable savings opportunity

The product only creates value if users trust the audit enough to complete it.

---

# Input Metrics

## 1. Audit Completion Rate

```txt
Completed audits / landing page visitors
```

This measures:
- landing page clarity
- perceived value
- onboarding friction

A low completion rate would indicate:
- confusing UX
- weak positioning
- excessive input friction
- low trust

For an early MVP, I would target:

```txt
20–35%
```

which is relatively strong for a multi-step SaaS utility flow.

---

## 2. Share Rate

```txt
Shared audit URLs / completed audits
```

This is one of the most important early indicators because the product’s growth model depends heavily on virality and social proof.

If users voluntarily share:
- savings screenshots
- audit URLs
- benchmark comparisons

then the product likely provides genuine perceived value.

A healthy early benchmark would be:

```txt
10–20%
```

---

## 3. Lead Capture Rate

```txt
Emails captured / completed audits
```

This measures:
- trust
- perceived recommendation quality
- intent strength

Since the product reveals value before gating email collection, conversion rates should be meaningfully higher than traditional lead forms.

Target range:

```txt
25–40%
```

especially for higher-savings users.

---

# What I Would Instrument First

The first analytics events I would track are:

- landing page visits
- audit started
- audit completed
- audit shared
- lead submitted
- Credex CTA clicked
- consultation booked

I would also track:
- average projected savings
- most common tools audited
- average spend per seat
- dropoff point within the form flow

This would help identify:
- which recommendations resonate most
- where friction exists
- which user segments are highest value

---

# What Number Triggers a Pivot Decision?

The strongest signal that would trigger a pivot is:

```txt
Low repeat sharing despite high audit completion
```

Specifically:
- if audit completion exceeded 20%
- but share rate remained below 5%

that would suggest users find the utility somewhat useful but not compelling enough to recommend publicly.

That would likely mean:
- recommendations feel generic
- savings are too small
- output lacks emotional impact
- differentiation is weak

At that point, I would pivot toward:
- benchmarking
- API analytics
- organization-wide reporting
- workflow optimization

instead of purely subscription-cost recommendations.

---

# Why I Did Not Choose DAU

Daily active users are not the correct metric for this product because AI spend audits are naturally infrequent workflows.

A healthy user may only need the product:
- monthly
- quarterly
- after hiring growth
- during procurement reviews

The correct success metric is:
- high-intent audits
- qualified leads
- downstream conversions

not habitual daily engagement.