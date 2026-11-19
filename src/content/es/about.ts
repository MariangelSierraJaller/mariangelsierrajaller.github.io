import type { AboutCopy, EducationCopyItem, EducationId } from "@/types/content";

export const ES_ABOUT: AboutCopy = {
  eyebrow: "Trayectoria y Formación",
  title: "Sobre mí",
  subtitle:
    "Ingeniería de Sistemas e Ingeniería Industrial aplicadas para transformar datos y procesos en resultados operativos medibles.",
  terminalCaption: "mariangel@sierra-jaller:~$ cat profile.json",
  roleNarratives: {
    general: {
      heading: "La Convergencia de Dos Mundos",
      subheading: "Uniendo la visión de negocio con la precisión computacional",
      paragraphs: [
        "Soy Mariangel Sierra Jaller. Desde 2022 en ASPAEN he comprobado que la eficiencia operativa surge al entender a fondo los procesos administrativos y respaldarlos con automatización e ingeniería de datos.",
        "Graduada el 10 de septiembre de 2026 como Ingeniera de Sistemas, Ingeniera Industrial y Tecnóloga en Sistemas en la Fundación Universidad San José, y estudiante de Ingeniería Biomédica en el ITM, diagnostico cuellos de botella con criterio industrial y construyo pipelines automatizados con rigor de sistemas.",
        "He administrado el ciclo completo de compras, el control de tesorería y auditorías internas en Oracle NetSuite, mientras programo scripts en Python y tableros en Power BI que ahorran más de 30 horas hombre mensuales.",
        "Mi objetivo es conectar operación, finanzas y datos para sostener modelos de gestión ágiles, trazables y verificables.",
      ],
      targetRoles: [
        "Especialista en Operaciones ERP",
        "Analista de Procesos y Datos",
        "Coordinadora de Compras y Finanzas",
        "Ingeniera de Datos / BI",
      ],
      stats: [
        { label: "Experiencia Práctica", value: "4+ Años" },
        { label: "Titulación San José", value: "Sistemas e Industrial" },
        { label: "ERP Corporativo", value: "Oracle NetSuite" },
        { label: "Idiomas", value: "EN (B2) · ES (Nativo)" },
      ],
    },
    admin: {
      heading: "La Visión Estratégica y Operativa",
      subheading: "Optimizando la complejidad, entregando certidumbre y control financiero",
      paragraphs: [
        "La gestión administrativa contemporánea exige método, trazabilidad probatoria y control financiero verificable en cada etapa del proceso.",
        "Durante más de cuatro años en ASPAEN he administrado el ciclo integral de adquisiciones, desde la recepción de requisiciones y órdenes de compra hasta la validación de facturación electrónica DIAN (XML/CUFE) y la auditoría de almacén.",
        "En tesorería he ejecutado conciliaciones bancarias multicuenta con cero discrepancias mensuales y administrado fondos de caja menor conforme a políticas internas, cerrando auditorías internas y fiscales sin observaciones.",
        "Combino el enfoque de la Ingeniería Industrial para eliminar reprocesos con el dominio de ERP y sistemas de información que sostienen la continuidad operativa.",
      ],
      targetRoles: [
        "Coordinadora de Compras y Suministros",
        "Analista de Tesorería y Finanzas",
        "Administradora de Operaciones ERP",
        "Especialista en Control Interno y Auditoría",
      ],
      stats: [
        { label: "Gestión Operativa", value: "4+ Años" },
        { label: "Conciliaciones Bancarias", value: "100% Sin descuadres" },
        { label: "Auditorías Superadas", value: "Cero observaciones" },
        { label: "Enfoque de Negocio", value: "Ingeniería Industrial" },
      ],
    },
    tech: {
      heading: "La Mente Analítica y de Software",
      subheading: "Arquitectura de datos, automatización reproducible y Business Intelligence",
      paragraphs: [
        "Entiendo el software como la herramienta definitiva para resolver problemas de negocio reales. No concibo la analítica como un fin estético, sino como un motor de decisiones fundamentadas en datos fiables y actualizados.",
        "En mi labor técnica, he diseñado y puesto en producción pipelines ETL con Python (Pandas) que extraen miles de registros desde Oracle NetSuite, depurando inconsistencias y cargándolos en modelos dimensionales de Power BI.",
        "Mi titulación como Ingeniera de Sistemas y Tecnóloga en Sistemas (San José, 10 de septiembre de 2026) junto a mi formación técnica en software (SENA) me respaldan para estructurar bases de datos relacionales SQL, modelar métricas DAX e integrar flujos XML y JSON.",
        "Asimismo, mi avance hacia la tercera ingeniería en Ingeniería Biomédica en el ITM fortalece mi rigor en estándares clínicos, procesamiento de señales y cumplimiento normativo en entornos de alta exigencia tecnológica.",
      ],
      targetRoles: [
        "Analista de Datos / BI Developer",
        "Ingeniera de Automatización de Procesos (ETL)",
        "Especialista en Integración ERP NetSuite",
        "Desarrolladora de Software / Soluciones",
      ],
      stats: [
        { label: "Ahorro de Tiempo ETL", value: "85%" },
        { label: "Stack Principal", value: "Python · Power BI · SQL" },
        { label: "Modelado BI", value: "DAX & Power Query" },
        { label: "Metodología", value: "CRISP-DM & Scrum" },
      ],
    },
  },
  pillarsTitle: "Pilares Profesionales",
  pillars: [
    {
      title: "Criterio Financiero y Operativo",
      description:
        "Comprensión profunda de la cadena de compras, tesorería, conciliaciones bancarias y su impacto directo en la salud financiera de la empresa.",
    },
    {
      title: "Ingeniería y Rigor Metodológico",
      description:
        "Doble titulación profesional en Ingeniería de Sistemas e Industrial, Tecnología en Sistemas y avance en Ingeniería Biomédica para modelar sistemas complejos.",
    },
    {
      title: "Automatización y Analítica Práctica",
      description:
        "Capacidad comprobada de sustituir tareas repetitivas por scripts Python y modelos Power BI que liberan horas de trabajo y eliminan fallas humanas.",
    },
    {
      title: "Adaptabilidad y Comunicación Asertiva",
      description:
        "Capacidad de dominar nuevas herramientas con rapidez, comunicar hallazgos técnicos a audiencias directivas y colaborar eficazmente en equipos multidisciplinarios.",
    },
  ],
  educationTitle: "Formación Académica y Continua",
  educationSubtitle:
    "Una sólida base técnica enriquecida con formación universitaria complementaria en múltiples ramas de la ingeniería.",
  inProgressLabel: "En curso",
  viewDetailsLabel: "Ver programa detallado",
  viewAllEducationLabel: "Ver toda la educación",
};

