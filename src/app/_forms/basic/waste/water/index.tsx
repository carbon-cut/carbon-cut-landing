import { Separator } from "@/components/ui/separator";
import { QuestionFC, QuestionProps } from "../../../types";
import Q1 from "./q1";
import Q2 from "./q2";
import Q3 from "./q3";
import { FormAlert } from "../../../components/alert";
import { useEffect } from "react";

const output: QuestionFC = (props) => {
  useEffect(() => {
    props.setSubmit(true);

    return () => {
      props.setSubmit(false);
    };
  }, []);
  return (
    <div>
      <FormAlert
        variant="note"
        title=""
        description="on a besoin que les valeurs d'assignissement"
      />
      <Q1 {...props} />
      <Separator />
      <Q2 {...props} />
      <Separator />
      <Q3 {...props} />
    </div>
  );
};

output["Symbol"] = {
  question: "forms.basic.waste.water.q1.title",
  fields: ["waste.water"],
};

export default output;
