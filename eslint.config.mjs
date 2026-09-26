import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  // eslint-plugin-react's "detect" calls context.getFilename(), which ESLint 10 removed.
  // Keep this in sync with the installed react version.
  { settings: { react: { version: "19.3" } } },
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts"])
]);
