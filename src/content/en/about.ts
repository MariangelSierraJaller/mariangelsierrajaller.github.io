import type {
  AboutCopy,
  EducationCopyItem,
  EducationId,
} from "@/types/content";

export const EN_ABOUT: AboutCopy = {
  eyebrow: "About Me",
  title: "Multidisciplinary Engineering & Strategic Execution",
  subtitle:
    "Connecting operational control, financial accountability, and data architecture to solve complex business problems.",
  terminalCaption: "mariangel@workspace:~$ cat profile.json",
  roleNarratives: {
    general: {
      heading: "Bridging Two Crucial Business Dimensions",
      subheading: "Strategic operations fueled by technical precision",
      paragraphs: [
        "I am Mariangel Sierra Jaller, an engineering professional focused on automating repetitive operational workflows and turning transactional ERP records into reliable decision metrics.",
        "Graduated on September 10, 2026 with B.S. degrees in Systems Engineering and Industrial Engineering plus a Technology degree in Systems from Fundación Universidad San José, and pursuing my third engineering degree in Biomedical Engineering at ITM, I connect operational governance with software engineering.",
        "Over four years at Asociación para la Enseñanza (ASPAEN), I have managed full-cycle procurement, bank reconciliations, and internal audits while engineering Python ETL pipelines and Power BI suites that save 30+ hours per month.",
        "Whether standardizing multi-campus supply chains or automating ERP data ingestion, my focus stays on audit-grade accuracy, traceability, and measurable operational results.",
      ],
      targetRoles: [
        "Systems & Operations Engineer",
        "Operations Analytics Specialist",
        "ERP Technical Consultant",
        "Continuous Improvement Lead",
        "Business Process Engineer",
      ],
      stats: [
        { label: "Experience", value: "4+ Years" },
        { label: "San José Degrees", value: "Systems & Industrial" },
        { label: "ERP Ecosystems", value: "Oracle NetSuite" },
        { label: "Languages", value: "ES (Native) · EN (B2)" },
      ],
    },
    admin: {
      heading: "The Strategic Vision of Administrative Control",
      subheading: "Taming complexity, maximizing resource efficiency",
      paragraphs: [
        "I am Mariangel Sierra Jaller, an engineering professional focused on enterprise discipline, financial traceability, and operational efficiency.",
        "My multidisciplinary engineering background gives me a quantitative lens on administration. I run procurement, treasury, and internal controls to protect cash flow, enforce DIAN compliance, and prevent billing discrepancies.",
        "At ASPAEN, I have managed full-cycle procurement across 80+ suppliers, directed monthly bank reconciliations with zero unresolved variances, and standardized audit procedures across 12 cost centers.",
        "I pair Industrial Engineering process discipline with ERP and BI tooling to keep daily operations measurable and audit-ready.",
      ],
      targetRoles: [
        "Procurement & Supply Chain Coordinator",
        "Financial & Treasury Analyst",
        "Internal Control & Process Auditor",
        "Administrative Operations Manager",
        "Contract & Vendor Specialist",
      ],
      stats: [
        { label: "Procurement Traceability", value: "100%" },
        { label: "Treasury Audits", value: "Zero Discrepancies" },
        { label: "Core Platform", value: "NetSuite ERP" },
        { label: "Audit Cycle Time", value: "-60%" },
      ],
    },
    tech: {
      heading: "The Analytical Engineering Mindset",
      subheading: "Building resilient pipelines between raw data and executive action",
      paragraphs: [
        "I am Mariangel Sierra Jaller, a systems engineer and developer focused on enterprise data architecture, ETL pipeline engineering, and business intelligence.",
        "I treat every manual bottleneck as an architectural challenge. By pairing Python data manipulation with relational SQL modeling and ERP integrations, I build automated pipelines that extract, cleanse, and transform fragmented business records into reliable data assets.",
        "My work connects deep ERP backend workflows (Oracle NetSuite XML/JSON endpoints) directly into interactive Power BI dashboards, providing senior executives with real-time operational visibility.",
        "I lead digital transformation by writing maintainable automation scripts, enforcing data governance protocols, and engineering solutions that directly accelerate decision-making.",
      ],
      targetRoles: [
        "Data Analyst & Analytics Engineer",
        "Junior Backend / Automation Developer",
        "ERP Technical Specialist (NetSuite)",
        "Business Intelligence Consultant",
        "Data Operations Specialist",
      ],
      stats: [
        { label: "ETL Ingestion", value: "Automated Python" },
        { label: "BI Frameworks", value: "Power BI · DAX" },
        { label: "Data Schemas", value: "SQL & CRISP-DM" },
        { label: "ERP Integration", value: "XML / JSON / APIs" },
      ],
    },
  },
  pillarsTitle: "Core Architectural Pillars",
  pillars: [
    {
      title: "Methodological Precision",
      description:
        "Applying CRISP-DM, agile frameworks, and industrial engineering optimization models to ensure every project is structured and repeatable.",
    },
    {
      title: "Systemic Integration",
      description:
        "Eliminating departmental silos by tying together ERP transaction records, financial accounting, and modern analytics layers.",
    },
    {
      title: "Continuous Improvement",
      description:
        "Removing process bottlenecks and reducing manual effort through Python scripts, structured Excel modeling, and workflow automation.",
    },
    {
      title: "Audit-Grade Rigor",
      description:
        "Enforcing consistent standards for data integrity, DIAN fiscal compliance, and documentation traceability across operations.",
    },
  ],
  educationTitle: "Academic Trajectory",
  educationSubtitle:
    "Seven complementary credentials spanning Systems & Industrial Engineering (graduated Sep 2026), Systems Technology, accounting, software programming, and Biomedical Engineering.",
  inProgressLabel: "In Progress",
  viewDetailsLabel: "View Program Details",
  viewAllEducationLabel: "View Full Academic History",
};

