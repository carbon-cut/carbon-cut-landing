import React from "react";
import { QuestionProps } from "../../../types";
import Question from "../../../components/QuestionPrompt";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/QuestionContent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FieldCheckbox as FormCheckbox } from "@/components/forms";

const headerKeys = [0, 1, 2] as const;
const bodyKeys = ["insert", "stove", "openFireplace", "woodBoiler"] as const;

function QHeating2({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energy.heating.q2");
  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <Table>
          <TableHeader>
            <TableRow>
              {headerKeys.map((e) => (
                // @ts-ignore - it needs to be fixed, just not now
                <TableHead key={e}>{t(`headers.${e}`)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bodyKeys.map((l) => (
              <TableRow key={l}>
                <TableCell>{t(`rows.${l}`)}</TableCell>
                <TableCell>
                  <FormCheckbox
                    id={`wood${l}`}
                    form={mainForm}
                    name={`energy.heating.system.wood.${l}`}
                  />
                </TableCell>
                <TableCell>
                  <FormCheckbox
                    id={`charcoal${l}`}
                    form={mainForm}
                    name={`energy.heating.system.charcoal.${l}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Content>
    </div>
  );
}

export default QHeating2;
