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

En une phrase, le rapport suit cette logique générale :

`mesurer -> comprendre -> projeter -> décider -> chiffrer -> planifier -> piloter`

Mais pour le produit, la partie `mesurer` n'est pas un bloc simple.

Elle recouvre au minimum :

`cadrer -> collecter -> rattacher les preuves -> calculer -> restituer les résultats d'inventaire`

## Ce que le rapport établit explicitement

### Structure réelle du rapport

Les grandes parties lues dans le document sont :

1. `Avant-propos`
2. `Introduction`
3. `Contexte`
4. `Approche de développement du PAEDC`
5. `Périmètre` comme sous-partie de cette approche
6. `Inventaire des émissions de GES`
7. `Scénarios et cible d’atténuation`
8. `Plan d’action`
9. `Annexes`

Les annexes sont importantes pour le produit, car elles ne sont pas accessoires :

- `Annexe 1` : canevas de collecte des données
- `Annexe 2` : plans d’action individuels ciblant les `patrimoines municipaux` respectifs des 7 communes du Grand Sfax
- `Annexe 3` : perspectives d’évolution de la population du Grand Sfax par commune

## Ce que le rapport implique pour le produit

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

Le rapport montre aussi que le bon niveau d'organisation n'est ni :

- `un inventaire totalement séparé par commune`
- `un inventaire unique où les communes disparaissent complètement dans l'agrégat`

La structure la plus fidèle au document est plutôt la suivante :

- un `plan climat` porté à l'échelle du `Grand Sfax`
- un `territoire` de référence : `Grand Sfax`
- un cadre d'inventaire unique à l'échelle de ce territoire
- à l'intérieur de cet inventaire, des vues ou découpes explicites par `patrimoine municipal` de commune
- en parallèle, une lecture territoriale agrégée couvrant les émissions du Grand Sfax hors seuls patrimoines municipaux

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

Pour le produit, l'`Inventaire` doit être pensé comme un pipeline unique, et non comme une page uniforme.

Ce pipeline doit au minimum permettre :

- de collecter ou importer les données d'activité
- de rattacher les preuves et sources aux jeux de données
- de signaler les hypothèses ou manques lorsqu'une donnée n'est pas directement disponible
- de calculer en interne les émissions par périmètre, source et scope
- de restituer à l'utilisateur les résultats d'inventaire : émissions, catégorisation, ventilations et état de complétude
- de distinguer clairement le municipal du territorial

Le rapport montre également que l'inventaire ne repose pas sur une seule année isolée.

Le produit doit donc pouvoir gérer plusieurs années d'inventaire au sein du même cadre territorial, avec au minimum :

- une année marquée comme `Inventaire de Référence des Emissions (IRE)`
- au moins une autre année de comparaison pour lire l'évolution observée
- des comparaisons entre années servant de base plus solide aux travaux prospectifs

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

Le produit doit donc au minimum permettre :

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

- rappel des résultats d'inventaire du `patrimoine municipal` de la commune
- scénario `BaU` appliqué au `patrimoine municipal` communal
- scénario `BaC` appliqué au `patrimoine municipal` communal
- actions adaptées au `patrimoine municipal` de la commune
- investissements requis pour cette déclinaison municipale

Le produit doit donc être pensé comme :

- un cadre méthodologique commun
- une couche territoriale agrégée
- une lecture communale ciblant d'abord le `patrimoine municipal` de chaque commune à l'intérieur du même cadre produit

## Ce que nous inférons pour le produit

Les points ci-dessous ne sont pas toujours nommés comme tels dans le rapport.

Ils servent à transformer la lecture du document en structure produit exploitable.

### Objets métier utiles

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

- `Cadre d'inventaire territorial`
- `Année d'inventaire`
- `Rôle d'année` (`IRE`, `comparaison`, autre)
- `Secteur`
- `Source d'émission`
- `Scope`
- `Découpe communale`
- `Patrimoine municipal communal`
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

### Capacités transverses utiles

Ces éléments apparaissent comme besoins probables du produit, mais le rapport ne les établit pas encore comme domaine autonome de premier niveau :

