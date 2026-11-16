import type { DetailCollection, Lang, ProjectId, RoleId, SectionId } from "@/types/content";

export type IslandPartName =
  | "boot"
  | "skip"
  | "header"
  | "hero"
  | "highlights"
  | "footer"
  | "whatsapp"
  | "assistant"
  | "notFound"
  | "projectsIndex"
  | "projectDetail"
  | "detailIndex"
  | "detailItem"
  | `section:${SectionId}`;

export interface IslandProps {
  part: IslandPartName;
  lang: Lang;
  role: RoleId;
  pathname: string;
  projectId?: ProjectId;
  collection?: DetailCollection;
  slug?: string;
}
