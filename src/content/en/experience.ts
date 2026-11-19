import type { ExperienceSectionCopy } from "@/types/content";

export const EN_EXPERIENCE: ExperienceSectionCopy = {
  eyebrow: "Career Trajectory",
  title: "Professional Experience",
  subtitle:
    "Demonstrated track record optimizing enterprise operations, financial governance, and data automation at ASPAEN.",
  currentBadge: "Current Role",
  presentLabel: "Present",
  responsibilitiesLabel: "Key Achievements & Responsibilities",
  showMoreLabel: "Show more details",
  showLessLabel: "Show fewer details",
  viewDetailLabel: "Read Experience Case",
  viewAllLabel: "View All Experience",
  items: {
    aspaen: {
      id: "aspaen",
      byRole: {
        general: {
          roleTitle: "Operations & Analytics Specialist / Administrative Coordinator",
          summary:
            "Directing end-to-end procurement and financial operations while engineering automated Python data pipelines and executive Power BI dashboards to scale institutional efficiency.",
          highlights: [
            "Administer full-cycle procurement, purchase order approvals, and vendor contracts in Oracle NetSuite across educational centers.",
            "Lead daily treasury audits and bank reconciliations, ensuring zero variances and 100% DIAN electronic invoicing compliance.",
            "Architected automated Python ETL pipelines parsing invoice XML files and NetSuite exports directly into unified data stores.",
            "Developed interactive Power BI executive dashboards tracking budget execution, operational expenditures, and purchasing cycle times.",
          ],
        },
        admin: {
          roleTitle: "Procurement, Treasury & Administrative Operations Coordinator",
          summary:
            "Leading organizational procurement, vendor lifecycle governance, treasury management, and audit-grade internal controls with Oracle NetSuite.",
          highlights: [
            "Oversee multi-center purchasing workflows, negotiation of corporate terms, and rigorous evaluation of over 80 active vendors.",
            "Manage daily treasury reconciliations across multi-bank accounts, maintaining zero discrepancies and enforcing strict cash controls.",
            "Direct internal document audits and DIAN electronic billing validations, cutting audit cycle times by 60%.",
            "Enforce inventory control and asset traceability across institutional centers with standardized receiving protocols.",
          ],
        },
        tech: {
          roleTitle: "Data Analyst & ERP Systems Specialist",
          summary:
            "Designing data ingestion workflows, building automated ETL scripts in Python, and deploying enterprise Business Intelligence models on top of Oracle NetSuite.",
          highlights: [
            "Engineered resilient Python ETL scripts (Pandas) to extract, validate, and parse high-volume XML electronic invoices and NetSuite records.",
            "Designed star-schema relational models and complex DAX measures in Power BI, powering real-time executive financial reporting.",
            "Automated repetitive spreadsheet reconciliation tasks, saving 30+ hours per month of manual accounting effort.",
            "Integrated structured data exports with internal databases using SQL queries and automated validation constraints.",
          ],
        },
      },
    },
    aspaenInternship: {
      id: "aspaenInternship",
      byRole: {
        general: {
          roleTitle: "Administrative, Accounting & Digitalization Intern",
          summary:
            "Supported daily accounting closures, document traceability, and legacy file digitalization during the institutional migration to Oracle NetSuite.",
          highlights: [
            "Executed petty cash administration, invoice verification, and supported multi-bank reconciliation procedures.",
            "Led the digitalization of physical accounting archives, indexing records for instant audit retrieval.",
            "Developed structured Excel templates with formulas and data validation to assist staff during NetSuite ERP rollout.",
          ],
        },
        admin: {
          roleTitle: "Administrative & Accounting Operations Intern",
          summary:
            "Managed daily accounting support, petty cash verification, vendor invoice processing, and document archiving standards.",
          highlights: [
            "Administered petty cash funds and validated fiscal compliance on all incoming receipts and electronic bills.",
            "Assisted monthly bank reconciliations, cross-checking journal entries against physical statements.",
            "Reorganized central archives and established standardized filing criteria that met 100% of fiscal audit requirements.",
          ],
        },
        tech: {
          roleTitle: "Systems & Process Digitalization Intern",
          summary:
            "Assisted data cleansing, document scanning pipelines, and spreadsheet automation to support enterprise ERP adoption.",
          highlights: [
            "Transformed paper accounting records into clean, structured digital databases for ERP ingestion.",
            "Built automated Excel spreadsheets using advanced formulas and Power Query to accelerate monthly invoice cross-checks.",
            "Documented user verification steps and assisted colleagues in navigating the newly implemented NetSuite interface.",
          ],
        },
      },
    },
  },
};
