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

export type InventoryTableGridColumn = string | { key: string; label: string; className?: string };

export type InventoryColumnLabel = {
  key: string;
  label: string;
  calculated?: "sum";
  editable?: boolean;
  className?: string;
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
  columns: InventoryTableGridColumn[];
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
  columns: InventoryColumnLabel[];
  rows: InventoryTableRow[];
  note?: string;
  editableColumns?: boolean;
};

export type InventoryGroupedYearTableData = {
  title: string;
  description?: string;
  subcolumns: InventoryColumnLabel[];
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
  infrastructureRows: InventoryTableRow[];
  valueColumn: string;
  lampsTitle: string;
  lampsDescription: string;
  lampRows: InventoryTableRow[];
  lampsColumns: string[];
  yearlyTitle: string;
  yearlyRows: InventoryTableRow[];
};

export type InventoryWorkspaceConfig = {
  controls: {
    sourceLabel: string;
    datasetLabel: string;
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
