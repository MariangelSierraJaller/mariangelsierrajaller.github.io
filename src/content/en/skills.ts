import type { SkillGroupId, SkillsSectionCopy } from "@/types/content";

export const EN_SKILLS: SkillsSectionCopy = {
  eyebrow: "Technical & Professional Toolkit",
  title: "Skills & Proficiencies",
  subtitle:
    "A multidisciplinary blend of enterprise operations, financial governance, data engineering, and clinical systems.",
  languagesTitle: "Spoken Languages",
  softSkillsTitle: "Professional & Interpersonal Competencies",
  softSkills: [
    "Analytical rigor & attention to detail",
    "Critical thinking & complex problem solving",
    "Cross-functional team leadership & collaboration",
    "Strategic vendor negotiation & stakeholder communication",
    "Adaptability & continuous technical learning",
    "Process agility & continuous improvement mindset",
    "Ethical responsibility & audit-grade data discipline",
  ],
  spokenLanguages: {
    es: {
      name: "Spanish",
      level: "Native",
    },
    en: {
      name: "English",
      level: "B2 · Professional Working",
    },
    fr: {
      name: "French",
      level: "A2 · Basic Elementary",
    },
    ko: {
      name: "Korean",
      level: "A1 · Basic Introductory",
    },
  },
  groups: {
    management: {
      id: "management" as SkillGroupId,
      title: "Operations & Procurement Management",
      tagline: "Standardizing workflows, vendor lifecycles, and institutional resources.",
      items: [
        {
          name: "Oracle NetSuite ERP Operations",
          level: 92,
          context: "End-to-end purchasing, item receipts, vendor records, and inventory workflows.",
        },
        {
          name: "Procurement & Sourcing Strategy",
          level: 90,
          context: "Requisition approvals, vendor evaluations, price negotiations, and contract terms.",
        },
        {
          name: "Internal Audit & Document Traceability",
          level: 92,
          context: "Audit-trail verification, invoice matching, and DIAN tax compliance protocols.",
        },
        {
          name: "Inventory & Warehouse Logistics",
          level: 86,
          context: "Physical counts, stock reconciliation, dispatch tracking, and consumption ratios.",
        },
      ],
    },
    finance: {
      id: "finance" as SkillGroupId,
      title: "Financial Governance & Treasury",
      tagline: "Rigorous accounting control, daily reconciliations, and fiscal compliance.",
      items: [
        {
          name: "Treasury & Multi-Bank Reconciliations",
          level: 94,
          context: "Daily bank statement cross-referencing, zero-variance control, and cash management.",
        },
        {
          name: "Electronic Invoicing & DIAN Regulations",
          level: 92,
          context: "Validation of XML invoices, CUFE matching, and statutory tax withholdings.",
        },
        {
          name: "Budget Execution & Variance Analysis",
          level: 88,
          context: "Periodic expense monitoring, budget threshold alerts, and cost optimization.",
        },
        {
          name: "Financial Modeling & Consolidation",
          level: 86,
          context: "Cash flow projections, multi-center cost allocation, and scenario modeling.",
        },
      ],
    },
    analytics: {
      id: "analytics" as SkillGroupId,
      title: "Business Intelligence & Data Analytics",
      tagline: "Transforming raw operational metrics into actionable executive intelligence.",
      items: [
        {
          name: "Power BI & Data Modeling",
          level: 92,
          context: "Star-schema architectures, relationships, role-playing dimensions, and report layouts.",
        },
        {
          name: "DAX Measures & Power Query M",
          level: 90,
          context: "Time intelligence functions, dynamic KPIs, and automated query transformations.",
        },
        {
          name: "SQL & Relational Databases",
          level: 86,
          context: "Complex joins, aggregations, database views, and analytical data extraction.",
        },
        {
          name: "CRISP-DM Methodology",
          level: 88,
          context: "End-to-end framework from business understanding to model evaluation and deployment.",
        },
      ],
    },
    automation: {
      id: "automation" as SkillGroupId,
      title: "Process Automation & Data Engineering",
      tagline: "Engineering scripts to eliminate manual friction and scale processing speed.",
      items: [
        {
          name: "Python (Pandas, NumPy)",
          level: 88,
          context: "Automated ETL pipelines, dataset cleaning, data frame manipulation, and exports.",
        },
        {
          name: "XML / JSON Parsing & Ingestion",
          level: 90,
          context: "Extracting structured data from electronic invoices and web service payloads.",
        },
        {
          name: "Advanced Excel & Power Query",
          level: 94,
          context: "Dynamic arrays, Power Query M-code, automated macros, and audit templates.",
        },
        {
          name: "Workflow Integration & APIs",
          level: 84,
          context: "Zapier automations, webhook handoffs, and scheduled task pipelines.",
        },
      ],
    },
    engineering: {
      id: "engineering" as SkillGroupId,
      title: "Systems & Industrial Engineering",
      tagline: "Applying systems thinking, process modeling, and engineering discipline.",
      items: [
        {
          name: "Process Optimization & Lean Thinking",
          level: 88,
          context: "Value stream mapping, cycle time reduction, and bottleneck elimination.",
        },
        {
          name: "Systems Architecture & Modeling",
          level: 86,
          context: "UML diagrams, flowcharts, data flow architectures, and technical specifications.",
        },
        {
          name: "Agile Methodologies & Scrum",
          level: 86,
          context: "Iterative sprint delivery, backlog refinement, and cross-functional synchronization.",
        },
        {
          name: "Git & Version Control",
          level: 82,
          context: "Source code versioning, repository branching, and collaborative development.",
        },
      ],
    },
    biomedical: {
      id: "biomedical" as SkillGroupId,
      title: "Biomedical & Clinical Engineering",
      tagline: "Integrating clinical technology management with healthcare standards.",
      items: [
        {
          name: "Clinical Technology & Equipment Management",
          level: 82,
          context: "Medical device lifecycle, preventive maintenance protocols, and safety norms.",
        },
        {
          name: "Bioinstrumentation & Signal Fundamentals",
          level: 80,
          context: "Biomedical transducers, physiological signal acquisition, and monitoring systems.",
        },
        {
          name: "Healthcare Regulatory Standards",
          level: 84,
          context: "INVIMA regulatory compliance, risk classification, and hospital safety protocols.",
        },
        {
          name: "Clinical Procurement & Technology Evaluation",
          level: 85,
          context: "Technical specifications for hospital equipment purchasing and vendor verification.",
        },
      ],
    },
  },
};
