import React, { useEffect, useState } from "react";
import { QuestionProps, QuestionFC } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../../components/question";
import {Container, Title} from "../shortDistances/container";
import { Separator } from "@/components/ui/separator";
import Covoiturage from "./covoiturage";
import Bus from "./bus";
import Train from "./train";
import { useFieldArray } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const QLongueDistances: QuestionFC = (props: QuestionProps) => {
  
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.longueDistances"
  );

    const [parentCovoiturage] = useAutoAnimate()
    const [parentBus] = useAutoAnimate()
    const [parentTrain] = useAutoAnimate()

  const {
    fields: fieldsCovoiturage,
    append: appendCovoiturage,
    remove: removeCovoiturage,
  } = useFieldArray({
    name: "transport.commonTransport.longueDistances.covoiturage",
  });

  const {
    fields: fieldsBus,
    append: appendBus,
    remove: removeBus,
  } = useFieldArray({
    name: "transport.commonTransport.longueDistances.bus",
  });

  const {
    fields: fieldsTrain,
    append: appendTrain,
    remove: removeTrain,
  } = useFieldArray({
    name: "transport.commonTransport.longueDistances.train",
  });


  return (
    <>
      <Question>{t("q")}</Question>
      <Separator className="my-3" />
      {/* Covoiturage */}
      <div className="space-y-3 mb-3">
        <Title append={appendCovoiturage} type="covoiturage" />
        <ul ref={parentCovoiturage} className="space-y-2">
          {fieldsCovoiturage?.map((fieldCov, idx) => (
            <Container
              section="covoiturage"
              idx={idx}
              id={fieldCov.id}
              key={fieldCov.id}
              remove={removeCovoiturage}
            >
              <Covoiturage {...props} idx={idx} />
            </Container>
          ))}
        </ul>
      </div>
      <Separator className="my-3" />
      {/* Bus */}
      <div className="space-y-3 mb-3">
        <Title type="bus" append={appendBus} />
        <ul ref={parentBus} className="space-y-2">
          {fieldsBus?.map((fieldBus, idx) => (
            <Container
              section="bus"
              idx={idx}
              key={fieldBus.id}
              id={fieldBus.id}
              remove={removeBus}
            >
              <Bus {...props} idx={idx} />
            </Container>
          ))}
        </ul>
      </div>
      <Separator className="my-3" />
      {/* Train */}
      <div className="space-y-3">
        <Title type="train" append={appendTrain} />
        <ul ref={parentTrain} className="space-y-2">
          {fieldsTrain?.map((fieldTrain, idx) => (
            <Container
            section="train"
              idx={idx}
              key={fieldTrain.id}
              id={fieldTrain.id}
              remove={removeTrain}
            >
              <Train {...props} idx={idx} />
            </Container>
          ))}
        </ul>
      </div>
    </>
  );
};

QLongueDistances["Symbol"] = {
  question: "forms.basic.transport.commonTransport.longueDistances.title",
  fields: [
    'transport.commonTransport',
    'transport.commonTransport.longueDistances',
    'transport.commonTransport.longueDistances.covoiturage',
    'transport.commonTransport.longueDistances.bus',
    'transport.commonTransport.longueDistances.train',
  ],
};

export default QLongueDistances;
