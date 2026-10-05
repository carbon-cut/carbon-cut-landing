"use client";

import { useCallback } from "react";

import { displayUnit } from "@/lib/Unit";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";

export function useChartUnitFormatter() {
  const locale = useCurrentLocale();
  const tUnit = useScopedI18n("units");

  return useCallback(
    (unit: string) => displayUnit(unit, { locale, localize: tUnit }),
    [locale, tUnit]
  );
}
