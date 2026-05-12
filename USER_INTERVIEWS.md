# USER_INTERVIEWS.md

## Interview 1 — A.K.  
**Role:** Freelance Full-Stack Developer  
**Company Stage:** Solo freelancer working with 2–3 startup clients

### Notes

A.K. currently pays for:
- ChatGPT Plus
- Cursor Pro
- GitHub Copilot

He mentioned that over time he accumulated subscriptions without actively reevaluating them because each tool solved a slightly different workflow problem.

### Direct Quotes

> “I know there’s overlap between these tools, but switching context feels more expensive than the subscription.”

> “Cursor saves me time writing code, but honestly I still go back to ChatGPT constantly.”

> “I probably wouldn’t notice if one of these subscriptions doubled next month.”

> “The API pricing stuff confuses me more than subscriptions.”

### Most Surprising Thing

The most surprising insight was that convenience and habit mattered more than pure pricing. Even though he admitted some subscriptions overlapped heavily, he continued paying because he had already integrated them into muscle memory and workflow habits.

### What It Changed About My Design

This interview pushed me to make the audit recommendations sound less aggressive and more advisory. Instead of implying users should immediately cancel tools, I adjusted recommendation wording to focus on optimization opportunities and workflow fit.

It also reinforced the importance of deterministic savings explanations rather than vague “AI optimization” language.

---

# Interview 2 — R.S.  
**Role:** Engineering Intern at an AI Startup  
**Company Stage:** Early-stage startup (~12 people)

### Notes

R.S. described a team setup where different developers used different AI tools simultaneously:
- some preferred Cursor
- others used Copilot
- founders heavily used Claude and ChatGPT

There was no centralized ownership of AI tooling spend.

### Direct Quotes

> “Nobody actually tracks our AI subscriptions in one place.”

> “We expense AI tools individually, which means nobody sees the total spend.”

> “Founders care about speed way more than saving twenty dollars.”

> “If someone made a really visual savings report, I’d probably send it around internally.”

### Most Surprising Thing

The most surprising insight was that AI tooling spend was fragmented across personal reimbursements rather than centrally managed budgets. That meant even small teams could unintentionally overspend without realizing it.

### What It Changed About My Design

This interview influenced:
- the emphasis on total monthly + annual savings
- the screenshot-friendly audit layout
- the decision to make results publicly shareable

It also reinforced that the product should feel lightweight and frictionless because teams are unlikely to connect billing systems for an initial audit.

---

# Interview 3 — N.M.  
**Role:** Technical Founder  
**Company Stage:** Bootstrapped SaaS startup (~5 people)

### Notes

N.M. uses:
- Claude Team
- OpenAI API
- Gemini API
- Cursor

Their biggest concern was not subscriptions themselves, but unpredictable API usage growth.

### Direct Quotes

> “Subscriptions are predictable. API costs are what suddenly explode.”

> “We pay for multiple models because reliability matters more than loyalty to one provider.”

> “I would trust this kind of audit more if the logic was visible and not just AI-generated.”

> “Most AI dashboards feel like investor demos instead of tools operators actually use.”

### Most Surprising Thing

The strongest insight was that transparency mattered heavily for trust. N.M. specifically said they would distrust recommendations that looked entirely AI-generated or lacked visible reasoning.

### What It Changed About My Design

This interview reinforced my decision to keep the audit engine deterministic and rule-based rather than LLM-driven.

It also highlighted a current weakness in the MVP:
- API-direct usage modeling is still simplified
- token-volume estimation is missing
- research/data-heavy workflows need more specialized recommendations

If I continued development, API usage modeling would be my first major improvement area.