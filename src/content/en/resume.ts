import type { ResumeSectionCopy, ResumeVariantId } from "@/types/content";

export const EN_RESUME: ResumeSectionCopy = {
  eyebrow: "Curriculum Vitae",
  title: "Download Resume",
  subtitle:
    "Select the profile version tailored to your role requirements, built from OhMyCV Markdown for clean single-column ATS parsing.",
  downloadLocalCta: "Download PDF",
  viewDriveCta: "View on Google Drive",
  recommendedLabel: "Recommended",
  variants: {
    admin: {
      id: "admin" as ResumeVariantId,
      label: "Operations & Financial Profile",
      badge: "Business Operations",
      description:
        "One-page ATS resume tailored for procurement coordination, corporate treasury, internal controls, and Oracle NetSuite ERP operations.",
      highlights: [
        "4+ years at ASPAEN cutting PO cycle time by 65% (1,200+ POs, 80+ vendors) with 99.4% inventory accuracy",
        "Shortened monthly bank reconciliations from 4 days to 4 hours across 4 accounts and 3,500+ movements",
        "DIAN electronic invoice compliance (XML/CUFE) and statutory audits closed with 0 negative findings",
        "B.S. in Industrial & Systems Engineering (Sep 10, 2026) + Biomedical Engineering in progress at ITM",
      ],
      previewAlt: "Preview of Mariangel Sierra Jaller's ATS Administrative Resume",
    },
    tech: {
      id: "tech" as ResumeVariantId,
      label: "Systems & Data Profile",
      badge: "Engineering & Data",
      description:
        "One-page ATS resume tailored for data analysts, BI developers (Power BI/DAX), Python ETL engineers, and NetSuite technical specialists.",
      highlights: [
        "Python (Pandas) ETL pipelines over NetSuite Saved Searches cutting weekly reporting from 12 hrs to 45 min (-92%)",
        "Kimball star-schema Power BI models with DAX time intelligence and RLS across 12 cost centers",
        "SQL 3-way matching audit queries and REST API/Zapier integrations with 0 manual transcription errors",
        "B.S. in Systems Engineering & Systems Technologist (Sep 10, 2026) + Biomedical Engineering at ITM",
      ],
      previewAlt: "Preview of Mariangel Sierra Jaller's ATS Technical Resume",
    },
    ats: {
      id: "ats" as ResumeVariantId,
      label: "ATS Format",
      badge: "OhMyCV · Single Column",
      description:
        "Clean one-page hybrid resume authored in OhMyCV Markdown and rendered in single-column plain hierarchy for Workday, Taleo, and Greenhouse.",
      highlights: [
        "Strict single-column linear layout free of multi-column tables, icons, photos, or skill sliders",
        "Google XYZ accomplishment bullets backed by verifiable ERP, Python, SQL, and finance metrics",
        "Machine-readable headings and clickable links to LinkedIn, GitHub, and portfolio case studies",
        "Includes key technical projects, 6 certifications, 7 academic credentials, and 4 languages",
      ],
      previewAlt: "Preview of Mariangel Sierra Jaller's Standard ATS Resume",
    },
  },
};
