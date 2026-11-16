import type { Lang } from "./content";

export type AssistantTopicId =
  | "profile"
  | "adminRole"
  | "techRole"
  | "erpNetsuite"
  | "biAnalytics"
  | "experience"
  | "education"
  | "certifications"
  | "resume"
  | "contact";

export interface AssistantActionLink {
  label: string;
  href: string;
  kind: "route" | "section" | "external";
}

export interface AssistantTopic {
  id: AssistantTopicId;
  label: string;
  question: string;
  keywords: readonly string[];
  answer: string;
  highlights: readonly string[];
  links: readonly AssistantActionLink[];
}

export interface AssistantKnowledgeBase {
  lang: Lang;
  launcherLabel: string;
  launcherAriaLabel: string;
  title: string;
  subtitle: string;
  greeting: string;
  inputPlaceholder: string;
  sendLabel: string;
  suggestedTitle: string;
  fallbackTitle: string;
  fallbackAnswer: string;
  closeLabel: string;
  clearLabel: string;
  topics: readonly AssistantTopic[];
}

export interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  highlights?: readonly string[];
  links?: readonly AssistantActionLink[];
}
