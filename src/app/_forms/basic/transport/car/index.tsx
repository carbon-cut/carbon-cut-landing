import QCar1 from "./qCar1";
import { QuestionProps } from "../../../types";
import QCar3 from "./qCar3";
import QCar2 from "./qCar2";
import QCar4 from "./qCar4";
import {JSX} from "react";

const output: (
  count: number,
  init?: number,
) => ((props: QuestionProps) => JSX.Element)[] = (count, init = 0) => {
  const arr: ((props: QuestionProps) => JSX.Element)[] = [];

  for (let i = init; i < count + init; i++) {
    console.log("looop");
    arr.push(QCar1(i), QCar2(i), 
    //QCar3(i),
    QCar4(i)); //fill(QCar1(i), QCar2(i))
  }
  console.log(arr);
  return arr;
};

export default output;
