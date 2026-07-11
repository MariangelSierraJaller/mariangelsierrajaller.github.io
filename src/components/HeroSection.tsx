import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";

export default function HeroSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const chips = t<string[]>("hero.chips");
  const primaryTitle = profile === "admin" ? t<string>("hero.titleAdmin") : t<string>("hero.titleTech");
  const secondaryTitle = profile === "admin" ? t<string>("hero.titleTech") : t<string>("hero.titleAdmin");

  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,30,40,0.18),transparent_60%)]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles size={12} className="text-primary" />
            {t<string>("hero.eyebrow")}
          </span>

          <h1 className="mt-8 font-display text-5xl leading-[1.05] text-balance sm:text-6xl md:text-7xl">
            {t<string>("hero.name")}
          </h1>

          <p className="mt-6 font-display text-xl text-muted-foreground sm:text-2xl">
            <motion.span
              key={primaryTitle}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-foreground"
            >
              {primaryTitle}
            </motion.span>
            <span className="mx-2 text-primary">·</span>
            <span className="italic">{secondaryTitle}</span>
          </p>

          <p className="mx-auto mt-8 max-w-xl text-base text-muted-foreground text-balance sm:text-lg">
            {t<string>("hero.tagline")}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-[var(--color-primary-hover)] santino-glow"
            >
              {t<string>("hero.ctaPrimary")}
              <ArrowDownRight size={16} />
            </a>
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {t<string>("hero.ctaSecondary")}
            </a>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
            {chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
