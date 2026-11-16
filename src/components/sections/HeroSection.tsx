import { For, type Component } from "solid-js";
import { ROLE_IDS } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { PROFILE } from "@/content/shared/profile";
import { withBase } from "@/lib/base";
import { buildHomePath, withRoleQuery } from "@/lib/paths";
import {
  ArrowRightIcon,
  FileTextIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { TechList } from "@/components/ui/TechList";

export const HeroSection: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, config, locked } = useRole();

  const hero = () => copy().hero[role()];

  return (
    <section
      id="hero"
      class="relative isolate overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20"
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
          <div class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/80 px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
            <SparklesIcon size={14} class="text-[var(--color-primary)]" />
            <span>{hero().badge}</span>
          </div>

          <h1 class="mt-6 font-display text-4xl leading-[1.06] text-[var(--color-fg)] sm:text-5xl lg:text-6xl">
            {hero().headline}{" "}
            <span class="text-gradient italic">{hero().accentWord}</span>
          </h1>

          <p class="mt-4 font-display text-xl text-[var(--color-fg-muted)] sm:text-2xl">
            {hero().titleLine}
          </p>

          <p class="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
            {hero().subtitle}
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              class="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] blue-glow transition hover:bg-[var(--color-primary-hover)]"
            >
              <span>{hero().primaryCta}</span>
              <ArrowRightIcon size={16} />
            </a>
            <a
              href="#resume"
              class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-5 py-3 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              <FileTextIcon size={16} />
              <span>{hero().secondaryCta}</span>
            </a>
            <a
              href="#contact"
              class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]/60 px-5 py-3 text-sm font-medium text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
            >
              <span>{hero().tertiaryCta}</span>
            </a>
          </div>

          {/* Quick Role Focus Cards (hidden when ?locked=true) */}
          <div data-role-switcher class="mt-8 grid max-w-xl grid-cols-3 gap-2">
            <For each={ROLE_IDS}>
              {(r) => {
                const active = () => role() === r;
                return (
                  <a
                    href={withRoleQuery(buildHomePath(lang(), r), undefined, locked())}
                    aria-current={active() ? "page" : undefined}
                    class={`rounded-xl border px-3 py-2 text-left transition ${
                      active()
                        ? "border-[var(--color-primary)] bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)]/70 text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    <p class="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
                      {copy().ui.roleLabels[r].short}
                    </p>
                    <p class="mt-0.5 line-clamp-1 text-xs">{copy().ui.roleLabels[r].full}</p>
                  </a>
                );
              }}
            </For>
          </div>

          <div class="mt-7">
            <TechList items={config().topStack} />
          </div>
        </div>

        {/* Hexagonal Portrait Frame */}
        <div class="relative mx-auto w-full max-w-[380px] lg:max-w-[420px]">
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
                  sizes="(max-width: 640px) 320px, 420px"
                  type="image/avif"
                />
                <source
                  srcset={`${withBase("/images/portrait-400.webp")} 400w, ${withBase("/images/portrait-800.webp")} 800w`}
                  sizes="(max-width: 640px) 320px, 420px"
                  type="image/webp"
                />
                <img
                  src={withBase("/images/portrait-800.jpg")}
                  alt={PROFILE.fullName}
                  width={420}
                  height={420}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  class="h-full w-full object-cover object-center"
                />
              </picture>
              <div
                aria-hidden="true"
                class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/60 via-transparent to-transparent"
              />
            </div>

            {/* Floating Identity Credential Badges */}
            <div class="pointer-events-none absolute -top-2 right-0 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/95 px-3 py-1 font-mono text-[11px] text-[var(--color-accent)] shadow-lg backdrop-blur">
              ASPAEN · Medellín, CO
            </div>
            <div class="pointer-events-none absolute -bottom-2 left-0 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)]/95 px-3 py-1 font-mono text-[11px] text-[var(--color-fg)] shadow-lg backdrop-blur">
              {lang() === "es"
                ? "NetSuite · Python · Power BI"
                : "NetSuite · Python · Power BI"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
