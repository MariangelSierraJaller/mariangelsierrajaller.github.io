import fs from "node:fs";
import path from "node:path";
import { promisify } from "node:util";
import { brotliCompress, gzip } from "node:zlib";
import { pathToFileURL } from "node:url";
import { buildLlmsTxt } from "./llms.ts";
import { buildPageDatesJson } from "./page-dates.ts";

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);

function walkFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function renderRootRedirectHtml(siteUrl: string): string {
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title data-head="title">Mariangel Sierra Jaller — Portafolio Bilingüe</title>
  <meta data-head="description" name="description" content="Portafolio bilingüe de Mariangel Johanna Sierra Jaller: Ingeniería Industrial y de Sistemas, Gestión Financiera, Oracle NetSuite, Python y Power BI." />
  <link data-head="canonical" rel="canonical" href="${siteUrl}/es" />
  <link rel="alternate" hreflang="es-CO" href="${siteUrl}/es" />
  <link rel="alternate" hreflang="en-US" href="${siteUrl}/en" />
  <link rel="alternate" hreflang="x-default" href="${siteUrl}/es" />
  <meta http-equiv="refresh" content="0; url=/es" />
  <script>
    (function () {
      try {
        var saved = localStorage.getItem("portfolio.lang");
        var nav = (navigator.language || "es").toLowerCase();
        var lang = saved === "en" || saved === "es" ? saved : nav.startsWith("en") ? "en" : "es";
        location.replace("/" + lang + location.search + location.hash);
      } catch (e) {
        location.replace("/es");
      }
    })();
  </script>
</head>
<body style="background:#131622;color:#f0f7ff;font-family:system-ui,sans-serif;padding:2rem;">
  <p>Redirigiendo a <a href="/es" style="color:#5ca3ff;">Español (/es)</a> · <a href="/en" style="color:#5ca3ff;">English (/en)</a></p>
</body>
</html>
`;
}

export async function runPostbuild(rootDir: string): Promise<void> {
  const distDir = path.resolve(rootDir, "dist");
  const distSsrDir = path.resolve(rootDir, "dist-ssr");
  const buildDataModuleUrl = pathToFileURL(path.resolve(distSsrDir, "build-data.mjs")).href;

  const data = await import(buildDataModuleUrl);
  const routes: string[] = data.prerenderRoutes();

  for (const r of routes) {
    const htmlPath = path.resolve(distDir, r, "index.html");
    if (!fs.existsSync(htmlPath)) {
      throw new Error(`Missing prerendered HTML for route /${r}: ${htmlPath}`);
    }
    const html = fs.readFileSync(htmlPath, "utf8");
    const requiredMarkers = [
      'data-head="title"',
      'data-head="description"',
      'data-head="canonical"',
      'hreflang="x-default"',
      'data-head="jsonld"',
    ];
    for (const marker of requiredMarkers) {
      if (!html.includes(marker)) {
        throw new Error(`Route /${r} HTML is missing required SEO marker: ${marker}`);
      }
    }
  }

  fs.writeFileSync(
    path.resolve(distDir, "index.html"),
    renderRootRedirectHtml(data.SITE_URL),
    "utf8",
  );
  fs.writeFileSync(path.resolve(distDir, "sitemap.xml"), data.buildSitemapXml(), "utf8");
  fs.writeFileSync(path.resolve(distDir, "robots.txt"), data.buildRobotsTxt(), "utf8");
  fs.writeFileSync(
    path.resolve(distDir, "llms.txt"),
    buildLlmsTxt({
      siteUrl: data.SITE_URL,
      buildDate: data.BUILD_DATE,
      fullName: data.PROFILE.fullName,
      email: data.SITE.email,
      linkedin: data.SITE.linkedinUrl,
      github: data.SITE.githubUrl,
      routes,
    }),
    "utf8",
  );
  fs.writeFileSync(
    path.resolve(distDir, "page-dates.json"),
    buildPageDatesJson(routes, data.BUILD_DATE),
    "utf8",
  );

  if (fs.existsSync(distSsrDir)) {
    fs.rmSync(distSsrDir, { recursive: true, force: true });
  }

  const compressibleExt = new Set([".html", ".css", ".js", ".mjs", ".svg", ".xml", ".txt", ".json"]);
  const allFiles = walkFiles(distDir);
  for (const file of allFiles) {
    const ext = path.extname(file).toLowerCase();
    if (!compressibleExt.has(ext)) continue;
    const buf = fs.readFileSync(file);
    if (buf.length < 512) continue;
    const [gz, br] = await Promise.all([gzipAsync(buf), brotliAsync(buf)]);
    fs.writeFileSync(`${file}.gz`, gz);
    fs.writeFileSync(`${file}.br`, br);
  }

  console.log(`Postbuild complete: verified ${routes.length} routes + wrote sitemap, robots, llms.txt, page-dates.json, and precompressed assets.`);
}