export const ES_EDUCATION: Record<EducationId, EducationCopyItem> = {
  sanJoseSystems: {
    id: "sanJoseSystems",
    degree: "Ingeniería de Sistemas",
    summary:
      "Título profesional obtenido el 10 de septiembre de 2026, enfocado en arquitectura de software, bases de datos relacionales, analítica computacional e ingeniería de requerimientos.",
    badges: ["Arquitectura de Software", "Bases de Datos & SQL", "Analítica Computacional", "Titulada Sep 2026"],
  },
  sanJoseIndustrial: {
    id: "sanJoseIndustrial",
    degree: "Ingeniería Industrial",
    summary:
      "Título profesional obtenido el 10 de septiembre de 2026, orientado a la optimización de procesos, gestión de la cadena de suministro, control de operaciones y cuadros de mando.",
    badges: ["Optimización de Procesos", "Cadena de Suministro", "Control de Calidad & KPIs", "Titulada Sep 2026"],
  },
  sanJoseSystemsTech: {
    id: "sanJoseSystemsTech",
    degree: "Tecnología en Sistemas",
    summary:
      "Titulación tecnológica otorgada el 10 de septiembre de 2026 en gestión de infraestructura, redes, desarrollo de aplicaciones y administración de sistemas de información empresariales.",
    badges: ["Sistemas de Información", "Desarrollo de Aplicaciones", "Redes & Bases de Datos", "Titulada Sep 2026"],
  },
  itmBiomedical: {
    id: "itmBiomedical",
    degree: "Ingeniería Biomédica (Tercera Ingeniería)",
    summary:
      "Formación interdisciplinaria en curso hacia mi tercer título de ingeniería, enfocada en software clínico, procesamiento de bioseñales, tecnovigilancia y tecnología hospitalaria.",
    badges: ["Software Clínico", "Gestión Hospitalaria", "Instrumentación Médica", "En curso"],
  },
  itmAccountingTech: {
    id: "itmAccountingTech",
    degree: "Técnico Contable y Financiero orientado a Sistemas",
    summary:
      "Programa técnico centrado en contabilidad general, tesorería, conciliaciones bancarias, nómina y registro de información en ERP NetSuite.",
    badges: ["Contabilidad General", "Tesorería & Bancos", "Conciliaciones", "ERP NetSuite"],
  },
  senaSoftware: {
    id: "senaSoftware",
    degree: "Técnico en Programación de Software",
    summary:
      "Fundamentos sólidos de desarrollo algorítmico, lógica de programación, bases de datos relacionales y construcción de aplicaciones de software.",
    badges: ["Programación", "Lógica & Algoritmos", "Bases de Datos", "Metodologías de Desarrollo"],
  },
  inemComputerScience: {
    id: "inemComputerScience",
    degree: "Bachiller Especializado en Informática",
    summary:
      "Formación media vocacional con énfasis en herramientas ofimáticas avanzadas, fundamentos de hardware, redes y soporte técnico computacional.",
    badges: ["Fundamentos TI", "Ofimática Avanzada", "Mantenimiento & Redes", "Lógica Básica"],
  },
};
