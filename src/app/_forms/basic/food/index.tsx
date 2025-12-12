import { QuestionFC, QuestionProps } from "../../types";
import Basic from "./basic";
import Breakfast from "./breakfast";
import Drinks from "./drinks";
import Restaurants from "./restaurants";
import Auxilary from "./auxilary";
import Market from "./market";

const output: QuestionFC[] = [...Basic, ...Breakfast, Restaurants, ...Drinks, Auxilary, Market];

export default output;
