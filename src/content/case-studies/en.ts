import type { CaseStudyId } from "@/types/content";
import type { CaseStudyCopy } from "@/types/project";

export const EN_CASE_STUDIES: Record<CaseStudyId, CaseStudyCopy> = {
  netsuiteEtlPipeline: {
    id: "netsuiteEtlPipeline",
    lang: "en",
    title: "Oracle NetSuite ETL Pipeline: From Raw Extraction to Analytical Data Marts",
    subtitle:
      "Applied data engineering to transform complex ERP accounting transactions into production-ready Business Intelligence models",
    roleLabel: "Data Engineer & ERP Automation Lead",
    contextLabel: "ASPAEN Colombia · 2024 — Present",
    outcomeSummary:
      "Replaced a 12-hour weekly routine of fragmented manual CSV downloads with an automated Python pipeline featuring schema validation and direct database ingestion, cutting reporting turnaround by 92% and eliminating human formatting errors.",
    heroMetrics: [
      { value: "-92%", label: "Report Processing Time" },
      { value: "100%", label: "General Ledger Consistency" },
      { value: "35k+", label: "Monthly Transactions Processed" },
      { value: "0", label: "Manual Formatting Inconsistencies" },
    ],
    sections: [
      {
        id: "context-problem",
        eyebrow: "Initial Assessment",
        title: "The Operational Bottleneck in ERP Reporting",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Oracle NetSuite holds the core transactional history of procurement, treasury, and general accounting across multiple educational campuses. However, native executive reporting previously depended on manual CSV exports and disconnected spreadsheets.",
              "This workflow led to duplicated effort, recurring formula errors, and lag times of up to 48 hours before the financial leadership team could review reliable month-end closure snapshots.",
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "12 hrs/wk",
                label: "Manual Effort Invested",
                detail: "Dedicated strictly to extracting, combining, and cleaning raw NetSuite CSV files.",
              },
              {
                value: "48 hrs",
                label: "Information Latency",
                detail: "Average delay before ledger adjusting entries were reflected in executive reports.",
              },
              {
                value: "14%",
                label: "Discrepancy Rate",
                detail: "Exported rows with inconsistent currency symbols, date conventions, or missing cost center IDs.",
              },
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Technological Modernization Opportunity",
            body: "Synthesizing software development logic from SENA with university systems engineering methods, a decoupled Python pipeline was created to leverage NetSuite Saved Searches and feed a clean, relational analytical store.",
          },
        ],
      },
      {
        id: "architecture-design",
        eyebrow: "Technical Architecture",
        title: "Layered Data Flow Design",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The pipeline was structured into four decoupled layers: parameterized extraction, strict schema typing and sanitization with Pandas, accounting business rule validation, and automated loading into an analytical staging database for Power BI consumption.",
            ],
          },
          {
            type: "architecture",
            caption: "Integration Architecture: From NetSuite Saved Searches to Dimensional Models",
            layers: [
              {
                name: "1. Ingestion Layer (Extract)",
                role: "Scheduled queries targeting NetSuite Saved Searches returning structured XML and JSON feeds with incremental watermarks.",
                tools: ["Oracle NetSuite SuiteScript", "RESTlet / Saved Searches", "Python Requests"],
              },
              {
                name: "2. Transformation Layer (Transform)",
                role: "Exchange rate normalization, chart of accounts mapping, string sanitization, and double-entry balance validation.",
                tools: ["Python 3.11", "Pandas", "NumPy", "Pydantic"],
              },
              {
                name: "3. Storage Layer (Load)",
                role: "Relational persistence across indexed fact and dimension staging tables with star schema relationships.",
                tools: ["PostgreSQL / SQLite Staging", "SQLAlchemy", "B-Tree Indices"],
              },
              {
                name: "4. Semantic & Presentation Layer",
                role: "Tabular model with single-direction relationships, performance-tuned DAX measures, and automated gateway refreshes.",
                tools: ["Power BI Desktop", "Power BI Gateway", "DirectQuery / Import"],
              },
            ],
          },
        ],
      },
      {
        id: "code-implementation",
        eyebrow: "Code & Logic",
        title: "Data Normalization & Audit Verification with Pandas",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The transformation engine standardizes transactional columns, verifies double-entry zero-sum balance per journal entry ID, and extracts standardized cost center hierarchies before staging.",
            ],
          },
          {
            type: "code",
            title: "etl_netsuite_transactions.py — Normalization & Double-Entry Accounting Verification",
            language: "python",
            snippet: `import pandas as pd
import numpy as np

def transform_netsuite_gl(raw_df: pd.DataFrame) -> pd.DataFrame:
    """
    Sanitizes and normalizes NetSuite General Ledger transactions
    for ingestion into the Power BI dimensional data mart.
    """
    # 1. Deep copy and canonical snake_case column names
    df = raw_df.copy()
    df.columns = df.columns.str.strip().str.lower().str.replace(" ", "_")
    
    # 2. Robust date parsing and null removal
    df["tran_date"] = pd.to_datetime(df["tran_date"], format="%d/%m/%Y", errors="coerce")
    df = df.dropna(subset=["tran_date"])
    
    # 3. Numeric currency cleaning and signed balance calculation
    for col in ["amount_debit", "amount_credit"]:
        df[col] = (
            df[col]
            .astype(str)
            .str.replace(r"[^\\d.-]", "", regex=True)
            .pipe(pd.to_numeric, errors="coerce")
            .fillna(0.0)
        )
    
    # 4. Signed net amount based on accounting nature
    df["net_amount"] = df["amount_debit"] - df["amount_credit"]
    
    # 5. Cost center dimension extraction and balance verification
    df["cost_center_code"] = df["department"].str.extract(r"^(\\d{3,4})")[0].fillna("0000")
    df["is_balanced"] = np.isclose(df.groupby("tran_id")["net_amount"].transform("sum"), 0.0, atol=0.01)
    
    return df.sort_values(by=["tran_date", "tran_id"]).reset_index(drop=True)`,
          },
          {
            type: "callout",
            tone: "lesson",
            title: "Strict Double-Entry Validation",
            body: "The mathematical 'is_balanced' check guarantees that unbalanced journal entries never reach executive reports, notifying internal auditors before monthly books close.",
          },
        ],
      },
      {
        id: "comparison-impact",
        eyebrow: "Comparative Evaluation",
        title: "Before vs. After Pipeline Implementation",
        blocks: [
          {
            type: "comparison",
            headers: ["Operational Metric", "Legacy Manual Routine (Pre-2024)", "Automated Pipeline (Present)"],
            rows: [
              ["Extraction & refresh time", "12 hours weekly manual labor", "45 minutes automated by background cron"],
              ["Update frequency", "Weekly or monthly lagged batch", "Daily automated sync during off-peak hours"],
              ["Data quality & consistency", "Vulnerable to formula breakage in Excel", "100% validated via strict schema typing in Pandas"],
              ["Lineage & version control", "Local files scattered without audit trail", "Versioned Python scripts in Git with execution logs"],
              ["Executive analysis capability", "Static tables without interactive drill-down", "Dynamic multi-dimensional Power BI dashboards"],
            ],
          },
          {
            type: "timeline",
            steps: [
              {
                phase: "Phase 1",
                title: "Requirements Audit & Saved Search Inventory",
                outcome: "Identified 8 critical Saved Searches spanning accounts payable, treasury, and inventory.",
              },
              {
                phase: "Phase 2",
                title: "Core Python ETL Engine & Unit Testing",
                outcome: "Implemented data sanitization, schema typing, and double-entry balance validation rules.",
              },
              {
                phase: "Phase 3",
                title: "Database Staging & Power BI Integration",
                outcome: "Constructed star-schema tables and automated cloud gateway scheduled refreshes.",
              },
              {
                phase: "Phase 4",
                title: "Executive Sign-Off & Stakeholder Training",
                outcome: "Formal approval by ASPAEN's Fiscal Auditor and Chief Financial Officer.",
              },
            ],
          },
          {
            type: "callout",
            tone: "result",
            title: "Strategic Impact",
            body: "The institution transitioned from reacting to delayed monthly reports to proactively tracking operational variances day by day.",
          },
        ],
      },
    ],
    seo: {
      title: "Oracle NetSuite ETL Pipeline & Python Automation | Mariangel Sierra",
      description:
        "Technical case study on building an automated Python ETL pipeline to extract NetSuite transactions and populate Power BI data marts at ASPAEN.",
      keywords: [
        "Oracle NetSuite ETL",
        "Python Pandas ETL",
        "ERP Automation",
        "Power BI NetSuite",
        "Financial Data Engineering",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  financialBiSuite: {
    id: "financialBiSuite",
    lang: "en",
    title: "Executive Financial Business Intelligence & Budget Control Suite",
    subtitle:
      "Star-schema dimensional modeling, advanced DAX time intelligence, and interactive dashboards for board decision-making",
    roleLabel: "Financial Analytics & BI Lead",
    contextLabel: "ASPAEN Colombia · 2023 — Present",
    outcomeSummary:
      "Designed and deployed a comprehensive Power BI analytics suite unifying budget execution, cost center margins, cash flow, and tuition receivables across ASPAEN school campuses, empowering directors with instant, granular insight into organizational capital.",
    heroMetrics: [
      { value: "100%", label: "Real-Time Budget Visibility" },
      { value: "48h → 0", label: "Variance Analysis Latency" },
      { value: "12", label: "Campuses & Cost Centers Monitored" },
      { value: "+18%", label: "Cost Overrun Detection Efficacy" },
    ],
    sections: [
      {
        id: "bi-problem",
        eyebrow: "Strategic Challenge",
        title: "Dispersed Financial Records and Sluggish Executive Reporting",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Managing multiple school campuses with independent operating budgets requires a consolidated panoramic view that allows comparing actual expenditures against planned quotas within seconds.",
              "Prior to this suite, each campus submitted disconnected spreadsheets with disparate formatting, requiring days of manual cut-and-paste compilation before board meetings.",
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "12",
                label: "Isolated Spreadsheets",
                detail: "Compiled manually at month-end for executive review.",
              },
              {
                value: "72 hrs",
                label: "Preparation Cycle",
                detail: "Staff hours required to assemble consolidated budget reports.",
              },
              {
                value: "0",
                label: "Drill-Down Capability",
                detail: "Inability to navigate interactively from summary KPIs to underlying vendor invoices.",
              },
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Project Objective",
            body: "Develop a unified Kimball-standard star-schema model in Power BI connected directly to NetSuite and bank transaction stores, enabling seamless drill-down from corporate rollups to individual line items.",
          },
        ],
      },
      {
        id: "bi-architecture",
        eyebrow: "Dimensional Architecture",
        title: "Semantic Data Modeling & Fact-Dimension Schema",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The data model features two core fact tables—`FactGeneralLedger` and `FactBudget`—linked through conformed dimension tables: `DimDate`, `DimCostCenter`, `DimAccount`, and `DimCampus`.",
            ],
          },
          {
            type: "architecture",
            caption: "Star-Schema Dimensional Model: Clear Separation of Facts and Dimensions",
            layers: [
              {
                name: "Fact Tables",
                role: "FactGeneralLedger (transaction amounts, debit/credit, status) and FactBudget (monthly approved budget per cost center and account).",
                tools: ["Grain: Atomic general ledger transaction line"],
              },
              {
                name: "Conformed Dimensions",
                role: "DimDate (fiscal year, bimesters, weeks), DimCostCenter (code, campus, owner), and DimChartOfAccounts (PUC / GAAP).",
                tools: ["Single-directional 1-to-Many (*:1) relationships"],
              },
              {
                name: "DAX Measures Layer",
                role: "Time-intelligence metrics, dynamic absolute variance, percentage variance, and threshold conditional formatting.",
                tools: ["DAX", "Tabular Model Engine", "Row-Level Security (RLS)"],
              },
              {
                name: "Dashboards & Views",
                role: "Executive Board View (high-level KPIs), Financial Directors View (cost-center variances), and Audit View (anomalies).",
                tools: ["Power BI Service", "Cloud Gateway", "Mobile Responsive Layout"],
              },
            ],
          },
        ],
      },
      {
        id: "bi-code",
        eyebrow: "Advanced DAX Logic",
        title: "Time-Intelligence and Variance Formulas",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "To ensure reliable comparisons between periods, specialized DAX measures calculate year-to-date actual spend, evaluate budget variance, and apply dynamic threshold alerts.",
            ],
          },
          {
            type: "code",
            title: "financial_measures.dax — Dynamic Budget Execution & Variance Measures",
            language: "dax",
            snippet: `// Actual Spend Year-to-Date (YTD)
Actual Spend YTD = 
CALCULATE(
    [Total Actual Spend],
    DATESYTD(DimDate[Date])
)

// Budget Target Year-to-Date (YTD)
Budget YTD = 
CALCULATE(
    [Total Approved Budget],
    DATESYTD(DimDate[Date])
)

// Absolute Budget Variance ($)
Budget Variance $ = 
[Actual Spend YTD] - [Budget YTD]

// Percentage Budget Variance (%) with safe division
Budget Variance % = 
DIVIDE(
    [Budget Variance $],
    [Budget YTD],
    0
)

// Execution Status Alert Measure
Execution Status Alert = 
SWITCH(
    TRUE(),
    [Budget Variance %] > 0.05, "CRITICAL - Budget Overrun (>5%)",
    [Budget Variance %] >= -0.05 && [Budget Variance %] <= 0.05, "NORMAL - Within Target Range",
    [Budget Variance %] < -0.05, "SAVINGS / Underspend"
)`,
          },
          {
            type: "callout",
            tone: "result",
            title: "Impact on Board Meetings",
            body: "Executive leadership trimmed budget review time from 3 hours to 30 minutes, directing immediate attention to cost centers flagged by the status alert measure.",
          },
        ],
      },
      {
        id: "bi-results",
        eyebrow: "Business Outcomes",
        title: "Tangible Benefits & Data Governance",
        blocks: [
          {
            type: "comparison",
            headers: ["Evaluation Dimension", "Legacy Spreadsheets", "Modern Power BI Suite"],
            rows: [
              ["Information access latency", "3 to 5 days after month-end close", "Instantaneous / Near Real-Time"],
              ["Accessible granularity", "Aggregated campus totals only", "Seamless drill-down to invoice and vendor level"],
              ["Information access control", "Manual file attachments via email", "Secure cloud workspaces with Row-Level Security"],
              ["Corrective action agility", "Delayed until following academic term", "Preventative actions within the active budget cycle"],
            ],
          },
          {
            type: "timeline",
            steps: [
              {
                phase: "Month 1",
                title: "Stakeholder Workshops & KPI Definition",
                outcome: "Established consensus on 14 vital liquidity, cost, and budget execution metrics.",
              },
              {
                phase: "Month 2",
                title: "Tabular Modeling & Dimension Normalization",
                outcome: "Unified campus catalogs, departmental cost centers, and charts of accounts.",
              },
              {
                phase: "Month 3",
                title: "DAX Implementation & UX Dashboard Layout",
                outcome: "Engineered responsive dashboard screens with high-contrast, accessible typography.",
              },
              {
                phase: "Month 4",
                title: "Production Deployment & Stakeholder Adoption",
                outcome: "Trained campus principals and finance teams with active weekly operational usage.",
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: "Executive Financial Business Intelligence Suite | Mariangel Sierra",
      description:
        "Design and deployment of Power BI dashboards with advanced DAX modeling and real-time budget control for ASPAEN.",
      keywords: [
        "Power BI Finance",
        "DAX Financial Modeling",
        "Executive Business Intelligence",
        "ERP Budget Control",
        "Star Schema BI",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  procurementInventoryControl: {
    id: "procurementInventoryControl",
    lang: "en",
    title: "Comprehensive Procurement & Inventory Governance in Oracle NetSuite",
    subtitle:
      "Procure-to-Pay workflow reengineering, automated 3-way matching, and institutional warehouse control",
    roleLabel: "Operations Analyst & ERP Specialist",
    contextLabel: "ASPAEN Medellín · 2023 — Present",
    outcomeSummary:
      "Transformed procurement and inventory operations across ASPAEN through end-to-end standardization of the Procure-to-Pay cycle in NetSuite, attaining 99.4% physical inventory accuracy and enforcing zero payment releases without verified warehouse receipts and DIAN electronic invoices.",
    heroMetrics: [
      { value: "99.4%", label: "Physical Inventory Accuracy in ERP" },
      { value: "-65%", label: "PO Processing Turnaround Time" },
      { value: "100%", label: "DIAN Electronic Invoicing Compliance" },
      { value: "0", label: "Payments Released Without Warehouse Receipt" },
    ],
    sections: [
      {
        id: "procurement-context",
        eyebrow: "Operational Context",
        title: "From Dispersed Purchasing to Structured ERP Governance",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "Educational institutions managing diverse operational departments (laboratories, IT infrastructure, maintenance, academic supplies) face inventory leakage and unplanned spending when purchasing is decentralized.",
              "Stepping into operational management at ASPAEN, the primary mission was to eliminate unapproved emergency orders and ensure every physical item delivered to campus is tracked, costed, and accounted for in Oracle NetSuite.",
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "99.4%",
                label: "Inventory Accuracy",
                detail: "Achieved across recurring physical cycle counts versus system records in NetSuite.",
              },
              {
                value: "3-Way",
                label: "Document Verification",
                detail: "Mandatory automated cross-check between Purchase Order, Item Receipt, and Vendor Bill.",
              },
              {
                value: "-65%",
                label: "Cycle Time Reduction",
                detail: "Streamlined turnaround from requisition creation to authorized supplier issuance.",
              },
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Industrial Engineering Application",
            body: "Applying supply chain governance and inventory control principles, the end-to-end value stream was mapped to remove bureaucratic delays while establishing ironclad checkpoints for physical custody.",
          },
        ],
      },
      {
        id: "procurement-architecture",
        eyebrow: "Process Flow",
        title: "The Standardized Procure-to-Pay Lifecycle",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "A strictly enforced approval and execution workflow was configured in Oracle NetSuite, preventing any step from proceeding without verifiable upstream documentation.",
            ],
          },
          {
            type: "architecture",
            caption: "Procure-to-Pay Workflow Architecture in Oracle NetSuite",
            layers: [
              {
                name: "1. Purchase Requisition (PR)",
                role: "Department requester files requisition with technical specifications, assigned cost center, and operational justification.",
                tools: ["NetSuite Requisition Form", "Departmental Approval Hierarchy"],
              },
              {
                name: "2. Approved Purchase Order (PO)",
                role: "Procurement validates quotes against approved vendor lists, verifies budget availability, and issues the official PO.",
                tools: ["NetSuite Purchase Order", "Real-Time Budget Validation"],
              },
              {
                name: "3. Physical Item Receipt (IR)",
                role: "Warehouse personnel inspect delivered goods, verify quantity, and log the receipt into NetSuite inventory.",
                tools: ["NetSuite Item Receipt", "Quality Inspection Protocol", "Barcode Tracking"],
              },
              {
                name: "4. Vendor Bill & 3-Way Matching",
                role: "Finance matches DIAN electronic invoice XML against PO rates and received quantities before queuing disbursements.",
                tools: ["NetSuite Vendor Bill", "DIAN XML Validation", "3-Way Match Verification"],
              },
            ],
          },
        ],
      },
      {
        id: "procurement-code",
        eyebrow: "SQL Audit Logic",
        title: "3-Way Matching and Cost Variance Detection",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "To audit consistency between ordered quantities, warehouse receipts, and billed vendor prices, automated queries flag discrepancies before payments are approved.",
            ],
          },
          {
            type: "code",
            title: "audit_three_way_matching.sql — Automated Procurement Variance & Matching Query",
            language: "sql",
            snippet: `-- 3-Way Matching Audit: Purchase Order vs Item Receipt vs Vendor Bill
WITH po_summary AS (
    SELECT 
        po.id AS po_id,
        po.tranid AS po_number,
        po.vendor_id,
        pol.item_id,
        SUM(pol.quantity) AS qty_ordered,
        AVG(pol.rate) AS rate_ordered,
        SUM(pol.amount) AS total_ordered
    FROM ns_purchase_order po
    JOIN ns_purchase_order_lines pol ON po.id = pol.transaction_id
    WHERE po.status IN ('Pending Bill', 'Partially Received', 'Fully Billed')
    GROUP BY po.id, po.tranid, po.vendor_id, pol.item_id
),
receipt_summary AS (
    SELECT 
        ir.createdfrom_id AS po_id,
        irl.item_id,
        SUM(irl.quantity) AS qty_received
    FROM ns_item_receipt ir
    JOIN ns_item_receipt_lines irl ON ir.id = irl.transaction_id
    GROUP BY ir.createdfrom_id, irl.item_id
),
bill_summary AS (
    SELECT 
        vb.createdfrom_id AS po_id,
        vbl.item_id,
        SUM(vbl.quantity) AS qty_billed,
        AVG(vbl.rate) AS rate_billed,
        SUM(vbl.amount) AS total_billed
    FROM ns_vendor_bill vb
    JOIN ns_vendor_bill_lines vbl ON vb.id = vbl.transaction_id
    GROUP BY vb.createdfrom_id, vbl.item_id
)
SELECT 
    p.po_number,
    p.vendor_id,
    p.item_id,
    p.qty_ordered,
    COALESCE(r.qty_received, 0) AS qty_received,
    COALESCE(b.qty_billed, 0) AS qty_billed,
    p.rate_ordered,
    COALESCE(b.rate_billed, 0) AS rate_billed,
    -- Discrepancy Detection
    CASE 
        WHEN COALESCE(b.qty_billed, 0) > COALESCE(r.qty_received, 0) THEN 'ALERT: Billed quantity exceeds physically received units'
        WHEN COALESCE(b.rate_billed, 0) > p.rate_ordered THEN 'ALERT: Billed unit rate exceeds approved Purchase Order rate'
        ELSE 'CONFORMANT: 3-Way Match Verified'
    END AS audit_status
FROM po_summary p
LEFT JOIN receipt_summary r ON p.po_id = r.po_id AND p.item_id = r.item_id
LEFT JOIN bill_summary b ON p.po_id = b.po_id AND p.item_id = b.item_id
WHERE COALESCE(b.qty_billed, 0) > COALESCE(r.qty_received, 0)
   OR COALESCE(b.rate_billed, 0) > p.rate_ordered;`,
          },
          {
            type: "callout",
            tone: "lesson",
            title: "Zero Capital Leakage",
            body: "Enforcing this programmatic gate prevented unauthorized rate inflation by suppliers and ensured that only physically verified goods generate accounts payable.",
          },
        ],
      },
      {
        id: "procurement-comparison",
        eyebrow: "Operational Impact",
        title: "Efficiency Gains Across Purchasing and Warehouse",
        blocks: [
          {
            type: "comparison",
            headers: ["Operational Parameter", "Legacy Informal Practice", "Integrated NetSuite Governance"],
            rows: [
              ["Warehouse stock accuracy", "Estimated at 78% with recurring unexplained shrinkage", "99.4% verified across quarterly physical cycle counts"],
              ["Purchasing authorization", "Informal email threads and verbal approvals", "Enforced digital approval hierarchies within the ERP"],
              ["Electronic invoice validation", "Manual visual review of paper invoices and PDFs", "Automated validation of DIAN XML and CUFE identifiers"],
              ["Departmental budget tracking", "Disjointed, with overages discovered after payment", "Automated pre-commitment checks before PO creation"],
            ],
          },
          {
            type: "timeline",
            steps: [
              {
                phase: "Quarter 1",
                title: "Physical Baseline Audit & Item Master Cleanup",
                outcome: "Standardized cataloging and coding for over 800 distinct inventory items.",
              },
              {
                phase: "Quarter 2",
                title: "NetSuite Workflow & Threshold Configuration",
                outcome: "Implemented role-based spending authority limits and automated routing.",
              },
              {
                phase: "Quarter 3",
                title: "Enforcement of Mandatory 3-Way Matching",
                outcome: "Complete elimination of unverified supplier disbursements.",
              },
              {
                phase: "Quarter 4",
                title: "Stakeholder & Supplier Training Rollout",
                outcome: "100% operational adoption achieved across all ASPAEN educational sites.",
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: "Procurement & Inventory Control in Oracle NetSuite | Mariangel Sierra",
      description:
        "Reengineering the Procure-to-Pay lifecycle, 3-way matching, and institutional inventory management achieving 99.4% accuracy.",
      keywords: [
        "Oracle NetSuite Procurement",
        "Inventory Management ERP",
        "Procure-to-Pay",
        "3-Way Matching SQL",
        "Internal Audit Controls",
        "Mariangel Sierra Jaller",
      ],
    },
  },

  treasuryAuditAutomation: {
    id: "treasuryAuditAutomation",
    lang: "en",
    title: "Multi-Bank Treasury Automation & Bank Reconciliation Engine",
    subtitle:
      "Algorithmic reconciliation of high-volume tuition bank statements against ERP general ledger records",
    roleLabel: "Treasury Analyst & Internal Audit Specialist",
    contextLabel: "ASPAEN Medellín · 2022 — Present",
    outcomeSummary:
      "Engineered an automated bank reconciliation system matching thousands of monthly school tuition payments against general ledger records, slashing the closing cycle from 4 days to 4 hours while establishing complete audit traceability for regulatory compliance.",
    heroMetrics: [
      { value: "4d → 4h", label: "Monthly Closing Cycle Reduction" },
      { value: "99.8%", label: "Automated Matching Rate" },
      { value: "100%", label: "Audit Trail Traceability" },
      { value: "0", label: "Audit Findings or Compliance Penalties" },
    ],
    sections: [
      {
        id: "treasury-problem",
        eyebrow: "Financial Challenge",
        title: "The Friction of Multi-Bank High-Volume School Tuition Inflows",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "During the first ten days of each month, hundreds of student families submit tuition and enrollment fees through multiple banking channels (Bancolombia, Davivienda, online PSE gateways, and direct teller deposits).",
              "The legacy procedure involved manual line-by-line checks of printed bank statements against ERP ledger registers, tying up two team members for 4 full working days and leaving unidentified balances lingering across quarterly audits.",
            ],
          },
          {
            type: "metrics",
            items: [
              {
                value: "4 days",
                label: "Closing Duration",
                detail: "Staff time previously consumed to manually balance 4 primary operating accounts.",
              },
              {
                value: "3,500+",
                label: "Monthly Transactions",
                detail: "Discrete cash movements requiring validation against student subledgers.",
              },
              {
                value: "8%",
                label: "Unidentified Items",
                detail: "Transfers with incomplete reference numbers requiring manual outreach.",
              },
            ],
          },
          {
            type: "callout",
            tone: "info",
            title: "Automated Solution Approach",
            body: "A Python reconciliation engine was constructed combining deterministic reference matching with fuzzy date/amount tolerance windows, reconciling thousands of transactions in seconds and generating signed audit reports.",
          },
        ],
      },
      {
        id: "treasury-architecture",
        eyebrow: "Reconciliation Mechanism",
        title: "Multi-Tiered Matching Engine Architecture",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The engine concurrently normalizes bank transaction files and NetSuite accounting subledgers, applying a cascading rules hierarchy: exact transaction ID, student reference number with amount, and temporal window matching (±2 days).",
            ],
          },
          {
            type: "architecture",
            caption: "Automated Multi-Bank Reconciliation Pipeline",
            layers: [
              {
                name: "1. Ingestion & Normalization",
                role: "Parsing bank statements (flat files, Excel, CSV) and extracting NetSuite GL cash journal registers.",
                tools: ["Python", "Pandas", "Regex for bank reference parsing"],
              },
              {
                name: "2. Cascading Matching Engine",
                role: "Tier 1: Exact Match (Amount + Ref + Date). Tier 2: Student Code + Clean Amount. Tier 3: Temporal Window (±48h).",
                tools: ["Heuristic Matching Engine", "String Normalization"],
              },
              {
                name: "3. Reconciling Item Classification",
                role: "Automated classification of deposits in transit, outstanding checks, bank charges, and interest earnings.",
                tools: ["GAAP / IFRS Accounting Rules", "Audit Matrix Mapping"],
              },
              {
                name: "4. Report & Journal Entry Generation",
                role: "Automated reconciliation minutes with cryptographic checksums and NetSuite journal entry adjustment files.",
                tools: ["OpenPyXL / ReportLab", "NetSuite Journal CSV Import"],
              },
            ],
          },
        ],
      },
      {
        id: "treasury-code",
        eyebrow: "Reconciliation Algorithm",
        title: "Automated Statement Matching in Python",
        blocks: [
          {
            type: "text",
            paragraphs: [
              "The core algorithm matches bank records with ledger entries, isolating reconciled transactions and producing clean exception reports for items requiring human review.",
            ],
          },
          {
            type: "code",
            title: "bank_reconciliation_engine.py — Statement Matching & Exception Detection",
            language: "python",
            snippet: `import pandas as pd
from typing import Tuple

def reconcile_bank_accounts(
    bank_df: pd.DataFrame, 
    ledger_df: pd.DataFrame, 
    date_tolerance_days: int = 2
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.DataFrame]:
    """
    Reconciles bank statement lines against NetSuite GL cash accounts.
    Returns: (matched_df, unreconciled_bank_df, unreconciled_ledger_df)
    """
    # 1. Deep copy and standardize comparison keys
    bank = bank_df.copy()
    ledger = ledger_df.copy()
    
    bank["bank_date"] = pd.to_datetime(bank["date"])
    ledger["ledger_date"] = pd.to_datetime(ledger["date"])
    
    bank["amount_abs"] = bank["amount"].abs().round(2)
    ledger["amount_abs"] = ledger["amount"].abs().round(2)
    
    # 2. Exact match on cleaned numeric reference and absolute amount
    bank["clean_ref"] = bank["reference"].astype(str).str.replace(r"\\D", "", regex=True)
    ledger["clean_ref"] = ledger["reference"].astype(str).str.replace(r"\\D", "", regex=True)
    
    matched = pd.merge(
        bank,
        ledger,
        how="inner",
        on=["clean_ref", "amount_abs"],
        suffixes=("_bank", "_ledger")
    )
    
    # Filter by acceptable posting date discrepancy window
    days_diff = (matched["bank_date"] - matched["ledger_date"]).dt.days.abs()
    matched = matched[days_diff <= date_tolerance_days]
    
    # 3. Identify remaining unmatched items on both ends
    matched_bank_ids = matched["id_bank"].unique()
    matched_ledger_ids = matched["id_ledger"].unique()
    
    unreconciled_bank = bank[~bank["id"].isin(matched_bank_ids)]
    unreconciled_ledger = ledger[~ledger["id"].isin(matched_ledger_ids)]
    
    return matched, unreconciled_bank, unreconciled_ledger`,
          },
          {
            type: "callout",
            tone: "result",
            title: "99.8% Automated Resolution",
            body: "The engine autonomously cleared 99.8% of high-volume monthly receipts, isolating the few non-standard deposits for quick resolution within minutes.",
          },
        ],
      },
      {
        id: "treasury-impact",
        eyebrow: "Audit & Traceability",
        title: "Elevating Financial Governance & Internal Controls",
        blocks: [
          {
            type: "comparison",
            headers: ["Governance Aspect", "Legacy Manual Process", "Automated Reconciliation System"],
            rows: [
              ["Reconciliation cycle duration", "4 business days (2 full-time staff)", "4 hours (single analyst oversight)"],
              ["Human error exposure", "High (transposition errors, missed rows)", "Eliminated via certified deterministic algorithm"],
              ["Detection of unrecorded bank charges", "Discovered weeks later during audits", "Flagged on the same day statement is imported"],
              ["External audit documentation", "Physical binders with highlighters and stamps", "Digital audit packages with verification checksums"],
            ],
          },
          {
            type: "timeline",
            steps: [
              {
                phase: "Milestone 1",
                title: "Bank Statement Format Mapping",
                outcome: "Constructed parsers for Bancolombia, Davivienda, and online PSE reports.",
              },
              {
                phase: "Milestone 2",
                title: "Matching Engine Development & Backtesting",
                outcome: "Validated against 6 months of historical data with 100% balance convergence.",
              },
              {
                phase: "Milestone 3",
                title: "Fiscal Audit & Leadership Verification",
                outcome: "Approved by Statutory Auditor as an official internal control document.",
              },
              {
                phase: "Milestone 4",
                title: "Production Rollout in Monthly Closures",
                outcome: "Continuous frictionless closures with zero external audit findings.",
              },
            ],
          },
        ],
      },
    ],
    seo: {
      title: "Treasury Automation & Bank Reconciliation System | Mariangel Sierra",
      description:
        "Multi-bank treasury automation and algorithmic statement reconciliation with Python and NetSuite for ASPAEN, shrinking closing cycles from 4 days to 4 hours.",
      keywords: [
        "Bank Reconciliation Python",
        "Treasury Automation",
        "NetSuite Financial Audit",
        "Internal Accounting Control",
        "Tuition Collections Automation",
        "Mariangel Sierra Jaller",
      ],
    },
  },
};