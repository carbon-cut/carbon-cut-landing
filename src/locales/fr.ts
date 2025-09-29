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
          heating: {
            q: "Quel type de système de chauffage utilisez-vous pour chauffer votre maison?",
            options: {
              heatPump: { label: "Pompe à chaleur", unit: "null" },
              electricity: { label: "Électricité", unit: "null" },
              gazNetwork: { label: "Réseau de gaz", unit: "null" },
              heatNetwork: { label: "Réseau de chaleur", unit: "null" },
              GPL: {
                label: "Gaz de pétrole liquéfié (GPL)",
                unit: "bouteille/semaine",
              },
              gazTank: { label: "Citerne de gaz", unit: "null" },
              QgazTank: {
                q: "Informations supplémentaires sur la citerne de gaz",
                l1: "fréquence",
                u1: "remplissages/an",
                l2: "volume",
                u2: "m³",
              },
              fioul: { label: "Fioul domestique", unit: "L/semaine" },
              charcoal: { label: "Charbon", unit: "Kg/semaine" },
              wood: { label: "Bois", unit: "Kg/semaine" },
            },
          },
          q1: {
            q1: "En utilisant votre facture d'électricité comme référence, quelle a été votre consommation d'électricité au cours des 12 derniers mois ?",
            q2: "Quel est l'index de votre compteur d'électricité ?",
            q3: "Si vous n'avez pas votre facture, quelle a été votre dépense mensuelle en électricité pendant cette année ?",
            Total: "Totale",
          },
          q2: {
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
        },
        transport: {
          qCar: {
            q: "Combien de voitures possède votre ménage ?",
          },
          qAux: {
            q: "Est-ce que vous utilisez un transport auxiliaire ?",
            bicycle: "Vélos en libre-service",
            scooter: "Trottinette électrique libre service",
            car: "voiture libre service",
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
            q: "Informations sur la voiture",
            l1: "Marque",
            l2: "Modèle",
          },
          "qCar1-2": {
            q: "Quel type de voiture avez-vous ?",
            Gasoline: "Essence",
            Diesel: "Diesel",
            "natural Gaz": "Bio-gaz",
            Electrique: "Électrique",
            "Plug-in Hybrid": "Hybride rechargeable",
            "mild Hybrid": "Hybride léger",
            other: "Autre",
          },
          qCar2: {
            q: "Informations supplémentaires",
            l3: "Année",
            l4: "Cylindrée",
            l5: "Consommation par 100 km",
          },
          qCar3: {
            q1L: "Combien de litres votre voiture consomme-t-elle par semaine ?",
            q1E: "Combien d'electricite (en kW h) votre voiture consomme-t-elle par semaine ?",
            q2: "Si vous ne connaissez pas la consommation, vous pouvez fournir vos dépenses hebdomadaires.",
            q3: "Quelle est la distance parcourue par votre voiture chaque semaine ?",
          },
          qCar4: {
            q: "Quelle est la distance totale affichée sur le tableau de bord de votre voiture ?",
          },
          commonTransport: {
            shortDistances: {
              q: "Quels sont les moyens de transport communs utilisés par tous les membres de votre foyer ?",
            },
            longueDistances: {
              q: "Quels sont les moyens de transport longue distance utilisés par tous les membres de votre foyer?",
            },
            qAir: {
              q: "Avez-vous voyagé par avion cette année?",
              lT: "Oui",
              lF: "Non",
              q1: {
                origin: "origin",
                destination: "destination",
                stopover: "escale",
                via: "À travers",
                frequency: "frequence annuelle",
                aircraftType: "Type Avion",
                class: "class de vol ",
                roundTrip: "Allez-retour",
                carbonEmissions: "Emissions de Carbon",
                distance: "distance",
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
      unit: "en {unit}",
      idk: "Je ne sais pas",
      next: "Continuer",
      back: "Précédent",
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
  