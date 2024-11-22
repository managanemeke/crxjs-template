import globals from "globals";
import jsLint from "@eslint/js";
import tsLint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default [
  jsLint.configs.recommended,
  ...tsLint.configs.recommended,
  {
    plugins: {
      "@stylistic": stylistic
    },
    rules: {
      "@stylistic/indent": ["error", 2],
      "@stylistic/semi-style": ["error", "last"],
      "@stylistic/curly-newline": ["error", "always"],
      "@stylistic/eol-last": ["error", "always"],
      "quotes": [2, "double", {"avoidEscape": true}]
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      }
    }
  }
]
