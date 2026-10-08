"use client";

import type { HTMLInputTypeAttribute, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { InventoryFieldInput } from "@/app/[locale]/collectivity/_components/fields";
import { InventoryFieldTextarea } from "@/app/[locale]/collectivity/_components/fields/InventoryFieldTextArea";
import { Form } from "@/components/ui/forms";
import type { InputIcon } from "@/components/ui/input";
import { contactSchema, type ContactFormValues } from "./_contactSchema";

type ContactFieldName = "name" | "email" | "topic";

export function ContactInventoryInput({
  name,
  label,
  type = "text",
  icon,
}: {
  name: ContactFieldName;
  label: string;
  type?: HTMLInputTypeAttribute;
  icon?: InputIcon;
}) {
  const form = useFormContext<ContactFormValues>();

  return (
    <InventoryFieldInput form={form} name={name} label={label} type={type} icon={icon} required />
  );
}

export function ContactInventoryTextarea({ label }: { label: string }) {
  const form = useFormContext<ContactFormValues>();

  return <InventoryFieldTextarea form={form} name="message" label={label} required />;
}

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
    mode: "onSubmit",
  });

  return <Form {...form}>{children}</Form>;
}
