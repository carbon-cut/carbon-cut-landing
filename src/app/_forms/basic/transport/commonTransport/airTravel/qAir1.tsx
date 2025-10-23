import React, { useMemo, useState } from "react";
import { QuestionProps } from "../../../../types";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";
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
];
const classes = ["economy", "premium", "business", "first"];

function QAir({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.transport.commonTransport.qAir.q1");

  const { data: airports } = useQuery<{ reduced: any[]; raw?: any[] }>({
    queryKey: ["airports"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/airports`
      ).then((r) => r.json());
      if (res.error) throw new Error(res.error.message);
      const reduced = res.reduce(
        //@ts-ignore
        (prev, curr, _) => {
          return [...prev, { label: curr.name, value: curr.code }];
        },
        []
      );
      return {
        reduced,
        raw: res,
      };
      return {
        reduced: [
          {
            label: "Paris",
            value: "PAR",
          },
          {
            label: "London",
            value: "LHR",
          },
          {
            label: "New York",
            value: "JFK",
          },
        ],
        raw: undefined,
      };
    },
  });

  const [data, setData] = useState<
    {
      destination?: string | null;
      origin?: string | null;
      stopover?: string | null;
    }[]
  >(mainForm.getValues("transport.airs") ?? []);
  const [stopovers, setStopovers] = useState(
    (mainForm.getValues("transport.airs") ?? []).map((e) =>
      e?.stopover ? true : false
    )
  );

  const distance = useMemo(() => {
    const RawAirports = airports?.raw;
    if (!RawAirports) return [];
    return data.map((ele) => {
      //const {origin, destination} = RawAirports?.filter((v)=>({origin: v.code===ele.origin, destination:}))
      return getDistance(ele ?? null, RawAirports);
    });
  }, [data, mainForm]);

  return (
    <>
    <Question className="text-center font-semibold text-xl">{t("q")}</Question>
    <Content className="text-center text-muted-foreground">{t("description")}</Content>
      {data.map((_, index) => (
        <div
          key={index}
          className="bg-white border-2 relative border-gray-200 rounded-lg p-12 hover:border-[#00A261] transition-colors mb-6"
        >

          <Button
            type="button"
            variant={"ghost"}
            size={"icon"}
            className="rounded-full hover:bg-destructive/50 absolute top-4 right-4"
            onClick={() => {
              setData((prev) => {
                const out = prev.toSpliced(index, 1);
                console.log(out);
                mainForm.setValue(
                  `transport.airs`,
                  mainForm.getValues("transport.airs")?.toSpliced(index, 1) ??
                    []
                );
                return out;
              });
            }}
          >
            <Trash />
          </Button>
          <div className="grid grid-cols-4 gap-10 mb-6">
            <FormMultiCombox
              labelClassName="text-black/70"
              className="text-primary"
              form={mainForm}
              name={`transport.airs.${index}.origin`}
              data={airports?.reduced ?? []}
              label={t("origin")}
              setValue={(v) => {
                setData((prev) =>
                  prev.toSpliced(index, 1, { ...prev[index], origin: v })
                );
              }}
            />
            <FormMultiCombox
            labelClassName="text-black/70"
              form={mainForm}
              name={`transport.airs.${index}.destination`}
              label={t("destination")}
              data={airports?.reduced ?? []}
              setValue={(v) => {
                setData((prev) =>
                  prev.toSpliced(index, 1, {
                    ...prev[index],
                    destination: v,
                  })
                );
              }}
            />
            <FormSelect
            labelClassName="text-black/70"
              data={aircraftTypes.map((e) => ({ label: e, value: e }))}
              form={mainForm}
              name={`transport.airs.${index}.aircraftType`}
              label={t("aircraftType")}
            />
            <FormSelect
            labelClassName="text-black/70"
              data={classes.map((e) => ({ label: e, value: e }))}
              form={mainForm}
              name={`transport.airs.${index}.class`}
              label={t("class")}
            />
          </div>
          <div className="grid grid-cols-4 gap-10">
            <Input
            labelClassName="text-black/70"
              label={t("frequency")}
              size="sm"
              type="number"
              form={mainForm}
              name={`transport.airs.${index}.frequency`}
            />
            <Input
            labelClassName="text-black/70"
              label={t("carbonEmissions")}
              size="sm"
              type="number"
              form={mainForm}
              name={`transport.airs.${index}.carbonEmissions`}
            />
            <div>
              <div className='flex items-center gap-4 mt-6'>
              <Checkbox
                id={`stopover${index}`}
                checked={stopovers[index]}
                onCheckedChange={(v) => {
                  setStopovers((prev) => prev.toSpliced(index, 1, !!v));
                  if (!v) {
                    mainForm.setValue(`transport.airs.${index}.stopover`, null);
                    setData((prev) =>
                      prev.toSpliced(index, 1, {
                        ...prev[index],
                        stopover: null,
                      })
                    );
                  }
                }}
              />
            <FormLabel className="text-black/70" >
              {t("stopover")} 
            </FormLabel>
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
              disabled={!stopovers[index]}
              form={mainForm}
              name={`transport.airs.${index}.stopover`}
              label={t("via")}
              data={airports?.reduced ?? []}
              setValue={(v) => {
                setData((prev) =>
                  prev.toSpliced(index, 1, {
                    ...prev[index],
                    stopover: v,
                  })
                );
              }}
            />
          </div>
          <Separator className="my-4" />
          <div className="flex flex-row justify-between">
            <Label className="text-muted-foreground text-base font-semibold">{t("distance")}</Label>
          <p className="inline whitespace-nowrap">
            {" "}
            {
              (Math.floor(distance[index] / 1000)).toString() === 'NaN' ? '????' : (Math.floor(distance[index] / 1000)) + 'Km'
            } 
          </p>
          </div>
        </div>
      ))}
      <Button
        type="button"
        className="rounded-full w-full ml-2 my-3 border-2
         border-section-transport/70 hover:border-section-transport
         hover:bg-section-transport/80
         text-section-transport hover:text-muted
         "
        size={"lg"}
        variant={"ghost"}
        onClick={() => {
          mainForm.setValue(`transport.airs`, [
            {
              destination: null,
              origin: null,
              frequency: null,
              aircraftType: null,
              class: null,
              roundTrip: false,
              stopover: null,
              carbonEmissions: null,
              distance: 0,
              flightPurpose: "personal",
              familyMembers: 1,
            },
          ]);
          setData((prev) => [
            ...prev,
            { destination: "", origin: "", stopover: null },
          ]);
        }}
      >
        <Plus />
        <Label className="cursor-pointer">Ajout d&apos;un vol</Label>
      </Button>
    </>
  );
}

QAir["Symbol"] = {
  question: "forms.basic.transport.commonTransport.qAir.q1.q",
  fields: ["transport.airs"],
};

export default QAir;

function getDistance(
  ele: {
    destination?: string | null;
    origin?: string | null;
    stopover?: string | null;
  },
  RawAirports: any[]
) {
  if (!ele.destination || !ele.origin) return 0;
  let origin = null;
  let destination = null;
  let stopover = null;
  let i = 0;
  while (i < RawAirports.length) {
    const v = RawAirports[i];
    if (v.code === ele.origin) origin = v;
    else if (v.code === ele.destination) destination = v;
    else if (v.code === ele.stopover) stopover = v;
    if (origin && destination && (!ele.stopover || stopover)) break;
    i++;
  }
  if (!origin || !destination) throw new Error("Airport Not found");
  if (stopover)
    return (
      CalculateDistance(origin, stopover) +
      CalculateDistance(stopover, destination)
    );
  return CalculateDistance(origin, destination);
}

type Point = { latitude: number; longitude: number };
function CalculateDistance(origin: Point, destination: Point) {
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
