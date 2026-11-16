import type { ProjectPageId } from "@/types/content";
import type { ProjectPageCopy } from "@/types/project";

export const ES_PROJECT_PAGES: Record<ProjectPageId, ProjectPageCopy> = {
  clinicalBioengineering: {
    id: "clinicalBioengineering",
    lang: "es",
    title: "Gestión Tecnológica Biomédica & Metrología Clínica",
    subtitle:
      "Protocolos de tecnovigilancia, ciclo de vida de equipamiento médico y software clínico en el ITM",
    contextLabel: "Institución Universitaria ITM · 2023 — 2028",
    overview: [
      "El programa de Ingeniería Biomédica en la Institución Universitaria ITM constituye el vértice que une la rigurosidad analítica y operativa con el sector de la salud y los dispositivos médicos de alta tecnología.",
      "Este proyecto agrupa la investigación aplicada y la formulación metodológica para la gestión integral del ciclo de vida de la tecnología hospitalaria: desde la evaluación técnica en adquisiciones y compras especializadas, pasando por la metrología y calibración de equipos de soporte vital, hasta la interoperabilidad de software clínico y protocolos de tecnovigilancia según normatividad del INVIMA.",
      "La integración entre ingeniería clínica y sistemas de información permite concebir hospitales y clínicas no solo como centros de atención médica, sino como ecosistemas de datos donde el mantenimiento predictivo y la trazabilidad de inventarios salvan vidas y optimizan presupuestos.",
    ],
    highlightsTitle: "Pilares de la Gestión Tecnológica Biomédica",
    highlights: [
      {
        title: "Aseguramiento Metrológico & Calibración",
        detail:
          "Diseño de matrices de calibración periódica y protocolos de seguridad eléctrica para equipos de clases I, II y III (desfibriladores, ventiladores mecánicos y monitores de signos vitales).",
        metric: "100% Norma INVIMA",
      },
      {
        title: "Evaluación de Tecnologías en Salud (ETES)",
        detail:
          "Formulación de fichas técnicas para adquisición de equipamiento médico de alta complejidad, evaluando costo total de propiedad, garantías y disponibilidad de repuestos.",
        metric: "-24% Costo Ciclo de Vida",
      },
      {
        title: "Software Clínico & Procesamiento de Señales",
        detail:
          "Desarrollo de prototipos en Python para filtrado digital de señales electrocardiográficas (ECG) y transmisión telemétrica hacia registros médicos electrónicos.",
        metric: "Python / DSP",
      },
      {
        title: "Tecnovigilancia & Gestión del Riesgo",
        detail:
          "Estructuración de flujos de reporte inmediato de eventos e incidentes adversos asociados a dispositivos médicos, alineados con el marco regulatorio colombiano.",
        metric: "Trazabilidad Total",
      },
    ],
    architectureTitle: "Arquitectura del Ciclo de Vida de Activos Médicos",
    architectureNodes: [
      {
        label: "1. Necesidad Clínica & Especificación Técnica",
        description:
          "Levantamiento de requerimientos con el cuerpo médico, análisis de costo-efectividad y definición de pliegos de compra.",
      },
      {
        label: "2. Recepción Técnica & Puesta en Marcha",
        description:
          "Pruebas de aceptación inicial, verificación de certificados de calibración de fábrica y registro en el inventario hospitalario.",
      },
      {
        label: "3. Mantenimiento Preventivo & Metrología",
        description:
          "Cronogramas automatizados de mantenimiento y pruebas periódicas con patrones de calibración certificados internacionalmente.",
      },
      {
        label: "4. Tecnovigilancia & Trazabilidad Continua",
        description:
          "Monitoreo de alertas internacionales (FDA, ECRI, INVIMA) y seguimiento del rendimiento operacional del equipo.",
      },
      {
        label: "5. Baja Técnica & Renovación Tecnológica",
        description:
          "Cálculo de obsolescencia técnica, relación costo de mantenimiento acumulado vs. valor residual y disposición final segura.",
      },
    ],
    learningsTitle: "Convergencia de Aprendizajes e Impacto Profesional",
    learnings: [
      "La metrología biomédica exige una precisión matemática absoluta: un desfase en la calibración de un ventilador pulmonar o una bomba de infusión tiene implicaciones críticas directas sobre la vida humana.",
      "La gestión de compras en salud no puede guiarse únicamente por el precio de compra; el verdadero costo reside en los consumibles, repuestos, contratos de mantenimiento y calibraciones obligatorias.",
      "La combinación de formación en software, finanzas operativas e ingeniería biomédica permite dialogar con igual solvencia con médicos especialistas, directores financieros y auditores de calidad.",
    ],
    seo: {
      title: "Gestión Tecnológica Biomédica & Metrología Clínica | Mariangel Sierra",
      description:
        "Proyecto de ingeniería biomédica enfocado en metrología hospitalaria, tecnovigilancia INVIMA y ciclo de vida de tecnología médica en el ITM.",
      keywords: [
        "Ingeniería Biomédica ITM",
        "Gestión Tecnológica en Salud",
        "Metrología Biomédica",
        "Tecnovigilancia INVIMA",
        "Software Clínico",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  academicEngineeringSuite: {
    id: "academicEngineeringSuite",
    lang: "es",
    title: "Suite de Ingeniería: Arquitectura de Sistemas & Optimización de Procesos",
    subtitle:
      "Convergencia de Ingeniería de Sistemas e Industrial (San José) y fundamentos de programación SENA",
    contextLabel: "San José · SENA · INEM · 2020 — 2026",
    overview: [
      "La sólida base técnica de Mariangel Sierra Jaller se forjó en una trayectoria académica continua y articulada: desde la Media Técnica en Informática en el INEM y la formación profesional en Programación de Software en el SENA, hasta la doble titulación en Ingeniería de Sistemas e Ingeniería Industrial en la Fundación Universidad San José.",
      "Esta suite reúne los proyectos, marcos metodológicos y aplicaciones prácticas desarrolladas en el ámbito académico, demostrando cómo los conceptos teóricos de investigación de operaciones, diagramación UML, modelado entidad-relación y metodologías ágiles se trasladaron a la práctica empresarial real.",
      "El resultado es un perfil que no concibe la tecnología de forma aislada, sino como la herramienta estructural para rediseñar cadenas de valor, eliminar cuellos de botella y garantizar que los sistemas de información sirvan fielmente a la estrategia organizacional.",
    ],
    highlightsTitle: "Áreas de Dominio e Integración Académica",
    highlights: [
      {
        title: "Modelado de Datos Relacional & SQL Avanzado",
        detail:
          "Diseño de esquemas en tercera forma normal (3NF), optimización de índices, vistas materializadas y procedimientos almacenados para bases de datos transaccionales.",
        metric: "3NF / SQL",
      },
      {
        title: "Investigación de Operaciones & Teoría de Colas",
        detail:
          "Modelos de programación lineal, simulación de procesos estocásticos y optimización de capacidad de atención aplicados a operaciones educativas y logísticas.",
        metric: "Optimización Industrial",
      },
      {
        title: "Arquitectura de Software & Patrones de Diseño",
        detail:
          "Adopción de principios SOLID, arquitecturas en capas (n-tier), diseño de APIs RESTful y especificaciones de software mediante diagramas UML estructurados.",
        metric: "Patrones SOLID",
      },
      {
        title: "Marco Metodológico CRISP-DM & Analítica",
        detail:
          "Formulación sistemática de proyectos de ciencia de datos: desde la comprensión profunda del negocio y de los datos hasta la evaluación rigurosa del modelo.",
        metric: "CRISP-DM",
      },
    ],
    architectureTitle: "Convergencia de Disciplinas: El Modelo de Integración Tripartito",
    architectureNodes: [
      {
        label: "Capa Fundacional: Lógica & Software (SENA / INEM)",
        description:
          "Algoritmia estructurada, programación orientada a objetos, sintaxis limpia, control de versiones con Git y estructuración de datos.",
      },
      {
        label: "Capa de Sistemas: Arquitectura & Datos (San José)",
        description:
          "Bases de datos relacionales, ingeniería de requisitos, seguridad de la información, integración vía webhooks/APIs y gobernanza informática.",
      },
      {
        label: "Capa Industrial: Procesos & Operaciones (San José)",
        description:
          "Estudio de tiempos y movimientos, gestión de calidad, control estadístico de procesos (SPC), cadena de suministro y análisis de costos.",
      },
      {
        label: "Capa de Aplicación Corporativa (ASPAEN)",
        description:
          "Transferencia directa de la teoría hacia la administración de Oracle NetSuite, conciliación bancaria y tableros directivos de Power BI.",
      },
    ],
    learningsTitle: "Lecciones Clave de la Formación Multidisciplinar",
    learnings: [
      "La tecnología es un medio, no el fin: una solución de software técnicamente sofisticada fracasará si no resuelve un dolor operativo real o si impone fricción burocrática innecesaria.",
      "El pensamiento industrial aporta visión holística: permite entender cómo el cambio en un formulario de compras impacta el inventario, la tesorería, el balance contable y la satisfacción del usuario final.",
      "El rigor metodológico del SENA en buenas prácticas de código complementado con la visión directiva universitaria confiere una ventaja competitiva excepcional en entornos corporativos de alta exigencia.",
    ],
    seo: {
      title: "Suite de Ingeniería: Sistemas & Procesos | Mariangel Sierra",
      description:
        "Portafolio académico y metodológico integrando Ingeniería de Sistemas, Ingeniería Industrial y Programación SENA por Mariangel Sierra Jaller.",
      keywords: [
        "Ingeniería de Sistemas San José",
        "Ingeniería Industrial San José",
        "Programación SENA",
        "CRISP-DM",
        "Optimización de Procesos",
        "Mariangel Sierra Jaller",
      ],
    },
  },
};