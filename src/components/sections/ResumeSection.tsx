import { createEffect, createSignal, For, Show, type Component } from "solid-js";
import { RESUME_VARIANT_IDS, type ResumeVariantId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { getResumeVariant } from "@/content/shared/resume";
import { withBase } from "@/lib/base";
import { Section } from "@/components/layout/Section";
import { ArrowUpRightIcon, CheckIcon, DownloadIcon } from "@/components/ui/icons";

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

  const resumeCopy = () => copy().resume;
  const activeShared = () => getResumeVariant(lang(), selected());
  const activeCopy = () => resumeCopy().variants[selected()];

  return (
    <Section
      id="resume"
      eyebrow={resumeCopy().eyebrow}
      title={resumeCopy().title}
      subtitle={resumeCopy().subtitle}
      surface="base"
    >
      {/* Variant Tabs */}
      <div role="tablist" aria-label={resumeCopy().title} class="mb-8 flex flex-wrap gap-2">
        <For each={RESUME_VARIANT_IDS}>
          {(variantId) => {
            const active = () => selected() === variantId;
            const vCopy = () => resumeCopy().variants[variantId];
            return (
              <button
                type="button"
                role="tab"
                aria-selected={active()}
                onClick={() => setSelected(variantId)}
                class={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
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

        {/* Visual CV Preview */}
        <a
          href={withBase(activeShared().pdfPath)}
          target="_blank"
          rel="noopener noreferrer"
          class="group block overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3 hover-glow"
        >
          <img
            src={withBase(activeShared().previewPath)}
            alt={activeCopy().previewAlt}
            width={816}
            height={1056}
            loading="lazy"
            decoding="async"
            class="h-auto w-full rounded-2xl object-cover transition duration-300 group-hover:scale-[1.01]"
          />
        </a>
      </div>
    </Section>
  );
};
