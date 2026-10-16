---
name: cross-repo-coordination
description: Coordinate specification, ticket, implementation, branch, and contract work when one feature spans multiple repositories, including during to-tickets and implement-spec.
---

# Cross-repository feature coordination

Use this workflow when a feature has implementation, contracts, tests, or tickets in more than one repository. For a single-repository feature, continue with the regular `to-tickets` or `implement-spec` workflow.

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

## Completion

- Review and verify changes in every repository named by the selected scope. Close each child ticket in its owning tracker according to that repository's workflow; close the canonical parent only after all its children are complete.
- Report the canonical parent, all child tickets, paired branches, merge order, checks run in each repository, and any deliberately excluded tickets.
