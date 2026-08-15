export type CollectivityResultYearKey = `y-${number}`;

export type CollectivityResultRow = {
  key: string;
  value: number;
  unit: string;
  owner: string;
  family: "energy" | "afat" | "waste";
  sector?: "transport" | "industry" | "residential" | "tertiary" | "agriculture";
  scope?: "scope1" | "scope2" | "scope3";
  energy?: "electricity" | "naturalGas" | "gpl" | "diesel" | "gasoline" | "gnv";
  activity?: "landTransport" | "airport" | "navigation" | "municipalFleet";
  afatSource?: string;
  wasteSource?: "greenWaste";
  direction: "emission" | "absorption";
};

export type CollectivityResultsByYear = Partial<
  Record<CollectivityResultYearKey, CollectivityResultRow[]>
>;
