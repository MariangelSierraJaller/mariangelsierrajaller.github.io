import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { EN_CERTIFICATIONS } from "./en/certifications";
import { ES_METRICS } from "./es/metrics";
import { EN_METRICS } from "./en/metrics";
import { ES_CASE_STUDIES } from "./case-studies/es";
import {
  parseOhMyCvMarkdown,
  validateOhMyCvAts,
} from "../../scripts/lib/ohmycv-parser.mjs";
import {
  buildResumePdfBuffer,
  buildResumePreviewSvg,
  buildResumePreviewWebpBuffer,
} from "../../scripts/render-resumes.mjs";

const rootDir = path.resolve(__dirname, "../..");
const resumesDir = path.resolve(rootDir, "resumes");

describe("OhMyCV ATS Markdown resumes and rendering pipeline", () => {
  it("validates all 6 bilingual OhMyCV Markdown files for ATS structure and XYZ metrics", async () => {
    const langs = ["es", "en"] as const;
    const variants = ["admin", "tech", "ats"] as const;

    for (const lang of langs) {
      for (const variant of variants) {
        const fileName = `cv-mariangel-sierra-${lang}-${variant}.md`;
        const filePath = path.resolve(resumesDir, fileName);
        expect(fs.existsSync(filePath)).toBe(true);

        const md = fs.readFileSync(filePath, "utf8");
        const parsed = validateOhMyCvAts(md, fileName);

        expect(parsed.name).toBe("Mariangel Johanna Sierra Jaller");
        expect(parsed.contactItems.length).toBeGreaterThanOrEqual(5);

        const pdfBuffer = await buildResumePdfBuffer(parsed, fileName);
        expect(pdfBuffer.subarray(0, 5).toString("latin1")).toBe("%PDF-");
        expect(pdfBuffer.length).toBeGreaterThan(3000);

        const svg = buildResumePreviewSvg(parsed);
        expect(svg).toContain('width="816"');
        expect(svg).toContain('height="1056"');
        expect(svg).toContain('xml:space="preserve"');

        const webpBuffer = await buildResumePreviewWebpBuffer(parsed);
        expect(webpBuffer.subarray(0, 4).toString("ascii")).toBe("RIFF");
        expect(webpBuffer.length).toBeGreaterThan(40000);
      }
    }
  }, 20000);

  it("rejects ATS-hostile elements, weak bullet starters, clichés, and missing metrics", () => {
    const baseValid = `# Jane Doe

Data Analyst

Medellin | jane@example.com

## Summary

Analyst with 3 years of SQL and Python experience.

## Experience

### Analyst
**Corp** | Medellin \\hfill 2023 – Present

- Automated 5 SQL pipelines reducing closing time by 40%.
- Built 3 Power BI dashboards tracking 12 KPIs across teams.
- Audited 200 monthly invoices with 0 errors.
- Reconciled 4 bank accounts saving 10 hours monthly.
- Standardized 15 procurement workflows in NetSuite.
- Trained 8 staff members cutting onboarding by 25%.

## Projects

- **ETL:** Cut runtime by 50%.

## Education

- **B.S.** | University \\hfill 2020 – 2024

## Skills

- **Tech:** Python, SQL, Power BI.
`;

    expect(() => validateOhMyCvAts(baseValid, "valid.md")).not.toThrow();

    expect(() =>
      validateOhMyCvAts(baseValid.replace("Data Analyst", "<table><tr><td>Data</td></tr></table>")),
    ).toThrow(/HTML layout tags/);

    expect(() =>
      validateOhMyCvAts(baseValid.replace("Data Analyst", "Data Analyst 🚀")),
    ).toThrow(/emoji/);

    expect(() =>
      validateOhMyCvAts(baseValid.replace("Automated 5 SQL", "Responsable de 5 SQL")),
    ).toThrow(/weak bullet starter/);

    expect(() =>
      validateOhMyCvAts(baseValid.replace("Trained 8 staff members cutting onboarding by 25%.", "Trained staff members on onboarding.")),
    ).toThrow(/lacks measurable number/);

    expect(() =>
      validateOhMyCvAts(baseValid.replace("Data Analyst", "Univesitaria")),
    ).toThrow(/banned cliché or typo/);

    const withFrontmatter = `---\nname: Jane\n---\n\n${baseValid}`;
    const parsedFm = parseOhMyCvMarkdown(withFrontmatter);
    expect(parsedFm.name).toBe("Jane Doe");
  });

  it("keeps portfolio certifications and harmonized metrics free of unverified contradictions", () => {
    expect(EN_CERTIFICATIONS.items.googleDataAnalytics.title).not.toMatch(/Google/i);
    expect(EN_CERTIFICATIONS.items.googleDataAnalytics.summary).not.toMatch(/\bR programming\b/i);
    expect(EN_CERTIFICATIONS.items.excelFinancialModeling.competencies.join(" ")).not.toMatch(
      /\bVBA\b/i,
    );

    expect(ES_METRICS.groups.operations.items.some((i) => i.value === "99.4%")).toBe(true);
    expect(ES_METRICS.groups.automation.items.some((i) => i.value === "30+ hrs")).toBe(true);
    expect(EN_METRICS.groups.automation.items.some((i) => i.value === "30+ hrs")).toBe(true);
    expect(ES_METRICS.groups.automation.items.some((i) => i.value === "50.000+")).toBe(false);

    expect(ES_CASE_STUDIES.procurementInventoryControl.seo.description).not.toMatch(
      /hospitalarios/i,
    );
  });
});
