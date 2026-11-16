import type { JourneyCopy } from "@/types/journey";

export const ES_JOURNEY: JourneyCopy = {
  eyebrow: "Ruta de Evolución & Metodología",
  title: "Mapa de Trayectoria & Convergencia",
  subtitle:
    "De la lógica de desarrollo de software y la gestión contable-operativa en ASPAEN a la triple formación en Ingeniería de Sistemas, Industrial y Biomédica.",
  tabs: {
    map: {
      label: "Líneas de Tránsito",
      description: "Estaciones clave interconectadas desde 2019 hasta la visión estratégica 2028.",
    },
    evolution: {
      label: "Épocas de Capacidad",
      description: "Maduración progresiva de competencias operativas, financieras y de ingeniería.",
    },
    focus: {
      label: "Perfil Híbrido",
      description: "Balance analítico entre rigor administrativo y solvencia tecnológica.",
    },
    horizon: {
      label: "Hitos Futuros",
      description: "Metas de consolidación profesional y liderazgo en ingeniería y salud.",
    },
  },
  lines: {
    education: {
      label: "Educación & Titulaciones",
      color: "#5ca3ff",
    },
    admin: {
      label: "Gestión Administrativa & Procesos",
      color: "#ffd166",
    },
    finance: {
      label: "Finanzas & Tesorería",
      color: "#5ce6a0",
    },
    data: {
      label: "Analítica de Datos & BI",
      color: "#b085f5",
    },
    erp: {
      label: "Ecosistema ERP & NetSuite",
      color: "#67c6f5",
    },
    biomedical: {
      label: "Ingeniería Biomédica & Salud",
      color: "#ff8a8a",
    },
  },
  nodes: [
    {
      id: "node-inem-2019",
      year: 2019,
      line: "education",
      station: "I.E. Inem José Félix de Restrepo",
      label: "Media Técnica en Informática",
      detail:
        "Bases formativas en desarrollo de algoritmos, redes y gestión básica de bases de datos relacionales.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "bachiller-informatica-inem",
      },
    },
    {
      id: "node-sena-2020",
      year: 2020,
      line: "education",
      station: "SENA — Regional Antioquia",
      label: "Técnico en Programación de Software",
      detail:
        "Especialización técnica en arquitectura de software, modelado relacional SQL, diagramas UML y ciclo de vida de desarrollo.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "tecnico-programacion-software-sena",
      },
    },
    {
      id: "node-software-patterns-2020",
      year: 2020,
      line: "data",
      station: "Arquitectura & Scripting",
      label: "Lógica Estructurada & SQL",
      detail:
        "Implementación de primeros proyectos en bases de datos normalizadas y scripts de automatización procedural.",
      link: {
        kind: "project",
        slug: "arquitectura-software-optimizacion-procesos",
      },
    },
    {
      id: "node-grad-sena-inem-2021",
      year: 2021,
      line: "education",
      station: "Graduación Doble Titulación",
      label: "Bachiller Técnico & Programadora SENA",
      detail:
        "Culminación simultánea de estudios secundarios técnicos y certificación oficial del SENA en programación.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "tecnico-programacion-software-sena",
      },
    },
    {
      id: "node-admin-proc-2021",
      year: 2021,
      line: "admin",
      station: "Estandarización de Métodos",
      label: "Mapeo de Flujos Operativos",
      detail:
        "Diseño de matrices de procedimiento y documentación de flujos operativos para soporte administrativo.",
    },
    {
      id: "node-itm-tech-2022",
      year: 2022,
      line: "education",
      station: "ITM Institución Universitaria",
      label: "Técnico Profesional Contable y Financiero",
      detail:
        "Dominio de planes contables colombianos, liquidación tributaria, nómina y preparación de estados financieros.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "tecnico-contable-financiero-itm",
      },
    },
    {
      id: "node-aspaen-intern-2022",
      year: 2022,
      line: "admin",
      station: "ASPAEN Medellín",
      label: "Práctica Administrativa y Contable",
      detail:
        "Ingreso formal al sector educativo: radicación de facturas electrónicas, digitalización documental y conciliación de cajas menores.",
      link: {
        kind: "detail",
        collection: "experience",
        slug: "aspaen-practica-contable-integracion",
      },
    },
    {
      id: "node-treasury-init-2022",
      year: 2022,
      line: "finance",
      station: "Tesorería ASPAEN",
      label: "Control de Recaudos y Cajas",
      detail:
        "Estandarización del cuadre diario de pensiones escolares y trazabilidad bancaria de recaudos masivos.",
      link: {
        kind: "project",
        slug: "automatizacion-tesoreria-conciliacion",
      },
    },
    {
      id: "node-aspaen-analyst-2023",
      year: 2023,
      line: "admin",
      station: "ASPAEN Medellín",
      label: "Asistente / Analista Administrativa & Operativa",
      detail:
        "Promoción a planta fija: gestión de compras institucionales, supervisión de inventarios, auditoría y enlace financiero.",
      link: {
        kind: "detail",
        collection: "experience",
        slug: "aspaen-operaciones-analitica",
      },
    },
    {
      id: "node-netsuite-core-2023",
      year: 2023,
      line: "erp",
      station: "Oracle NetSuite ERP",
      label: "Gestión de Compras e Inventarios",
      detail:
        "Administración integral del ciclo Procure-to-Pay, órdenes de compra, recepciones de almacén y matching de 3 vías.",
      link: {
        kind: "project",
        slug: "control-compras-inventarios-erp",
      },
    },
    {
      id: "node-treasury-auto-2023",
      year: 2023,
      line: "finance",
      station: "Auditoría Financiera",
      label: "Conciliación Bancaria Sistematizada",
      detail:
        "Reducción del tiempo de cierre de 4 días a 4 horas mediante modelos automatizados de verificación de extractos bancarios.",
      link: {
        kind: "project",
        slug: "automatizacion-tesoreria-conciliacion",
      },
    },
    {
      id: "node-sanjose-dual-2023",
      year: 2023,
      line: "education",
      station: "Fundación Universidad San José",
      label: "Ingeniería de Sistemas + Industrial",
      detail:
        "Inicio del programa de doble titulación enfocado en optimización de operaciones, investigación de operaciones y arquitectura de datos.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "ingenieria-sistemas-san-jose",
      },
    },
    {
      id: "node-itm-bio-2023",
      year: 2023,
      line: "biomedical",
      station: "ITM Institución Universitaria",
      label: "Ingeniería Biomédica",
      detail:
        "Comienzo del plan profesional en instrumentación biomédica, bioelectrónica, señales fisiológicas y tecnovigilancia hospitalaria.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "ingenieria-biomedica-itm",
      },
    },
    {
      id: "node-excel-cert-2023",
      year: 2023,
      line: "finance",
      station: "Modelado Financiero",
      label: "Excel Avanzado & Consolidación",
      detail:
        "Modelos matriciales dinámicos, tablas de amortización, proyecciones de flujo de caja y plantillas multicentro de costo.",
      link: {
        kind: "detail",
        collection: "certifications",
        slug: "excel-avanzado-consolidacion-financiera",
      },
    },
    {
      id: "node-etl-pipeline-2024",
      year: 2024,
      line: "data",
      station: "Pipeline ETL Python",
      label: "Extracción NetSuite & Transformación Pandas",
      detail:
        "Ingesta programada de Saved Searches vía XML/JSON, sanitización y normalización de transacciones para carga en SQL.",
      link: {
        kind: "project",
        slug: "pipeline-etl-oracle-netsuite-bi",
      },
    },
    {
      id: "node-bi-suite-2024",
      year: 2024,
      line: "data",
      station: "Power BI Directivo",
      label: "Suite Ejecutiva Financiera",
      detail:
        "Modelado estrella, medidas DAX avanzadas de variación presupuestal y tableros interactivos para consejo directivo de ASPAEN.",
      link: {
        kind: "project",
        slug: "suite-ejecutiva-power-bi-finanzas",
      },
    },
    {
      id: "node-netsuite-cert-2024",
      year: 2024,
      line: "erp",
      station: "Gobernanza NetSuite",
      label: "Operación & Parametrización ERP",
      detail:
        "Certificación y consolidación de competencias en planes de cuentas, centros de costos, workflows y facturación electrónica.",
      link: {
        kind: "detail",
        collection: "certifications",
        slug: "gestion-operativa-erp-oracle-netsuite",
      },
    },
    {
      id: "node-crisp-dm-2024",
      year: 2024,
      line: "data",
      station: "Analítica & CRISP-DM",
      label: "Ciclo de Vida de Analítica",
      detail:
        "Adopción de estándares rigurosos de minería de datos, formulación de hipótesis de negocio y gobernanza del dato.",
      link: {
        kind: "detail",
        collection: "certifications",
        slug: "analitica-datos-crisp-dm",
      },
    },
    {
      id: "node-clinical-tech-2025",
      year: 2025,
      line: "biomedical",
      station: "Gestión Hospitalaria ITM",
      label: "Tecnología Biomédica & Dispositivos",
      detail:
        "Integración de protocolos de metrología clínica, gestión del ciclo de vida de equipos médicos y compras clínicas especializadas.",
      link: {
        kind: "project",
        slug: "gestion-tecnologia-biomedica-instrumentacion",
      },
    },
    {
      id: "node-arch-suite-2025",
      year: 2025,
      line: "erp",
      station: "Optimización Organizacional",
      label: "Suite de Procesos & Automatización",
      detail:
        "Arquitectura de workflows interinstitucionales conectando compras, inventarios, tesorería y contabilidad en tiempo real.",
      link: {
        kind: "project",
        slug: "arquitectura-software-optimizacion-procesos",
      },
    },
    {
      id: "node-grad-sanjose-2026",
      year: 2026,
      line: "education",
      station: "Graduación Profesional",
      label: "Ing. de Sistemas + Ing. Industrial",
      detail:
        "Culminación de la doble ingeniería en Fundación Universidad San José con honores por proyectos de optimización ERP.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "ingenieria-sistemas-san-jose",
      },
    },
    {
      id: "node-ai-ops-2026",
      year: 2026,
      line: "data",
      station: "Data Lakehouse & Forecast",
      label: "Analítica Predictiva Operacional",
      detail:
        "Implementación de modelos de forecast de presupuestos y rotación de inventarios basados en series temporales.",
      link: {
        kind: "project",
        slug: "pipeline-etl-oracle-netsuite-bi",
      },
    },
    {
      id: "node-bio-signal-2027",
      year: 2027,
      line: "biomedical",
      station: "Bioinformática Clínica",
      label: "Software Médico & Algoritmia Vital",
      detail:
        "Desarrollo de módulos de procesamiento digital de señales biomédicas y conectividad de instrumentación a sistemas hospitalarios.",
      link: {
        kind: "project",
        slug: "gestion-tecnologia-biomedica-instrumentacion",
      },
    },
    {
      id: "node-grad-itm-2028",
      year: 2028,
      line: "education",
      station: "Grado Profesional ITM",
      label: "Ingeniera Biomédica Titulada",
      detail:
        "Graduación en Institución Universitaria ITM, consolidando la triple solvencia en Sistemas, Industrial y Biomédica.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "ingenieria-biomedica-itm",
      },
    },
    {
      id: "node-executive-health-2028",
      year: 2028,
      line: "biomedical",
      station: "Dirección Tecnológica en Salud",
      label: "Convergencia de Ingeniería & Salud",
      detail:
        "Liderazgo en transformación digital, gestión de activos clínicos y orquestación de sistemas de salud de alta complejidad.",
      link: {
        kind: "project",
        slug: "gestion-tecnologia-biomedica-instrumentacion",
      },
    },
  ],
  capabilityAxes: [
    { id: "operations", label: "Operaciones & Procesos" },
    { id: "finance", label: "Finanzas & Tesorería" },
    { id: "analytics", label: "Analítica de Datos & BI" },
    { id: "automation", label: "Automatización & Scripting" },
    { id: "engineering", label: "Ingeniería de Sistemas/Industrial" },
    { id: "biomedical", label: "Tecnología Biomédica & Salud" },
  ],
  epochs: [
    {
      year: "2019–2020",
      title: "Cimientos Técnicos y Lógica Algorítmica",
      scores: {
        operations: 35,
        finance: 20,
        analytics: 40,
        automation: 35,
        engineering: 45,
        biomedical: 15,
      },
    },
    {
      year: "2021–2022",
      title: "Inmersión Operativa, Contabilidad & Tesorería",
      scores: {
        operations: 70,
        finance: 75,
        analytics: 55,
        automation: 50,
        engineering: 55,
        biomedical: 25,
      },
    },
    {
      year: "2023–2024",
      title: "Especialización ERP NetSuite & Pipelines ETL",
      scores: {
        operations: 90,
        finance: 88,
        analytics: 90,
        automation: 85,
        engineering: 80,
        biomedical: 50,
      },
    },
    {
      year: "2025–2026",
      title: "Doble Titulación en Ingeniería & BI Estratégico",
      scores: {
        operations: 95,
        finance: 92,
        analytics: 96,
        automation: 92,
        engineering: 92,
        biomedical: 75,
      },
    },
    {
      year: "2027–2028",
      title: "Convergencia Bioingeniería & Liderazgo Ejecutivo",
      scores: {
        operations: 98,
        finance: 95,
        analytics: 98,
        automation: 96,
        engineering: 98,
        biomedical: 96,
      },
    },
  ],
  focusTitle: "Alineación de Competencias según el Rol",
  focusSubtitle:
    "Comparativa de intensidad y profundidad técnica según el enfoque de contratación: Administrativo, Tecnológico o Híbrido Integral.",
  focusLegend: {
    admin: "Enfoque Administrativo & Financiero",
    tech: "Enfoque Tecnológico & Analítico",
    hybrid: "Perfil Híbrido Integral (Mariangel Sierra)",
  },
  focusAxes: [
    {
      axis: "Operaciones & ERP",
      admin: 96,
      tech: 82,
      hybrid: 96,
    },
    {
      axis: "Control Financiero & Tesorería",
      admin: 94,
      tech: 70,
      hybrid: 92,
    },
    {
      axis: "Analítica de Datos & Power BI",
      admin: 76,
      tech: 96,
      hybrid: 94,
    },
    {
      axis: "Automatización & Python",
      admin: 62,
      tech: 96,
      hybrid: 92,
    },
    {
      axis: "Ingeniería de Sistemas & Procesos",
      admin: 80,
      tech: 94,
      hybrid: 93,
    },
    {
      axis: "Tecnología Biomédica & Salud",
      admin: 50,
      tech: 90,
      hybrid: 85,
    },
  ],
  horizonMilestones: [
    {
      period: "2026-Q2",
      title: "Graduación Dual en Ingeniería de Sistemas e Industrial",
      focus: "hybrid",
      description:
        "Titulación profesional en Fundación Universidad San José, consolidando la capacidad formal de optimización de operaciones y diseño de arquitectura informática corporativa.",
      outcomes: [
        "Presentación de trabajo de grado en optimización de flujos ERP y conciliación automatizada",
        "Validación formal de competencias profesionales ante el Colegio Colombiano de Ingenieros",
        "Implementación del marco CRISP-DM en proyectos de analítica presupuestal continua",
      ],
    },
    {
      period: "2026-Q4",
      title: "Ecosistema Data Lakehouse & Forecast Presupuestal Continuo",
      focus: "tech",
      description:
        "Ampliación del pipeline de datos hacia un almacenamiento analítico desacoplado con integración de modelos de series de tiempo para predicción de flujos de tesorería.",
      outcomes: [
        "Automatización integral de ingesta desde NetSuite REST/SOAP APIs a PostgreSQL/DuckDB",
        "Modelos de pronóstico de ingresos escolares con bandas de confianza superiores al 95%",
        "Reducción a cero de inconsistencias manuales entre módulos de facturación y extractos bancarios",
      ],
    },
    {
      period: "2027-Q3",
      title: "Arquitectura de Gestión Tecnológica y Metrología Hospitalaria",
      focus: "tech",
      description:
        "Desarrollo e implementación de un modelo de ciclo de vida de equipamiento clínico conectando normatividad biomédica (INVIMA) con sistemas de control de compras y activos fijos.",
      outcomes: [
        "Diseño de matriz digital de trazabilidad metrológica para equipos de soporte vital",
        "Prototipo de software de procesamiento digital de señales fisiológicas para monitorización",
        "Integración de protocolos de tecnovigilancia con la cadena de suministro hospitalaria",
      ],
    },
    {
      period: "2028-Q4",
      title: "Graduación en Ingeniería Biomédica & Liderazgo de Transformación",
      focus: "hybrid",
      description:
        "Titulación como Ingeniera Biomédica en ITM Institución Universitaria, cerrando la convergencia estratégica entre sistemas de información, eficiencia industrial y salud.",
      outcomes: [
        "Grado profesional con proyecto en ingeniería clínica e interoperabilidad hospitalaria",
        "Capacidad de liderazgo directivo en empresas de salud, aseguradoras y multinacionales tecnológicas",
        "Perfil multidisciplinario único en Colombia combinando ERP, analítica avanzada y bioingeniería",
      ],
    },
  ],
};