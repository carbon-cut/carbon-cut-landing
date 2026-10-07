import { QuestionFC, QuestionProps } from "../../types";
import QAuxilary from "./auxiliary";
import QCar from "./car/qCar";
import QCT from "./commonTransport";
//import QMoto from "./moto/qMoto";

const output: QuestionFC[] = [
  QCar,
  //QMoto,
  QAuxilary,
  ...QCT,
];

export default output;
