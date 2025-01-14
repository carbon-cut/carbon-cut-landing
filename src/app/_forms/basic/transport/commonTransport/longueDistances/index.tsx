import React, { useEffect, useState } from "react";
import { QuestionProps } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../../components/question";
import NumberedInputs from "../../../../components/numberedGroup";
import { Separator } from "@/components/ui/separator";
import Covoiturage from "./covoiturage";
import Bus from "./bus";
import Train from "./train";

const QLongueDistances = (props: QuestionProps) => {
  const { mainForm, setIsDirty } = props;
  const [elements, setElements] = useState({
    bus: 0,
    TGV: 0,
    train: 0,
    covoiturage: 0,
  });

  const [changed, setChanged] = useState(false);

  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.longueDistances",
  );

  useEffect(() => {
    const prevFields = mainForm.getValues(
      "transport.commonTransport.longueDistances",
    );
    if (!prevFields)
      mainForm.setValue("transport.commonTransport.longueDistances", {
        bus: [],
        covoiturage: [],
        TGV: [],
        train: [],
      });
    const keys = ["bus", "TGV", "train", "covoiturage"] as const;
    if (prevFields) {
      for (const key of keys) {
        if (prevFields[key].length < elements[key]) {
          //@ts-ignore
          mainForm.setValue(
            `transport.commonTransport.longueDistances.${key}`,
            [
              ...prevFields[key],
              ...Array.from(
                { length: elements[key] - prevFields[key].length },
                () => null,
              ),
            ],
          );
          setChanged((prev) => !prev);
        } else if (prevFields[key].length > elements[key]) {
          mainForm.setValue(
            `transport.commonTransport.longueDistances.${key}`,
            [
              //@ts-ignore
              ...Array.from(
                { length: elements[key] },
                (_, index) => prevFields[key][index],
              ),
            ],
          );
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
          { label: "train", value: "train" },
          { label: "TGV", value: "TGV" },
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

        <Train key={4 + +changed} {...props} />
      </div>
    </>
  );
};

QLongueDistances["Symbol"] = {
  question: "forms.basic.transport.commonTransport.longueDistances.q",
  fields: [],
};

export default QLongueDistances;
