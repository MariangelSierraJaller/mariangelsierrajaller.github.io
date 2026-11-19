import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";
import sharp from "sharp";
import { validateOhMyCvAts } from "./lib/ohmycv-parser.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const resumesDir = path.resolve(rootDir, "resumes");
const defaultCvDir = path.resolve(rootDir, "public/cv");
const defaultImagesDir = path.resolve(rootDir, "public/images");

const LANGS = ["es", "en"];
const VARIANTS = ["admin", "tech", "ats"];

const PAGE_W = 612; // US Letter width in pt
const PAGE_H = 792; // US Letter height in pt
const MARGIN_X = 38;
const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 26;
const CONTENT_W = PAGE_W - MARGIN_X * 2;

const PREVIEW_W = 816;
const PREVIEW_H = 1056;
const SCALE = PREVIEW_W / PAGE_W; // 4/3

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseArgs(argv) {
  const opts = {
    outDir: defaultCvDir,
    skipPortraits: false,
    checkLeaks: 0,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--out-dir" && argv[i + 1]) {
      opts.outDir = path.resolve(argv[++i]);
    } else if (arg === "--skip-portraits") {
      opts.skipPortraits = true;
    } else if (arg === "--check-leaks") {
      const n = Number(argv[i + 1]);
      if (Number.isFinite(n) && n > 0) {
        opts.checkLeaks = n;
        i++;
      } else {
        opts.checkLeaks = 5;
      }
    }
  }
  return opts;
}

async function runSharpToFile(input, transformFn, destPath) {
  let instance = null;
  try {
    instance = sharp(input);
    await transformFn(instance).toFile(destPath);
  } finally {
    if (instance && typeof instance.destroy === "function") {
      instance.destroy();
    }
  }
}

async function generatePortraitVariants(imagesDir) {
  const sourcePortrait = path.resolve(imagesDir, "portrait.jpg");
  if (!fs.existsSync(sourcePortrait)) {
    throw new Error(`Missing source portrait: ${sourcePortrait}`);
  }

  const jobs = [
    { file: "portrait-400.webp", size: 400, fmt: (s) => s.webp({ quality: 84 }) },
    { file: "portrait-400.avif", size: 400, fmt: (s) => s.avif({ quality: 65 }) },
    { file: "portrait-800.webp", size: 800, fmt: (s) => s.webp({ quality: 86 }) },
    { file: "portrait-800.avif", size: 800, fmt: (s) => s.avif({ quality: 68 }) },
    { file: "portrait-800.jpg", size: 800, fmt: (s) => s.jpeg({ quality: 88, mozjpeg: true }) },
  ];

  for (const job of jobs) {
    await runSharpToFile(
      sourcePortrait,
      (s) => job.fmt(s.resize(job.size, job.size, { fit: "cover" })),
      path.resolve(imagesDir, job.file),
    );
  }
}

function renderRunsPdf(doc, runs, x, y, options = {}) {
  const {
    width = CONTENT_W,
    fontSize = 8.4,
    lineGap = 1.2,
    baseColor = "#1E293B",
    linkColor = "#1D4ED8",
    indent = 0,
  } = options;

  doc.x = x;
  doc.y = y;

  for (let i = 0; i < runs.length; i++) {
    const run = runs[i];
    const isFirst = i === 0;
    const isLast = i === runs.length - 1;
    const fontName = run.bold
      ? "Helvetica-Bold"
      : run.italic
        ? "Helvetica-Oblique"
        : run.code
          ? "Courier"
          : "Helvetica";

    doc
      .font(fontName)
      .fontSize(fontSize)
      .fillColor(run.href ? linkColor : baseColor);

    const textOpts = {
      width,
      lineGap,
      indent: isFirst ? indent : 0,
      continued: !isLast,
      link: run.href || undefined,
      underline: Boolean(run.href),
    };

    if (isFirst) {
      doc.text(run.text, x, y, textOpts);
    } else {
      doc.text(run.text, textOpts);
    }
  }
}

/**
 * Render an OhMyCV parsed AST to a single-column, single-page ATS PDF buffer and/or file.
 */
