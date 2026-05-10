"use client";

import { useMemo, useState } from "react";

import MatrixTable from "@/components/table/matrix";
import InventoryTableSection from "../../../components/InventoryTableSection";
import { useInventoryContext } from "../../../context/inventory-context";
import { useScopedI18n } from "@/locales/client";
import Typography from "@/components/ui/typography";
import {
  buildPublicTransportFutureYears,
  buildPublicTransportOperatorsSection,
  buildPublicTransportRenewalFutureRows,
  buildPublicTransportRows,
} from "./config";
import { useFieldArray, useWatch } from "react-hook-form";
import TableGrid from "@/components/table/table-grid";
import { Separator } from "@/components/ui/separator";

export default function PublicTransportSurface() {
  const { mainForm, years } = useInventoryContext();
  const tPublicTransport = useScopedI18n(
    "(pages).collectivityDashboard.inventoryWorkspace.sections.entry.publicTransport"
  );

  const { futureYears, exploitationRows, renewalRows, ageRows, renewalFutureRows } = useState(
    () => ({
      operatorSection: buildPublicTransportOperatorsSection(tPublicTransport),
      futureYears: buildPublicTransportFutureYears(),
      exploitationRows: buildPublicTransportRows("exploitation", tPublicTransport),
      renewalRows: buildPublicTransportRows("renewal", tPublicTransport),
      ageRows: buildPublicTransportRows("age", tPublicTransport),
      renewalFutureRows: buildPublicTransportRenewalFutureRows(tPublicTransport),
    })
  )[0];

  const { fields, append, remove } = useFieldArray({
    control: mainForm.control,
    name: "transport.publicTransport.dataSet",
  });

  const operatorRows = useMemo(() => {
    return fields.map((field, index) => ({
      id: field.id,
      key: field.key,
      label: `${tPublicTransport("operators.rowPrefix")} ${index + 1}`,
      unit: "",
    }));
  }, [fields]);

  const fieldValues = useWatch({
    control: mainForm.control,
    name: "transport.publicTransport.dataSet",
  });

  const operatorSection = useMemo(
    () => ({
      ...buildPublicTransportOperatorsSection(tPublicTransport),
    }),
    [tPublicTransport, fields]
  );

  const editableRows = useMemo(
    () => ({
      minRows: 0,
      onRemoveRow: remove,
    }),
    [remove]
  );
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
            requestAnimationFrame(() =>
              append(
                //@ts-expect-error - initialization of unit field value
                { key: "" },
                {
                  shouldFocus: true,
                  //focusName: `${operatorSection.fieldBaseName}.${fields.length}.dk`,
                }
              )
            ),
        }}
        editableRows={editableRows}
      />
      {fields.map((field, index) => {
        const operatorBaseName = fieldValues?.[index]?.key || tPublicTransport("operators.default");
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
                baseName={`transport.publicTransport.dataSet.${index}.exploitation`}
              />
            </div>
            <div className="border-t border-border/10 pt-8">
              <MatrixTable
                title={tPublicTransport("renewal.title")}
                rows={renewalRows}
                form={mainForm}
                baseName={`transport.publicTransport.dataSet.${index}.renewal`}
              />
            </div>
            <div className="border-t border-border/10 pt-8">
              <MatrixTable
                title={tPublicTransport("age.title")}
                rows={ageRows}
                form={mainForm}
                baseName={`transport.publicTransport.dataSet.${index}.age`}
              />
            </div>
            <div className="border-t border-border/10 pt-8">
              <MatrixTable
                title={tPublicTransport("future.title")}
                rows={renewalFutureRows}
                form={mainForm}
                baseName={`transport.publicTransport.dataSet.${index}`}
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
