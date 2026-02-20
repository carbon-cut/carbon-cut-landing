import { Separator } from "@/components/ui/separator";
import { QuestionProps } from "../../../types";
import Q1 from "./q1";
import Q2 from "./q2";
import Q3 from "./q3";
import { FormAlert } from "../../../components/alert";

const output: React.FC<QuestionProps> = (props) => (
  <div>
    <FormAlert variant="note" title="" description="on a besoin que les valeurs d'assignissement" />
    <Q1 {...props} />
    <Separator />
    <Q2 {...props} />
    <Separator />
    <Q3 {...props} />
  </div>
);

export default output;
