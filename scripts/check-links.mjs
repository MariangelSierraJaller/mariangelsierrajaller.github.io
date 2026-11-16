import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, "../dist");

if (!fs.existsSync(distDir)) {
  console.error("dist/ does not exist. Run build first.");
  process.exit(1);
}

function walkHtml(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkHtml(full));
    else if (entry.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function targetExists(rawHref) {
  if (!rawHref) return true;
  if (/^(https?:|mailto:|tel:|data:|javascript:|#)/.test(rawHref)) return true;

  const clean = rawHref.split("#")[0].split("?")[0];
  if (!clean) return true;

  const rel = clean.startsWith("/") ? clean.slice(1) : clean;
  const direct = path.resolve(distDir, rel);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return true;

  const dirIndex = path.resolve(distDir, rel, "index.html");
  if (fs.existsSync(dirIndex)) return true;

  return false;
}

const htmlFiles = walkHtml(distDir);
const broken = [];

for (const htmlFile of htmlFiles) {
  const html = fs.readFileSync(htmlFile, "utf8");
  const attrRe = /(?:href|src)="([^"]+)"/g;
  let match;
  while ((match = attrRe.exec(html)) !== null) {
    const href = match[1];
    if (!targetExists(href)) {
      broken.push({
        file: path.relative(distDir, htmlFile),
        href,
      });
    }
  }
}

if (broken.length > 0) {
  console.error(`Found ${broken.length} broken internal link(s)/asset(s):`);
  for (const item of broken.slice(0, 30)) {
    console.error(`- ${item.file} -> ${item.href}`);
  }
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} HTML files in dist/: 0 broken internal links or assets.`);
