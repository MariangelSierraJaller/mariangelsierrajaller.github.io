import type { DetailCollection, Lang, RoleId } from "@/types/content";
import { PROFILE } from "@/content/shared/profile";
import { SITE } from "@/content/shared/site";
import { BUILD_DATE, absoluteUrl } from "./base";

export interface BreadcrumbCrumb {
  name: string;
  url: string;
}

export function buildPersonNode(lang: Lang, jobTitle: readonly string[], description: string) {
  return {
    "@type": "Person",
    "@id": `${SITE.siteUrl}/#person`,
    name: PROFILE.fullName,
    alternateName: PROFILE.shortName,
    givenName: PROFILE.givenName,
    familyName: PROFILE.familyName,
    url: `${SITE.siteUrl}/${lang}`,
    image: absoluteUrl("/images/portrait.jpg"),
    email: `mailto:${PROFILE.email}`,
    telephone: PROFILE.phone,
    jobTitle: [...jobTitle],
    description,
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.location.city,
      addressRegion: PROFILE.location.region,
      addressCountry: PROFILE.location.countryCode,
    },
    knowsLanguage: [
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "English", alternateName: "en" },
      { "@type": "Language", name: "French", alternateName: "fr" },
      { "@type": "Language", name: "Korean", alternateName: "ko" },
    ],
    alumniOf: [
      { "@type": "EducationalOrganization", name: "Fundación Universidad San José" },
      { "@type": "EducationalOrganization", name: "Institución Universitaria ITM" },
      { "@type": "EducationalOrganization", name: "SENA — Servicio Nacional de Aprendizaje" },
    ],
    worksFor: {
      "@type": "Organization",
      name: "Asociación para la Enseñanza — ASPAEN",
    },
    sameAs: [PROFILE.socials.linkedin, PROFILE.socials.github],
  };
}

export function buildWebsiteNode(siteName: string) {
  return {
    "@type": "WebSite",
    "@id": `${SITE.siteUrl}/#website`,
    url: SITE.siteUrl,
    name: siteName,
    inLanguage: ["es-CO", "en-US"],
    publisher: { "@id": `${SITE.siteUrl}/#person` },
  };
}

export function buildBreadcrumbNode(idUrl: string, crumbs: readonly BreadcrumbCrumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${idUrl}#breadcrumb`,
    itemListElement: crumbs.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export interface HeadMeta {
  htmlLang: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  alternates: {
    es: string;
    en: string;
    xDefault: string;
  };
  ogType: "website" | "profile" | "article";
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogLocale: string;
  ogLocaleAlternate: string;
  jsonLd: string;
}

export function roleOgImagePath(lang: Lang, role: RoleId): string {
  return role === "general" ? `/og/og-${lang}.jpg` : `/og/og-${lang}-${role}.jpg`;
}

export function collectionLabel(collection: DetailCollection, lang: Lang): string {
  if (lang === "es") {
    return collection === "experience"
      ? "Experiencia"
      : collection === "education"
        ? "Educación"
        : "Certificaciones";
  }
  return collection === "experience"
    ? "Experience"
    : collection === "education"
      ? "Education"
      : "Certifications";
}

export function wrapGraph(nodes: Record<string, unknown>[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}

export const SCHEMA_DATE_MODIFIED = BUILD_DATE;
