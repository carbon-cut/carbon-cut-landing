import Q1 from "./q1";
import { QuestionProps } from "../../types";
import Q2 from "./q2";
import {Heating} from "./heating";
import React from "react";
import Housing from "./housing";
const output: React.FC<QuestionProps>[] = [
    //Q1,
    //Q2,
    ...Housing,
    Heating,
    /* HeatingBill, */
    Q2
];

export default output;
