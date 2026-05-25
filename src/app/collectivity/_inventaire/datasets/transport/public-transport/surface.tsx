"use client";

import { useMemo, useState } from "react";
import { useFieldArray, useWatch } from "react-hook-form";

import GroupedYear from "@/components/table/grouped-year";
import MatrixTable from "@/components/table/matrix";
import TableGrid from "@/components/table/table-grid";
import { Separator } from "@/components/ui/separator";
import type { TName } from "@/components/ui/forms";
import Typography from "@/components/ui/typography";
import type { InventoryFormValues } from "../../../context/inventory-context";
import { useInventoryContext } from "../../../context/inventory-context";
import { useScopedI18n } from "@/locales/client";
import {
  buildPublicTransportEnergyByFuelSection,
  buildPublicTransportExploitationRowsWithoutFuel,
  buildPublicTransportFutureYears,
  buildPublicTransportOperatorsSection,
  buildPublicTransportRenewalFutureRows,
  buildPublicTransportRows,
} from "./config";

const inventoryName = (name: string) => name as TName<InventoryFormValues>;

export default function PublicTransportSurface() {
  const { mainForm, years } = useInventoryContext();
  const tPublicTransport = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.publicTransport"
  );

  const {
    futureYears,
    exploitationRows,
    energyByFuelSection,
    renewalRows,
    ageRows,
    renewalFutureRows,
  } = useState(() => ({
    futureYears: buildPublicTransportFutureYears(),
    exploitationRows: buildPublicTransportExploitationRowsWithoutFuel(tPublicTransport),
    energyByFuelSection: buildPublicTransportEnergyByFuelSection(tPublicTransport),
    renewalRows: buildPublicTransportRows("renewal", tPublicTransport),
    ageRows: buildPublicTransportRows("age", tPublicTransport),
    renewalFutureRows: buildPublicTransportRenewalFutureRows(tPublicTransport),
  }))[0];

  const operatorSection = useMemo(
    () => buildPublicTransportOperatorsSection(tPublicTransport),
    [tPublicTransport]
  );

  const { fields, append, remove } = useFieldArray({
    control: mainForm.control,
    name: "transport.publicTransport.dataSet",
  });

  const operatorRows = useMemo(
    () =>
      fields.map((field, index) => ({
        id: field.id,
        key: field.key,
        label: `${tPublicTransport("operators.rowPrefix")} ${index + 1}`,
        unit: "",
      })),
    [fields, tPublicTransport]
  );

  const fieldValues = useWatch({
    control: mainForm.control,
    name: "transport.publicTransport.dataSet",
  });

  return (
    <div className="space-y-8">
      <TableGrid
        title={operatorSection.title}
        description={operatorSection.description}
        rows={operatorRows}
        columns={operatorSection.columns}
        form={mainForm}
        baseName={operatorSection.fieldBaseName}
        yearSelector={
          operatorSection.yearSelector
            ? {
                years,
                initialYear: operatorSection.yearSelector.initialYear,
                ariaLabel: operatorSection.yearSelector.ariaLabel,
              }
            : undefined
        }
        addRow={{
          label: operatorSection.editableRows?.addLabel ?? "",
          onAdd: () =>
            append(
              // @ts-expect-error - initialize the operator before nested tables exist
              { key: "" },
              { shouldFocus: true }
            ),
        }}
        editableRows={{
          minRows: 0,
          onRemoveRow: remove,
        }}
      />

      {fields.map((field, index) => {
        const operatorBaseName = fieldValues?.[index]?.key || tPublicTransport("operators.default");
        const operatorBaseNamePath = `transport.publicTransport.dataSet.${index}`;

        return (
          <div key={field.id} className="space-y-4 group">
            <div className="rounded-2xl border border-border/10 bg-surface-warm/40 px-4 py-3">
              <Typography className="text-center" asChild variant="sectionTitle" size="xl">
                <h4>{operatorBaseName}</h4>
              </Typography>
            </div>

            <div className="border-t border-border/10 pt-8">
              <MatrixTable
                title={tPublicTransport("exploitation.title")}
                rows={exploitationRows}
                form={mainForm}
                baseName={inventoryName(`${operatorBaseNamePath}.exploitation`)}
              />
            </div>

            <div className="border-t border-border/10 pt-8">
              <GroupedYear
                title={energyByFuelSection.title}
                description={energyByFuelSection.description}
                rows={energyByFuelSection.rows}
                subcolumns={energyByFuelSection.subcolumns}
                form={mainForm}
                baseNameBySubcolumn={{
                  buses: inventoryName(`${operatorBaseNamePath}.buses`),
                  consumption: inventoryName(`${operatorBaseNamePath}.consumption`),
                  spend: inventoryName(`${operatorBaseNamePath}.spend`),
                }}
              />
            </div>

            <div className="border-t border-border/10 pt-8">
              <MatrixTable
                title={tPublicTransport("renewal.title")}
                rows={renewalRows}
                form={mainForm}
                baseName={inventoryName(`${operatorBaseNamePath}.renewal`)}
              />
            </div>

            <div className="border-t border-border/10 pt-8">
              <MatrixTable
                title={tPublicTransport("age.title")}
                rows={ageRows}
                form={mainForm}
                baseName={inventoryName(`${operatorBaseNamePath}.age`)}
              />
            </div>

            <div className="border-t border-border/10 pt-8">
              <MatrixTable
                title={tPublicTransport("future.title")}
                rows={renewalFutureRows}
                form={mainForm}
                baseName={inventoryName(operatorBaseNamePath)}
                years={futureYears}
              />
            </div>

            <Separator className="group-last:hidden" />
          </div>
        );
      })}
    </div>
  );
}
