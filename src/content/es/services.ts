import type { ServicesSectionCopy } from "@/types/content";

export const ES_SERVICES: ServicesSectionCopy = {
  eyebrow: "Soluciones Profesionales",
  title: "Servicios Especializados",
  subtitle:
    "Uno el criterio financiero, el rigor de procesos y la capacidad de desarrollo para entregar soluciones operativas medibles.",
  deliverablesLabel: "Entregables clave",
  impactLabel: "Impacto comprobable",
  ctaLabel: "Consultar servicio",
  items: {
    erpOperations: {
      id: "erpOperations",
      title: "Administración Operativa de ERP (Oracle NetSuite)",
      tagline: "Configuración, auditoría y control integral del ciclo de compras e inventarios",
      description:
        "Estabilización y gestión operativa del ERP corporativo. Administro el ciclo completo de adquisiciones, órdenes de compra, control de existencias en almacén y validación de facturación electrónica DIAN, asegurando consistencia en los datos maestros.",
      deliverables: [
        "Flujo integral parametrizado de órdenes de compra, recepciones y facturas",
        "Control y conciliación periódica de inventarios físicos contra registros ERP",
        "Estandarización y depuración de catálogos de proveedores y artículos",
        "Manuales de procedimiento operativo (SOP) y capacitación a usuarios internos",
      ],
      impact: "Eliminación de órdenes de compra huérfanas y 99.2% de precisión en inventarios ERP.",
      tags: ["Oracle NetSuite", "Compras", "Inventarios", "Facturación Electrónica", "SOP"],
    },
    financialControl: {
      id: "financialControl",
      title: "Control Financiero, Tesorería y Conciliaciones",
      tagline: "Custodia rigurosa del flujo de caja, arqueos y conciliación bancaria multicuenta",
      description:
        "Estructuración y supervisión del control de egresos, fondos de caja menor y conciliaciones bancarias multicuenta. Proporciono certidumbre documental, orden en expedientes contables y cumplimiento normativo ante auditorías.",
      deliverables: [
        "Conciliación bancaria mensual multicuenta (ahorros y corrientes) sin descuadres",
        "Arqueo y control de legalizaciones de fondos de caja menor",
        "Expedientes de pago a proveedores con trazabilidad probatoria completa",
        "Plantillas avanzadas de consolidación y modelado financiero en Excel",
      ],
      impact:
        "Cero observaciones en auditorías de tesorería y reducción total de diferencias en arqueos de fondos.",
      tags: ["Tesorería", "Conciliación Bancaria", "Caja Menor", "Auditoría", "Control Interno"],
    },
    biDashboards: {
      id: "biDashboards",
      title: "Business Intelligence y Tableros Ejecutivos",
      tagline: "Modelado relacional y cuadros de mando interactivos en Power BI y Tableau",
      description:
        "Transformación de bases de datos contables y operativas en tableros analíticos interactivos. Conecto múltiples fuentes mediante Power Query, fórmulas DAX y SQL para que la gerencia tome decisiones fundamentadas en tiempo real.",
      deliverables: [
        "Modelo de datos relacional en estrella con hechos y dimensiones normalizadas",
        "Medidas DAX complejas para márgenes, variaciones presupuestales y KPIs",
        "Tableros interactivos con navegación ejecutiva y filtros dinámicos por centro de costo",
        "Sesiones de capacitación para directores y líderes de área",
      ],
      impact:
        "Reducción de días a segundos en la consulta de indicadores financieros y de abastecimiento.",
      tags: ["Power BI", "DAX", "Power Query", "SQL", "Tableau", "KPIs"],
    },
    processAutomation: {
      id: "processAutomation",
      title: "Automatización de Procesos y Pipelines ETL",
      tagline: "Scripts en Python y flujos de integración para erradicar tareas repetitivas",
      description:
        "Diseño de flujos automatizados para la extracción, limpieza (EDA) y consolidación de reportes de negocio. Sustituyo tareas manuales en hojas de cálculo por scripts reproducibles que procesan miles de registros en segundos.",
      deliverables: [
        "Scripts ETL en Python (Pandas) con validaciones automáticas de integridad",
        "Normalización y cruce automatizado de archivos planos, XML y JSON",
        "Disparadores automáticos y alertas por inconsistencias o vencimientos",
        "Documentación técnica de arquitectura y mantenimiento de scripts",
      ],
      impact:
        "Ahorro de más del 80% del tiempo operativo en cierres mensuales y consolidaciones de datos.",
      tags: ["Python", "Pandas", "ETL", "Automatización", "XML / JSON", "APIs"],
    },
  },
};
