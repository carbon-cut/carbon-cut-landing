const cubiqueMeter = "m³" as const;

const waste = {
  amount: "quantité",
  every: "Chaque",
  amountUnit: { placeholder: "unité", labels: { bag: "sac", kg: "kg" } },
  frequencyUnit: {
    placeholder: "fréquence",
    labels: { day: "jour", week: "semaine" },
  },
  bagVolume: { placeholder: "volume du sac" },
};

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
        nextErrorButton: "Prochaine erreur",
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
      contact: {
        title: "Contact | Carbon Cut",
        description:
          "Contactez l'équipe Carbon Cut pour une question sur le compte, le formulaire ou les résultats pendant la phase de test.",
        keywords: [
          "contact carbon cut",
          "contact empreinte carbone",
          "aide formulaire carbone",
          "problème compte carbon cut",
          "équipe carbon cut",
        ],
      },
      help: {
        title: "Centre d'aide | Carbon Cut",
        description:
          "Trouvez rapidement des réponses sur le questionnaire, les résultats, le compte et la page contact Carbon Cut.",
        keywords: [
          "centre d'aide carbon cut",
          "faq empreinte carbone",
          "aide questionnaire carbone",
          "questions résultats carbone",
          "contact utilisateur carbon cut",
        ],
      },
      collectivityLanding: {
        title: "Collectivité | Prototype d'inventaire carbone | Carbon Cut",
        description:
          "Découvrez le prototype Carbon Cut pour configurer le territoire d'une collectivité et préparer un inventaire carbone municipal.",
        keywords: [
          "prototype collectivité carbone",
          "inventaire carbone municipal",
          "configuration territoire",
          "collecte données climat",
          "bilan carbone collectivité",
          "outil climat municipal",
        ],
      },
      collectivityDashboard: {
        title: "Collectivity Inventory (Draft) | Carbon Cut",
        description:
          "UI prototype for collecting city data to build a baseline inventory. This is a draft experience.",
        keywords: [
          "collectivity inventory",
          "city baseline",
          "public lighting",
          "fleet inventory",
          "buildings energy data",
          "territorial data collection",
        ],
      },
    },
  },
  collectivityLanding: {
    nav: {
      prototype: "Prototype",
      setup: "Configuration",
    },
    hero: {
      badge: "Prototype collectivité",
      title: {
        line1: "Configurez votre",
        highlight: "inventaire carbone",
        line2: "territorial.",
      },
      description:
        "Une première preuve de concept pour aider une collectivité à poser son périmètre, organiser les données utiles et entrer dans une configuration municipale guidée.",
      imageAlt: "Paysage illustrant l'entrée collectivité de Carbon Cut",
      primaryCta: {
        label: "Ouvrir la configuration",
        aria: "Ouvrir la configuration de la collectivité",
      },
      secondaryCta: {
        label: "Voir le prototype",
        aria: "Voir ce que couvre le prototype collectivité",
      },
    },
    proof: {
      badge: "Ce que couvre cette version",
      title: "Un point d'entrée simple avant l'espace de travail.",
      description:
        "Cette page reste volontairement minimale : elle présente le prototype, clarifie son périmètre actuel et mène vers la configuration, sans promettre une plateforme collectivité complète.",
      points: {
        territory: {
          title: "Définir le périmètre",
          description:
            "La configuration commence par le territoire, les années d'inventaire et les informations de base nécessaires avant la saisie.",
        },
        inventory: {
          title: "Préparer la collecte",
          description:
            "Le prototype structure les familles de données pour faciliter la suite du travail d'inventaire.",
        },
        review: {
          title: "Rester en preuve de concept",
          description:
            "La version actuelle montre une direction produit, avec un périmètre limité et encore en amélioration.",
        },
      },
    },
    cta: {
      title: "Commencez par configurer le territoire.",
      description:
        "Pour cette première version, l'appel à l'action mène vers le module de configuration associé à votre collectivité.",
      primaryCta: {
        label: "Accéder à la configuration",
        aria: "Accéder à la configuration de la collectivité",
      },
      imageAlt: "Illustration de clôture pour accéder à la configuration collectivité Carbon Cut",
    },
  },
  collectivitySetup: {
    title: "Configurer la collectivité",
    description:
      "Avant d'ouvrir l'espace de travail complet, renseignez le projet, le territoire, les années d'inventaire et les sections applicables.",
    primaryCta: "Continuer",
    submitError: "Impossible d'enregistrer la configuration du projet pour le moment.",
  },
  home: {
    nav: {
      features: "Fonctionnalités",
      trust: "Version test",
      results: "Résultats",
      faq: "Questions fréquentes",
      toggleLabel: "Basculer la navigation principale",
    },
    hero: {
      title: {
        line1: "Mesurez votre empreinte",
        highlight: "carbone",
        line2: "simplement.",
      },
      description:
        "Un parcours guidé pour estimer les émissions liées au transport et à l'énergie du foyer, puis découvrir un résultat clair et des recommandations pratiques.",
      imageAlt: "Image héro principale de Carbon Cut",
      primaryCta: {
        label: "Commencer l'évaluation",
        aria: "Commencer l'évaluation carbone guidée",
      },
      secondaryCta: {
        label: "Voir comment ça marche",
        aria: "Voir comment fonctionne l'évaluation",
      },
      quickLinks: {
        ariaLabel: "Navigation rapide",
        links: {
          features: "Ce que fait Carbon Cut",
          faq: "Questions fréquentes",
        },
      },
    },
    whatItDoes: {
      badge: "Ce que fait Carbon Cut",
      title: "Un parcours guidé, centré sur l’essentiel.",
      description:
        "Carbon Cut vous aide à comprendre votre empreinte personnelle sans vous noyer dans des catégories inutiles. Le parcours reste volontairement concentré sur ce qui compte aujourd’hui : le transport, l’énergie du foyer et un résultat lisible.",
      imageAlt:
        "Illustration du parcours Carbon Cut montrant le questionnaire, les catégories transport et énergie, puis le résultat avec recommandations",
      items: {
        guided: {
          step: "Étape 1",
          title: "Répondez à un questionnaire guidé, sans jargon.",
          description:
            "Le parcours pose des questions simples sur vos habitudes pour lancer l’estimation sans tableur, sans méthode complexe et sans préparation lourde.",
        },
        focus: {
          step: "Étape 2",
          title: "Concentrez-vous sur le transport et l’énergie du foyer.",
          description:
            "La première phase du produit reste volontairement resserrée sur les zones où l’impact personnel est le plus utile à comprendre dès le départ.",
        },
        result: {
          step: "Étape 3",
          title: "Obtenez un résultat clair avec des recommandations pratiques.",
          description:
            "À la fin du parcours, Carbon Cut affiche une estimation structurée avec des repères par catégorie et des pistes concrètes pour commencer à agir.",
        },
      },
    },
    trust: {
      badge: "Produit en test",
      title: "Une première version claire, volontairement ciblée.",
      description:
        "Carbon Cut avance par étapes : un périmètre resserré, une lecture simple de l’empreinte personnelle et un produit encore en amélioration.",
      status: "En phase de test",
      statement:
        "Carbon Cut commence par une évaluation personnelle guidée, centrée sur ce qui est le plus utile à comprendre dès aujourd’hui.",
      points: {
        testing: {
          title: "Produit en test",
          description:
            "Carbon Cut est encore en phase de test. Le parcours, l’interface et les résultats continuent d’être affinés.",
        },
        scope: {
          title: "Périmètre ciblé",
          description:
            "La première version se concentre sur le transport et l’énergie du foyer pour rester claire, utile et lisible.",
        },
        firstStep: {
          title: "Un premier pas utile",
          description:
            "Le but est simple : aider à comprendre son empreinte personnelle sans complexité inutile ni promesse excessive.",
        },
      },
    },
    testOffer: {
      badge: "Offre de test",
      title: "Ce que vous testez maintenant",
      description:
        "Un parcours guidé, simple et gratuit avec un résultat personnel clair en fin de parcours.",
      note: "Version en test : périmètre volontairement limité aujourd'hui, extension prévue ensuite.",
      chips: ["15–25 min", "Accès libre", "Transport + Énergie", "Résultat clair"],
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
      title: "Commencez par une première évaluation guidée.",
      description:
        "Carbon Cut vous propose un premier pas simple pour estimer votre empreinte personnelle et comprendre ce qui compte aujourd’hui dans le transport et l’énergie du foyer.",
      primaryCta: {
        label: "Commencer l’évaluation",
        aria: "Commencer l’évaluation carbone guidée",
      },
      imageAlt: "Illustration de clôture pour inviter à commencer l’évaluation Carbon Cut",
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
        contact: "Contact & aide",
        social: "Réseaux",
        legal: "Mentions légales",
        newsletter: "Newsletter",
      },
      contact: {
        email: "Contactez-nous",
        helpCenter: "Centre d'aide",
        demo: "Commencer l'évaluation",
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
    help: {
      badge: "Centre d'aide",
      title: "Comment pouvons-nous vous aider aujourd'hui ?",
      description:
        "Parcourez les catégories les plus consultées, puis ouvrez une réponse détaillée en quelques secondes.",
      searchLabel: "Rechercher dans le centre d'aide",
      searchPlaceholder: "Rechercher dans le centre d'aide...",
      actions: {
        start: "Commencer l'évaluation",
        contact: "Contactez-nous",
      },
      categoriesTitle: "Sélectionner une catégorie",
      categories: [
        { title: "Démarrage", meta: "4 articles" },
        { title: "Résultats", meta: "5 articles" },
        { title: "Questionnaire", meta: "6 articles" },
        { title: "Livraison des emails", meta: "3 articles" },
        { title: "Contact", meta: "4 articles" },
        { title: "Confidentialité", meta: "3 articles" },
        { title: "Compte", meta: "2 articles" },
      ],
      questionsTitle: "Questions populaires",
      questions: [
        "Comment fonctionne l'évaluation pas à pas ?",
        "Que signifient les scores dans la page résultats ?",
        "Puis-je reprendre un questionnaire plus tard ?",
        "Comment corriger une réponse déjà envoyée ?",
        "Pourquoi je ne reçois pas l'email attendu ?",
        "Comment nous contacter avec les bonnes infos ?",
      ],
      featuredArticle: {
        title: "Comment fonctionne l'évaluation Carbon Cut ?",
        intro:
          "Le parcours est conçu pour rester simple: vous répondez à des questions ciblées, puis vous obtenez un résultat clair avec des recommandations actionnables.",
        steps: [
          "Commencez le formulaire et répondez aux sections transport et énergie du foyer.",
          "Vérifiez l'aperçu avant validation pour corriger les éventuelles erreurs.",
          "Consultez votre estimation et les recommandations associées à chaque catégorie.",
          "Revenez plus tard pour refaire l'évaluation après vos premiers changements.",
        ],
        noteTitle: "Note",
        note: "Pendant la phase de test, certaines sections restent volontairement limitées pour garder le parcours rapide et lisible.",
        helpful: "Cet article vous a-t-il aidé ?",
        answers: {
          yes: "Oui",
          no: "Non",
        },
      },
    },
    helpCurrent: {
      badge: "Centre d'aide",
      status: "Version test - support du parcours personnel",
      title: "Aide pratique pour avancer sans blocage",
      description:
        "Trouvez rapidement les réponses liées au questionnaire, aux résultats et à l'accès au compte pendant la phase de test.",
      searchLabel: "Rechercher dans l'aide",
      searchPlaceholder: "Rechercher un sujet dans l'aide...",
      topicsLabel: "Sujets les plus consultés :",
      topicHints: ["Questionnaire", "Résultats", "Compte", "Email", "Contact"],
      categories: {
        title: "Sélectionner une catégorie",
        items: [
          {
            title: "Questionnaire",
            description: "Démarrage, progression et correction des réponses.",
            href: "/help/form",
          },
          {
            title: "Résultats",
            description: "Comprendre l'estimation CO2 et les recommandations.",
            href: "/help/results",
          },
          {
            title: "Compte",
            description: "Connexion, accès et problèmes liés au compte.",
            href: "/help/account",
          },
        ],
      },
      scope: {
        title: "Périmètre actuel",
        description:
          "Ce bloc reprend le périmètre réel du produit en phase de test, tel qu'il est documenté aujourd'hui.",
        available: {
          title: "Disponible maintenant",
          items: [
            "Parcours guidé d'estimation d'empreinte carbone personnelle.",
            "Collecte des données sur le transport et l'énergie du foyer.",
            "Affichage d'un résultat principal en tonnes de CO2 et d'une interface de résultats par catégorie.",
          ],
        },
        unavailable: {
          title: "Non disponible actuellement",
          items: [
            "Workflow opérationnel spécifique restaurant.",
            "Workflow spécifique municipalité.",
            "Suivi continu des émissions dans le temps.",
            "Reporting audit-ready/conformité et export de rapports.",
            "Compensation carbone/offsetting vérifiée.",
          ],
        },
      },
      faq: {
        title: "Questions fréquentes",
        items: [
          {
            question: "Le calcul est-il une estimation ou une mesure exacte ?",
            answer:
              "Le calcul carbone ne peut jamais être exact : c'est toujours une estimation. Dans Carbon Cut, nous cherchons à fournir l'estimation la plus précise possible.",
          },
          {
            question: "D'où viennent les facteurs utilisés dans le calcul CO2 ?",
            answer:
              "Nous utilisons diverses sources afin de fournir les résultats les plus précis possibles.",
          },
          {
            question: "Les résultats sont-ils comparables d'une personne à une autre ?",
            answer:
              "La comparaison entre profils est une direction future, mais ce n'est pas l'objectif principal du parcours actuel.",
          },
          {
            question: "Carbon Cut évalue-t-il aussi l'impact indirect (achats, services, etc.) ?",
            answer: "Cette couverture plus large est prévue pour le futur.",
          },
          {
            question: "Les recommandations sont-elles personnalisées ou génériques ?",
            answer:
              "Aujourd'hui, elles restent limitées. L'objectif est d'aller vers des recommandations personnalisées.",
          },
          {
            question: "Les résultats sont-ils destinés à un usage officiel (audit, conformité) ?",
            answer: "Non, pas pour le moment.",
          },
          {
            question: "À quelle fréquence refaire l'évaluation ?",
            answer: "Une fois par an est une bonne base.",
          },
          {
            question: 'Comment interpréter un "bon" ou "mauvais" résultat ?',
            answer:
              "Le résultat affiché et son contexte dans l'interface servent de repère principal.",
          },
        ],
      },
      contactBridge: {
        text: "Besoin d'aide supplémentaire ?",
        linkText: "Consultez la page Contact.",
      },
    },
    collectivityDashboard: {
      header: {
        badge: "Espace collectivité",
        status: "Brouillon · Prototype d'interface (sans backend)",
        title: "Plan climat collectivité",
        meta: "Territoire à définir · Cadrage en cours · Horizon à fixer",
      },
      actions: {
        switchInventory: "Changer de plan",
        new: "Nouveau plan",
        settings: "Paramètres",
        save: "Enregistrer",
        import: "Importer des fichiers",
        addManual: "Ajouter manuellement",
        downloadTemplate: "Télécharger le modèle",
        clearAll: "Tout effacer",
        exportJson: "Exporter en JSON",
        submitData: "Soumettre les données",
      },
      workflow: {
        eyebrow: "Espace collectivité",
        title: "Modules du plan",
        description:
          "Le plan suit la progression du rapport : configuration, inventaire, scénarios et plan d'action.",
        currentLabel: "Espace actif",
        sections: {
          setup: {
            title: "Configuration",
            description:
              "Définir le territoire de référence, les années et le périmètre initial du projet.",
            status: "À configurer",
          },
          inventory: {
            title: "Inventaire",
            description:
              "Gérer la collecte, les années couvertes et les résultats d'inventaire dans un même espace de travail.",
            status: "Actif",
          },
          result: {
            title: "Résultat",
            description:
              "Lire les sorties calculées de l'inventaire et vérifier les valeurs retournées par le backend.",
            status: "Lecture",
          },
          scenarios: {
            title: "Scénarios",
            description:
              "Comparer les trajectoires prospectives et construire les hypothèses BaU / BaC.",
            status: "À structurer",
          },
          actions: {
            title: "Plan d'action",
            description:
              "Gérer le portefeuille des fiches actions, avec les coûts, le calendrier et le suivi dans ce même module.",
            status: "À structurer",
          },
        },
      },
      moduleStructure: {
        title: "Sections majeures",
        sections: {
          setup: [
            {
              title: "Territoire",
              description: "Vérification du territoire de référence utilisé par le plan.",
            },
            {
              title: "Temporalité",
              description:
                "Année de référence et années d'inventaire incluses dans la configuration.",
            },
          ],
          inventory: [
            {
              title: "Collecte des données",
              description:
                "Jeux de données d'activité, imports et saisies nécessaires pour construire l'inventaire.",
            },
            {
              title: "Preuves et sources",
              description:
                "Pièces justificatives, exports opérateurs et sources documentaires liées aux datasets.",
            },
            {
              title: "Hypothèses et méthode",
              description:
                "Hypothèses, proxys, méthode de calcul et limites de qualité des données.",
            },
            {
              title: "Résultats d'inventaire",
              description:
                "Émissions calculées, ventilations, état de complétude et restitution des sorties.",
            },
            {
              title: "Lecture territoire",
              description:
                "Vue agrégée du Grand Sfax au niveau territorial dans le même espace de travail.",
            },
            {
              title: "Lecture patrimoine municipal",
              description: "Découpes communales ciblant le patrimoine municipal de chaque commune.",
            },
          ],
          scenarios: [
            {
              title: "BaU",
              description: "Scénario tendanciel fondé sur la poursuite des dynamiques observées.",
            },
            {
              title: "BaC",
              description:
                "Scénario de transition bas-carbone construit à partir des leviers d'atténuation.",
            },
            {
              title: "Hypothèses sectorielles",
              description:
                "Hypothèses par secteur utilisées pour projeter les activités et les émissions.",
            },
            {
              title: "Trajectoires d'activité",
              description: "Évolution projetée des données d'activité selon les scénarios retenus.",
            },
            {
              title: "Trajectoires d'émissions",
              description: "Comparaison des émissions projetées entre BaU et BaC à horizon 2030.",
            },
            {
              title: "Cible 2030",
              description: "Cible climatique et potentiel de réduction dégagés par les scénarios.",
            },
          ],
          actions: [
            {
              title: "Contexte et justificatif",
              description:
                "Pourquoi l'action existe, sur quel diagnostic elle repose et quel besoin elle couvre.",
            },
            {
              title: "Objectifs",
              description: "Résultat attendu, cap poursuivi et contribution au plan climat.",
            },
            {
              title: "Description de l'action",
              description:
                "Contenu opérationnel de la fiche action et périmètre de mise en oeuvre.",
            },
            {
              title: "Acteurs",
              description:
                "Responsables, partenaires et parties mobilisées dans la mise en oeuvre.",
            },
            {
              title: "Impacts",
              description:
                "Effets attendus, notamment sur les émissions et le déploiement territorial.",
            },
            {
              title: "Investissement, calendrier et suivi",
              description: "Coûts, phasage, échéances et pilotage intégrés dans ce même module.",
            },
          ],
        },
      },
      setupWorkspace: {
        eyebrow: "Module actif",
        title: "Configuration du projet",
        description:
          "Définissez le territoire de référence et les années de travail avant d'ouvrir l'inventaire.",
        primaryCta: "Enregistrer la configuration",
        sections: {
          scope: {
            title: "Identification",
            description:
              "Renseignez le nom du projet, choisissez le pays et le territoire concernés, puis vérifiez le slug utilisé dans l'URL du projet.",
            nameLabel: "Nom du projet",
            namePlaceholder: "ex. Inventaire carbone Grand Sfax",
            nameHelper:
              "Ce nom sert à identifier clairement le projet dans l'espace de travail et dans les retours backend.",
            countryLabel: "Pays",
            countryPlaceholder: "Choisir un pays",
            countryHelper:
              "Le pays conditionne les référentiels et les données de travail rattachés au plan.",
            slugLabel: "Slug du projet",
            slugPlaceholder: "ex. inventaire-grand-sfax",
            slugHelper:
              "Le slug est proposé à partir du nom du projet. Il reste modifiable, mais il doit être unique.",
          },
          territory: {
            title: "Territoire",
            description:
              "Renseignez la ville, l'intercommunalité ou le territoire principal du projet avant d'ouvrir l'inventaire.",
            label: "Ville ou territoire",
            placeholder: "ex. Grand Sfax",
            disabledPlaceholder: "Renseignez un territoire",
            helper:
              "Saisissez le territoire tel qu'il doit apparaître dans le projet et dans les futurs exports.",
          },
          temporality: {
            title: "Temporalité",
            description:
              "Fixez l'année de référence puis ajoutez les autres années couvertes par l'inventaire.",
            referenceYearLabel: "Année de référence",
            referenceYearPlaceholder: "Choisir une année",
            referenceYearHelper:
              "Cette année sert de point d'ancrage pour la lecture de l'inventaire.",
            inventoryYearsLabel: "Années d'inventaire",
            inventoryYearsPlaceholder: "Ajouter une année d'inventaire",
            inventoryYearsDisabledPlaceholder: "Choisissez d'abord l'année de référence",
            addYear: "Ajouter",
            removeYear: "Retirer",
            referenceYearBadge: "Référence",
            emptyState: "Aucune année d'inventaire n'est encore ajoutée.",
            helper:
              "L'année de référence est ajoutée automatiquement. Ajoutez ensuite les autres années à couvrir.",
          },
          applicability: {
            title: "Périmètre applicable",
            description:
              "Précisez les sections optionnelles à ouvrir dans l'inventaire dès la création du projet.",
            legend: "Sections à inclure dans le périmètre initial",
            helper:
              "Ces choix servent à décider quelles sections de saisie doivent exister dans l'inventaire courant.",
            footer:
              "Vous pouvez cocher uniquement les sections qui existent réellement dans le périmètre de la collectivité.",
            options: {
              airport: {
                label: "Aéroport",
                helper: "Active la section liée au transport aérien dans le périmètre collecté.",
              },
              port: {
                label: "Port",
                helper:
                  "Active la section liée aux activités portuaires dans le périmètre collecté.",
              },
              agriculture: {
                label: "Agriculture",
                helper:
                  "Active les sections AFAT liées à la production et aux activités agricoles.",
              },
            },
          },
        },
        destructiveWarnings: {
          title:
            "Cette modification supprimera des donnees enregistrees et imposera une remise a jour de l'inventaire.",
          items: {
            removeYear: "Lannee {year} sera retiree de l'etat enregistre.",
            disableAirport:
              "La desactivation de l'aeroport supprimera les donnees enregistrees liees au transport aerien.",
            disablePort:
              "La desactivation du port supprimera les donnees enregistrees liees aux activites portuaires.",
            disableAgriculture:
              "La desactivation de l'agriculture supprimera les donnees enregistrees liees aux sections agricoles.",
          },
        },
      },
      projectSelector: {
        eyebrow: "Espace collectivité",
        title: "Choisissez un projet",
        description:
          "Le projet demandé n'est pas disponible pour le moment. Sélectionnez un projet existant pour continuer dans le bon espace de travail.",
        openAction: "Ouvrir le projet",
      },
      accessNotice: {
        eyebrow: "Espace collectivité",
        authTitle: "Session collectivité indisponible",
        authDescription:
          "La page n'a pas pu charger les données du projet avec votre session actuelle.",
        unavailableTitle: "Données collectivité indisponibles",
        unavailableDescription:
          "Le chargement du projet a échoué avant l'ouverture de l'espace de travail.",
        alertTitle: "Accès interrompu",
        authAlertDescription:
          "L'authentification du serveur n'est pas disponible pour cette page pour le moment.",
        unavailableAlertDescription: "Le serveur est indisponible ou a renvoyé une erreur.",
        returnAction: "Retour à l'espace collectivité",
      },
      planSidebar: {
        title: "Lecture du rapport",
        description:
          "Quatre modules visibles au démarrage : configuration, inventaire, scénarios et plan d'action. Les routes d'entrée restent non modulaires.",
      },
      planMarkers: {
        territory: "Territoire de référence",
        referenceYear: "Année de référence",
        supportYears: "Années d'inventaire",
      },
      baseline: {
        eyebrow: "Série de référence",
        title: "Base de projection",
        description:
          "Un IRE et au moins une autre année sont requis pour lancer les scénarios, construire des comparaisons et alimenter le plan.",
        requirementsTitle: "Pré-requis communs",
        requirements: [
          "1 IRE validé pour l'année de référence.",
          "1 autre année minimale pour comparer et projeter.",
          "Données municipales et territoriales cohérentes avant scénarisation.",
        ],
      },
      inventory: {
        eyebrow: "Module actif",
        title: "Inventaire",
        description:
          "L'inventaire reste la base de travail. Les sous-sections ci-dessous servent à structurer la saisie, les preuves et les hypothèses avant les scénarios.",
        navLabel: "Sous-sections inventaire",
      },
      inventoryWorkspace: {
        eyebrow: "Module actif",
        title: "Collecte de l'inventaire",
        description:
          "Ouvrir la route doit amener directement sur un jeu de données à renseigner, avec les champs utiles visibles sans structure de navigation envahissante.",
        saveSuccess: "Le brouillon d'inventaire a été enregistré.",
        saveError: "Impossible d'enregistrer le brouillon d'inventaire pour le moment.",
        submitError: "Impossible de soumettre l'inventaire pour le moment.",
        submitValidationError: "Certaines données ne sont pas prêtes pour le calcul.",
        validationError: "Corrigez les erreurs du formulaire avant d'enregistrer.",
        debugCalculation: {
          action: "Calcul debug",
          label: "Résultat debug temporaire",
          success: "Succès",
          error: "Impossible de lancer le calcul debug pour ce jeu de données.",
          validationError: "Ce jeu de données contient des champs à corriger.",
          calculationError: "Le serveur ne peut pas calculer ce jeu de données.",
          requestError: "La demande de calcul n'a pas abouti.",
          total: "Total",
          formulaVersion: "Version formule",
          parameters: "Paramètres",
          warnings: "Avertissements",
        },
        sections: {
          years: {
            title: "Années d'inventaire",
            description:
              "Choisir d'abord l'année sur laquelle vous travaillez. Les blocs de saisie finished se calent ensuite sur cette année.",
          },
          families: {
            title: "Sources et jeux de données",
            description:
              "L'utilisateur avance par source de collecte puis par jeu de données. Les jeux finis ont une vraie structure ; les autres restent visibles en placeholder sous dev.",
            datasetsLabel: "jeux de données",
          },
          entry: {
            title: "Saisie du jeu actif",
            description:
              "Le cœur de la route est ici : travailler un jeu de données, remplir ses valeurs, puis rattacher ce qui manque encore.",
            statusLabel: "Etat du jeu",
            sourceModeLabel: "Lecture source-native",
            yearModeLabel: "Lecture year-native",
            implementationLabel: "Implémentation actuelle",
            activeYearLabel: "Année active",
            placeholder: {
              title: "Bloc sous dev",
              description:
                "Le fichier d'entrée ne fixe pas encore la structure exacte de ce jeu. On garde donc un bloc volontairement provisoire pour conserver toute l'architecture de collecte.",
              fields: {
                alpha: "Champ alpha",
                beta: "Champ beta",
                gamma: "Champ gamma",
              },
              values: {
                alpha: "under dev",
                beta: "draft blob 02",
                gamma: "pending structure maybe later",
              },
              noteLabel: "Note provisoire",
              noteValue:
                "under dev. structure pas encore fixée. placeholder gardé seulement pour voir la page complète pendant le build.",
            },
            fleet: {
              compositionTitle: "Composition de flotte",
              compositionDescription:
                "Structure report-backed issue du document d'entrée : catégories de véhicules, motorisations, puis bloc annuel pour l'année active.",
              category: {
                function: "Voitures de fonction",
                service: "Voitures de service",
                serviceEngines: "Vehicules et engins de service",
                other: "Autres",
              },
              fuel: {
                petrol: "Essence",
                diesel: "Diesel",
                gpl: "GPL",
                electricity: "Électrique",
                gnv: "GNV",
              },
              yearlyVehiclesTitle: "Nombre de vehicules",
              engine: {
                petrol: "Vehicules essence",
                diesel: "Vehicules diesel",
                gpl: "Vehicules GPL",
                electricity: "Vehicules electriques",
                hybrid: "Vehicules hybrides",
                gnv: "Vehicules GNV",
                total: "Total",
              },
              yearlyEnergyTitle: "Consommation énergétique",
              yearlyEnergyRequirementTooltip:
                "Renseigner au moins une consommation annuelle par energie, ou une depense annuelle avec un prix d'energie correspondant.",
              yearlySpendTitle: "Dépense énergétique",
            },
            publicLighting: {
              infrastructureTitle: "Infrastructure d'éclairage public",
              infrastructureDescription:
                "Structure issue du document d'entrée : réseau, points lumineux par type, puis bloc annuel pour l'année active.",
              infrastructure: {
                cabinets: "Nombre d'armoires",
                meters: "Nombre de compteurs",
                dimmers: "Nombre de variateurs opérationnels",
                power: "Puissance si applicable",
              },
              lampsTitle: "Points lumineux par type",
              lampsDescription:
                "Chaque ligne reprend le type de lampe du rapport avec sa puissance unitaire et son total.",
              lamps: {
                shp: "SHP",
                hpl: "HPL",
                led: "LED",
              },
              lampColumns: {
                unitPower: "Puissance unitaire",
                number: "Total de points lumineux",
              },
              yearlyTitle: "Bloc annuel d'éclairage public",
              yearlyRequirementTooltip:
                "Renseigner soit la consommation electrique annuelle, soit la facture annuelle avec le prix de l'electricite correspondant.",
              yearly: {
                consumption: "Consommation électrique annuelle",
                bill: "Facture électrique annuelle",
              },
            },
            buildings: {
              areasTitle: "Patrimoine batimentaire",
              areasDescription:
                "Structure issue du document d'entrée : total bâtiments, surface ouverte et surface couverte.",
              areas: {
                building: "Batiments",
                openSurface: "Surface ouverte",
                closedSurface: "Surface couverte",
              },
              consumptionTitle: "Flux energetiques des batiments",
              consumptionDescription:
                "Les consommations et factures restent organisées par source énergétique.",
              consumptionRequirementTooltip:
                "Renseigner soit la consommation electrique, soit la facture electrique avec le prix de l'electricite correspondant.",
              consumption: {
                electricityConsumption: "Consommation électrique",
                electricityBill: "Facture électrique",
                gasConsumption: "Consommation gaz naturel",
                gasBill: "Facture gaz naturel",
                dieselConsumption: "Consommation diesel",
                dieselBill: "Facture diesel",
                otherConsumption: "Autre consommation",
                otherBill: "Autre facture",
              },
            },
            priceAssumptionsTable: {
              titles: {
                electricity: "Prix de l'électricité",
                energy: "Prix de l'énergie",
                fuelsAndElectricity: "Prix des carburants et de l'électricité",
              },
              rows: {
                electricity: "Prix unitaire de l'électricité",
                naturalGas: "Prix unitaire du gaz naturel",
                diesel: "Prix unitaire du diesel",
                petrol: "Prix unitaire de l'essence",
                gpl: "Prix unitaire du GPL",
                gnv: "Prix unitaire du GNV",
              },
            },
            yearMetricsTable: {
              columns: {
                line: "Ligne",
                sector: "Secteur",
                actions: "Actions",
              },
              sectors: {
                residential: "Résidentiel",
                tertiary: "Tertiaire",
                industry: "Industrie",
                transport: "Transport",
                agriculture: "Agriculture",
              },
              customLabelPlaceholder: "Nom de la colonne",
              sectorPlaceholder: "Choisir un secteur",
              addColumn: "Ajouter une colonne",
              removeColumn: "Supprimer la colonne",
            },
            electricity: {
              surface: {
                title: "Demande d'électricité",
                requirementTooltip:
                  "Renseigner au moins une consommation electrique du secteur industrie pour chaque annee.",
                readinessTitle: "Consommation industrie manquante",
                readinessDescription:
                  "Renseignez au moins une consommation électrique du secteur industrie pour les années suivantes : {years}.",
              },
              lt: {
                title: "Basse tension",
                domestic: "Domestique",
                commercial: "Commercial",
                administration: "Administration",
                publicLighting: "Éclairage public",
                agriculture: "Agricole",
                smallIndustry: "Petites industries",
                workshops: "Ateliers",
                industries: "Industries",
                total: "Total",
              },
              mt: {
                title: "Moyenne tension",
                extractive: "Industrie extractive",
                chemical: "Industrie chimique",
                textile: "Industrie textile et habillement",
                food: "Industrie alimentaire",
                otherIndustries: "Industries diverses",
                agriculture: "Agriculture",
                pumping: "Pompage",
                tourism: "Tourisme",
                transportTelco: "Transport et télécom",
                total: "Total",
              },
              ht: {
                title: "Haute tension",
                cement: "Cimenterie",
                water: "Pompage eau",
                industrialZone: "Zone industrielle",
                total: "Total",
              },
              rows: {
                consumption: "Consommation (GWh)",
                subscribers: "Nombre d'abonnés",
              },
            },
            photovoltaic: {
              bt: {
                title: "Photovoltaïque BT",
                subscribers: "Nombre d'abonnés BT",
                capacity: "Puissance installée (kWc)",
                production: "Production (MWh)",
                balance: "Solde annuel de transaction",
              },
              mt: {
                title: "Photovoltaïque MT",
                subscribers: "Nombre d'abonnés MT",
                capacity: "Puissance installée (kWc)",
                production: "Production (MWh)",
                balance: "Solde annuel de transaction",
              },
            },
            naturalGas: {
              surface: {
                title: "Gaz naturel",
                requirementTooltip:
                  "Renseigner au moins une consommation de gaz naturel pour le secteur tertiaire et au moins une pour le secteur industrie pour chaque annee.",
                readinessTitle: "Consommation tertiaire manquante",
                readinessDescription:
                  "Renseignez au moins une consommation de gaz naturel du secteur tertiaire pour les années suivantes : {years}.",
              },
              populationTitle: "Population",
              populationRequirementTooltip: "Renseigner la population.",
              assumptionsTitle: "Hypothèses énergie ménage",
              assumptionsRequirementTooltip:
                "Renseigner l'hypothese energie menage necessaire au calcul.",
              bp: {
                title: "Basse pression",
                households: "Ménages",
                commerce: "Commerce",
                services: "Services",
                total: "Total",
              },
              mp: {
                title: "Moyenne pression",
                industry: "Industrie",
                tourism: "Tourisme",
                agriculture: "Agriculture",
                total: "Total",
              },
              hp: {
                title: "Haute pression",
                note: "Les colonnes haute pression peuvent être ajoutées, renommées ou supprimées.",
                powerPlant: "Centrale",
                industrialHub: "Pole industriel",
                total: "Total",
              },
              rows: {
                consumption: "Consommation (Nm3)",
                subscribers: "Nombre d'abonnés",
              },
              population: {
                count: "Population",
              },
              assumptions: {
                consumptionNorm: "Norme de consommation",
                consumptionNormHelper:
                  "Valeur de référence représentant la consommation moyenne des ménages en combustibles gazeux par habitant, pour les usages résidentiels, exprimée en tep/capita. Elle est utilisée pour estimer la consommation de GPL des ménages.",
              },
            },
            solarWaterHeating: {
              residential: {
                title: "Résidentiel",
                number: "Nombre de ménages",
                area: "Surface installée (m²)",
              },
              tertiary: {
                title: "Tertiaire",
                number: "Nombre d'entités tertiaires",
                area: "Surface installée (m²)",
              },
              industrial: {
                title: "Industriel",
                number: "Nombre d'entités industrielles",
                area: "Surface installée (m²)",
              },
            },
            port: {
              fuelConsumption: {
                title: "Consommation de diesel dans le perimetre",
                fuelType: "Carburant",
                fuelPlaceholder: "Choisir un carburant",
                fuels: {
                  diesel: "Diesel",
                },
              },
              electricityConsumption: {
                title: "Consommation électrique portuaire",
                rows: {
                  electricityConsumption: "Consommation électrique",
                  electricityBill: "Facture électrique",
                },
              },
            },
            publicTransport: {
              operators: {
                title: "Opérateurs",
                description:
                  "La structure initiale garde l'unique opérateur visible comme métadonnées de travail.",
                column: "Opérateur",
                default: "Régie bus métropolitaine",
                addLabel: "Ajouter un opérateur",
                rowPrefix: "Opérateur",
              },
              exploitation: {
                title: "Exploitation",
                buses: "Nombre de bus exploités",
                fuelConsumption: "Consommation carburant",
                fuelSpend: "Dépense carburant",
                kmTravelled: "Km parcourus",
                staff: "Nombre d'agents",
                passengerKm: "Passagers-km",
                passengers: "Nombre de passagers",
              },
              energyConsumption: {
                title: "Consommation par energie",
                diesel: "Diesel",
                petrol: "Essence",
                gpl: "GPL",
                gnv: "GNV",
                electricity: "Électricité",
              },
              energyByFuel: {
                title: "Parc et energie par motorisation",
                requirementTooltip:
                  "Renseigner au moins une activite carburant par annee pour cet operateur : soit une consommation, soit une depense avec le prix du carburant correspondant.",
                buses: "Nombre de bus",
                consumption: "Consommation",
                spend: "Dépense",
              },
              renewal: {
                title: "Renouvellement de flotte",
                scrapped: "Bus réformés / vendus",
                purchased: "Bus achetés",
                purchaseCost: "Coût d'achat",
              },
              age: {
                title: "Age de flotte",
                age0to5: "0-5 ans",
                age6to10: "6-10 ans",
                age10plus: "Plus de 10 ans",
              },
              future: {
                title: "Acquisitions / renouvellements prevus",
                column: "Bus prevus",
                renewalFuture: "Renouvellement futur",
              },
            },
            airTransport: {
              surface: {
                readinessTitle: "Mouvements nationaux manquants",
                readinessDescription:
                  "Renseignez au moins un mouvement national pour les années suivantes : {years}.",
              },
              movements: {
                title: "Mouvements d'aeronefs",
                requirementTooltip: "Renseigner au moins un mouvement national pour chaque annee.",
                description:
                  "Une ligne par type d'aéronef, avec la distinction international / national dans chaque année.",
                columns: {
                  international: "International",
                  national: "National",
                },
              },
              aircraft: {
                a220: "A220",
                a319: "A319",
                a320: "A320",
                a321: "A321",
                a330: "A330",
                a350: "A350",
                boeing737: "Boeing 737",
                boeing757: "Boeing 757",
                boeing767: "Boeing 767",
                boeing777: "Boeing 777",
                boeing787: "Boeing 787",
                regionalTurboprop: "Regional turbopropulseur",
                regionalJet: "Jet regional",
                other: "Autre",
              },
              energy: {
                title: "Energie / carburants aeroport",
                buildingElectricity: "Consommation électrique des bâtiments",
                diesel: "Consommation flotte diesel",
                petrol: "Consommation flotte essence",
                electricFleet: "Consommation flotte électrique",
                kerosene: "Kérosène servi aux avions",
              },
            },
            territoryVehicles: {
              title: "Véhicules du territoire",
              requirementTooltip:
                "Renseigner l'ensemble du parc vehicules du territoire avec le type, le carburant et les mesures associees.",
              description:
                "Ajouter les combinaisons type de véhicule / carburant actives sur le territoire.",
              addLabel: "Ajouter une ligne",
              rowLabelPrefix: "Ligne",
              fields: {
                vehicleType: "Type de véhicule",
                vehicleTypePlaceholder: "Choisir un type",
                fuel: "Carburant",
                fuelPlaceholder: "Choisir un carburant",
              },
              measures: {
                vehicles: "Nb. véhicules",
                avgConsumption: "Conso moy.",
                avgMileage: "Kilométrage moy. / an",
              },
              vehicleTypes: {
                motorcycles: "Motocycles",
                publicTransportVehicles: "Véhicules transport public",
                mopeds: "Cyclomoteurs",
                agriculturalEquipment: "Matériel agricole",
                privateVehicles: "Véhicules privés",
                specializedMachinery: "Engins spécialisés",
                touristBuses: "Bus touristiques",
                heavyTrucks: "Poids lourds",
                lightTrucks: "Camions légers / utilitaires",
                agriculturalTractors: "Tracteurs agricoles",
                tricycles: "Tricycles",
                quadricycles: "Quadricycles",
                semiTrailerTractors: "Tracteurs routiers",
                microbuses: "Microbus",
                doubleDeckerCoaches: "Autocars à double étage",
                emergencyInterventionVehicles: "Véhicules d'intervention urgente",
                taxis: "Taxis",
                sharedTaxis: "Taxis collectifs",
                touristTaxis: "Taxis touristiques",
                motorbikes: "Motos",
                specialVehicles: "Véhicules spéciaux",
                mixedCars: "Voitures mixtes",
              },
              fuels: {
                diesel: "Diesel",
                petrol: "Essence",
                gpl: "GPL",
                gnv: "GNV",
                electricity: "Électricité",
                hybrid: "Hybride",
                other: "Autre",
              },
            },
            trees: {
              trackedTreeCrops: {
                title: "Cultures arboricoles suivies",
                description: "Ajouter les essences suivies en détail sur le territoire.",
                addLabel: "Ajouter une essence",
                rowLabelPrefix: "Essence",
                fields: {
                  treeType: "Type d'arbre",
                  treeTypePlaceholder: "Choisir un type d'arbre",
                },
                columns: {
                  youngHectares: "Jeunes (ha)",
                  adultHectares: "Adultes (ha)",
                  senescentHectares: "Sénescents (ha)",
                  youngTrees: "Jeunes (nb)",
                  adultTrees: "Adultes (nb)",
                  senescentTrees: "Sénescents (nb)",
                },
                treeTypes: {
                  oliveTrees: "Oliviers",
                  almondTrees: "Amandiers",
                  palmTrees: "Palmiers",
                  tableGrapes: "Raisins de table",
                  citrus: "Agrumes",
                  applesPears: "Pommes/Poires",
                  apricots: "Abricots",
                  pomegranates: "Grenades",
                  figs: "Figues",
                  quinces: "Coings",
                  loquats: "Nèfles",
                  peaches: "Pêches",
                  plums: "Prunes",
                  pistachios: "Pistaches",
                  cherryTrees: "Cerisiers",
                  nutsAndOthers: "Noix et autres",
                },
              },
              fruitTrees: {
                title: "Arbres fruitiers",
                countLabel: "Nombre d'arbres fruitiers",
              },
            },
            perennialPlantationStock: {
              title: "Plantations perennes",
              description: "Ajouter un groupe de plantation et choisir un type.",
              addLabel: "Ajouter une plantation",
              rowLabelPrefix: "Plantation",
              stickyLabel: "Plantation",
              fallbackRowLabel: "Plantation",
              removeLabel: "Supprimer",
              fields: {
                plantType: "Type de plantation",
              },
              placeholders: {
                plantType: "Type de plantation",
              },
              columns: {
                youngHectares: "Ha jeunes (ha)",
                adultHectares: "Ha adultes (ha)",
                oldHectares: "Ha anciennes (ha)",
                totalHectares: "Ha total",
                youngTrees: "Arbres jeunes",
                adultTrees: "Arbres adultes",
                oldTrees: "Arbres anciens",
                totalTrees: "Arbres total",
              },
              plantOptions: {
                oliveTrees: "Oliviers",
                almondTrees: "Amandiers",
                palmTrees: "Palmiers",
                tableGrapes: "Raisins de table",
                citrus: "Agrumes",
                applesPears: "Pommes/Poires",
                apricots: "Abricots",
                pomegranates: "Grenades",
                figs: "Figues",
                quinces: "Coings",
                loquats: "Nefles",
                peaches: "Peches",
                plums: "Prunes",
                pistachios: "Pistaches",
                cherryTrees: "Cerisiers",
                nutsAndOthers: "Noix et autres",
              },
            },
            livestock: {
              title: "Cheptel",
              description: "Renseigner les effectifs annuels et la part confinée.",
              yearSelector: "Choisir une année",
              columns: {
                count: "Effectif",
                confinedTimeShare: "Temps confiné (%)",
              },
              confinedTimeShareHelp:
                "Cette information permettra de déterminer la proportion de la quantité de fumier générée en étable, et celle générée sur les champs (ou éventuellement parcours). Le calcul des émissions dues au fumier en dépendra. À titre d'exemple, une valeur de 25% signifie que les ovins sont en étable en moyenne 25% du temps.",
              rows: {
                dairyCattle: "Bovins laitiers",
                otherCattle: "Autres bovins",
                sheep: "Ovins",
                goats: "Caprins",
                horses: "Équins",
                donkeysMules: "Ânes et mules",
                camels: "Camélins",
                broilers: "Poulets de chair",
                layingHens: "Poules pondeuses",
                turkeys: "Dindes",
              },
            },
            fertilizers: {
              title: "Engrais",
              description: "Renseigner le tonnage annuel et la tenure.",
              yearSelector: "Choisir une année",
              columns: {
                quantity: "Quantité",
                tenure: "Tenure (%)",
              },
              rows: {
                ammonitrate: "Ammonitrate",
                dap: "DAP",
                urea: "Urée",
              },
            },
            agriculturalProduction: {
              title: "Production agricole",
              description: "Ajouter une culture et renseigner les donnees annuelles.",
              addLabel: "Ajouter une culture",
              rowLabelPrefix: "Culture",
              fields: {
                cropType: "Type de culture",
                cropTypePlaceholder: "Choisir une culture",
              },
              measures: {
                harvestedArea: "Surface recoltee",
                production: "Production",
              },
              cropOptions: {
                wheat: "Ble",
                barley: "Orge",
                peasChickpeas: "Pois + pois chiches",
                beansBroadBeans: "Feves + feveroles",
                alfalfa: "Luzerne",
                potatoes: "Pommes de terre",
              },
            },
            treesParksWaste: {
              yearlyTitle: "Arbres / parcs / dechets verts urbains",
              yearlyDescription:
                "Structure issue du document d'entree: arbres urbains, dechets verts et destinations annuelles.",
              yearly: {
                urbanTrees: "Nombre d'arbres urbains",
                greenWaste: "Quantite de dechets verts urbains",
                composting: "Destination compostage",
                controlledLandfill: "Destination décharge contrôlée",
                uncontrolledLandfill: "Destination décharge décontrôlée",
              },
            },
          },
          evidence: {
            title: "Preuves, notes et manques",
            description:
              "Le jeu de donnees doit rester praticable: ou est le fichier, qui le porte, qu'est-ce qui manque encore et qu'est-ce qui a ete estime.",
            sourcesTitle: "Sources attendues",
            gapsTitle: "Points ouverts",
            fileLabel: "Fichier ou export",
            filePlaceholder: "ex. export_source_2023.xlsx",
            ownerLabel: "Acteur ou unite responsable",
            ownerPlaceholder: "ex. Direction technique ou partenaire sectoriel",
            notesLabel: "Notes de clarification",
            notesPlaceholder:
              "Documenter ici les estimations, les fichiers absents, les validations externes ou les points encore fragiles.",
            missingLabel: "Manques a lever",
            missingPlaceholder:
              "Lister ici ce qui manque encore pour rendre ce jeu exploitable sur l'annee active.",
          },
          readout: {
            title: "Lecture rapide de l'inventaire",
            description:
              "On garde une lecture legere du resultat pour verifier que la collecte produit deja quelque chose de lisible, sans transformer la route en dashboard.",
            summaryLabel: "Lecture courante",
          },
          completeness: {
            title: "Etat de completude",
            description: "La completude reste visible, mais en bas de page et en version compacte.",
            progressLabel: "Progression globale",
            checksLabel: "Points de controle",
            ready: "Pret",
            pending: "A lever",
          },
        },
        families: {
          municipalPatrimoine: {
            title: "Patrimoine municipal",
          },
          territorialEnergy: {
            title: "Energie territoriale",
          },
          transportMobility: {
            title: "Transport et mobilite",
          },
          afat: {
            title: "AFAT",
          },
          waste: {
            title: "Déchets",
          },
          wastewater: {
            title: "Assainissement",
          },
        },
        datasets: {
          fleet: {
            title: "Flotte",
            description:
              "Jeu municipal avec composition de flotte et bloc annuel vehicules / consommation / depense.",
            sourceMode: "Source-native: une table flotte peut couvrir plusieurs annees.",
            yearMode:
              "Year-native: l'etat par annee doit rester explicite et jamais vide silencieusement.",
            implementationNote:
              "Le panneau reprend la structure finie du document d'entree et la cale sur l'annee active pour rester pratique.",
          },
          publicLighting: {
            title: "Eclairage public",
            description:
              "Jeu municipal avec infrastructure reseau, lampes par type, consommation electrique et facture annuelle.",
            sourceMode:
              "Source-native: une table eclairage public peut rester la source principale.",
            yearMode: "Year-native: consommation et facture doivent rester lisibles par annee.",
            implementationNote:
              "Le panneau reprend la structure finie du document d'entree et concentre la saisie sur l'annee active.",
          },
          buildings: {
            title: "Batiments",
            description:
              "Le rapport cite ce dataset, mais le fichier d'entree ne fixe pas encore ses champs exacts.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO champs annuels et champs stables.",
            implementationNote:
              "Bloc provisoire pour garder visible le dataset dans la page de collecte.",
          },
          treesParksWaste: {
            title: "Arbres / parcs / dechets municipaux",
            description: "Le rapport mentionne cette famille, mais l'entree produit reste ouverte.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO blocs annuels et perimetre exact.",
            implementationNote: "Bloc provisoire pour garder visible toute la famille municipale.",
          },
          electricity: {
            title: "Demande d'electricite",
            description: "Dataset energie territorial connu, sans structure de champs finalisee.",
            sourceMode: "TODO entre fournisseur, secteur, usage ou fichier agrege.",
            yearMode: "TODO lecture pluriannuelle et completude par annee.",
            implementationNote:
              "Placeholder visible pour garder l'architecture territoire energie complete.",
          },
          photovoltaic: {
            title: "Photovoltaique",
            description:
              "Dataset energie territorial cite par le rapport, sans details de champs finalises.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO blocs de production ou capacite annuelle.",
            implementationNote: "Placeholder volontaire pour le panneau energie.",
          },
          naturalGas: {
            title: "Gaz naturel",
            description:
              "Dataset energie territorial connu, mais encore sans structure de saisie fixe.",
            sourceMode: "TODO fournisseur vs secteur vs agrege.",
            yearMode: "TODO logique de comparaison inter-annuelle.",
            implementationNote: "Placeholder volontaire pour la route inventaire complete.",
          },
          solarWaterHeating: {
            title: "Chauffe-eau solaire",
            description: "Dataset energie territorial cite, encore en mode placeholder produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO production, nombre d'installations ou capacite.",
            implementationNote:
              "Placeholder volontaire pour ne pas perdre le dataset dans l'architecture.",
          },
          port: {
            title: "Donnees portuaires",
            description:
              "Le rapport cite ce jeu transport, mais la structure produit n'est pas encore decidee.",
            sourceMode: "TODO split par sous-mode ou source unique.",
            yearMode: "TODO temporalite et carry-forward.",
            implementationNote: "Placeholder transport pour voir l'architecture complete.",
          },
          publicTransport: {
            title: "Transport public",
            description: "Jeu transport cite, sans structure de champs finalisee.",
            sourceMode: "TODO split par sous-mode ou operateur.",
            yearMode: "TODO blocs annuels et niveau de granularite.",
            implementationNote: "Placeholder transport public volontaire.",
          },
          airTransport: {
            title: "Transport aerien",
            description: "Jeu transport cite, encore sous forme de place reservee dans la page.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO volume d'activite et maille annuelle.",
            implementationNote: "Placeholder air transport volontaire.",
          },
          territoryVehicles: {
            title: "Parc routier du territoire",
            description:
              "Le template parc routier du territoire n'est pas encore transforme en modele de champs produit.",
            sourceMode: "TODO source-first, year-first ou hybride.",
            yearMode: "TODO logique proxys, comparaisons et validation annuelle.",
            implementationNote: "Placeholder transport general volontaire.",
          },
          sanitation: {
            title: "Assainissement",
            description:
              "Le rapport cite sanitation, mais le fichier d'entree ne fixe pas encore les champs.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO volumes annuels et logique d'installation.",
            implementationNote: "Placeholder sanitation volontaire.",
          },
          sanitationContinuation: {
            title: "Assainissement suite",
            description: "Suite sanitation encore non definie en produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO continuation inter-annuelle.",
            implementationNote: "Placeholder sanitation continuation volontaire.",
          },
          sanitationCh4: {
            title: "Assainissement CH4",
            description: "Breakdown sanitation CH4 encore non expose dans le produit.",
            sourceMode: "TODO expose direct ou couche app.",
            yearMode: "TODO blocs annuels et niveau de detail.",
            implementationNote: "Placeholder CH4 volontaire.",
          },
          sanitationN2o: {
            title: "Assainissement N2O",
            description: "Breakdown sanitation N2O encore non expose dans le produit.",
            sourceMode: "TODO expose direct ou couche app.",
            yearMode: "TODO blocs annuels et niveau de detail.",
            implementationNote: "Placeholder N2O volontaire.",
          },
          trees: {
            title: "Arbres",
            description: "Jeu AFAT arbres avec cultures suivies et arbres fruitiers agreges.",
            sourceMode: "Source-native: les sources arbres peuvent couvrir plusieurs annees.",
            yearMode: "Year-native: les surfaces et nombres d'arbres restent annuels.",
            implementationNote: "Le panneau combine cultures suivies et arbres fruitiers.",
          },
          livestock: {
            title: "Elevage",
            description: "Jeu AFAT cite, encore sans contrat de champs produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO temporalite et classifications.",
            implementationNote: "Placeholder AFAT volontaire.",
          },
          fertilizers: {
            title: "Engrais",
            description: "Jeu AFAT cite, encore en bloc provisoire produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO logique annuelle et perimetre.",
            implementationNote: "Placeholder AFAT volontaire.",
          },
        },
      },
      overview: {
        eyebrow: "Espace d'inventaire",
        title: "Structure de l'inventaire municipal, périmètre et niveau de preuve",
        description:
          "Traitez un domaine à la fois, gardez la même année de référence et rattachez les pièces sources qui justifient chaque jeu de données.",
        stats: {
          domains: {
            label: "Domaines",
          },
          completed: {
            label: "Prêts",
          },
          files: {
            label: "Fichiers",
            value: "11",
          },
          readiness: {
            label: "État",
            value: "En revue",
          },
        },
      },
      rail: {
        eyebrow: "Carte de l'inventaire",
        title: "Domaines de collecte",
        description:
          "Sélectionnez un domaine pour revoir le périmètre, les jeux de données attendus et les pièces justificatives.",
      },
      validation: {
        title: "Points manquants",
        description:
          "La base est exploitable, mais certains éléments doivent encore être justifiés avant la soumission.",
        missing: [
          "Les totaux de carburant de la flotte manquent encore pour le service mobilité.",
          "Aucun dossier de preuves n'est encore joint pour les notes méthodologiques.",
        ],
      },
      priority: {
        mandatory: "Obligatoire",
        recommended: "Recommandé",
        advanced: "Avancé",
      },
      status: {
        todo: "À faire",
        complete: "Complet",
        inProgress: "En cours",
        missing: "Manquant",
      },
      workspace: {
        eyebrow: "Domaine actif",
        scopeTitle: "Note de périmètre",
        readinessTitle: "Niveau de préparation",
        readinessHint:
          "Gardez les fichiers bruts, les hypothèses de travail et les saisies manuelles rattachés au même domaine pour que l'inventaire reste vérifiable.",
        requirementsTitle: "Jeux de données requis",
        fieldsTitle: "Saisie de travail",
        ownerLabel: "Unité responsable",
        ownerPlaceholder: "ex. Services techniques municipaux",
        summaryLabel: "Résumé actuel de la collecte",
        notesTitle: "Notes de méthode",
        notesPlaceholder:
          "Notez ici les valeurs manquantes, la logique de proxy ou les questions à traiter lors de la prochaine passe de collecte.",
        summaryTitle: "État actuel",
        evidenceTitle: "Pièces justificatives",
        qaTitle: "Contrôle qualité",
        qaDescription:
          "Avant la soumission, vérifiez que chaque jeu de données peut être relié à un export opérateur, une facture, un tableur ou une note d'estimation documentée.",
      },
      tray: {
        title: "Préparation à la soumission",
        description: "{count} domaines doivent encore être revus avant de figer la base.",
      },
      workspacePanels: {
        scenarios: {
          eyebrow: "Module actif",
          title: "Scénarios BaU / BaC",
          description:
            "Ce module transformera la série de référence en trajectoires d'émissions à horizon 2030, avec un scénario tendanciel et un scénario de transition.",
          dependenciesTitle: "Ce module dépend de",
          dependencies: [
            "Un IRE validé et une année complémentaire pour comparer les tendances.",
            "Des hypothèses de croissance, d'activité et de périmètre par secteur.",
            "Une base inventaire suffisamment propre pour distinguer municipal et territorial.",
          ],
          outputsTitle: "Ce module produira",
          outputs: [
            "Une trajectoire BaU par secteur et par année.",
            "Une trajectoire BaC fondée sur les hypothèses de transition.",
            "Un écart de réduction mobilisable pour le plan d'action.",
          ],
        },
        planning: {
          eyebrow: "Module actif",
          title: "Planification",
          description:
            "La planification organisera les priorités, les dépendances et l'enchaînement des travaux à partir des scénarios et des actions retenues.",
          dependenciesTitle: "Ce module dépend de",
          dependencies: [
            "Des actions déjà structurées par secteur ou par levier.",
            "Une lecture claire des priorités et des contraintes de mise en oeuvre.",
            "Des responsables identifiés et un horizon temporel partagé.",
          ],
          outputsTitle: "Ce module produira",
          outputs: [
            "Une séquence de déploiement par période.",
            "Des jalons et dépendances entre actions.",
            "Une feuille de route exploitable par la collectivité.",
          ],
        },
        "action-plan": {
          eyebrow: "Module actif",
          title: "Plan d'action",
          description:
            "Le plan d'action traduira les scénarios en fiches opérationnelles avec objectifs, acteurs, impacts, coûts et statuts.",
          dependenciesTitle: "Ce module dépend de",
          dependencies: [
            "Des scénarios BaU / BaC suffisamment stabilisés.",
            "Des secteurs et leviers d'atténuation priorisés.",
            "Une base gouvernance pour désigner les porteurs et partenaires.",
          ],
          outputsTitle: "Ce module produira",
          outputs: [
            "Un portefeuille structuré de fiches actions.",
            "Des impacts carbone attendus par action.",
            "Des responsables, calendriers et indicateurs de suivi.",
          ],
        },
        investments: {
          eyebrow: "Module actif",
          title: "Investissements",
          description:
            "Le module investissements rassemblera les coûts, arbitrages, financements et phasages associés aux actions retenues.",
          dependenciesTitle: "Ce module dépend de",
          dependencies: [
            "Un plan d'action déjà structuré avec mesures identifiées.",
            "Des volumes d'investissement estimés par action ou par secteur.",
            "Une logique de phasage annuel ou pluriannuel.",
          ],
          outputsTitle: "Ce module produira",
          outputs: [
            "Une ventilation des investissements par secteur.",
            "Un échelonnement annuel des besoins financiers.",
            "Des regroupements par commune, action ou programme.",
          ],
        },
      },
      modules: {
        items: {
          "city-profile": {
            title: "Profil de la ville",
            description: "Informations de base pour configurer l'inventaire.",
            count: "4 champs de configuration confirmés",
            scope:
              "Utilisez ce domaine pour fixer l'identité de la collectivité, le contexte de périmètre et l'année de référence avant d'examiner les jeux de données patrimoniaux ou territoriaux.",
            readiness: "Le périmètre et l'année de référence sont déjà alignés.",
            summary:
              "L'inventaire est actuellement configuré autour de Sfax, en Tunisie, avec 2023 comme année de référence et une population de référence fixée.",
            checklist: [
              "Nom officiel de la collectivité et périmètre géographique.",
              "Année de référence utilisée dans tous les domaines de collecte.",
              "Valeur de population ou proxy démographique le plus récent.",
              "Courte note de gouvernance pour le porteur de l'inventaire.",
            ],
            evidence: [
              "Note d'identification de la collectivité et référence de périmètre administratif.",
              "Note de décision sur l'année de référence partagée pour l'ensemble de l'inventaire.",
              "Source de population ou document de planification utilisé pour la configuration.",
            ],
            fields: {
              cityName: "Nom de la ville",
              country: "Pays",
              population: "Population",
              referenceYear: "Année de référence",
            },
            placeholders: {
              cityName: "ex. Sfax",
              country: "ex. Tunisie",
              population: "ex. 330000",
              referenceYear: "ex. 2026",
            },
            helper:
              "Conseil : gardez la même année de référence dans tous les modules pour conserver une base comparable.",
          },
          "collectivity-assets": {
            title: "Patrimoine de la collectivité",
            description:
              "Niveau 1 — Obligatoire : bâtiments, éclairage public, flotte, espaces verts.",
            count: "3 jeux de données assemblés, flotte encore partielle",
            scope:
              "Rassemblez les actifs que la collectivité possède ou exploite directement. Ce domaine doit rester centré sur les infrastructures maîtrisées et les équipements de service.",
            readiness:
              "Les bâtiments et l'éclairage sont exploitables ; les données flotte doivent encore être consolidées.",
            summary:
              "Les bâtiments et l'éclairage public disposent déjà de relevés structurés. Les totaux carburant de la flotte et les notes sur la gestion des espaces verts restent incomplets.",
            checklist: [
              "Bâtiments par usage, surface et consommations annuelles d'électricité, de gaz ou de carburant si disponibles.",
              "Points d'éclairage public, types de lampes, puissance installée et consommation annuelle d'électricité.",
              "Inventaire de flotte par type de véhicule, carburant, kilométrage annuel et service propriétaire.",
              "Espaces verts, arbres et gestion des déchets verts pour les zones gérées par la collectivité.",
            ],
            evidence: [
              "Factures d'électricité et de gaz des bâtiments municipaux.",
              "Inventaire de maintenance de l'éclairage ou tableur opérateur.",
              "Export du parc roulant avec kilométrage annuel ou journaux carburant.",
            ],
          },
          "territorial-data": {
            title: "Données territoriales",
            description:
              "Scopes 2 et 3 : énergie à l'échelle de la ville, transport, déchets, eaux usées.",
            count: "2 lots de sources reliés",
            scope:
              "Utilisez ce domaine pour les jeux de données à l'échelle de la ville qui décrivent le territoire dans son ensemble, et pas seulement les opérations municipales. Gardez visibles les sources opérateurs et les méthodes de proxy.",
            readiness:
              "La configuration énergie et déchets est en place ; les proxies transport demandent encore une passe.",
            summary:
              "Les références de demande d'électricité et de traitement des déchets sont déjà reliées. L'activité transport repose encore sur des proxies provisoires.",
            checklist: [
              "Demande d'électricité par secteur sur l'ensemble du territoire communal.",
              "Proxies carburant ou mobilité pour le trafic routier, les transports publics et l'offre de service.",
              "Tonnages de déchets ménagers et d'eaux usées, modes de traitement et références d'installations.",
              "Hypothèses de population, de ménages ou de croissance utilisées pour cadrer les données territoriales.",
            ],
            evidence: [
              "Export d'opérateur ou de distributeur pour la demande d'électricité.",
              "Rapport d'activité de station d'épuration et relevé des tonnages de déchets ménagers.",
              "Comptages trafic, études transport ou estimations régionales de mobilité.",
            ],
          },
          documents: {
            title: "Documents et preuves",
            description: "Recommandé : joindre les fichiers qui soutiennent l'inventaire.",
            count: "0 dossier de preuves joint",
            scope:
              "Gardez les documents sources groupés par domaine afin que les relecteurs puissent rattacher rapidement chaque valeur à un fichier, une note ou un export opérateur.",
            readiness: "La structure de preuve existe, mais le dépôt est encore vide.",
            summary:
              "Aucun dossier de preuve partagé n'est encore joint. C'est aujourd'hui le principal frein à la relecture, même lorsque les valeurs sont déjà saisies.",
            checklist: [
              "Factures, relevés et exports opérateurs en CSV, Excel ou PDF.",
              "Inventaires techniques, audits ou feuilles de maintenance utilisés pour les calculs.",
              "Contrats, pièces de commande et notes projet qui justifient les hypothèses.",
              "Une arborescence qui rattache clairement chaque fichier à un domaine de collecte.",
            ],
            evidence: [
              "Factures d'énergie ou exports opérateurs pour chaque famille d'actifs municipaux.",
              "Rapports de planification ou audits cités dans les estimations territoriales.",
              "Note méthodologique expliquant les endroits où des proxies sont utilisés.",
            ],
          },
          assumptions: {
            title: "Hypothèses et proxies",
            description:
              "Avancé : suivre les estimations, le niveau de confiance et les méthodes pour les données manquantes.",
            count: "1 note de méthode commencée",
            scope:
              "Utilisez ce domaine pour documenter chaque proxy, chaque étape d'estimation et chaque réserve de confiance qui doit accompagner la base pendant la revue.",
            readiness:
              "Une première note de méthode existe, mais la cotation de confiance est encore absente.",
            summary:
              "Une note brouillon décrit déjà la logique de proxy pour le transport, mais l'inventaire manque encore de niveaux de confiance et d'une liste claire de suites à donner par jeu de données.",
            checklist: [
              "Notes sur les données manquantes et méthode d'estimation appliquée à chaque manque.",
              "Niveau de confiance ou drapeau de revue pour chaque jeu de données majeur.",
              "Note d'attribution pour la source ou l'institution derrière chaque estimation.",
              "Courte liste d'améliorations pour la prochaine itération de l'inventaire.",
            ],
            evidence: [
              "Note de méthode sur les hypothèses proxy du transport.",
              "Justification du niveau de confiance pour la qualité des données électricité et déchets.",
              "Checklist de revue pour les écarts de données non résolus avant soumission.",
            ],
          },
        },
      },
    },
    helpCategory: {
      questionnaire: {
        badge: "Aide questionnaire",
        title: "Questionnaire",
        subtitle: "Démarrage, progression et correction des réponses",
        intro:
          "Cette page vous aide à compléter l'évaluation pas à pas pendant la phase de test, avec des réponses pratiques aux blocages les plus fréquents.",
        summaryTitle: "Sur cette page",
        summaryItems: [
          "Préparer les informations utiles avant de démarrer",
          "Suivre le parcours étape par étape",
          "Corriger une réponse ou reprendre plus tard",
          "Savoir quand contacter l'équipe",
        ],
        prep: {
          title: "Avant de commencer",
          items: [
            "Connectez-vous à votre compte pour accéder au formulaire.",
            "Prévoyez environ 15 à 25 minutes pour compléter l'évaluation.",
            "Préparez les informations utiles : déplacements habituels, consommation d'énergie et factures si disponibles.",
          ],
        },
        flow: {
          title: "Comment le questionnaire se déroule",
          steps: [
            "Ouvrez le parcours guidé depuis votre espace utilisateur.",
            "Répondez aux questions sur le transport.",
            "Complétez la partie énergie du foyer.",
            "Validez vos réponses pour accéder à la page résultats.",
          ],
        },
        corrections: {
          title: "Corriger ou reprendre l'évaluation",
          resumeQuestion: "Puis-je reprendre plus tard ?",
          resumeAnswer:
            "Oui. Vous pouvez revenir à votre session et continuer l'évaluation tant qu'elle n'est pas finalisée.",
          afterSubmitQuestion: "J'ai envoyé une réponse erronée, que faire ?",
          afterSubmitAnswer:
            "Relancez une nouvelle évaluation avec les bonnes données pour obtenir un résultat mis à jour.",
        },
        issues: {
          title: "Problèmes fréquents",
          items: [
            {
              title: "Le bouton suivant ne passe pas",
              description:
                "Vérifiez les champs obligatoires et les formats demandés. Un champ manquant ou invalide bloque le passage à l'étape suivante.",
            },
            {
              title: "Je n'ai pas toutes mes factures",
              description:
                "Utilisez une estimation raisonnable basée sur vos habitudes. Vous pourrez refaire l'évaluation plus tard avec des données plus précises.",
            },
            {
              title: "Le formulaire ne s'ouvre pas",
              description:
                "Assurez-vous d'être connecté avec le bon compte, puis rechargez la page avant de réessayer.",
            },
          ],
        },
        scope: {
          title: "Périmètre actuel de ce parcours",
          current:
            "Le questionnaire est en phase de test et couvre actuellement le parcours personnel.",
          limits: [
            "Portée active : transport et énergie du foyer.",
            "Non disponible actuellement : workflow équipe/entreprise.",
            "Non disponible actuellement : reporting audit/compliance.",
            "Non disponible actuellement : suivi en temps réel, compensation et intégrations externes.",
          ],
        },
        support: {
          title: "Quand contacter l'équipe",
          description:
            "Si le blocage continue après les vérifications ci-dessus, utilisez la page Contact avec un contexte précis.",
          checklistTitle: "Informations à inclure dans votre message :",
          checklist: [
            "L'email de votre compte",
            "Le type de problème rencontré",
            "Les étapes pour reproduire le blocage",
            "Une capture d'écran si possible",
          ],
        },
        actions: {
          backToCategories: "Retour aux catégories",
          contact: "Aller à la page Contact",
          startForm: "Ouvrir le formulaire",
        },
      },
      resultats: {
        badge: "Aide résultats",
        title: "Résultats",
        subtitle: "Comprendre l'estimation CO2 et les recommandations",
        intro:
          "Cette page explique comment lire votre estimation, interpréter les catégories affichées et utiliser les recommandations proposées.",
        summaryTitle: "Sur cette page",
        summaryItems: [
          "Lire le résultat principal en tonnes de CO2",
          "Comprendre la part transport et énergie du foyer",
          "Utiliser les recommandations comme plan d'action",
          "Identifier quand refaire une évaluation",
        ],
        readingGuide: {
          title: "Comment lire la page résultats",
          steps: [
            "Commencez par le résultat principal affiché en tonnes de CO2.",
            "Comparez les catégories présentées pour identifier les postes les plus élevés.",
            "Consultez les recommandations associées à chaque catégorie.",
            "Définissez 1 à 2 actions prioritaires puis refaites une évaluation après quelques changements.",
          ],
        },
        indicators: {
          title: "Ce que montrent les résultats",
          items: [
            {
              title: "Résultat principal",
              description:
                "Une estimation globale de votre empreinte sur la base des réponses fournies.",
            },
            {
              title: "Répartition par catégorie",
              description: "Une vue des postes d'émission pour comprendre où agir en priorité.",
            },
            {
              title: "Recommandations",
              description:
                "Des pistes d'action pratiques liées à vos catégories les plus impactantes.",
            },
          ],
        },
        recommendations: {
          title: "Comment utiliser les recommandations",
          items: [
            "Choisissez d'abord les actions réalisables rapidement.",
            "Conservez les actions à plus long terme comme objectifs de suivi.",
            "Refaites une estimation pour mesurer l'évolution après vos changements.",
          ],
        },
        limits: {
          title: "Périmètre actuel des résultats",
          description:
            "Pendant la phase de test, les résultats couvrent principalement le parcours personnel.",
          items: [
            "Portée active : transport et énergie du foyer.",
            "Certaines valeurs d'interface restent encore en consolidation.",
            "Pas de reporting audit/compliance ni d'export de rapports.",
            "Pas de suivi continu en temps réel.",
          ],
        },
        support: {
          title: "Quand contacter l'équipe",
          description:
            "Si une valeur vous semble incohérente ou si la page résultats ne s'affiche pas correctement.",
          checklistTitle: "Informations utiles à transmettre :",
          checklist: [
            "L'email du compte",
            "La date/heure approximative de l'évaluation",
            "Le point jugé incohérent dans les résultats",
            "Une capture d'écran si possible",
          ],
        },
        actions: {
          backToCategories: "Retour aux catégories",
          contact: "Aller à la page Contact",
          restart: "Refaire une évaluation",
        },
      },
      compte: {
        badge: "Aide compte",
        title: "Compte",
        subtitle: "Connexion, accès et récupération du compte",
        intro:
          "Guides rapides pour créer un compte, se connecter, confirmer l'email et récupérer l'accès pendant la phase de test.",
        quickAccess: {
          title: "Accès rapide",
          items: [
            {
              title: "Créer un compte",
              description: "Ouvrir un nouveau compte avant de commencer l'évaluation.",
              href: "/auth/sign-up",
            },
            {
              title: "Se connecter",
              description: "Accéder à votre session pour reprendre votre parcours.",
              href: "/auth/sign-in",
            },
            {
              title: "Mot de passe oublié",
              description: "Demander un lien de réinitialisation par email.",
              href: "/auth/forgot-password",
            },
          ],
        },
        faqs: {
          title: "Questions fréquentes",
          items: [
            {
              title: "Je n'arrive pas à me connecter",
              description:
                "Vérifiez l'email, le mot de passe, puis confirmez que votre adresse email a bien été validée.",
            },
            {
              title: "Je n'ai pas reçu l'email de confirmation",
              description:
                "Vérifiez vos dossiers spam/indésirables, puis relancez l'envoi depuis l'écran de confirmation.",
            },
            {
              title: "Mon mot de passe est refusé",
              description:
                "Utilisez l'option Mot de passe oublié pour définir un nouveau mot de passe.",
            },
            {
              title: "Le lien ou le code de réinitialisation ne fonctionne pas",
              description: "Demandez un nouveau code et utilisez le plus récent reçu par email.",
            },
            {
              title: "Mon compte semble bloqué",
              description:
                "Contactez l'équipe avec l'email du compte et le contexte exact du blocage.",
            },
          ],
        },
        flow: {
          title: "Parcours recommandé",
          steps: [
            "Créer le compte.",
            "Confirmer l'email.",
            "Se connecter.",
            "Accéder au questionnaire.",
          ],
        },
        errorMap: {
          title: "Messages d'erreur courants",
          columns: {
            message: "Message affiché",
            meaning: "Ce que cela signifie",
          },
          items: [
            {
              label: "Identifiants invalides",
              meaning: "L'email ou le mot de passe saisi est incorrect.",
            },
            {
              label: "Confirmation requise",
              meaning: "L'email du compte n'est pas encore confirmé.",
            },
            {
              label: "Compte bloqué",
              meaning: "Le compte nécessite une intervention du support.",
            },
            {
              label: "Service indisponible",
              meaning: "Le service est temporairement indisponible. Réessayez plus tard.",
            },
          ],
        },
        support: {
          title: "Quand contacter l'équipe",
          description:
            "Si le problème persiste après les vérifications ci-dessus, utilisez la page Contact.",
          checklistTitle: "Informations à inclure :",
          checklist: [
            "L'email du compte",
            "Le message d'erreur exact affiché",
            "Les étapes réalisées avant le blocage",
            "Le navigateur et l'appareil utilisés",
          ],
        },
        actions: {
          backToCategories: "Retour aux catégories",
          contact: "Aller à la page Contact",
        },
      },
    },
    contact: {
      badge: "Contact",
      title: "Contactez l'équipe Carbon Cut",
      description:
        "Envoyez votre demande via le formulaire ci-dessous. Le traitement se fait par email pendant la phase de test.",
      emailLabel: "Contact direct",
      responseTime: "Réponse généralement sous 24 à 48h ouvrées.",
      checklistTitle: "Cette page est pour envoyer une demande claire avec :",
      checklist: [
        "L'email de votre compte",
        "Le type de problème (connexion, formulaire, résultat)",
        "Les étapes pour reproduire le problème",
        "Une capture d'écran si possible",
      ],
      scopeTitle: "Périmètre actuel",
      scopeDescription:
        "Cette page est pour les utilisateurs du parcours personnel en test (transport et énergie du foyer).",
      form: {
        name: "Nom",
        email: "Email",
        topic: "Sujet",
        message: "Message",
        submit: "Envoyer la demande",
        notLive: "Le formulaire est en place, l'envoi sera activé bientôt.",
      },
      actions: {
        goHelp: "Aller au centre d'aide",
        startForm: "Commencer l'évaluation",
      },
    },
    Home: { index: "Accueil" },
    Blog: { index: "Blog" },
    Categories: { index: "Catégories" },
  },
  "(auth)": {
    login: {
      title: "Se connecter",
      description: "Connectez-vous pour commencer votre pre-evaluation carbone.",
      form: {
        email: "E-mail",
        password: "Mot de passe",
        submit: "Connexion",
      },
      message: {
        signup: "Vous n'avez pas de compte?",
        or: "OU",
      },
      link: {
        signup: "S'inscrire",
        forgetPassword: "Mot de passe oublié?",
      },
      error: {
        invalidCredentials: "Identifiants invalides.",
        confirmationRequired: "Veuillez confirmer votre e-mail avant de continuer.",
        blocked: "Ce compte est bloque. Contactez le support.",
        providerDisabled: "La connexion locale est indisponible pour le moment.",
        generic: "Impossible de se connecter pour le moment.",
      },
    },
    signup: {
      title: "Creer un compte",
      description: "Créez votre compte avant de commencer le questionnaire.",
      highlights: {
        ariaLabel: "Points forts Carbon Cut",
        items: [
          {
            title: "Mesurez avec clarté",
            description:
              "Commencez par une évaluation guidée de votre empreinte personnelle, avec un parcours simple et progressif.",
          },
          {
            title: "Restez sur l'essentiel",
            description:
              "Le flux actuel se concentre sur les postes transport et énergie du foyer pour une première lecture utile.",
          },
          {
            title: "Passez à l'action",
            description:
              "Après le calcul, consultez un résultat structuré et des pistes concrètes pour réduire votre impact.",
          },
        ],
      },
      form: {
        fullName: "Nom complet",
        username: "Nom d'utilisateur",
        email: "E-mail",
        password: "Mot de passe",
        passwordConfirm: "Confirmez le mot de passe",
        submit: "Créer un compte",
      },
      message: {
        login: "Vous avez déjà un compte?",
        or: "OU",
      },
      link: {
        login: "Se connecter",
      },
      error: {
        identifierTaken: "Cet e-mail ou ce nom d'utilisateur est deja utilise.",
        disabled: "L'inscription est desactivee pour le moment.",
        defaultRole: "La configuration d'inscription est incomplete.",
        passwordMismatch: "Les mots de passe ne correspondent pas.",
        generic: "Impossible de creer le compte pour le moment.",
      },
    },
    forgetPassword: {
      title: "Recuperer votre compte",
      description: "Recevez un code de reinitialisation par e-mail.",
      form: {
        email: "E-mail",
        submit: "Envoyer",
        password: "Nouveau mot de passe",
        passwordConfirm: "Confirmez le nouveau mot de passe",
      },
      message: {
        email: "Consultez votre messagerie",
        code: "Nous avons envoyé un lien de vérification à votre adresse e-mail",
        success:
          "Si un compte existe pour cet e-mail, un message de reinitialisation a ete envoye.",
      },
      error: {
        passwordMismatch: "Les mots de passe ne correspondent pas.",
        invalidCode: "Le code de reinitialisation est invalide.",
      },
      link: {
        login: "Se connecter",
      },
    },
    verify: {
      title: "Confirmer votre e-mail",
      description: "Entrez le code reçu par e-mail pour activer votre session.",
      message: {
        email: "Nous avons envoyé un code de vérification à {email}.",
        pending:
          "Votre inscription est en attente. Confirmez votre e-mail pour ouvrir votre session.",
        sent: "Si le compte existe et n'est pas confirme, un nouvel e-mail a ete envoye.",
      },
      form: {
        submit: "Confirmer l'e-mail",
        reset: "Renvoyer l'e-mail",
        code: "Code de confirmation",
      },
      toast: {
        succ: "L'e-mail a été envoyé.",
      },
      error: {
        invalidToken: "Le code de confirmation est invalide.",
        alreadyConfirmed: "Cet e-mail est deja confirme. Connectez-vous.",
        blocked: "Ce compte est bloque. Contactez le support.",
        genericResend: "Impossible de renvoyer l'e-mail de confirmation.",
        genericConfirm: "Impossible de confirmer l'e-mail pour le moment.",
      },
      link: {
        login: "Se connecter",
      },
    },
    resetPassword: {
      title: "Definir un nouveau mot de passe",
      description: "Entrez le code recu et choisissez un nouveau mot de passe.",
      form: {
        code: "Code de reinitialisation",
        password: "Nouveau mot de passe",
        passwordConfirm: "Confirmez le mot de passe",
        submit: "Mettre a jour le mot de passe",
      },
      error: {
        generic: "Impossible de reinitialiser le mot de passe pour le moment.",
      },
    },
    common: {
      cta: {
        backHome: "Retour a l'accueil",
        signIn: "Se connecter",
        signUp: "Creer un compte",
        retry: "Reessayer",
        logout: "Deconnexion",
      },
      error: {
        unavailable:
          "Le service d'authentification est indisponible pour le moment. Veuillez reessayer plus tard.",
      },
      message: {
        loading: "Chargement de la session...",
      },
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
    preAssessment: {
      slides: [
        {
          title: "Durée & précision",
          visualLabel: "15–25 minutes",
          note: "La longueur du formulaire ainsi que la finesse et le raffinement des questions conditionnent, dans une large mesure, la fiabilité des résultats. C'est notre atout distinctif.",
          items: [
            {
              id: "duration",
              title: "Durée estimée",
              description: "15–25 minutes pour compléter l'évaluation",
            },
            {
              id: "measure",
              title: "Ce que nous mesurons",
              description: "Estimation de votre empreinte carbone basée sur vos réponses",
            },
            {
              id: "accuracy",
              title: "Niveau de précision",
              description: "Résultats indicatifs fondés sur des données déclaratives",
            },
          ],
        },
        {
          title: "Sections & données",
          items: [
            {
              id: "transport",
              title: "Transport",
              description: "Voiture, transports en commun, vols",
            },
            {
              id: "energy",
              title: "Énergie",
              description: "Électricité, gaz, chauffage à domicile",
            },
            {
              id: "food",
              title: "Alimentation & Déchet",
              description: "Habitudes alimentaires et gestion des déchets",
            },
            {
              id: "data",
              title: "Données nécessaires",
              description: "Factures énergétiques, kilométrage annuel, habitudes de consommation",
            },
          ],
        },
        {
          title: "Données & accès",
          items: [
            {
              id: "privacy",
              title: "Confidentialité",
              description:
                "Vos données sont confidentielles et utilisées uniquement pour votre diagnostic",
            },
            {
              id: "save",
              title: "Sauvegarde",
              description: "Reprenez votre évaluation à tout moment",
            },
            {
              id: "results",
              title: "Accès aux résultats",
              description: "Résultats disponibles pendant X jours avant abonnement",
            },
          ],
        },
      ],
      cta: "Commencer",
      next: "Suivant",
      stepIndicator: "Étape {current} sur {total}",
    },
    basic: {
      energy: {
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
              types: {
                hardwood: "Feuillus durs",
                hardWoodExemples: "Exemples : chêne, hêtre, frêne",
                softwood: "Résineux",
                softWoodExemples: "Exemples : pin, sapin, épicéa",
              },
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
          note: {
            title: "Astuce",
            description:
              "Si vous avez la consommation, indiquez-la en kWh. Sinon, indiquez votre dépense en €. Vous pouvez remplir les deux.",
          },
          labels: {
            preferred: "Consommation (préféré)",
            fallback: "Dépense mensuelle",
          },
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
          title: "Voiture {index} : Informations sur la voiture",
          q: "Informations sur la voiture",
          l1: "Marque",
          l2: "Modèle",
          notListed: "Pas dans la liste ?",
          backToList: "Revenir à la liste",
          otherMakeLabel: "Autre marque",
          otherMakePlaceholder: "Saisissez la marque",
          otherModelLabel: "Autre modèle",
          otherModelPlaceholder: "Saisissez le modèle",
        },
        "qCar1-2": {
          title: "Voiture {index} : type de voiture",
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
          title: "Voiture {index} : carburant de voiture",
          q: "Quel carburant utilise la partie thermique de votre hybride ?",
          Gasoline: "Essence",
          Diesel: "Diesel",
          "natural Gaz": "Bio-gaz",
          other: "Autre",
        },
        qCar2: {
          title: "Voiture {index} : Informations supplémentaires",
          q: "Informations supplémentaires",
          l3: "Année",
          l4: "Cylindrée",
          l11: "Consommation carburant (L par 100 km)",
          l12: "L / 100 km",
          l21: "Consommation électrique (kWh par 100 km)",
          l22: "kWh / 100 km",
          l5: "Distance parcourue par semaine",
          u5: "km",
        },
        qCar3: {
          title: "Voiture {index} : Consommation de voiture",
          q1L: "Combien de litres votre voiture consomme-t-elle par semaine?",
          q1E: "Combien d'electricite (en kWh) votre voiture consomme-t-elle par semaine?",
          q1LL: "Litres par semaine",
          q1LE: "kWh par semaine",
          q2: "Si vous ne connaissez pas la consommation, vous pouvez fournir vos dépenses hebdomadaires.",
          note: {
            title: "Astuce",
          },
          modes: {
            money: "En euros dépensés",
          },
          labels: {
            moneySpent: "Montant dépensé par semaine",
            price: "Prix de {unit}",
          },
          q3: "Quelle est la distance parcourue par votre voiture chaque semaine?",
        },
        qCar4: {
          title: "Voiture {index} : Distance totale affichée",
          q: "Quelle est la distance totale affichée sur le tableau de bord de votre voiture?",
        },
        carStatus: {
          label: "Voiture {index}",
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
              originDestinationError: "Origine et destination identiques ou introuvables.",
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
            helper: "La somme des 3 colonnes doit être égale au total indiqué.",
            note: "Indication que le remplissage est approximative.",
            enteredLabel: "Saisi: {entered} / {total}",
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
            helper: "La somme des 3 colonnes doit être égale au total indiqué.",
            note: "Indication que le remplissage est approximative.",
            enteredLabel: "Saisi: {entered} / {total}",
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
      waste: {
        general: {
          waste: {
            q: "Quelle est la quantité totale de déchets généré au sein de votre ménage?",
            ...waste,
          },
        },
        precise: {
          q: "Si vous effectuez le tri sélectif des déchets, pour lesquels de ces déchets pouvez-vous estimer les quantités :",
          type: "Type",
          labels: {
            recylablePackaging: "Emballages recyclables (plastiques, cartons, métaux)",
            paper: "Papiers (journaux, magazines)",
            glass: "Verre (bouteilles et bocaux)",
            organic: "Déchets organiques",
          },
          waste: waste,
        },
        details: {
          wasteDestination: {
            q: "Si vous ne pratiquez pas le tri sélectif, avez-vous une idée de la destination finale de vos déchets ménagers ?",
            placeholder: "Sélectionnez une destination",
            options: {
              incineration: "Incinération",
              recycling: "Recyclage",
              landfilling: "Enfouissement",
              composting: "Compostage",
              biomethanation: "Biométhanisation",
              idk: "Je ne sais pas",
            },
          },
          personalCompost: {
            q: "Préparez-vous votre compost vous-même à domicile pour votre usage personnel ?",
            yes: "Oui",
            no: "Non",
          },
          biodigest: {
            q1: {
              q: "Disposez-vous d'un biodigesteur à domicile pour votre usage personnel ?",
              yes: "Oui",
              no: "Non",
            },
            q2: {
              q: "Pouvez-vous indiquer votre production ?",
              electric: {
                q: "Électricité",
                amount: "Quantité",
                unit: "kWh",
                frequency: "Fréquence",
              },
              biogas: {
                q: "Biogaz",
                amount: "Quantité",
                unit: "m³",
                frequency: "Fréquence",
              },
              frequencies: {
                month: "mois",
                year: "an",
              },
            },
          },
        },
        water: {
          q1: {
            q: "indiquez globalement le montant moyen de votre facture relative à l'assainissement:",
            unit: "€",
            frequency: {
              placeholder: "fréquence",
              month: "mois",
              year: "an",
            },
          },
          q2: {
            q: "indiquez globalement la quantité moyenne d'eau prise en compte dans la rubrique assainissement de votre facture.",
            frequency: {
              placeholder: "fréquence",
              month: "mois",
              year: "an",
            },
            unit: cubiqueMeter,
          },
          q3: {
            q: "Si possible, indiquez votre index compteur d'eau",
          },
        },
      },
    },
    yes: "oui",
    no: "non",
    unit: "en {unit}",
    idk: "Je ne sais pas",
    progress: {
      title: "Question {current} sur {total}",
      percentage: "{value}% terminé",
    },
    next: "Continuer",
    back: "Précédent",
    preview: "Aperçu",
    submit: "Résultat",
    errors: {
      Required: "Obligatoire",
      between0And100: "Valeur entre 0 et 100",
      collectivityCountryInvalid: "Choisissez un pays valide.",
      collectivityProjectSlugInvalid:
        "Utilisez uniquement des lettres minuscules, des chiffres et des tirets.",
      collectivityProjectSlugNotUnique: "Ce slug existe déjà. Choisissez-en un autre.",
      collectivityYearMustBePast: "L'année en cours et les années futures ne sont pas autorisées.",
      collectivityInventoryYearInvalid: "Chaque année d'inventaire doit être valide.",
      collectivityInventoryYearsDuplicate: "Chaque année d'inventaire doit être unique.",
      collectivityInventoryYearsReferenceMissing:
        "L'année de référence doit aussi figurer dans les années d'inventaire.",
      woodTypeRequired: "Sélectionnez au moins un type de bois.",
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
    woodNotice: {
      title: "Le bois compte dans votre empreinte",
      description:
        "Votre total est plus élevé car il inclut le CO₂ biogénique (scope 1N) du bois. Ce choix reste favorable face aux énergies fossiles.",
    },
    recommendations: {
      title: "Moyens de réduire votre impact",
      transport: {
        transportation: {
          title: "Transportation",
          desc: "Optez pour le transport en commun, le covoiturage ou le vélo",
        },
      },
      energy: {
        energy: {
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
    energy: "Energie",
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
