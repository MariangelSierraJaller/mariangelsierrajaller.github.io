import { createSignal, For, type Component } from "solid-js";
import type { SkillGroupId, SpokenLanguageFact } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { PROFILE } from "@/content/shared/profile";
import { orderedSkillGroupsForRole } from "@/lib/role-view";
import { Section } from "@/components/layout/Section";

const LANGUAGE_PROFICIENCY: Record<SpokenLanguageFact["id"], number> = {
  es: 100,
  en: 75,
  fr: 35,
  ko: 25,
};

export const SkillsSection: Component = () => {
  const { lang, copy } = useLanguage();
  const { role } = useRole();
  const [selectedGroup, setSelectedGroup] = createSignal<SkillGroupId | "all">("all");

  const skillsCopy = () => copy().skills;
  const groupOrder = () => orderedSkillGroupsForRole(role());
  const visibleGroups = () => {
    const active = selectedGroup();
    return active === "all" ? groupOrder() : groupOrder().filter((id) => id === active);
  };

  return (
    <Section
      id="skills"
      eyebrow={skillsCopy().eyebrow}
      title={skillsCopy().title}
      subtitle={skillsCopy().subtitle}
      surface="base"
    >
      <div class="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={selectedGroup() === "all"}
          onClick={() => setSelectedGroup("all")}
          class={`min-h-[36px] whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
            selectedGroup() === "all"
              ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
          }`}
        >
          {lang() === "es" ? "Todas las áreas" : "All Domains"}
        </button>

        <For each={groupOrder()}>
          {(groupId) => (
            <button
              type="button"
              aria-pressed={selectedGroup() === groupId}
              onClick={() => setSelectedGroup(groupId)}
              class={`min-h-[36px] whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                selectedGroup() === groupId
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
              }`}
            >
              {skillsCopy().groups[groupId].title}
            </button>
          )}
        </For>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <For each={visibleGroups()}>
          {(groupId) => {
            const group = () => skillsCopy().groups[groupId];
            return (
              <article class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
                <h3 class="font-display text-xl text-[var(--color-fg)]">{group().title}</h3>
                <p class="mt-1 font-mono text-xs text-[var(--color-accent)]">
                  {group().tagline}
                </p>

                <ul class="mt-5 space-y-4">
                  <For each={group().items}>
                    {(skill) => (
                      <li>
                        <div class="flex items-center justify-between text-sm">
                          <span class="font-medium text-[var(--color-fg)]">{skill.name}</span>
                          <span class="font-mono text-xs text-[var(--color-accent)]">
                            {skill.level}%
                          </span>
                        </div>
                        <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-surface-raised)]">
                          <div
                            class="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <p class="mt-1 text-xs text-[var(--color-fg-subtle)]">{skill.context}</p>
                      </li>
                    )}
                  </For>
                </ul>
              </article>
            );
          }}
        </For>
      </div>

      {/* Soft Skills & Spoken Languages */}
      <div class="mt-10 grid gap-6 lg:grid-cols-2">
        <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
          <h3 class="font-display text-xl text-[var(--color-fg)]">
            {skillsCopy().softSkillsTitle}
          </h3>
          <ul class="mt-4 flex flex-wrap gap-2">
            <For each={skillsCopy().softSkills}>
              {(soft) => (
                <li class="rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-fg)]">
                  {soft}
                </li>
              )}
            </For>
          </ul>
        </div>

        <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
          <h3 class="font-display text-xl text-[var(--color-fg)]">
            {skillsCopy().languagesTitle}
          </h3>
          <ul class="mt-4 grid gap-3 sm:grid-cols-2">
            <For each={PROFILE.spokenLanguages}>
              {(spoken) => {
                const label = () => skillsCopy().spokenLanguages[spoken.id];
                const pct = LANGUAGE_PROFICIENCY[spoken.id];
                return (
                  <li class="space-y-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]/70 px-4 py-3 text-sm">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-medium text-[var(--color-fg)]">{label().name}</span>
                      <span class="shrink-0 whitespace-nowrap rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary-soft)] px-2.5 py-0.5 font-mono text-xs text-[var(--color-accent)]">
                        {label().level}
                      </span>
                    </div>
                    <div class="h-1 overflow-hidden rounded-full bg-[var(--color-surface-raised)]">
                      <div
                        class="h-full rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              }}
            </For>
          </ul>
        </div>
      </div>
    </Section>
  );
};
