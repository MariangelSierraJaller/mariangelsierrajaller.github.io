import type { CertificationId, CertificationShared, Lang } from "@/types/content";

export const CERTIFICATION_ORDER: readonly CertificationId[] = [
  "googleDataAnalytics",
  "powerBiAnalytics",
  "netsuiteErpOperations",
  "pythonDataScience",
  "excelFinancialModeling",
  "scrumFoundations",
];

export const CERTIFICATIONS_SHARED: Record<CertificationId, CertificationShared> = {
  googleDataAnalytics: {
    id: "googleDataAnalytics",
    slug: "analitica-datos-crisp-dm",
    issuer: "Ruta de Analítica & CRISP-DM",
    issuerByLang: {
      es: "Ruta de Analítica & CRISP-DM",
      en: "Data Analytics & CRISP-DM Track",
    },
    year: "2024",
    focus: "tech",
  },
  powerBiAnalytics: {
    id: "powerBiAnalytics",
    slug: "business-intelligence-power-bi-dax",
    issuer: "Especialización BI · DAX & Power Query",
    issuerByLang: {
      es: "Especialización BI · DAX & Power Query",
      en: "BI Specialization · DAX & Power Query",
    },
    year: "2024",
    focus: "both",
  },
  netsuiteErpOperations: {
    id: "netsuiteErpOperations",
    slug: "gestion-operativa-erp-oracle-netsuite",
    issuer: "Operación & Integración ERP NetSuite",
    issuerByLang: {
      es: "Operación & Integración ERP NetSuite",
      en: "NetSuite ERP Operations & Integration",
    },
    year: "2024",
    focus: "both",
  },
  pythonDataScience: {
    id: "pythonDataScience",
    slug: "python-pandas-etl-automatizacion",
    issuer: "Automatización de Datos con Python",
    issuerByLang: {
      es: "Automatización de Datos con Python",
      en: "Data Automation with Python",
    },
    year: "2024",
    focus: "tech",
  },
  excelFinancialModeling: {
    id: "excelFinancialModeling",
    slug: "excel-avanzado-consolidacion-financiera",
    issuer: "Control Financiero & Modelado Excel",
    issuerByLang: {
      es: "Control Financiero & Modelado Excel",
      en: "Financial Control & Excel Modeling",
    },
    year: "2023",
    focus: "admin",
  },
  scrumFoundations: {
    id: "scrumFoundations",
    slug: "gestion-agil-procesos-proyectos",
    issuer: "Metodologías Ágiles & Mejora Continua",
    issuerByLang: {
      es: "Metodologías Ágiles & Mejora Continua",
      en: "Agile Methodologies & Continuous Improvement",
    },
    year: "2023",
    focus: "both",
  },
};

export function getCertificationIssuer(id: CertificationId, lang: Lang): string {
  const item = CERTIFICATIONS_SHARED[id];
  return item.issuerByLang?.[lang] ?? item.issuer;
}
