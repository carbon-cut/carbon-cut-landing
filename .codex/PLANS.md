# PLANS

This file defines how Codex should plan substantial engineering work in this repository.

`AGENTS.md` remains authoritative for repository scope, protected foundation code, approval boundaries, repository boundaries, verification, and definition of done. This file defines the planning workflow used when the user chooses to plan substantial work.

## When to use a plan

Do not create an ExecPlan automatically.

The user normally decides when to enter planning, typically with `/plan`.

If the user requests implementation directly and the work clearly exceeds the threshold below, briefly recommend planning first and explain why. Do not start an ExecPlan or switch into a planning workflow unless the user asks for one.

Recommend an ExecPlan when the task involves any of the following:

- protected foundation code;
- cross-repository coordination;
- API contract changes;
- database, content-type, schema, persistence, or migration changes;
- authentication, authorization, subscription, session, or token behavior;
- shared calculation formulas, factors, parameter resolution, or calculation architecture;
- a substantial architectural refactor;
- compatibility or migration concerns affecting existing data or consumers.

Also recommend a plan when several meaningful complexity signals combine, such as:

- research is required before implementation;
- multiple architectural layers are involved;
- the work has several dependent implementation stages;
- requirements or design choices are materially uncertain;
- the work is likely to span multiple sessions;
- integration or coordinated verification is required;
- behavior changes across several flows;
- rollback, recovery, or sequencing concerns are material.

Do not recommend an ExecPlan merely because several files are involved. Routine, localized, or mechanically straightforward changes should normally be implemented directly.

Examples that normally do not require a plan include small styling changes, copy or localization changes, straightforward validation fixes, isolated component changes, obvious bug fixes with a known cause, local test fixes, and mechanical changes confined to one feature surface.

## Planning starts with research

An ExecPlan must be based on the current system, not assumptions.

Before drafting the plan:

1. Read the repository `AGENTS.md` and any relevant specialized skill.
2. Inspect the owning implementation.
3. Read relevant current documentation.
4. Inspect relevant tests, contracts, consumers, persistence, and configuration when they materially affect the task.
5. Identify current behavior, constraints, dependencies, and existing architectural boundaries.
6. Resolve what can be resolved from in-scope repository evidence before turning uncertainty into a plan assumption.

Documentation may be stale. Verify important behavior against the current implementation.

Do not make code changes while researching or drafting an ExecPlan.

## Approval before implementation

The planning workflow is:

1. research;
2. draft the ExecPlan;
3. user review;
4. revise the plan as needed;
5. user approval;
6. implementation.

Do not begin implementation until the user explicitly approves the plan.

Research, discussion, and plan refinement may continue before approval.

If implementation later requires a change that crosses an approval boundary defined by `AGENTS.md`, stop and obtain approval before making that change.

## Architecture decisions

Codex may make architectural and implementation decisions within approved scope.

Material architectural decisions must be visible in the ExecPlan. Record:

- the decision;
- why it was chosen;
- important alternatives when they materially affected the choice;
- consequences, tradeoffs, or compatibility effects that the user should understand.

Do not document trivial implementation choices merely for completeness.

The purpose of recording architecture decisions is visibility and review, not to prevent Codex from reasoning about architecture.

Decisions that cross an approval boundary in `AGENTS.md` still require explicit approval.

## Plan types

### Repository ExecPlan

A substantial task owned by one repository uses:

`docs/plans/<feature-slug>.md`

This is the implementation plan for the current repository.

For a substantial feature that affects only one repository, this is the only plan required.

### Full feature plan

A feature that spans multiple repositories or independently operated systems may use one canonical full feature plan:

`docs/fullPlans/<feature-slug>.md`

A full feature plan exists only when cross-repository or multi-system coordination is required.

There must be exactly one canonical full feature plan for a feature, even when several repositories participate.

The canonical full plan may live in whichever participating repository naturally owns the feature-level planning. Once selected, keep that plan canonical for the life of the feature unless there is a specific reason to move it.

Each affected repository keeps its own repository ExecPlan:

`docs/plans/<feature-slug>.md`

All related plans use the same feature slug.

The full feature plan owns cross-repository concerns such as:

- feature behavior and observable outcome;
- shared architecture decisions;
- API or integration contracts;
- responsibility boundaries between repositories;
- sequencing and dependencies;
- end-to-end integration verification;
- overall progress and unresolved cross-repository work.

Each repository ExecPlan owns:

- the implementation in that repository;
- repository-specific architecture and code placement;
- repository-specific tests and verification;
- repository-specific discoveries, blockers, and progress.

Repository plans must identify the canonical full feature plan and related repository plans when relevant.

Do not duplicate competing full plans across repositories.

## Plan location

Use:

- `docs/plans/` for active repository ExecPlans;
- `docs/plans/archive/` for archived repository ExecPlans;
- `docs/fullPlans/` for active canonical cross-repository full plans;
- `docs/fullPlans/archive/` for archived canonical full plans.

Do not use versioned filenames such as `-v2`, `-final`, or `-final-2`. Git history is the version history.

Use a stable, descriptive feature slug, for example:

- `invitation-approval.md`
- `quote-workflow.md`
- `social-auth-identity.md`
- `collectivity-calculation-refactor.md`

## Plan status

Use one of these states:

- `Draft`
- `Approved`
- `In progress`
- `Blocked`
- `Complete`
- `Archived`

`Complete` and `Archived` are different.

`Complete` means the planned implementation is finished and its verification and unresolved work have been recorded.

`Archived` means the completed plan has later been moved out of the active planning directory for organization.

A completed plan may remain in the active directory until it is no longer useful there.

## Required plan content

