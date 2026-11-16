import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.resolve(rootDir, "public");
const cvDir = path.resolve(publicDir, "cv");
const imagesDir = path.resolve(publicDir, "images");

fs.mkdirSync(cvDir, { recursive: true });
fs.mkdirSync(imagesDir, { recursive: true });

async function generatePortraitVariants() {
  const sourcePortrait = path.resolve(imagesDir, "portrait.jpg");
  if (!fs.existsSync(sourcePortrait)) {
    throw new Error(`Missing source portrait: ${sourcePortrait}`);
  }

  await sharp(sourcePortrait).resize(400, 400, { fit: "cover" }).webp({ quality: 84 }).toFile(path.resolve(imagesDir, "portrait-400.webp"));
  await sharp(sourcePortrait).resize(400, 400, { fit: "cover" }).avif({ quality: 65 }).toFile(path.resolve(imagesDir, "portrait-400.avif"));
  await sharp(sourcePortrait).resize(800, 800, { fit: "cover" }).webp({ quality: 86 }).toFile(path.resolve(imagesDir, "portrait-800.webp"));
  await sharp(sourcePortrait).resize(800, 800, { fit: "cover" }).avif({ quality: 68 }).toFile(path.resolve(imagesDir, "portrait-800.avif"));
  await sharp(sourcePortrait).resize(800, 800, { fit: "cover" }).jpeg({ quality: 88, mozjpeg: true }).toFile(path.resolve(imagesDir, "portrait-800.jpg"));
}

