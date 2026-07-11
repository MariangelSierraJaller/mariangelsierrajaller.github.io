import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

export default function NotFound() {
  const { lang, t } = useLang?.() ?? { lang: "es", t: (k: string) => k };
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl text-primary">404</p>
        <h1 className="mt-4 font-display text-2xl">{t<string>("notFound.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t<string>("notFound.lead")}</p>
        <Link
          to={`/${lang}`}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--color-primary-hover)]"
        >
          {t<string>("notFound.cta")}
        </Link>
      </div>
    </div>
  );
}
