import { motion } from "framer-motion";
import { ArrowDownRight, Sparkles, FileText } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useProfile } from "@/context/ProfileContext";
import portrait from "@/assets/portrait.jpg";
import heroBg from "@/assets/hero-bg.jpg";

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
      {/* Ambient background — Rojo Santino waves */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-70 [filter:blur(2px)_saturate(115%)]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute right-[-10%] top-[-10%] h-[700px] w-[700px] rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_100%,rgba(139,30,40,0.18),transparent_60%)]" />
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
              <div key={m.label} className="rounded-2xl border border-border bg-card/60 p-4 hover-glow">
                <div className="font-display text-3xl text-primary">{m.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: portrait — framed hexagon composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          {/* Ambient aurora glow behind frame */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/45 blur-[110px]" />
            <div className="absolute left-1/3 top-2/3 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[80px]" />
          </div>

          {/* Floating decorative hex marks */}
          <div aria-hidden className="pointer-events-none absolute -right-2 -top-4 h-6 w-6 rotate-45 border border-primary/50 bg-primary/10 backdrop-blur-sm" />
          <div aria-hidden className="pointer-events-none absolute -left-2 bottom-8 h-4 w-4 rotate-45 border border-primary/40 bg-primary/10" />

          {/* Hexagon frame */}
          <div className="relative mx-auto aspect-square w-full max-w-[440px]">
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-primary/25"
            />
            <div
              className="absolute inset-3 santino-glow"
              style={{
                clipPath:
                  "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
                background:
                  "linear-gradient(135deg, color-mix(in oklab, var(--color-primary) 60%, transparent), color-mix(in oklab, var(--color-primary) 15%, transparent))",
              }}
            />
            <div
              className="absolute inset-4 overflow-hidden bg-card"
              style={{
                clipPath:
                  "polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)",
              }}
            >
              <img
                src={portrait}
                alt={t<string>("hero.name")}
                className="h-full w-full object-cover object-center"
              />
              {/* Subtle vignette blending into background */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_55%,rgba(10,10,12,0.55)_100%)]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
