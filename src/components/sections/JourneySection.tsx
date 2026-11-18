import { createMemo, createSignal, For, Show, type Component } from "solid-js";
import type { JourneyLineId, JourneyNode, JourneyTabId } from "@/types/journey";
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

const YEAR_TICKS = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028] as const;

const TRACK_SHORT_LABELS: Record<"es" | "en", Record<JourneyLineId, string>> = {
  es: {
    education: "Educación",
    admin: "Administración",
    finance: "Finanzas",
    data: "Datos & BI",
    erp: "ERP NetSuite",
    biomedical: "Biomédica",
  },
  en: {
    education: "Education",
    admin: "Operations",
    finance: "Finance",
    data: "Data & BI",
    erp: "NetSuite ERP",
    biomedical: "Biomedical",
  },
};

function yearToX(year: number): number {
  return 204 + ((year - 2019) / 9) * 712;
}

function lineToY(lineIdx: number): number {
  return 68 + Math.max(0, lineIdx) * 44;
}

function splitRadarLabel(text: string): string[] {
  if (text.length <= 16) return [text];
  const words = text.split(" ");
  if (words.length <= 1) return [text];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function polarPoint(cx: number, cy: number, radius: number, angleIdx: number, total: number) {
  const angle = -Math.PI / 2 + (angleIdx * 2 * Math.PI) / total;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  };
}

export interface PositionedJourneyNode {
  node: JourneyNode;
  x: number;
  y: number;
  lineIdx: number;
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

  const positionedNodes = createMemo<PositionedJourneyNode[]>(() => {
    const all = journey().nodes;
    const buckets = new Map<string, JourneyNode[]>();
    for (const node of all) {
      const key = `${node.year}:${node.line}`;
      const list = buckets.get(key);
      if (list) list.push(node);
      else buckets.set(key, [node]);
    }

    return all.map((node) => {
      const lineIdx = Math.max(0, LINE_ORDER.indexOf(node.line));
      const bucket = buckets.get(`${node.year}:${node.line}`) ?? [node];
      const idxInBucket = bucket.indexOf(node);
      const offsetX =
        bucket.length > 1 ? (idxInBucket - (bucket.length - 1) / 2) * 26 : 0;
      return {
        node,
        x: Math.round((yearToX(node.year) + offsetX) * 10) / 10,
        y: lineToY(lineIdx),
        lineIdx,
      };
    });
  });

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

  const selectedPositioned = () => {
    const target = selectedNode();
    return positionedNodes().find((p) => p.node.id === target?.id);
  };

  const selectedIndex = () => {
    const pool = visibleNodes();
    const cur = selectedNode();
    return Math.max(0, pool.findIndex((n) => n.id === cur?.id));
  };

