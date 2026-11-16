import { createSignal, For, Show, type Component } from "solid-js";
import type { EducationId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { EDUCATION_ORDER, EDUCATION_SHARED } from "@/content/shared/education";
import { buildDetailIndexPath, buildDetailItemPath } from "@/lib/paths";
import { Section } from "@/components/layout/Section";
import { ArrowRightIcon, CheckIcon, GraduationCapIcon } from "@/components/ui/icons";

type EducationFilter = "all" | "engineering" | "technical";

const ENGINEERING_IDS = new Set<EducationId>([
  "sanJoseSystems",
  "sanJoseIndustrial",
  "sanJoseSystemsTech",
  "itmBiomedical",
]);

const ASCII_ART = [
  "         _,,,_",
  "       .'     `'.",
  "      /     ____ \\",
  "     |    .'_  _\\/",
  "     /    ) a  a|         .----.",
  "    /    (    > |        /|     '--.",
  "   (      ) ._  /        ||    ]|   `-.",
  "   )    _/-.__.'`\\       ||    ]|    ::|",
  "  (  .-'`-.   \\__ )      ||    ]|    ::|",
  "   `/      `-./  `.      ||    ]|    ::|",
  "  _ |    \\      \\  \\     \\|    ]|   .-'",
  " / \\|     \\   \\  \\  \\     L.__  .--'(",
  "|   |\\     `. /  /   \\  ,---|_      \\---------,",
  "|   `\\'.     '. /`\\   \\/ .--._|=-    |_      /|",
  "|     \\ '.     '._ './`\\/ .-'          '.   / |",
  "|     |   `'.     `;-:-;`)|             |-./  |",
  "|    /_      `'--./_  ` )/'-------------')/)  |",
  "\\   | `\"\"\"\"----\"`\\//`\"\"`/,===..'`````````/ (  |",
  " |  |            / `---` `==='          /   ) |",
  " /  \\           /                      /   (  |",
  "|    '------.  |'--------------------'|     ) |",
  " \\           `-|                      |    /  |",
  "  `--...,______|                      |   (   |",
  "         | |   |                      |    ) ,|",
  "         | |   |                      |   ( /||",
  "         | |   |                      |   )/ `\"",
  "        /   \\  |                      |  (/",
  "  jgs .' /I\\ '.|                      |  /)",
  "   .-'_.'/ \\'. |                      | /",
  "   ```  `\"\"\"` `| .-------------------.||",
  "               `\"`                   `\"`",
].join("\n");

export const AboutSection: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, locked } = useRole();
  const [eduFilter, setEduFilter] = createSignal<EducationFilter>("all");

  const about = () => copy().about;
  const narrative = () => about().roleNarratives[role()];

  const filteredEducation = () => {
    const mode = eduFilter();
    if (mode === "all") return EDUCATION_ORDER;
    if (mode === "engineering") {
      return EDUCATION_ORDER.filter((id) => ENGINEERING_IDS.has(id));
    }
    return EDUCATION_ORDER.filter((id) => !ENGINEERING_IDS.has(id));
  };

  return (
    <Section
      id="about"
      eyebrow={about().eyebrow}
      title={about().title}
      subtitle={about().subtitle}
      surface="base"
    >
      <div class="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div class="space-y-6">
          <div class="relative">
            <div
              aria-hidden="true"
              class="pointer-events-none absolute inset-0 rounded-3xl opacity-25 blur-3xl"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)",
              }}
            />
            <div class="relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/90 p-5 sm:p-6 hover-glow">
              <pre
                aria-hidden="true"
                class="overflow-x-auto whitespace-pre font-mono text-[10px] leading-tight text-[var(--color-accent)] sm:text-xs"
              >
                {ASCII_ART}
              </pre>
              <p class="mt-4 text-center font-display text-base italic text-[var(--color-fg)]">
                “{narrative().subheading}”
              </p>
              <p class="mt-1 text-center font-mono text-xs text-[var(--color-fg-subtle)]">
                {about().terminalCaption}
              </p>
            </div>
          </div>

          <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
            <For each={narrative().stats}>
              {(stat) => (
                <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center hover-glow">
                  <p class="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
                    {stat.label}
                  </p>
                  <p class="mt-1.5 font-display text-xl text-[var(--color-fg)]">{stat.value}</p>
                </div>
              )}
            </For>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <h3 class="font-display text-2xl text-[var(--color-fg)] sm:text-3xl">
              {narrative().heading}
            </h3>
            <p class="mt-1 font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              {narrative().subheading}
            </p>
          </div>

          <div class="space-y-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
            <For each={narrative().paragraphs}>{(paragraph) => <p>{paragraph}</p>}</For>
          </div>

          <div class="flex flex-wrap gap-2">
            <For each={narrative().targetRoles}>
              {(targetRole) => <span class="tech-badge">{targetRole}</span>}
            </For>
          </div>
        </div>
      </div>

      {/* Value Pillars */}
      <div class="mt-14">
        <h3 class="font-display text-2xl text-[var(--color-fg)]">{about().pillarsTitle}</h3>
        <div class="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <For each={about().pillars}>
            {(pillar) => (
              <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
                <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <CheckIcon size={18} />
                </span>
                <h4 class="mt-4 font-display text-xl text-[var(--color-fg)]">{pillar.title}</h4>
                <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {pillar.description}
                </p>
              </div>
            )}
          </For>
        </div>
      </div>

      {/* Integrated Education Block linking to /[lang]/education/[slug] */}
      <div id="education" class="mt-16 border-t border-[var(--color-border)] pt-12">
        <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h3 class="font-display text-2xl text-[var(--color-fg)] sm:text-3xl">
              {about().educationTitle}
            </h3>
            <p class="mt-2 text-sm text-[var(--color-fg-muted)]">{about().educationSubtitle}</p>
          </div>
          <a
            href={buildDetailIndexPath(lang(), "education", role(), locked())}
            class="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
          >
            <span>{about().viewAllEducationLabel}</span>
            <ArrowRightIcon size={14} />
          </a>
        </div>

        <div class="mt-6 flex flex-wrap gap-2">
          <For
            each={[
              {
                id: "all" as const,
                label: lang() === "es" ? "Todos" : "All",
              },
              {
                id: "engineering" as const,
                label: lang() === "es" ? "Ingenierías y Tecnología" : "Engineering & Tech",
              },
              {
                id: "technical" as const,
                label: lang() === "es" ? "Formación Técnica" : "Technical Foundations",
              },
            ]}
          >
            {(tab) => (
              <button
                type="button"
                aria-pressed={eduFilter() === tab.id}
                onClick={() => setEduFilter(tab.id)}
                class={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  eduFilter() === tab.id
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                }`}
              >
                {tab.label}
              </button>
            )}
          </For>
        </div>

        <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <For each={filteredEducation()}>
            {(eduId) => {
              const shared = EDUCATION_SHARED[eduId];
              const itemCopy = () => copy().education[eduId];
              const href = () =>
                buildDetailItemPath(lang(), "education", shared.slug, role(), locked());
              const progressPct = shared.inProgress ? "58%" : "100%";

              return (
                <article class="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
                  <div>
                    <div class="flex items-start justify-between gap-3">
                      <span class="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-primary)]">
                        <GraduationCapIcon size={17} />
                      </span>
                      <Show
                        when={shared.inProgress}
                        fallback={
                          <span class="rounded-full border border-[var(--color-success)]/40 bg-[var(--color-bg)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--color-success)]">
                            {shared.endYear === 2026
                              ? lang() === "es"
                                ? "Titulada Jul 2026"
                                : "Graduated Jul 2026"
                              : lang() === "es"
                                ? "Completado"
                                : "Completed"}
                          </span>
                        }
                      >
                        <span class="rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary-soft)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--color-accent)]">
                          {about().inProgressLabel}
                        </span>
                      </Show>
                    </div>
                    <h4 class="mt-4 font-display text-xl text-[var(--color-fg)]">
                      {itemCopy().degree}
                    </h4>
                    <p class="mt-1 text-sm text-[var(--color-fg-muted)]">{shared.institution}</p>
                    <p class="mt-1.5 font-mono text-xs text-[var(--color-accent)]">
                      {shared.period}
                    </p>
                    <div class="mt-3 h-1 overflow-hidden rounded-full bg-[var(--color-surface-raised)]">
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                        style={{ width: progressPct }}
                      />
                    </div>
                    <p class="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {itemCopy().summary}
                    </p>
                    <div class="mt-4 flex flex-wrap gap-1.5">
                      <For each={itemCopy().badges}>
                        {(badge) => <span class="tech-badge">{badge}</span>}
                      </For>
                    </div>
                  </div>
                  <div class="mt-5 border-t border-[var(--color-border)] pt-3">
                    <a
                      href={href()}
                      class="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                    >
                      <span>{about().viewDetailsLabel}</span>
                      <ArrowRightIcon size={13} />
                    </a>
                  </div>
                </article>
              );
            }}
          </For>
        </div>
      </div>
    </Section>
  );
};
