import { CASE_STUDY_IDS, type Lang, type ProjectId } from "@/types/content";
import type { CaseStudyCopy, ProjectPageCopy, ProjectSummaryCopy } from "@/types/project";
import { ES_PROJECT_SUMMARIES } from "./project-summaries/es";
import { EN_PROJECT_SUMMARIES } from "./project-summaries/en";
import { ES_CASE_STUDIES } from "./case-studies/es";
import { EN_CASE_STUDIES } from "./case-studies/en";
import { ES_PROJECT_PAGES } from "./project-pages/es";
import { EN_PROJECT_PAGES } from "./project-pages/en";

export function getProjectSummary(lang: Lang, id: ProjectId): ProjectSummaryCopy {
  const summaries = lang === "en" ? EN_PROJECT_SUMMARIES : ES_PROJECT_SUMMARIES;
  return summaries[id];
}

export function isCaseStudyCopy(
  copy: CaseStudyCopy | ProjectPageCopy,
): copy is CaseStudyCopy {
  return "sections" in copy;
}

export function getProjectCopy(
  lang: Lang,
  id: ProjectId,
): CaseStudyCopy | ProjectPageCopy {
  if ((CASE_STUDY_IDS as readonly string[]).includes(id)) {
    const studies = lang === "en" ? EN_CASE_STUDIES : ES_CASE_STUDIES;
    return studies[id as keyof typeof studies];
  }
  const pages = lang === "en" ? EN_PROJECT_PAGES : ES_PROJECT_PAGES;
  return pages[id as keyof typeof pages];
}

export {
  ES_PROJECT_SUMMARIES,
  EN_PROJECT_SUMMARIES,
  ES_CASE_STUDIES,
  EN_CASE_STUDIES,
  ES_PROJECT_PAGES,
  EN_PROJECT_PAGES,
};