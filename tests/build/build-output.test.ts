import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { prerenderRoutes } from "@/lib/paths";

const rootDir = path.resolve(__dirname, "../..");
const distDir = path.resolve(rootDir, "dist");

describe("dist production build artifacts", () => {
  it("contains all 54 prerendered route HTML files plus root and 404", () => {
    const routes = prerenderRoutes();
    expect(routes.length).toBe(54);

    expect(fs.existsSync(path.resolve(distDir, "index.html"))).toBe(true);
    expect(fs.existsSync(path.resolve(distDir, "404.html"))).toBe(true);

    for (const r of routes) {
      const htmlPath = path.resolve(distDir, r, "index.html");
      expect(fs.existsSync(htmlPath)).toBe(true);

      const html = fs.readFileSync(htmlPath, "utf8");
      expect(html).toContain('data-head="title"');
      expect(html).toContain('data-head="canonical"');
      expect(html).toContain('hreflang="x-default"');

      const ldMatch = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
      expect(ldMatch).not.toBeNull();
      const parsed = JSON.parse(ldMatch![1]) as { "@context": string; "@graph": unknown[] };
      expect(parsed["@context"]).toBe("https://schema.org");
      expect(parsed["@graph"].length).toBeGreaterThanOrEqual(3);

      expect(html.toLowerCase()).not.toContain("santino-essence.lovable.app");
      expect(html.toLowerCase()).not.toContain("lorem ipsum");
    }
  });

  it("contains SEO metadata files and precompressed gzip/brotli siblings", () => {
    for (const file of ["sitemap.xml", "robots.txt", "llms.txt", "page-dates.json"]) {
      const full = path.resolve(distDir, file);
      expect(fs.existsSync(full)).toBe(true);
      if (fs.statSync(full).size >= 512) {
        expect(fs.existsSync(`${full}.gz`)).toBe(true);
        expect(fs.existsSync(`${full}.br`)).toBe(true);
      }
    }

    const sitemap = fs.readFileSync(path.resolve(distDir, "sitemap.xml"), "utf8");
    expect(sitemap).toContain("https://mariangelsierrajaller.github.io/es");
    expect(sitemap).toContain("https://mariangelsierrajaller.github.io/en");
    expect(sitemap).not.toContain("santino-essence.lovable.app");
  });

  it("contains 6 resume PDFs, 12 OG JPG cards, and 5 responsive portrait variants", () => {
    for (const lang of ["es", "en"]) {
      for (const variant of ["admin", "tech", "ats"]) {
        const pdf = path.resolve(distDir, "cv", `cv-mariangel-sierra-${lang}-${variant}.pdf`);
        expect(fs.existsSync(pdf)).toBe(true);
        expect(fs.statSync(pdf).size).toBeGreaterThan(1024);
      }
    }

    const ogFiles = fs.readdirSync(path.resolve(distDir, "og")).filter((f) => f.endsWith(".jpg"));
    expect(ogFiles.length).toBe(12);

    for (const variant of [
      "portrait-400.webp",
      "portrait-400.avif",
      "portrait-800.webp",
      "portrait-800.avif",
      "portrait-800.jpg",
    ]) {
      expect(fs.existsSync(path.resolve(distDir, "images", variant))).toBe(true);
    }
  });
});