- traçabilité des sources et revues documentaires
- commentaires de suivi
- besoins de financement
- décisions et arbitrages
- signaux de risque ou de blocage

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
- l'inventaire doit être conçu comme un workflow avec navigation interne
- l'inventaire doit permettre de lire plusieurs années dans le même espace de travail sans changer de contexte produit global
- il faut des sous-modules de collecte spécialisés
- certains jeux de données seront tabulaires
- certains jeux de données devront accepter import et preuves
- les hypothèses et méthodes doivent être visibles au niveau de chaque dataset
- les résultats d'inventaire doivent être visibles comme sortie de ce workflow
- les résultats doivent pouvoir être lus à la fois au niveau `Grand Sfax` et au niveau `patrimoine municipal` de chaque commune

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
- cette déclinaison communale vise d'abord le `patrimoine municipal` de chaque commune, pas une copie complète du PAEDC territorial
- cette déclinaison communale peut être portée par des règles de portée, de filtre et de permission dans les mêmes modules, sans créer une branche de routes dédiée

## Choix de produit retenus pour commencer l'implémentation

Le produit `collectivity` ne doit pas être pensé comme un `dashboard`.

Il est plus sûr de le démarrer comme un petit noyau produit centré sur quatre routes majeures.

### Modules produit recommandés

1. `Cadrage`
2. `Inventaire`
3. `Scénarios`
4. `Plan d'action`

Ces quatre éléments sont les `modules visibles` du produit au démarrage.

Ils ne doivent pas être confondus avec les routes d'entrée techniques ou contextuelles.

### Rôle de chaque module

#### Cadrage

- territoire, communes, année de référence, horizon, secteurs, scopes, méthode

#### Inventaire

- workflow de collecte, import, hypothèses, calcul interne et restitution des résultats d'inventaire, avec plusieurs années dans un même espace de travail et lecture territoriale/communale

#### Scénarios

- `BaU`, `BaC`, hypothèses, comparaisons, cible 2030

#### Plan d'action

- fiches actions, secteurs, acteurs, impact, statut, avec investissements, feuille de route et pilotage traités comme sous-espaces ou sections internes plutôt que comme routes majeures au départ

### Descriptions courtes des routes

- `/collectivity/[planId]/cadrage` : définir le périmètre, les communes, les secteurs, les scopes, l'année de référence et l'horizon.
- `/collectivity/[planId]/inventaire` : gérer la collecte, les années couvertes et les résultats d'inventaire dans un même espace de travail.
- `/collectivity/[planId]/scenarios` : comparer les trajectoires prospectives et construire les hypothèses `BaU` / `BaC`.
- `/collectivity/[planId]/actions` : gérer le portefeuille des fiches actions, avec les coûts, le calendrier et le suivi dans ce même module.

### Routes d'entrée non modulaires

- `/collectivity` : point d'accès global ou de redirection vers un plan.
- `/collectivity/[planId]` : point d'entrée contextuel du plan avant d'entrer dans un module.

Ces routes ne sont pas des modules produit supplémentaires.

Au démarrage, elles peuvent rester très légères :

- redirection
- sélecteur de plan
- résumé minimal de contexte

## Conclusions de routage utiles pour commencer l'implémentation

À ce stade, le document permet de conclure de manière suffisamment solide les points suivants :

- il faut un contexte racine pour un `plan climat`
- ce plan est rattaché à un `territoire`
- l'application doit exposer un petit nombre de routes alignées avec les grands modules métier
- l'`Inventaire` peut être traité comme un espace unique couvrant plusieurs années, plutôt que comme une famille d'instances déjà figées
- la `commune` peut être traitée comme une portée d'accès et de lecture dans les mêmes routes
- les sous-écrans fins de l'inventaire existent probablement, mais leur statut exact de route n'est pas encore tous confirmé par le rapport

### Routes majeures retenues pour démarrer

Les routes ci-dessous constituent un choix de produit volontairement resserré pour commencer l'implémentation :

```txt
/collectivity/[planId]/cadrage
/collectivity/[planId]/inventaire
/collectivity/[planId]/scenarios
/collectivity/[planId]/actions
```

Les routes d'entrée suivantes existent aussi, mais ne comptent pas comme modules visibles :

```txt
/collectivity
/collectivity/[planId]
```

### Inventaire : un espace multi-années

Le point le plus important pour commencer correctement est le suivant :

