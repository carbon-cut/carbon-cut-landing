import { createGridDefaults } from "../_sharedDefaults";
import { wastewaterSanitation } from "./config";

export function wastewaterSanitationDefault(years: readonly number[]) {
  const populationFallbackDataSet = createGridDefaults(
    wastewaterSanitation.populationFallbackRowKeys,
    wastewaterSanitation.populationFallbackMetricKeys,
    { unitsByCols: wastewaterSanitation.units.populationFallback },
    years
  );

  return {
    treatmentDischarge: {
      dataSet: [],
    },
    sludgeDestination: {
      dataSet: [],
    },
    populationFallback: {
      dataSet: {
        ...populationFallbackDataSet,
        utility: {
          ...populationFallbackDataSet.utility,
          foodWasteToSewer: "no",
        },
      },
    },
  };
}
