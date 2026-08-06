import type { CollectivitySetupApplicability } from "@/app/collectivity/setup/_lib/types";
import type {
  FleetSurfaceCopy,
  InventoryDataset,
  InventoryFamily,
  InventoryNavIconKey,
  InventoryDatasetSurfaceKind,
  InventoryWorkspaceConfig,
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
      publicLighting: PublicLightingSurfaceCopy;
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
  port: {
    surfaceKind: "port",
    status: "Structure initiale",
    description:
      "Jeu portuaire avec ports concernes, consommation diesel et consommation electrique.",
    sourceMode: "Source-native: un tableau portuaire peut couvrir plusieurs annees.",
    yearMode: "Year-native: les consommations restent comparees par annee.",
    implementationNote:
      "Le panneau garde la liste des ports concernes et autorise le fallback facture/prix pour l'electricite.",
  },
  "public-transport": {
    surfaceKind: "publicTransport",
    status: "Structure initiale",
    description:
      "Jeu transport public par operateur avec exploitation, parc et energie par motorisation, renouvellement, age de flotte et plan futur.",
    sourceMode: "Source-native: un tableau operateur peut couvrir plusieurs annees.",
    yearMode: "Year-native: les indicateurs d'exploitation et de flotte restent annuels.",
    implementationNote:
      "Le panneau garde les operateurs repetables et regroupe nombre de bus, consommation et depense par motorisation.",
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
    surfaceKind: "territoryVehicles",
    status: "Structure initiale",
    description:
      "Jeu vehicules du territoire avec type, carburant, volumes, consommation moyenne et kilometrage.",
    sourceMode: "Source-native: un tableau vehicules peut couvrir plusieurs annees.",
    yearMode: "Year-native: les volumes et hypotheses d'activite restent annuels.",
    implementationNote:
      "Le panneau utilise des lignes repetables type vehicule / carburant avec mesures annuelles.",
  },
  trees: {
    surfaceKind: "trees",
    status: "Structure initiale",
    description:
      "Jeu AFAT arbres avec cultures suivies en detail et ligne agregée arbres fruitiers.",
    sourceMode: "Source-native: les sources arbres peuvent couvrir plusieurs annees.",
    yearMode: "Year-native: les surfaces et nombres d'arbres restent annuels.",
    implementationNote:
      "Le panneau combine des lignes repetables pour les cultures suivies et un bloc annuel pour les arbres fruitiers.",
  },
  livestock: {
    surfaceKind: "livestock",
    status: "Structure initiale",
    description: "Jeu AFAT cheptel avec effectifs annuels et part de temps en espace confine.",
    sourceMode: "Source-native: un tableau cheptel peut couvrir plusieurs annees.",
    yearMode: "Year-native: les effectifs restent annuels et la part confinee reste scalaire.",
    implementationNote:
      "Le panneau garde les effectifs par annee et la part confinee par type d'animal.",
  },
  fertilizers: {
    surfaceKind: "fertilizers",
    status: "Structure initiale",
    description: "Jeu AFAT engrais avec trois intrants fixes, tonnage annuel et tenure.",
    sourceMode: "Source-native: un tableau engrais peut couvrir plusieurs annees.",
    yearMode: "Year-native: les tonnages restent annuels et la tenure reste scalaire.",
    implementationNote:
      "Le panneau garde les trois intrants fixes et couple tonnage annuel avec tenure.",
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

const familyNavOverrides: Record<string, { navIcon: InventoryNavIconKey }> = {
  "municipal-patrimoine": { navIcon: "municipal" },
  "territorial-energy": { navIcon: "energy" },
  "transport-mobility": { navIcon: "transport" },
  afat: { navIcon: "afat" },
  waste: { navIcon: "waste" },
  wastewater: { navIcon: "water" },
};

const datasetNavOverrides: Record<
  string,
  { navIcon: InventoryNavIconKey; navStatusLabel?: string; progressLabel?: string }
> = {
  fleet: { navIcon: "fleet", navStatusLabel: "En cours", progressLabel: "40%" },
  "public-lighting": { navIcon: "lighting", navStatusLabel: "À faire", progressLabel: "0%" },
  buildings: { navIcon: "buildings", navStatusLabel: "À faire", progressLabel: "0%" },
  "trees-parks-waste": { navIcon: "trees", navStatusLabel: "À faire", progressLabel: "0%" },
  electricity: { navIcon: "electricity", navStatusLabel: "À faire", progressLabel: "0%" },
  "natural-gas": { navIcon: "naturalGas", navStatusLabel: "À faire", progressLabel: "0%" },
  port: { navIcon: "port", navStatusLabel: "À faire", progressLabel: "0%" },
  "public-transport": {
    navIcon: "publicTransport",
    navStatusLabel: "À faire",
    progressLabel: "0%",
  },
  "air-transport": { navIcon: "airTransport", navStatusLabel: "À faire", progressLabel: "0%" },
  transport: { navIcon: "territoryVehicles", navStatusLabel: "À faire", progressLabel: "0%" },
  trees: {
    navIcon: "trees",
    navStatusLabel: "À faire",
    progressLabel: "0%",
  },
  livestock: { navIcon: "livestock", navStatusLabel: "À faire", progressLabel: "0%" },
  fertilizers: { navIcon: "fertilizers", navStatusLabel: "À faire", progressLabel: "0%" },
  sanitation: { navIcon: "water", navStatusLabel: "À faire", progressLabel: "0%" },
  "sanitation-continuation": { navIcon: "water", navStatusLabel: "À faire", progressLabel: "0%" },
  "sanitation-ch4": { navIcon: "water", navStatusLabel: "À faire", progressLabel: "0%" },
  "sanitation-n2o": { navIcon: "water", navStatusLabel: "À faire", progressLabel: "0%" },
};

const retiredDatasetKeys = new Set([
  "photovoltaic",
  "solar-water-heating",
  "sanitation",
  "sanitation-continuation",
  "sanitation-ch4",
  "sanitation-n2o",
]);

const applicabilityDatasetKeys: Record<keyof CollectivitySetupApplicability, readonly string[]> = {
  airport: ["air-transport"],
  port: ["port"],
  agriculture: ["trees", "livestock", "fertilizers"],
};

function buildInventoryRegistryWithApplicability(
  locale: InventoryWorkspaceLocale,
  applicability: CollectivitySetupApplicability | null
): {
  workspace: InventoryWorkspaceConfig;
  surfaces: InventorySurfaceCopy;
} {
  const disabledDatasetKeys = new Set<string>(retiredDatasetKeys);

  if (applicability) {
    (
      Object.entries(applicability) as Array<[keyof CollectivitySetupApplicability, boolean]>
    ).forEach(([key, enabled]) => {
      if (!enabled) {
        applicabilityDatasetKeys[key].forEach((datasetKey) => {
          disabledDatasetKeys.add(datasetKey);
        });
      }
    });
  }

  const datasets = locale.datasets
    .map((dataset) => {
      const override = datasetOverrides[dataset.key];
      const nav = datasetNavOverrides[dataset.key];

      return {
        key: dataset.key,
        familyKey: dataset.familyKey,
        surfaceKind: override?.surfaceKind ?? dataset.kind,
        title: dataset.title,
        navIcon: nav?.navIcon ?? "municipal",
        navStatusLabel: nav?.navStatusLabel,
        progressLabel: nav?.progressLabel,
        status: override?.status ?? dataset.status,
        description: override?.description ?? dataset.description,
        sourceMode: override?.sourceMode ?? dataset.sourceMode,
        yearMode: override?.yearMode ?? dataset.yearMode,
        implementationNote: override?.implementationNote ?? dataset.implementationNote,
      };
    })
    .filter((dataset) => !disabledDatasetKeys.has(dataset.key));

  const familyKeys = new Set(datasets.map((dataset) => dataset.familyKey));

  return {
    workspace: {
      controls: locale.controls,
      hints: locale.hints,
      families: locale.families
        .map((family) => ({
          ...family,
          navIcon: familyNavOverrides[family.key]?.navIcon ?? "municipal",
        }))
        .filter((family) => familyKeys.has(family.key)),
      datasets,
    },
    surfaces: {
      fleet: locale.sections.entry.fleet,
      publicLighting: locale.sections.entry.publicLighting,
    },
  };
}

export function buildInventoryRegistry(
  locale: InventoryWorkspaceLocale,
  applicability: CollectivitySetupApplicability | null = null
): {
  workspace: InventoryWorkspaceConfig;
  surfaces: InventorySurfaceCopy;
} {
  return buildInventoryRegistryWithApplicability(locale, applicability);
}