- le rapport prouve que l'inventaire couvre plusieurs années
- il ne prouve pas encore qu'il faut modéliser plusieurs objets d'inventaire routables dès le départ

Le choix retenu pour démarrer est donc :

```txt
/collectivity/[planId]/inventaire
```

avec l'idée métier suivante :

- un même espace d'inventaire peut exposer plusieurs années couvertes
- l'une de ces années est marquée comme `IRE`
- au moins une autre année peut servir de comparaison
- le changement d'année est un changement de vue ou de tranche de travail, pas forcément un changement de route

### Sous-routes inventaire : probables, mais encore ouvertes

Le rapport prouve que ces fonctions doivent exister dans l'expérience :

- collecte des données
- preuves / sources
- hypothèses et éléments méthodologiques
- résultats d'inventaire
- lecture patrimoine municipal / lecture territoriale

En revanche, le rapport ne force pas encore chacune de ces fonctions à devenir une URL dédiée.

Pour démarrer l'implémentation, on peut donc traiter, dans un premier temps, ces dimensions comme :

- navigation interne
- tabs
- panneaux secondaires
- vues dépendantes du contexte de collecte

### Déclinaison communale : portée d'accès plutôt que branche dédiée

Le rapport justifie clairement des vues et usages au niveau `commune`.

Le choix retenu pour démarrer est le suivant :

- les routes restent les mêmes pour tous les utilisateurs
- la différence se fait par portée d'accès, filtrage et permissions
- le compte `municipalité / Grand Sfax` voit l'ensemble du périmètre
- le compte `commune` ne voit que les données, actions et vues pertinentes pour son `patrimoine municipal`

Autrement dit, la déclinaison communale devient d'abord un problème de visibilité et d'autorisation, pas un problème de navigation.

En version très simple :

- `Grand Sfax` voit tout le plan
- une `commune` ne voit pas tout le territoire
- une `commune` voit surtout ce qui concerne son propre `patrimoine municipal`

### Décision pratique pour démarrer

Si l'objectif est de commencer à implémenter maintenant, la structure la plus sûre est :

```txt
/collectivity
/collectivity/[planId]
/collectivity/[planId]/cadrage
/collectivity/[planId]/inventaire
/collectivity/[planId]/scenarios
/collectivity/[planId]/actions
```

Cette structure ne prétend pas être prouvée intégralement par le rapport.

Elle constitue un choix de produit simple pour commencer à implémenter sans figer trop tôt des découpages encore ouverts.

## Implication immédiate pour l'écran que nous concevons maintenant

L'écran actuel ne doit représenter qu'une seule chose :

- `l'espace Inventaire`

Il ne doit pas essayer de représenter toute l'application.

L'écran d'inventaire doit d'abord répondre à quatre questions :

1. quelle base / quel territoire suis-je en train d'éditer ?
2. dans quel sous-domaine de l'inventaire suis-je ?
3. quelles données dois-je saisir maintenant ?
4. qu'est-ce qui manque encore pour rendre la base exploitable ?

Il doit aussi rendre visibles les résultats produits par l'inventaire, sans confondre ces résultats avec le mécanisme interne de calcul.

Il ne doit pas non plus faire croire que l'utilisateur change d'application ou de plan lorsqu'il passe d'une année d'inventaire à une autre.

Le changement d'année d'inventaire reste un changement de contexte de travail à l'intérieur du même `plan climat` et du même `territoire`.

Conséquences UI :

- en-tête compact
- entrée de données visible immédiatement
- rail ou navigation interne à l'inventaire uniquement
- preuves et hypothèses comme supports de la saisie
- pas de grande intro produit en haut de page

## Points de vigilance

- Le rapport mêle niveau `territoire` et niveau `patrimoine municipal`, donc l'UI doit les séparer clairement.
- Le rapport ne pousse pas vers `un inventaire autonome par commune`, mais vers un inventaire territorial qui garde des découpes communales explicites.
- Le rapport accorde un rôle central à la gouvernance ; il ne faut pas la réduire à une simple note.
- Les investissements et le calendrier ne sont pas des annexes visuelles, mais des sorties majeures.
- Les déclinaisons communales sont structurelles, pas accessoires.
- Les années d'inventaire sont multiples ; l'`IRE` est une année de référence, pas l'identité complète du shell.
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
