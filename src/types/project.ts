import type { CaseStudyId, Lang, ProjectId, ProjectPageId, RoleId } from "./content";

export type ProjectKind = "case-study" | "project-page";

export interface ProjectShared {
  id: ProjectId;
  slug: string;
  kind: ProjectKind;
  year: string;
  period: string;
  featuredIn: readonly RoleId[];
  roleAffinity: "admin" | "tech" | "both";
  stack: readonly string[];
  ogImage: string;
}

export interface ProjectSummaryCopy {
  id: ProjectId;
  title: string;
  subtitle: string;
  category: string;
  summary: string;
  impactMetric: {
    value: string;
    label: string;
  };
  tags: readonly string[];
}

export type CaseStudyBlock =
  | {
      type: "text";
      paragraphs: readonly string[];
    }
  | {
      type: "metrics";
      items: readonly {
        value: string;
        label: string;
        detail: string;
      }[];
    }
  | {
      type: "architecture";
      caption: string;
      layers: readonly {
        name: string;
        role: string;
        tools: readonly string[];
      }[];
    }
  | {
      type: "comparison";
      headers: readonly [string, string, string];
      rows: readonly [string, string, string][];
    }
  | {
      type: "code";
      title: string;
      language: string;
      snippet: string;
    }
  | {
      type: "timeline";
      steps: readonly {
        phase: string;
        title: string;
        outcome: string;
      }[];
    }
  | {
      type: "callout";
      tone: "info" | "result" | "lesson";
      title: string;
      body: string;
    };

export interface CaseStudySection {
  id: string;
  eyebrow: string;
  title: string;
  blocks: readonly CaseStudyBlock[];
}

export interface CaseStudyCopy {
  id: CaseStudyId;
  lang: Lang;
  title: string;
  subtitle: string;
  roleLabel: string;
  contextLabel: string;
  outcomeSummary: string;
  heroMetrics: readonly { value: string; label: string }[];
  sections: readonly CaseStudySection[];
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
}

export interface ProjectPageCopy {
  id: ProjectPageId;
  lang: Lang;
  title: string;
  subtitle: string;
  contextLabel: string;
  overview: readonly string[];
  highlightsTitle: string;
  highlights: readonly { title: string; detail: string; metric?: string }[];
  architectureTitle: string;
  architectureNodes: readonly { label: string; description: string }[];
  learningsTitle: string;
  learnings: readonly string[];
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
}

export interface ProjectLinksCopy {
  backToPortfolio: string;
  backToProjects: string;
  projectsIndexTitle: string;
  projectsIndexSubtitle: string;
  caseStudyBadge: string;
  projectPageBadge: string;
  stackLabel: string;
  periodLabel: string;
  relatedTitle: string;
  previousLabel: string;
  nextLabel: string;
  discussCta: string;
}
