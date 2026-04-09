# UI Criticism Log

Use this file to capture concrete UI feedback from implementation rounds and prevent repeating the same mistakes.

## Support Page Feedback (Current Round)

- Typography in the stricter version was better, but spacing still felt off.
- Page felt too flat after simplification; it needed selective visual cues (not decorative overload).
- Some versions felt below expected quality despite being structurally correct.
- Must use predefined/shared UI components where available.
- Avoid ad-hoc native form controls when shared primitives already exist.
- `Button size="lg"` in support forms looked bulky and unjustified.
- Non-functional state should mean submission logic is disabled, not that UX feels unfinished.
- Keep one clear visual hierarchy without bouncing between overdesigned and overstripped.

## Guardrails From This Feedback

- Prefer `Input`, `Label`, `Button` primitives first.
- Use default button sizing for forms unless there is a clear reason to scale.
- Keep radii moderate and consistent; avoid both extremes.
- Add one restrained visual anchor (icon/accent/border treatment), not multiple decorative layers.
- Tune spacing rhythm before adding new visual elements.
