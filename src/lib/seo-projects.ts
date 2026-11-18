import type { Lang, ProjectId } from "@/types/content";
import { getLanguageCopy } from "@/content";
import { getProjectCopy, getProjectSummary } from "@/content/project-copy";
import { getProjectStack, PROJECT_ORDER, PROJECTS_SHARED } from "@/content/shared/projects";
import { absoluteUrl } from "./base";
import { buildHomePath, buildProjectPath, buildProjectsIndexPath } from "./paths";
import {
  buildBreadcrumbNode,
  buildPersonNode,
  buildWebsiteNode,
  SCHEMA_DATE_MODIFIED,
  wrapGraph,
  type HeadMeta,
} from "./seo-graph";

export function buildProjectsIndexHead(lang: Lang): HeadMeta {
  const copy = getLanguageCopy(lang);
  const seo = copy.seo.projectsIndex;
  const canonical = absoluteUrl(buildProjectsIndexPath(lang));
  const esAlt = absoluteUrl(buildProjectsIndexPath("es"));
  const enAlt = absoluteUrl(buildProjectsIndexPath("en"));

  const crumbs = [
    { name: copy.seo.siteName, url: absoluteUrl(buildHomePath(lang, "general")) },
    { name: lang === "es" ? "Proyectos" : "Projects", url: canonical },
  ];

  const listItems = PROJECT_ORDER.map((id, idx) => {
    const shared = PROJECTS_SHARED[id];
    const summary = getProjectSummary(lang, id);
    return {
      "@type": "ListItem",
      position: idx + 1,
      name: summary.title,
      url: absoluteUrl(buildProjectPath(lang, shared.slug)),
    };
  });

  const graph = [
    buildWebsiteNode(copy.seo.siteName),
    buildPersonNode(lang, copy.seo.personJobTitle, copy.seo.personDescription),
    {
      "@type": "CollectionPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      description: seo.description,
      inLanguage: copy.htmlLang,
      dateModified: SCHEMA_DATE_MODIFIED,
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
      about: { "@id": `${absoluteUrl("/")}#person` },
      breadcrumb: { "@id": `${canonical}#breadcrumb` },
    },
    {
      "@type": "ItemList",
      "@id": `${canonical}#itemlist`,
      itemListElement: listItems,
    },
    buildBreadcrumbNode(canonical, crumbs),
  ];

  return {
    htmlLang: copy.htmlLang,
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.join(", "),
    canonical,
    alternates: { es: esAlt, en: enAlt, xDefault: esAlt },
    ogType: "website",
    ogTitle: seo.ogTitle,
    ogDescription: seo.ogDescription,
    ogImage: absoluteUrl(`/og/og-${lang}.jpg`),
    ogLocale: copy.locale,
    ogLocaleAlternate: lang === "es" ? "en_US" : "es_CO",
    jsonLd: wrapGraph(graph),
  };
}

export function buildProjectDetailHead(lang: Lang, projectId: ProjectId): HeadMeta {
  const copy = getLanguageCopy(lang);
  const shared = PROJECTS_SHARED[projectId];
  const entry = getProjectCopy(lang, projectId);
  const canonical = absoluteUrl(buildProjectPath(lang, shared.slug));
  const esAlt = absoluteUrl(buildProjectPath("es", shared.slug));
  const enAlt = absoluteUrl(buildProjectPath("en", shared.slug));

  const crumbs = [
    { name: copy.seo.siteName, url: absoluteUrl(buildHomePath(lang, "general")) },
    {
      name: lang === "es" ? "Proyectos" : "Projects",
      url: absoluteUrl(buildProjectsIndexPath(lang)),
    },
    { name: entry.title, url: canonical },
  ];

  const graph = [
    buildWebsiteNode(copy.seo.siteName),
    buildPersonNode(lang, copy.seo.personJobTitle, copy.seo.personDescription),
    {
      "@type": shared.kind === "case-study" ? "TechArticle" : "CreativeWork",
      "@id": `${canonical}#article`,
      url: canonical,
      headline: entry.title,
      name: entry.title,
      description: entry.seo.description,
      inLanguage: copy.htmlLang,
      dateModified: SCHEMA_DATE_MODIFIED,
      keywords: [...entry.seo.keywords, ...getProjectStack(projectId, lang)].join(", "),
      author: { "@id": `${absoluteUrl("/")}#person` },
      publisher: { "@id": `${absoluteUrl("/")}#person` },
      mainEntityOfPage: canonical,
    },
    buildBreadcrumbNode(canonical, crumbs),
  ];

  return {
    htmlLang: copy.htmlLang,
    title: entry.seo.title,
    description: entry.seo.description,
    keywords: entry.seo.keywords.join(", "),
    canonical,
    alternates: { es: esAlt, en: enAlt, xDefault: esAlt },
    ogType: "article",
    ogTitle: entry.seo.title,
    ogDescription: entry.seo.description,
    ogImage: absoluteUrl(shared.ogImage),
    ogLocale: copy.locale,
    ogLocaleAlternate: lang === "es" ? "en_US" : "es_CO",
    jsonLd: wrapGraph(graph),
  };
}
