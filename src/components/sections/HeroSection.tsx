import { type Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { getRoleTopStack } from "@/content/roles";
import { PROFILE } from "@/content/shared/profile";
import { withBase } from "@/lib/base";
import {
  ArrowRightIcon,
  FileTextIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { TechList } from "@/components/ui/TechList";

export const HeroSection: Component = () => {
  const { lang, copy } = useLanguage();
  const { role } = useRole();

  const hero = () => copy().hero[role()];

  return (
    <section
      id="hero"
      class="relative isolate overflow-hidden pt-10 pb-12 sm:pt-14 sm:pb-16 lg:pt-16"
    >
      {/* Ambient backdrop derived from existing hero-bg.jpg + Charcoal/Azure gradient */}
      <div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          class="absolute inset-0 scale-105 bg-cover bg-center opacity-20 blur-[6px]"
          style={{ "background-image": `url(${withBase("/images/hero-bg.jpg")})` }}
        />
        <div
          class="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(19,22,34,0.75) 0%, rgba(19,22,34,0.88) 55%, var(--color-bg) 100%)",
          }}
        />
        <div
          class="absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-[110px]"
          style={{
            background: "radial-gradient(circle, var(--color-primary) 0%, transparent 70%)",
          }}
        />
      </div>

      <div class="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div class="inline-flex max-w-full items-center gap-2 rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)]/80 px-3.5 py-1.5 font-mono text-xs leading-snug uppercase tracking-wider text-[var(--color-accent)] sm:rounded-full">
            <SparklesIcon size={14} class="shrink-0 text-[var(--color-primary)]" />
            <span>{hero().badge}</span>
          </div>

          <h1 class="mt-5 font-display text-[2rem] leading-[1.14] text-[var(--color-fg)] sm:text-5xl lg:text-[3.1rem]">
            {hero().headline}{" "}
            <span class="text-gradient italic">{hero().accentWord}</span>
          </h1>

          <p class="mt-4 font-display text-xl leading-snug text-[var(--color-fg-muted)] sm:text-2xl">
            {hero().titleLine}
          </p>

          <p class="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
            {hero().subtitle}
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              class="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] blue-glow transition hover:bg-[var(--color-primary-hover)]"
            >
              <span>{hero().primaryCta}</span>
              <ArrowRightIcon size={16} />
            </a>
            <a
              href="#resume"
              class="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-5 py-3 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              <FileTextIcon size={16} />
              <span>{hero().secondaryCta}</span>
            </a>
            <a
              href="#contact"
              class="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]/60 px-5 py-3 text-sm font-medium text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
            >
              <span>{hero().tertiaryCta}</span>
            </a>
          </div>

          <div class="mt-8">
            <TechList items={getRoleTopStack(role(), lang())} />
          </div>
        </div>

        {/* Hexagonal Portrait Frame */}
        <div class="relative mx-auto w-full max-w-[360px] lg:max-w-[400px]">
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-4 rounded-full opacity-35 blur-[80px]"
            style={{ background: "var(--color-primary)" }}
          />
          <div class="relative mx-auto aspect-square w-full">
            <div
              aria-hidden="true"
              class="animate-slow-spin absolute inset-0 rounded-full border border-dashed border-[var(--color-border-strong)]/60"
            />
            <div
              aria-hidden="true"
              class="hex-frame blue-glow absolute inset-3"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-surface-raised) 100%)",
              }}
            />
            <div class="hex-frame absolute inset-4 overflow-hidden bg-[var(--color-surface)]">
              <picture>
                <source
                  srcset={`${withBase("/images/portrait-400.avif")} 400w, ${withBase("/images/portrait-800.avif")} 800w`}
                  sizes="(max-width: 640px) 320px, 400px"
                  type="image/avif"
                />
                <source
                  srcset={`${withBase("/images/portrait-400.webp")} 400w, ${withBase("/images/portrait-800.webp")} 800w`}
                  sizes="(max-width: 640px) 320px, 400px"
                  type="image/webp"
                />
                <img
                  src={withBase("/images/portrait-800.jpg")}
                  alt={PROFILE.fullName}
                  width={400}
                  height={400}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  class="h-full w-full object-cover object-center"
                />
              </picture>
              <div
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/55 via-transparent to-transparent"
              />
            </div>
          </div>

          {/* Identity Credential Strip (cleanly positioned below portrait to avoid overlap) */}
          <div class="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span class="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/95 px-3 py-1 font-mono text-[11px] text-[var(--color-accent)] shadow-sm">
              ASPAEN · Medellín, CO
            </span>
            <span class="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/95 px-3 py-1 font-mono text-[11px] text-[var(--color-fg)] shadow-sm">
              NetSuite · Python · Power BI
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
