import type { UiCopy, SeoCopy } from "@/types/content";

export const ES_UI: UiCopy = {
  skipToContent: "Saltar al contenido principal",
  navAriaLabel: "Navegación principal",
  brandTitle: "Mariangel Sierra Jaller",
  roleSwitcherLabel: "Seleccionar enfoque profesional",
  languageSwitcherLabel: "Cambiar idioma",
  lockedNotice: "Enfoque bloqueado para esta vista",
  navItems: {
    about: "Sobre mí",
    experience: "Experiencia",
    projects: "Proyectos",
    journey: "Línea de tiempo",
    skills: "Habilidades",
    services: "Servicios",
    certifications: "Certificaciones",
    testimonials: "Recomendaciones",
    resume: "Currículum",
    metrics: "Impacto",
    contact: "Contacto",
  },
  roleLabels: {
    general: {
      short: "Integral",
      full: "Perfil Integral",
      description: "Visión convergente entre gestión operativa, finanzas corporativas e ingeniería de software.",
    },
    admin: {
      short: "Gestión & Finanzas",
      full: "Gestión Administrativa y Financiera",
      description: "Liderazgo en compras, control de tesorería, conciliaciones, auditoría y ERP Oracle NetSuite.",
    },
    tech: {
      short: "Datos & Sistemas",
      full: "Ingeniería de Sistemas y Analítica",
      description: "Automatización de datos (ETL), pipelines en Python, modelos en Power BI y desarrollo de software.",
    },
  },
  footer: {
    tagline: "Uniendo gestión administrativa, finanzas corporativas y analítica de datos en soluciones medibles y auditables.",
    navigationTitle: "Navegación",
    rolesTitle: "Enfoques Profesionales",
    resourcesTitle: "Recursos y Vistas",
    projectsIndexLabel: "Catálogo de Proyectos",
    experienceIndexLabel: "Historial de Experiencia",
    educationIndexLabel: "Formación Académica",
    certificationsIndexLabel: "Certificaciones y Logros",
    rights: "Todos los derechos reservados.",
    builtWith: "Diseñado y desarrollado con Astro, SolidJS y Tailwind CSS.",
    updatedLabel: "Actualizado en 2026",
  },
  whatsappFloatLabel: "Conversar por WhatsApp",
  backToTopLabel: "Volver arriba",
  mobileMenuOpen: "Abrir menú de navegación",
  mobileMenuClose: "Cerrar menú de navegación",
};

export const ES_SEO: SeoCopy = {
  personJobTitle: [
    "Ingeniera de Sistemas",
    "Ingeniera Industrial",
    "Especialista en Operaciones ERP y Analítica de Datos",
  ],
  personDescription:
    "Mariangel Sierra Jaller — Profesional en gestión operativa, control financiero y analítica de datos en Medellín, Colombia. Especialista en Oracle NetSuite, Python, Power BI y optimización de procesos empresariales.",
  siteName: "Mariangel Sierra Jaller | Portafolio Profesional",
  home: {
    general: {
      title: "Mariangel Sierra Jaller | Gestión Operativa, Finanzas & Analítica de Datos",
      description:
        "Portafolio profesional de Mariangel Sierra Jaller en Medellín, Colombia. 4+ años articulando administración financiera, ERP Oracle NetSuite y analítica con Python y Power BI.",
      ogTitle: "Mariangel Sierra Jaller | Perfil Integral — Operaciones, Finanzas y Tecnología",
      ogDescription:
        "Soluciones medibles en gestión de compras, control de tesorería, flujos ETL automatizados y cuadros de mando interactivos.",
      keywords: [
        "Mariangel Sierra Jaller",
        "Oracle NetSuite",
        "Power BI",
        "Python",
        "Medellín",
        "Gestión Operativa",
        "Ingeniería de Sistemas",
        "Ingeniería Industrial",
      ],
    },
    admin: {
      title: "Mariangel Sierra Jaller | Especialista en Compras, Tesorería & ERP NetSuite",
      description:
        "Gestión integral del ciclo de adquisiciones, control de fondos de caja menor, conciliaciones bancarias multicuenta y administración de Oracle NetSuite en Medellín.",
      ogTitle: "Mariangel Sierra Jaller | Gestión Administrativa y Control Financiero",
      ogDescription:
        "Optimización de compras, facturación electrónica, auditoría y control de tesorería con cero discrepancias.",
      keywords: [
        "Gestión de Compras",
        "Tesorería",
        "Conciliaciones Bancarias",
        "Oracle NetSuite",
        "Control Interno",
        "Auditoría Contable",
        "Medellín",
      ],
    },
    tech: {
      title: "Mariangel Sierra Jaller | Analítica de Datos, Pipelines ETL & Power BI",
      description:
        "Ingeniería de Sistemas y analítica aplicada. Desarrollo de pipelines de datos en Python, modelos en estrella en DAX/Power BI y automatización de procesos ERP.",
      ogTitle: "Mariangel Sierra Jaller | Analítica de Datos, Automatización y Software",
      ogDescription:
        "Pipelines ETL, modelado dimensional, tableros ejecutivos interactivos y modernización de procesos analíticos.",
      keywords: [
        "Analista de Datos",
        "Python",
        "Pandas",
        "Power BI",
        "DAX",
        "SQL",
        "ETL",
        "Automatización",
        "CRISP-DM",
      ],
    },
  },
  projectsIndex: {
    title: "Proyectos y Casos de Estudio | Mariangel Sierra Jaller",
    description:
      "Explora los casos de estudio y proyectos de Mariangel Sierra Jaller: pipelines ETL con Oracle NetSuite, suites financieras en Power BI y control de inventarios.",
    ogTitle: "Casos de Estudio y Proyectos de Mariangel Sierra Jaller",
    ogDescription:
      "Soluciones reales con impacto medible en eficiencia operativa, reducción de tiempos y automatización de flujos contables.",
    keywords: [
      "Proyectos",
      "Casos de Estudio",
      "Oracle NetSuite",
      "Power BI",
      "Python",
      "Automatización ETL",
    ],
  },
};
