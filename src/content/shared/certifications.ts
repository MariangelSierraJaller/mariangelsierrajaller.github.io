import type { CertificationId, CertificationShared } from "@/types/content";

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
    year: "2024",
    focus: "tech",
  },
  powerBiAnalytics: {
    id: "powerBiAnalytics",
    slug: "business-intelligence-power-bi-dax",
    issuer: "Especialización BI · DAX & Power Query",
    year: "2024",
    focus: "both",
  },
  netsuiteErpOperations: {
    id: "netsuiteErpOperations",
    slug: "gestion-operativa-erp-oracle-netsuite",
    issuer: "Operación & Integración ERP NetSuite",
    year: "2024",
    focus: "both",
  },
  pythonDataScience: {
    id: "pythonDataScience",
    slug: "python-pandas-etl-automatizacion",
    issuer: "Automatización de Datos con Python",
    year: "2024",
    focus: "tech",
  },
  excelFinancialModeling: {
    id: "excelFinancialModeling",
    slug: "excel-avanzado-consolidacion-financiera",
    issuer: "Control Financiero & Modelado Excel",
    year: "2023",
    focus: "admin",
  },
  scrumFoundations: {
    id: "scrumFoundations",
    slug: "gestion-agil-procesos-proyectos",
    issuer: "Metodologías Ágiles & Mejora Continua",
    year: "2023",
    focus: "both",
  },
};
