import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-xs text-muted-foreground sm:flex-row">
        <p>
          © {year} Mariangel Sierra Jaller. {t<string>("footer.rights")}
        </p>
        <p className="font-display italic">{t<string>("footer.built")}</p>
      </div>
    </footer>
  );
}