export const EN_EDUCATION: Record<EducationId, EducationCopyItem> = {
  sanJoseSystems: {
    id: "sanJoseSystems",
    degree: "B.S. in Systems Engineering",
    summary:
      "Graduated on September 10, 2026 with strong focus on software architecture, data engineering, relational databases, and enterprise application integration.",
    badges: ["Graduated Sep 2026", "Software Engineering", "Databases", "Distributed Systems"],
  },
  sanJoseIndustrial: {
    id: "sanJoseIndustrial",
    degree: "B.S. in Industrial Engineering",
    summary:
      "Graduated on September 10, 2026 focusing on operations research, supply chain optimization, continuous improvement, and quality management systems.",
    badges: ["Graduated Sep 2026", "Operations Research", "Supply Chain", "Quality Systems"],
  },
  sanJoseSystemsTech: {
    id: "sanJoseSystemsTech",
    degree: "Technologist in Systems",
    summary:
      "Technology degree awarded on September 10, 2026 covering systems administration, software implementation, networking, and enterprise database management.",
    badges: ["Graduated Sep 2026", "Information Systems", "Application Logic", "Databases"],
  },
  itmBiomedical: {
    id: "itmBiomedical",
    degree: "B.S. in Biomedical Engineering (3rd Engineering)",
    summary:
      "Active studies toward a third engineering degree, specializing in clinical engineering, health tech systems, bioinstrumentation, and hospital equipment management.",
    badges: ["In Progress", "Clinical Systems", "Medical Devices", "Bioinformatics"],
  },
  itmAccountingTech: {
    id: "itmAccountingTech",
    degree: "Associate Degree in Financial & Accounting Management",
    summary:
      "Intensive training in treasury operations, financial accounting, tax regulations, cost accounting, and bank reconciliations.",
    badges: ["Graduated", "Financial Accounting", "Treasury", "Fiscal Compliance"],
  },
  senaSoftware: {
    id: "senaSoftware",
    degree: "Technical Certificate in Software Development",
    summary:
      "Hands-on foundation in algorithm design, object-oriented programming, relational databases, and application logic.",
    badges: ["Certified", "Python", "SQL", "Application Logic"],
  },
  inemComputerScience: {
    id: "inemComputerScience",
    degree: "Academic High School Diploma with Computer Science Focus",
    summary:
      "Early foundational curriculum in computational logic, algorithmic thinking, computer systems, and office technology.",
    badges: ["Completed", "Foundational CS", "Computational Logic"],
  },
};
