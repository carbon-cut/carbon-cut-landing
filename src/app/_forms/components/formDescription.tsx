import React from "react";

function FormDescription(props: React.PropsWithChildren<{}>) {
  return <p className="text-sm text-gray-600 mb-6">{props.children}</p>;
}

export default FormDescription;
