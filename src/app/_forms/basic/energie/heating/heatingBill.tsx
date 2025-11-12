import { useScopedI18n } from "@/locales/client";
import React from "react";
import Question from "@/app/_forms/components/question";
import Content from "@/app/_forms/components/content";
import Input from "@/app/_forms/components/input";
import { QuestionProps } from "@/app/_forms/types";
import SideQuestion from "@/app/_forms/components/sideQuestion";
import { Separator } from "@/components/ui/separator";

function HeatingBill({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.heatingBill");
  return (
    <div>
      <Question className="px-12">{t("q")}</Question>
      <Content className="px-16 mb-6">
        <Input
          form={mainForm}
          name="energie.heating.quantities.heatingNetwork.total"
          placeholder="kWh"
          type="number"
        />
      </Content>
      <SideQuestion
        className="py-1 w-2/4 bg-section-transport/20"
        question={t("q3.q")}
        content={
          <Input
            form={mainForm}
            name="energie.heating.quantities.heatingNetwork.money"
            unit=""
            type="number"
            placeholder="€"
          />
        }
      />
      {/* <Separator className="mt-3" />
      <Question>{t("q2")}</Question>
      <Content>
        <Input form={mainForm} name="energie.electricity.index" type="number" />
      </Content> */}
    </div>
  );
}
HeatingBill['Symbol'] = {
  question: "forms.basic.energie.heatingBill.title",
  fields: ["energie.heating.quantities.heatingNetwork.total", "energie.heating.quantities.heatingNetwork.money"],
}

export default HeatingBill;
