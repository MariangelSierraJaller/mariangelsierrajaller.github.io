import { type MouseEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/language-core";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

const sections = ["about", "education", "professional", "experience", "skills", "resume", "testimonials", "contact"] as const;

export default function Navigation() {
  const { lang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname, hash]);

  const handleScrollToSection = (e: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border/70 glass" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to={`/${lang}`} className="group flex items-center gap-2">
          <span
            className="grid h-9 w-9 place-items-center rounded-full bg-primary font-display text-sm text-primary-foreground blue-glow">
            MS
          </span>
          <span className="hidden font-display text-sm tracking-tight text-foreground sm:block">
            Mariangel <span className="text-muted-foreground">· Sierra</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={(e) => handleScrollToSection(e, s)}
              className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t<string>(`nav.${s}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#contact"
            onClick={(e) => handleScrollToSection(e, "contact")}
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-[var(--color-primary-hover)] md:inline-flex"
          >
            {t<string>("nav.cta")}
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border glass md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {sections.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                onClick={(e) => handleScrollToSection(e, s)}
                className="py-2 text-sm text-foreground/90"
              >
                {t<string>(`nav.${s}`)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleScrollToSection(e, "contact")}
              className="mt-3 inline-flex justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              {t<string>("nav.cta")}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}