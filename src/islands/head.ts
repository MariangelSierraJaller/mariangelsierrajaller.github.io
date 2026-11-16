import type { DetailCollection, Lang, ProjectId, RoleId } from "@/types/content";
import type { ParsedRoute } from "@/lib/paths";
import { buildHomeHead } from "@/lib/seo";
import { buildProjectDetailHead, buildProjectsIndexHead } from "@/lib/seo-projects";
import { buildDetailIndexHead, buildDetailItemHead } from "@/lib/seo-details";
import type { HeadMeta } from "@/lib/seo-graph";

export function resolveHeadForRoute(route: ParsedRoute): HeadMeta {
  switch (route.kind) {
    case "home":
      return buildHomeHead(route.lang, route.role);
    case "projectsIndex":
      return buildProjectsIndexHead(route.lang);
    case "projectDetail":
      return buildProjectDetailHead(route.lang, route.projectId as ProjectId);
    case "detailIndex":
      return buildDetailIndexHead(route.lang, route.collection);
    case "detailItem":
      return buildDetailItemHead(route.lang, route.collection, route.slug);
    case "notFound":
    default:
      return buildHomeHead(route.lang, "general");
  }
}

export interface PageMetaInput {
  kind: ParsedRoute["kind"];
  lang: Lang;
  role: RoleId;
  projectId?: ProjectId;
  collection?: DetailCollection;
  slug?: string;
}
