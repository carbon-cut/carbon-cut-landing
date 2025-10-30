import FormContext from "@/app/form/_layout/_formContext";
import React from "react";
export const useSubmit = () => {
  const { setReadyToSubmit } = React.useContext(FormContext);

  React.useEffect(() => {
    setReadyToSubmit(false);

    return () => {
      const id = setTimeout(() => setReadyToSubmit(true), 100);
    };
  }, []);

  return;
};