  const focusNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    if (!mapScrollerRef || mapScrollerRef.scrollWidth <= mapScrollerRef.clientWidth) return;
    const pos = positionedNodes().find((p) => p.node.id === nodeId);
    if (!pos) return;
    const svgWidth = mapScrollerRef.scrollWidth;
    const targetCenter = (pos.x / 980) * svgWidth;
    const nextLeft = Math.max(0, targetCenter - mapScrollerRef.clientWidth / 2);
    mapScrollerRef.scrollTo({ left: nextLeft, behavior: "smooth" });
  };

  const stepNode = (delta: number) => {
    const pool = visibleNodes();
    if (pool.length === 0) return;
    const nextIdx = (selectedIndex() + delta + pool.length) % pool.length;
    focusNode(pool[nextIdx].id);
  };

  const onTabKeyDown = (e: KeyboardEvent, currentTab: JourneyTabId) => {
    const idx = TAB_ORDER.indexOf(currentTab);
    let nextIdx = -1;
    if (e.key === "ArrowRight") nextIdx = (idx + 1) % TAB_ORDER.length;
    else if (e.key === "ArrowLeft") nextIdx = (idx - 1 + TAB_ORDER.length) % TAB_ORDER.length;
    else if (e.key === "Home") nextIdx = 0;
    else if (e.key === "End") nextIdx = TAB_ORDER.length - 1;

    if (nextIdx >= 0) {
      e.preventDefault();
      const nextTab = TAB_ORDER[nextIdx];
      setActiveTab(nextTab);
      if (typeof document !== "undefined") {
        document.getElementById(`journey-tab-${nextTab}`)?.focus();
      }
    }
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

  let mapScrollerRef: HTMLDivElement | undefined;
  let draggingMap = false;
  let dragStartX = 0;
  let dragStartScroll = 0;
  let movedDistance = 0;

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
                tabindex={active() ? 0 : -1}
                onClick={() => setActiveTab(tabId)}
                onKeyDown={(e) => onTabKeyDown(e, tabId)}
                class={`min-h-[40px] whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
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
              class={`min-h-[34px] whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs transition ${
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
                    class={`inline-flex min-h-[34px] items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1 font-mono text-xs transition ${
                      isSelected()
                        ? "border-[var(--color-primary)] bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                        : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-muted)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-fg)]"
                    }`}
                  >
                    <span
                      class="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ "background-color": line().color }}
                    />
                    <span>{line().label}</span>
                  </button>
                );
              }}
            </For>
          </div>

          {/* Interactive SVG Metro Diagram (collision-free coordinates & keyboard accessible) */}
          <div
            ref={mapScrollerRef}
            class="touch-pan-x cursor-grab overflow-x-auto pb-2 select-none active:cursor-grabbing"
            onPointerDown={(e) => {
              if (!mapScrollerRef || e.pointerType === "touch") return;
              draggingMap = true;
              movedDistance = 0;
              dragStartX = e.clientX;
              dragStartScroll = mapScrollerRef.scrollLeft;
            }}
            onPointerMove={(e) => {
              if (!draggingMap || !mapScrollerRef) return;
              const dx = e.clientX - dragStartX;
              movedDistance = Math.max(movedDistance, Math.abs(dx));
              mapScrollerRef.scrollLeft = dragStartScroll - dx;
            }}
            onPointerUp={() => {
              draggingMap = false;
            }}
            onPointerLeave={() => {
              draggingMap = false;
            }}
          >
            <svg
              viewBox="0 0 980 340"
              role="group"
              aria-label={journey().title}
              class="min-w-[780px] w-full"
            >
              {/* Top Year Ruler & Vertical Subtle Guides */}
              <For each={YEAR_TICKS}>
                {(year) => {
                  const x = yearToX(year);
                  return (
                    <g aria-hidden="true">
                      <line
                        x1={x}
                        y1="38"
                        x2={x}
                        y2="314"
                        stroke="#364266"
                        stroke-opacity="0.35"
                        stroke-dasharray="3 5"
                        stroke-width="1"
                      />
                      <text
                        x={x}
                        y="24"
                        text-anchor="middle"
                        fill="#A8CCF0"
                        font-size="11"
                        font-family="var(--font-mono)"
                      >
                        {year}
                      </text>
                    </g>
                  );
                }}
              </For>

              {/* Left Track Labels & Horizontal Transit Tracks */}
              <For each={LINE_ORDER}>
                {(lineId, idx) => {
                  const y = () => lineToY(idx());
                  const line = journey().lines[lineId];
                  const isLineActive = () =>
                    activeLine() === "all" || activeLine() === lineId;
                  const lineOpacity = () => (isLineActive() ? "0.48" : "0.12");
                  return (
                    <g>
                      <circle cx="18" cy={y()} r="4.5" fill={line.color} />
                      <text
                        x="30"
                        y={y() + 4}
                        text-anchor="start"
                        fill={isLineActive() ? "#CBE4FB" : "#6E89B8"}
                        font-size="11"
                        font-family="var(--font-mono)"
                      >
                        {TRACK_SHORT_LABELS[lang()][lineId]}
                      </text>
                      <line
                        x1="176"
                        y1={y()}
                        x2="942"
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

              {/* Station Nodes (distinct non-overlapping coordinates & keyboard focusable) */}
              <For each={positionedNodes()}>
                {(pos) => {
                  const { node, x, y } = pos;
                  const color = journey().lines[node.line].color;
                  const isSelected = () => selectedNode()?.id === node.id;
                  const isHighlighted = () =>
                    activeLine() === "all" || activeLine() === node.line;

                  const selectStation = () => {
                    if (movedDistance > 6) return;
                    setSelectedNodeId(node.id);
                  };

                  return (
                    <g
                      role="button"
                      tabindex="0"
                      aria-label={`${node.year}: ${node.station} — ${node.label}`}
                      aria-pressed={isSelected()}
                      class="cursor-pointer transition-opacity focus:outline-none"
                      style={{ opacity: isHighlighted() ? "1" : "0.22" }}
                      onClick={selectStation}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedNodeId(node.id);
                        }
                      }}
                    >
                      <circle cx={x} cy={y} r="18" fill="transparent" />
                      <Show when={isSelected()}>
                        <circle
                          cx={x}
                          cy={y}
                          r="13"
                          fill="none"
                          stroke={color}
                          stroke-width="2"
                          stroke-opacity="0.85"
                        />
                      </Show>
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected() ? 7.5 : 5.5}
                        fill="#131622"
                        stroke={color}
                        stroke-width="3"
                      />
                    </g>
                  );
                }}
              </For>

              {/* Selected Station Callout Pill (viewport-clamped, zero overlap) */}
              <Show when={selectedPositioned()}>
                {(sel) => {
                  const node = () => sel().node;
                  const color = () => journey().lines[node().line].color;
                  const rawLabel = () => `${node().year} · ${node().label}`;
                  const displayLabel = () =>
                    rawLabel().length > 42 ? `${rawLabel().slice(0, 41)}…` : rawLabel();
                  const pillW = () =>
                    Math.min(310, Math.max(144, displayLabel().length * 6.5 + 24));
                  const pillX = () =>
                    Math.max(176, Math.min(964 - pillW(), sel().x - pillW() / 2));
                  const pillY = () => (sel().lineIdx === 0 ? sel().y + 14 : sel().y - 34);

                  return (
                    <g aria-hidden="true" class="pointer-events-none">
                      <rect
                        x={pillX()}
                        y={pillY()}
                        width={pillW()}
                        height="22"
                        rx="6"
                        fill="#131622"
                        stroke={color()}
                        stroke-width="1.25"
                      />
                      <text
                        x={pillX() + pillW() / 2}
                        y={pillY() + 14.5}
                        text-anchor="middle"
                        fill="#F0F7FF"
                        font-size="10.5"
                        font-family="var(--font-mono)"
                      >
                        {displayLabel()}
                      </text>
                    </g>
                  );
                }}
              </Show>
            </svg>
          </div>

          {/* Station Selector Pills & Detail Card */}
          <div class="grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div class="order-2 flex min-w-0 flex-nowrap gap-1.5 overflow-x-auto pb-2 md:order-1 md:flex-wrap md:content-start md:overflow-visible md:pb-0">
              <For each={visibleNodes()}>
                {(node) => {
                  const active = () => selectedNode()?.id === node.id;
                  return (
                    <button
                      type="button"
                      onClick={() => focusNode(node.id)}
                      class={`min-h-[36px] shrink-0 whitespace-nowrap rounded-xl border px-3 py-1.5 text-left text-xs transition md:shrink md:whitespace-normal ${
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
                <div class="order-1 flex flex-col justify-between rounded-2xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-5 md:order-2 md:sticky md:top-24">
                  <div>
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-mono text-xs text-[var(--color-accent)]">
                        {node().year} · {journey().lines[node().line].label}
                      </span>
                      <div class="flex shrink-0 items-center gap-1.5">
                        <span class="font-mono text-[11px] text-[var(--color-fg-subtle)]">
                          {selectedIndex() + 1}/{visibleNodes().length}
                        </span>
                        <button
                          type="button"
                          onClick={() => stepNode(-1)}
                          aria-label={lang() === "es" ? "Hito anterior" : "Previous milestone"}
                          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        >
                          <ChevronLeftIcon size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => stepNode(1)}
                          aria-label={lang() === "es" ? "Siguiente hito" : "Next milestone"}
                          class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-fg-muted)] transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                        >
                          <ChevronRightIcon size={16} />
                        </button>
                      </div>
                    </div>
                    <h3 class="mt-2 font-display text-xl text-[var(--color-fg)]">
                      {node().station}
                    </h3>
                    <p class="mt-1 font-mono text-xs text-[var(--color-primary)]">
                      {node().label}
                    </p>
                    <p class="mt-2 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                      {node().detail}
                    </p>
                  </div>
                  <Show when={nodeHref(node().link)}>
                    {(href) => (
                      <a
                        href={href()}
                        class="mt-3 inline-flex min-h-[36px] items-center gap-1.5 py-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
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
            <table class="w-full min-w-[660px] border-collapse text-left text-xs">
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
                class={`inline-flex min-h-[34px] items-center gap-2 rounded-full border px-3 py-1 transition ${
                  showHybrid()
                    ? "border-[var(--color-primary)] bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-subtle)] opacity-60"
                }`}
              >
                <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-[#5CA3FF]" />
                <span>{journey().focusLegend.hybrid}</span>
              </button>
              <button
                type="button"
                aria-pressed={showAdmin()}
                onClick={() => setShowAdmin((v) => !v)}
                class={`inline-flex min-h-[34px] items-center gap-2 rounded-full border px-3 py-1 transition ${
                  showAdmin()
                    ? "border-[#5CE6A0]/60 bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-subtle)] opacity-60"
                }`}
              >
                <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-[#5CE6A0]" />
                <span>{journey().focusLegend.admin}</span>
              </button>
              <button
                type="button"
                aria-pressed={showTech()}
                onClick={() => setShowTech((v) => !v)}
                class={`inline-flex min-h-[34px] items-center gap-2 rounded-full border px-3 py-1 transition ${
                  showTech()
                    ? "border-[#67C6F5]/60 bg-[var(--color-surface-raised)] text-[var(--color-fg)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-fg-subtle)] opacity-60"
                }`}
              >
                <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-[#67C6F5]" />
                <span>{journey().focusLegend.tech}</span>
              </button>
            </div>

            <div class="space-y-2.5 pt-3">
              <For each={journey().focusAxes}>
                {(ax) => (
                  <div class="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-2.5 text-xs">
                    <span class="font-medium text-[var(--color-fg)]">{ax.axis}</span>
                    <div class="flex shrink-0 gap-3 font-mono">
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
            <svg viewBox="0 0 480 370" class="w-full max-w-[460px]" aria-hidden="true">
              <For each={[25, 50, 75, 100]}>
                {(ring) => (
                  <polygon
                    points={radarPolygonPoints(
                      journey().focusAxes.map(() => ring),
                      240,
                      185,
                      94,
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
                    polarPoint(240, 185, 94, idx(), journey().focusAxes.length);
                  const labelPt = () =>
                    polarPoint(240, 185, 114, idx(), journey().focusAxes.length);
                  const anchor = () => {
                    const i = idx();
                    if (i === 0 || i === 3) return "middle";
                    if (i === 1 || i === 2) return "start";
                    return "end";
                  };
                  const lines = () => splitRadarLabel(ax.axis);
                  const baseY = () => {
                    const i = idx();
                    if (i === 0) return labelPt().y - (lines().length > 1 ? 14 : 4);
                    if (i === 3) return labelPt().y + 10;
                    return labelPt().y - (lines().length > 1 ? 6 : 0);
                  };

                  return (
                    <g>
                      <line
                        x1="240"
                        y1="185"
                        x2={outer().x}
                        y2={outer().y}
                        stroke="#364266"
                        stroke-width="1"
                      />
                      <text
                        x={labelPt().x}
                        y={baseY()}
                        text-anchor={anchor()}
                        dominant-baseline="middle"
                        fill="#CBE4FB"
                        font-size="10.5"
                        font-family="var(--font-mono)"
                      >
                        <For each={lines()}>
                          {(line, lineIdx) => (
                            <tspan x={labelPt().x} dy={lineIdx() === 0 ? 0 : 13}>
                              {line}
                            </tspan>
                          )}
                        </For>
                      </text>
                    </g>
                  );
                }}
              </For>

              <Show when={showAdmin()}>
                <polygon
                  points={radarPolygonPoints(
                    journey().focusAxes.map((a) => a.admin),
                    240,
                    185,
                    94,
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
                    240,
                    185,
                    94,
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
                    240,
                    185,
                    94,
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
