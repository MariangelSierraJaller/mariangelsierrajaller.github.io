import type { Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { TESTIMONIAL_ORDER, TESTIMONIALS_SHARED } from "@/content/shared/testimonials";
import { Section } from "@/components/layout/Section";
import { Carousel } from "@/components/ui/Carousel";
import { QuoteIcon } from "@/components/ui/icons";

export const TestimonialsSection: Component = () => {
  const { copy } = useLanguage();
  const testCopy = () => copy().testimonials;

  const collaborationCount = TESTIMONIAL_ORDER.filter(
    (id) => TESTIMONIALS_SHARED[id].source !== "academic",
  ).length;
  const academicCount = TESTIMONIAL_ORDER.filter(
    (id) => TESTIMONIALS_SHARED[id].source === "academic",
  ).length;

  return (
    <Section
      id="testimonials"
      eyebrow={testCopy().eyebrow}
      title={testCopy().title}
      subtitle={testCopy().subtitle}
      surface="alt"
    >
      <div class="mb-8 grid max-w-2xl grid-cols-3 gap-4">
        <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/85 p-4 text-center">
          <p class="font-display text-2xl text-[var(--color-primary)]">
            {TESTIMONIAL_ORDER.length}
          </p>
          <p class="mt-1 text-xs text-[var(--color-fg-muted)]">
            {testCopy().statsLabels.total}
          </p>
        </div>
        <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/85 p-4 text-center">
          <p class="font-display text-2xl text-[var(--color-primary)]">{collaborationCount}</p>
          <p class="mt-1 text-xs text-[var(--color-fg-muted)]">
            {testCopy().statsLabels.collaboration}
          </p>
        </div>
        <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/85 p-4 text-center">
          <p class="font-display text-2xl text-[var(--color-primary)]">{academicCount}</p>
          <p class="mt-1 text-xs text-[var(--color-fg-muted)]">
            {testCopy().statsLabels.academic}
          </p>
        </div>
      </div>

      <Carousel
        items={TESTIMONIAL_ORDER}
        perPage={3}
        prevLabel={testCopy().prevLabel}
        nextLabel={testCopy().nextLabel}
        ariaLabel={testCopy().title}
        renderItem={(id) => {
          const shared = TESTIMONIALS_SHARED[id];
          const item = () => testCopy().items[id];
          return (
            <figure class="relative flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-6 hover-glow">
              <div>
                <div class="mb-4 flex items-center justify-between gap-2">
                  <span class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                    <QuoteIcon size={15} />
                  </span>
                  <div class="flex items-center gap-2 font-mono text-xs">
                    <span class="rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary-soft)] px-2.5 py-0.5 text-[var(--color-accent)]">
                      {item().highlight}
                    </span>
                    <span class="text-[var(--color-fg-subtle)]">{shared.date}</span>
                  </div>
                </div>

                <blockquote class="text-sm italic leading-relaxed text-[var(--color-fg-muted)]">
                  “{item().quote}”
                </blockquote>
              </div>

              <figcaption class="mt-5 border-t border-[var(--color-border)] pt-4">
                <p class="font-display text-base text-[var(--color-fg)]">{shared.name}</p>
                <p class="text-xs font-medium text-[var(--color-primary)]">{item().role}</p>
                <p class="text-xs text-[var(--color-fg-subtle)]">
                  {item().organization} · {item().relationship}
                </p>
              </figcaption>
            </figure>
          );
        }}
      />
    </Section>
  );
};
