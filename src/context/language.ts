import { createContext, useContext, type Accessor } from "solid-js";
import type { Lang, LanguageCopy } from "@/types/content";

export interface LanguageContextValue {
  lang: Accessor<Lang>;
  copy: Accessor<LanguageCopy>;
}

export const LanguageContext = createContext<LanguageContextValue>();

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}
