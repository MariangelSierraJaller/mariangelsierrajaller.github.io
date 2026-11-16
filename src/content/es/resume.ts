import type { ResumeSectionCopy } from "@/types/content";

export const ES_RESUME: ResumeSectionCopy = {
  eyebrow: "Currículum y Perfiles",
  title: "Hoja de Vida Profesional",
  subtitle:
    "Descarga la versión adaptada a tus requerimientos: gestión operativa, analítica de datos o formato legible para ATS.",
  downloadLocalCta: "Descargar PDF directo",
  viewDriveCta: "Abrir en Google Drive",
  recommendedLabel: "Recomendado para esta vista",
  variants: {
    admin: {
      id: "admin",
      label: "Enfoque Administrativo y Financiero",
      badge: "Operaciones & Finanzas",
      description:
        "Currículum estructurado para cargos de coordinación de compras, tesorería, control interno y administración operativa de ERP.",
      highlights: [
        "4+ años continuos en ASPAEN liderando compras, facturación electrónica y conciliaciones",
        "Dominio avanzado de Oracle NetSuite para inventarios, cuentas por pagar y órdenes de compra",
        "Control riguroso de fondos de caja menor y preparación de expedientes para auditoría",
        "Formación universitaria en curso: Ingeniería Industrial e Ingeniería de Sistemas",
      ],
      previewAlt:
        "Vista previa del currículum vitae administrativo y financiero de Mariangel Sierra Jaller",
    },
    tech: {
      id: "tech",
      label: "Enfoque Tecnológico y Analítica de Datos",
      badge: "Datos & Automatización",
      description:
        "Currículum orientado a roles de analista de datos, especialista en automatización ETL, Power BI y soporte técnico en sistemas ERP.",
      highlights: [
        "Diseño e implementación de pipelines ETL en Python (Pandas) para conciliación contable",
        "Construcción de cuadros de mando interactivos en Power BI con medidas DAX avanzadas",
        "Consultas relacionales en SQL y procesamiento de estructuras de datos XML/JSON",
        "Doble ingeniería en curso: Ingeniería de Sistemas e Ingeniería Biomédica",
      ],
      previewAlt:
        "Vista previa del currículum vitae tecnológico y analítico de Mariangel Sierra Jaller",
    },
    ats: {
      id: "ats",
      label: "Formato Optimizado para ATS (Filtros Automáticos)",
      badge: "Lectura Automatizada",
      description:
        "Versión en texto plano estructurado de alto rendimiento, optimizada para superar sistemas de seguimiento de candidatos (ATS) de empresas globales.",
      highlights: [
        "Estructura tipográfica y jerarquía limpia libre de gráficos o columnas complejas",
        "Palabras clave estratégicas en ERP, Python, Power BI, SQL y finanzas corporativas",
        "Formato universalmente parseable por Workday, Greenhouse, Taleo y BambooHR",
        "Certificaciones y datos de contacto directos sin caracteres especiales ambiguos",
      ],
      previewAlt:
        "Vista previa del currículum vitae optimizado para ATS de Mariangel Sierra Jaller",
    },
  },
};
