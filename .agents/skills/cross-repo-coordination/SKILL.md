---
name: cross-repo-coordination
description: Coordinate cross-repository specs, tickets, implementation, handoffs, final review, integration checks, and pull requests.
---

# Cross-repository feature coordination

Use this workflow when a feature has implementation, contracts, tests, or tickets in more than one repository. For a single-repository feature, continue with the regular `to-tickets` or `implement-spec` workflow.

## Sessions and handoffs

- A planning agent can create the canonical spec and tickets, then stop. Any number of implementation agents can work on different tickets in either repository through `implement-spec`, each leaving a handoff. The planning agent does not need to stay in context.
- A fresh agent can invoke this skill with the canonical spec and all available implementation handoffs to finish the feature. Treat handoffs as context pointers, not proof of completion: read the linked tickets and inspect the actual branches, changes, review results, and checks in each repository. Accept multiple handoffs from the same repository and identify any missing ticket coverage.
- This fresh agent owns the independent final review, cross-repository integration verification, and pull requests. It does not silently repair implementation findings. Report a small finding with its location and impact; for substantial new work, use `to-tickets` with the user to agree on a ticket. Hand implementation findings back to the owning agent or ticket and resume final verification from the updated handoff.

## Ticket ownership and scope

- Keep one canonical parent spec in the repository expected to contain the largest share of implementation work. If ownership is unclear, ask the user where the feature belongs.
- Create each child ticket in the repository that owns its implementation. Link every child to the canonical parent and record cross-repository blockers in native issue dependencies when supported; otherwise include direct issue links in the ticket body.
- Keep the parent spec as the only copy of shared requirements and decisions. Child tickets link to the relevant parent sections and state only their own deliverable and acceptance criteria.
- A request to implement a parent spec includes all its child tickets across repositories. A request naming a ticket subset limits implementation to that subset; still report excluded dependent tickets and the coordination needed to resume them.

## Repository and branch coordination

- Validate each involved checkout by its Git remote, then read that repository's `AGENTS.md`, relevant local skills, and existing contract-sync instructions before editing it.
- Create an integration branch with the same name, `integrate/<feature-slug>`, in every involved repository. Base each branch on that repository's target integration branch. Keep each repository's history and changes in its own branch and worktree.
- Implement each ticket in its owning repository. Use the ticket graph for dependencies; a producer ticket must land before a consumer ticket is merged.
- Keep paired integration branches until the feature is complete where repository settings allow it. Delete the paired branches together after every dependent pull request has merged.

## Producer and consumer contracts

- Treat the producer repository's contract as the source of truth. Generate or sync consumer snapshots from the producer's paired integration branch, using the consumer repository's documented command and path override.
- For Carbon Cut backend OpenAPI changes, run `npm run api:sync` in `carbon-cut-landing` with `BACKEND_OPENAPI_FILE` pointing at the backend paired worktree's `openapi/openapi.yaml`.
- Frontend pull requests from `integrate/<feature-slug>` must validate against the backend branch with the same name. Merge the backend pull request first; then merge the frontend pull request. After merge, default-branch CI validates against the backend target branch.
- Run the consumer's generated-contract check and the mirrored-skill parity check before marking that repository's work complete.

## Final review and integration

- Review each repository's integration branch against its intended target branch and the canonical spec, using `code-review`. Check the combined behavior across repositories, including API compatibility, authorization and error behavior, and the user flow named by the spec. Verify that every in-scope ticket is represented; a passing per-repository review alone does not establish cross-repository compatibility.
- Run the relevant checks in each repository and the available cross-repository integration tests against the paired branches. Assess whether the integration tests cover the shared acceptance criteria. Report missing coverage or a contract mismatch as a finding for the owning implementation agent; do not make a reviewer-authored implementation change to clear the gate.
- Record exactly which reviews and checks ran, their results, and any environment blocker. If a finding affects acceptance criteria or integration, pause PR readiness and give the user a precise handoff for the owning ticket or a proposed new ticket through `to-tickets`.

## Completion

- After final review and integration checks pass, open or update a pull request from each paired integration branch and mark each ready for review. Follow the repository's `pr` skill for PR bodies. Link the paired PRs and state the backend-before-frontend merge order.
- Resolve child tickets according to the owning tracker's workflow; close the canonical parent only after all children are complete. If ticket closure depends on later PR merges, report that follow-up instead of claiming the tickets are closed.
- End the final-review session when both PRs are ready for review or when a blocking finding has been handed back. Report the canonical parent, all child tickets, handoffs reviewed, paired branches and PRs, merge order, checks run in each repository, and any deliberately excluded tickets or unresolved findings.
