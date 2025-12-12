import { QuestionProps, QuestionFC } from "@/app/_forms/types";
import QCar31 from "./qCar3-1";
import QCar32 from "./qCar3-2";

const QCar311 = (index: number) => {
  const CarComponent: QuestionFC = (props: QuestionProps) => <QCar31 {...props} index={index} />;

  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar3.title", { index: index }],
    fields: [
      `transport.cars.${index}.electricConsumption`,
      `transport.cars.${index}.thermalConsumption`,
      `transport.cars.${index}.moneyElectricConsumption`,
      `transport.cars.${index}.moneyThermalConsumption`,
      `transport.cars.${index}.electricPrice`,
      `transport.cars.${index}.thermalPrice`,
    ],
  };

  return CarComponent;
};

const QCar322 = (index: number) => {
  const CarComponent: QuestionFC = (props: QuestionProps) => <QCar32 {...props} index={index} />;

  CarComponent["Symbol"] = {
    question: ["forms.basic.transport.qCar3.title", { index: index }],
    fields: [
      `transport.cars.${index}.electricConsumption`,
      `transport.cars.${index}.moneyElectricConsumption`,
      `transport.cars.${index}.electricPrice`,
    ],
  };

  return CarComponent;
};
export { QCar311, QCar322 };
