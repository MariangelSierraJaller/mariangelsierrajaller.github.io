import { createSignal, For, Show, type Component } from "solid-js";
import type { JourneyLineId, JourneyTabId } from "@/types/journey";
import { useLanguage } from "@/context/language";
import { useRole } from "@/context/role";
import { getJourneyCopy } from "@/content/journey";
import { buildDetailItemPath, buildProjectPath } from "@/lib/paths";
import { Section } from "@/components/layout/Section";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

const TAB_ORDER: readonly JourneyTabId[] = ["map", "evolution", "focus", "horizon"];

const LINE_ORDER: readonly JourneyLineId[] = [
  "education",
  "admin",
  "finance",
  "data",
  "erp",
  "biomedical",
];

function polarPoint(cx: number, cy: number, radius: number, angleIdx: number, total: number) {
  const angle = -Math.PI / 2 + (angleIdx * 2 * Math.PI) / total;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export const JourneySection: Component = () => {
  const { lang } = useLanguage();
  const { role, locked } = useRole();
  const [activeTab, setActiveTab] = createSignal<JourneyTabId>("map");
  const [activeLine, setActiveLine] = createSignal<JourneyLineId | "all">("all");
  const [selectedNodeId, setSelectedNodeId] = createSignal<string | null>(null);
  const [showAdmin, setShowAdmin] = createSignal(true);
  const [showTech, setShowTech] = createSignal(true);
  const [showHybrid, setShowHybrid] = createSignal(true);

  const journey = () => getJourneyCopy(lang());

  const visibleNodes = () => {
    const lineFilter = activeLine();
    const all = journey().nodes;
    return lineFilter === "all" ? all : all.filter((n) => n.line === lineFilter);
  };

  const selectedNode = () => {
    const pool = visibleNodes();
    if (pool.length === 0) return journey().nodes[0];
    return pool.find((n) => n.id === selectedNodeId()) ?? pool[0];
  };

  const stepNode = (delta: number) => {
    const pool = visibleNodes();
    if (pool.length === 0) return;
    const current = selectedNode();
    const curIdx = pool.findIndex((n) => n.id === current?.id);
    const nextIdx = (Math.max(0, curIdx) + delta + pool.length) % pool.length;
    setSelectedNodeId(pool[nextIdx].id);
  };

  const nodeHref = (link?: {
    kind: "project" | "detail";
    collection?: "experience" | "education" | "certifications";
    slug: string;
  }) => {
    if (!link) return undefined;
    if (link.kind === "project") {
      return buildProjectPath(lang(), link.slug, role(), locked());
    }
    return buildDetailItemPath(
      lang(),
      link.collection ?? "education",
      link.slug,
      role(),
      locked(),
    );
  };

  const radarPolygonPoints = (values: number[], cx: number, cy: number, maxR: number) =>
    values
      .map((val, idx) => {
        const pt = polarPoint(cx, cy, (val / 100) * maxR, idx, values.length);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <Section
      id="journey"
      eyebrow={journey().eyebrow}
      title={journey().title}
      subtitle={journey().subtitle}
      surface="alt"
    >
      {/* 4-Tab Navigation */}
      <div role="tablist" aria-label={journey().title} class="mb-8 flex flex-wrap gap-2">
        <For each={TAB_ORDER}>
          {(tabId) => {
            const active = () => activeTab() === tabId;
            return (
              <button
                type="button"
                role="tab"
                id={`journey-tab-${tabId}`}
                aria-selected={active()}
                aria-controls={`journey-panel-${tabId}`}
                onClick={() => setActiveTab(tabId)}
                class={`rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  active()
                    ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                }`}
              >
                {journey().tabs[tabId].label}
              </button>
            );
          }}
        </For>
      </div>

      {/* Tab 1: Transit Map 2019-2028 */}
      <Show when={activeTab() === "map"}>
        <div
          id="journey-panel-map"
          role="tabpanel"
          aria-labelledby="journey-tab-map"
          class="space-y-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-5 sm:p-7"
        >
          <p class="text-sm text-[var(--color-fg-muted)]">{journey().tabs.map.description}</p>

          {/* Interactive Line Filter Legend */}
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              aria-pressed={activeLine() === "all"}
              onClick={() => setActiveLine("all")}
              class={`rounded-full border px-3 py-1 font-mono text-xs transition ${
                activeLine() === "all"
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] font-semibold text-[var(--color-on-primary)]"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]"
              }`}
            >
              {lang() === "es" ? "Todas las líneas" : "All lines"}
            </button>
            <For each={LINE_ORDER}>
              {(lineId) => {
                const line = () => journey().lines[lineId];
                const isSelected = () => activeLine() === lineId;
                return (
                  <button
                    type="button"
                    aria-pressed={isSelected()}
                    onClick={() => setActiveLine((prev) => (prev === lineId ? "all" : lineId))}
                    class={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs transition ${
                      isSelected()
                        ? "border-[var(--color-primary)] bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    <span
                      class="h-2.5 w-2.5 rounded-full"
                      style={{ "background-color": line().color }}
                    />
                    <span>{line().label}</span>
                  </button>
                );
              }}
            </For>
          </div>

          {/* Interactive SVG Metro Diagram */}
          <div class="overflow-x-auto pb-2">
            <svg
              viewBox="0 0 920 260"
              role="img"
              aria-label={journey().title}
              class="min-w-[740px] w-full"
            >
              {/* Horizontal transit tracks */}
              <For each={LINE_ORDER}>
                {(lineId, idx) => {
                  const y = () => 34 + idx() * 38;
                  const line = journey().lines[lineId];
                  const lineOpacity = () =>
                    activeLine() === "all" || activeLine() === lineId ? "0.42" : "0.1";
                  return (
                    <g>
                      <line
                        x1="40"
                        y1={y()}
                        x2="880"
                        y2={y()}
                        stroke={line.color}
                        stroke-opacity={lineOpacity()}
                        stroke-width="3"
                        stroke-linecap="round"
                      />
                    </g>
                  );
                }}
              </For>

              {/* Station Nodes */}
              <For each={journey().nodes}>
                {(node) => {
                  const lineIdx = LINE_ORDER.indexOf(node.line);
                  const y = 34 + Math.max(0, lineIdx) * 38;
                  const x = 60 + ((node.year - 2019) / 9) * 800;
                  const color = journey().lines[node.line].color;
                  const isSelected = () => selectedNode()?.id === node.id;
                  const isHighlighted = () =>
                    activeLine() === "all" || activeLine() === node.line;

                  return (
                    <g
                      class="cursor-pointer transition-opacity"
                      style={{ opacity: isHighlighted() ? "1" : "0.22" }}
                      onClick={() => setSelectedNodeId(node.id)}
                    >
                      <Show when={isSelected()}>
                        <circle
                          cx={x}
                          cy={y}
                          r="13"
                          fill="none"
                          stroke={color}
                          stroke-width="2"
                          stroke-opacity="0.7"
                        />
                      </Show>
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected() ? 7 : 5.5}
                        fill="#131622"
                        stroke={color}
                        stroke-width="3"
                      />
                      <text
                        x={x}
                        y={y - 12}
                        text-anchor="middle"
                        fill="#CBE4FB"
                        font-size="10"
                        font-family="var(--font-mono)"
                      >
                        {node.year} · {node.label}
                      </text>
                    </g>
                  );
                }}
              </For>
            </svg>
          </div>

          {/* Station Selector Pills & Detail Card */}
          <div class="grid gap-4 md:grid-cols-[1fr_1.2fr]">
            <div class="flex flex-wrap content-start gap-2">
              <For each={visibleNodes()}>
                {(node) => {
                  const active = () => selectedNode()?.id === node.id;
                  return (
                    <button
                      type="button"
                      onClick={() => setSelectedNodeId(node.id)}
                      class={`rounded-xl border px-3 py-1.5 text-left text-xs transition ${
                        active()
                          ? "border-[var(--color-primary)] bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                          : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)]"
                      }`}
                    >
                      <span class="font-mono text-[var(--color-accent)]">{node.year}</span>{" "}
                      <span>{node.station}</span>
                    </button>
                  );
                }}
              </For>
            </div>

            <Show when={selectedNode()}>
              {(node) => (
                <div class="flex flex-col justify-between rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-5">
                  <div>
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-mono text-xs text-[var(--color-accent)]">
                        {node().year} · {journey().lines[node().line].label}
                      </span>
                      <div class="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => stepNode(-1)}
                          aria-label={lang() === "es" ? "Hito anterior" : "Previous milestone"}
                          class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        >
                          <ChevronLeftIcon size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => stepNode(1)}
                          aria-label={lang() === "es" ? "Siguiente hito" : "Next milestone"}
                          class="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        >
                          <ChevronRightIcon size={14} />
                        </button>
                      </div>
                    </div>
                    <h3 class="mt-2 font-display text-xl text-[var(--color-fg)]">
                      {node().station}
                    </h3>
                    <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {node().detail}
                    </p>
                  </div>
                  <Show when={nodeHref(node().link)}>
                    {(href) => (
                      <a
                        href={href()}
                        class="mt-4 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                      >
                        <span>
                          {lang() === "es" ? "Explorar ficha completa" : "Open full entry"}
                        </span>
                        <ArrowRightIcon size={13} />
                      </a>
                    )}
                  </Show>
                </div>
              )}
            </Show>
          </div>
        </div>
      </Show>

      {/* Tab 2: Capability Heatmap */}
      <Show when={activeTab() === "evolution"}>
        <div
          id="journey-panel-evolution"
          role="tabpanel"
          aria-labelledby="journey-tab-evolution"
          class="space-y-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-5 sm:p-7"
        >
          <p class="text-sm text-[var(--color-fg-muted)]">
            {journey().tabs.evolution.description}
          </p>

          <div class="overflow-x-auto">
            <table class="w-full min-w-[640px] border-collapse text-left text-xs">
              <thead>
                <tr class="border-b border-[var(--color-border)] text-[var(--color-accent)]">
                  <th class="py-3 pr-4 font-mono uppercase">
                    {lang() === "es" ? "Etapa" : "Stage"}
                  </th>
                  <For each={journey().capabilityAxes}>
                    {(axis) => <th class="px-2 py-3 text-center font-mono">{axis.label}</th>}
                  </For>
                </tr>
              </thead>
              <tbody class="divide-y divide-[var(--color-border)]">
                <For each={journey().epochs}>
                  {(epoch) => (
                    <tr>
                      <td class="py-3 pr-4">
                        <p class="font-mono text-[var(--color-accent)]">{epoch.year}</p>
                        <p class="font-medium text-[var(--color-fg)]">{epoch.title}</p>
                      </td>
                      <For each={journey().capabilityAxes}>
                        {(axis) => {
                          const score = epoch.scores[axis.id];
                          return (
                            <td class="px-2 py-3 text-center">
                              <div
                                class="mx-auto flex h-9 w-16 items-center justify-center rounded-lg border border-[var(--color-border)] font-mono font-semibold text-[var(--color-fg)]"
                                style={{
                                  "background-color": `rgba(92, 163, 255, ${(0.08 + (score / 100) * 0.42).toFixed(2)})`,
                                }}
                              >
                                {score}%
                              </div>
                            </td>
                          );
                        }}
                      </For>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </div>
      </Show>

      {/* Tab 3: Dual Focus Radar */}
      <Show when={activeTab() === "focus"}>
        <div
          id="journey-panel-focus"
          role="tabpanel"
          aria-labelledby="journey-tab-focus"
          class="grid gap-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-5 sm:p-7 lg:grid-cols-2 lg:items-center"
        >
          <div class="space-y-4">
            <h3 class="font-display text-2xl text-[var(--color-fg)]">{journey().focusTitle}</h3>
            <p class="text-sm leading-relaxed text-[var(--color-fg-muted)]">
              {journey().focusSubtitle}
            </p>
            <div class="flex flex-wrap gap-2 pt-2 font-mono text-xs">
              <button
                type="button"
                aria-pressed={showHybrid()}
                onClick={() => setShowHybrid((v) => !v)}
                class={`inline-flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                  showHybrid()
                    ? "border-[var(--color-primary)] bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-subtle)] opacity-60"
                }`}
              >
                <span class="h-2.5 w-2.5 rounded-full bg-[#5CA3FF]" />
                <span>{journey().focusLegend.hybrid}</span>
              </button>
              <button
                type="button"
                aria-pressed={showAdmin()}
                onClick={() => setShowAdmin((v) => !v)}
                class={`inline-flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                  showAdmin()
                    ? "border-[#5CE6A0]/60 bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-subtle)] opacity-60"
                }`}
              >
                <span class="h-2.5 w-2.5 rounded-full bg-[#5CE6A0]" />
                <span>{journey().focusLegend.admin}</span>
              </button>
              <button
                type="button"
                aria-pressed={showTech()}
                onClick={() => setShowTech((v) => !v)}
                class={`inline-flex items-center gap-2 rounded-full border px-3 py-1 transition ${
                  showTech()
                    ? "border-[#67C6F5]/60 bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-subtle)] opacity-60"
                }`}
              >
                <span class="h-2.5 w-2.5 rounded-full bg-[#67C6F5]" />
                <span>{journey().focusLegend.tech}</span>
              </button>
            </div>

            <div class="space-y-2.5 pt-3">
              <For each={journey().focusAxes}>
                {(ax) => (
                  <div class="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2 text-xs">
                    <span class="font-medium text-[var(--color-fg)]">{ax.axis}</span>
                    <div class="flex gap-3 font-mono">
                      <span class="text-[#5CE6A0]">{ax.admin}%</span>
                      <span class="text-[#67C6F5]">{ax.tech}%</span>
                      <span class="text-[#5CA3FF]">{ax.hybrid}%</span>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>

          <div class="flex justify-center">
            <svg viewBox="0 0 360 320" class="w-full max-w-[360px]" aria-hidden="true">
              <For each={[25, 50, 75, 100]}>
                {(ring) => (
                  <polygon
                    points={radarPolygonPoints(
                      journey().focusAxes.map(() => ring),
                      180,
                      160,
                      110,
                    )}
                    fill="none"
                    stroke="#364266"
                    stroke-width="1"
                  />
                )}
              </For>

              <For each={journey().focusAxes}>
                {(ax, idx) => {
                  const outer = () =>
                    polarPoint(180, 160, 110, idx(), journey().focusAxes.length);
                  const labelPt = () =>
                    polarPoint(180, 160, 132, idx(), journey().focusAxes.length);
                  return (
                    <g>
                      <line
                        x1="180"
                        y1="160"
                        x2={outer().x}
                        y2={outer().y}
                        stroke="#364266"
                        stroke-width="1"
                      />
                      <text
                        x={labelPt().x}
                        y={labelPt().y}
                        text-anchor="middle"
                        dominant-baseline="middle"
                        fill="#CBE4FB"
                        font-size="10"
                        font-family="var(--font-mono)"
                      >
                        {ax.axis}
                      </text>
                    </g>
                  );
                }}
              </For>

              <Show when={showAdmin()}>
                <polygon
                  points={radarPolygonPoints(
                    journey().focusAxes.map((a) => a.admin),
                    180,
                    160,
                    110,
                  )}
                  fill="rgba(92, 230, 160, 0.16)"
                  stroke="#5CE6A0"
                  stroke-width="2"
                />
              </Show>
              <Show when={showTech()}>
                <polygon
                  points={radarPolygonPoints(
                    journey().focusAxes.map((a) => a.tech),
                    180,
                    160,
                    110,
                  )}
                  fill="rgba(103, 198, 245, 0.16)"
                  stroke="#67C6F5"
                  stroke-width="2"
                />
              </Show>
              <Show when={showHybrid()}>
                <polygon
                  points={radarPolygonPoints(
                    journey().focusAxes.map((a) => a.hybrid),
                    180,
                    160,
                    110,
                  )}
                  fill="rgba(92, 163, 255, 0.24)"
                  stroke="#5CA3FF"
                  stroke-width="2.5"
                />
              </Show>
            </svg>
          </div>
        </div>
      </Show>

      {/* Tab 4: Horizon 2026-2028 */}
      <Show when={activeTab() === "horizon"}>
        <div
          id="journey-panel-horizon"
          role="tabpanel"
          aria-labelledby="journey-tab-horizon"
          class="space-y-6 rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-5 sm:p-7"
        >
          <p class="text-sm text-[var(--color-fg-muted)]">
            {journey().tabs.horizon.description}
          </p>

          <div class="grid gap-5 md:grid-cols-2">
            <For each={journey().horizonMilestones}>
              {(milestone) => (
                <article class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover-glow">
                  <span class="font-mono text-xs text-[var(--color-accent)]">
                    {milestone.period}
                  </span>
                  <h3 class="mt-2 font-display text-xl text-[var(--color-fg)]">
                    {milestone.title}
                  </h3>
                  <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {milestone.description}
                  </p>
                  <ul class="mt-4 space-y-1.5 text-xs text-[var(--color-fg-muted)]">
                    <For each={milestone.outcomes}>
                      {(out) => (
                        <li class="flex items-start gap-2">
                          <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-primary)]" />
                          <span>{out}</span>
                        </li>
                      )}
                    </For>
                  </ul>
                </article>
              )}
            </For>
          </div>
        </div>
      </Show>
    </Section>
  );
};
