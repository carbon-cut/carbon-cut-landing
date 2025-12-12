import Unit from "@/app/_forms/components/unit";
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
        loading: "Chargement...",
      },
      overview: {
        title: "Aperçu du formulaire",
        description:
          "Afficher toutes les sections et questions de cette évaluation de l'empreinte carbone",
      },
    },
    layout: {
      scrollToTop: {
        label: "Retour en haut de page",
        ariaLabel: "Revenir en haut de la page",
      },
    },
  },
  seo: {
    site: {
      title: "Carbon Cut | Tableau de bord carbone personnel",
      description:
        "Tableau de bord SaaS permettant aux utilisateurs de suivre et de réduire leur empreinte carbone personnelle",
      keywords: [
        "empreinte carbone",
        "tableau de bord climat",
        "calculateur CO2",
        "suivi des émissions",
        "réduction carbone",
        "bilan carbone personnel",
        "SaaS climat",
        "analyse des émissions",
        "optimisation durable",
        "transition écologique numérique",
      ],
    },
    pages: {
      home: {
        title: "Carbon Cut | Mesurez et réduisez votre empreinte carbone",
        description:
          "Découvrez comment Carbon Cut aide les particuliers et les équipes à mesurer, suivre et réduire facilement leur empreinte carbone.",
        keywords: [
          "application empreinte carbone",
          "dashboard environnemental",
          "réduction des émissions",
          "mesure CO2 domicile",
          "sensibilisation climat",
          "suivi durable",
          "solutions bas carbone",
          "outil écologique SaaS",
        ],
      },
      form: {
        title: "Questionnaire Empreinte Carbone | Carbon Cut",
        description:
          "Remplissez le formulaire guidé pour calculer vos émissions de transport, d'énergie, d'alimentation, de déchets et de voyage.",
        keywords: [
          "formulaire empreinte carbone",
          "questionnaire CO2",
          "calculateur émissions transport",
          "bilan énergétique personnel",
          "collecte données climat",
          "auto-évaluation carbone",
          "questionnaire durable",
        ],
      },
      results: {
        title: "Résultats et recommandations carbone | Carbon Cut",
        description:
          "Consultez la répartition de votre empreinte carbone et recevez des recommandations personnalisées pour réduire vos émissions.",
        keywords: [
          "résultats empreinte carbone",
          "recommandations CO2",
          "analyse personnalisée climat",
          "dashboard résultats carbone",
          "suivi des progrès écologiques",
          "plan d'action carbone",
        ],
      },
    },
  },
  home: {
    nav: {
      features: "Fonctionnalités",
      testimonials: "Témoignages",
      pricing: "Tarifs",
      faq: "FAQ",
      toggleLabel: "Basculer la navigation principale",
    },
    hero: {
      title: {
        line1: "Votre empreinte",
        highlight: "carbone",
        line2: "en toute simplicité !",
      },
      description:
        "Mesurez, réduisez et agissez grâce à un parcours guidé et des recommandations personnalisées.",
      imageAlt: "Image héro principale de Carbon Cut",
      primaryCta: {
        label: "Commencer",
        aria: "Commencer le questionnaire empreinte carbone",
      },
      secondaryCta: {
        label: "Découvrir les fonctionnalités",
        aria: "Découvrir les fonctionnalités clés",
      },
      quickLinks: {
        ariaLabel: "Navigation rapide",
        links: {
          features: "Fonctionnalités",
          pricing: "Tarifs",
          testimonials: "Témoignages",
          faq: "Questions fréquentes",
        },
      },
    },
    preview: {
      ariaLabel: "Aperçu du produit",
      imageAlt: "Capture d'écran du tableau de bord Carbon Cut",
    },
    features: {
      badge: "Fonctionnalités",
      title: {
        line1: "Calculez votre impact, réduisez votre",
        line2: {
          prefix: "empreinte et",
          highlight: "préservez la planète",
          suffix: "",
        },
      },
      description:
        "Un tableau de bord SaaS intuitif pour collecter vos données, visualiser vos émissions par poste et accélérer votre transition bas carbone.",
      cards: [
        {
          title: "Calculateur d'empreinte carbone",
          description: "Estimation fiable basée sur vos habitudes.",
          alt: "Icône de calculatrice représentant le calculateur d'empreinte carbone",
        },
        {
          title: "Conseils personnalisés",
          description: "Conseils pratiques pour réduire vos émissions.",
          alt: "Icône de bulle de dialogue symbolisant des conseils personnalisés",
        },
        {
          title: "Tableau de bord carbone",
          description: "Visualisation claire avec graphiques et rapports.",
          alt: "Icône de tableau de bord illustrant la visualisation carbone",
        },
        {
          title: "Comparateur d'émissions",
          description: "Comparez votre empreinte à des moyennes locales et mondiales.",
          alt: "Icône de balance représentant le comparateur d'émissions",
        },
        {
          title: "Plan de réduction carbone",
          description: "Étapes concrètes pour adopter un mode de vie durable.",
          alt: "Icône de planification symbolisant un plan de réduction carbone",
        },
        {
          title: "Analyse pour entreprises",
          description: "Outil pour évaluer et réduire les émissions des entreprises.",
          alt: "Icône analytique représentant l'analyse carbone pour entreprises",
        },
      ],
    },
    testimonials: {
      badge: "Témoignages",
      title: "Ils adoptent Carbon Cut",
      description:
        "Des utilisateurs qui mesurent, comprennent et agissent pour réduire leur empreinte carbone.",
      controls: {
        prev: "Témoignage précédent",
        next: "Témoignage suivant",
      },
      cards: [
        {
          quote:
            "J'ai utilisé ce site pour calculer mon empreinte carbone et j'ai été impressionné par la simplicité et la précision des résultats.",
          detail:
            "Les recommandations pour réduire mon impact sont claires et utiles. Un outil indispensable pour tout le monde qui veut contribuer à la préservation de la planète.",
          name: "Sarah Johnson",
          role: "Marketing Manager",
        },
        {
          quote:
            "Une expérience fluide, des explications claires et un suivi qui motive à progresser.",
          detail:
            "Les conseils personnalisés m'ont aidé à réduire mes émissions de transport en quelques semaines.",
          name: "Hugo Martin",
          role: "Chef de projet",
        },
        {
          quote: "Enfin un outil qui transforme les calculs carbone en actions concrètes.",
          detail:
            "Les visualisations sont claires et le parcours guidé facilite l'engagement de mon équipe.",
          name: "Clara Dupont",
          role: "Responsable RSE",
        },
      ],
    },
    pricing: {
      badge: "Plans & fonctionnalités",
      title: "Tarifs transparents pour chaque étape",
      description:
        "Choisissez le plan adapté à votre maturité carbone et débloquez des fonctionnalités avancées : export des rapports, recommandations ciblées et accompagnement expert.",
    },
    cta: {
      title: "Passez à l’action avec Carbon Cut dès aujourd’hui",
      description:
        "Lancez votre audit carbone, partagez des liens directs avec vos équipes et centralisez les données clés pour piloter vos efforts de réduction.",
      primaryCta: {
        label: "Commencer",
        aria: "Remplir le formulaire de calcul",
      },
      secondaryCta: {
        label: "Voir les offres",
        aria: "Consulter les offres",
      },
      imageAlt: "Image d'une ville polluée pour rappeler l'urgence d'agir",
    },
    faq: {
      badge: "Questions fréquentes",
      title: "FAQ",
      items: [
        {
          title: "Comment fonctionne le calcul de l'empreinte carbone sur ce site?",
          content:
            "Le calcul de votre empreinte carbone se base sur vos réponses à un formulaire simple qui couvre plusieurs aspects de votre quotidien : vos modes de transport, votre consommation d'énergie, vos habitudes alimentaires, votre gestion des déchets et vos voyages, notamment vos vacances. Ces informations sont ensuite analysées pour estimer vos émissions de CO₂ et vous fournir un aperçu clair de votre impact environnemental.",
        },
        {
          title: "Puis-je calculer l'empreinte carbone de mon entreprise?",
          content:
            "Oui, notre site propose également des outils adaptés pour calculer l'empreinte carbone des entreprises. En répondant à des questions spécifiques sur la consommation énergétique, les déplacements professionnels, la gestion des déchets, les achats et la production, vous obtiendrez une estimation des émissions de CO₂ générées par vos activités. Cela vous permettra d’identifier des leviers d’action pour réduire votre impact environnemental.",
        },
        {
          title: "Est-ce que l'outil est gratuit?",
          content:
            "Oui, notre outil propose une période d'essai gratuite pour vous permettre de tester ses fonctionnalités. Après la période d'essai, un abonnement de 10 euros par an pour le plan de base est requis pour continuer à utiliser l'outil et accéder à toutes ses fonctionnalités.",
        },
        {
          title: "Comment puis-je réduire mon empreinte carbone?",
          content:
            "Notre solution vous fournit des recommandations personnalisées basées sur vos réponses, afin de vous aider à réduire votre empreinte carbone. De plus, nous offrons des options de compensation des émissions de CO₂, vous permettant ainsi de compenser votre impact environnemental en soutenant des projets durables et écologiques.",
        },
        {
          title: "Est-ce que mes données sont sécurisées?",
          content:
            "Oui, la sécurité de vos données est une priorité pour nous. Nous utilisons des protocoles de sécurité avancés pour protéger vos informations personnelles et garantir leur confidentialité. Vos données sont stockées de manière sécurisée et ne sont utilisées que dans le cadre de l'estimation de votre empreinte carbone et des recommandations qui en découlent.",
        },
      ],
    },
    footer: {
      brand: {
        name: "Carbon Cut",
        description:
          "Tableau de bord carbone personnel pour suivre, comprendre et réduire vos émissions.",
      },
      headings: {
        quickLinks: "Liens rapides",
        support: "Support & contact",
        social: "Réseaux",
        legal: "Mentions légales",
        newsletter: "Newsletter",
      },
      support: {
        email: "Contacter le support",
        helpCenter: "Centre d'aide",
        demo: "Demander une démo",
      },
      social: {
        linkedin: "LinkedIn",
        twitter: "X / Twitter",
        facebook: "Facebook",
        instagram: "Instagram",
      },
      legal: {
        privacy: "Politique de confidentialité",
        terms: "Conditions d'utilisation",
        cookies: "Politique de cookies",
      },
      newsletter: {
        description:
          "Recevez des conseils bas carbone et les nouveautés produit (1 à 2 emails par mois).",
        placeholder: "Votre email",
        cta: "S'abonner",
        privacy: "Pas de spam. Désinscription en un clic.",
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
      "link.forgetPassword": "Mot de passe oublié?",
    },
    signup: {
      "form.fullName": "Nom complet",
      "form.email": "E-mail",
      "form.password": "Mot de passe",
      "form.passwordConfirm": "Confirmez le mot de passe",
      "form.submit": "Créer un compte",
      "message.login": "Vous avez déjà un compte?",
      "message.or": "OU",
      "link.login": "Se connecter",
    },
    forgetPassword: {
      "form.email": "E-mail",
      "form.submit": "Envoyer",
      "message.email": "Consultez votre messagerie",
      "form.password": "Nouveau mot de passe",
      "form.passwordConfirm": "Confirmez le nouveau mot de passe",
      "message.code": "Nous avons envoyé un lien de vérification à votre adresse e-mail",
    },
    verify: {
      "message.email": "Nous avons envoyé un code de vérification à votre adresse e-mail {email}",
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
            q2: "Combien de chambres avez-vous?",
            q3: "Est-ce que votre maison a:",
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
          badge: {
            multi: "Sélection multiple",
            incomplete: "À compléter",
          },
          options: {
            heatPump: { label: "Pompe à chaleur", unit: "null" },
            electricity: { label: "Électricité", unit: "null" },
            electricHeating: {
              label: "Chauffage électrique",
              unit: "null",
              fields: {
                energyLabel: "label Energetique",
                dailyFrequency: {
                  label: "Fréquence quotidienne",
                  unit: "h/jours",
                },
                annualFrequency: {
                  label: "fréquence annuelle",
                  unit: "moins/an",
                },
                nbUnit: "nombre d'unité individuelle",
              },
            },
            electricalCentralHeating: {
              label: "Chauffage central electrique",
              unit: "null",
              fields: {
                energyLabel: "label Energetique",
                dailyFrequency: {
                  label: "Fréquence quotidienne",
                  unit: "h/jours",
                },
                annualFrequency: {
                  label: "fréquence annuelle",
                  unit: "moins/an",
                },
              },
            },
            gasNetwork: { label: "Réseau de gaz", unit: "null" },
            heatNetwork: { label: "Réseau de chaleur", unit: "null" },
            GPL: {
              title: "Gaz de pétrole liquéfié (GPL)",
              label: "Gaz de pétrole liquéfié (GPL)",
              description:
                "Sélectionnez les types de gaz que vous utilisez et indiquez la fréquence de renouvellement",
              unit: "Bouteille",
              quantity: "Quantité",
              big: "Grand Format",
              small: "Petit Format",
              types: {
                propane: "Propane: 35kg vert/doré", // 35 Kg
                butane: "Butane: 13kg bleu foncé/rouge", //13
                butaneSmall: "Butane: 5.5kg rouge", //5.5
                butaneBig: "Butane: 10kg rouge/bleu", //10
                propaneSmall: "Propane: 5kg jaune", //5
                propaneBig: "Propane: 13kg vert/doré", //13
              },
              frequency: {
                placeholder: "Fréquence",
                month: "chaque mois",
                year: "chaque année",
              },
            },
            gasTank: { label: "Citerne de gaz", unit: "null" },
            QgasTank: {
              title: "Citerne de gaz",
              q: "Informations supplémentaires sur la citerne de gaz",
              l1: "Fréquence",
              u1: "remplissages/an",
              l2: "Capacité",
              u2: "L",
            },
            fioul: {
              q: "Informations supplémentaires sur l'usage de fioul",
              label: "Fioul domestique",
              unit: "L/fréquence",
              placeholder: "quantité",
              frequency: {
                label: "Fréquence",
                month: "mois",
                year: "année",
              },
            },
            charcoal: {
              label: "Charbon",
              unit: "Kg/",
              frequency: "fréquence",
              qunits: {
                label: "unité",
                kg: "Kg",
                m3: "m3",
              },
              funits: {
                label: "Fréquence",
                day: "jour",
                week: "semaine",
                month: "mois",
                year: "annee",
              },
            },
            wood: {
              label: "Bois",
              title: "Bois et Charbon",
              quantity: "Quantité",
              unit: "Kg/",
              frequency: "fréquence",
              qunits: {
                label: "unité",
                kg: "Kg",
                m3: "m3",
                stere: "stere",
              },
              funits: {
                label: "Fréquence",
                day: "jour",
                week: "semaine",
                month: "mois",
                year: "annee",
              },
            },
          },
          q2: {
            q: "what is the type of your fireplace?",
            title: "Fireplace Type",
            rows: {
              insert: "Insert",
              stove: "poele",
              openFireplace: "openFireplace",
              woodBoiler: "woodBoiler",
            },
          },
        },
        q1: {
          title: "facture d'électricité",
          q1: "En utilisant votre facture d'électricité comme référence, quelle a été votre consommation d'électricité au cours des 12 derniers mois?",
          q2: "Quel est l'index de votre compteur d'électricité?",
          q3: "Si vous n'avez pas votre facture, quelle a été votre dépense mensuelle en électricité pendant cette année?",
          Total: "Totale",
        },
        q2: {
          title: "facture de gaz",
          q1: "En utilisant vos factures de gaz comme référence, quelle a été votre consommation de gaz au cours des 12 derniers mois?",
          q2: "Quelle est la lecture de votre compteur de gaz?",
          q3: "Si vous n'avez pas votre facture, quelle a été votre dépense mensuelle de gaz au cours de l'année dernière?",
          Total: "Totale",
          alert: {
            title: "Note",
            description:
              "Si votre facture n'est pas mensuelle, vous pouvez saisir une seule valeur pour toute la période. Par exemple : Mars : 0, Avril : 0, Mai : 1020.",
          },
        },
        heatingBill: {
          title: "Réseaux de chaleur",
          q: "En utilisant vos factures de réseaux de chaleur comme référence, quelle a été votre consommation au cours des 12 derniers mois?",
          q2: "Quel est l'index de votre compteur de chaleur?",
          q3: {
            q: "Si vous n'avez pas votre factures, quelle a été votre dépense anunuelle pendant cette année?",
            money: "Total depenses",
            price: "Prix d'un kWh",
          },
        },
      },
      transport: {
        qCar: {
          q: "Combien de voitures possède votre ménage?",
        },
        qAux: {
          q: "Est-ce que vous utilisez un transport auxiliaire?",
          electricBike: "Vélos électrique",
          electricScooter: "Trottinette électrique",
        },
        qMotos: {
          qMoto: {
            q: "Combien de motos possède votre ménage?",
          },
          "qMoto1-1": {
            q: "Informations sur la moto",
            l1: "Marque",
            l2: "Modèle",
          },
          "qMoto1-2": {
            q: "Quel type de moto avez-vous?",
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
            q1L: "Combien de litres votre moto consomme-t-elle par semaine?",
            q1E: "Combien d'electricite (en kW h) votre moto consomme-t-elle par semaine?",
            q2: "Si vous ne connaissez pas la consommation, vous pouvez fournir vos dépenses hebdomadaires.",
            q3: "Quelle est la distance parcourue par votre moto chaque semaine?",
          },
          qMoto4: {
            q: "Quelle est la distance totale affichée sur le tableau de bord de votre moto?",
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
          title: ({ index }: { index: number }) => `Voiture ${index + 1} : type de voiture`,
          q: "Quel type de voiture avez-vous?",
          Gasoline: "Essence",
          Diesel: "Diesel",
          "natural Gaz": "Bio-gaz",
          Electrique: "Électrique",
          "Plug-in Hybrid": "Hybride rechargeable",
          "mild Hybrid": "Hybride léger",
          other: "Autre",
        },
        "qCar1-3": {
          title: ({ index }: { index: number }) => `Voiture ${index + 1} : carburant de voiture`,
          q: "Quelle est le carburant de votre voiture?",
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
          title: ({ index }: { index: number }) => `Voiture ${index + 1} : Consommation de voiture`,
          q1L: "Combien de litres votre voiture consomme-t-elle par semaine?",
          q1E: "Combien d'electricite (en kWh) votre voiture consomme-t-elle par semaine?",
          q1LL: "Litres par semaine",
          q1LE: "kWh par semaine",
          q2: "Si vous ne connaissez pas la consommation, vous pouvez fournir vos dépenses hebdomadaires.",
          q3: "Quelle est la distance parcourue par votre voiture chaque semaine?",
        },
        qCar4: {
          title: ({ index }: { index: number }) =>
            `Voiture ${index + 1} : Distance totale affichée`,
          q: "Quelle est la distance totale affichée sur le tableau de bord de votre voiture?",
        },
        carStatus: {
          label: ({ index }: { index: number }) => `Voiture ${index}`,
          incomplete: "À compléter",
        },
        commonTransport: {
          shortDistances: {
            title: "Moyens de transport communs",
            q: "Quels sont les moyens de transport communs utilisés par tous les membres de votre foyer?",
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
            bus: {
              busType: "type de bus",
              frequency: "frequence hebdomadaire",
              nbPeople: "personnes de famille",
              distance: "distance",
              busTypes: {
                electric: "Electric",
                diesel: "Diesel",
                gasoline: "Essence",
                hybrid: "Hybride",
                naturalGaz: "gaz naturel",
              },
            },
            metro: {
              frequency: "frequence hebdomadaire",
              distance: "distance",
              nbPeople: "personnes de famille",
            },
          },
          longueDistances: {
            title: "Moyens de transport longue distance",
            q: "Quels sont les moyens de transport longue distance utilisés par tous les membres de votre foyer?",
            bus: {
              busTypes: {
                other: "Autre",
                diesel: "Diesel",
              },
            },
            train: {
              types: {
                intercity: "Intercity",
                TER: "TER",
                TGV: "TGV",
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
              origin: "Origine",
              destination: "Destination",
              stopover: "escale",
              via: "À travers",
              frequency: "Frequence annuelle",
              aircraftType: "Type Avion",
              class: "Class de vol ",
              roundTrip: "Allez-retour",
              carbonEmissions: "Emissions de Carbon",
              distance: "Distance",
            },
          },
          qSea: {
            q: "Avez-vous voyagé par mer l'année dernière?",
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
      food: {
        cols: {
          homemade: "Fait a la maison",
          quantine: "Cantine ou restaurant",
          delivered: "Livré",
        },
        basic: {
          q1: {
            title: "Répartition des repas",
            text: "En moyenne, quels repas décrivent le mieux la consommation de votre foyer au cours d'une semaine typique?",
          },
          nb: "Le nombre total de repas doit être approximativement 14 X le nombre de personnes dans votre famille.",
          q2: {
            title: "Lieu des repas",
            text: "Pour chaque repas sélectionné, indiquez où votre foyer le consomme approximativement en une semaine?",
          },
          meals: {
            redMeat: "Viande rouge",
            whiteMeat: "Viande blanche",
            oilyFish: "Poisson gras",
            whiteFish: "Poisson blanc",
            vegan: "Végan",
            vegetarian: "Végétarien",
          },
        },
        breakfast: {
          q1: {
            title: "Petits-déjeuners",
            text: "En moyenne, combien de petits-déjeuners votre foyer consomme-t-il au cours d'une semaine typique?",
          },
          nb: "Le nombre total de repas doit être approximativement 7 X le nombre de personnes dans votre famille.",
          q2: {
            title: "Lieu des petits-déjeuners",
            text: "Pour chaque repas sélectionné, indiquez où votre foyer le consomme approximativement en une semaine?",
          },
          meals: {
            bread: "Pain",
            salty: "Salé",
            milk: "Lait & Céréales",
            fruits: "Fruits",
            no: "Pas de petit-déjeuner",
          },
        },
        restaurants: {
          q: {
            title: "Visites de restaurants",
            text: "Au cours d'un mois typique, combien de fois votre foyer visite-t-il chaque type de restaurant?",
          },
          fastFood: "Fast-food",
          bistro: "Bistro",
          classic: "Restaurant classique",
          gastronomic: "Restaurant gastronomique",
          bio: "Restaurant bio",
          unit: "fois/mois",
        },
        drinks: {
          q1: {
            title: "Boissons chaudes quotidiennes",
            q: "Combien de tasses par jour chaque membre de votre famille boit-elle des boissons suivantes?",
            tea: "Thé",
            coffee: "Café",
            hotChocolate: "Chocolat chaud",
            unit: "tasses/jour",
          },
          q2: {
            title: "Boissons hebdomadaires",
            q: "Combien de litres par semaine chaque membre de votre famille boit-elle des boissons suivantes?",
            soda: "Soda",
            jus: "Jus",
            beer: "Bière",
            alcohol: "Alcool",
            unit: "litres/semaine",
          },
        },
        water: {
          title: "Habitudes de boisson",
          q: "Quel type d'eau buvez-vous?",
          tapWater: "Eau du robinet",
          tapWaterFilter: "Eau du robinet filtrée",
          bottle: "Eau en bouteille",
          q2: "Combien de bouteilles d'eau votre foyer consomme-t-il?",
          frequency: {
            label: "Fréquence",
            day: "jour",
            week: "semaine",
            month: "mois",
          },
        },
        auxilary: {
          q1: {
            title: "Produits de saison",
            text: "Quel est le pourcentage de produits de saison dans votre foyer?",
          },
          q2: {
            title: "Produits locaux",
            text: "Quel est le pourcentage de produits locaux dans votre foyer?",
          },
        },
        markets: {
          q: {
            title: "Fréquence des courses",
            text: "À quelle fréquence votre foyer visite-t-il chacun des types de magasins suivants?",
          },
          options: {
            hyperMarket: "Hypermarché",
            big_boxStore: "Magasin grande surface",
            supermarket: "Supermarché",
            groceryStore: "Épicerie",
            weeklyMarket: "Marché hebdomadaire",
          },
          unit: "fois par",
          frequency: {
            year: "an",
            month: "mois",
            week: "semaine",
            placeholder: "Sélectionnez une fréquence",
          },
        },
      },
    },
    yes: "oui",
    no: "non",
    unit: ({ unit }: { unit: string }) => `en ${unit}`,
    idk: "Je ne sais pas",
    progress: {
      title: ({ current, total }: { current: number; total: number }) =>
        `Question ${current} sur ${total}`,
      percentage: ({ value }: { value: number }) => `${value}% terminé`,
    },
    next: "Continuer",
    back: "Précédent",
    preview: "Aperçu",
    submit: "Résultat",
    errors: {
      Required: "Obligatoire",
      food: {
        minMeals: "Le total des repas doit être au moins de 7.",
        distributionMismatch: "La répartition doit correspondre au nombre de repas indiqué.",
      },
      market: {
        missingPair: "La fréquence et son unité doivent être renseignées ensemble.",
      },
    },
  },
  result: {
    card: {
      title: "Votre empreinte carbone",
      subtitle: "Basé sur votre style de vie",
      unit: "tonnes CO₂/année",
      tons: "tonnes",
      avgGlobal: "vs Global Average",
      difference: "Difference",
    },
    categorisation: {
      title: "Répartition par catégorie",
    },
    recommendations: {
      title: "Moyens de réduire votre impact",
      transport: {
        transportation: {
          title: "Transportation",
          desc: "Optez pour le transport en commun, le covoiturage ou le vélo",
        },
      },
      energie: {
        energie: {
          title: "Energie",
          desc: "Passer à des sources renouvelables et améliorer l'isolation",
        },
      },
      food: {
        diet: {
          title: "Alimentation",
          desc: "Reduire la consommation de viande et acheter des aliments locaux",
        },
      },
      waste: {
        waste: {
          title: "Déchets",
          desc: "Recyclez davantage et pratiquez le compostage",
        },
      },
      footer: {},
    },
    footer: {
      download: "Telecharger le rapport",
      share: "Partager votre résultat",
      retake: "Reprendre l'evaluation",
    },
  },
  sections: {
    transport: "Transport",
    energie: "Energie",
    waste: "Déchets",
    food: "Alimentation",
    vacation: "Vacances",
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
