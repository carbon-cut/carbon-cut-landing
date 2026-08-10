import React from "react";
import type { Decorator } from "@storybook/nextjs";
import { I18nProviderClient } from "@/locales/client";

const Wrapper: Decorator = (Story, context) => {
  const args = {
    ...context.args,
    params: context.args?.params ?? Promise.resolve({ locale: "fr" }),
  };

  return (
    <I18nProviderClient locale="fr">
      <Story args={args} />
    </I18nProviderClient>
  );
};

export default Wrapper;
