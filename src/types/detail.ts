import type { DetailCollection, Lang, ProjectId } from "./content";

export interface DetailLinkItem {
  collection: DetailCollection;
  slug: string;
  id: string;
}

export interface DetailPageCopy {
  collection: DetailCollection;
  slug: string;
  id: string;
  lang: Lang;
  eyebrow: string;
  title: string;
  subtitle: string;
  meta: readonly { label: string; value: string }[];
  overview: readonly string[];
  keyPointsTitle: string;
  keyPoints: readonly string[];
  outcomesTitle: string;
  outcomes: readonly { metric: string; label: string }[];
  tools: readonly string[];
  relatedProjects: readonly ProjectId[];
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
}

export interface DetailCollectionIndexCopy {
  collection: DetailCollection;
  lang: Lang;
  eyebrow: string;
  title: string;
  subtitle: string;
  seo: {
    title: string;
    description: string;
    keywords: readonly string[];
  };
}

export interface DetailUiCopy {
  backToPortfolio: string;
  backToCollection: string;
  toolsLabel: string;
  relatedProjectsTitle: string;
  viewProjectLabel: string;
  viewEntryLabel: string;
  previousLabel: string;
  nextLabel: string;
}
