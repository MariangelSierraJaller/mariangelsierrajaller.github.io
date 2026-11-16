import type { ProjectId } from "@/types/content";
import type { ProjectSummaryCopy } from "@/types/project";

export const EN_PROJECT_SUMMARIES: Record<ProjectId, ProjectSummaryCopy> = {
  netsuiteEtlPipeline: {
    id: "netsuiteEtlPipeline",
    title: "Oracle NetSuite ETL Pipeline & Automation",
    subtitle: "Scheduled Saved Search extraction, Pandas normalization, and analytical SQL loading",
    category: "Data Engineering & ERP",
    summary:
      "Automated Python architecture for extracting, cleaning, and consolidating accounting and procurement transactions from Oracle NetSuite into relational databases and Power BI models, replacing error-prone manual spreadsheet exports.",
    impactMetric: {
      value: "-92%",
      label: "Reporting Processing Time",
    },
    tags: ["Python", "Pandas", "Oracle NetSuite", "XML/JSON", "SQL", "ETL"],
  },
  financialBiSuite: {
    id: "financialBiSuite",
    title: "Executive Financial Business Intelligence Suite",
    subtitle: "Executive dashboards, budget variance analysis, and advanced DAX financial modeling",
    category: "Business Intelligence & Finance",
    summary:
      "Design and deployment of a Power BI analytical ecosystem featuring star-schema modeling and advanced DAX measures for ASPAEN's executive board, delivering real-time clarity across budget execution, cash flow, and cost center margins.",
    impactMetric: {
      value: "100%",
      label: "Real-Time Budget Visibility",
    },
    tags: ["Power BI", "DAX", "Power Query", "Star Schema", "Finance", "KPIs"],
  },
  procurementInventoryControl: {
    id: "procurementInventoryControl",
    title: "End-to-End Procurement & Inventory Control in ERP",
    subtitle: "Procure-to-Pay workflows, 3-way matching, and institutional warehouse optimization",
    category: "Operations & Supply Chain",
    summary:
      "Standardization and governance of institutional procurement and inventory in Oracle NetSuite at ASPAEN, covering purchase requisitions, PO approvals, warehouse receipts, and electronic invoicing with rigorous internal audit compliance.",
    impactMetric: {
      value: "99.4%",
      label: "Inventory Record Accuracy",
    },
    tags: ["Oracle NetSuite", "Procure-to-Pay", "Inventory", "Electronic Invoicing", "Internal Audit"],
  },
  treasuryAuditAutomation: {
    id: "treasuryAuditAutomation",
    title: "Treasury Automation & Bank Reconciliation System",
    subtitle: "Algorithmic reconciliation of bulk tuition inflows, cash counts, and fraud prevention",
    category: "Treasury & Internal Control",
    summary:
      "Systematized multi-bank statement reconciliation against school tuition ledger entries at ASPAEN, shrinking monthly closing cycles from 4 days to 4 hours while enforcing total audit traceability across every cash movement.",
    impactMetric: {
      value: "4d → 4h",
      label: "Monthly Closing Reduction",
    },
    tags: ["Treasury", "Bank Reconciliation", "Python", "Internal Control", "Advanced Excel"],
  },
  clinicalBioengineering: {
    id: "clinicalBioengineering",
    title: "Clinical Bioengineering & Biomedical Asset Management",
    subtitle: "Technovigilance protocols, medical device lifecycle, and clinical software systems at ITM",
    category: "Biomedical Engineering & Healthcare",
    summary:
      "Applied research and protocol design for hospital biomedical asset management at ITM, combining specialized clinical procurement, metrology compliance, INVIMA regulatory standards, and physiological signal software connectivity.",
    impactMetric: {
      value: "100%",
      label: "Clinical Regulatory Compliance",
    },
    tags: ["Biomedical Engineering", "Technovigilance", "Metrology", "Clinical Software", "Hospital Systems"],
  },
  academicEngineeringSuite: {
    id: "academicEngineeringSuite",
    title: "Engineering Suite: Systems Architecture & Process Optimization",
    subtitle: "Convergence of Systems & Industrial Engineering (San José) with SENA software logic",
    category: "Systems & Industrial Engineering",
    summary:
      "Integrated portfolio of engineering capstones and methodologies developed across Fundación Universidad San José and SENA, uniting queueing theory, industrial process optimization, relational database architectures, and service-oriented system designs.",
    impactMetric: {
      value: "+38%",
      label: "Estimated Organizational Flow Efficiency",
    },
    tags: ["Systems Engineering", "Industrial Engineering", "SENA", "CRISP-DM", "SQL", "Optimization"],
  },
};