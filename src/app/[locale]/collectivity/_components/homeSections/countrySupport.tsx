"use client";

import { WorldMap } from "@/components/shadcnmaps/maps/world";
import Typography from "@/components/ui/typography";
import type { CollectivityCountry } from "@/lib/collectivity/backend";
import { useCurrentLocale, useScopedI18n } from "@/locales/client";
import { MapControls } from "@/components/shadcnmaps/map-controls";

import countryMetadata from "../../pricing/_lib/countries.json";

export default function CountrySupport({
  supportedCountries,
}: {
  supportedCountries: CollectivityCountry[];
}) {
  const t = useScopedI18n("collectivityLanding.coverageCountries");
  const locale = useCurrentLocale();
  const countryNames = new Intl.DisplayNames([locale], { type: "region" });
  const getLocalizedCountryName = (regionId: string, fallback: string) => {
    if (!/^[A-Z]{2}$/.test(regionId)) return fallback;

    try {
      return countryNames.of(regionId) ?? fallback;
    } catch {
      return fallback;
    }
  };
  const supportedCountryCodes = supportedCountries.flatMap((country) => {
    const metadata = countryMetadata.find((candidate) => candidate.alpha3 === country.code);
    return metadata ? [metadata.alpha2] : [];
  });

  return (
    <section
      aria-labelledby="collectivity-countries-heading"
      className="flex w-full justify-center border-t border-border bg-background py-14 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 md:gap-3 md:px-10">
        <Typography asChild variant="marketingSectionTitle">
          <h2 id="collectivity-countries-heading">{t("title")}</h2>
        </Typography>
        <Typography asChild variant="marketingSectionDescription" className="max-w-2xl">
          <p>{t("description")}</p>
        </Typography>
        <div className="mx-auto w-full max-w-5xl">
          <WorldMap
            aria-label={t("mapLabel")}
            enableZoom
            controls={<MapControls position="top-right" />}
            showLabels={false}
            renderTooltip={(region) => {
              const isSupported = supportedCountryCodes.includes(region.id);

              return (
                <span className="inline-flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={`size-2 rounded-full ${isSupported ? "bg-brand-600" : "bg-error-600"}`}
                  />
                  {getLocalizedCountryName(region.id, region.name)}
                </span>
              );
            }}
            regions={supportedCountryCodes.map((id) => ({
              id,
              className: "fill-brand-600 stroke-background",
            }))}
            className="max-h-[32rem]"
          />
        </div>
      </div>
    </section>
  );
}
