import love from "eslint-config-love";
import tseslint from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-plugin-prettier";

export default [
  {
    ...love,
    files: ["**/*.js", "**/*.ts"],
    ignores: ["eslint.config.ts"],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.ts"],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "no-console": "off",
      "object-shorthand": "off",
      "no-magic-numbers": "off",
      "@typescript-eslint/no-magic-numbers": ["error", { ignore: [-1, 0, 1] }],
      "@typescript-eslint/prefer-destructuring": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "off",

      "prettier/prettier": "error",
    },
  },
];
