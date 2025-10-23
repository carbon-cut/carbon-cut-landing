import {QCar1, QCar12,  QCar13} from "./qCar1";
import { QuestionProps } from "../../../types";
import {QCar311, QCar322} from "./qCar3";
import QCar2 from "./qCar2";
import QCar4 from "./qCar4";
import {JSX} from "react";


const output: (
  count: number,
  init?: number,
) => ((props: QuestionProps) => JSX.Element)[] = (count, init = 0) => {
  const arr: ((props: QuestionProps) => JSX.Element)[] = [];

  for (let i = init; i < count + init; i++) {
    arr.push(QCar1(i), QCar12(i), QCar13(i), QCar2(i), 
    QCar311(i), QCar322(i),
    QCar4(i)); //fill(QCar1(i), QCar2(i))
  }
  return arr;
};

export default output;
