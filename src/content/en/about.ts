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
        "I am Mariangel Sierra Jaller, an engineering professional driven by a conviction: what is measured can be optimized, and what is automated frees human intellect for strategic value.",
        "With a dual foundation in Systems and Industrial Engineering—complemented by active studies in Biomedical Engineering—I bring a distinct cross-disciplinary approach. I bridge the gap between operational reality and software engineering, translating complex organizational requirements into scalable technical workflows.",
        "Over three years at Asociación para la Enseñanza (ASPAEN), I have led procurement workflows, financial reconciliations, and internal audits while engineering Python ETL pipelines and Power BI intelligence suites that eliminated manual reporting overhead.",
        "Whether standardizing multi-entity supply chains or deploying automated data ingestion pipelines, my objective remains constant: delivering resilience, audit-grade accuracy, and sustainable growth.",
      ],
      targetRoles: [
        "Operations & Systems Engineer",
        "Operations Analytics Specialist",
        "ERP Technical Consultant",
        "Continuous Improvement Lead",
        "Business Process Engineer",
      ],
      stats: [
        { label: "Experience", value: "3+ Years" },
        { label: "Engineering Disciplines", value: "3 Programs" },
        { label: "ERP Ecosystems", value: "Oracle NetSuite" },
        { label: "Languages", value: "Spanish (Native) · English (B2)" },
      ],
    },
    admin: {
      heading: "The Strategic Vision of Administrative Control",
      subheading: "Taming complexity, maximizing resource efficiency",
      paragraphs: [
        "I am Mariangel Sierra Jaller, an operations and financial specialist dedicated to enterprise discipline, resource traceability, and organizational efficiency.",
        "My multidisciplinary engineering background provides a rigorous analytical framework. I view financial and administrative operations not merely as cost tracking, but as proactive engines that safeguard cash flow, ensure compliance, and unlock margin improvement.",
        "At ASPAEN, I have overseen full-cycle procurement, managed supplier relationships, directed bank reconciliations with zero discrepancy tolerance, and institutionalized strict audit procedures across corporate centers.",
        "I align daily operational execution with long-term financial strategy, ensuring every resource invested is traced, audited, and optimized.",
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
        "Iterating relentlessly on process bottlenecks, reducing manual effort through Python scripts, smart Excel modeling, and workflow automation.",
    },
    {
      title: "Ethical & Audit-Grade Rigor",
      description:
        "Maintaining zero-compromise standards on data integrity, fiscal compliance, and documentation traceability across all operations.",
    },
  ],
  educationTitle: "Academic Trajectory",
  educationSubtitle:
    "Six complementary programs combining software engineering, industrial management, financial accounting, and clinical systems.",
  inProgressLabel: "In Progress",
  viewDetailsLabel: "View Program Details",
  viewAllEducationLabel: "View Full Academic History",
};

export const EN_EDUCATION: Record<EducationId, EducationCopyItem> = {
  sanJoseSystems: {
    id: "sanJoseSystems",
    degree: "Bachelor of Science in Systems Engineering",
    summary:
      "Comprehensive program focused on software architecture, data engineering, database management, and enterprise application integration.",
    badges: ["In Progress", "Software Engineering", "Databases", "Distributed Systems"],
  },
  sanJoseIndustrial: {
    id: "sanJoseIndustrial",
    degree: "Bachelor of Science in Industrial Engineering",
    summary:
      "Comprehensive focus on operations research, supply chain optimization, continuous improvement, and quality management systems.",
    badges: ["In Progress", "Operations Research", "Supply Chain", "Quality Systems"],
  },
  itmBiomedical: {
    id: "itmBiomedical",
    degree: "Bachelor of Science in Biomedical Engineering",
    summary:
      "Specializing in clinical engineering, health tech systems, bioinstrumentation, and hospital equipment management.",
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
