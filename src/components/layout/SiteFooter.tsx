import { For, type Component } from "solid-js";
import { DETAIL_COLLECTIONS, type SectionId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { PROFILE } from "@/content/shared/profile";
import { SITE } from "@/content/shared/site";
import { BUILD_DATE } from "@/lib/base";
import {
  buildDetailIndexPath,
  buildHomePath,
  buildProjectsIndexPath,
  withRoleQuery,
} from "@/lib/paths";
import {
  GitHubBrandIcon,
  LinkedInBrandIcon,
  MailBrandIcon,
  PhoneBrandIcon,
} from "./BrandIcons";
import { ArrowUpIcon } from "@/components/ui/icons";

const FOOTER_SECTIONS: readonly SectionId[] = [
  "about",
  "experience",
  "projects",
  "skills",
  "resume",
  "contact",
];

export const SiteFooter: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, locked } = useRole();
  const year = new Date().getFullYear();

  const detailLabels = () => ({
    experience: copy().ui.footer.experienceIndexLabel,
    education: copy().ui.footer.educationIndexLabel,
    certifications: copy().ui.footer.certificationsIndexLabel,
  });

  return (
    <footer class="border-t border-[var(--color-border)] bg-[var(--color-surface)]/70 pt-14 pb-24 sm:pb-20">
      <div class="mx-auto max-w-6xl px-5 sm:px-6">
        <div class="grid gap-10 md:grid-cols-4">
          <div class="space-y-4 md:col-span-2">
            <div class="flex items-center gap-3">
              <span class="grid h-10 w-10 shrink-0 place-items-center hex-frame bg-[var(--color-primary)] font-mono text-xs font-bold text-[var(--color-on-primary)]">
                MS
              </span>
              <div>
                <p class="font-display text-xl text-[var(--color-fg)]">{PROFILE.fullName}</p>
                <p class="font-mono text-xs text-[var(--color-accent)]">
                  {PROFILE.location.city}, {PROFILE.location.country}
                </p>
              </div>
            </div>
            <p class="max-w-md text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {copy().ui.footer.tagline}
            </p>
            <div class="flex items-center gap-3 pt-1">
              <a
                href={SITE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="grid h-10 w-10 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-primary)]"
              >
                <LinkedInBrandIcon size={17} />
              </a>
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                class="grid h-10 w-10 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-primary)]"
              >
                <GitHubBrandIcon size={17} />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                aria-label="Email"
                class="grid h-10 w-10 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-primary)]"
              >
                <MailBrandIcon size={17} />
              </a>
              <a
                href={`tel:+${SITE.whatsappNumber}`}
                aria-label="Phone"
                class="grid h-10 w-10 place-items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-border-strong)] hover:text-[var(--color-primary)]"
              >
                <PhoneBrandIcon size={17} />
              </a>
            </div>
          </div>

          <div class="space-y-3">
            <h3 class="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              {copy().ui.footer.navigationTitle}
            </h3>
            <ul class="space-y-1 text-sm">
              <For each={FOOTER_SECTIONS}>
                {(secId) => (
                  <li>
                    <a
                      href={withRoleQuery(
                        buildHomePath(lang(), role(), secId),
                        undefined,
                        locked(),
                      )}
                      class="inline-flex min-h-[30px] items-center py-1 text-[var(--color-fg-muted)] transition hover:text-[var(--color-primary)]"
                    >
                      {copy().ui.navItems[secId]}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>

          <div class="space-y-3">
            <h3 class="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
              {copy().ui.footer.resourcesTitle}
            </h3>
            <ul class="space-y-1 text-sm">
              <li>
                <a
                  href={buildProjectsIndexPath(lang(), role(), locked())}
                  class="inline-flex min-h-[30px] items-center py-1 text-[var(--color-fg-muted)] transition hover:text-[var(--color-primary)]"
                >
                  {copy().ui.footer.projectsIndexLabel}
                </a>
              </li>
              <For each={DETAIL_COLLECTIONS}>
                {(collection) => (
                  <li>
                    <a
                      href={buildDetailIndexPath(lang(), collection, role(), locked())}
                      class="inline-flex min-h-[30px] items-center py-1 text-[var(--color-fg-muted)] transition hover:text-[var(--color-primary)]"
                    >
                      {detailLabels()[collection]}
                    </a>
                  </li>
                )}
              </For>
            </ul>
          </div>
        </div>

        <div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6 text-center text-xs text-[var(--color-fg-subtle)] lg:flex-row lg:text-left">
          <p class="lg:shrink-0">
            © {year} {PROFILE.shortName}. {copy().ui.footer.rights}
          </p>
          <div class="flex flex-wrap items-center justify-center gap-4 lg:justify-end">
            <p class="font-mono">
              {copy().ui.footer.builtWith} · {copy().ui.footer.updatedLabel} {BUILD_DATE}
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label={copy().ui.backToTopLabel}
              class="inline-flex min-h-[36px] items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3.5 py-1.5 font-mono text-xs text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              <ArrowUpIcon size={13} />
              <span>{copy().ui.backToTopLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