Plan weight must be proportional to the task.

Do not create boilerplate sections that add no value. A small substantial feature may have a short plan; a migration or cross-repository architectural change may require a much more detailed one.

Every ExecPlan should contain, in a form appropriate to the task:

### Context / current state

Describe the relevant current behavior and architecture discovered during research.

Name important owning paths, contracts, services, flows, or tests when they help make the plan self-contained.

### Goal / observable outcome

Describe what will be true when the work succeeds.

Prefer observable behavior over implementation-only statements.

### Scope

State what the plan covers.

Respect all scope and approval boundaries in `AGENTS.md`.

### Implementation plan

Describe the meaningful implementation stages in dependency order.

Focus on behavior, ownership, contracts, and verification points rather than producing a speculative file-by-file checklist before the implementation is understood.

### Verification

Define how the implemented behavior will be proven.

Use the repository verification rules in `AGENTS.md`.

Do not claim a command, test, build, migration, or integration check passed unless it actually ran successfully.

### Progress

Keep a concise record of what is pending, in progress, complete, or blocked.

### Decisions and discoveries

Record material architectural decisions, changed assumptions, important discoveries, and deviations from the original approach.

The plan should describe the current truth while preserving enough history to explain why important decisions changed.

## Conditional sections

Add these only when they materially affect the work:

- non-goals;
- API or integration contract;
- cross-repository responsibilities;
- data model or persistence changes;
- migration strategy;
- compatibility;
- rollback or recovery;
- risks;
- security considerations;
- performance considerations;
- deployment or sequencing constraints;
- open questions.

Do not add empty sections for completeness.

## Living plan rules

An ExecPlan is a living engineering document.

Update it while implementation proceeds.

At minimum, update the plan when:

- a meaningful stage is completed;
- an assumption proves wrong;
- an architectural decision changes;
- implementation materially deviates from the planned approach;
- a blocker appears or is resolved;
- verification produces meaningful results;
- unresolved work remains at completion.

Do not preserve an obsolete plan merely because it was originally approved. Keep the current plan accurate.

When an important approved decision changes, record what changed and why rather than silently rewriting history.

Minor implementation adjustments inside approved scope do not require renewed approval.

Changes to user-approved scope, protected foundation architecture, public or shared contracts, persistence or schema, or cross-repository responsibilities must follow the approval rules in `AGENTS.md`.

## Cross-repository planning

Treat a cross-repository feature as one feature, not as unrelated frontend and backend tasks.

Establish shared behavior and contracts before dependent implementations are allowed to diverge.

The canonical full feature plan is the source of truth for cross-repository behavior, architecture, contracts, responsibilities, and sequencing.

Repository plans must not invent alternate API shapes, semantics, ownership rules, or compatibility assumptions.

If the shared contract changes materially, update the canonical full plan and affected repository plans before continuing implementation. Obtain approval when required by `AGENTS.md`.

The planning workflow may begin from any participating repository. This must not change the rules above.

## Completion

Before marking an ExecPlan `Complete`:

- the approved behavior must be implemented within scope;
- applicable repository verification must have run, or blockers must be explicitly recorded;
- material deviations from the plan must be documented;
- unresolved dependencies or failures affecting the result must be recorded;
- relevant compatibility, migration, contract, or cross-repository effects must be recorded;
- the plan must reflect the actual implemented state rather than only the original proposal.

For a cross-repository feature, repository plans may complete independently. The canonical full feature plan should not be marked complete until the feature-level outcome and required integration verification are complete.

## Backlog handling

Do not automatically turn every observation, improvement idea, or deferred possibility into backlog work.

Only add an item to `BACKLOG.md` when:

- it is unresolved work required by the original objective; or
- the user explicitly accepts it as follow-up work.

Do not use the backlog to silently expand product scope.

When a completed plan has accepted follow-up work, record the relationship clearly enough that the follow-up can be traced back to the feature.

## Archiving

Do not archive plans automatically as part of implementation completion unless requested.

When archiving is appropriate:

- move repository plans from `docs/plans/` to `docs/plans/archive/`;
- move canonical full feature plans from `docs/fullPlans/` to `docs/fullPlans/archive/`;
- update status to `Archived` if the file retains status metadata.

Old plans may be deleted later when they no longer provide useful engineering history.

## Suggested plan header

Use a compact header such as:

```md
# <Feature name>

Status: Draft
Feature: <feature-slug>
Last updated: YYYY-MM-DD
```

For a repository plan that belongs to a cross-repository feature, also include:

```md
Canonical full plan:
<repository> — `docs/fullPlans/<feature-slug>.md`

Related plans:

- <repository> — `docs/plans/<feature-slug>.md`
```

Do not add relationship metadata when there is no related plan.

## Suggested repository ExecPlan shape

Adapt this structure to the task. Do not include irrelevant sections.

```md
# <Feature name>

Status: Draft
Feature: <feature-slug>
Last updated: YYYY-MM-DD

## Context

## Goal

## Scope

## Plan

### 1. <stage>

### 2. <stage>

## Verification

## Progress

## Decisions and discoveries

## Unresolved work
```

## Suggested full feature plan shape

Use this only for cross-repository or multi-system features.

```md
# <Feature name>

Status: Draft
Feature: <feature-slug>
Last updated: YYYY-MM-DD

## Context

## Goal

## Scope

## Feature behavior

## Architecture

## Shared contract

## Repository responsibilities

### <repository A>

### <repository B>

## Implementation sequence

## Integration verification

## Progress

## Decisions and discoveries

## Unresolved work
```

These are starting structures, not fixed forms. Expand or simplify them according to the actual complexity of the work.
