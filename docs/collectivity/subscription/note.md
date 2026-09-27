Implementation sequence:

1. Replace the static subscription catalogue with GET /api/collectivity/subscription-catalogue.
   - Add typed client/server models for catalogue, quote, request, subscription, and claims.
   - Map backend machine keys to existing French locale labels—the API deliberately returns no display labels.
   - Update the current perimeter keys (municipal_assets, whole_territory) to backend keys (patrimoine_communal, territorial_communes).
2. Rework the pricing configurator around backend rules.
   - Permit only modules whose status is available.
   - Enforce typed module conditions such as minimum commune count.
   - Keep selection in the URL if desired, but do not trust or persist client-computed totals.
   - Request POST /api/collectivity/subscription-quotes after a valid authenticated selection; render its cents-based line items, discounts, annual amount, and contract total.
3. Submit a subscription request.
   - Replace the current console.log continuation in PricingConfigurator.
   - Unauthenticated users continue to sign-up/sign-in with the selection preserved.
   - Authenticated users submit POST /api/collectivity/subscription-requests.
   - Show the resulting under_review state; this is not access to the product and must not create a project.
4. Add purchaser subscription management.
   - A subscription detail area should support creating/rotating/revoking a claim link.
   - Construct the public invitation URL in the frontend from the raw token; never persist or re-display a token received earlier.
   - List claims and allow the purchaser to approve or deny pending claims. Handle the 409 capacity-exhausted response clearly.
   - Add “assign myself” using POST .../self-claims.
5. Add the invitation claimant flow.
   - Create a claim landing route that reads the token, requires normal authentication, then calls POST /api/collectivity/subscription-claims.
   - Explain that the claim remains pending until purchaser approval, and it grants no immediate workspace access.
6. Change project initialization.
   - Carry the approved claim ID into the collectivity setup flow.
   - Update POST /api/collectivity/projects/init to require approvedClaimId alongside the current setup payload.
   - A successful initialization consumes that claim atomically, so retries and stale claims need error handling.
7. Align auth and entitlement handling.
   - The backend now enforces ownership plus an active, in-term subscription for project routes.
   - Revisit the frontend’s present allowedProducts / planId cookie checks: planId should represent only owned, active project slugs, not an assumed subscription entitlement.
   - On entitlement failures, send users to an appropriate pricing/subscription status view rather than exposing workspace routes.
8. Update test/mocking coverage.
   - The current MSW collectivity mock accepts project initialization without an approved claim and has no subscription endpoints; it must mirror the documented contract exactly.
   - Cover catalogue statuses/conditions, backend-authoritative quote totals, under-review submission, claim lifecycle, capacity conflict, expired/revoked links, and claim-required project init.
9. Localize all new customer-facing states and run lint/tests.
   Key decisions needed before implementation: where subscription management lives in the product navigation, the exact invitation URL route, and the desired post-submission/under-review UX. No code has been changed yet.
