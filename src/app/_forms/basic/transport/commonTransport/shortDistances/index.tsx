import React, { useEffect, useMemo, useState } from "react";
import { QuestionProps } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../../components/question";
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Separator } from "@/components/ui/separator";
import Covoiturage from "./covoiturage";
import Bus from "./bus";
import Metro from "./metro";
import { useFieldArray } from "react-hook-form";
import {Container, Title} from "./container";

const QShortDistances = (props: QuestionProps) => {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances"
  );

  const {
    fields: fieldsCovoiturage,
    append: appendCovoiturage,
    remove: removeCovoiturage,
  } = useFieldArray({
    name: "transport.commonTransport.shortDistances.covoiturage",
  });
  const [parentCovoiturage] = useAutoAnimate()
  const [parentBus] = useAutoAnimate()
  const [parentMetro] = useAutoAnimate()
  const {
    fields: fieldsBus,
    append: appendBus,
    remove: removeBus,
  } = useFieldArray({
    name: "transport.commonTransport.shortDistances.bus",
  });

  const {
    fields: fieldsMetro,
    append: appendMetro,
    remove: removeMetro,
  } = useFieldArray({
    name: "transport.commonTransport.shortDistances.metro",
  });

  return (
    <div>
      <Question>{t("q")}</Question>
      <Separator className="my-3" />
      {/* Covoiturage */}
      <div className="space-y-3 mb-3">
        <Title append={appendCovoiturage} type="covoiturage" />
        <ul className="space-y-2" ref={parentCovoiturage}>
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
        <ul className="space-y-2" ref={parentBus}>
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
      {/* Metro */}
      <div className="space-y-3">
        <Title type="metro" append={appendMetro} />
        <ul className="space-y-2" ref={parentMetro}>
          {fieldsMetro?.map((fieldMetro, idx) => (
            <Container
            section="metro"
              idx={idx}
              key={fieldMetro.id}
              id={fieldMetro.id}
              remove={removeMetro}
            >
              <Metro {...props} idx={idx} />
            </Container>
          ))}
        </ul>
      </div>
      <div className="h-2" />
    </div>
  );
};

QShortDistances["Symbol"] = {
  question: "forms.basic.transport.commonTransport.shortDistances.title",
  fields: [
    'transport.commonTransport',
    'transport.commonTransport.shortDistances'
  ],
};

export default QShortDistances;

