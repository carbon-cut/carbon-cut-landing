# Temporary Help Page Content Draft

Status: temporary working doc for `/help` content planning.
Delete this file after the Help page implementation is finalized.

## Purpose of the Help page

The Help page exists to provide practical, self-serve guidance for users in the current Carbon Cut testing flow.

Primary role:

- Answer common operational questions quickly.
- Clarify current product scope and limits.
- Reduce unnecessary support back-and-forth by setting clear expectations.

This page is informational and practical. It should not use homepage-style dramatic CTAs.

## Content to include (exact scope)

1. Hero (informational only)

- Label: `Centre d'aide`
- Heading: clear practical support intent
- Short intro describing what users can find on this page
- No CTA buttons

2. Guided help paths (max 3)

- Path 1: Start/restart and complete the questionnaire
- Path 2: Understand results and recommendations
- Path 3: Resolve account or access issues

3. Popular questions (6 to 8 max)

- How the guided assessment works (step by step)
- What the result score means
- Whether a user can resume or redo the form
- How to fix submitted answer mistakes
- Why expected emails might be missing
- How to contact support with the right context

4. Current scope and boundaries

- Current: testing-stage personal flow
- Active assessment scope: transport and home energy
- Not currently available: business/team workflows, compliance/audit reporting, real-time tracking, offsets, enterprise integrations

5. Contact readiness (informational block, not CTA-led)

- Explain when to use Contact after checking Help answers
- Include required support details:
  - account email
  - issue type
  - reproduction steps
  - screenshot when possible

## Content rules

- Keep claims strictly aligned with `docs/design/00-product-truth.md`.
- Keep tone practical, clear, and restrained.
- Avoid template filler (fake metrics, fake trust blocks, decorative status claims).
- No homepage-style CTA treatment on this page.

## Why this page exists

- It improves user clarity during a testing-stage product flow.
- It separates responsibilities:
  - `/help` = answers and guidance
  - `/contact` = escalation for unresolved issues
- It keeps messaging honest about what Carbon Cut currently does.

## TODO (Implementation Sequence)

- Finish the full `/help/1` page flow before polishing advanced interactions.
- Complete all planned sections in `/help/1` with approved structure and copy.
- Keep category routing flow consistent with current plan (`/help/1` -> category pages).
- Add search behavior on `/help/1`:
  - filter category cards by search query
  - show a clear empty state when no match exists
  - keep keyboard and focus behavior accessible
- Final UI pass on `/help/1` after all sections are implemented:
  - spacing rhythm (mobile and desktop)
  - hierarchy clarity
  - claim safety check vs `00-product-truth.md`
