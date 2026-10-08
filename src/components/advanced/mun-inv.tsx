"use client";

import { Building2, Droplets, LampCeiling, MoveRight, Truck, Wheat, Zap } from "lucide-react";
import { useScopedI18n } from "@/locales/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const inputKeys = [
  { key: "energy", icon: Zap },
  { key: "buildings", icon: Building2 },
  { key: "lighting", icon: LampCeiling },
  { key: "fleet", icon: Truck },
  { key: "agriculture", icon: Wheat },
  { key: "wastewater", icon: Droplets },
] as const;

const sectors = [
  { key: "stationaryEnergy", kind: "sector" },
  { key: "residentialBuildings", kind: "detail" },
  { key: "municipalBuildings", kind: "detail" },
  { key: "transport", kind: "sector" },
  { key: "municipalFleet", kind: "detail" },
  { key: "afolu", kind: "sector" },
  { key: "wastewater", kind: "sector" },
  { key: "industry", kind: "sector" },
] as const;

const inputRoutes = [
  { row: 32, lane: 12, target: 172 },
  { row: 106, lane: 24, target: 190 },
  { row: 180, lane: 36, target: 208 },
  { row: 254, lane: 48, target: 226 },
  { row: 328, lane: 60, target: 244 },
  { row: 402, lane: 72, target: 262 },
];

export function MunicipalInventoryFlow() {
  const t = useScopedI18n("collectivityLanding.inventoryFlow");

  return (
    <section aria-label={t("connectionsLabel")} className="w-full px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-y-6 xl:grid-cols-[minmax(270px,360px)_minmax(72px,1fr)_6rem_minmax(72px,0.65fr)_minmax(360px,480px)] xl:gap-x-0">
        <div className="grid gap-2.5">
          {inputKeys.map(({ key, icon: Icon }) => (
            <Card
              key={key}
              className="min-h-16 flex-row items-center gap-3 rounded-md border-border bg-card px-4 py-3 shadow-none"
            >
              <Icon aria-hidden="true" className="size-4 shrink-0 text-subtext-color" />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-5 text-default-font">
                  {t(`sources.${key}.title`)}
                </p>
                <p className="text-xs leading-4 text-subtext-color">{t(`sources.${key}.detail`)}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center py-2 xl:hidden" aria-hidden="true">
          <div className="h-8 w-px bg-border" />
          <div className="size-24 rounded-full border border-border bg-background" />
          <div className="flex h-12 flex-col items-center">
            <div className="w-px flex-1 bg-border" />
            <MoveRight className="size-5 rotate-90 text-subtext-color" />
          </div>
        </div>

        <div className="hidden h-[434px] w-full xl:block" aria-hidden="true">
          <svg
            className="h-full w-full overflow-visible"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 100 434"
          >
            {inputRoutes.map(({ row, lane, target }) => {
              const direction = target > row ? 1 : -1;
              const radius = 4;

              return (
                <path
                  key={row}
                  d={`M0 ${row}H${lane - radius}Q${lane} ${row} ${lane} ${row + direction * radius}V${target - direction * radius}Q${lane} ${target} ${lane + radius} ${target}H100`}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity=".22"
                  strokeWidth="1.25"
                />
              );
            })}
          </svg>
        </div>

        <div
          className="hidden size-24 rounded-full border border-border bg-background xl:block"
          aria-hidden="true"
        />

        <div className="hidden items-center justify-center xl:flex" aria-hidden="true">
          <div className="h-px flex-1 bg-border" />
          <MoveRight className="ml-2 size-5 shrink-0 text-subtext-color" />
        </div>

        <Card className="overflow-hidden rounded-md border-border bg-card shadow-none">
          <div className="flex items-start justify-between gap-4 border-b border-border px-4 py-3">
            <div>
              <h3 className="text-base font-medium leading-6 text-default-font">
                {t("output.title")}
              </h3>
              <p className="mt-0.5 text-xs text-subtext-color">{t("output.year")}</p>
            </div>
            <Badge variant="success">{t("output.status")}</Badge>
          </div>
          <div className="overflow-x-auto px-3 py-2">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="h-8 px-2">{t("output.columns.sector")}</TableHead>
                  <TableHead className="h-8 px-2 text-right">
                    {t("output.columns.emissions")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectors.map(({ key, kind }) => (
                  <TableRow key={key} className="hover:bg-transparent">
                    <TableCell
                      className={
                        kind === "detail"
                          ? "py-1.5 pl-5 text-xs text-subtext-color"
                          : "py-1.5 text-sm font-medium text-default-font"
                      }
                    >
                      {t(`output.rows.${key}.label`)}
                    </TableCell>
                    <TableCell
                      className={
                        kind === "detail"
                          ? "py-1.5 text-right text-xs tabular-nums text-subtext-color"
                          : "py-1.5 text-right text-sm tabular-nums text-default-font"
                      }
                    >
                      {t(`output.rows.${key}.value`)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow className="border-t-2 border-border font-semibold hover:bg-transparent">
                  <TableCell className="py-2 text-sm text-default-font">
                    {t("output.total")}
                  </TableCell>
                  <TableCell className="py-2 text-right text-sm tabular-nums text-default-font">
                    {t("output.totalValue")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="border-t border-border px-4 py-2 text-xs text-subtext-color">
            {t("output.note")}
          </p>
        </Card>
      </div>
    </section>
  );
}
