import { createSignal, For, type Component } from "solid-js";
import { METRIC_GROUP_IDS, type MetricGroupId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { Section } from "@/components/layout/Section";

export const MetricsSection: Component = () => {
  const { lang, copy } = useLanguage();
  const [selectedGroup, setSelectedGroup] = createSignal<MetricGroupId | "all">("all");
  const metricsCopy = () => copy().metrics;

  const visibleGroups = () => {
    const active = selectedGroup();
    return active === "all"
      ? METRIC_GROUP_IDS
      : METRIC_GROUP_IDS.filter((id) => id === active);
  };

  return (
    <Section
      id="metrics"
      eyebrow={metricsCopy().eyebrow}
      title={metricsCopy().title}
      subtitle={metricsCopy().subtitle}
      surface="alt"
    >
      <div class="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={selectedGroup() === "all"}
          onClick={() => setSelectedGroup("all")}
          class={`rounded-full border px-3.5 py-1 text-xs font-medium transition ${
            selectedGroup() === "all"
              ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
              : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
          }`}
        >
          {lang() === "es" ? "Todos los indicadores (4)" : "All Indicators (4)"}
        </button>

        <For each={METRIC_GROUP_IDS}>
          {(groupId) => (
            <button
              type="button"
              aria-pressed={selectedGroup() === groupId}
              onClick={() => setSelectedGroup(groupId)}
              class={`rounded-full border px-3.5 py-1 text-xs font-medium transition ${
                selectedGroup() === groupId
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
              }`}
            >
              {metricsCopy().groups[groupId].title}
            </button>
          )}
        </For>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <For each={visibleGroups()}>
          {(groupId) => {
            const group = () => metricsCopy().groups[groupId];
            return (
              <article class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-6 hover-glow">
                <h3 class="font-display text-xl text-[var(--color-fg)]">{group().title}</h3>
                <p class="mt-1 font-mono text-xs text-[var(--color-accent)]">
                  {group().subtitle}
                </p>

                <div class="mt-5 grid gap-3 sm:grid-cols-2">
                  <For each={group().items}>
                    {(item) => (
                      <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                        <div
                          aria-hidden="true"
                          class="mb-2.5 h-1 w-8 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                        />
                        <p class="font-display text-2xl text-[var(--color-primary)]">
                          {item.value}
                        </p>
                        <p class="mt-1 text-xs font-semibold text-[var(--color-fg)]">
                          {item.label}
                        </p>
                        <p class="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">
                          {item.detail}
                        </p>
                      </div>
                    )}
                  </For>
                </div>
              </article>
            );
          }}
        </For>
      </div>
    </Section>
  );
};