export function buildResumePdfBuffer(parsed, label = "resume") {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: {
        top: MARGIN_TOP,
        bottom: MARGIN_BOTTOM,
        left: MARGIN_X,
        right: MARGIN_X,
      },
      bufferPages: true,
      info: {
        Title: `${parsed.name} - ${parsed.headline}`,
        Author: parsed.name,
        Subject: "ATS Resume (OhMyCV Markdown)",
      },
    });

    const chunks = [];
    const onData = (c) => chunks.push(c);
    const onError = (err) => {
      cleanup();
      reject(err);
    };
    const onEnd = () => {
      cleanup();
      resolve(Buffer.concat(chunks));
    };

    function cleanup() {
      doc.off("data", onData);
      doc.off("error", onError);
      doc.off("end", onEnd);
    }

    doc.on("data", onData);
    doc.on("error", onError);
    doc.on("end", onEnd);

    try {
      // 1. Name
      doc
        .font("Helvetica-Bold")
        .fontSize(15.5)
        .fillColor("#0F172A")
        .text(parsed.name.toUpperCase(), MARGIN_X, MARGIN_TOP, {
          width: CONTENT_W,
        });

      doc.y += 1.5;

      // 2. Role Headline
      doc
        .font("Helvetica-Bold")
        .fontSize(8.7)
        .fillColor("#1D4ED8")
        .text(parsed.headline, MARGIN_X, doc.y, {
          width: CONTENT_W,
          lineGap: 1,
        });

      doc.y += 2;

      // 3. Contact line (clickable links, single-column linear order)
      const contactRuns = [];
      parsed.contactItems.forEach((item, idx) => {
        if (idx > 0) {
          contactRuns.push({
            text: "  |  ",
            bold: false,
            italic: false,
            code: false,
            href: null,
          });
        }
        contactRuns.push({
          text: item.text,
          bold: false,
          italic: false,
          code: false,
          href: item.href,
        });
      });

      renderRunsPdf(doc, contactRuns, MARGIN_X, doc.y, {
        width: CONTENT_W,
        fontSize: 7.7,
        lineGap: 1.5,
        baseColor: "#334155",
      });

      doc.y += 4;
      doc
        .moveTo(MARGIN_X, doc.y)
        .lineTo(PAGE_W - MARGIN_X, doc.y)
        .lineWidth(0.75)
        .strokeColor("#CBD5E1")
        .stroke();
      doc.y += 5;

      // 4. Sections
      for (const section of parsed.sections) {
        doc.y += 2;
        doc
          .font("Helvetica-Bold")
          .fontSize(9.4)
          .fillColor("#0F172A")
          .text(section.heading.toUpperCase(), MARGIN_X, doc.y, {
            width: CONTENT_W,
          });

        const ruleY = doc.y + 1;
        doc
          .moveTo(MARGIN_X, ruleY)
          .lineTo(PAGE_W - MARGIN_X, ruleY)
          .lineWidth(0.5)
          .strokeColor("#CBD5E1")
          .stroke();
        doc.y = ruleY + 3.5;

        for (const block of section.blocks) {
          if (block.type === "entry") {
            doc.y += 1.5;
            doc
              .font("Helvetica-Bold")
              .fontSize(8.7)
              .fillColor("#0F172A")
              .text(block.title, MARGIN_X, doc.y, { width: CONTENT_W });

            const metaY = doc.y;
            const rightW = block.rightText
              ? doc.font("Helvetica").fontSize(8.0).widthOfString(block.rightText)
              : 0;
            const leftMaxW = block.rightText ? CONTENT_W - rightW - 12 : CONTENT_W;
            renderRunsPdf(doc, block.metaRuns, MARGIN_X, metaY, {
              width: leftMaxW,
              fontSize: 8.1,
              baseColor: "#475569",
            });
            const yAfterLeft = doc.y;
            if (block.rightText) {
              doc
                .font("Helvetica")
                .fontSize(8.0)
                .fillColor("#475569")
                .text(block.rightText, MARGIN_X, metaY, {
                  width: CONTENT_W,
                  align: "right",
                });
            }
            doc.x = MARGIN_X;
            doc.y = Math.max(yAfterLeft, doc.y) + 2;
          } else if (block.type === "bullet") {
            const bulletY = doc.y;
            const rightW = block.rightText
              ? doc.font("Helvetica").fontSize(7.9).widthOfString(block.rightText)
              : 0;
            const bulletTextX = MARGIN_X + 10;
            const leftMaxW = block.rightText
              ? CONTENT_W - 10 - rightW - 12
              : CONTENT_W - 10;

            doc
              .font("Helvetica-Bold")
              .fontSize(8.2)
              .fillColor("#1D4ED8")
              .text("•", MARGIN_X + 1, bulletY, { lineBreak: false });

            renderRunsPdf(doc, block.runs, bulletTextX, bulletY, {
              width: leftMaxW,
              fontSize: 8.15,
              lineGap: 1.05,
              baseColor: "#1E293B",
            });
            const yAfterLeft = doc.y;
            if (block.rightText) {
              doc
                .font("Helvetica")
                .fontSize(7.9)
                .fillColor("#475569")
                .text(block.rightText, MARGIN_X, bulletY, {
                  width: CONTENT_W,
                  align: "right",
                });
            }
            doc.x = MARGIN_X;
            doc.y = Math.max(yAfterLeft, doc.y) + 1.3;
          } else if (block.type === "paragraph") {
            renderRunsPdf(doc, block.runs, MARGIN_X, doc.y, {
              width: CONTENT_W,
              fontSize: 8.2,
              lineGap: 1.15,
              baseColor: "#1E293B",
            });
            doc.y += 2;
          }
        }
      }

      const range = doc.bufferedPageRange();
      if (range.count !== 1) {
        throw new Error(
          `${label}: rendered ${range.count} pages; expected 1 clean single-page ATS CV.`,
        );
      }
      if (doc.y > PAGE_H - MARGIN_BOTTOM) {
        throw new Error(
          `${label}: vertical content overflow (${doc.y.toFixed(1)}pt > ${PAGE_H - MARGIN_BOTTOM}pt).`,
        );
      }

      doc.end();
    } catch (err) {
      cleanup();
      try {
        doc.end();
      } catch {
        // ignore double-end on error path
      }
      reject(err);
    }
  });
}

