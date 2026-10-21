# Boss presentation — shared understanding (temporary)

This records the agreed content behind the [boss-facing questionnaire](to-questionnaire-lancement-collectivite_temp.md). It is not an approval to purchase or deploy anything.

## Purpose and audience

- Give the boss the information needed to understand the launch choice, its price, and its practical consequences.
- Write the eventual document in concise, self-contained, everyday French for a reader with limited IT knowledge. Explain technical terms through their effects on the service.
- Present the choices in a short questionnaire, with a small comparison and a compact cost summary.

## Agreed content

- Compare only the proposed launch setup and later growth path recorded in [issue #98](https://github.com/carbon-cut/carbon-cut-landing/issues/98). Present the later setup as a possible future step, not a purchase required at launch. Show the recommendation and the consequence of each phase.
- Explain the difference between people using the app **at the same time** and distinct people using it **during a day**. Include the indicative figures, with a clear statement that the proposed production servers have not been load-tested and the figures are estimates, not guarantees. See [issue #95](https://github.com/carbon-cut/carbon-cut-landing/issues/95) and [issue #102](https://github.com/carbon-cut/carbon-cut-landing/issues/102).
- Keep every expense on its own line, distinguishing monthly prices, annual bills, usage-based charges, and unpriced work. Add a compact table of indicative scenario totals and ranges, keeping Solo's annual dollar price separate from euro totals. Use #98 as the current source for amounts and assumptions.
- Explain required backup and restore work and the provisional consequences of a serious failure in plain language. Do not ask the boss to accept or reject recovery limits until a different, workable and priced option can be offered.
- Describe website availability checks separately from the proposed PostgreSQL backup alert through Scaleway Cockpit. The Cockpit connection, alert test, and custom-metric cost remain open; UptimeRobot Solo is not the proposed backup-alert solution. See [issue #97](https://github.com/carbon-cut/carbon-cut-landing/issues/97).
- Make unpriced costs and remaining technical checks visible without presenting them as completed or approved.

## Explicit exclusions and deferred choices

- Do not put the eight technical server combinations from #95 in the boss-facing comparison; they are supporting detail. Use the path in #98.
- Do not ask for a domain-name decision in this document. The name and final price remain open.
- Do not frame UptimeRobot Free versus Solo as a choice about PostgreSQL backup safety.
- Do not ask the boss to decide a server upgrade date or user-count trigger; neither is validated.
- The boss-facing French questionnaire is a temporary draft under `docs/`; review it before sharing.
