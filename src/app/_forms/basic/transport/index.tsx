import { QuestionProps } from "../../types";
import QAuxilary from "./auxiliary";
import QCar from "./car/qCar";
import QCT from "./commonTransport";
import QMoto from "./moto/qMoto";

const output: React.FC<QuestionProps>[] = [
    QCar,
    //QMoto,
    QAuxilary,
    ...QCT];

export default output;
