import type { DetailCollection } from "@/types/content";
import type {
  DetailCollectionIndexCopy,
  DetailPageCopy,
  DetailUiCopy,
} from "@/types/detail";

export const ES_DETAIL_UI: DetailUiCopy = {
  backToPortfolio: "Volver al portafolio",
  backToCollection: "Ver colección completa",
  toolsLabel: "Tecnologías y herramientas aplicadas",
  relatedProjectsTitle: "Proyectos y casos de estudio relacionados",
  viewProjectLabel: "Explorar caso de estudio",
  viewEntryLabel: "Ver detalle",
  previousLabel: "Anterior",
  nextLabel: "Siguiente",
};

export const ES_DETAIL_INDEXES: Record<DetailCollection, DetailCollectionIndexCopy> = {
  experience: {
    collection: "experience",
    lang: "es",
    eyebrow: "Trayectoria Profesional",
    title: "Experiencia Profesional",
    subtitle:
      "Evolución en ASPAEN liderando compras centralizadas, tesorería de alta precisión, conciliaciones bancarias y automatización analítica sobre Oracle NetSuite.",
    seo: {
      title: "Experiencia Profesional | Mariangel Sierra Jaller",
      description:
        "Trayectoria laboral de Mariangel Sierra Jaller en ASPAEN: gestión operativa ERP Oracle NetSuite, conciliación bancaria, control de compras y pipelines de datos.",
      keywords: [
        "Mariangel Sierra Jaller",
        "Experiencia profesional",
        "ASPAEN",
        "Oracle NetSuite",
        "Compras",
        "Tesorería",
        "Analítica",
        "Medellín",
      ],
    },
  },
  education: {
    collection: "education",
    lang: "es",
    eyebrow: "Formación Académica",
    title: "Educación y Carreras Universitarias",
    subtitle:
      "Perfil multidisciplinario articulando Ingeniería de Sistemas, Ingeniería Industrial, Ingeniería Biomédica y bases técnicas contables y de software.",
    seo: {
      title: "Educación y Formación | Mariangel Sierra Jaller",
      description:
        "Formación académica de Mariangel Sierra Jaller: Ingeniería de Sistemas e Industrial (San José), Ingeniería Biomédica (ITM), Técnico Contable y Técnico SENA.",
      keywords: [
        "Mariangel Sierra Jaller",
        "Educación",
        "Ingeniería de Sistemas",
        "Ingeniería Industrial",
        "Ingeniería Biomédica",
        "ITM",
        "Fundación Universidad San José",
        "SENA",
      ],
    },
  },
  certifications: {
    collection: "certifications",
    lang: "es",
    eyebrow: "Especializaciones y Credenciales",
    title: "Certificaciones Técnicas",
    subtitle:
      "Validación técnica en analítica bajo metodología CRISP-DM, DAX & Power BI, operación ERP Oracle NetSuite, Python ETL y agilidad de proyectos.",
    seo: {
      title: "Certificaciones Técnicas | Mariangel Sierra Jaller",
      description:
        "Certificaciones de Mariangel Sierra Jaller en Power BI DAX, Python Pandas ETL, Oracle NetSuite, CRISP-DM, Modelado Financiero y Metodologías Ágiles.",
      keywords: [
        "Certificaciones",
        "Power BI",
        "DAX",
        "Python ETL",
        "Oracle NetSuite",
        "CRISP-DM",
        "Scrum",
        "Mariangel Sierra Jaller",
      ],
    },
  },
};

