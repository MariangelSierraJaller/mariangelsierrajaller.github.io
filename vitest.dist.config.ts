import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.SITE_URL || "https://mariangelsierrajaller.github.io").replace(/\/+$/, "");
const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    __BUILD_DATE__: JSON.stringify(BUILD_DATE),
    __SITE_URL__: JSON.stringify(SITE_URL),
    __APP_VERSION__: JSON.stringify("2.0.0"),
  },
  test: {
    environment: "node",
    globals: true,
    include: ["tests/build/**/*.{test,spec}.ts"],
  },
});
