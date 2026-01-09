import { QuestionProps, QuestionFC } from "../../../../types";
import QuestionCompo3 from "./qCar1-3";

const QCar13 = (index: number) => {
  const CarComponent: QuestionFC = (props: QuestionProps) => (
    <QuestionCompo3 index={index} {...props} />
  );
  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar1-3.title", { index: index }],
    fields: [`transport.cars.${index}.secondThermal`, `transport.cars.${index}.otherSecondThermal`],
  };
  CarComponent.displayName = `QCar13-${index}`;
  return CarComponent;
};

export default QCar13;
