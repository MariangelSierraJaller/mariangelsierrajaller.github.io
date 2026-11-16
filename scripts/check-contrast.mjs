import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { contrastRatio, extractRootTokens } from "./lib/color.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.resolve(__dirname, "../src/styles/tokens.css");
const css = fs.readFileSync(tokensPath, "utf8");
const tokens = extractRootTokens(css);

const checks = [
  ["--color-fg", "--color-bg", 7.0, "AAA body text on bg"],
  ["--color-fg", "--color-surface", 7.0, "AAA body text on surface"],
  ["--color-fg", "--color-surface-raised", 7.0, "AAA body text on surface-raised"],
  ["--color-fg-muted", "--color-bg", 7.0, "AAA muted text on bg"],
  ["--color-fg-muted", "--color-surface", 7.0, "AAA muted text on surface"],
  ["--color-fg-muted", "--color-surface-raised", 7.0, "AAA muted text on surface-raised"],
  ["--color-fg-subtle", "--color-bg", 4.5, "AA subtle text on bg"],
  ["--color-fg-subtle", "--color-surface", 4.5, "AA subtle text on surface"],
  ["--color-fg-subtle", "--color-surface-raised", 4.5, "AA subtle text on surface-raised"],
  ["--color-primary", "--color-bg", 4.5, "AA primary link on bg"],
  ["--color-primary", "--color-surface", 4.5, "AA primary link on surface"],
  ["--color-primary-hover", "--color-bg", 7.0, "AAA hover primary on bg"],
  ["--color-accent", "--color-bg", 7.0, "AAA accent on bg"],
  ["--color-accent", "--color-surface", 7.0, "AAA accent on surface"],
  ["--color-on-primary", "--color-primary", 7.0, "AAA text on primary button"],
  ["--color-on-primary", "--color-primary-hover", 7.0, "AAA text on primary hover button"],
  ["--color-on-whatsapp", "--color-whatsapp", 7.0, "AAA text on WhatsApp button"],
  ["--color-danger", "--color-bg", 4.5, "AA danger text on bg"],
  ["--color-danger", "--color-surface", 4.5, "AA danger text on surface"],
  ["--color-success", "--color-bg", 7.0, "AAA success text on bg"],
  ["--color-warning", "--color-bg", 7.0, "AAA warning text on bg"],
  ["--color-border-strong", "--color-bg", 3.0, "AA non-text border-strong on bg"],
  ["--color-border-strong", "--color-surface", 3.0, "AA non-text border-strong on surface"],
  ["--color-border-strong", "--color-surface-raised", 3.0, "AA non-text border-strong on surface-raised"],
  ["--color-ring", "--color-bg", 3.0, "AA focus ring on bg"],
];

let failed = 0;
for (const [fg, bg, min, label] of checks) {
  const fgHex = tokens[fg];
  const bgHex = tokens[bg];
  if (!fgHex || !bgHex) {
    console.error(`MISSING token for check "${label}": ${fg}=${fgHex}, ${bg}=${bgHex}`);
    failed++;
    continue;
  }
  const ratio = contrastRatio(fgHex, bgHex);
  const pass = ratio >= min;
  const tag = pass ? "PASS" : "FAIL";
  console.log(`${tag} [${ratio.toFixed(2)}:1 >= ${min.toFixed(1)}:1] ${label} (${fg} on ${bg})`);
  if (!pass) failed++;
}

if (failed > 0) {
  console.error(`\n${failed} contrast check(s) failed.`);
  process.exit(1);
}

console.log(`\nAll ${checks.length} WCAG contrast checks passed.`);
