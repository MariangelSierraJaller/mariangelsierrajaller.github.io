import type { Lang, ProjectId } from "@/types/content";
import type { ProjectShared } from "@/types/project";

export const PROJECT_ORDER: readonly ProjectId[] = [
  "netsuiteEtlPipeline",
  "financialBiSuite",
  "procurementInventoryControl",
  "treasuryAuditAutomation",
  "clinicalBioengineering",
  "academicEngineeringSuite",
];

export const PROJECTS_SHARED: Record<ProjectId, ProjectShared> = {
  netsuiteEtlPipeline: {
    id: "netsuiteEtlPipeline",
    slug: "pipeline-etl-oracle-netsuite-bi",
    kind: "case-study",
    year: "2024",
    period: "2024 — Presente",
    periodByLang: { es: "2024 — Presente", en: "2024 — Present" },
    featuredIn: ["general", "tech"],
    roleAffinity: "tech",
    stack: ["Python", "Pandas", "Oracle NetSuite", "XML / JSON", "Power BI", "SQL"],
    stackByLang: {
      es: ["Python", "Pandas", "Oracle NetSuite", "XML / JSON", "Power BI", "SQL"],
      en: ["Python", "Pandas", "Oracle NetSuite", "XML / JSON", "Power BI", "SQL"],
    },
    ogImage: "/og/og-project-netsuite-etl.jpg",
  },
  financialBiSuite: {
    id: "financialBiSuite",
    slug: "suite-ejecutiva-power-bi-finanzas",
    kind: "case-study",
    year: "2024",
    period: "2023 — Presente",
    periodByLang: { es: "2023 — Presente", en: "2023 — Present" },
    featuredIn: ["tech"],
    roleAffinity: "both",
    stack: ["Power BI", "DAX", "Power Query", "SQL", "Tableau", "Excel Avanzado"],
    stackByLang: {
      es: ["Power BI", "DAX", "Power Query", "SQL", "Tableau", "Excel Avanzado"],
      en: ["Power BI", "DAX", "Power Query", "SQL", "Tableau", "Advanced Excel"],
    },
    ogImage: "/og/og-project-financial-bi.jpg",
  },
  procurementInventoryControl: {
    id: "procurementInventoryControl",
    slug: "control-compras-inventarios-erp",
    kind: "case-study",
    year: "2023",
    period: "2023 — Presente",
    periodByLang: { es: "2023 — Presente", en: "2023 — Present" },
    featuredIn: ["admin"],
    roleAffinity: "admin",
    stack: ["Oracle NetSuite", "Facturación Electrónica", "Inventarios", "Compras", "KPIs", "Excel"],
    stackByLang: {
      es: ["Oracle NetSuite", "Facturación Electrónica", "Inventarios", "Compras", "KPIs", "Excel"],
      en: ["Oracle NetSuite", "Electronic Invoicing", "Inventory", "Procurement", "KPIs", "Excel"],
    },
    ogImage: "/og/og-project-procurement-erp.jpg",
  },
  treasuryAuditAutomation: {
    id: "treasuryAuditAutomation",
    slug: "automatizacion-tesoreria-conciliacion",
    kind: "case-study",
    year: "2023",
    period: "2022 — Presente",
    periodByLang: { es: "2022 — Presente", en: "2022 — Present" },
    featuredIn: ["admin", "general"],
    roleAffinity: "both",
    stack: ["Tesorería", "Conciliaciones", "Control Interno", "Python", "Excel", "Trazabilidad"],
    stackByLang: {
      es: ["Tesorería", "Conciliaciones", "Control Interno", "Python", "Excel", "Trazabilidad"],
      en: ["Treasury", "Reconciliations", "Internal Control", "Python", "Excel", "Traceability"],
    },
    ogImage: "/og/og-project-treasury-audit.jpg",
  },
  clinicalBioengineering: {
    id: "clinicalBioengineering",
    slug: "gestion-tecnologia-biomedica-instrumentacion",
    kind: "project-page",
    year: "2025",
    period: "2023 — 2028",
    periodByLang: { es: "2023 — 2028", en: "2023 — 2028" },
    featuredIn: [],
    roleAffinity: "tech",
    stack: ["Ingeniería Biomédica", "Software Clínico", "Gestión Hospitalaria", "Compras Clínicas", "Python"],
    stackByLang: {
      es: ["Ingeniería Biomédica", "Software Clínico", "Gestión Hospitalaria", "Compras Clínicas", "Python"],
      en: ["Biomedical Engineering", "Clinical Software", "Hospital Systems", "Clinical Procurement", "Python"],
    },
    ogImage: "/og/og-project-bioengineering.jpg",
  },
  academicEngineeringSuite: {
    id: "academicEngineeringSuite",
    slug: "arquitectura-software-optimizacion-procesos",
    kind: "project-page",
    year: "2025",
    period: "2020 — 2026",
    periodByLang: { es: "2020 — 2026", en: "2020 — 2026" },
    featuredIn: [],
    roleAffinity: "both",
    stack: ["SQL", "APIs", "Zapier", "CRISP-DM", "Git", "Arquitectura de Datos"],
    stackByLang: {
      es: ["SQL", "APIs", "Zapier", "CRISP-DM", "Git", "Arquitectura de Datos"],
      en: ["SQL", "APIs", "Zapier", "CRISP-DM", "Git", "Data Architecture"],
    },
    ogImage: "/og/og-project-engineering-suite.jpg",
  },
};

export function getProjectPeriod(id: ProjectId, lang: Lang): string {
  const item = PROJECTS_SHARED[id];
  return item.periodByLang?.[lang] ?? item.period;
}

export function getProjectStack(id: ProjectId, lang: Lang): readonly string[] {
  const item = PROJECTS_SHARED[id];
  return item.stackByLang?.[lang] ?? item.stack;
}

export function getProjectBySlug(slug: string): ProjectShared | undefined {
  return Object.values(PROJECTS_SHARED).find((p) => p.slug === slug);
}
