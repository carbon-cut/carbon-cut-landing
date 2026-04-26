import type {
  FleetSurfaceCopy,
  InventoryDataset,
  InventoryFamily,
  InventoryDatasetSurfaceKind,
  InventoryWorkspaceConfig,
  InventoryYear,
  PublicLightingSurfaceCopy,
} from "./types";

type InventoryLocaleYear = {
  value: string;
  title: string;
  badge: string;
};

export type InventoryWorkspaceLocale = {
  controls: InventoryWorkspaceConfig["controls"];
  hints: InventoryWorkspaceConfig["hints"];
  years: InventoryLocaleYear[];
  families: InventoryFamily[];
  datasets: Array<
    Omit<InventoryDataset, "surfaceKind"> & {
      kind: "fleet" | "publicLighting" | "placeholder";
    }
  >;
  sections: {
    entry: {
      fleet: FleetSurfaceCopy;
      lighting: PublicLightingSurfaceCopy;
    };
  };
};

export type InventorySurfaceCopy = {
  fleet: FleetSurfaceCopy;
  publicLighting: PublicLightingSurfaceCopy;
};

const datasetOverrides: Record<
  string,
  Partial<Omit<InventoryDataset, "key" | "familyKey">> & {
    surfaceKind: InventoryDatasetSurfaceKind;
  }
