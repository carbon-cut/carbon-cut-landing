import { UseFormReturn } from "react-hook-form";
import { formSchema } from "./formSchema";
import { z } from "zod";
import { TName } from "@/components/ui/forms";
export interface QuestionProps {
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setOnSubmit: React.Dispatch<React.SetStateAction<() => void>>;
  setQuestions: React.Dispatch<React.SetStateAction<React.FC<QuestionProps>[]>>;
  //setVerify: React.Dispatch<React.SetStateAction<() => boolean>>;
  setVerifyFields: React.Dispatch<React.SetStateAction<TName<z.infer<typeof formSchema>>[]>>;
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
  currentIndex: number;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  next: () => void;
  prev: () => void;
  prevAction: 'next' | 'prev' | null;
}

export type FuelTypes =
  | "Electrique"
  | "mild Hybrid"
  | "Plug-in Hybrid"
  | "natural Gaz"
  | "Diesel"
  | "Gasoline"
  | "other";
