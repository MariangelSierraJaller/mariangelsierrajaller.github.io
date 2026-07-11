import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

import esTech from "@/assets/cv/es-tech.webp";
import esAdmin from "@/assets/cv/es-adm.webp";
import esAts from "@/assets/cv/es-ats.webp";
import enTech from "@/assets/cv/en-tech.webp";
import enAdmin from "@/assets/cv/en-adm.webp";
import enAts from "@/assets/cv/en-ats.webp";

type TabKey = "tech" | "admin" | "ats";

interface Resource {
  image: string;
  href: string;
}

const RESOURCES: Record<"es" | "en", Record<TabKey, Resource>> = {
  es: {
    tech: {
      image: esTech,
      href: "https://drive.google.com/file/d/1OWA93tgQtcabkJYC8LISy9qShLIDgNk8/view",
    },
    admin: {
      image: esAdmin,
      href: "https://drive.google.com/file/d/1rggK0scQvTxG71sDdzbv2ie9blgrIVgG/view",
    },
    ats: {
      image: esAts,
      href: "https://drive.google.com/file/d/1bFPpW88swSBc-_rvbQDT7pS0a7f8yMe9/view",
    },
  },
  en: {
    tech: {
      image: enTech,
      href: "https://drive.google.com/file/d/1OWA93tgQtcabkJYC8LISy9qShLIDgNk8/view",
    },
    admin: {
      image: enAdmin,
      href: "https://drive.google.com/file/d/1rggK0scQvTxG71sDdzbv2ie9blgrIVgG/view",
    },
    ats: {
      image: enAts,
      href: "https://drive.google.com/file/d/1bFPpW88swSBc-_rvbQDT7pS0a7f8yMe9/view",
    },
  },
};

export default function ResumeSection() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState<TabKey>("tech");
  const resource = useMemo(() => RESOURCES[lang][tab], [lang, tab]);
  const tabs: { key: TabKey; label: string }[] = [
    { key: "tech", label: t<string>("resume.tabs.tech") },
    { key: "admin", label: t<string>("resume.tabs.admin") },
    { key: "ats", label: t<string>("resume.tabs.ats") },
  ];

  return (
    <section id="resume" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("resume.kicker")} title={t<string>("resume.title")} />
        <p className="mt-4 max-w-xl text-muted-foreground">{t<string>("resume.subtitle")}</p>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap items-center gap-2 rounded-full border border-border bg-secondary/40 p-1 md:inline-flex">
          {tabs.map((tt) => {
            const active = tab === tt.key;
            return (
              <button
                key={tt.key}
                onClick={() => setTab(tt.key)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="resume-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-primary santino-glow"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {tt.label}
              </button>
            );
          })}
        </div>

        {/* Viewer */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-2 sm:p-4">
            <AnimatePresence mode="wait">
              <motion.img
                key={lang + tab}
                src={resource.image}
                alt={`CV ${tab} ${lang}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="mx-auto h-auto w-full max-w-3xl rounded-lg shadow-2xl"
              />
            </AnimatePresence>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card/60 p-6">
            <div>
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-primary">
                <FileText size={18} />
              </div>
              <h3 className="mt-4 font-display text-2xl text-foreground">
                {tabs.find((x) => x.key === tab)?.label}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {lang === "es" ? "Español" : "English"} · PDF
              </p>
            </div>
            <a
              href={resource.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-[var(--color-primary-hover)] santino-glow"
            >
              {t<string>("resume.viewCta")}
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
