// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  "rules": {
    "@typescript-eslint/no-unused-vars": [
      "error",
      { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    '@typescript-eslint/no-empty-object-type': "off",
    "@typescript-eslint/no-explicit-any" : "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react-hooks/rules-of-hooks": "off"
  }
}, ...storybook.configs["flat/recommended"], ...storybook.configs["flat/recommended"]];

export default eslintConfig;
