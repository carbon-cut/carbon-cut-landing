"use client";

import { useQuery } from "@tanstack/react-query";

import {
  collectivityQueryKeys,
  collectivityQueryOptions,
  fetchCollectivityInventoryResult,
} from "@/app/[locale]/collectivity/_lib/queries";

import EmissionsBySectorPie from "./_charts/EmissionsBySectorPie";
import EmissionsByScopePie from "./_charts/EmissionsByScopePie";
import GHGDevelopmentChart from "./_charts/GHGDevelopmentChart";
import MunicipalAssetsChart from "./_charts/MunicipalAssetsChart";
import TerritorialEnergyChart from "./_charts/TerritorialEnergyChart";
import ResultSummaryCards from "./_components/ResultSummaryCards";

export default function ResultRouteClient({ projectSlug }: { projectSlug: string }) {
  const resultQuery = useQuery({
    ...collectivityQueryOptions,
    queryKey: collectivityQueryKeys.result(projectSlug),
    queryFn: () => fetchCollectivityInventoryResult(projectSlug),
  });

  return (
    <>
      <div className="mt-6">
        <ResultSummaryCards
          result={resultQuery.data}
          isLoading={resultQuery.isLoading}
          error={resultQuery.error}
        />
      </div>
      <div className="mt-6 flex flex-col gap-6">
        <GHGDevelopmentChart
          result={resultQuery.data}
          isLoading={resultQuery.isLoading}
          error={resultQuery.error}
        />
        <MunicipalAssetsChart
          result={resultQuery.data}
          isLoading={resultQuery.isLoading}
          error={resultQuery.error}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <EmissionsByScopePie
            result={resultQuery.data}
            isLoading={resultQuery.isLoading}
            error={resultQuery.error}
          />
          <EmissionsBySectorPie
            result={resultQuery.data}
            isLoading={resultQuery.isLoading}
            error={resultQuery.error}
          />
        </div>
        <TerritorialEnergyChart
          result={resultQuery.data}
          isLoading={resultQuery.isLoading}
          error={resultQuery.error}
        />
      </div>
    </>
  );
}
