import type { ResumeSectionCopy, ResumeVariantId } from "@/types/content";

export const EN_RESUME: ResumeSectionCopy = {
  eyebrow: "Curriculum Vitae",
  title: "Download Resume",
  subtitle:
    "Select the profile version that best matches your evaluation requirements, or download the ATS-ready standard.",
  downloadLocalCta: "Download PDF",
  viewDriveCta: "View on Google Drive",
  recommendedLabel: "Recommended",
  variants: {
    admin: {
      id: "admin" as ResumeVariantId,
      label: "Operations & Financial Profile",
      badge: "Business Operations",
      description:
        "Tailored for procurement coordinators, financial analysts, operations managers, and internal control auditors.",
      highlights: [
        "End-to-end procurement and supply chain management",
        "Oracle NetSuite ERP operational execution & invoicing",
        "Treasury control, multi-bank reconciliations & DIAN compliance",
        "Process standardization and audit-grade documentation",
      ],
      previewAlt: "Preview of Mariangel Sierra Jaller's Administrative Resume",
    },
    tech: {
      id: "tech" as ResumeVariantId,
      label: "Systems & Data Profile",
      badge: "Engineering & Data",
      description:
        "Tailored for data analysts, automation engineers, ERP consultants, and business intelligence specialists.",
      highlights: [
        "Python (Pandas, ETL pipelines, automated XML/JSON ingestion)",
        "Power BI enterprise modeling, DAX measures & KPI suites",
        "SQL data querying, schema architecture & CRISP-DM methodology",
        "Systems integration, API workflows & ERP technical automation",
      ],
      previewAlt: "Preview of Mariangel Sierra Jaller's Technical Resume",
    },
    ats: {
      id: "ats" as ResumeVariantId,
      label: "ATS-Optimized Comprehensive CV",
      badge: "Single-Column Plain Text",
      description:
        "Clean, machine-readable format designed for applicant tracking systems (Workday, Taleo, Greenhouse) without complex layouts.",
      highlights: [
        "Standard ATS single-column hierarchy",
        "Full chronological employment and educational record",
        "Complete technical and operational skill keywords",
        "Optimized for algorithmic keyword matching",
      ],
      previewAlt: "Preview of Mariangel Sierra Jaller's ATS-Optimized Resume",
    },
  },
};
