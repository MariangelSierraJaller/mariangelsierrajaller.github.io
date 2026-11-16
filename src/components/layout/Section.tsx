import { Show, type ParentComponent } from "solid-js";

export interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  surface?: "base" | "alt";
}

export const Section: ParentComponent<SectionProps> = (props) => {
  const bgClass = () =>
    props.surface === "alt"
      ? "bg-[var(--color-surface)]/55 border-y border-[var(--color-border)]"
      : "bg-transparent";

  return (
    <section
      id={props.id}
      aria-labelledby={`${props.id}-heading`}
      class={`section-shell ${bgClass()}`}
    >
      <div class="mx-auto max-w-6xl px-5 sm:px-6">
        <header class="mb-10 max-w-3xl">
          <div class="mb-3 flex items-center gap-3">
            <span class="h-px w-8 bg-[var(--color-primary)]" aria-hidden="true" />
            <p class="font-mono text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {props.eyebrow}
            </p>
          </div>
          <h2
            id={`${props.id}-heading`}
            class="font-display text-3xl leading-tight text-[var(--color-fg)] sm:text-4xl"
          >
            {props.title}
          </h2>
          <Show when={props.subtitle}>
            <p class="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)] sm:text-lg">
              {props.subtitle}
            </p>
          </Show>
        </header>

        {props.children}
      </div>
    </section>
  );
};
