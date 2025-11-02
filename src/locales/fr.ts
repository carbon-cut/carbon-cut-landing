import { title } from "process";
import { number } from "zod";

export default {
  toast: {
    success: "Succès",
    error: "Erreur",
  },
  components: {
    forms: {
      calendar: "Choisissez une date",
      combox: {
        placeholder: "Rechercher ...",
        notFound: "Aucune entrée  trouvée.",
        value: "Sélectionnez ",
      },
      overview: {
        title: "Aperçu du formulaire",
        description:
          "Afficher toutes les sections et questions de cette évaluation de l'empreinte carbone",
      },
    },
  },
  root: {
    header: {
      menu: {
        Home: { title: "Accueil" },
        About: { title: "À propos" },
        Blog: {
          title: "Blog",
          Categories: "Catégories",
        },
        dashboard: { title: "Mon empreinte carbone" },
        Pages: {
          title: "Pages",
          Contact: "Contact",
          Subscription: "Abonnement",
          Page404: "Page 404",
        },
      },
      userMenu: {
        settings: "Paramètres",
        feedback: "Retour d'expérience",
        logout: "Déconnexion",
      },
    },
  },
  "(pages)": {
    "404": {
      title: "Page non trouvée",
      meta: "Page Non Trouvée",
      description:
        "La page que vous recherchez a peut-être été supprimée,\nrenommée ou est temporairement indisponible.",
      button: "Retour à l'accueil",
    },
    Home: { index: "Accueil" },
    Blog: { index: "Blog" },
    Categories: { index: "Catégories" },
  },
  "(auth)": {
    login: {
      "form.email": "E-mail",
      "form.password": "Mot de passe",
      "form.submit": "Connexion",
      "message.signup": "Vous n'avez pas de compte?",
      "message.or": "OU",
      "link.signup": "S'inscrire",
      "link.forgetPassword": "Mot de passe oublié ?",
    },
    signup: {
      "form.fullName": "Nom complet",
      "form.email": "E-mail",
      "form.password": "Mot de passe",
      "form.passwordConfirm": "Confirmez le mot de passe",
      "form.submit": "Créer un compte",
      "message.login": "Vous avez déjà un compte ?",
      "message.or": "OU",
      "link.login": "Se connecter",
    },
    forgetPassword: {
      "form.email": "E-mail",
      "form.submit": "Envoyer",
      "message.email": "Consultez votre messagerie",
      "form.password": "Nouveau mot de passe",
      "form.passwordConfirm": "Confirmez le nouveau mot de passe",
      "message.code":
        "Nous avons envoyé un lien de vérification à votre adresse e-mail",
    },
    verify: {
      "message.email":
        "Nous avons envoyé un code de vérification à votre adresse e-mail {email}",
      "form.submit": "Envoyer",
      "form.reset": "Renvoyer",
      "toast.succ": "L'e-mail a été envoyé.",
    },
  },
  "(user)": {
    items: {
      Account_Settings: {
        title: "Paramètres du compte",
        Profile: "Profil",
      },
      Prefrences: {
        title: "Préférences",
        Notifications: "Notifications",
        Language: "Langue",
      },
      Payments: {
        title: "Paiements",
        Card_information: "Informations sur la carte",
      },
      Security: {
        title: "Sécurité",
        PassAuth: "Mot de passe et auth",
      },
    },
    profile: {
      title: "Profil public",
      form: {
        username: "nom d'utilisateur",
        email: "e-mail",
        birthDate: "date de naissance",
        gender: {
          title: "sexe",
          male: "homme",
          female: "femme",
        },
        country: "pays",
        submit: "Mettre à jour le profil",
      },
      image: {
        tooltip: "télécharger une nouvelle photo",
        title: "Télécharger",
      },
    },
    authentication: {
      title: "Changer le mot de passe",
      form: {
        currentPassword: "mot de passe actuel",
        password: "nouveau mot de passe",
        passwordConfirmation: "confirmez le nouveau mot de passe",
        submit: "Changer le mot de passe",
      },
    },
  },
  forms: {
    basic: {
      energie: {
        housing: {
          title: "Logement",
          q1: {
            q1: "Parlez-nous de votre logement :",
            q1Labels: {
              type: "type",
              area: "surface",
              heatedVolume: "volume chauffé",
              conditionedVolume: "volume climatisé",
            },
            options: ["appartment", "maison", "villa", "autre"],
            q2: "combien de chambres avez-vous?",
            q3: "est-ce que votre maison a:",
            q3Labels: {
              thermalInsulation: "isolation thermique",
              insulatedGlazing: "double vitrage",
            },
            alert: {
              title: "Note",
              description:
                "Nous posons ces questions afin de mieux comprendre votre situation et de vous fournir des conseils et des informations plus précis.",
            },
          },
        },
        heating: {
          title: "système de chauffage",
          q: "Quel type de système de chauffage utilisez-vous pour chauffer votre maison?",
          options: {
            heatPump: { label: "Pompe à chaleur", unit: "null" },
            electricity: { label: "Électricité", unit: "null" },
            electricHeating: { 
              label: "Chauffage électrique",
              unit: "null",
              fields:{
                energyLabel: "label Energetique",
                dailyFrequency: {label: "Fréquence quotidienne", unit: "h/jours"},
                annualFrequency: {label: "fréquence annuelle", unit: "moins/an"},
                nbUnit: "nombre d'unité individuelle",
              }
            },
            electricalCentralHeating: {
              label: "Chauffage central electrique",
              unit: "null",
              fields:{
                energyLabel: "label Energetique",
                dailyFrequency: {label: "Fréquence quotidienne", unit: "h/jours"},
                annualFrequency: {label: "fréquence annuelle", unit: "moins/an"},
              }
            },
            gasNetwork: { label: "Réseau de gaz", unit: "null" },
            heatNetwork: { label: "Réseau de chaleur", unit: "null" },
            GPL: {
              label: "Gaz de pétrole liquéfié (GPL)",
              unit: "bouteille",
              big:'Grand Format',
              small:'Petit Format',
              types: {
                propane: "propane: vert/doré",
                butane: "butane bleu foncé/rouge",
                butaneSmall: "butane 5.5kg rouge",
                butaneBig: "butane 10kg rouge/bleu",
                propaneBig: "propane: 5kg jaune",
                propaneSmall: "propane: 13kg vert/doré",
              },
              frequency: {
                placeholder: "sélectionnez fréquence",
                month: "chaque mois",
                year: "chaque annné",
              },
            },
            gasTank: { label: "Citerne de gaz", unit: "null" },
            QgasTank: {
              title:'Citerne de gaz',
              q: "Informations supplémentaires sur la citerne de gaz",
              l1: "Fréquence",
              u1: "remplissages/an",
              l2: 'Capacité',
              u2: 'L',
            },
            fioul: { 
              q: "Informations supplémentaires sur l'usage de fioul",
              label: "Fioul domestique", unit: "L/fréquence",
              placeholder: 'quantity', 
              frequency:{
                label:'Fréquence',
                month:'mois',
                year:'année'
              } },
            charcoal: { 
              label: "Charbon",
              unit: "Kg/" ,
              frequency: 'fréquence',
              qunits:{
                label: 'unité',
                kg: 'Kg',
                m3: 'm3',
              },
              funits:{
                label: 'Fréquence',
                day: 'jour',
                week: 'semaine',
                month: 'mois',
                year: 'annee'
              },
            },
            wood: {
              label: "Bois",
              title: "Bois et Charbon",
              quantity: "Quantité",
              unit: "Kg/",
              frequency: 'fréquence',
              qunits:{
                label: 'unité',
                kg: 'Kg',
                m3: 'm3',
                stere: 'stere'
              },
              funits:{
                label: 'Fréquence',
                day: 'jour',
                week: 'semaine',
                month: 'mois',
                year: 'annee'
              },
            },
          },
          q2:{
            q: 'what is the type of your fireplace?',
            title: 'Fireplace Type',
            rows:{
              insert: 'Insert',
              stove: 'poele',
              openFireplace: 'openFireplace',
              woodBoiler: 'woodBoiler',
            }

          }
        },
        q1: {
          title: "facture d'électricité",
          q1: "En utilisant votre facture d'électricité comme référence, quelle a été votre consommation d'électricité au cours des 12 derniers mois ?",
          q2: "Quel est l'index de votre compteur d'électricité ?",
          q3: "Si vous n'avez pas votre facture, quelle a été votre dépense mensuelle en électricité pendant cette année ?",
          Total: "Totale",
        },
        q2: {
          title: "facture de gaz",
          q1: "En utilisant vos factures de gaz comme référence, quelle a été votre consommation de gaz au cours des 12 derniers mois ?",
          q2: "Quelle est la lecture de votre compteur de gaz ?",
          q3: "Si vous n'avez pas votre facture, quelle a été votre dépense mensuelle de gaz au cours de l'année dernière ?",
          Total: "Totale",
          alert: {
            title: "Note",
            description:
              "Si votre facture n'est pas mensuelle, vous pouvez saisir une seule valeur pour toute la période. Par exemple : Mars : 0, Avril : 0, Mai : 1020.",
          },
        },
        heatingBill: {
          title:'Réseaux de chaleur',
          q: "En utilisant vos factures de réseaux de chaleur comme référence, quelle a été votre consommation au cours des 12 derniers mois ?",
          q2: "Quel est l'index de votre compteur de chaleur ?",
          q3: {
            q: "Si vous n'avez pas votre factures, quelle a été votre dépense anunuelle pendant cette année ?",
            money: "Total depenses",
            price: "Prix d'un kWh",
          },
        },
      },
      transport: {
        qCar: {
          q: "Combien de voitures possède votre ménage ?",
        },
        qAux: {
          q: "Est-ce que vous utilisez un transport auxiliaire ?",
          electricBike: "Vélos électrique",
          electricScooter: "Trottinette électrique",
        },
        qMotos: {
          qMoto: {
            q: "Combien de motos possède votre ménage ?",
          },
          "qMoto1-1": {
            q: "Informations sur la moto",
            l1: "Marque",
            l2: "Modèle",
          },
          "qMoto1-2": {
            q: "Quel type de moto avez-vous ?",
            Gasoline: "Essence",
            Diesel: "Diesel",
            "natural Gaz": "Bio-gaz",
            Electrique: "Électrique",
            "Plug-in Hybrid": "Hybride rechargeable",
            "mild Hybrid": "Hybride léger",
          },
          qMoto2: {
            q: "Informations supplémentaires",
            l3: "Année",
            l4: "Cylindrée",
            l5: "Consommation par 100 km",
          },
          qMoto3: {
            q1L: "Combien de litres votre moto consomme-t-elle par semaine ?",
            q1E: "Combien d'electricite (en kW h) votre moto consomme-t-elle par semaine ?",
            q2: "Si vous ne connaissez pas la consommation, vous pouvez fournir vos dépenses hebdomadaires.",
            q3: "Quelle est la distance parcourue par votre moto chaque semaine ?",
          },
          qMoto4: {
            q: "Quelle est la distance totale affichée sur le tableau de bord de votre moto ?",
          },
        },
        "qCar1-1": {
          title: ({ index }: { index: number }) =>
            `Voiture ${index + 1} : Informations sur la voiture`,
          q: "Informations sur la voiture",
          l1: "Marque",
          l2: "Modèle",
        },
        "qCar1-2": {
          title: ({ index }: { index: number }) =>
            `Voiture ${index + 1} : type de voiture`,
          q: "Quel type de voiture avez-vous ?",
          Gasoline: "Essence",
          Diesel: "Diesel",
          "natural Gaz": "Bio-gaz",
          Electrique: "Électrique",
          "Plug-in Hybrid": "Hybride rechargeable",
          "mild Hybrid": "Hybride léger",
          other: "Autre",
        },
        "qCar1-3": {
          title: ({ index }: { index: number }) =>
            `Voiture ${index + 1} : carburant de voiture`,
          q: "Quelle est le carburant de votre voiture ?",
          Gasoline: "Essence",
          Diesel: "Diesel",
          "natural Gaz": "Bio-gaz",
          other: "Autre",
        },
        qCar2: {
          title: ({ index }: { index: number }) =>
            `Voiture ${index + 1} : Informations supplémentaires`,
          q: "Informations supplémentaires",
          l3: "Année",
          l4: "Cylindrée",
          l11: "Consommation carburant (L par 100 km)",
          l12: "L / 100 km",
          l21: "Consommation électrique (kWh par 100 km)",
          l22: "kWh / 100 km",
        },
        qCar3: {
          title: ({ index }: { index: number }) =>
            `Voiture ${index + 1} : Consommation de voiture`,
          q1L: "Combien de litres votre voiture consomme-t-elle par semaine ?",
          q1E: "Combien d'electricite (en kWh) votre voiture consomme-t-elle par semaine ?",
          q1LL: "Litres par semaine",
          q1LE: "kWh par semaine",
          q2: "Si vous ne connaissez pas la consommation, vous pouvez fournir vos dépenses hebdomadaires.",
          q3: "Quelle est la distance parcourue par votre voiture chaque semaine ?",
        },
        qCar4: {
          title: ({ index }: { index: number }) =>
            `Voiture ${index + 1} : Distance totale affichée`,
          q: "Quelle est la distance totale affichée sur le tableau de bord de votre voiture ?",
        },
        commonTransport: {
          shortDistances: {
            title:'Moyens de transport communs',
            q: "Quels sont les moyens de transport communs utilisés par tous les membres de votre foyer ?",
            titles: {
              bus: "Bus",
              metro: "Metro",
              train: "Train",
              covoiturage: "Covoiturage",
              add: "Ajouté",
              trip: "Voyage",
            },
            covoiturage: {
              make: "Marque",
              engine: "Type de voiture",
              people: "personnes covoiturées",
              frequency: "frequence hebdomadaire",
              engines: {
                Gasoline: "Essence",
                Diesel: "Diesel",
                "natural Gaz": "Bio-gaz",
                Electrique: "Électrique",
                "Plug-in Hybrid": "Hybride rechargeable",
                "mild Hybrid": "Hybride léger",
                other: "Autre",
              },
              distance: "distance",
            },
            bus:{
              busType: "type de bus",
              frequency: "frequence hebdomadaire",
              nbPeople: "personnes de famille",
              distance: "distance",
              busTypes:{
                  "electric": "Electric",
                  "diesel": "Diesel",
                  "gasoline": "Essence",
                  "hybrid": "Hybride",
                  "naturalGaz": "gaz naturel",
              }
            },
            metro: {
              frequency: "frequence hebdomadaire",
              distance: "distance",
              nbPeople: "personnes de famille",
            },
          },
          longueDistances: {
            title:'Moyens de transport longue distance',
            q: "Quels sont les moyens de transport longue distance utilisés par tous les membres de votre foyer?",
            bus:{
              busTypes:{
                  "other": "Autre",
                  "diesel": "Diesel",
              }
            },
            train: {
              types: {
                "intercity": "Intercity",
                "TER": "TER",
                "TGV": "TGV",
              },
              frequency: "frequence hebdomadaire",
              distance: "distance",
              nbPeople: "personnes de famille",
              type: "type de train",
            },
          },
          qAir: {
            q: "Avez-vous voyagé par avion cette année?",
            lT: "Oui",
            lF: "Non",
            q1: {
              q: "Détails de vos vols",
              description: "Ajoutez les détails de vos vols annuels",
              origin: "origin",
              destination: "destination",
              stopover: "escale",
              via: "À travers",
              frequency: "frequence annuelle",
              aircraftType: "Type Avion",
              class: "class de vol ",
              roundTrip: "Allez-retour",
              carbonEmissions: "Emissions de Carbon",
              distance: "Distance",
            },
          },
          qSea: {
            q: "Avez-vous voyagé par mer l'année dernière ?",
            lT: "Oui",
            lF: "Non",
            q1: {
              fluvial: "Fluvial",
              wcar: "avec Voiture?",
              ferry: "Ferry",
              cruise: "Croisière",
              distance: "distance",
              frequency: "frequence annuelle",
            },
          },
        },
      },
    },
    yes: "oui",
    no: "non",
    unit: ({ unit }: { unit: string }) => `en ${unit}`,
    idk: "Je ne sais pas",
    next: "Continuer",
    back: "Précédent",
    preview: "Aperçu",
  },
  utils: {
    months: {
      January: "Janvier",
      February: "Février",
      March: "Mars",
      April: "Avril",
      May: "Mai",
      June: "Juin",
      July: "Juillet",
      August: "Août",
      September: "Septembre",
      October: "Octobre",
      November: "Novembre",
      December: "Décembre",
    },
  },
  locale: "fr",
  language: "Français",
} as const;
