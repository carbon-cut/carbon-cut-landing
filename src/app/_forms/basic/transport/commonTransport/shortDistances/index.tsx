import React, { useEffect, useMemo, useState } from "react";
import { QuestionProps } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../../components/question";
import NumberedInputs from "../../../../components/numberedGroup";
import { Separator } from "@/components/ui/separator";
import Covoiturage from "./covoiturage";
import Bus from "./bus";
import Metro from "./metro";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import Container from "./container";

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
    <>
      <Question>{t("q")}</Question>
      <Separator className="my-3" />
      {/* Covoiturage */}
      <div className="space-y-3 mb-3">
        <Title append={appendCovoiturage} type="covoiturage" />
        <div className="space-y-2">
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
        </div>
      </div>
      <Separator className="my-3" />
      {/* Bus */}
      <div className="space-y-3 mb-3">
        <Title type="bus" append={appendBus} />
        <div className="space-y-2">
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
        </div>
      </div>
      <Separator className="my-3" />
      {/* Metro */}
      <div className="space-y-3">
        <Title type="metro" append={appendMetro} />
        <div className="space-y-2">
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
        </div>
      </div>
    </>
  );
};

QShortDistances["Symbol"] = {
  question: "forms.basic.transport.commonTransport.shortDistances.q",
  fields: [],
};

export default QShortDistances;

type TransportType = "bus" | "metro" | "covoiturage";

const Title = ({
  type,
  append,
}: {
  type: TransportType;
  append: (type: unknown) => void;
}) => {
  const t = useScopedI18n(
    "forms.basic.transport.commonTransport.shortDistances.titles"
  );

  const data = useMemo<{ title: string; icon: string }>(() => {
    switch (type) {
      case "metro":
        return {
          title: t("metro"),
          icon: "🚇",
        };
      case "covoiturage":
        return {
          title: t("covoiturage"),
          icon: "🚗",
        };
      case "bus":
        return {
          title: t("bus"),
          icon: "🚌",
        };
    }
  }, [type]);

  const addTransportEntry = () => {
    switch (type) {
      case "bus":
        return {
          busType: "diesel",
          distance: 0,
          nbPeople: 1,
          frequency: 0,
        };

      case "metro":
        return {
          distance: 0,
          nbPeople: 1,
          frequency: 0,
        };
      case "covoiturage":
        return {
          distance: 0,
          pepole: 1,
          frequency: 0,
          make: "",
          engine: false,
        };
    }
  };

  return (
    <div className="flex items-center justify-between">
      <h4 className="font-semibold text-foreground flex items-center gap-2">
        <span className="text-xl mb-2">{data.icon}</span> {data.title}
      </h4>
      <Button
        type="button"
        onClick={() => {
          append(addTransportEntry());
        }}
        variant="outline"
        size="sm"
        className="border-[#00A261] text-[#00A261] hover:bg-[#ECFDF5] h-8 px-2"
      >
        <Plus className="w-3 h-3 mr-1" />
        <span className="text-xs">{t("add")}</span>
      </Button>
    </div>
  );
};
