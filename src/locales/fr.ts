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
  home: {
    nav: {
      features: "Fonctionnalités",
      trust: "Version test",
      results: "Résultats",
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
          "Le plan suit la progression du rapport : cadrage, inventaire, scénarios et plan d'action.",
        currentLabel: "Espace actif",
        sections: {
          cadrage: {
            title: "Cadrage",
            description:
              "Définir le périmètre, les communes, les secteurs, les scopes, l'année de référence et l'horizon.",
            status: "À cadrer",
          },
          inventaire: {
            title: "Inventaire",
            description:
              "Gérer la collecte, les années couvertes et les résultats d'inventaire dans un même espace de travail.",
            status: "Actif",
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
          cadrage: [
            {
              title: "Identité du plan",
              description: "Nom du plan, territoire de référence et cadre général partagé.",
            },
            {
              title: "Territoire et communes",
              description:
                "Communes incluses dans le plan et lecture de leur place dans le périmètre.",
            },
            {
              title: "Périmètre",
              description:
                "Périmètre organisationnel, périmètre opérationnel et distinction entre territoire et patrimoine municipal.",
            },
            {
              title: "Secteurs et scopes",
              description:
                "Secteurs couverts par le plan et scopes pris en compte dans le cadre méthodologique.",
            },
            {
              title: "Temporalité",
              description: "Année de référence, années de comparaison et horizon cible du plan.",
            },
            {
              title: "État de complétude",
              description:
                "Vue synthétique de ce qui est déjà cadré et de ce qui manque encore avant l'inventaire.",
            },
          ],
          inventaire: [
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
      cadrageWorkspace: {
        eyebrow: "Module actif",
        title: "Cadrage du plan",
        description:
          "Définissez ici le cadre commun du plan avant l'inventaire, les scénarios et les actions. Tout le reste s'appuiera sur ce périmètre partagé.",
        account: {
          title: "Règle de lecture",
          description:
            "Le compte collectivité pilote le cadrage commun du plan. Un compte commune n'agit que sur ce qui concerne son patrimoine municipal, sans reprendre la main sur l'ensemble du cadre territorial.",
        },
        output: {
          title: "Sortie attendue",
          items: [
            "Un périmètre stable pour lancer l'inventaire sans ambiguïté.",
            "Une base commune pour comparer les années et lire les écarts.",
            "Un cadre exploitable pour les scénarios BaU / BaC et le plan d'action.",
          ],
        },
        completion: {
          title: "État de complétude",
          ready: "Prêt pour l'inventaire",
          incomplete: "À compléter",
          progressSuffix: "blocs cadrés",
          items: {
            identity: "Identité du plan",
            communes: "Communes incluses",
            perimeter: "Périmètre du plan",
            sectorsScopes: "Secteurs et scopes",
            temporality: "Temporalité",
          },
        },
        sections: {
          identity: {
            title: "Identité du plan",
            description:
              "Vérifiez l'identité du plan et définissez le niveau territorial de référence sur lequel tout le reste va s'appuyer.",
            fields: {
              planIdentity: "Identité du plan",
              territoryLevel: "Niveau territorial principal",
              territory: "Territoire de référence",
            },
            planIdentityHint:
              "Le nom du plan est défini au niveau du dossier. Cette section sert à verrouiller le territoire de référence et le niveau de lecture utilisé dans les modules suivants.",
            territoryLevels: [
              { value: "municipalite", label: "Municipalité" },
              { value: "intercommunalite", label: "Intercommunalité" },
              { value: "territoire-elargi", label: "Territoire élargi" },
            ],
            placeholders: {
              territory: "ex. Agglomération concernée, intercommunalité ou municipalité porteuse",
            },
          },
          territory: {
            title: "Territoire et communes",
            description:
              "Ajoutez les communes ou sous-territoires inclus dans le plan puis relisez la liste avant de passer à l'inventaire.",
            communesLabel: "Communes incluses",
            communesPlaceholder: "ex. Commune ou sous-territoire à ajouter",
            addCommune: "Ajouter",
            removeCommune: "Retirer",
            emptyState: "Aucune commune n'est encore ajoutée au périmètre du plan.",
            helper:
              "Cette liste sert ensuite de base aux lectures territoriales et aux déclinaisons patrimoniales.",
          },
          perimeter: {
            title: "Périmètre",
            description:
              "Définissez ce qui entre dans le plan au niveau organisationnel et au niveau opérationnel sans passer par des notes longues et floues.",
            organizationalLabel: "Périmètre organisationnel",
            organizationalOptions: [
              "Collectivité porteuse du plan",
              "Communes membres incluses dans la gouvernance",
              "Services municipaux contributeurs",
              "Structure intercommunale ou dispositif de pilotage",
            ],
            operationalLabel: "Périmètre opérationnel",
            operationalOptions: [
              "Patrimoine municipal",
              "Territoire au sens large",
              "Infrastructures ou services mutualisés",
              "Postes indirects retenus pour le plan",
            ],
            noteLabel: "Note courte sur les exclusions ou limites",
            notePlaceholder:
              "ex. Hors aviation, hors industrie lourde ou autre limite méthodologique",
            helper:
              "Utilisez cette note seulement pour signaler une limite claire. Le périmètre principal doit rester lisible via les options cochées.",
          },
          sectorsScopes: {
            title: "Secteurs et scopes",
            description:
              "Confirmez les secteurs couverts par le plan ainsi que les scopes retenus dans le cadre méthodologique.",
            sectorsTitle: "Secteurs couverts",
            sectors: [
              "Énergie stationnaire",
              "Transport",
              "Déchets",
              "Eaux usées",
              "Espaces verts et AFAT",
              "Tertiaire et industrie",
            ],
            scopesTitle: "Scopes couverts",
            scopes: ["Scope 1", "Scope 2", "Scope 3"],
          },
          temporality: {
            title: "Temporalité",
            description:
              "Fixez l'année de référence, l'horizon cible et ajoutez une ou plusieurs années de comparaison avant scénarisation.",
            referenceYear: "Année de référence",
            horizon: "Horizon cible",
            comparisonYears: "Années de comparaison",
            comparisonYearsPlaceholder: "Choisir une année",
            addYear: "Ajouter",
            removeYear: "Retirer",
            emptyState: "Aucune année de comparaison n'est encore ajoutée.",
            helper:
              "Ajoutez autant d'années que nécessaire pour comparer les trajectoires et alimenter les scénarios.",
          },
        },
      },
      planSidebar: {
        title: "Lecture du rapport",
        description:
          "Quatre modules visibles au démarrage : cadrage, inventaire, scénarios et plan d'action. Les routes d'entrée restent non modulaires.",
      },
      planMarkers: {
        territory: "Territoire de référence",
        communes: "Communes incluses",
        horizon: "Horizon cible",
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
        cards: {
          ire: {
            title: "IRE 2023",
            meta: "année de référence validée",
            status: "Obligatoire",
          },
          year2: {
            title: "Année complémentaire",
            meta: "ajout requis pour les projections",
            status: "À compléter",
          },
          horizon: {
            title: "Horizon 2030",
            meta: "sortie cible des scénarios",
            status: "Projection",
          },
        },
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
          "Ouvrir la route doit amener directement sur un jeu de donnees a renseigner, avec les champs utiles visibles sans structure de navigation envahissante.",
        controls: {
          familyLabel: "Groupe",
          datasetLabel: "Jeu de donnees",
          datasetPlaceholder: "Choisir un jeu de donnees",
          yearLabel: "Annee consultee",
          yearPlaceholder: "Choisir une annee d'inventaire",
          lensLabel: "Lecture active",
          lensPlaceholder: "Choisir une lecture",
          lenses: {
            territorial: "Territorial",
            municipal: "Patrimoine municipal",
          },
        },
        hints: {
          sourceFirst: "Source-first",
          multiYear: "Multi-annees",
          todoLabel: "TODO",
          provenanceTodo:
            "TODO provenance: le document inventaire demande une regle transversale, mais ne fixe pas encore les champs standard de preuve, source ou validation.",
          progressTodo:
            "TODO progression: on pourra montrer une progression plus tard, mais pas avant qu'une regle produit explicite existe pour le niveau de suivi.",
          placeholderTitle: "Structure encore a cadrer dans le document d'entree",
        },
        sections: {
          years: {
            title: "Annees d'inventaire",
            description:
              "Choisir d'abord l'annee sur laquelle vous travaillez. Les blocs de saisie finished se calent ensuite sur cette annee.",
          },
          families: {
            title: "Familles et jeux de donnees",
            description:
              "L'utilisateur avance par famille de collecte puis par jeu de donnees. Les jeux finis ont une vraie structure; les autres restent visibles en placeholder sous dev.",
            datasetsLabel: "jeux de donnees",
          },
          entry: {
            title: "Saisie du jeu actif",
            description:
              "Le coeur de la route est ici: travailler un jeu de donnees, remplir ses valeurs, puis rattacher ce qui manque encore.",
            statusLabel: "Etat du jeu",
            sourceModeLabel: "Lecture source-native",
            yearModeLabel: "Lecture year-native",
            implementationLabel: "Implementation actuelle",
            activeYearLabel: "Annee active",
            placeholder: {
              title: "Bloc sous dev",
              description:
                "Le fichier d'entree ne fixe pas encore la structure exacte de ce jeu. On garde donc un bloc volontairement provisoire pour conserver toute l'architecture de collecte.",
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
                "under dev. structure pas encore fixee. placeholder garde seulement pour voir la page complete pendant le build.",
            },
            fleet: {
              compositionTitle: "Composition de flotte",
              compositionDescription:
                "Structure report-backed issue du document d'entree: categories de vehicules, motorisations, puis bloc annuel pour l'annee active.",
              categories: [
                { key: "fonction", label: "Voitures de fonction" },
                { key: "service", label: "Voitures de service" },
                { key: "engins", label: "Vehicules et engins de service" },
                { key: "autres", label: "Autres" },
              ],
              compositionColumns: ["Essence", "Diesel", "Electrique", "Hybride", "GNV", "Total"],
              yearlyTitle: "Bloc annuel fleet",
              yearlyVehiclesTitle: "Nombre de vehicules",
              yearlyVehiclesRows: [
                { key: "petrol", label: "Vehicules essence" },
                { key: "diesel", label: "Vehicules diesel" },
                { key: "electric", label: "Vehicules electriques" },
                { key: "hybrid", label: "Vehicules hybrides" },
                { key: "gnv", label: "Vehicules GNV" },
                { key: "total", label: "Total" },
              ],
              yearlyEnergyTitle: "Consommation energetique",
              yearlyEnergyRows: [
                { key: "petrol", label: "Essence" },
                { key: "diesel", label: "Diesel" },
                { key: "electricity", label: "Electricite" },
                { key: "gnv", label: "GNV" },
              ],
              yearlySpendTitle: "Depense energetique",
              yearlySpendRows: [
                { key: "petrol", label: "Essence" },
                { key: "diesel", label: "Diesel" },
                { key: "electricity", label: "Electricite" },
                { key: "gnv", label: "GNV" },
              ],
              valueColumn: "Valeur",
            },
            lighting: {
              infrastructureTitle: "Infrastructure d'eclairage public",
              infrastructureDescription:
                "Structure report-backed issue du document d'entree: infrastructure reseau, points lumineux par type, puis bloc annuel pour l'annee active.",
              infrastructureRows: [
                { key: "cabinets", label: "Nombre d'armoires" },
                { key: "meters", label: "Nombre de compteurs" },
                { key: "dimmers", label: "Nombre de variateurs operationnels" },
                { key: "power", label: "Puissance si applicable" },
              ],
              lampsTitle: "Points lumineux",
              lampsDescription:
                "Chaque ligne reprend le type de lampe mentionne dans le rapport avec puissance et total de points.",
              lampRows: [
                { key: "shp", label: "SHP" },
                { key: "hpl", label: "HPL" },
                { key: "led", label: "LED" },
              ],
              lampsColumns: ["Puissance unitaire", "Total de points"],
              yearlyTitle: "Bloc annuel public lighting",
              yearlyRows: [
                { key: "consumption", label: "Consommation electrique annuelle" },
                { key: "bill", label: "Facture electrique annuelle" },
              ],
              valueColumn: "Valeur",
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
        years: [
          {
            value: "2023",
            title: "IRE 2023",
            badge: "IRE",
            status: "Base consolidee",
            note: "Annee de reference deja structurante pour la collecte et les premiers calculs.",
          },
          {
            value: "2022",
            title: "2022",
            badge: "Comparaison",
            status: "Comparaison disponible",
            note: "Annee utile pour la comparaison et la reprise des jeux historiques.",
          },
          {
            value: "2024",
            title: "2024",
            badge: "Complement",
            status: "Collecte en cours",
            note: "Annee plus recente encore incomplete, surtout utile pour poursuivre la collecte.",
          },
        ],
        families: [
          {
            key: "municipal-patrimoine",
            title: "Patrimoine municipal",
            description:
              "Flotte, eclairage public, batiments et autres jeux municipaux cites par le rapport.",
            status: "Pret a saisir",
          },
          {
            key: "territorial-energy",
            title: "Energie territoriale",
            description:
              "Electricite, photovoltaique, gaz naturel et chauffe-eau solaire a l'echelle du territoire.",
            status: "Sous cadrage",
          },
          {
            key: "transport-mobility",
            title: "Transport et mobilite",
            description: "Port, transport public, air transport et transport generique.",
            status: "Sous cadrage",
          },
          {
            key: "sanitation-afat",
            title: "Assainissement et AFAT",
            description:
              "Sanitation et AFAT encore sans structure de saisie stabilisee dans le fichier d'entree.",
            status: "Sous cadrage",
          },
        ],
        datasets: [
          {
            key: "fleet",
            familyKey: "municipal-patrimoine",
            kind: "fleet",
            title: "Fleet",
            status: "Structure finie",
            description:
              "Jeu municipal avec composition de flotte et bloc annuel vehicules / consommation / depense.",
            sourceMode: "Source-native: une table flotte peut couvrir plusieurs annees.",
            yearMode:
              "Year-native: l'etat par annee doit rester explicite et jamais vide silencieusement.",
            implementationNote:
              "Le panneau reprend la structure finie du document d'entree et la cale sur l'annee active pour rester pratique.",
            sources: [
              "Table administrative du parc roulant municipal.",
              "Journaux carburant, carnets de bord et releves de consommation.",
            ],
            gaps: [
              "Verifier encore le traitement des vehicules inactifs sur une annee donnee.",
              "Confirmer la logique de carry-forward pour les annees supplementaires.",
            ],
          },
          {
            key: "public-lighting",
            familyKey: "municipal-patrimoine",
            kind: "publicLighting",
            title: "Public Lighting",
            status: "Structure finie",
            description:
              "Jeu municipal avec infrastructure reseau, lampes par type, consommation electrique et facture annuelle.",
            sourceMode:
              "Source-native: une table eclairage public peut rester la source principale.",
            yearMode: "Year-native: consommation et facture doivent rester lisibles par annee.",
            implementationNote:
              "Le panneau reprend la structure finie du document d'entree et concentre la saisie sur l'annee active.",
            sources: [
              "Inventaire technique du reseau d'eclairage public.",
              "Factures et abonnements electriques rattaches au reseau.",
            ],
            gaps: [
              "Confirmer si la puissance doit rester libre ou normalisee par unite.",
              "Preciser plus tard la logique d'expansion quand des annees supplementaires existent.",
            ],
          },
          {
            key: "buildings",
            familyKey: "municipal-patrimoine",
            kind: "placeholder",
            title: "Building Data",
            status: "Sous dev",
            description:
              "Le rapport cite ce dataset, mais le fichier d'entree ne fixe pas encore ses champs exacts.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO champs annuels et champs stables.",
            implementationNote:
              "Bloc provisoire pour garder visible le dataset dans la page de collecte.",
            sources: ["under dev source list", "placeholder facture maybe later"],
            gaps: ["Champ exact sous dev.", "Validation produit encore absente."],
          },
          {
            key: "trees-parks-waste",
            familyKey: "municipal-patrimoine",
            kind: "placeholder",
            title: "Trees / Parks / Municipal Waste",
            status: "Sous dev",
            description:
              "Le rapport mentionne cette famille municipale, mais l'entree produit reste ouverte.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO blocs annuels et perimetre exact.",
            implementationNote: "Bloc provisoire pour garder visible toute la famille municipale.",
            sources: ["under dev parc source", "under dev municipal waste note"],
            gaps: [
              "Structure d'entree pas encore definie.",
              "Perimetre municipal exact a arbitrer.",
            ],
          },
          {
            key: "electricity",
            familyKey: "territorial-energy",
            kind: "placeholder",
            title: "Electricity Demand",
            status: "Sous dev",
            description: "Dataset energie territorial connu, sans structure de champs finalisee.",
            sourceMode: "TODO entre fournisseur, secteur, usage ou fichier agrege.",
            yearMode: "TODO lecture pluriannuelle et completude par annee.",
            implementationNote:
              "Placeholder visible pour garder l'architecture territoire energie complete.",
            sources: ["under dev electricity export", "under dev sector split note"],
            gaps: ["Structure exacte encore ouverte.", "Mode d'entree utilisateur encore ouvert."],
          },
          {
            key: "photovoltaic",
            familyKey: "territorial-energy",
            kind: "placeholder",
            title: "Photovoltaic",
            status: "Sous dev",
            description:
              "Dataset energie territorial cite par le rapport, sans details de champs finalises.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO blocs de production ou capacite annuelle.",
            implementationNote: "Placeholder volontaire pour le panneau energie.",
            sources: ["under dev pv source", "draft production file"],
            gaps: ["Champs exacts manquants.", "Granularite installation vs agregee ouverte."],
          },
          {
            key: "natural-gas",
            familyKey: "territorial-energy",
            kind: "placeholder",
            title: "Natural Gas",
            status: "Sous dev",
            description:
              "Dataset energie territorial connu, mais encore sans structure de saisie fixe.",
            sourceMode: "TODO fournisseur vs secteur vs agrege.",
            yearMode: "TODO logique de comparaison inter-annuelle.",
            implementationNote: "Placeholder volontaire pour la route inventaire complete.",
            sources: ["under dev gas export", "draft territory gas note"],
            gaps: ["Modele de champs a definir.", "Niveau d'usage a arbitrer."],
          },
          {
            key: "solar-water-heating",
            familyKey: "territorial-energy",
            kind: "placeholder",
            title: "Solar Water Heating",
            status: "Sous dev",
            description: "Dataset energie territorial cite, encore en mode placeholder produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO production, nombre d'installations ou capacite.",
            implementationNote:
              "Placeholder volontaire pour ne pas perdre le dataset dans l'architecture.",
            sources: ["under dev solar water source", "draft equipment note"],
            gaps: ["Structure pas encore definie.", "Perimetre de collecte pas encore tranche."],
          },
          {
            key: "port",
            familyKey: "transport-mobility",
            kind: "placeholder",
            title: "Port-related Data",
            status: "Sous dev",
            description:
              "Le rapport cite ce jeu transport, mais la structure produit n'est pas encore decidee.",
            sourceMode: "TODO split par sous-mode ou source unique.",
            yearMode: "TODO temporalite et carry-forward.",
            implementationNote: "Placeholder transport pour voir l'architecture complete.",
            sources: ["under dev port source", "draft port traffic note"],
            gaps: ["Champs exacts inconnus.", "Premiere scope produit encore ouverte."],
          },
          {
            key: "public-transport",
            familyKey: "transport-mobility",
            kind: "placeholder",
            title: "Public Transport",
            status: "Sous dev",
            description: "Jeu transport cite, sans structure de champs finalisee.",
            sourceMode: "TODO split par sous-mode ou operateur.",
            yearMode: "TODO blocs annuels et niveau de granularite.",
            implementationNote: "Placeholder transport public volontaire.",
            sources: ["under dev public transport source", "draft ridership note"],
            gaps: ["Structure d'entree manquante.", "Sous-modes pas encore arbitres."],
          },
          {
            key: "air-transport",
            familyKey: "transport-mobility",
            kind: "placeholder",
            title: "Air Transport",
            status: "Sous dev",
            description: "Jeu transport cite, encore sous forme de place reservee dans la page.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO volume d'activite et maille annuelle.",
            implementationNote: "Placeholder air transport volontaire.",
            sources: ["under dev airport source", "draft aviation note"],
            gaps: ["Champs exacts absents.", "Perimetre de calcul encore ouvert."],
          },
          {
            key: "transport",
            familyKey: "transport-mobility",
            kind: "placeholder",
            title: "Transport Generic",
            status: "Sous dev",
            description:
              "Le template transport generique n'est pas encore transforme en modele de champs produit.",
            sourceMode: "TODO source-first, year-first ou hybride.",
            yearMode: "TODO logique proxys, comparaisons et validation annuelle.",
            implementationNote: "Placeholder transport general volontaire.",
            sources: ["under dev mobility study", "under dev proxy file"],
            gaps: ["Template produit absent.", "Sous-modes et proxys encore ouverts."],
          },
          {
            key: "sanitation",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Sanitation",
            status: "Sous dev",
            description:
              "Le rapport cite sanitation, mais le fichier d'entree ne fixe pas encore les champs.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO volumes annuels et logique d'installation.",
            implementationNote: "Placeholder sanitation volontaire.",
            sources: ["under dev sanitation report", "draft station note"],
            gaps: ["Structure de champs absente.", "Niveau utilisateur vs app encore ouvert."],
          },
          {
            key: "sanitation-continuation",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Sanitation Continuation",
            status: "Sous dev",
            description: "Suite sanitation encore non definie en produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO continuation inter-annuelle.",
            implementationNote: "Placeholder sanitation continuation volontaire.",
            sources: ["under dev continuation source", "draft continuation note"],
            gaps: ["Structure absente.", "Perimetre exact non tranche."],
          },
          {
            key: "sanitation-ch4",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Sanitation CH4",
            status: "Sous dev",
            description: "Breakdown sanitation CH4 encore non expose dans le produit.",
            sourceMode: "TODO expose direct ou couche app.",
            yearMode: "TODO blocs annuels et niveau de detail.",
            implementationNote: "Placeholder CH4 volontaire.",
            sources: ["under dev CH4 source", "draft methane note"],
            gaps: ["Decision UI encore absente.", "Frontiere user/app encore ouverte."],
          },
          {
            key: "sanitation-n2o",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Sanitation N2O",
            status: "Sous dev",
            description: "Breakdown sanitation N2O encore non expose dans le produit.",
            sourceMode: "TODO expose direct ou couche app.",
            yearMode: "TODO blocs annuels et niveau de detail.",
            implementationNote: "Placeholder N2O volontaire.",
            sources: ["under dev N2O source", "draft nitrous note"],
            gaps: ["Decision UI encore absente.", "Frontiere user/app encore ouverte."],
          },
          {
            key: "olive-groves",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Olive Groves",
            status: "Sous dev",
            description: "Jeu AFAT cite, mais encore sans structure de saisie produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO temporalite et suivi des surfaces.",
            implementationNote: "Placeholder AFAT volontaire.",
            sources: ["under dev olive source", "draft grove note"],
            gaps: ["Structure absente.", "AFAT first scope encore a arbitrer."],
          },
          {
            key: "fruit-trees",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Fruit Trees",
            status: "Sous dev",
            description: "Jeu AFAT cite, encore en mode bloc provisoire.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO temporalite et maille produit.",
            implementationNote: "Placeholder AFAT volontaire.",
            sources: ["under dev fruit tree source", "draft orchard note"],
            gaps: ["Structure absente.", "AFAT first scope encore a arbitrer."],
          },
          {
            key: "livestock",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Livestock",
            status: "Sous dev",
            description: "Jeu AFAT cite, encore sans contrat de champs produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO temporalite et classifications.",
            implementationNote: "Placeholder AFAT volontaire.",
            sources: ["under dev livestock source", "draft herd note"],
            gaps: ["Structure absente.", "AFAT first scope encore a arbitrer."],
          },
          {
            key: "fertilizers",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Fertilizers",
            status: "Sous dev",
            description: "Jeu AFAT cite, encore en bloc provisoire produit.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO logique annuelle et perimetre.",
            implementationNote: "Placeholder AFAT volontaire.",
            sources: ["under dev fertilizer source", "draft fertilizer note"],
            gaps: ["Structure absente.", "AFAT first scope encore a arbitrer."],
          },
          {
            key: "agricultural-production",
            familyKey: "sanitation-afat",
            kind: "placeholder",
            title: "Agricultural Production",
            status: "Sous dev",
            description: "Jeu AFAT cite, encore sans structure definitive.",
            sourceMode: "TODO source-native vs year-native.",
            yearMode: "TODO logique annuelle et bloc de validation.",
            implementationNote: "Placeholder AFAT volontaire.",
            sources: ["under dev agricultural production source", "draft production note"],
            gaps: ["Structure absente.", "AFAT first scope encore a arbitrer."],
          },
        ],
        readouts: {
          territorial: {
            "2023": {
              summary:
                "Base territoriale lisible. L'energie tient deja la structure, tandis que transport et quelques jeux territoriaux restent encore fragiles.",
              cards: [
                {
                  label: "Total territorial",
                  value: "128 ktCO2e",
                  note: "Lecture agregee de l'IRE.",
                },
                {
                  label: "Donnees observees",
                  value: "74 %",
                  note: "Part issue de jeux documentes.",
                },
                {
                  label: "Premier poste",
                  value: "Energie",
                  note: "61 % du total territorial.",
                },
              ],
            },
            "2022": {
              summary:
                "Bonne base de comparaison, meme si les jeux transport restent moins robustes que les jeux energie.",
              cards: [
                {
                  label: "Total territorial",
                  value: "121 ktCO2e",
                  note: "Base de comparaison pre-IRE.",
                },
                {
                  label: "Donnees observees",
                  value: "70 %",
                  note: "Part couverte par des sources stables.",
                },
                {
                  label: "Premier poste",
                  value: "Energie",
                  note: "59 % du total territorial.",
                },
              ],
            },
            "2024": {
              summary:
                "Lecture encore partielle, utile pour le suivi interne mais pas encore pour figer la base finale.",
              cards: [
                {
                  label: "Total territorial",
                  value: "119 ktCO2e",
                  note: "Valeur provisoire.",
                },
                {
                  label: "Donnees observees",
                  value: "67 %",
                  note: "Encore plusieurs branches en attente.",
                },
                {
                  label: "Premier poste",
                  value: "Energie",
                  note: "58 % du total territorial.",
                },
              ],
            },
          },
          municipal: {
            "2023": {
              summary:
                "Lecture municipale deja utile. Batiments et eclairage sont bien lisibles; la flotte reste le poste le plus sensible.",
              cards: [
                {
                  label: "Total municipal",
                  value: "8.6 ktCO2e",
                  note: "Sous-ensemble patrimoine municipal.",
                },
                {
                  label: "Factures et releves",
                  value: "81 %",
                  note: "Part appuyee sur justificatifs directs.",
                },
                {
                  label: "Premier poste",
                  value: "Batiments",
                  note: "49 % du total municipal.",
                },
              ],
            },
            "2022": {
              summary:
                "Lecture municipale correcte pour la comparaison, avec une flotte encore plus incertaine que sur l'IRE.",
              cards: [
                {
                  label: "Total municipal",
                  value: "8.9 ktCO2e",
                  note: "Base de comparaison municipale.",
                },
                {
                  label: "Factures et releves",
                  value: "77 %",
                  note: "Base documentaire deja large.",
                },
                {
                  label: "Premier poste",
                  value: "Batiments",
                  note: "48 % du total municipal.",
                },
              ],
            },
            "2024": {
              summary:
                "Lecture municipale provisoire. Batiments presque consolides, flotte et preuves encore incompletes.",
              cards: [
                {
                  label: "Total municipal",
                  value: "7.8 ktCO2e",
                  note: "Valeur provisoire.",
                },
                {
                  label: "Factures et releves",
                  value: "75 %",
                  note: "Bonne couverture bati et eclairage.",
                },
                {
                  label: "Premier poste",
                  value: "Batiments",
                  note: "50 % du total municipal.",
                },
              ],
            },
          },
        },
        completeness: {
          checks: [
            {
              label: "Une IRE est identifiee et lisible dans la base.",
              done: true,
            },
            {
              label: "Au moins une autre annee de comparaison reste consultable.",
              done: true,
            },
            {
              label: "Toutes les familles source sont visibles dans la page.",
              done: true,
            },
            {
              label: "Fleet dispose d'une structure de saisie exploitable.",
              done: true,
            },
            {
              label: "Public Lighting dispose d'une structure de saisie exploitable.",
              done: true,
            },
            {
              label: "Les jeux encore non definis sont signales comme sous dev.",
              done: true,
            },
            {
              label: "Le transport dispose d'un modele de champs finalise.",
              done: false,
            },
            {
              label: "Les datasets energie territoriale disposent d'un modele de champs finalise.",
              done: false,
            },
          ],
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
        description: ({ count }: { count: string }) =>
          `${count} domaines doivent encore être revus avant de figer la base.`,
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
            description: "Informations de base pour cadrer l'inventaire.",
            count: "4 champs de cadrage confirmés",
            scope:
              "Utilisez ce domaine pour fixer l'identité de la collectivité, le contexte de périmètre et l'année de référence avant d'examiner les jeux de données patrimoniaux ou territoriaux.",
            readiness: "Le périmètre et l'année de référence sont déjà alignés.",
            summary:
              "L'inventaire est actuellement cadré autour de Sfax, en Tunisie, avec 2023 comme année de référence et une population de cadrage fixée.",
            checklist: [
              "Nom officiel de la collectivité et périmètre géographique.",
              "Année de référence utilisée dans tous les domaines de collecte.",
              "Valeur de population ou proxy démographique le plus récent.",
              "Courte note de gouvernance pour le porteur de l'inventaire.",
            ],
            evidence: [
              "Note d'identification de la collectivité et référence de périmètre administratif.",
              "Note de décision sur l'année de référence partagée pour l'ensemble de l'inventaire.",
              "Source de population ou document de planification utilisé pour le cadrage.",
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
              "Le cadrage énergie et déchets est en place ; les proxies transport demandent encore une passe.",
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
        email: ({ email }: { email: string }) =>
          `Nous avons envoyé un code de vérification à ${email}.`,
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
      stepIndicator: ({ current, total }: { current: number; total: number }) =>
        `Étape ${current} sur ${total}`,
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
          title: ({ index }: { index: number }) =>
            `Voiture ${index + 1} : Informations sur la voiture`,
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
          q: "Quel carburant utilise la partie thermique de votre hybride ?",
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
          l5: "Distance parcourue par semaine",
          u5: "km",
        },
        qCar3: {
          title: ({ index }: { index: number }) => `Voiture ${index + 1} : Consommation de voiture`,
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
            price: ({ unit }: { unit: string }) => `Prix de ${unit}`,
          },
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
            enteredLabel: ({ entered, total }: { entered: number; total: number }) =>
              `Saisi: ${entered} / ${total}`,
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
            enteredLabel: ({ entered, total }: { entered: number; total: number }) =>
              `Saisi: ${entered} / ${total}`,
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
