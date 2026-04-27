# Route Spec: Cadrage

Before changing this route spec, read `docs/collectivity/00-product-truth.md`.

This route spec must follow product truth and must not invent product structure on its own.

Ce document décrit le premier grand écran à implémenter :

`/collectivity/[planId]/cadrage`

## Rôle

La route `cadrage` sert à définir le territoire et les années du cadrage.

Il répond à une question simple :

`quel est le territoire du plan, et quelles années seront utilisées pour l'inventaire ?`

## Ce que cette route doit contenir

- territoire de référence
- année de référence
- années d'appoint

## Ce que l'utilisateur fait ici

- renseigner ou vérifier le territoire concerné
- fixer l'année de référence
- ajouter une ou plusieurs années d'appoint

## Sortie attendue

À la fin du `cadrage`, le produit doit disposer d'un cadre stable pour :

- le territoire
- les années de travail de l'inventaire

## Sections minimales recommandées

1. `Territoire`
2. `Temporalité`

## Règle de lecture

Le compte `municipality` peut voir et modifier le cadrage.
