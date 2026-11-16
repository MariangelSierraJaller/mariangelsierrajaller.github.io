import type { ServiceId, ServicesSectionCopy } from "@/types/content";

export const EN_SERVICES: ServicesSectionCopy = {
  eyebrow: "Professional Services & Solutions",
  title: "Areas of Impact",
  subtitle:
    "Tailored engineering and administrative solutions designed to scale operational efficiency, financial control, and automated intelligence.",
  deliverablesLabel: "Key Deliverables",
  impactLabel: "Quantifiable Impact",
  ctaLabel: "Discuss This Service",
  items: {
    erpOperations: {
      id: "erpOperations" as ServiceId,
      title: "ERP Operations & NetSuite Optimization",
      tagline:
        "Transforming enterprise ERP transactions into streamlined, audit-ready operational workflows.",
      description:
        "Comprehensive operational management and optimization of Oracle NetSuite environments. From item masters and vendor catalogs to purchase order lifecycles and automated receipts, ensuring zero data discrepancies across departments.",
      deliverables: [
        "Purchase order & inventory lifecycle configuration",
        "Vendor registry & payment term standardization",
        "Electronic billing & DIAN validation integration",
        "User role permissions & internal control audit trails",
      ],
      impact: "Up to 50% reduction in administrative cycle times and 100% audit-trail compliance.",
      tags: ["Oracle NetSuite", "Procurement", "Inventory", "Audit Trails", "ERP"],
    },
    financialControl: {
      id: "financialControl" as ServiceId,
      title: "Financial Governance & Treasury Auditing",
      tagline:
        "Enforcing cash flow discipline, automated reconciliations, and strict fiscal compliance.",
      description:
        "Structuring rigorous financial governance protocols. Automated daily bank reconciliations, cash flow variance analysis, and internal audits designed to detect leaks, prevent compliance penalties, and secure institutional liquidity.",
      deliverables: [
        "Multi-account automated bank reconciliation templates",
        "Petty cash and corporate disbursement audit protocols",
        "Monthly expenditure variance reports & forecasting models",
        "Withholding tax & statutory reporting packages",
      ],
      impact: "Eliminates reconciliation errors and cuts monthly closing cycles by 3 business days.",
      tags: ["Treasury", "Reconciliation", "Financial Modeling", "DIAN", "Internal Control"],
    },
    biDashboards: {
      id: "biDashboards" as ServiceId,
      title: "Executive Business Intelligence & Dashboards",
      tagline:
        "Translating operational noise into clear, high-impact executive visual intelligence.",
      description:
        "Designing centralized Power BI business intelligence suites. Establishing star-schema data models, robust DAX measures, and drill-down KPI dashboards that provide leadership with real-time operational and financial clarity.",
      deliverables: [
        "Star-schema data architecture & ETL data flows",
        "Interactive executive dashboards (Cash Flow, Procurement, KPIs)",
        "Custom DAX calculations for period-over-period performance",
        "Automated scheduled refresh and mobile-optimized layouts",
      ],
      impact: "Accelerates executive decision-making speed by 4x with real-time verified data.",
      tags: ["Power BI", "DAX", "Data Modeling", "KPI Dashboards", "Executive Reporting"],
    },
    processAutomation: {
      id: "processAutomation" as ServiceId,
      title: "Process Automation & Data Pipelines",
      tagline:
        "Eliminating repetitive spreadsheet drudgery with resilient Python and ETL pipelines.",
      description:
        "Engineering automated scripts to extract, validate, and load high-volume transaction data. Converting complex XML and JSON payloads into structured database tables without human intervention.",
      deliverables: [
        "Python ETL scripts (Pandas) for automated invoice parsing",
        "CSV, XML, and JSON automated cleansing pipelines",
        "Automated discrepancy alerts & reconciliation routines",
        "Scheduled task runners and automated email reporting",
      ],
      impact: "Saves 20+ hours per month of manual data entry while achieving zero human-entry error.",
      tags: ["Python", "Pandas", "ETL", "XML/JSON", "Workflow Automation"],
    },
  },
};
