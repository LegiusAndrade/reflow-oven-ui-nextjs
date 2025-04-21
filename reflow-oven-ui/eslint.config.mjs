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
      ident: ["error", 2],
      "linebreak-style": ["error", "unix"],
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": [
          ["/^react/", "/^next/", "/@next/"],
          "/components/",
          "/module/",
          "/^@shared/",
          "/absolute/",
          ["parent", "sibling", "index"]
        ],
        "alphabetize": { "order": "asc", "ignoreCase": true }
      }
    ],
    }
  }),
];

export default eslintConfig;
