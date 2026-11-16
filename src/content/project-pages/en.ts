import type { ProjectPageId } from "@/types/content";
import type { ProjectPageCopy } from "@/types/project";

export const EN_PROJECT_PAGES: Record<ProjectPageId, ProjectPageCopy> = {
  clinicalBioengineering: {
    id: "clinicalBioengineering",
    lang: "en",
    title: "Clinical Bioengineering & Biomedical Asset Management",
    subtitle:
      "Technovigilance protocols, medical device lifecycle, and clinical software systems at ITM",
    contextLabel: "ITM University Institution · 2023 — 2028",
    overview: [
      "The Biomedical Engineering curriculum at ITM University Institution represents the strategic convergence where analytical data skills and operational discipline intersect with the healthcare sector and critical medical technologies.",
      "This initiative encompasses applied research and methodological frameworks for managing the full lifecycle of hospital equipment: from technical evaluation in specialized health acquisitions and clinical metrology calibrations to clinical software interoperability and technovigilance protocols under Colombian INVIMA standards.",
      "Uniting clinical engineering with information systems transforms hospitals and healthcare facilities from traditional care centers into data-driven ecosystems where predictive maintenance and inventory precision actively protect patient lives while optimizing operational budgets.",
    ],
    highlightsTitle: "Pillars of Clinical Technology Management",
    highlights: [
      {
        title: "Metrological Assurance & Calibration",
        detail:
          "Designing recurring calibration matrices and electrical safety protocols for Class I, II, and III critical care devices (defibrillators, mechanical ventilators, and physiological monitors).",
        metric: "100% INVIMA Standards",
      },
      {
        title: "Health Technology Assessment (HTA)",
        detail:
          "Drafting technical tender specifications for high-complexity medical acquisitions, assessing total cost of ownership (TCO), supplier warranties, and spare parts availability.",
        metric: "-24% Lifecycle Cost",
      },
      {
        title: "Clinical Software & Biosignal Processing",
        detail:
          "Developing Python prototypes for digital electrocardiogram (ECG) filtering and telemetry transmission into electronic health record (EHR) systems.",
        metric: "Python / DSP",
      },
      {
        title: "Technovigilance & Clinical Risk Management",
        detail:
          "Establishing adverse event and near-miss reporting feedback loops for medical devices in accordance with Colombian and international health safety regulations.",
        metric: "Full Traceability",
      },
    ],
    architectureTitle: "Medical Device Lifecycle Management Architecture",
    architectureNodes: [
      {
        label: "1. Clinical Need & Technical Specification",
        description:
          "Gathering clinical requirements with medical staff, conducting cost-effectiveness analyses, and creating tender technical specifications.",
      },
      {
        label: "2. Technical Commissioning & Acceptance",
        description:
          "Performing initial acceptance tests, verifying factory calibration documentation, and registering new assets in the hospital ERP/CMMS.",
      },
      {
        label: "3. Preventive Maintenance & Calibration",
        description:
          "Executing scheduled maintenance routines and metrology validations using internationally certified reference testing equipment.",
      },
      {
        label: "4. Technovigilance & Real-Time Monitoring",
        description:
          "Tracking global safety advisories (FDA, ECRI, INVIMA) and monitoring ongoing operational device reliability in intensive care units.",
      },
      {
        label: "5. Decommissioning & Technology Replacement",
        description:
          "Calculating technological obsolescence indices, cumulative maintenance cost versus residual book value, and safe disposal protocols.",
      },
    ],
    learningsTitle: "Key Insights & Professional Perspective",
    learnings: [
      "Biomedical metrology demands uncompromising mathematical accuracy: a calibration drift in a pulmonary ventilator or syringe infusion pump directly impacts human survival.",
      "Healthcare procurement cannot be driven solely by upfront purchase price; the true cost lies in lifecycle consumables, replacement parts, service contracts, and mandatory metrological calibrations.",
      "Combining software programming logic, operational finance, and biomedical engineering allows seamless dialogue with specialized physicians, chief financial officers, and clinical quality auditors alike.",
    ],
    seo: {
      title: "Clinical Bioengineering & Biomedical Asset Management | Mariangel Sierra",
      description:
        "Biomedical engineering research and methodologies covering hospital metrology, INVIMA technovigilance, and medical device lifecycles at ITM.",
      keywords: [
        "Biomedical Engineering ITM",
        "Clinical Asset Management",
        "Biomedical Metrology",
        "Technovigilance INVIMA",
        "Clinical Software Systems",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  academicEngineeringSuite: {
    id: "academicEngineeringSuite",
    lang: "en",
    title: "Engineering Suite: Systems Architecture & Process Optimization",
    subtitle:
      "Convergence of Systems & Industrial Engineering (San José) with SENA software logic",
    contextLabel: "San José · SENA · INEM · 2020 — 2026",
    overview: [
      "Mariangel Sierra Jaller's technical foundation was forged through a cohesive, continuous academic journey: from technical high school informatics at INEM and professional software programming at SENA to dual degrees in Systems Engineering and Industrial Engineering at Fundación Universidad San José.",
      "This engineering suite aggregates capstone projects, methodological frameworks, and practical applications developed throughout this academic tenure, showcasing how theoretical principles of operations research, relational database modeling, UML architectures, and agile methodologies translate into real enterprise impact.",
      "The resulting profile does not treat technology as an isolated silo, but rather as an essential structural engine to re-engineer business processes, eliminate operational bottlenecks, and align information architectures with corporate goals.",
    ],
    highlightsTitle: "Core Competencies & Academic Integration",
    highlights: [
      {
        title: "Relational Data Modeling & Advanced SQL",
        detail:
          "Designing third normal form (3NF) database schemas, query index optimization, materialized views, and stored procedures for mission-critical transactional stores.",
        metric: "3NF / SQL",
      },
      {
        title: "Operations Research & Queueing Theory",
        detail:
          "Formulating linear programming models, stochastic process simulations, and throughput capacity optimizations applied to institutional workflows.",
        metric: "Process Optimization",
      },
      {
        title: "Software Architecture & Design Patterns",
        detail:
          "Applying SOLID principles, n-tier architectures, RESTful API design, and comprehensive software modeling using structured UML diagrams.",
        metric: "SOLID Patterns",
      },
      {
        title: "CRISP-DM Analytics Framework",
        detail:
          "Executing data science projects systematically: from thorough business understanding and exploratory data analysis to model validation and deployment.",
        metric: "CRISP-DM",
      },
    ],
    architectureTitle: "Disciplinary Convergence: The Integrated Engineering Model",
    architectureNodes: [
      {
        label: "Foundational Layer: Software Logic (SENA / INEM)",
        description:
          "Structured algorithms, object-oriented programming, clean code syntax, Git version control, and relational database foundations.",
      },
      {
        label: "Systems Layer: Data & Architecture (San José)",
        description:
          "Relational databases, software requirements engineering, information security, API integrations, and enterprise IT governance.",
      },
      {
        label: "Industrial Layer: Operations & Optimization (San José)",
        description:
          "Time and motion studies, statistical process control (SPC), total quality management, supply chain mechanics, and cost accounting.",
      },
      {
        label: "Enterprise Application Layer (ASPAEN)",
        description:
          "Direct practical transfer of engineering theory into Oracle NetSuite administration, automated treasury reconciliation, and Power BI executive dashboards.",
      },
    ],
    learningsTitle: "Key Takeaways from Multi-Disciplinary Engineering",
    learnings: [
      "Technology is an enabler, never the ultimate goal: an elegant software architecture will fail if it does not eliminate genuine operational friction or if it introduces bureaucratic overhead.",
      "Industrial engineering thinking instills holistic perspective: it reveals how altering a procurement approval form reverberates through warehouse inventory, treasury disbursements, and financial balance sheets.",
      "The rigorous coding standards developed at SENA combined with strategic university engineering frameworks provide an invaluable competitive edge in fast-moving enterprise environments.",
    ],
    seo: {
      title: "Engineering Suite: Systems & Process Optimization | Mariangel Sierra",
      description:
        "Academic and methodological portfolio synthesizing Systems Engineering, Industrial Engineering, and SENA Software Programming by Mariangel Sierra Jaller.",
      keywords: [
        "Systems Engineering San José",
        "Industrial Engineering San José",
        "SENA Software Programming",
        "CRISP-DM Methodology",
        "Process Optimization",
        "Mariangel Sierra Jaller",
      ],
    },
  },
};