import { For, Show, type Component } from "solid-js";
import type { DetailCollection } from "@/types/content";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import {
  getDetailCollectionIndexCopy,
  getDetailItemCopy,
  getDetailItemsForCollection,
  getDetailUiCopy,
} from "@/content/detail-copy";
import { PROJECTS_SHARED } from "@/content/shared/projects";
import { getProjectSummary } from "@/content/project-copy";
import {
  buildDetailIndexPath,
  buildDetailItemPath,
  buildHomePath,
  buildProjectPath,
  withRoleQuery,
} from "@/lib/paths";
import { TechList } from "@/components/ui/TechList";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@/components/ui/icons";

export const DetailIndexView: Component<{ collection: DetailCollection }> = (props) => {
  const { lang } = useLanguage();
  const { role, locked } = useRole();

  const indexCopy = () => getDetailCollectionIndexCopy(lang(), props.collection);
  const items = () => getDetailItemsForCollection(lang(), props.collection);
  const ui = () => getDetailUiCopy(lang());

  return (
    <div class="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
      <a
        href={withRoleQuery(buildHomePath(lang(), role()), undefined, locked())}
        class="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
      >
        <ArrowLeftIcon size={14} />
        <span>{ui().backToPortfolio}</span>
      </a>

      <header class="mt-6 max-w-3xl">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {indexCopy().eyebrow}
        </p>
        <h1 class="mt-2 font-display text-4xl text-[var(--color-fg)] sm:text-5xl">
          {indexCopy().title}
        </h1>
        <p class="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)]">
          {indexCopy().subtitle}
        </p>
      </header>

      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <For each={items()}>
          {(item) => (
            <article class="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
              <div>
                <p class="font-mono text-xs text-[var(--color-accent)]">{item.eyebrow}</p>
                <h2 class="mt-2 font-display text-2xl text-[var(--color-fg)]">{item.title}</h2>
                <p class="mt-1 text-sm text-[var(--color-primary)]">{item.subtitle}</p>
                <p class="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                  {item.overview[0]}
                </p>
              </div>
              <div class="mt-6 space-y-4">
                <TechList items={item.tools} limit={5} />
                <a
                  href={buildDetailItemPath(
                    lang(),
                    props.collection,
                    item.slug,
                    role(),
                    locked(),
                  )}
                  class="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                >
                  <span>{ui().viewEntryLabel}</span>
                  <ArrowRightIcon size={13} />
                </a>
              </div>
            </article>
          )}
        </For>
      </div>
    </div>
  );
};

