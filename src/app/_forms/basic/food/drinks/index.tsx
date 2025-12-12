import { JSX } from "react";
import { QuestionFC, QuestionProps } from "../../../types";
import Daily from "./daily";
import Weekly from "./weekly";

const output: QuestionFC[] = [Daily, Weekly];

export default output;
