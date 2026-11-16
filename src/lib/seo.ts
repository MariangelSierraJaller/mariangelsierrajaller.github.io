import type { Lang, RoleId } from "@/types/content";
import { getLanguageCopy } from "@/content";
import { absoluteUrl } from "./base";
import { buildHomePath } from "./paths";
import {
  buildBreadcrumbNode,
  buildPersonNode,
  buildWebsiteNode,
  roleOgImagePath,
  SCHEMA_DATE_MODIFIED,
  wrapGraph,
  type HeadMeta,
} from "./seo-graph";

export function buildHomeHead(lang: Lang, role: RoleId): HeadMeta {
  const copy = getLanguageCopy(lang);
  const routeSeo = copy.seo.home[role];
  const canonicalPath = buildHomePath(lang, role);
  const canonical = absoluteUrl(canonicalPath);
  const esAlt = absoluteUrl(buildHomePath("es", role));
  const enAlt = absoluteUrl(buildHomePath("en", role));

  const crumbs = [
    {
      name: copy.seo.siteName,
      url: absoluteUrl(buildHomePath(lang, "general")),
    },
    ...(role === "general"
      ? []
      : [
          {
            name: copy.ui.roleLabels[role].full,
            url: canonical,
          },
        ]),
  ];

  const graph = [
    buildWebsiteNode(copy.seo.siteName),
    buildPersonNode(lang, copy.seo.personJobTitle, copy.seo.personDescription),
    {
      "@type": "ProfilePage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: routeSeo.title,
      description: routeSeo.description,
      inLanguage: copy.htmlLang,
      dateModified: SCHEMA_DATE_MODIFIED,
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
      about: { "@id": `${absoluteUrl("/")}#person` },
      mainEntity: { "@id": `${absoluteUrl("/")}#person` },
      breadcrumb: { "@id": `${canonical}#breadcrumb` },
    },
    buildBreadcrumbNode(canonical, crumbs),
  ];

  return {
    htmlLang: copy.htmlLang,
    title: routeSeo.title,
    description: routeSeo.description,
    keywords: routeSeo.keywords.join(", "),
    canonical,
    alternates: {
      es: esAlt,
      en: enAlt,
      xDefault: esAlt,
    },
    ogType: "profile",
    ogTitle: routeSeo.ogTitle,
    ogDescription: routeSeo.ogDescription,
    ogImage: absoluteUrl(roleOgImagePath(lang, role)),
    ogLocale: copy.locale,
    ogLocaleAlternate: lang === "es" ? "en_US" : "es_CO",
    jsonLd: wrapGraph(graph),
  };
}
