export interface InlineRun {
  text: string;
  bold: boolean;
  italic: boolean;
  code: boolean;
  href: string | null;
}

export interface ParsedResumeAst {
  name: string;
  headline: string;
  contactItems: Array<{ text: string; href: string | null }>;
  sections: Array<{
    heading: string;
    blocks: Array<
      | { type: "entry"; title: string; metaRuns: InlineRun[]; rightText: string }
      | { type: "bullet"; runs: InlineRun[]; rightText: string }
      | { type: "paragraph"; runs: InlineRun[]; rightText: string }
    >;
  }>;
}

export function parseInlineRuns(text: string): InlineRun[];
export function runsToPlainText(runs: InlineRun[]): string;
export function splitHfill(line: string): { left: string; right: string };
export function parseOhMyCvMarkdown(markdown: string): ParsedResumeAst;
export function validateOhMyCvAts(markdown: string, fileName?: string): ParsedResumeAst;
