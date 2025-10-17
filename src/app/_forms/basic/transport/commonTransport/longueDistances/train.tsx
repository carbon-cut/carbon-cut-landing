import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { QuestionProps } from "../../../../types";
import Input from "../../../../components/input";

const Train = ({ mainForm }: QuestionProps) => {
  const data = [
    ...(
      mainForm.getValues("transport.commonTransport.longueDistances.train") ??
      []
    ).map((e) => ({ ...e, type: "train" })),
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Train</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>nombre de personne</TableHead>
          <TableHead>Frequency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(({ type }, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                //@ts-ignore
                name={`transport.commonTransport.longueDistances.${type}.${index}.distance`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                // @ts-ignore
                name={`transport.commonTransport.longueDistances.${type}.${index}.nbPeople`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                //@ts-ignore
                name={`transport.commonTransport.longueDistances.${type}.${index}.frequency`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Train;
