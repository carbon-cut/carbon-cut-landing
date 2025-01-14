import React, { useEffect, useState } from "react";
import { QuestionProps } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../../components/question";
import NumberedInputs from "../../../../components/numberedGroup";
import { Separator } from "@/components/ui/separator";
import Covoiturage from "./covoiturage";
import Bus from "./bus";
import Metro from "./metro";

const QShortDistances = (props: QuestionProps) => {
  const { mainForm, setIsDirty } = props;
  const [elements, setElements] = useState({
    bus: 0,
    metro: 0,
    tramway: 0,
    covoiturage: 0,
  });

  const [changed, setChanged] = useState(false);

  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances",
  );

  useEffect(() => {
    const prevFields = mainForm.getValues(
      "transport.commonTransport.shortDistances",
    );
    if (!prevFields)
      mainForm.setValue("transport.commonTransport.shortDistances", {
        bus: [],
        covoiturage: [],
        metro: [],
        tramway: [],
      });
    const keys = ["bus", "metro", "tramway", "covoiturage"] as const;
    if (prevFields) {
      for (const key of keys) {
        if (prevFields[key].length < elements[key]) {
          //@ts-ignore
          mainForm.setValue(`transport.commonTransport.shortDistances.${key}`, [
            ...prevFields[key],
            ...Array.from(
              { length: elements[key] - prevFields[key].length },
              () => ({}),
            ),
          ]);
          setChanged((prev) => !prev);
        } else if (prevFields[key].length > elements[key]) {
          mainForm.setValue(`transport.commonTransport.shortDistances.${key}`, [
            //@ts-ignore
            ...Array.from(
              { length: elements[key] },
              (_, index) => prevFields[key][index],
            ),
          ]);
          setChanged((prev) => !prev);
        }
      }
    }
  }, [elements]);

  return (
    <>
      <Question>{t("q")}</Question>
      <NumberedInputs
        states={elements}
        options={[
          { label: "bus", value: "bus" },
          { label: "metro", value: "metro" },
          { label: "tramway", value: "tramway" },
          { label: "covoiturage", value: "covoiturage" },
        ]}
        setState={(k, o) =>
          setElements((prev) => ({
            ...prev,
            [k]:
              o === "+"
                ? //@ts-ignore
                  prev[k] + 1
                : //@ts-ignore
                prev[k] === 0
                ? 0 //@ts-ignore
                : prev[k] - 1,
          }))
        }
      />
      <Separator className="my-3" />
      <Covoiturage key={+changed} {...props} />
      <Separator className="my-3" />
      <div className="grid grid-cols-1">
        <Bus key={2 + +changed} {...props} />

        <Metro key={4 + +changed} {...props} />
      </div>
    </>
  );
};

QShortDistances["Symbol"] = {
  question: "forms.basic.transport.commonTransport.shortDistances.q",
  fields: [],
};

export default QShortDistances;
