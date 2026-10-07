/**
 * Reusable unit options for collectivity inventory schemas.
 * Keep arrays as non-empty tuples because schema builders use the first value
 * as the default when a submitted unit is missing.
 */
type UnitOptions = [string, ...string[]];

export const electricityConsumptionUnits: UnitOptions = ["kWh", "MWh", "GWh"];
export const liquidFuelVolumeUnits: UnitOptions = ["L"];
export const kilogramUnits: UnitOptions = ["kg"];
export const naturalGasVolumeUnits: UnitOptions = ["Nm3"];
export const currencyUnits: UnitOptions = ["currency"];
export const percentageUnits: UnitOptions = ["%"];
export const hectareUnits: UnitOptions = ["ha"];
export const squareMetreUnits: UnitOptions = ["m²"];
export const tonneUnits: UnitOptions = ["t"];
