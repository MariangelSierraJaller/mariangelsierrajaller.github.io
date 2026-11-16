import type { Lang } from "@/types/content";
import type { ProjectLinksCopy } from "@/types/project";

export const ES_PROJECT_LINKS: ProjectLinksCopy = {
  backToPortfolio: "Volver al inicio",
  backToProjects: "Volver al índice de proyectos",
  projectsIndexTitle: "Proyectos & Casos de Estudio",
  projectsIndexSubtitle:
    "Soluciones reales en operación corporativa: integración ERP Oracle NetSuite, pipelines ETL en Python, Business Intelligence financiero y fundamentos de ingeniería.",
  caseStudyBadge: "Caso de Estudio",
  projectPageBadge: "Página de Proyecto",
  stackLabel: "Tecnologías & Enfoque",
  periodLabel: "Período & Estado",
  relatedTitle: "Proyectos y Casos Relacionados",
  previousLabel: "Proyecto anterior",
  nextLabel: "Proyecto siguiente",
  discussCta: "Conversar sobre este proyecto",
};

export const EN_PROJECT_LINKS: ProjectLinksCopy = {
  backToPortfolio: "Back to home",
  backToProjects: "Back to projects index",
  projectsIndexTitle: "Projects & Case Studies",
  projectsIndexSubtitle:
    "Real-world enterprise solutions: Oracle NetSuite ERP integration, Python ETL pipelines, financial Business Intelligence, and engineering foundations.",
  caseStudyBadge: "Case Study",
  projectPageBadge: "Project Page",
  stackLabel: "Technologies & Focus",
  periodLabel: "Timeline & Status",
  relatedTitle: "Related Projects & Case Studies",
  previousLabel: "Previous project",
  nextLabel: "Next project",
  discussCta: "Discuss this project",
};

export function getProjectLinksCopy(lang: Lang): ProjectLinksCopy {
  return lang === "en" ? EN_PROJECT_LINKS : ES_PROJECT_LINKS;
}