const RESUME_CONTENT = {
  es: {
    contactLine:
      "Medellín, Antioquia, Colombia  |  +57 324 292 4705  |  marijohansierra@gmail.com  |  linkedin.com/in/mariangelsierrajaller",
    languagesLine: "Idiomas: Español (Nativo), Inglés (B2), Francés (Básico), Coreano (Básico)",
    educationTitle: "FORMACIÓN ACADÉMICA",
    education: [
      "Ingeniería de Sistemas (En curso, 2023–2026) — Fundación Universidad San José",
      "Ingeniería Industrial (En curso, 2023–2026) — Fundación Universidad San José",
      "Ingeniería Biomédica (En curso, 2023–2028) — Institución Universitaria ITM",
      "Técnico Contable y Financiero orientado a Sistemas (2022–2023) — ITM",
      "Técnico en Programación de Software (2020–2021) — SENA",
      "Bachiller Especializado en Informática (2019–2021) — I.E. Inem José Félix de Restrepo",
    ],
    variants: {
      admin: {
        roleHeading: "INGENIERA INDUSTRIAL · GESTIÓN ADMINISTRATIVA, COMPRAS Y TESORERÍA",
        summary:
          "Profesional con más de 4 años de trayectoria en Asociación para la Enseñanza — ASPAEN, especializada en optimización de recursos, facturación electrónica, ciclo completo de compras, control interno, auditoría documental, conciliaciones bancarias y gestión administrativa soportada en Oracle NetSuite y Power BI.",
        experienceTitle: "EXPERIENCIA PROFESIONAL",
        experience: [
          {
            header:
              "Asociación para la Enseñanza — ASPAEN  |  Ene 2023 — Presente  |  Medellín",
            title: "Auxiliar de Compras y Operaciones Administrativas · Soporte Financiero",
            bullets: [
              "Gestión integral de facturación electrónica, órdenes de compra, requisiciones estratégicas y control de inventarios.",
              "Control operativo de tesorería, manejo de caja menor, programación de egresos y conciliaciones bancarias corporativas.",
              "Estandarización de procesos administrativos y monitoreo de indicadores clave (KPIs) en Oracle NetSuite y Excel avanzado.",
            ],
          },
          {
            header:
              "Asociación para la Enseñanza — ASPAEN  |  Feb 2022 — Ene 2023  |  Medellín",
            title: "Practicante · Asistente Contable y Apoyo Administrativo",
            bullets: [
              "Emisión y seguimiento de órdenes de compra, recepción documental contable y trazabilidad integral para auditoría.",
              "Soporte en arqueos de caja, registros financieros y atención operativa transversal a áreas institucionales.",
            ],
          },
        ],
        skillsTitle: "COMPETENCIAS CLAVE",
        skills:
          "Facturación Electrónica · Oracle NetSuite ERP · Tesorería y Conciliaciones · Control de Inventarios · Gestión Documental y Auditoría · KPIs · Excel Avanzado · Power BI",
      },
      tech: {
        roleHeading: "ANALISTA DE DATOS · ESPECIALISTA ERP NETSUITE · AUTOMATIZACIÓN ETL & BI",
        summary:
          "Estudiante avanzada de Ingeniería de Sistemas, Ingeniería Industrial e Ingeniería Biomédica con experiencia práctica en Asociación para la Enseñanza — ASPAEN integrando datos financieros desde Oracle NetSuite (XML/JSON), automatizando flujos ETL con Python/Pandas y SQL, y diseñando tableros gerenciales en Power BI (DAX y Power Query).",
        experienceTitle: "EXPERIENCIA PROFESIONAL",
        experience: [
          {
            header:
              "Asociación para la Enseñanza — ASPAEN  |  Ene 2023 — Presente  |  Medellín",
            title: "Analista de Datos · Especialista ERP · Soporte Financiero",
            bullets: [
              "Diseño de pipelines ETL automatizados en Python y Pandas para limpieza (EDA) y consolidación de registros desde Oracle NetSuite (XML/JSON).",
              "Modelado relacional SQL y construcción de tableros ejecutivos en Power BI (DAX, Power Query) para decisiones financieras y operativas.",
              "Integración de flujos digitales con APIs y Zapier bajo enfoque CRISP-DM para eliminar reprocesos manuales.",
            ],
          },
          {
            header:
              "Asociación para la Enseñanza — ASPAEN  |  Feb 2022 — Ene 2023  |  Medellín",
            title: "Asistente de Apoyo Tecnológico Administrativo e Integración",
            bullets: [
              "Digitalización de registros contables y aseguramiento de calidad e integridad de datos maestros en ERP.",
              "Implementación de controles estructurados de trazabilidad e interoperabilidad logística y administrativa.",
            ],
          },
        ],
        skillsTitle: "STACK TÉCNICO Y ANALÍTICO",
        skills:
          "Python (Pandas, ETL, EDA) · Power BI (DAX, Power Query) · SQL & Modelado Relacional · Oracle NetSuite (XML, JSON) · CRISP-DM · Zapier · APIs · Tableau · Git",
      },
      ats: {
        roleHeading: "INGENIERÍA INDUSTRIAL Y DE SISTEMAS · ERP NETSUITE · ANALÍTICA Y GESTIÓN FINANCIERA",
        summary:
          "Perfil híbrido en Ingeniería Industrial, Ingeniería de Sistemas e Ingeniería Biomédica con experiencia desde febrero de 2022 en ASPAEN uniendo gestión de compras, tesorería y control interno con análisis de datos en Python, SQL, Oracle NetSuite y Power BI.",
        experienceTitle: "EXPERIENCIA PROFESIONAL",
        experience: [
          {
            header: "Asociación para la Enseñanza — ASPAEN  |  Ene 2023 — Presente",
            title: "Auxiliar de Compras, Operaciones Administrativas y Analítica de Datos ERP",
            bullets: [
              "Administración del ciclo completo de compras, facturación electrónica, tesorería y conciliaciones bancarias en Oracle NetSuite.",
              "Automatización ETL con Python y visualización de KPIs financieros y operativos en Power BI (DAX, Power Query) y SQL.",
              "Reducción de tiempos manuales mediante estandarización de flujos y trazabilidad auditada.",
            ],
          },
          {
            header: "Asociación para la Enseñanza — ASPAEN  |  Feb 2022 — Ene 2023",
            title: "Asistente Contable y Apoyo Tecnológico Administrativo",
            bullets: [
              "Control documental contable, caja menor, órdenes de compra y digitalización de soportes en ERP institucional.",
            ],
          },
        ],
        skillsTitle: "COMPETENCIAS Y HERRAMIENTAS",
        skills:
          "Oracle NetSuite ERP | Power BI (DAX, Power Query) | Python (Pandas, ETL) | SQL | Excel Avanzado | Facturación Electrónica | Tesorería y Auditoría | CRISP-DM",
      },
    },
  },
  en: {
    contactLine:
      "Medellin, Colombia  |  +57 324 292 4705  |  marijohansierra@gmail.com  |  linkedin.com/in/mariangelsierrajaller",
    languagesLine: "Languages: Spanish (Native), English (B2), French (Basic), Korean (Basic)",
    educationTitle: "EDUCATION",
    education: [
      "B.S. Systems Engineering (In progress, 2023–2026) — Fundacion Universidad San Jose",
      "B.S. Industrial Engineering (In progress, 2023–2026) — Fundacion Universidad San Jose",
      "B.S. Biomedical Engineering (In progress, 2023–2028) — Institucion Universitaria ITM",
      "Accounting & Financial Technician oriented to Systems (2022–2023) — ITM",
      "Software Programming Technician (2020–2021) — SENA",
      "High School Diploma in Computer Science (2019–2021) — I.E. Inem Jose Felix de Restrepo",
    ],
    variants: {
      admin: {
        roleHeading: "INDUSTRIAL ENGINEER · PROCUREMENT, TREASURY & FINANCIAL OPERATIONS",
        summary:
          "Operations and finance professional with 4+ years of progressive experience at Asociacion para la Ensenanza — ASPAEN, specializing in e-invoicing, full-cycle procurement, internal controls, audit traceability, corporate bank reconciliations, and ERP operations in Oracle NetSuite and Power BI.",
        experienceTitle: "PROFESSIONAL EXPERIENCE",
        experience: [
          {
            header: "Asociacion para la Ensenanza — ASPAEN  |  Jan 2023 — Present  |  Medellin",
            title: "Purchasing & Administrative Operations Assistant · Financial Support",
            bullets: [
              "Managed end-to-end procurement cycle, electronic invoicing, strategic requisitions, and inventory controls.",
              "Executed treasury disbursements, petty cash audits, and corporate bank reconciliations with strict traceability.",
              "Standardized administrative workflows and monitored operational KPIs across Oracle NetSuite and Advanced Excel.",
            ],
          },
          {
            header: "Asociacion para la Ensenanza — ASPAEN  |  Feb 2022 — Jan 2023  |  Medellin",
            title: "Accounting Assistant & Administrative Support Intern",
            bullets: [
              "Supported e-invoicing, purchase order issuance, cash counts, and audit-ready financial documentation.",
              "Delivered cross-functional operational support ensuring continuous service across institutional departments.",
            ],
          },
        ],
        skillsTitle: "CORE COMPETENCIES",
        skills:
          "Electronic Invoicing · Oracle NetSuite ERP · Treasury & Reconciliations · Inventory Control · Document Audit · Operational KPIs · Advanced Excel · Power BI",
      },
      tech: {
        roleHeading: "DATA ANALYST · ORACLE NETSUITE ERP SPECIALIST · ETL AUTOMATION & BI",
        summary:
          "Systems, Industrial, and Biomedical Engineering student with hands-on production impact at Asociacion para la Ensenanza — ASPAEN extracting ERP financial data from Oracle NetSuite (XML/JSON), building automated Python/Pandas and SQL ETL pipelines, and delivering executive Power BI (DAX, Power Query) dashboards.",
        experienceTitle: "PROFESSIONAL EXPERIENCE",
        experience: [
          {
            header: "Asociacion para la Ensenanza — ASPAEN  |  Jan 2023 — Present  |  Medellin",
            title: "Data Analyst · ERP Specialist · Financial Support",
            bullets: [
              "Built automated Python & Pandas ETL pipelines to extract, clean (EDA), and structure Oracle NetSuite XML/JSON accounting datasets.",
              "Designed SQL relational models and interactive Power BI (DAX, Power Query) dashboards for leadership decisions.",
              "Integrated workflows via APIs and Zapier following CRISP-DM methodology to remove operational bottlenecks.",
            ],
          },
          {
            header: "Asociacion para la Ensenanza — ASPAEN  |  Feb 2022 — Jan 2023  |  Medellin",
            title: "Administrative Technology Support & Integration Assistant",
            bullets: [
              "Led accounting record digitalization and master-data quality controls inside institutional ERP systems.",
              "Strengthened financial transparency through structured document traceability and logistics tech support.",
            ],
          },
        ],
        skillsTitle: "TECHNICAL STACK",
        skills:
          "Python (Pandas, ETL, EDA) · Power BI (DAX, Power Query) · SQL & Relational Modeling · Oracle NetSuite (XML, JSON) · CRISP-DM · Zapier · APIs · Tableau · Git",
      },
      ats: {
        roleHeading: "SYSTEMS & INDUSTRIAL ENGINEERING · NETSUITE ERP · BI ANALYTICS & FINANCE",
        summary:
          "Dual-profile professional bridging Financial Administration (procurement, treasury, e-invoicing, audit controls) and Data/Systems Engineering (Python, SQL, Oracle NetSuite, Power BI) with continuous track record at ASPAEN since February 2022.",
        experienceTitle: "PROFESSIONAL EXPERIENCE",
        experience: [
          {
            header: "Asociacion para la Ensenanza — ASPAEN  |  Jan 2023 — Present",
            title: "Administrative Operations, Procurement & ERP Data Analyst",
            bullets: [
              "Directed procurement, e-invoicing, corporate bank reconciliations, and KPI reporting in Oracle NetSuite ERP.",
              "Developed automated Python ETL workflows and Power BI / SQL analytics eliminating manual consolidation rework.",
            ],
          },
          {
            header: "Asociacion para la Ensenanza — ASPAEN  |  Feb 2022 — Jan 2023",
            title: "Accounting & Administrative Technology Support Intern",
            bullets: [
              "Maintained accounting traceability, disbursements, petty cash controls, and ERP record digitalization.",
            ],
          },
        ],
        skillsTitle: "SKILLS & TOOLS",
        skills:
          "Oracle NetSuite ERP | Power BI (DAX, Power Query) | Python (Pandas, ETL) | SQL | Advanced Excel | Procurement & Treasury | Audit & Controls | CRISP-DM",
      },
    },
  },
};

