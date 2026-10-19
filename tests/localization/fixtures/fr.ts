const waste = {
  amount: "quantité",
  amountUnit: { placeholder: "unité", labels: { bag: "sac", kg: "kg" } },
  frequencyUnit: {
    placeholder: "fréquence",
    labels: { day: "jour", week: "semaine" },
  },
  bagVolume: { placeholder: "volume du sac" },
};

const cubiqueMeter = "m³" as const;

export default {
  toast: {
    success: "Succès",
    error: "Erreur",
  },
  components: {
    forms: {
      calendar: "Choisissez une date",
      combox: {
        placeholder: "Rechercher {label}...",
        notFound: "Aucune entrée {label} trouvée.",
        value: "Sélectionnez {label}",
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
        q1: {
          q: "Quelles sont les sources d'énergie consommées au sein de votre ménage?",
          options: {
            electricity: "Électricité",
            gasNetwork: "Gaz de réseau",
            heatNetwork: "Réseau de chaleur",
            GPL: "Gaz de pétrole liquéfié (GPL)",
            fioul: "Fioul domestique",
            charcoal: "Charbon de bois",
            wood: "Bois",
            disel: "Gazole",
            other: "Autre",
          },
          other: {
            q: "Précisez les autres sources d'énergies :",
          },
        },
        heating: {
          q: "Quel type de système de chauffage utilisez-vous pour chauffer votre maison ?",
          options: {
            heatPump: { label: "Pompe à chaleur", unit: "null" },
            gazNetwork: { label: "Gaz de réseau", unit: "null" },
            heatNetwork: { label: "Réseau de chaleur", unit: "null" },
            electricHeating: {
              label: "Chauffage électrique",
              fields: {
                energieLabel: "Etiquettes d'energie",
                dailyFrequency: {
                  label: "frequence quotidienne",
                  unit: "h/jour",
                },
                anualFrequency: {
                  label: "frequence annuelle",
                  unit: "semaine/an",
                },
              },
            },
            electricalCentralHeating: {
              label: "Chauffage central electrique",
              fields: {
                energieLabel: "Etiquettes d'energie",
                dailyFrequency: {
                  label: "frequence quotidienne",
                  unit: "h/jour",
                },
                anualFrequency: {
                  label: "frequence annuelle",
                  unit: "semaine/an",
                },
              },
            },
            GPL: {
              label: "Gaz de pétrole liquéfié (GPL)",
              unit: "bouteille",
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
              q: "Informations supplémentaires sur la citerne de gaz",
              l1: "fréquence",
              u1: "remplissages/an",
              l2: "volume",
              u2: "m³",
            },
            fioul: {
              label: "Fioul domestique",
              unit: "L",
              frequency: {
                placeholder: "sélectionnez fréquence",
                month: "chaque mois",
                year: "chaque annné",
              },
            },
            charcoal: {
              label: "charbon",
              funits: {
                frequency: "frequence",
                label: "unité",
                day: "jour",
                week: "semaine",
                month: "moins",
                year: "année",
              },
              qunits: { label: "unité", m3: "m³", kg: "kg" },
            },
            wood: {
              label: "bois",
              funits: {
                frequency: "frequence",
                label: "unité",
                day: "jour",
                week: "semaine",
                month: "moins",
                year: "année",
              },
              qunits: { label: "unité", m3: "m³", kg: "kg", stere: "stère" },
            },
          },
          q2: {
            q: "Quel type de chauffage au bois ou au charbon utilisez-vous ?",
            headers: ["type", "bois", "charbon"],
            rows: ["Cheminée munie d'un insert", "Pôele", "Cheminée a foyer ouvert", "Chaudière"],
          },
        },
        repartition: {
          q: "Souhaitez-vous avoir une répartition spécifique de votre consommation d'énergie ?",
          tables: {
            columns: {
              made: "marque",
              model: "modèle",
              power: "puissance",
              frequency: "fréquence",
              label: "étiquette énergétique",
              refrigeratorVolume: "volume de refrigerateur",
              freezerVolume: "volume de congélateur",
            },
          },
          frequencyUnits: {
            washingMachine: "usage/semaine",
            dishwasher: "usage/semaine",
            tv: "h/seamine",
            iron: "usage/semaine",
            electricOven: "usage/semaine",
            simpleRefrigerator: cubiqueMeter,
            combinedRefrigerator: cubiqueMeter,
            freezer: cubiqueMeter,
          },
          types: {
            washingMachine: "machine à laver",
            dishwasher: "lave-vaisselle",
            tv: "télévision",
            iron: "fer à repasser",
            electricOven: "four électrique",
            simpleRefrigerator: "réfrigérateur simple",
            combinedRefrigerator: "réfrigérateur combiné",
            freezer: "congélateur",
          },
          q1: {
            q: "Combien de ces appareils possède votre ménage?",
          },
          q2: {
            q: "Combien de ces appareils utilise votre ménage?",
          },
          q3: {
            q: "Combien de réfrigérateurs possède votre ménage?",
          },
          q4: {
            q1: "Combien d'ordinateurs possède votre ménage?",
            q2: "Combien de smartphone possède votre ménage?",
          },
        },
        electricityBill: {
          q1: "En utilisant votre facture d'électricité comme référence, quelle a été votre consommation d'électricité au cours des 12 derniers mois ?",
          q2: "Quel est l'index de votre compteur d'électricité ?",
          q3: "Si vous n'avez pas votre facture, quelle a été votre dépense mensuelle en électricité pendant cette année ?",
          Total: "Totale",
        },
        gasBill: {
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
          electricBike: "Vélos électrique en libre-service",
          electricScooter: "Trottinette électrique libre service",
          //car: "voiture libre service",
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
            Diesel: "Gazole",
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
          Diesel: "Gazole",
          "natural Gaz": "Bio-gaz",
          Electrique: "Électrique",
          "Plug-in Hybrid": "Hybride rechargeable",
          "mild Hybrid": "Hybride léger",
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
            q: "Quels sont les moyens de transport communs utilisés par tous les membres de votre ménage?",
          },
          longueDistances: {
            q: "Quels sont les moyens de transport longue distance utilisés par tous les membres de votre ménage?",
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
              frequency: "frequence",
              aircraftType: "Type Avion",
              class: "class de vol ",
              roundTrip: "Allez-retour",
              reason: "raison",
              reasons: {
                Professional: "Professionnel",
                family: "visite familiale/personnelle",
                tourism: "tourism",
              },
              carbonEmissions: "Emissions de Carbon",
              flightPurpose: "but du vol",
              flightPurposes: {
                business: "Business",
                tourism: "Tourism",
                personal: "Personnel",
              },
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
              frequency: "frequence",
              tripPurpose: "but du voyage",
              tripPurposes: {
                business: "Business",
                tourism: "Tourism",
                personal: "Personnel",
              },
            },
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
      food: {
        cols: {
          homemade: "Fait a la maison",
          quantine: "Cantine ou restaurant",
          delivered: "Livré",
        },
        basic: {
          q1: "En moyenne, quels repas décrivent le mieux la consommation de votre foyer au cours d'une semaine typique ?",
          nb: "Le nombre total de repas doit être approximativement 14 X le nombre de personnes dans votre famille.",
          q2: "Pour chaque repas sélectionné, indiquez où votre foyer le consomme approximativement en une semaine ?",
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
          q1: "En moyenne, combien de petits-déjeuners votre foyer consomme-t-il au cours d'une semaine typique ?",
          nb: "Le nombre total de repas doit être approximativement 7 X le nombre de personnes dans votre famille.",
          q2: "Pour chaque repas sélectionné, indiquez où votre foyer le consomme approximativement en une semaine ?",
          meals: {
            bread: "Pain",
            salty: "Salé",
            milk: "Lait & Céréales",
            fruits: "Fruits",
            no: "Pas de petit-déjeuner",
          },
        },
        restaurants: {
          q: "Au cours d'un mois typique, combien de fois votre foyer visite-t-il chaque type de restaurant ?",
          fastFood: "Fast-food",
          bistro: "Bistro",
          classic: "Restaurant classique",
          gastronomic: "Restaurant gastronomique",
          bio: "Restaurant bio",
        },
        drinks: {
          q1: {
            q: "Combien de tasses par jour chaque membre de votre famille boit-elle des boissons suivantes ?",
            tea: "Thé",
            coffee: "Café",
            hotChoklate: "Chocolat chaud",
            unit: "tasses/jour",
          },
          q2: {
            q: "Combien de litres par semaine chaque membre de votre famille boit-elle des boissons suivantes ?",
            soda: "Soda",
            jus: "Jus",
            beer: "Bière",
            alcohol: "Alcool",
            unit: "litres/semaine",
          },
        },
        water: {
          q: "Quel type d'eau buvez-vous ?",
          tapWater: "Eau du robinet",
          tapWaterFilter: "Eau du robinet filtrée",
          bottle: "Eau en bouteille",
          q2: "Combien de bouteilles d'eau votre foyer consomme-t-il ?",
          frequency: {
            label: "Fréquence",
            day: "jour",
            week: "semaine",
            month: "mois",
          },
        },
        auxilary: {
          q1: "Quel est le pourcentage de produits de saison dans votre foyer ?",
          q2: "Quel est le pourcentage de produits locaux dans votre foyer ?",
        },
        markets: {
          q: "À quelle fréquence votre foyer visite-t-il chacun des types de magasins suivants ?",
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
      holiday: {
        general: {
          q1: "Fréquence des vacances par an",
          q2: "Nombre de membres de votre famille voyageant",
        },
        transport: {
          q: "Transport utilisé jusqu'a la destination?",
          plane: "Avion",
          train: "Train",
          bus: "Bus",
          car: "Voiture",
          motorcycle: "Moto",
          ship: "Bateau/Croisière",
          other: "Autre",
        },
        housing: {
          q: "Quelle sont les types de logement?",
          hotel: "Hotel",
          rent: "Location Airbnb/Appartement",
          ecoHotel: "Éco-hôtel",
          camping: "Auberge/Camping",
          other: "Autre",
          specifics: {
            q: "?",
            type: "Type",
            nights: "Nuits",
            renewable: "Energie Renouvelable",
            equipments: "Equipements utilisés",
            airconditioner: "Air conditionné",
            heating: "Chuffage",
            heatedPool: "Piscine chauffée",
            spa: "spa",
          },
        },
        food: {
          q1: "Nombre moyen de repas par jour pris au restaurant",
          q2: {
            q: "Type de repas consommés:",
            veg: "Majorité de plats végétariens/végétaliens",
            mix: "Mixte (50% viande/50% végétariens)",
            carnivore: "Majorité de plats à base de viande/poisson",
          },
          q3: "Avez-vous privilégié des produits locaux ou importés ? ",
          radio: {
            yes: "Oui",
            no: "Non",
          },
          q4: {
            q: "Gaspillage alimentaire estimé",
            options: { weak: "faible", moderate: "modéré", high: "élevé" },
          },
        },
        activities: {
          q: "Activités touristiques",
          guidedTour: "Tours guidés (musées, monuments)",
          mecSport: "Sports motorisés (quad, jet-ski)",
          nature: "Randonnées/nature",
          vehicle: "Excursions en véhicule (bus, 4x4)",
          shoping: "Shopping (boutiques, centres commerciaux)",
          parc: "Parcs d'attractions",
          waterSport: "Croisière/activités nautiques",
          other: "Autre",
        },
        shopping: {
          q: "Avez-vous acheté des souvenirs ?",
          localartisanal: "Artisanat local",
          importedProducts: "Produits importés",
          Textiles: "Textiles",
          electronics: "Electronique",
        },
        waste: {
          q1: "Tri des déchets proposé sur place ?",
          q2: "Avez-vous utilisé des objets jetables (bouteilles en plastique, couverts) ?",
          yes: "oui",
          no: "non",
        },
        compensation: {
          q: "Avez-vous compensé les émissions de votre voyage?",
        },
      },
    },
    yes: "oui",
    no: "non",
    unit: "en {unit}",
    idk: "Je ne sais pas",
    next: "Suivant",
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
