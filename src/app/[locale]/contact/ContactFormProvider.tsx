"use client";

import type { HTMLInputTypeAttribute, ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useScopedI18n } from "@/locales/client";
import { InventoryFieldInput } from "@/app/[locale]/collectivity/_components/fields";
import { InventoryFieldTextarea } from "@/app/[locale]/collectivity/_components/fields/InventoryFieldTextArea";
import { Form } from "@/components/ui/forms";
import type { InputIcon } from "@/components/ui/input";
import { contactSchema, type ContactFormValues } from "./_contactSchema";
import { sendContactMessage } from "./_lib/queries";

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

export function ContactWebsiteHoneypot() {
  const form = useFormContext<ContactFormValues>();

  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor="contact-website">Website</label>
      <input
        id="contact-website"
        type="text"
        autoComplete="off"
        tabIndex={-1}
        {...form.register("website")}
      />
    </div>
  );
}

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const t = useScopedI18n("(pages).contact.form");
  const mutation = useMutation({ mutationFn: sendContactMessage });
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
      website: "",
    },
    mode: "onSubmit",
  });

  const submit = form.handleSubmit(async (values) => {
    mutation.reset();
    try {
      await mutation.mutateAsync(values);
      form.reset();
    } catch {
      // The localized error state below gives the user a retry path.
    }
  });

  return (
    <Form {...form}>
      <form className="mt-6 space-y-5" noValidate onSubmit={submit} aria-busy={mutation.isPending}>
        {children}
        {mutation.isSuccess ? (
          <p role="status" className="text-sm text-brand-700">
            {t("success")}
          </p>
        ) : null}
        {mutation.isError ? (
          <p role="alert" className="text-sm text-error-600">
            {t("error")}
          </p>
        ) : null}
      </form>
    </Form>
  );
}