export const DetailItemView: Component<{
  collection: DetailCollection;
  slug: string;
}> = (props) => {
  const { lang } = useLanguage();
  const { role, locked } = useRole();

  const items = () => getDetailItemsForCollection(lang(), props.collection);
  const item = () => getDetailItemCopy(lang(), props.collection, props.slug);
  const ui = () => getDetailUiCopy(lang());

  const idx = () => items().findIndex((it) => it.slug === props.slug);
  const prevItem = () => {
    const list = items();
    return list[(idx() - 1 + list.length) % list.length];
  };
  const nextItem = () => {
    const list = items();
    return list[(idx() + 1) % list.length];
  };

  return (
    <article class="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
      <div class="flex flex-wrap items-center gap-3 font-mono text-xs text-[var(--color-primary)]">
        <a
          href={withRoleQuery(buildHomePath(lang(), role()), undefined, locked())}
          class="inline-flex items-center gap-1.5 hover:text-[var(--color-primary-hover)]"
        >
          <ArrowLeftIcon size={14} />
          <span>{ui().backToPortfolio}</span>
        </a>
        <span class="text-[var(--color-border-strong)]">/</span>
        <a
          href={buildDetailIndexPath(lang(), props.collection, role(), locked())}
          class="hover:text-[var(--color-primary-hover)]"
        >
          {ui().backToCollection}
        </a>
      </div>

      <header class="mt-8 space-y-4">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {item().eyebrow}
        </p>
        <h1 class="font-display text-3xl leading-tight text-[var(--color-fg)] sm:text-5xl">
          {item().title}
        </h1>
        <p class="text-lg text-[var(--color-primary)]">{item().subtitle}</p>

        <div class="grid gap-3 pt-2 sm:grid-cols-3">
          <For each={item().meta}>
            {(m) => (
              <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <p class="font-mono text-[11px] uppercase text-[var(--color-accent)]">{m.label}</p>
                <p class="mt-1 text-sm font-medium text-[var(--color-fg)]">{m.value}</p>
              </div>
            )}
          </For>
        </div>
      </header>

      <div class="mt-10 space-y-10">
        <div class="space-y-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
          <For each={item().overview}>{(p) => <p>{p}</p>}</For>
        </div>

        <section class="border-t border-[var(--color-border)] pt-8">
          <h2 class="font-display text-2xl text-[var(--color-fg)]">{item().keyPointsTitle}</h2>
          <ul class="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
            <For each={item().keyPoints}>
              {(kp) => (
                <li class="flex items-start gap-2.5">
                  <CheckIcon size={16} class="mt-0.5 shrink-0 text-[var(--color-success)]" />
                  <span>{kp}</span>
                </li>
              )}
            </For>
          </ul>
        </section>

        <section class="border-t border-[var(--color-border)] pt-8">
          <h2 class="font-display text-2xl text-[var(--color-fg)]">{item().outcomesTitle}</h2>
          <div class="mt-4 grid gap-4 sm:grid-cols-3">
            <For each={item().outcomes}>
              {(out) => (
                <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <p class="font-display text-2xl text-[var(--color-primary)]">{out.metric}</p>
                  <p class="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">
                    {out.label}
                  </p>
                </div>
              )}
            </For>
          </div>
        </section>

        <section class="border-t border-[var(--color-border)] pt-8">
          <h2 class="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
            {ui().toolsLabel}
          </h2>
          <div class="mt-3">
            <TechList items={item().tools} />
          </div>
        </section>

        <Show when={item().relatedProjects.length > 0}>
          <section class="border-t border-[var(--color-border)] pt-8">
            <h2 class="font-display text-2xl text-[var(--color-fg)]">
              {ui().relatedProjectsTitle}
            </h2>
            <div class="mt-4 grid gap-4 sm:grid-cols-2">
              <For each={item().relatedProjects}>
                {(projId) => {
                  const pShared = PROJECTS_SHARED[projId];
                  const pSummary = getProjectSummary(lang(), projId);
                  return (
                    <a
                      href={buildProjectPath(lang(), pShared.slug, role(), locked())}
                      class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover-glow"
                    >
                      <p class="font-mono text-xs text-[var(--color-accent)]">
                        {pSummary.category}
                      </p>
                      <p class="mt-1 font-display text-xl text-[var(--color-fg)]">
                        {pSummary.title}
                      </p>
                      <p class="mt-2 inline-flex items-center gap-1 font-mono text-xs text-[var(--color-primary)]">
                        <span>{ui().viewProjectLabel}</span>
                        <ArrowRightIcon size={12} />
                      </p>
                    </a>
                  );
                }}
              </For>
            </div>
          </section>
        </Show>
      </div>

      <nav
        aria-label="Entry navigation"
        class="mt-14 grid gap-4 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2"
      >
        <a
          href={buildDetailItemPath(lang(), props.collection, prevItem().slug, role(), locked())}
          class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover-glow"
        >
          <p class="font-mono text-xs text-[var(--color-accent)]">{ui().previousLabel}</p>
          <p class="mt-1 font-display text-lg text-[var(--color-fg)]">{prevItem().title}</p>
        </a>
        <a
          href={buildDetailItemPath(lang(), props.collection, nextItem().slug, role(), locked())}
          class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:text-right hover-glow"
        >
          <p class="font-mono text-xs text-[var(--color-accent)]">{ui().nextLabel}</p>
          <p class="mt-1 font-display text-lg text-[var(--color-fg)]">{nextItem().title}</p>
        </a>
      </nav>
    </article>
  );
};
