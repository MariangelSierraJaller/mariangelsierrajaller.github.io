import { createSignal, For, Show, type JSX } from "solid-js";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export interface CarouselProps<T> {
  items: readonly T[];
  perPage?: number;
  prevLabel: string;
  nextLabel: string;
  ariaLabel: string;
  renderItem: (item: T) => JSX.Element;
}

export function Carousel<T>(props: CarouselProps<T>) {
  const perPage = () => props.perPage ?? 3;
  const totalPages = () => Math.max(1, Math.ceil(props.items.length / perPage()));
  const [page, setPage] = createSignal(0);

  const visibleItems = () => {
    const start = page() * perPage();
    return props.items.slice(start, start + perPage());
  };

  const prev = () => setPage((p) => (p - 1 + totalPages()) % totalPages());
  const next = () => setPage((p) => (p + 1) % totalPages());

  return (
    <div aria-label={props.ariaLabel} class="space-y-8">
      <Show when={totalPages() > 1}>
        <div class="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label={props.prevLabel}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <ChevronLeftIcon size={18} />
          </button>

          <div class="flex items-center gap-2" role="tablist" aria-label={props.ariaLabel}>
            <For each={Array.from({ length: totalPages() })}>
              {(_, idx) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={page() === idx()}
                  aria-label={`${idx() + 1} / ${totalPages()}`}
                  onClick={() => setPage(idx())}
                  class={`h-2.5 rounded-full transition-all ${
                    page() === idx()
                      ? "w-8 bg-[var(--color-primary)]"
                      : "w-2.5 bg-[var(--color-border-strong)] hover:bg-[var(--color-accent)]"
                  }`}
                />
              )}
            </For>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label={props.nextLabel}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </Show>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <For each={visibleItems()}>
          {(item) => props.renderItem(item)}
        </For>
      </div>
    </div>
  );
}
