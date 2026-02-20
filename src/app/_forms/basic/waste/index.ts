import { QuestionProps } from "../../types";
import Details from "./details";
import General from "./general";
import Precise from "./precise";
import Water from "./water";

const output: React.FC<QuestionProps>[] = [...General, Precise, ...Details, Water];

export default output;
