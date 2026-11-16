import { createEffect, createSignal, For, Show, type Component } from "solid-js";
import { ROLE_IDS, type RoleId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { EXPERIENCE_ORDER, EXPERIENCE_SHARED } from "@/content/shared/experience";
import { formatYmRange } from "@/lib/format";
import { buildDetailIndexPath, buildDetailItemPath } from "@/lib/paths";
import { Section } from "@/components/layout/Section";
import { TechList } from "@/components/ui/TechList";
import { ArrowRightIcon, BriefcaseIcon, ChevronDownIcon } from "@/components/ui/icons";

export const ExperienceSection: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, locked } = useRole();
  const [lensRole, setLensRole] = createSignal<RoleId>(role());

  createEffect(() => {
    setLensRole(role());
  });

  const expCopy = () => copy().experience;

  return (
    <Section
      id="experience"
      eyebrow={expCopy().eyebrow}
      title={expCopy().title}
      subtitle={expCopy().subtitle}
      surface="alt"
    >
      <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div
          role="group"
          aria-label={lang() === "es" ? "Enfoque de responsabilidades" : "Role perspective"}
          class="inline-flex flex-wrap gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1 text-xs"
        >
          <For each={ROLE_IDS}>
            {(r) => (
              <button
                type="button"
                aria-pressed={lensRole() === r}
                onClick={() => setLensRole(r)}
                class={`rounded-full px-3 py-1 font-medium transition ${
                  lensRole() === r
                    ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                    : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
                }`}
              >
                {copy().ui.roleLabels[r].short}
              </button>
            )}
          </For>
        </div>

        <a
          href={buildDetailIndexPath(lang(), "experience", role(), locked())}
          class="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          <span>{expCopy().viewAllLabel}</span>
          <ArrowRightIcon size={14} />
        </a>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <For each={EXPERIENCE_ORDER}>
          {(expId) => {
            const shared = EXPERIENCE_SHARED[expId];
            const item = () => expCopy().items[expId];
            const roleView = () => item().byRole[lensRole()];
            const [expanded, setExpanded] = createSignal(shared.current);

            return (
              <article class="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-6 hover-glow">
                <div>
                  <div class="flex flex-wrap items-center justify-between gap-2">
                    <div class="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-accent)]">
                      <BriefcaseIcon size={14} />
                      <span>
                        {formatYmRange(
                          shared.start,
                          shared.end,
                          lang(),
                          expCopy().presentLabel,
                        )}
                      </span>
                    </div>
                    <Show when={shared.current}>
                      <span class="rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-primary-soft)] px-2.5 py-0.5 font-mono text-[11px] font-medium text-[var(--color-accent)]">
                        {expCopy().currentBadge}
                      </span>
                    </Show>
                  </div>

                  <h3 class="mt-4 font-display text-2xl text-[var(--color-fg)]">
                    {shared.company}
                  </h3>
                  <p class="mt-1 text-base font-semibold text-[var(--color-primary)]">
                    {roleView().roleTitle}
                  </p>
                  <p class="mt-1 font-mono text-xs text-[var(--color-fg-subtle)]">
                    {shared.location}
                  </p>

                  <p class="mt-4 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {roleView().summary}
                  </p>

                  <Show when={expanded()}>
                    <div class="mt-5 border-t border-[var(--color-border)] pt-4">
                      <p class="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
                        {expCopy().responsibilitiesLabel}
                      </p>
                      <ul class="mt-3 space-y-2 text-sm text-[var(--color-fg-muted)]">
                        <For each={roleView().highlights}>
                          {(bullet) => (
                            <li class="flex gap-2.5">
                              <span
                                aria-hidden="true"
                                class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]"
                              />
                              <span>{bullet}</span>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  </Show>
                </div>

                <div class="mt-6 space-y-4">
                  <TechList items={shared.stack} limit={6} />

                  <div class="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-border)] pt-4">
                    <button
                      type="button"
                      onClick={() => setExpanded((v) => !v)}
                      aria-expanded={expanded()}
                      class="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--color-fg-muted)] transition hover:text-[var(--color-primary)]"
                    >
                      <span>
                        {expanded() ? expCopy().showLessLabel : expCopy().showMoreLabel}
                      </span>
                      <ChevronDownIcon
                        size={14}
                        class={`transition-transform ${expanded() ? "rotate-180" : ""}`}
                      />
                    </button>

                    <a
                      href={buildDetailItemPath(
                        lang(),
                        "experience",
                        shared.slug,
                        role(),
                        locked(),
                      )}
                      class="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                    >
                      <span>{expCopy().viewDetailLabel}</span>
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
