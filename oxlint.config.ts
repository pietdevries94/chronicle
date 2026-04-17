import { defineConfig } from "oxlint";

export default defineConfig({
  options: {
    denyWarnings: true,
    reportUnusedDisableDirectives: "warn",
    typeAware: true,
    typeCheck: true,
  },
  plugins: ["eslint", "import", "oxc", "promise", "react", "typescript", "unicorn"],
  categories: {
    correctness: "warn",
    pedantic: "warn",
    perf: "warn",
    style: "warn",
    suspicious: "warn",
  },
  rules: {
    // Not needed with React 17+
    "max-lines-per-function": "off",
    "react/react-in-jsx-scope": "off",

    // Changed to make sense for our codebase
    "unicorn/filename-case": [
      "warn",
      {
        cases: {
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    "import/no-unassigned-import": ["warn", { allow: ["**/*.css"] }],
    "eslint/no-duplicate-imports": ["warn", { allowSeparateTypeImports: true }],

    // Off (for now)
    "react/jsx-max-depth": "off",
    "sort-imports": "off",
    "no-magic-numbers": "off",
    "id-length": "off",
    "func-style": "off",
    "no-ternary": "off",
    "import/no-named-export": "off",
    "import/group-exports": "off",
    "import/prefer-default-export": "off",
    "sort-keys": "off",
    "react/jsx-props-no-spreading": "off",
    curly: "off",
  },
  overrides: [
    {
      files: ["**/*.{spec,test}.{ts,tsx}"],
      plugins: ["vitest"],
    },
  ],
});
