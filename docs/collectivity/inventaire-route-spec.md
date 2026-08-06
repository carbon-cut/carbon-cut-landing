# Route Spec: Inventaire

Before changing this route spec, read `docs/collectivity/00-product-truth.md`.

This route spec must follow product truth and must not invent product structure on its own.

Ce document décrit le deuxième grand écran à implémenter :

`/collectivity/[planId]/inventaire`

## Rôle

La route `inventaire` sert à saisir et importer les données d'inventaire.

Elle répond à une question simple :

`quelles données saisissons-nous ou importons-nous pour alimenter l'inventaire ?`

## Ce que cette route doit contenir

- les domaines de collecte
- les jeux de données attendus
- les sources et pièces justificatives liées à la collecte
- les données saisies ou importées
- l'état d'avancement de la collecte
- les manques ou points à clarifier signalés pendant la saisie

## Ce que l'utilisateur fait ici

- saisir ou importer les données d'activité
- rattacher les sources disponibles
- signaler les données manquantes ou les points à clarifier
- suivre l'état d'avancement de la collecte

## Sortie attendue

À la fin de l'`inventaire`, le produit doit disposer :

- d'une base de données d'activité exploitable
- d'un état d'avancement clair
- d'une collecte suffisamment structurée pour alimenter la suite du produit

## Sections minimales recommandées

1. `Domaines de collecte`
2. `Saisie et import`
3. `Sources et justificatifs`
4. `Suivi d'avancement`

## Règle de lecture

Le compte `municipality` peut voir l'ensemble de la collecte et de son état d'avancement.
