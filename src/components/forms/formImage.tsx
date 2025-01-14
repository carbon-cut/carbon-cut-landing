"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/forms";
import { FileUploader } from "../file-uploader";
import { useMutation } from "@tanstack/react-query";
import { useUser } from "@/hooks/contexts/useUser";

const schema = z.object({
  image: z.array(z.instanceof(File)),
});

type Schema = z.infer<typeof schema>;

export function ReactHookFormImage() {
  const { setCurrentUser } = useUser();
  const [progress, setProgress] = React.useState<number>(0);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      image: [],
    },
  });

  const mutation = useMutation({
    mutationFn: async (input: Schema) => {
      const formData = new FormData();
      formData.append("file", input.image[0]);
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/api/users/me/photo`,
        {
          method: "POST",
          //@ts-ignore
          body: formData,
        },
      ).then((res) => res.json());
      if (data.error) throw new Error(data.error.message);

      return data;
    },
    onSuccess: (data) => {
      toast("Images uploaded");
      //@ts-ignore
      setCurrentUser((prev) => {
        const newU = { ...prev, avatar: data.avatar };
        localStorage.setItem("currentUser", JSON.stringify(newU));
        return newU;
      });
    },
    onError: (error) => toast(error.message),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => mutation.mutate(v))}
        className="flex w-full flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <div className="space-y-6">
              <FormItem className="w-full">
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <FileUploader
                    value={field.value}
                    onValueChange={field.onChange}
                    maxFileCount={1}
                    maxSize={4 * 1024 * 1024}
                    progresses={{ [`${field.value[0]?.name}`]: progress }}
                    // pass the onUpload function here for direct upload
                    // onUpload={uploadFiles}
                    disabled={mutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <Button className="w-fit" disabled={mutation.isPending}>
          Save
        </Button>
      </form>
    </Form>
  );
}
