import { createSignal, For, Match, Show, Switch, type Component } from "solid-js";
import type { ProjectId } from "@/types/content";
import type { CaseStudyBlock, CaseStudyCopy, ProjectPageCopy } from "@/types/project";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { PROJECT_ORDER, PROJECTS_SHARED } from "@/content/shared/projects";
import {
  getProjectCopy,
  getProjectSummary,
  isCaseStudyCopy,
} from "@/content/project-copy";
import { getProjectLinksCopy } from "@/content/project-links";
import {
  buildHomePath,
  buildProjectPath,
  buildProjectsIndexPath,
  withRoleQuery,
} from "@/lib/paths";
import { TechList } from "@/components/ui/TechList";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CopyIcon } from "@/components/ui/icons";

const CodeBlockCard: Component<{ title: string; language: string; snippet: string }> = (
  props,
) => {
  const { lang } = useLanguage();
  const [copied, setCopied] = createSignal(false);

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(props.snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked
    }
  };

  return (
    <div class="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[#0b0e17]">
      <div class="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-4 py-2 font-mono text-xs text-[var(--color-accent)]">
        <span class="truncate">{props.title}</span>
        <div class="flex items-center gap-3 shrink-0">
          <span class="text-[var(--color-fg-subtle)]">{props.language}</span>
          <button
            type="button"
            onClick={() => void handleCopy()}
            class="inline-flex items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-0.5 text-[11px] text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-fg)]"
          >
            <Show when={copied()} fallback={<CopyIcon size={12} />}>
              <CheckIcon size={12} class="text-[var(--color-success)]" />
            </Show>
            <span>
              {copied()
                ? lang() === "es"
                  ? "Copiado"
                  : "Copied"
                : lang() === "es"
                  ? "Copiar"
                  : "Copy"}
            </span>
          </button>
        </div>
      </div>
      <pre class="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-[var(--color-fg-muted)]">
        <code>{props.snippet}</code>
      </pre>
    </div>
  );
};

const CaseStudyBlockView: Component<{ block: CaseStudyBlock }> = (props) => (
  <Switch>
    <Match when={props.block.type === "text" ? props.block : null}>
      {(b) => (
        <div class="space-y-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
          <For each={b().paragraphs}>{(p) => <p>{p}</p>}</For>
        </div>
      )}
    </Match>

    <Match when={props.block.type === "metrics" ? props.block : null}>
      {(b) => (
        <div class="grid gap-4 sm:grid-cols-3">
          <For each={b().items}>
            {(m) => (
              <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <p class="font-display text-3xl text-[var(--color-primary)]">{m.value}</p>
                <p class="mt-1 text-sm font-semibold text-[var(--color-fg)]">{m.label}</p>
                <p class="mt-1 text-xs text-[var(--color-fg-muted)]">{m.detail}</p>
              </div>
            )}
          </For>
        </div>
      )}
    </Match>

    <Match when={props.block.type === "architecture" ? props.block : null}>
      {(b) => (
        <div class="space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <p class="font-mono text-xs text-[var(--color-accent)]">{b().caption}</p>
          <div class="grid gap-3 md:grid-cols-3">
            <For each={b().layers}>
              {(layer) => (
                <div class="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
                  <p class="font-display text-lg text-[var(--color-fg)]">{layer.name}</p>
                  <p class="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">
                    {layer.role}
                  </p>
                  <div class="mt-3 flex flex-wrap gap-1.5">
                    <For each={layer.tools}>{(t) => <span class="tech-badge">{t}</span>}</For>
                  </div>
                </div>
              )}
            </For>
          </div>
        </div>
      )}
    </Match>

    <Match when={props.block.type === "comparison" ? props.block : null}>
      {(b) => (
        <div class="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <table class="w-full min-w-[540px] border-collapse text-left text-sm">
            <thead>
              <tr class="border-b border-[var(--color-border)] bg-[var(--color-surface-raised)] font-mono text-xs text-[var(--color-accent)]">
                <th class="px-4 py-3">{b().headers[0]}</th>
                <th class="px-4 py-3">{b().headers[1]}</th>
                <th class="px-4 py-3">{b().headers[2]}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--color-border)]">
              <For each={b().rows}>
                {(row) => (
                  <tr>
                    <td class="px-4 py-3 font-medium text-[var(--color-fg)]">{row[0]}</td>
                    <td class="px-4 py-3 text-[var(--color-fg-muted)]">{row[1]}</td>
                    <td class="px-4 py-3 text-[var(--color-success)]">{row[2]}</td>
                  </tr>
                )}
              </For>
            </tbody>
          </table>
        </div>
      )}
    </Match>

    <Match when={props.block.type === "code" ? props.block : null}>
      {(b) => (
        <CodeBlockCard
          title={b().title}
          language={b().language}
          snippet={b().snippet}
        />
      )}
    </Match>

    <Match when={props.block.type === "timeline" ? props.block : null}>
      {(b) => (
        <div class="space-y-3">
          <For each={b().steps}>
            {(step) => (
              <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
                <p class="font-mono text-xs text-[var(--color-accent)]">{step.phase}</p>
                <p class="mt-1 font-display text-lg text-[var(--color-fg)]">{step.title}</p>
                <p class="mt-1 text-sm text-[var(--color-fg-muted)]">{step.outcome}</p>
              </div>
            )}
          </For>
        </div>
      )}
    </Match>

    <Match when={props.block.type === "callout" ? props.block : null}>
      {(b) => (
        <div class="rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)]/70 p-5">
          <p class="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
            {b().title}
          </p>
          <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg)]">{b().body}</p>
        </div>
      )}
    </Match>
  </Switch>
);

