import React from "react";
import { QuestionProps } from "../../../types";
import Question from "../../../components/question";
import { useScopedI18n } from "@/locales/client";
import Content from "../../../components/content";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FormCheckbox from "@/components/forms/formCheckbox";

const headerKeys = [0, 1, 2] as const;
const bodyKeys = [
  { l: "insert", n: 0 },
  { l: "woodPole", n: 1 },
  { l: "openFireplace", n: 2 },
  { l: "woodBoiler", n: 3 },
] as const;

function QHeating2({ mainForm }: QuestionProps) {
  const t = useScopedI18n("forms.basic.energie.heating.q2");
  return (
    <div>
      <Question>{t("q")}</Question>
      <Content>
        <Table>
          <TableHeader>
            <TableRow>
              {headerKeys.map((e) => (
                <TableHead key={e}>{t(`headers.${e}`)}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bodyKeys.map(({ l, n }) => (
              <TableRow key={n}>
                <TableCell>{t(`rows.${n}`)}</TableCell>
                <TableCell>
                  <FormCheckbox
                    id={`wood${n}`}
                    form={mainForm}
                    name={`energie.heating.system.wood.${l}`}
                  />
                </TableCell>
                <TableCell>
                  <FormCheckbox
                    id={`charcoal${n}`}
                    form={mainForm}
                    name={`energie.heating.system.charcoal.${l}`}
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
