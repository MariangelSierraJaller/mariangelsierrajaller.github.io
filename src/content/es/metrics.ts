import type { MetricsSectionCopy } from "@/types/content";

export const ES_METRICS: MetricsSectionCopy = {
  eyebrow: "Impacto Cuantitativo",
  title: "Métricas y Resultados",
  subtitle:
    "Indicadores medibles que evidencian rigor financiero, optimización operativa y eficiencia computacional.",
  groups: {
    operations: {
      id: "operations",
      title: "Operaciones y Cadena de Suministro",
      subtitle: "Gestión de compras, control de existencias y cumplimiento con proveedores",
      items: [
        {
          label: "Tiempo de emisión de órdenes de compra",
          value: "-40%",
          detail: "Estandarización del flujo de aprobación en Oracle NetSuite",
        },
        {
          label: "Exactitud en inventarios físicos vs ERP",
          value: "99.2%",
          detail: "Conteos cíclicos y conciliación periódica de almacén",
        },
        {
          label: "Órdenes de compra y compras tramitadas",
          value: "1.200+",
          detail: "Atención oportuna de requisiciones institucionales en ASPAEN",
        },
        {
          label: "Proveedores homologados y evaluados",
          value: "80+",
          detail: "Negociación de acuerdos marco y condiciones comerciales de pago",
        },
      ],
    },
    finance: {
      id: "finance",
      title: "Control Financiero y Tesorería",
      subtitle: "Precisión en conciliaciones bancarias, arqueos de fondos y auditorías",
      items: [
        {
          label: "Discrepancias en conciliaciones bancarias",
          value: "0",
          detail: "Cruce mensual riguroso en múltiples cuentas bancarias corporativas",
        },
        {
          label: "Arqueos de caja menor sin descuadre",
          value: "100%",
          detail: "Legalizaciones periódicas con soportes válidos ante la DIAN",
        },
        {
          label: "Observaciones negativas en auditorías",
          value: "0",
          detail: "Archivos contables y expedientes en estricto cumplimiento normativo",
        },
        {
          label: "Ahorro en sobrecostos operativos",
          value: "15%",
          detail: "Control de duplicidades y renegociación oportuna de tarifas con terceros",
        },
      ],
    },
    automation: {
      id: "automation",
      title: "Automatización de Datos y BI",
      subtitle: "Impacto tangible de scripts Python y cuadros de mando interactivos",
      items: [
        {
          label: "Reducción de tiempo en reportes ETL",
          value: "85%",
          detail: "Sustitución de manipulación manual en hojas de cálculo por scripts Python",
        },
        {
          label: "Registros contables procesados por minuto",
          value: "50.000+",
          detail: "Pipelines estructurados con Pandas y validaciones automáticas de datos",
        },
        {
          label: "Disponibilidad de tableros ejecutivos",
          value: "24/7",
          detail: "Power BI interactivo para consulta gerencial inmediata de KPIs",
        },
        {
          label: "Horas hombre mensuales ahorradas",
          value: "60+ hrs",
          detail: "Automatización de cruces documentales y auditorías rutinarias",
        },
      ],
    },
    academic: {
      id: "academic",
      title: "Formación Universitaria y Multidisciplinaria",
      subtitle: "Compromiso académico riguroso en múltiples ramas de ingeniería y tecnología",
      items: [
        {
          label: "Ingenierías cursadas en paralelo",
          value: "3",
          detail: "Ingeniería de Sistemas, Ingeniería Industrial e Ingeniería Biomédica",
        },
        {
          label: "Años continuos de experiencia práctica",
          value: "4+",
          detail: "Trabajo ininterrumpido en operaciones desde febrero de 2022",
        },
        {
          label: "Certificaciones técnicas y profesionales",
          value: "6",
          detail: "Especializaciones en NetSuite, Python, Power BI y marcos de trabajo ágiles",
        },
        {
          label: "Nivel de dominio de idioma inglés",
          value: "B2",
          detail: "Competencia profesional para equipos internacionales y técnicos",
        },
      ],
    },
  },
};
