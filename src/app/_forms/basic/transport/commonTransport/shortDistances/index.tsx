import React from "react";
import { QuestionProps, QuestionFC } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../../components/QuestionPrompt";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Separator } from "@/components/ui/separator";
import Covoiturage from "./covoiturage";
import Bus from "./bus";
import Metro from "./metro";
import { useFieldArray } from "react-hook-form";
import QuestionRepeaterSection from "@/app/_forms/components/QuestionRepeaterSection";
import QuestionRepeaterItem from "@/app/_forms/components/QuestionRepeaterItem";

const QShortDistances: QuestionFC = (props: QuestionProps) => {
  const t = useScopedI18n("forms.basic.transport.commonTransport.shortDistances");
  const tTitles = useScopedI18n("forms.basic.transport.commonTransport.shortDistances.titles");

  const {
    fields: fieldsCovoiturage,
    append: appendCovoiturage,
    remove: removeCovoiturage,
  } = useFieldArray({
    name: "transport.commonTransport.shortDistances.covoiturage",
  });
  const [parentCovoiturage] = useAutoAnimate();
  const [parentBus] = useAutoAnimate();
  const [parentMetro] = useAutoAnimate();
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

  const sectionStyle = {
    bus: {
      card: "bg-orange-50 border-orange-200",
      badge: "text-[#FF6034]",
    },
    covoiturage: {
      card: "bg-blue-50 border-blue-200",
      badge: "text-[#004DC2]",
    },
    metro: {
      card: "bg-green-50 border-green-200",
      badge: "text-[#00A261]",
    },
  } as const;

  const addDefaults = {
    bus: () => ({ busType: undefined, distance: "", nbPeople: "", frequency: "" }),
    metro: () => ({ distance: "", nbPeople: "", frequency: "" }),
    covoiturage: () => ({ engine: undefined, distance: "", people: "", frequency: "" }),
  } as const;

  return (
    <div>
      <Question>{t("q")}</Question>
      <Separator className="my-3" />
      {/* Covoiturage */}
      <div className="space-y-3 mb-3">
        <QuestionRepeaterSection
          icon="🚗"
          title={tTitles("covoiturage")}
          addLabel={tTitles("add")}
          onAdd={() => appendCovoiturage(addDefaults.covoiturage())}
          addButtonClassName="border-[#00A261] text-[#00A261] hover:bg-[#ECFDF5]"
        >
          <ul className="space-y-2" ref={parentCovoiturage}>
            {fieldsCovoiturage?.map((fieldCov, idx) => (
              <QuestionRepeaterItem
                key={fieldCov.id}
                badge={`${tTitles("trip")} ${idx + 1}`}
                className={sectionStyle.covoiturage.card}
                badgeClassName={sectionStyle.covoiturage.badge}
                removeButtonClassName="text-red-500 hover:text-red-700 hover:bg-red-50"
                onRemove={() => removeCovoiturage(idx)}
              >
                <Covoiturage {...props} idx={idx} />
              </QuestionRepeaterItem>
            ))}
          </ul>
        </QuestionRepeaterSection>
      </div>
      <Separator className="my-3" />
      {/* Bus */}
      <div className="space-y-3 mb-3">
        <QuestionRepeaterSection
          icon="🚌"
          title={tTitles("bus")}
          addLabel={tTitles("add")}
          onAdd={() => appendBus(addDefaults.bus())}
          addButtonClassName="border-[#00A261] text-[#00A261] hover:bg-[#ECFDF5]"
        >
          <ul className="space-y-2" ref={parentBus}>
            {fieldsBus?.map((fieldBus, idx) => (
              <QuestionRepeaterItem
                key={fieldBus.id}
                badge={`${tTitles("trip")} ${idx + 1}`}
                className={sectionStyle.bus.card}
                badgeClassName={sectionStyle.bus.badge}
                removeButtonClassName="text-red-500 hover:text-red-700 hover:bg-red-50"
                onRemove={() => removeBus(idx)}
              >
                <Bus {...props} idx={idx} />
              </QuestionRepeaterItem>
            ))}
          </ul>
        </QuestionRepeaterSection>
      </div>
      <Separator className="my-3" />
      {/* Metro */}
      <div className="space-y-3">
        <QuestionRepeaterSection
          icon="🚇"
          title={tTitles("metro")}
          addLabel={tTitles("add")}
          onAdd={() => appendMetro(addDefaults.metro())}
          addButtonClassName="border-[#00A261] text-[#00A261] hover:bg-[#ECFDF5]"
        >
          <ul className="space-y-2" ref={parentMetro}>
            {fieldsMetro?.map((fieldMetro, idx) => (
              <QuestionRepeaterItem
                key={fieldMetro.id}
                badge={`${tTitles("trip")} ${idx + 1}`}
                className={sectionStyle.metro.card}
                badgeClassName={sectionStyle.metro.badge}
                removeButtonClassName="text-red-500 hover:text-red-700 hover:bg-red-50"
                onRemove={() => removeMetro(idx)}
              >
                <Metro {...props} idx={idx} />
              </QuestionRepeaterItem>
            ))}
          </ul>
        </QuestionRepeaterSection>
      </div>
      <div className="h-2" />
    </div>
  );
};

QShortDistances["Symbol"] = {
  question: "forms.basic.transport.commonTransport.shortDistances.title",
  fields: [
    "transport.commonTransport",
    "transport.commonTransport.shortDistances",
    "transport.commonTransport.shortDistances.covoiturage",
    "transport.commonTransport.shortDistances.bus",
    "transport.commonTransport.shortDistances.metro",
  ],
};

export default QShortDistances;
