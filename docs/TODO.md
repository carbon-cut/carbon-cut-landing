# TODO

## Auth Route Protection (Backlog)

- [ ] Add route-level guard for auth pages when the user is already signed in.
  - Scope: `/auth/sign-in`, `/auth/sign-up`, `/auth/forgot-password`, `/auth/reset-password`, `/auth/confirm-email`.
  - Expected behavior: authenticated users should be redirected away from auth entry pages (target route to confirm: likely `/form`).

- [ ] Add guard for reset-password access when required token/code is missing.
  - Scope: `/auth/reset-password`.
  - Expected behavior: if reset token/code is absent or invalid in URL params, redirect user to the password recovery entry flow.

- [ ] Align guard behavior with `returnTo` handling.
  - Ensure redirects remain safe and continue using current sanitization rules.

