import type { DetailCollection, Lang } from "@/types/content";
import { getLanguageCopy } from "@/content";
import {
  getDetailCollectionIndexCopy,
  getDetailItemCopy,
  getDetailItemsForCollection,
} from "@/content/detail-copy";
import { absoluteUrl } from "./base";
import { buildDetailIndexPath, buildDetailItemPath, buildHomePath } from "./paths";
import {
  buildBreadcrumbNode,
  buildPersonNode,
  buildWebsiteNode,
  collectionLabel,
  SCHEMA_DATE_MODIFIED,
  wrapGraph,
  type HeadMeta,
} from "./seo-graph";

export function buildDetailIndexHead(lang: Lang, collection: DetailCollection): HeadMeta {
  const copy = getLanguageCopy(lang);
  const indexCopy = getDetailCollectionIndexCopy(lang, collection);
  const items = getDetailItemsForCollection(lang, collection);
  const canonical = absoluteUrl(buildDetailIndexPath(lang, collection));
  const esAlt = absoluteUrl(buildDetailIndexPath("es", collection));
  const enAlt = absoluteUrl(buildDetailIndexPath("en", collection));

  const crumbs = [
    { name: copy.seo.siteName, url: absoluteUrl(buildHomePath(lang, "general")) },
    { name: collectionLabel(collection, lang), url: canonical },
  ];

  const graph = [
    buildWebsiteNode(copy.seo.siteName),
    buildPersonNode(lang, copy.seo.personJobTitle, copy.seo.personDescription),
    {
      "@type": "CollectionPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: indexCopy.seo.title,
      description: indexCopy.seo.description,
      inLanguage: copy.htmlLang,
      dateModified: SCHEMA_DATE_MODIFIED,
      isPartOf: { "@id": `${absoluteUrl("/")}#website` },
      about: { "@id": `${absoluteUrl("/")}#person` },
      breadcrumb: { "@id": `${canonical}#breadcrumb` },
    },
    {
      "@type": "ItemList",
      "@id": `${canonical}#itemlist`,
      itemListElement: items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.title,
        url: absoluteUrl(buildDetailItemPath(lang, collection, item.slug)),
      })),
    },
    buildBreadcrumbNode(canonical, crumbs),
  ];

  return {
    htmlLang: copy.htmlLang,
    title: indexCopy.seo.title,
    description: indexCopy.seo.description,
    keywords: indexCopy.seo.keywords.join(", "),
    canonical,
    alternates: { es: esAlt, en: enAlt, xDefault: esAlt },
    ogType: "website",
    ogTitle: indexCopy.seo.title,
    ogDescription: indexCopy.seo.description,
    ogImage: absoluteUrl(`/og/og-${lang}.jpg`),
    ogLocale: copy.locale,
    ogLocaleAlternate: lang === "es" ? "en_US" : "es_CO",
    jsonLd: wrapGraph(graph),
  };
}

export function buildDetailItemHead(
  lang: Lang,
  collection: DetailCollection,
  slug: string,
): HeadMeta {
  const copy = getLanguageCopy(lang);
  const item = getDetailItemCopy(lang, collection, slug);
  const canonical = absoluteUrl(buildDetailItemPath(lang, collection, slug));
  const esAlt = absoluteUrl(buildDetailItemPath("es", collection, slug));
  const enAlt = absoluteUrl(buildDetailItemPath("en", collection, slug));

  const crumbs = [
    { name: copy.seo.siteName, url: absoluteUrl(buildHomePath(lang, "general")) },
    {
      name: collectionLabel(collection, lang),
      url: absoluteUrl(buildDetailIndexPath(lang, collection)),
    },
    { name: item.title, url: canonical },
  ];

  const entityType =
    collection === "certifications" ? "EducationalOccupationalCredential" : "WebPage";

  const graph = [
    buildWebsiteNode(copy.seo.siteName),
    buildPersonNode(lang, copy.seo.personJobTitle, copy.seo.personDescription),
    {
      "@type": entityType,
      "@id": `${canonical}#entity`,
      url: canonical,
      name: item.title,
      description: item.seo.description,
      inLanguage: copy.htmlLang,
      dateModified: SCHEMA_DATE_MODIFIED,
      about: { "@id": `${absoluteUrl("/")}#person` },
    },
    buildBreadcrumbNode(canonical, crumbs),
  ];

  return {
    htmlLang: copy.htmlLang,
    title: item.seo.title,
    description: item.seo.description,
    keywords: item.seo.keywords.join(", "),
    canonical,
    alternates: { es: esAlt, en: enAlt, xDefault: esAlt },
    ogType: "article",
    ogTitle: item.seo.title,
    ogDescription: item.seo.description,
    ogImage: absoluteUrl(`/og/og-${lang}.jpg`),
    ogLocale: copy.locale,
    ogLocaleAlternate: lang === "es" ? "en_US" : "es_CO",
    jsonLd: wrapGraph(graph),
  };
}
