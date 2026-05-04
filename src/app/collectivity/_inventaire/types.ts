export type InventoryYear = number;

export type InventoryFamily = {
  key: string;
  title: string;
};

export type InventoryDatasetStatus = string;

export const inventoryDatasetSurfaceKindValues = [
  "fleet",
  "publicLighting",
  "buildings",
  "treesParksWaste",
  "electricity",
  "photovoltaic",
  "naturalGas",
  "solarWaterHeating",
  "port",
  "publicTransport",
  "airTransport",
  "vehicleCounts",
  "perennialPlantationStock",
  "livestock",
  "fertilizers",
  "agriculturalProduction",
  "placeholder",
] as const;

export type InventoryDatasetSurfaceKind = (typeof inventoryDatasetSurfaceKindValues)[number];

export type InventoryDataset = {
  key: string;
  familyKey: string;
  surfaceKind: InventoryDatasetSurfaceKind;
  title: string;
  status: InventoryDatasetStatus;
  description: string;
  sourceMode: string;
  yearMode: string;
  implementationNote: string;
};

export type InventoryTableColumn = {
  key: string;
  label: string;
  calculated?: "sum";
  editable?: boolean;
  className?: string;
  unit?: string | null;
};

export type InventoryTableRow = {
  key: string;
  label: string;
  unit: string | null;
};

export type InventoryTableSectionData = {
  title: string;
  description?: string;
  fieldBaseName?: string;
  columns: InventoryTableColumn[];
  rows: InventoryTableRow[];
  yearSelector?: {
    initialYear?: number;
    ariaLabel?: string;
  };
  editableRows?: {
    addLabel: string;
    rowLabelPrefix: string;
    minRows?: number;
    newRowValues?: string[];
  };
};

export type InventoryYearBlockTableBlock = {
  key: string;
  title: string;
  columns: InventoryTableColumn[];
  rows: InventoryTableRow[];
  note?: string;
  editableColumns?: boolean;
};

export type InventoryGroupedYearTableData = {
  title: string;
  description?: string;
  subcolumns: InventoryTableColumn[];
  rows: InventoryTableRow[];
};

export type FleetSurfaceCopy = {
  compositionTitle: string;
  compositionDescription: string;
  yearlyVehiclesTitle: string;
  yearlyEnergyTitle: string;
  yearlySpendTitle: string;
};

export type PublicLightingSurfaceCopy = {
  infrastructureTitle: string;
  infrastructureDescription: string;
  infrastructure: Record<string, string>;
  lampsTitle: string;
  lampsDescription: string;
  lamps: Record<string, string>;
  lampsColumns: string[];
  yearlyTitle: string;
  yearly: Record<string, string>;
  valueColumn: string;
};

export type InventoryWorkspaceConfig = {
  controls: {
    sourceLabel: string;
    datasetLabel: string;
    submitLabel: string;
  };
  hints: {
    sourceFirst: string;
    multiYear: string;
    todoLabel: string;
    provenanceTodo: string;
    progressTodo: string;
    placeholderTitle: string;
  };
  families: InventoryFamily[];
  datasets: InventoryDataset[];
};
