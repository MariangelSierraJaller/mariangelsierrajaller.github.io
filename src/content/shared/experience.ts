import type { ExperienceId, ExperienceShared, Lang } from "@/types/content";

export const EXPERIENCE_ORDER: readonly ExperienceId[] = ["aspaen", "aspaenInternship"];

export const EXPERIENCE_SHARED: Record<ExperienceId, ExperienceShared> = {
  aspaen: {
    id: "aspaen",
    slug: "aspaen-operaciones-analitica",
    company: "Asociación para la Enseñanza — ASPAEN",
    start: "2023-01",
    end: null,
    current: true,
    location: "Medellín, Antioquia, Colombia",
    modality: "on-site",
    stack: [
      "Oracle NetSuite",
      "Python",
      "Pandas",
      "Power BI",
      "SQL",
      "Excel Avanzado",
      "XML / JSON",
      "Tesorería",
      "Compras e Inventarios",
      "Auditoría",
    ],
    stackByLang: {
      es: [
        "Oracle NetSuite",
        "Python",
        "Pandas",
        "Power BI",
        "SQL",
        "Excel Avanzado",
        "XML / JSON",
        "Tesorería",
        "Compras e Inventarios",
        "Auditoría",
      ],
      en: [
        "Oracle NetSuite",
        "Python",
        "Pandas",
        "Power BI",
        "SQL",
        "Advanced Excel",
        "XML / JSON",
        "Treasury",
        "Procurement & Inventory",
        "Internal Audit",
      ],
    },
  },
  aspaenInternship: {
    id: "aspaenInternship",
    slug: "aspaen-practica-contable-integracion",
    company: "Asociación para la Enseñanza — ASPAEN",
    start: "2022-02",
    end: "2023-01",
    current: false,
    location: "Medellín, Antioquia, Colombia",
    modality: "on-site",
    stack: [
      "Oracle NetSuite",
      "Facturación Electrónica",
      "Contabilidad",
      "Caja Menor",
      "Trazabilidad Documental",
      "Excel",
      "Digitalización",
      "Logística",
    ],
    stackByLang: {
      es: [
        "Oracle NetSuite",
        "Facturación Electrónica",
        "Contabilidad",
        "Caja Menor",
        "Trazabilidad Documental",
        "Excel",
        "Digitalización",
        "Logística",
      ],
      en: [
        "Oracle NetSuite",
        "Electronic Invoicing",
        "Accounting",
        "Petty Cash",
        "Document Traceability",
        "Excel",
        "Digitalization",
        "Logistics",
      ],
    },
  },
};

export function getExperienceStack(id: ExperienceId, lang: Lang): readonly string[] {
  const item = EXPERIENCE_SHARED[id];
  return item.stackByLang?.[lang] ?? item.stack;
}
