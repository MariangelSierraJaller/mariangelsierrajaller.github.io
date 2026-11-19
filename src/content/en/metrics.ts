import type { MetricGroupId, MetricsSectionCopy } from "@/types/content";

export const EN_METRICS: MetricsSectionCopy = {
  eyebrow: "Quantifiable Impact",
  title: "Key Performance Indicators",
  subtitle:
    "Concrete metrics reflecting operational rigor, financial governance, and technological automation.",
  groups: {
    operations: {
      id: "operations" as MetricGroupId,
      title: "Operational Execution & Procurement",
      subtitle:
        "Measurable discipline in supply chain, vendor management, and internal auditing.",
      items: [
        {
          label: "Physical Inventory Accuracy",
          value: "99.4%",
          detail: "Verified across quarterly cycle counts and 3-way matching in NetSuite",
        },
        {
          label: "PO Cycle Turnaround",
          value: "-65%",
          detail: "Streamlined Procure-to-Pay approvals and standardized requisitions",
        },
        {
          label: "Vendor Portfolio",
          value: "80+",
          detail: "Suppliers actively evaluated and managed across operational categories",
        },
        {
          label: "Purchase Orders Processed",
          value: "1,200+",
          detail: "Requisitions fulfilled across institutional departments at ASPAEN",
        },
      ],
    },
    finance: {
      id: "finance" as MetricGroupId,
      title: "Financial Governance & Treasury",
      subtitle:
        "Strict cash flow oversight, reconciliation precision, and statutory compliance.",
      items: [
        {
          label: "Reconciliation Discrepancies",
          value: "0",
          detail: "Zero-variance tolerance maintained across multi-bank accounts",
        },
        {
          label: "Monthly Closing Cycle",
          value: "4d → 4h",
          detail: "Bank reconciliation time reduced via Python cascading matching rules",
        },
        {
          label: "Monthly Cash Movements",
          value: "3,500+",
          detail: "Tuition inflows reconciled across 4 corporate bank accounts (99.8% auto-match)",
        },
        {
          label: "Fiscal Compliance",
          value: "100%",
          detail: "Flawless adherence to statutory tax and withholding requirements",
        },
      ],
    },
    automation: {
      id: "automation" as MetricGroupId,
      title: "Automation & Data Pipelines",
      subtitle:
        "Engineering scripts to eliminate manual friction and scale decision velocity.",
      items: [
        {
          label: "Monthly Hours Saved",
          value: "30+ hrs",
          detail: "Automated extraction and consolidation replacing manual spreadsheets",
        },
        {
          label: "Data Ingestion Pipeline",
          value: "100%",
          detail: "Automated Python ETL workflows parsing XML/JSON invoice streams",
        },
        {
          label: "BI Dashboards Deployed",
          value: "15+ KPIs",
          detail: "Real-time metrics monitored across financial and operational domains",
        },
        {
          label: "Human Entry Errors",
          value: "0%",
          detail: "Elimination of transcription errors through automated validation rules",
        },
      ],
    },
    academic: {
      id: "academic" as MetricGroupId,
      title: "Academic Rigor & Multidisciplinary Training",
      subtitle:
        "Continuous pursuit of high-impact engineering and technological competencies.",
      items: [
        {
          label: "Engineering & Tech Degrees",
          value: "2 + 1",
          detail: "Graduated Systems, Industrial & Systems Tech (Sep 10, 2026) + Biomedical at ITM",
        },
        {
          label: "Academic Credentials",
          value: "7",
          detail: "Dual engineering degrees, Systems Tech, accounting & software certificates",
        },
        {
          label: "Spoken Languages",
          value: "4",
          detail: "Spanish (Native), English (B2), French (A2), Korean (A1)",
        },
        {
          label: "Professional Certifications",
          value: "6+",
          detail: "Validated credentials across analytics, ERP, and agile frameworks",
        },
      ],
    },
  },
};
