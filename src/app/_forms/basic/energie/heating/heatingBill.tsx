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
      <Question>{t("q")}</Question>
      <Content>
        <Input
          form={mainForm}
          name={"energie.heatingNetwork.total"}
          type="number"
        />
      </Content>

      <SideQuestion
      question={t("q3.q")}
      content={
        <>
        <Input
        form={mainForm}
        name={"energie.heatingNetwork.money"}
        type="number"
        label={t("q3.money")}
        />
        <Input
        form={mainForm}
        name={"energie.heatingNetwork.price"}
        type="number"
        label={t("q3.price")}
        />
        </>
      }
      />
      <Separator className="mt-3" />
            <Question>{t("q2")}</Question>
            <Content>
              <Input form={mainForm} name="energie.heatingNetwork.index" type="number" />
            </Content>
    </div>
  );
}

export default HeatingBill;
