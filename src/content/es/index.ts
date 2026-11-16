import type { LanguageCopy } from "@/types/content";
import { ES_UI, ES_SEO } from "./common";
import { ES_HERO, ES_HIGHLIGHTS } from "./hero";
import { ES_ABOUT, ES_EDUCATION } from "./about";
import { ES_EXPERIENCE } from "./experience";
import { ES_PROJECTS } from "./projects";
import { ES_SKILLS } from "./skills";
import { ES_SERVICES } from "./services";
import { ES_CERTIFICATIONS } from "./certifications";
import { ES_TESTIMONIALS } from "./testimonials";
import { ES_RESUME } from "./resume";
import { ES_METRICS } from "./metrics";
import { ES_CONTACT } from "./contact";

export const ES_COPY: LanguageCopy = {
  lang: "es",
  htmlLang: "es-CO",
  locale: "es_CO",
  ui: ES_UI,
  seo: ES_SEO,
  hero: ES_HERO,
  highlights: ES_HIGHLIGHTS,
  about: ES_ABOUT,
  education: ES_EDUCATION,
  experience: ES_EXPERIENCE,
  projects: ES_PROJECTS,
  skills: ES_SKILLS,
  services: ES_SERVICES,
  certifications: ES_CERTIFICATIONS,
  testimonials: ES_TESTIMONIALS,
  resume: ES_RESUME,
  metrics: ES_METRICS,
  contact: ES_CONTACT,
};

export * from "./common";
export * from "./hero";
export * from "./about";
export * from "./experience";
export * from "./projects";
export * from "./skills";
export * from "./services";
export * from "./certifications";
export * from "./testimonials";
export * from "./resume";
export * from "./metrics";
export * from "./contact";
