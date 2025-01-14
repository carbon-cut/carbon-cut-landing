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

const Metro = ({ mainForm }: QuestionProps) => {
  const data =
    mainForm.getValues("transport.commonTransport.shortDistances.metro") ?? [];

  return (
    <Table className="mb-24">
      <TableHeader>
        <TableRow>
          <TableHead>Metro</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>nombre de personne</TableHead>
          <TableHead>Frequency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((ele, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.commonTransport.shortDistances.metro.${index}.distance`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.commonTransport.shortDistances.metro.${index}.nbPeople`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.commonTransport.shortDistances.metro.${index}.frequency`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Metro;
