import type { Lang } from "@/types/content";
import type { AssistantKnowledgeBase } from "@/types/assistant";
import { ES_ASSISTANT_KB } from "./es";
import { EN_ASSISTANT_KB } from "./en";

export { ES_ASSISTANT_KB } from "./es";
export { EN_ASSISTANT_KB } from "./en";

export function getAssistantKb(lang: Lang): AssistantKnowledgeBase {
  return lang === "es" ? ES_ASSISTANT_KB : EN_ASSISTANT_KB;
}
