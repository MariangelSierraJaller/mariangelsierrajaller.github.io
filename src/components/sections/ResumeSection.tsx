import { createEffect, createSignal, For, onMount, Show, type Component } from "solid-js";
import { RESUME_VARIANT_IDS, type ResumeVariantId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { getResumeVariant } from "@/content/shared/resume";
import { withBase } from "@/lib/base";
import { Section } from "@/components/layout/Section";
import {
  ArrowUpRightIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
} from "@/components/ui/icons";

export const ResumeSection: Component = () => {
  const { lang, copy } = useLanguage();
  const { role } = useRole();

  const initialVariant = (): ResumeVariantId =>
    role() === "admin" ? "admin" : role() === "tech" ? "tech" : "ats";

  const [selected, setSelected] = createSignal<ResumeVariantId>(initialVariant());

  createEffect(() => {
    const r = role();
    if (r === "admin" || r === "tech") {
      setSelected(r);
    }
  });

  onMount(() => {
    if (typeof Image === "undefined") return;
    for (const id of RESUME_VARIANT_IDS) {
      const img = new Image();
      img.src = withBase(getResumeVariant(lang(), id).previewPath);
    }
  });

  const resumeCopy = () => copy().resume;
  const activeShared = () => getResumeVariant(lang(), selected());
  const activeCopy = () => resumeCopy().variants[selected()];
  const currentIdx = () => RESUME_VARIANT_IDS.indexOf(selected());

  const stepVariant = (delta: number) => {
    const nextIdx =
      (currentIdx() + delta + RESUME_VARIANT_IDS.length) % RESUME_VARIANT_IDS.length;
    setSelected(RESUME_VARIANT_IDS[nextIdx]);
  };

  const onTabKeyDown = (e: KeyboardEvent, currentVariant: ResumeVariantId) => {
    const idx = RESUME_VARIANT_IDS.indexOf(currentVariant);
    let nextIdx = -1;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % RESUME_VARIANT_IDS.length;
    else if (e.key === "ArrowLeft")
      nextIdx = (idx - 1 + RESUME_VARIANT_IDS.length) % RESUME_VARIANT_IDS.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = RESUME_VARIANT_IDS.length - 1;

    if (nextIdx >= 0) {
      e.preventDefault();
      const nextId = RESUME_VARIANT_IDS[nextIdx];
      setSelected(nextId);
      if (typeof document !== "undefined") {
        document.getElementById(`resume-tab-${nextId}`)?.focus();
      }
    }
  };

  let startX = 0;
  let startY = 0;
  let swipedRecently = false;

  const beginGesture = (x: number, y: number) => {
    startX = x;
    startY = y;
    swipedRecently = false;
  };

  const finishGesture = (x: number, y: number) => {
    const dx = x - startX;
    const dy = y - startY;
    if (Math.abs(dx) > 38 && Math.abs(dx) > Math.abs(dy)) {
      swipedRecently = true;
      stepVariant(dx < 0 ? 1 : -1);
      window.setTimeout(() => {
        swipedRecently = false;
      }, 200);
    }
  };

  return (
    <Section
      id="resume"
      eyebrow={resumeCopy().eyebrow}
      title={resumeCopy().title}
      subtitle={resumeCopy().subtitle}
      surface="base"
    >
      {/* Variant Tabs & Mobile Stepper */}
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label={resumeCopy().title} class="flex flex-wrap gap-2">
          <For each={RESUME_VARIANT_IDS}>
            {(variantId) => {
              const active = () => selected() === variantId;
              const vCopy = () => resumeCopy().variants[variantId];
              return (
                <button
                  type="button"
                  role="tab"
                  id={`resume-tab-${variantId}`}
                  aria-selected={active()}
                  tabindex={active() ? 0 : -1}
                  onClick={() => setSelected(variantId)}
                  onKeyDown={(e) => onTabKeyDown(e, variantId)}
                  class={`min-h-[40px] whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    active()
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                      : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                  }`}
                >
                  {vCopy().label}
                </button>
              );
            }}
          </For>
        </div>

        <div class="flex items-center gap-2">
          <button
            type="button"
            onClick={() => stepVariant(-1)}
            aria-label={lang() === "es" ? "Currículum anterior" : "Previous resume"}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <ChevronLeftIcon size={18} />
          </button>
          <span class="min-w-[3.2rem] text-center font-mono text-xs text-[var(--color-accent)]">
            {currentIdx() + 1} / {RESUME_VARIANT_IDS.length}
          </span>
          <button
            type="button"
            onClick={() => stepVariant(1)}
            aria-label={lang() === "es" ? "Siguiente currículum" : "Next resume"}
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* Details & CTAs */}
        <div class="space-y-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7">
          <div class="flex flex-wrap items-center gap-2">
            <span class="rounded-full bg-[var(--color-primary-soft)] px-3 py-1 font-mono text-xs text-[var(--color-accent)]">
              {activeCopy().badge}
            </span>
            <Show when={role() === selected()}>
              <span class="rounded-full border border-[var(--color-success)]/40 bg-[var(--color-surface-raised)] px-3 py-1 font-mono text-xs text-[var(--color-success)]">
                {resumeCopy().recommendedLabel}
              </span>
            </Show>
          </div>

          <div>
            <h3 class="font-display text-2xl text-[var(--color-fg)]">{activeCopy().label}</h3>
            <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {activeCopy().description}
            </p>
          </div>

          <ul class="space-y-2.5 text-sm text-[var(--color-fg-muted)]">
            <For each={activeCopy().highlights}>
              {(point) => (
                <li class="flex items-start gap-2.5">
                  <CheckIcon size={16} class="mt-0.5 shrink-0 text-[var(--color-success)]" />
                  <span>{point}</span>
                </li>
              )}
            </For>
          </ul>

          <div class="flex flex-wrap gap-3 pt-2">
            <a
              href={withBase(activeShared().pdfPath)}
              download={activeShared().fileName}
              class="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] blue-glow transition hover:bg-[var(--color-primary-hover)]"
            >
              <DownloadIcon size={16} />
              <span>{resumeCopy().downloadLocalCta}</span>
            </a>

            <a
              href={activeShared().driveUrl}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-5 py-3 text-sm font-medium text-[var(--color-fg)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              <span>{resumeCopy().viewDriveCta}</span>
              <ArrowUpRightIcon size={16} />
            </a>
          </div>
        </div>

        {/* Visual Swipeable CV Preview */}
        <div
          class="touch-pan-y select-none space-y-4"
          onTouchStart={(e) => {
            const t = e.touches[0];
            if (t) beginGesture(t.clientX, t.clientY);
          }}
          onTouchEnd={(e) => {
            const t = e.changedTouches[0];
            if (t) finishGesture(t.clientX, t.clientY);
          }}
          onPointerDown={(e) => {
            if (e.pointerType !== "touch") beginGesture(e.clientX, e.clientY);
          }}
          onPointerUp={(e) => {
            if (e.pointerType !== "touch") finishGesture(e.clientX, e.clientY);
          }}
        >
          <a
            href={withBase(activeShared().pdfPath)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              if (swipedRecently) e.preventDefault();
            }}
            class="group block overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 hover-glow"
          >
            <div class="aspect-[816/1056] w-full overflow-hidden rounded-2xl bg-[var(--color-bg)]">
              <img
                src={withBase(activeShared().previewPath)}
                alt={activeCopy().previewAlt}
                width={816}
                height={1056}
                loading="lazy"
                decoding="async"
                draggable={false}
                class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.01]"
              />
            </div>
          </a>

          {/* Bottom Dots & Swipe Hint */}
          <div class="flex flex-wrap items-center justify-between gap-2 px-1">
            <div class="flex items-center gap-1">
              <For each={RESUME_VARIANT_IDS}>
                {(variantId) => (
                  <button
                    type="button"
                    aria-label={resumeCopy().variants[variantId].label}
                    aria-pressed={selected() === variantId}
                    onClick={() => setSelected(variantId)}
                    class="inline-flex h-9 min-w-[28px] items-center justify-center px-1"
                  >
                    <span
                      class={`block h-2.5 rounded-full transition-all ${
                        selected() === variantId
                          ? "w-8 bg-[var(--color-primary)]"
                          : "w-2.5 bg-[var(--color-border-strong)] hover:bg-[var(--color-accent)]"
                      }`}
                    />
                  </button>
                )}
              </For>
            </div>
            <p class="font-mono text-[11px] text-[var(--color-fg-subtle)]">
              {lang() === "es"
                ? "Desliza o usa las flechas para cambiar de formato"
                : "Swipe or use arrows to switch formats"}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};
