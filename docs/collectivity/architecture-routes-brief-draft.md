# Collectivity Architecture And Routes Draft

Short draft to validate direction before writing a fuller architecture spec.

## 1. Product Direction

`Collectivity` should be a territorial climate-plan builder, not a dashboard.

Core chain:

1. `Cadrage`
2. `Inventaire`
3. `Scénarios` (`BaU` / `BaC`)
4. `Plan d'action`
5. `Investissements`
6. `Feuille de route`
7. `Pilotage`
8. `Reporting`

Product rule:

- each module must depend on the previous one
- inventory is the operational base
- scenarios depend on inventory
- actions depend on scenarios
- investments and roadmap depend on actions
- pilotage sits across implementation, not at the beginning

## 2. Route Direction

Recommended route shape:

```txt
/collectivity
/collectivity/[planId]
/collectivity/[planId]/cadrage
/collectivity/[planId]/inventaire
/collectivity/[planId]/inventaire/profil
/collectivity/[planId]/inventaire/patrimoine
/collectivity/[planId]/inventaire/territoire
/collectivity/[planId]/inventaire/hypotheses
/collectivity/[planId]/inventaire/preuves
/collectivity/[planId]/scenarios
/collectivity/[planId]/scenarios/bau
/collectivity/[planId]/scenarios/bac
/collectivity/[planId]/actions
/collectivity/[planId]/actions/[actionId]
/collectivity/[planId]/investissements
/collectivity/[planId]/feuille-de-route
/collectivity/[planId]/pilotage
/collectivity/[planId]/reporting
/collectivity/[planId]/communes
/collectivity/[planId]/communes/[communeId]
```

Route rule:

- one route = one clear job
- avoid mixing inventory with scenarios on the same screen
- communal declinations should inherit the same logic as the territory plan

## 3. Inventory Screen Direction

The current screen should only represent:

- one plan
- one inventory workspace
- one active inventory subsection

First viewport must show:

1. plan identity
2. active inventory section
3. editable fields immediately
4. missing-data / evidence context nearby

It should not show:

- product-level explanation
- future-module skeletons
- oversized summary bands
- large dead space before inputs

Minimal layout direction:

```txt
[ Plan title + year + territory ] [actions]

[ inventory subsection rail ] [ active form workspace ]
                           [ fields first ]
                           [ required datasets ]
                           [ evidence / assumptions ]

[ sticky submit / save area ]
```

## Open Decision

The main decision to lock next:

- should `/collectivity/[planId]` be an overview page
- or should it redirect directly to `/collectivity/[planId]/inventaire`

My current recommendation:

- keep `/collectivity/[planId]` as a lightweight overview later
- design the real working screen now as `/collectivity/[planId]/inventaire`
