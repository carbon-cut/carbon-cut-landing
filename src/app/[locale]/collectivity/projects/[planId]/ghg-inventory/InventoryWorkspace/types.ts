import { CollectivityResultRow, CollectivityResultYearKey } from "@/lib/collectivity/result-types";
import type { CollectivityCalculationWarning } from "@/app/[locale]/collectivity/_lib/queries";

type DebugCalculationPanelState =
  | {
      status: "success";
      datasetKey: string;
      resultRows: DebugResultRow[];
      warnings: CollectivityCalculationWarning[];
      calculationCodeDigest: string;
      parameterCount: number | null;
    }
  | {
      status: "error";
      datasetKey: string;
      message: string;
      reasons: string[];
    };

type DebugResultRow = CollectivityResultRow & { year: CollectivityResultYearKey };

type DebugCalculationWarning = CollectivityCalculationWarning;

export type { DebugCalculationPanelState, DebugResultRow, DebugCalculationWarning };
