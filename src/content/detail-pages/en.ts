import type { DetailCollection } from "@/types/content";
import type {
  DetailCollectionIndexCopy,
  DetailPageCopy,
  DetailUiCopy,
} from "@/types/detail";

export const EN_DETAIL_UI: DetailUiCopy = {
  backToPortfolio: "Back to portfolio",
  backToCollection: "View full collection",
  toolsLabel: "Technologies & applied tools",
  relatedProjectsTitle: "Related projects & case studies",
  viewProjectLabel: "Explore case study",
  viewEntryLabel: "View details",
  previousLabel: "Previous",
  nextLabel: "Next",
};

export const EN_DETAIL_INDEXES: Record<DetailCollection, DetailCollectionIndexCopy> = {
  experience: {
    collection: "experience",
    lang: "en",
    eyebrow: "Career Journey",
    title: "Professional Experience",
    subtitle:
      "Evolution at ASPAEN leading centralized procurement, high-precision treasury management, bank reconciliations, and analytics automation on Oracle NetSuite.",
    seo: {
      title: "Professional Experience | Mariangel Sierra Jaller",
      description:
        "Professional career of Mariangel Sierra Jaller at ASPAEN: Oracle NetSuite ERP operations, bank reconciliations, procurement control, and data pipelines.",
      keywords: [
        "Mariangel Sierra Jaller",
        "Work experience",
        "ASPAEN",
        "Oracle NetSuite",
        "Procurement",
        "Treasury",
        "Analytics",
        "Medellin",
      ],
    },
  },
  education: {
    collection: "education",
    lang: "en",
    eyebrow: "Academic Background",
    title: "Education & University Degrees",
    subtitle:
      "Multidisciplinary profile integrating Systems Engineering, Industrial Engineering, Biomedical Engineering, alongside foundational accounting and software credentials.",
    seo: {
      title: "Education & Academic Degrees | Mariangel Sierra Jaller",
      description:
        "Academic background of Mariangel Sierra Jaller: Systems & Industrial Engineering (San José), Biomedical Engineering (ITM), Accounting and SENA Tech degrees.",
      keywords: [
        "Mariangel Sierra Jaller",
        "Education",
        "Systems Engineering",
        "Industrial Engineering",
        "Biomedical Engineering",
        "ITM",
        "San Jose University",
        "SENA",
      ],
    },
  },
  certifications: {
    collection: "certifications",
    lang: "en",
    eyebrow: "Specializations & Credentials",
    title: "Technical Certifications",
    subtitle:
      "Technical validation across CRISP-DM analytics, DAX & Power BI, Oracle NetSuite ERP operations, Python ETL scripting, and agile project delivery.",
    seo: {
      title: "Technical Certifications | Mariangel Sierra Jaller",
      description:
        "Certifications of Mariangel Sierra Jaller in Power BI DAX, Python Pandas ETL, Oracle NetSuite, CRISP-DM, Financial Modeling, and Agile methodologies.",
      keywords: [
        "Certifications",
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

export const EN_DETAIL_ITEMS: Record<string, DetailPageCopy> = {
  // ==========================================
  // EXPERIENCE (2)
  // ==========================================
  "aspaen-operaciones-analitica": {
    collection: "experience",
    slug: "aspaen-operaciones-analitica",
    id: "aspaen",
    lang: "en",
    eyebrow: "Professional Experience · 2023 — Present",
    title: "ERP Operations Leadership, Procurement & Financial Analytics",
    subtitle:
      "Centralized procurement management, bank reconciliations, and operational workflow automation leveraging Oracle NetSuite, Python, and Power BI at ASPAEN.",
    meta: [
      { label: "Organization", value: "Asociación para la Enseñanza — ASPAEN" },
      { label: "Period", value: "January 2023 — Present" },
      { label: "Modality", value: "On-site · Medellín, Colombia" },
      { label: "Core Scope", value: "Operations, Procurement, Treasury & Analytics" },
    ],
    overview: [
      "At ASPAEN, Mariangel leads administrative operations, treasury management, and centralized procurement, connecting financial governance with cutting-edge analytical solutions.",
      "She manages the end-to-end Procure-to-Pay cycle in Oracle NetSuite, ensuring strict tax compliance, timely goods and services receipt, DIAN validation, and budgetary control across multiple cost centers.",
      "She designed and deployed automation scripts in Python (Pandas) and Power BI models to accelerate transactional data processing, eliminating manual bottlenecks in bank reconciliations and executive reporting.",
    ],
    keyPointsTitle: "Key Responsibilities & Achievements",
    keyPoints: [
      "Operational administration and parameterization of purchasing workflows, service orders, vendors, and inventory records in Oracle NetSuite.",
      "Daily execution and oversight of multi-million bank reconciliations and treasury audits with zero unresolved variances.",
      "Development of Python scripts with Pandas for automated cross-validation between bank statements and ERP general ledger records.",
      "Creation and continuous maintenance of executive Power BI dashboards tracking liquidity, budget burn rates, and procurement cycle times.",
      "Ensuring strict compliance with Colombian fiscal requirements (DIAN electronic invoicing, withholding taxes) and preparing audit-ready documentation.",
      "Strategic vendor negotiations, achieving improved payment terms and institutional cost consolidations.",
    ],
    outcomesTitle: "Measurable Operational Impact",
    outcomes: [
      { metric: "85%", label: "Reduction in bank reconciliation turnaround using Python and ERP automation" },
      { metric: "100%", label: "Documentary traceability and compliance in internal and tax audits" },
      { metric: "30h/mo", label: "Labor hours saved in generating and consolidating leadership reports" },
      { metric: "99.8%", label: "Accuracy in budget execution tracking and accounts payable ledger entries" },
    ],
    tools: [
      "Oracle NetSuite",
      "Python",
      "Pandas",
      "Power BI",
      "DAX",
      "SQL",
      "Advanced Excel",
      "XML / JSON",
      "Treasury",
      "Auditing",
    ],
    relatedProjects: [
      "netsuiteEtlPipeline",
      "financialBiSuite",
      "procurementInventoryControl",
      "treasuryAuditAutomation",
    ],
    seo: {
      title: "ERP Operations Leadership & Analytics | ASPAEN | Mariangel Sierra",
      description:
        "Detail of Mariangel Sierra Jaller's role at ASPAEN leading procurement, treasury, and analytical modernization on Oracle NetSuite.",
      keywords: [
        "ASPAEN",
        "Oracle NetSuite",
        "Corporate procurement",
        "Treasury",
        "Bank reconciliation",
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
    lang: "en",
    eyebrow: "Professional Experience · 2022 — 2023",
    title: "Professional Internship in Accounting Management, Petty Cash & ERP Support",
    subtitle:
      "Career launchpad at ASPAEN driving document digitalization, electronic invoicing validation, and operational parameterization in Oracle NetSuite.",
    meta: [
      { label: "Organization", value: "Asociación para la Enseñanza — ASPAEN" },
      { label: "Period", value: "February 2022 — January 2023" },
      { label: "Modality", value: "On-site · Medellín, Colombia" },
      { label: "Core Scope", value: "Accounting & Operations Assistant" },
    ],
    overview: [
      "Mariangel began her tenure at ASPAEN as an accounting intern, quickly standing out for her methodical precision, analytical discipline, and rapid mastery of enterprise workflows.",
      "She took charge of petty cash fund management, payment voucher registration, DIAN electronic invoice verification, and the structured organization of physical and digital tax archives.",
      "Her outstanding learning curve in Oracle NetSuite and proactive technical approach led to her immediate promotion into permanent operations and procurement leadership.",
    ],
    keyPointsTitle: "Key Responsibilities & Achievements",
    keyPoints: [
      "Daily accounting entry of vendor invoices and validation of XML/PDF payloads against Colombian statutory requirements.",
      "Oversight, physical count, and timely formalization of petty cash disbursements with rigorous audit evidence.",
      "Systematic digitization and indexing of accounting records, reducing file retrieval times during fiscal audit cycles.",
      "Operational support in cleaning, validating, and migrating chart of accounts and vendor catalogs in Oracle NetSuite.",
      "Active collaboration in preliminary bank balance verifications and cash register audits.",
    ],
    outcomesTitle: "Measurable Operational Impact",
    outcomes: [
      { metric: "100%", label: "Digitalization of accounting archives and petty cash supporting vouchers" },
      { metric: "0", label: "Penalties or rejected electronic invoices during the internship period" },
      { metric: "Promotion", label: "Direct advancement to permanent full-scope operations and analytics leadership" },
      { metric: "-40%", label: "File retrieval time during annual financial closing and external audits" },
    ],
    tools: [
      "Oracle NetSuite",
      "Electronic Invoicing",
      "IFRS Accounting",
      "Petty Cash",
      "Advanced Excel",
      "Digitalization",
      "Document Traceability",
      "Logistics",
    ],
    relatedProjects: ["treasuryAuditAutomation", "procurementInventoryControl"],
    seo: {
      title: "Accounting Internship & ERP Support | ASPAEN | Mariangel Sierra",
      description:
        "Professional internship experience of Mariangel Sierra Jaller at ASPAEN: electronic billing, petty cash control, digitization, and ERP workflows.",
      keywords: [
        "ASPAEN",
        "Accounting internship",
        "Oracle NetSuite",
        "Electronic billing",
        "Petty cash",
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
    lang: "en",
    eyebrow: "Higher Education · 2023 — Sep 10, 2026",
    title: "B.S. in Systems Engineering",
    subtitle:
      "Graduated on September 10, 2026. Comprehensive program in software architecture, relational database management, data engineering, cloud systems, and algorithmic computation.",
    meta: [
      { label: "Institution", value: "Fundación Universidad San José" },
      { label: "Period", value: "2023 — Sep 10, 2026 (Graduated)" },
      { label: "Degree Level", value: "Bachelor of Science" },
      { label: "Focus", value: "Technology, Software & Data Engineering" },
    ],
    overview: [
      "The Systems Engineering degree program at Fundación Universidad San José provides Mariangel with strong foundations in algorithmic design, relational database modeling, data structures, and modern software paradigms.",
      "She directly applies this knowledge in her day-to-day professional role, transforming business and operational requirements into robust Python automation scripts, ETL pipelines, and analytical reports.",
      "Her software engineering curriculum operates in close synergy with her parallel Industrial Engineering program, fostering a unique capability for end-to-end automated process optimization.",
    ],
    keyPointsTitle: "Core Subjects & Competencies",
    keyPoints: [
      "Relational database design, normalization, indexing, and advanced SQL query optimization.",
      "Object-oriented software development, data structures, and clean architecture design principles.",
      "Data modeling for enterprise business intelligence, automated batch ingestion, and ETL pipelines.",
      "Computer networking fundamentals, information security principles, and cloud computing architectures.",
      "Professional version control workflows with Git and agile software engineering methodologies.",
    ],
    outcomesTitle: "Practical Application & Outlook",
    outcomes: [
      { metric: "100%", label: "Direct applicability to real-world analytical pipelines and ERP integrations" },
      { metric: "Sep 10, 2026", label: "Completed professional graduation at Fundación Universidad San José" },
      { metric: "Dual Degree", label: "Graduated concurrently with Industrial Engineering and Systems Technology" },
    ],
    tools: [
      "Python",
      "SQL",
      "Software Architecture",
      "Relational Databases",
      "Git",
      "Data Structures",
      "ETL Pipelines",
      "REST APIs",
    ],
    relatedProjects: ["netsuiteEtlPipeline", "academicEngineeringSuite"],
    seo: {
      title: "Systems Engineering | Fundación Universidad San José | Mariangel Sierra",
      description:
        "Details of the Systems Engineering degree pursued by Mariangel Sierra Jaller at Fundación Universidad San José.",
      keywords: [
        "Systems Engineering",
        "San Jose University",
        "Mariangel Sierra Jaller",
        "Software architecture",
        "Python",
        "SQL",
      ],
    },
  },

  "ingenieria-industrial-san-jose": {
    collection: "education",
    slug: "ingenieria-industrial-san-jose",
    id: "sanJoseIndustrial",
    lang: "en",
    eyebrow: "Higher Education · 2023 — Sep 10, 2026",
    title: "B.S. in Industrial Engineering",
    subtitle:
      "Graduated on September 10, 2026. Operations optimization, supply chain management, quality assurance, operations research, and enterprise productivity modeling.",
    meta: [
      { label: "Institution", value: "Fundación Universidad San José" },
      { label: "Period", value: "2023 — Sep 10, 2026 (Graduated)" },
      { label: "Degree Level", value: "Bachelor of Science" },
      { label: "Focus", value: "Operations, Process Engineering & Supply Chain" },
    ],
    overview: [
      "Industrial Engineering enriches Mariangel's systemic perspective with rigorous tools for operations modeling, inventory control, and Lean workflow optimization.",
      "This academic framework informs her daily corporate purchasing decisions, enabling rigorous vendor performance evaluation, storage cost reduction, and high service level maintenance.",
      "The program's focus on continuous process improvement (Lean) and statistical process control directly translates into operational standardization and reduced administrative cycle times.",
    ],
    keyPointsTitle: "Core Subjects & Competencies",
    keyPoints: [
      "Strategic supply chain management, institutional procurement policies, and inventory modeling.",
      "Operations research, linear programming, and quantitative decision-making frameworks.",
      "Continuous improvement methodologies, Lean operations, and administrative waste elimination.",
      "Operational workflow balancing, control dashboard design, and enterprise KPI formulation.",
      "Financial engineering, cost accounting modeling, and investment project evaluation.",
    ],
    outcomesTitle: "Practical Application & Outlook",
    outcomes: [
      { metric: "Direct", label: "Immediate application to ASPAEN purchasing and inventory workflows" },
      { metric: "Sep 10, 2026", label: "Completed professional graduation at Fundación Universidad San José" },
      { metric: "Synergy", label: "Integration of process optimization with data-driven software tooling" },
    ],
    tools: [
      "Operations Research",
      "Supply Chain",
      "Lean Six Sigma",
      "Process Control",
      "Operational KPIs",
      "Cost Modeling",
      "Financial Excel",
    ],
    relatedProjects: ["procurementInventoryControl", "treasuryAuditAutomation"],
    seo: {
      title: "Industrial Engineering | Fundación Universidad San José | Mariangel Sierra",
      description:
        "Industrial Engineering degree earned by Mariangel Sierra Jaller (September 10, 2026): supply chain, operations research, and continuous improvement.",
      keywords: [
        "Industrial Engineering",
        "San Jose University",
        "Supply chain",
        "Operations management",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "tecnologia-sistemas-san-jose": {
    collection: "education",
    slug: "tecnologia-sistemas-san-jose",
    id: "sanJoseSystemsTech",
    lang: "en",
    eyebrow: "Technology Degree · 2023 — Sep 10, 2026",
    title: "Technologist in Systems",
    subtitle:
      "Awarded on September 10, 2026. Applied foundation in enterprise information systems, database management, networking, and operational software support.",
    meta: [
      { label: "Institution", value: "Fundación Universidad San José" },
      { label: "Period", value: "2023 — Sep 10, 2026 (Graduated)" },
      { label: "Degree Level", value: "Higher Technology Degree" },
      { label: "Focus", value: "IT Infrastructure, Networking & Databases" },
    ],
    overview: [
      "As part of her tiered academic track at Fundación Universidad San José, Mariangel earned the Technologist in Systems credential on September 10, 2026 concurrently with her Bachelor degrees.",
      "The program solidifies practical mastery in relational database administration, corporate IT operations, application integration, and technical support.",
      "This applied background directly anchors her daily administration of Oracle NetSuite and Python-based reporting pipelines at ASPAEN.",
    ],
    keyPointsTitle: "Core Subjects & Competencies",
    keyPoints: [
      "Relational database integrity management, indexing, and operational SQL querying.",
      "Enterprise IT infrastructure support, operating systems, and organizational networking.",
      "Business software integration and structured data interchange via XML and JSON.",
      "Technical requirements documentation and quality assurance for enterprise workflows.",
    ],
    outcomesTitle: "Practical Application & Achievements",
    outcomes: [
      { metric: "Sep 10, 2026", label: "Technology degree conferred by Fundación Universidad San José" },
      { metric: "100%", label: "Direct articulation with ERP automation and ETL reporting workflows" },
      { metric: "Tiered Track", label: "Applied foundation integrated directly with Systems Engineering" },
    ],
    tools: [
      "SQL & Databases",
      "Information Systems",
      "XML / JSON",
      "Python",
      "IT Support",
      "Git",
    ],
    relatedProjects: ["netsuiteEtlPipeline", "academicEngineeringSuite"],
    seo: {
      title: "Technologist in Systems | Fundación Universidad San José | Mariangel Sierra",
      description:
        "Technologist in Systems degree conferred to Mariangel Sierra Jaller by Fundación Universidad San José on September 10, 2026.",
      keywords: [
        "Technologist in Systems",
        "Systems Technology",
        "San Jose University",
        "Mariangel Sierra Jaller",
        "SQL",
      ],
    },
  },

  "ingenieria-biomedica-itm": {
    collection: "education",
    slug: "ingenieria-biomedica-itm",
    id: "itmBiomedical",
    lang: "en",
    eyebrow: "Third Engineering (In Progress) · 2023 — 2028",
    title: "B.S. in Biomedical Engineering",
    subtitle:
      "Advancing toward her third engineering credential: intersection of medical instrumentation, biosignal processing, clinical technology management, and bioinformatics.",
    meta: [
      { label: "Institution", value: "Institución Universitaria ITM" },
      { label: "Period", value: "2023 — 2028 (In progress)" },
      { label: "Degree Level", value: "Bachelor of Science (3rd Engineering)" },
      { label: "Focus", value: "Biomedical Instrumentation & Clinical Systems" },
    ],
    overview: [
      "The Biomedical Engineering curriculum at ITM provides a demanding analytical discipline that merges life sciences with physical-mathematical modeling, electronic instrumentation, and clinical healthcare standards.",
      "Mariangel develops competencies in biological signal acquisition and filtering, medical equipment metrology, and hospital technovigilance using cutting-edge computational tools.",
      "This program sharpens her ability to solve complex challenges in critical environments where methodological precision, strict traceability, and safety standards are paramount.",
    ],
    keyPointsTitle: "Core Subjects & Competencies",
    keyPoints: [
      "Medical instrumentation, biosignal acquisition hardware, and digital signal processing.",
      "Quantitative human physiology, biophysics, and mathematical modeling of physiological phenomena.",
      "Hospital technology management, medical device preventive maintenance, and clinical safety.",
      "Health sector regulatory standards (INVIMA / FDA) and healthcare quality assurance protocols.",
      "Scientific programming using Python and MATLAB for spectral analysis and diagnostics support.",
    ],
    outcomesTitle: "Practical Application & Outlook",
    outcomes: [
      { metric: "2028", label: "Projected year of professional degree completion" },
      { metric: "Rigor", label: "High-level modeling and analytical discipline under mission-critical constraints" },
      { metric: "Cross-Disciplinary", label: "Bridge between clinical engineering, tech procurement, and analytics" },
    ],
    tools: [
      "Biomedical Engineering",
      "Signal Processing",
      "Medical Instrumentation",
      "MATLAB",
      "Scientific Python",
      "Technovigilance",
      "Biosafety",
    ],
    relatedProjects: ["clinicalBioengineering"],
    seo: {
      title: "Biomedical Engineering | Institución Universitaria ITM | Mariangel Sierra",
      description:
        "Biomedical Engineering degree pursued by Mariangel Sierra Jaller at ITM: clinical instrumentation, biosignal processing, and medical technology.",
      keywords: [
        "Biomedical Engineering",
        "ITM",
        "Medical instrumentation",
        "Hospital technology",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "tecnico-contable-financiero-itm": {
    collection: "education",
    slug: "tecnico-contable-financiero-itm",
    id: "itmAccountingTech",
    lang: "en",
    eyebrow: "Vocational Degree · 2022 — 2023",
    title: "Vocational Degree in Accounting & Financial Assistance",
    subtitle:
      "IFRS regulatory fundamentals, tax computations, multi-account bank reconciliations, payroll processing, and financial ledger bookkeeping.",
    meta: [
      { label: "Institution", value: "Instituto Metropolitano de Educación (ITM)" },
      { label: "Period", value: "2022 — 2023 (Completed)" },
      { label: "Degree Level", value: "Vocational Technical Certificate" },
      { label: "Focus", value: "Accounting, Corporate Finance & Tax Compliance" },
    ],
    overview: [
      "This program provided the rigorous operational and regulatory foundation that enabled Mariangel to enter ASPAEN's accounting and administrative department with confidence and technical skill.",
      "She mastered the formal structure of the accounting cycle under IFRS standards for SMEs, commercial invoice booking, statutory tax withholdings, and multi-bank ledger balancing.",
      "This deep accounting comprehension serves as the vital bridge that allows her to communicate seamlessly with CPAs, auditors, and CFOs, translating their governance needs into automated software systems.",
    ],
    keyPointsTitle: "Competencies Acquired",
    keyPoints: [
      "Methodical recording of commercial transactions and accounting accruals under IFRS frameworks.",
      "Preparation of multi-account bank reconciliations, petty cash reconciliations, and cash flow controls.",
      "Computation of corporate payroll, social benefits, parafiscal contributions, and withholding taxes.",
      "Operational handling of electronic invoicing and validation of tax support documents with DIAN.",
      "Consolidation of trial balances and preliminary financial statements using structured Excel workbooks.",
    ],
    outcomesTitle: "Career Impact",
    outcomes: [
      { metric: "100%", label: "Program completed and officially certified with practical excellence" },
      { metric: "Placement", label: "Direct entry into ASPAEN through professional internship placement" },
      { metric: "Solid Foundation", label: "Conceptual grounding for ERP parameterization and internal controls" },
    ],
    tools: [
      "IFRS Accounting",
      "Bank Reconciliations",
      "Corporate Taxation",
      "Electronic Invoicing",
      "Payroll Accounting",
      "Financial Excel",
    ],
    relatedProjects: ["treasuryAuditAutomation", "financialBiSuite"],
    seo: {
      title: "Accounting & Financial Technical Degree | ITM | Mariangel Sierra",
      description:
        "Vocational degree in Accounting and Financial Assistance earned by Mariangel Sierra Jaller at ITM: IFRS, reconciliations, and tax compliance.",
      keywords: [
        "Accounting technician",
        "ITM",
        "Bank reconciliation",
        "IFRS",
        "Taxation",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "tecnico-programacion-software-sena": {
    collection: "education",
    slug: "tecnico-programacion-software-sena",
    id: "senaSoftware",
    lang: "en",
    eyebrow: "Vocational Degree · 2020 — 2021",
    title: "Technical Degree in Software Programming",
    subtitle:
      "Structured algorithmic logic, relational database engineering, object-oriented design, and software development lifecycle best practices.",
    meta: [
      { label: "Institution", value: "SENA — Servicio Nacional de Aprendizaje" },
      { label: "Period", value: "2020 — 2021 (Completed)" },
      { label: "Degree Level", value: "Professional Technical Certificate" },
      { label: "Focus", value: "Software Development & Relational Databases" },
    ],
    overview: [
      "SENA's software programming technical program marked the beginning of Mariangel's formal immersion in computer science and software systems.",
      "She acquired practical capabilities in structured algorithmic problem solving, entity-relationship database design, SQL scripting, and client-server software architectures.",
      "This foundational training established her mindset: rather than remaining a passive user of commercial enterprise tools, she actively builds customized scripts, tools, and automated pipelines to resolve organizational inefficiencies.",
    ],
    keyPointsTitle: "Competencies Acquired",
    keyPoints: [
      "Construction of structured algorithms and implementation of object-oriented programming principles.",
      "Conceptual, logical, and physical design of relational databases using SQL DDL and DML statements.",
      "User interface development, data input validation, and business logic separation across layers.",
      "Standard software engineering documentation, technical user stories, and use-case specifications.",
      "Collaborative capstone projects delivering real-world software solutions under practical deadlines.",
    ],
    outcomesTitle: "Career Impact",
    outcomes: [
      { metric: "100%", label: "Program completed and officially certified with practical distinction" },
      { metric: "Seedbed", label: "Early initiation into software development, logic, and data manipulation" },
      { metric: "Autonomy", label: "Ability to independently automate repetitive manual business routines" },
    ],
    tools: [
      "Algorithmic Logic",
      "OOP",
      "Relational Databases",
      "SQL",
      "JavaScript",
      "HTML5 / CSS3",
      "Git",
    ],
    relatedProjects: ["academicEngineeringSuite", "netsuiteEtlPipeline"],
    seo: {
      title: "Technical Degree in Software Programming | SENA | Mariangel Sierra",
      description:
        "Software Programming technical degree completed by Mariangel Sierra Jaller at SENA: software development, SQL databases, and algorithms.",
      keywords: [
        "SENA",
        "Software programming",
        "SQL",
        "OOP",
        "Software development",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "bachiller-informatica-inem": {
    collection: "education",
    slug: "bachiller-informatica-inem",
    id: "inemComputerScience",
    lang: "en",
    eyebrow: "Secondary Education · 2019 — 2021",
    title: "High School Diploma with Computer Science Major",
    subtitle:
      "Formative background in mathematics, computational logic, local area networks, advanced office productivity, and systems maintenance.",
    meta: [
      { label: "Institution", value: "I.E. Inem José Félix de Restrepo" },
      { label: "Period", value: "2019 — 2021 (Graduated)" },
      { label: "Degree Level", value: "Technical Secondary Diploma" },
      { label: "Focus", value: "Computing Fundamentals & Informatics" },
    ],
    overview: [
      "At Medellín's renowned I.E. Inem José Félix de Restrepo, Mariangel completed her technical secondary education with a major in Computer Science, cementing her scientific and engineering passion from an early age.",
      "She received rigorous instruction in computer hardware architecture, operating system configuration and troubleshooting, local area networking (LAN), and advanced productivity software.",
      "This formative stage built the habits of scholarly discipline, analytical curiosity, and persistent dedication that characterize her demanding simultaneous work-and-study lifestyle today.",
    ],
    keyPointsTitle: "Competencies Acquired",
    keyPoints: [
      "Foundations of algorithmic logic, flowchart design, and structured problem-solving methods.",
      "Installation, diagnostics, and preventive maintenance of computer hardware and system software.",
      "Principles of local area networks (LAN), IP addressing schemes, and communication protocols.",
      "Advanced spreadsheets, automated data processing, and document presentation tools.",
      "Interdisciplinary group projects presented before faculty evaluation committees.",
    ],
    outcomesTitle: "Career Impact",
    outcomes: [
      { metric: "Graduation", label: "Successful completion of technical high school curriculum in computer science" },
      { metric: "Vocation", label: "Clear directional choice toward engineering, applied mathematics, and computing" },
      { metric: "Discipline", label: "Cultivation of self-taught learning habits and intellectual rigor" },
    ],
    tools: [
      "Computational Logic",
      "Office Productivity",
      "LAN Networking",
      "Hardware Maintenance",
      "Operating Systems",
      "Intermediate Excel",
    ],
    relatedProjects: ["academicEngineeringSuite"],
    seo: {
      title: "Computer Science High School Diploma | INEM | Mariangel Sierra",
      description:
        "High school diploma with major in Computer Science completed by Mariangel Sierra Jaller at I.E. Inem José Félix de Restrepo.",
      keywords: [
        "INEM José Félix de Restrepo",
        "Computer science high school",
        "Computational logic",
        "Medellin",
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
    lang: "en",
    eyebrow: "Professional Certification · 2024",
    title: "Data Analytics & CRISP-DM Methodology",
    subtitle:
      "Mastery of the international standard for data mining and the complete analytics lifecycle: business understanding, data prep, modeling, and deployment.",
    meta: [
      { label: "Issuer", value: "Analytics Track & CRISP-DM Standard" },
      { label: "Year", value: "2024" },
      { label: "Focus", value: "Data Mining, Cleaning & Visual Storytelling" },
      { label: "Status", value: "Completed & Active" },
    ],
    overview: [
      "This professional specialization certifies mastery of the CRISP-DM (Cross-Industry Standard Process for Data Mining) framework applied to practical operational and business challenges.",
      "Mariangel deepened her skill set in systematic data collection, data quality profiling, outlier and missing value handling, and high-impact business question formulation.",
      "Adhering to this methodology guarantees that every dashboard or automation pipeline developed targets a verifiable business goal, securing transparent ROI across enterprise data efforts.",
    ],
    keyPointsTitle: "Validated Competencies",
    keyPoints: [
      "Systematic application of the six CRISP-DM phases to enterprise-grade data initiatives.",
      "Thorough cleansing and auditing of transaction datasets to eradicate anomalies, duplicates, and biases.",
      "Exploratory data analysis (EDA) techniques to uncover spending patterns, vendor delays, and cost variances.",
      "Crafting data narratives and interactive visualizations tailored for executive decision-makers.",
      "Reproducible technical documentation of data pipelines, metric schemas, and business rules.",
    ],
    outcomesTitle: "Applied Implementation",
    outcomes: [
      { metric: "CRISP-DM", label: "Standard framework used in all analytical reporting at ASPAEN" },
      { metric: "100%", label: "Documented lineage from raw transaction records to executive dashboards" },
      { metric: "Quality", label: "Zero data corruption incidents in monthly automated reporting runs" },
    ],
    tools: [
      "CRISP-DM",
      "Python",
      "Pandas",
      "SQL",
      "Exploratory Data Analysis (EDA)",
      "Data Cleansing",
      "Data Visualization",
    ],
    relatedProjects: ["netsuiteEtlPipeline", "financialBiSuite"],
    seo: {
      title: "Data Analytics CRISP-DM Certification | Mariangel Sierra Jaller",
      description:
        "Certification of Mariangel Sierra Jaller in CRISP-DM methodology and data analytics for business operations.",
      keywords: [
        "CRISP-DM",
        "Data analytics",
        "Data mining",
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
    lang: "en",
    eyebrow: "Professional Certification · 2024",
    title: "Advanced Business Intelligence: Power BI, DAX & Power Query",
    subtitle:
      "Star schema dimensional modeling, high-complexity DAX expressions, advanced M transformations, and report governance.",
    meta: [
      { label: "Issuer", value: "BI Specialization · DAX & Power Query" },
      { label: "Year", value: "2024" },
      { label: "Focus", value: "Dimensional Modeling & Executive Analytics" },
      { label: "Status", value: "Completed & Active" },
    ],
    overview: [
      "A specialization centered on enterprise Business Intelligence architecture built upon the Microsoft Power BI ecosystem.",
      "Mariangel possesses advanced command over star schema architecture, active/inactive relationship management using USERELATIONSHIP, time-intelligence calculations, and VertiPaq engine optimization.",
      "This enables her to transform millions of disparate general ledger rows into high-performance dashboards with dynamic drill-downs, helping executives identify financial variances within seconds.",
    ],
    keyPointsTitle: "Validated Competencies",
    keyPoints: [
      "Dimensional data modeling (fact tables and conformed dimensions) following Kimball methodology.",
      "Writing sophisticated DAX formulas: dynamic filter context manipulation with CALCULATE, YTD/MTD running totals, and YoY comparisons.",
      "Power Query (M language) engineering for ingesting, transforming, and harmonizing disparate transaction sources.",
      "Executive UI/UX dashboard design emphasizing visual hierarchy, clarity, and accessibility.",
      "Semantic model governance, automated refresh schedules, and Row-Level Security (RLS) enforcement.",
    ],
    outcomesTitle: "Applied Implementation",
    outcomes: [
      { metric: "<3s", label: "Render and query response time across highly optimized executive dashboards" },
      { metric: "360°", label: "Consolidated operational view of liquidity, purchasing, and inventory" },
      { metric: "100%", label: "Executive autonomy in exploring operational KPIs and spending breakdowns" },
    ],
    tools: [
      "Power BI Desktop",
      "DAX",
      "Power Query (M)",
      "Star Schema",
      "VertiPaq Engine",
      "Financial KPIs",
      "SQL Server",
    ],
    relatedProjects: ["financialBiSuite", "netsuiteEtlPipeline"],
    seo: {
      title: "Power BI & Advanced DAX Certification | Mariangel Sierra Jaller",
      description:
        "Certification of Mariangel Sierra Jaller in Power BI, dimensional star modeling, advanced DAX, and Power Query for enterprise finance.",
      keywords: [
        "Power BI",
        "DAX",
        "Power Query",
        "Business Intelligence",
        "Star schema",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "gestion-operativa-erp-oracle-netsuite": {
    collection: "certifications",
    slug: "gestion-operativa-erp-oracle-netsuite",
    id: "netsuiteErpOperations",
    lang: "en",
    eyebrow: "Professional Certification · 2024",
    title: "Operational Management & Workflows in Oracle NetSuite ERP",
    subtitle:
      "Procure-to-Pay parameterization, purchase order audits, inventory control, electronic invoice reconciliation, and advanced Saved Searches.",
    meta: [
      { label: "Issuer", value: "ERP NetSuite Operations & Integration" },
      { label: "Year", value: "2024" },
      { label: "Focus", value: "Cloud ERP, Procurement & Internal Controls" },
      { label: "Status", value: "Completed & Active" },
    ],
    overview: [
      "Validates advanced competency in daily operations, parameter configuration, and audit workflows inside Oracle NetSuite ERP within education and institutional settings.",
      "Mariangel oversees transaction chains encompassing purchase requisitions, PO creation, item receipts, vendor bills, and electronic payment schedules.",
      "She additionally exploits the ERP's native analytical suite, building complex Saved Searches with embedded SQL formulas and automated variance triggers.",
    ],
    keyPointsTitle: "Validated Competencies",
    keyPoints: [
      "Comprehensive administration of the Procure-to-Pay cycle ensuring accounting and fiscal reconciliation.",
      "Configuring and maintaining advanced Saved Searches incorporating custom SQL formulas and multi-tier filters.",
      "Vendor catalog administration, pricing tiers, payment terms, and withholding tax setup.",
      "Multi-location inventory tracking, warehouse transfer logistics, and verified shrinkage adjustments.",
      "Integration with DIAN electronic invoicing mandates and matching tax certificates against ERP records.",
    ],
    outcomesTitle: "Applied Implementation",
    outcomes: [
      { metric: "100%", label: "Compliance of purchasing and disbursement records with ASPAEN internal controls" },
      { metric: "-70%", label: "Turnaround reduction in procurement reporting through custom Saved Searches" },
      { metric: "0", label: "Discrepancies across purchase orders, item receipts, and posted bills" },
    ],
    tools: [
      "Oracle NetSuite",
      "Saved Searches",
      "Procure-to-Pay",
      "Electronic Invoicing",
      "Inventory Management",
      "NetSuite SQL",
      "Approval Workflows",
    ],
    relatedProjects: ["procurementInventoryControl", "netsuiteEtlPipeline"],
    seo: {
      title: "Oracle NetSuite ERP Operations Certification | Mariangel Sierra",
      description:
        "Certification in Oracle NetSuite ERP operations: Procure-to-Pay workflows, Saved Searches, and inventory internal controls.",
      keywords: [
        "Oracle NetSuite",
        "Cloud ERP",
        "Procure to pay",
        "Saved searches",
        "Procurement",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "python-pandas-etl-automatizacion": {
    collection: "certifications",
    slug: "python-pandas-etl-automatizacion",
    id: "pythonDataScience",
    lang: "en",
    eyebrow: "Professional Certification · 2024",
    title: "Business Process Automation & ETL Pipelines with Python and Pandas",
    subtitle:
      "Building scripts for extraction, transformation, and loading (ETL), handling XML/JSON/Excel structures, and automated financial reconciliations.",
    meta: [
      { label: "Issuer", value: "Python Data Automation Specialist" },
      { label: "Year", value: "2024" },
      { label: "Focus", value: "Data Engineering, Scripting & ETL" },
      { label: "Status", value: "Completed & Active" },
    ],
    overview: [
      "Certifies professional expertise in Python and the Pandas library as the primary automation engine for large-scale accounting and financial data routines.",
      "Mariangel programs scripts that digest hundreds of electronic invoices in XML format and multi-account bank statements, performing automated cross-checks within seconds.",
      "This eliminates manual data entry human error while unlocking significant hours for qualitative fiscal analysis and strategic administrative planning.",
    ],
    keyPointsTitle: "Validated Competencies",
    keyPoints: [
      "Advanced DataFrame transformations with Pandas: grouping, pivoting, complex joins, and vectorized computations.",
      "Parsing semi-structured files including DIAN electronic invoicing XML trees and REST API JSON payloads.",
      "Automating multi-tab Excel spreadsheet read/write routines using openpyxl and xlsxwriter.",
      "Designing fuzzy matching algorithms to pair ambiguous bank statement descriptions with ERP vouchers.",
      "Implementing structured logging, robust exception handling, and data type validation checkpoints.",
    ],
    outcomesTitle: "Applied Implementation",
    outcomes: [
      { metric: "<10s", label: "Execution time to process monthly batches of hundreds of invoices and statements" },
      { metric: "100%", label: "Elimination of manual entry discrepancies in automated reconciliation routines" },
      { metric: "Python", label: "Production scripts continuously running across treasury and accounting operations" },
    ],
    tools: [
      "Python 3",
      "Pandas",
      "NumPy",
      "OpenPyXL",
      "XML Parsing",
      "JSON",
      "RegEx",
      "Scripting Automation",
    ],
    relatedProjects: ["netsuiteEtlPipeline", "treasuryAuditAutomation"],
    seo: {
      title: "Python Pandas ETL & Automation Certification | Mariangel Sierra",
      description:
        "Certification of Mariangel Sierra Jaller in Python, Pandas, ETL pipelines, and financial process automation.",
      keywords: [
        "Python",
        "Pandas",
        "ETL",
        "Financial automation",
        "Scripting",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "excel-avanzado-consolidacion-financiera": {
    collection: "certifications",
    slug: "excel-avanzado-consolidacion-financiera",
    id: "excelFinancialModeling",
    lang: "en",
    eyebrow: "Professional Certification · 2023",
    title: "Advanced Excel, Financial Modeling & Accounting Consolidation",
    subtitle:
      "Dynamic array formulas, complex lookup functions, advanced pivot tables, Power Pivot, and cash flow forecasting models.",
    meta: [
      { label: "Issuer", value: "Financial Control & Excel Modeling" },
      { label: "Year", value: "2023" },
      { label: "Focus", value: "Financial Modeling, Audit & Advanced Spreadsheets" },
      { label: "Status", value: "Completed & Active" },
    ],
    overview: [
      "Validates advanced command of Microsoft Excel as a core engine for corporate financial analysis, budget forecasting, and accounting audit integrity.",
      "Mariangel constructs fully auditable models with strict structural separation between input parameters, calculation engines, and executive summary layers.",
      "Her workbooks reliably consolidate multi-period, multi-campus financial data into standardized reporting packages ready for board review.",
    ],
    keyPointsTitle: "Validated Competencies",
    keyPoints: [
      "Authoring complex dynamic array formulas for automated cross-referencing across vast ledger sheets.",
      "Designing rolling cash flow projection models and procurement sensitivity tables under varying credit conditions.",
      "Leveraging Power Pivot to connect disparate external tables and compute key financial ratios via DAX.",
      "Conducting formula audits, precedent/dependent mapping, and building data validation integrity rules.",
      "Developing institutional templates for petty cash reconciliation, travel expenses, and corporate card accounting.",
    ],
    outcomesTitle: "Applied Implementation",
    outcomes: [
      { metric: "0 Errors", label: "Mathematical integrity verified across corporate financial reconciliation models" },
      { metric: "-60%", label: "Time required to consolidate end-of-month financial reports" },
      { metric: "Standard", label: "Templates officially adopted into the daily routine of the accounting department" },
    ],
    tools: [
      "Advanced Excel",
      "Power Pivot",
      "XLOOKUP",
      "Dynamic Arrays",
      "Financial Modeling",
      "Pivot Tables",
      "Cell Auditing",
    ],
    relatedProjects: ["financialBiSuite", "treasuryAuditAutomation"],
    seo: {
      title: "Advanced Excel & Financial Modeling Certification | Mariangel Sierra",
      description:
        "Certification in advanced Excel, Power Pivot, and financial modeling earned by Mariangel Sierra Jaller for corporate accounting.",
      keywords: [
        "Advanced Excel",
        "Financial modeling",
        "Power Pivot",
        "Accounting consolidation",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  "gestion-agil-procesos-proyectos": {
    collection: "certifications",
    slug: "gestion-agil-procesos-proyectos",
    id: "scrumFoundations",
    lang: "en",
    eyebrow: "Professional Certification · 2023",
    title: "Agile Project Management Foundations with Scrum & Continuous Improvement",
    subtitle:
      "Agile frameworks applied to iterative delivery, business-value requirement prioritization, Kanban flow boards, and improvement retrospectives.",
    meta: [
      { label: "Issuer", value: "Agile Methodologies & Continuous Improvement" },
      { label: "Year", value: "2023" },
      { label: "Focus", value: "Scrum, Kanban & Team Productivity" },
      { label: "Status", value: "Completed & Active" },
    ],
    overview: [
      "Validates understanding of Agile Manifesto principles and practical implementation of Scrum in driving operational transformation and analytics projects.",
      "Mariangel uses these principles to break down large initiatives—such as chart-of-accounts cleanup or ERP migration phases—into focused weekly sprints with visible deliverables.",
      "She pairs Scrum sprints with Kanban visualization to highlight authorization bottlenecks in procurement and treasury approvals, accelerating overall team velocity.",
    ],
    keyPointsTitle: "Validated Competencies",
    keyPoints: [
      "Clear mastery of Scrum roles, artifacts, and ceremonies (Product Backlog, Sprint Planning, Standups, Retrospectives).",
      "Visual workflow management with Kanban boards and explicit Work-in-Progress (WIP) constraints.",
      "Translating complex organizational needs into well-defined user stories with clear acceptance criteria.",
      "Fostering continuous improvement feedback loops to resolve friction points across operational routines.",
      "Bridging interdisciplinary teams between accounting executives, operations staff, and software developers.",
    ],
    outcomesTitle: "Applied Implementation",
    outcomes: [
      { metric: "100%", label: "On-time completion of delivery sprints in operational analytics initiatives" },
      { metric: "Visibility", label: "End-to-end transparency across institutional purchasing and treasury workflows" },
      { metric: "Agility", label: "Rapid adaptability in response to shifting regulatory and tax mandates" },
    ],
    tools: [
      "Scrum",
      "Kanban",
      "User Stories",
      "Backlog Management",
      "Sprint Planning",
      "Continuous Improvement",
      "Jira / Trello",
    ],
    relatedProjects: ["academicEngineeringSuite", "procurementInventoryControl"],
    seo: {
      title: "Agile Scrum & Process Management Certification | Mariangel Sierra",
      description:
        "Certification of Mariangel Sierra Jaller in Agile project management with Scrum and Kanban applied to operations and analytics.",
      keywords: [
        "Scrum",
        "Kanban",
        "Agile management",
        "Continuous improvement",
        "User stories",
        "Mariangel Sierra Jaller",
      ],
    },
  },
};
