/* import QMoto1 from "./qMoto1";
import { QuestionProps } from "../../../types";
import QMoto3 from "./qMoto3";
import QMoto2 from "./qMoto2";
import QMoto4 from "./qMoto4";
import { JSX } from "react";

const output: (
  count: number,
  init?: number,
) => ((props: QuestionProps) => JSX.Element)[] = (count, init = 0) => {
  const arr: ((props: QuestionProps) => JSX.Element)[] = [];

  for (let i = init; i < count + init; i++) {
    arr.push(QMoto1(i), QMoto2(i), QMoto3(i), QMoto4(i)); //fill(QMoto1(i), QMoto2(i))
  }
  console.log(arr);
  return arr;
};

export default output;
 */