# Lecture du rapport PAEDC de Grand Sfax

Ce document synthétise le rapport source pour servir de base à l'architecture produit, au découpage des modules, puis à la définition des routes de l'application `collectivity`.

## Source

- Rapport lu : `docs/collectivity/PAEDC_Grand Sfax FINAL.docx`
- Titre du rapport : `Plan d’Action en faveur de l’Energie Durable et du Climat du Grand Sfax (PAEDC-Sfax)`
- Date : `Décembre 2023`

## But du rapport

Le rapport ne décrit pas un simple calcul de bilan carbone.

Il décrit une chaîne complète de transformation territoriale :

1. définir le périmètre
2. construire un inventaire GES
3. projeter un scénario tendanciel (`BaU`)
4. construire un scénario de transition bas-carbone (`BaC`)
5. traduire ce scénario en fiches actions
6. chiffrer les investissements
7. séquencer la mise en oeuvre
8. organiser la gouvernance
9. décliner le plan au niveau de chaque commune

En une phrase, le rapport suit cette logique :

`mesurer -> comprendre -> projeter -> décider -> chiffrer -> planifier -> piloter`

## Structure réelle du rapport

Les grandes parties lues dans le document sont :

1. `Contexte`
2. `Approche de développement du PAEDC`
3. `Périmètre`
4. `Inventaire des émissions de GES`
5. `Scénarios et cible d’atténuation`
6. `Plan d’action`
7. `Annexes`

Les annexes sont importantes pour le produit, car elles ne sont pas accessoires :

- `Annexe 1` : canevas de collecte des données
- `Annexe 2` : plans d’action individuels des 7 communes du Grand Sfax
- `Annexe 3` : perspectives d’évolution de la population du Grand Sfax par commune

## Ce que le produit doit reproduire

Le produit `collectivity` doit reprendre la même colonne vertébrale que le rapport.

### 1. Périmètre

Le rapport distingue explicitement :

- un `périmètre organisationnel`
- un `périmètre opérationnel`

Le produit doit donc pouvoir représenter au minimum :

- la ville ou l'agglomération couverte
- les communes incluses
- les secteurs couverts
- les scopes couverts
- la distinction entre `patrimoine municipal` et `territoire`

### 2. Inventaire

Le rapport présente un inventaire GES structuré par :

- méthodologie
- gaz inclus
- sources d'émissions
- scopes
- collecte des données
- résultats globaux
- résultats patrimoines municipaux
- analyses par source

Le produit doit donc permettre :

- de saisir ou importer les données d'activité
- de documenter les hypothèses
- de rattacher les preuves et sources
- de calculer les résultats par périmètre, source et scope
- de distinguer clairement le municipal du territorial

### 3. Scénarios

Le rapport fait une prospective à horizon 2030 avec :

- un `BaU` : poursuite des tendances
- un `BaC` : scénario de transition

Le produit doit donc permettre :

- de stocker les hypothèses par secteur
- de générer des trajectoires de données d'activité
- de comparer les émissions entre `BaU` et `BaC`
- d'estimer le potentiel de réduction
- de fixer une cible climatique

### 4. Plan d'action

Le rapport transforme la stratégie en fiches actions sectorielles.

Actions repérées dans le rapport :

1. gouvernance / portage du plan climat
2. patrimoine municipal
3. plantations urbaines
4. déchets solides
5. transport
6. résidentiel et petit tertiaire
7. industrie
8. tertiaire
9. agriculture / pompage
10. assainissement

Le produit doit donc permettre de gérer un portefeuille d'actions, pas seulement une liste.

Chaque action doit pouvoir répondre à au moins :

- son contexte / justificatif
- son objectif
- son secteur
- ses acteurs
- son impact attendu
- son investissement
- son calendrier

### 5. Investissements

Le rapport donne un vrai poids à la dimension financière.

Exemples observés :

- investissement total du plan sur `2024-2030`
- répartition sectorielle des investissements
- importance du photovoltaïque dans le total
- besoins par action
- besoins par année
- besoins par commune

Le produit doit donc pouvoir gérer :

- un coût total par action
- un phasage annuel
- des regroupements par secteur
- des regroupements par commune
- des hypothèses de financement

### 6. Gouvernance et pilotage

Le rapport traite la gouvernance comme une action à part entière.

Le produit doit donc intégrer autre chose que des mesures techniques :

- portage institutionnel
- secrétariat ou cellule de coordination
- responsables
- partenaires
- suivi
- transparence
- communication

Autrement dit, le produit doit pouvoir piloter un plan, pas uniquement le calculer.

### 7. Déclinaison communale

Le rapport ne s'arrête pas au niveau `Grand Sfax`.

Il prévoit des déclinaisons par commune, avec au moins :

- rappel des résultats d'inventaire de la commune
- scénario `BaU` communal
- scénario `BaC` communal
- actions adaptées à la commune
- investissements requis

Le produit doit donc être pensé comme :

- un cadre méthodologique commun
- une couche territoriale agrégée
- une couche communale réplicable

## Données et objets métier implicites

La lecture du rapport fait apparaître les objets métier suivants.

### Objets de cadrage

- `Plan climat`
- `Territoire`
- `Commune`
- `Périmètre organisationnel`
- `Périmètre opérationnel`
- `Année de référence`
- `Horizon cible`

### Objets inventaire

- `Secteur`
- `Source d'émission`
- `Scope`
- `Jeu de données`
- `Indicateur d'activité`
- `Hypothèse`
- `Méthode`
- `Pièce justificative`
- `Résultat d'inventaire`

### Objets scénarios

- `Scénario`
- `Hypothèse de trajectoire`
- `Trajectoire d'activité`
- `Trajectoire d'émissions`
- `Cible de réduction`

