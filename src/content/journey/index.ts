import type { Lang } from "@/types/content";
import type { JourneyCopy } from "@/types/journey";
import { ES_JOURNEY } from "./es";
import { EN_JOURNEY } from "./en";

export function getJourneyCopy(lang: Lang): JourneyCopy {
  return lang === "en" ? EN_JOURNEY : ES_JOURNEY;
}

export { ES_JOURNEY, EN_JOURNEY };