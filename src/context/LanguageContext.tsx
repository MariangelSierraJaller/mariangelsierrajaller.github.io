import { useCallback, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { LanguageCtx, type Lang, useLang } from "@/context/language-core";
import es from "@/i18n/es.json";
import en from "@/i18n/en.json";

type Dict = typeof es;

const DICTS: Record<Lang, Dict> = { es, en: en as Dict };

function resolve<T>(obj: unknown, path: string): T {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj) as T;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { lang: param } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const lang: Lang = param === "en" ? "en" : "es";
  const dict = DICTS[lang];

  const t = useCallback(
    <T,>(path: string) => {
      const value = resolve<T>(dict, path);
      if (value === undefined) {
        // eslint-disable-next-line no-console
        console.warn(`[i18n] missing key: ${path} (${lang})`);
        return path as unknown as T;
      }
      return value;
    },
    [dict, lang],
  );

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      const rest = location.pathname.replace(/^\/(es|en)/, "");
      navigate(`/${next}${rest}${location.search}${location.hash}`, { replace: false });
    },
    [lang, location.hash, location.pathname, location.search, navigate],
  );

  const otherLang: Lang = lang === "es" ? "en" : "es";

  const value = useMemo(
    () => ({ lang, dict, t, setLang, otherLang }),
    [lang, dict, t, setLang, otherLang],
  );

  return <LanguageCtx.Provider value={value}>{children}</LanguageCtx.Provider>;
}

export { useLang, type Lang };
