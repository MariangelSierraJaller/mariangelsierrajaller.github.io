import type { Lang, LanguageCopy } from "@/types/content";
import { ES_COPY } from "./es";
import { EN_COPY } from "./en";

export function getLanguageCopy(lang: Lang): LanguageCopy {
  return lang === "en" ? EN_COPY : ES_COPY;
}

export function getAllLanguageCopy(): Record<Lang, LanguageCopy> {
  return { es: ES_COPY, en: EN_COPY };
}
