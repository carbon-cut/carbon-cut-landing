import { CollectivityResultRow, CollectivityResultYearKey } from "@/lib/collectivity/result-types";

type DebugCalculationPanelState =
  | {
      status: "success";
      datasetKey: string;
      resultRows: DebugResultRow[];
      warnings: DebugCalculationWarning[];
      formulaVersion: string;
      parameterCount: number;
    }
  | {
      status: "error";
      datasetKey: string;
      message: string;
      reasons: string[];
    };

type DebugResultRow = CollectivityResultRow & { year: CollectivityResultYearKey };

type DebugCalculationWarning = {
  code?: string;
  itemId?: string;
  path?: string;
  message?: string;
  details?: Record<string, unknown>;
};

export type { DebugCalculationPanelState, DebugResultRow, DebugCalculationWarning };