### Objets plan d'action

- `Action`
- `Mesure`
- `Acteur`
- `Responsable`
- `Partenaire`
- `Statut`
- `Impact carbone`
- `Investissement`
- `Échéance`
- `Jalon`

### Objets pilotage

- `Preuve d'avancement`
- `Commentaire de suivi`
- `Risque`
- `Besoin de financement`
- `Décision`

## Ce que l'annexe de collecte implique pour l'interface

L'annexe 1 montre que la collecte n'est pas un simple formulaire générique.

Le rapport prévoit des canevas spécifiques pour :

- parc de véhicules
- éclairage public
- bâtiment
- arbres / parcs urbains / déchets
- demande électrique
- photovoltaïque
- gaz naturel
- chauffe-eau solaires
- ports
- transport en commun
- transport aérien
- AFAT / oliveraies / arboriculture / élevage / engrais / production agricole
- transport
- assainissement

Implication produit :

- l'inventaire ne doit pas être conçu comme une seule page uniforme
- il faut des sous-modules de collecte spécialisés
- certains jeux de données seront tabulaires
- certains jeux de données devront accepter import et preuves
- les hypothèses et méthodes doivent être visibles au niveau de chaque dataset

## Ce que les fiches actions impliquent pour le produit

La lecture des fiches actions montre un format semi-structuré récurrent :

- `contexte / justificatif`
- `objectifs`
- `description de l'action`
- `acteurs mobilisés`
- `impacts`
- `investissement`

Implication produit :

- le module `plan d'action` doit être basé sur une structure de fiche
- il ne faut pas se limiter à des cartes de résumé
- la gouvernance doit exister comme fiche action réelle
- les acteurs et investissements doivent être des données de premier niveau

## Ce que les déclinaisons communales impliquent

Le rapport montre un modèle réplicable :

- commune de référence avec audit détaillé (`Sfax`)
- communes sans audit complet mais avec transposition méthodologique
- scénarios et actions adaptés à chaque commune

Implication produit :

- le produit doit supporter un niveau `territoire` et un niveau `commune`
- les modèles, hypothèses ou coefficients doivent pouvoir être hérités puis ajustés
- il faut probablement un mécanisme de `template -> adaptation locale`

## Conséquences pour l'architecture produit

Le produit `collectivity` ne doit pas être pensé comme un `dashboard`.

Il doit être pensé comme un `moteur de plan climat territorial`.

### Modules produit recommandés

1. `Cadrage`
2. `Inventaire`
3. `Scénarios`
4. `Plan d'action`
5. `Investissements`
6. `Feuille de route`
7. `Pilotage`
8. `Reporting`

### Rôle de chaque module

#### Cadrage

- territoire, communes, année de référence, horizon, secteurs, scopes, méthode

#### Inventaire

- collecte, import, preuves, hypothèses, résultats de base

#### Scénarios

- `BaU`, `BaC`, hypothèses, comparaisons, cible 2030

#### Plan d'action

- fiches actions, secteurs, acteurs, impact, statut

#### Investissements

- coûts, ventilation annuelle, ventilation communale, financement

#### Feuille de route

- séquencement, jalons, dépendances, calendrier

#### Pilotage

- gouvernance, responsables, suivi, preuves d'avancement

#### Reporting

- export du plan, synthèses par territoire, synthèses par commune

## Proposition de squelette de routes

Ce n'est pas encore une décision finale, mais le rapport pousse naturellement vers un arborescence de ce type :

```txt
/collectivity
/collectivity/[planId]
/collectivity/[planId]/cadrage
/collectivity/[planId]/inventaire
/collectivity/[planId]/inventaire/perimetre
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
/collectivity/[planId]/communes/[communeId]/inventaire
/collectivity/[planId]/communes/[communeId]/scenarios
/collectivity/[planId]/communes/[communeId]/actions
/collectivity/[planId]/communes/[communeId]/investissements
```

## Implication immédiate pour l'écran que nous concevons maintenant

L'écran actuel ne doit représenter qu'une seule chose :

- `l'espace Inventaire`

Il ne doit pas essayer de représenter toute l'application.

L'écran d'inventaire doit d'abord répondre à quatre questions :

1. quelle base / quel territoire suis-je en train d'éditer ?
2. dans quel sous-domaine de l'inventaire suis-je ?
3. quelles données dois-je saisir maintenant ?
4. qu'est-ce qui manque encore pour rendre la base exploitable ?

Conséquences UI :

- en-tête compact
- entrée de données visible immédiatement
- rail ou navigation interne à l'inventaire uniquement
- preuves et hypothèses comme supports de la saisie
- pas de grande intro produit en haut de page

## Points de vigilance

- Le rapport mêle niveau `territoire` et niveau `patrimoine municipal`, donc l'UI doit les séparer clairement.
- Le rapport accorde un rôle central à la gouvernance ; il ne faut pas la réduire à une simple note.
- Les investissements et le calendrier ne sont pas des annexes visuelles, mais des sorties majeures.
- Les déclinaisons communales sont structurelles, pas accessoires.
- Certaines données proviennent d'audits réels, d'autres d'approximations ou de transpositions ; le produit doit garder la traçabilité de cette différence.

## À faire ensuite

Ce document peut maintenant servir de base à trois livrables séparés :

1. un `document d'architecture produit`
2. un `plan de routes Next.js`
3. un `brief UI strict pour l'écran inventaire`

## Limite de lecture

Cette synthèse est basée sur la lecture textuelle du `.docx`.

Elle est fiable pour :

- la structure du rapport
- les modules
- les types de données
- la logique de progression
- les grandes actions

Elle ne remplace pas une reprise exhaustive des tableaux chiffrés, figures et formules si l'on veut implémenter les calculs détaillés.
