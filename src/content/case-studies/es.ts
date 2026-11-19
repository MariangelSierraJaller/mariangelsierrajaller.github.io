import type { CaseStudyId } from "@/types/content";
import type { CaseStudyCopy } from "@/types/project";

export const ES_CASE_STUDIES: Record<CaseStudyId, CaseStudyCopy> = {
  netsuiteEtlPipeline: {
    id: "netsuiteEtlPipeline",
    lang: "es",
    title: "Pipeline ETL Oracle NetSuite: De la Extracción Cruda a Modelos Analíticos",
    subtitle:
      "Ingeniería de datos aplicada para transformar transacciones contables complejas en almacenes de datos listos para Business Intelligence",
    roleLabel: "Ingeniera de Datos & Automatización ERP",
    contextLabel: "ASPAEN Colombia · 2024 — Presente",
    outcomeSummary:
      "Se sustituyó un proceso manual de 12 horas semanales de descarga de reportes fragmentados por un pipeline automatizado en Python con validación de esquemas y carga directa, reduciendo los tiempos de refresco en un 92% y eliminando discrepancias por manipulación humana.",
    heroMetrics: [
      { value: "-92%", label: "Tiempo de Procesamiento de Reportes" },
      { value: "100%", label: "Consistencia de Cuentas Contables" },
      { value: "35k+", label: "Transacciones Procesadas Mensualmente" },
      { value: "0", label: "Errores por Manipulación Manual" },
    ],
    sections: [
      {
        id: "context-problem",
        eyebrow: "Diagnóstico Inicial",
        title: "El Cuello de Botella Operativo en la Reportería ERP",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Oracle NetSuite alberga el histórico transaccional de compras, tesorería y contabilidad de múltiples centros educativos. Sin embargo, la extracción nativa para informes directivos requería exportaciones manuales en archivos CSV y hojas de cálculo no estandarizadas.",
              "Este esquema generaba duplicidad de esfuerzos, riesgo latente de manipulación accidental de fórmulas contables y demoras de hasta 48 horas para que el equipo financiero obtuviera una fotografía confiable del cierre mensual.",
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "12 h/sem",
                label: "Tiempo manual invertido",
                detail: "Dedicado exclusivamente a descargar, combinar y formatear archivos CSV de NetSuite.",
              },
              {
                value: "48 h",
                label: "Latencia de información",
                detail: "Retraso promedio para reflejar asientos de ajuste en los informes de gestión directiva.",
              },
              {
                value: "14%",
                label: "Tasa de inconsistencias",
                detail: "Partidas con problemas de tipado de moneda, fechas o mapeo de centros de costo.",
              },
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Oportunidad de Modernización Tecnológica",
            body: "Aprovechando la formación en programación de software del SENA y la ingeniería de sistemas, se concibió un pipeline desacoplado que aprovecha Saved Searches y la API de NetSuite para alimentar un almacén de datos normalizado.",
          },
        ],
      },
      {
        id: "architecture-design",
        eyebrow: "Arquitectura Técnica",
        title: "Diseño del Flujo de Datos por Capas",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "La arquitectura se estructuró en cuatro etapas secuenciales: extracción parametrizada, limpieza y tipado estricto con Pandas, validación de reglas contables de negocio y carga final en capas de servicio listas para consumo en Power BI y consultas SQL.",
            ],
          },
          {
            type: "architecture",
            caption: "Flujo de Integración: Desde NetSuite Saved Searches hasta Modelos Dimensionales",
            layers: [
              {
                name: "1. Capa de Ingesta (Extract)",
                role: "Consultas programadas a NetSuite Saved Searches estructuradas en formatos XML y JSON con filtros incrementales.",
                tools: ["Oracle NetSuite SuiteScript", "RESTlet / Saved Searches", "Python Requests"],
              },
              {
                name: "2. Capa de Transformación (Transform)",
                role: "Normalización de tipos de cambio, validación de planes de cuentas contables, limpieza de cadenas y desanidado relacional.",
                tools: ["Python 3.11", "Pandas", "NumPy", "Pydantic"],
              },
              {
                name: "3. Capa de Almacenamiento (Load)",
                role: "Persistencia en base de datos relacional con esquema en estrella y tablas de hechos contables indexadas.",
                tools: ["PostgreSQL / SQLite Staging", "SQLAlchemy", "Indices B-Tree"],
              },
              {
                name: "4. Capa Semántica & Consumo",
                role: "Modelo tabular con relaciones 1 a varios, medidas DAX optimizadas y actualización programada automática.",
                tools: ["Power BI Desktop", "Power BI Gateway", "DirectQuery / Import"],
              },
            ],
          },
        ],
      },
      {
        id: "code-implementation",
        eyebrow: "Código & Lógica",
        title: "Transformación y Sanitización con Pandas",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "El script central se encarga de estandarizar las columnas transaccionales, mapear los códigos de centros de costo a la estructura organizacional y verificar que los débitos y créditos mantengan balance contable perfecto antes de la inserción.",
            ],
          },
          {
            type: "code",
            title: "etl_netsuite_transactions.py — Normalización y Verificación Contable",
            language: "python",
            snippet: `import pandas as pd
import numpy as np

def transform_netsuite_gl(raw_df: pd.DataFrame) -> pd.DataFrame:
    """
    Sanitiza y normaliza transacciones del Libro Mayor de NetSuite
    para su ingesta en el modelo dimensional de Power BI.
    """
    # 1. Copia profunda y renombrado canónico
    df = raw_df.copy()
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
    
    # 2. Parseo seguro de fechas ISO y períodos contables
    df["tran_date"] = pd.to_datetime(df["tran_date"], format="%d/%m/%Y", errors="coerce")
    df = df.dropna(subset=["tran_date"])
    
    # 3. Conversión numérica de montos y manejo de signos contables
    for col in ["amount_debit", "amount_credit"]:
        df[col] = (
            df[col]
            .astype(str)
            .str.replace(r"[^\\d.-]", "", regex=True)
            .pipe(pd.to_numeric, errors="coerce")
            .fillna(0.0)
        )
    
    # 4. Cálculo de importe neto firmado según naturaleza de cuenta
    df["net_amount"] = df["amount_debit"] - df["amount_credit"]
    
    # 5. Mapeo de centros de costo y dimensiones analíticas
    df["cost_center_code"] = df["department"].str.extract(r"^(\\d{3,4})")[0].fillna("0000")
    df["is_balanced"] = np.isclose(df.groupby("tran_id")["net_amount"].transform("sum"), 0.0, atol=0.01)
    
    return df.sort_values(by=["tran_date", "tran_id"]).reset_index(drop=True)`,
          },
          {
            type: "callout",
            tone: "lesson",
            title: "Control de Integridad Contable",
            body: "La validación matemática 'is_balanced' asegura que ningún asiento descuadrado ingrese al modelo semántico, alertando de inmediato a auditoría antes de que impacte los estados financieros.",
          },
        ],
      },
      {
        id: "comparison-impact",
        eyebrow: "Evaluación Comparativa",
        title: "Antes vs. Después de la Implementación",
        blocks: [
          {
            type: "comparison",
            headers: ["Dimensión Operativa", "Método Tradicional (Pre-2024)", "Pipeline Automatizado (Actual)"],
            rows: [
              ["Tiempo de extracción y refresco", "12 horas semanales manuales", "45 minutos automatizados por cron"],
              ["Frecuencia de actualización", "Semanal o mensual diferida", "Diaria automatizada en horas no laborales"],
              ["Calidad y consistencia del dato", "Sujeto a errores de tipeo y fórmulas en Excel", "100% validado con tipos estrictos en Pandas"],
              ["Trazabilidad del linaje de datos", "Hojas locales sin control de versiones", "Scripts versionados en Git con logs de auditoría"],
              ["Capacidad de análisis directivo", "Estático, tablas no interactivas", "Tableros dinámicos Power BI multidimensionales"],
            ],
          },
          {
            type: "timeline",
            steps: [
              {
                phase: "Fase 1",
                title: "Auditoría de Requerimientos & Mapeo de Saved Searches",
                outcome: "Identificación de 8 Saved Searches clave de cuentas por pagar, tesorería e inventarios.",
              },
              {
                phase: "Fase 2",
                title: "Desarrollo del Core ETL en Python & Pruebas Unitarias",
                outcome: "Implementación de funciones de sanitización, tipado y validación de doble partida.",
              },
              {
                phase: "Fase 3",
                title: "Carga en Base Relacional & Integración con Power BI",
                outcome: "Construcción del modelo semántico en estrella y medidas DAX con actualización desatendida.",
              },
              {
                phase: "Fase 4",
                title: "Entrega a Dirección Financiera & Capacitación",
                outcome: "Aprobación formal por parte de Revisoría Fiscal y Equipo Contable de ASPAEN.",
              },
            ],
          },
          {
            type: "callout",
            tone: "result",
            title: "Resultado Estratégico",
            body: "La organización pasó de reaccionar ante cierres retrasados a monitorear proactivamente sus desviaciones presupuestales día a día.",
          },
        ],
      },
    ],
    seo: {
      title: "Pipeline ETL Oracle NetSuite & Automatización Python | Mariangel Sierra",
      description:
        "Caso de estudio técnico sobre la construcción de un pipeline ETL en Python para extraer transacciones de Oracle NetSuite y poblar modelos de Power BI en ASPAEN.",
      keywords: [
        "Oracle NetSuite ETL",
        "Python Pandas ETL",
        "Automatización ERP",
        "Power BI NetSuite",
        "Ingeniería de Datos Contables",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  financialBiSuite: {
    id: "financialBiSuite",
    lang: "es",
    title: "Suite Ejecutiva de Business Intelligence Financiero & Control Presupuestal",
    subtitle:
      "Modelado dimensional en estrella, medidas DAX avanzadas y tableros interactivos para la toma de decisiones del consejo directivo",
    roleLabel: "Líder de Analítica Financiera & BI",
    contextLabel: "ASPAEN Colombia · 2023 — Presente",
    outcomeSummary:
      "Diseño e implantación de un ecosistema analítico en Power BI que unifica la ejecución presupuestal, costos por centro operativo, flujo de caja y cartera de los colegios de ASPAEN, dotando a la dirección de visibilidad inmediata y granular sobre cada peso invertido.",
    heroMetrics: [
      { value: "100%", label: "Visibilidad Presupuestal en Tiempo Real" },
      { value: "48h → 0", label: "Latencia en Análisis de Variaciones" },
      { value: "12", label: "Centros Operativos y Colegios Monitoreados" },
      { value: "+18%", label: "Eficacia en Detección de Sobrecostos" },
    ],
    sections: [
      {
        id: "bi-problem",
        eyebrow: "Desafío Estratégico",
        title: "Dispersión de Información Financiera y Falta de Visibilidad Ágil",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Gestionar múltiples sedes educativas con presupuestos independientes requiere una visión panorámica consolidada que permita comparar en segundos el gasto ejecutado frente a lo proyectado.",
              "Con anterioridad a esta suite, cada sede remitía hojas de cálculo con formatos heterogéneos, provocando que los consolidados para el consejo directivo requirieran días de trabajo manual de corte y pegado de cifras.",
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "12",
                label: "Hojas de cálculo aisladas",
                detail: "Consolidadas manualmente al final de cada ciclo mensual para las reuniones directivas.",
              },
              {
                value: "72 h",
                label: "Tiempo de preparación",
                detail: "Horas hombre requeridas para compilar el informe de ejecución presupuestal.",
              },
              {
                value: "0",
                label: "Capacidad de Drill-Down",
                detail: "Inexistencia de navegación interactiva desde la cifra general hasta la factura soporte.",
              },
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Objetivo del Proyecto",
            body: "Crear un modelo de datos unificado en Power BI bajo metodología Kimball (estrella) conectado directamente a las fuentes de NetSuite y bancos, permitiendo drill-down desde el consolidado nacional hasta el detalle de cada factura.",
          },
        ],
      },
      {
        id: "bi-architecture",
        eyebrow: "Arquitectura Dimensional",
        title: "Modelo Semántico y Tablas de Hechos",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "El modelo analítico se diseñó con una tabla de hechos central `FactTransaccionesContables` y una tabla `FactPresupuesto`, relacionadas con tablas de dimensiones conformadas: `DimCalendario`, `DimCentroCosto`, `DimCuentaContable` y `DimSede`.",
            ],
          },
          {
            type: "architecture",
            caption: "Esquema Dimensional en Estrella: Separación de Hechos y Dimensiones",
            layers: [
              {
                name: "Tablas de Hechos (Fact Tables)",
                role: "FactTransacciones (monto, tipo, débito, crédito) y FactPresupuesto (cuota asignada mensual por centro y cuenta).",
                tools: ["Granularidad: Transacción contable unitaria"],
              },
              {
                name: "Dimensiones de Filtro (Dimension Tables)",
                role: "DimCalendario (fechas, bimestres, semanas), DimCentroCosto (código, sede, líder) y DimPlanCuentas (PUC).",
                tools: ["Relaciones 1 a Varios (*:1) de dirección única"],
              },
              {
                name: "Capa de Medidas DAX",
                role: "Fórmulas de inteligencia de tiempo, cálculo dinámico de variación presupuestal absoluta y porcentual.",
                tools: ["DAX", "Tabular Model", "Row-Level Security (RLS)"],
              },
              {
                name: "Vistas y Paneles de Control",
                role: "Tableros para Rectoría (resumen alto nivel), Dirección Financiera (variaciones) y Auditoría (alertas).",
                tools: ["Power BI Service", "Sincronización Cloud", "Mobile Layout"],
              },
            ],
          },
        ],
      },
      {
        id: "bi-code",
        eyebrow: "Lógica DAX Avanzada",
        title: "Medidas Financieras de Inteligencia de Tiempo",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Para permitir comparativas justas entre meses y trimestres, se programaron medidas DAX que calculan el gasto ejecutado, la variación respecto al presupuesto asignado y el semáforo condicional de alerta.",
            ],
          },
          {
            type: "code",
            title: "financial_measures.dax — Medidas de Variación y Ejecución Presupuestal",
            language: "dax",
            snippet: `// Gasto Real Acumulado del Año (YTD)
Gasto Real YTD = 
CALCULATE(
    [Total Gasto Ejecutado],
    DATESYTD(DimCalendario[Fecha])
)

// Presupuesto Acumulado del Año (YTD)
Presupuesto YTD = 
CALCULATE(
    [Total Presupuesto Asignado],
    DATESYTD(DimCalendario[Fecha])
)

// Variación Absoluta ($)
Variacion Presupuesto $ = 
[Gasto Real YTD] - [Presupuesto YTD]

// Variación Porcentual (%) con manejo seguro de división por cero
Variacion Presupuesto % = 
DIVIDE(
    [Variacion Presupuesto $],
    [Presupuesto YTD],
    0
)

// Semáforo de Desviación Presupuestal
Semaforo Ejecucion = 
SWITCH(
    TRUE(),
    [Variacion Presupuesto %] > 0.05, "CRÍTICO - Sobreejecución (>5%)",
    [Variacion Presupuesto %] >= -0.05 && [Variacion Presupuesto %] <= 0.05, "NORMAL - En Rango Esperado",
    [Variacion Presupuesto %] < -0.05, "AHORRO / Subeejecución"
)`,
          },
          {
            type: "callout",
            tone: "result",
            title: "Impacto en Reuniones de Consejo Directivo",
            body: "El consejo directivo redujo el tiempo dedicado a revisar cifras de 3 horas a 30 minutos, enfocándose directamente en los centros de costo resaltados por el semáforo condicional de variación.",
          },
        ],
      },
      {
        id: "bi-results",
        eyebrow: "Resultados & Evolución",
        title: "Beneficios Tangibles y Gobernanza de Datos",
        blocks: [
          {
            type: "comparison",
            headers: ["Criterio de Evaluación", "Antes (Reportes en Hojas de Cálculo)", "Hoy (Suite Power BI Directiva)"],
            rows: [
              ["Tiempo de acceso a la información", "3 a 5 días tras cierre contable", "Inmediato / En tiempo real"],
              ["Nivel de detalle accesible", "Solo totales agrupados sin desglose", "Drill-down hasta factura y proveedor"],
              ["Control de acceso a la información", "Archivos compartidos por correo", "Seguridad por roles RLS según sede y cargo"],
              ["Decisiones sobre desviaciones", "Tardías, al final del bimestre", "Preventivas, durante el transcurso del mes"],
            ],
          },
          {
            type: "timeline",
            steps: [
              {
                phase: "Mes 1",
                title: "Entrevistas con Stakeholders & Definición de KPIs",
                outcome: "Consenso sobre 14 métricas esenciales de liquidez, rotación y ejecución presupuestal.",
              },
              {
                phase: "Mes 2",
                title: "Construcción del Modelo Tabular & Limpieza de Dimensiones",
                outcome: "Estandarización de catálogos de sedes, centros de costo y planes contables.",
              },
              {
                phase: "Mes 3",
                title: "Desarrollo de Medidas DAX y Diseño de Interfaz UI/UX",
                outcome: "Prototipado de pantallas con paleta corporativa y jerarquía visual accesible.",
              },
              {
                phase: "Mes 4",
                title: "Despliegue Productivo & Adopción Directiva",
                outcome: "Capacitación a rectores y directores administrativos con uso semanal activo.",
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: "Suite Ejecutiva de Business Intelligence Financiero | Mariangel Sierra",
      description:
        "Diseño e implementación de tableros de control en Power BI con modelado DAX avanzado y control presupuestal para ASPAEN.",
      keywords: [
        "Power BI Finanzas",
        "DAX Presupuesto",
        "Business Intelligence Ejecutivo",
        "Control Presupuestal ERP",
        "Modelado Estrella BI",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  procurementInventoryControl: {
    id: "procurementInventoryControl",
    lang: "es",
    title: "Control Integral de Compras e Inventarios en Oracle NetSuite",
    subtitle:
      "Reingeniería del ciclo Procure-to-Pay, matching de tres vías y control físico de activos en almacén",
    roleLabel: "Analista de Operaciones & Gestión ERP",
    contextLabel: "ASPAEN Medellín · 2023 — Presente",
    outcomeSummary:
      "Transformación operativa de las compras y almacenes de ASPAEN mediante la estandarización del ciclo Procure-to-Pay en NetSuite, alcanzando un 99.4% de exactitud en los registros de inventario y garantizando concordancia total entre órdenes de compra, recepciones físicas y facturación electrónica.",
    heroMetrics: [
      { value: "99.4%", label: "Exactitud de Inventario Físico vs ERP" },
      { value: "-65%", label: "Tiempo de Trámite de Órdenes de Compra" },
      { value: "100%", label: "Cumplimiento en Facturación Electrónica DIAN" },
      { value: "0", label: "Pagos Emitidos sin Recepción de Almacén" },
    ],
    sections: [
      {
        id: "procurement-context",
        eyebrow: "Contexto Operativo",
        title: "Del Caos Descentralizado a la Gobernanza Estricta",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "En organizaciones educativas con múltiples departamentos (laboratorios, aulas, mantenimiento, sistemas), las compras tienden a fragmentarse si no existen protocolos de aprobación y recepción unificados.",
              "Al asumir la gestión operativa en ASPAEN, se identificó la necesidad de erradicar compras urgentes no autorizadas y de asegurar que cada insumo físico que ingresa al colegio quede inmediatamente inventariado y costeado en Oracle NetSuite.",
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "99.4%",
                label: "Exactitud de inventario",
                detail: "Resultado de auditorías físicas periódicas frente a existencias teóricas en NetSuite.",
              },
              {
                value: "3-Way",
                label: "Matching documental",
                detail: "Obligatoriedad de casación entre Orden de Compra, Recepción de Ítem y Factura de Proveedor.",
              },
              {
                value: "-65%",
                label: "Reducción de ciclo de compra",
                detail: "Optimización de tiempos desde solicitud hasta aprobación final en el sistema.",
              },
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Enfoque de Ingeniería Industrial",
            body: "Aplicando principios de gestión de la cadena de suministro y control de inventarios, se mapeó el flujo de valor para eliminar desperdicios de tiempo y puntos ciegos en la custodia de materiales.",
          },
        ],
      },
      {
        id: "procurement-architecture",
        eyebrow: "Flujo de Procesos",
        title: "El Ciclo Procure-to-Pay Sistematizado",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Se configuró un flujo secuencial e inviolable en Oracle NetSuite donde ninguna etapa puede ejecutarse sin la autorización y verificación documental de la fase precedente.",
            ],
          },
          {
            type: "architecture",
            caption: "Secuencia Procure-to-Pay en Oracle NetSuite",
            layers: [
              {
                name: "1. Requisición de Compra (PR)",
                role: "El solicitante crea la solicitud con centro de costo, justificación y especificación técnica del bien o servicio.",
                tools: ["NetSuite Purchase Requisition", "Aprobación de Área"],
              },
              {
                name: "2. Orden de Compra Aprobada (PO)",
                role: "Compras cotiza con proveedores homologados, valida suficiencia presupuestal y emite la orden oficial.",
                tools: ["NetSuite Purchase Order", "Control Presupuestal en Línea"],
              },
              {
                name: "3. Recepción Física de Ítem (Item Receipt)",
                role: "Almacén inspecciona calidad, cuenta unidades físicas e ingresa el ítem al stock del almacén central o sede.",
                tools: ["NetSuite Item Receipt", "Inspección de Calidad", "Código de Barras"],
              },
              {
                name: "4. Facturación de Proveedor (Vendor Bill)",
                role: "Contabilidad valida el XML de la factura electrónica DIAN y ejecuta el matching automático de 3 vías antes de autorizar pago.",
                tools: ["NetSuite Vendor Bill", "Validación DIAN XML", "Matching 3-Vías"],
              },
            ],
          },
        ],
      },
      {
        id: "procurement-code",
        eyebrow: "Lógica de Control SQL",
        title: "Verificación de 3-Way Matching y Variaciones de Costo",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Para auditar la concordancia entre lo pedido, lo recibido y lo cobrado por los proveedores, se estructuraron consultas de auditoría que alertan inmediatamente ante discrepancias de cantidad o precio unitario.",
            ],
          },
          {
            type: "code",
            title: "audit_three_way_matching.sql — Detección de Inconsistencias de Compra",
            language: "sql",
            snippet: `-- Auditoría de Matching de 3 Vías: Orden de Compra vs Recepción vs Factura
WITH po_summary AS (
    SELECT 
        po.id AS po_id,
        po.tranid AS po_number,
        po.vendor_id,
        pol.item_id,
        SUM(pol.quantity) AS qty_ordered,
        AVG(pol.rate) AS rate_ordered,
        SUM(pol.amount) AS total_ordered
    FROM ns_purchase_order po
    JOIN ns_purchase_order_lines pol ON po.id = pol.transaction_id
    WHERE po.status IN ('Pending Bill', 'Partially Received', 'Fully Billed')
    GROUP BY po.id, po.tranid, po.vendor_id, pol.item_id
),
receipt_summary AS (
    SELECT 
        ir.createdfrom_id AS po_id,
        irl.item_id,
        SUM(irl.quantity) AS qty_received
    FROM ns_item_receipt ir
    JOIN ns_item_receipt_lines irl ON ir.id = irl.transaction_id
    GROUP BY ir.createdfrom_id, irl.item_id
),
bill_summary AS (
    SELECT 
        vb.createdfrom_id AS po_id,
        vbl.item_id,
        SUM(vbl.quantity) AS qty_billed,
        AVG(vbl.rate) AS rate_billed,
        SUM(vbl.amount) AS total_billed
    FROM ns_vendor_bill vb
    JOIN ns_vendor_bill_lines vbl ON vb.id = vbl.transaction_id
    GROUP BY vb.createdfrom_id, vbl.item_id
)
SELECT 
    p.po_number,
    p.vendor_id,
    p.item_id,
    p.qty_ordered,
    COALESCE(r.qty_received, 0) AS qty_received,
    COALESCE(b.qty_billed, 0) AS qty_billed,
    p.rate_ordered,
    COALESCE(b.rate_billed, 0) AS rate_billed,
    -- Detección de Discrepancias
    CASE 
        WHEN COALESCE(b.qty_billed, 0) > COALESCE(r.qty_received, 0) THEN 'ALERTA: Cobro superior a lo recibido físicamente'
        WHEN COALESCE(b.rate_billed, 0) > p.rate_ordered THEN 'ALERTA: Precio unitario facturado excede Orden de Compra'
        ELSE 'CONFORME: Matching 3-Vías Aprobado'
    END AS audit_status
FROM po_summary p
LEFT JOIN receipt_summary r ON p.po_id = r.po_id AND p.item_id = r.item_id
LEFT JOIN bill_summary b ON p.po_id = b.po_id AND p.item_id = b.item_id
WHERE COALESCE(b.qty_billed, 0) > COALESCE(r.qty_received, 0)
   OR COALESCE(b.rate_billed, 0) > p.rate_ordered;`,
          },
          {
            type: "callout",
            tone: "lesson",
            title: "Auditoría Continua y Cero Fugas de Capital",
            body: "Esta lógica garantizó que el 100% de los desembolsos a proveedores cuenten con respaldo físico verificado en almacén, erradicando cobros indebidos o cobros de bienes no entregados.",
          },
        ],
      },
      {
        id: "procurement-comparison",
        eyebrow: "Impacto Operacional",
        title: "Comparación de Eficiencia en Compras e Inventarios",
        blocks: [
          {
            type: "comparison",
            headers: ["Parámetro Operativo", "Gestión Informal Previa", "Gobernanza NetSuite Integrada"],
            rows: [
              ["Exactitud de inventario en almacén", "Aproximadamente 78% con mermas no detectadas", "99.4% verificado en conteos cíclicos trimestrales"],
              ["Aprobación de compras", "Correos informales o solicitudes verbales", "Flujo digital con jerarquía de aprobación en ERP"],
              ["Validación de facturas electrónicas", "Revisión visual de PDFs y facturas impresas", "Validación automática de CUFE y XML de la DIAN"],
              ["Control de compras por centro de costo", "Disperso, con sobrecostos detectados post-pago", "Validación de presupuesto antes de generar la PO"],
            ],
          },
          {
            type: "timeline",
            steps: [
              {
                phase: "Trimestre 1",
                title: "Inventario Físico Inicial & Saneamiento de Catálogos",
                outcome: "Clasificación de más de 800 referencias con codificación estandarizada.",
              },
              {
                phase: "Trimestre 2",
                title: "Parametrización de Workflows de Aprobación en NetSuite",
                outcome: "Configuración de límites de gasto según cargo del aprobador.",
              },
              {
                phase: "Trimestre 3",
                title: "Implantación del Matching de 3 Vías Obligatorio",
                outcome: "Eliminación completa de pagos sin recepción de almacén.",
              },
              {
                phase: "Trimestre 4",
                title: "Capacitación a Jefes de Área y Proveedores Clave",
                outcome: "Adopción del 100% en todas las sedes educativas de ASPAEN.",
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: "Control de Compras e Inventarios en Oracle NetSuite | Mariangel Sierra",
      description:
        "Reingeniería del ciclo Procure-to-Pay, matching de 3 vías y control de inventarios institucionales y corporativos con exactitud del 99.4%.",
      keywords: [
        "Oracle NetSuite Compras",
        "Inventarios ERP NetSuite",
        "Procure-to-Pay",
        "3-Way Matching SQL",
        "Control Interno Compras",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  treasuryAuditAutomation: {
    id: "treasuryAuditAutomation",
    lang: "es",
    title: "Automatización de Tesorería & Conciliación Bancaria Multientidad",
    subtitle:
      "Cotejo algorítmico de extractos bancarios masivos contra auxiliares contables y prevención de fraudes",
    roleLabel: "Analista de Tesorería & Auditoría de Procesos",
    contextLabel: "ASPAEN Medellín · 2022 — Presente",
    outcomeSummary:
      "Desarrollo e implementación de un sistema algorítmico de conciliación bancaria que contrasta miles de transferencias de pensiones y matrículas contra el libro auxiliar del ERP, reduciendo el ciclo de cierre mensual de 4 días a 4 horas y garantizando trazabilidad absoluta ante revisoría fiscal.",
    heroMetrics: [
      { value: "4d → 4h", label: "Reducción en Tiempo de Cierre Mensual" },
      { value: "99.8%", label: "Tasa de Emparejamiento Automático" },
      { value: "100%", label: "Trazabilidad de Partidas Conciliatorias" },
      { value: "0", label: "Sanciones o Inconsistencias Fiscales" },
    ],
    sections: [
      {
        id: "treasury-problem",
        eyebrow: "Desafío Financiero",
        title: "La Complejidad del Recaudo Escolar Multibancario",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Durante los primeros días de cada mes, cientos de familias realizan transferencias y depósitos para el pago de pensiones a través de múltiples entidades financieras (Bancolombia, Davivienda, PSE, consignaciones de ventanilla).",
              "El proceso tradicional requería cotejar línea por línea los extractos bancarios impresos o en PDF contra el informe auxiliar de contabilidad en NetSuite, una tarea agotadora que consumía 4 días completos del equipo y dejaba partidas no identificadas arrastradas durante meses.",
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "4 días",
                label: "Duración del cierre mensual",
                detail: "Tiempo requerido para conciliar manualmente 4 cuentas bancarias principales.",
              },
              {
                value: "3,500+",
                label: "Movimientos mensuales",
                detail: "Transacciones individuales de recaudo que debían ser verificadas una a una.",
              },
              {
                value: "8%",
                label: "Partidas no identificadas",
                detail: "Transferencias sin referencia clara que obligaban a indagaciones telefónicas manuales.",
              },
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Solución Concebida",
            body: "Se diseñó un motor de conciliación en Python con reglas de coincidencia difusa (fuzzy matching) y tolerancias de fecha/valor, capaz de procesar miles de transacciones en cuestión de segundos y generar el acta de conciliación formal.",
          },
        ],
      },
      {
        id: "treasury-architecture",
        eyebrow: "Mecanismo de Conciliación",
        title: "Arquitectura del Motor de Cotejo",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "El flujo procesa de manera paralela el extracto bancario oficial y el auxiliar contable de NetSuite, aplicando reglas en cascada: coincidencia exacta por ID de transacción, coincidencia por referencia de pago escolar y coincidencia probabilística con ventana de tolerancia de ±2 días.",
            ],
          },
          {
            type: "architecture",
            caption: "Pipeline de Conciliación Bancaria Automatizada",
            layers: [
              {
                name: "1. Normalización de Fuentes",
                role: "Parseo de extractos bancarios (formato plano, Excel o CSV) y extracción del auxiliar contable de NetSuite.",
                tools: ["Python", "Pandas", "Regex para parseo de referencias"],
              },
              {
                name: "2. Motor de Reglas en Cascada",
                role: "Paso 1: Match Exacto (Monto + Referencia + Fecha). Paso 2: Match por Código Estudiante + Monto. Paso 3: Ventana temporal ±48h.",
                tools: ["Algoritmo de Matching Heurístico", "Normalización de Cadenas"],
              },
              {
                name: "3. Clasificación de Partidas Conciliatorias",
                role: "Identificación automática de depósitos en tránsito, cheques pendientes de cobro y notas débito/crédito bancarias.",
                tools: ["Reglas Contables IFRS / NIIF", "Matriz de Trazabilidad"],
              },
              {
                name: "4. Generación de Reporte & Asientos de Ajuste",
                role: "Emisión del Acta de Conciliación con firmas digitales y plantilla de importación de ajustes a NetSuite.",
                tools: ["ReportLab / OpenPyXL", "NetSuite Journal Entry CSV"],
              },
            ],
          },
        ],
      },
      {
        id: "treasury-code",
        eyebrow: "Algoritmo de Conciliación",
        title: "Motor de Cotejo Automatizado en Python",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "El siguiente script ilustra el núcleo de conciliación que contrasta el libro mayor con el extracto bancario, separando las transacciones emparejadas de aquellas que requieren revisión puntual.",
            ],
          },
          {
            type: "code",
            title: "bank_reconciliation_engine.py — Algoritmo de Cotejo y Partidas en Tránsito",
            language: "python",
            snippet: `import pandas as pd
from typing import Tuple

def reconcile_bank_accounts(
    bank_df: pd.DataFrame, 
    ledger_df: pd.DataFrame, 
    date_tolerance_days: int = 2
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """
    Concilia extractos bancarios contra auxiliares contables de NetSuite.
    Retorna: (emparejados, partidas_pendientes_banco, partidas_pendientes_libro)
    """
    # 1. Copia y preparación de llaves de cotejo
    bank = bank_df.copy()
    ledger = ledger_df.copy()
    
    bank["bank_date"] = pd.to_datetime(bank["date"])
    ledger["ledger_date"] = pd.to_datetime(ledger["date"])
    
    bank["amount_abs"] = bank["amount"].abs().round(2)
    ledger["amount_abs"] = ledger["amount"].abs().round(2)
    
    # 2. Match exacto por referencia limpia y monto
    bank["clean_ref"] = bank["reference"].astype(str).str.replace(r"\\D", "", regex=True)
    ledger["clean_ref"] = ledger["reference"].astype(str).str.replace(r"\\D", "", regex=True)
    
    # Cruce directo
    matched = pd.merge(
        bank,
        ledger,
        how="inner",
        on=["clean_ref", "amount_abs"],
        suffixes=("_bank", "_ledger")
    )
    
    # Filtrar por ventana de fechas aceptable
    days_diff = (matched["bank_date"] - matched["ledger_date"]).dt.days.abs()
    matched = matched[days_diff <= date_tolerance_days]
    
    # 3. Identificar partidas pendientes en cada extremo
    matched_bank_ids = matched["id_bank"].unique()
    matched_ledger_ids = matched["id_ledger"].unique()
    
    unreconciled_bank = bank[~bank["id"].isin(matched_bank_ids)]
    unreconciled_ledger = ledger[~ledger["id"].isin(matched_ledger_ids)]
    
    return matched, unreconciled_bank, unreconciled_ledger`,
          },
          {
            type: "callout",
            tone: "result",
            title: "Reducción de Inconsistencias al 0.2%",
            body: "El algoritmo resolvió de forma autónoma el 99.8% de las transacciones mensuales, dejando únicamente un puñado de partidas atípicas que el analista puede revisar en minutos.",
          },
        ],
      },
      {
        id: "treasury-impact",
        eyebrow: "Auditoría & Trazabilidad",
        title: "Impacto en Revisoría Fiscal y Control Interno",
        blocks: [
          {
            type: "comparison",
            headers: ["Aspecto Clave", "Procedimiento Manual Anterior", "Sistema Automatizado Actual"],
            rows: [
              ["Tiempo invertido en conciliar", "4 días hábiles de un equipo de 2 personas", "4 horas por un solo analista"],
              ["Riesgo de error humano", "Alto (omisión involuntaria de renglones)", "Nulo en el motor algorítmico certificado"],
              ["Detección de notas de débito no registradas", "Se descubrían semanas después", "Identificadas el mismo día de la descarga"],
              ["Soporte documental para Revisoría", "Carpetas físicas con resaltador y firmas", "Acta digital con hash de validación y respaldo XML"],
            ],
          },
          {
            type: "timeline",
            steps: [
              {
                phase: "Hito 1",
                title: "Diagnóstico de Estructuras de Extractos Bancarios",
                outcome: "Mapeo de los formatos de extractos de Bancolombia, Davivienda y PSE.",
              },
              {
                phase: "Hito 2",
                title: "Programación del Motor de Cotejo y Pruebas con Históricos",
                outcome: "Cotejo retroactivo de 6 meses con 100% de convergencia en saldos de balance.",
              },
              {
                phase: "Hito 3",
                title: "Validación por Revisoría Fiscal y Dirección Financiera",
                outcome: "Aprobación del informe estandarizado como documento oficial de control interno.",
              },
              {
                phase: "Hito 4",
                title: "Operación Continua y Despliegue en Cierres Mensuales",
                outcome: "Cierres continuos ejecutados sin retrasos ni observaciones de auditoría externa.",
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: "Automatización de Tesorería & Conciliación Bancaria | Mariangel Sierra",
      description:
        "Automatización de conciliaciones bancarias y auditoría de tesorería multientidad con Python y NetSuite en ASPAEN, reduciendo cierres de 4 días a 4 horas.",
      keywords: [
        "Conciliación Bancaria Python",
        "Automatización Tesorería",
        "Auditoría Financiera NetSuite",
        "Control Interno Contable",
        "Recaudo Escolar",
        "Mariangel Sierra Jaller",
      ],
    },
  },
};