import type {
  CertificationId,
  CertificationsSectionCopy,
} from "@/types/content";

export const EN_CERTIFICATIONS: CertificationsSectionCopy = {
  eyebrow: "Continuous Learning",
  title: "Certifications & Credentials",
  subtitle:
    "Validated expertise across data analytics, ERP systems, financial modeling, and agile management.",
  issuerLabel: "Issued by",
  yearLabel: "Year",
  viewDetailLabel: "View Certification Details",
  viewAllLabel: "View All Certifications",
  items: {
    googleDataAnalytics: {
      id: "googleDataAnalytics" as CertificationId,
      title: "Google Data Analytics Professional Specialization",
      summary:
        "Comprehensive certification covering the end-to-end data lifecycle: data cleaning, analytical problem solving, SQL querying, R programming, and Tableau visualization aligned with CRISP-DM.",
      competencies: [
        "Data Cleaning & Verification",
        "SQL Database Analysis",
        "Tableau & Visualization",
        "CRISP-DM Framework",
        "Statistical Synthesis",
      ],
    },
    powerBiAnalytics: {
      id: "powerBiAnalytics" as CertificationId,
      title: "Power BI & Business Intelligence Specialization",
      summary:
        "Advanced specialization in data modeling, Power Query transformations, DAX formulas, and designing enterprise executive dashboards.",
      competencies: [
        "DAX Formula Architecture",
        "Star Schema Modeling",
        "Power Query M-Code",
        "Interactive KPI Design",
        "Data Storytelling",
      ],
    },
    netsuiteErpOperations: {
      id: "netsuiteErpOperations" as CertificationId,
      title: "Oracle NetSuite ERP Operations & Systems Management",
      summary:
        "Practical credential focused on ERP transactions, supply chain workflows, purchase requisition lifecycles, and financial module integration.",
      competencies: [
        "NetSuite Workflows",
        "Procurement Lifecycles",
        "Inventory Valuation",
        "Audit Trail Logging",
        "System Integrations",
      ],
    },
    pythonDataScience: {
      id: "pythonDataScience" as CertificationId,
      title: "Python for Data Science & Automation",
      summary:
        "Practical credential in automated data extraction, Pandas/NumPy data manipulation, script scheduling, and ETL pipeline design.",
      competencies: [
        "Python Scripting",
        "Pandas & NumPy",
        "XML/JSON Parsing",
        "Automated Pipelines",
        "Error Handling",
      ],
    },
    excelFinancialModeling: {
      id: "excelFinancialModeling" as CertificationId,
      title: "Advanced Excel Financial Modeling & Corporate Control",
      summary:
        "Mastery of financial functions, multi-scenario forecasting models, dynamic array formulas, PivotTables, and financial dashboard architecture.",
      competencies: [
        "Financial Modeling",
        "Scenario Analysis",
        "Dynamic Arrays & VBA",
        "Automated Reconciliation",
        "Executive Summary Design",
      ],
    },
    scrumFoundations: {
      id: "scrumFoundations" as CertificationId,
      title: "Scrum Foundations & Agile Project Management",
      summary:
        "Foundational certification in agile frameworks, sprint management, cross-functional collaboration, and continuous improvement practices.",
      competencies: [
        "Agile Principles",
        "Sprint Execution",
        "Backlog Refinement",
        "Continuous Delivery",
        "Cross-Functional Alignment",
      ],
    },
  },
};
