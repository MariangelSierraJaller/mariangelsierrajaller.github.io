import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import es from "@/i18n/es.json";
import en from "@/i18n/en.json";

export type Lang = "es" | "en";
type Dict = typeof es;

const DICTS: Record<Lang, Dict> = { es, en: en as Dict };

interface LanguageCtx {
  lang: Lang;
  dict: Dict;
  t: <T = string>(path: string) => T;
  setLang: (next: Lang) => void;
  otherLang: Lang;
}

const Ctx = createContext<LanguageCtx | null>(null);

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

  const value = useMemo<LanguageCtx>(
    () => ({ lang, dict, t, setLang, otherLang: lang === "es" ? "en" : "es" }),
    [lang, dict, t, setLang],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
