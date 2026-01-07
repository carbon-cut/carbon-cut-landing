import React, { useMemo, useState } from "react";
import { QuestionProps, QuestionFC } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Input from "../../../../components/input";
import { Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormMultiCombox from "../../../../components/multiCombox";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import FormSelect from "@/components/forms/formSelect";
import FormCheckbox from "@/components/forms/formCheckbox";
import { FormLabel } from "@/components/ui/forms";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import Question from "@/app/_forms/components/question";
import Content from "@/app/_forms/components/content";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { AirportsData } from "@carbon-cut/types";

type AirportsReduced = {
  label: React.ReactNode;
  labelText: string;
  value: string;
}[];

const aircraftTypes = [
  "A220",
  "A319",
  "A320",
  "A321",
  "A330",
  "Boeing737",
  "Boeing757",
  "Boeing767",
  "Boeing777",
  "Boeing787",
  "other",
] as const;
const classes = ["economy", "premium", "business", "first"] as const;

const QAir: QuestionFC = ({ mainForm }: QuestionProps) => {
  const t = useScopedI18n("forms.basic.transport.commonTransport.qAir.q1");

  const { data: airports, isLoading } = useQuery<{ reduced: AirportsReduced; raw?: AirportsData }>({
    queryKey: ["airports"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/airports`
      ).then((r) => r.json());
      if (res.error) throw new Error(res.error.message);
      const typedRes: AirportsData = res;
      console.log("airports:", typedRes);
      const reduced = typedRes.reduce<AirportsReduced>((prev, curr, index) => {
        const { city, country } = curr;
        const labelText = [city, country].filter(Boolean).join(", ");
        return [
          ...prev,
          {
            label: (
              <span className="inline-flex items-baseline gap-1 whitespace-nowrap text-left">
                <span className="text-sm font-medium text-foreground">{city}</span>
                <span className="text-xs text-muted-foreground">{country}</span>
              </span>
            ),
            labelText,
            value: index.toString(),
          },
        ];
      }, []);
      return {
        reduced,
        raw: typedRes,
      };
    },
  });

  const {
    fields: data,
    append,
    remove,
  } = useFieldArray({ name: "transport.airs", control: mainForm.control });

  const [stopovers, setStopovers] = useState(
    (mainForm.getValues("transport.airs") ?? []).map((e) => (e?.stopover ? true : false))
  );

  const [parent] = useAutoAnimate({ duration: 100 });
  const handleAdd = () => {
    const scrollY = window.scrollY;

    // Add your new item here (state update)

    append({
      //@ts-expect-error
      destination: null,
      //@ts-expect-error
      origin: null,
      //@ts-expect-error
      aircraftType: null,
      frequency: null,
      class: null,
      roundTrip: false,
      stopover: null,
      carbonEmissions: null,
      distance: 0,
      flightPurpose: "personal",
      familyMembers: 1,
    });

    window.scrollTo(0, scrollY);
  };

  return (
    <div className="">
      <Question className="text-center font-semibold text-xl">{t("q")}</Question>
      <Content className="text-center text-muted-foreground mb-0">{t("description")}</Content>
      <ul ref={parent}>
        {data.map(({ id }, index) => (
          <AirTravelItem
            key={id}
            index={index}
            t={t}
            airports={airports}
            isLoading={isLoading}
            mainForm={mainForm}
            stopoverChecked={!!stopovers[index]}
            onStopoverChange={(value) => {
              setStopovers((prev) => prev.toSpliced(index, 1, value));
              if (!value) {
                mainForm.setValue(`transport.airs.${index}.stopover`, null);
              }
            }}
            onRemove={() => {
              remove(index);
            }}
          />
        ))}
      </ul>
      <Button
        type="button"
        className="rounded-full w-full  my-3 border-2
         border-section-transport/70 hover:border-section-transport
         hover:bg-section-transport/80
         text-section-transport hover:text-muted
         "
        size={"lg"}
        variant={"ghost"}
        onClick={() => {
          handleAdd();
        }}
      >
        <Plus />
        <Label className="cursor-pointer">Ajout d&apos;un vol</Label>
      </Button>
    </div>
  );
};

QAir["Symbol"] = {
  question: "forms.basic.transport.commonTransport.qAir.q1.q",
  fields: ["transport.airs"],
};

export default QAir;

type AirTravelItemProps = {
  index: number;
  t: ReturnType<typeof useScopedI18n>;
  airports: { reduced: AirportsReduced; raw?: AirportsData } | undefined;
  isLoading: boolean;
  mainForm: QuestionProps["mainForm"];
  stopoverChecked: boolean;
  onStopoverChange: (value: boolean) => void;
  onRemove: () => void;
};

function AirTravelItem({
  index,
  t,
  airports,
  isLoading,
  mainForm,
  stopoverChecked,
  onStopoverChange,
  onRemove,
}: AirTravelItemProps) {
  const { destination, origin, stopover } = mainForm.watch(`transport.airs.${index}`);

  const distance = useMemo(() => {
    if (!airports?.raw) return undefined;
    try {
      return getDistance(
        {
          destination: destination,
          origin: origin,
          stopover: stopover,
        },
        airports.raw,
        t("originDestinationError")
      );
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Unknown error");
      return 0;
    }
  }, [destination, origin, stopover, airports?.raw, t]);

  const airportsOptions = airports?.reduced ?? [];
  const distanceKm = Math.floor((distance ?? 0) / 1000);
  const displayDistance = Number.isNaN(distanceKm) ? "????" : `${distanceKm}Km`;

  return (
    <li className="bg-white border-2 relative border-gray-200 rounded-lg md:p-12 p-4 pt-12 hover:border-[#00A261] transition-colors mb-6">
      <Button
        type="button"
        variant={"ghost"}
        size={"icon"}
        className="rounded-full hover:bg-destructive/50 absolute top-4 right-4"
        onClick={onRemove}
      >
        <Trash />
      </Button>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-4 items-end">
        <FormMultiCombox
          labelClassName="text-black/70"
          className="text-primary"
          form={mainForm}
          name={`transport.airs.${index}.origin`}
          options={airportsOptions}
          label={t("origin")}
          fallback
          loading={isLoading}
          bannedOptions={[destination]}
        />
        <FormMultiCombox
          labelClassName="text-black/70"
          form={mainForm}
          name={`transport.airs.${index}.destination`}
          label={t("destination")}
          options={airportsOptions}
          fallback
          loading={isLoading}
          bannedOptions={[origin]}
        />
        <FormSelect
          labelClassName="text-black/70"
          data={aircraftTypes.map((e) => ({ label: e, value: e }))}
          form={mainForm}
          name={`transport.airs.${index}.aircraftType`}
          label={t("aircraftType")}
          fallback
        />
        <FormSelect
          labelClassName="text-black/70"
          data={classes.map((e) => ({ label: e, value: e }))}
          form={mainForm}
          name={`transport.airs.${index}.class`}
          label={t("class")}
          fallback
        />
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-10 gap-4 items-end">
        <Input
          labelClassName="text-black/70"
          label={t("frequency")}
          size="sm"
          type="number"
          form={mainForm}
          name={`transport.airs.${index}.frequency`}
          fallback
        />
        <Input
          labelClassName="text-black/70"
          label={t("carbonEmissions")}
          size="sm"
          type="number"
          form={mainForm}
          name={`transport.airs.${index}.carbonEmissions`}
          fallback
        />
        <div className="self-center">
          <div className="flex items-center gap-4 md:mt-6">
            <Checkbox
              id={`stopover${index}`}
              checked={stopoverChecked}
              onCheckedChange={(v) => onStopoverChange(!!v)}
            />
            <FormLabel className="text-black/70">{t("stopover")}</FormLabel>
          </div>
          <FormCheckbox
            form={mainForm}
            name={`transport.airs.${index}.roundTrip`}
            id={`roundTrip${index}`}
            label={t("roundTrip")}
            labelClassName="text-black/70"
          />
        </div>
        <FormMultiCombox
          labelClassName="text-black/70"
          disabled={!stopoverChecked}
          form={mainForm}
          name={`transport.airs.${index}.stopover`}
          label={t("via")}
          options={airportsOptions}
          fallback
          loading={isLoading}
        />
      </div>
      <Separator className="my-4" />
      <div className="flex flex-row justify-between">
        <Label className="text-muted-foreground text-base font-semibold">{t("distance")}</Label>
        <p className="inline whitespace-nowrap">{displayDistance}</p>
      </div>
    </li>
  );
}
type AirportPosition = Pick<AirportsData[number], "latitude" | "longitude">;
function getDistance(
  ele: {
    destination?: string | null;
    origin?: string | null;
    stopover?: string | null;
  },
  rawAirports: AirportsData,
  errorMessage: string
) {
  if (
    ele.destination == null ||
    ele.destination === "" ||
    ele.origin == null ||
    ele.origin === ""
  ) {
    return 0;
  }
  const getAirportByIndex = (value?: string | null): AirportPosition | null => {
    if (value == null || value === "") return null;
    const index = Number(value);
    if (!Number.isInteger(index) || index < 0 || index >= rawAirports.length) return null;
    return rawAirports[index] ?? null;
  };
  const origin = getAirportByIndex(ele.origin);
  const destination = getAirportByIndex(ele.destination);
  const stopover = ele.stopover ? getAirportByIndex(ele.stopover) : null;
  if (!origin || !destination || (ele.stopover && !stopover)) throw new Error(errorMessage);
  if (stopover)
    return CalculateDistance(origin, stopover) + CalculateDistance(stopover, destination);
  return CalculateDistance(origin, destination);
}

type Point = { latitude: number; longitude: number };
function CalculateDistance(origin: AirportPosition, destination: AirportPosition) {
  const { latitude: lat1, longitude: lon1 } = origin;
  const { latitude: lat2, longitude: lon2 } = destination;

  const R = 6371e3; // earth Radius in metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in metres
}
