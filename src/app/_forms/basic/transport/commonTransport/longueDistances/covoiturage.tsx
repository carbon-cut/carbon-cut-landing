import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { QuestionProps } from "../../../../types";
import FormCombox from "@/components/forms/formCombox";
import { useQuery } from "@tanstack/react-query";
import FormSelect from "@/components/forms/formSelect";
import Input from "../../../../components/input";

const Covoiturage = ({ mainForm }: QuestionProps) => {
  const data =
    mainForm.getValues(
      "transport.commonTransport.longueDistances.covoiturage",
    ) ?? [];

  const { data: cars } = useQuery<{ value: string; label: string }[], Error>({
    queryKey: ["carMakes"],
    queryFn: async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/carbon-footprint/forms/cars/makes`,
        {
          headers: new Headers({ "User-Agent": "69420" }),
        },
      ).then((res) => res.json());
      return data.map((ele: any) => ({ value: ele.make, label: ele.make }));
    },
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Covoiturage</TableHead>
          <TableHead>Make</TableHead>
          <TableHead>Engine</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>personne covoituré</TableHead>
          <TableHead>Frequency</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((ele, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>
              <FormCombox
                form={mainForm}
                data={cars ?? []}
                name={`transport.commonTransport.longueDistances.covoiturage.${index}.make`}
              />
            </TableCell>
            <TableCell>
              <FormSelect
                form={mainForm}
                name={`transport.commonTransport.longueDistances.covoiturage.${index}.engine`}
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
                name={`transport.commonTransport.longueDistances.covoiturage.${index}.distance`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.commonTransport.longueDistances.covoiturage.${index}.pepole`}
              />
            </TableCell>
            <TableCell>
              <Input
                half
                type="number"
                form={mainForm}
                name={`transport.commonTransport.longueDistances.covoiturage.${index}.frequency`}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Covoiturage;
