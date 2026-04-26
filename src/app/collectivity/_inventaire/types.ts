export type InventoryYear = number;

export type InventoryFamily = {
  key: string;
  title: string;
};

export type InventoryDatasetStatus = string;

export type InventoryDatasetSurfaceKind =
  | "fleet"
  | "publicLighting"
  | "buildings"
  | "treesParksWaste"
  | "electricity"
  | "photovoltaic"
  | "naturalGas"
  | "solarWaterHeating"
  | "port"
  | "publicTransport"
  | "airTransport"
  | "vehicleCounts"
  | "perennialPlantationStock"
  | "livestock"
  | "fertilizers"
  | "agriculturalProduction"
  | "placeholder";

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

export type InventoryRowLabel = {
  key: string;
  label: string;
};

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
  values: string[];
};

export type InventoryTableSectionData = {
  title: string;
  description?: string;
  columns: string[];
  rows: InventoryTableRow[];
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
  rows: InventoryRowLabel[];
  note?: string;
  editableColumns?: boolean;
};

export type InventoryGroupedYearTableData = {
  title: string;
  description?: string;
  subcolumns: InventoryColumnLabel[];
  rows: InventoryRowLabel[];
};

export type FleetSurfaceCopy = {
  compositionTitle: string;
  compositionDescription: string;
  categories: InventoryRowLabel[];
  compositionColumns: string[];
  yearlyVehiclesTitle: string;
  yearlyVehiclesRows: InventoryRowLabel[];
  yearlyEnergyTitle: string;
  yearlyEnergyRows: InventoryRowLabel[];
  yearlySpendTitle: string;
  yearlySpendRows: InventoryRowLabel[];
};

export type PublicLightingSurfaceCopy = {
  infrastructureTitle: string;
  infrastructureDescription: string;
  infrastructureRows: InventoryRowLabel[];
  valueColumn: string;
  lampsTitle: string;
  lampsDescription: string;
  lampRows: InventoryRowLabel[];
  lampsColumns: string[];
  yearlyTitle: string;
  yearlyRows: InventoryRowLabel[];
};

export type InventoryWorkspaceConfig = {
  controls: {
    familyLabel: string;
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
