import { For, type Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";

export const HighlightsStrip: Component = () => {
  const { copy } = useLanguage();
  const { role } = useRole();

  const items = () => copy().highlights[role()];

  return (
    <section aria-label="Highlights" class="relative z-10 pb-12">
      <div class="mx-auto max-w-6xl px-5 sm:px-6">
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <For each={items()}>
            {(card) => (
              <div class="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/85 p-5 hover-glow">
                <div
                  aria-hidden="true"
                  class="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]"
                />
                <p class="font-display text-3xl text-[var(--color-primary)]">{card.value}</p>
                <p class="mt-1.5 text-sm font-semibold text-[var(--color-fg)]">{card.label}</p>
                <p class="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">{card.hint}</p>
              </div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};
