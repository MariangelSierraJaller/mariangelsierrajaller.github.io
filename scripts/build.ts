import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as astroBuild } from "astro";
import { build as viteBuild } from "vite";
import { runPostbuild } from "./postbuild.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

function getLatestMtimeMs(dir: string, ext: string): number {
  if (!fs.existsSync(dir)) return 0;
  let latest = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isFile() && entry.name.endsWith(ext)) {
      latest = Math.max(latest, fs.statSync(full).mtimeMs);
    }
  }
  return latest;
}

function ensureGeneratedAssets(): void {
  const expectedPdf = path.resolve(rootDir, "public/cv/cv-mariangel-sierra-es-admin.pdf");
  const expectedPreview = path.resolve(rootDir, "public/cv/previews/cv-mariangel-sierra-es-admin.webp");
  const expectedOg = path.resolve(rootDir, "public/og/og-es.jpg");
  const expectedPortrait = path.resolve(rootDir, "public/images/portrait-800.webp");

  const latestMd = getLatestMtimeMs(path.resolve(rootDir, "resumes"), ".md");
  const pdfMtime = fs.existsSync(expectedPdf) ? fs.statSync(expectedPdf).mtimeMs : 0;
  const previewMtime = fs.existsSync(expectedPreview) ? fs.statSync(expectedPreview).mtimeMs : 0;

  if (
    !fs.existsSync(expectedPdf) ||
    !fs.existsSync(expectedPreview) ||
    !fs.existsSync(expectedPortrait) ||
    latestMd > pdfMtime ||
    latestMd > previewMtime
  ) {
    execFileSync(process.execPath, [path.resolve(rootDir, "scripts/render-resumes.mjs")], {
      stdio: "inherit",
    });
  }
  if (!fs.existsSync(expectedOg)) {
    execFileSync(process.execPath, [path.resolve(rootDir, "scripts/generate-og.mjs")], {
      stdio: "inherit",
    });
  }
}

async function main() {
  ensureGeneratedAssets();

  await astroBuild({ root: rootDir });

  const siteUrl = (process.env.SITE_URL || "https://mariangelsierrajaller.github.io").replace(/\/+$/, "");
  const buildDate = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);

  await viteBuild({
    root: rootDir,
    logLevel: "warn",
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "src"),
      },
    },
    define: {
      __BUILD_DATE__: JSON.stringify(buildDate),
      __SITE_URL__: JSON.stringify(siteUrl),
      __APP_VERSION__: JSON.stringify("2.0.0"),
    },
    build: {
      outDir: path.resolve(rootDir, "dist-ssr"),
      emptyOutDir: true,
      ssr: path.resolve(rootDir, "src/build-data.ts"),
      rollupOptions: {
        output: {
          format: "es",
          entryFileNames: "build-data.mjs",
        },
      },
    },
  });

  await runPostbuild(rootDir);
}

await main();
