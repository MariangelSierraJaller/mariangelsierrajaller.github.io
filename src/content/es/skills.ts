import type { SkillsSectionCopy } from "@/types/content";

export const ES_SKILLS: SkillsSectionCopy = {
  eyebrow: "Competencias y Capacidades",
  title: "Habilidades Profesionales",
  subtitle:
    "Combinación distintiva de rigor administrativo, finanzas corporativas, analítica computacional y múltiples ramas de ingeniería.",
  languagesTitle: "Idiomas",
  softSkillsTitle: "Habilidades Blandas e Interpersonales",
  softSkills: [
    "Pensamiento crítico y análisis cuantitativo",
    "Liderazgo operativo y trabajo colaborativo",
    "Resolución estructurada de problemas complejos",
    "Comunicación asertiva puente técnica-negocio",
    "Atención meticulosa al detalle y control interno",
    "Gestión eficiente del tiempo y priorización ágil",
    "Adaptabilidad y aprendizaje continuo autónomo",
  ],
  spokenLanguages: {
    es: { name: "Español", level: "Nativo" },
    en: { name: "Inglés", level: "B2 (Intermedio Avanzado)" },
    fr: { name: "Francés", level: "Básico (A2)" },
    ko: { name: "Coreano", level: "Básico (A1)" },
  },
  groups: {
    management: {
      id: "management",
      title: "Gestión Administrativa y Operaciones",
      tagline: "Dirección de compras, logística de suministros y control de inventarios",
      items: [
        {
          name: "Gestión Integral de Compras",
          level: 95,
          context: "Ciclo completo de adquisiciones, órdenes de compra y evaluación de proveedores",
        },
        {
          name: "Facturación Electrónica DIAN",
          level: 95,
          context: "Validación tributaria, CUFE, radicación en ERP y resolución de discrepancias",
        },
        {
          name: "Control de Inventarios y Almacén",
          level: 90,
          context: "Kardex, conteos físicos periódicos y conciliación contra existencias ERP",
        },
        {
          name: "Gestión Documental y Auditoría",
          level: 92,
          context: "Custodia probatoria de soportes contables y archivo digital auditable",
        },
        {
          name: "Logística y Cadena de Suministro",
          level: 88,
          context: "Planificación de compras operativas y abastecimiento continuo sin desabasto",
        },
      ],
    },
    finance: {
      id: "finance",
      title: "Finanzas Corporativas y Tesorería",
      tagline: "Control riguroso de flujos de caja, arqueos y conciliaciones bancarias",
      items: [
        {
          name: "Tesorería y Flujo de Caja",
          level: 92,
          context: "Programación de egresos, pagos a proveedores y control diario de liquidez",
        },
        {
          name: "Conciliaciones Bancarias Multicuenta",
          level: 95,
          context: "Cruce mensual de extractos bancarios con 100% de conciliación",
        },
        {
          name: "Manejo y Arqueo de Caja Menor",
          level: 94,
          context: "Políticas de desembolso, legalizaciones de gastos y arqueos sorpresivos",
        },
        {
          name: "Contabilidad General y Causaciones",
          level: 90,
          context: "Registro de cuentas por pagar, retenciones en la fuente y causaciones",
        },
        {
          name: "Modelado Financiero en Excel",
          level: 92,
          context: "Fórmulas avanzadas, tablas dinámicas, escenarios y consolidación",
        },
      ],
    },
    analytics: {
      id: "analytics",
      title: "Analítica de Datos y Business Intelligence",
      tagline: "Transformación de datos brutos en tableros interactivos y métricas de decisión",
      items: [
        {
          name: "Power BI (DAX & Power Query)",
          level: 92,
          context: "Modelado dimensional en estrella, medidas DAX avanzadas y tableros interactivos",
        },
        {
          name: "Python para Análisis (Pandas, NumPy)",
          level: 88,
          context: "Limpieza exploratoria (EDA), agregación y tratamiento estructurado de datos",
        },
        {
          name: "SQL & Bases de Datos Relacionales",
          level: 85,
          context: "Consultas complejas, uniones, agregaciones y extracción directa de fuentes",
        },
        {
          name: "Metodología CRISP-DM",
          level: 90,
          context: "Ciclo analítico desde la formulación de objetivos hasta el despliegue",
        },
        {
          name: "Diseño de Cuadros de Mando (KPIs)",
          level: 92,
          context: "Definición y monitoreo de indicadores de desempeño operativo y financiero",
        },
      ],
    },
    automation: {
      id: "automation",
      title: "Automatización de Procesos y ETL",
      tagline: "Desarrollo de pipelines reproducibles y eliminación de tareas manuales",
      items: [
        {
          name: "Pipelines ETL con Python",
          level: 90,
          context: "Extracción automatizada desde ERP, depuración de anomalías y carga limpia a BI",
        },
        {
          name: "Integraciones ERP (XML / JSON)",
          level: 85,
          context: "Tratamiento de formatos estructurados para intercambio seguro de información",
        },
        {
          name: "Automatización con Zapier & Webhooks",
          level: 82,
          context: "Conexión de herramientas colaborativas y disparadores automáticos de alertas",
        },
        {
          name: "Estandarización de Procesos (SOP)",
          level: 92,
          context: "Elaboración de manuales operativos y diagramación de flujos optimizados",
        },
        {
          name: "Control de Versiones (Git & GitHub)",
          level: 85,
          context: "Gestión de código fuente, control de versiones y colaboración técnica",
        },
      ],
    },
    engineering: {
      id: "engineering",
      title: "Ingeniería Industrial y de Sistemas",
      tagline: "Optimización de procesos, arquitectura de software y marcos ágiles",
      items: [
        {
          name: "Arquitectura de Software y Lógica",
          level: 88,
          context: "Principios modulares, programación estructurada y diseño de soluciones",
        },
        {
          name: "Optimización de Procesos Industriales",
          level: 90,
          context: "Mapeo de valor, reducción de cuellos de botella y balanceo de cargas",
        },
        {
          name: "Metodologías Ágiles (Scrum & Kanban)",
          level: 88,
          context: "Planificación de iteraciones, gestión de tableros y mejora continua",
        },
        {
          name: "Control Estadístico de Calidad (SPC)",
          level: 82,
          context: "Análisis de variabilidad, muestreo y capacidad de procesos operativos",
        },
        {
          name: "Gestión de Proyectos Tecnológicos",
          level: 86,
          context: "Control de hitos, alcance, entregables y alineación con objetivos de negocio",
        },
      ],
    },
    biomedical: {
      id: "biomedical",
      title: "Bioingeniería y Tecnología Clínica",
      tagline: "Tecnovigilancia, gestión hospitalaria y software clínico aplicado",
      items: [
        {
          name: "Software Clínico y Gestión Hospitalaria",
          level: 82,
          context: "Sistemas de información en salud, trazabilidad clínica e historias digitales",
        },
        {
          name: "Compras y Mantenimiento de Equipos Médicos",
          level: 84,
          context: "Evaluación de tecnologías sanitarias, fichas técnicas y acuerdos de servicio",
        },
        {
          name: "Tecnovigilancia y Normatividad Sanitaria",
          level: 80,
          context: "Protocolos de seguridad del paciente y cumplimiento de estándares del sector salud",
        },
        {
          name: "Procesamiento de Señales Biomédicas",
          level: 78,
          context: "Adquisición, filtrado y análisis computacional de variables fisiológicas",
        },
      ],
    },
  },
};
