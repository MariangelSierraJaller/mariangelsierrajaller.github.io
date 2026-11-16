import { describe, expect, it } from "vitest";
import { buildHomeHead } from "./seo";
import { buildProjectDetailHead, buildProjectsIndexHead } from "./seo-projects";
import { buildDetailIndexHead, buildDetailItemHead } from "./seo-details";
import { SITE } from "@/content/shared/site";

function parseGraph(jsonLd: string): Record<string, unknown>[] {
  const parsed = JSON.parse(jsonLd) as { "@context": string; "@graph": Record<string, unknown>[] };
  expect(parsed["@context"]).toBe("https://schema.org");
  expect(Array.isArray(parsed["@graph"])).toBe(true);
  return parsed["@graph"];
}

describe("SEO head and JSON-LD builders", () => {
  it("builds bilingual home heads with canonical domain and hreflang alternates", () => {
    const esHead = buildHomeHead("es", "general");
    expect(esHead.htmlLang).toBe("es-CO");
    expect(esHead.canonical).toBe(`${SITE.siteUrl}/es`);
    expect(esHead.alternates).toEqual({
      es: `${SITE.siteUrl}/es`,
      en: `${SITE.siteUrl}/en`,
      xDefault: `${SITE.siteUrl}/es`,
    });
    expect(esHead.ogImage).toBe(`${SITE.siteUrl}/og/og-es.jpg`);

    const enTechHead = buildHomeHead("en", "tech");
    expect(enTechHead.htmlLang).toBe("en-US");
    expect(enTechHead.canonical).toBe(`${SITE.siteUrl}/en/tech`);
    expect(enTechHead.ogImage).toBe(`${SITE.siteUrl}/og/og-en-tech.jpg`);

    const graph = parseGraph(enTechHead.jsonLd);
    expect(graph.some((node) => node["@type"] === "ProfilePage")).toBe(true);
    expect(graph.some((node) => node["@type"] === "Person")).toBe(true);
    expect(graph.some((node) => node["@type"] === "WebSite")).toBe(true);
    expect(graph.some((node) => node["@type"] === "BreadcrumbList")).toBe(true);
  });

  it("builds projects index and project detail JSON-LD heads", () => {
    const idx = buildProjectsIndexHead("es");
    expect(idx.canonical).toBe(`${SITE.siteUrl}/es/projects`);
    const idxGraph = parseGraph(idx.jsonLd);
    expect(idxGraph.some((node) => node["@type"] === "CollectionPage")).toBe(true);
    expect(idxGraph.some((node) => node["@type"] === "ItemList")).toBe(true);

    const caseStudy = buildProjectDetailHead("en", "netsuiteEtlPipeline");
    expect(caseStudy.canonical).toBe(`${SITE.siteUrl}/en/projects/pipeline-etl-oracle-netsuite-bi`);
    const csGraph = parseGraph(caseStudy.jsonLd);
    expect(csGraph.some((node) => node["@type"] === "TechArticle")).toBe(true);
  });

  it("builds detail collection index and item JSON-LD heads", () => {
    const expIndex = buildDetailIndexHead("es", "experience");
    expect(expIndex.canonical).toBe(`${SITE.siteUrl}/es/experience`);
    parseGraph(expIndex.jsonLd);

    const certItem = buildDetailItemHead("en", "certifications", "analitica-datos-crisp-dm");
    expect(certItem.canonical).toBe(`${SITE.siteUrl}/en/certifications/analitica-datos-crisp-dm`);
    const certGraph = parseGraph(certItem.jsonLd);
    expect(
      certGraph.some((node) => node["@type"] === "EducationalOccupationalCredential"),
    ).toBe(true);
  });
});
