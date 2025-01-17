import Q1 from "./q1";
import { QuestionProps } from "../../types";
import Q2 from "./q2";
import Heating from "./heating";
import React from "react";
const output: React.FC<QuestionProps>[] = [...Heating, Q1, Q2];

export default output;
