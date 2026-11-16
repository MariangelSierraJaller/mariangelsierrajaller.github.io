import type { ProjectId } from "@/types/content";
import type { ProjectSummaryCopy } from "@/types/project";

export const ES_PROJECT_SUMMARIES: Record<ProjectId, ProjectSummaryCopy> = {
  netsuiteEtlPipeline: {
    id: "netsuiteEtlPipeline",
    title: "Pipeline ETL Oracle NetSuite & Automatización",
    subtitle: "Extracción programada de Saved Searches, normalización con Pandas y carga analítica en SQL",
    category: "Ingeniería de Datos & ERP",
    summary:
      "Arquitectura automatizada en Python para la extracción, limpieza y consolidación de transacciones contables y de compras desde Oracle NetSuite hacia bases de datos relacionales y modelos analíticos de Power BI, eliminando reportes manuales en hojas de cálculo dispersas.",
    impactMetric: {
      value: "-92%",
      label: "Tiempo de Procesamiento de Reportes",
    },
    tags: ["Python", "Pandas", "Oracle NetSuite", "XML/JSON", "SQL", "ETL"],
  },
  financialBiSuite: {
    id: "financialBiSuite",
    title: "Suite Ejecutiva de Business Intelligence Financiero",
    subtitle: "Tableros de control directivo, análisis de variaciones presupuestales y modelado DAX avanzado",
    category: "Business Intelligence & Finanzas",
    summary:
      "Diseño e implementación de un ecosistema analítico en Power BI con modelado en estrella y métricas DAX avanzadas para la alta dirección de ASPAEN, permitiendo visibilidad en tiempo real sobre ejecución presupuestal, flujos de caja y márgenes operativos.",
    impactMetric: {
      value: "100%",
      label: "Visibilidad Presupuestal en Tiempo Real",
    },
    tags: ["Power BI", "DAX", "Power Query", "Modelado Estrella", "Finanzas", "KPIs"],
  },
  procurementInventoryControl: {
    id: "procurementInventoryControl",
    title: "Control Integral de Compras e Inventarios en ERP",
    subtitle: "Ciclo Procure-to-Pay, matching de 3 vías y optimización de almacén institucional",
    category: "Operaciones & Cadena de Suministro",
    summary:
      "Estandarización y gobernanza de compras institucionales e inventarios en Oracle NetSuite para ASPAEN, abarcando solicitudes, órdenes de compra, recepciones de almacén y facturación electrónica con estricto control de auditoría interna.",
    impactMetric: {
      value: "99.4%",
      label: "Exactitud de Registro en Inventario",
    },
    tags: ["Oracle NetSuite", "Procure-to-Pay", "Inventarios", "Facturación Electrónica", "Auditoría"],
  },
  treasuryAuditAutomation: {
    id: "treasuryAuditAutomation",
    title: "Automatización de Tesorería & Conciliación Bancaria",
    subtitle: "Conciliación algorítmica de recaudos masivos, arqueos de caja y control antifraude",
    category: "Tesorería & Control Interno",
    summary:
      "Sistematización del cotejo entre extractos bancarios multientidad y registros contables de matrículas y pensiones escolares en ASPAEN, reduciendo tiempos de cierre mensual de 4 días a 4 horas y garantizando trazabilidad absoluta de cada transacción.",
    impactMetric: {
      value: "4d → 4h",
      label: "Reducción en Tiempo de Cierre Mensual",
    },
    tags: ["Tesorería", "Conciliación Bancaria", "Python", "Control Interno", "Excel Avanzado"],
  },
  clinicalBioengineering: {
    id: "clinicalBioengineering",
    title: "Gestión Tecnológica Biomédica & Metrología Clínica",
    subtitle: "Protocolos de tecnovigilancia, ciclo de vida de equipamiento médico y software clínico en el ITM",
    category: "Ingeniería Biomédica & Salud",
    summary:
      "Investigación aplicada y formulación de protocolos para la gestión integral de tecnologías biomédicas hospitalarias en el ITM, integrando adquisición tecnológica especializada, aseguramiento metrológico, normatividad INVIMA y conectividad de señales clínicas.",
    impactMetric: {
      value: "100%",
      label: "Cumplimiento Normativo Clínico",
    },
    tags: ["Ingeniería Biomédica", "Tecnovigilancia", "Metrología", "Software Médico", "Gestión Hospitalaria"],
  },
  academicEngineeringSuite: {
    id: "academicEngineeringSuite",
    title: "Suite de Ingeniería: Arquitectura de Sistemas & Optimización",
    subtitle: "Convergencia de Ingeniería de Sistemas e Industrial (San José) y fundamentos de software SENA",
    category: "Ingeniería de Sistemas & Procesos",
    summary:
      "Conjunto integrado de proyectos y metodologías de ingeniería desarrollados entre Fundación Universidad San José y SENA, articulando teoría de colas, optimización de operaciones industriales, modelado relacional de datos y diseño de arquitecturas orientadas a servicios.",
    impactMetric: {
      value: "+38%",
      label: "Eficiencia Estimada en Flujos Organizacionales",
    },
    tags: ["Ingeniería de Sistemas", "Ingeniería Industrial", "SENA", "CRISP-DM", "SQL", "Optimización"],
  },
};