import { For, type Component } from "solid-js";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import {
  CERTIFICATION_ORDER,
  CERTIFICATIONS_SHARED,
  getCertificationIssuer,
} from "@/content/shared/certifications";
import { buildDetailIndexPath, buildDetailItemPath } from "@/lib/paths";
import { Section } from "@/components/layout/Section";
import { ArrowRightIcon, AwardIcon, CheckIcon } from "@/components/ui/icons";

export const CertificationsSection: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, locked } = useRole();
  const certCopy = () => copy().certifications;

  return (
    <Section
      id="certifications"
      eyebrow={certCopy().eyebrow}
      title={certCopy().title}
      subtitle={certCopy().subtitle}
      surface="base"
      action={
        <a
          href={buildDetailIndexPath(lang(), "certifications", role(), locked())}
          class="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap py-1.5 font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
        >
          <span>{certCopy().viewAllLabel}</span>
          <ArrowRightIcon size={14} />
        </a>
      }
    >
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <For each={CERTIFICATION_ORDER}>
          {(certId) => {
            const shared = CERTIFICATIONS_SHARED[certId];
            const item = () => certCopy().items[certId];
            return (
              <article class="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
                <div>
                  <div class="flex items-start justify-between gap-3">
                    <span class="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-primary)]">
                      <AwardIcon size={18} />
                    </span>
                    <span class="shrink-0 font-mono text-xs text-[var(--color-accent)]">
                      {shared.year}
                    </span>
                  </div>

                  <h3 class="mt-4 font-display text-xl text-[var(--color-fg)]">
                    {item().title}
                  </h3>
                  <p class="mt-1 font-mono text-xs text-[var(--color-fg-subtle)]">
                    {getCertificationIssuer(certId, lang())}
                  </p>
                  <p class="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {item().summary}
                  </p>

                  <ul class="mt-4 space-y-1.5 text-xs text-[var(--color-fg-muted)]">
                    <For each={item().competencies}>
                      {(comp) => (
                        <li class="flex items-start gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)]/55 px-2.5 py-1.5">
                          <CheckIcon
                            size={13}
                            class="mt-0.5 shrink-0 text-[var(--color-primary)]"
                          />
                          <span>{comp}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                </div>

                <div class="mt-5 border-t border-[var(--color-border)] pt-2">
                  <a
                    href={buildDetailItemPath(
                      lang(),
                      "certifications",
                      shared.slug,
                      role(),
                      locked(),
                    )}
                    class="inline-flex min-h-[36px] items-center gap-1.5 py-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                  >
                    <span>{certCopy().viewDetailLabel}</span>
                    <ArrowRightIcon size={13} />
                  </a>
                </div>
              </article>
            );
          }}
        </For>
      </div>
    </Section>
  );
};
