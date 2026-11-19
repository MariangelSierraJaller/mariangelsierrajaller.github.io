import type { ResumeSectionCopy } from "@/types/content";

export const ES_RESUME: ResumeSectionCopy = {
  eyebrow: "Currículum y Perfiles",
  title: "Hoja de Vida Profesional",
  subtitle:
    "Descarga la versión adaptada a tus requerimientos: gestión operativa, analítica de datos o formato ATS generado desde Markdown en OhMyCV.",
  downloadLocalCta: "Descargar PDF directo",
  viewDriveCta: "Abrir en Google Drive",
  recommendedLabel: "Recomendado para esta vista",
  variants: {
    admin: {
      id: "admin",
      label: "Administrativo y Financiero",
      badge: "Operaciones y Finanzas",
      description:
        "Hoja de vida de una página en formato ATS orientada a coordinación de compras, tesorería, control interno y operación de Oracle NetSuite.",
      highlights: [
        "4+ años continuos en ASPAEN liderando compras (1.200+ OC, -65% tiempo de trámite) y 99.4% de exactitud en inventario",
        "Cierre de conciliaciones bancarias reducido de 4 días a 4 horas sobre 4 cuentas y 3.500+ movimientos mensuales",
        "Validación tributaria de facturación electrónica DIAN (CUFE/XML) y auditorías con 0 hallazgos negativos",
        "Ingeniera Industrial e Ingeniera de Sistemas (10 Sep 2026) + Ingeniería Biomédica ITM en curso",
      ],
      previewAlt:
        "Vista previa de la hoja de vida administrativa y financiera en formato ATS de Mariangel Sierra Jaller",
    },
    tech: {
      id: "tech",
      label: "Tecnológico y Analítica de Datos",
      badge: "Datos y Automatización",
      description:
        "Hoja de vida de una página en formato ATS orientada a analítica de datos, pipelines ETL en Python, Power BI (DAX) y soporte ERP.",
      highlights: [
        "Pipelines ETL en Python (Pandas) desde Oracle NetSuite (XML/JSON) que redujeron reportes de 12 h/sem a 45 min (-92%)",
        "Modelado estrella en Power BI con medidas DAX (DATESYTD) y RLS para 12 sedes y centros de costo",
        "Consultas SQL de auditoría (matching de 3 vías) e integraciones API/Zapier con 0 errores de digitación",
        "Ingeniera de Sistemas y Tecnóloga en Sistemas (San José, 10 Sep 2026) + Ingeniería Biomédica ITM en curso",
      ],
      previewAlt:
        "Vista previa de la hoja de vida tecnológica y de analítica en formato ATS de Mariangel Sierra Jaller",
    },
    ats: {
      id: "ats",
      label: "Formato ATS",
      badge: "OhMyCV · Una Columna",
      description:
        "Currículum estándar de una página redactado en Markdown compatible con OhMyCV y renderizado en una sola columna para filtros ATS globales.",
      highlights: [
        "Jerarquía lineal de una sola columna sin tablas, barras de nivel, fotos ni íconos que rompan el parseo",
        "Bullets redactados con fórmula Google XYZ y métricas verificables en ERP, Python, Power BI, SQL y finanzas",
        "Parseable por Workday, Greenhouse, Taleo y BambooHR con enlaces clicables a LinkedIn, GitHub y portafolio",
        "Incluye proyectos técnicos, 6 certificaciones, 7 credenciales académicas y 4 idiomas (ES/EN B2/FR/KO)",
      ],
      previewAlt:
        "Vista previa de la hoja de vida estándar en formato ATS de Mariangel Sierra Jaller",
    },
  },
};
