import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const ogDir = path.resolve(rootDir, "public/og");

fs.mkdirSync(ogDir, { recursive: true });

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const OG_CARDS = [
  {
    file: "og-es.jpg",
    kicker: "PORTAFOLIO BILINGÜE · MEDELLÍN, COLOMBIA",
    title: "Mariangel Sierra Jaller",
    subtitle: "Ingeniera Industrial & de Sistemas · Gestión Financiera, ERP NetSuite, Python & Power BI",
  },
  {
    file: "og-en.jpg",
    kicker: "BILINGUAL PORTFOLIO · MEDELLÍN, COLOMBIA",
    title: "Mariangel Sierra Jaller",
    subtitle: "Industrial & Systems Engineering · Financial Operations, Oracle NetSuite, Python & Power BI",
  },
  {
    file: "og-es-admin.jpg",
    kicker: "PERFIL ADMINISTRATIVO & FINANCIERO",
    title: "Mariangel Sierra Jaller",
    subtitle: "Compras, Tesorería, Facturación Electrónica, Auditoría Interna & Oracle NetSuite",
  },
  {
    file: "og-es-tech.jpg",
    kicker: "PERFIL TECNOLOGÍA, DATOS & BI",
    title: "Mariangel Sierra Jaller",
    subtitle: "Pipelines ETL con Python & Pandas, SQL, Integración ERP NetSuite & Power BI (DAX)",
  },
  {
    file: "og-en-admin.jpg",
    kicker: "ADMINISTRATIVE & FINANCIAL PROFILE",
    title: "Mariangel Sierra Jaller",
    subtitle: "Procurement, Corporate Treasury, E-Invoicing, Internal Audit & Oracle NetSuite ERP",
  },
  {
    file: "og-en-tech.jpg",
    kicker: "DATA ANALYTICS, AUTOMATION & BI PROFILE",
    title: "Mariangel Sierra Jaller",
    subtitle: "Python & Pandas ETL Pipelines, SQL Modeling, NetSuite XML/JSON & Power BI",
  },
  {
    file: "og-project-netsuite-etl.jpg",
    kicker: "CASE STUDY · DATA ENGINEERING & ERP",
    title: "Pipeline ETL Oracle NetSuite -> BI",
    subtitle: "Extracción XML/JSON, limpieza automatizada con Python/Pandas y modelado SQL para Power BI",
  },
  {
    file: "og-project-financial-bi.jpg",
    kicker: "CASE STUDY · BUSINESS INTELLIGENCE",
    title: "Suite Ejecutiva Financiera en Power BI",
    subtitle: "Modelado estrella, métricas DAX y seguimiento presupuestal y operativo",
  },
  {
    file: "og-project-procurement-erp.jpg",
    kicker: "CASE STUDY · SUPPLY CHAIN & ERP",
    title: "Control de Compras e Inventarios ERP",
    subtitle: "Estandarización de requisiciones, facturación electrónica y KPIs de abastecimiento",
  },
  {
    file: "og-project-treasury-audit.jpg",
    kicker: "CASE STUDY · TREASURY & AUDIT",
    title: "Automatización de Tesorería y Conciliaciones",
    subtitle: "Trazabilidad documental, control de caja menor y conciliación bancaria asistida",
  },
  {
    file: "og-project-bioengineering.jpg",
    kicker: "PROJECT · BIOMEDICAL ENGINEERING (ITM)",
    title: "Gestión Tecnológica & Software Clínico",
    subtitle: "Convergencia de ingeniería biomédica, compras clínicas y analítica hospitalaria",
  },
  {
    file: "og-project-engineering-suite.jpg",
    kicker: "PROJECT · SOFTWARE ARCHITECTURE & CRISP-DM",
    title: "Arquitectura de Software & Optimización",
    subtitle: "Integraciones APIs/Zapier, bases de datos relacionales y mejora de procesos",
  },
];

function buildSvg({ kicker, title, subtitle }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#131622"/>
      <stop offset="60%" stop-color="#1B2032"/>
      <stop offset="100%" stop-color="#262D45"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#5CA3FF"/>
      <stop offset="100%" stop-color="#67C6F5"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1020" cy="140" r="240" fill="#5CA3FF" fill-opacity="0.12"/>
  <circle cx="180" cy="540" r="210" fill="#67C6F5" fill-opacity="0.1"/>
  <rect x="64" y="64" width="1072" height="502" rx="28" fill="none" stroke="#364266" stroke-width="2"/>
  <rect x="96" y="108" width="10" height="44" rx="5" fill="url(#accent)"/>
  <text x="124" y="138" fill="#67C6F5" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="600" letter-spacing="2.5">${escapeXml(kicker)}</text>
  <text x="96" y="265" fill="#F0F7FF" font-family="Georgia, serif" font-size="60">${escapeXml(title)}</text>
  <text x="96" y="340" fill="#CBE4FB" font-family="Segoe UI, Arial, sans-serif" font-size="27">${escapeXml(subtitle.slice(0, 74))}</text>
  ${subtitle.length > 74 ? `<text x="96" y="382" fill="#CBE4FB" font-family="Segoe UI, Arial, sans-serif" font-size="27">${escapeXml(subtitle.slice(74))}</text>` : ""}
  <rect x="96" y="458" width="220" height="4" rx="2" fill="url(#accent)"/>
  <text x="96" y="505" fill="#A8CCF0" font-family="Consolas, monospace" font-size="22">mariangelsierrajaller.github.io</text>
</svg>`;
}

async function main() {
  for (const card of OG_CARDS) {
    const svgBuffer = Buffer.from(buildSvg(card), "utf8");
    await sharp(svgBuffer)
      .jpeg({ quality: 90, mozjpeg: true })
      .toFile(path.resolve(ogDir, card.file));
  }
  console.log(`Generated ${OG_CARDS.length} OpenGraph cards in public/og/`);
}

await main();
