import { createMemo, type ParentComponent } from "solid-js";
import type { Lang } from "@/types/content";
import { getLanguageCopy } from "@/content";
import { LanguageContext } from "./language";

export interface LanguageProviderProps {
  lang: Lang;
}

export const LanguageProvider: ParentComponent<LanguageProviderProps> = (props) => {
  const lang = () => props.lang;
  const copy = createMemo(() => getLanguageCopy(props.lang));

  return (
    <LanguageContext.Provider value={{ lang, copy }}>
      {props.children}
    </LanguageContext.Provider>
  );
};
