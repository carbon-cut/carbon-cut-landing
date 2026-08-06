# Agent UI Rules (Working Agreement)

This file defines how UI work should be executed in this project.  
We extend it incrementally as we iterate.

## Current Rules

1. Typography is canonical.

- Use the shared `Typography` component directly.
- If hierarchy feels wrong, adjust typography tokens/variants first, not page-level hacks.

2. Uncodexify does not mean “no visuals”.

- Decorative AI-default patterns are banned.
- Controlled visual cues are allowed:
  - one icon
  - one accent color cue
  - one emphasis border/line

3. Form submit is not a homepage CTA.

- Use normal button treatment for forms.
- Avoid oversized/button-heavy styles for support/help forms.
- Do not default to `size="lg"` for form actions.

4. Non-functional behavior (task-specific rule).

- Form UI should look finished.
- Submit action can be non-wired for now.
- “Non-functional” means no backend action yet, not unfinished UX.

5. Component discipline.

- Prefer shared primitives first: `Typography`, `Input`, `Label`, `Button`.
- Use raw HTML only when no project primitive exists.

6. Size discipline.

- Default sizing first.
- Increase size only with explicit product/design reason.

## Process Rule

- Discuss first, then document changes to these rules, then edit UI.
- Do not jump to implementation before alignment.
