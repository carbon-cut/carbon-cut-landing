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
import { PlusCircle, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import FormMultiCombox from "../../../../components/multiCombox";
import { useQuery } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/checkbox";
import FormSelect from "@/components/forms/formSelect";
import FormCheckbox from "@/components/forms/formCheckbox";

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

  const { data: airports } = useQuery<{ reduced: any[]; raw: any[] }>({
    queryKey: ["airports"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/airports`,
      ).then((r) => r.json());
      if (res.error) throw new Error(res.error.message);
      const reduced = res.reduce(
        //@ts-ignore
        (prev, curr, _) => {
          return [...prev, { label: curr.name, value: curr.code }];
        },
        [],
      );
      return {
        reduced,
        raw: res,
      };
    },
  });

  const [data, setData] = useState<
    {
      destination: string | null;
      origin: string | null;
      stopover: string | null;
    }[]
  >(mainForm.getValues("transport.airs") ?? []);
  const [stopovers, setStopovers] = useState(
    (mainForm.getValues("transport.airs") ?? []).map((e) =>
      e.stopover ? true : false,
    ),
  );

  const distance = useMemo(() => {
    const RawAirports = airports?.raw;
    if (!RawAirports) return [];
    return data.map((ele) => {
      //const {origin, destination} = RawAirports?.filter((v)=>({origin: v.code===ele.origin, destination:}))
      return getDistance(ele, RawAirports);
    });
  }, [data, mainForm]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>{t("origin")}</TableHead>
          <TableHead>{t("destination")}</TableHead>
          <TableHead>{t("stopover")}</TableHead>
          <TableHead>{t("via")}</TableHead>
          <TableHead>{t("aircraftType")}</TableHead>
          <TableHead>{t("class")}</TableHead>
          <TableHead>{t("roundTrip")}</TableHead>
          <TableHead>{t("distance")}</TableHead>
          <TableHead>{t("frequency")}</TableHead>
          <TableHead>{t("carbonEmissions")}</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((_, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            {
              //origin
              <TableCell>
                <FormMultiCombox
                  form={mainForm}
                  name={`transport.airs.${index}.origin`}
                  data={airports?.reduced ?? []}
                  setValue={(v) => {
                    setData((prev) =>
                      prev.toSpliced(index, 1, { ...prev[index], origin: v }),
                    );
                  }}
                />
              </TableCell>
            }
            {
              //destination
              <TableCell>
                <FormMultiCombox
                  form={mainForm}
                  name={`transport.airs.${index}.destination`}
                  data={airports?.reduced ?? []}
                  setValue={(v) => {
                    setData((prev) =>
                      prev.toSpliced(index, 1, {
                        ...prev[index],
                        destination: v,
                      }),
                    );
                  }}
                />
              </TableCell>
            }
            {
              //stopover
              <TableCell>
                <Checkbox
                  id={`stopover${index}`}
                  checked={stopovers[index]}
                  onCheckedChange={(v) => {
                    setStopovers((prev) => prev.toSpliced(index, 1, !!v));
                    if (!v) {
                      mainForm.setValue(
                        `transport.airs.${index}.stopover`,
                        null,
                      );
                      setData((prev) =>
                        prev.toSpliced(index, 1, {
                          ...prev[index],
                          stopover: null,
                        }),
                      );
                    }
                  }}
                />
              </TableCell>
            }
            {
              //via
              <TableCell>
                <FormMultiCombox
                  disabled={!stopovers[index]}
                  form={mainForm}
                  name={`transport.airs.${index}.stopover`}
                  data={airports?.reduced ?? []}
                  setValue={(v) => {
                    setData((prev) =>
                      prev.toSpliced(index, 1, {
                        ...prev[index],
                        stopover: v,
                      }),
                    );
                  }}
                />
              </TableCell>
            }
            {
              //aircraftType
              <TableCell>
                <FormSelect
                  data={aircraftTypes.map((e) => ({ label: e, value: e }))}
                  form={mainForm}
                  name={`transport.airs.${index}.aircraftType`}
                />
              </TableCell>
            }
            {
              //classes
              <TableCell>
                <FormSelect
                  data={classes.map((e) => ({ label: e, value: e }))}
                  form={mainForm}
                  name={`transport.airs.${index}.class`}
                />
              </TableCell>
            }
            {
              //roundTrip
              <TableCell>
                <div className="flex items-center space-x-2">
                  <FormCheckbox
                    form={mainForm}
                    name={`transport.airs.${index}.roundTrip`}
                    id={`roundTrip${index}`}
                  />
                </div>
              </TableCell>
            }

            <TableCell>
              <p className="inline whitespace-nowrap">
                {" "}
                {Math.floor(distance[index] / 1000)} Km
              </p>
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.airs.${index}.frequency`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.airs.${index}.carbonEmissions`}
              />
            </TableCell>
            <TableCell>
              <Button
                type="button"
                onClick={() => {
                  setData((prev) => {
                    const out = prev.toSpliced(index, 1);
                    console.log(out);
                    mainForm.setValue(
                      `transport.airs`,
                      mainForm
                        .getValues("transport.airs")
                        ?.toSpliced(index, 1) ?? [],
                    );
                    return out;
                  });
                }}
              >
                <Trash />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <Button
          type="button"
          onClick={() => {
            mainForm.setValue(`transport.airs`, [
              ...(mainForm.getValues("transport.airs") ?? []),
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
              },
            ]);
            setData((prev) => [
              ...prev,
              { destination: "", origin: "", stopover: null },
            ]);
          }}
        >
          <PlusCircle />
        </Button>
      </TableFooter>
    </Table>
  );
}

export default QAir;

function getDistance(
  ele: {
    destination: string | null;
    origin: string | null;
    stopover: string | null;
  },
  RawAirports: any[],
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
