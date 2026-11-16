import { PROJECT_ORDER, PROJECTS_SHARED } from "./projects";

export const PROJECT_LINKS = PROJECT_ORDER.map((id) => ({
  id,
  slug: PROJECTS_SHARED[id].slug,
  kind: PROJECTS_SHARED[id].kind,
}));
