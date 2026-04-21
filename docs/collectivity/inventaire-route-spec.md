# Route Spec: Inventaire

Ce document décrit le deuxième grand écran à implémenter :

`/collectivity/[planId]/inventaire`

## Rôle

La route `inventaire` sert à construire et lire la base d'émissions du plan.

Elle répond à une question simple :

`quelles données avons-nous, que manque-t-il encore, et quels résultats d'inventaire peut-on déjà lire ?`

## Ce que cette route doit contenir

- les années couvertes par l'inventaire
- l'année marquée comme `IRE`
- au moins une autre année de comparaison si disponible
- les domaines de collecte
- les jeux de données attendus
- les sources et pièces justificatives liées à la collecte
- les hypothèses ou manques signalés
- les résultats d'inventaire lisibles par périmètre, source ou catégorie

## Ce que l'utilisateur fait ici

- choisir l'année qu'il est en train de consulter ou compléter
- saisir ou importer les données d'activité
- rattacher les sources disponibles
- signaler les données manquantes ou hypothèses de travail
- vérifier l'état de complétude de la base
- lire les résultats déjà produits par l'inventaire

## Ce que cette route ne fait pas

- elle ne sert pas à définir le cadre global du plan
- elle ne sert pas à construire les scénarios `BaU` / `BaC`
- elle ne sert pas à gérer les fiches actions
- elle ne sert pas à piloter tout le plan

## Sortie attendue

À la fin de l'`inventaire`, le produit doit disposer :

- d'une base de données d'activité exploitable
- d'une lecture claire des manques et hypothèses
- d'un résultat d'inventaire lisible
- d'une comparaison possible entre l'`IRE` et au moins une autre année si disponible

## Sections minimales recommandées

1. `Années d'inventaire`
2. `Domaines de collecte`
3. `Saisie et import`
4. `Sources et justificatifs`
5. `Hypothèses et manques`
6. `Résultats d'inventaire`
7. `État de complétude`

## Règle de lecture

Le compte `Grand Sfax / municipalité` peut voir l'ensemble de l'inventaire territorial et ses découpes.

Un compte `commune` ne voit que ce qui est pertinent pour son `patrimoine municipal`, sans accéder à tout le périmètre territorial.