> = {
  fleet: {
    surfaceKind: "fleet",
  },
  "public-lighting": {
    surfaceKind: "publicLighting",
  },
  buildings: {
    surfaceKind: "buildings",
    status: "Structure initiale",
    description:
      "Jeu municipal avec portee patrimoine puis bloc pluriannuel par source energetique.",
    sourceMode:
      "Source-native: un jeu batiments peut couvrir plusieurs annees en une seule structure.",
    yearMode: "Year-native: consommations et factures restent visibles par annee.",
    implementationNote:
      "Le premier panneau reprend la structure du rapport et garde la maille annuelle dans un bloc unique.",
  },
  "trees-parks-waste": {
    surfaceKind: "treesParksWaste",
    status: "Structure initiale",
    description:
      "Jeu municipal avec arbres urbains, dechets verts et destinations de traitement par annee.",
    sourceMode: "Source-native: le jeu peut venir d'un tableau municipal unique.",
    yearMode: "Year-native: les volumes et destinations restent annuels.",
    implementationNote:
      "Le panneau garde la structure annuelle simple du rapport, avec destinations visibles par annee.",
  },
  electricity: {
    surfaceKind: "electricity",
    status: "Structure initiale",
    description:
      "Demande d'electricite territoriale par annee, niveau de tension et categorie d'usage.",
    sourceMode:
      "Source-native: une source energie peut couvrir plusieurs annees dans la meme logique de blocs.",
    yearMode: "Year-native: chaque annee garde son propre tableau par niveau de tension.",
    implementationNote:
      "La structure preserve les blocs BT / MT / HT et rend les colonnes haute tension editables.",
  },
  photovoltaic: {
    surfaceKind: "photovoltaic",
    status: "Structure initiale",
    description:
      "Jeu photovoltaque territorial avec blocs BT et MT visibles sur les annees d'inventaire.",
    sourceMode: "Source-native: une source photovoltaique peut couvrir plusieurs annees.",
    yearMode: "Year-native: production et capacite restent comparees par annee.",
    implementationNote:
      "Le premier panneau garde les blocs BT / MT du rapport et rend le solde BT visible.",
  },
  "natural-gas": {
    surfaceKind: "naturalGas",
    status: "Structure initiale",
    description:
      "Jeu gaz naturel territorial par annee, niveau de pression et postes de consommation.",
    sourceMode:
      "Source-native: un export gaz peut couvrir plusieurs annees avec la meme structure.",
    yearMode: "Year-native: chaque annee conserve son bloc BP / MP / HP.",
    implementationNote:
      "La structure preserve les niveaux de pression et rend les colonnes haute pression editables.",
  },
  "solar-water-heating": {
    surfaceKind: "solarWaterHeating",
    status: "Structure initiale",
    description:
      "Jeu chauffe-eau solaire par annee avec blocs residentiel, tertiaire et industriel.",
    sourceMode: "Source-native: une source CES peut couvrir plusieurs annees dans un meme format.",
    yearMode: "Year-native: le suivi se fait par annee sur les trois blocs.",
    implementationNote:
      "Le premier panneau rend la structure secteur x annee directement editable.",
  },
  port: {
    surfaceKind: "port",
    status: "Structure initiale",
    description:
      "Jeu portuaire avec comptes de navires, consommations de carburant et ports concernes.",
    sourceMode: "Source-native: un tableau portuaire peut couvrir plusieurs annees.",
    yearMode: "Year-native: les comptes et consommations restent compares par annee.",
    implementationNote:
      "La structure initiale garde aussi la liste des ports concernes comme contexte d'entree.",
  },
  "public-transport": {
    surfaceKind: "publicTransport",
    status: "Structure initiale",
    description:
      "Jeu transport public par operateur avec exploitation, renouvellement, age de flotte et plan futur.",
    sourceMode: "Source-native: un tableau operateur peut couvrir plusieurs annees.",
    yearMode: "Year-native: les indicateurs d'exploitation et de flotte restent annuels.",
    implementationNote:
      "Le premier panneau garde un operateur par defaut, sans encore implementer la repetition multi-operateurs.",
  },
  "air-transport": {
    surfaceKind: "airTransport",
    status: "Structure initiale",
    description:
      "Jeu transport aerien avec mouvements d'aeronefs et consommations energie/carburant aeroport.",
    sourceMode: "Source-native: un set de sources aeroport peut couvrir plusieurs annees.",
    yearMode: "Year-native: les mouvements et consommations restent annuels.",
    implementationNote: "Le premier panneau rend visibles les deux sous-tableaux du rapport.",
  },
  transport: {
    surfaceKind: "vehicleCounts",
    status: "Structure initiale",
    description: "Jeu transport vehicules avec comptage par categorie et comparaison annuelle.",
    sourceMode: "Source-native: un tableau vehicules peut couvrir plusieurs annees.",
    yearMode: "Year-native: les volumes de parc restent annuels.",
    implementationNote:
      "La structure initiale fusionne les categories du rapport dans un seul tableau de comptage.",
  },
  "perennial-plantation-stock": {
    surfaceKind: "perennialPlantationStock",
    status: "Structure initiale",
    description:
      "Jeu AFAT de stock de plantations perennes avec lignes annuelles et double lecture hectares / arbres.",
    sourceMode: "Source-native: un tableau de stock plantation peut couvrir plusieurs annees.",
    yearMode: "Year-native: chaque groupe de plantation garde ses valeurs annuelles.",
    implementationNote:
      "Le panneau propose des types de plantation selectionnables avec saisie libre et lignes ajoutables.",
  },
  livestock: {
    surfaceKind: "livestock",
    status: "Structure initiale",
    description: "Jeu AFAT cheptel avec volumes par annee et parametre de temps en etable.",
    sourceMode: "Source-native: un tableau cheptel peut couvrir plusieurs annees.",
    yearMode: "Year-native: les effectifs restent annuels.",
    implementationNote:
      "Le premier panneau garde la colonne additionnelle de temps annuel en espace confine.",
  },
  fertilizers: {
    surfaceKind: "fertilizers",
    status: "Structure initiale",
    description:
      "Jeu AFAT engrais et amendements avec lignes fixes et intrants locaux additionnels.",
    sourceMode: "Source-native: un tableau engrais peut couvrir plusieurs annees.",
    yearMode: "Year-native: les tonnages restent annuels.",
    implementationNote:
      "Le premier panneau garde les lignes fixes du rapport avec un exemple d'intrant local supplementaire.",
  },
  "agricultural-production": {
    surfaceKind: "agriculturalProduction",
    status: "Structure initiale",
    description:
      "Jeu AFAT production agricole avec doubles tableaux surface recoltee / production.",
    sourceMode: "Source-native: un tableau production peut couvrir plusieurs annees.",
    yearMode: "Year-native: surfaces et volumes restent annuels.",
    implementationNote:
      "Le premier panneau garde les cultures exemples du rapport et les deux sous-tableaux.",
  },
  sanitation: {
    surfaceKind: "placeholder",
  },
  "sanitation-continuation": {
    surfaceKind: "placeholder",
  },
  "sanitation-ch4": {
    surfaceKind: "placeholder",
  },
  "sanitation-n2o": {
    surfaceKind: "placeholder",
  },
};

export function buildInventoryRegistry(locale: InventoryWorkspaceLocale): {
  workspace: InventoryWorkspaceConfig;
  surfaces: InventorySurfaceCopy;
  years: InventoryYear[];
} {
  return {
    workspace: {
      controls: locale.controls,
      hints: locale.hints,
      families: locale.families,
      datasets: locale.datasets.map((dataset) => {
        const override = datasetOverrides[dataset.key];

        return {
          key: dataset.key,
          familyKey: dataset.familyKey,
          surfaceKind: override?.surfaceKind ?? dataset.kind,
          title: dataset.title,
          status: override?.status ?? dataset.status,
          description: override?.description ?? dataset.description,
          sourceMode: override?.sourceMode ?? dataset.sourceMode,
          yearMode: override?.yearMode ?? dataset.yearMode,
          implementationNote: override?.implementationNote ?? dataset.implementationNote,
        };
      }),
    },
    surfaces: {
      fleet: locale.sections.entry.fleet,
      publicLighting: locale.sections.entry.lighting,
    },
    years: locale.years.map((year) => Number(year.value)),
  };
}
