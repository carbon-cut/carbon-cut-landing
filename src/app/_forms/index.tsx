"use server";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SquarePen } from "lucide-react";
import Link from "next/link";

async function getForms() {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/forms?populate=*`,
  ).then((resp) => resp.json());

  return data;
}

async function FormList() {
  const data = await getForms();

  return (
    <Card className="w-full">
      <CardHeader>
        <h2>Forms</h2>
      </CardHeader>
      <CardContent>
        {
          //@ts-ignore
          data.map((form) => (
            <div
              key={form.id}
              className="flex flex-nowrap flex-row justify-between"
            >
              <p className="text-lg">{form.title}</p>
              <Link href={`/dashboard/${form.id}`}>
                <SquarePen />
              </Link>
            </div>
          ))
        }
      </CardContent>
    </Card>
  );
}

export default FormList;
