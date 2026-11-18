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

  let touchStartX = 0;
  let touchStartY = 0;

  return (
    <div
      aria-label={props.ariaLabel}
      class="touch-pan-y space-y-8"
      onTouchStart={(e) => {
        const t = e.touches[0];
        if (t) {
          touchStartX = t.clientX;
          touchStartY = t.clientY;
        }
      }}
      onTouchEnd={(e) => {
        const t = e.changedTouches[0];
        if (!t) return;
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
          if (dx < 0) next();
          else prev();
        }
      }}
    >
      <Show when={totalPages() > 1}>
        <div class="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label={props.prevLabel}
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <ChevronLeftIcon size={18} />
          </button>

          <div class="flex items-center gap-1" role="tablist" aria-label={props.ariaLabel}>
            <For each={Array.from({ length: totalPages() })}>
              {(_, idx) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={page() === idx()}
                  aria-label={`${idx() + 1} / ${totalPages()}`}
                  onClick={() => setPage(idx())}
                  class="inline-flex h-10 min-w-[28px] items-center justify-center px-1"
                >
                  <span
                    class={`block h-2.5 rounded-full transition-all ${
                      page() === idx()
                        ? "w-8 bg-[var(--color-primary)]"
                        : "w-2.5 bg-[var(--color-border-strong)] hover:bg-[var(--color-accent)]"
                    }`}
                  />
                </button>
              )}
            </For>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label={props.nextLabel}
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </Show>

      <div
        class={`grid gap-6 md:grid-cols-2 ${
          visibleItems().length === 2 ? "" : "lg:grid-cols-3"
        }`}
      >
        <For each={visibleItems()}>
          {(item) => props.renderItem(item)}
        </For>
      </div>
    </div>
  );
}
