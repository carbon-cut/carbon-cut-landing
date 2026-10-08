import Typography from "@/components/ui/typography";
import { DebugCalculationPanelState, DebugResultRow } from "./types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

export function DebugCalculationResult({
  result,
  label,
  formulaVersionLabel,
  parametersLabel,
  warningsLabel,
}: {
  result: DebugCalculationPanelState;
  label: string;
  formulaVersionLabel: string;
  parametersLabel: string;
  warningsLabel: string;
}) {
  return (
    <aside className="space-y-1.5">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Typography asChild variant="eyebrow" size="xxs" className="text-secondary">
          <p>{label}</p>
        </Typography>
        <Typography asChild variant="caption" size="sm">
          <p>{result.datasetKey}</p>
        </Typography>
      </div>

      {result.status === "success" ? (
        <div className="space-y-1.5">
          {result.resultRows.map((row) => (
            <div
              key={`${row.year}-${row.key}-${row.owner}-${row.family}-${row.scope ?? ""}-${row.energy ?? ""}-${row.activity ?? ""}-${row.afatSource ?? ""}-${row.direction}`}
              className="flex flex-wrap gap-x-3 gap-y-1"
            >
              <Typography asChild variant="caption" size="sm" className="text-secondary">
                <span>{getResultRowLabel(row)}</span>
              </Typography>
              <Typography asChild variant="label" size="sm">
                <span>
                  {row.value} {row.unit}
                </span>
              </Typography>
            </div>
          ))}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Typography asChild variant="caption" size="sm">
              <span>
                {formulaVersionLabel}: {result.formulaVersion}
              </span>
            </Typography>
            <Typography asChild variant="caption" size="sm">
              <span>
                {parametersLabel}: {result.parameterCount}
              </span>
            </Typography>
          </div>
          {result.warnings.length > 0 ? (
            <div className="space-y-1 pt-1">
              <Typography asChild variant="caption" size="sm" className="text-amber-700">
                <p>{warningsLabel}</p>
              </Typography>
              {result.warnings.map((warning, index) => (
                <Typography
                  key={`${warning.code ?? "warning"}-${warning.itemId ?? index}`}
                  asChild
                  variant="caption"
                  size="sm"
                  className="text-amber-700"
                >
                  <p>{warning.message ?? warning.code ?? "Warning"}</p>
                </Typography>
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="space-y-1">
          <Typography asChild variant="caption" size="sm" className="text-destructive">
            <p>{result.message}</p>
          </Typography>
          {result.reasons.length > 0 ? (
            <Typography asChild variant="caption" size="sm" className="text-destructive">
              <p>{result.reasons.join(", ")}</p>
            </Typography>
          ) : null}
        </div>
      )}
    </aside>
  );
}

function getResultRowLabel(row: DebugResultRow) {
  return [
    row.year,
    row.key,
    row.owner,
    row.family,
    row.sector,
    row.scope,
    row.energy,
    row.activity,
    row.afatSource,
    row.direction,
  ]
    .filter(Boolean)
    .join(" · ");
}

type DebugCalculationPanelProps = {
  disabled: boolean;
  result: DebugCalculationPanelState | null;
  t: (key: string, ...args: any[]) => string;
  handleDebugCalculate: () => Promise<void>;
  tDataSet: (key: string, ...args: any[]) => string;
  activeDataset: { key: string };
};

export function DebugCalculationPanel({
  disabled,
  result,
  t,
  handleDebugCalculate,
  tDataSet,
  activeDataset,
}: DebugCalculationPanelProps) {
  return (
    <div className="flex flex-col gap-3 border-t border-border/10 pt-3 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0 flex-1">
        {result ? (
          <DebugCalculationResult
            result={result}
            label={t("inventoryWorkspace.debugCalculation.label") as string}
            formulaVersionLabel={t("inventoryWorkspace.debugCalculation.formulaVersion") as string}
            parametersLabel={t("inventoryWorkspace.debugCalculation.parameters") as string}
            warningsLabel={t("inventoryWorkspace.debugCalculation.warnings") as string}
          />
        ) : (
          <Typography asChild variant="body" size="sm" className="text-muted-foreground">
            <p>{tDataSet(`${activeDataset.key}.title`)}</p>
          </Typography>
        )}
      </div>
      <Button
        type="button"
        variant="brand-secondary"
        size="medium"
        disabled={disabled}
        onClick={handleDebugCalculate}
        icon={<Calculator aria-hidden="true" className="size-4 shrink-0" />}
      >
        {t("inventoryWorkspace.debugCalculation.action") as string}
      </Button>
    </div>
  );
}
