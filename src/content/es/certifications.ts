import type { CertificationsSectionCopy } from "@/types/content";

export const ES_CERTIFICATIONS: CertificationsSectionCopy = {
  eyebrow: "Acreditaciones y Aprendizaje",
  title: "Certificaciones Profesionales",
  subtitle:
    "Validación formal de competencias técnicas en analítica de datos, ERP, automatización y gestión ágil.",
  issuerLabel: "Entidad emisora",
  yearLabel: "Año de obtención",
  viewDetailLabel: "Ver credencial detallada",
  viewAllLabel: "Ver todas las certificaciones",
  items: {
    googleDataAnalytics: {
      id: "googleDataAnalytics",
      title: "Analítica de Datos & Metodología CRISP-DM",
      summary:
        "Especialización en el ciclo analítico integral: formulación de hipótesis, recolección estructurada, limpieza de datos, análisis exploratorio y visualización orientada al negocio.",
      competencies: [
        "Metodología analítica CRISP-DM",
        "Limpieza y aseguramiento de calidad de datos",
        "Análisis exploratorio de datos (EDA)",
        "Comunicación visual de hallazgos y métricas clave",
      ],
    },
    powerBiAnalytics: {
      id: "powerBiAnalytics",
      title: "Business Intelligence · DAX & Power Query Avanzado",
      summary:
        "Dominio de modelado dimensional, optimización de flujos de ingesta en Power Query y desarrollo de medidas DAX analíticas para cuadros de mando empresariales.",
      competencies: [
        "Modelado de datos relacional en estrella",
        "Formulación analítica avanzada en DAX",
        "Transformación y limpieza con Power Query",
        "Diseño de interfaces analíticas ejecutivas",
      ],
    },
    netsuiteErpOperations: {
      id: "netsuiteErpOperations",
      title: "Operación & Integración de Procesos ERP Oracle NetSuite",
      summary:
        "Capacitación práctica en la administración de módulos de compras, facturación electrónica, tesorería, almacén y auditoría documental en la nube.",
      competencies: [
        "Gestión del ciclo de compras y facturación electrónica",
        "Control de inventarios y movimientos de almacén",
        "Búsquedas guardadas y reportes analíticos ERP",
        "Trazabilidad probatoria y pistas de auditoría",
      ],
    },
    pythonDataScience: {
      id: "pythonDataScience",
      title: "Automatización de Datos y Análisis con Python",
      summary:
        "Desarrollo de pipelines automatizados (ETL) con el ecosistema de Python para extraer, transformar y auditar datos contables y operativos masivos.",
      competencies: [
        "Scripts de automatización en Python",
        "Tratamiento de estructuras con Pandas y NumPy",
        "Procesamiento de formatos XML y JSON",
        "Detección y depuración automática de anomalías",
      ],
    },
    excelFinancialModeling: {
      id: "excelFinancialModeling",
      title: "Control Financiero & Modelado Avanzado en Excel",
      summary:
        "Construcción de modelos financieros robustos, consolidación multicuenta, tablas dinámicas avanzadas y funciones complejas para el control presupuestal.",
      competencies: [
        "Fórmulas avanzadas de búsqueda y lógica financiera",
        "Tablas y gráficos dinámicos interactivos",
        "Validación estricta y auditoría de fórmulas",
        "Consolidación y conciliación de balances",
      ],
    },
    scrumFoundations: {
      id: "scrumFoundations",
      title: "Gestión Ágil de Procesos & Metodología Scrum",
      summary:
        "Fundamentos de marcos de trabajo ágiles aplicados a proyectos de optimización administrativa, mejora continua y desarrollo de software iterativo.",
      competencies: [
        "Marcos ágiles (Scrum & tableros Kanban)",
        "Gestión de historias de usuario y backlogs",
        "Rituales ágiles, sprints y retrospectivas",
        "Facilitación y trabajo en equipo multidisciplinario",
      ],
    },
  },
};
