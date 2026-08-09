import { QCar1, QCar12 } from "./qCar1";
import { QuestionFC } from "../../../types";
import { QCar311 } from "./qCar3";
import QCar2 from "./qCar2";
import QCar4 from "./qCar4";

const output: (count: number, init?: number) => QuestionFC[] = (count, init = 0) => {
  const arr: QuestionFC[] = [];

  for (let i = init; i < count + init; i++) {
    arr.push(QCar1(i), QCar12(i), QCar2(i), QCar311(i), QCar4(i)); //fill(QCar1(i), QCar2(i))
  }
  return arr;
};

export default output;
