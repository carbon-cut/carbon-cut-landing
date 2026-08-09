import { QuestionFC } from "../../types";
import Details from "./details";
import General from "./general";
import Precise from "./precise";
import Water from "./water";

const output: QuestionFC[] = [General, Precise, ...Details, Water];

export default output;
