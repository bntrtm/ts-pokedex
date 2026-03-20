import love from "eslint-config-love";

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
    rules: {
      "no-console": "off",
      "object-shorthand": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/prefer-destructuring": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "off",
    },
  },
];
