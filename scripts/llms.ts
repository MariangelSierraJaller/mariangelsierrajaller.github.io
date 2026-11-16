export function buildLlmsTxt(data: {
  siteUrl: string;
  buildDate: string;
  fullName: string;
  email: string;
  linkedin: string;
  github: string;
  routes: readonly string[];
}): string {
  const { siteUrl, buildDate, fullName, email, linkedin, github, routes } = data;
  return [
    `# ${fullName} — Bilingual Portfolio (ES / EN)`,
    "",
    `> Dual-profile Industrial & Systems Engineering portfolio combining Financial Administration (Procurement, Corporate Treasury, E-Invoicing, Internal Control) and Technology / Data Analytics (Oracle NetSuite ERP, Python, Pandas, SQL, Power BI).`,
    "",
    `- Canonical Site: ${siteUrl}`,
    `- Updated: ${buildDate}`,
    `- Contact: ${email}`,
    `- LinkedIn: ${linkedin}`,
    `- GitHub: ${github}`,
    "",
    "## Role Entry Points",
    `- General (ES): ${siteUrl}/es`,
    `- General (EN): ${siteUrl}/en`,
    `- Administrative & Finance (ES): ${siteUrl}/es/admin`,
    `- Administrative & Finance (EN): ${siteUrl}/en/admin`,
    `- Technology, Data & BI (ES): ${siteUrl}/es/tech`,
    `- Technology, Data & BI (EN): ${siteUrl}/en/tech`,
    "",
    "## Prerendered Routes",
    ...routes.map((r) => `- ${siteUrl}/${r}`),
    "",
  ].join("\n");
}
