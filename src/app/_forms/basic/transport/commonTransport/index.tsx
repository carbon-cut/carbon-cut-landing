import { QuestionProps } from "../../../types";
import QShortDistances from "./shortDistances";
import QAir from "./airTravel/qAir";
import QSea from "./maritimeTravel/qSea";
import QLongueDistances from "./longueDistances";

const output: ((props: QuestionProps) => JSX.Element)[] = [
  QShortDistances,
  QLongueDistances,
  QAir,
  QSea,
];

export default output;