/**
 * Estimate conservative character-width wrapping so SVG preview text matches PDF layout
 * cleanly without clipping on either Windows or Ubuntu librsvg.
 */
function wrapTextForSvg(text, maxWidthPx, fontSizePx) {
  const words = text.split(/\s+/).filter(Boolean);
  const avgCharW = fontSizePx * 0.51;
  const maxChars = Math.max(12, Math.floor(maxWidthPx / avgCharW));
  const lines = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function renderRunsSvgLine(runs, x, y, fontSizePx, defaultFill = "#1E293B") {
  const tspans = runs
    .map((run) => {
      const weight = run.bold ? ' font-weight="700"' : "";
      const style = run.italic ? ' font-style="italic"' : "";
      const fill = run.href ? "#1D4ED8" : defaultFill;
      const deco = run.href ? ' text-decoration="underline"' : "";
      return `<tspan xml:space="preserve" fill="${fill}"${weight}${style}${deco}>${escapeXml(run.text)}</tspan>`;
    })
    .join("");
  return `<text xml:space="preserve" x="${x}" y="${y}" font-family="Liberation Sans, Arial, Helvetica, sans-serif" font-size="${fontSizePx}">${tspans}</text>`;
}

function wrapContactItemsForSvg(items, maxWidthPx, fontSizePx) {
  const avgCharW = fontSizePx * 0.505;
  const maxChars = Math.max(20, Math.floor(maxWidthPx / avgCharW));
  const lines = [];
  let currentItems = [];
  let currentLen = 0;

  for (const item of items) {
    const sepLen = currentItems.length > 0 ? 5 : 0; // "  |  "
    if (currentItems.length > 0 && currentLen + sepLen + item.text.length > maxChars) {
      lines.push(currentItems);
      currentItems = [item];
      currentLen = item.text.length;
    } else {
      currentItems.push(item);
      currentLen += sepLen + item.text.length;
    }
  }
  if (currentItems.length > 0) lines.push(currentItems);

  return lines.map((lineItems) => {
    const runs = [];
    lineItems.forEach((item, idx) => {
      if (idx > 0) {
        runs.push({ text: "  |  ", bold: false, italic: false, href: null });
      }
      runs.push({ text: item.text, bold: false, italic: false, href: item.href });
    });
    return runs;
  });
}

function wrapRunsForSvg(runs, maxWidthPx, fontSizePx) {
  const tokens = [];
  for (const run of runs) {
    const parts = run.text.split(/(\s+)/);
    for (const part of parts) {
      if (!part) continue;
      tokens.push({ ...run, text: part });
    }
  }

  const avgCharW = fontSizePx * 0.505;
  const maxChars = Math.max(14, Math.floor(maxWidthPx / avgCharW));
  const lines = [];
  let currentLine = [];
  let currentLen = 0;

  for (const tok of tokens) {
    const isSpace = /^\s+$/.test(tok.text);
    if (isSpace && currentLen === 0) continue;

    if (!isSpace && currentLen + tok.text.length > maxChars && currentLen > 0) {
      lines.push(currentLine);
      currentLine = [tok];
      currentLen = tok.text.length;
    } else {
      const prev = currentLine[currentLine.length - 1];
      if (
        prev &&
        prev.bold === tok.bold &&
        prev.italic === tok.italic &&
        prev.href === tok.href
      ) {
        prev.text += tok.text;
      } else {
        currentLine.push({ ...tok });
      }
      currentLen += tok.text.length;
    }
  }
  if (currentLine.length > 0) lines.push(currentLine);
  return lines;
}

/**
 * Build a 1:1 SVG matching the Letter PDF geometry for high-DPI WebP preview rendering.
 */
export function buildResumePreviewSvg(parsed) {
  const mx = Math.round(MARGIN_X * SCALE);
  const cw = PREVIEW_W - mx * 2;
  let y = Math.round(MARGIN_TOP * SCALE) + 18;
  const elements = [];

  elements.push(`<rect width="${PREVIEW_W}" height="${PREVIEW_H}" fill="#FFFFFF"/>`);

  // Name
  elements.push(
    `<text x="${mx}" y="${y}" fill="#0F172A" font-family="Liberation Sans, Arial, Helvetica, sans-serif" font-size="20.5" font-weight="700">${escapeXml(parsed.name.toUpperCase())}</text>`,
  );
  y += 17;

  // Headline
  const headlineLines = wrapTextForSvg(parsed.headline, cw, 11.4);
  for (const line of headlineLines) {
    elements.push(
      `<text x="${mx}" y="${y}" fill="#1D4ED8" font-family="Liberation Sans, Arial, Helvetica, sans-serif" font-size="11.4" font-weight="700">${escapeXml(line)}</text>`,
    );
    y += 15;
  }

  // Contact line
  for (const lineRuns of wrapContactItemsForSvg(parsed.contactItems, cw, 10.1)) {
    elements.push(renderRunsSvgLine(lineRuns, mx, y, 10.1, "#334155"));
    y += 14.5;
  }

  y -= 1;
  elements.push(`<line x1="${mx}" y1="${y}" x2="${PREVIEW_W - mx}" y2="${y}" stroke="#CBD5E1" stroke-width="1"/>`);
  y += 18;

  // Sections
  for (const section of parsed.sections) {
    y += 4;
    elements.push(
      `<text x="${mx}" y="${y}" fill="#0F172A" font-family="Liberation Sans, Arial, Helvetica, sans-serif" font-size="12.4" font-weight="700">${escapeXml(section.heading.toUpperCase())}</text>`,
    );
    y += 5;
    elements.push(`<line x1="${mx}" y1="${y}" x2="${PREVIEW_W - mx}" y2="${y}" stroke="#CBD5E1" stroke-width="0.8"/>`);
    y += 14;

    for (const block of section.blocks) {
      if (block.type === "entry") {
        y += 3;
        elements.push(
          `<text x="${mx}" y="${y}" fill="#0F172A" font-family="Liberation Sans, Arial, Helvetica, sans-serif" font-size="11.7" font-weight="700">${escapeXml(block.title)}</text>`,
        );
        y += 14.5;
        elements.push(renderRunsSvgLine(block.metaRuns, mx, y, 10.7, "#475569"));
        if (block.rightText) {
          elements.push(
            `<text x="${PREVIEW_W - mx}" y="${y}" text-anchor="end" fill="#475569" font-family="Liberation Sans, Arial, Helvetica, sans-serif" font-size="10.6">${escapeXml(block.rightText)}</text>`,
          );
        }
        y += 15.5;
      } else if (block.type === "bullet") {
        const rightReserve = block.rightText ? block.rightText.length * 6.2 + 16 : 0;
        const bulletTextX = mx + 13;
        const maxW = cw - 13 - rightReserve;
        const wrapped = wrapRunsForSvg(block.runs, maxW, 10.8);
        elements.push(
          `<text x="${mx + 2}" y="${y}" fill="#1D4ED8" font-family="Liberation Sans, Arial, Helvetica, sans-serif" font-size="11" font-weight="700">&#x2022;</text>`,
        );
        if (block.rightText) {
          elements.push(
            `<text x="${PREVIEW_W - mx}" y="${y}" text-anchor="end" fill="#475569" font-family="Liberation Sans, Arial, Helvetica, sans-serif" font-size="10.4">${escapeXml(block.rightText)}</text>`,
          );
        }
        for (const lineRuns of wrapped) {
          elements.push(renderRunsSvgLine(lineRuns, bulletTextX, y, 10.8, "#1E293B"));
          y += 14.4;
        }
        y += 2;
      } else if (block.type === "paragraph") {
        for (const lineRuns of wrapRunsForSvg(block.runs, cw, 10.9)) {
          elements.push(renderRunsSvgLine(lineRuns, mx, y, 10.9, "#1E293B"));
          y += 14.6;
        }
        y += 3.5;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${PREVIEW_W}" height="${PREVIEW_H}" viewBox="0 0 ${PREVIEW_W} ${PREVIEW_H}">${elements.join("")}</svg>`;
}

export async function buildResumePreviewWebpBuffer(parsed) {
  const svgBuffer = Buffer.from(buildResumePreviewSvg(parsed), "utf8");
  let instance = null;
  try {
    instance = sharp(svgBuffer, { density: 96 });
    return await instance.webp({ quality: 88 }).toBuffer();
  } finally {
    if (instance && typeof instance.destroy === "function") {
      instance.destroy();
    }
  }
}

async function writeBufferAtomically(targetPath, buffer) {
  const dir = path.dirname(targetPath);
  fs.mkdirSync(dir, { recursive: true });
  await fs.promises.writeFile(targetPath, buffer);
}

export async function renderAllResumes({ outDir = defaultCvDir, writeFiles = true } = {}) {
  const previewsDir = path.resolve(outDir, "previews");
  if (writeFiles) {
    fs.mkdirSync(outDir, { recursive: true });
    fs.mkdirSync(previewsDir, { recursive: true });
  }

  const results = [];
  for (const lang of LANGS) {
    for (const variant of VARIANTS) {
      const baseName = `cv-mariangel-sierra-${lang}-${variant}`;
      const mdPath = path.resolve(resumesDir, `${baseName}.md`);
      const markdown = await fs.promises.readFile(mdPath, "utf8");
      const parsed = validateOhMyCvAts(markdown, `${baseName}.md`);

      const pdfBuffer = await buildResumePdfBuffer(parsed, `${baseName}.md`);
      const webpBuffer = await buildResumePreviewWebpBuffer(parsed);

      if (writeFiles) {
        await writeBufferAtomically(path.resolve(outDir, `${baseName}.pdf`), pdfBuffer);
        await writeBufferAtomically(path.resolve(previewsDir, `${baseName}.webp`), webpBuffer);
      }

      results.push({
        baseName,
        pdfBytes: pdfBuffer.length,
        webpBytes: webpBuffer.length,
        sections: parsed.sections.length,
      });
    }
  }

  return results;
}

async function runLeakCheck(iterations) {
  if (typeof global.gc === "function") global.gc();
  const baselineHeap = process.memoryUsage().heapUsed;
  let peakHeap = baselineHeap;

  for (let i = 0; i < iterations; i++) {
    await renderAllResumes({ writeFiles: false });
    if (typeof global.gc === "function") global.gc();
    const current = process.memoryUsage().heapUsed;
    if (current > peakHeap) peakHeap = current;
  }

  const finalHeap = process.memoryUsage().heapUsed;
  const deltaMb = (finalHeap - baselineHeap) / (1024 * 1024);
  console.log(
    `Leak soak check (${iterations} iterations x 6 resumes): baseline=${(baselineHeap / (1024 * 1024)).toFixed(2)}MB final=${(finalHeap / (1024 * 1024)).toFixed(2)}MB peak=${(peakHeap / (1024 * 1024)).toFixed(2)}MB delta=${deltaMb.toFixed(2)}MB`,
  );
  if (deltaMb > 25) {
    throw new Error(`Excessive retained heap delta (${deltaMb.toFixed(2)}MB) after ${iterations} runs.`);
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  if (opts.checkLeaks > 0) {
    await runLeakCheck(opts.checkLeaks);
    return;
  }

  if (!opts.skipPortraits && opts.outDir === defaultCvDir) {
    await generatePortraitVariants(defaultImagesDir);
  }

  const results = await renderAllResumes({ outDir: opts.outDir, writeFiles: true });
  console.log(
    `Rendered ${results.length} ATS resume PDFs & WebP previews from OhMyCV Markdown into ${opts.outDir}`,
  );
}

const isEntrypoint =
  process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntrypoint) {
  await main();
}
