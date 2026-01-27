import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
    rules: { "no-unused-vars": "warn" },
    languageOptions: { globals: globals.browser }
  },
  { files: ["**/*.js"],
    languageOptions: { sourceType: "script" }
  },
]);
