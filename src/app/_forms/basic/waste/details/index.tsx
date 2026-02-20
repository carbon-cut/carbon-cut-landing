import { QuestionProps } from "../../../types";
import Destination from "./destination";
import Compost from "./compost";
import biodigest from "./biodigest";

const output: React.FC<QuestionProps>[] = [Destination, Compost, biodigest];

export default output;