function writeResumePdf(lang, variantId) {
  return new Promise((resolve, reject) => {
    const outPath = path.resolve(cvDir, `cv-mariangel-sierra-${lang}-${variantId}.pdf`);
    const doc = new PDFDocument({ size: "LETTER", margin: 44 });
    const stream = fs.createWriteStream(outPath);
    doc.pipe(stream);

    const common = RESUME_CONTENT[lang];
    const variant = common.variants[variantId];

    doc.font("Helvetica-Bold").fontSize(18).fillColor("#0F172A").text("MARIANGEL JOHANNA SIERRA JALLER");
    doc.moveDown(0.2);
    doc.font("Helvetica-Bold").fontSize(9.5).fillColor("#1D4ED8").text(variant.roleHeading);
    doc.moveDown(0.25);
    doc.font("Helvetica").fontSize(8.5).fillColor("#334155").text(common.contactLine);
    doc.text(common.languagesLine);

    doc.moveDown(0.6);
    doc.moveTo(44, doc.y).lineTo(568, doc.y).strokeColor("#CBD5E1").stroke();
    doc.moveDown(0.6);

    doc.font("Helvetica").fontSize(9.5).fillColor("#1E293B").text(variant.summary, { align: "left", lineGap: 2 });

    doc.moveDown(0.8);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0F172A").text(variant.experienceTitle);
    doc.moveDown(0.35);

    for (const exp of variant.experience) {
      doc.font("Helvetica-Bold").fontSize(9.5).fillColor("#1E293B").text(exp.title);
      doc.font("Helvetica-Oblique").fontSize(8.5).fillColor("#475569").text(exp.header);
      doc.moveDown(0.2);
      for (const b of exp.bullets) {
        doc.font("Helvetica").fontSize(9).fillColor("#1E293B").text(`•  ${b}`, { indent: 10, lineGap: 1.5 });
      }
      doc.moveDown(0.45);
    }

    doc.moveDown(0.3);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0F172A").text(common.educationTitle);
    doc.moveDown(0.3);
    for (const edu of common.education) {
      doc.font("Helvetica").fontSize(8.8).fillColor("#1E293B").text(`•  ${edu}`, { indent: 8, lineGap: 1.2 });
    }

    doc.moveDown(0.7);
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor("#0F172A").text(variant.skillsTitle);
    doc.moveDown(0.25);
    doc.font("Helvetica").fontSize(9).fillColor("#1E293B").text(variant.skills, { lineGap: 2 });

    doc.end();
    stream.on("finish", () => resolve(outPath));
    stream.on("error", reject);
  });
}

async function main() {
  await generatePortraitVariants();
  const tasks = [];
  for (const lang of ["es", "en"]) {
    for (const variant of ["admin", "tech", "ats"]) {
      tasks.push(writeResumePdf(lang, variant));
    }
  }
  const files = await Promise.all(tasks);
  console.log(`Generated responsive portraits and ${files.length} resume PDFs in public/cv/`);
}

await main();
