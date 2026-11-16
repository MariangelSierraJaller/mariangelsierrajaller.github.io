import type { JourneyCopy } from "@/types/journey";

export const EN_JOURNEY: JourneyCopy = {
  eyebrow: "Evolutionary Roadmap & Methodology",
  title: "Career Trajectory & Convergence Map",
  subtitle:
    "From SENA software programming and accounting operations at ASPAEN to graduating in Systems Engineering, Industrial Engineering & Systems Tech (Sep 10, 2026), advancing toward Biomedical Engineering.",
  tabs: {
    map: {
      label: "Transit Lines",
      description: "Interconnected key stations from 2019 through to the strategic 2028 horizon.",
    },
    evolution: {
      label: "Capability Epochs",
      description: "Progressive growth across operational, financial, and multi-disciplinary engineering domains.",
    },
    focus: {
      label: "Hybrid Profile",
      description: "Analytical balance combining administrative rigor with advanced technical problem-solving.",
    },
    horizon: {
      label: "Future Horizons",
      description: "Upcoming milestones in engineering graduation, data architecture, and healthcare tech leadership.",
    },
  },
  lines: {
    education: {
      label: "Education & Degrees",
      color: "#5ca3ff",
    },
    admin: {
      label: "Administrative Operations & Processes",
      color: "#ffd166",
    },
    finance: {
      label: "Finance & Treasury",
      color: "#5ce6a0",
    },
    data: {
      label: "Data Analytics & BI",
      color: "#b085f5",
    },
    erp: {
      label: "ERP Ecosystem & NetSuite",
      color: "#67c6f5",
    },
    biomedical: {
      label: "Biomedical Engineering & Healthcare",
      color: "#ff8a8a",
    },
  },
  nodes: [
    {
      id: "node-inem-2019",
      year: 2019,
      line: "education",
      station: "I.E. Inem José Félix de Restrepo",
      label: "Technical High School Diploma in Computer Science",
      detail:
        "Foundational training in algorithmic problem solving, computer networking, and basic relational database modeling.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "bachiller-informatica-inem",
      },
    },
    {
      id: "node-sena-2020",
      year: 2020,
      line: "education",
      station: "SENA — National Learning Service",
      label: "Associate Degree in Software Programming",
      detail:
        "Intensive technical curriculum covering software architecture, relational SQL modeling, UML specifications, and the SDLC.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "tecnico-programacion-software-sena",
      },
    },
    {
      id: "node-software-patterns-2020",
      year: 2020,
      line: "data",
      station: "Architecture & Scripting",
      label: "Structured Logic & Relational SQL",
      detail:
        "Implementation of initial database schema normalizations and automation scripts for administrative routines.",
      link: {
        kind: "project",
        slug: "arquitectura-software-optimizacion-procesos",
      },
    },
    {
      id: "node-grad-sena-inem-2021",
      year: 2021,
      line: "education",
      station: "Dual High School & Technical Graduation",
      label: "Technical High School + SENA Software Programmer",
      detail:
        "Concurrent completion of high school studies and official SENA professional certification in software development.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "tecnico-programacion-software-sena",
      },
    },
    {
      id: "node-admin-proc-2021",
      year: 2021,
      line: "admin",
      station: "Operational Standardization",
      label: "Process Flow Mapping & Documentation",
      detail:
        "Design of operating procedures matrices and standardized workflow manuals supporting administrative tasks.",
    },
    {
      id: "node-itm-tech-2022",
      year: 2022,
      line: "education",
      station: "ITM University Institution",
      label: "Professional Certificate in Financial & Accounting Processes",
      detail:
        "Mastery of Colombian GAAP/IFRS charts of accounts, payroll calculations, tax withholdings, and balance sheet preparation.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "tecnico-contable-financiero-itm",
      },
    },
    {
      id: "node-aspaen-intern-2022",
      year: 2022,
      line: "admin",
      station: "ASPAEN Medellín",
      label: "Administrative & Accounting Internship",
      detail:
        "Formal onboarding into the educational network: electronic invoice processing, physical-to-digital archiving, and petty cash reconciliations.",
      link: {
        kind: "detail",
        collection: "experience",
        slug: "aspaen-practica-contable-integracion",
      },
    },
    {
      id: "node-treasury-init-2022",
      year: 2022,
      line: "finance",
      station: "ASPAEN Treasury Operations",
      label: "Collections Control & Daily Cash Balancing",
      detail:
        "Standardization of daily tuition payment tracking and multi-bank ledger verification for high-volume cash inflows.",
      link: {
        kind: "project",
        slug: "automatizacion-tesoreria-conciliacion",
      },
    },
    {
      id: "node-aspaen-analyst-2023",
      year: 2023,
      line: "admin",
      station: "ASPAEN Medellín",
      label: "Operations & Administrative Analyst",
      detail:
        "Promoted to full-time staff: managing institutional procurement, overseeing physical inventory audits, and leading financial reporting.",
      link: {
        kind: "detail",
        collection: "experience",
        slug: "aspaen-operaciones-analitica",
      },
    },
    {
      id: "node-netsuite-core-2023",
      year: 2023,
      line: "erp",
      station: "Oracle NetSuite ERP",
      label: "Procure-to-Pay & Inventory Control",
      detail:
        "End-to-end administration of purchase requisitions, automated approval hierarchies, warehouse receipts, and 3-way matching.",
      link: {
        kind: "project",
        slug: "control-compras-inventarios-erp",
      },
    },
    {
      id: "node-treasury-auto-2023",
      year: 2023,
      line: "finance",
      station: "Financial Audit & Control",
      label: "Automated Multi-Bank Reconciliation",
      detail:
        "Reduced month-end closing time from 4 days to 4 hours by engineering script-assisted bank reconciliation algorithms.",
      link: {
        kind: "project",
        slug: "automatizacion-tesoreria-conciliacion",
      },
    },
    {
      id: "node-sanjose-dual-2023",
      year: 2023,
      line: "education",
      station: "Fundación Universidad San José",
      label: "Systems & Industrial Engineering (Dual Degree)",
      detail:
        "Commenced concurrent degree programs focusing on operational research, systems architecture, process optimization, and enterprise data models.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "ingenieria-sistemas-san-jose",
      },
    },
    {
      id: "node-itm-bio-2023",
      year: 2023,
      line: "biomedical",
      station: "ITM University Institution",
      label: "B.S. in Biomedical Engineering",
      detail:
        "Started professional engineering curriculum focusing on biomedical instrumentation, clinical engineering, biosignals, and hospital safety protocols.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "ingenieria-biomedica-itm",
      },
    },
    {
      id: "node-excel-cert-2023",
      year: 2023,
      line: "finance",
      station: "Financial Modeling",
      label: "Advanced Excel & Financial Consolidation",
      detail:
        "Dynamic multi-cost-center financial spreadsheets, amortization schedules, cash flow forecasting, and automated macro-based reports.",
      link: {
        kind: "detail",
        collection: "certifications",
        slug: "excel-avanzado-consolidacion-financiera",
      },
    },
    {
      id: "node-etl-pipeline-2024",
      year: 2024,
      line: "data",
      station: "Python ETL Pipeline",
      label: "NetSuite Extraction & Pandas Transformation",
      detail:
        "Scheduled extraction of NetSuite Saved Searches via XML/JSON payloads, sanitization, schema normalization, and automated loading into SQL data marts.",
      link: {
        kind: "project",
        slug: "pipeline-etl-oracle-netsuite-bi",
      },
    },
    {
      id: "node-bi-suite-2024",
      year: 2024,
      line: "data",
      station: "Executive Power BI",
      label: "Executive Financial BI Suite",
      detail:
        "Star-schema modeling, advanced DAX variance measures, and drill-through interactive dashboards built for ASPAEN's executive board.",
      link: {
        kind: "project",
        slug: "suite-ejecutiva-power-bi-finanzas",
      },
    },
    {
      id: "node-netsuite-cert-2024",
      year: 2024,
      line: "erp",
      station: "NetSuite Governance",
      label: "ERP Operations & Customization Certification",
      detail:
        "Certified proficiency in managing charts of accounts, department/class segmentation, custom workflows, and electronic invoicing integrations.",
      link: {
        kind: "detail",
        collection: "certifications",
        slug: "gestion-operativa-erp-oracle-netsuite",
      },
    },
    {
      id: "node-crisp-dm-2024",
      year: 2024,
      line: "data",
      station: "Analytics & CRISP-DM",
      label: "End-to-End Analytics Framework",
      detail:
        "Adoption of rigorous data mining lifecycle standards, structured business hypothesis validation, and operational data governance.",
      link: {
        kind: "detail",
        collection: "certifications",
        slug: "analitica-datos-crisp-dm",
      },
    },
    {
      id: "node-clinical-tech-2025",
      year: 2025,
      line: "biomedical",
      station: "ITM Clinical Engineering",
      label: "Biomedical Technology & Asset Management",
      detail:
        "Formulating clinical metrology protocols, hospital equipment lifecycle policies, and specialized clinical procurement workflows.",
      link: {
        kind: "project",
        slug: "gestion-tecnologia-biomedica-instrumentacion",
      },
    },
    {
      id: "node-arch-suite-2025",
      year: 2025,
      line: "erp",
      station: "Organizational Optimization",
      label: "Process Engineering & Architecture Suite",
      detail:
        "Architecting cross-departmental workflow engines synchronizing purchasing, inventory, treasury, and ledger records in near real-time.",
      link: {
        kind: "project",
        slug: "arquitectura-software-optimizacion-procesos",
      },
    },
    {
      id: "node-grad-sanjose-2026",
      year: 2026,
      line: "education",
      station: "September 10, 2026 Graduation — San José",
      label: "Systems + Industrial Eng. + Systems Tech",
      detail:
        "Completed graduation on September 10, 2026 at Fundación Universidad San José with dual B.S. Engineering degrees and a Technologist in Systems diploma.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "ingenieria-sistemas-san-jose",
      },
    },
    {
      id: "node-ai-ops-2026",
      year: 2026,
      line: "data",
      station: "Data Lakehouse & Forecast",
      label: "Operational Predictive Analytics",
      detail:
        "Deploying time-series forecasting models for budget variance monitoring and dynamic inventory reorder point optimization.",
      link: {
        kind: "project",
        slug: "pipeline-etl-oracle-netsuite-bi",
      },
    },
    {
      id: "node-bio-signal-2027",
      year: 2027,
      line: "biomedical",
      station: "Clinical Bioinformatics",
      label: "Medical Software & Biosignal Algorithms",
      detail:
        "Engineering digital biosignal processing routines and telemetry integration connecting medical devices with hospital health systems.",
      link: {
        kind: "project",
        slug: "gestion-tecnologia-biomedica-instrumentacion",
      },
    },
    {
      id: "node-grad-itm-2028",
      year: 2028,
      line: "education",
      station: "ITM Professional Degree",
      label: "Graduated Biomedical Engineer",
      detail:
        "Graduation from ITM University Institution, solidifying triple engineering competence across Systems, Industrial, and Biomedical disciplines.",
      link: {
        kind: "detail",
        collection: "education",
        slug: "ingenieria-biomedica-itm",
      },
    },
    {
      id: "node-executive-health-2028",
      year: 2028,
      line: "biomedical",
      station: "Healthcare Technology Leadership",
      label: "Engineering & Healthcare Convergence",
      detail:
        "Executive leadership in digital health transformation, clinical asset governance, and high-complexity hospital operations management.",
      link: {
        kind: "project",
        slug: "gestion-tecnologia-biomedica-instrumentacion",
      },
    },
  ],
  capabilityAxes: [
    { id: "operations", label: "Operations & Processes" },
    { id: "finance", label: "Finance & Treasury" },
    { id: "analytics", label: "Data Analytics & BI" },
    { id: "automation", label: "Automation & Scripting" },
    { id: "engineering", label: "Systems & Industrial Eng." },
    { id: "biomedical", label: "Biomedical Tech & Healthcare" },
  ],
  epochs: [
    {
      year: "2019–2020",
      title: "Technical Foundations & Algorithmic Logic",
      scores: {
        operations: 35,
        finance: 20,
        analytics: 40,
        automation: 35,
        engineering: 45,
        biomedical: 15,
      },
    },
    {
      year: "2021–2022",
      title: "Operational Immersion, Accounting & Treasury",
      scores: {
        operations: 70,
        finance: 75,
        analytics: 55,
        automation: 50,
        engineering: 55,
        biomedical: 25,
      },
    },
    {
      year: "2023–2024",
      title: "NetSuite ERP Specialization & ETL Pipelines",
      scores: {
        operations: 90,
        finance: 88,
        analytics: 90,
        automation: 85,
        engineering: 80,
        biomedical: 50,
      },
    },
    {
      year: "2025–2026",
      title: "Dual Engineering Degree & Strategic BI",
      scores: {
        operations: 95,
        finance: 92,
        analytics: 96,
        automation: 92,
        engineering: 92,
        biomedical: 75,
      },
    },
    {
      year: "2027–2028",
      title: "Bioengineering Convergence & Tech Leadership",
      scores: {
        operations: 98,
        finance: 95,
        analytics: 98,
        automation: 96,
        engineering: 98,
        biomedical: 96,
      },
    },
  ],
  focusTitle: "Competency Alignment by Target Role",
  focusSubtitle:
    "Comparative analysis of technical depth and operational focus across Administrative, Tech, and Hybrid perspectives.",
  focusLegend: {
    admin: "Administrative & Financial Track",
    tech: "Technical & Analytical Track",
    hybrid: "Integrated Hybrid Profile (Mariangel Sierra)",
  },
  focusAxes: [
    {
      axis: "Operations & ERP",
      admin: 96,
      tech: 82,
      hybrid: 96,
    },
    {
      axis: "Financial Control & Treasury",
      admin: 94,
      tech: 70,
      hybrid: 92,
    },
    {
      axis: "Data Analytics & Power BI",
      admin: 76,
      tech: 96,
      hybrid: 94,
    },
    {
      axis: "Automation & Python",
      admin: 62,
      tech: 96,
      hybrid: 92,
    },
    {
      axis: "Systems & Process Engineering",
      admin: 80,
      tech: 94,
      hybrid: 93,
    },
    {
      axis: "Biomedical Tech & Healthcare",
      admin: 50,
      tech: 90,
      hybrid: 85,
    },
  ],
  horizonMilestones: [
    {
      period: "2026-Q4",
      title: "Data Lakehouse Ecosystem & Treasury Forecasting",
      focus: "tech",
      description:
        "Expansion of Oracle NetSuite data pipelines into a decoupled analytical store with time-series treasury forecasting following September 2026 graduation.",
      outcomes: [
        "End-to-end ingestion pipeline from NetSuite REST/SOAP APIs to PostgreSQL/DuckDB storage",
        "Budget variance and cash-flow forecasting models with >95% statistical confidence",
        "Zero manual discrepancies between billing subledgers and external bank statements",
      ],
    },
    {
      period: "2027-Q2",
      title: "Clinical Engineering & Hospital Asset Metrology Architecture",
      focus: "tech",
      description:
        "Architecting a clinical equipment lifecycle framework bridging health regulations (INVIMA/FDA) with ERP fixed asset and inventory tracking.",
      outcomes: [
        "Digital metrology traceability matrix for high-risk critical care medical devices",
        "Prototype Python biosignal processing utilities for clinical equipment telemonitoring",
        "Standardized technovigilance feedback loops integrated into clinical supply chains",
      ],
    },
    {
      period: "2027-Q4",
      title: "Healthcare Interoperability & Operations Analytics",
      focus: "hybrid",
      description:
        "Applying combined Systems, Industrial, and Biomedical foundations to optimize specialized procurement and health-tech information flows.",
      outcomes: [
        "Standardized critical hospital inventory replenishment policies",
        "Operational reliability dashboards bridging clinical assets and ERP financials",
      ],
    },
    {
      period: "2028-Q4",
      title: "Third Engineering Degree: B.S. in Biomedical Engineering (ITM)",
      focus: "hybrid",
      description:
        "Conferral of Biomedical Engineering at ITM, completing her third engineering degree across Systems, Industrial, and Biomedical disciplines.",
      outcomes: [
        "Capstone completion in clinical engineering interoperability and hospital intelligence",
        "Leadership readiness for digital transformation in healthcare networks and enterprise tech",
        "Triple engineering credential uniting ERP systems, advanced analytics, and bioengineering",
      ],
    },
  ],
};