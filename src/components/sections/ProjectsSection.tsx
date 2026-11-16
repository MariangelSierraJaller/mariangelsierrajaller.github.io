import { createSignal, For, Show, type Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { getRoleConfig } from "@/content/roles";
import { getProjectSummary } from "@/content/project-copy";
import { orderedProjectsForRole } from "@/lib/role-view";
import { buildProjectPath, buildProjectsIndexPath } from "@/lib/paths";
import { Section } from "@/components/layout/Section";
import { TechList } from "@/components/ui/TechList";
import { ArrowRightIcon, LayersIcon } from "@/components/ui/icons";

type FilterMode = "all" | "admin" | "tech";

export const ProjectsSection: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, locked } = useRole();
  const [filter, setFilter] = createSignal<FilterMode>("all");

  const projCopy = () => copy().projects;
  const featuredId = () => getRoleConfig(role()).featuredProject;

  const filteredProjects = () => {
    const all = orderedProjectsForRole(role());
    const f = filter();
    if (f === "all") return all;
    return all.filter((p) => p.roleAffinity === f || p.roleAffinity === "both");
  };

  const featuredShared = () => orderedProjectsForRole(role())[0];
  const featuredSummary = () => getProjectSummary(lang(), featuredShared().id);

  return (
    <Section
      id="projects"
      eyebrow={projCopy().eyebrow}
      title={projCopy().title}
      subtitle={projCopy().subtitle}
      surface="base"
    >
      {/* Featured Case Study Spotlight */}
      <article class="mb-10 rounded-3xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-6 sm:p-8 hover-glow">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="rounded-full bg-[var(--color-primary)] px-3 py-1 font-mono text-xs font-semibold text-[var(--color-on-primary)]">
              {projCopy().featuredLabel}
            </span>
            <span class="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3 py-1 font-mono text-xs text-[var(--color-accent)]">
              {featuredShared().kind === "case-study"
                ? projCopy().caseStudyBadge
                : projCopy().projectPageBadge}
            </span>
          </div>
          <span class="font-mono text-xs text-[var(--color-fg-subtle)]">
            {featuredShared().period}
          </span>
        </div>

        <div class="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
          <div>
            <h3 class="font-display text-2xl text-[var(--color-fg)] sm:text-3xl">
              {featuredSummary().title}
            </h3>
            <p class="mt-2 text-base font-medium text-[var(--color-primary)]">
              {featuredSummary().subtitle}
            </p>
            <p class="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)] sm:text-base">
              {featuredSummary().summary}
            </p>
            <div class="mt-5">
              <TechList items={featuredShared().stack} />
            </div>
          </div>

          <div class="flex flex-col justify-between gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/80 p-5">
            <div>
              <p class="font-display text-3xl text-[var(--color-accent)]">
                {featuredSummary().impactMetric.value}
              </p>
              <p class="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">
                {featuredSummary().impactMetric.label}
              </p>
            </div>
            <a
              href={buildProjectPath(lang(), featuredShared().slug, role(), locked())}
              class="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] transition hover:bg-[var(--color-primary-hover)]"
            >
              <span>{projCopy().viewCaseLabel}</span>
              <ArrowRightIcon size={15} />
            </a>
          </div>
        </div>
      </article>

      {/* Filter Bar + All Link */}
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Filter projects"
          class="inline-flex flex-wrap gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1 text-xs"
        >
          <For
            each={[
              { id: "all" as const, label: projCopy().filterAllLabel },
              { id: "admin" as const, label: projCopy().filterAdminLabel },
              { id: "tech" as const, label: projCopy().filterTechLabel },
            ]}
          >
            {(tab) => (
              <button
                type="button"
                aria-pressed={filter() === tab.id}
                onClick={() => setFilter(tab.id)}
                class={`rounded-full px-3.5 py-1.5 font-medium transition ${
                  filter() === tab.id
                    ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {tab.label}
              </button>
            )}
          </For>
        </div>

        <a
          href={buildProjectsIndexPath(lang(), role(), locked())}
          class="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          <span>{projCopy().viewAllLabel}</span>
          <ArrowRightIcon size={14} />
        </a>
      </div>

      {/* 6 Project Cards Grid */}
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <For each={filteredProjects()}>
          {(shared) => {
            const summary = () => getProjectSummary(lang(), shared.id);
            const isFeatured = () => shared.id === featuredId();
            return (
              <article class="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
                <div>
                  <div class="flex items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-accent)]">
                      <LayersIcon size={14} />
                      <span>{summary().category}</span>
                    </span>
                    <Show when={isFeatured()}>
                      <span class="rounded-full bg-[var(--color-primary-soft)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--color-primary)]">
                        {projCopy().featuredLabel}
                      </span>
                    </Show>
                  </div>

                  <h3 class="mt-4 font-display text-xl text-[var(--color-fg)]">
                    {summary().title}
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {summary().summary}
                  </p>

                  <div class="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/70 px-3.5 py-2.5">
                    <span class="font-display text-lg text-[var(--color-accent)]">
                      {summary().impactMetric.value}
                    </span>
                    <span class="ml-2 text-xs text-[var(--color-fg-muted)]">
                      {summary().impactMetric.label}
                    </span>
                  </div>
                </div>

                <div class="mt-5 space-y-4">
                  <TechList items={shared.stack} limit={4} />
                  <div class="border-t border-[var(--color-border)] pt-3">
                    <a
                      href={buildProjectPath(lang(), shared.slug, role(), locked())}
                      class="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                    >
                      <span>{projCopy().viewCaseLabel}</span>
                      <ArrowRightIcon size={13} />
                    </a>
                  </div>
                </div>
              </article>
            );
          }}
        </For>
      </div>
    </Section>
  );
};
