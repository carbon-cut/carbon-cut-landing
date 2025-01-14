import { createContext } from "react";

const FormContext = createContext<{
    tab: string;
    currentIndex: number;
    setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  }>({ tab: "", currentIndex: 0, setCurrentIndex: () => {} });

  export default FormContext