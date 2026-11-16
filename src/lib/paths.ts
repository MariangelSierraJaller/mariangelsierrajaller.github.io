import {
  DEFAULT_LANG,
  DEFAULT_ROLE,
  DETAIL_COLLECTIONS,
  ROLE_IDS,
  SUPPORTED_LANGS,
  type DetailCollection,
  type Lang,
  type RoleId,
} from "@/types/content";
import { PROJECT_LINKS } from "@/content/shared/project-links";
import { DETAIL_LINKS } from "@/content/shared/detail-links";
import { stripBase, withBase } from "./base";

export type ParsedRoute =
  | { kind: "home"; lang: Lang; role: RoleId }
  | { kind: "projectsIndex"; lang: Lang; role: RoleId }
  | { kind: "projectDetail"; lang: Lang; role: RoleId; slug: string; projectId: string }
  | { kind: "detailIndex"; lang: Lang; role: RoleId; collection: DetailCollection }
  | {
      kind: "detailItem";
      lang: Lang;
      role: RoleId;
      collection: DetailCollection;
      slug: string;
      itemId: string;
    }
  | { kind: "notFound"; lang: Lang; role: RoleId };

export function isLang(value: string | undefined): value is Lang {
  return SUPPORTED_LANGS.includes(value as Lang);
}

export function isRole(value: string | undefined): value is RoleId {
  return ROLE_IDS.includes(value as RoleId);
}

export function isDetailCollection(value: string | undefined): value is DetailCollection {
  return DETAIL_COLLECTIONS.includes(value as DetailCollection);
}

export function parseRoute(pathname: string, search = ""): ParsedRoute {
  const clean = stripBase(pathname).replace(/\/+$/, "") || "/";
  const segments = clean === "/" ? [] : clean.slice(1).split("/");
  const params = new URLSearchParams(search);
  const fromParam = params.get("from") ?? undefined;
  const queryRole: RoleId = isRole(fromParam) ? fromParam : DEFAULT_ROLE;

  if (segments.length === 0) {
    return { kind: "home", lang: DEFAULT_LANG, role: queryRole };
  }

  const [maybeLang, second, third] = segments;
  if (!isLang(maybeLang)) {
    return { kind: "notFound", lang: DEFAULT_LANG, role: DEFAULT_ROLE };
  }
  const lang = maybeLang;

  if (segments.length === 1) {
    return { kind: "home", lang, role: "general" };
  }

  if (segments.length === 2 && isRole(second) && second !== "general") {
    return { kind: "home", lang, role: second };
  }

  if (second === "projects") {
    if (segments.length === 2) {
      return { kind: "projectsIndex", lang, role: queryRole };
    }
    if (segments.length === 3 && third) {
      const found = PROJECT_LINKS.find((p) => p.slug === third);
      if (found) {
        return { kind: "projectDetail", lang, role: queryRole, slug: third, projectId: found.id };
      }
    }
    return { kind: "notFound", lang, role: queryRole };
  }

  if (isDetailCollection(second)) {
    if (segments.length === 2) {
      return { kind: "detailIndex", lang, role: queryRole, collection: second };
    }
    if (segments.length === 3 && third) {
      const found = DETAIL_LINKS[second].find((item) => item.slug === third);
      if (found) {
        return {
          kind: "detailItem",
          lang,
          role: queryRole,
          collection: second,
          slug: third,
          itemId: found.id,
        };
      }
    }
    return { kind: "notFound", lang, role: queryRole };
  }

  return { kind: "notFound", lang, role: queryRole };
}

export function buildHomePath(lang: Lang, role: RoleId = "general", hash?: string): string {
  const base = role === "general" ? `/${lang}` : `/${lang}/${role}`;
  const url = withBase(base);
  return hash ? `${url}#${hash.replace(/^#/, "")}` : url;
}

export function withRoleQuery(
  path: string,
  fromRole?: RoleId,
  locked?: boolean,
): string {
  const params = new URLSearchParams();
  if (fromRole && fromRole !== "general") params.set("from", fromRole);
  if (locked) params.set("locked", "true");
  const qs = params.toString();
  if (!qs) return path;
  const [pathname, hash] = path.split("#");
  const sep = pathname.includes("?") ? "&" : "?";
  return `${pathname}${sep}${qs}${hash ? `#${hash}` : ""}`;
}

export function buildProjectsIndexPath(lang: Lang, fromRole?: RoleId, locked?: boolean): string {
  return withRoleQuery(withBase(`/${lang}/projects`), fromRole, locked);
}

export function buildProjectPath(
  lang: Lang,
  slug: string,
  fromRole?: RoleId,
  locked?: boolean,
): string {
  return withRoleQuery(withBase(`/${lang}/projects/${slug}`), fromRole, locked);
}

export function buildDetailIndexPath(
  lang: Lang,
  collection: DetailCollection,
  fromRole?: RoleId,
  locked?: boolean,
): string {
  return withRoleQuery(withBase(`/${lang}/${collection}`), fromRole, locked);
}

export function buildDetailItemPath(
  lang: Lang,
  collection: DetailCollection,
  slug: string,
  fromRole?: RoleId,
  locked?: boolean,
): string {
  return withRoleQuery(withBase(`/${lang}/${collection}/${slug}`), fromRole, locked);
}

export function switchLangPath(pathname: string, targetLang: Lang, search = ""): string {
  const parsed = parseRoute(pathname, search);
  const params = new URLSearchParams(search);
  const locked = params.get("locked") === "true";
  const fromParam = params.get("from") ?? undefined;
  const preservedFrom: RoleId | undefined = isRole(fromParam) ? fromParam : undefined;

  let next = "";
  switch (parsed.kind) {
    case "home":
      next = buildHomePath(targetLang, parsed.role);
      return withRoleQuery(next, undefined, locked);
    case "projectsIndex":
      return buildProjectsIndexPath(targetLang, preservedFrom ?? parsed.role, locked);
    case "projectDetail":
      return buildProjectPath(targetLang, parsed.slug, preservedFrom ?? parsed.role, locked);
    case "detailIndex":
      return buildDetailIndexPath(targetLang, parsed.collection, preservedFrom ?? parsed.role, locked);
    case "detailItem":
      return buildDetailItemPath(
        targetLang,
        parsed.collection,
        parsed.slug,
        preservedFrom ?? parsed.role,
        locked,
      );
    case "notFound":
    default:
      return withRoleQuery(buildHomePath(targetLang, "general"), undefined, locked);
  }
}

export function prerenderRoutes(): string[] {
  const routes: string[] = [];

  for (const lang of SUPPORTED_LANGS) {
    routes.push(`${lang}`);
    for (const role of ROLE_IDS) {
      if (role !== "general") routes.push(`${lang}/${role}`);
    }

    routes.push(`${lang}/projects`);
    for (const project of PROJECT_LINKS) {
      routes.push(`${lang}/projects/${project.slug}`);
    }

    for (const collection of DETAIL_COLLECTIONS) {
      routes.push(`${lang}/${collection}`);
      for (const item of DETAIL_LINKS[collection]) {
        routes.push(`${lang}/${collection}/${item.slug}`);
      }
    }
  }

  return routes;
}
