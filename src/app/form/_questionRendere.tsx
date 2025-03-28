import { QuestionProps } from "../_forms/types";

const QuestionRendrer = ({
  Question,
  props,
}: {
  Question: React.FC<QuestionProps>;
  props: QuestionProps;
}) => <Question {...props} />;

export default QuestionRendrer