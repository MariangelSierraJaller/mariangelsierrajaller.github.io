import type { HeroRoleCopy, HighlightCard, RoleId } from "@/types/content";

export const ES_HERO: Record<RoleId, HeroRoleCopy> = {
  general: {
    badge: "Perfil Profesional Convergente · Medellín, Colombia",
    headline: "Convergencia entre gestión de operaciones, finanzas corporativas y",
    accentWord: "analítica de datos",
    titleLine: "Ingeniería de Sistemas · Ingeniería Industrial · Operaciones ERP",
    subtitle:
      "Transformo flujos operativos, compras y tesorería en sistemas auditables y cuadros de mando interactivos con Oracle NetSuite, Python y Power BI.",
    primaryCta: "Contáctame",
    secondaryCta: "Ver proyectos",
    tertiaryCta: "Ver currículum",
  },
  admin: {
    badge: "Gestión Administrativa, Compras y Tesorería",
    headline: "Eficiencia operativa, control financiero y rigor en cada",
    accentWord: "proceso empresarial",
    titleLine: "Especialista en Compras, Tesorería y ERP Oracle NetSuite",
    subtitle:
      "Administración integral del ciclo de abastecimiento, facturación electrónica, tesorería corporativa y cumplimiento de auditorías con cero discrepancias.",
    primaryCta: "Iniciar conversación",
    secondaryCta: "Servicios administrativos",
    tertiaryCta: "Descargar CV Administrativo",
  },
  tech: {
    badge: "Ingeniería de Sistemas y Analítica de Datos",
    headline: "Extracción, pipelines automatizados y cuadros de mando de",
    accentWord: "inteligencia de negocios",
    titleLine: "Analista de Datos · Automatización Python · Power BI & SQL",
    subtitle:
      "Diseño e implemento flujos ETL en Python, modelos relacionales y tableros ejecutivos en Power BI conectados directamente a fuentes ERP.",
    primaryCta: "Explorar proyectos",
    secondaryCta: "Ver arquitectura técnica",
    tertiaryCta: "Descargar CV Técnico",
  },
};

export const ES_HIGHLIGHTS: Record<RoleId, readonly HighlightCard[]> = {
  general: [
    {
      id: "experience",
      value: "4+ Años",
      label: "Experiencia Práctica",
      hint: "Operaciones continuas en ASPAEN desde febrero de 2022",
    },
    {
      id: "engineerings",
      value: "3",
      label: "Ingenierías en Curso",
      hint: "Sistemas, Industrial y Biomédica (San José & ITM)",
    },
    {
      id: "erp-analytics",
      value: "ERP + BI",
      label: "NetSuite, Python & Power BI",
      hint: "Automatización de datos (ETL) y control de tesorería",
    },
    {
      id: "english",
      value: "B2",
      label: "Inglés Profesional",
      hint: "Comunicación fluida para entornos colaborativos y técnicos",
    },
  ],
  admin: [
    {
      id: "admin-exp",
      value: "4+ Años",
      label: "Gestión Operativa",
      hint: "Liderando compras, tesorería y arqueos corporativos",
    },
    {
      id: "reconciliation",
      value: "100%",
      label: "Trazabilidad y Control",
      hint: "Conciliaciones bancarias y auditorías sin desviaciones",
    },
    {
      id: "netsuite-admin",
      value: "Oracle ERP",
      label: "NetSuite & Facturación",
      hint: "Órdenes de compra, inventarios y cajas menores",
    },
    {
      id: "industrial-eng",
      value: "Ing. Industrial",
      label: "Formación en Curso",
      hint: "Optimización de procesos y cadena de suministro",
    },
  ],
  tech: [
    {
      id: "etl-reduction",
      value: "85%+",
      label: "Reducción de Tiempo ETL",
      hint: "Scripts Python que reemplazan consolidaciones manuales",
    },
    {
      id: "tech-stack",
      value: "Python & DAX",
      label: "Stack de Analítica",
      hint: "Pandas, Power Query, SQL y Oracle NetSuite XML/JSON",
    },
    {
      id: "tech-engineerings",
      value: "2 Ingenierías TI",
      label: "Sistemas & Biomédica",
      hint: "Fundación Universidad San José e Institución ITM",
    },
    {
      id: "crisp-dm",
      value: "CRISP-DM",
      label: "Metodología Analítica",
      hint: "De la comprensión del negocio al despliegue de modelos",
    },
  ],
};
