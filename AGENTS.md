# GRAVITAS — Engineering Reliability Runtime

This project uses GRAVITAS for disciplined agentic software engineering.
Invariants live in `.agents/skills/gravitas/SKILL.md` and `.agents/rules/gravitas-invariants.md`.

## The 6 Invariants

1. **Ground before mutating:** Read target, tests, and callers before editing. Never assume file state.
2. **Stay in declared scope:** Writes stay inside declared `allowed_write_scope`.
3. **Completion needs evidence:** A criterion is done only when an owned validator passed *after* the last relevant mutation.
4. **Never exact-retry a failure:** Change diagnosis, context, or strategy before retrying.
5. **Satisfy the contract:** Acceptance criteria and required validators gate completion.
6. **Say what you cannot verify:** Mark uncertain claims explicitly instead of assuming certainty.

## Planning & Execution

- Classify task complexity: `direct` (single file/localized), `compact` (multi-file/moderate risk), or `deep` (structural/high risk).
- Run verification before declaring completion: `VERDICT: PASS` or `VERDICT: FAIL`.
