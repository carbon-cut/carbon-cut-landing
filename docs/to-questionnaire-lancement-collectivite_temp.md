# Collectivité — choix pour le lancement

**But :** présenter le coût et les conséquences du lancement, puis recueillir les choix nécessaires avant de préparer la mise en service.

**De :** équipe Carbon Cut

**À :** responsable du projet

**Utilisation des réponses :** préparer le scénario retenu et revenir avec les vérifications et prix définitifs avant tout achat.

## Ce que nous proposons

Commencer avec **un serveur** pour l'application et ses données. Si l'usage réel le nécessite, déplacer ensuite l'application vers un second serveur. Avec un seul serveur, une panne peut arrêter tout le service. Deux serveurs donnent plus de place à l'application, mais ne garantissent pas la continuité du service en cas de panne.

| Étape                                    | Personnes en même temps\* | Personnes différentes par jour\* |                                            Prix des serveurs |
| ---------------------------------------- | ------------------------: | -------------------------------: | -----------------------------------------------------------: |
| Lancement : un serveur                   |                   10 à 20 |                         80 à 320 |                                              19,99 €/mois HT |
| Plus tard, si nécessaire : deux serveurs |                   40 à 45 |                        320 à 720 | 62,98 €/mois HT, plus un frais de connexion encore à définir |

\* **Estimations, pas des capacités garanties.** Les serveurs proposés n'ont pas encore été testés à ces niveaux. **« En même temps »** désigne les personnes présentes au même instant ; **« par jour »** compte les personnes différentes au fil de la journée.

## Autres prix, séparés

| Dépense                                         | Repère de prix                                                                                                                                                                                                                                                       |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Messagerie et e-mails envoyés par l'application | 1,60 €/mois HT                                                                                                                                                                                                                                                       |
| Stockage des sauvegardes                        | Environ 1,61 €/mois HT pour une hypothèse provisoire de 100 Go ; montant réel selon l'usage                                                                                                                                                                          |
| Surveillance du site                            | Gratuite : contrôle toutes les 5 minutes ; ou Solo : contrôle toutes les minutes, 108 $ payés à l'année. Ce choix ne concerne pas les sauvegardes. Détails dans « Vos choix » ci-dessous.                                                                            |
| Alerte sur les sauvegardes                      | Exemple de calcul : environ 0,02 €/mois si trois états sont envoyés chaque minute. Le montant réel dépendra du réglage ; le système doit encore être installé et testé. [Tarif publié](https://www.scaleway.com/en/docs/cockpit/reference-content/cockpit-pricing/). |
| Nom de domaine                                  | Environ 10 à 30 €/an HT pour des extensions courantes ; le prix final dépendra du nom et de l'extension choisis. [Tarifs publiés](https://www.hetzner.com/whois.env?country=de).                                                                                     |
| Essai de récupération des données               | Exemple par essai : 0,77 € HT pour un serveur loué 24 heures, plus 0,25 à 1,00 € pour télécharger 100 Go. Durée, volume et temps de travail réels à mesurer.                                                                                                         |
| Certificat de sécurité du site                  | 0 € de frais de certificat ; mise en place à effectuer                                                                                                                                                                                                               |
| Site de test permanent                          | 0 €/mois : non prévu pour ce lancement                                                                                                                                                                                                                               |

## Résumé des coûts selon les choix

En additionnant le serveur, la messagerie, **100 Go de sauvegardes à titre d'hypothèse** et l'**exemple d'alerte à 0,02 €/mois** :

| Situation                     | Coût mensuel estimé | Sur 12 mois, domaine compris | Si vous choisissez Solo          |
| ----------------------------- | ------------------: | ---------------------------: | -------------------------------- |
| Lancement avec un serveur     |          23,22 € HT |         288,64 à 308,64 € HT | Ajouter 108 $ payés pour l'année |
| Plus tard, avec deux serveurs |          66,21 € HT |         804,52 à 824,52 € HT | Ajouter 108 $ payés pour l'année |

Chaque essai de récupération coûterait environ **1,02 à 1,77 € HT** dans l'exemple retenu. Avec deux serveurs, un frais de connexion reste à chiffrer.

Ces montants sont des repères, pas un devis : le stockage, l'alerte, les essais et le temps de travail réel peuvent changer les coûts. Les montants en euros HT excluent la TVA ; le prix final de Solo sera vérifié avant achat.

**En cas de panne grave :** nous visons au maximum 15 minutes d'enregistrements récents perdus et un retour du service au plus tard le jour ouvré suivant. Cela doit encore être vérifié par un essai réel. Une alerte sur les sauvegardes et des essais réguliers de récupération sont nécessaires.

## Comment répondre

**Temps estimé :** 5 minutes. **Date de retour :** à convenir. Vous pouvez répondre « à discuter » ; une réponse partielle est utile.

## Vos choix

### 1. Retenez-vous le scénario proposé pour le lancement : un serveur au départ, avec un second seulement si les mesures le justifient plus tard ?

> ☐ Oui ☐ Non ☐ À discuter
>
> Si non ou à discuter, quel point souhaitez-vous revoir ?

### 2. Pour surveiller le site, quelle formule préférez-vous ?

**Gratuite — 0 € :** vérifie toutes les cinq minutes que le site s'ouvre. Elle ne vérifie pas que le backend ou la base de données fonctionnent. Le site peut donc sembler disponible alors qu'une partie importante est en panne.

**Solo — 108 $ payés pour l'année :** vérifie le site toutes les minutes. Si nous mettons en place le contrôle adapté, elle peut aussi vérifier que le backend répond correctement. Elle ne prouve pas qu'une sauvegarde des données est utilisable ; cela fait l'objet d'un contrôle séparé.

> ☐ Gratuite : contrôle toutes les 5 minutes
>
> ☐ Solo : contrôle toutes les minutes, 108 $ payés à l'année
>
> ☐ À discuter
