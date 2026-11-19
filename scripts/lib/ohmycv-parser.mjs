const BANNED_BULLET_STARTERS = [
  /^responsable de\b/i,
  /^apoy[ée] en\b/i,
  /^ayud[ée] con\b/i,
  /^particip[ée] en\b/i,
  /^encargad[oa] de\b/i,
  /^responsible for\b/i,
  /^helped with\b/i,
  /^assisted with\b/i,
  /^participated in\b/i,
];

const BANNED_CLICHES = [
  /lo que no se mide no se (?:puede )?controla/i,
  /\bunivesitaria\b/i,
  /\bfundacion\b/i,
  /\bgoogle data analytics\b/i,
  /\bprofunda pasi[óo]n\b/i,
  /\bprofunda curiosidad\b/i,
  /\babsoluta integridad\b/i,
  /\btrazabilidad intachable\b/i,
  /\bentornos din[áa]micos\b/i,
  /\borientad[oa] al logro de resultados\b/i,
  /\bdemocratizar la informaci[óo]n\b/i,
];

/**
 * Parse inline markdown spans (**bold**, *italic*, `code`, [label](url)) into typed runs.
 * Strips raw markdown tokens while preserving clickable link targets for PDF rendering.
 */
export function parseInlineRuns(text) {
  const runs = [];
  const tokenRe = /(\[([^\]]+)\]\((https?:\/\/[^)\s]+|mailto:[^)\s]+)\)|\*\*([^*]+)\*\*|`([^`]+)`|\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match;

  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      runs.push({ text: text.slice(lastIndex, match.index), bold: false, italic: false, code: false, href: null });
    }
    if (match[2] && match[3]) {
      runs.push({ text: match[2], bold: false, italic: false, code: false, href: match[3] });
    } else if (match[4]) {
      runs.push({ text: match[4], bold: true, italic: false, code: false, href: null });
    } else if (match[5]) {
      runs.push({ text: match[5], bold: false, italic: false, code: true, href: null });
    } else if (match[6]) {
      runs.push({ text: match[6], bold: false, italic: true, code: false, href: null });
    }
    lastIndex = tokenRe.lastIndex;
  }

  if (lastIndex < text.length) {
    runs.push({ text: text.slice(lastIndex), bold: false, italic: false, code: false, href: null });
  }

  return runs.filter((r) => r.text.length > 0);
}

export function runsToPlainText(runs) {
  return runs.map((r) => r.text).join("");
}

/**
 * Split a line around OhMyCV's `\hfill` token for linear left + right alignment.
 */
export function splitHfill(line) {
  const idx = line.indexOf("\\hfill");
  if (idx === -1) {
    return { left: line.trim(), right: "" };
  }
  return {
    left: line.slice(0, idx).trim(),
    right: line.slice(idx + "\\hfill".length).trim(),
  };
}

function stripFrontmatter(md) {
  const normalized = md.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) return normalized;
  const end = normalized.indexOf("\n---\n", 4);
  if (end === -1) return normalized;
  return normalized.slice(end + 5);
}

/**
 * Parse an OhMyCV-compatible single-column ATS Markdown file into structured sections.
 */
export function parseOhMyCvMarkdown(markdown) {
  const body = stripFrontmatter(markdown);
  const lines = body.split("\n");

  let name = "";
  let headline = "";
  let contactRaw = "";
  const sections = [];
  let currentSection = null;
  let pendingEntryTitle = null;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim();
    if (!raw || raw === "---") continue;

    if (raw.startsWith("# ")) {
      name = raw.slice(2).trim();
      continue;
    }

    if (raw.startsWith("## ")) {
      pendingEntryTitle = null;
      currentSection = {
        heading: raw.slice(3).trim(),
        blocks: [],
      };
      sections.push(currentSection);
      continue;
    }

    if (raw.startsWith("### ")) {
      if (!currentSection) {
        throw new Error(`Found H3 heading outside section: ${raw}`);
      }
      pendingEntryTitle = raw.slice(4).trim();
      continue;
    }

    if (!currentSection) {
      if (!headline) {
        headline = raw;
      } else if (!contactRaw) {
        contactRaw = raw;
      }
      continue;
    }

    if (pendingEntryTitle !== null) {
      const { left, right } = splitHfill(raw);
      currentSection.blocks.push({
        type: "entry",
        title: pendingEntryTitle,
        metaRuns: parseInlineRuns(left),
        rightText: right,
      });
      pendingEntryTitle = null;
      continue;
    }

    if (raw.startsWith("- ")) {
      const itemContent = raw.slice(2).trim();
      const { left, right } = splitHfill(itemContent);
      currentSection.blocks.push({
        type: "bullet",
        runs: parseInlineRuns(left),
        rightText: right,
      });
      continue;
    }

    const { left, right } = splitHfill(raw);
    currentSection.blocks.push({
      type: "paragraph",
      runs: parseInlineRuns(left),
      rightText: right,
    });
  }

  if (!name || !headline || !contactRaw) {
    throw new Error("Resume markdown must contain H1 name, headline, and contact line.");
  }

  const contactItems = contactRaw
    .split("|")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const runs = parseInlineRuns(part);
      if (runs.length === 1 && !runs[0].href && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(runs[0].text)) {
        return { text: runs[0].text, href: `mailto:${runs[0].text}` };
      }
      return {
        text: runsToPlainText(runs),
        href: runs.find((r) => r.href)?.href ?? null,
      };
    });

  return {
    name,
    headline,
    contactItems,
    sections,
  };
}

/**
 * Audit parsed OhMyCV Markdown against ATS compliance, anti-AI style, andXYZ rules.
 */
export function validateOhMyCvAts(markdown, fileName = "resume.md") {
  const issues = [];

  if (/<(table|tr|td|th|img|svg|div|span)\b/i.test(markdown)) {
    issues.push(`${fileName}: contains raw HTML layout tags that degrade ATS parsing`);
  }
  if (/^\s*\|.*\|\s*$/m.test(markdown)) {
    issues.push(`${fileName}: contains Markdown table syntax`);
  }
  if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(markdown)) {
    issues.push(`${fileName}: contains emoji/symbol pictographs in ATS text`);
  }
  if (/\u2014/.test(markdown)) {
    issues.push(`${fileName}: contains em-dash (—) connector`);
  }

  for (const pattern of BANNED_CLICHES) {
    if (pattern.test(markdown)) {
      issues.push(`${fileName}: contains banned cliché or typo matching ${pattern}`);
    }
  }

  const parsed = parseOhMyCvMarkdown(markdown);
  if (parsed.sections.length < 5) {
    issues.push(`${fileName}: expected at least 5 top-level sections, found ${parsed.sections.length}`);
  }

  const expSection = parsed.sections.find((s) =>
    /experiencia|experience/i.test(s.heading),
  );
  if (!expSection) {
    issues.push(`${fileName}: missing Experience section`);
  } else {
    const expBullets = expSection.blocks.filter((b) => b.type === "bullet");
    if (expBullets.length < 6) {
      issues.push(`${fileName}: expected >= 6 experience bullets, found ${expBullets.length}`);
    }
    for (const bullet of expBullets) {
      const plain = runsToPlainText(bullet.runs).trim();
      for (const starter of BANNED_BULLET_STARTERS) {
        if (starter.test(plain)) {
          issues.push(`${fileName}: weak bullet starter "${plain.slice(0, 40)}"`);
        }
      }
      if (!/\d/.test(plain)) {
        issues.push(`${fileName}: experience bullet lacks measurable number/metric "${plain.slice(0, 60)}"`);
      }
    }
  }

  if (issues.length > 0) {
    throw new Error(`ATS validation failed:\n- ${issues.join("\n- ")}`);
  }

  return parsed;
}
