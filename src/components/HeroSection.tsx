import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles, FileText } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import portrait from "@/assets/portrait-transparent.png";

interface Metric {
  value: string;
  label: string;
}

export default function HeroSection() {
  const { t } = useLang();
  const { profile } = useProfile();
  const chips = t<string[]>("hero.chips");
  const metrics = t<Metric[]>("hero.metrics");
  const primaryTitle = profile === "admin" ? t<string>("hero.titleAdmin") : t<string>("hero.titleTech");
  const secondaryTitle = profile === "admin" ? t<string>("hero.titleTech") : t<string>("hero.titleAdmin");

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(139,30,40,0.15),transparent_60%)]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles size={12} className="text-primary" />
            {t<string>("hero.eyebrow")}
          </span>

          <h1 className="mt-8 font-display text-5xl leading-[1.02] text-balance sm:text-6xl lg:text-[5rem]">
            {t<string>("hero.name").split(" ").slice(0, -1).join(" ")}{" "}
            <span className="gradient-text italic">
              {t<string>("hero.name").split(" ").slice(-1)}
            </span>
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

          <p className="mt-6 max-w-xl text-base text-muted-foreground text-balance sm:text-lg">
            {t<string>("hero.tagline")}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-[var(--color-primary-hover)] santino-glow"
            >
              {t<string>("hero.ctaPrimary")}
              <ArrowDownRight size={16} />
            </a>
            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <FileText size={14} />
              {t<string>("hero.ctaSecondary")}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <span key={c} className="tech-badge">
                {c}
              </span>
            ))}
          </div>

          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-border bg-card/60 p-4">
                <div className="font-display text-3xl text-primary">{m.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 blur-[90px]" />
          </div>
          <div className="absolute inset-0 -z-10 rounded-full border border-primary/20" />
          <img
            src={portrait}
            alt={t<string>("hero.name")}
            className="relative z-10 mx-auto h-auto w-full max-w-[440px] object-contain drop-shadow-[0_30px_60px_rgba(139,30,40,0.35)]"
          />
          <motion.div
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute inset-6 -z-10 rounded-full border border-dashed border-primary/25"
          />
        </motion.div>
      </div>
    </section>
  );
}
