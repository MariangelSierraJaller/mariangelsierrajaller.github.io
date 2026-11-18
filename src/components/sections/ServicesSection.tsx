import { For, type Component } from "solid-js";
import { SERVICE_IDS, type ServiceId } from "@/types/content";
import { useLanguage } from "@/context/language";
import { Section } from "@/components/layout/Section";
import { TechList } from "@/components/ui/TechList";
import {
  ArrowRightIcon,
  BarChartIcon,
  CheckIcon,
  CpuIcon,
  DatabaseIcon,
  ShieldCheckIcon,
} from "@/components/ui/icons";

const SERVICE_ICONS: Record<ServiceId, Component<{ size?: number }>> = {
  erpOperations: DatabaseIcon,
  financialControl: ShieldCheckIcon,
  biDashboards: BarChartIcon,
  processAutomation: CpuIcon,
};

export const ServicesSection: Component = () => {
  const { lang, copy } = useLanguage();
  const svcCopy = () => copy().services;

  const workflowPillars = () =>
    lang() === "es"
      ? [
          {
            tag: "Auditoría ERP",
            title: "Diagnóstico & Trazabilidad",
            detail: "Mapeo de flujos ERP, compras y control documental.",
          },
          {
            tag: "NetSuite",
            title: "Estandarización Operativa",
            detail: "Catálogos maestros, controles y conciliaciones.",
          },
          {
            tag: "Python & SQL",
            title: "Automatización ETL",
            detail: "Limpieza XML/JSON y modelado relacional reproducible.",
          },
          {
            tag: "Power BI",
            title: "Inteligencia Financiera",
            detail: "Modelo estrella DAX y KPIs ejecutivos en tiempo real.",
          },
        ]
      : [
          {
            tag: "ERP Audit",
            title: "Discovery & Traceability",
            detail: "Mapping ERP workflows, procurement and document controls.",
          },
          {
            tag: "NetSuite",
            title: "Operational Standardization",
            detail: "Master catalogs, audit trail and reconciliations.",
          },
          {
            tag: "Python & SQL",
            title: "ETL Automation",
            detail: "XML/JSON cleansing and reproducible relational schemas.",
          },
          {
            tag: "Power BI",
            title: "Financial Intelligence",
            detail: "DAX star schema and executive KPIs in real time.",
          },
        ];

  return (
    <Section
      id="services"
      eyebrow={svcCopy().eyebrow}
      title={svcCopy().title}
      subtitle={svcCopy().subtitle}
      surface="alt"
    >
      <div class="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <For each={workflowPillars()}>
          {(wf) => (
            <div class="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <span class="font-mono text-xs font-semibold text-[var(--color-primary)]">
                {wf.tag}
              </span>
              <h3 class="mt-1 font-display text-lg text-[var(--color-fg)]">{wf.title}</h3>
              <p class="mt-1 text-xs leading-relaxed text-[var(--color-fg-muted)]">{wf.detail}</p>
            </div>
          )}
        </For>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <For each={SERVICE_IDS}>
          {(svcId, idx) => {
            const item = () => svcCopy().items[svcId];
            const Icon = SERVICE_ICONS[svcId];
            return (
              <article class="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/90 p-6 hover-glow">
                <div>
                  <div class="flex items-center justify-between gap-4">
                    <span class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)]">
                      <Icon size={20} />
                    </span>
                    <span class="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--color-accent)]">
                      0{idx() + 1}
                    </span>
                  </div>

                  <h3 class="mt-5 font-display text-2xl text-[var(--color-fg)]">
                    {item().title}
                  </h3>
                  <p class="mt-1.5 font-mono text-xs leading-relaxed text-[var(--color-accent)]">
                    {item().tagline}
                  </p>
                  <p class="mt-3 text-sm leading-relaxed text-[var(--color-fg-muted)]">
                    {item().description}
                  </p>

                  <div class="mt-5 border-t border-[var(--color-border)] pt-4">
                    <p class="font-mono text-xs uppercase tracking-wider text-[var(--color-accent)]">
                      {svcCopy().deliverablesLabel}
                    </p>
                    <ul class="mt-2.5 space-y-1.5 text-sm text-[var(--color-fg-muted)]">
                      <For each={item().deliverables}>
                        {(del) => (
                          <li class="flex items-start gap-2">
                            <CheckIcon size={15} class="mt-1 shrink-0 text-[var(--color-success)]" />
                            <span>{del}</span>
                          </li>
                        )}
                      </For>
                    </ul>
                  </div>

                  <div class="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-3.5">
                    <span class="font-mono text-[11px] uppercase tracking-wider text-[var(--color-accent)]">
                      {svcCopy().impactLabel}:{" "}
                    </span>
                    <span class="text-xs font-medium text-[var(--color-fg)]">
                      {item().impact}
                    </span>
                  </div>
                </div>

                <div class="mt-5 space-y-4">
                  <TechList items={item().tags} />
                  <a
                    href="#contact"
                    class="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                  >
                    <span>{svcCopy().ctaLabel}</span>
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
