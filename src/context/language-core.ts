import { createContext, useContext } from "react";

export type Lang = "es" | "en";

export interface LanguageCtx {
  lang: Lang;
  dict: unknown;
  t: <T = string>(path: string) => T;
  setLang: (next: Lang) => void;
  otherLang: Lang;
}

export const LanguageCtx = createContext<LanguageCtx | null>(null);

export function useLang() {
  const ctx = useContext(LanguageCtx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}