import React from "react";
import { QuestionProps, QuestionFC } from "../../../../types";
import { useScopedI18n } from "@/locales/client";
import Question from "../../../../components/QuestionPrompt";
import { Separator } from "@/components/ui/separator";
import Covoiturage from "./covoiturage";
import Bus from "./bus";
import Train from "./train";
import { useFieldArray } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import QuestionRepeaterItem from "@/app/_forms/components/QuestionRepeaterItem";
import QuestionRepeaterSection from "@/app/_forms/components/QuestionRepeaterSection";

const QLongueDistances: QuestionFC = (props: QuestionProps) => {
  const t = useScopedI18n("forms.basic.transport.commonTransport.longueDistances");
  const tTitles = useScopedI18n("forms.basic.transport.commonTransport.shortDistances.titles");

  const [parentCovoiturage] = useAutoAnimate();
  const [parentBus] = useAutoAnimate();
  const [parentTrain] = useAutoAnimate();

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

  const sectionStyle = {
    bus: {
      card: "bg-orange-50 border-orange-200",
      badge: "text-[#FF6034]",
    },
    covoiturage: {
      card: "bg-blue-50 border-blue-200",
      badge: "text-[#004DC2]",
    },
    train: {
      card: "bg-green-50 border-green-200",
      badge: "text-[#00A261]",
    },
  } as const;

  const addDefaults = {
    bus: () => ({ busType: undefined, distance: "", nbPeople: "", frequency: "" }),
    covoiturage: () => ({ engine: undefined, distance: "", people: "", frequency: "" }),
    train: () => ({ type: undefined, distance: "", nbPeople: "", frequency: "" }),
  } as const;

  return (
    <>
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
          <ul ref={parentCovoiturage} className="space-y-2">
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
          <ul ref={parentBus} className="space-y-2">
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
      {/* Train */}
      <div className="space-y-3">
        <QuestionRepeaterSection
          icon="🚇"
          title={tTitles("train")}
          addLabel={tTitles("add")}
          onAdd={() => appendTrain(addDefaults.train())}
          addButtonClassName="border-[#00A261] text-[#00A261] hover:bg-[#ECFDF5]"
        >
          <ul ref={parentTrain} className="space-y-2">
            {fieldsTrain?.map((fieldTrain, idx) => (
              <QuestionRepeaterItem
                key={fieldTrain.id}
                badge={`${tTitles("trip")} ${idx + 1}`}
                className={sectionStyle.train.card}
                badgeClassName={sectionStyle.train.badge}
                removeButtonClassName="text-red-500 hover:text-red-700 hover:bg-red-50"
                onRemove={() => removeTrain(idx)}
              >
                <Train {...props} idx={idx} />
              </QuestionRepeaterItem>
            ))}
          </ul>
        </QuestionRepeaterSection>
      </div>
    </>
  );
};

QLongueDistances["Symbol"] = {
  question: "forms.basic.transport.commonTransport.longueDistances.title",
  fields: [
    "transport.commonTransport",
    "transport.commonTransport.longueDistances",
    "transport.commonTransport.longueDistances.covoiturage",
    "transport.commonTransport.longueDistances.bus",
    "transport.commonTransport.longueDistances.train",
  ],
};

export default QLongueDistances;
