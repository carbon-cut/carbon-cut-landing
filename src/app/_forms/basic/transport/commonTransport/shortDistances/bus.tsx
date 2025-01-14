import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { QuestionProps } from "../../../../types";
import FormSelect from "@/components/forms/formSelect";
import Input from "../../../../components/input";

const Bus = ({ mainForm }: QuestionProps) => {
  const data =
    mainForm.getValues("transport.commonTransport.shortDistances.bus") ?? [];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bus</TableHead>
          <TableHead>Engine</TableHead>
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
              <FormSelect
                form={mainForm}
                //@ts-expect-error
                name={`transport.commonTransport.shortDistances.bus.${index}.carType`}
                data={[
                  { label: "Electrique", value: "Electrique" },
                  { label: "Diesel", value: "Diesel" },
                  { label: "Gasoline", value: "Gasoline" },
                  { label: "Plug-in Hybrid", value: "Plug-in Hybrid" },
                  { label: "mild Hybrid", value: "mild Hybrid" },
                  { label: "natural Gaz", value: "natural Gaz" },
                ]}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.commonTransport.shortDistances.bus.${index}.distance`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.commonTransport.shortDistances.bus.${index}.nbPeople`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.commonTransport.shortDistances.bus.${index}.frequency`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Bus;
