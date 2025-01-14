import { UseFormReturn } from "react-hook-form";
import { formSchema } from "../form/formSchema";
import { z } from "zod";
export interface QuestionProps {
  setOnSubmit: React.Dispatch<React.SetStateAction<() => Promise<void>>>;
  setQuestions: React.Dispatch<React.SetStateAction<React.FC<QuestionProps>[]>>;
  mainForm: UseFormReturn<z.infer<typeof formSchema>, any, undefined>;
  currentIndex: number;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
}

export type FuelTypes =
  | "Electrique"
  | "mild Hybrid"
  | "Plug-in Hybrid"
  | "natural Gaz"
  | "Diesel"
  | "Gasoline";