export const ProjectsIndexView: Component = () => {
  const { lang, copy } = useLanguage();
  const { role, locked } = useRole();
  const [filter, setFilter] = createSignal<"all" | "admin" | "tech">("all");
  const linksCopy = () => getProjectLinksCopy(lang());
  const projCopy = () => copy().projects;

  const filtered = () => {
    const f = filter();
    return PROJECT_ORDER.map((id) => PROJECTS_SHARED[id]).filter(
      (p) => f === "all" || p.roleAffinity === f || p.roleAffinity === "both",
    );
  };

  return (
    <div class="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
      <a
        href={withRoleQuery(buildHomePath(lang(), role()), undefined, locked())}
        class="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
      >
        <ArrowLeftIcon size={14} />
        <span>{linksCopy().backToPortfolio}</span>
      </a>

      <header class="mt-6 max-w-3xl">
        <p class="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
          {projCopy().eyebrow}
        </p>
        <h1 class="mt-2 font-display text-4xl text-[var(--color-fg)] sm:text-5xl">
          {linksCopy().projectsIndexTitle}
        </h1>
        <p class="mt-3 text-base leading-relaxed text-[var(--color-fg-muted)]">
          {linksCopy().projectsIndexSubtitle}
        </p>
      </header>

      <div class="mt-8 inline-flex gap-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-1 text-xs">
        <For
          each={[
            { id: "all" as const, label: projCopy().filterAllLabel },
            { id: "admin" as const, label: projCopy().filterAdminLabel },
            { id: "tech" as const, label: projCopy().filterTechLabel },
          ]}
        >
          {(tab) => (
            <button
              type="button"
              onClick={() => setFilter(tab.id)}
              class={`rounded-full px-3.5 py-1.5 font-medium transition ${
                filter() === tab.id
                  ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              {tab.label}
            </button>
          )}
        </For>
      </div>

      <div class="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <For each={filtered()}>
          {(shared) => {
            const summary = () => getProjectSummary(lang(), shared.id);
            return (
              <article class="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover-glow">
                <div>
                  <span class="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--color-accent)]">
                    {shared.kind === "case-study"
                      ? linksCopy().caseStudyBadge
                      : linksCopy().projectPageBadge}
                  </span>
                  <h2 class="mt-4 font-display text-2xl text-[var(--color-fg)]">
                    {summary().title}
                  </h2>
                  <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {summary().summary}
                  </p>
                </div>

                <div class="mt-6 space-y-4">
                  <TechList items={shared.stack} limit={5} />
                  <a
                    href={buildProjectPath(lang(), shared.slug, role(), locked())}
                    class="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                  >
                    <span>{projCopy().viewCaseLabel}</span>
                    <ArrowRightIcon size={13} />
                  </a>
                </div>
              </article>
            );
          }}
        </For>
      </div>
    </div>
  );
};

const CaseStudyDetail: Component<{ data: CaseStudyCopy }> = (props) => {
  const { lang } = useLanguage();
  return (
    <div class="space-y-12">
      <div class="grid gap-4 sm:grid-cols-3">
        <For each={props.data.heroMetrics}>
          {(metric) => (
            <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <p class="font-display text-3xl text-[var(--color-primary)]">{metric.value}</p>
              <p class="mt-1 text-sm text-[var(--color-fg-muted)]">{metric.label}</p>
            </div>
          )}
        </For>
      </div>

      <nav
        aria-label={lang() === "es" ? "Índice del caso de estudio" : "Case study sections"}
        class="flex flex-wrap gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/80 p-3"
      >
        <For each={props.data.sections}>
          {(sec, idx) => (
            <a
              href={`#section-${sec.id}`}
              class="rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 font-mono text-xs text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
            >
              0{idx() + 1} · {sec.eyebrow}
            </a>
          )}
        </For>
      </nav>

      <For each={props.data.sections}>
        {(sec) => (
          <section
            id={`section-${sec.id}`}
            class="scroll-mt-24 space-y-5 border-t border-[var(--color-border)] pt-10"
          >
            <p class="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {sec.eyebrow}
            </p>
            <h2 class="font-display text-2xl text-[var(--color-fg)] sm:text-3xl">{sec.title}</h2>
            <div class="space-y-6">
              <For each={sec.blocks}>{(block) => <CaseStudyBlockView block={block} />}</For>
            </div>
          </section>
        )}
      </For>
    </div>
  );
};

const ProjectPageDetail: Component<{ data: ProjectPageCopy }> = (props) => (
  <div class="space-y-10">
    <div class="space-y-4 text-base leading-relaxed text-[var(--color-fg-muted)]">
      <For each={props.data.overview}>{(p) => <p>{p}</p>}</For>
    </div>

    <section class="space-y-4 border-t border-[var(--color-border)] pt-8">
      <h2 class="font-display text-2xl text-[var(--color-fg)]">{props.data.highlightsTitle}</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <For each={props.data.highlights}>
          {(item) => (
            <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <Show when={item.metric}>
                <p class="font-display text-2xl text-[var(--color-primary)]">{item.metric}</p>
              </Show>
              <h3 class="mt-1 font-display text-xl text-[var(--color-fg)]">{item.title}</h3>
              <p class="mt-2 text-sm text-[var(--color-fg-muted)]">{item.detail}</p>
            </div>
          )}
        </For>
      </div>
    </section>

    <section class="space-y-4 border-t border-[var(--color-border)] pt-8">
      <h2 class="font-display text-2xl text-[var(--color-fg)]">{props.data.architectureTitle}</h2>
      <div class="grid gap-4 md:grid-cols-3">
        <For each={props.data.architectureNodes}>
          {(node) => (
            <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <p class="font-display text-lg text-[var(--color-fg)]">{node.label}</p>
              <p class="mt-2 text-sm text-[var(--color-fg-muted)]">{node.description}</p>
            </div>
          )}
        </For>
      </div>
    </section>

    <section class="space-y-3 border-t border-[var(--color-border)] pt-8">
      <h2 class="font-display text-2xl text-[var(--color-fg)]">{props.data.learningsTitle}</h2>
      <ul class="space-y-2 text-sm text-[var(--color-fg-muted)]">
        <For each={props.data.learnings}>
          {(item) => (
            <li class="flex gap-2.5">
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
              <span>{item}</span>
            </li>
          )}
        </For>
      </ul>
    </section>
  </div>
);

export const ProjectDetailView: Component<{ projectId: ProjectId }> = (props) => {
  const { lang } = useLanguage();
  const { role, locked } = useRole();

  const linksCopy = () => getProjectLinksCopy(lang());
  const shared = () => PROJECTS_SHARED[props.projectId];
  const entry = () => getProjectCopy(lang(), props.projectId);

  const idx = () => PROJECT_ORDER.indexOf(props.projectId);
  const prevId = () =>
    PROJECT_ORDER[(idx() - 1 + PROJECT_ORDER.length) % PROJECT_ORDER.length];
  const nextId = () => PROJECT_ORDER[(idx() + 1) % PROJECT_ORDER.length];

  return (
    <article class="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
      <div class="flex flex-wrap items-center gap-4 font-mono text-xs text-[var(--color-primary)]">
        <a
          href={withRoleQuery(buildHomePath(lang(), role()), undefined, locked())}
          class="inline-flex items-center gap-1.5 hover:text-[var(--color-primary-hover)]"
        >
          <ArrowLeftIcon size={14} />
          <span>{linksCopy().backToPortfolio}</span>
        </a>
        <span class="text-[var(--color-border-strong)]">/</span>
        <a
          href={buildProjectsIndexPath(lang(), role(), locked())}
          class="hover:text-[var(--color-primary-hover)]"
        >
          {linksCopy().backToProjects}
        </a>
      </div>

      <header class="mt-8 space-y-4">
        <div class="flex flex-wrap items-center gap-3">
          <span class="rounded-full bg-[var(--color-primary-soft)] px-3 py-1 font-mono text-xs text-[var(--color-accent)]">
            {shared().kind === "case-study"
              ? linksCopy().caseStudyBadge
              : linksCopy().projectPageBadge}
          </span>
          <span class="font-mono text-xs text-[var(--color-fg-subtle)]">
            {linksCopy().periodLabel}: {shared().period}
          </span>
        </div>

        <h1 class="font-display text-3xl leading-tight text-[var(--color-fg)] sm:text-5xl">
          {entry().title}
        </h1>
        <p class="text-lg text-[var(--color-fg-muted)]">{entry().subtitle}</p>
        <TechList items={shared().stack} />
      </header>

      <div class="mt-12">
        <Show
          when={isCaseStudyCopy(entry())}
          fallback={<ProjectPageDetail data={entry() as ProjectPageCopy} />}
        >
          <CaseStudyDetail data={entry() as CaseStudyCopy} />
        </Show>
      </div>

      <nav
        aria-label="Project navigation"
        class="mt-14 grid gap-4 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2"
      >
        <a
          href={buildProjectPath(lang(), PROJECTS_SHARED[prevId()].slug, role(), locked())}
          class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover-glow"
        >
          <p class="font-mono text-xs text-[var(--color-accent)]">{linksCopy().previousLabel}</p>
          <p class="mt-1 font-display text-lg text-[var(--color-fg)]">
            {getProjectSummary(lang(), prevId()).title}
          </p>
        </a>
        <a
          href={buildProjectPath(lang(), PROJECTS_SHARED[nextId()].slug, role(), locked())}
          class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 text-right hover-glow"
        >
          <p class="font-mono text-xs text-[var(--color-accent)]">{linksCopy().nextLabel}</p>
          <p class="mt-1 font-display text-lg text-[var(--color-fg)]">
            {getProjectSummary(lang(), nextId()).title}
          </p>
        </a>
      </nav>
    </article>
  );
};