export const ES_DETAIL_ITEMS: Record<string, DetailPageCopy> = {
  // ==========================================
  // EXPERIENCE (2)
  // ==========================================
  "aspaen-operaciones-analitica": {
    collection: "experience",
    slug: "aspaen-operaciones-analitica",
    id: "aspaen",
    lang: "es",
    eyebrow: "Experiencia Profesional · 2023 — Presente",
    title: "Liderazgo en Operaciones ERP, Compras y Analítica Financiera",
    subtitle:
      "Gestión centralizada de compras, conciliaciones bancarias y automatización de flujos operacionales con Oracle NetSuite, Python y Power BI en ASPAEN.",
    meta: [
      { label: "Organización", value: "Asociación para la Enseñanza — ASPAEN" },
      { label: "Periodo", value: "Enero 2023 — Presente" },
      { label: "Modalidad", value: "Presencial · Medellín, Colombia" },
      { label: "Responsabilidad", value: "Operaciones, Compras, Tesorería y Analítica" },
    ],
    overview: [
      "En ASPAEN, Mariangel lidera la operatividad administrativa, tesorería y compras centralizadas, articulando la gestión financiera con soluciones analíticas modernas.",
      "Administra el ciclo completo Procure-to-Pay dentro de Oracle NetSuite, asegurando trazabilidad fiscal, recepción conforme de bienes y servicios, validación ante la DIAN y riguroso control presupuestal de múltiples centros de costo.",
      "Diseñó e implementó scripts de automatización en Python (Pandas) y modelos en Power BI para acelerar el procesamiento de información transaccional, eliminando cuellos de botella en conciliaciones bancarias y reportes ejecutivos.",
    ],
    keyPointsTitle: "Responsabilidades y Logros Clave",
    keyPoints: [
      "Administración y parametrización operativa de flujos de compras, órdenes de servicio, proveedores e inventarios en Oracle NetSuite.",
      "Ejecución y supervisión diaria de conciliaciones bancarias multimillonarias y arqueos de tesorería con cero discrepancias no justificadas.",
      "Desarrollo de scripts en Python con Pandas para validación cruzada automatizada entre extractos bancarios y registros contables del ERP.",
      "Construcción y mantenimiento de tableros ejecutivos en Power BI con métricas de liquidez, ejecución presupuestal y tiempos de ciclo de compra.",
      "Supervisión del cumplimiento de requisitos fiscales colombianos (facturación electrónica DIAN, retenciones en la fuente) y preparación de soportes para auditoría interna y externa.",
      "Negociación estratégica con proveedores clave, logrando optimizaciones de plazos de pago y consolidación de compras institucionales.",
    ],
    outcomesTitle: "Impacto Operativo Medible",
    outcomes: [
      { metric: "85%", label: "Reducción en tiempo de conciliación bancaria mediante automatización Python/ERP" },
      { metric: "100%", label: "Trazabilidad documental y conformidad en auditorías internas y fiscales" },
      { metric: "30h/mes", label: "Horas hombre ahorradas en generación y consolidación de reportes directivos" },
      { metric: "99.8%", label: "Precisión en control presupuestal y registro de cuentas por pagar" },
    ],
    tools: [
      "Oracle NetSuite",
      "Python",
      "Pandas",
      "Power BI",
      "DAX",
      "SQL",
      "Excel Avanzado",
      "XML / JSON",
      "Tesorería",
      "Auditoría",
    ],
    relatedProjects: [
      "netsuiteEtlPipeline",
      "financialBiSuite",
      "procurementInventoryControl",
      "treasuryAuditAutomation",
    ],
    seo: {
      title: "Liderazgo en Operaciones ERP y Analítica | ASPAEN | Mariangel Sierra",
      description:
        "Detalle del rol de Mariangel Sierra Jaller en ASPAEN liderando compras, tesorería y modernización analítica sobre Oracle NetSuite.",
      keywords: [
        "ASPAEN",
        "Oracle NetSuite",
        "Compras institucionales",
        "Tesorería",
        "Conciliaciones bancarias",
        "Python Pandas",
        "Power BI",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "aspaen-practica-contable-integracion": {
    collection: "experience",
    slug: "aspaen-practica-contable-integracion",
    id: "aspaenInternship",
    lang: "es",
    eyebrow: "Experiencia Profesional · 2022 — 2023",
    title: "Práctica Profesional en Gestión Contable, Caja Menor y Soporte ERP",
    subtitle:
      "Inicio de trayectoria en ASPAEN con digitalización documental, facturación electrónica y parametrización operativa en Oracle NetSuite.",
    meta: [
      { label: "Organización", value: "Asociación para la Enseñanza — ASPAEN" },
      { label: "Periodo", value: "Febrero 2022 — Enero 2023" },
      { label: "Modalidad", value: "Presencial · Medellín, Colombia" },
      { label: "Responsabilidad", value: "Auxiliar Contable y de Operaciones" },
    ],
    overview: [
      "Mariangel inició su trayectoria en ASPAEN como auxiliar contable en práctica profesional, destacándose rápidamente por su precisión técnica, orden analítico y capacidad para absorber procesos complejos.",
      "Asumió la gestión operativa de fondos de caja menor, comprobantes de egreso, validación de facturación electrónica ante la DIAN y estructuración del archivo contable físico y digital.",
      "Su destacada curva de aprendizaje en Oracle NetSuite y su proactividad técnica motivaron su promoción inmediata a la gestión integral de operaciones y compras de la institución.",
    ],
    keyPointsTitle: "Responsabilidades y Logros Clave",
    keyPoints: [
      "Causación contable diaria de facturas de proveedores y validación de XML/PDF conforme a la normativa tributaria colombiana.",
      "Control, arqueo y legalización oportuna de cajas menores con rigurosa verificación de soportes físicos y digitales.",
      "Digitalización y catalogación sistemática de expedientes contables, reduciendo tiempos de consulta en procesos de auditoría.",
      "Soporte operativo en la migración y depuración de catálogos de cuentas y terceros dentro de Oracle NetSuite.",
      "Colaboración activa en la conciliación preliminar de cuentas bancarias y verificación de saldos de caja.",
    ],
    outcomesTitle: "Impacto Operativo Medible",
    outcomes: [
      { metric: "100%", label: "Digitalización de expedientes contables y soportes de caja menor" },
      { metric: "0", label: "Sanciones o rechazos de facturas electrónicas durante el ciclo de práctica" },
      { metric: "Promoción", label: "Ascenso directo a rol permanente con ampliación de responsabilidades operativas" },
      { metric: "-40%", label: "Tiempo de localización de expedientes durante auditorías de cierre anual" },
    ],
    tools: [
      "Oracle NetSuite",
      "Facturación Electrónica",
      "Contabilidad NIIF",
      "Caja Menor",
      "Excel Avanzado",
      "Digitalización",
      "Trazabilidad Documental",
      "Logística",
    ],
    relatedProjects: ["treasuryAuditAutomation", "procurementInventoryControl"],
    seo: {
      title: "Práctica Profesional Contable y Soporte ERP | ASPAEN | Mariangel Sierra",
      description:
        "Experiencia de práctica profesional de Mariangel Sierra Jaller en ASPAEN: facturación electrónica, cajas menores, digitalización y soporte ERP.",
      keywords: [
        "ASPAEN",
        "Práctica contable",
        "Oracle NetSuite",
        "Facturación electrónica",
        "Caja menor",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  // ==========================================
  // EDUCATION (6)
  // ==========================================
  "ingenieria-sistemas-san-jose": {
    collection: "education",
    slug: "ingenieria-sistemas-san-jose",
    id: "sanJoseSystems",
    lang: "es",
    eyebrow: "Educación Superior · 2023 — 10 Sep 2026",
    title: "Ingeniería de Sistemas",
    subtitle:
      "Titulada el 10 de septiembre de 2026. Formación integral en arquitectura de software, bases de datos relacionales, ingeniería de datos, cloud y modelado computacional.",
    meta: [
      { label: "Institución", value: "Fundación Universidad San José" },
      { label: "Periodo", value: "2023 — 10 Sep 2026 (Titulada)" },
      { label: "Modalidad", value: "Pregrado Profesional" },
      { label: "Enfoque", value: "Tecnología, Software & Datos" },
    ],
    overview: [
      "El programa de Ingeniería de Sistemas en la Fundación Universidad San José le ha proporcionado a Mariangel bases sólidas en diseño algorítmico, bases de datos relacionales, estructuras de datos y paradigmas modernos de desarrollo.",
      "Aplica de forma directa estos conocimientos en su rol laboral, traduciendo requerimientos administrativos en soluciones de automatización con Python, pipelines de integración de datos y visualización analítica.",
      "Su formación computacional se articula en sinergia con su carrera paralela de Ingeniería Industrial, potenciando una perspectiva única orientada a la ingeniería de procesos automatizados.",
    ],
    keyPointsTitle: "Núcleos Temáticos y Competencias",
    keyPoints: [
      "Diseño e implementación de bases de datos relacionales y optimización de consultas SQL complejas.",
      "Desarrollo de software orientado a objetos, estructuras de datos y principios de arquitectura limpia.",
      "Modelado de datos para analítica empresarial, pipelines de extracción ETL y procesamiento de lotes.",
      "Fundamentos de redes de computadores, seguridad de la información y computación en la nube.",
      "Control de versiones profesional con Git y metodologías ágiles de ingeniería de software.",
    ],
    outcomesTitle: "Aplicación Práctica y Proyección",
    outcomes: [
      { metric: "100%", label: "Aplicabilidad directa al desarrollo de pipelines analíticos y scripts ERP" },
      { metric: "10 Sep 2026", label: "Titulación profesional completada en Fundación Universidad San José" },
      { metric: "Doble Titulación", label: "Graduación simultánea junto a Ingeniería Industrial y Tecnología en Sistemas" },
    ],
    tools: [
      "Python",
      "SQL",
      "Arquitectura de Software",
      "Bases de Datos Relacionales",
      "Git",
      "Estructuras de Datos",
      "ETL Pipelines",
      "APIs REST",
    ],
    relatedProjects: ["netsuiteEtlPipeline", "academicEngineeringSuite"],
    seo: {
      title: "Ingeniería de Sistemas | Fundación Universidad San José | Mariangel Sierra",
      description:
        "Detalle de la carrera de Ingeniería de Sistemas cursada por Mariangel Sierra Jaller en la Fundación Universidad San José.",
      keywords: [
        "Ingeniería de Sistemas",
        "Fundación Universidad San José",
        "Mariangel Sierra Jaller",
        "Arquitectura de software",
        "Python",
        "SQL",
      ],
    },
  },

  "ingenieria-industrial-san-jose": {
    collection: "education",
    slug: "ingenieria-industrial-san-jose",
    id: "sanJoseIndustrial",
    lang: "es",
    eyebrow: "Educación Superior · 2023 — 10 Sep 2026",
    title: "Ingeniería Industrial",
    subtitle:
      "Titulada el 10 de septiembre de 2026. Optimización de operaciones, gestión de la cadena de suministro, control de calidad, investigación de operaciones y productividad.",
    meta: [
      { label: "Institución", value: "Fundación Universidad San José" },
      { label: "Periodo", value: "2023 — 10 Sep 2026 (Titulada)" },
      { label: "Modalidad", value: "Pregrado Profesional" },
      { label: "Enfoque", value: "Operaciones, Procesos & Cadena de Suministro" },
    ],
    overview: [
      "La carrera de Ingeniería Industrial complementa la visión sistémica de Mariangel, aportando herramientas rigurosas para el modelado de operaciones, la gestión de inventarios y el diseño de flujos de trabajo eficientes.",
      "Esta base académica fundamenta sus decisiones diarias en compras institucionales, permitiéndole evaluar proveedores, minimizar costos de almacenamiento y garantizar niveles óptimos de servicio.",
      "El enfoque en mejora continua (Lean) y control estadístico de procesos se refleja en la estandarización documental y la reducción de tiempos de ciclo en tareas administrativas.",
    ],
    keyPointsTitle: "Núcleos Temáticos y Competencias",
    keyPoints: [
      "Gestión estratégica de la cadena de suministro, compras corporativas y modelos de control de inventarios.",
      "Investigación de operaciones, optimización lineal y análisis cuantitativo de toma de decisiones.",
      "Metodologías de mejora continua, Lean Operations y reducción de desperdicios en procesos de servicio.",
      "Diseño y balanceo de flujos operativos con tableros de control y definición de KPIs clave.",
      "Formulación y evaluación económica de proyectos de inversión y optimización organizacional.",
    ],
    outcomesTitle: "Aplicación Práctica y Proyección",
    outcomes: [
      { metric: "Directa", label: "Aplicación en gestión de compras y stocks en ASPAEN" },
      { metric: "10 Sep 2026", label: "Titulación profesional completada en Fundación Universidad San José" },
      { metric: "Sinergia", label: "Integración de ingeniería de procesos con ingeniería de software" },
    ],
    tools: [
      "Investigación de Operaciones",
      "Cadena de Suministro",
      "Lean Six Sigma",
      "Control de Procesos",
      "KPIs Operativos",
      "Modelado de Costos",
      "Excel Financiero",
    ],
    relatedProjects: ["procurementInventoryControl", "treasuryAuditAutomation"],
    seo: {
      title: "Ingeniería Industrial | Fundación Universidad San José | Mariangel Sierra",
      description:
        "Titulación en Ingeniería Industrial de Mariangel Sierra Jaller (10 de septiembre de 2026): optimización operativa, cadena de suministro y control de procesos.",
      keywords: [
        "Ingeniería Industrial",
        "Fundación Universidad San José",
        "Cadena de suministro",
        "Optimización de operaciones",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "tecnologia-sistemas-san-jose": {
    collection: "education",
    slug: "tecnologia-sistemas-san-jose",
    id: "sanJoseSystemsTech",
    lang: "es",
    eyebrow: "Educación Superior Tecnológica · 2023 — 10 Sep 2026",
    title: "Tecnología en Sistemas",
    subtitle:
      "Titulada como Tecnóloga en Sistemas el 10 de septiembre de 2026, orientada a implementación de software empresarial, administración de bases de datos y soporte tecnológico.",
    meta: [
      { label: "Institución", value: "Fundación Universidad San José" },
      { label: "Periodo", value: "2023 — 10 Sep 2026 (Titulada)" },
      { label: "Modalidad", value: "Pregrado Tecnológico" },
      { label: "Enfoque", value: "Infraestructura TI, Redes & Bases de Datos" },
    ],
    overview: [
      "Como parte de su ciclo propedéutico en la Fundación Universidad San José, Mariangel obtuvo el título de Tecnóloga en Sistemas el 10 de septiembre de 2026 de manera simultánea a sus títulos profesionales.",
      "El programa consolida competencias prácticas en administración de bases de datos, configuración de infraestructura corporativa, desarrollo web e integración de sistemas administrativos.",
      "Su enfoque aplicado complementa directamente la operación de Oracle NetSuite y los flujos automatizados de reportería financiera en ASPAEN.",
    ],
    keyPointsTitle: "Núcleos Temáticos y Competencias",
    keyPoints: [
      "Administración e integridad de bases de datos relacionales y consultas SQL operativas.",
      "Soporte de infraestructura tecnológica, sistemas operativos y conectividad empresarial.",
      "Implementación de módulos de software empresarial e interoperabilidad mediante XML y JSON.",
      "Documentación técnica de requerimientos y aseguramiento de calidad en entregas funcionales.",
    ],
    outcomesTitle: "Aplicación Práctica y Logros",
    outcomes: [
      { metric: "10 Sep 2026", label: "Título tecnológico obtenido en Fundación Universidad San José" },
      { metric: "100%", label: "Articulación directa con pipelines de datos y gestión ERP" },
      { metric: "Propedéutico", label: "Base tecnológica articulada con Ingeniería de Sistemas" },
    ],
    tools: [
      "SQL & Bases de Datos",
      "Sistemas de Información",
      "XML / JSON",
      "Python",
      "Soporte TI",
      "Git",
    ],
    relatedProjects: ["netsuiteEtlPipeline", "academicEngineeringSuite"],
    seo: {
      title: "Tecnología en Sistemas | Fundación Universidad San José | Mariangel Sierra",
      description:
        "Título en Tecnología en Sistemas obtenido por Mariangel Sierra Jaller en la Fundación Universidad San José el 10 de septiembre de 2026.",
      keywords: [
        "Tecnología en Sistemas",
        "Tecnóloga en Sistemas",
        "Fundación Universidad San José",
        "Mariangel Sierra Jaller",
        "SQL",
      ],
    },
  },

  "ingenieria-biomedica-itm": {
    collection: "education",
    slug: "ingenieria-biomedica-itm",
    id: "itmBiomedical",
    lang: "es",
    eyebrow: "Tercera Ingeniería (Aspiracional) · 2023 — 2028",
    title: "Ingeniería Biomédica",
    subtitle:
      "Meta académica hacia su tercera ingeniería: intersección entre instrumentación médica, señales biológicas, gestión de tecnología hospitalaria y bioinformática.",
    meta: [
      { label: "Institución", value: "Institución Universitaria ITM" },
      { label: "Periodo", value: "2023 — 2028 (En progreso)" },
      { label: "Modalidad", value: "Tercera Ingeniería Profesional" },
      { label: "Enfoque", value: "Tecnología Biomédica & Gestión Clínica" },
    ],
    overview: [
      "La formación en Ingeniería Biomédica en el ITM aporta una perspectiva de máxima exigencia analítica, combinando ciencias de la vida con modelado físico-matemático, instrumentación electrónica y normativa hospitalaria.",
      "Mariangel desarrolla competencias en adquisición y procesamiento de bioseñales, metrología de equipos biomédicos y tecnovigilancia, aplicando métodos computacionales avanzados.",
      "Esta disciplina fortalece su capacidad de resolver problemas en entornos de alta criticidad, donde el rigor metodológico, la trazabilidad estricta y los estándares de seguridad son primordiales.",
    ],
    keyPointsTitle: "Núcleos Temáticos y Competencias",
    keyPoints: [
      "Instrumentación médica, adquisición de datos biomédicos y procesamiento digital de señales.",
      "Fisiología cuantitativa, biofísica y análisis computacional aplicado a sistemas biológicos.",
      "Gestión de tecnología hospitalaria, mantenimiento preventivo de equipos biomédicos y bioseguridad.",
      "Normativa técnico-sanitaria de dispositivos médicos (INVIMA / FDA) y estándares de calidad clínica.",
      "Programación científica con Python y MATLAB para análisis espectral y modelos diagnósticos.",
    ],
    outcomesTitle: "Aplicación Práctica y Proyección",
    outcomes: [
      { metric: "2028", label: "Año proyectado de titulación profesional" },
      { metric: "Rigor", label: "Capacidad de modelado en sistemas críticos y de alta complejidad" },
      { metric: "Interdisciplinar", label: "Conexión entre ingeniería clínica, compras de alta tecnología y analítica" },
    ],
    tools: [
      "Ingeniería Biomédica",
      "Procesamiento de Señales",
      "Instrumentación Médica",
      "MATLAB",
      "Python Científico",
      "Tecnovigilancia",
      "Bioseguridad",
    ],
    relatedProjects: ["clinicalBioengineering"],
    seo: {
      title: "Ingeniería Biomédica | Institución Universitaria ITM | Mariangel Sierra",
      description:
        "Estudios en Ingeniería Biomédica de Mariangel Sierra Jaller en el ITM: instrumentación clínica, procesamiento de bioseñales y tecnología médica.",
      keywords: [
        "Ingeniería Biomédica",
        "ITM",
        "Instrumentación médica",
        "Tecnología hospitalaria",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "tecnico-contable-financiero-itm": {
    collection: "education",
    slug: "tecnico-contable-financiero-itm",
    id: "itmAccountingTech",
    lang: "es",
    eyebrow: "Educación Técnica · 2022 — 2023",
    title: "Técnico Laboral en Auxiliar Contable y Financiero",
    subtitle:
      "Fundamentos normativos NIIF, liquidación tributaria, conciliaciones bancarias, nómina y registros contables empresariales.",
    meta: [
      { label: "Institución", value: "Instituto Metropolitano de Educación (ITM)" },
      { label: "Periodo", value: "2022 — 2023 (Titulada)" },
      { label: "Modalidad", value: "Técnico Laboral por Competencias" },
      { label: "Enfoque", value: "Contabilidad, Finanzas & Normativa Tributaria" },
    ],
    overview: [
      "Este programa brindó la base operativa y normativa que permitió a Mariangel ingresar con solidez al área contable y administrativa de ASPAEN.",
      "Comprende la estructura formal del ciclo contable bajo normas NIIF para pymes, los procedimientos de causación de compras, liquidación de retenciones tributarias y conciliación de extractos financieros.",
      "Esta comprensión contable profunda es el puente clave que le permite hoy dialogar con contadores, auditores y directores financieros, traduciendo sus necesidades a sistemas automatizados.",
    ],
    keyPointsTitle: "Competencias Adquiridas",
    keyPoints: [
      "Registro metódico de operaciones comerciales y causación contable bajo estándares NIIF.",
      "Elaboración de conciliaciones bancarias, arqueos de fondos fijos y control de flujo de caja.",
      "Liquidación de nómina, prestaciones sociales, aportes parafiscales y retenciones en la fuente.",
      "Manejo operativo de facturación electrónica y validación de documentos soporte ante la DIAN.",
      "Consolidación de balances de prueba e informes de estados financieros básicos en Excel.",
    ],
    outcomesTitle: "Impacto en Carrera",
    outcomes: [
      { metric: "100%", label: "Programa culminado y certificado satisfactoriamente" },
      { metric: "Inserción", label: "Vínculo laboral directo con ASPAEN a través de práctica profesional" },
      { metric: "Base Firme", label: "Fundamento conceptual para parametrización y auditoría en Oracle NetSuite" },
    ],
    tools: [
      "Contabilidad NIIF",
      "Conciliaciones Bancarias",
      "Tributaria Básica",
      "Facturación Electrónica",
      "Liquidación de Nómina",
      "Excel Financiero",
    ],
    relatedProjects: ["treasuryAuditAutomation", "financialBiSuite"],
    seo: {
      title: "Técnico Contable y Financiero | ITM | Mariangel Sierra Jaller",
      description:
        "Titulación técnica en Auxiliar Contable y Financiero de Mariangel Sierra Jaller en el ITM: NIIF, conciliaciones y liquidación tributaria.",
      keywords: [
        "Técnico Contable",
        "ITM",
        "Conciliación bancaria",
        "NIIF",
        "Tributaria",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "tecnico-programacion-software-sena": {
    collection: "education",
    slug: "tecnico-programacion-software-sena",
    id: "senaSoftware",
    lang: "es",
    eyebrow: "Educación Técnica · 2020 — 2021",
    title: "Técnico en Programación de Software",
    subtitle:
      "Desarrollo de lógica estructurada, bases de datos relacionales, programación orientada a objetos y metodologías de ciclo de vida del software.",
    meta: [
      { label: "Institución", value: "SENA — Servicio Nacional de Aprendizaje" },
      { label: "Periodo", value: "2020 — 2021 (Titulada)" },
      { label: "Modalidad", value: "Técnico Profesional" },
      { label: "Enfoque", value: "Desarrollo de Software & Bases de Datos" },
    ],
    overview: [
      "El programa técnico del SENA representó el inicio de la formación formal de Mariangel en tecnología y desarrollo de sistemas informáticos.",
      "Adquirió destrezas en formulación lógica de algoritmos, diseño de diagramas entidad-relación, sentencias SQL y desarrollo de aplicaciones con arquitectura cliente-servidor.",
      "Esta etapa temprana definió su capacidad para no limitarse a operar software comercial, sino crear herramientas, scripts y soluciones a la medida de los problemas organizacionales.",
    ],
    keyPointsTitle: "Competencias Adquiridas",
    keyPoints: [
      "Construcción de algoritmos estructurados y aplicación de principios de programación orientada a objetos.",
      "Diseño conceptual y físico de bases de datos relacionales mediante sentencias DDL y DML en SQL.",
      "Desarrollo de interfaces de usuario y validación de datos en capas de presentación y negocio.",
      "Documentación técnica de software y casos de uso bajo buenas prácticas de ingeniería.",
      "Participación en proyectos formativos integradores resolviendo problemas reales con software.",
    ],
    outcomesTitle: "Impacto en Carrera",
    outcomes: [
      { metric: "100%", label: "Programa culminado y certificado con honores prácticos" },
      { metric: "Semillero", label: "Inicio temprano en el desarrollo de software y manipulación de datos" },
      { metric: "Autonomía", label: "Capacidad de automatizar procesos manuales mediante código" },
    ],
    tools: [
      "Lógica de Programación",
      "POO",
      "Bases de Datos Relacionales",
      "SQL",
      "JavaScript",
      "HTML5 / CSS3",
      "Git",
    ],
    relatedProjects: ["academicEngineeringSuite", "netsuiteEtlPipeline"],
    seo: {
      title: "Técnico en Programación de Software | SENA | Mariangel Sierra",
      description:
        "Titulación técnica en Programación de Software del SENA por Mariangel Sierra Jaller: desarrollo de software, SQL y bases de datos.",
      keywords: [
        "SENA",
        "Técnico en Programación de Software",
        "SQL",
        "POO",
        "Desarrollo de software",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "bachiller-informatica-inem": {
    collection: "education",
    slug: "bachiller-informatica-inem",
    id: "inemComputerScience",
    lang: "es",
    eyebrow: "Educación Media Técnica · 2019 — 2021",
    title: "Bachiller Técnico con Énfasis en Informática",
    subtitle:
      "Bases formativas en ciencias exactas, lógica computacional, redes locales, ofimática avanzada y mantenimiento de sistemas.",
    meta: [
      { label: "Institución", value: "I.E. Inem José Félix de Restrepo" },
      { label: "Periodo", value: "2019 — 2021 (Graduada)" },
      { label: "Modalidad", value: "Media Técnica" },
      { label: "Enfoque", value: "Fundamentos de Computación e Informática" },
    ],
    overview: [
      "En el reconocido INEM José Félix de Restrepo de Medellín, Mariangel cursó su educación media con especialidad técnica en Informática, consolidando su vocación científica y técnica desde la adolescencia.",
      "Recibió formación intensiva en fundamentos de hardware, instalación y configuración de sistemas operativos, arquitectura de redes LAN y herramientas ofimáticas avanzadas.",
      "Esta etapa cimentó la disciplina de estudio, curiosidad analítica y determinación que hoy caracterizan su trayectoria académica y profesional simultánea.",
    ],
    keyPointsTitle: "Competencias Adquiridas",
    keyPoints: [
      "Fundamentos de lógica algorítmica, diagramación de flujo y resolución estructurada de problemas.",
      "Configuración, diagnóstico y mantenimiento preventivo de componentes de hardware y software.",
      "Principios de redes de área local (LAN), direccionamiento IP y servicios de comunicación.",
      "Manejo avanzado de hojas de cálculo electrónicas y paquetes ofimáticos para procesamiento de datos.",
      "Desarrollo de proyectos interdisciplinarios con presentación técnica ante comités evaluadores.",
    ],
    outcomesTitle: "Impacto en Carrera",
    outcomes: [
      { metric: "Graduación", label: "Culminación exitosa de la media técnica en informática" },
      { metric: "Vocación", label: "Definición del camino vocacional hacia la ingeniería y las ciencias exactas" },
      { metric: "Disciplina", label: "Desarrollo de hábitos de rigor y autoaprendizaje continuo" },
    ],
    tools: [
      "Lógica Computacional",
      "Ofimática Avanzada",
      "Redes LAN",
      "Mantenimiento de Sistemas",
      "Sistemas Operativos",
      "Excel Intermedio",
    ],
    relatedProjects: ["academicEngineeringSuite"],
    seo: {
      title: "Bachiller Técnico en Informática | INEM | Mariangel Sierra Jaller",
      description:
        "Formación media técnica en Informática de Mariangel Sierra Jaller en la I.E. Inem José Félix de Restrepo.",
      keywords: [
        "INEM José Félix de Restrepo",
        "Bachiller Técnico en Informática",
        "Lógica computacional",
        "Medellín",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  // ==========================================
  // CERTIFICATIONS (6)
  // ==========================================
  "analitica-datos-crisp-dm": {
    collection: "certifications",
    slug: "analitica-datos-crisp-dm",
    id: "googleDataAnalytics",
    lang: "es",
    eyebrow: "Certificación Profesional · 2024",
    title: "Analítica de Datos & Metodología CRISP-DM",
    subtitle:
      "Dominio del estándar internacional para minería de datos y ciclo completo de analítica: entendimiento del negocio, preparación, modelado y despliegue.",
    meta: [
      { label: "Emisor", value: "Ruta de Analítica & CRISP-DM" },
      { label: "Año", value: "2024" },
      { label: "Enfoque", value: "Minería de Datos, Limpieza & Visualización" },
      { label: "Estado", value: "Completada y Vigente" },
    ],
    overview: [
      "Esta especialización profesional valida el dominio de las fases del estándar CRISP-DM (Cross-Industry Standard Process for Data Mining) aplicado a problemas operacionales reales.",
      "Mariangel profundizó en técnicas rigurosas de recolección de datos, perfilamiento de calidad, tratamiento de valores nulos o atípicos, y formulación de preguntas analíticas de alto impacto.",
      "La metodología garantiza que cada tablero o script desarrollado responda a una hipótesis de negocio medible, asegurando un retorno de inversión claro en proyectos de datos.",
    ],
    keyPointsTitle: "Competencias Validadas",
    keyPoints: [
      "Aplicación sistemática de las seis fases del marco CRISP-DM a iniciativas de datos corporativos.",
      "Auditoría y limpieza metódica de datasets transaccionales eliminando sesgos y duplicidades.",
      "Técnicas de análisis exploratorio de datos (EDA) para descubrir patrones de compras y desviaciones de costos.",
      "Construcción de narrativas analíticas y visualizaciones orientadas a la toma de decisiones directiva.",
      "Documentación técnica reproducible de transformaciones de datos y especificaciones de métricas.",
    ],
    outcomesTitle: "Aplicación Práctica",
    outcomes: [
      { metric: "CRISP-DM", label: "Metodología estándar aplicada a los reportes analíticos de ASPAEN" },
      { metric: "100%", label: "Trazabilidad de reglas de transformación de datos crudos a tableros" },
      { metric: "Calidad", label: "Cero fallas por datos corruptos en pipelines de reportería mensual" },
    ],
    tools: [
      "CRISP-DM",
      "Python",
      "Pandas",
      "SQL",
      "Análisis Exploratorio (EDA)",
      "Limpieza de Datos",
      "Visualización",
    ],
    relatedProjects: ["netsuiteEtlPipeline", "financialBiSuite"],
    seo: {
      title: "Certificación Analítica de Datos CRISP-DM | Mariangel Sierra Jaller",
      description:
        "Certificación de Mariangel Sierra Jaller en metodología CRISP-DM y analítica de datos aplicada a operaciones empresariales.",
      keywords: [
        "CRISP-DM",
        "Analítica de datos",
        "Minería de datos",
        "EDA",
        "Python",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "business-intelligence-power-bi-dax": {
    collection: "certifications",
    slug: "business-intelligence-power-bi-dax",
    id: "powerBiAnalytics",
    lang: "es",
    eyebrow: "Certificación Profesional · 2024",
    title: "Business Intelligence Avanzado: Power BI, DAX & Power Query",
    subtitle:
      "Diseño de modelos dimensionales en estrella, fórmulas DAX de alta complejidad, transformaciones avanzadas en M y gobernanza de reportes.",
    meta: [
      { label: "Emisor", value: "Especialización BI · DAX & Power Query" },
      { label: "Año", value: "2024" },
      { label: "Enfoque", value: "Modelado Dimensional & Análisis Ejecutivo" },
      { label: "Estado", value: "Completada y Vigente" },
    ],
    overview: [
      "Especialización enfocada en la arquitectura de Business Intelligence empresarial utilizando el ecosistema Microsoft Power BI.",
      "Mariangel domina el diseño de esquemas en estrella, la gestión de relaciones activas/inactivas con USERELATIONSHIP, cálculos de inteligencia de tiempo (Time Intelligence) y optimización del motor VertiPaq.",
      "Permite transformar millones de registros contables dispersos en paneles interactivos con drill-down, facilitando que directivos identifiquen desviaciones presupuestales en segundos.",
    ],
    keyPointsTitle: "Competencias Validadas",
    keyPoints: [
      "Modelado dimensional de datos (tablas de hechos y dimensiones conformadas) bajo metodología Kimball.",
      "Escritura de medidas DAX complejas: CALCULATE con contextos de filtro dinámicos, acumulados YTD/MTD y comparativas YoY.",
      "Ingeniería de transformaciones con Power Query (lenguaje M) para depuración y estandarización de orígenes heterogéneos.",
      "Diseño de interfaz de usuario (UI/UX) para tableros ejecutivos priorizando legibilidad, jerarquía visual y accesibilidad.",
      "Gobernanza de datasets, políticas de actualización programada y seguridad a nivel de fila (RLS).",
    ],
    outcomesTitle: "Aplicación Práctica",
    outcomes: [
      { metric: "<3s", label: "Tiempo de respuesta y renderizado en tableros ejecutivos optimizados" },
      { metric: "360°", label: "Visión consolidada de liquidez, compras e inventarios en ASPAEN" },
      { metric: "100%", label: "Autonomía de directivos en la consulta de indicadores operativos" },
    ],
    tools: [
      "Power BI Desktop",
      "DAX",
      "Power Query (M)",
      "Esquema en Estrella",
      "VertiPaq",
      "KPIs Financieros",
      "SQL Server",
    ],
    relatedProjects: ["financialBiSuite", "netsuiteEtlPipeline"],
    seo: {
      title: "Certificación Power BI & DAX Avanzado | Mariangel Sierra Jaller",
      description:
        "Certificación de Mariangel Sierra Jaller en Power BI, modelado dimensional, DAX avanzado y Power Query para finanzas y operaciones.",
      keywords: [
        "Power BI",
        "DAX",
        "Power Query",
        "Business Intelligence",
        "Modelado estrella",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "gestion-operativa-erp-oracle-netsuite": {
    collection: "certifications",
    slug: "gestion-operativa-erp-oracle-netsuite",
    id: "netsuiteErpOperations",
    lang: "es",
    eyebrow: "Certificación Profesional · 2024",
    title: "Gestión Operativa & Flujos ERP Oracle NetSuite",
    subtitle:
      "Parametrización del ciclo Procure-to-Pay, auditoría de órdenes de compra, control de inventarios, facturación electrónica y búsquedas guardadas avanzadas.",
    meta: [
      { label: "Emisor", value: "Operación & Integración ERP NetSuite" },
      { label: "Año", value: "2024" },
      { label: "Enfoque", value: "ERP Cloud, Compras & Control Interno" },
      { label: "Estado", value: "Completada y Vigente" },
    ],
    overview: [
      "Acredita experiencia de nivel avanzado en la operación diaria, configuración y auditoría del ERP Oracle NetSuite en entornos institucionales y educativos.",
      "Mariangel domina los circuitos transaccionales de requisiciones, órdenes de compra, recepción de artículos, facturación de proveedores y programación de pagos.",
      "Asimismo, aprovecha las capacidades analíticas nativas del ERP diseñando búsquedas guardadas (Saved Searches) con fórmulas SQL y alertas automáticas de desviación.",
    ],
    keyPointsTitle: "Competencias Validadas",
    keyPoints: [
      "Administración integral del ciclo Procure-to-Pay garantizando coherencia contable y fiscal.",
      "Configuración y ejecución de Saved Searches avanzadas con expresiones SQL y criterios multidimensionales.",
      "Gestión de catálogos de proveedores, condiciones comerciales, términos de crédito y retenciones.",
      "Control de inventarios por centros de costos, transferencias de almacén y ajustes justificados.",
      "Integración de la facturación electrónica DIAN y conciliación de documentos soporte contra registros ERP.",
    ],
    outcomesTitle: "Aplicación Práctica",
    outcomes: [
      { metric: "100%", label: "Alineación de compras y pagos con las políticas de control interno de ASPAEN" },
      { metric: "-70%", label: "Tiempo de generación de reportes de compras mediante Saved Searches optimizadas" },
      { metric: "0", label: "Descuadres entre órdenes de compra, recepciones y facturas causadas" },
    ],
    tools: [
      "Oracle NetSuite",
      "Saved Searches",
      "Procure-to-Pay",
      "Facturación Electrónica DIAN",
      "Control de Inventarios",
      "SQL NetSuite",
      "Flujos de Aprobación",
    ],
    relatedProjects: ["procurementInventoryControl", "netsuiteEtlPipeline"],
    seo: {
      title: "Certificación Operativa Oracle NetSuite ERP | Mariangel Sierra Jaller",
      description:
        "Certificación en gestión y operación del ERP Oracle NetSuite: ciclo Procure-to-Pay, Saved Searches y control interno.",
      keywords: [
        "Oracle NetSuite",
        "ERP Cloud",
        "Procure to pay",
        "Saved searches",
        "Compras",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "python-pandas-etl-automatizacion": {
    collection: "certifications",
    slug: "python-pandas-etl-automatizacion",
    id: "pythonDataScience",
    lang: "es",
    eyebrow: "Certificación Profesional · 2024",
    title: "Automatización de Procesos & Pipelines ETL con Python y Pandas",
    subtitle:
      "Desarrollo de scripts para extracción, transformación y carga (ETL), procesamiento de archivos XML/JSON/Excel y validaciones financieras automatizadas.",
    meta: [
      { label: "Emisor", value: "Automatización de Datos con Python" },
      { label: "Año", value: "2024" },
      { label: "Enfoque", value: "Ingeniería de Datos, Scripting & ETL" },
      { label: "Estado", value: "Completada y Vigente" },
    ],
    overview: [
      "Certifica el uso profesional del lenguaje Python y la biblioteca Pandas como motor de automatización de tareas contables y financieras de alto volumen.",
      "Mariangel programa pipelines que procesan cientos de extractos bancarios y facturas electrónicas en formato XML/JSON, efectuando cruces automáticos de datos en cuestión de segundos.",
      "Esta competencia elimina el error humano inherente a la digitación manual y libera tiempo para análisis cualitativo y toma de decisiones estratégicas.",
    ],
    keyPointsTitle: "Competencias Validadas",
    keyPoints: [
      "Manipulación avanzada de DataFrames con Pandas: agrupaciones, pivots, merges complejos y transformaciones vectorizadas.",
      "Parsing de archivos semiestructurados (XML de facturación electrónica DIAN y payloads JSON de APIs).",
      "Automatización de lectura y escritura de libros Excel multipestaña mediante openpyxl y xlsxwriter.",
      "Diseño de algoritmos de coincidencia difusa (fuzzy matching) para conciliación de descripciones bancarias.",
      "Implementación de logging estructurado, manejo robusto de excepciones y validaciones de tipos de datos.",
    ],
    outcomesTitle: "Aplicación Práctica",
    outcomes: [
      { metric: "<10s", label: "Tiempo de procesamiento de lotes mensuales de cientos de facturas y movimientos" },
      { metric: "100%", label: "Eliminación de errores de digitación manual en procesos automatizados" },
      { metric: "Python", label: "Scripts de uso recurrente en la operación contable y de tesorería" },
    ],
    tools: [
      "Python 3",
      "Pandas",
      "NumPy",
      "OpenPyXL",
      "XML Parsing",
      "JSON",
      "RegEx",
      "Automatización Scripting",
    ],
    relatedProjects: ["netsuiteEtlPipeline", "treasuryAuditAutomation"],
    seo: {
      title: "Certificación Python Pandas ETL & Automatización | Mariangel Sierra",
      description:
        "Certificación de Mariangel Sierra Jaller en Python, Pandas, ingeniería de datos ETL y automatización contable.",
      keywords: [
        "Python",
        "Pandas",
        "ETL",
        "Automatización financiera",
        "Scripting",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "excel-avanzado-consolidacion-financiera": {
    collection: "certifications",
    slug: "excel-avanzado-consolidacion-financiera",
    id: "excelFinancialModeling",
    lang: "es",
    eyebrow: "Certificación Profesional · 2023",
    title: "Excel Avanzado, Modelado Financiero & Consolidación Contable",
    subtitle:
      "Formulación matricial, funciones lógicas y de búsqueda complejas, tablas dinámicas avanzadas, Power Pivot y modelos de proyección de caja.",
    meta: [
      { label: "Emisor", value: "Control Financiero & Modelado Excel" },
      { label: "Año", value: "2023" },
      { label: "Enfoque", value: "Modelado Financiero, Auditoría & Hojas de Cálculo" },
      { label: "Estado", value: "Completada y Vigente" },
    ],
    overview: [
      "Acredita el dominio riguroso de Microsoft Excel como herramienta de análisis contable, proyección financiera y auditoría de datos en operaciones institucionales.",
      "Mariangel estructura modelos auditables con separación estricta de parámetros, cálculos y reportes, utilizando funciones dinámicas modernas (XLOOKUP, FILTER, LAMBDA) y Power Pivot.",
      "Sus modelos permiten consolidar estados financieros de diferentes sedes y periodos en formatos estandarizados listos para presentación a juntas directivas.",
    ],
    keyPointsTitle: "Competencias Validadas",
    keyPoints: [
      "Construcción de fórmulas dinámicas matriciales avanzadas para cruce automático de bases de datos contables.",
      "Diseño de modelos de flujo de caja proyectado y análisis de sensibilidad de compras con tablas de datos.",
      "Uso de Power Pivot para relacionar tablas de datos externas y calcular indicadores clave con DAX en Excel.",
      "Auditoría de fórmulas, trazabilidad de precedentes y dependientes, y diseño de validaciones de integridad de celdas.",
      "Desarrollo de plantillas estandarizadas para arqueos de caja menor y legalización de gastos corporativos.",
    ],
    outcomesTitle: "Aplicación Práctica",
    outcomes: [
      { metric: "0 Errores", label: "Integridad matemática verificada en modelos de conciliación financiera" },
      { metric: "-60%", label: "Tiempo de consolidación de reportes de cierre de mes" },
      { metric: "Estándar", label: "Plantillas adoptadas en la operación diaria del departamento contable" },
    ],
    tools: [
      "Excel Avanzado",
      "Power Pivot",
      "XLOOKUP / BUSCARX",
      "Fórmulas Dinámicas",
      "Modelado Financiero",
      "Tablas Dinámicas",
      "Auditoría de Celdas",
    ],
    relatedProjects: ["financialBiSuite", "treasuryAuditAutomation"],
    seo: {
      title: "Certificación Excel Avanzado & Modelado Financiero | Mariangel Sierra",
      description:
        "Certificación en Excel avanzado, Power Pivot y modelado financiero de Mariangel Sierra Jaller aplicada al control contable.",
      keywords: [
        "Excel Avanzado",
        "Modelado financiero",
        "Power Pivot",
        "Consolidación contable",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "gestion-agil-procesos-proyectos": {
    collection: "certifications",
    slug: "gestion-agil-procesos-proyectos",
    id: "scrumFoundations",
    lang: "es",
    eyebrow: "Certificación Profesional · 2023",
    title: "Fundamentos de Gestión Ágil de Proyectos con Scrum & Mejora Continua",
    subtitle:
      "Marcos ágiles aplicados a la entrega iterativa, priorización de requerimientos con valor de negocio, tableros Kanban y retrospectivas de mejora.",
    meta: [
      { label: "Emisor", value: "Metodologías Ágiles & Mejora Continua" },
      { label: "Año", value: "2023" },
      { label: "Enfoque", value: "Scrum, Kanban & Productividad de Equipos" },
      { label: "Estado", value: "Completada y Vigente" },
    ],
    overview: [
      "Valida el conocimiento de los principios ágiles del manifiesto y la implementación del marco Scrum en la gestión de proyectos de transformación operativa y desarrollo de software.",
      "Mariangel aplica estos principios para descomponer iniciativas complejas —como la migración o depuración de catálogos ERP— en sprints manejables con entregables tangibles cada semana.",
      "Combina Scrum con tableros Kanban para visibilizar cuellos de botella en el flujo de autorizaciones de compras y trámites de tesorería, optimizando el rendimiento colectivo.",
    ],
    keyPointsTitle: "Competencias Validadas",
    keyPoints: [
      "Comprensión de roles, artefactos y eventos de Scrum (Product Backlog, Sprint Planning, Dailies, Retrospectivas).",
      "Gestión visual de flujos de trabajo mediante tableros Kanban con límites de trabajo en progreso (WIP).",
      "Descomposición de requerimientos de usuarios en historias de usuario con criterios de aceptación claros.",
      "Cultura de mejora continua orientada a la identificación proactiva de fricciones operacionales.",
      "Articulación de equipos multidisciplinarios entre áreas de negocio, contabilidad y soporte tecnológico.",
    ],
    outcomesTitle: "Aplicación Práctica",
    outcomes: [
      { metric: "100%", label: "Entregas a tiempo en sprints de implementación de mejoras analíticas" },
      { metric: "Visibilidad", label: "Transparencia total en el estado de requerimientos de compras institucionales" },
      { metric: "Agilidad", label: "Capacidad de adaptación rápida ante cambios normativos y tributarios" },
    ],
    tools: [
      "Scrum",
      "Kanban",
      "Historias de Usuario",
      "Gestión de Backlog",
      "Sprint Planning",
      "Mejora Continua",
      "Jira / Trello",
    ],
    relatedProjects: ["academicEngineeringSuite", "procurementInventoryControl"],
    seo: {
      title: "Certificación Gestión Ágil Scrum & Procesos | Mariangel Sierra",
      description:
        "Certificación de Mariangel Sierra Jaller en gestión ágil de proyectos con Scrum y Kanban aplicada a operaciones y analítica.",
      keywords: [
        "Scrum",
        "Kanban",
        "Gestión ágil",
        "Mejora continua",
        "Historias de usuario",
        "Mariangel Sierra Jaller",
      ],
    },
  },
};
