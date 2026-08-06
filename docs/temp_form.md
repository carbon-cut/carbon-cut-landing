How we should start (proposed execution order)

1-Define the canonical form primitives contract (input/select/combo/radio/alert/unit + error/disabled/focus behavior).
2-Build a thin “form field shell” layer that wraps existing ui/\* primitives and centralizes variants.
3-Migrate shared form wrappers first (single PR), no question logic changes.
4-Migrate tabs/progress/container shell to tokens only.
5-Migrate question modules section-by-section (transport -> energy -> food), then result page.
6-Run npm run lint and visual QA after each section.

# 1 form primitives

Clear direction (before coding)

Single ownership
Keep one canonical form-field layer in src/components/forms.
Keep src/components/ui/_ as primitives only.
Keep src/app/\_forms/components/_ only for form-route-specific layout/presentation helpers (question, content, etc.), not field controls.
Unified API
Standardize field props across all controls (form, name, label, required, description, size, disabled, fallback, attachedFields, isError).
Remove mismatched prop names (options vs data, mandetory typo, etc.).
Styling contract
Fields inherit primitive defaults first.
Only token-based overrides (primary._, foreground, input, border, destructive), no hex/hardcoded gray/white in wrappers.
Migration strategy
Phase 1: normalize shared field wrappers (input/select/combox/radio/checkbox/alert/unit) in src/components/forms.
Phase 2: switch all imports in src/app/\_forms/basic/\*\* to canonical wrappers.
Phase 3: remove/deprecate duplicate field components under src/app/\_forms/components.
Done criteria
No field control imported from src/app/\_forms/components/_.
One implementation per control type.
Lint passes and no visual regressions (conservative look preserved).

# TODO

- do smth about unused questions like moto and maritime
