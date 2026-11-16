import { describe, expect, it } from "vitest";
import {
  buildDetailIndexPath,
  buildDetailItemPath,
  buildHomePath,
  buildProjectPath,
  buildProjectsIndexPath,
  parseRoute,
  prerenderRoutes,
  switchLangPath,
} from "./paths";

describe("route parsing and URL helpers", () => {
  it("generates all 56 static prerender routes", () => {
    const routes = prerenderRoutes();
    expect(routes.length).toBe(56);
    expect(new Set(routes).size).toBe(56);
    expect(routes).toContain("es");
    expect(routes).toContain("en");
    expect(routes).toContain("es/admin");
    expect(routes).toContain("en/tech");
    expect(routes).toContain("es/projects");
    expect(routes).toContain("en/projects/pipeline-etl-oracle-netsuite-bi");
    expect(routes).toContain("es/experience/aspaen-operaciones-analitica");
    expect(routes).toContain("en/education/ingenieria-biomedica-itm");
    expect(routes).toContain("es/education/tecnologia-sistemas-san-jose");
    expect(routes).toContain("es/certifications/analitica-datos-crisp-dm");
  });

  it("parses home, role, project, detail, and 404 paths correctly", () => {
    expect(parseRoute("/es")).toEqual({ kind: "home", lang: "es", role: "general" });
    expect(parseRoute("/en/admin")).toEqual({ kind: "home", lang: "en", role: "admin" });
    expect(parseRoute("/es/tech/")).toEqual({ kind: "home", lang: "es", role: "tech" });

    expect(parseRoute("/es/projects", "?from=tech")).toEqual({
      kind: "projectsIndex",
      lang: "es",
      role: "tech",
    });

    expect(parseRoute("/en/projects/pipeline-etl-oracle-netsuite-bi", "?from=tech")).toEqual({
      kind: "projectDetail",
      lang: "en",
      role: "tech",
      slug: "pipeline-etl-oracle-netsuite-bi",
      projectId: "netsuiteEtlPipeline",
    });

    expect(parseRoute("/es/experience")).toEqual({
      kind: "detailIndex",
      lang: "es",
      role: "general",
      collection: "experience",
    });

    expect(parseRoute("/en/certifications/business-intelligence-power-bi-dax")).toEqual({
      kind: "detailItem",
      lang: "en",
      role: "general",
      collection: "certifications",
      slug: "business-intelligence-power-bi-dax",
      itemId: "powerBiAnalytics",
    });

    expect(parseRoute("/fr/unknown").kind).toBe("notFound");
    expect(parseRoute("/es/projects/non-existent").kind).toBe("notFound");
  });

  it("builds canonical home and detail paths", () => {
    expect(buildHomePath("es", "general")).toBe("/es");
    expect(buildHomePath("en", "admin", "about")).toBe("/en/admin#about");
    expect(buildProjectsIndexPath("es", "tech", true)).toBe("/es/projects?from=tech&locked=true");
    expect(buildProjectPath("en", "suite-ejecutiva-power-bi-finanzas")).toBe(
      "/en/projects/suite-ejecutiva-power-bi-finanzas",
    );
    expect(buildDetailIndexPath("es", "education")).toBe("/es/education");
    expect(buildDetailItemPath("en", "experience", "aspaen-operaciones-analitica", "admin")).toBe(
      "/en/experience/aspaen-operaciones-analitica?from=admin",
    );
  });

  it("switches language while preserving role, slug, from, and locked parameters", () => {
    expect(switchLangPath("/es/admin", "en", "?locked=true")).toBe("/en/admin?locked=true");
    expect(
      switchLangPath("/es/projects/pipeline-etl-oracle-netsuite-bi", "en", "?from=tech&locked=true"),
    ).toBe("/en/projects/pipeline-etl-oracle-netsuite-bi?from=tech&locked=true");
    expect(
      switchLangPath("/en/education/ingenieria-sistemas-san-jose", "es", "?from=admin"),
    ).toBe("/es/education/ingenieria-sistemas-san-jose?from=admin");
  });
});
