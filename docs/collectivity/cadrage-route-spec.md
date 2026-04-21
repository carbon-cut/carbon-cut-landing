# Route Spec: Cadrage

Ce document décrit le premier grand écran à implémenter :

`/collectivity/[planId]/cadrage`

## Rôle

La route `cadrage` sert à définir le cadre commun du plan avant l'inventaire, les scénarios et les actions.

Il répond à une question simple :

`quel est le périmètre exact du plan sur lequel tout le reste va s'appuyer ?`

## Ce que cette route doit contenir

- identité du plan
- territoire de référence
- communes incluses
- périmètre organisationnel
- périmètre opérationnel
- secteurs couverts
- scopes couverts
- année de référence
- horizon cible

## Ce que l'utilisateur fait ici

- renseigner ou vérifier le territoire concerné
- choisir les communes incluses dans le plan
- confirmer ce qui entre dans le périmètre du plan
- fixer l'année de référence et l'horizon cible
- vérifier que le cadre est assez clair pour lancer l'inventaire

## Ce que cette route ne fait pas

- il ne sert pas à saisir les données d'activité détaillées
- il ne sert pas à calculer les émissions
- il ne sert pas à construire les scénarios
- il ne sert pas à gérer les fiches actions

## Sortie attendue

À la fin du `cadrage`, le produit doit disposer d'un cadre stable et partagé pour :

- l'inventaire
- les comparaisons entre années
- les scénarios `BaU` / `BaC`
- les actions et leurs investissements

## Sections minimales recommandées

1. `Identité du plan`
2. `Territoire et communes`
3. `Périmètre`
4. `Secteurs et scopes`
5. `Temporalité`
6. `État de complétude`

## Règle de lecture

Le compte `Grand Sfax / municipalité` peut voir et modifier l'ensemble du cadrage.

Un compte `commune` ne voit que ce qui est pertinent pour son `patrimoine municipal`, sans reprendre la main sur tout le cadre territorial.
