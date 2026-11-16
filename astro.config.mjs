import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import solidJs from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./package.json"), "utf8"));

const SITE_URL = (process.env.SITE_URL || "https://mariangelsierrajaller.github.io").replace(/\/+$/, "");
const BASE_PATH = (process.env.BASE_PATH || "/").replace(/\/?$/, "/");
const BUILD_DATE = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);

function solidIslands() {
  const base = solidJs();
  return {
    name: "@astrojs/solid-js",
    hooks: {
      "astro:config:setup": (options) => {
        const wrapped = {
          ...options,
          addRenderer(renderer) {
            options.addRenderer({
              ...renderer,
              clientEntrypoint: "src/islands/client.ts",
            });
          },
        };
        return base.hooks?.["astro:config:setup"]?.(wrapped);
      },
    },
  };
}

function settledDirective() {
  return {
    name: "settled-directive",
    hooks: {
      "astro:config:setup": ({ addClientDirective }) => {
        addClientDirective({
          name: "settled",
          entrypoint: "src/islands/settled.ts",
        });
      },
    },
  };
}

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: "static",
  trailingSlash: "never",
  build: {
    format: "directory",
    assets: "assets",
    inlineStylesheets: "always",
  },
  integrations: [solidIslands(), settledDirective()],
  vite: {
    plugins: [tailwindcss()],
    css: {
      transformer: "lightningcss",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __BUILD_DATE__: JSON.stringify(BUILD_DATE),
      __SITE_URL__: JSON.stringify(SITE_URL),
      __APP_VERSION__: JSON.stringify(pkg.version || "2.0.0"),
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            const normalized = id.replace(/\\/g, "/");
            if (normalized.includes("/node_modules/solid-js/")) {
              return "solid-vendor";
            }
            if (
              normalized.includes("/src/content/es/") ||
              normalized.includes("/src/content/case-studies/es.") ||
              normalized.includes("/src/content/detail-pages/es.") ||
              normalized.includes("/src/content/journey/es.") ||
              normalized.includes("/src/content/assistant/es.") ||
              normalized.includes("/src/content/project-pages/es.") ||
              normalized.includes("/src/content/project-summaries/es.")
            ) {
              return "content-es";
            }
            if (
              normalized.includes("/src/content/en/") ||
              normalized.includes("/src/content/case-studies/en.") ||
              normalized.includes("/src/content/detail-pages/en.") ||
              normalized.includes("/src/content/journey/en.") ||
              normalized.includes("/src/content/assistant/en.") ||
              normalized.includes("/src/content/project-pages/en.") ||
              normalized.includes("/src/content/project-summaries/en.")
            ) {
              return "content-en";
            }
            return undefined;
          },
        },
      },
    },
  },
});
