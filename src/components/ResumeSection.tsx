import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import SectionHeader from "@/components/SectionHeader";
import { cn } from "@/lib/utils";

import esTech from "@/assets/cv/es-tech.webp";
import esAdmin from "@/assets/cv/es-adm.webp";
import esAts from "@/assets/cv/es-ats.webp";
import enTech from "@/assets/cv/en-tech.webp";
import enAdmin from "@/assets/cv/en-adm.webp";
import enAts from "@/assets/cv/en-ats.webp";

type TabKey = "cv" | "ats";

interface Resource {
  images: string[];
  href: string;
}

const CV: Record<"es" | "en", Record<"admin" | "tech", Resource>> = {
  es: {
    tech: { images: [esTech], href: "https://drive.google.com/file/d/1OWA93tgQtcabkJYC8LISy9qShLIDgNk8/view" },
    admin: { images: [esAdmin], href: "https://drive.google.com/file/d/1rggK0scQvTxG71sDdzbv2ie9blgrIVgG/view" },
  },
  en: {
    tech: { images: [enTech], href: "https://drive.google.com/file/d/1OWA93tgQtcabkJYC8LISy9qShLIDgNk8/view" },
    admin: { images: [enAdmin], href: "https://drive.google.com/file/d/1rggK0scQvTxG71sDdzbv2ie9blgrIVgG/view" },
  },
};

const ATS: Record<"es" | "en", Resource> = {
  es: { images: [esAts], href: "https://drive.google.com/file/d/1bFPpW88swSBc-_rvbQDT7pS0a7f8yMe9/view" },
  en: { images: [enAts], href: "https://drive.google.com/file/d/1bFPpW88swSBc-_rvbQDT7pS0a7f8yMe9/view" },
};

export default function ResumeSection() {
  const { t, lang } = useLang();
  const { profile } = useProfile();
  const [tab, setTab] = useState<TabKey>("cv");

  const resource = useMemo<Resource>(
    () => (tab === "cv" ? CV[lang][profile] : ATS[lang]),
    [tab, lang, profile],
  );

  // Preload all resume images once so tab/lang/profile swaps feel instant.
  useEffect(() => {
    const all = [
      ...Object.values(CV).flatMap((p) => Object.values(p).flatMap((r) => r.images)),
      ...Object.values(ATS).flatMap((r) => r.images),
    ];
    all.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "cv", label: t<string>("resume.tabs.cv") },
    { key: "ats", label: t<string>("resume.tabs.ats") },
  ];

  return (
    <section id="resume" className="border-t border-border/60 scroll-mt-32">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionHeader kicker={t<string>("resume.kicker")} title={t<string>("resume.title")} />
        <p className="mt-4 max-w-xl text-muted-foreground">{t<string>("resume.subtitle")}</p>

        {/* Tabs — centered */}
        <div className="mt-10 flex justify-center">
          <div
            role="tablist"
            className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 p-1"
          >
            {tabs.map((tt) => {
              const active = tab === tt.key;
              return (
                <button
                  key={tt.key}
                  role="tab"
                  aria-selected={active}
                  aria-label={`Ver formato ${tt.label}`}
                  onClick={() => setTab(tt.key)}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-sm font-medium transition-colors",
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
        </div>

        {/* Viewer */}
        <div className="mt-10 flex flex-col items-center">
          <a
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="group relative block w-full max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={lang + tab + profile}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-2"
              >
                {resource.images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${tab === "cv" ? "CV" : "ATS"} ${profile} ${lang} — página ${i + 1}`}
                    loading="lazy"
                    decoding="async"
                    width={816}
                    height={1056}
                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-background/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground santino-glow">
                <Eye size={16} />
                {t<string>("resume.viewFullCta")}
              </span>
            </div>
          </a>

          <a
            href={resource.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-[var(--color-primary-hover)] santino-glow"
          >
            <Download size={16} />
            {t<string>("resume.downloadCta")}
          </a>
        </div>
      </div>
    </section>
  );
}
