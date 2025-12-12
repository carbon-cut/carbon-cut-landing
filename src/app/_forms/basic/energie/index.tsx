import Q1 from "./q1";
import { QuestionFC, QuestionProps } from "../../types";
import Q2 from "./q2";
import {Heating} from "./heating";
import React from "react";
import Housing from "./housing";
const output: QuestionFC[] = [
    ...Housing,
    Heating,
    Q1,
    Q2,
];

export default output;
