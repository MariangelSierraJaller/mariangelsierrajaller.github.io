import type { RoleId, SectionId, SkillGroupId } from "@/types/content";
import type { ProjectShared } from "@/types/project";
import { getRoleConfig } from "@/content/roles";
import { PROJECT_ORDER, PROJECTS_SHARED } from "@/content/shared/projects";

export function orderedSectionsForRole(role: RoleId): readonly SectionId[] {
  return getRoleConfig(role).sectionOrder;
}

export function orderedSkillGroupsForRole(role: RoleId): readonly SkillGroupId[] {
  return getRoleConfig(role).skillGroupOrder;
}

export function orderedProjectsForRole(role: RoleId): readonly ProjectShared[] {
  const featured = getRoleConfig(role).featuredProject;
  return [...PROJECT_ORDER]
    .map((id) => PROJECTS_SHARED[id])
    .sort((a, b) => {
      if (a.id === featured) return -1;
      if (b.id === featured) return 1;
      const aMatch = role === "general" || a.roleAffinity === role || a.roleAffinity === "both";
      const bMatch = role === "general" || b.roleAffinity === role || b.roleAffinity === "both";
      if (aMatch !== bMatch) return aMatch ? -1 : 1;
      return 0;
    });
}
