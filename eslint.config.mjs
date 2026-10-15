import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import clerkNext from "@clerk/eslint-plugin/next";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: { "@clerk/next": clerkNext },
    rules: {
      "@clerk/next/require-auth-protection": [
        "error",
        {
          protected: [
            "app/(protected)/**",
            "app/upload/**",
            "app/summaries/**",
            "app/api/**",
            "actions/**",
          ],
          public: ["app/sign-in/**", "app/sign-up/**"],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;