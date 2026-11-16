import { BUILD_DATE, absoluteUrl } from "./base";
import { parseRoute, prerenderRoutes, switchLangPath } from "./paths";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function buildSitemapXml(): string {
  const routes = prerenderRoutes();
  const entries = routes.map((route) => {
    const pathname = `/${route}`;
    const parsed = parseRoute(pathname);
    const loc = absoluteUrl(pathname);
    const esHref = absoluteUrl(switchLangPath(pathname, "es"));
    const enHref = absoluteUrl(switchLangPath(pathname, "en"));
    const priority =
      parsed.kind === "home"
        ? parsed.role === "general"
          ? "1.0"
          : "0.9"
        : parsed.kind === "projectDetail" || parsed.kind === "projectsIndex"
          ? "0.85"
          : "0.75";

    return [
      "  <url>",
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${BUILD_DATE}</lastmod>`,
      `    <xhtml:link rel="alternate" hreflang="es-CO" href="${escapeXml(esHref)}" />`,
      `    <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(enHref)}" />`,
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(esHref)}" />`,
      `    <priority>${priority}</priority>`,
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

export function buildRobotsTxt(): string {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
}
