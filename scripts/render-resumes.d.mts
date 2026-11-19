import type { ParsedResumeAst } from "./lib/ohmycv-parser.mjs";

export function buildResumePdfBuffer(parsed: ParsedResumeAst, label?: string): Promise<Buffer>;
export function buildResumePreviewSvg(parsed: ParsedResumeAst): string;
export function buildResumePreviewWebpBuffer(parsed: ParsedResumeAst): Promise<Buffer>;
export function renderAllResumes(options?: {
  outDir?: string;
  writeFiles?: boolean;
}): Promise<Array<{ baseName: string; pdfBytes: number; webpBytes: number; sections: number }>>;
