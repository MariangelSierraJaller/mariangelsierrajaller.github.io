import type { HeroRoleCopy, HighlightCard, RoleId } from "@/types/content";

export const EN_HERO: Record<RoleId, HeroRoleCopy> = {
  general: {
    badge: "Systems & Industrial Engineering · Operations & Tech",
    headline: "Engineering operational efficiency and data-driven",
    accentWord: "transformation",
    titleLine: "Bridging financial administration and software engineering.",
    subtitle:
      "Systems and Industrial Engineer with 4+ years optimizing enterprise workflows at ASPAEN. Combining Oracle NetSuite, Python automation, and Power BI to turn complex corporate data into measurable results.",
    primaryCta: "Explore Projects",
    secondaryCta: "Download Resume",
    tertiaryCta: "Get in Touch",
  },
  admin: {
    badge: "Administrative & Financial Operations · Resource Optimization",
    headline: "Strategic control, rigorous audit, and resource",
    accentWord: "optimization",
    titleLine: "Delivering governance and financial continuity.",
    subtitle:
      "Managing end-to-end procurement, bank reconciliations, and electronic invoicing with Oracle NetSuite. Enforcing internal control and financial compliance with quantifiable impact.",
    primaryCta: "View Operational Cases",
    secondaryCta: "Download Operations CV",
    tertiaryCta: "Contact Operations",
  },
  tech: {
    badge: "Systems Engineering & Data Analytics · ERP & Automation",
    headline: "Architecting automated pipelines and actionable business",
    accentWord: "intelligence",
    titleLine: "Turning raw data into high-leverage engineering solutions.",
    subtitle:
      "Developing Python ETL pipelines, SQL transformations, DAX analytics models, and custom ERP integrations to eliminate manual bottlenecks and scale decision speed.",
    primaryCta: "View Technical Architecture",
    secondaryCta: "Download Tech CV",
    tertiaryCta: "Contact Engineering",
  },
};

export const EN_HIGHLIGHTS: Record<RoleId, readonly HighlightCard[]> = {
  general: [
    {
      id: "experience",
      value: "4+ Years",
      label: "Enterprise Experience",
      hint: "ASPAEN operations & finance",
    },
    {
      id: "academic",
      value: "2 + 1",
      label: "Engineering Degrees",
      hint: "Systems & Industrial Eng. (Sep 2026) + Biomedical at ITM",
    },
    {
      id: "tech-stack",
      value: "NetSuite + Python",
      label: "Core Tech Stack",
      hint: "ERP integration & automation",
    },
    {
      id: "bilingual",
      value: "B2 English",
      label: "Professional Working",
      hint: "International communication",
    },
  ],
  admin: [
    {
      id: "procurement",
      value: "100%",
      label: "Traceability Enforced",
      hint: "Multi-center procurement flow",
    },
    {
      id: "reconciliation",
      value: "Zero Discrepancies",
      label: "Treasury Audits",
      hint: "Rigorous bank reconciliation",
    },
    {
      id: "erp-admin",
      value: "NetSuite ERP",
      label: "Enterprise Management",
      hint: "Invoicing, AP/AR & inventory",
    },
    {
      id: "cycle-time",
      value: "-60%",
      label: "Audit Cycle Time",
      hint: "Standardized operating protocols",
    },
  ],
  tech: [
    {
      id: "etl-pipelines",
      value: "100%",
      label: "Automated Ingestion",
      hint: "Python & Pandas XML/JSON ETL",
    },
    {
      id: "bi-dashboards",
      value: "15+ KPIs",
      label: "Interactive BI",
      hint: "Power BI DAX & data modeling",
    },
    {
      id: "sql-analytics",
      value: "Relational SQL",
      label: "Data Architecture",
      hint: "Normalized schemas & queries",
    },
    {
      id: "frameworks",
      value: "CRISP-DM",
      label: "Methodological Rigor",
      hint: "Agile & end-to-end data lifecycle",
    },
  ],
};
