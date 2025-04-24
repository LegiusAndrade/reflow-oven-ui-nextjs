import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {
  // Enforces 2 spaces for indentation
  indent: ["error", 2],

  // Enforces Unix-style line endings (\n)
  "linebreak-style": ["error", "unix"],

  // Requires semicolons at the end of statements
  "semi": ["error", "always"],

  // Enforces the use of single quotes for strings
  "quotes": ["error", "single"],

  // Prefers arrow functions over regular anonymous functions
  "prefer-arrow-callback": ["error"],

  // Prefers template literals (`Hello ${name}`) over string concatenation
  "prefer-template": ["error"],

  // Enforces organized and grouped import statements
  "import-helpers/order-imports": [
    "warn",
    {
      // Inserts a newline between each import group
      "newlinesBetween": "always",

      // Defines groups of imports (React/Next, components, modules, etc.)
      "groups": [
        ["/^react/", "/^next/", "/@next/"], // Core libraries
        "/components/",                    // Your components
        "/module/",                        // Custom modules
        "/^@shared/",                      // Shared aliases
        "/absolute/",                      // Absolute paths
        ["parent", "sibling", "index"]     // Relative imports
      ],

      // Alphabetizes imports within each group (case-insensitive)
      "alphabetize": {
        "order": "asc",
        "ignoreCase": true
      }
    }
  ],
}
  }),
];

export default eslintConfig;
