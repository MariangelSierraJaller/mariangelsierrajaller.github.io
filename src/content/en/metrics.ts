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
          label: "Procurement Traceability",
          value: "100%",
          detail: "All purchase requisitions logged and audited via Oracle NetSuite",
        },
        {
          label: "Audit Cycle Reduction",
          value: "-60%",
          detail: "Time saved in document audits following standardized protocols",
        },
        {
          label: "Vendor Portfolio",
          value: "80+",
          detail: "Suppliers actively evaluated and managed across operational categories",
        },
        {
          label: "On-Time Fulfillment",
          value: "98%",
          detail: "Fulfillment rate achieved for critical educational supplies",
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
          label: "Monthly Closing Acceleration",
          value: "3 Days",
          detail: "Reduction in monthly financial close duration",
        },
        {
          label: "Electronic Invoices Audited",
          value: "10,000+",
          detail: "DIAN XML invoices verified and matched against ledger entries",
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
          value: "20+ hrs",
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
          label: "Engineering Disciplines",
          value: "3",
          detail: "Systems Engineering, Industrial Engineering, and Biomedical Engineering",
        },
        {
          label: "Higher Education Programs",
          value: "6",
          detail: "From foundational computer science to advanced engineering degrees",
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
